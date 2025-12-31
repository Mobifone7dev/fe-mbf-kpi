"use client";
import { useEffect, useState } from "react";
import { ErrorMessage, Form, Formik } from "formik";
import {
  handleSearchEmployeeByEmpcode,
  handleGetExecKpiDLAEmployee,
  handleGetPlanKpiDLAEmployee,
  handleSearchPTMEmployeeByEmpcode,
} from "../../../lib/api";
import LoadingComponent from "@components/loading/LoadingComponent";
import { exportKpiPlanExcelGDV } from "../../../components/excel/ExportPlanKpiExcelGDV";
import "react-datepicker/dist/react-datepicker.css";
import { DatePickerField } from "../../../components/widgets/datePickers/DatePickerField";
import * as Yup from "yup";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  changeFormatDateFirstDateInMonth,
  convertToNumber,
  convertToFloat2FixedNumber,
  convertToNumberMauso,
  daysInMonth,
  calcProcessFromLastDate,
} from "../../../until/functions";
import { useRouter } from "next/navigation";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import ImportKpiExcelGDV from "../../../components/excel/ImportKpiExcelGDV";
import { setLazyProp } from "next/dist/server/api-utils";
import { excludeEmpCodes } from "../../../lib/rawData";
import moment from "moment";

var x = new Date();
x.setDate(1);
x.setMonth(x.getMonth());
const INIT_VALUES = {
  selectMonth: x,
};
export default function Page(props) {
  const [loading, setLoading] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [user, setUser] = useState({});
  const router = useRouter();
  const [data, setData] = useState([]);
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
    getKpiEmployee();
  }, []);
  const getKpiEmployee = async () => {
    const date = changeFormatDateFirstDateInMonth(selectedDate);
    setLoading(true);
    const result = await handleSearchPTMEmployeeByEmpcode(
      props.params.id ?? "",
      date
    );
    const tempRes = await result.json();
    if (tempRes.result && tempRes.result.length > 0) {
      setData(tempRes.result);
      setLoading(false);
    }
  };
  useEffect(() => {
    if (selectedDate) {
      getKpiEmployee();
    }
  }, [selectedDate]);

  const [initValues, setInitValues] = useState(INIT_VALUES);
  const formSchema = Yup.object().shape({});
  return (
    <>
      <h4>{`Chi tiết thuê bao nhân viên ${props.id ?? ""}`}</h4>
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
              <div className="dashboard-nvbh">
                <div className="flex flex-col md:flex-row">
                  <Form>
                    <div className="filter-body d-flex flex-start md:flex-col">
                      <div className="select-filter">
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
                    </div>
                  </Form>
                </div>
                <div className="table-kpi-nvbh">
                  <table className="table-fixed align-middle gs-0 gy-3">
                    <thead className={`table-head`}>
                      <tr>
                        <th style={{ width: "150px" }}>{`Mã nhân viên`}</th>
                        <th
                          style={{ width: "120px" }}
                          className="th-title position-relative"
                        >{`ĐƠN VỊ/BP`}</th>
                        <th style={{ width: "120px" }}>{`ISDN`}</th>
                        <th
                          style={{ width: "150px" }}
                        >{`Loại hình thuê bao`}</th>
                        <th style={{ width: "150px" }}>{`Ngày kích hoạt`}</th>
                      </tr>
                    </thead>
                    <tbody>
                      {!loading && data && data.length > 0 ? (
                        data.map((object,i) => (
                          <tr key={i}>
                            <td>{object.NV_PT ?? ""}</td>
                            <td>{object.SHOP_CODE_PT ?? ""}</td>
                            <td>{object.ISDN ?? ""}</td>
                            <td>{object.LOAI_HINH_TB ?? ""}</td>
                            <td>
                              {moment(object.ACTIVE_DATE).format(
                                "DD-MM-YYYY"
                              ) ?? ""}
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan={5} className="text-center fw-bold">
                            Đang tải dữ liệu...
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            );
          }}
        </Formik>
      </div>
    </>
  );
}
