import TableCloud from "../../components/tableThidua/TableCloud";
import TableIOT from "../../components/tableThidua/TableIOT";
import TableMobiAgri from "../../components/tableThidua/TableMobiAgri";
import TablePTMM2M from "../../components/tableThidua/TablePTMM2M";
import { TableSum } from "../../components/tableThidua/TableSum";


function Page(props) {
  

  
  return (
    <div className="dashboard-thidua">
      <h3  style={{color: 'red'}} className="mt-5 title text-center ">Dashboard thi đua 30/06</h3>
      <TableSum/>
      <h4 className="mt-5 mb-5 text-center">Bảng chi tiết từng chỉ tiêu thi đua</h4>
        <TableCloud/>
      <TableIOT/>
      <TableMobiAgri/>
      <TablePTMM2M/>
    
     
    </div>
  );
}

export default Page;
