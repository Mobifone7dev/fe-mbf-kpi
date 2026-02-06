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
                    <div className="table-responsive">
                        <table
                            id="table-report-code-vlr"
                            className="table table-bordered table-sm table-hover table-report"
                        >
                            <thead className="text-center">
                                <tr className="table-primary fw-bold">
                                    <th rowSpan="2">Gói cước</th>

                                    {[
                                        "DLA_T01", "DLA_T02", "DLA_T03", "DLA_T04", "DLA_T05", "DLA_T06",
                                        "DLA_T07", "DLA_T08", "DLA_T09", "DLA_T10", "DLA_T11", "DLA_T12", "DLA_T13",
                                        "DLA_D01", "DLA_D02", "DLA_D03", "DLA_D04", "DLA_D05", "DLA_D06"
                                    ].map(code => (
                                        <th key={code} colSpan="2">{code}</th>
                                    ))}

                                    <th rowSpan="2">Tổng trong tỉnh</th>
                                    <th rowSpan="2">Tổng ngoài tỉnh</th>
                                </tr>

                                <tr>
                                    {Array.from({ length: 19 }).map((_, i) => (
                                        <>
                                            <th className="th-trong">Trong tỉnh</th>
                                            <th className="th-ngoai">Ngoài tỉnh</th>
                                        </>
                                    ))}
                                </tr>
                            </thead>

                            <tbody>
                                {data.map((row, idx) => (
                                    <tr key={idx} className="text-end">
                                        <td className="text-start fw-bold">{row.GOI_CUOC}</td>

                                        {/* T01 → T13 */}
                                        <td className="cell-trong">{row.DLA_T01_TRONG_TINH || 0}</td>
                                        <td className="cell-ngoai">{row.DLA_T01_NGOAI_TINH || 0}</td>

                                        <td className="cell-trong">{row.DLA_T02_TRONG_TINH || 0}</td>
                                        <td className="cell-ngoai">{row.DLA_T02_NGOAI_TINH || 0}</td>

                                        <td className="cell-trong">{row.DLA_T03_TRONG_TINH || 0}</td>
                                        <td className="cell-ngoai">{row.DLA_T03_NGOAI_TINH || 0}</td>

                                        <td className="cell-trong">{row.DLA_T04_TRONG_TINH || 0}</td>
                                        <td className="cell-ngoai">{row.DLA_T04_NGOAI_TINH || 0}</td>

                                        <td className="cell-trong">{row.DLA_T05_TRONG_TINH || 0}</td>
                                        <td className="cell-ngoai">{row.DLA_T05_NGOAI_TINH || 0}</td>

                                        <td className="cell-trong">{row.DLA_T06_TRONG_TINH || 0}</td>
                                        <td className="cell-ngoai">{row.DLA_T06_NGOAI_TINH || 0}</td>

                                        <td className="cell-trong">{row.DLA_T07_TRONG_TINH || 0}</td>
                                        <td className="cell-ngoai">{row.DLA_T07_NGOAI_TINH || 0}</td>

                                        <td className="cell-trong">{row.DLA_T08_TRONG_TINH || 0}</td>
                                        <td className="cell-ngoai">{row.DLA_T08_NGOAI_TINH || 0}</td>

                                        <td className="cell-trong">{row.DLA_T09_TRONG_TINH || 0}</td>
                                        <td className="cell-ngoai">{row.DLA_T09_NGOAI_TINH || 0}</td>

                                        <td className="cell-trong">{row.DLA_T10_TRONG_TINH || 0}</td>
                                        <td className="cell-ngoai">{row.DLA_T10_NGOAI_TINH || 0}</td>

                                        <td className="cell-trong">{row.DLA_T11_TRONG_TINH || 0}</td>
                                        <td className="cell-ngoai">{row.DLA_T11_NGOAI_TINH || 0}</td>

                                        <td className="cell-trong">{row.DLA_T12_TRONG_TINH || 0}</td>
                                        <td className="cell-ngoai">{row.DLA_T12_NGOAI_TINH || 0}</td>

                                        <td className="cell-trong">{row.DLA_T13_TRONG_TINH || 0}</td>
                                        <td className="cell-ngoai">{row.DLA_T13_NGOAI_TINH || 0}</td>

                                        {/* D01 → D06 */}
                                        <td className="cell-trong">{row.DLA_D01_TRONG_TINH || 0}</td>
                                        <td className="cell-ngoai">{row.DLA_D01_NGOAI_TINH || 0}</td>

                                        <td className="cell-trong">{row.DLA_D02_TRONG_TINH || 0}</td>
                                        <td className="cell-ngoai">{row.DLA_D02_NGOAI_TINH || 0}</td>

                                        <td className="cell-trong">{row.DLA_D03_TRONG_TINH || 0}</td>
                                        <td className="cell-ngoai">{row.DLA_D03_NGOAI_TINH || 0}</td>

                                        <td className="cell-trong">{row.DLA_D04_TRONG_TINH || 0}</td>
                                        <td className="cell-ngoai">{row.DLA_D04_NGOAI_TINH || 0}</td>

                                        <td className="cell-trong">{row.DLA_D05_TRONG_TINH || 0}</td>
                                        <td className="cell-ngoai">{row.DLA_D05_NGOAI_TINH || 0}</td>

                                        <td className="cell-trong">{row.DLA_D06_TRONG_TINH || 0}</td>
                                        <td className="cell-ngoai">{row.DLA_D06_NGOAI_TINH || 0}</td>

                                        {/* Tổng */}
                                        <td className="fw-bold text-primary">
                                            {row.TONG_TRONG_TINH}
                                        </td>
                                        <td className="fw-bold text-danger">
                                            {row.TONG_NGOAI_TINH}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>

                    </div>
                </div>

            )}
        </div>
    );

}
