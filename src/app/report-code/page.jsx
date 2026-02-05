"use client";
import { useEffect, useState, useRef } from "react";
import { ErrorMessage, Form, Formik } from "formik";
import {

    handleGetReportCodeByVlr,
    handleGetReportCodeByVlrDetail
} from "../../lib/api";
import LoadingComponent from "@components/loading/LoadingComponent";
import { exportKpiPlanExcel } from "../../components/excel/ExportPlanKpiExcel";
import "react-datepicker/dist/react-datepicker.css";
import { DatePickerField } from "../../components/widgets/datePickers/DatePickerField";
import * as Yup from "yup";
import "bootstrap/dist/css/bootstrap.min.css";
import {
    changeFormatDateFirstDateInMonth,
    convertToNumber,
    convertToFloat2FixedNumber,
    convertToNumberMauso,
    daysInMonth,
    calcProcessFromLastDate,
} from "../../until/functions";
import { useRouter } from "next/navigation";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import ImportPlanKpiExcel from "../../components/excel/ImportPlanKpiExcel";
import { setLazyProp } from "next/dist/server/api-utils";
import Link from "next/link";
const formSchema = Yup.object().shape({});

var x = new Date();
x.setDate(1);
x.setMonth(x.getMonth());
const INIT_VALUES = {
    selectMonth: x,
};
export default function Page() {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [user, setUser] = useState({});
    const [initValues, setInitValues] = useState(INIT_VALUES);
    const router = useRouter();
    const firstLoad = useRef(true);

    useEffect(() => {
        const userString = localStorage.getItem("user");
        if (userString) {
            try {
                const userObj = JSON.parse(userString);
                setUser(userObj); // ✅ OBJECT
            } catch (e) {
                router.replace("/login");
            }
        } else {
            router.replace("/login");
        }
    }, []);

    useEffect(() => {
        getReportByCode();
    }, []);
    useEffect(() => {
        if (firstLoad.current) {
            firstLoad.current = false;
            return; // ❌ bỏ qua lần đầu
        }
        getReportByCode();
    }, [selectedDate])

    const exportToExcel = () => {
        const table = document.getElementById("table-report-code-vlr");
        const workbook = XLSX.utils.table_to_book(table, {
            sheet: "KPI_DLA",
        });

        const excelBuffer = XLSX.write(workbook, {
            bookType: "xlsx",
            type: "array",
        });

        const blob = new Blob([excelBuffer], {
            type: "application/octet-stream",
        });

        saveAs(blob, "bao_cao_kpi_dla_nvbh.xlsx");
    };
    const getReportByCode = async () => {
        setLoading(true);
        const date = changeFormatDateFirstDateInMonth(selectedDate);
        const result = await handleGetReportCodeByVlr(date).catch((e) => {
            if (e?.unauthorized) {
                localStorage.removeItem("accessToken");
                router.push("/login");
            }
        });;
        if (result?.status == 403) {
            localStorage.removeItem("accessToken");
            router.push("/login");
        }
        const resTemp = await result.json();
        if (resTemp) {
            const sorted = [...resTemp.result].sort(
                (a, b) => (b.TONG_TRONG_TINH || 0) - (a.TONG_TRONG_TINH || 0)
            );
            setData(sorted);
        }
        setLoading(false);
    };

    const getReportByCodeDetail = async () => {
        setLoading(true);
        const date = changeFormatDateFirstDateInMonth(selectedDate);
        const result = await handleGetReportCodeByVlrDetail(date).catch((e) => {
            if (e?.unauthorized) {
                localStorage.removeItem("accessToken");
                router.push("/login");
            }
        });;
        if (result?.status == 403) {
            localStorage.removeItem("accessToken");
            router.push("/login");
        }
        const tempData = await result.json();
        const dataDetail = tempData?.result;
        if (!dataDetail || dataDetail.length === 0) {
            alert("Không có dữ liệu để export!");
            return;
        }

        // Format lại dữ liệu cho đẹp cột Excel
        const formattedData = dataDetail.map((item, index) => ({
            STT: index + 1,
            ISDN: item.ISDN,
            IMSI: item.IMSI,
            LOAI_TB: item.SUB_TYPE,
            LOAI_KH: item.CUS_TYPE === "C" ? "Cá nhân" : "Doanh nghiệp",
            NGAY_KICH_HOAT: formatDate(item.ACTIVE_DATE),
            NGAY_FILE: formatDate(item.FILE_DATE),
            TINH: item.PROVINCE_CODE,
            PHUONG_XA: item.PRECINCT_CODE,
            MA_NV: item.EMP_CODE,
            GOI_CUOC: item.LOAIGOI_THANG_30NGAY_DAU,
            GIA_GOI: Number(item.GOI_THANG_30NGAY_DAU_PRICE || 0),
            LOAI_VLR: item.LOAI_VLR,
            IS_FC: item.IS_FC ? "FC" : "Không",
        }));

        const worksheet = XLSX.utils.json_to_sheet(formattedData);

        // Auto width cột
        worksheet["!cols"] = Object.keys(formattedData[0]).map(() => ({
            wch: 18,
        }));

        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "BaoCaoThueBao");

        const excelBuffer = XLSX.write(workbook, {
            bookType: "xlsx",
            type: "array",
        });

        const blob = new Blob([excelBuffer], {
            type: "application/octet-stream",
        });

        saveAs(blob, `bao_cao_thue_bao_${Date.now()}.xlsx`);
        setLoading(false);
    };
    const formatDate = (dateStr) => {
        if (!dateStr) return "";
        const d = new Date(dateStr);
        return d.toLocaleDateString("vi-VN");
    };
    return (
        <div className="container-fluid report-code p-3">
            <div className="flex flex-wrap">
                <h4 className="mb-3">📊 Báo cáo thuê bao theo gói cước và vlr</h4>
                <button className="ms-5 btn-houze btn-solid" onClick={exportToExcel}>
                    Export Excel
                </button>
            </div>



            <div className="flex flex-col md:flex-row">
                <Formik
                    enableReinitialize={true}
                    initialValues={initValues}
                    validationSchema={formSchema}
                    onSubmit={async (values, { resetForm }) => {
                        setInitValues({
                            selectMonth: values.selectMonth,
                        });
                    }}
                >
                    {(formikProps) => {
                        return (
                            <div className=" filter flex flex-row justify-items-center align-items-center me-5">
                                <Form>
                                    <div className="filter-body d-flex flex-start align-items-center mb-2 border p-2">
                                        <div className="select-filter me-5">
                                            <label
                                                htmlFor="selectMonth"
                                                className="form-label fs-6 fw-bold text-dark me-2"
                                            >
                                                Tháng
                                            </label>
                                            <DatePickerField
                                                showMonthYearPicker={true}
                                                name={`selectMonth`}
                                                dateFormat="MM/yyyy"
                                                disabled={false}
                                                callbackSetDate={(e) => {
                                                    setSelectedDate(e);
                                                    setInitValues({
                                                        ...initValues,
                                                        selectMonth: e,
                                                    });
                                                }}
                                            ></DatePickerField>

                                            <div className="text-danger">
                                                <ErrorMessage name="selectMonth" />
                                            </div>
                                        </div>
                                        <button
                                            className="btn btn-success"
                                            onClick={() => {
                                                // console.log("check", finalData)
                                                //   exportTableExcel(finalData);
                                                getReportByCodeDetail();
                                            }}
                                        >
                                            Export thuê bao chi tiết
                                        </button>{" "}
                                    </div>
                                </Form>
                            </div>
                        );
                    }}
                </Formik>

            </div>

            {loading && <LoadingComponent />}

            {!loading && data && data.length === 0 && (
                <div className="alert alert-warning">Không có dữ liệu</div>
            )}

            {!loading && data && data.length > 0 && (
                <div className="table-responsive">
                    <table id="table-report-code-vlr" className="table table-bordered table-sm table-hover">
                        <thead className="table-primary text-center">
                            <tr>
                                <th>Gói cước</th>

                                {/* Trong tỉnh */}
                                <th>DLA_T01</th>
                                <th>DLA_T02</th>
                                <th>DLA_T03</th>
                                <th>DLA_T04</th>
                                <th>DLA_T05</th>
                                <th>DLA_T06</th>
                                <th>DLA_T07</th>
                                <th>DLA_T08</th>
                                <th>DLA_T09</th>
                                <th>DLA_T10</th>
                                <th>DLA_T11</th>
                                <th>DLA_T12</th>
                                <th>DLA_T13</th>

                                {/* Ngoài tỉnh */}
                                <th>DLA_D01</th>
                                <th>DLA_D02</th>
                                <th>DLA_D03</th>
                                <th>DLA_D04</th>
                                <th>DLA_D05</th>
                                <th>DLA_D06</th>

                                <th>Tổng trong tỉnh</th>
                                <th>Tổng ngoài tỉnh</th>
                            </tr>
                        </thead>

                        <tbody>
                            {data.map((row, idx) => (
                                <tr key={idx} className="text-end">
                                    <td className="text-start fw-bold">{row.GOI_CUOC}</td>

                                    <td>{row.DLA_T01 || 0}</td>
                                    <td>{row.DLA_T02 || 0}</td>
                                    <td>{row.DLA_T03 || 0}</td>
                                    <td>{row.DLA_T04 || 0}</td>
                                    <td>{row.DLA_T05 || 0}</td>
                                    <td>{row.DLA_T06 || 0}</td>
                                    <td>{row.DLA_T07 || 0}</td>
                                    <td>{row.DLA_T08 || 0}</td>
                                    <td>{row.DLA_T09 || 0}</td>
                                    <td>{row.DLA_T10 || 0}</td>
                                    <td>{row.DLA_T11 || 0}</td>
                                    <td>{row.DLA_T12 || 0}</td>
                                    <td>{row.DLA_T13 || 0}</td>

                                    <td>{row.DLA_D01 || 0}</td>
                                    <td>{row.DLA_D02 || 0}</td>
                                    <td>{row.DLA_D03 || 0}</td>
                                    <td>{row.DLA_D04 || 0}</td>
                                    <td>{row.DLA_D05 || 0}</td>
                                    <td>{row.DLA_D06 || 0}</td>

                                    <td className="fw-bold text-primary">
                                        {row.TONG_TRONG_TINH || 0}
                                    </td>
                                    <td className="fw-bold text-danger">
                                        {row.TONG_NGOAI_TINH || 0}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );

}
