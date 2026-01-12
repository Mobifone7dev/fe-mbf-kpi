"use client";
import { useEffect, useState } from "react";
import { ErrorMessage, Form, Formik } from "formik";
import {
  handleSearchEmployeeByEmpcode,
  handleGetExecKpiDLAEmployee,
  handleGetPlanKpiDLAEmployee,
  handleGetPtmByWard,
} from "../../lib/api";
import LoadingComponent from "@components/loading/LoadingComponent";
import { exportKpiPlanExcelAM } from "../../components/excel/ExportPlanKpiExcelAM";
import "react-datepicker/dist/react-datepicker.css";
import { DatePickerField } from "../../components/widgets/datePickers/DatePickerField";
import * as Yup from "yup";
import "bootstrap/dist/css/bootstrap.min.css";
import Link from "next/link";
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
import { excludeEmpCodes } from "../../lib/rawData";
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
  const [data, setData] = useState({});
  const router = useRouter();

  const [indexDateInMonth, setIndexDateInMonth] = useState(
    new Date().getDate()
  );
  const [initValues, setInitValues] = useState(INIT_VALUES);
  const [sumDateInMonth, setSumDateInMonth] = useState(daysInMonth(new Date()));
  const formSchema = Yup.object().shape({});

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
    getPtmByWard();
  }, []);
  useEffect(() => {
    if (selectedDate) {
      getPtmByWard();
    }
  }, [selectedDate]);

  const getPtmByWard = async () => {
    setLoading(true);
    const date = changeFormatDateFirstDateInMonth(selectedDate);
    const result = await handleGetPtmByWard(date).catch((e) => {
      if (e?.unauthorized) {
        localStorage.removeItem("accessToken");
        router.push("/login");
      }
    });
    const resData = await result.json();
    const filteredData = resData.result.filter(
      (item) => item.WARD_NAME !== null && item.WARD_NAME !== ""
    );

    const sortedData = filteredData.sort((a, b) => b.ISDN_COUNT - a.ISDN_COUNT);

    setData(sortedData);
    setLoading(false);
  };

  return (
    <div className="dashboard-nvbh px-5">
      <div className="d-flex justify-content-start align-items-center">
        <h4 className="text-center my-2">
          {`THEO DÕI KẾT QUẢ THỰC HIỆN THEO XÃ THÁNG ${
            selectedDate.getMonth() + 1
          }`}
        </h4>
      </div>

      <div className="flex flex-col">
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
                  <div className="filter-body d-flex flex-start ">
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
                          console.log("Selected date:", e.getMonth());
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
            );
          }}
        </Formik>
        {data && data.length > 0 ? (
          <>
            <div class="table-responsive">
              <table
                style={{ maxWidth: "800px" }}
                className="table table-striped table-hover table-bordered"
              >
                <thead>
                  <tr>
                    <th>AREA </th>
                    <th>DISTRICT</th>
                    <th>NEW_PRECINCT_CODE</th>
                    <th>WARD_NAME</th>
                    <th>ISDN_COUNT</th>
                  </tr>
                </thead>
                <tbody>
                  {data.map((row, idx) => (
                    <tr key={idx}>
                      <td>{row.AREA_CODE || ""}</td>
                      <td >{row.OLD_DISTRICT_NAME || ""}</td>
                      <td>
                        <div
                          className="text-truncate"
                          style={{
                            maxWidth: "150px",
                            overflow: "hidden",
                            whiteSpace: "nowrap",
                            textOverflow: "ellipsis",
                            display: "block",
                          }}
                        >
                          {row.NEW_PRECINCT_CODE || ""}
                        </div>
                      </td>{" "}
                      <td>{row.WARD_NAME || ""}</td>
                      <td>{row.ISDN_COUNT}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        ) : (
          <>
            <h4>Đang tải dữ liệu</h4>
          </>
        )}
      </div>
    </div>
  );
}
