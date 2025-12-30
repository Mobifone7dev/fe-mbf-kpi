"use client";
import moment from "moment";
import { useEffect, useState } from "react";
import * as XLSX from "xlsx";
import {
  createManualApiListDLAEmployee,
  createManualApiListDLAEmployeeExec,
} from "../../lib/api";
import { useRef } from "react";

const KPI_MAPPING = [
  { key: "SL_PTM_TBTT", excel: "TBTT PTM" },
  { key: "SL_TBTS_PTM_THOAI", excel: "TBTS THOẠI" },
  { key: "SL_TB_PTM_M2M", excel: "M2M" },
  { key: "TB_PTM_SAYMEE", excel: "SAYMEE" },
  { key: "TB_PTM_FIBER", excel: "FIBER" },
  { key: "SL_TB_C2C", excel: "Số lượng thuê bao PTM qua kênh C2C" },
  { key: "TYLE_GD_C2C", excel: "Tỷ lệ PS GD C2C (%)" },
  { key: "TB_C90N_C99N", excel: "KẾ HOẠCH C90N/C99N" },
  { key: "TB_GIA_HAN_DON_KY", excel: "KẾ HOẠCH GIA HẠN LẠI GÓI ĐƠN KỲ" },
  { key: "TB_TBTS_C1C", excel: "KẾ HOẠCH TBTS C1C" },
  { key: "TB_TBTT_C1C", excel: "KẾ HOẠCH TBTT C1C" },
  { key: "DTHU_N_1", excel: "KẾ HOẠCH DT BÁN GÓI N-1" },
];
const KPI_MAPPING_TH = [
  { key: "TB_C90N_C99N", excel: "THỰC HIỆN C90N/C99N" },
  { key: "TB_GIA_HAN_DON_KY", excel: "THỰC HIỆN GIA HẠN LẠI GÓI ĐƠN KỲ" },
  { key: "TB_TBTS_C1C", excel: "THỰC HIỆN TBTS C1C" },
  { key: "TB_TBTT_C1C", excel: "THỰC HIỆN TBTT C1C" },
  { key: "DTHU_N_1", excel: "THỰC HIỆN DT BÁN GÓI N-1" },
];
export default function ImportKpiExcelGDV(props) {
  const [data, setData] = useState([]);
  const [dataTH, setDataTH] = useState([]);
  const [loadingCreateKpi, setLoadingCreateKpi] = useState(false);
  const fileInputRef = useRef(null);
  const [selectedDate, setSelectedDate] = useState(props.selectedDate);
  useEffect(() => {
    if (props.selectedDate) {
      setSelectedDate(props.selectedDate);
    }
  }, [props.selectedDate]);

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

      const THANG = new Date(selectedDate); // hoặc truyền từ UI
      THANG.setDate(1); // đảm bảo ngày đầu tháng
      const formattedData = jsonData.flatMap((row) => {
        return KPI_MAPPING.map((kpi) => ({
          TEN_CHI_TIEU: kpi.key,
          EMP_CODE: row["EMP_CODE"],
          THUC_HIEN: Number(row[kpi.excel] ?? 0),
        }));
      });

      setData(formattedData);

      const formattedDataTH = jsonData.flatMap((row) => {
        return KPI_MAPPING_TH.map((kpi) => ({
          TEN_CHI_TIEU: kpi.key,
          EMP_CODE: row["EMP_CODE"],
          SHOP_CODE: row["SHOP_CODE"],
          AREA: row["ĐƠN VỊ"],
          THUC_HIEN: Number(row[kpi.excel] ?? 0),
        }));
      });
      console.log("formattedDataTH", formattedDataTH);
      setDataTH(formattedDataTH);

      try {
        const info = {
          month: moment(selectedDate).format("DD-MM-YYYY"),
          kpiList: formattedData,
        };
        const infoTH = {
          month: moment(selectedDate).format("DD-MM-YYYY"),
          kpiList: formattedDataTH,
        };
        props.loading(true);
        props.error();
        const result = await createManualApiListDLAEmployee(info);
        const result1 = await createManualApiListDLAEmployeeExec(infoTH);

        // ✅ RESET FILE INPUT
        if (fileInputRef.current) {
          fileInputRef.current.value = "";
        }
        if (result.status !== 400 && result1.status !== 400) {
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
