import TableMobiAgri from "../../components/tableThidua/TableMobiAgri";
import TablePTMM2M from "../../components/tableThidua/TablePTMM2M";
import { TableSum } from "../../components/tableThidua/TableSum";


function Page(props) {
  

  
  return (
    <div className="dashboard-thidua">
      <h3  style={{color: 'red'}} className="mt-5 title text-center ">Dashboard thi đua 27/05 - 30/06</h3>
      <TableSum/>
      <h4 className="mt-5 mb-5 text-center">Bảng chi tiết từng chỉ tiêu thi đua</h4>
      <TableMobiAgri/>
      <TablePTMM2M/>
     
    </div>
  );
}

export default Page;
