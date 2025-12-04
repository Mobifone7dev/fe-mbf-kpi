import Reatc, { useEffect, useState, forwardRef } from "react";
// eslint-disable-next-line react/display-name
const TableDashboardT12 = forwardRef((props, ref) => {
  const [isSticky, setIsSticky] = useState(false);
  useEffect(() => {}, []);
  return (
    <div>
      <h4 className="m4-4">Dashboard MobiFone Đăk Lăk</h4>
      <div className="table-kpi">
        {/* <h4 className="text-center">Bảng Kpi tháng 08</h4> */}
        <table className=" table-responsive  align-middle gs-0 gy-3">
          <thead>
            <tr className={`table-head ${isSticky && "is-sticky"}`}></tr>
          </thead>
          <tbody className={` ${isSticky && "is-sticky"}`}>
            <tr></tr>
          </tbody>
        </table>
      </div>
    </div>
  );
});
export default TableDashboardT12;
