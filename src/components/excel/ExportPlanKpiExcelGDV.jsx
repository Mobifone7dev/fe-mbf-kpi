import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

export const exportKpiPlanExcelGDV = (finalData = []) => {
  // 1. Header Excel
  const header = [
    "ĐƠN VỊ",
    "SHOP_CODE",
    "EMP_CODE",
    "TÊN NV",
    "TBTT PTM",
    "TBTS THOẠI",
    "M2M",
    "SAYMEE",
    "FIBER",
    "KẾ HOẠCH C90N/C99N",
    "THỰC HIỆN C90N/C99N",
    "KẾ HOẠCH GIA HẠN LẠI GÓI ĐƠN KỲ",
    "THỰC HIỆN GIA HẠN LẠI GÓI ĐƠN KỲ",
    "KẾ HOẠCH TBTS C1C",
    "THỰC HIỆN TBTS C1C",
    "KẾ HOẠCH TBTT C1C",
    "THỰC HIỆN TBTT C1C",
    "KẾ HOẠCH DT BÁN GÓI N-1",
    "THỰC HIỆN DT BÁN GÓI N-1"
  ];

  // 2. Data rows
  const rows = finalData.map((item) => [
    item.AREA ?? "",
    item.SHOP_CODE ?? "",
    item.EMP_CODE ?? "",
    item.EMP_NAME ?? "",

    item.SL_PTM_TBTT_PLAN ?? 0,
    item.SL_TBTS_PTM_THOAI_PLAN ?? 0,
    item.SL_TB_PTM_M2M_PLAN ?? 0,
    item.TB_PTM_SAYMEE_PLAN ?? 0,
    item.TB_PTM_FIBER_PLAN ?? 0,
    item.PLAN_TB_C90N_C99N ?? 0,
    item.EXEC_TB_C90N_C99N ?? 0,
    item.PLAN_TB_GIA_HAN_DON_KY ?? 0,
    item.EXEC_TB_GIA_HAN_DON_KY ?? 0,
    item.PLAN_TB_TBTS_C1C ?? 0,
    item.EXEC_TB_TBTS_C1C ?? 0,
    item.PLAN_TB_TBTT_C1C ?? 0,
    item.EXEC_TB_TBTT_C1C ?? 0,
    item.PLAN_DTHU_N_1 ?? 0,
    item.EXEC_DTHU_N_1 ?? 0,

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
