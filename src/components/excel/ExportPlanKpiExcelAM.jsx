import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

export const exportKpiPlanExcelAM = (finalData = []) => {
  // 1. Header Excel
  const header = [
    "ĐƠN VỊ",
    "EMP_CODE",
    "TÊN NV",

    "TBTT PTM",
    "TBTS THOẠI",
    "M2M",
    "SAYMEE",
    "FIBER",

    "Số lượng thuê bao PTM qua kênh C2C",
    "Tỷ lệ PS GD C2C (%)",
  ];

  // 2. Data rows
  const rows = finalData.map((item) => [
    item.AREA ?? "",
    item.EMP_CODE ?? "",
    item.EMP_NAME ?? "",
    item.SL_PTM_TBTT_PLAN ?? 0,
    item.SL_TBTS_PTM_THOAI_PLAN ?? 0,
    item.SL_TB_PTM_M2M_PLAN ?? 0,
    item.TB_PTM_SAYMEE_PLAN ?? 0,
    item.TB_PTM_FIBER_PLAN ?? 0,
  ]);

  // 3. Tạo worksheet
  const ws = XLSX.utils.aoa_to_sheet([header, ...rows]);

  // 4. Tạo workbook
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, "KE_HOACH_KPI");

  // 5. Xuất file
  const wbout = XLSX.write(wb, {
    bookType: "xlsx",
    type: "array",
  });

  saveAs(
    new Blob([wbout], { type: "application/octet-stream" }),
    "KE_HOACH_KPI_NV_PLAN.xlsx"
  );
};
