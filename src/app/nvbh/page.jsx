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
    if (tempRes) {
      setExecData(tempRes);
    }
  
    setLoadingEmp(false);
  };
  useEffect(() => {
    if (employeeList&&employeeList.length > 0) {
      getKpiEmployee();
    }
  }, [employeeList]);

   useEffect(() => {
    if (execData && execData.result?.length > 0) {
      execData.result.forEach((object, index) => {
       
        if (object["TEN_CHI_TIEU"] == "SL_TB_C2C") {
          SET_EXEC_SL_TB_C2C(object);
        }
        if (object["TEN_CHI_TIEU"] == "TYLE_GD_C2C") {
          SET_EXEC_TYLE_GD_C2C(object);
        }
        if (object["TEN_CHI_TIEU"] == "DTHU_FIBER") {
          SET_EXEC_DTHU_FIBER(object);
        }
        if (object["TEN_CHI_TIEU"] == "SL_TBTS_PTM_THOAI") {
          SET_EXEC_SL_TBTS_PTM_THOAI(object);
        }
        if (object["TEN_CHI_TIEU"] == "SL_TB_PTM_M2M") {
          SET_EXEC_SL_TB_PTM_M2M(object);
        }
        if (object["TEN_CHI_TIEU"] == "TB_PTM_SAYMEE") {
          SET_EXEC_TB_PTM_SAYMEE(object);
        }
        if (object["TEN_CHI_TIEU"] == "TB_PTM_FIBER") {
          SET_EXEC_TB_PTM_FIBER(object);
        }

        if (object["TEN_CHI_TIEU"] == "SL_PTM_TBTT") {
          SET_EXEC_SL_PTM_TBTT(object);
        }
    
      });
    }
  }, [execData]);

   const resetExec = ()=> {
      SET_EXEC_SL_TB_C2C({});
      SET_EXEC_TYLE_GD_C2C({});
      SET_EXEC_SL_PTM_TBTT({});
      SET_EXEC_SL_TBTS_PTM_THOAI({});
      SET_EXEC_SL_TB_PTM_M2M({});
      SET_EXEC_TB_PTM_SAYMEE({});
      SET_EXEC_TB_PTM_FIBER({});
    }


  return (
    <div className="dashboard-nvbh">
      <h4 className="text-center">Bảng Kpi thực hiện bởi NVBH</h4>
      <div className="table-kpi">
        <table className="table-fixed align-middle gs-0 gy-3">
          <thead className={`table-head`}>
            <tr>
              <th className="th-title th-color-yellow position-relative">{`Tên nhân viên bán hàng`}</th>
              <th className="th-title th-color-yellow position-relative">{`Mã nhân viên`}</th>
              <th className="th-title th-color-yellow position-relative">
                <>
                  TB PTM mạng
                  <br />
                  MobiFone (tổng)
                </>
              </th>{" "}
              <th className="th-title th-color-yellow position-relative">{`TBTT PTM`}</th>
              <th className="th-title th-color-yellow position-relative">{`TBTS PTM (thoại)`}</th>
              <th className="th-title th-color-yellow position-relative">{`TBTS PTM M2M`}</th>
              <th className="th-title th-color-yellow position-relative">{`TBTS PTM SAYMEE`}</th>
              <th className="th-title th-color-yellow position-relative">{`TBTS PTM MobiFiber`}</th>
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
            {employeeList && employeeList.length > 0 ? (
              employeeList.map((o, i) => (
                <tr key={i}>
                  <td className="td-stt  fix-col-1">{o.EMP_CODE}</td>
                  <td className="td-stt   fix-col-2">{o.EMP_NAME}</td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={11} className="text-center fw-bold">
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
