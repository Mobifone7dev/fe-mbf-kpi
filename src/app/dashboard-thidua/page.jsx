import TableMobiAgri from "../../components/tableThidua/TableMobiAgri";
import TablePTMM2M from "../../components/tableThidua/TablePTMM2M";


function Page(props) {
  

  
  return (
    <div className="dashboard-thidua">
      <h3 className="mt-2 title">Dashboard thi đua 27/05 - 30/06</h3>
      <TableMobiAgri/>
      <TablePTMM2M/>
     
    </div>
  );
}

export default Page;
