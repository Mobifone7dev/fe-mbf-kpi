"use client";

import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import { useEffect, useState } from "react";

export default function ExportKpiPlanExcel(props) {
  const [employeeList, setEmployeeList] = useState(props.employeeList);
  useEffect(() => {
    if (props.employeeList && props.employeeList.length > 0) {
      setEmployeeList(props.employeeList);
    }
  }, [props.employeeList]);
  const exportKpiPlanExcel = (employeeList) => {
    const data = employeeList.map((emp, index) => ({
      STT: index + 1,
      "Mã nhân viên": emp.EMP_CODE,
      "Tên nhân viên": emp.EMP_NAME,
      "TBTT PTM": "",
      "TBTS Thoại": "",
      M2M: "",
      SAYMEE: "",
      FIBER: "",
      "Số lượng thuê bao PTM qua kênh C2C": "",
      "Tỷ lệ PS GD C2C (%)": "",
      "Thuê bao MNP đến": "",
    }));

    const worksheet = XLSX.utils.json_to_sheet(data);

    // Set độ rộng cột
    worksheet["!cols"] = [
      { wch: 5 },
      { wch: 15 },
      { wch: 22 },
      { wch: 12 },
      { wch: 14 },
      { wch: 8 },
      { wch: 10 },
      { wch: 10 },
      { wch: 35 },
      { wch: 20 },
      { wch: 18 },
    ];

    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "KE_HOACH_KPI");

    const excelBuffer = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "array",
    });

    const blob = new Blob([excelBuffer], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    });

    saveAs(
      blob,
      `KE_HOACH_KPI_${
        new Date().getMonth() + 1
      }_${new Date().getFullYear()}.xlsx`
    );
  };

  return (
    <button
      className="btn btn-success me-2"
      onClick={() => exportKpiPlanExcel(employeeList)}
    >
      Export Excel kế hoạch KPI
    </button>
  );
}
