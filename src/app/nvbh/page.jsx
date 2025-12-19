"use client";
import { useEffect, useState } from "react";
import { handleSearchEmployeeByEmpcode } from "../../lib/api";
import LoadingComponent from "@components/loading/LoadingComponent";
export default function Page(props) {
  const [employeeList, setEmployeeList] = useState([]);
  const [loadingEmp, setLoadingEmp] = useState(false);
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

  return (
    <div className="dashboard-nvbh">
      <h4 className="text-center">Bảng Kpi thực hiện bởi NVBH</h4>
      <div className="table-kpi">
        <table className="table-fixed align-middle gs-0 gy-3">
          <thead className={`table-head`}>
            <tr>
              <th className="th-title th-color-yellow position-relative">{`Tên giao dịch viên`}</th>
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
