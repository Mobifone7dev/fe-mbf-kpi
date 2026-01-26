"use client";
import { useEffect, useState } from "react";
import { ErrorMessage, Form, Formik } from "formik";
import {
  handleSearchEmployeeByEmpcode,
  handleGetExecKpiDLAEmployee,
  handleGetPlanKpiDLAEmployee,
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

const KPI_KEYS = [
  "SL_PTM_TBTT",
  "SL_TBTS_PTM_THOAI",
  "SL_TB_PTM_M2M",
  "TB_PTM_SAYMEE",
  "TB_PTM_FIBER",
];
export default function Page(props) {
  const [employeeList, setEmployeeList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [user, setUser] = useState({});
  const router = useRouter();
  const [execData, setExecData] = useState({});
  const [planData, setPlanData] = useState({});
  const [finalData, setFinalData] = useState([]);
  const [errorImport, setErrorImport] = useState("");
  const [indexDateInMonth, setIndexDateInMonth] = useState(
    new Date().getDate()
  );
  const [initValues, setInitValues] = useState(INIT_VALUES);
  const [sumDateInMonth, setSumDateInMonth] = useState(daysInMonth(new Date()));
  const formSchema = Yup.object().shape({});
  const [SL_PTM_TBTT_PROCESS, SET_SL_PTM_TBTT_PROCESS] = useState(0);
  const [SL_TBTS_PTM_THOAI_PROCESS, SET_SL_TBTS_PTM_THOAI] = useState(0);
  const [SL_TB_PTM_M2M_PROCESS, SET_SL_TB_PTM_M2M_PROCESS] = useState(0);
  const [TB_PTM_SAYMEE_PROCESS, SET_TB_PTM_SAYMEE_PROCESS] = useState(0);
  const [TB_PTM_FIBER_PROCESS, SET_TB_PTM_FIBER_PROCESS] = useState(0);

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
    getEmployee();
  }, []);

  const getEmployee = async () => {
    setLoading(true);
    const result = await handleSearchEmployeeByEmpcode("%A1%");
     if (result?.status == 403) {
      localStorage.removeItem("accessToken");
      router.push("/login");
    }
    const tempRes = await result.json();
    if (tempRes) {
      if (tempRes?.result) {
        const filteredList = tempRes?.result?.filter(
          (item) => !excludeEmpCodes.includes(item.EMP_CODE)
        );

        setEmployeeList(filteredList);
      }
    }
    setLoading(false);
  };
  const getExecKpiEmployee = async () => {
    setLoading(true);

    const date = changeFormatDateFirstDateInMonth(selectedDate);
    const result = await handleGetExecKpiDLAEmployee(date, "%A1%");
    const tempRes = await result.json();
    if (tempRes && tempRes.result && tempRes.result.length >= 0) {
      const result = mergeEmployeeWithKpi(employeeList, tempRes.result);
      setExecData(result);
      // ✅ 1. lấy map LAST_DATE theo TEN_CHI_TIEU
      const lastDateMap = extractLastDateByChiTieu(tempRes.result);

      SET_SL_PTM_TBTT_PROCESS(
        calcProcessFromLastDate(lastDateMap["SL_PTM_TBTT"], sumDateInMonth)
      );

      SET_SL_TBTS_PTM_THOAI(
        calcProcessFromLastDate(
          lastDateMap["SL_TBTS_PTM_THOAI"],
          sumDateInMonth
        )
      );

      SET_SL_TB_PTM_M2M_PROCESS(
        calcProcessFromLastDate(lastDateMap["SL_TB_PTM_M2M"], sumDateInMonth)
      );

      SET_TB_PTM_SAYMEE_PROCESS(
        calcProcessFromLastDate(lastDateMap["TB_PTM_SAYMEE"], sumDateInMonth)
      );

      SET_TB_PTM_FIBER_PROCESS(
        calcProcessFromLastDate(lastDateMap["TB_PTM_FIBER"], sumDateInMonth)
      );
    }

    setLoading(false);
  };
  const getPlanKpiEmployee = async () => {
    setLoading(true);

    const date = changeFormatDateFirstDateInMonth(selectedDate);
    const result = await handleGetPlanKpiDLAEmployee(date, "%A1%");
    const tempRes = await result.json();
    if (tempRes && tempRes.result && tempRes.result.length > 0) {
      const result = mergeEmployeeWithPlanKpi(employeeList, tempRes.result);
      setPlanData(result);
    }

    setLoading(false);
  };
  useEffect(() => {
    if (!employeeList || employeeList.length === 0) return;
    if (!selectedDate) return;

    resetData();
    getPlanKpiEmployee();
    getExecKpiEmployee();
  }, [employeeList, selectedDate]);

  useEffect(() => {
    if (execData.length > 0 && planData.length > 0) {
      const merged = mergePlanIntoExec(execData, planData);
      // ✅ SORT THEO AREA
      merged.sort((a, b) => {
        if (!a.AREA) return 1;
        if (!b.AREA) return -1;
        return a.AREA.localeCompare(b.AREA, "vi", { numeric: true });
      });
      setFinalData(merged);
    }
  }, [execData, planData]);

  const resetData = () => {
    setPlanData({});
    setExecData({});
    // setFinalData({});
    if (employeeList.length > 0) {
      const merged = initFinalDataFromEmployees(employeeList);

      // sort theo AREA
      merged.sort((a, b) =>
        (a.AREA || "").localeCompare(b.AREA || "", "vi", { numeric: true })
      );

      setFinalData(merged);
    }
  };

  function mergeEmployeeWithKpi(employeeList, kpiList) {
    const resultMap = {};

    // 1. INIT TRƯỚC: tất cả nhân viên
    employeeList.forEach((emp) => {
      resultMap[emp.EMP_CODE] = {
        AREA: emp.AREA,
        AREA_CODE: emp.AREA_CODE,
        EMP_CODE: emp.EMP_CODE,
        EMP_NAME: emp.EMP_NAME,
        SHOP_CODE: emp.SHOP_CODE,
        SHOP_NAME: emp.SHOP_NAME?.trim(),
        WARD_CODE: emp.WARD_CODE,
        PHONE: emp.PHONE ?? null, // ✅ THÊM
      };
    });

    // 2. ĐỔ KPI VÀO (nếu có)
    kpiList.forEach((kpi) => {
      if (!kpi.EMP_CODE || !kpi.TEN_CHI_TIEU) return;

      const empCode = kpi.EMP_CODE;

      if (!resultMap[empCode]) return;

      const key = kpi.TEN_CHI_TIEU;
      resultMap[empCode][key] =
        (resultMap[empCode][key] || 0) + Number(kpi.THUC_HIEN || 0);
    });

    return Object.values(resultMap);
  }

  function mergeEmployeeWithPlanKpi(employeeList, kpiList) {
    // 1. Map employee theo EMP_CODE
    const empMap = employeeList.reduce((acc, emp) => {
      acc[emp.EMP_CODE] = emp;
      return acc;
    }, {});

    const resultMap = {};

    // 2. Loop KPI (FACT TABLE)
    for (const kpi of kpiList) {
      // 🚨 chặn data lỗi
      if (!kpi.EMP_CODE || !kpi.TEN_CHI_TIEU) continue;

      const empCode = kpi.EMP_CODE;
      const emp = empMap[empCode] || {};

      // 3. Init 1 dòng / EMP_CODE (chỉ khi có KPI)
      if (!resultMap[empCode]) {
        resultMap[empCode] = {
          AREA: emp.AREA_CODE ?? kpi.AREA,
          EMP_CODE: empCode,
          EMP_NAME: emp.EMP_NAME ?? null,
          SHOP_CODE: emp.SHOP_CODE ?? kpi.SHOP_CODE,
          SHOP_NAME: emp.SHOP_NAME ? emp.SHOP_NAME.trim() : null,
          WARD_CODE: emp.WARD_CODE ?? null,
          PHONE: emp.PHONE ?? null, // ✅ THÊM
        };
      }

      // 4. Pivot TEN_CHI_TIEU → column + SUM
      const key = kpi.TEN_CHI_TIEU;

      resultMap[empCode][key] =
        (resultMap[empCode][key] || 0) + Number(kpi.THUC_HIEN || 0);
    }

    // 5. Trả ra array
    return Object.values(resultMap);
  }

  function mergePlanIntoExec(execData = [], planData = []) {
    const planMap = {};

    // 1. Map plan theo EMP_CODE
    for (const p of planData) {
      planMap[p.EMP_CODE] = p;
    }

    return execData.map((exec) => {
      const plan = planMap[exec.EMP_CODE] || {};
      const merged = {};

      // 2. Copy metadata (KHÔNG copy KPI gốc)
      [
        "AREA",
        "EMP_CODE",
        "EMP_NAME",
        "SHOP_CODE",
        "SHOP_NAME",
        "WARD_CODE",
        "LAST_DATE",
        "PHONE", // ✅ THÊM
      ].forEach((field) => {
        merged[field] = exec[field] ?? plan[field] ?? null;
      });

      // 3. Duyệt toàn bộ KPI (từ exec + plan)
      const kpiKeys = new Set([...Object.keys(exec), ...Object.keys(plan)]);

      kpiKeys.forEach((key) => {
        // bỏ metadata
        if (
          [
            "AREA",
            "EMP_CODE",
            "EMP_NAME",
            "SHOP_CODE",
            "SHOP_NAME",
            "WARD_CODE",
            "LAST_DATE",
            "PHONE",
          ].includes(key)
        )
          return;

        const execVal = Number(exec[key] || 0);
        const planVal = Number(plan[key] || 0);

        // chỉ tạo key mới, KHÔNG giữ key cũ
        merged[`${key}_EXEC`] = execVal;
        merged[`${key}_PLAN`] = planVal;
      });

      return merged;
    });
  }

  function initFinalDataFromEmployees(employeeList = []) {
    return employeeList.map((emp) => ({
      AREA: emp.AREA ?? emp.AREA_CODE ?? null,
      AREA_CODE: emp.AREA_CODE ?? null,
      EMP_CODE: emp.EMP_CODE,
      EMP_NAME: emp.EMP_NAME,
      SHOP_CODE: emp.SHOP_CODE,
      SHOP_NAME: emp.SHOP_NAME?.trim() ?? null,
      WARD_CODE: emp.WARD_CODE ?? null,
      PHONE: emp.PHONE ?? null, // ✅ THÊM
    }));
  }

  function extractLastDateByChiTieu(kpiList = []) {
    const map = {};

    for (const kpi of kpiList) {
      if (!kpi.TEN_CHI_TIEU || !kpi.LAST_DATE) continue;

      // vì cùng TEN_CHI_TIEU + THANG thì LAST_DATE giống nhau
      if (!map[kpi.TEN_CHI_TIEU]) {
        map[kpi.TEN_CHI_TIEU] = kpi.LAST_DATE;
      }
    }

    return map;
  }

  const exportToExcel = () => {
    const table = document.getElementById("table-kpi-am");
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

    saveAs(blob, "bao_cao_kpi_dla_am.xlsx");
  };
  return (
    <div className="dashboard-nvbh">
      <div className="d-flex justify-content-start align-items-center">
        <h4 className="text-center my-2">
          {`THEO DÕI KẾT QUẢ THỰC HIỆN THEO NGÀY KHỐI NVBH THÁNG ${
            selectedDate.getMonth() + 1
          }`}
        </h4>
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
                          let indexDate;
                          if (e < new Date()) {
                            indexDate = daysInMonth(e);
                          } else {
                            indexDate = e.getDate();
                          }
                          setIndexDateInMonth(indexDate);
                          const sumDate = daysInMonth(e);
                          setSumDateInMonth(sumDate);
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
        <div className="d-flex flex-start md:flex-row flex-col my-2 border p-2">
          <button
            className="btn btn-success"
            onClick={() => {
              // console.log("check", finalData)
              exportKpiPlanExcelAM(finalData);
            }}
          >
            Export kế hoạch KPI
          </button>{" "}
          <ImportPlanKpiExcel
            selectedDate={selectedDate}
            employeeList={employeeList}
            loading={(e) => {
              console.log("set loading emp", e);
              if (e) {
                setLoading(e);
              }
            }}
            error={(e) => {
              console.log("eeeeeeeee", e);
              setErrorImport(e);
            }}
            isRefesh={(e) => {
              if (e) {
                getPlanKpiEmployee();
                getExecKpiEmployee();
              }
            }}
          ></ImportPlanKpiExcel>
          <div className="flex flex-col">
            <span
              style={{ fontStyle: "italic", color: "red", paddingTop: "5px" }}
            >
              P/s1: Export file kết hoạch để nhập chỉnh sửa chỉ tiêu và import
              lại để cập nhật chỉ tiêu
            </span>
            <span
              style={{
                fontStyle: "italic",
                color: "red",
                textAlign: "left",
                display: "block",
              }}
            >
              P/s2: dữ liệu theo dõi tính đến n-2
            </span>
            <span style={{ color: "red" }}>{errorImport}</span>
          </div>
        </div>
      </div>

      <div className="table-kpi-nvbh">
        <table
          className="table-fixed align-middle gs-0 gy-3"
          id={`table-kpi-am`}
        >
          <thead className={`table-head`}>
            <tr>
              <th
                rowSpan={2}
                style={{ width: "100px" }}
                className="th-title position-relative"
              >{`ĐƠN VỊ/BP`}</th>
              <th
                rowSpan={2}
                style={{ width: "150px" }}
                className="th-title position-relative"
              >
                {`MÃ NV`}
                <br></br>
              </th>
              <th
                rowSpan={2}
                className="th-title position-relative"
                style={{ width: "200px" }}
              >{`TÊN NV`}</th>
              <th
                rowSpan={2}
                className="th-title position-relative"
              >{`PHONE`}</th>
              <th
                colSpan={3}
                className="th-title bg_green-light position-relative"
              >{`TBTT PTM`}</th>

              <th
                colSpan={3}
                className="th-title bg_blue-light position-relative"
              >
                {`TBTS THOẠI`}
              </th>
              <th
                colSpan={3}
                className="th-title bg_pink-light position-relative"
              >
                {`M2M`}
              </th>
              <th
                colSpan={3}
                className="th-title bg_green-light position-relative"
              >
                {` SAYMEE`}
              </th>
              <th
                colSpan={3}
                className="th-title bg_yellow-light position-relative"
              >
                {`FIBER`}
              </th>
              <th
                colSpan={3}
                className="th-title bg_green-light position-relative"
              >
                {` DN mới`}
              </th>
              <th
                colSpan={3}
                className="th-title bg_blue-light position-relative"
              >{`DOANH THU TỔNG ĐÀI`}</th>

              <th
                colSpan={3}
                className="th-title bg_blue-light position-relative"
              >{`DOANH THU SMS BRANDNAME`}</th>
            </tr>
            <tr className="th-title th-color-yellow ">
              <th style={{ fontStyle: "italic" }}>KH</th>
              <th style={{ fontStyle: "italic" }}>TH</th>
              <th style={{ fontStyle: "italic" }}>%TH</th>
              <th style={{ fontStyle: "italic" }}>KH</th>
              <th style={{ fontStyle: "italic" }}>TH</th>
              <th style={{ fontStyle: "italic" }}>%TH</th>
              <th style={{ fontStyle: "italic" }}>KH</th>
              <th style={{ fontStyle: "italic" }}>TH</th>
              <th style={{ fontStyle: "italic" }}>%TH</th>
              <th style={{ fontStyle: "italic" }}>KH</th>
              <th style={{ fontStyle: "italic" }}>TH</th>
              <th style={{ fontStyle: "italic" }}>%TH</th>
              <th style={{ fontStyle: "italic" }}>KH</th>
              <th style={{ fontStyle: "italic" }}>TH</th>
              <th style={{ fontStyle: "italic" }}>%TH</th>
              <th style={{ fontStyle: "italic" }}>KH</th>
              <th style={{ fontStyle: "italic" }}>TH</th>
              <th style={{ fontStyle: "italic" }}>%TH</th>
              <th style={{ fontStyle: "italic" }}>KH</th>
              <th style={{ fontStyle: "italic" }}>TH</th>
              <th style={{ fontStyle: "italic" }}>%TH</th>
              <th style={{ fontStyle: "italic" }}>KH</th>
              <th style={{ fontStyle: "italic" }}>TH</th>
              <th style={{ fontStyle: "italic" }}>%TH</th>
            </tr>
          </thead>
          <tbody>
            {finalData && finalData.length > 0 && !loading ? (
              finalData.map((object, i) => (
                <tr key={i}>
                  <td
                    style={{ textAlign: "center", fontWeight: 600 }}
                    className="td-stt  fix-col-1"
                  >
                    {object.AREA}
                  </td>
                  <td
                    style={{ textAlign: "left", fontWeight: 600 }}
                    className="td-stt   fix-col-2"
                  >
                    <Link href={`/kpi-employee/${object.EMP_CODE}`}>
                      {" "}
                      {object.EMP_CODE}
                    </Link>{" "}
                  </td>
                  <td
                    style={{ textAlign: "left", fontWeight: 600 }}
                    className="fix-col-3"
                  >
                    {object.EMP_NAME}
                  </td>
                  <td
                    style={{ textAlign: "left", fontWeight: 600 }}
                    className="fix-col-4"
                  >
                    {object.PHONE ? `${object.PHONE}` : ""}
                  </td>

                  <td style={{ textAlign: "center" }}>
                    {" "}
                    {object.SL_PTM_TBTT_PLAN ?? 0}
                  </td>
                  <td
                    style={{
                      textAlign: "center",
                      fontStyle: "italic",
                    }}
                  >
                    {object.SL_PTM_TBTT_EXEC ?? 0}
                  </td>
                  <td
                    className={
                      convertToNumber(object.SL_PTM_TBTT_PLAN) === 0
                        ? convertToNumber(object.SL_PTM_TBTT_EXEC) > 0
                          ? "bg-green"
                          : ""
                        : convertToFloat2FixedNumber(
                            (convertToNumber(object.SL_PTM_TBTT_EXEC) /
                              convertToNumberMauso(object.SL_PTM_TBTT_PLAN)) *
                              100
                          ) >=
                          convertToFloat2FixedNumber(SL_PTM_TBTT_PROCESS * 100)
                        ? "bg-green"
                        : "bg-red"
                    }
                    style={{
                      textAlign: "center",
                      fontStyle: "italic",
                      fontWeight: 500,
                    }}
                  >
                    {convertToFloat2FixedNumber(
                      (convertToNumber(object.SL_PTM_TBTT_EXEC) /
                        convertToNumberMauso(object.SL_PTM_TBTT_PLAN)) *
                        100
                    )}
                    {"%"}
                  </td>

                  {/* TBTS thoại */}
                  <td style={{ textAlign: "center" }}>
                    {object.SL_TBTS_PTM_THOAI_PLAN ?? 0}
                  </td>
                  <td
                    style={{
                      textAlign: "center",
                      fontStyle: "italic",
                    }}
                  >
                    {object.SL_TBTS_PTM_THOAI_EXEC ?? 0}
                  </td>
                  <td
                    className={
                      convertToNumber(object.SL_TBTS_PTM_THOAI_PLAN) === 0
                        ? convertToNumber(object.SL_TBTS_PTM_THOAI_EXEC) > 0
                          ? "bg-green"
                          : ""
                        : convertToFloat2FixedNumber(
                            (convertToNumber(object.SL_TBTS_PTM_THOAI_EXEC) /
                              convertToNumberMauso(
                                object.SL_TBTS_PTM_THOAI_PLAN
                              )) *
                              100
                          ) >=
                          convertToFloat2FixedNumber(
                            SL_TBTS_PTM_THOAI_PROCESS * 100
                          )
                        ? "bg-green"
                        : "bg-red"
                    }
                    style={{
                      textAlign: "center",
                      fontStyle: "italic",
                      fontWeight: 500,
                    }}
                  >
                    {convertToFloat2FixedNumber(
                      (convertToNumber(object.SL_TBTS_PTM_THOAI_EXEC) /
                        convertToNumberMauso(object.SL_TBTS_PTM_THOAI_PLAN)) *
                        100
                    )}
                    {"%"}
                  </td>
                  {/* M2M */}
                  <td style={{ textAlign: "center" }}>
                    {object.SL_TB_PTM_M2M_PLAN ?? 0}
                  </td>
                  <td
                    style={{
                      textAlign: "center",
                      fontStyle: "italic",
                    }}
                  >
                    {object.SL_TB_PTM_M2M_EXEC ?? 0}
                  </td>
                  <td
                    className={
                      convertToNumber(object.SL_TB_PTM_M2M_PLAN) === 0
                        ? convertToNumber(object.SL_TB_PTM_M2M_EXEC) > 0
                          ? "bg-green"
                          : ""
                        : convertToFloat2FixedNumber(
                            (convertToNumber(object.SL_TB_PTM_M2M_EXEC) /
                              convertToNumberMauso(object.SL_TB_PTM_M2M_PLAN)) *
                              100
                          ) >=
                          convertToFloat2FixedNumber(
                            SL_TB_PTM_M2M_PROCESS * 100
                          )
                        ? "bg-green"
                        : "bg-red"
                    }
                    style={{
                      textAlign: "center",
                      fontStyle: "italic",
                      fontWeight: 500,
                    }}
                  >
                    {convertToFloat2FixedNumber(
                      (convertToNumber(object.SL_TB_PTM_M2M_EXEC) /
                        convertToNumberMauso(object.SL_TB_PTM_M2M_PLAN)) *
                        100
                    )}{" "}
                    {"%"}
                  </td>
                  {/* SAYMEE */}
                  <td style={{ textAlign: "center" }}>
                    {object.TB_PTM_SAYMEE_PLAN ?? 0}
                  </td>
                  <td
                    style={{
                      textAlign: "center",
                      fontStyle: "italic",
                    }}
                  >
                    {object.TB_PTM_SAYMEE_EXEC ?? 0}
                  </td>
                  <td
                    className={
                      convertToNumber(object.TB_PTM_SAYMEE_PLAN) === 0
                        ? convertToNumber(object.TB_PTM_SAYMEE_EXEC) > 0
                          ? "bg-green"
                          : ""
                        : convertToFloat2FixedNumber(
                            (convertToNumber(object.TB_PTM_SAYMEE_EXEC) /
                              convertToNumberMauso(object.TB_PTM_SAYMEE_PLAN)) *
                              100
                          ) >=
                          convertToFloat2FixedNumber(
                            TB_PTM_SAYMEE_PROCESS * 100
                          )
                        ? "bg-green"
                        : "bg-red"
                    }
                    style={{
                      textAlign: "center",
                      fontStyle: "italic",
                      fontWeight: 500,
                    }}
                  >
                    {convertToFloat2FixedNumber(
                      (convertToNumber(object.TB_PTM_SAYMEE_EXEC) /
                        convertToNumberMauso(object.TB_PTM_SAYMEE_PLAN)) *
                        100
                    )}{" "}
                    {"%"}
                  </td>
                  {/* Fiber */}
                  <td style={{ textAlign: "center" }}>
                    {object.TB_PTM_FIBER_PLAN ?? 0}
                  </td>
                  <td
                    style={{
                      textAlign: "center",
                      fontStyle: "italic",
                    }}
                  >
                    {object.TB_PTM_FIBER_EXEC ?? 0}
                  </td>
                  <td
                    className={
                      convertToNumber(object.TB_PTM_FIBER_PLAN) === 0
                        ? convertToNumber(object.TB_PTM_FIBER_EXEC) > 0
                          ? "bg-green"
                          : ""
                        : convertToFloat2FixedNumber(
                            (convertToNumber(object.TB_PTM_FIBER_EXEC) /
                              convertToNumberMauso(object.TB_PTM_FIBER_PLAN)) *
                              100
                          ) >=
                          convertToFloat2FixedNumber(TB_PTM_FIBER_PROCESS * 100)
                        ? "bg-green"
                        : "bg-red"
                    }
                    style={{
                      textAlign: "center",
                      fontStyle: "italic",
                      fontWeight: 500,
                    }}
                  >
                    {convertToFloat2FixedNumber(
                      (convertToNumber(object.TB_PTM_FIBER_EXEC) /
                        convertToNumberMauso(object.TB_PTM_FIBER_PLAN)) *
                        100
                    )}{" "}
                    {"%"}
                  </td>
                  {/* Doanh thu dn mới */}
                  <td></td>
                  <td style={{ textAlign: "center" }}></td>
                  <td></td>

                  {/* Doanh thu tổng đài */}
                  <td></td>
                  <td style={{ textAlign: "center" }}></td>
                  <td></td>

                  {/* Doanh thu sms brandname */}
                  <td></td>
                  <td></td>
                  <td></td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={24} className="text-center fw-bold">
                  Đang tải dữ liệu...
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
