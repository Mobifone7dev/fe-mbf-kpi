import Reatc, { useEffect, useState, forwardRef } from "react";
// eslint-disable-next-line react/display-name
const TableDashboardT12 = forwardRef((props, ref) => {
  const [isSticky, setIsSticky] = useState(false);
  useEffect(() => {}, []);
  return (
    <div className="dashboard-kpi-dla">
      <h4 className="m4-4">Dashboard MobiFone Đăk Lăk</h4>
      <div className="table-kpi-dla">
        {/* <h4 className="text-center">Bảng Kpi tháng 08</h4> */}
        <table className=" table-responsive  align-middle gs-0 gy-3">
          <thead className={`table-head ${isSticky && "is-sticky"}`}>
            <tr>
              <th colSpan={2} className="th-title th-color-yellow">
                Tiến độ cần thiết để đảm bảo KH tháng
              </th>
              <th className="th-title-per th-color-yellow">6.5%</th>
              <th className="th-title-dis">{`Thành phố Buôn Ma Thuột`}</th>
              <th className="th-title-dis">Huyện Krông Pắc</th>
              <th className="th-title-dis">Huyện Ea Kar</th>
              <th className="th-title-dis">Thị xã Buôn Hồ</th>
              <th className="th-title-dis">{`Huyện Cư M'gar`}</th>
              <th className="th-title-dis">{`Huyện Cư Kuin`}</th>
              <th className="th-title-dis">{`Huyện Ea H'leo`}</th>
              <th className="th-title-dis">Huyện Krông Năng</th>
              <th className="th-title-dis">{`Huyện Krông Búk`}</th>
              <th className="th-title-dis">{`Huyện Krông Bông + Huyện Lắk`}</th>
              <th className="th-title-dis">{`Huyện Krông A Na`}</th>
              <th className="th-title-dis">{`Huyện Buôn Đôn + Huyện Ea Súp`}</th>
              <th className="th-title-dis">{`Huyện M'ĐrắK`}</th>
              <th className="th-title-dis">{`Thành phố Tuy Hoà`}</th>
              <th className="th-title-dis">{`Huyện Đông Hoà`}</th>
              <th className="th-title-dis">{`Huyện Phú Hoà + Huyện Sơn Hòa`}</th>
              <th className="th-title-dis">{`Huyện Tây Hoà + Huyện Sông Hinh`}</th>
              <th className="th-title-dis">{`Thị xã Sông Cầu`}</th>
              <th className="th-title-dis">{`Huyện Tuy An +Huyện Đồng Xuân`}</th>
              <th className="th-title-dis" rowSpan={2}>{`TT.KDGPS`}</th>
              <th className="th-title-dis" rowSpan={2}>{`Tổng`}</th>
            </tr>
            <tr>
              <th className="th-stt th-color-brow">STT</th>
              <th className="th-color-brow">Nhiệm vụ</th>
              <th className="th-color-brow">Nội dung</th>
              <th>DLA_T01</th>
              <th>DLA_T02</th>
              <th>DLA_T03</th>
              <th>DLA_T04</th>
              <th>DLA_T05</th>
              <th>DLA_T06</th>
              <th>DLA_T07</th>
              <th>DLA_T08</th>
              <th>DLA_T09</th>
              <th>DLA_T10</th>
              <th>DLA_T11</th>
              <th>DLA_T12</th>
              <th>DLA_T13</th>
              <th>DLA_D01</th>
              <th>DLA_D02</th>
              <th>DLA_D03</th>
              <th>DLA_D04</th>
              <th>DLA_D05</th>
              <th>DLA_D06</th>
            </tr>
          </thead>
          <tbody className={`table-body ${isSticky && "is-sticky"}`}>
            <tr>
              <td colSpan={24} className=" td-title td-color-blue">
                I. Viễn cảnh tài chính
              </td>
            </tr>
            <tr>
              <td className="td-title-sub" rowSpan={3}>
                1
              </td>
              <td className="td-title" rowSpan={3}>
                Doanh thu Hạ tầng số
              </td>
              <td className="td-title-sub">KH</td>
              <td>100</td>
              <td>100</td>
              <td>100</td>
              <td>100</td>
              <td>100</td>
              <td>100</td>
              <td>100</td>
              <td>100</td>
              <td>100</td>
              <td>100</td>
              <td>100</td>
              <td>100</td>
              <td>100</td>
              <td>100</td>
              <td>100</td>
              <td>100</td>
              <td>100</td>
              <td>100</td>
              <td>100</td>
              <td>100</td>
              <td>100</td>
            </tr>
            <tr>
              <td className="td-title-sub">TH</td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
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
            <tr>
              <td className="td-title-sub">%TH</td>
              <td>100%</td>
              <td>100%</td>
              <td>100%</td>
              <td>100%</td>
              <td>100%</td>
              <td>100%</td>
              <td>100%</td>
              <td>100%</td>
              <td>100%</td>
              <td>100%</td>
              <td>100%</td>
              <td>100%</td>
              <td>100%</td>
              <td>100%</td>
              <td>100%</td>
              <td>100%</td>
              <td>100%</td>
              <td>100%</td>
              <td>100%</td>
              <td>100%</td>
              <td>100%</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
});
export default TableDashboardT12;
