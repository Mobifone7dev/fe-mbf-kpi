"use client";
import moment from "moment";
import { useState } from "react";
import * as XLSX from "xlsx";
import { createManualApiListDLAEmployee } from "../../lib/api";
import { useRef } from "react";

const KPI_MAPPING = [
  { key: "SL_PTM_TBTT", excel: "TBTT PTM" },
  { key: "SL_TBTS_PTM_THOAI", excel: "TBTS THOẠI" },
  { key: "SL_TB_PTM_M2M", excel: "M2M" },
  { key: "TB_PTM_SAYMEE", excel: "SAYMEE" },
  { key: "TB_PTM_FIBER", excel: "FIBER" },
  { key: "SL_TB_C2C", excel: "Số lượng thuê bao PTM qua kênh C2C" },
  { key: "TYLE_GD_C2C", excel: "Tỷ lệ PS GD C2C (%)" },
  { key: "TB_MNP_DEN", excel: "Thuê bao MNP đến" },
];
export default function ImportKpiPlanExcel(props) {
  const [data, setData] = useState([]);
  const [loadingCreateKpi, setLoadingCreateKpi] = useState(false);
  const fileInputRef = useRef(null);

  const handleImportExcel = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();

    reader.onload = async (evt) => {
      const binaryStr = evt.target.result;
      const workbook = XLSX.read(binaryStr, { type: "binary" });

      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];

      // Convert Excel → JSON
      const jsonData = XLSX.utils.sheet_to_json(worksheet, {
        defval: null, // tránh undefined
      });

      const THANG = new Date("2025-01-01"); // hoặc truyền từ UI
      THANG.setDate(1); // đảm bảo ngày đầu tháng
      const formattedData = jsonData.flatMap((row) => {
        return KPI_MAPPING.map((kpi) => ({
          TEN_CHI_TIEU: kpi.key,
          EMP_CODE: row["EMP_CODE"],
          THUC_HIEN: Number(row[kpi.excel] ?? 0),
        }));
      });
      
      setData(formattedData);

      try {
        const info = {
          month: moment(new Date()).format("DD-MM-YYYY"),
          kpiList: formattedData,
        };
        props.loading(true);
        props.error();
        const result = await createManualApiListDLAEmployee(info);
        // ✅ RESET FILE INPUT
        if (fileInputRef.current) {
          fileInputRef.current.value = "";
        }
        if (result.status !== 400) {
          props.error();
          props.loading(false);
          props.isRefesh(true);
        } else {
          props.error("Kiểm tra lại format và số liệu trong file");
        }
      } catch (error) {
        console.log("error", error);
        props.loading(false);
        props.error("Kiểm tra lại format và số liệu trong file");
        // ✅ RESET FILE INPUT
        if (fileInputRef.current) {
          fileInputRef.current.value = "";
        }
      }
    };

    reader.readAsBinaryString(file);
  };

  return (
    <div className="d-flex flex-start align-items-center  ">
      <label className="form-label fw-semibold mx-2">
        Upload file kế hoạch KPI
      </label>
      <input
        type="file"
        accept=".xlsx,.xls"
        onChange={handleImportExcel}
        className="form-control w-50"
        ref={fileInputRef}
      />
    </div>
  );
}
