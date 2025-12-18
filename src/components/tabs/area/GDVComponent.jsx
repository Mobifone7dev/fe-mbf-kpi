export default function GDVComponent(props) {
  return (
    <div className="table-kpi-gdv">
      {/* <h4 className="text-center">Bảng Kpi tháng 08</h4> */}
      <table className=" table-fixed align-middle gs-0 gy-3">
        <thead className={`table-head`}>
          <tr>
            <th className="th-title th-color-yellow position-relative">{`Tên giao dịch viên`}</th>
            <th className="th-title th-color-yellow position-relative">{`Mã nhân viên`}</th>
            <th className="th-title th-color-yellow position-relative">{`TB PTM mạng MobiFone (tổng)`}</th>
            <th className="th-title th-color-yellow position-relative">{`TBTT PTM`}</th>
            <th className="th-title th-color-yellow position-relative">{`TBTS PTM (thoại)`}</th>
            <th className="th-title th-color-yellow position-relative">{`TBTS PTM M2M`}</th>
            <th className="th-title th-color-yellow position-relative">{`TBTS PTM SAYMEE`}</th>
            <th className="th-title th-color-yellow position-relative">{`TBTS PTM MobiFiber`}</th>
            <th className="th-title th-color-yellow position-relative">{`TB MNP đến`}</th>
            <th className="th-title th-color-yellow position-relative">{`Tỷ lệ thuê bao gia hạn gói dài kỳ`}</th>
            <th className="th-title th-color-yellow position-relative">{`Doanh thu gói tập N-1`}</th>
          </tr>
          
        </thead>
      </table>
    </div>
  );
}
