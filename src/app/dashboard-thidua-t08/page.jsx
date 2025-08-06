import TableLTT from "../../components/tableThidua/TableLTT";
import TableCamera from "../../components/tableThidua/TableCamera";

import {TableSumT08 }from "../../components/tableThidua/TableSumT08";


function Page(props) {
  

  
  return (
    <div className="dashboard-thidua">
      <h3  style={{color: 'red'}} className="mt-5 title text-center ">Dashboard thi đua T08</h3>
      <TableSumT08/>
      <h4 className="mt-5 mb-5 text-center">Bảng chi tiết từng chỉ tiêu thi đua</h4>
        <TableLTT/>
        <TableCamera/>
    </div>
  );
}

export default Page;
