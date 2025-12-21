"use client";
import { useEffect, useState } from "react";
import {
  handleSearchEmployeeByEmpcode,
  handleGetExecKpiDLAEmployee,
} from "../../lib/api";
import LoadingComponent from "@components/loading/LoadingComponent";
import { changeFormatDateFirstDateInMonth } from "../../until/functions";
export default function Page(props) {
  const [employeeList, setEmployeeList] = useState([]);
  const [loadingEmp, setLoadingEmp] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [EXEC_SL_TB_C2C, SET_EXEC_SL_TB_C2C] = useState({});
  const [EXEC_TYLE_GD_C2C, SET_EXEC_TYLE_GD_C2C] = useState({});
  const [EXEC_SL_PTM_TBTT, SET_EXEC_SL_PTM_TBTT] = useState({});
  const [EXEC_SL_TBTS_PTM_THOAI, SET_EXEC_SL_TBTS_PTM_THOAI] = useState({});
  const [EXEC_SL_TB_PTM_M2M, SET_EXEC_SL_TB_PTM_M2M] = useState({});
  const [EXEC_TB_PTM_SAYMEE, SET_EXEC_TB_PTM_SAYMEE] = useState({});
  const [EXEC_TB_PTM_FIBER, SET_EXEC_TB_PTM_FIBER] = useState({});
  const TEN_CHI_TIEU_ORDER = [
    "SL_TB_PTM_M2M",
    "SL_PTM_TBTT_NDS",
    "TB_PTM_SAYMEE",
  ];
  const [execData, setExecData] = useState({});
  useEffect(() => {
    getEmployee();
  }, []);

  const getEmployee = async () => {
    setLoadingEmp(true);
    const result = await handleSearchEmployeeByEmpcode("%MBP%");
    const tempRes = await result.json();
    if (tempRes) {
      setEmployeeList(tempRes.result);
    }
    setLoadingEmp(false);
  };
  const getKpiEmployee = async () => {
    setLoadingEmp(true);
    const date = changeFormatDateFirstDateInMonth(selectedDate);
    const result = await handleGetExecKpiDLAEmployee(date, "%MBP%");
    const tempRes = await result.json();
    if (tempRes && tempRes.result && tempRes.result.length > 0) {
      console.log("tempRes", tempRes);
      //   setExecData(result)(tempRes);
      const result = mergeEmployeeWithKpi(employeeList, tempRes.result);
      console.log("result", result);
      setExecData(result);
    }

    setLoadingEmp(false);
  };
  useEffect(() => {
    if (employeeList && employeeList.length > 0) {
      getKpiEmployee();
    }
  }, [employeeList]);
  const buildEmpInfoMap = (empList) => {
    return empList.reduce((acc, emp) => {
      acc[emp.EMP_CODE] = emp;
      return acc;
    }, {});
  };

  const buildEmployeeMap = (employeeList) => {
    return employeeList.reduce((acc, emp) => {
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


  const resetExec = () => {
    SET_EXEC_SL_TB_C2C({});
    SET_EXEC_TYLE_GD_C2C({});
    SET_EXEC_SL_PTM_TBTT({});
    SET_EXEC_SL_TBTS_PTM_THOAI({});
    SET_EXEC_SL_TB_PTM_M2M({});
    SET_EXEC_TB_PTM_SAYMEE({});
    SET_EXEC_TB_PTM_FIBER({});
  };

  return (
    <div className="dashboard-nvbh">
      <h4 className="text-center">Bảng Kpi thực hiện bởi NVBH</h4>
      <div className="table-kpi">
        <table className="table-fixed align-middle gs-0 gy-3">
          <thead className={`table-head`}>
            <tr>
              <th className="th-title th-color-yellow position-relative">{`Mã nhân viên`}</th>
              <th className="th-title th-color-yellow position-relative">
                {`Tên nhân viên`}
                <br></br>
                {`bán hàng`}
              </th>
              <th className="th-title th-color-yellow position-relative">{`Vùng`}</th>
              <th className="th-title th-color-yellow position-relative">
                <>
                  TB PTM mạng
                  <br />
                  MobiFone (tổng)
                </>
              </th>{" "}
              <th className="th-title th-color-yellow position-relative">{`TBTT PTM`}</th>
              <th className="th-title th-color-yellow position-relative">
                {`TBTS PTM`}
                <br></br>
                {`(thoại)`}
              </th>
              <th className="th-title th-color-yellow position-relative">
                {`TBTS PTM `}
                <br></br>
                {`M2M`}
              </th>
              <th className="th-title th-color-yellow position-relative">
                {`TBTS PTM`}
                <br></br>
                {` SAYMEE`}
              </th>
              <th className="th-title th-color-yellow position-relative">
                {`TBTS PTM`}
                <br></br>
                {` MobiFiber`}
              </th>
              <th className="th-title th-color-yellow position-relative">{`TB MNP đến`}</th>
              <th className="th-title th-color-yellow position-relative">
                <>
                  Tỷ lệ thuê bao
                  <br />
                  gia hạn gói dài kỳ
                </>
              </th>
              <th className="th-title th-color-yellow position-relative">{`Doanh thu gói tập N-1`}</th>
            </tr>
          </thead>
          <tbody>
            {execData && execData.length > 0 ? (
              execData.map((object, i) => (
                <tr key={i}>
                  <td
                    style={{ textAlign: "left", fontWeight: 400 }}
                    className="td-stt  fix-col-1"
                  >
                    {object.EMP_CODE}
                  </td>
                  <td
                    style={{ textAlign: "left", fontWeight: 400 }}
                    className="td-stt   fix-col-2"
                  >
                    {object.EMP_NAME}
                  </td>
                  <td
                    style={{ textAlign: "left", fontWeight: 400 }}
                    className=""
                  >
                    {object.AREA}
                  </td>

                  <td></td>
                  <td></td>
                  <td></td>
                  <td style={{ textAlign: "center" }}>
                    {object.SL_TB_PTM_M2M ? object.SL_TB_PTM_M2M : 0}
                  </td>
                  <td style={{ textAlign: "center" }}>
                    {object.SL_TB_PTM_SAYMEE ? object.SL_TB_PTM_SAYMEE : 0}
                  </td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={12} className="text-center fw-bold">
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
