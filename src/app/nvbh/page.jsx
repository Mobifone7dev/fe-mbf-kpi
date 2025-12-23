"use client";
import { useEffect, useState } from "react";
import {
  handleSearchEmployeeByEmpcode,
  handleGetExecKpiDLAEmployee,
} from "../../lib/api";
import LoadingComponent from "@components/loading/LoadingComponent";
import {
  changeFormatDateFirstDateInMonth,
  convertToNumber,
  convertToFloat2FixedNumber
} from "../../until/functions";
import { useRouter } from "next/navigation";
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
  const  [user, setUser] = useState({});
  const router =  useRouter();
    useEffect(() => {
    const user = localStorage.getItem("user");
    console.log("user session", user);
    if (user) {
      setUser(user);
    } else {
      router.replace("/login");
    }
  }, []);

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
      const result = mergeEmployeeWithKpi(employeeList, tempRes.result);
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



  return (
    <div className="dashboard-nvbh">
      <h4 className="text-center my-4">
        {`THEO DÕI KẾT QUẢ THỰC HIỆN THEO NGÀY KHỐI NVBH THÁNG ${
          selectedDate.getMonth() + 1
        }`}
      </h4>
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
                className="th-title bg_pink-light position-relative"
              >{`Số lượng TB PTM qua kênh C2C`}</th>
              <th
                colSpan={3}
                className="th-title bg_grey-light position-relative"
              >
                {`Tỷ lệ PS GD C2C`}
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
              <th style={{ fontStyle: "italic" }}>KH</th>
              <th style={{ fontStyle: "italic" }}>TH</th>
              <th style={{ fontStyle: "italic" }}>%TH</th>
              <th style={{ fontStyle: "italic" }}>KH</th>
              <th style={{ fontStyle: "italic" }}>TH</th>
              <th style={{ fontStyle: "italic" }}>%TH</th>
            </tr>
          </thead>
          <tbody>
            {execData && execData.length > 0 ? (
              execData.map((object, i) => (
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
                    style={{ textAlign: "center", fontWeight: 600 }}
                    className="fix-col-3"
                  >
                    {object.EMP_NAME}
                  </td>

                  <td></td>
                  <td style={{ textAlign: "center" }}>
                    {object.SL_PTM_TBTT ?? 0}
                  </td>
                  <td></td>

                  {/* TBTS thoại */}
                  <td></td>
                  <td style={{ textAlign: "center" }}>
                    {object.SL_TBTS_PTM_THOAI ?? 0}
                  </td>
                  <td></td>

                  {/* M2M */}
                  <td></td>
                  <td style={{ textAlign: "center" }}>
                    {object.SL_TB_PTM_M2M ?? 0}
                  </td>
                  <td></td>

                  {/* SAYMEE */}
                  <td></td>
                  <td style={{ textAlign: "center" }}>
                    {object.TB_PTM_SAYMEE ?? 0}
                  </td>
                  <td></td>

                  {/* Fiber */}
                  <td></td>
                  <td style={{ textAlign: "center" }}>
                    {object.TB_PTM_FIBER ?? 0}
                  </td>
                  <td></td>

                  {/* sl tm C2C */}
                  <td></td>
                  <td style={{ textAlign: "center" }}>
                    {object.SL_TB_C2C ?? 0}
                  </td>
                  <td></td>

                  {/* Tỷ lệ gia hạn */}
                  <td></td>
                  <td style={{ textAlign: "center" }}>
                    {convertToFloat2FixedNumber(
                      convertToNumber(object.TYLE_GD_C2C) * 100
                    )}
                    {"%"}
                  </td>
                  <td></td>

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
