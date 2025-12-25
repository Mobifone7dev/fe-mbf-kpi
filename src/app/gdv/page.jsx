"use client";
import { useEffect, useState } from "react";
import {
  handleSearchEmployeeByEmpcode,
  handleGetExecKpiDLAEmployee,
  handleGetPlanKpiDLAEmployee,
} from "../../lib/api";
import LoadingComponent from "@components/loading/LoadingComponent";
import {
  changeFormatDateFirstDateInMonth,
  convertToNumber,
  convertToFloat2FixedNumber,
  convertToNumberMauso,
} from "../../until/functions";
import { useRouter } from "next/navigation";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import ExportKpiPlanExcel from "../../components/excel/ExportPlanKpiExcel";
import ImportPlanKpiExcel from "../../components/excel/ImportPlanKpiExcel";
import { setLazyProp } from "next/dist/server/api-utils";
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
    const result = await handleSearchEmployeeByEmpcode("%C7%");
    const tempRes = await result.json();
    if (tempRes) {
      setEmployeeList(tempRes.result);
    }
    setLoading(false);
  };
  const getExecKpiEmployee = async () => {
    setLoading(true);
    const date = changeFormatDateFirstDateInMonth(selectedDate);
    const result = await handleGetExecKpiDLAEmployee(date, "%C7%");
    const tempRes = await result.json();
    if (tempRes && tempRes.result && tempRes.result.length > 0) {
      const result = mergeEmployeeWithKpi(employeeList, tempRes.result);
      setExecData(result);
    }

    setLoading(false);
  };
  const getPlanKpiEmployee = async () => {
    setLoading(true);
    const date = changeFormatDateFirstDateInMonth(selectedDate);
    const result = await handleGetPlanKpiDLAEmployee(date, "%C7%");
    const tempRes = await result.json();
    if (tempRes && tempRes.result && tempRes.result.length > 0) {
      const result = mergeEmployeeWithPlanKpi(employeeList, tempRes.result);
      setPlanData(result);
    }

    setLoading(false);
  };
  useEffect(() => {
    if (employeeList && employeeList.length > 0) {
      getPlanKpiEmployee();
      getExecKpiEmployee();
    }
  }, [employeeList]);

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
  const buildEmpInfoMap = (empList) => {
    return empList.reduce((acc, emp) => {
      acc[emp.EMP_CODE] = emp;
      return acc;
    }, {});
  };

  function mergeEmployeeWithKpi(employeeList, kpiList) {
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
          AREA: kpi.AREA,
          AREA_CODE: emp.AREA_CODE ?? kpi.AREA,
          EMP_CODE: empCode,
          EMP_NAME: emp.EMP_NAME ?? null,
          SHOP_CODE: emp.SHOP_CODE ?? kpi.SHOP_CODE,
          SHOP_NAME: emp.SHOP_NAME ? emp.SHOP_NAME.trim() : null,
          WARD_CODE: emp.WARD_CODE ?? null,
          LAST_DATE: kpi.LAST_DATE,
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
          AREA_CODE: emp.AREA_CODE ?? kpi.AREA,
          EMP_CODE: empCode,
          EMP_NAME: emp.EMP_NAME ?? null,
          SHOP_CODE: emp.SHOP_CODE ?? kpi.SHOP_CODE,
          SHOP_NAME: emp.SHOP_NAME ? emp.SHOP_NAME.trim() : null,
          WARD_CODE: emp.WARD_CODE ?? null,
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
        "AREA_CODE",
        "EMP_CODE",
        "EMP_NAME",
        "SHOP_CODE",
        "SHOP_NAME",
        "WARD_CODE",
        "LAST_DATE",
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
            "AREA_CODE",
            "EMP_CODE",
            "EMP_NAME",
            "SHOP_CODE",
            "SHOP_NAME",
            "WARD_CODE",
            "LAST_DATE",
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
  return (
    <div className="dashboard-nvbh">
      <h4 className="text-center my-4">
        {`THEO DÕI KẾT QUẢ THỰC HIỆN THEO NGÀY KHỐI NVBH THÁNG ${
          selectedDate.getMonth() + 1
        }`}
      </h4>
      <div className="flex flex-start my-2 border p-2">
        <ExportKpiPlanExcel employeeList={employeeList}></ExportKpiPlanExcel>
        <ImportPlanKpiExcel
          employeeList={employeeList}
          loading={(e) => {
            console.log("set loading emp", e);
            if (e) {
              setLoading(e);
            }
          }}
          error={(e) => {
            setErrorImport(e);
          }}
          isRefesh={(e) => {
            if (e) {
              getPlanKpiEmployee();
              getExecKpiEmployee();
            }
          }}
        ></ImportPlanKpiExcel>
        <span style={{ fontStyle: "italic", color: "red", paddingTop: "5px" }}>
          P/s: Export file kết hoạch để nhập chỉnh sửa chỉ tiêu và import lại để
          cập nhật chỉ tiêu
        </span>
        <br></br>
        <span style={{ color: "red" }}>{errorImport}</span>
      </div>
      <div className="table-kpi-nvbh">
        <table className="table-fixed align-middle gs-0 gy-3">
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
                className="th-title bg_blue-light position-relative"
              >{`TB MNP đến`}</th>
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
                    {object.EMP_CODE}
                  </td>
                  <td
                    style={{ textAlign: "left", fontWeight: 600 }}
                    className="fix-col-3"
                  >
                    {object.EMP_NAME}
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

                  {/* Doanh thu */}
                  <td></td>
                  <td></td>
                  <td></td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={30} className="text-center fw-bold">
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
