import Reatc, {
  useEffect,
  useState,
  forwardRef,
  useImperativeHandle,
} from "react";
import LoadingComponent from "@components/loading/LoadingComponent";
import Link from "next/link";
import {
  convertToFloat2Fixed,
  getFormattedDate,
  convertToFloat2FixedNumber,
  daysInMonth,
  changeFormatDateFirstDateInMonth,
  convertToNumberMauso,
  convertToNumber,
} from "../../until/functions.js";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

// eslint-disable-next-line react/display-name
const TableDashboardT12 = forwardRef((props, ref) => {
  const [PLAN_DTHU_TKC_HTS, SET_PLAN_DTHU_TKC_HTS] = useState({});
  const [PLAN_DTHU_GPS, SET_PLAN_DTHU_GPS] = useState({});
  const [PLAN_SL_TB_C2C, SET_PLAN_SL_TB_C2C] = useState({});
  const [PLAN_DTHU_SAYMEE, SET_PLAN_DTHU_SAYMEE] = useState({});

  const [PLAN_TYLE_GD_C2C, SET_PLAN_TYLE_GD_C2C] = useState({});
  const [PLAN_SL_PTM_TBTT, SET_PLAN_SL_PTM_TBTT] = useState({});
  const [PLAN_SL_TBTS_PTM_THOAI, SET_PLAN_SL_TBTS_PTM_THOAI] = useState({});
  const [PLAN_SL_TB_PTM_M2M, SET_PLAN_SL_TB_PTM_M2M] = useState({});
  const [PLAN_TB_PTM_SAYMEE, SET_PLAN_TB_PTM_SAYMEE] = useState({});
  const [PLAN_TB_PTM_FIBER, SET_PLAN_TB_PTM_FIBER] = useState({});
  const [PLAN_TI_LE_GIA_HAN_GOI_DAI_KY, SET_PLAN_TI_LE_GIA_HAN_GOI_DAI_KY] =
    useState({});

  // exec
  const [EXEC_DTHU_TKC_HTS, SET_EXEC_DTHU_TKC_HTS] = useState({});
  const [EXEC_DTHU_GPS_KHCN, SET_EXEC_DTHU_GPS_KHCN] = useState({});
  const [EXEC_DTHU_GPS_KHDN, SET_EXEC_DTHU_GPS_KHDN] = useState({});
  const [EXEC_DTHU_GPS, SET_EXEC_DTHU_GPS] = useState({});
  const [EXEC_DTHU_SAYMEE, SET_EXEC_DTHU_SAYMEE] = useState({});

  const [EXEC_SL_TB_C2C, SET_EXEC_SL_TB_C2C] = useState({});
  const [EXEC_TYLE_GD_C2C, SET_EXEC_TYLE_GD_C2C] = useState({});
  const [EXEC_SL_PTM_TBTT, SET_EXEC_SL_PTM_TBTT] = useState({});
  const [EXEC_SL_TBTS_PTM_THOAI, SET_EXEC_SL_TBTS_PTM_THOAI] = useState({});
  const [EXEC_SL_TB_PTM_M2M, SET_EXEC_SL_TB_PTM_M2M] = useState({});
  const [EXEC_TB_PTM_SAYMEE, SET_EXEC_TB_PTM_SAYMEE] = useState({});
  const [EXEC_TB_PTM_FIBER, SET_EXEC_TB_PTM_FIBER] = useState({});
  const [EXEC_DTHU_FIBER, SET_EXEC_DTHU_FIBER] = useState({});
  const [EXEC_TI_LE_GIA_HAN_GOI_DAI_KY, SET_EXEC_TI_LE_GIA_HAN_GOI_DAI_KY] =
    useState({});

  const [planData, setPlanData] = useState({});
  const [loadingPlan, setLoadingPlan] = useState(props.loadingPlan);
  const [execData, setExecData] = useState(props.execData);
  const [loadingExec, setLoadingExec] = useState(props.loadingExec);
  const [selectedDate, setSelectedDate] = useState(props.selectedDate);
  const [sumDateInMonth, setSumDateInMonth] = useState(props.sumDateInMonth);
  const processKPI =
    convertToNumber(new Date().getDate() / props.sumDateInMonth) * 100;

  useEffect(() => {
    setLoadingExec(props.loadingExec);
  }, [props.loadingExec]);

  useEffect(() => {
    setSelectedDate(props.selectedDate);
  }, [props.selectedDate]);
  useEffect(() => {
    setSumDateInMonth(props.sumDateInMonth);
  }, [props.sumDateInMonth]);

  useImperativeHandle(ref, () => ({
    resetPlan() {
      SET_PLAN_DTHU_TKC_HTS({});
      SET_PLAN_DTHU_GPS({});
      SET_PLAN_DTHU_SAYMEE({});
      SET_PLAN_SL_TB_C2C({});
      SET_PLAN_TYLE_GD_C2C({});
      SET_PLAN_SL_PTM_TBTT({});
      SET_PLAN_SL_TBTS_PTM_THOAI({});
      SET_PLAN_SL_TB_PTM_M2M({});
      SET_PLAN_TB_PTM_SAYMEE({});
      SET_PLAN_TB_PTM_FIBER({});
      SET_PLAN_TI_LE_GIA_HAN_GOI_DAI_KY({});
    },
    resetExec() {
      SET_EXEC_DTHU_TKC_HTS({});
      SET_EXEC_DTHU_GPS_KHDN({});
      SET_EXEC_DTHU_GPS({});
      SET_EXEC_DTHU_SAYMEE({});
      SET_EXEC_SL_TB_C2C({});
      SET_EXEC_TYLE_GD_C2C({});
      SET_EXEC_SL_PTM_TBTT({});
      SET_EXEC_SL_TBTS_PTM_THOAI({});
      SET_EXEC_SL_TB_PTM_M2M({});
      SET_EXEC_TB_PTM_SAYMEE({});
      SET_EXEC_TB_PTM_FIBER({});
      SET_EXEC_TI_LE_GIA_HAN_GOI_DAI_KY({});
    },
  }));
  useEffect(() => {
    if (planData.result && planData.result?.length > 0) {
      console.log("planData", planData);
      planData.result.forEach((object, index) => {
        if (object["TEN_CHI_TIEU"] == "DTHU_TKC_HTS") {
          SET_PLAN_DTHU_TKC_HTS(object);
        }

        if (object["TEN_CHI_TIEU"] == "DTHU_GPS") {
          SET_PLAN_DTHU_GPS(object);
        }
        if (object["TEN_CHI_TIEU"] == "DTHU_SAYMEE") {
          SET_PLAN_DTHU_SAYMEE(object);
        }

        if (object["TEN_CHI_TIEU"] == "SL_TB_C2C") {
          SET_PLAN_SL_TB_C2C(object);
        }
        if (object["TEN_CHI_TIEU"] == "TYLE_GD_C2C") {
          SET_PLAN_TYLE_GD_C2C(object);
        }
        if (object["TEN_CHI_TIEU"] == "SL_PTM_TBTT") {
          SET_PLAN_SL_PTM_TBTT(object);
        }
        if (object["TEN_CHI_TIEU"] == "SL_TBTS_PTM_THOAI") {
          SET_PLAN_SL_TBTS_PTM_THOAI(object);
        }
        if (object["TEN_CHI_TIEU"] == "SL_TB_PTM_M2M") {
          SET_PLAN_SL_TB_PTM_M2M(object);
        }
        if (object["TEN_CHI_TIEU"] == "TB_PTM_SAYMEE") {
          SET_PLAN_TB_PTM_SAYMEE(object);
        }
        if (object["TEN_CHI_TIEU"] == "TB_PTM_FIBER") {
          SET_PLAN_TB_PTM_FIBER(object);
        }
        if (object["TEN_CHI_TIEU"] == "TI_LE_GIA_HAN_GOI_DAI_KY") {
          SET_PLAN_TI_LE_GIA_HAN_GOI_DAI_KY(object);
        }
      });
    }
  }, [planData]);

  useEffect(() => {
    if (execData && execData.result?.length > 0) {
      execData.result.forEach((object, index) => {
        if (object["TEN_CHI_TIEU"] == "DTHU_TKC_HTS") {
          SET_EXEC_DTHU_TKC_HTS(object);
        }
        if (object["TEN_CHI_TIEU"] == "DTHU_GPS") {
          SET_EXEC_DTHU_GPS(object);
        }
        if (object["TEN_CHI_TIEU"] == "DTHU_SAYMEE") {
          SET_EXEC_DTHU_SAYMEE(object);
        }
        if (object["TEN_CHI_TIEU"] == "DTHU_GPS_KHCN") {
          SET_EXEC_DTHU_GPS_KHCN(object);
        }
        if (object["TEN_CHI_TIEU"] == "DTHU_GPS_KHDN") {
          SET_EXEC_DTHU_GPS_KHDN(object);
        }
        if (object["TEN_CHI_TIEU"] == "SL_TB_C2C") {
          SET_EXEC_SL_TB_C2C(object);
        }
        if (object["TEN_CHI_TIEU"] == "TYLE_GD_C2C") {
          SET_EXEC_TYLE_GD_C2C(object);
        }
        if (object["TEN_CHI_TIEU"] == "DTHU_FIBER") {
          SET_EXEC_DTHU_FIBER(object);
        }
        if (object["TEN_CHI_TIEU"] == "SL_TBTS_PTM_THOAI") {
          SET_EXEC_SL_TBTS_PTM_THOAI(object);
        }
        if (object["TEN_CHI_TIEU"] == "SL_TB_PTM_M2M") {
          SET_EXEC_SL_TB_PTM_M2M(object);
        }
        if (object["TEN_CHI_TIEU"] == "TB_PTM_SAYMEE") {
          SET_EXEC_TB_PTM_SAYMEE(object);
        }
        if (object["TEN_CHI_TIEU"] == "TB_PTM_FIBER") {
          SET_EXEC_TB_PTM_FIBER(object);
        }

        if (object["TEN_CHI_TIEU"] == "SL_PTM_TBTT") {
          SET_EXEC_SL_PTM_TBTT(object);
        }

        if (object["TEN_CHI_TIEU"] == "TI_LE_GIA_HAN_GOI_DAI_KY") {
          SET_EXEC_TI_LE_GIA_HAN_GOI_DAI_KY(object);
        }
      });
    }
  }, [execData]);
  useEffect(() => {
    setPlanData(props.planData);
  }, [props.planData]);
  useEffect(() => {
    setLoadingPlan(props.loadingPlan);
  }, [props.loadingPlan]);
  useEffect(() => {
    setExecData(props.execData);
  }, [props.execData]);
  const exportToExcel = () => {
    const table = document.getElementById("kpi-table");
    const workbook = XLSX.utils.table_to_book(table, {
      sheet: "KPI_DLA",
    });

    const excelBuffer = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "array",
    });

    const blob = new Blob([excelBuffer], {
      type: "application/octet-stream",
    });

    saveAs(blob, "bao_cao_kpi_dla.xlsx");
  };

  return (
    <div className="dashboard-kpi-dla">
      <div className="d-flex justify-content-between mb-3">
        <h4 className="m4-4">Dashboard MobiFone Đăk Lăk</h4>
        <button className="btn btn-primary" onClick={exportToExcel}>
          Export Excel
        </button>
      </div>
      <div className="table-kpi-dla">
        {/* <h4 className="text-center">Bảng Kpi tháng 08</h4> */}
        <table id="kpi-table" className=" table-fixed align-middle gs-0 gy-3">
          <colgroup>
            <col style={{ width: "40px" }} /> {/* STT */}
            <col style={{ width: "260px" }} /> {/* Nhiệm vụ */}
            <col style={{ width: "80px" }} /> {/* Nội dung */}
            {Array.from({ length: 22 }).map((_, i) => (
              <col key={i} style={{ width: "100px" }} />
            ))}
          </colgroup>
          <thead className={`table-head`}>
            <tr>
              <th
                colSpan={2}
                className="th-title th-color-yellow position-relative  "
              >
                <span
                  className="d-inline-flex align-items-center gap-1 tooltip-wrapper"
                  onMouseEnter={(e) => {
                    const tooltip =
                      e.currentTarget.querySelector(".custom-tooltip");

                    if (!tooltip) return;

                    const rect = e.currentTarget.getBoundingClientRect();

                    tooltip.style.top = rect.bottom + 6 + "px";
                    tooltip.style.left = rect.left + rect.width / 2 + "px";
                    tooltip.style.transform = "translateX(-50%)";
                  }}
                >
                  {`Tiến độ cần thiết để đảm bảo KH tháng`}
                  <span className="tooltip-icon">ℹ️</span>
                  <span className="custom-tooltip">
                    {"Tiến độ theo dõi daily"}
                  </span>
                </span>
              </th>
              <th className="th-title-per th-color-yellow ">
                {convertToFloat2Fixed(processKPI)} %
              </th>
              <th className="th-title-dis">
                <span
                  className="d-inline-flex align-items-center gap-1 tooltip-wrapper"
                  onMouseEnter={(e) => {
                    const tooltip =
                      e.currentTarget.querySelector(".custom-tooltip");

                    if (!tooltip) return;

                    const rect = e.currentTarget.getBoundingClientRect();

                    tooltip.style.top = rect.bottom + 6 + "px";
                    tooltip.style.left = rect.left + rect.width / 2 + "px";
                    tooltip.style.transform = "translateX(-50%)";
                  }}
                >
                  {`Vùng Buôn Ma Thuột`}
                  <span className="custom-tooltip">
                    {
                      "Xã Hòa Phú, Phường Buôn Ma Thuột,Phường Tân An,Phường Tân Lập,Phường Thành Nhất,Phường Ea Kao"
                    }
                  </span>
                </span>
              </th>
              <th className="th-title-dis">
                <span
                  className="d-inline-flex align-items-center gap-1 tooltip-wrapper"
                  onMouseEnter={(e) => {
                    const tooltip =
                      e.currentTarget.querySelector(".custom-tooltip");

                    if (!tooltip) return;

                    const rect = e.currentTarget.getBoundingClientRect();

                    tooltip.style.top = rect.bottom + 6 + "px";
                    tooltip.style.left = rect.left + rect.width / 2 + "px";
                    tooltip.style.transform = "translateX(-50%)";
                  }}
                >
                  {`Vùng Krông Pắc`}
                  <span className="custom-tooltip">
                    {
                      "xã Krông Pắc, xã Ea Knuếc,xã Tân Tiến,xã Ea Phê,xã Ea Kly,xã Vụ Bổn"
                    }
                  </span>
                </span>
              </th>
              <th className="th-title-dis">
                <span
                  className="d-inline-flex align-items-center gap-1 tooltip-wrapper"
                  onMouseEnter={(e) => {
                    const tooltip =
                      e.currentTarget.querySelector(".custom-tooltip");

                    if (!tooltip) return;

                    const rect = e.currentTarget.getBoundingClientRect();

                    tooltip.style.top = rect.bottom + 6 + "px";
                    tooltip.style.left = rect.left + rect.width / 2 + "px";
                    tooltip.style.transform = "translateX(-50%)";
                  }}
                >
                  {`Vùng Ea Kar`}
                  <span className="custom-tooltip">
                    {"xã Ea Kar,xã Ea Ô,xã Ea Knốp,xã Cư Yang,xã Ea Păl"}
                  </span>
                </span>
              </th>
              <th className="th-title-dis">
                <span
                  className="d-inline-flex align-items-center gap-1 tooltip-wrapper"
                  onMouseEnter={(e) => {
                    const tooltip =
                      e.currentTarget.querySelector(".custom-tooltip");

                    if (!tooltip) return;

                    const rect = e.currentTarget.getBoundingClientRect();

                    tooltip.style.top = rect.bottom + 6 + "px";
                    tooltip.style.left = rect.left + rect.width / 2 + "px";
                    tooltip.style.transform = "translateX(-50%)";
                  }}
                >
                  {`Vùng Buôn Hồ`}
                  <span className="custom-tooltip">
                    {"xã Ea Drông, Phường Buôn Hồ, Phường Cư Bao"}
                  </span>
                </span>
              </th>
              <th className="th-title-dis">
                <span
                  className="d-inline-flex align-items-center gap-1 tooltip-wrapper"
                  onMouseEnter={(e) => {
                    const tooltip =
                      e.currentTarget.querySelector(".custom-tooltip");

                    if (!tooltip) return;

                    const rect = e.currentTarget.getBoundingClientRect();

                    tooltip.style.top = rect.bottom + 6 + "px";
                    tooltip.style.left = rect.left + rect.width / 2 + "px";
                    tooltip.style.transform = "translateX(-50%)";
                  }}
                >
                  {`Vùng Cư M'gar`}
                  <span className="custom-tooltip">
                    {
                      "xã Ea Kiết, Xã Ea M’Droh, xã Quảng Phú, xã Cuôr Đăng, Xã Cư M’gar, xã Ea Tul"
                    }
                  </span>
                </span>
              </th>
              <th className="th-title-dis">
                <span
                  className="d-inline-flex align-items-center gap-1 tooltip-wrapper"
                  onMouseEnter={(e) => {
                    const tooltip =
                      e.currentTarget.querySelector(".custom-tooltip");

                    if (!tooltip) return;

                    const rect = e.currentTarget.getBoundingClientRect();

                    tooltip.style.top = rect.bottom + 6 + "px";
                    tooltip.style.left = rect.left + rect.width / 2 + "px";
                    tooltip.style.transform = "translateX(-50%)";
                  }}
                >
                  {`Vùng Cư Kuin`}
                  <span className="custom-tooltip">
                    {"xã Ea Ning, xã Dray Bhăng, xã Ea Ktur"}
                  </span>
                </span>
              </th>
              <th className="th-title-dis">
                <span
                  className="d-inline-flex align-items-center gap-1 tooltip-wrapper"
                  onMouseEnter={(e) => {
                    const tooltip =
                      e.currentTarget.querySelector(".custom-tooltip");

                    if (!tooltip) return;

                    const rect = e.currentTarget.getBoundingClientRect();

                    tooltip.style.top = rect.bottom + 6 + "px";
                    tooltip.style.left = rect.left + rect.width / 2 + "px";
                    tooltip.style.transform = "translateX(-50%)";
                  }}
                >
                  {`Vùng Ea H'leo`}
                  <span className="custom-tooltip">
                    {
                      "Xã Ea Khăl, xã Ea Drăng, xã Ea Wy, xã Ea Hiao, Xã Ea H’leo"
                    }
                  </span>
                </span>
              </th>
              <th className="th-title-dis">
                <span
                  className="d-inline-flex align-items-center gap-1 tooltip-wrapper"
                  onMouseEnter={(e) => {
                    const tooltip =
                      e.currentTarget.querySelector(".custom-tooltip");

                    if (!tooltip) return;

                    const rect = e.currentTarget.getBoundingClientRect();

                    tooltip.style.top = rect.bottom + 6 + "px";
                    tooltip.style.left = rect.left + rect.width / 2 + "px";
                    tooltip.style.transform = "translateX(-50%)";
                  }}
                >
                  {`Vùng Krông Năng`}
                  <span className="custom-tooltip">
                    {"xã Krông Năng, xã Dliê Ya, xã Tam Giang, xã Phú Xuân"}
                  </span>
                </span>
              </th>
              <th className="th-title-dis">
                <span
                  className="d-inline-flex align-items-center gap-1 tooltip-wrapper"
                  onMouseEnter={(e) => {
                    const tooltip =
                      e.currentTarget.querySelector(".custom-tooltip");

                    if (!tooltip) return;

                    const rect = e.currentTarget.getBoundingClientRect();

                    tooltip.style.top = rect.bottom + 6 + "px";
                    tooltip.style.left = rect.left + rect.width / 2 + "px";
                    tooltip.style.transform = "translateX(-50%)";
                  }}
                >
                  {`Vùng Krông Búk`}
                  <span className="custom-tooltip">
                    {"xã Pơng Drang, xã Krông Búk, xã Cư Pơng"}
                  </span>
                </span>
              </th>
              <th className="th-title-dis">
                <span
                  className="d-inline-flex align-items-center gap-1 tooltip-wrapper"
                  onMouseEnter={(e) => {
                    const tooltip =
                      e.currentTarget.querySelector(".custom-tooltip");

                    if (!tooltip) return;

                    const rect = e.currentTarget.getBoundingClientRect();

                    tooltip.style.top = rect.bottom + 6 + "px";
                    tooltip.style.left = rect.left + rect.width / 2 + "px";
                    tooltip.style.transform = "translateX(-50%)";
                  }}
                >
                  {`Vùng Krông Bông + Vùng Lắk`}
                  <span className="custom-tooltip">
                    {
                      "xã Hòa Sơn, xã Dang Kang, xã Krông Bông, xã Yang Mao, xã Cư Pui, xã Liên Sơn Lắk, xã Đắk Liêng, xã Nam Ka, xã Đắk Phơi, xã Krông Nô"
                    }
                  </span>
                </span>
              </th>
              <th className="th-title-dis">
                <span
                  className="d-inline-flex align-items-center gap-1 tooltip-wrapper"
                  onMouseEnter={(e) => {
                    const tooltip =
                      e.currentTarget.querySelector(".custom-tooltip");

                    if (!tooltip) return;

                    const rect = e.currentTarget.getBoundingClientRect();

                    tooltip.style.top = rect.bottom + 6 + "px";
                    tooltip.style.left = rect.left + rect.width / 2 + "px";
                    tooltip.style.transform = "translateX(-50%)";
                  }}
                >
                  {`Vùng Krông A Na`}
                  <span className="custom-tooltip">
                    {"xã Krông Ana, xã Dur Kmăl, xã Ea Na"}
                  </span>
                </span>
              </th>
              <th className="th-title-dis">
                <span
                  className="d-inline-flex align-items-center gap-1 tooltip-wrapper"
                  onMouseEnter={(e) => {
                    const tooltip =
                      e.currentTarget.querySelector(".custom-tooltip");

                    if (!tooltip) return;

                    const rect = e.currentTarget.getBoundingClientRect();

                    tooltip.style.top = rect.bottom + 6 + "px";
                    tooltip.style.left = rect.left + rect.width / 2 + "px";
                    tooltip.style.transform = "translateX(-50%)";
                  }}
                >
                  {`Vùng Buôn Đôn + Vùng Ea Súp`}
                  <span className="custom-tooltip">
                    {
                      "xã Ea Wer, xã Ea Nuôl, xã Buôn Đôn, xã Ea Súp, xã Ea Rốk, xã Ea Bung, xã Ia Lốp, xã Ia Rvê"
                    }
                  </span>
                </span>
              </th>
              <th className="th-title-dis">
                <span
                  className="d-inline-flex align-items-center gap-1 tooltip-wrapper"
                  onMouseEnter={(e) => {
                    const tooltip =
                      e.currentTarget.querySelector(".custom-tooltip");

                    if (!tooltip) return;

                    const rect = e.currentTarget.getBoundingClientRect();

                    tooltip.style.top = rect.bottom + 6 + "px";
                    tooltip.style.left = rect.left + rect.width / 2 + "px";
                    tooltip.style.transform = "translateX(-50%)";
                  }}
                >
                  {`Vùng M'ĐrắK`}
                  <span className="custom-tooltip">
                    {
                      "Xã M’Drắk, xã Ea Riêng, Xã Cư M’ta, xã Krông Á, xã Cư Prao, xã Ea Trang"
                    }
                  </span>
                </span>
              </th>
              <th className="th-title-dis">
                <span
                  className="d-inline-flex align-items-center gap-1 tooltip-wrapper"
                  onMouseEnter={(e) => {
                    const tooltip =
                      e.currentTarget.querySelector(".custom-tooltip");

                    if (!tooltip) return;

                    const rect = e.currentTarget.getBoundingClientRect();

                    tooltip.style.top = rect.bottom + 6 + "px";
                    tooltip.style.left = rect.left + rect.width / 2 + "px";
                    tooltip.style.transform = "translateX(-50%)";
                  }}
                >
                  {`Vùng Tuy Hoà`}
                  <span className="custom-tooltip">
                    {"Phường Bình Kiến, Phường Phú Yên, Phường Tuy Hòa"}
                  </span>
                </span>
              </th>
              <th className="th-title-dis">
                <span
                  className="d-inline-flex align-items-center gap-1 tooltip-wrapper"
                  onMouseEnter={(e) => {
                    const tooltip =
                      e.currentTarget.querySelector(".custom-tooltip");

                    if (!tooltip) return;

                    const rect = e.currentTarget.getBoundingClientRect();

                    tooltip.style.top = rect.bottom + 6 + "px";
                    tooltip.style.left = rect.left + rect.width / 2 + "px";
                    tooltip.style.transform = "translateX(-50%)";
                  }}
                >
                  {`Vùng Đông Hoà`}
                  <span className="custom-tooltip">
                    {"xã Hòa Xuân, Phường Đông Hòa, Phường Hòa Hiệp"}
                  </span>
                </span>
              </th>
              <th className="th-title-dis">
                <span
                  className="d-inline-flex align-items-center gap-1 tooltip-wrapper"
                  onMouseEnter={(e) => {
                    const tooltip =
                      e.currentTarget.querySelector(".custom-tooltip");

                    if (!tooltip) return;

                    const rect = e.currentTarget.getBoundingClientRect();

                    tooltip.style.top = rect.bottom + 6 + "px";
                    tooltip.style.left = rect.left + rect.width / 2 + "px";
                    tooltip.style.transform = "translateX(-50%)";
                  }}
                >
                  {`Vùng Phú Hoà + Vùng Sơn Hòa`}
                  <span className="custom-tooltip">
                    {
                      "xã Vân Hòa, xã Tây Sơn, xã Suối Trai, xã Sơn Hòa, xã Phú Hòa 2, xã Phú Hòa 1"
                    }
                  </span>
                </span>
              </th>
              <th className="th-title-dis">
                <span
                  className="d-inline-flex align-items-center gap-1 tooltip-wrapper"
                  onMouseEnter={(e) => {
                    const tooltip =
                      e.currentTarget.querySelector(".custom-tooltip");

                    if (!tooltip) return;

                    const rect = e.currentTarget.getBoundingClientRect();

                    tooltip.style.top = rect.bottom + 6 + "px";
                    tooltip.style.left = rect.left + rect.width / 2 + "px";
                    tooltip.style.transform = "translateX(-50%)";
                  }}
                >
                  {`Vùng Tây Hoà + Vùng Sông Hinh`}
                  <span className="custom-tooltip">
                    {
                      "xã Hòa Mỹ, xã Tây Hòa,xã Sơn Thành, xã Ea Bá,xã Ea Ly,xã Đức Bình,xã Sông Hinh"
                    }
                  </span>
                </span>
              </th>
              <th className="th-title-dis">
                <span
                  className="d-inline-flex align-items-center gap-1 tooltip-wrapper"
                  onMouseEnter={(e) => {
                    const tooltip =
                      e.currentTarget.querySelector(".custom-tooltip");

                    if (!tooltip) return;

                    const rect = e.currentTarget.getBoundingClientRect();

                    tooltip.style.top = rect.bottom + 6 + "px";
                    tooltip.style.left = rect.left + rect.width / 2 + "px";
                    tooltip.style.transform = "translateX(-50%)";
                  }}
                >
                  {`Vùng Sông Cầu`}
                  <span className="custom-tooltip">
                    {
                      "xã Xuân Thọ, Phường Xuân Đài, xã Xuân Cảnh, xã Xuân Lộc, Phường Sông Cầu"
                    }
                  </span>
                </span>
              </th>
              <th className="th-title-dis">
                <span
                  className="d-inline-flex align-items-center gap-1 tooltip-wrapper"
                  onMouseEnter={(e) => {
                    const tooltip =
                      e.currentTarget.querySelector(".custom-tooltip");

                    if (!tooltip) return;

                    const rect = e.currentTarget.getBoundingClientRect();

                    tooltip.style.top = rect.bottom + 6 + "px";
                    tooltip.style.left = rect.left + rect.width / 2 + "px";
                    tooltip.style.transform = "translateX(-50%)";
                  }}
                >
                  {`Vùng Tuy An +Vùng Đồng Xuân`}
                  <span className="custom-tooltip">
                    {
                      "xã Tuy An Tây,xã Tuy An Bắc, xã Tuy An Nam, xã Tuy An Đông,xã Ô Loan,xã Phú Mỡ,xã Xuân Lãnh,xã Xuân Phước,xã Đồng Xuân"
                    }
                  </span>
                </span>
              </th>
              <th className="th-title-dis" rowSpan={2}>{`TT.KDVT`}</th>
              <th className="th-title-dis" rowSpan={2}>{`TT.KDGPS`}</th>
              <th className="th-title-dis" rowSpan={2}>{`Ngày cập nhật`}</th>

              {/* <th className="th-title-dis" rowSpan={2}>{`Tổng`}</th> */}
            </tr>

            <tr>
              <th className="th-stt th-color-brow">STT</th>
              <th className="th-color-brow ">Nhiệm vụ</th>
              <th className="th-color-brow ">Nội dung</th>
              <th>
                <Link href={`/areas/DLA_T01`}>DLA_T01</Link>
              </th>
              <th>
                <Link href={`/areas/DLA_T02`}>DLA_T02</Link>
              </th>
              <th>
                <Link href={`/areas/DLA_T03`}>DLA_T03</Link>
              </th>
              <th>
                <Link href={`/areas/DLA_T04`}>DLA_T04</Link>
              </th>
              <th>
                <Link href={`/areas/DLA_T05`}>DLA_T05</Link>
              </th>
              <th>
                <Link href={`/areas/DLA_T06`}>DLA_T06</Link>
              </th>
              <th>
                <Link href={`/areas/DLA_T07`}>DLA_T07</Link>
              </th>
              <th>
                <Link href={`/areas/DLA_T08`}>DLA_T08</Link>
              </th>
              <th>
                <Link href={`/areas/DLA_T09`}>DLA_T09</Link>
              </th>
              <th>
                <Link href={`/areas/DLA_T010`}>DLA_T10</Link>
              </th>
              <th>
                <Link href={`/areas/DLA_T11`}>DLA_T11</Link>
              </th>
              <th>
                <Link href={`/areas/DLA_T12`}>DLA_T12</Link>
              </th>
              <th>
                <Link href={`/areas/DLA_T13`}>DLA_T13</Link>
              </th>
              <th>
                <Link href={`/areas/DLA_D01`}>DLA_D01</Link>
              </th>
              <th>
                <Link href={`/areas/DLA_D02`}>DLA_D02</Link>
              </th>
              <th>
                <Link href={`/areas/DLA_D03`}>DLA_D03</Link>
              </th>
              <th>
                <Link href={`/areas/DLA_D04`}>DLA_D04</Link>
              </th>
              <th>
                <Link href={`/areas/DLA_D05`}>DLA_D05</Link>
              </th>
              <th>
                <Link href={`/areas/DLA_D06`}>DLA_D06</Link>
              </th>
            </tr>
          </thead>
          <tbody className={`table-body`}>
            <tr>
              <td
                colSpan={25}
                className=" td-title td-color-yellow"
                style={{ fontWeight: 500 }}
              >
                I. Viễn cảnh tài chính
              </td>
            </tr>
            <tr>
              <td
                className="td-stt td-title-center td-stt fix-col-1"
                rowSpan={3}
              >
                1
              </td>
              <td className="td-title fw-bold td-content fix-col-2" rowSpan={3}>
                Doanh thu Hạ tầng số{" "}
                <span style={{ fontStyle: "italic" }}>(triệu đồng)</span>
              </td>
              <td className="td-title-center fix-col-3">KH</td>
              <td>
                {" "}
                {loadingPlan ? (
                  <LoadingComponent />
                ) : PLAN_DTHU_TKC_HTS.DLA_T01 ? (
                  convertToFloat2Fixed(PLAN_DTHU_TKC_HTS.DLA_T01)
                ) : (
                  ""
                )}
              </td>
              <td>
                {" "}
                {loadingPlan ? (
                  <LoadingComponent />
                ) : PLAN_DTHU_TKC_HTS.DLA_T02 ? (
                  convertToFloat2Fixed(PLAN_DTHU_TKC_HTS.DLA_T02)
                ) : (
                  ""
                )}
              </td>
              <td>
                {" "}
                {loadingPlan ? (
                  <LoadingComponent />
                ) : PLAN_DTHU_TKC_HTS.DLA_T03 ? (
                  convertToFloat2Fixed(PLAN_DTHU_TKC_HTS.DLA_T03)
                ) : (
                  ""
                )}
              </td>
              <td>
                {" "}
                {loadingPlan ? (
                  <LoadingComponent />
                ) : PLAN_DTHU_TKC_HTS.DLA_T04 ? (
                  convertToFloat2Fixed(PLAN_DTHU_TKC_HTS.DLA_T04)
                ) : (
                  ""
                )}
              </td>
              <td>
                {" "}
                {loadingPlan ? (
                  <LoadingComponent />
                ) : PLAN_DTHU_TKC_HTS.DLA_T05 ? (
                  convertToFloat2Fixed(PLAN_DTHU_TKC_HTS.DLA_T05)
                ) : (
                  ""
                )}
              </td>
              <td>
                {" "}
                {loadingPlan ? (
                  <LoadingComponent />
                ) : PLAN_DTHU_TKC_HTS.DLA_T06 ? (
                  convertToFloat2Fixed(PLAN_DTHU_TKC_HTS.DLA_T06)
                ) : (
                  ""
                )}
              </td>
              <td>
                {" "}
                {loadingPlan ? (
                  <LoadingComponent />
                ) : PLAN_DTHU_TKC_HTS.DLA_T07 ? (
                  convertToFloat2Fixed(PLAN_DTHU_TKC_HTS.DLA_T07)
                ) : (
                  ""
                )}
              </td>
              <td>
                {" "}
                {loadingPlan ? (
                  <LoadingComponent />
                ) : PLAN_DTHU_TKC_HTS.DLA_T08 ? (
                  convertToFloat2Fixed(PLAN_DTHU_TKC_HTS.DLA_T08)
                ) : (
                  ""
                )}
              </td>
              <td>
                {" "}
                {loadingPlan ? (
                  <LoadingComponent />
                ) : PLAN_DTHU_TKC_HTS.DLA_T09 ? (
                  convertToFloat2Fixed(PLAN_DTHU_TKC_HTS.DLA_T09)
                ) : (
                  ""
                )}
              </td>
              <td>
                {" "}
                {loadingPlan ? (
                  <LoadingComponent />
                ) : PLAN_DTHU_TKC_HTS.DLA_T10 ? (
                  convertToFloat2Fixed(PLAN_DTHU_TKC_HTS.DLA_T10)
                ) : (
                  ""
                )}
              </td>
              <td>
                {" "}
                {loadingPlan ? (
                  <LoadingComponent />
                ) : PLAN_DTHU_TKC_HTS.DLA_T11 ? (
                  convertToFloat2Fixed(PLAN_DTHU_TKC_HTS.DLA_T11)
                ) : (
                  ""
                )}
              </td>
              <td>
                {" "}
                {loadingPlan ? (
                  <LoadingComponent />
                ) : PLAN_DTHU_TKC_HTS.DLA_T12 ? (
                  convertToFloat2Fixed(PLAN_DTHU_TKC_HTS.DLA_T12)
                ) : (
                  ""
                )}
              </td>
              <td>
                {" "}
                {loadingPlan ? (
                  <LoadingComponent />
                ) : PLAN_DTHU_TKC_HTS.DLA_T13 ? (
                  convertToFloat2Fixed(PLAN_DTHU_TKC_HTS.DLA_T13)
                ) : (
                  ""
                )}
              </td>
              <td>
                {" "}
                {loadingPlan ? (
                  <LoadingComponent />
                ) : PLAN_DTHU_TKC_HTS.DLA_D01 ? (
                  convertToFloat2Fixed(PLAN_DTHU_TKC_HTS.DLA_D01)
                ) : (
                  ""
                )}
              </td>
              <td>
                {" "}
                {loadingPlan ? (
                  <LoadingComponent />
                ) : PLAN_DTHU_TKC_HTS.DLA_D02 ? (
                  convertToFloat2Fixed(PLAN_DTHU_TKC_HTS.DLA_D02)
                ) : (
                  ""
                )}
              </td>
              <td>
                {" "}
                {loadingPlan ? (
                  <LoadingComponent />
                ) : PLAN_DTHU_TKC_HTS.DLA_D03 ? (
                  convertToFloat2Fixed(PLAN_DTHU_TKC_HTS.DLA_D03)
                ) : (
                  ""
                )}
              </td>
              <td>
                {" "}
                {loadingPlan ? (
                  <LoadingComponent />
                ) : PLAN_DTHU_TKC_HTS.DLA_D04 ? (
                  convertToFloat2Fixed(PLAN_DTHU_TKC_HTS.DLA_D04)
                ) : (
                  ""
                )}
              </td>
              <td>
                {" "}
                {loadingPlan ? (
                  <LoadingComponent />
                ) : PLAN_DTHU_TKC_HTS.DLA_D05 ? (
                  convertToFloat2Fixed(PLAN_DTHU_TKC_HTS.DLA_D05)
                ) : (
                  ""
                )}
              </td>
              <td>
                {" "}
                {loadingPlan ? (
                  <LoadingComponent />
                ) : PLAN_DTHU_TKC_HTS.DLA_D06 ? (
                  convertToFloat2Fixed(PLAN_DTHU_TKC_HTS.DLA_D06)
                ) : (
                  ""
                )}
              </td>
              <td>
                {" "}
                {loadingPlan ? (
                  <LoadingComponent />
                ) : PLAN_DTHU_TKC_HTS.TTKDVT ? (
                  convertToFloat2Fixed(PLAN_DTHU_TKC_HTS.TTKDVT)
                ) : (
                  ""
                )}
              </td>
              <td>
                {" "}
                {loadingPlan ? (
                  <LoadingComponent />
                ) : PLAN_DTHU_TKC_HTS.TTKDGPS ? (
                  convertToFloat2Fixed(PLAN_DTHU_TKC_HTS.TTKDGPS)
                ) : (
                  ""
                )}
              </td>
              <td rowSpan={3}>
                {EXEC_DTHU_TKC_HTS.LAST_DATE
                  ? getFormattedDate(new Date(EXEC_DTHU_TKC_HTS.LAST_DATE))
                  : ""}
              </td>
            </tr>
            <tr>
              <td className="td-title-center td-kh fix-col-3">TH</td>
              <td>
                {loadingExec ? (
                  <LoadingComponent />
                ) : (
                  convertToFloat2Fixed(
                    (EXEC_DTHU_FIBER.DLA_T01
                      ? EXEC_DTHU_FIBER.DLA_T01 / 1000000
                      : 0) +
                      (EXEC_DTHU_TKC_HTS.DLA_T01
                        ? EXEC_DTHU_TKC_HTS.DLA_T01 / 1000000
                        : 0)
                  )
                )}
              </td>
              <td>
                {loadingExec ? (
                  <LoadingComponent />
                ) : (
                  convertToFloat2Fixed(
                    (EXEC_DTHU_FIBER.DLA_T02
                      ? EXEC_DTHU_FIBER.DLA_T02 / 1000000
                      : 0) +
                      (EXEC_DTHU_TKC_HTS.DLA_T02
                        ? EXEC_DTHU_TKC_HTS.DLA_T02 / 1000000
                        : 0)
                  )
                )}
              </td>
              <td>
                {loadingExec ? (
                  <LoadingComponent />
                ) : (
                  convertToFloat2Fixed(
                    (EXEC_DTHU_FIBER.DLA_T03
                      ? EXEC_DTHU_FIBER.DLA_T03 / 1000000
                      : 0) +
                      (EXEC_DTHU_TKC_HTS.DLA_T03
                        ? EXEC_DTHU_TKC_HTS.DLA_T03 / 1000000
                        : 0)
                  )
                )}
              </td>
              <td>
                {loadingExec ? (
                  <LoadingComponent />
                ) : (
                  convertToFloat2Fixed(
                    (EXEC_DTHU_FIBER.DLA_T04
                      ? EXEC_DTHU_FIBER.DLA_T04 / 1000000
                      : 0) +
                      (EXEC_DTHU_TKC_HTS.DLA_T04
                        ? EXEC_DTHU_TKC_HTS.DLA_T04 / 1000000
                        : 0)
                  )
                )}
              </td>
              <td>
                {loadingExec ? (
                  <LoadingComponent />
                ) : (
                  convertToFloat2Fixed(
                    (EXEC_DTHU_FIBER.DLA_T05
                      ? EXEC_DTHU_FIBER.DLA_T05 / 1000000
                      : 0) +
                      (EXEC_DTHU_TKC_HTS.DLA_T05
                        ? EXEC_DTHU_TKC_HTS.DLA_T05 / 1000000
                        : 0)
                  )
                )}
              </td>
              <td>
                {loadingExec ? (
                  <LoadingComponent />
                ) : (
                  convertToFloat2Fixed(
                    (EXEC_DTHU_FIBER.DLA_T06
                      ? EXEC_DTHU_FIBER.DLA_T06 / 1000000
                      : 0) +
                      (EXEC_DTHU_TKC_HTS.DLA_T06
                        ? EXEC_DTHU_TKC_HTS.DLA_T06 / 1000000
                        : 0)
                  )
                )}
              </td>
              <td>
                {loadingExec ? (
                  <LoadingComponent />
                ) : (
                  convertToFloat2Fixed(
                    (EXEC_DTHU_FIBER.DLA_T07
                      ? EXEC_DTHU_FIBER.DLA_T07 / 1000000
                      : 0) +
                      (EXEC_DTHU_TKC_HTS.DLA_T07
                        ? EXEC_DTHU_TKC_HTS.DLA_T07 / 1000000
                        : 0)
                  )
                )}
              </td>
              <td>
                {loadingExec ? (
                  <LoadingComponent />
                ) : (
                  convertToFloat2Fixed(
                    (EXEC_DTHU_FIBER.DLA_T08
                      ? EXEC_DTHU_FIBER.DLA_T08 / 1000000
                      : 0) +
                      (EXEC_DTHU_TKC_HTS.DLA_T08
                        ? EXEC_DTHU_TKC_HTS.DLA_T08 / 1000000
                        : 0)
                  )
                )}
              </td>
              <td>
                {loadingExec ? (
                  <LoadingComponent />
                ) : (
                  convertToFloat2Fixed(
                    (EXEC_DTHU_FIBER.DLA_T09
                      ? EXEC_DTHU_FIBER.DLA_T09 / 1000000
                      : 0) +
                      (EXEC_DTHU_TKC_HTS.DLA_T09
                        ? EXEC_DTHU_TKC_HTS.DLA_T09 / 1000000
                        : 0)
                  )
                )}
              </td>
              <td>
                {loadingExec ? (
                  <LoadingComponent />
                ) : (
                  convertToFloat2Fixed(
                    (EXEC_DTHU_FIBER.DLA_T10
                      ? EXEC_DTHU_FIBER.DLA_T10 / 1000000
                      : 0) +
                      (EXEC_DTHU_TKC_HTS.DLA_T10
                        ? EXEC_DTHU_TKC_HTS.DLA_T10 / 1000000
                        : 0)
                  )
                )}
              </td>
              <td>
                {loadingExec ? (
                  <LoadingComponent />
                ) : (
                  convertToFloat2Fixed(
                    (EXEC_DTHU_FIBER.DLA_T11
                      ? EXEC_DTHU_FIBER.DLA_T11 / 1000000
                      : 0) +
                      (EXEC_DTHU_TKC_HTS.DLA_T11
                        ? EXEC_DTHU_TKC_HTS.DLA_T11 / 1000000
                        : 0)
                  )
                )}
              </td>
              <td>
                {loadingExec ? (
                  <LoadingComponent />
                ) : (
                  convertToFloat2Fixed(
                    (EXEC_DTHU_FIBER.DLA_T12
                      ? EXEC_DTHU_FIBER.DLA_T12 / 1000000
                      : 0) +
                      (EXEC_DTHU_TKC_HTS.DLA_T12
                        ? EXEC_DTHU_TKC_HTS.DLA_T12 / 1000000
                        : 0)
                  )
                )}
              </td>
              <td>
                {loadingExec ? (
                  <LoadingComponent />
                ) : (
                  convertToFloat2Fixed(
                    (EXEC_DTHU_FIBER.DLA_T13
                      ? EXEC_DTHU_FIBER.DLA_T13 / 1000000
                      : 0) +
                      (EXEC_DTHU_TKC_HTS.DLA_T13
                        ? EXEC_DTHU_TKC_HTS.DLA_T13 / 1000000
                        : 0)
                  )
                )}
              </td>
              <td>
                {loadingExec ? (
                  <LoadingComponent />
                ) : (
                  convertToFloat2Fixed(
                    (EXEC_DTHU_FIBER.DLA_D01
                      ? EXEC_DTHU_FIBER.DLA_D01 / 1000000
                      : 0) +
                      (EXEC_DTHU_TKC_HTS.DLA_D01
                        ? EXEC_DTHU_TKC_HTS.DLA_D01 / 1000000
                        : 0)
                  )
                )}
              </td>
              <td>
                {loadingExec ? (
                  <LoadingComponent />
                ) : (
                  convertToFloat2Fixed(
                    (EXEC_DTHU_FIBER.DLA_D02
                      ? EXEC_DTHU_FIBER.DLA_D02 / 1000000
                      : 0) +
                      (EXEC_DTHU_TKC_HTS.DLA_D02
                        ? EXEC_DTHU_TKC_HTS.DLA_D02 / 1000000
                        : 0)
                  )
                )}
              </td>
              <td>
                {loadingExec ? (
                  <LoadingComponent />
                ) : (
                  convertToFloat2Fixed(
                    (EXEC_DTHU_FIBER.DLA_D03
                      ? EXEC_DTHU_FIBER.DLA_D03 / 1000000
                      : 0) +
                      (EXEC_DTHU_TKC_HTS.DLA_D03
                        ? EXEC_DTHU_TKC_HTS.DLA_D03 / 1000000
                        : 0)
                  )
                )}
              </td>
              <td>
                {loadingExec ? (
                  <LoadingComponent />
                ) : (
                  convertToFloat2Fixed(
                    (EXEC_DTHU_FIBER.DLA_D04
                      ? EXEC_DTHU_FIBER.DLA_D04 / 1000000
                      : 0) +
                      (EXEC_DTHU_TKC_HTS.DLA_D04
                        ? EXEC_DTHU_TKC_HTS.DLA_D04 / 1000000
                        : 0)
                  )
                )}
              </td>
              <td>
                {loadingExec ? (
                  <LoadingComponent />
                ) : (
                  convertToFloat2Fixed(
                    (EXEC_DTHU_FIBER.DLA_D05
                      ? EXEC_DTHU_FIBER.DLA_D05 / 1000000
                      : 0) +
                      (EXEC_DTHU_TKC_HTS.DLA_D05
                        ? EXEC_DTHU_TKC_HTS.DLA_D05 / 1000000
                        : 0)
                  )
                )}
              </td>
              <td>
                {loadingExec ? (
                  <LoadingComponent />
                ) : (
                  convertToFloat2Fixed(
                    (EXEC_DTHU_FIBER.DLA_D06
                      ? EXEC_DTHU_FIBER.DLA_D06 / 1000000
                      : 0) +
                      (EXEC_DTHU_TKC_HTS.DLA_D06
                        ? EXEC_DTHU_TKC_HTS.DLA_D06 / 1000000
                        : 0)
                  )
                )}
              </td>
              <td>
                {loadingExec ? (
                  <LoadingComponent />
                ) : (
                  convertToFloat2Fixed(
                    (convertToNumber(EXEC_DTHU_FIBER.DLA_T01) +
                      convertToNumber(EXEC_DTHU_TKC_HTS.DLA_T01) +
                      (convertToNumber(EXEC_DTHU_FIBER.DLA_T02) +
                        convertToNumber(EXEC_DTHU_TKC_HTS.DLA_T02)) +
                      (convertToNumber(EXEC_DTHU_FIBER.DLA_T03) +
                        convertToNumber(EXEC_DTHU_TKC_HTS.DLA_T03)) +
                      (convertToNumber(EXEC_DTHU_FIBER.DLA_T04) +
                        convertToNumber(EXEC_DTHU_TKC_HTS.DLA_T04)) +
                      (convertToNumber(EXEC_DTHU_FIBER.DLA_T05) +
                        convertToNumber(EXEC_DTHU_TKC_HTS.DLA_T05)) +
                      (convertToNumber(EXEC_DTHU_FIBER.DLA_T06) +
                        convertToNumber(EXEC_DTHU_TKC_HTS.DLA_T06)) +
                      (convertToNumber(EXEC_DTHU_FIBER.DLA_T07) +
                        convertToNumber(EXEC_DTHU_TKC_HTS.DLA_T07)) +
                      (convertToNumber(EXEC_DTHU_FIBER.DLA_T08) +
                        convertToNumber(EXEC_DTHU_TKC_HTS.DLA_T08)) +
                      (convertToNumber(EXEC_DTHU_FIBER.DLA_T09) +
                        convertToNumber(EXEC_DTHU_TKC_HTS.DLA_T09)) +
                      (convertToNumber(EXEC_DTHU_FIBER.DLA_T10) +
                        convertToNumber(EXEC_DTHU_TKC_HTS.DLA_T10)) +
                      (convertToNumber(EXEC_DTHU_FIBER.DLA_T11) +
                        convertToNumber(EXEC_DTHU_TKC_HTS.DLA_T11)) +
                      (convertToNumber(EXEC_DTHU_FIBER.DLA_T12) +
                        convertToNumber(EXEC_DTHU_TKC_HTS.DLA_T12)) +
                      (convertToNumber(EXEC_DTHU_FIBER.DLA_T13) +
                        convertToNumber(EXEC_DTHU_TKC_HTS.DLA_T13)) +
                      (convertToNumber(EXEC_DTHU_FIBER.DLA_D01) +
                        convertToNumber(EXEC_DTHU_TKC_HTS.DLA_D01)) +
                      (convertToNumber(EXEC_DTHU_FIBER.DLA_D02) +
                        convertToNumber(EXEC_DTHU_TKC_HTS.DLA_D02)) +
                      (convertToNumber(EXEC_DTHU_FIBER.DLA_D03) +
                        convertToNumber(EXEC_DTHU_TKC_HTS.DLA_D03)) +
                      (convertToNumber(EXEC_DTHU_FIBER.DLA_D04) +
                        convertToNumber(EXEC_DTHU_TKC_HTS.DLA_D04)) +
                      (convertToNumber(EXEC_DTHU_FIBER.DLA_D05) +
                        convertToNumber(EXEC_DTHU_TKC_HTS.DLA_D05)) +
                      (convertToNumber(EXEC_DTHU_FIBER.DLA_D06) +
                        convertToNumber(EXEC_DTHU_TKC_HTS.DLA_D06))) /
                      1000000
                  )
                )}
              </td>
              <td>
                {loadingExec ? (
                  <LoadingComponent />
                ) : (
                  convertToFloat2Fixed(
                    (EXEC_DTHU_FIBER.TTKDGPS
                      ? EXEC_DTHU_FIBER.TTKDGPS / 1000000
                      : 0) +
                      (EXEC_DTHU_TKC_HTS.TTKDGPS
                        ? EXEC_DTHU_TKC_HTS.TTKDGPS / 1000000
                        : 0)
                  )
                )}
              </td>
            </tr>
            <tr>
              <td className="td-title-center td-kh fix-col-3">%TH</td>
              <td
                className={
                  ((convertToNumber(EXEC_DTHU_FIBER.DLA_T01) +
                    convertToNumber(EXEC_DTHU_TKC_HTS.DLA_T01)) *
                    100) /
                    (convertToNumberMauso(PLAN_DTHU_TKC_HTS.DLA_T01) *
                      1000000) >
                  processKPI
                    ? "bg-green"
                    : "bg-red"
                }
              >
                {loadingExec || loadingPlan ? (
                  <LoadingComponent />
                ) : (
                  convertToFloat2Fixed(
                    ((convertToNumber(EXEC_DTHU_FIBER.DLA_T01) +
                      convertToNumber(EXEC_DTHU_TKC_HTS.DLA_T01)) *
                      100) /
                      (convertToNumberMauso(PLAN_DTHU_TKC_HTS.DLA_T01) *
                        1000000)
                  ) + "%"
                )}
              </td>
              <td
                className={
                  ((convertToNumber(EXEC_DTHU_FIBER.DLA_T02) +
                    convertToNumber(EXEC_DTHU_TKC_HTS.DLA_T02)) *
                    100) /
                    (convertToNumberMauso(PLAN_DTHU_TKC_HTS.DLA_T02) *
                      1000000) >
                  processKPI
                    ? "bg-green"
                    : "bg-red"
                }
              >
                {loadingExec || loadingPlan ? (
                  <LoadingComponent />
                ) : (
                  convertToFloat2Fixed(
                    ((convertToNumber(EXEC_DTHU_FIBER.DLA_T02) +
                      convertToNumber(EXEC_DTHU_TKC_HTS.DLA_T02)) *
                      100) /
                      (convertToNumberMauso(PLAN_DTHU_TKC_HTS.DLA_T02) *
                        1000000)
                  ) + "%"
                )}
              </td>
              <td
                className={
                  ((convertToNumber(EXEC_DTHU_FIBER.DLA_T03) +
                    convertToNumber(EXEC_DTHU_TKC_HTS.DLA_T03)) *
                    100) /
                    (convertToNumberMauso(PLAN_DTHU_TKC_HTS.DLA_T03) *
                      1000000) >
                  processKPI
                    ? "bg-green"
                    : "bg-red"
                }
              >
                {loadingExec || loadingPlan ? (
                  <LoadingComponent />
                ) : (
                  convertToFloat2Fixed(
                    ((convertToNumber(EXEC_DTHU_FIBER.DLA_T03) +
                      convertToNumber(EXEC_DTHU_TKC_HTS.DLA_T03)) *
                      100) /
                      (convertToNumberMauso(PLAN_DTHU_TKC_HTS.DLA_T03) *
                        1000000)
                  ) + "%"
                )}
              </td>
              <td
                className={
                  ((convertToNumber(EXEC_DTHU_FIBER.DLA_T04) +
                    convertToNumber(EXEC_DTHU_TKC_HTS.DLA_T04)) *
                    100) /
                    (convertToNumberMauso(PLAN_DTHU_TKC_HTS.DLA_T04) *
                      1000000) >
                  processKPI
                    ? "bg-green"
                    : "bg-red"
                }
              >
                {loadingExec || loadingPlan ? (
                  <LoadingComponent />
                ) : (
                  convertToFloat2Fixed(
                    ((convertToNumber(EXEC_DTHU_FIBER.DLA_T04) +
                      convertToNumber(EXEC_DTHU_TKC_HTS.DLA_T04)) *
                      100) /
                      (convertToNumberMauso(PLAN_DTHU_TKC_HTS.DLA_T04) *
                        1000000)
                  ) + "%"
                )}
              </td>
              <td
                className={
                  ((convertToNumber(EXEC_DTHU_FIBER.DLA_T05) +
                    convertToNumber(EXEC_DTHU_TKC_HTS.DLA_T05)) *
                    100) /
                    (convertToNumberMauso(PLAN_DTHU_TKC_HTS.DLA_T05) *
                      1000000) >
                  processKPI
                    ? "bg-green"
                    : "bg-red"
                }
              >
                {loadingExec || loadingPlan ? (
                  <LoadingComponent />
                ) : (
                  convertToFloat2Fixed(
                    ((convertToNumber(EXEC_DTHU_FIBER.DLA_T05) +
                      convertToNumber(EXEC_DTHU_TKC_HTS.DLA_T05)) *
                      100) /
                      (convertToNumberMauso(PLAN_DTHU_TKC_HTS.DLA_T05) *
                        1000000)
                  ) + "%"
                )}
              </td>

              <td
                className={
                  ((convertToNumber(EXEC_DTHU_FIBER.DLA_T06) +
                    convertToNumber(EXEC_DTHU_TKC_HTS.DLA_T06)) *
                    100) /
                    (convertToNumberMauso(PLAN_DTHU_TKC_HTS.DLA_T06) *
                      1000000) >
                  processKPI
                    ? "bg-green"
                    : "bg-red"
                }
              >
                {loadingExec || loadingPlan ? (
                  <LoadingComponent />
                ) : (
                  convertToFloat2Fixed(
                    ((convertToNumber(EXEC_DTHU_FIBER.DLA_T06) +
                      convertToNumber(EXEC_DTHU_TKC_HTS.DLA_T06)) *
                      100) /
                      (convertToNumberMauso(PLAN_DTHU_TKC_HTS.DLA_T06) *
                        1000000)
                  ) + "%"
                )}
              </td>
              <td
                className={
                  ((convertToNumber(EXEC_DTHU_FIBER.DLA_T07) +
                    convertToNumber(EXEC_DTHU_TKC_HTS.DLA_T07)) *
                    100) /
                    (convertToNumberMauso(PLAN_DTHU_TKC_HTS.DLA_T07) *
                      1000000) >
                  processKPI
                    ? "bg-green"
                    : "bg-red"
                }
              >
                {loadingExec || loadingPlan ? (
                  <LoadingComponent />
                ) : (
                  convertToFloat2Fixed(
                    ((convertToNumber(EXEC_DTHU_FIBER.DLA_T07) +
                      convertToNumber(EXEC_DTHU_TKC_HTS.DLA_T07)) *
                      100) /
                      (convertToNumberMauso(PLAN_DTHU_TKC_HTS.DLA_T07) *
                        1000000)
                  ) + "%"
                )}
              </td>
              <td
                className={
                  ((convertToNumber(EXEC_DTHU_FIBER.DLA_T08) +
                    convertToNumber(EXEC_DTHU_TKC_HTS.DLA_T08)) *
                    100) /
                    (convertToNumberMauso(PLAN_DTHU_TKC_HTS.DLA_T08) *
                      1000000) >
                  processKPI
                    ? "bg-green"
                    : "bg-red"
                }
              >
                {loadingExec || loadingPlan ? (
                  <LoadingComponent />
                ) : (
                  convertToFloat2Fixed(
                    ((convertToNumber(EXEC_DTHU_FIBER.DLA_T08) +
                      convertToNumber(EXEC_DTHU_TKC_HTS.DLA_T08)) *
                      100) /
                      (convertToNumberMauso(PLAN_DTHU_TKC_HTS.DLA_T08) *
                        1000000)
                  ) + "%"
                )}
              </td>
              <td
                className={
                  ((convertToNumber(EXEC_DTHU_FIBER.DLA_T09) +
                    convertToNumber(EXEC_DTHU_TKC_HTS.DLA_T09)) *
                    100) /
                    (convertToNumberMauso(PLAN_DTHU_TKC_HTS.DLA_T09) *
                      1000000) >
                  processKPI
                    ? "bg-green"
                    : "bg-red"
                }
              >
                {loadingExec || loadingPlan ? (
                  <LoadingComponent />
                ) : (
                  convertToFloat2Fixed(
                    ((convertToNumber(EXEC_DTHU_FIBER.DLA_T09) +
                      convertToNumber(EXEC_DTHU_TKC_HTS.DLA_T09)) *
                      100) /
                      (convertToNumberMauso(PLAN_DTHU_TKC_HTS.DLA_T09) *
                        1000000)
                  ) + "%"
                )}
              </td>
              <td
                className={
                  ((convertToNumber(EXEC_DTHU_FIBER.DLA_T10) +
                    convertToNumber(EXEC_DTHU_TKC_HTS.DLA_T10)) *
                    100) /
                    (convertToNumberMauso(PLAN_DTHU_TKC_HTS.DLA_T10) *
                      1000000) >
                  processKPI
                    ? "bg-green"
                    : "bg-red"
                }
              >
                {loadingExec || loadingPlan ? (
                  <LoadingComponent />
                ) : (
                  convertToFloat2Fixed(
                    ((convertToNumber(EXEC_DTHU_FIBER.DLA_T10) +
                      convertToNumber(EXEC_DTHU_TKC_HTS.DLA_T10)) *
                      100) /
                      (convertToNumberMauso(PLAN_DTHU_TKC_HTS.DLA_T10) *
                        1000000)
                  ) + "%"
                )}
              </td>
              <td
                className={
                  ((convertToNumber(EXEC_DTHU_FIBER.DLA_T11) +
                    convertToNumber(EXEC_DTHU_TKC_HTS.DLA_T11)) *
                    100) /
                    (convertToNumberMauso(PLAN_DTHU_TKC_HTS.DLA_T11) *
                      1000000) >
                  processKPI
                    ? "bg-green"
                    : "bg-red"
                }
              >
                {loadingExec || loadingPlan ? (
                  <LoadingComponent />
                ) : (
                  convertToFloat2Fixed(
                    ((convertToNumber(EXEC_DTHU_FIBER.DLA_T11) +
                      convertToNumber(EXEC_DTHU_TKC_HTS.DLA_T11)) *
                      100) /
                      (convertToNumberMauso(PLAN_DTHU_TKC_HTS.DLA_T11) *
                        1000000)
                  ) + "%"
                )}
              </td>
              <td
                className={
                  ((convertToNumber(EXEC_DTHU_FIBER.DLA_T12) +
                    convertToNumber(EXEC_DTHU_TKC_HTS.DLA_T12)) *
                    100) /
                    (convertToNumberMauso(PLAN_DTHU_TKC_HTS.DLA_T12) *
                      1000000) >
                  processKPI
                    ? "bg-green"
                    : "bg-red"
                }
              >
                {loadingExec || loadingPlan ? (
                  <LoadingComponent />
                ) : (
                  convertToFloat2Fixed(
                    ((convertToNumber(EXEC_DTHU_FIBER.DLA_T12) +
                      convertToNumber(EXEC_DTHU_TKC_HTS.DLA_T12)) *
                      100) /
                      (convertToNumberMauso(PLAN_DTHU_TKC_HTS.DLA_T12) *
                        1000000)
                  ) + "%"
                )}
              </td>
              <td
                className={
                  ((convertToNumber(EXEC_DTHU_FIBER.DLA_T13) +
                    convertToNumber(EXEC_DTHU_TKC_HTS.DLA_T13)) *
                    100) /
                    (convertToNumberMauso(PLAN_DTHU_TKC_HTS.DLA_T13) *
                      1000000) >
                  processKPI
                    ? "bg-green"
                    : "bg-red"
                }
              >
                {loadingExec || loadingPlan ? (
                  <LoadingComponent />
                ) : (
                  convertToFloat2Fixed(
                    ((convertToNumber(EXEC_DTHU_FIBER.DLA_T13) +
                      convertToNumber(EXEC_DTHU_TKC_HTS.DLA_T13)) *
                      100) /
                      (convertToNumberMauso(PLAN_DTHU_TKC_HTS.DLA_T13) *
                        1000000)
                  ) + "%"
                )}
              </td>
              <td
                className={
                  ((convertToNumber(EXEC_DTHU_FIBER.DLA_D01) +
                    convertToNumber(EXEC_DTHU_TKC_HTS.DLA_D01)) *
                    100) /
                    (convertToNumberMauso(PLAN_DTHU_TKC_HTS.DLA_D01) *
                      1000000) >
                  processKPI
                    ? "bg-green"
                    : "bg-red"
                }
              >
                {loadingExec || loadingPlan ? (
                  <LoadingComponent />
                ) : (
                  convertToFloat2Fixed(
                    ((convertToNumber(EXEC_DTHU_FIBER.DLA_D01) +
                      convertToNumber(EXEC_DTHU_TKC_HTS.DLA_D01)) *
                      100) /
                      (convertToNumberMauso(PLAN_DTHU_TKC_HTS.DLA_D01) *
                        1000000)
                  ) + "%"
                )}
              </td>
              <td
                className={
                  ((convertToNumber(EXEC_DTHU_FIBER.DLA_D02) +
                    convertToNumber(EXEC_DTHU_TKC_HTS.DLA_D02)) *
                    100) /
                    (convertToNumberMauso(PLAN_DTHU_TKC_HTS.DLA_D02) *
                      1000000) >
                  processKPI
                    ? "bg-green"
                    : "bg-red"
                }
              >
                {loadingExec || loadingPlan ? (
                  <LoadingComponent />
                ) : (
                  convertToFloat2Fixed(
                    ((convertToNumber(EXEC_DTHU_FIBER.DLA_D02) +
                      convertToNumber(EXEC_DTHU_TKC_HTS.DLA_D02)) *
                      100) /
                      (convertToNumberMauso(PLAN_DTHU_TKC_HTS.DLA_D02) *
                        1000000)
                  ) + "%"
                )}
              </td>
              <td
                className={
                  ((convertToNumber(EXEC_DTHU_FIBER.DLA_D03) +
                    convertToNumber(EXEC_DTHU_TKC_HTS.DLA_D03)) *
                    100) /
                    (convertToNumberMauso(PLAN_DTHU_TKC_HTS.DLA_D03) *
                      1000000) >
                  processKPI
                    ? "bg-green"
                    : "bg-red"
                }
              >
                {loadingExec || loadingPlan ? (
                  <LoadingComponent />
                ) : (
                  convertToFloat2Fixed(
                    ((convertToNumber(EXEC_DTHU_FIBER.DLA_D03) +
                      convertToNumber(EXEC_DTHU_TKC_HTS.DLA_D03)) *
                      100) /
                      (convertToNumberMauso(PLAN_DTHU_TKC_HTS.DLA_D03) *
                        1000000)
                  ) + "%"
                )}
              </td>
              <td
                className={
                  ((convertToNumber(EXEC_DTHU_FIBER.DLA_D04) +
                    convertToNumber(EXEC_DTHU_TKC_HTS.DLA_D04)) *
                    100) /
                    (convertToNumberMauso(PLAN_DTHU_TKC_HTS.DLA_D04) *
                      1000000) >
                  processKPI
                    ? "bg-green"
                    : "bg-red"
                }
              >
                {loadingExec || loadingPlan ? (
                  <LoadingComponent />
                ) : (
                  convertToFloat2Fixed(
                    ((convertToNumber(EXEC_DTHU_FIBER.DLA_D04) +
                      convertToNumber(EXEC_DTHU_TKC_HTS.DLA_D04)) *
                      100) /
                      (convertToNumberMauso(PLAN_DTHU_TKC_HTS.DLA_D04) *
                        1000000)
                  ) + "%"
                )}
              </td>
              <td
                className={
                  ((convertToNumber(EXEC_DTHU_FIBER.DLA_D05) +
                    convertToNumber(EXEC_DTHU_TKC_HTS.DLA_D05)) *
                    100) /
                    (convertToNumberMauso(PLAN_DTHU_TKC_HTS.DLA_D05) *
                      1000000) >
                  processKPI
                    ? "bg-green"
                    : "bg-red"
                }
              >
                {loadingExec || loadingPlan ? (
                  <LoadingComponent />
                ) : (
                  convertToFloat2Fixed(
                    ((convertToNumber(EXEC_DTHU_FIBER.DLA_D05) +
                      convertToNumber(EXEC_DTHU_TKC_HTS.DLA_D05)) *
                      100) /
                      (convertToNumberMauso(PLAN_DTHU_TKC_HTS.DLA_D05) *
                        1000000)
                  ) + "%"
                )}
              </td>
              <td
                className={
                  ((convertToNumber(EXEC_DTHU_FIBER.DLA_D06) +
                    convertToNumber(EXEC_DTHU_TKC_HTS.DLA_D06)) *
                    100) /
                    (convertToNumberMauso(PLAN_DTHU_TKC_HTS.DLA_D06) *
                      1000000) >
                  processKPI
                    ? "bg-green"
                    : "bg-red"
                }
              >
                {loadingExec || loadingPlan ? (
                  <LoadingComponent />
                ) : (
                  convertToFloat2Fixed(
                    ((convertToNumber(EXEC_DTHU_FIBER.DLA_D06) +
                      convertToNumber(EXEC_DTHU_TKC_HTS.DLA_D06)) *
                      100) /
                      (convertToNumberMauso(PLAN_DTHU_TKC_HTS.DLA_D06) *
                        1000000)
                  ) + "%"
                )}
              </td>
              <td
                className={
                  ((convertToNumber(EXEC_DTHU_FIBER.DLA_T01) +
                    convertToNumber(EXEC_DTHU_TKC_HTS.DLA_T01)) *
                    100 +
                    (convertToNumber(EXEC_DTHU_FIBER.DLA_T02) +
                      convertToNumber(EXEC_DTHU_TKC_HTS.DLA_T02)) *
                      100 +
                    (convertToNumber(EXEC_DTHU_FIBER.DLA_T03) +
                      convertToNumber(EXEC_DTHU_TKC_HTS.DLA_T03)) *
                      100 +
                    (convertToNumber(EXEC_DTHU_FIBER.DLA_T04) +
                      convertToNumber(EXEC_DTHU_TKC_HTS.DLA_T04)) *
                      100 +
                    (convertToNumber(EXEC_DTHU_FIBER.DLA_T05) +
                      convertToNumber(EXEC_DTHU_TKC_HTS.DLA_T05)) *
                      100 +
                    (convertToNumber(EXEC_DTHU_FIBER.DLA_T06) +
                      convertToNumber(EXEC_DTHU_TKC_HTS.DLA_T06)) *
                      100 +
                    (convertToNumber(EXEC_DTHU_FIBER.DLA_T07) +
                      convertToNumber(EXEC_DTHU_TKC_HTS.DLA_T07)) *
                      100 +
                    (convertToNumber(EXEC_DTHU_FIBER.DLA_T08) +
                      convertToNumber(EXEC_DTHU_TKC_HTS.DLA_T08)) *
                      100 +
                    (convertToNumber(EXEC_DTHU_FIBER.DLA_T09) +
                      convertToNumber(EXEC_DTHU_TKC_HTS.DLA_T09)) *
                      100 +
                    (convertToNumber(EXEC_DTHU_FIBER.DLA_T10) +
                      convertToNumber(EXEC_DTHU_TKC_HTS.DLA_T10)) *
                      100 +
                    (convertToNumber(EXEC_DTHU_FIBER.DLA_T11) +
                      convertToNumber(EXEC_DTHU_TKC_HTS.DLA_T11)) *
                      100 +
                    (convertToNumber(EXEC_DTHU_FIBER.DLA_T12) +
                      convertToNumber(EXEC_DTHU_TKC_HTS.DLA_T12)) *
                      100 +
                    (convertToNumber(EXEC_DTHU_FIBER.DLA_T13) +
                      convertToNumber(EXEC_DTHU_TKC_HTS.DLA_T13)) *
                      100 +
                    (convertToNumber(EXEC_DTHU_FIBER.DLA_D01) +
                      convertToNumber(EXEC_DTHU_TKC_HTS.DLA_D01)) *
                      100 +
                    (convertToNumber(EXEC_DTHU_FIBER.DLA_D02) +
                      convertToNumber(EXEC_DTHU_TKC_HTS.DLA_D02)) *
                      100 +
                    (convertToNumber(EXEC_DTHU_FIBER.DLA_D03) +
                      convertToNumber(EXEC_DTHU_TKC_HTS.DLA_D03)) *
                      100 +
                    (convertToNumber(EXEC_DTHU_FIBER.DLA_D04) +
                      convertToNumber(EXEC_DTHU_TKC_HTS.DLA_D04)) *
                      100 +
                    (convertToNumber(EXEC_DTHU_FIBER.DLA_D05) +
                      convertToNumber(EXEC_DTHU_TKC_HTS.DLA_D05)) *
                      100 +
                    (convertToNumber(EXEC_DTHU_FIBER.DLA_D06) +
                      convertToNumber(EXEC_DTHU_TKC_HTS.DLA_D06)) *
                      100) /
                    (convertToNumberMauso(PLAN_DTHU_TKC_HTS.TTKDVT) * 1000000) >
                  processKPI
                    ? "bg-green"
                    : "bg-red"
                }
              >
                {loadingExec || loadingPlan ? (
                  <LoadingComponent />
                ) : (
                  convertToFloat2Fixed(
                    ((convertToNumber(EXEC_DTHU_FIBER.DLA_T01) +
                      convertToNumber(EXEC_DTHU_TKC_HTS.DLA_T01)) *
                      100 +
                      (convertToNumber(EXEC_DTHU_FIBER.DLA_T02) +
                        convertToNumber(EXEC_DTHU_TKC_HTS.DLA_T02)) *
                        100 +
                      (convertToNumber(EXEC_DTHU_FIBER.DLA_T03) +
                        convertToNumber(EXEC_DTHU_TKC_HTS.DLA_T03)) *
                        100 +
                      (convertToNumber(EXEC_DTHU_FIBER.DLA_T04) +
                        convertToNumber(EXEC_DTHU_TKC_HTS.DLA_T04)) *
                        100 +
                      (convertToNumber(EXEC_DTHU_FIBER.DLA_T05) +
                        convertToNumber(EXEC_DTHU_TKC_HTS.DLA_T05)) *
                        100 +
                      (convertToNumber(EXEC_DTHU_FIBER.DLA_T06) +
                        convertToNumber(EXEC_DTHU_TKC_HTS.DLA_T06)) *
                        100 +
                      (convertToNumber(EXEC_DTHU_FIBER.DLA_T07) +
                        convertToNumber(EXEC_DTHU_TKC_HTS.DLA_T07)) *
                        100 +
                      (convertToNumber(EXEC_DTHU_FIBER.DLA_T08) +
                        convertToNumber(EXEC_DTHU_TKC_HTS.DLA_T08)) *
                        100 +
                      (convertToNumber(EXEC_DTHU_FIBER.DLA_T09) +
                        convertToNumber(EXEC_DTHU_TKC_HTS.DLA_T09)) *
                        100 +
                      (convertToNumber(EXEC_DTHU_FIBER.DLA_T10) +
                        convertToNumber(EXEC_DTHU_TKC_HTS.DLA_T10)) *
                        100 +
                      (convertToNumber(EXEC_DTHU_FIBER.DLA_T11) +
                        convertToNumber(EXEC_DTHU_TKC_HTS.DLA_T11)) *
                        100 +
                      (convertToNumber(EXEC_DTHU_FIBER.DLA_T12) +
                        convertToNumber(EXEC_DTHU_TKC_HTS.DLA_T12)) *
                        100 +
                      (convertToNumber(EXEC_DTHU_FIBER.DLA_T13) +
                        convertToNumber(EXEC_DTHU_TKC_HTS.DLA_T13)) *
                        100 +
                      (convertToNumber(EXEC_DTHU_FIBER.DLA_D01) +
                        convertToNumber(EXEC_DTHU_TKC_HTS.DLA_D01)) *
                        100 +
                      (convertToNumber(EXEC_DTHU_FIBER.DLA_D02) +
                        convertToNumber(EXEC_DTHU_TKC_HTS.DLA_D02)) *
                        100 +
                      (convertToNumber(EXEC_DTHU_FIBER.DLA_D03) +
                        convertToNumber(EXEC_DTHU_TKC_HTS.DLA_D03)) *
                        100 +
                      (convertToNumber(EXEC_DTHU_FIBER.DLA_D04) +
                        convertToNumber(EXEC_DTHU_TKC_HTS.DLA_D04)) *
                        100 +
                      (convertToNumber(EXEC_DTHU_FIBER.DLA_D05) +
                        convertToNumber(EXEC_DTHU_TKC_HTS.DLA_D05)) *
                        100 +
                      (convertToNumber(EXEC_DTHU_FIBER.DLA_D06) +
                        convertToNumber(EXEC_DTHU_TKC_HTS.DLA_D06)) *
                        100) /
                      (convertToNumberMauso(PLAN_DTHU_TKC_HTS.TTKDVT) * 1000000)
                  ) + "%"
                )}
              </td>
              <td
                className={
                  PLAN_DTHU_TKC_HTS.TTKDGPS
                    ? ((convertToNumber(EXEC_DTHU_FIBER.TTKDGPS) +
                        convertToNumber(EXEC_DTHU_TKC_HTS.TTKDGPS)) *
                        100) /
                        (convertToNumberMauso(PLAN_DTHU_TKC_HTS.TTKDGPS) *
                          1000000) >
                      processKPI
                      ? "bg-green"
                      : "bg-red"
                    : ""
                }
              >
                {loadingExec || loadingPlan ? (
                  <LoadingComponent />
                ) : PLAN_DTHU_TKC_HTS.TTKDGPS ? (
                  convertToFloat2Fixed(
                    ((convertToNumber(EXEC_DTHU_FIBER.TTKDGPS) +
                      convertToNumber(EXEC_DTHU_TKC_HTS.TTKDGPS)) *
                      100) /
                      (convertToNumberMauso(PLAN_DTHU_TKC_HTS.TTKDGPS) *
                        1000000)
                  ) + "%"
                ) : (
                  ""
                )}
              </td>
            </tr>
            <tr>
              <td
                className="td-title-center td-stt fix-col-1"
                style={{ fontStyle: "italic", color: "red" }}
              >
                1.1
              </td>
              <td
                className="td-title td-content fix-col-2"
                style={{ fontStyle: "italic", color: "red" }}
              >
                Doanh thu MobiFiber
              </td>
              <td className="td-title-center td-kh fix-col-3">TH</td>
              <td>
                {loadingExec ? (
                  <LoadingComponent />
                ) : EXEC_DTHU_FIBER.DLA_T01 ? (
                  convertToFloat2Fixed(EXEC_DTHU_FIBER.DLA_T01 / 1000000)
                ) : (
                  ""
                )}
              </td>
              <td>
                {loadingExec ? (
                  <LoadingComponent />
                ) : EXEC_DTHU_FIBER.DLA_T02 ? (
                  convertToFloat2Fixed(EXEC_DTHU_FIBER.DLA_T02 / 1000000)
                ) : (
                  ""
                )}
              </td>
              <td>
                {loadingExec ? (
                  <LoadingComponent />
                ) : EXEC_DTHU_FIBER.DLA_T03 ? (
                  convertToFloat2Fixed(EXEC_DTHU_FIBER.DLA_T03 / 1000000)
                ) : (
                  ""
                )}
              </td>
              <td>
                {loadingExec ? (
                  <LoadingComponent />
                ) : EXEC_DTHU_FIBER.DLA_T04 ? (
                  convertToFloat2Fixed(EXEC_DTHU_FIBER.DLA_T04 / 1000000)
                ) : (
                  ""
                )}
              </td>
              <td>
                {loadingExec ? (
                  <LoadingComponent />
                ) : EXEC_DTHU_FIBER.DLA_T05 ? (
                  convertToFloat2Fixed(EXEC_DTHU_FIBER.DLA_T05 / 1000000)
                ) : (
                  ""
                )}
              </td>
              <td>
                {loadingExec ? (
                  <LoadingComponent />
                ) : EXEC_DTHU_FIBER.DLA_T06 ? (
                  convertToFloat2Fixed(EXEC_DTHU_FIBER.DLA_T06 / 1000000)
                ) : (
                  ""
                )}
              </td>
              <td>
                {loadingExec ? (
                  <LoadingComponent />
                ) : EXEC_DTHU_FIBER.DLA_T07 ? (
                  convertToFloat2Fixed(EXEC_DTHU_FIBER.DLA_T07 / 1000000)
                ) : (
                  ""
                )}
              </td>
              <td>
                {loadingExec ? (
                  <LoadingComponent />
                ) : EXEC_DTHU_FIBER.DLA_T08 ? (
                  convertToFloat2Fixed(EXEC_DTHU_FIBER.DLA_T08 / 1000000)
                ) : (
                  ""
                )}
              </td>
              <td>
                {loadingExec ? (
                  <LoadingComponent />
                ) : EXEC_DTHU_FIBER.DLA_T09 ? (
                  convertToFloat2Fixed(EXEC_DTHU_FIBER.DLA_T09 / 1000000)
                ) : (
                  ""
                )}
              </td>
              <td>
                {loadingExec ? (
                  <LoadingComponent />
                ) : EXEC_DTHU_FIBER.DLA_T10 ? (
                  convertToFloat2Fixed(EXEC_DTHU_FIBER.DLA_T10 / 1000000)
                ) : (
                  ""
                )}
              </td>
              <td>
                {loadingExec ? (
                  <LoadingComponent />
                ) : EXEC_DTHU_FIBER.DLA_T11 ? (
                  convertToFloat2Fixed(EXEC_DTHU_FIBER.DLA_T11 / 1000000)
                ) : (
                  ""
                )}
              </td>
              <td>
                {loadingExec ? (
                  <LoadingComponent />
                ) : EXEC_DTHU_FIBER.DLA_T12 ? (
                  convertToFloat2Fixed(EXEC_DTHU_FIBER.DLA_T12 / 1000000)
                ) : (
                  ""
                )}
              </td>
              <td>
                {loadingExec ? (
                  <LoadingComponent />
                ) : EXEC_DTHU_FIBER.DLA_T13 ? (
                  convertToFloat2Fixed(EXEC_DTHU_FIBER.DLA_T13 / 1000000)
                ) : (
                  ""
                )}
              </td>
              <td>
                {loadingExec ? (
                  <LoadingComponent />
                ) : EXEC_DTHU_FIBER.DLA_D01 ? (
                  convertToFloat2Fixed(EXEC_DTHU_FIBER.DLA_D01 / 1000000)
                ) : (
                  ""
                )}
              </td>
              <td>
                {loadingExec ? (
                  <LoadingComponent />
                ) : EXEC_DTHU_FIBER.DLA_D02 ? (
                  convertToFloat2Fixed(EXEC_DTHU_FIBER.DLA_D02 / 1000000)
                ) : (
                  ""
                )}
              </td>
              <td>
                {loadingExec ? (
                  <LoadingComponent />
                ) : EXEC_DTHU_FIBER.DLA_D03 ? (
                  convertToFloat2Fixed(EXEC_DTHU_FIBER.DLA_D03 / 1000000)
                ) : (
                  ""
                )}
              </td>
              <td>
                {loadingExec ? (
                  <LoadingComponent />
                ) : EXEC_DTHU_FIBER.DLA_D04 ? (
                  convertToFloat2Fixed(EXEC_DTHU_FIBER.DLA_D04 / 1000000)
                ) : (
                  ""
                )}
              </td>
              <td>
                {loadingExec ? (
                  <LoadingComponent />
                ) : EXEC_DTHU_FIBER.DLA_D05 ? (
                  convertToFloat2Fixed(EXEC_DTHU_FIBER.DLA_D05 / 1000000)
                ) : (
                  ""
                )}
              </td>
              <td>
                {loadingExec ? (
                  <LoadingComponent />
                ) : EXEC_DTHU_FIBER.DLA_D06 ? (
                  convertToFloat2Fixed(EXEC_DTHU_FIBER.DLA_D06 / 1000000)
                ) : (
                  ""
                )}
              </td>
              <td>
                {loadingExec ? (
                  <LoadingComponent />
                ) :(
                  convertToFloat2Fixed(
                    convertToNumber(EXEC_DTHU_FIBER.DLA_T01 / 1000000) +
                      convertToNumber(EXEC_DTHU_FIBER.DLA_T02 / 1000000) +
                      convertToNumber(EXEC_DTHU_FIBER.DLA_T03 / 1000000) +
                      convertToNumber(EXEC_DTHU_FIBER.DLA_T04 / 1000000) +
                      convertToNumber(EXEC_DTHU_FIBER.DLA_T05 / 1000000) +
                      convertToNumber(EXEC_DTHU_FIBER.DLA_T06 / 1000000) +
                      convertToNumber(EXEC_DTHU_FIBER.DLA_T07 / 1000000) +
                      convertToNumber(EXEC_DTHU_FIBER.DLA_T08 / 1000000) +
                      convertToNumber(EXEC_DTHU_FIBER.DLA_T09 / 1000000) +
                      convertToNumber(EXEC_DTHU_FIBER.DLA_T10 / 1000000) +
                      convertToNumber(EXEC_DTHU_FIBER.DLA_T11 / 1000000) +
                      convertToNumber(EXEC_DTHU_FIBER.DLA_T12 / 1000000) +
                      convertToNumber(EXEC_DTHU_FIBER.DLA_T13 / 1000000) +
                      convertToNumber(EXEC_DTHU_FIBER.DLA_D01 / 1000000) +
                      convertToNumber(EXEC_DTHU_FIBER.DLA_D02 / 1000000) +
                      convertToNumber(EXEC_DTHU_FIBER.DLA_D03 / 1000000) +
                      convertToNumber(EXEC_DTHU_FIBER.DLA_D04 / 1000000) +
                      convertToNumber(EXEC_DTHU_FIBER.DLA_D05 / 1000000) +
                      convertToNumber(EXEC_DTHU_FIBER.DLA_D06 / 1000000)
                  )
                ) }
              </td>
              <td>
                {loadingExec ? (
                  <LoadingComponent />
                ) : EXEC_DTHU_FIBER.TTKDGPS ? (
                  convertToFloat2Fixed(EXEC_DTHU_FIBER.TTKDGPS / 1000000)
                ) : (
                  ""
                )}
              </td>
              <td>
                {EXEC_DTHU_FIBER.LAST_DATE
                  ? getFormattedDate(new Date(EXEC_DTHU_FIBER.LAST_DATE))
                  : ""}
              </td>
            </tr>
            <tr>
              <td rowSpan={3} className="td-stt td-title-center fix-col-1">
                2
              </td>
              <td rowSpan={3} className="td-title fw-bold td-content fix-col-2">
                Doanh thu Giải pháp số/Nền tảng số{" "}
                <span style={{ fontStyle: "italic" }}>(triệu đồng)</span>
              </td>
              <td className="td-title-center fix-col-3">KH</td>
              <td>
                {" "}
                {loadingPlan ? (
                  <LoadingComponent />
                ) : PLAN_DTHU_GPS.DLA_T01 ? (
                  convertToFloat2Fixed(PLAN_DTHU_GPS.DLA_T01)
                ) : (
                  ""
                )}
              </td>
              <td>
                {" "}
                {loadingPlan ? (
                  <LoadingComponent />
                ) : PLAN_DTHU_GPS.DLA_T02 ? (
                  convertToFloat2Fixed(PLAN_DTHU_GPS.DLA_T03)
                ) : (
                  ""
                )}
              </td>
              <td>
                {" "}
                {loadingPlan ? (
                  <LoadingComponent />
                ) : PLAN_DTHU_GPS.DLA_T02 ? (
                  convertToFloat2Fixed(PLAN_DTHU_GPS.DLA_T03)
                ) : (
                  ""
                )}
              </td>
              <td>
                {" "}
                {loadingPlan ? (
                  <LoadingComponent />
                ) : PLAN_DTHU_GPS.DLA_T03 ? (
                  convertToFloat2Fixed(PLAN_DTHU_GPS.DLA_T04)
                ) : (
                  ""
                )}
              </td>
              <td>
                {" "}
                {loadingPlan ? (
                  <LoadingComponent />
                ) : PLAN_DTHU_GPS.DLA_T05 ? (
                  convertToFloat2Fixed(PLAN_DTHU_GPS.DLA_T05)
                ) : (
                  ""
                )}
              </td>
              <td>
                {" "}
                {loadingPlan ? (
                  <LoadingComponent />
                ) : PLAN_DTHU_GPS.DLA_T06 ? (
                  convertToFloat2Fixed(PLAN_DTHU_GPS.DLA_T06)
                ) : (
                  ""
                )}
              </td>
              <td>
                {" "}
                {loadingPlan ? (
                  <LoadingComponent />
                ) : PLAN_DTHU_GPS.DLA_T07 ? (
                  convertToFloat2Fixed(PLAN_DTHU_GPS.DLA_T07)
                ) : (
                  ""
                )}
              </td>
              <td>
                {" "}
                {loadingPlan ? (
                  <LoadingComponent />
                ) : PLAN_DTHU_GPS.DLA_T08 ? (
                  convertToFloat2Fixed(PLAN_DTHU_GPS.DLA_T08)
                ) : (
                  ""
                )}
              </td>
              <td>
                {" "}
                {loadingPlan ? (
                  <LoadingComponent />
                ) : PLAN_DTHU_GPS.DLA_T09 ? (
                  convertToFloat2Fixed(PLAN_DTHU_GPS.DLA_T09)
                ) : (
                  ""
                )}
              </td>
              <td>
                {" "}
                {loadingPlan ? (
                  <LoadingComponent />
                ) : PLAN_DTHU_GPS.DLA_T10 ? (
                  convertToFloat2Fixed(PLAN_DTHU_GPS.DLA_T10)
                ) : (
                  ""
                )}
              </td>
              <td>
                {" "}
                {loadingPlan ? (
                  <LoadingComponent />
                ) : PLAN_DTHU_GPS.DLA_T11 ? (
                  convertToFloat2Fixed(PLAN_DTHU_GPS.DLA_T11)
                ) : (
                  ""
                )}
              </td>
              <td>
                {" "}
                {loadingPlan ? (
                  <LoadingComponent />
                ) : PLAN_DTHU_GPS.DLA_T12 ? (
                  convertToFloat2Fixed(PLAN_DTHU_GPS.DLA_T12)
                ) : (
                  ""
                )}
              </td>
              <td>
                {" "}
                {loadingPlan ? (
                  <LoadingComponent />
                ) : PLAN_DTHU_GPS.DLA_T13 ? (
                  convertToFloat2Fixed(PLAN_DTHU_GPS.DLA_T13)
                ) : (
                  ""
                )}
              </td>
              <td>
                {" "}
                {loadingPlan ? (
                  <LoadingComponent />
                ) : PLAN_DTHU_GPS.DLA_D01 ? (
                  convertToFloat2Fixed(PLAN_DTHU_GPS.DLA_D01)
                ) : (
                  ""
                )}
              </td>
              <td>
                {" "}
                {loadingPlan ? (
                  <LoadingComponent />
                ) : PLAN_DTHU_GPS.DLA_D02 ? (
                  convertToFloat2Fixed(PLAN_DTHU_GPS.DLA_D02)
                ) : (
                  ""
                )}
              </td>
              <td>
                {" "}
                {loadingPlan ? (
                  <LoadingComponent />
                ) : PLAN_DTHU_GPS.DLA_D03 ? (
                  convertToFloat2Fixed(PLAN_DTHU_GPS.DLA_D03)
                ) : (
                  ""
                )}
              </td>
              <td>
                {" "}
                {loadingPlan ? (
                  <LoadingComponent />
                ) : PLAN_DTHU_GPS.DLA_D04 ? (
                  convertToFloat2Fixed(PLAN_DTHU_GPS.DLA_D04)
                ) : (
                  ""
                )}
              </td>
              <td>
                {" "}
                {loadingPlan ? (
                  <LoadingComponent />
                ) : PLAN_DTHU_GPS.DLA_D05 ? (
                  convertToFloat2Fixed(PLAN_DTHU_GPS.DLA_D05)
                ) : (
                  ""
                )}
              </td>
              <td>
                {" "}
                {loadingPlan ? (
                  <LoadingComponent />
                ) : PLAN_DTHU_GPS.DLA_D06 ? (
                  convertToFloat2Fixed(PLAN_DTHU_GPS.DLA_D06)
                ) : (
                  ""
                )}
              </td>
              <td>
                {" "}
                {/* {loadingPlan ? (
                  <LoadingComponent />
                ) : PLAN_DTHU_GPS.TTKDVT ? (
                  convertToFloat2Fixed(PLAN_DTHU_GPS.TTKDVT)
                ) : (
                  ""
                )} */}
              </td>
              <td>
                {" "}
                {loadingPlan ? (
                  <LoadingComponent />
                ) : PLAN_DTHU_GPS.TTKDGPS ? (
                  convertToFloat2Fixed(PLAN_DTHU_GPS.TTKDGPS)
                ) : (
                  ""
                )}
              </td>
              <td rowSpan={3}>
                {EXEC_DTHU_GPS.LAST_DATE
                  ? getFormattedDate(new Date(EXEC_DTHU_GPS.LAST_DATE))
                  : ""}
              </td>
            </tr>
            <tr>
              <td className="td-title-center fix-col-3">TH</td>
              <td>
                {loadingExec ? (
                  <LoadingComponent />
                ) : (
                  convertToFloat2Fixed(
                    EXEC_DTHU_GPS_KHCN.DLA_T01
                      ? EXEC_DTHU_GPS_KHCN.DLA_T01 / 1000000
                      : 0 + EXEC_DTHU_GPS_KHDN.DLA_T01
                      ? EXEC_DTHU_GPS_KHDN.DLA_T01 / 1000000
                      : 0
                  )
                )}
              </td>
              <td>
                {loadingExec ? (
                  <LoadingComponent />
                ) : (
                  convertToFloat2Fixed(
                    EXEC_DTHU_GPS_KHCN.DLA_T02
                      ? EXEC_DTHU_GPS_KHCN.DLA_T02 / 1000000
                      : 0 + EXEC_DTHU_GPS_KHDN.DLA_T02
                      ? EXEC_DTHU_GPS_KHDN.DLA_T02 / 1000000
                      : 0
                  )
                )}
              </td>
              <td>
                {loadingExec ? (
                  <LoadingComponent />
                ) : (
                  convertToFloat2Fixed(
                    EXEC_DTHU_GPS_KHCN.DLA_T03
                      ? EXEC_DTHU_GPS_KHCN.DLA_T03 / 1000000
                      : 0 + EXEC_DTHU_GPS_KHDN.DLA_T03
                      ? EXEC_DTHU_GPS_KHDN.DLA_T03 / 1000000
                      : 0
                  )
                )}
              </td>
              <td>
                {loadingExec ? (
                  <LoadingComponent />
                ) : (
                  convertToFloat2Fixed(
                    EXEC_DTHU_GPS_KHCN.DLA_T04
                      ? EXEC_DTHU_GPS_KHCN.DLA_T04 / 1000000
                      : 0 + EXEC_DTHU_GPS_KHDN.DLA_T04
                      ? EXEC_DTHU_GPS_KHDN.DLA_T04 / 1000000
                      : 0
                  )
                )}
              </td>
              <td>
                {loadingExec ? (
                  <LoadingComponent />
                ) : (
                  convertToFloat2Fixed(
                    EXEC_DTHU_GPS_KHCN.DLA_T05
                      ? EXEC_DTHU_GPS_KHCN.DLA_T05 / 1000000
                      : 0 + EXEC_DTHU_GPS_KHDN.DLA_T05
                      ? EXEC_DTHU_GPS_KHDN.DLA_T05 / 1000000
                      : 0
                  )
                )}
              </td>
              <td>
                {loadingExec ? (
                  <LoadingComponent />
                ) : (
                  convertToFloat2Fixed(
                    EXEC_DTHU_GPS_KHCN.DLA_T06
                      ? EXEC_DTHU_GPS_KHCN.DLA_T06 / 1000000
                      : 0 + EXEC_DTHU_GPS_KHDN.DLA_T06
                      ? EXEC_DTHU_GPS_KHDN.DLA_T06 / 1000000
                      : 0
                  )
                )}
              </td>
              <td>
                {loadingExec ? (
                  <LoadingComponent />
                ) : (
                  convertToFloat2Fixed(
                    EXEC_DTHU_GPS_KHCN.DLA_T07
                      ? EXEC_DTHU_GPS_KHCN.DLA_T07 / 1000000
                      : 0 + EXEC_DTHU_GPS_KHDN.DLA_T07
                      ? EXEC_DTHU_GPS_KHDN.DLA_T07 / 1000000
                      : 0
                  )
                )}
              </td>
              <td>
                {loadingExec ? (
                  <LoadingComponent />
                ) : (
                  convertToFloat2Fixed(
                    EXEC_DTHU_GPS_KHCN.DLA_T08
                      ? EXEC_DTHU_GPS_KHCN.DLA_T08 / 1000000
                      : 0 + EXEC_DTHU_GPS_KHDN.DLA_T08
                      ? EXEC_DTHU_GPS_KHDN.DLA_T08 / 1000000
                      : 0
                  )
                )}
              </td>
              <td>
                {loadingExec ? (
                  <LoadingComponent />
                ) : (
                  convertToFloat2Fixed(
                    EXEC_DTHU_GPS_KHCN.DLA_T09
                      ? EXEC_DTHU_GPS_KHCN.DLA_T09 / 1000000
                      : 0 + EXEC_DTHU_GPS_KHDN.DLA_T09
                      ? EXEC_DTHU_GPS_KHDN.DLA_T09 / 1000000
                      : 0
                  )
                )}
              </td>
              <td>
                {loadingExec ? (
                  <LoadingComponent />
                ) : (
                  convertToFloat2Fixed(
                    EXEC_DTHU_GPS_KHCN.DLA_T10
                      ? EXEC_DTHU_GPS_KHCN.DLA_T10 / 1000000
                      : 0 + EXEC_DTHU_GPS_KHDN.DLA_T10
                      ? EXEC_DTHU_GPS_KHDN.DLA_T10 / 1000000
                      : 0
                  )
                )}
              </td>
              <td>
                {loadingExec ? (
                  <LoadingComponent />
                ) : (
                  convertToFloat2Fixed(
                    EXEC_DTHU_GPS_KHCN.DLA_T11
                      ? EXEC_DTHU_GPS_KHCN.DLA_T11 / 1000000
                      : 0 + EXEC_DTHU_GPS_KHDN.DLA_T11
                      ? EXEC_DTHU_GPS_KHDN.DLA_T11 / 1000000
                      : 0
                  )
                )}
              </td>
              <td>
                {loadingExec ? (
                  <LoadingComponent />
                ) : (
                  convertToFloat2Fixed(
                    EXEC_DTHU_GPS_KHCN.DLA_T12
                      ? EXEC_DTHU_GPS_KHCN.DLA_T12 / 1000000
                      : 0 + EXEC_DTHU_GPS_KHDN.DLA_T12
                      ? EXEC_DTHU_GPS_KHDN.DLA_T12 / 1000000
                      : 0
                  )
                )}
              </td>
              <td>
                {loadingExec ? (
                  <LoadingComponent />
                ) : (
                  convertToFloat2Fixed(
                    EXEC_DTHU_GPS_KHCN.DLA_T13
                      ? EXEC_DTHU_GPS_KHCN.DLA_T13 / 1000000
                      : 0 + EXEC_DTHU_GPS_KHDN.DLA_T13
                      ? EXEC_DTHU_GPS_KHDN.DLA_T13 / 1000000
                      : 0
                  )
                )}
              </td>
              <td>
                {loadingExec ? (
                  <LoadingComponent />
                ) : (
                  convertToFloat2Fixed(
                    EXEC_DTHU_GPS_KHCN.DLA_D01
                      ? EXEC_DTHU_GPS_KHCN.DLA_D01 / 1000000
                      : 0 + EXEC_DTHU_GPS_KHDN.DLA_D01
                      ? EXEC_DTHU_GPS_KHDN.DLA_D01 / 1000000
                      : 0
                  )
                )}
              </td>
              <td>
                {loadingExec ? (
                  <LoadingComponent />
                ) : (
                  convertToFloat2Fixed(
                    EXEC_DTHU_GPS_KHCN.DLA_D02
                      ? EXEC_DTHU_GPS_KHCN.DLA_D02 / 1000000
                      : 0 + EXEC_DTHU_GPS_KHDN.DLA_D02
                      ? EXEC_DTHU_GPS_KHDN.DLA_D02 / 1000000
                      : 0
                  )
                )}
              </td>
              <td>
                {loadingExec ? (
                  <LoadingComponent />
                ) : (
                  convertToFloat2Fixed(
                    EXEC_DTHU_GPS_KHCN.DLA_D03
                      ? EXEC_DTHU_GPS_KHCN.DLA_D03 / 1000000
                      : 0 + EXEC_DTHU_GPS_KHDN.DLA_D03
                      ? EXEC_DTHU_GPS_KHDN.DLA_D03 / 1000000
                      : 0
                  )
                )}
              </td>
              <td>
                {loadingExec ? (
                  <LoadingComponent />
                ) : (
                  convertToFloat2Fixed(
                    EXEC_DTHU_GPS_KHCN.DLA_D04
                      ? EXEC_DTHU_GPS_KHCN.DLA_D04 / 1000000
                      : 0 + EXEC_DTHU_GPS_KHDN.DLA_D04
                      ? EXEC_DTHU_GPS_KHDN.DLA_D04 / 1000000
                      : 0
                  )
                )}
              </td>
              <td>
                {loadingExec ? (
                  <LoadingComponent />
                ) : (
                  convertToFloat2Fixed(
                    EXEC_DTHU_GPS_KHCN.DLA_D05
                      ? EXEC_DTHU_GPS_KHCN.DLA_D05 / 1000000
                      : 0 + EXEC_DTHU_GPS_KHDN.DLA_D05
                      ? EXEC_DTHU_GPS_KHDN.DLA_D05 / 1000000
                      : 0
                  )
                )}
              </td>
              <td>
                {loadingExec ? (
                  <LoadingComponent />
                ) : (
                  convertToFloat2Fixed(
                    EXEC_DTHU_GPS_KHCN.DLA_D06
                      ? EXEC_DTHU_GPS_KHCN.DLA_D06 / 1000000
                      : 0 + EXEC_DTHU_GPS_KHDN.DLA_D06
                      ? EXEC_DTHU_GPS_KHDN.DLA_D06 / 1000000
                      : 0
                  )
                )}
              </td>
              <td>
                {loadingExec ? (
                  <LoadingComponent />
                ) : (
                  // convertToFloat2Fixed(
                  //   EXEC_DTHU_GPS_KHCN.TTKDVT
                  //     ? EXEC_DTHU_GPS_KHCN.TTKDVT / 1000000
                  //     : 0 + EXEC_DTHU_GPS_KHDN.TTKDVT
                  //     ? EXEC_DTHU_GPS_KHDN.TTKDVT / 1000000
                  //     : 0
                  // )
                  ""
                )}
              </td>
              <td>
                {loadingExec ? (
                  <LoadingComponent />
                ) : (
                  convertToFloat2Fixed(
                    (convertToNumber(EXEC_DTHU_GPS_KHCN.DLA_T01) +
                      convertToNumber(EXEC_DTHU_GPS_KHDN.DLA_T01) +
                      (convertToNumber(EXEC_DTHU_GPS_KHCN.DLA_T02) +
                        convertToNumber(EXEC_DTHU_GPS_KHDN.DLA_T02)) +
                      (convertToNumber(EXEC_DTHU_GPS_KHCN.DLA_T03) +
                        convertToNumber(EXEC_DTHU_GPS_KHDN.DLA_T03)) +
                      (convertToNumber(EXEC_DTHU_GPS_KHCN.DLA_T04) +
                        convertToNumber(EXEC_DTHU_GPS_KHDN.DLA_T04)) +
                      (convertToNumber(EXEC_DTHU_GPS_KHCN.DLA_T05) +
                        convertToNumber(EXEC_DTHU_GPS_KHDN.DLA_T05)) +
                      (convertToNumber(EXEC_DTHU_GPS_KHCN.DLA_T06) +
                        convertToNumber(EXEC_DTHU_GPS_KHDN.DLA_T06)) +
                      (convertToNumber(EXEC_DTHU_GPS_KHCN.DLA_T07) +
                        convertToNumber(EXEC_DTHU_GPS_KHDN.DLA_T07)) +
                      (convertToNumber(EXEC_DTHU_GPS_KHCN.DLA_T08) +
                        convertToNumber(EXEC_DTHU_GPS_KHDN.DLA_T08)) +
                      (convertToNumber(EXEC_DTHU_GPS_KHCN.DLA_T09) +
                        convertToNumber(EXEC_DTHU_GPS_KHDN.DLA_T09)) +
                      (convertToNumber(EXEC_DTHU_GPS_KHCN.DLA_T10) +
                        convertToNumber(EXEC_DTHU_GPS_KHDN.DLA_T10)) +
                      (convertToNumber(EXEC_DTHU_GPS_KHCN.DLA_T11) +
                        convertToNumber(EXEC_DTHU_GPS_KHDN.DLA_T11)) +
                      (convertToNumber(EXEC_DTHU_GPS_KHCN.DLA_T12) +
                        convertToNumber(EXEC_DTHU_GPS_KHDN.DLA_T12)) +
                      (convertToNumber(EXEC_DTHU_GPS_KHCN.DLA_T13) +
                        convertToNumber(EXEC_DTHU_GPS_KHDN.DLA_T13)) +
                      (convertToNumber(EXEC_DTHU_GPS_KHCN.DLA_D01) +
                        convertToNumber(EXEC_DTHU_GPS_KHDN.DLA_D01)) +
                      (convertToNumber(EXEC_DTHU_GPS_KHCN.DLA_D02) +
                        convertToNumber(EXEC_DTHU_GPS_KHDN.DLA_D02)) +
                      (convertToNumber(EXEC_DTHU_GPS_KHCN.DLA_D03) +
                        convertToNumber(EXEC_DTHU_GPS_KHDN.DLA_D03)) +
                      (convertToNumber(EXEC_DTHU_GPS_KHCN.DLA_D04) +
                        convertToNumber(EXEC_DTHU_GPS_KHDN.DLA_D04)) +
                      (convertToNumber(EXEC_DTHU_GPS_KHCN.DLA_D05) +
                        convertToNumber(EXEC_DTHU_GPS_KHDN.DLA_D05)) +
                      (convertToNumber(EXEC_DTHU_GPS_KHCN.DLA_D06) +
                        convertToNumber(EXEC_DTHU_GPS_KHDN.DLA_D06)) +
                      (convertToNumber(EXEC_DTHU_GPS_KHCN.TTKDGPS) +
                        convertToNumber(EXEC_DTHU_GPS_KHDN.TTKDGPS))) /
                      1000000
                  )
                )}
              </td>
            </tr>
            <tr>
              <td className="td-title-center td-kh fix-col-3">%TH</td>
              <td
                className={
                  ((convertToNumber(EXEC_DTHU_GPS_KHCN.DLA_T01) +
                    convertToNumber(EXEC_DTHU_GPS_KHDN.DLA_T01)) *
                    100) /
                    (convertToNumberMauso(PLAN_DTHU_GPS.DLA_T01) * 1000000) >
                  processKPI
                    ? "bg-green"
                    : "bg-red"
                }
              >
                {loadingExec || loadingPlan ? (
                  <LoadingComponent />
                ) : (
                  convertToFloat2Fixed(
                    ((EXEC_DTHU_GPS_KHCN.DLA_T01
                      ? EXEC_DTHU_GPS_KHCN.DLA_T01 / 1000000
                      : 0 + EXEC_DTHU_GPS_KHDN.DLA_T01
                      ? EXEC_DTHU_GPS_KHDN.DLA_T01 / 1000000
                      : 0) *
                      100) /
                      (PLAN_DTHU_GPS.DLA_T01 ? PLAN_DTHU_GPS.DLA_T01 : 1)
                  ) + "%"
                )}
              </td>
              <td
                className={
                  ((convertToNumber(EXEC_DTHU_GPS_KHCN.DLA_T02) +
                    convertToNumber(EXEC_DTHU_GPS_KHDN.DLA_T02)) *
                    100) /
                    (convertToNumberMauso(PLAN_DTHU_GPS.DLA_T02) * 1000000) >
                  processKPI
                    ? "bg-green"
                    : "bg-red"
                }
              >
                {loadingExec || loadingPlan ? (
                  <LoadingComponent />
                ) : (
                  convertToFloat2Fixed(
                    ((EXEC_DTHU_GPS_KHCN.DLA_T02
                      ? EXEC_DTHU_GPS_KHCN.DLA_T02 / 1000000
                      : 0 + EXEC_DTHU_GPS_KHDN.DLA_T02
                      ? EXEC_DTHU_GPS_KHDN.DLA_T02 / 1000000
                      : 0) *
                      100) /
                      (PLAN_DTHU_GPS.DLA_T02 ? PLAN_DTHU_GPS.DLA_T02 : 1)
                  ) + "%"
                )}
              </td>

              <td
                className={
                  ((convertToNumber(EXEC_DTHU_GPS_KHCN.DLA_T03) +
                    convertToNumber(EXEC_DTHU_GPS_KHDN.DLA_T03)) *
                    100) /
                    (convertToNumberMauso(PLAN_DTHU_GPS.DLA_T03) * 1000000) >
                  processKPI
                    ? "bg-green"
                    : "bg-red"
                }
              >
                {loadingExec || loadingPlan ? (
                  <LoadingComponent />
                ) : (
                  convertToFloat2Fixed(
                    ((EXEC_DTHU_GPS_KHCN.DLA_T03
                      ? EXEC_DTHU_GPS_KHCN.DLA_T03 / 1000000
                      : 0 + EXEC_DTHU_GPS_KHDN.DLA_T03
                      ? EXEC_DTHU_GPS_KHDN.DLA_T03 / 100000
                      : 0) *
                      100) /
                      (PLAN_DTHU_GPS.DLA_T03 ? PLAN_DTHU_GPS.DLA_T03 : 1)
                  ) + "%"
                )}
              </td>
              <td
                className={
                  ((convertToNumber(EXEC_DTHU_GPS_KHCN.DLA_T04) +
                    convertToNumber(EXEC_DTHU_GPS_KHDN.DLA_T04)) *
                    100) /
                    (convertToNumberMauso(PLAN_DTHU_GPS.DLA_T04) * 1000000) >
                  processKPI
                    ? "bg-green"
                    : "bg-red"
                }
              >
                {loadingExec || loadingPlan ? (
                  <LoadingComponent />
                ) : (
                  convertToFloat2Fixed(
                    ((EXEC_DTHU_GPS_KHCN.DLA_T04
                      ? EXEC_DTHU_GPS_KHCN.DLA_T04 / 1000000
                      : 0 + EXEC_DTHU_GPS_KHDN.DLA_T04
                      ? EXEC_DTHU_GPS_KHDN.DLA_T04 / 100000
                      : 0) *
                      100) /
                      (PLAN_DTHU_GPS.DLA_T04 ? PLAN_DTHU_GPS.DLA_T04 : 1)
                  ) + "%"
                )}
              </td>
              <td
                className={
                  ((convertToNumber(EXEC_DTHU_GPS_KHCN.DLA_T05) +
                    convertToNumber(EXEC_DTHU_GPS_KHDN.DLA_T05)) *
                    100) /
                    (convertToNumberMauso(PLAN_DTHU_GPS.DLA_TDLA_T05) *
                      1000000) >
                  processKPI
                    ? "bg-green"
                    : "bg-red"
                }
              >
                {loadingExec || loadingPlan ? (
                  <LoadingComponent />
                ) : (
                  convertToFloat2Fixed(
                    ((EXEC_DTHU_GPS_KHCN.DLA_T05
                      ? EXEC_DTHU_GPS_KHCN.DLA_T05 / 1000000
                      : 0 + EXEC_DTHU_GPS_KHDN.DLA_T05
                      ? EXEC_DTHU_GPS_KHDN.DLA_T05 / 1000000
                      : 0) *
                      100) /
                      (PLAN_DTHU_GPS.DLA_T05 ? PLAN_DTHU_GPS.DLA_T05 : 1)
                  ) + "%"
                )}
              </td>
              <td
                className={
                  ((convertToNumber(EXEC_DTHU_GPS_KHCN.DLA_T06) +
                    convertToNumber(EXEC_DTHU_GPS_KHDN.DLA_T06)) *
                    100) /
                    (convertToNumberMauso(PLAN_DTHU_GPS.DLA_T06) * 1000000) >
                  processKPI
                    ? "bg-green"
                    : "bg-red"
                }
              >
                {loadingExec || loadingPlan ? (
                  <LoadingComponent />
                ) : (
                  convertToFloat2Fixed(
                    ((EXEC_DTHU_GPS_KHCN.DLA_T06
                      ? EXEC_DTHU_GPS_KHCN.DLA_T06 / 1000000
                      : 0 + EXEC_DTHU_GPS_KHDN.DLA_T06
                      ? EXEC_DTHU_GPS_KHDN.DLA_T06 / 1000000
                      : 0) *
                      100) /
                      (PLAN_DTHU_GPS.DLA_T06 ? PLAN_DTHU_GPS.DLA_T06 : 1)
                  ) + "%"
                )}
              </td>
              <td
                className={
                  ((convertToNumber(EXEC_DTHU_GPS_KHCN.DLA_T07) +
                    convertToNumber(EXEC_DTHU_GPS_KHDN.DLA_T07)) *
                    100) /
                    (convertToNumberMauso(PLAN_DTHU_GPS.DLA_T07) * 1000000) >
                  processKPI
                    ? "bg-green"
                    : "bg-red"
                }
              >
                {loadingExec || loadingPlan ? (
                  <LoadingComponent />
                ) : (
                  convertToFloat2Fixed(
                    ((EXEC_DTHU_GPS_KHCN.DLA_T07
                      ? EXEC_DTHU_GPS_KHCN.DLA_T07 / 1000000
                      : 0 + EXEC_DTHU_GPS_KHDN.DLA_T07
                      ? EXEC_DTHU_GPS_KHDN.DLA_T07 / 1000000
                      : 0) *
                      100) /
                      (PLAN_DTHU_GPS.DLA_T07 ? PLAN_DTHU_GPS.DLA_T07 : 1)
                  ) + "%"
                )}
              </td>
              <td
                className={
                  ((convertToNumber(EXEC_DTHU_GPS_KHCN.DLA_T08) +
                    convertToNumber(EXEC_DTHU_GPS_KHDN.DLA_T08)) *
                    100) /
                    (convertToNumberMauso(PLAN_DTHU_GPS.DLA_T08) * 1000000) >
                  processKPI
                    ? "bg-green"
                    : "bg-red"
                }
              >
                {loadingExec || loadingPlan ? (
                  <LoadingComponent />
                ) : (
                  convertToFloat2Fixed(
                    ((EXEC_DTHU_GPS_KHCN.DLA_T08
                      ? EXEC_DTHU_GPS_KHCN.DLA_T08 / 1000000
                      : 0 + EXEC_DTHU_GPS_KHDN.DLA_T08
                      ? EXEC_DTHU_GPS_KHDN.DLA_T08 / 1000000
                      : 0) *
                      100) /
                      (PLAN_DTHU_GPS.DLA_T08 ? PLAN_DTHU_GPS.DLA_T08 : 1)
                  ) + "%"
                )}
              </td>
              <td
                className={
                  ((convertToNumber(EXEC_DTHU_GPS_KHCN.DLA_T09) +
                    convertToNumber(EXEC_DTHU_GPS_KHDN.DLA_T09)) *
                    100) /
                    (convertToNumberMauso(PLAN_DTHU_GPS.DLA_T09) * 1000000) >
                  processKPI
                    ? "bg-green"
                    : "bg-red"
                }
              >
                {loadingExec || loadingPlan ? (
                  <LoadingComponent />
                ) : (
                  convertToFloat2Fixed(
                    ((EXEC_DTHU_GPS_KHCN.DLA_T09
                      ? EXEC_DTHU_GPS_KHCN.DLA_T09 / 1000000
                      : 0 + EXEC_DTHU_GPS_KHDN.DLA_T09
                      ? EXEC_DTHU_GPS_KHDN.DLA_T09 / 1000000
                      : 0) *
                      100) /
                      (PLAN_DTHU_GPS.DLA_T09 ? PLAN_DTHU_GPS.DLA_T09 : 1)
                  ) + "%"
                )}
              </td>
              <td
                className={
                  ((convertToNumber(EXEC_DTHU_GPS_KHCN.DLA_T10) +
                    convertToNumber(EXEC_DTHU_GPS_KHDN.DLA_T10)) *
                    100) /
                    (convertToNumberMauso(PLAN_DTHU_GPS.DLA_T10) * 1000000) >
                  processKPI
                    ? "bg-green"
                    : "bg-red"
                }
              >
                {loadingExec || loadingPlan ? (
                  <LoadingComponent />
                ) : (
                  convertToFloat2Fixed(
                    ((EXEC_DTHU_GPS_KHCN.DLA_T10
                      ? EXEC_DTHU_GPS_KHCN.DLA_T10 / 1000000
                      : 0 + EXEC_DTHU_GPS_KHDN.DLA_T10
                      ? EXEC_DTHU_GPS_KHDN.DLA_T10 / 1000000
                      : 0) *
                      100) /
                      (PLAN_DTHU_GPS.DLA_T10 ? PLAN_DTHU_GPS.DLA_T10 : 1)
                  ) + "%"
                )}
              </td>
              <td
                className={
                  ((convertToNumber(EXEC_DTHU_GPS_KHCN.DLA_T11) +
                    convertToNumber(EXEC_DTHU_GPS_KHDN.DLA_T11)) *
                    100) /
                    (convertToNumberMauso(PLAN_DTHU_GPS.DLA_T11) * 1000000) >
                  processKPI
                    ? "bg-green"
                    : "bg-red"
                }
              >
                {loadingExec || loadingPlan ? (
                  <LoadingComponent />
                ) : (
                  convertToFloat2Fixed(
                    ((EXEC_DTHU_GPS_KHCN.DLA_T11
                      ? EXEC_DTHU_GPS_KHCN.DLA_T11 / 1000000
                      : 0 + EXEC_DTHU_GPS_KHDN.DLA_T11
                      ? EXEC_DTHU_GPS_KHDN.DLA_T11 / 1000000
                      : 0) *
                      100) /
                      (PLAN_DTHU_GPS.DLA_T11 ? PLAN_DTHU_GPS.DLA_T11 : 1)
                  ) + "%"
                )}
              </td>
              <td
                className={
                  ((convertToNumber(EXEC_DTHU_GPS_KHCN.DLA_T12) +
                    convertToNumber(EXEC_DTHU_GPS_KHDN.DLA_T12)) *
                    100) /
                    (convertToNumberMauso(PLAN_DTHU_GPS.DLA_T12) * 1000000) >
                  processKPI
                    ? "bg-green"
                    : "bg-red"
                }
              >
                {loadingExec || loadingPlan ? (
                  <LoadingComponent />
                ) : (
                  convertToFloat2Fixed(
                    ((EXEC_DTHU_GPS_KHCN.DLA_T12
                      ? EXEC_DTHU_GPS_KHCN.DLA_T12 / 1000000
                      : 0 + EXEC_DTHU_GPS_KHDN.DLA_T12
                      ? EXEC_DTHU_GPS_KHDN.DLA_T12 / 1000000
                      : 0) *
                      100) /
                      (PLAN_DTHU_GPS.DLA_T12 ? PLAN_DTHU_GPS.DLA_T12 : 1)
                  ) + "%"
                )}
              </td>
              <td
                className={
                  ((convertToNumber(EXEC_DTHU_GPS_KHCN.DLA_T13) +
                    convertToNumber(EXEC_DTHU_GPS_KHDN.DLA_T13)) *
                    100) /
                    (convertToNumberMauso(PLAN_DTHU_GPS.DLA_T13) * 1000000) >
                  processKPI
                    ? "bg-green"
                    : "bg-red"
                }
              >
                {loadingExec || loadingPlan ? (
                  <LoadingComponent />
                ) : (
                  convertToFloat2Fixed(
                    ((EXEC_DTHU_GPS_KHCN.DLA_T13
                      ? EXEC_DTHU_GPS_KHCN.DLA_T13 / 1000000
                      : 0 + EXEC_DTHU_GPS_KHDN.DLA_T13
                      ? EXEC_DTHU_GPS_KHDN.DLA_T13 / 1000000
                      : 0) *
                      100) /
                      (PLAN_DTHU_GPS.DLA_T13 ? PLAN_DTHU_GPS.DLA_T13 : 1)
                  ) + "%"
                )}
              </td>
              <td
                className={
                  ((convertToNumber(EXEC_DTHU_GPS_KHCN.DLA_D01) +
                    convertToNumber(EXEC_DTHU_GPS_KHDN.DLA_D01)) *
                    100) /
                    (convertToNumberMauso(PLAN_DTHU_GPS.DLA_D01) * 1000000) >
                  processKPI
                    ? "bg-green"
                    : "bg-red"
                }
              >
                {loadingExec || loadingPlan ? (
                  <LoadingComponent />
                ) : (
                  convertToFloat2Fixed(
                    ((EXEC_DTHU_GPS_KHCN.DLA_D01
                      ? EXEC_DTHU_GPS_KHCN.DLA_D01 / 1000000
                      : 0 + EXEC_DTHU_GPS_KHDN.DLA_D01
                      ? EXEC_DTHU_GPS_KHDN.DLA_D01 / 1000000
                      : 0) *
                      100) /
                      (PLAN_DTHU_GPS.DLA_D01 ? PLAN_DTHU_GPS.DLA_D01 : 1)
                  ) + "%"
                )}
              </td>
              <td
                className={
                  ((convertToNumber(EXEC_DTHU_GPS_KHCN.DLA_D02) +
                    convertToNumber(EXEC_DTHU_GPS_KHDN.DLA_D02)) *
                    100) /
                    (convertToNumberMauso(PLAN_DTHU_GPS.DLA_D02) * 1000000) >
                  processKPI
                    ? "bg-green"
                    : "bg-red"
                }
              >
                {loadingExec || loadingPlan ? (
                  <LoadingComponent />
                ) : (
                  convertToFloat2Fixed(
                    ((EXEC_DTHU_GPS_KHCN.DLA_D02
                      ? EXEC_DTHU_GPS_KHCN.DLA_D02 / 1000000
                      : 0 + EXEC_DTHU_GPS_KHDN.DLA_D02
                      ? EXEC_DTHU_GPS_KHDN.DLA_D02 / 100000
                      : 0) *
                      100) /
                      (PLAN_DTHU_GPS.DLA_D02 ? PLAN_DTHU_GPS.DLA_D02 : 1)
                  ) + "%"
                )}
              </td>
              <td
                className={
                  ((convertToNumber(EXEC_DTHU_GPS_KHCN.DLA_D03) +
                    convertToNumber(EXEC_DTHU_GPS_KHDN.DLA_D03)) *
                    100) /
                    (convertToNumberMauso(PLAN_DTHU_GPS.DLA_D03) * 1000000) >
                  processKPI
                    ? "bg-green"
                    : "bg-red"
                }
              >
                {loadingExec || loadingPlan ? (
                  <LoadingComponent />
                ) : (
                  convertToFloat2Fixed(
                    ((EXEC_DTHU_GPS_KHCN.DLA_D03
                      ? EXEC_DTHU_GPS_KHCN.DLA_D03 / 1000000
                      : 0 + EXEC_DTHU_GPS_KHDN.DLA_D03
                      ? EXEC_DTHU_GPS_KHDN.DLA_D03 / 1000000
                      : 0) *
                      100) /
                      (PLAN_DTHU_GPS.DLA_D03 ? PLAN_DTHU_GPS.DLA_D03 : 1)
                  ) + "%"
                )}
              </td>
              <td
                className={
                  ((convertToNumber(EXEC_DTHU_GPS_KHCN.DLA_D04) +
                    convertToNumber(EXEC_DTHU_GPS_KHDN.DLA_D04)) *
                    100) /
                    (convertToNumberMauso(PLAN_DTHU_GPS.DLA_D04) * 1000000) >
                  processKPI
                    ? "bg-green"
                    : "bg-red"
                }
              >
                {loadingExec || loadingPlan ? (
                  <LoadingComponent />
                ) : (
                  convertToFloat2Fixed(
                    ((EXEC_DTHU_GPS_KHCN.DLA_D04
                      ? EXEC_DTHU_GPS_KHCN.DLA_D04 / 1000000
                      : 0 + EXEC_DTHU_GPS_KHDN.DLA_D04
                      ? EXEC_DTHU_GPS_KHDN.DLA_D04 / 1000000
                      : 0) *
                      100) /
                      (PLAN_DTHU_GPS.DLA_D04 ? PLAN_DTHU_GPS.DLA_D04 : 1)
                  ) + "%"
                )}
              </td>
              <td
                className={
                  ((convertToNumber(EXEC_DTHU_GPS_KHCN.DLA_D05) +
                    convertToNumber(EXEC_DTHU_GPS_KHDN.DLA_D05)) *
                    100) /
                    (convertToNumberMauso(PLAN_DTHU_GPS.DLA_D05) * 1000000) >
                  processKPI
                    ? "bg-green"
                    : "bg-red"
                }
              >
                {loadingExec || loadingPlan ? (
                  <LoadingComponent />
                ) : (
                  convertToFloat2Fixed(
                    ((EXEC_DTHU_GPS_KHCN.DLA_D05
                      ? EXEC_DTHU_GPS_KHCN.DLA_D05 / 1000000
                      : 0 + EXEC_DTHU_GPS_KHDN.DLA_D05
                      ? EXEC_DTHU_GPS_KHDN.DLA_D05 / 1000000
                      : 0) *
                      100) /
                      (PLAN_DTHU_GPS.DLA_D05 ? PLAN_DTHU_GPS.DLA_D05 : 1)
                  ) + "%"
                )}
              </td>
              <td
                className={
                  ((convertToNumber(EXEC_DTHU_GPS_KHCN.DLA_D06) +
                    convertToNumber(EXEC_DTHU_GPS_KHDN.DLA_D06)) *
                    100) /
                    (convertToNumberMauso(PLAN_DTHU_GPS.DLA_D06) * 1000000) >
                  processKPI
                    ? "bg-green"
                    : "bg-red"
                }
              >
                {loadingExec || loadingPlan ? (
                  <LoadingComponent />
                ) : (
                  convertToFloat2Fixed(
                    ((EXEC_DTHU_GPS_KHCN.DLA_D06
                      ? EXEC_DTHU_GPS_KHCN.DLA_D06 / 1000000
                      : 0 + EXEC_DTHU_GPS_KHDN.DLA_D06
                      ? EXEC_DTHU_GPS_KHDN.DLA_D06 / 1000000
                      : 0) *
                      100) /
                      (PLAN_DTHU_GPS.DLA_D06 ? PLAN_DTHU_GPS.DLA_D06 : 1)
                  ) + "%"
                )}
              </td>
              <td>{loadingExec || loadingPlan ? <LoadingComponent /> : ""}</td>
              <td
                className={
                  ((convertToNumber(EXEC_DTHU_GPS_KHCN.TTKDGPS) +
                    convertToNumber(EXEC_DTHU_GPS_KHDN.TTKDGPS)) *
                    100) /
                    (convertToNumberMauso(PLAN_DTHU_GPS.TTKDGPS) * 1000000) >
                  processKPI
                    ? "bg-green"
                    : "bg-red"
                }
              >
                {loadingExec || loadingPlan ? (
                  <LoadingComponent />
                ) : (
                  convertToFloat2Fixed(
                    ((EXEC_DTHU_GPS_KHCN.TTKDGPS
                      ? EXEC_DTHU_GPS_KHCN.TTKDGPS / 1000000
                      : 0 + EXEC_DTHU_GPS_KHDN.TTKDGPS
                      ? EXEC_DTHU_GPS_KHDN.TTKDGPS / 1000000
                      : 0) *
                      100) /
                      (PLAN_DTHU_GPS.TTKDGPS ? PLAN_DTHU_GPS.TTKDGPS : 1)
                  ) + "%"
                )}
              </td>
            </tr>
            <tr>
              <td
                className="td-title-center td-stt fix-col-1"
                style={{ fontStyle: "italic", color: "red" }}
              >
                2.1
              </td>
              <td
                className="td-title td-content fix-col-2"
                style={{ fontStyle: "italic", color: "red" }}
              >
                Doanh thu GPS KHCN(TKC)
              </td>
              <td className="td-title-center td-kh fix-col-3">TH</td>
              <td>
                {loadingExec ? (
                  <LoadingComponent />
                ) : EXEC_DTHU_GPS_KHCN.DLA_T01 ? (
                  convertToFloat2Fixed(EXEC_DTHU_GPS_KHCN.DLA_T01 / 1000000)
                ) : (
                  ""
                )}
              </td>
              <td>
                {loadingExec ? (
                  <LoadingComponent />
                ) : EXEC_DTHU_GPS_KHCN.DLA_T02 ? (
                  convertToFloat2Fixed(EXEC_DTHU_GPS_KHCN.DLA_T02 / 1000000)
                ) : (
                  ""
                )}
              </td>
              <td>
                {loadingExec ? (
                  <LoadingComponent />
                ) : EXEC_DTHU_GPS_KHCN.DLA_T03 ? (
                  convertToFloat2Fixed(EXEC_DTHU_GPS_KHCN.DLA_T03 / 1000000)
                ) : (
                  ""
                )}
              </td>
              <td>
                {loadingExec ? (
                  <LoadingComponent />
                ) : EXEC_DTHU_GPS_KHCN.DLA_T04 ? (
                  convertToFloat2Fixed(EXEC_DTHU_GPS_KHCN.DLA_T04 / 1000000)
                ) : (
                  ""
                )}
              </td>
              <td>
                {loadingExec ? (
                  <LoadingComponent />
                ) : EXEC_DTHU_GPS_KHCN.DLA_T05 ? (
                  convertToFloat2Fixed(EXEC_DTHU_GPS_KHCN.DLA_T05 / 1000000)
                ) : (
                  ""
                )}
              </td>
              <td>
                {loadingExec ? (
                  <LoadingComponent />
                ) : EXEC_DTHU_GPS_KHCN.DLA_T06 ? (
                  convertToFloat2Fixed(EXEC_DTHU_GPS_KHCN.DLA_T06 / 1000000)
                ) : (
                  ""
                )}
              </td>
              <td>
                {loadingExec ? (
                  <LoadingComponent />
                ) : EXEC_DTHU_GPS_KHCN.DLA_T07 ? (
                  convertToFloat2Fixed(EXEC_DTHU_GPS_KHCN.DLA_T07 / 1000000)
                ) : (
                  ""
                )}
              </td>
              <td>
                {loadingExec ? (
                  <LoadingComponent />
                ) : EXEC_DTHU_GPS_KHCN.DLA_T08 ? (
                  convertToFloat2Fixed(EXEC_DTHU_GPS_KHCN.DLA_T08 / 1000000)
                ) : (
                  ""
                )}
              </td>
              <td>
                {loadingExec ? (
                  <LoadingComponent />
                ) : EXEC_DTHU_GPS_KHCN.DLA_T09 ? (
                  convertToFloat2Fixed(EXEC_DTHU_GPS_KHCN.DLA_T09 / 1000000)
                ) : (
                  ""
                )}
              </td>
              <td>
                {loadingExec ? (
                  <LoadingComponent />
                ) : EXEC_DTHU_GPS_KHCN.DLA_T10 ? (
                  convertToFloat2Fixed(EXEC_DTHU_GPS_KHCN.DLA_T10 / 1000000)
                ) : (
                  ""
                )}
              </td>
              <td>
                {loadingExec ? (
                  <LoadingComponent />
                ) : EXEC_DTHU_GPS_KHCN.DLA_T11 ? (
                  convertToFloat2Fixed(EXEC_DTHU_GPS_KHCN.DLA_T11 / 1000000)
                ) : (
                  ""
                )}
              </td>
              <td>
                {loadingExec ? (
                  <LoadingComponent />
                ) : EXEC_DTHU_GPS_KHCN.DLA_T12 ? (
                  convertToFloat2Fixed(EXEC_DTHU_GPS_KHCN.DLA_T12 / 1000000)
                ) : (
                  ""
                )}
              </td>
              <td>
                {loadingExec ? (
                  <LoadingComponent />
                ) : EXEC_DTHU_GPS_KHCN.DLA_T13 ? (
                  convertToFloat2Fixed(EXEC_DTHU_GPS_KHCN.DLA_T13 / 1000000)
                ) : (
                  ""
                )}
              </td>
              <td>
                {loadingExec ? (
                  <LoadingComponent />
                ) : EXEC_DTHU_GPS_KHCN.DLA_D01 ? (
                  convertToFloat2Fixed(EXEC_DTHU_GPS_KHCN.DLA_D01 / 1000000)
                ) : (
                  ""
                )}
              </td>
              <td>
                {loadingExec ? (
                  <LoadingComponent />
                ) : EXEC_DTHU_GPS_KHCN.DLA_D02 ? (
                  convertToFloat2Fixed(EXEC_DTHU_GPS_KHCN.DLA_D02 / 1000000)
                ) : (
                  ""
                )}
              </td>
              <td>
                {loadingExec ? (
                  <LoadingComponent />
                ) : EXEC_DTHU_GPS_KHCN.DLA_D03 ? (
                  convertToFloat2Fixed(EXEC_DTHU_GPS_KHCN.DLA_D03 / 1000000)
                ) : (
                  ""
                )}
              </td>
              <td>
                {loadingExec ? (
                  <LoadingComponent />
                ) : EXEC_DTHU_GPS_KHCN.DLA_D04 ? (
                  convertToFloat2Fixed(EXEC_DTHU_GPS_KHCN.DLA_D04 / 1000000)
                ) : (
                  ""
                )}
              </td>
              <td>
                {loadingExec ? (
                  <LoadingComponent />
                ) : EXEC_DTHU_GPS_KHCN.DLA_D05 ? (
                  convertToFloat2Fixed(EXEC_DTHU_GPS_KHCN.DLA_D05 / 1000000)
                ) : (
                  ""
                )}
              </td>
              <td>
                {loadingExec ? (
                  <LoadingComponent />
                ) : EXEC_DTHU_GPS_KHCN.DLA_D06 ? (
                  convertToFloat2Fixed(EXEC_DTHU_GPS_KHCN.DLA_D06 / 1000000)
                ) : (
                  ""
                )}
              </td>
              <td>
                {loadingExec ? (
                  <LoadingComponent />
                ) : EXEC_DTHU_GPS_KHCN.TTKDVT ? (
                  convertToFloat2Fixed(EXEC_DTHU_GPS_KHCN.TTKDVT / 1000000)
                ) : (
                  ""
                )}
              </td>
              <td>
                {loadingExec ? (
                  <LoadingComponent />
                ) : EXEC_DTHU_GPS_KHCN.TTKDGPS ? (
                  convertToFloat2Fixed(EXEC_DTHU_GPS_KHCN.TTKDGPS / 1000000)
                ) : (
                  ""
                )}
              </td>
              <td>
                {EXEC_DTHU_GPS_KHCN.LAST_DATE
                  ? getFormattedDate(new Date(EXEC_DTHU_GPS_KHCN.LAST_DATE))
                  : ""}
              </td>
            </tr>
            <tr>
              <td
                className="td-title-center td-stt fix-col-1"
                style={{ fontStyle: "italic", color: "red" }}
              >
                2.2
              </td>
              <td
                className="td-title td-content fix-col-2"
                style={{ fontStyle: "italic", color: "red" }}
              >
                Doanh thu GPS KHDN(Ngoài TKC)
              </td>
              <td className="td-title-center td-kh fix-col-3">TH</td>
              <td>
                {loadingExec ? (
                  <LoadingComponent />
                ) : EXEC_DTHU_GPS_KHDN.DLA_T01 ? (
                  convertToFloat2Fixed(EXEC_DTHU_GPS_KHDN.DLA_T01 / 1000000)
                ) : (
                  ""
                )}
              </td>
              <td>
                {loadingExec ? (
                  <LoadingComponent />
                ) : EXEC_DTHU_GPS_KHDN.DLA_T02 ? (
                  convertToFloat2Fixed(EXEC_DTHU_GPS_KHDN.DLA_T02 / 1000000)
                ) : (
                  ""
                )}
              </td>
              <td>
                {loadingExec ? (
                  <LoadingComponent />
                ) : EXEC_DTHU_GPS_KHDN.DLA_T03 ? (
                  convertToFloat2Fixed(EXEC_DTHU_GPS_KHDN.DLA_T03 / 1000000)
                ) : (
                  ""
                )}
              </td>
              <td>
                {loadingExec ? (
                  <LoadingComponent />
                ) : EXEC_DTHU_GPS_KHDN.DLA_T04 ? (
                  convertToFloat2Fixed(EXEC_DTHU_GPS_KHDN.DLA_T04 / 1000000)
                ) : (
                  ""
                )}
              </td>
              <td>
                {loadingExec ? (
                  <LoadingComponent />
                ) : EXEC_DTHU_GPS_KHDN.DLA_T05 ? (
                  convertToFloat2Fixed(EXEC_DTHU_GPS_KHDN.DLA_T05 / 1000000)
                ) : (
                  ""
                )}
              </td>
              <td>
                {loadingExec ? (
                  <LoadingComponent />
                ) : EXEC_DTHU_GPS_KHDN.DLA_T06 ? (
                  convertToFloat2Fixed(EXEC_DTHU_GPS_KHDN.DLA_T06 / 1000000)
                ) : (
                  ""
                )}
              </td>
              <td>
                {loadingExec ? (
                  <LoadingComponent />
                ) : EXEC_DTHU_GPS_KHDN.DLA_T07 ? (
                  convertToFloat2Fixed(EXEC_DTHU_GPS_KHDN.DLA_T07 / 1000000)
                ) : (
                  ""
                )}
              </td>
              <td>
                {loadingExec ? (
                  <LoadingComponent />
                ) : EXEC_DTHU_GPS_KHDN.DLA_T08 ? (
                  convertToFloat2Fixed(EXEC_DTHU_GPS_KHDN.DLA_T08 / 1000000)
                ) : (
                  ""
                )}
              </td>
              <td>
                {loadingExec ? (
                  <LoadingComponent />
                ) : EXEC_DTHU_GPS_KHDN.DLA_T09 ? (
                  convertToFloat2Fixed(EXEC_DTHU_GPS_KHDN.DLA_T09 / 1000000)
                ) : (
                  ""
                )}
              </td>
              <td>
                {loadingExec ? (
                  <LoadingComponent />
                ) : EXEC_DTHU_GPS_KHDN.DLA_T10 ? (
                  convertToFloat2Fixed(EXEC_DTHU_GPS_KHDN.DLA_T10 / 1000000)
                ) : (
                  ""
                )}
              </td>
              <td>
                {loadingExec ? (
                  <LoadingComponent />
                ) : EXEC_DTHU_GPS_KHDN.DLA_T11 ? (
                  convertToFloat2Fixed(EXEC_DTHU_GPS_KHDN.DLA_T11 / 1000000)
                ) : (
                  ""
                )}
              </td>
              <td>
                {loadingExec ? (
                  <LoadingComponent />
                ) : EXEC_DTHU_GPS_KHDN.DLA_T12 ? (
                  convertToFloat2Fixed(EXEC_DTHU_GPS_KHDN.DLA_T12 / 1000000)
                ) : (
                  ""
                )}
              </td>
              <td>
                {loadingExec ? (
                  <LoadingComponent />
                ) : EXEC_DTHU_GPS_KHDN.DLA_T13 ? (
                  convertToFloat2Fixed(EXEC_DTHU_GPS_KHDN.DLA_T13 / 1000000)
                ) : (
                  ""
                )}
              </td>
              <td>
                {loadingExec ? (
                  <LoadingComponent />
                ) : EXEC_DTHU_GPS_KHDN.DLA_D01 ? (
                  convertToFloat2Fixed(EXEC_DTHU_GPS_KHDN.DLA_D01 / 1000000)
                ) : (
                  ""
                )}
              </td>
              <td>
                {loadingExec ? (
                  <LoadingComponent />
                ) : EXEC_DTHU_GPS_KHDN.DLA_D02 ? (
                  convertToFloat2Fixed(EXEC_DTHU_GPS_KHDN.DLA_D02 / 1000000)
                ) : (
                  ""
                )}
              </td>
              <td>
                {loadingExec ? (
                  <LoadingComponent />
                ) : EXEC_DTHU_GPS_KHDN.DLA_D03 ? (
                  convertToFloat2Fixed(EXEC_DTHU_GPS_KHDN.DLA_D03 / 1000000)
                ) : (
                  ""
                )}
              </td>
              <td>
                {loadingExec ? (
                  <LoadingComponent />
                ) : EXEC_DTHU_GPS_KHDN.DLA_D04 ? (
                  convertToFloat2Fixed(EXEC_DTHU_GPS_KHDN.DLA_D04 / 1000000)
                ) : (
                  ""
                )}
              </td>
              <td>
                {loadingExec ? (
                  <LoadingComponent />
                ) : EXEC_DTHU_GPS_KHDN.DLA_D05 ? (
                  convertToFloat2Fixed(EXEC_DTHU_GPS_KHDN.DLA_D05 / 1000000)
                ) : (
                  ""
                )}
              </td>
              <td>
                {loadingExec ? (
                  <LoadingComponent />
                ) : EXEC_DTHU_GPS_KHDN.DLA_D06 ? (
                  convertToFloat2Fixed(EXEC_DTHU_GPS_KHDN.DLA_D06 / 1000000)
                ) : (
                  ""
                )}
              </td>
              <td>
                {loadingExec ? (
                  <LoadingComponent />
                ) : EXEC_DTHU_GPS_KHDN.TTKDVT ? (
                  convertToFloat2Fixed(EXEC_DTHU_GPS_KHDN.TTKDVT / 1000000)
                ) : (
                  ""
                )}
              </td>
              <td>
                {loadingExec ? (
                  <LoadingComponent />
                ) : EXEC_DTHU_GPS_KHDN.TTKDGPS ? (
                  convertToFloat2Fixed(EXEC_DTHU_GPS_KHDN.TTKDGPS / 1000000)
                ) : (
                  ""
                )}
              </td>
              <td>
                {EXEC_DTHU_GPS_KHDN.LAST_DATE
                  ? getFormattedDate(new Date(EXEC_DTHU_GPS_KHDN.LAST_DATE))
                  : ""}
              </td>
            </tr>
            <tr>
              <td rowSpan={3} className="td-stt td-title-center fix-col-1">
                3
              </td>
              <td rowSpan={3} className="td-title fw-bold td-content fix-col-2">
                Doanh thu thương hiệu giới trẻ{" "}
                <span style={{ fontStyle: "italic" }}>(triệu đồng)</span>
              </td>
              <td className="td-title-center fix-col-3">KH</td>
              <td>
                {" "}
                {loadingPlan ? (
                  <LoadingComponent />
                ) : PLAN_DTHU_SAYMEE.DLA_T01 ? (
                  convertToFloat2Fixed(PLAN_DTHU_SAYMEE.DLA_T01)
                ) : (
                  ""
                )}
              </td>
              <td>
                {" "}
                {loadingPlan ? (
                  <LoadingComponent />
                ) : PLAN_DTHU_SAYMEE.DLA_T02 ? (
                  convertToFloat2Fixed(PLAN_DTHU_SAYMEE.DLA_T02)
                ) : (
                  ""
                )}
              </td>
              <td>
                {" "}
                {loadingPlan ? (
                  <LoadingComponent />
                ) : PLAN_DTHU_SAYMEE.DLA_T02 ? (
                  convertToFloat2Fixed(PLAN_DTHU_SAYMEE.DLA_T03)
                ) : (
                  ""
                )}
              </td>
              <td>
                {" "}
                {loadingPlan ? (
                  <LoadingComponent />
                ) : PLAN_DTHU_SAYMEE.DLA_T03 ? (
                  convertToFloat2Fixed(PLAN_DTHU_SAYMEE.DLA_T04)
                ) : (
                  ""
                )}
              </td>
              <td>
                {" "}
                {loadingPlan ? (
                  <LoadingComponent />
                ) : PLAN_DTHU_SAYMEE.DLA_T05 ? (
                  convertToFloat2Fixed(PLAN_DTHU_SAYMEE.DLA_T05)
                ) : (
                  ""
                )}
              </td>
              <td>
                {" "}
                {loadingPlan ? (
                  <LoadingComponent />
                ) : PLAN_DTHU_SAYMEE.DLA_T06 ? (
                  convertToFloat2Fixed(PLAN_DTHU_SAYMEE.DLA_T06)
                ) : (
                  ""
                )}
              </td>
              <td>
                {" "}
                {loadingPlan ? (
                  <LoadingComponent />
                ) : PLAN_DTHU_SAYMEE.DLA_T07 ? (
                  convertToFloat2Fixed(PLAN_DTHU_SAYMEE.DLA_T07)
                ) : (
                  ""
                )}
              </td>
              <td>
                {" "}
                {loadingPlan ? (
                  <LoadingComponent />
                ) : PLAN_DTHU_SAYMEE.DLA_T08 ? (
                  convertToFloat2Fixed(PLAN_DTHU_SAYMEE.DLA_T08)
                ) : (
                  ""
                )}
              </td>
              <td>
                {" "}
                {loadingPlan ? (
                  <LoadingComponent />
                ) : PLAN_DTHU_SAYMEE.DLA_T09 ? (
                  convertToFloat2Fixed(PLAN_DTHU_SAYMEE.DLA_T09)
                ) : (
                  ""
                )}
              </td>
              <td>
                {" "}
                {loadingPlan ? (
                  <LoadingComponent />
                ) : PLAN_DTHU_SAYMEE.DLA_T10 ? (
                  convertToFloat2Fixed(PLAN_DTHU_SAYMEE.DLA_T10)
                ) : (
                  ""
                )}
              </td>
              <td>
                {" "}
                {loadingPlan ? (
                  <LoadingComponent />
                ) : PLAN_DTHU_SAYMEE.DLA_T11 ? (
                  convertToFloat2Fixed(PLAN_DTHU_SAYMEE.DLA_T11)
                ) : (
                  ""
                )}
              </td>
              <td>
                {" "}
                {loadingPlan ? (
                  <LoadingComponent />
                ) : PLAN_DTHU_SAYMEE.DLA_T12 ? (
                  convertToFloat2Fixed(PLAN_DTHU_SAYMEE.DLA_T12)
                ) : (
                  ""
                )}
              </td>
              <td>
                {" "}
                {loadingPlan ? (
                  <LoadingComponent />
                ) : PLAN_DTHU_SAYMEE.DLA_T13 ? (
                  convertToFloat2Fixed(PLAN_DTHU_SAYMEE.DLA_T13)
                ) : (
                  ""
                )}
              </td>
              <td>
                {" "}
                {loadingPlan ? (
                  <LoadingComponent />
                ) : PLAN_DTHU_SAYMEE.DLA_D01 ? (
                  convertToFloat2Fixed(PLAN_DTHU_SAYMEE.DLA_D01)
                ) : (
                  ""
                )}
              </td>
              <td>
                {" "}
                {loadingPlan ? (
                  <LoadingComponent />
                ) : PLAN_DTHU_SAYMEE.DLA_D02 ? (
                  convertToFloat2Fixed(PLAN_DTHU_SAYMEE.DLA_D02)
                ) : (
                  ""
                )}
              </td>
              <td>
                {" "}
                {loadingPlan ? (
                  <LoadingComponent />
                ) : PLAN_DTHU_SAYMEE.DLA_D03 ? (
                  convertToFloat2Fixed(PLAN_DTHU_SAYMEE.DLA_D03)
                ) : (
                  ""
                )}
              </td>
              <td>
                {" "}
                {loadingPlan ? (
                  <LoadingComponent />
                ) : PLAN_DTHU_SAYMEE.DLA_D04 ? (
                  convertToFloat2Fixed(PLAN_DTHU_SAYMEE.DLA_D04)
                ) : (
                  ""
                )}
              </td>
              <td>
                {" "}
                {loadingPlan ? (
                  <LoadingComponent />
                ) : PLAN_DTHU_SAYMEE.DLA_D05 ? (
                  convertToFloat2Fixed(PLAN_DTHU_SAYMEE.DLA_D05)
                ) : (
                  ""
                )}
              </td>
              <td>
                {" "}
                {loadingPlan ? (
                  <LoadingComponent />
                ) : PLAN_DTHU_SAYMEE.DLA_D06 ? (
                  convertToFloat2Fixed(PLAN_DTHU_SAYMEE.DLA_D06)
                ) : (
                  ""
                )}
              </td>
              <td>
                {" "}
                {loadingPlan ? (
                  <LoadingComponent />
                ) : PLAN_DTHU_SAYMEE.TTKDVT ? (
                  convertToFloat2Fixed(PLAN_DTHU_SAYMEE.TTKDVT)
                ) : (
                  ""
                )}
              </td>
              <td>
                {" "}
                {loadingPlan ? (
                  <LoadingComponent />
                ) : PLAN_DTHU_SAYMEE.TTKDGPS ? (
                  convertToFloat2Fixed(PLAN_DTHU_SAYMEE.TTKDGPS)
                ) : (
                  ""
                )}
              </td>
              <td rowSpan={3}>
                {EXEC_DTHU_SAYMEE.LAST_DATE
                  ? getFormattedDate(new Date(EXEC_DTHU_SAYMEE.LAST_DATE))
                  : ""}
              </td>
            </tr>
            <tr>
              <td className="td-title-center fix-col-3">TH</td>
              <td>
                {loadingExec ? (
                  <LoadingComponent />
                ) : EXEC_DTHU_SAYMEE.DLA_T01 ? (
                  convertToFloat2Fixed(EXEC_DTHU_SAYMEE.DLA_T01 / 1000000)
                ) : (
                  ""
                )}
              </td>
              <td>
                {loadingExec ? (
                  <LoadingComponent />
                ) : EXEC_DTHU_SAYMEE.DLA_T02 ? (
                  convertToFloat2Fixed(EXEC_DTHU_SAYMEE.DLA_T02 / 1000000)
                ) : (
                  ""
                )}
              </td>
              <td>
                {loadingExec ? (
                  <LoadingComponent />
                ) : EXEC_DTHU_SAYMEE.DLA_T03 ? (
                  convertToFloat2Fixed(EXEC_DTHU_SAYMEE.DLA_T03 / 1000000)
                ) : (
                  ""
                )}
              </td>
              <td>
                {loadingExec ? (
                  <LoadingComponent />
                ) : EXEC_DTHU_SAYMEE.DLA_T04 ? (
                  convertToFloat2Fixed(EXEC_DTHU_SAYMEE.DLA_T04 / 1000000)
                ) : (
                  ""
                )}
              </td>
              <td>
                {loadingExec ? (
                  <LoadingComponent />
                ) : EXEC_DTHU_SAYMEE.DLA_T05 ? (
                  convertToFloat2Fixed(EXEC_DTHU_SAYMEE.DLA_T05 / 1000000)
                ) : (
                  ""
                )}
              </td>
              <td>
                {loadingExec ? (
                  <LoadingComponent />
                ) : EXEC_DTHU_SAYMEE.DLA_T06 ? (
                  convertToFloat2Fixed(EXEC_DTHU_SAYMEE.DLA_T06 / 1000000)
                ) : (
                  ""
                )}
              </td>
              <td>
                {loadingExec ? (
                  <LoadingComponent />
                ) : EXEC_DTHU_SAYMEE.DLA_T07 ? (
                  convertToFloat2Fixed(EXEC_DTHU_SAYMEE.DLA_T07 / 1000000)
                ) : (
                  ""
                )}
              </td>
              <td>
                {loadingExec ? (
                  <LoadingComponent />
                ) : EXEC_DTHU_SAYMEE.DLA_T08 ? (
                  convertToFloat2Fixed(EXEC_DTHU_SAYMEE.DLA_T08 / 1000000)
                ) : (
                  ""
                )}
              </td>
              <td>
                {loadingExec ? (
                  <LoadingComponent />
                ) : EXEC_DTHU_SAYMEE.DLA_T09 ? (
                  convertToFloat2Fixed(EXEC_DTHU_SAYMEE.DLA_T09 / 1000000)
                ) : (
                  ""
                )}
              </td>
              <td>
                {loadingExec ? (
                  <LoadingComponent />
                ) : EXEC_DTHU_SAYMEE.DLA_T10 ? (
                  convertToFloat2Fixed(EXEC_DTHU_SAYMEE.DLA_T10 / 1000000)
                ) : (
                  ""
                )}
              </td>
              <td>
                {loadingExec ? (
                  <LoadingComponent />
                ) : EXEC_DTHU_SAYMEE.DLA_T11 ? (
                  convertToFloat2Fixed(EXEC_DTHU_SAYMEE.DLA_T11 / 1000000)
                ) : (
                  ""
                )}
              </td>
              <td>
                {loadingExec ? (
                  <LoadingComponent />
                ) : EXEC_DTHU_SAYMEE.DLA_T12 ? (
                  convertToFloat2Fixed(EXEC_DTHU_SAYMEE.DLA_T12 / 1000000)
                ) : (
                  ""
                )}
              </td>
              <td>
                {loadingExec ? (
                  <LoadingComponent />
                ) : EXEC_DTHU_SAYMEE.DLA_T13 ? (
                  convertToFloat2Fixed(EXEC_DTHU_SAYMEE.DLA_T13 / 1000000)
                ) : (
                  ""
                )}
              </td>
              <td>
                {loadingExec ? (
                  <LoadingComponent />
                ) : EXEC_DTHU_SAYMEE.DLA_D01 ? (
                  convertToFloat2Fixed(EXEC_DTHU_SAYMEE.DLA_D01 / 1000000)
                ) : (
                  ""
                )}
              </td>
              <td>
                {loadingExec ? (
                  <LoadingComponent />
                ) : EXEC_DTHU_SAYMEE.DLA_D02 ? (
                  convertToFloat2Fixed(EXEC_DTHU_SAYMEE.DLA_D02 / 1000000)
                ) : (
                  ""
                )}
              </td>
              <td>
                {loadingExec ? (
                  <LoadingComponent />
                ) : EXEC_DTHU_SAYMEE.DLA_D03 ? (
                  convertToFloat2Fixed(EXEC_DTHU_SAYMEE.DLA_D03 / 1000000)
                ) : (
                  ""
                )}
              </td>
              <td>
                {loadingExec ? (
                  <LoadingComponent />
                ) : EXEC_DTHU_SAYMEE.DLA_D04 ? (
                  convertToFloat2Fixed(EXEC_DTHU_SAYMEE.DLA_D04 / 1000000)
                ) : (
                  ""
                )}
              </td>
              <td>
                {loadingExec ? (
                  <LoadingComponent />
                ) : EXEC_DTHU_SAYMEE.DLA_D05 ? (
                  convertToFloat2Fixed(EXEC_DTHU_SAYMEE.DLA_D05 / 1000000)
                ) : (
                  ""
                )}
              </td>
              <td>
                {loadingExec ? (
                  <LoadingComponent />
                ) : EXEC_DTHU_SAYMEE.DLA_D06 ? (
                  convertToFloat2Fixed(EXEC_DTHU_SAYMEE.DLA_D06 / 1000000)
                ) : (
                  ""
                )}
              </td>
              <td>
                {loadingExec ? (
                  <LoadingComponent />
                ) : (
                  convertToFloat2Fixed(
                    convertToNumber(EXEC_DTHU_SAYMEE.DLA_T01) / 1000000 +
                      convertToNumber(EXEC_DTHU_SAYMEE.DLA_T02) / 1000000 +
                      convertToNumber(EXEC_DTHU_SAYMEE.DLA_T03) / 1000000 +
                      convertToNumber(EXEC_DTHU_SAYMEE.DLA_T04) / 1000000 +
                      convertToNumber(EXEC_DTHU_SAYMEE.DLA_T05) / 1000000 +
                      convertToNumber(EXEC_DTHU_SAYMEE.DLA_T06) / 1000000 +
                      convertToNumber(EXEC_DTHU_SAYMEE.DLA_T07) / 1000000 +
                      convertToNumber(EXEC_DTHU_SAYMEE.DLA_T08) / 1000000 +
                      convertToNumber(EXEC_DTHU_SAYMEE.DLA_T09) / 1000000 +
                      convertToNumber(EXEC_DTHU_SAYMEE.DLA_T10) / 1000000 +
                      convertToNumber(EXEC_DTHU_SAYMEE.DLA_T11) / 1000000 +
                      convertToNumber(EXEC_DTHU_SAYMEE.DLA_T12) / 1000000 +
                      convertToNumber(EXEC_DTHU_SAYMEE.DLA_T13) / 1000000 +
                      convertToNumber(EXEC_DTHU_SAYMEE.DLA_D01) / 1000000 +
                      convertToNumber(EXEC_DTHU_SAYMEE.DLA_D02) / 1000000 +
                      convertToNumber(EXEC_DTHU_SAYMEE.DLA_D03) / 1000000 +
                      convertToNumber(EXEC_DTHU_SAYMEE.DLA_D04) / 1000000 +
                      convertToNumber(EXEC_DTHU_SAYMEE.DLA_D05) / 1000000 +
                      convertToNumber(EXEC_DTHU_SAYMEE.DLA_D06) / 1000000
                  )
                )}
              </td>
              <td>
                {loadingExec ? (
                  <LoadingComponent />
                ) : EXEC_DTHU_SAYMEE.TTKDGPS ? (
                  convertToFloat2Fixed(EXEC_DTHU_SAYMEE.TTKDGPS / 1000000)
                ) : (
                  ""
                )}
              </td>
            </tr>
            <tr>
              <td className="td-title-center td-kh fix-col-3">%TH</td>
              <td
                className={
                  (convertToNumber(EXEC_DTHU_SAYMEE.DLA_T01) * 100) /
                    (convertToNumberMauso(PLAN_DTHU_SAYMEE.DLA_T01) * 1000000) >
                  processKPI
                    ? "bg-green"
                    : "bg-red"
                }
              >
                {loadingExec || loadingPlan ? (
                  <LoadingComponent />
                ) : EXEC_DTHU_SAYMEE.DLA_T01 && PLAN_DTHU_SAYMEE.DLA_T01 ? (
                  convertToFloat2Fixed(
                    ((EXEC_DTHU_SAYMEE.DLA_T01 / 1000000) * 100) /
                      PLAN_DTHU_SAYMEE.DLA_T01
                  ) + "%"
                ) : (
                  ""
                )}
              </td>
              <td
                className={
                  (convertToNumber(EXEC_DTHU_SAYMEE.DLA_T02) * 100) /
                    (convertToNumberMauso(PLAN_DTHU_SAYMEE.DLA_T02) * 1000000) >
                  processKPI
                    ? "bg-green"
                    : "bg-red"
                }
              >
                {loadingExec || loadingPlan ? (
                  <LoadingComponent />
                ) : EXEC_DTHU_SAYMEE.DLA_T02 && PLAN_DTHU_SAYMEE.DLA_T02 ? (
                  convertToFloat2Fixed(
                    ((EXEC_DTHU_SAYMEE.DLA_T02 / 1000000) * 100) /
                      PLAN_DTHU_SAYMEE.DLA_T02
                  ) + "%"
                ) : (
                  ""
                )}
              </td>

              <td
                className={
                  (convertToNumber(EXEC_DTHU_SAYMEE.DLA_T03) * 100) /
                    (convertToNumberMauso(PLAN_DTHU_SAYMEE.DLA_T03) * 1000000) >
                  processKPI
                    ? "bg-green"
                    : "bg-red"
                }
              >
                {loadingExec || loadingPlan ? (
                  <LoadingComponent />
                ) : EXEC_DTHU_SAYMEE.DLA_T03 && PLAN_DTHU_SAYMEE.DLA_T03 ? (
                  convertToFloat2Fixed(
                    ((EXEC_DTHU_SAYMEE.DLA_T03 / 1000000) * 100) /
                      PLAN_DTHU_SAYMEE.DLA_T03
                  ) + "%"
                ) : (
                  ""
                )}
              </td>
              <td
                className={
                  (convertToNumber(EXEC_DTHU_SAYMEE.DLA_T04) * 100) /
                    (convertToNumberMauso(PLAN_DTHU_SAYMEE.DLA_T04) * 1000000) >
                  processKPI
                    ? "bg-green"
                    : "bg-red"
                }
              >
                {loadingExec || loadingPlan ? (
                  <LoadingComponent />
                ) : EXEC_DTHU_SAYMEE.DLA_T04 && PLAN_DTHU_SAYMEE.DLA_T04 ? (
                  convertToFloat2Fixed(
                    ((EXEC_DTHU_SAYMEE.DLA_T04 / 1000000) * 100) /
                      PLAN_DTHU_SAYMEE.DLA_T04
                  ) + "%"
                ) : (
                  ""
                )}
              </td>
              <td
                className={
                  (convertToNumber(EXEC_DTHU_SAYMEE.DLA_T05) * 100) /
                    (convertToNumberMauso(PLAN_DTHU_SAYMEE.DLA_T05) * 1000000) >
                  processKPI
                    ? "bg-green"
                    : "bg-red"
                }
              >
                {loadingExec || loadingPlan ? (
                  <LoadingComponent />
                ) : EXEC_DTHU_SAYMEE.DLA_T05 && PLAN_DTHU_SAYMEE.DLA_T05 ? (
                  convertToFloat2Fixed(
                    ((EXEC_DTHU_SAYMEE.DLA_T05 / 1000000) * 100) /
                      PLAN_DTHU_SAYMEE.DLA_T05
                  ) + "%"
                ) : (
                  ""
                )}
              </td>
              <td
                className={
                  (convertToNumber(EXEC_DTHU_SAYMEE.DLA_T06) * 100) /
                    (convertToNumberMauso(PLAN_DTHU_SAYMEE.DLA_T06) * 1000000) >
                  processKPI
                    ? "bg-green"
                    : "bg-red"
                }
              >
                {loadingExec || loadingPlan ? (
                  <LoadingComponent />
                ) : EXEC_DTHU_SAYMEE.DLA_T06 && PLAN_DTHU_SAYMEE.DLA_T06 ? (
                  convertToFloat2Fixed(
                    ((EXEC_DTHU_SAYMEE.DLA_T06 / 1000000) * 100) /
                      PLAN_DTHU_SAYMEE.DLA_T06
                  ) + "%"
                ) : (
                  ""
                )}
              </td>
              <td
                className={
                  (convertToNumber(EXEC_DTHU_SAYMEE.DLA_T07) * 100) /
                    (convertToNumberMauso(PLAN_DTHU_SAYMEE.DLA_T07) * 1000000) >
                  processKPI
                    ? "bg-green"
                    : "bg-red"
                }
              >
                {loadingExec || loadingPlan ? (
                  <LoadingComponent />
                ) : EXEC_DTHU_SAYMEE.DLA_T07 && PLAN_DTHU_SAYMEE.DLA_T07 ? (
                  convertToFloat2Fixed(
                    ((EXEC_DTHU_SAYMEE.DLA_T07 / 1000000) * 100) /
                      PLAN_DTHU_SAYMEE.DLA_T07
                  ) + "%"
                ) : (
                  ""
                )}
              </td>
              <td
                className={
                  (convertToNumber(EXEC_DTHU_SAYMEE.DLA_T08) * 100) /
                    (convertToNumberMauso(PLAN_DTHU_SAYMEE.DLA_T08) * 1000000) >
                  processKPI
                    ? "bg-green"
                    : "bg-red"
                }
              >
                {loadingExec || loadingPlan ? (
                  <LoadingComponent />
                ) : EXEC_DTHU_SAYMEE.DLA_T08 && PLAN_DTHU_SAYMEE.DLA_T08 ? (
                  convertToFloat2Fixed(
                    ((EXEC_DTHU_SAYMEE.DLA_T08 / 1000000) * 100) /
                      PLAN_DTHU_SAYMEE.DLA_T08
                  ) + "%"
                ) : (
                  ""
                )}
              </td>
              <td
                className={
                  (convertToNumber(EXEC_DTHU_SAYMEE.DLA_T09) * 100) /
                    (convertToNumberMauso(PLAN_DTHU_SAYMEE.DLA_T09) * 1000000) >
                  processKPI
                    ? "bg-green"
                    : "bg-red"
                }
              >
                {loadingExec || loadingPlan ? (
                  <LoadingComponent />
                ) : EXEC_DTHU_SAYMEE.DLA_T09 && PLAN_DTHU_SAYMEE.DLA_T09 ? (
                  convertToFloat2Fixed(
                    ((EXEC_DTHU_SAYMEE.DLA_T09 / 1000000) * 100) /
                      PLAN_DTHU_SAYMEE.DLA_T09
                  ) + "%"
                ) : (
                  ""
                )}
              </td>
              <td
                className={
                  (convertToNumber(EXEC_DTHU_SAYMEE.DLA_T10) * 100) /
                    (convertToNumberMauso(PLAN_DTHU_SAYMEE.DLA_T10) * 1000000) >
                  processKPI
                    ? "bg-green"
                    : "bg-red"
                }
              >
                {loadingExec || loadingPlan ? (
                  <LoadingComponent />
                ) : EXEC_DTHU_SAYMEE.DLA_T10 && PLAN_DTHU_SAYMEE.DLA_T10 ? (
                  convertToFloat2Fixed(
                    ((EXEC_DTHU_SAYMEE.DLA_T10 / 1000000) * 100) /
                      PLAN_DTHU_SAYMEE.DLA_T10
                  ) + "%"
                ) : (
                  ""
                )}
              </td>
              <td
                className={
                  (convertToNumber(EXEC_DTHU_SAYMEE.DLA_T11) * 100) /
                    (convertToNumberMauso(PLAN_DTHU_SAYMEE.DLA_T11) * 1000000) >
                  processKPI
                    ? "bg-green"
                    : "bg-red"
                }
              >
                {loadingExec || loadingPlan ? (
                  <LoadingComponent />
                ) : EXEC_DTHU_SAYMEE.DLA_T11 && PLAN_DTHU_SAYMEE.DLA_T11 ? (
                  convertToFloat2Fixed(
                    ((EXEC_DTHU_SAYMEE.DLA_T11 / 1000000) * 100) /
                      PLAN_DTHU_SAYMEE.DLA_T11
                  ) + "%"
                ) : (
                  ""
                )}
              </td>
              <td
                className={
                  (convertToNumber(EXEC_DTHU_SAYMEE.DLA_T12) * 100) /
                    (convertToNumberMauso(PLAN_DTHU_SAYMEE.DLA_T12) * 1000000) >
                  processKPI
                    ? "bg-green"
                    : "bg-red"
                }
              >
                {loadingExec || loadingPlan ? (
                  <LoadingComponent />
                ) : EXEC_DTHU_SAYMEE.DLA_T12 && PLAN_DTHU_SAYMEE.DLA_T12 ? (
                  convertToFloat2Fixed(
                    ((EXEC_DTHU_SAYMEE.DLA_T12 / 1000000) * 100) /
                      PLAN_DTHU_SAYMEE.DLA_T12
                  ) + "%"
                ) : (
                  ""
                )}
              </td>
              <td
                className={
                  (convertToNumber(EXEC_DTHU_SAYMEE.DLA_T13) * 100) /
                    (convertToNumberMauso(PLAN_DTHU_SAYMEE.DLA_T13) * 1000000) >
                  processKPI
                    ? "bg-green"
                    : "bg-red"
                }
              >
                {loadingExec || loadingPlan ? (
                  <LoadingComponent />
                ) : EXEC_DTHU_SAYMEE.DLA_T13 && PLAN_DTHU_SAYMEE.DLA_T13 ? (
                  convertToFloat2Fixed(
                    ((EXEC_DTHU_SAYMEE.DLA_T13 / 1000000) * 100) /
                      PLAN_DTHU_SAYMEE.DLA_T13
                  ) + "%"
                ) : (
                  ""
                )}
              </td>
              <td
                className={
                  (convertToNumber(EXEC_DTHU_SAYMEE.DLA_D01) * 100) /
                    (convertToNumberMauso(PLAN_DTHU_SAYMEE.DLA_D01) * 1000000) >
                  processKPI
                    ? "bg-green"
                    : "bg-red"
                }
              >
                {loadingExec || loadingPlan ? (
                  <LoadingComponent />
                ) : EXEC_DTHU_SAYMEE.DLA_D01 && PLAN_DTHU_SAYMEE.DLA_D01 ? (
                  convertToFloat2Fixed(
                    ((EXEC_DTHU_SAYMEE.DLA_D01 / 1000000) * 100) /
                      PLAN_DTHU_SAYMEE.DLA_D01
                  ) + "%"
                ) : (
                  ""
                )}
              </td>
              <td
                className={
                  (convertToNumber(EXEC_DTHU_SAYMEE.DLA_D02) * 100) /
                    (convertToNumberMauso(PLAN_DTHU_SAYMEE.DLA_D02) * 1000000) >
                  processKPI
                    ? "bg-green"
                    : "bg-red"
                }
              >
                {loadingExec || loadingPlan ? (
                  <LoadingComponent />
                ) : EXEC_DTHU_SAYMEE.DLA_D02 && PLAN_DTHU_SAYMEE.DLA_D02 ? (
                  convertToFloat2Fixed(
                    ((EXEC_DTHU_SAYMEE.DLA_D02 / 1000000) * 100) /
                      PLAN_DTHU_SAYMEE.DLA_D02
                  ) + "%"
                ) : (
                  ""
                )}
              </td>
              <td
                className={
                  (convertToNumber(EXEC_DTHU_SAYMEE.DLA_D03) * 100) /
                    (convertToNumberMauso(PLAN_DTHU_SAYMEE.DLA_D03) * 1000000) >
                  processKPI
                    ? "bg-green"
                    : "bg-red"
                }
              >
                {loadingExec || loadingPlan ? (
                  <LoadingComponent />
                ) : EXEC_DTHU_SAYMEE.DLA_D03 && PLAN_DTHU_SAYMEE.DLA_D03 ? (
                  convertToFloat2Fixed(
                    ((EXEC_DTHU_SAYMEE.DLA_D03 / 1000000) * 100) /
                      PLAN_DTHU_SAYMEE.DLA_D03
                  ) + "%"
                ) : (
                  ""
                )}
              </td>
              <td
                className={
                  (convertToNumber(EXEC_DTHU_SAYMEE.DLA_D04) * 100) /
                    (convertToNumberMauso(PLAN_DTHU_SAYMEE.DLA_D04) * 1000000) >
                  processKPI
                    ? "bg-green"
                    : "bg-red"
                }
              >
                {loadingExec || loadingPlan ? (
                  <LoadingComponent />
                ) : EXEC_DTHU_SAYMEE.DLA_D04 && PLAN_DTHU_SAYMEE.DLA_D04 ? (
                  convertToFloat2Fixed(
                    ((EXEC_DTHU_SAYMEE.DLA_D04 / 1000000) * 100) /
                      PLAN_DTHU_SAYMEE.DLA_D04
                  ) + "%"
                ) : (
                  ""
                )}
              </td>
              <td
                className={
                  (convertToNumber(EXEC_DTHU_SAYMEE.DLA_D05) * 100) /
                    (convertToNumberMauso(PLAN_DTHU_SAYMEE.DLA_D05) * 1000000) >
                  processKPI
                    ? "bg-green"
                    : "bg-red"
                }
              >
                {loadingExec || loadingPlan ? (
                  <LoadingComponent />
                ) : EXEC_DTHU_SAYMEE.DLA_D05 && PLAN_DTHU_SAYMEE.DLA_D05 ? (
                  convertToFloat2Fixed(
                    ((EXEC_DTHU_SAYMEE.DLA_D05 / 1000000) * 100) /
                      PLAN_DTHU_SAYMEE.DLA_D05
                  ) + "%"
                ) : (
                  ""
                )}
              </td>
              <td
                className={
                  (convertToNumber(EXEC_DTHU_SAYMEE.DLA_D06) * 100) /
                    (convertToNumberMauso(PLAN_DTHU_SAYMEE.DLA_D06) * 1000000) >
                  processKPI
                    ? "bg-green"
                    : "bg-red"
                }
              >
                {loadingExec || loadingPlan ? (
                  <LoadingComponent />
                ) : EXEC_DTHU_SAYMEE.DLA_D06 && PLAN_DTHU_SAYMEE.DLA_D06 ? (
                  convertToFloat2Fixed(
                    ((EXEC_DTHU_SAYMEE.DLA_D06 / 1000000) * 100) /
                      PLAN_DTHU_SAYMEE.DLA_D06
                  ) + "%"
                ) : (
                  ""
                )}
              </td>
              <td
                className={
                  ((EXEC_DTHU_SAYMEE.DLA_T01 / 1000000 +
                    EXEC_DTHU_SAYMEE.DLA_T02 / 1000000 +
                    EXEC_DTHU_SAYMEE.DLA_T03 / 1000000 +
                    EXEC_DTHU_SAYMEE.DLA_T04 / 1000000 +
                    EXEC_DTHU_SAYMEE.DLA_T05 / 1000000 +
                    EXEC_DTHU_SAYMEE.DLA_T06 / 1000000 +
                    EXEC_DTHU_SAYMEE.DLA_T07 / 1000000 +
                    EXEC_DTHU_SAYMEE.DLA_T08 / 1000000 +
                    EXEC_DTHU_SAYMEE.DLA_T09 / 1000000 +
                    EXEC_DTHU_SAYMEE.DLA_T10 / 1000000 +
                    EXEC_DTHU_SAYMEE.DLA_T11 / 1000000 +
                    EXEC_DTHU_SAYMEE.DLA_T12 / 1000000 +
                    EXEC_DTHU_SAYMEE.DLA_T13 / 1000000 +
                    EXEC_DTHU_SAYMEE.DLA_D01 / 1000000 +
                    EXEC_DTHU_SAYMEE.DLA_D02 / 1000000 +
                    EXEC_DTHU_SAYMEE.DLA_D03 / 1000000 +
                    EXEC_DTHU_SAYMEE.DLA_D04 / 1000000 +
                    EXEC_DTHU_SAYMEE.DLA_D05 / 1000000 +
                    EXEC_DTHU_SAYMEE.DLA_D06 / 1000000) *
                    100) /
                    convertToNumberMauso(PLAN_DTHU_SAYMEE.TTKDVT) >
                  processKPI
                    ? "bg-green"
                    : "bg-red"
                }
              >
                {loadingExec || loadingPlan ? (
                  <LoadingComponent />
                ) : (
                  convertToFloat2Fixed((
                    (convertToNumber(EXEC_DTHU_SAYMEE.DLA_T01) / 1000000 +
                      convertToNumber(EXEC_DTHU_SAYMEE.DLA_T02) / 1000000 +
                      convertToNumber(EXEC_DTHU_SAYMEE.DLA_T03) / 1000000 +
                      convertToNumber(EXEC_DTHU_SAYMEE.DLA_T04) / 1000000 +
                      convertToNumber(EXEC_DTHU_SAYMEE.DLA_T05) / 1000000 +
                      convertToNumber(EXEC_DTHU_SAYMEE.DLA_T06) / 1000000 +
                      convertToNumber(EXEC_DTHU_SAYMEE.DLA_T07) / 1000000 +
                      convertToNumber(EXEC_DTHU_SAYMEE.DLA_T08) / 1000000 +
                      convertToNumber(EXEC_DTHU_SAYMEE.DLA_T09) / 1000000 +
                      convertToNumber(EXEC_DTHU_SAYMEE.DLA_T10) / 1000000 +
                      convertToNumber(EXEC_DTHU_SAYMEE.DLA_T11) / 1000000 +
                      convertToNumber(EXEC_DTHU_SAYMEE.DLA_T12) / 1000000 +
                      convertToNumber(EXEC_DTHU_SAYMEE.DLA_T13) / 1000000 +
                      convertToNumber(EXEC_DTHU_SAYMEE.DLA_D01) / 1000000 +
                      convertToNumber(EXEC_DTHU_SAYMEE.DLA_D02) / 1000000 +
                      convertToNumber(EXEC_DTHU_SAYMEE.DLA_D03) / 1000000 +
                      convertToNumber(EXEC_DTHU_SAYMEE.DLA_D04) / 1000000 +
                      convertToNumber(EXEC_DTHU_SAYMEE.DLA_D05) / 1000000 +
                      convertToNumber(EXEC_DTHU_SAYMEE.DLA_D06) / 1000000) /
                      convertToNumberMauso(PLAN_DTHU_SAYMEE.TTKDVT)
                  )*
                    100) +
                  "%"
                )}
              </td>
              <td
              // className={
              //   (convertToNumber(EXEC_DTHU_SAYMEE.TTKDGPS) * 100) /
              //     (convertToNumberMauso(PLAN_DTHU_SAYMEE.TTKDGPS) * 1000000) >
              //   processKPI
              //     ? "bg-green"
              //     : "bg-red"
              // }
              >
                {loadingExec || loadingPlan ? (
                  <LoadingComponent />
                ) : EXEC_DTHU_SAYMEE.TTKDGPS && PLAN_DTHU_SAYMEE.TTKDGPS ? (
                  convertToFloat2Fixed(
                    ((EXEC_DTHU_SAYMEE.TTKDGPS / 1000000) * 100) /
                      PLAN_DTHU_SAYMEE.TTKDGPS
                  ) + "%"
                ) : (
                  ""
                )}
              </td>
            </tr>
            <tr>
              <td
                colSpan={25}
                className=" td-title td-color-yellow fw-bold td-stt "
              >
                II. Viễn cảnh khách hàng
              </td>
            </tr>
            <tr>
              <td className="td-title-center ">4</td>
              <td colSpan={24} className="td-title fw-bold td-content">
                Phát triển kênh phân phối
              </td>
            </tr>
            <tr>
              <td rowSpan={3} className="td-title-center  td-stt fix-col-1 ">
                4.1
              </td>
              <td rowSpan={3} className="td-title   td-content fix-col-2">
                Số lượng thuê bao phát triển mới qua kênh C2C
              </td>
              <td className="td-title-center td-kh fix-col-3">KH</td>
              <td>
                {" "}
                {loadingPlan ? (
                  <LoadingComponent />
                ) : PLAN_SL_TB_C2C.DLA_T01 ? (
                  convertToFloat2Fixed(PLAN_SL_TB_C2C.DLA_T01)
                ) : (
                  ""
                )}
              </td>
              <td>
                {" "}
                {loadingPlan ? (
                  <LoadingComponent />
                ) : PLAN_SL_TB_C2C.DLA_T02 ? (
                  convertToFloat2Fixed(PLAN_SL_TB_C2C.DLA_T02)
                ) : (
                  ""
                )}
              </td>
              <td>
                {" "}
                {loadingPlan ? (
                  <LoadingComponent />
                ) : PLAN_SL_TB_C2C.DLA_T03 ? (
                  convertToFloat2Fixed(PLAN_SL_TB_C2C.DLA_T03)
                ) : (
                  ""
                )}
              </td>
              <td>
                {" "}
                {loadingPlan ? (
                  <LoadingComponent />
                ) : PLAN_SL_TB_C2C.DLA_T04 ? (
                  convertToFloat2Fixed(PLAN_SL_TB_C2C.DLA_T04)
                ) : (
                  ""
                )}
              </td>
              <td>
                {" "}
                {loadingPlan ? (
                  <LoadingComponent />
                ) : PLAN_SL_TB_C2C.DLA_T05 ? (
                  convertToFloat2Fixed(PLAN_SL_TB_C2C.DLA_T05)
                ) : (
                  ""
                )}
              </td>
              <td>
                {" "}
                {loadingPlan ? (
                  <LoadingComponent />
                ) : PLAN_SL_TB_C2C.DLA_T06 ? (
                  convertToFloat2Fixed(PLAN_SL_TB_C2C.DLA_T06)
                ) : (
                  ""
                )}
              </td>
              <td>
                {" "}
                {loadingPlan ? (
                  <LoadingComponent />
                ) : PLAN_SL_TB_C2C.DLA_T07 ? (
                  convertToFloat2Fixed(PLAN_SL_TB_C2C.DLA_T07)
                ) : (
                  ""
                )}
              </td>
              <td>
                {" "}
                {loadingPlan ? (
                  <LoadingComponent />
                ) : PLAN_SL_TB_C2C.DLA_T08 ? (
                  convertToFloat2Fixed(PLAN_SL_TB_C2C.DLA_T08)
                ) : (
                  ""
                )}
              </td>
              <td>
                {" "}
                {loadingPlan ? (
                  <LoadingComponent />
                ) : PLAN_SL_TB_C2C.DLA_T09 ? (
                  convertToFloat2Fixed(PLAN_SL_TB_C2C.DLA_T09)
                ) : (
                  ""
                )}
              </td>
              <td>
                {" "}
                {loadingPlan ? (
                  <LoadingComponent />
                ) : PLAN_SL_TB_C2C.DLA_T10 ? (
                  convertToFloat2Fixed(PLAN_SL_TB_C2C.DLA_T10)
                ) : (
                  ""
                )}
              </td>
              <td>
                {" "}
                {loadingPlan ? (
                  <LoadingComponent />
                ) : PLAN_SL_TB_C2C.DLA_T11 ? (
                  convertToFloat2Fixed(PLAN_SL_TB_C2C.DLA_T11)
                ) : (
                  ""
                )}
              </td>
              <td>
                {" "}
                {loadingPlan ? (
                  <LoadingComponent />
                ) : PLAN_SL_TB_C2C.DLA_T12 ? (
                  convertToFloat2Fixed(PLAN_SL_TB_C2C.DLA_T12)
                ) : (
                  ""
                )}
              </td>
              <td>
                {" "}
                {loadingPlan ? (
                  <LoadingComponent />
                ) : PLAN_SL_TB_C2C.DLA_T13 ? (
                  convertToFloat2Fixed(PLAN_SL_TB_C2C.DLA_T13)
                ) : (
                  ""
                )}
              </td>
              <td>
                {" "}
                {loadingPlan ? (
                  <LoadingComponent />
                ) : PLAN_SL_TB_C2C.DLA_D01 ? (
                  convertToFloat2Fixed(PLAN_SL_TB_C2C.DLA_D01)
                ) : (
                  ""
                )}
              </td>
              <td>
                {" "}
                {loadingPlan ? (
                  <LoadingComponent />
                ) : PLAN_SL_TB_C2C.DLA_D02 ? (
                  convertToFloat2Fixed(PLAN_SL_TB_C2C.DLA_D02)
                ) : (
                  ""
                )}
              </td>
              <td>
                {" "}
                {loadingPlan ? (
                  <LoadingComponent />
                ) : PLAN_SL_TB_C2C.DLA_D03 ? (
                  convertToFloat2Fixed(PLAN_SL_TB_C2C.DLA_D03)
                ) : (
                  ""
                )}
              </td>
              <td>
                {" "}
                {loadingPlan ? (
                  <LoadingComponent />
                ) : PLAN_SL_TB_C2C.DLA_D04 ? (
                  convertToFloat2Fixed(PLAN_SL_TB_C2C.DLA_D04)
                ) : (
                  ""
                )}
              </td>
              <td>
                {" "}
                {loadingPlan ? (
                  <LoadingComponent />
                ) : PLAN_SL_TB_C2C.DLA_D05 ? (
                  convertToFloat2Fixed(PLAN_SL_TB_C2C.DLA_D05)
                ) : (
                  ""
                )}
              </td>
              <td>
                {" "}
                {loadingPlan ? (
                  <LoadingComponent />
                ) : PLAN_SL_TB_C2C.DLA_D06 ? (
                  convertToFloat2Fixed(PLAN_SL_TB_C2C.DLA_D06)
                ) : (
                  ""
                )}
              </td>
              <td>
                {" "}
                {loadingPlan ? (
                  <LoadingComponent />
                ) : PLAN_SL_TB_C2C.TTKDVT ? (
                  convertToFloat2Fixed(PLAN_SL_TB_C2C.TTKDVT)
                ) : (
                  ""
                )}
              </td>
              <td>
                {" "}
                {loadingPlan ? (
                  <LoadingComponent />
                ) : PLAN_SL_TB_C2C.TTKDGPS ? (
                  convertToFloat2Fixed(PLAN_SL_TB_C2C.TTKDGPS)
                ) : (
                  ""
                )}
              </td>
              <td rowSpan={3}>
                {EXEC_SL_TB_C2C.LAST_DATE
                  ? getFormattedDate(new Date(EXEC_SL_TB_C2C.LAST_DATE))
                  : ""}
              </td>
            </tr>
            <tr>
              <td className="td-title-center td-kh fix-col-3">TH</td>
              <td>
                {" "}
                {loadingPlan ? (
                  <LoadingComponent />
                ) : EXEC_SL_TB_C2C.DLA_T01 ? (
                  convertToFloat2Fixed(EXEC_SL_TB_C2C.DLA_T01)
                ) : (
                  ""
                )}
              </td>
              <td>
                {" "}
                {loadingPlan ? (
                  <LoadingComponent />
                ) : EXEC_SL_TB_C2C.DLA_T02 ? (
                  convertToFloat2Fixed(EXEC_SL_TB_C2C.DLA_T02)
                ) : (
                  ""
                )}
              </td>
              <td>
                {" "}
                {loadingPlan ? (
                  <LoadingComponent />
                ) : EXEC_SL_TB_C2C.DLA_T03 ? (
                  convertToFloat2Fixed(EXEC_SL_TB_C2C.DLA_T03)
                ) : (
                  ""
                )}
              </td>
              <td>
                {" "}
                {loadingPlan ? (
                  <LoadingComponent />
                ) : EXEC_SL_TB_C2C.DLA_T04 ? (
                  convertToFloat2Fixed(EXEC_SL_TB_C2C.DLA_T04)
                ) : (
                  ""
                )}
              </td>
              <td>
                {" "}
                {loadingPlan ? (
                  <LoadingComponent />
                ) : EXEC_SL_TB_C2C.DLA_T05 ? (
                  convertToFloat2Fixed(EXEC_SL_TB_C2C.DLA_T05)
                ) : (
                  ""
                )}
              </td>
              <td>
                {" "}
                {loadingPlan ? (
                  <LoadingComponent />
                ) : EXEC_SL_TB_C2C.DLA_T06 ? (
                  convertToFloat2Fixed(EXEC_SL_TB_C2C.DLA_T06)
                ) : (
                  ""
                )}
              </td>
              <td>
                {" "}
                {loadingPlan ? (
                  <LoadingComponent />
                ) : EXEC_SL_TB_C2C.DLA_T07 ? (
                  convertToFloat2Fixed(EXEC_SL_TB_C2C.DLA_T07)
                ) : (
                  ""
                )}
              </td>
              <td>
                {" "}
                {loadingPlan ? (
                  <LoadingComponent />
                ) : EXEC_SL_TB_C2C.DLA_T08 ? (
                  convertToFloat2Fixed(EXEC_SL_TB_C2C.DLA_T08)
                ) : (
                  ""
                )}
              </td>
              <td>
                {" "}
                {loadingPlan ? (
                  <LoadingComponent />
                ) : EXEC_SL_TB_C2C.DLA_T09 ? (
                  convertToFloat2Fixed(EXEC_SL_TB_C2C.DLA_T09)
                ) : (
                  ""
                )}
              </td>
              <td>
                {" "}
                {loadingPlan ? (
                  <LoadingComponent />
                ) : EXEC_SL_TB_C2C.DLA_T10 ? (
                  convertToFloat2Fixed(EXEC_SL_TB_C2C.DLA_T10)
                ) : (
                  ""
                )}
              </td>
              <td>
                {" "}
                {loadingPlan ? (
                  <LoadingComponent />
                ) : EXEC_SL_TB_C2C.DLA_T11 ? (
                  convertToFloat2Fixed(EXEC_SL_TB_C2C.DLA_T11)
                ) : (
                  ""
                )}
              </td>
              <td>
                {" "}
                {loadingPlan ? (
                  <LoadingComponent />
                ) : EXEC_SL_TB_C2C.DLA_T12 ? (
                  convertToFloat2Fixed(EXEC_SL_TB_C2C.DLA_T12)
                ) : (
                  ""
                )}
              </td>
              <td>
                {" "}
                {loadingPlan ? (
                  <LoadingComponent />
                ) : EXEC_SL_TB_C2C.DLA_T13 ? (
                  convertToFloat2Fixed(EXEC_SL_TB_C2C.DLA_T13)
                ) : (
                  ""
                )}
              </td>
              <td>
                {" "}
                {loadingPlan ? (
                  <LoadingComponent />
                ) : EXEC_SL_TB_C2C.DLA_D01 ? (
                  convertToFloat2Fixed(EXEC_SL_TB_C2C.DLA_D01)
                ) : (
                  ""
                )}
              </td>
              <td>
                {" "}
                {loadingPlan ? (
                  <LoadingComponent />
                ) : EXEC_SL_TB_C2C.DLA_D02 ? (
                  convertToFloat2Fixed(EXEC_SL_TB_C2C.DLA_D02)
                ) : (
                  ""
                )}
              </td>
              <td>
                {" "}
                {loadingPlan ? (
                  <LoadingComponent />
                ) : EXEC_SL_TB_C2C.DLA_D03 ? (
                  convertToFloat2Fixed(EXEC_SL_TB_C2C.DLA_D03)
                ) : (
                  ""
                )}
              </td>
              <td>
                {" "}
                {loadingPlan ? (
                  <LoadingComponent />
                ) : EXEC_SL_TB_C2C.DLA_D04 ? (
                  convertToFloat2Fixed(EXEC_SL_TB_C2C.DLA_D04)
                ) : (
                  ""
                )}
              </td>
              <td>
                {" "}
                {loadingPlan ? (
                  <LoadingComponent />
                ) : EXEC_SL_TB_C2C.DLA_D05 ? (
                  convertToFloat2Fixed(EXEC_SL_TB_C2C.DLA_D05)
                ) : (
                  ""
                )}
              </td>
              <td>
                {" "}
                {loadingPlan ? (
                  <LoadingComponent />
                ) : EXEC_SL_TB_C2C.DLA_D06 ? (
                  convertToFloat2Fixed(EXEC_SL_TB_C2C.DLA_D06)
                ) : (
                  ""
                )}
              </td>
              <td>
                {" "}
                {loadingPlan ? (
                  <LoadingComponent />
                ) : (
                  convertToFloat2Fixed(
                    convertToNumber(EXEC_SL_TB_C2C.DLA_T01) +
                      convertToNumber(EXEC_SL_TB_C2C.DLA_T02) +
                      convertToNumber(EXEC_SL_TB_C2C.DLA_T03) +
                      convertToNumber(EXEC_SL_TB_C2C.DLA_T04) +
                      convertToNumber(EXEC_SL_TB_C2C.DLA_T05) +
                      convertToNumber(EXEC_SL_TB_C2C.DLA_T06) +
                      convertToNumber(EXEC_SL_TB_C2C.DLA_T07) +
                      convertToNumber(EXEC_SL_TB_C2C.DLA_T08) +
                      convertToNumber(EXEC_SL_TB_C2C.DLA_T09) +
                      convertToNumber(EXEC_SL_TB_C2C.DLA_T10) +
                      convertToNumber(EXEC_SL_TB_C2C.DLA_T11) +
                      convertToNumber(EXEC_SL_TB_C2C.DLA_T12) +
                      convertToNumber(EXEC_SL_TB_C2C.DLA_T13) +
                      convertToNumber(EXEC_SL_TB_C2C.DLA_D01) +
                      convertToNumber(EXEC_SL_TB_C2C.DLA_D02) +
                      convertToNumber(EXEC_SL_TB_C2C.DLA_D03) +
                      convertToNumber(EXEC_SL_TB_C2C.DLA_D04) +
                      convertToNumber(EXEC_SL_TB_C2C.DLA_D05) +
                      convertToNumber(EXEC_SL_TB_C2C.DLA_D06)
                  )
                )}
              </td>
              <td>
                {" "}
                {loadingPlan ? (
                  <LoadingComponent />
                ) : EXEC_SL_TB_C2C.TTKDGPS ? (
                  convertToFloat2Fixed(EXEC_SL_TB_C2C.TTKDGPS)
                ) : (
                  ""
                )}
              </td>
            </tr>
            <tr>
              <td className="td-title-center td-kh fix-col-3">%TH</td>
              <td
                className={
                  (convertToNumber(EXEC_SL_TB_C2C.DLA_T01) * 100) /
                    convertToNumberMauso(PLAN_SL_TB_C2C.DLA_T01) >
                  processKPI
                    ? "bg-green"
                    : "bg-red"
                }
              >
                {loadingExec || loadingPlan ? (
                  <LoadingComponent />
                ) : EXEC_SL_TB_C2C.DLA_T01 && PLAN_SL_TB_C2C.DLA_T01 ? (
                  convertToFloat2Fixed(
                    (EXEC_SL_TB_C2C.DLA_T01 * 100) / PLAN_SL_TB_C2C.DLA_T01
                  ) + "%"
                ) : (
                  ""
                )}
              </td>
              <td
                className={
                  (convertToNumber(EXEC_SL_TB_C2C.DLA_T02) * 100) /
                    convertToNumberMauso(PLAN_SL_TB_C2C.DLA_T02) >
                  processKPI
                    ? "bg-green"
                    : "bg-red"
                }
              >
                {loadingExec || loadingPlan ? (
                  <LoadingComponent />
                ) : EXEC_SL_TB_C2C.DLA_T02 && PLAN_SL_TB_C2C.DLA_T02 ? (
                  convertToFloat2Fixed(
                    (EXEC_SL_TB_C2C.DLA_T02 * 100) / PLAN_SL_TB_C2C.DLA_T02
                  ) + "%"
                ) : (
                  ""
                )}
              </td>
              <td
                className={
                  (convertToNumber(EXEC_SL_TB_C2C.DLA_T03) * 100) /
                    convertToNumberMauso(PLAN_SL_TB_C2C.DLA_T03) >
                  processKPI
                    ? "bg-green"
                    : "bg-red"
                }
              >
                {loadingExec || loadingPlan ? (
                  <LoadingComponent />
                ) : EXEC_SL_TB_C2C.DLA_T03 && PLAN_SL_TB_C2C.DLA_T03 ? (
                  convertToFloat2Fixed(
                    (EXEC_SL_TB_C2C.DLA_T03 * 100) / PLAN_SL_TB_C2C.DLA_T03
                  ) + "%"
                ) : (
                  ""
                )}
              </td>
              <td
                className={
                  (convertToNumber(EXEC_SL_TB_C2C.DLA_T04) * 100) /
                    convertToNumberMauso(PLAN_SL_TB_C2C.DLA_T04) >
                  processKPI
                    ? "bg-green"
                    : "bg-red"
                }
              >
                {loadingExec || loadingPlan ? (
                  <LoadingComponent />
                ) : EXEC_SL_TB_C2C.DLA_T04 && PLAN_SL_TB_C2C.DLA_T04 ? (
                  convertToFloat2Fixed(
                    (EXEC_SL_TB_C2C.DLA_T04 * 100) / PLAN_SL_TB_C2C.DLA_T04
                  ) + "%"
                ) : (
                  ""
                )}
              </td>
              <td
                className={
                  (convertToNumber(EXEC_SL_TB_C2C.DLA_T05) * 100) /
                    convertToNumberMauso(PLAN_SL_TB_C2C.DLA_T05) >
                  processKPI
                    ? "bg-green"
                    : "bg-red"
                }
              >
                {loadingExec || loadingPlan ? (
                  <LoadingComponent />
                ) : EXEC_SL_TB_C2C.DLA_T05 && PLAN_SL_TB_C2C.DLA_T05 ? (
                  convertToFloat2Fixed(
                    (EXEC_SL_TB_C2C.DLA_T05 * 100) / PLAN_SL_TB_C2C.DLA_T05
                  ) + "%"
                ) : (
                  ""
                )}
              </td>
              <td
                className={
                  (convertToNumber(EXEC_SL_TB_C2C.DLA_T06) * 100) /
                    convertToNumberMauso(PLAN_SL_TB_C2C.DLA_T06) >
                  processKPI
                    ? "bg-green"
                    : "bg-red"
                }
              >
                {loadingExec || loadingPlan ? (
                  <LoadingComponent />
                ) : EXEC_SL_TB_C2C.DLA_T06 && PLAN_SL_TB_C2C.DLA_T06 ? (
                  convertToFloat2Fixed(
                    (EXEC_SL_TB_C2C.DLA_T06 * 100) / PLAN_SL_TB_C2C.DLA_T06
                  ) + "%"
                ) : (
                  ""
                )}
              </td>
              <td
                className={
                  (convertToNumber(EXEC_SL_TB_C2C.DLA_T07) * 100) /
                    convertToNumberMauso(PLAN_SL_TB_C2C.DLA_T07) >
                  processKPI
                    ? "bg-green"
                    : "bg-red"
                }
              >
                {loadingExec || loadingPlan ? (
                  <LoadingComponent />
                ) : EXEC_SL_TB_C2C.DLA_T07 && PLAN_SL_TB_C2C.DLA_T07 ? (
                  convertToFloat2Fixed(
                    (EXEC_SL_TB_C2C.DLA_T07 * 100) / PLAN_SL_TB_C2C.DLA_T07
                  ) + "%"
                ) : (
                  ""
                )}
              </td>
              <td
                className={
                  (convertToNumber(EXEC_SL_TB_C2C.DLA_T08) * 100) /
                    convertToNumberMauso(PLAN_SL_TB_C2C.DLA_T08) >
                  processKPI
                    ? "bg-green"
                    : "bg-red"
                }
              >
                {loadingExec || loadingPlan ? (
                  <LoadingComponent />
                ) : EXEC_SL_TB_C2C.DLA_T08 && PLAN_SL_TB_C2C.DLA_T08 ? (
                  convertToFloat2Fixed(
                    (EXEC_SL_TB_C2C.DLA_T08 * 100) / PLAN_SL_TB_C2C.DLA_T08
                  ) + "%"
                ) : (
                  ""
                )}
              </td>
              <td
                className={
                  (convertToNumber(EXEC_SL_TB_C2C.DLA_T09) * 100) /
                    convertToNumberMauso(PLAN_SL_TB_C2C.DLA_T09) >
                  processKPI
                    ? "bg-green"
                    : "bg-red"
                }
              >
                {loadingExec || loadingPlan ? (
                  <LoadingComponent />
                ) : EXEC_SL_TB_C2C.DLA_T09 && PLAN_SL_TB_C2C.DLA_T09 ? (
                  convertToFloat2Fixed(
                    (EXEC_SL_TB_C2C.DLA_T09 * 100) / PLAN_SL_TB_C2C.DLA_T09
                  ) + "%"
                ) : (
                  ""
                )}
              </td>
              <td
                className={
                  (convertToNumber(EXEC_SL_TB_C2C.DLA_T10) * 100) /
                    convertToNumberMauso(PLAN_SL_TB_C2C.DLA_T10) >
                  processKPI
                    ? "bg-green"
                    : "bg-red"
                }
              >
                {loadingExec || loadingPlan ? (
                  <LoadingComponent />
                ) : EXEC_SL_TB_C2C.DLA_T10 && PLAN_SL_TB_C2C.DLA_T10 ? (
                  convertToFloat2Fixed(
                    (EXEC_SL_TB_C2C.DLA_T10 * 100) / PLAN_SL_TB_C2C.DLA_T10
                  ) + "%"
                ) : (
                  ""
                )}
              </td>
              <td
                className={
                  (convertToNumber(EXEC_SL_TB_C2C.DLA_T11) * 100) /
                    convertToNumberMauso(PLAN_SL_TB_C2C.DLA_T11) >
                  processKPI
                    ? "bg-green"
                    : "bg-red"
                }
              >
                {loadingExec || loadingPlan ? (
                  <LoadingComponent />
                ) : EXEC_SL_TB_C2C.DLA_T11 && PLAN_SL_TB_C2C.DLA_T11 ? (
                  convertToFloat2Fixed(
                    (EXEC_SL_TB_C2C.DLA_T11 * 100) / PLAN_SL_TB_C2C.DLA_T11
                  ) + "%"
                ) : (
                  ""
                )}
              </td>
              <td
                className={
                  (convertToNumber(EXEC_SL_TB_C2C.DLA_T12) * 100) /
                    convertToNumberMauso(PLAN_SL_TB_C2C.DLA_T12) >
                  processKPI
                    ? "bg-green"
                    : "bg-red"
                }
              >
                {loadingExec || loadingPlan ? (
                  <LoadingComponent />
                ) : EXEC_SL_TB_C2C.DLA_T12 && PLAN_SL_TB_C2C.DLA_T12 ? (
                  convertToFloat2Fixed(
                    (EXEC_SL_TB_C2C.DLA_T12 * 100) / PLAN_SL_TB_C2C.DLA_T12
                  ) + "%"
                ) : (
                  ""
                )}
              </td>
              <td
                className={
                  (convertToNumber(EXEC_SL_TB_C2C.DLA_T13) * 100) /
                    convertToNumberMauso(PLAN_SL_TB_C2C.DLA_T13) >
                  processKPI
                    ? "bg-green"
                    : "bg-red"
                }
              >
                {loadingExec || loadingPlan ? (
                  <LoadingComponent />
                ) : EXEC_SL_TB_C2C.DLA_T13 && PLAN_SL_TB_C2C.DLA_T13 ? (
                  convertToFloat2Fixed(
                    (EXEC_SL_TB_C2C.DLA_T13 * 100) / PLAN_SL_TB_C2C.DLA_T13
                  ) + "%"
                ) : (
                  ""
                )}
              </td>
              <td
                className={
                  (convertToNumber(EXEC_SL_TB_C2C.DLA_D01) * 100) /
                    convertToNumberMauso(PLAN_SL_TB_C2C.DLA_D01) >
                  processKPI
                    ? "bg-green"
                    : "bg-red"
                }
              >
                {loadingExec || loadingPlan ? (
                  <LoadingComponent />
                ) : EXEC_SL_TB_C2C.DLA_D01 && PLAN_SL_TB_C2C.DLA_D01 ? (
                  convertToFloat2Fixed(
                    (EXEC_SL_TB_C2C.DLA_D01 * 100) / PLAN_SL_TB_C2C.DLA_D01
                  ) + "%"
                ) : (
                  ""
                )}
              </td>
              <td
                className={
                  (convertToNumber(EXEC_SL_TB_C2C.DLA_D02) * 100) /
                    convertToNumberMauso(PLAN_SL_TB_C2C.DLA_D02) >
                  processKPI
                    ? "bg-green"
                    : "bg-red"
                }
              >
                {loadingExec || loadingPlan ? (
                  <LoadingComponent />
                ) : EXEC_SL_TB_C2C.DLA_D02 && PLAN_SL_TB_C2C.DLA_D02 ? (
                  convertToFloat2Fixed(
                    (EXEC_SL_TB_C2C.DLA_D02 * 100) / PLAN_SL_TB_C2C.DLA_D02
                  ) + "%"
                ) : (
                  ""
                )}
              </td>
              <td
                className={
                  (convertToNumber(EXEC_SL_TB_C2C.DLA_D03) * 100) /
                    convertToNumberMauso(PLAN_SL_TB_C2C.DLA_D03) >
                  processKPI
                    ? "bg-green"
                    : "bg-red"
                }
              >
                {loadingExec || loadingPlan ? (
                  <LoadingComponent />
                ) : EXEC_SL_TB_C2C.DLA_D03 && PLAN_SL_TB_C2C.DLA_D03 ? (
                  convertToFloat2Fixed(
                    (EXEC_SL_TB_C2C.DLA_D03 * 100) / PLAN_SL_TB_C2C.DLA_D03
                  ) + "%"
                ) : (
                  ""
                )}
              </td>
              <td
                className={
                  (convertToNumber(EXEC_SL_TB_C2C.DLA_D04) * 100) /
                    convertToNumberMauso(PLAN_SL_TB_C2C.DLA_D01) >
                  processKPI
                    ? "bg-green"
                    : "bg-red"
                }
              >
                {loadingExec || loadingPlan ? (
                  <LoadingComponent />
                ) : EXEC_SL_TB_C2C.DLA_D04 && PLAN_SL_TB_C2C.DLA_D04 ? (
                  convertToFloat2Fixed(
                    (EXEC_SL_TB_C2C.DLA_D04 * 100) / PLAN_SL_TB_C2C.DLA_D04
                  ) + "%"
                ) : (
                  ""
                )}
              </td>
              <td
                className={
                  (convertToNumber(EXEC_SL_TB_C2C.DLA_D05) * 100) /
                    convertToNumberMauso(PLAN_SL_TB_C2C.DLA_D05) >
                  processKPI
                    ? "bg-green"
                    : "bg-red"
                }
              >
                {loadingExec || loadingPlan ? (
                  <LoadingComponent />
                ) : EXEC_SL_TB_C2C.DLA_D05 && PLAN_SL_TB_C2C.DLA_D05 ? (
                  convertToFloat2Fixed(
                    (EXEC_SL_TB_C2C.DLA_D05 * 100) / PLAN_SL_TB_C2C.DLA_D05
                  ) + "%"
                ) : (
                  ""
                )}
              </td>
              <td
                className={
                  (convertToNumber(EXEC_SL_TB_C2C.DLA_D06) * 100) /
                    convertToNumberMauso(PLAN_SL_TB_C2C.DLA_D06) >
                  processKPI
                    ? "bg-green"
                    : "bg-red"
                }
              >
                {loadingExec || loadingPlan ? (
                  <LoadingComponent />
                ) : EXEC_SL_TB_C2C.DLA_D06 && PLAN_SL_TB_C2C.DLA_D06 ? (
                  convertToFloat2Fixed(
                    (EXEC_SL_TB_C2C.DLA_D06 * 100) / PLAN_SL_TB_C2C.DLA_D06
                  ) + "%"
                ) : (
                  ""
                )}
              </td>{" "}
              <td
                className={
                  ( convertToFloat2Fixed(
                    (convertToNumber(EXEC_SL_TB_C2C.DLA_T01) +
                      convertToNumber(EXEC_SL_TB_C2C.DLA_T02) +
                      convertToNumber(EXEC_SL_TB_C2C.DLA_T03) +
                      convertToNumber(EXEC_SL_TB_C2C.DLA_T04) +
                      convertToNumber(EXEC_SL_TB_C2C.DLA_T05) +
                      convertToNumber(EXEC_SL_TB_C2C.DLA_T06) +
                      convertToNumber(EXEC_SL_TB_C2C.DLA_T07) +
                      convertToNumber(EXEC_SL_TB_C2C.DLA_T08) +
                      convertToNumber(EXEC_SL_TB_C2C.DLA_T09) +
                      convertToNumber(EXEC_SL_TB_C2C.DLA_T10) +
                      convertToNumber(EXEC_SL_TB_C2C.DLA_T11) +
                      convertToNumber(EXEC_SL_TB_C2C.DLA_T12) +
                      convertToNumber(EXEC_SL_TB_C2C.DLA_T13) +
                      convertToNumber(EXEC_SL_TB_C2C.DLA_D01) +
                      convertToNumber(EXEC_SL_TB_C2C.DLA_D02) +
                      convertToNumber(EXEC_SL_TB_C2C.DLA_D03) +
                      convertToNumber(EXEC_SL_TB_C2C.DLA_D04) +
                      convertToNumber(EXEC_SL_TB_C2C.DLA_D05) +
                      convertToNumber(EXEC_SL_TB_C2C.DLA_D06))*100 /
                      convertToNumberMauso(PLAN_SL_TB_C2C.TTKDVT)
                  ) ) >
                  processKPI
                    ? "bg-green"
                    : "bg-red"
                }
              >
                {loadingExec || loadingPlan ? (
                  <LoadingComponent />
                ) : (
                  convertToFloat2Fixed(
                    (convertToNumber(EXEC_SL_TB_C2C.DLA_T01) +
                      convertToNumber(EXEC_SL_TB_C2C.DLA_T02) +
                      convertToNumber(EXEC_SL_TB_C2C.DLA_T03) +
                      convertToNumber(EXEC_SL_TB_C2C.DLA_T04) +
                      convertToNumber(EXEC_SL_TB_C2C.DLA_T05) +
                      convertToNumber(EXEC_SL_TB_C2C.DLA_T06) +
                      convertToNumber(EXEC_SL_TB_C2C.DLA_T07) +
                      convertToNumber(EXEC_SL_TB_C2C.DLA_T08) +
                      convertToNumber(EXEC_SL_TB_C2C.DLA_T09) +
                      convertToNumber(EXEC_SL_TB_C2C.DLA_T10) +
                      convertToNumber(EXEC_SL_TB_C2C.DLA_T11) +
                      convertToNumber(EXEC_SL_TB_C2C.DLA_T12) +
                      convertToNumber(EXEC_SL_TB_C2C.DLA_T13) +
                      convertToNumber(EXEC_SL_TB_C2C.DLA_D01) +
                      convertToNumber(EXEC_SL_TB_C2C.DLA_D02) +
                      convertToNumber(EXEC_SL_TB_C2C.DLA_D03) +
                      convertToNumber(EXEC_SL_TB_C2C.DLA_D04) +
                      convertToNumber(EXEC_SL_TB_C2C.DLA_D05) +
                      convertToNumber(EXEC_SL_TB_C2C.DLA_D06))*100 /
                      convertToNumberMauso(PLAN_SL_TB_C2C.TTKDVT)
                  )  +
                  "%"
                )}
              </td>{" "}
              <td
              // className={
              //   (convertToNumber(EXEC_SL_TB_C2C.TTKDGPS) * 100) /
              //     convertToNumberMauso(PLAN_SL_TB_C2C.TTKDGPS) >
              //   processKPI
              //     ? "bg-green"
              //     : "bg-red"
              // }
              >
                {loadingExec || loadingPlan ? (
                  <LoadingComponent />
                ) : EXEC_SL_TB_C2C.TTKDGPS && PLAN_SL_TB_C2C.TTKDGPS ? (
                  convertToFloat2Fixed(
                    (EXEC_SL_TB_C2C.TTKDGPS * 100) / PLAN_SL_TB_C2C.TTKDGPS
                  ) + "%"
                ) : (
                  ""
                )}
              </td>{" "}
            </tr>
            <tr>
              <td rowSpan={3} className="td-title-center  td-stt fix-col-1">
                4.2
              </td>
              <td rowSpan={3} className="td-title   td-content fix-col-2">
                {`Tỷ lệ điểm bán C2C có phát sinh giao dịch(%)`}
              </td>
              <td className="td-title-center td-kh fix-col-3">KH</td>
              <td>
                {" "}
                {loadingPlan ? (
                  <LoadingComponent />
                ) : PLAN_TYLE_GD_C2C.DLA_T01 ? (
                  convertToFloat2Fixed(PLAN_TYLE_GD_C2C.DLA_T01)
                ) : (
                  ""
                )}
              </td>
              <td>
                {" "}
                {loadingPlan ? (
                  <LoadingComponent />
                ) : PLAN_TYLE_GD_C2C.DLA_T02 ? (
                  convertToFloat2Fixed(PLAN_TYLE_GD_C2C.DLA_T02)
                ) : (
                  ""
                )}
              </td>
              <td>
                {" "}
                {loadingPlan ? (
                  <LoadingComponent />
                ) : PLAN_TYLE_GD_C2C.DLA_T03 ? (
                  convertToFloat2Fixed(PLAN_TYLE_GD_C2C.DLA_T03)
                ) : (
                  ""
                )}
              </td>
              <td>
                {" "}
                {loadingPlan ? (
                  <LoadingComponent />
                ) : PLAN_TYLE_GD_C2C.DLA_T04 ? (
                  convertToFloat2Fixed(PLAN_TYLE_GD_C2C.DLA_T04)
                ) : (
                  ""
                )}
              </td>
              <td>
                {" "}
                {loadingPlan ? (
                  <LoadingComponent />
                ) : PLAN_TYLE_GD_C2C.DLA_T05 ? (
                  convertToFloat2Fixed(PLAN_TYLE_GD_C2C.DLA_T05)
                ) : (
                  ""
                )}
              </td>
              <td>
                {" "}
                {loadingPlan ? (
                  <LoadingComponent />
                ) : PLAN_TYLE_GD_C2C.DLA_T06 ? (
                  convertToFloat2Fixed(PLAN_TYLE_GD_C2C.DLA_T06)
                ) : (
                  ""
                )}
              </td>
              <td>
                {" "}
                {loadingPlan ? (
                  <LoadingComponent />
                ) : PLAN_TYLE_GD_C2C.DLA_T07 ? (
                  convertToFloat2Fixed(PLAN_TYLE_GD_C2C.DLA_T07)
                ) : (
                  ""
                )}
              </td>
              <td>
                {" "}
                {loadingPlan ? (
                  <LoadingComponent />
                ) : PLAN_TYLE_GD_C2C.DLA_T08 ? (
                  convertToFloat2Fixed(PLAN_TYLE_GD_C2C.DLA_T08)
                ) : (
                  ""
                )}
              </td>
              <td>
                {" "}
                {loadingPlan ? (
                  <LoadingComponent />
                ) : PLAN_TYLE_GD_C2C.DLA_T09 ? (
                  convertToFloat2Fixed(PLAN_TYLE_GD_C2C.DLA_T09)
                ) : (
                  ""
                )}
              </td>
              <td>
                {" "}
                {loadingPlan ? (
                  <LoadingComponent />
                ) : PLAN_TYLE_GD_C2C.DLA_T10 ? (
                  convertToFloat2Fixed(PLAN_TYLE_GD_C2C.DLA_T10)
                ) : (
                  ""
                )}
              </td>
              <td>
                {" "}
                {loadingPlan ? (
                  <LoadingComponent />
                ) : PLAN_TYLE_GD_C2C.DLA_T11 ? (
                  convertToFloat2Fixed(PLAN_TYLE_GD_C2C.DLA_T11)
                ) : (
                  ""
                )}
              </td>
              <td>
                {" "}
                {loadingPlan ? (
                  <LoadingComponent />
                ) : PLAN_TYLE_GD_C2C.DLA_T12 ? (
                  convertToFloat2Fixed(PLAN_TYLE_GD_C2C.DLA_T12)
                ) : (
                  ""
                )}
              </td>
              <td>
                {" "}
                {loadingPlan ? (
                  <LoadingComponent />
                ) : PLAN_TYLE_GD_C2C.DLA_T13 ? (
                  convertToFloat2Fixed(PLAN_TYLE_GD_C2C.DLA_T13)
                ) : (
                  ""
                )}
              </td>
              <td>
                {" "}
                {loadingPlan ? (
                  <LoadingComponent />
                ) : PLAN_TYLE_GD_C2C.DLA_D01 ? (
                  convertToFloat2Fixed(PLAN_TYLE_GD_C2C.DLA_D01)
                ) : (
                  ""
                )}
              </td>
              <td>
                {" "}
                {loadingPlan ? (
                  <LoadingComponent />
                ) : PLAN_TYLE_GD_C2C.DLA_D02 ? (
                  convertToFloat2Fixed(PLAN_TYLE_GD_C2C.DLA_D02)
                ) : (
                  ""
                )}
              </td>
              <td>
                {" "}
                {loadingPlan ? (
                  <LoadingComponent />
                ) : PLAN_TYLE_GD_C2C.DLA_D03 ? (
                  convertToFloat2Fixed(PLAN_TYLE_GD_C2C.DLA_D03)
                ) : (
                  ""
                )}
              </td>
              <td>
                {" "}
                {loadingPlan ? (
                  <LoadingComponent />
                ) : PLAN_TYLE_GD_C2C.DLA_D04 ? (
                  convertToFloat2Fixed(PLAN_TYLE_GD_C2C.DLA_D04)
                ) : (
                  ""
                )}
              </td>
              <td>
                {" "}
                {loadingPlan ? (
                  <LoadingComponent />
                ) : PLAN_TYLE_GD_C2C.DLA_D05 ? (
                  convertToFloat2Fixed(PLAN_TYLE_GD_C2C.DLA_D05)
                ) : (
                  ""
                )}
              </td>
              <td>
                {" "}
                {loadingPlan ? (
                  <LoadingComponent />
                ) : PLAN_TYLE_GD_C2C.DLA_D06 ? (
                  convertToFloat2Fixed(PLAN_TYLE_GD_C2C.DLA_D06)
                ) : (
                  ""
                )}
              </td>
              <td>
                {" "}
                {loadingPlan ? (
                  <LoadingComponent />
                ) : PLAN_TYLE_GD_C2C.TTKDVT ? (
                  convertToFloat2Fixed(PLAN_TYLE_GD_C2C.TTKDVT)
                ) : (
                  ""
                )}
              </td>
              <td>
                {" "}
                {loadingPlan ? (
                  <LoadingComponent />
                ) : PLAN_TYLE_GD_C2C.TTKDGPS ? (
                  convertToFloat2Fixed(PLAN_TYLE_GD_C2C.TTKDGPS)
                ) : (
                  ""
                )}
              </td>
              <td rowSpan={3}>
                {EXEC_TYLE_GD_C2C.LAST_DATE
                  ? getFormattedDate(new Date(EXEC_TYLE_GD_C2C.LAST_DATE))
                  : ""}
              </td>
            </tr>
            <tr>
              <td className="td-title-center td-kh fix-col-3">TH</td>
              <td>
                {" "}
                {loadingPlan ? (
                  <LoadingComponent />
                ) : EXEC_TYLE_GD_C2C.DLA_T01 ? (
                  convertToFloat2Fixed(EXEC_TYLE_GD_C2C.DLA_T01)
                ) : (
                  ""
                )}
              </td>
              <td>
                {" "}
                {loadingPlan ? (
                  <LoadingComponent />
                ) : EXEC_TYLE_GD_C2C.DLA_T02 ? (
                  convertToFloat2Fixed(EXEC_TYLE_GD_C2C.DLA_T02)
                ) : (
                  ""
                )}
              </td>
              <td>
                {" "}
                {loadingPlan ? (
                  <LoadingComponent />
                ) : EXEC_TYLE_GD_C2C.DLA_T03 ? (
                  convertToFloat2Fixed(EXEC_TYLE_GD_C2C.DLA_T03)
                ) : (
                  ""
                )}
              </td>
              <td>
                {" "}
                {loadingPlan ? (
                  <LoadingComponent />
                ) : EXEC_TYLE_GD_C2C.DLA_T04 ? (
                  convertToFloat2Fixed(EXEC_TYLE_GD_C2C.DLA_T04)
                ) : (
                  ""
                )}
              </td>
              <td>
                {" "}
                {loadingPlan ? (
                  <LoadingComponent />
                ) : EXEC_TYLE_GD_C2C.DLA_T05 ? (
                  convertToFloat2Fixed(EXEC_TYLE_GD_C2C.DLA_T05)
                ) : (
                  ""
                )}
              </td>
              <td>
                {" "}
                {loadingPlan ? (
                  <LoadingComponent />
                ) : EXEC_TYLE_GD_C2C.DLA_T06 ? (
                  convertToFloat2Fixed(EXEC_TYLE_GD_C2C.DLA_T06)
                ) : (
                  ""
                )}
              </td>
              <td>
                {" "}
                {loadingPlan ? (
                  <LoadingComponent />
                ) : EXEC_TYLE_GD_C2C.DLA_T07 ? (
                  convertToFloat2Fixed(EXEC_TYLE_GD_C2C.DLA_T07)
                ) : (
                  ""
                )}
              </td>
              <td>
                {" "}
                {loadingPlan ? (
                  <LoadingComponent />
                ) : EXEC_TYLE_GD_C2C.DLA_T08 ? (
                  convertToFloat2Fixed(EXEC_TYLE_GD_C2C.DLA_T08)
                ) : (
                  ""
                )}
              </td>
              <td>
                {" "}
                {loadingPlan ? (
                  <LoadingComponent />
                ) : EXEC_TYLE_GD_C2C.DLA_T09 ? (
                  convertToFloat2Fixed(EXEC_TYLE_GD_C2C.DLA_T09)
                ) : (
                  ""
                )}
              </td>
              <td>
                {" "}
                {loadingPlan ? (
                  <LoadingComponent />
                ) : EXEC_TYLE_GD_C2C.DLA_T10 ? (
                  convertToFloat2Fixed(EXEC_TYLE_GD_C2C.DLA_T10)
                ) : (
                  ""
                )}
              </td>
              <td>
                {" "}
                {loadingPlan ? (
                  <LoadingComponent />
                ) : EXEC_TYLE_GD_C2C.DLA_T11 ? (
                  convertToFloat2Fixed(EXEC_TYLE_GD_C2C.DLA_T11)
                ) : (
                  ""
                )}
              </td>
              <td>
                {" "}
                {loadingPlan ? (
                  <LoadingComponent />
                ) : EXEC_TYLE_GD_C2C.DLA_T12 ? (
                  convertToFloat2Fixed(EXEC_TYLE_GD_C2C.DLA_T12)
                ) : (
                  ""
                )}
              </td>
              <td>
                {" "}
                {loadingPlan ? (
                  <LoadingComponent />
                ) : EXEC_TYLE_GD_C2C.DLA_T13 ? (
                  convertToFloat2Fixed(EXEC_TYLE_GD_C2C.DLA_T13)
                ) : (
                  ""
                )}
              </td>
              <td>
                {" "}
                {loadingPlan ? (
                  <LoadingComponent />
                ) : EXEC_TYLE_GD_C2C.DLA_D01 ? (
                  convertToFloat2Fixed(EXEC_TYLE_GD_C2C.DLA_D01)
                ) : (
                  ""
                )}
              </td>
              <td>
                {" "}
                {loadingPlan ? (
                  <LoadingComponent />
                ) : EXEC_TYLE_GD_C2C.DLA_D02 ? (
                  convertToFloat2Fixed(EXEC_TYLE_GD_C2C.DLA_D02)
                ) : (
                  ""
                )}
              </td>
              <td>
                {" "}
                {loadingPlan ? (
                  <LoadingComponent />
                ) : EXEC_TYLE_GD_C2C.DLA_D03 ? (
                  convertToFloat2Fixed(EXEC_TYLE_GD_C2C.DLA_D03)
                ) : (
                  ""
                )}
              </td>
              <td>
                {" "}
                {loadingPlan ? (
                  <LoadingComponent />
                ) : EXEC_TYLE_GD_C2C.DLA_D04 ? (
                  convertToFloat2Fixed(EXEC_TYLE_GD_C2C.DLA_D04)
                ) : (
                  ""
                )}
              </td>
              <td>
                {" "}
                {loadingPlan ? (
                  <LoadingComponent />
                ) : EXEC_TYLE_GD_C2C.DLA_D05 ? (
                  convertToFloat2Fixed(EXEC_TYLE_GD_C2C.DLA_D05)
                ) : (
                  ""
                )}
              </td>
              <td>
                {" "}
                {loadingPlan ? (
                  <LoadingComponent />
                ) : EXEC_TYLE_GD_C2C.DLA_D06 ? (
                  convertToFloat2Fixed(EXEC_TYLE_GD_C2C.DLA_D06)
                ) : (
                  ""
                )}
              </td>
              <td>
                {" "}
                {loadingPlan ? (
                  <LoadingComponent />
                ) : (
                  convertToFloat2Fixed(
                    (convertToNumber(EXEC_TYLE_GD_C2C.DLA_T01) +
                      convertToNumber(EXEC_TYLE_GD_C2C.DLA_T02) +
                      convertToNumber(EXEC_TYLE_GD_C2C.DLA_T03) +
                      convertToNumber(EXEC_TYLE_GD_C2C.DLA_T04) +
                      convertToNumber(EXEC_TYLE_GD_C2C.DLA_T05) +
                      convertToNumber(EXEC_TYLE_GD_C2C.DLA_T06) +
                      convertToNumber(EXEC_TYLE_GD_C2C.DLA_T07) +
                      convertToNumber(EXEC_TYLE_GD_C2C.DLA_T08) +
                      convertToNumber(EXEC_TYLE_GD_C2C.DLA_T09) +
                      convertToNumber(EXEC_TYLE_GD_C2C.DLA_T10) +
                      convertToNumber(EXEC_TYLE_GD_C2C.DLA_T11) +
                      convertToNumber(EXEC_TYLE_GD_C2C.DLA_T12) +
                      convertToNumber(EXEC_TYLE_GD_C2C.DLA_T13) +
                      convertToNumber(EXEC_TYLE_GD_C2C.DLA_D01) +
                      convertToNumber(EXEC_TYLE_GD_C2C.DLA_D02) +
                      convertToNumber(EXEC_TYLE_GD_C2C.DLA_D03) +
                      convertToNumber(EXEC_TYLE_GD_C2C.DLA_D04) +
                      convertToNumber(EXEC_TYLE_GD_C2C.DLA_D05) +
                      convertToNumber(EXEC_TYLE_GD_C2C.DLA_D06)) /
                      19
                  )
                )}
              </td>
              <td>
                {" "}
                {loadingPlan ? (
                  <LoadingComponent />
                ) : EXEC_TYLE_GD_C2C.TTKDGPS ? (
                  convertToFloat2Fixed(EXEC_TYLE_GD_C2C.TTKDGPS)
                ) : (
                  ""
                )}
              </td>
            </tr>
            <tr>
              <td className="td-title-center td-kh fix-col-3">%TH</td>
              <td
                className={
                  (convertToNumber(EXEC_TYLE_GD_C2C.DLA_T01) * 100) /
                    convertToNumberMauso(PLAN_TYLE_GD_C2C.DLA_T01) >
                  processKPI
                    ? "bg-green"
                    : "bg-red"
                }
              >
                {loadingExec || loadingPlan ? (
                  <LoadingComponent />
                ) : EXEC_TYLE_GD_C2C.DLA_T01 && PLAN_TYLE_GD_C2C.DLA_T01 ? (
                  convertToFloat2Fixed(
                    (EXEC_TYLE_GD_C2C.DLA_T01 * 100) / PLAN_TYLE_GD_C2C.DLA_T01
                  ) + "%"
                ) : (
                  ""
                )}
              </td>
              <td
                className={
                  (convertToNumber(EXEC_TYLE_GD_C2C.DLA_T02) * 100) /
                    convertToNumberMauso(PLAN_TYLE_GD_C2C.DLA_T02) >
                  processKPI
                    ? "bg-green"
                    : "bg-red"
                }
              >
                {loadingExec || loadingPlan ? (
                  <LoadingComponent />
                ) : EXEC_TYLE_GD_C2C.DLA_T02 && PLAN_TYLE_GD_C2C.DLA_T02 ? (
                  convertToFloat2Fixed(
                    (EXEC_TYLE_GD_C2C.DLA_T02 * 100) / PLAN_TYLE_GD_C2C.DLA_T02
                  ) + "%"
                ) : (
                  ""
                )}
              </td>
              <td
                className={
                  (convertToNumber(EXEC_TYLE_GD_C2C.DLA_T03) * 100) /
                    convertToNumberMauso(PLAN_TYLE_GD_C2C.DLA_T03) >
                  processKPI
                    ? "bg-green"
                    : "bg-red"
                }
              >
                {loadingExec || loadingPlan ? (
                  <LoadingComponent />
                ) : EXEC_TYLE_GD_C2C.DLA_T03 && PLAN_TYLE_GD_C2C.DLA_T03 ? (
                  convertToFloat2Fixed(
                    (EXEC_TYLE_GD_C2C.DLA_T03 * 100) / PLAN_TYLE_GD_C2C.DLA_T03
                  ) + "%"
                ) : (
                  ""
                )}
              </td>
              <td
                className={
                  (convertToNumber(EXEC_TYLE_GD_C2C.DLA_T04) * 100) /
                    convertToNumberMauso(PLAN_TYLE_GD_C2C.DLA_T04) >
                  processKPI
                    ? "bg-green"
                    : "bg-red"
                }
              >
                {loadingExec || loadingPlan ? (
                  <LoadingComponent />
                ) : EXEC_TYLE_GD_C2C.DLA_T04 && PLAN_TYLE_GD_C2C.DLA_T04 ? (
                  convertToFloat2Fixed(
                    (EXEC_TYLE_GD_C2C.DLA_T04 * 100) / PLAN_TYLE_GD_C2C.DLA_T04
                  ) + "%"
                ) : (
                  ""
                )}
              </td>
              <td
                className={
                  (convertToNumber(EXEC_TYLE_GD_C2C.DLA_T05) * 100) /
                    convertToNumberMauso(PLAN_TYLE_GD_C2C.DLA_T05) >
                  processKPI
                    ? "bg-green"
                    : "bg-red"
                }
              >
                {loadingExec || loadingPlan ? (
                  <LoadingComponent />
                ) : EXEC_TYLE_GD_C2C.DLA_T05 && PLAN_TYLE_GD_C2C.DLA_T05 ? (
                  convertToFloat2Fixed(
                    (EXEC_TYLE_GD_C2C.DLA_T05 * 100) / PLAN_TYLE_GD_C2C.DLA_T05
                  ) + "%"
                ) : (
                  ""
                )}
              </td>
              <td
                className={
                  (convertToNumber(EXEC_TYLE_GD_C2C.DLA_T06) * 100) /
                    convertToNumberMauso(PLAN_TYLE_GD_C2C.DLA_T06) >
                  processKPI
                    ? "bg-green"
                    : "bg-red"
                }
              >
                {loadingExec || loadingPlan ? (
                  <LoadingComponent />
                ) : EXEC_TYLE_GD_C2C.DLA_T06 && PLAN_TYLE_GD_C2C.DLA_T06 ? (
                  convertToFloat2Fixed(
                    (EXEC_TYLE_GD_C2C.DLA_T06 * 100) / PLAN_TYLE_GD_C2C.DLA_T06
                  ) + "%"
                ) : (
                  ""
                )}
              </td>
              <td
                className={
                  (convertToNumber(EXEC_TYLE_GD_C2C.DLA_T07) * 100) /
                    convertToNumberMauso(PLAN_TYLE_GD_C2C.DLA_T07) >
                  processKPI
                    ? "bg-green"
                    : "bg-red"
                }
              >
                {loadingExec || loadingPlan ? (
                  <LoadingComponent />
                ) : EXEC_TYLE_GD_C2C.DLA_T07 && PLAN_TYLE_GD_C2C.DLA_T07 ? (
                  convertToFloat2Fixed(
                    (EXEC_TYLE_GD_C2C.DLA_T07 * 100) / PLAN_TYLE_GD_C2C.DLA_T07
                  ) + "%"
                ) : (
                  ""
                )}
              </td>
              <td
                className={
                  (convertToNumber(EXEC_TYLE_GD_C2C.DLA_T08) * 100) /
                    convertToNumberMauso(PLAN_TYLE_GD_C2C.DLA_T08) >
                  processKPI
                    ? "bg-green"
                    : "bg-red"
                }
              >
                {loadingExec || loadingPlan ? (
                  <LoadingComponent />
                ) : EXEC_TYLE_GD_C2C.DLA_T08 && PLAN_TYLE_GD_C2C.DLA_T08 ? (
                  convertToFloat2Fixed(
                    (EXEC_TYLE_GD_C2C.DLA_T08 * 100) / PLAN_TYLE_GD_C2C.DLA_T08
                  ) + "%"
                ) : (
                  ""
                )}
              </td>
              <td
                className={
                  (convertToNumber(EXEC_TYLE_GD_C2C.DLA_T09) * 100) /
                    convertToNumberMauso(PLAN_TYLE_GD_C2C.DLA_T09) >
                  processKPI
                    ? "bg-green"
                    : "bg-red"
                }
              >
                {loadingExec || loadingPlan ? (
                  <LoadingComponent />
                ) : EXEC_TYLE_GD_C2C.DLA_T09 && PLAN_TYLE_GD_C2C.DLA_T09 ? (
                  convertToFloat2Fixed(
                    (EXEC_TYLE_GD_C2C.DLA_T09 * 100) / PLAN_TYLE_GD_C2C.DLA_T09
                  ) + "%"
                ) : (
                  ""
                )}
              </td>
              <td
                className={
                  (convertToNumber(EXEC_TYLE_GD_C2C.DLA_T10) * 100) /
                    convertToNumberMauso(PLAN_TYLE_GD_C2C.DLA_T10) >
                  processKPI
                    ? "bg-green"
                    : "bg-red"
                }
              >
                {loadingExec || loadingPlan ? (
                  <LoadingComponent />
                ) : EXEC_TYLE_GD_C2C.DLA_T10 && PLAN_TYLE_GD_C2C.DLA_T10 ? (
                  convertToFloat2Fixed(
                    (EXEC_TYLE_GD_C2C.DLA_T10 * 100) / PLAN_TYLE_GD_C2C.DLA_T10
                  ) + "%"
                ) : (
                  ""
                )}
              </td>
              <td
                className={
                  (convertToNumber(EXEC_TYLE_GD_C2C.DLA_T11) * 100) /
                    convertToNumberMauso(PLAN_TYLE_GD_C2C.DLA_T11) >
                  processKPI
                    ? "bg-green"
                    : "bg-red"
                }
              >
                {loadingExec || loadingPlan ? (
                  <LoadingComponent />
                ) : EXEC_TYLE_GD_C2C.DLA_T11 && PLAN_TYLE_GD_C2C.DLA_T11 ? (
                  convertToFloat2Fixed(
                    (EXEC_TYLE_GD_C2C.DLA_T11 * 100) / PLAN_TYLE_GD_C2C.DLA_T11
                  ) + "%"
                ) : (
                  ""
                )}
              </td>
              <td
                className={
                  (convertToNumber(EXEC_TYLE_GD_C2C.DLA_T12) * 100) /
                    convertToNumberMauso(PLAN_TYLE_GD_C2C.DLA_T12) >
                  processKPI
                    ? "bg-green"
                    : "bg-red"
                }
              >
                {loadingExec || loadingPlan ? (
                  <LoadingComponent />
                ) : EXEC_TYLE_GD_C2C.DLA_T12 && PLAN_TYLE_GD_C2C.DLA_T12 ? (
                  convertToFloat2Fixed(
                    (EXEC_TYLE_GD_C2C.DLA_T12 * 100) / PLAN_TYLE_GD_C2C.DLA_T12
                  ) + "%"
                ) : (
                  ""
                )}
              </td>
              <td
                className={
                  (convertToNumber(EXEC_TYLE_GD_C2C.DLA_T13) * 100) /
                    convertToNumberMauso(PLAN_TYLE_GD_C2C.DLA_T13) >
                  processKPI
                    ? "bg-green"
                    : "bg-red"
                }
              >
                {loadingExec || loadingPlan ? (
                  <LoadingComponent />
                ) : EXEC_TYLE_GD_C2C.DLA_T13 && PLAN_TYLE_GD_C2C.DLA_T13 ? (
                  convertToFloat2Fixed(
                    (EXEC_TYLE_GD_C2C.DLA_T13 * 100) / PLAN_TYLE_GD_C2C.DLA_T13
                  ) + "%"
                ) : (
                  ""
                )}
              </td>
              <td
                className={
                  (convertToNumber(EXEC_TYLE_GD_C2C.DLA_D01) * 100) /
                    convertToNumberMauso(PLAN_TYLE_GD_C2C.DLA_D01) >
                  processKPI
                    ? "bg-green"
                    : "bg-red"
                }
              >
                {loadingExec || loadingPlan ? (
                  <LoadingComponent />
                ) : EXEC_TYLE_GD_C2C.DLA_D01 && PLAN_TYLE_GD_C2C.DLA_D01 ? (
                  convertToFloat2Fixed(
                    (EXEC_TYLE_GD_C2C.DLA_D01 * 100) / PLAN_TYLE_GD_C2C.DLA_D01
                  ) + "%"
                ) : (
                  ""
                )}
              </td>
              <td
                className={
                  (convertToNumber(EXEC_TYLE_GD_C2C.DLA_D02) * 100) /
                    convertToNumberMauso(PLAN_TYLE_GD_C2C.DLA_D02) >
                  processKPI
                    ? "bg-green"
                    : "bg-red"
                }
              >
                {loadingExec || loadingPlan ? (
                  <LoadingComponent />
                ) : EXEC_TYLE_GD_C2C.DLA_D02 && EXEC_TYLE_GD_C2C.DLA_D02 ? (
                  convertToFloat2Fixed(
                    (EXEC_TYLE_GD_C2C.DLA_D02 * 100) / EXEC_TYLE_GD_C2C.DLA_D02
                  ) + "%"
                ) : (
                  ""
                )}
              </td>
              <td
                className={
                  (convertToNumber(EXEC_TYLE_GD_C2C.DLA_D03) * 100) /
                    convertToNumberMauso(PLAN_TYLE_GD_C2C.DLA_D03) >
                  processKPI
                    ? "bg-green"
                    : "bg-red"
                }
              >
                {loadingExec || loadingPlan ? (
                  <LoadingComponent />
                ) : EXEC_TYLE_GD_C2C.DLA_D03 && PLAN_TYLE_GD_C2C.DLA_D03 ? (
                  convertToFloat2Fixed(
                    (EXEC_TYLE_GD_C2C.DLA_D03 * 100) / PLAN_TYLE_GD_C2C.DLA_D03
                  ) + "%"
                ) : (
                  ""
                )}
              </td>
              <td
                className={
                  (convertToNumber(EXEC_TYLE_GD_C2C.DLA_D04) * 100) /
                    convertToNumberMauso(PLAN_TYLE_GD_C2C.DLA_D04) >
                  processKPI
                    ? "bg-green"
                    : "bg-red"
                }
              >
                {loadingExec || loadingPlan ? (
                  <LoadingComponent />
                ) : EXEC_TYLE_GD_C2C.DLA_D04 && PLAN_TYLE_GD_C2C.DLA_D04 ? (
                  convertToFloat2Fixed(
                    (EXEC_TYLE_GD_C2C.DLA_D04 * 100) / PLAN_TYLE_GD_C2C.DLA_D04
                  ) + "%"
                ) : (
                  ""
                )}
              </td>
              <td
                className={
                  (convertToNumber(EXEC_TYLE_GD_C2C.DLA_D05) * 100) /
                    convertToNumberMauso(PLAN_TYLE_GD_C2C.DLA_D05) >
                  processKPI
                    ? "bg-green"
                    : "bg-red"
                }
              >
                {loadingExec || loadingPlan ? (
                  <LoadingComponent />
                ) : EXEC_TYLE_GD_C2C.DLA_D05 && PLAN_TYLE_GD_C2C.DLA_D05 ? (
                  convertToFloat2Fixed(
                    (EXEC_TYLE_GD_C2C.DLA_D05 * 100) / PLAN_TYLE_GD_C2C.DLA_D05
                  ) + "%"
                ) : (
                  ""
                )}
              </td>
              <td
                className={
                  (convertToNumber(EXEC_TYLE_GD_C2C.DLA_D06) * 100) /
                    convertToNumberMauso(PLAN_TYLE_GD_C2C.DLA_D06) >
                  processKPI
                    ? "bg-green"
                    : "bg-red"
                }
              >
                {loadingExec || loadingPlan ? (
                  <LoadingComponent />
                ) : EXEC_TYLE_GD_C2C.DLA_D06 && PLAN_TYLE_GD_C2C.DLA_D06 ? (
                  convertToFloat2Fixed(
                    (EXEC_TYLE_GD_C2C.DLA_D06 * 100) / PLAN_TYLE_GD_C2C.DLA_D06
                  ) + "%"
                ) : (
                  ""
                )}
              </td>
              <td
                className={
                  convertToFloat2Fixed(
                    (convertToNumber(EXEC_TYLE_GD_C2C.DLA_T01) +
                      convertToNumber(EXEC_TYLE_GD_C2C.DLA_T02) +
                      convertToNumber(EXEC_TYLE_GD_C2C.DLA_T03) +
                      convertToNumber(EXEC_TYLE_GD_C2C.DLA_T04) +
                      convertToNumber(EXEC_TYLE_GD_C2C.DLA_T05) +
                      convertToNumber(EXEC_TYLE_GD_C2C.DLA_T06) +
                      convertToNumber(EXEC_TYLE_GD_C2C.DLA_T07) +
                      convertToNumber(EXEC_TYLE_GD_C2C.DLA_T08) +
                      convertToNumber(EXEC_TYLE_GD_C2C.DLA_T09) +
                      convertToNumber(EXEC_TYLE_GD_C2C.DLA_T10) +
                      convertToNumber(EXEC_TYLE_GD_C2C.DLA_T11) +
                      convertToNumber(EXEC_TYLE_GD_C2C.DLA_T12) +
                      convertToNumber(EXEC_TYLE_GD_C2C.DLA_T13) +
                      convertToNumber(EXEC_TYLE_GD_C2C.DLA_D01) +
                      convertToNumber(EXEC_TYLE_GD_C2C.DLA_D02) +
                      convertToNumber(EXEC_TYLE_GD_C2C.DLA_D03) +
                      convertToNumber(EXEC_TYLE_GD_C2C.DLA_D04) +
                      convertToNumber(EXEC_TYLE_GD_C2C.DLA_D05) +
                      convertToNumber(EXEC_TYLE_GD_C2C.DLA_D06)) /
                      19 /
                      convertToNumberMauso(PLAN_TYLE_GD_C2C.TTKDVT)
                  ) *
                    100 >
                  processKPI
                    ? "bg-green"
                    : "bg-red"
                }
              >
                {loadingExec || loadingPlan ? (
                  <LoadingComponent />
                ) : (
                  convertToFloat2Fixed(
                    (convertToNumber(EXEC_TYLE_GD_C2C.DLA_T01) +
                      convertToNumber(EXEC_TYLE_GD_C2C.DLA_T02) +
                      convertToNumber(EXEC_TYLE_GD_C2C.DLA_T03) +
                      convertToNumber(EXEC_TYLE_GD_C2C.DLA_T04) +
                      convertToNumber(EXEC_TYLE_GD_C2C.DLA_T05) +
                      convertToNumber(EXEC_TYLE_GD_C2C.DLA_T06) +
                      convertToNumber(EXEC_TYLE_GD_C2C.DLA_T07) +
                      convertToNumber(EXEC_TYLE_GD_C2C.DLA_T08) +
                      convertToNumber(EXEC_TYLE_GD_C2C.DLA_T09) +
                      convertToNumber(EXEC_TYLE_GD_C2C.DLA_T10) +
                      convertToNumber(EXEC_TYLE_GD_C2C.DLA_T11) +
                      convertToNumber(EXEC_TYLE_GD_C2C.DLA_T12) +
                      convertToNumber(EXEC_TYLE_GD_C2C.DLA_T13) +
                      convertToNumber(EXEC_TYLE_GD_C2C.DLA_D01) +
                      convertToNumber(EXEC_TYLE_GD_C2C.DLA_D02) +
                      convertToNumber(EXEC_TYLE_GD_C2C.DLA_D03) +
                      convertToNumber(EXEC_TYLE_GD_C2C.DLA_D04) +
                      convertToNumber(EXEC_TYLE_GD_C2C.DLA_D05) +
                      convertToNumber(EXEC_TYLE_GD_C2C.DLA_D06)) /
                      19 /
                      convertToNumberMauso(PLAN_TYLE_GD_C2C.TTKDVT)
                  ) *
                    100 +
                  "%"
                )}
              </td>
              <td
              // className={
              //   (convertToNumber(EXEC_TYLE_GD_C2C.TTKDGPS) * 100) /
              //     convertToNumberMauso(PLAN_TYLE_GD_C2C.TTKDGPS) >
              //   processKPI
              //     ? "bg-green"
              //     : "bg-red"
              // }
              >
                {loadingExec || loadingPlan ? (
                  <LoadingComponent />
                ) : EXEC_TYLE_GD_C2C.TTKDGPS && PLAN_TYLE_GD_C2C.TTKDGPS ? (
                  convertToFloat2Fixed(
                    (EXEC_TYLE_GD_C2C.TTKDGPS * 100) / PLAN_TYLE_GD_C2C.TTKDGPS
                  ) + "%"
                ) : (
                  ""
                )}
              </td>
            </tr>
            <tr>
              <td className="td-title-center td-stt">5</td>
              <td colSpan={24} className="td-title fw-bold td-content">
                TB PTM mạng MobiFone
              </td>
            </tr>
            <tr>
              <td rowSpan={3} className="td-title-center fix-col-1 ">
                5.1
              </td>
              <td rowSpan={3} className="td-title fix-col-2 ">
                TBTT PTM
              </td>
              <td className="td-title-center td-kh fix-col-3">KH</td>
              <td>
                {" "}
                {loadingPlan ? (
                  <LoadingComponent />
                ) : PLAN_SL_PTM_TBTT.DLA_T01 ? (
                  convertToFloat2Fixed(PLAN_SL_PTM_TBTT.DLA_T01)
                ) : (
                  ""
                )}
              </td>
              <td>
                {" "}
                {loadingPlan ? (
                  <LoadingComponent />
                ) : PLAN_SL_PTM_TBTT.DLA_T02 ? (
                  convertToFloat2Fixed(PLAN_SL_PTM_TBTT.DLA_T02)
                ) : (
                  ""
                )}
              </td>
              <td>
                {" "}
                {loadingPlan ? (
                  <LoadingComponent />
                ) : PLAN_SL_PTM_TBTT.DLA_T03 ? (
                  convertToFloat2Fixed(PLAN_SL_PTM_TBTT.DLA_T03)
                ) : (
                  ""
                )}
              </td>
              <td>
                {" "}
                {loadingPlan ? (
                  <LoadingComponent />
                ) : PLAN_SL_PTM_TBTT.DLA_T04 ? (
                  convertToFloat2Fixed(PLAN_SL_PTM_TBTT.DLA_T04)
                ) : (
                  ""
                )}
              </td>
              <td>
                {" "}
                {loadingPlan ? (
                  <LoadingComponent />
                ) : PLAN_SL_PTM_TBTT.DLA_T05 ? (
                  convertToFloat2Fixed(PLAN_SL_PTM_TBTT.DLA_T05)
                ) : (
                  ""
                )}
              </td>
              <td>
                {" "}
                {loadingPlan ? (
                  <LoadingComponent />
                ) : PLAN_SL_PTM_TBTT.DLA_T06 ? (
                  convertToFloat2Fixed(PLAN_SL_PTM_TBTT.DLA_T06)
                ) : (
                  ""
                )}
              </td>
              <td>
                {" "}
                {loadingPlan ? (
                  <LoadingComponent />
                ) : PLAN_SL_PTM_TBTT.DLA_T07 ? (
                  convertToFloat2Fixed(PLAN_SL_PTM_TBTT.DLA_T07)
                ) : (
                  ""
                )}
              </td>
              <td>
                {" "}
                {loadingPlan ? (
                  <LoadingComponent />
                ) : PLAN_SL_PTM_TBTT.DLA_T08 ? (
                  convertToFloat2Fixed(PLAN_SL_PTM_TBTT.DLA_T08)
                ) : (
                  ""
                )}
              </td>
              <td>
                {" "}
                {loadingPlan ? (
                  <LoadingComponent />
                ) : PLAN_SL_PTM_TBTT.DLA_T09 ? (
                  convertToFloat2Fixed(PLAN_SL_PTM_TBTT.DLA_T09)
                ) : (
                  ""
                )}
              </td>
              <td>
                {" "}
                {loadingPlan ? (
                  <LoadingComponent />
                ) : PLAN_SL_PTM_TBTT.DLA_T10 ? (
                  convertToFloat2Fixed(PLAN_SL_PTM_TBTT.DLA_T10)
                ) : (
                  ""
                )}
              </td>
              <td>
                {" "}
                {loadingPlan ? (
                  <LoadingComponent />
                ) : PLAN_SL_PTM_TBTT.DLA_T11 ? (
                  convertToFloat2Fixed(PLAN_SL_PTM_TBTT.DLA_T11)
                ) : (
                  ""
                )}
              </td>
              <td>
                {" "}
                {loadingPlan ? (
                  <LoadingComponent />
                ) : PLAN_SL_PTM_TBTT.DLA_T12 ? (
                  convertToFloat2Fixed(PLAN_SL_PTM_TBTT.DLA_T12)
                ) : (
                  ""
                )}
              </td>
              <td>
                {" "}
                {loadingPlan ? (
                  <LoadingComponent />
                ) : PLAN_SL_PTM_TBTT.DLA_T13 ? (
                  convertToFloat2Fixed(PLAN_SL_PTM_TBTT.DLA_T13)
                ) : (
                  ""
                )}
              </td>
              <td>
                {" "}
                {loadingPlan ? (
                  <LoadingComponent />
                ) : PLAN_SL_PTM_TBTT.DLA_D01 ? (
                  convertToFloat2Fixed(PLAN_SL_PTM_TBTT.DLA_D01)
                ) : (
                  ""
                )}
              </td>
              <td>
                {" "}
                {loadingPlan ? (
                  <LoadingComponent />
                ) : PLAN_SL_PTM_TBTT.DLA_D02 ? (
                  convertToFloat2Fixed(PLAN_SL_PTM_TBTT.DLA_D02)
                ) : (
                  ""
                )}
              </td>
              <td>
                {" "}
                {loadingPlan ? (
                  <LoadingComponent />
                ) : PLAN_SL_PTM_TBTT.DLA_D03 ? (
                  convertToFloat2Fixed(PLAN_SL_PTM_TBTT.DLA_D03)
                ) : (
                  ""
                )}
              </td>
              <td>
                {" "}
                {loadingPlan ? (
                  <LoadingComponent />
                ) : PLAN_SL_PTM_TBTT.DLA_D04 ? (
                  convertToFloat2Fixed(PLAN_SL_PTM_TBTT.DLA_D04)
                ) : (
                  ""
                )}
              </td>
              <td>
                {" "}
                {loadingPlan ? (
                  <LoadingComponent />
                ) : PLAN_SL_PTM_TBTT.DLA_D05 ? (
                  convertToFloat2Fixed(PLAN_SL_PTM_TBTT.DLA_D05)
                ) : (
                  ""
                )}
              </td>
              <td>
                {" "}
                {loadingPlan ? (
                  <LoadingComponent />
                ) : PLAN_SL_PTM_TBTT.DLA_D06 ? (
                  convertToFloat2Fixed(PLAN_SL_PTM_TBTT.DLA_D06)
                ) : (
                  ""
                )}
              </td>
              <td>
                {" "}
                {loadingPlan ? (
                  <LoadingComponent />
                ) : PLAN_SL_PTM_TBTT.TTKDVT ? (
                  convertToFloat2Fixed(PLAN_SL_PTM_TBTT.TTKDVT)
                ) : (
                  ""
                )}
              </td>
              <td>
                {" "}
                {loadingPlan ? (
                  <LoadingComponent />
                ) : PLAN_SL_PTM_TBTT.TTKDGPS ? (
                  convertToFloat2Fixed(PLAN_SL_PTM_TBTT.TTKDGPS)
                ) : (
                  ""
                )}
              </td>
              <td rowSpan={3}>
                {EXEC_SL_PTM_TBTT.LAST_DATE
                  ? getFormattedDate(new Date(EXEC_SL_PTM_TBTT.LAST_DATE))
                  : ""}
              </td>
            </tr>
            <tr>
              <td className="td-title-center td-kh fix-col-3">TH</td>
              <td>
                {" "}
                {loadingPlan ? (
                  <LoadingComponent />
                ) : EXEC_SL_PTM_TBTT.DLA_T01 ? (
                  convertToFloat2Fixed(EXEC_SL_PTM_TBTT.DLA_T01)
                ) : (
                  ""
                )}
              </td>
              <td>
                {" "}
                {loadingPlan ? (
                  <LoadingComponent />
                ) : EXEC_SL_PTM_TBTT.DLA_T02 ? (
                  convertToFloat2Fixed(EXEC_SL_PTM_TBTT.DLA_T02)
                ) : (
                  ""
                )}
              </td>
              <td>
                {" "}
                {loadingPlan ? (
                  <LoadingComponent />
                ) : EXEC_SL_PTM_TBTT.DLA_T03 ? (
                  convertToFloat2Fixed(EXEC_SL_PTM_TBTT.DLA_T03)
                ) : (
                  ""
                )}
              </td>
              <td>
                {" "}
                {loadingPlan ? (
                  <LoadingComponent />
                ) : EXEC_SL_PTM_TBTT.DLA_T04 ? (
                  convertToFloat2Fixed(EXEC_SL_PTM_TBTT.DLA_T04)
                ) : (
                  ""
                )}
              </td>
              <td>
                {" "}
                {loadingPlan ? (
                  <LoadingComponent />
                ) : EXEC_SL_PTM_TBTT.DLA_T05 ? (
                  convertToFloat2Fixed(EXEC_SL_PTM_TBTT.DLA_T05)
                ) : (
                  ""
                )}
              </td>
              <td>
                {" "}
                {loadingPlan ? (
                  <LoadingComponent />
                ) : EXEC_SL_PTM_TBTT.DLA_T06 ? (
                  convertToFloat2Fixed(EXEC_SL_PTM_TBTT.DLA_T06)
                ) : (
                  ""
                )}
              </td>
              <td>
                {" "}
                {loadingPlan ? (
                  <LoadingComponent />
                ) : EXEC_SL_PTM_TBTT.DLA_T07 ? (
                  convertToFloat2Fixed(EXEC_SL_PTM_TBTT.DLA_T07)
                ) : (
                  ""
                )}
              </td>
              <td>
                {" "}
                {loadingPlan ? (
                  <LoadingComponent />
                ) : EXEC_SL_PTM_TBTT.DLA_T08 ? (
                  convertToFloat2Fixed(EXEC_SL_PTM_TBTT.DLA_T08)
                ) : (
                  ""
                )}
              </td>
              <td>
                {" "}
                {loadingPlan ? (
                  <LoadingComponent />
                ) : EXEC_SL_PTM_TBTT.DLA_T09 ? (
                  convertToFloat2Fixed(EXEC_SL_PTM_TBTT.DLA_T09)
                ) : (
                  ""
                )}
              </td>
              <td>
                {" "}
                {loadingPlan ? (
                  <LoadingComponent />
                ) : EXEC_SL_PTM_TBTT.DLA_T10 ? (
                  convertToFloat2Fixed(EXEC_SL_PTM_TBTT.DLA_T10)
                ) : (
                  ""
                )}
              </td>
              <td>
                {" "}
                {loadingPlan ? (
                  <LoadingComponent />
                ) : EXEC_SL_PTM_TBTT.DLA_T11 ? (
                  convertToFloat2Fixed(EXEC_SL_PTM_TBTT.DLA_T11)
                ) : (
                  ""
                )}
              </td>
              <td>
                {" "}
                {loadingPlan ? (
                  <LoadingComponent />
                ) : EXEC_SL_PTM_TBTT.DLA_T12 ? (
                  convertToFloat2Fixed(EXEC_SL_PTM_TBTT.DLA_T12)
                ) : (
                  ""
                )}
              </td>
              <td>
                {" "}
                {loadingPlan ? (
                  <LoadingComponent />
                ) : EXEC_SL_PTM_TBTT.DLA_T13 ? (
                  convertToFloat2Fixed(EXEC_SL_PTM_TBTT.DLA_T13)
                ) : (
                  ""
                )}
              </td>
              <td>
                {" "}
                {loadingPlan ? (
                  <LoadingComponent />
                ) : EXEC_SL_PTM_TBTT.DLA_D01 ? (
                  convertToFloat2Fixed(EXEC_SL_PTM_TBTT.DLA_D01)
                ) : (
                  ""
                )}
              </td>
              <td>
                {" "}
                {loadingPlan ? (
                  <LoadingComponent />
                ) : EXEC_SL_PTM_TBTT.DLA_D02 ? (
                  convertToFloat2Fixed(EXEC_SL_PTM_TBTT.DLA_D02)
                ) : (
                  ""
                )}
              </td>
              <td>
                {" "}
                {loadingPlan ? (
                  <LoadingComponent />
                ) : EXEC_SL_PTM_TBTT.DLA_D03 ? (
                  convertToFloat2Fixed(EXEC_SL_PTM_TBTT.DLA_D03)
                ) : (
                  ""
                )}
              </td>
              <td>
                {" "}
                {loadingPlan ? (
                  <LoadingComponent />
                ) : EXEC_SL_PTM_TBTT.DLA_D04 ? (
                  convertToFloat2Fixed(EXEC_SL_PTM_TBTT.DLA_D04)
                ) : (
                  ""
                )}
              </td>
              <td>
                {" "}
                {loadingPlan ? (
                  <LoadingComponent />
                ) : EXEC_SL_PTM_TBTT.DLA_D05 ? (
                  convertToFloat2Fixed(EXEC_SL_PTM_TBTT.DLA_D05)
                ) : (
                  ""
                )}
              </td>
              <td>
                {" "}
                {loadingPlan ? (
                  <LoadingComponent />
                ) : EXEC_SL_PTM_TBTT.DLA_D06 ? (
                  convertToFloat2Fixed(EXEC_SL_PTM_TBTT.DLA_D06)
                ) : (
                  ""
                )}
              </td>
              <td>
                {" "}
                {loadingPlan ? (
                  <LoadingComponent />
                ) : (
                  convertToFloat2Fixed(
                    convertToNumber(EXEC_SL_PTM_TBTT.DLA_T01) +
                      convertToNumber(EXEC_SL_PTM_TBTT.DLA_T02) +
                      convertToNumber(EXEC_SL_PTM_TBTT.DLA_T03) +
                      convertToNumber(EXEC_SL_PTM_TBTT.DLA_T04) +
                      convertToNumber(EXEC_SL_PTM_TBTT.DLA_T05) +
                      convertToNumber(EXEC_SL_PTM_TBTT.DLA_T06) +
                      convertToNumber(EXEC_SL_PTM_TBTT.DLA_T07) +
                      convertToNumber(EXEC_SL_PTM_TBTT.DLA_T08) +
                      convertToNumber(EXEC_SL_PTM_TBTT.DLA_T09) +
                      convertToNumber(EXEC_SL_PTM_TBTT.DLA_T10) +
                      convertToNumber(EXEC_SL_PTM_TBTT.DLA_T11) +
                      convertToNumber(EXEC_SL_PTM_TBTT.DLA_T12) +
                      convertToNumber(EXEC_SL_PTM_TBTT.DLA_T13) +
                      convertToNumber(EXEC_SL_PTM_TBTT.DLA_D01) +
                      convertToNumber(EXEC_SL_PTM_TBTT.DLA_D02) +
                      convertToNumber(EXEC_SL_PTM_TBTT.DLA_D03) +
                      convertToNumber(EXEC_SL_PTM_TBTT.DLA_D04) +
                      convertToNumber(EXEC_SL_PTM_TBTT.DLA_D05) +
                      convertToNumber(EXEC_SL_PTM_TBTT.DLA_D06)
                  )
                )}
              </td>
              <td>
                {" "}
                {loadingPlan ? (
                  <LoadingComponent />
                ) : EXEC_SL_PTM_TBTT.TTKDGPS ? (
                  convertToFloat2Fixed(EXEC_SL_PTM_TBTT.TTKDGPS)
                ) : (
                  ""
                )}
              </td>
            </tr>
            <tr>
              <td className="td-title-center td-kh fix-col-3">%TH</td>
              <td
                className={
                  (convertToNumber(EXEC_SL_PTM_TBTT.DLA_T01) * 100) /
                    convertToNumberMauso(PLAN_SL_PTM_TBTT.DLA_T01) >
                  processKPI
                    ? "bg-green"
                    : "bg-red"
                }
              >
                {loadingExec || loadingPlan ? (
                  <LoadingComponent />
                ) : EXEC_SL_PTM_TBTT.DLA_T01 && PLAN_SL_PTM_TBTT.DLA_T01 ? (
                  convertToFloat2Fixed(
                    (EXEC_SL_PTM_TBTT.DLA_T01 * 100) / PLAN_SL_PTM_TBTT.DLA_T01
                  ) + "%"
                ) : (
                  ""
                )}
              </td>
              <td
                className={
                  (convertToNumber(EXEC_SL_PTM_TBTT.DLA_T02) * 100) /
                    convertToNumberMauso(PLAN_SL_PTM_TBTT.DLA_T02) >
                  processKPI
                    ? "bg-green"
                    : "bg-red"
                }
              >
                {loadingExec || loadingPlan ? (
                  <LoadingComponent />
                ) : EXEC_SL_PTM_TBTT.DLA_T02 && PLAN_SL_PTM_TBTT.DLA_T02 ? (
                  convertToFloat2Fixed(
                    (EXEC_SL_PTM_TBTT.DLA_T02 * 100) / PLAN_SL_PTM_TBTT.DLA_T02
                  ) + "%"
                ) : (
                  ""
                )}
              </td>
              <td
                className={
                  (convertToNumber(EXEC_SL_PTM_TBTT.DLA_T03) * 100) /
                    convertToNumberMauso(PLAN_SL_PTM_TBTT.DLA_T03) >
                  processKPI
                    ? "bg-green"
                    : "bg-red"
                }
              >
                {loadingExec || loadingPlan ? (
                  <LoadingComponent />
                ) : EXEC_SL_PTM_TBTT.DLA_T03 && PLAN_SL_PTM_TBTT.DLA_T03 ? (
                  convertToFloat2Fixed(
                    (EXEC_SL_PTM_TBTT.DLA_T03 * 100) / PLAN_SL_PTM_TBTT.DLA_T03
                  ) + "%"
                ) : (
                  ""
                )}
              </td>
              <td
                className={
                  (convertToNumber(EXEC_SL_PTM_TBTT.DLA_T04) * 100) /
                    convertToNumberMauso(PLAN_SL_PTM_TBTT.DLA_T04) >
                  processKPI
                    ? "bg-green"
                    : "bg-red"
                }
              >
                {loadingExec || loadingPlan ? (
                  <LoadingComponent />
                ) : EXEC_SL_PTM_TBTT.DLA_T04 && PLAN_SL_PTM_TBTT.DLA_T04 ? (
                  convertToFloat2Fixed(
                    (EXEC_SL_PTM_TBTT.DLA_T04 * 100) / PLAN_SL_PTM_TBTT.DLA_T04
                  ) + "%"
                ) : (
                  ""
                )}
              </td>
              <td
                className={
                  (convertToNumber(EXEC_SL_PTM_TBTT.DLA_T05) * 100) /
                    convertToNumberMauso(PLAN_SL_PTM_TBTT.DLA_T05) >
                  processKPI
                    ? "bg-green"
                    : "bg-red"
                }
              >
                {loadingExec || loadingPlan ? (
                  <LoadingComponent />
                ) : EXEC_SL_PTM_TBTT.DLA_T05 && PLAN_SL_PTM_TBTT.DLA_T05 ? (
                  convertToFloat2Fixed(
                    (EXEC_SL_PTM_TBTT.DLA_T05 * 100) / PLAN_SL_PTM_TBTT.DLA_T05
                  ) + "%"
                ) : (
                  ""
                )}
              </td>
              <td
                className={
                  (convertToNumber(EXEC_SL_PTM_TBTT.DLA_T06) * 100) /
                    convertToNumberMauso(PLAN_SL_PTM_TBTT.DLA_T06) >
                  processKPI
                    ? "bg-green"
                    : "bg-red"
                }
              >
                {loadingExec || loadingPlan ? (
                  <LoadingComponent />
                ) : EXEC_SL_PTM_TBTT.DLA_T06 && PLAN_SL_PTM_TBTT.DLA_T06 ? (
                  convertToFloat2Fixed(
                    (EXEC_SL_PTM_TBTT.DLA_T06 * 100) / PLAN_SL_PTM_TBTT.DLA_T06
                  ) + "%"
                ) : (
                  ""
                )}
              </td>
              <td
                className={
                  (convertToNumber(EXEC_SL_PTM_TBTT.DLA_T07) * 100) /
                    convertToNumberMauso(PLAN_SL_PTM_TBTT.DLA_T07) >
                  processKPI
                    ? "bg-green"
                    : "bg-red"
                }
              >
                {loadingExec || loadingPlan ? (
                  <LoadingComponent />
                ) : EXEC_SL_PTM_TBTT.DLA_T07 && PLAN_SL_PTM_TBTT.DLA_T07 ? (
                  convertToFloat2Fixed(
                    (EXEC_SL_PTM_TBTT.DLA_T07 * 100) / PLAN_SL_PTM_TBTT.DLA_T07
                  ) + "%"
                ) : (
                  ""
                )}
              </td>
              <td
                className={
                  (convertToNumber(EXEC_SL_PTM_TBTT.DLA_T08) * 100) /
                    convertToNumberMauso(PLAN_SL_PTM_TBTT.DLA_T08) >
                  processKPI
                    ? "bg-green"
                    : "bg-red"
                }
              >
                {loadingExec || loadingPlan ? (
                  <LoadingComponent />
                ) : EXEC_SL_PTM_TBTT.DLA_T08 && PLAN_SL_PTM_TBTT.DLA_T08 ? (
                  convertToFloat2Fixed(
                    (EXEC_SL_PTM_TBTT.DLA_T08 * 100) / PLAN_SL_PTM_TBTT.DLA_T08
                  ) + "%"
                ) : (
                  ""
                )}
              </td>
              <td
                className={
                  (convertToNumber(EXEC_SL_PTM_TBTT.DLA_T09) * 100) /
                    convertToNumberMauso(PLAN_SL_PTM_TBTT.DLA_T09) >
                  processKPI
                    ? "bg-green"
                    : "bg-red"
                }
              >
                {loadingExec || loadingPlan ? (
                  <LoadingComponent />
                ) : EXEC_SL_PTM_TBTT.DLA_T09 && PLAN_SL_PTM_TBTT.DLA_T09 ? (
                  convertToFloat2Fixed(
                    (EXEC_SL_PTM_TBTT.DLA_T09 * 100) / PLAN_SL_PTM_TBTT.DLA_T09
                  ) + "%"
                ) : (
                  ""
                )}
              </td>
              <td
                className={
                  (convertToNumber(EXEC_SL_PTM_TBTT.DLA_T10) * 100) /
                    convertToNumberMauso(PLAN_SL_PTM_TBTT.DLA_T10) >
                  processKPI
                    ? "bg-green"
                    : "bg-red"
                }
              >
                {loadingExec || loadingPlan ? (
                  <LoadingComponent />
                ) : EXEC_SL_PTM_TBTT.DLA_T10 && PLAN_SL_PTM_TBTT.DLA_T10 ? (
                  convertToFloat2Fixed(
                    (EXEC_SL_PTM_TBTT.DLA_T10 * 100) / PLAN_SL_PTM_TBTT.DLA_T10
                  ) + "%"
                ) : (
                  ""
                )}
              </td>
              <td
                className={
                  (convertToNumber(EXEC_SL_PTM_TBTT.DLA_T11) * 100) /
                    convertToNumberMauso(PLAN_SL_PTM_TBTT.DLA_T11) >
                  processKPI
                    ? "bg-green"
                    : "bg-red"
                }
              >
                {loadingExec || loadingPlan ? (
                  <LoadingComponent />
                ) : EXEC_SL_PTM_TBTT.DLA_T11 && PLAN_SL_PTM_TBTT.DLA_T11 ? (
                  convertToFloat2Fixed(
                    (EXEC_SL_PTM_TBTT.DLA_T11 * 100) / PLAN_SL_PTM_TBTT.DLA_T11
                  ) + "%"
                ) : (
                  ""
                )}
              </td>
              <td
                className={
                  (convertToNumber(EXEC_SL_PTM_TBTT.DLA_T12) * 100) /
                    convertToNumberMauso(PLAN_SL_PTM_TBTT.DLA_T12) >
                  processKPI
                    ? "bg-green"
                    : "bg-red"
                }
              >
                {loadingExec || loadingPlan ? (
                  <LoadingComponent />
                ) : EXEC_SL_PTM_TBTT.DLA_T12 && PLAN_SL_PTM_TBTT.DLA_T12 ? (
                  convertToFloat2Fixed(
                    (EXEC_SL_PTM_TBTT.DLA_T12 * 100) / PLAN_SL_PTM_TBTT.DLA_T12
                  ) + "%"
                ) : (
                  ""
                )}
              </td>
              <td
                className={
                  (convertToNumber(EXEC_SL_PTM_TBTT.DLA_T13) * 100) /
                    convertToNumberMauso(PLAN_SL_PTM_TBTT.DLA_T13) >
                  processKPI
                    ? "bg-green"
                    : "bg-red"
                }
              >
                {loadingExec || loadingPlan ? (
                  <LoadingComponent />
                ) : EXEC_SL_PTM_TBTT.DLA_T13 && PLAN_SL_PTM_TBTT.DLA_T13 ? (
                  convertToFloat2Fixed(
                    (EXEC_SL_PTM_TBTT.DLA_T13 * 100) / PLAN_SL_PTM_TBTT.DLA_T13
                  ) + "%"
                ) : (
                  ""
                )}
              </td>
              <td
                className={
                  (convertToNumber(EXEC_SL_PTM_TBTT.DLA_D01) * 100) /
                    convertToNumberMauso(PLAN_SL_PTM_TBTT.DLA_D01) >
                  processKPI
                    ? "bg-green"
                    : "bg-red"
                }
              >
                {loadingExec || loadingPlan ? (
                  <LoadingComponent />
                ) : EXEC_SL_PTM_TBTT.DLA_D01 && PLAN_SL_PTM_TBTT.DLA_D01 ? (
                  convertToFloat2Fixed(
                    (EXEC_SL_PTM_TBTT.DLA_D01 * 100) / PLAN_SL_PTM_TBTT.DLA_D01
                  ) + "%"
                ) : (
                  ""
                )}
              </td>
              <td
                className={
                  (convertToNumber(EXEC_SL_PTM_TBTT.DLA_D02) * 100) /
                    convertToNumberMauso(PLAN_SL_PTM_TBTT.DLA_D02) >
                  processKPI
                    ? "bg-green"
                    : "bg-red"
                }
              >
                {loadingExec || loadingPlan ? (
                  <LoadingComponent />
                ) : EXEC_SL_PTM_TBTT.DLA_D02 && PLAN_SL_PTM_TBTT.DLA_D02 ? (
                  convertToFloat2Fixed(
                    (EXEC_SL_PTM_TBTT.DLA_D02 * 100) / PLAN_SL_PTM_TBTT.DLA_D02
                  ) + "%"
                ) : (
                  ""
                )}
              </td>
              <td
                className={
                  (convertToNumber(EXEC_SL_PTM_TBTT.DLA_D03) * 100) /
                    convertToNumberMauso(PLAN_SL_PTM_TBTT.DLA_D03) >
                  processKPI
                    ? "bg-green"
                    : "bg-red"
                }
              >
                {loadingExec || loadingPlan ? (
                  <LoadingComponent />
                ) : EXEC_SL_PTM_TBTT.DLA_D03 && PLAN_SL_PTM_TBTT.DLA_D03 ? (
                  convertToFloat2Fixed(
                    (EXEC_SL_PTM_TBTT.DLA_D03 * 100) / PLAN_SL_PTM_TBTT.DLA_D03
                  ) + "%"
                ) : (
                  ""
                )}
              </td>
              <td
                className={
                  (convertToNumber(EXEC_SL_PTM_TBTT.DLA_D04) * 100) /
                    convertToNumberMauso(PLAN_SL_PTM_TBTT.DLA_D04) >
                  processKPI
                    ? "bg-green"
                    : "bg-red"
                }
              >
                {loadingExec || loadingPlan ? (
                  <LoadingComponent />
                ) : EXEC_SL_PTM_TBTT.DLA_D04 && PLAN_SL_PTM_TBTT.DLA_D04 ? (
                  convertToFloat2Fixed(
                    (EXEC_SL_PTM_TBTT.DLA_D04 * 100) / PLAN_SL_PTM_TBTT.DLA_D04
                  ) + "%"
                ) : (
                  ""
                )}
              </td>
              <td
                className={
                  (convertToNumber(EXEC_SL_PTM_TBTT.DLA_D05) * 100) /
                    convertToNumberMauso(PLAN_SL_PTM_TBTT.DLA_D05) >
                  processKPI
                    ? "bg-green"
                    : "bg-red"
                }
              >
                {loadingExec || loadingPlan ? (
                  <LoadingComponent />
                ) : EXEC_SL_PTM_TBTT.DLA_D05 && PLAN_SL_PTM_TBTT.DLA_D05 ? (
                  convertToFloat2Fixed(
                    (EXEC_SL_PTM_TBTT.DLA_D05 * 100) / PLAN_SL_PTM_TBTT.DLA_D05
                  ) + "%"
                ) : (
                  ""
                )}
              </td>
              <td
                className={
                  (convertToNumber(EXEC_SL_PTM_TBTT.DLA_D06) * 100) /
                    convertToNumberMauso(PLAN_SL_PTM_TBTT.DLA_D06) >
                  processKPI
                    ? "bg-green"
                    : "bg-red"
                }
              >
                {loadingExec || loadingPlan ? (
                  <LoadingComponent />
                ) : EXEC_SL_PTM_TBTT.DLA_D06 && PLAN_SL_PTM_TBTT.DLA_D06 ? (
                  convertToFloat2Fixed(
                    (EXEC_SL_PTM_TBTT.DLA_D06 * 100) / PLAN_SL_PTM_TBTT.DLA_D06
                  ) + "%"
                ) : (
                  ""
                )}
              </td>
              <td
                className={
                  convertToFloat2Fixed(
                    ((convertToNumber(EXEC_SL_PTM_TBTT.DLA_T01) +
                      convertToNumber(EXEC_SL_PTM_TBTT.DLA_T02) +
                      convertToNumber(EXEC_SL_PTM_TBTT.DLA_T03) +
                      convertToNumber(EXEC_SL_PTM_TBTT.DLA_T04) +
                      convertToNumber(EXEC_SL_PTM_TBTT.DLA_T05) +
                      convertToNumber(EXEC_SL_PTM_TBTT.DLA_T06) +
                      convertToNumber(EXEC_SL_PTM_TBTT.DLA_T07) +
                      convertToNumber(EXEC_SL_PTM_TBTT.DLA_T08) +
                      convertToNumber(EXEC_SL_PTM_TBTT.DLA_T09) +
                      convertToNumber(EXEC_SL_PTM_TBTT.DLA_T10) +
                      convertToNumber(EXEC_SL_PTM_TBTT.DLA_T11) +
                      convertToNumber(EXEC_SL_PTM_TBTT.DLA_T12) +
                      convertToNumber(EXEC_SL_PTM_TBTT.DLA_T13) +
                      convertToNumber(EXEC_SL_PTM_TBTT.DLA_D01) +
                      convertToNumber(EXEC_SL_PTM_TBTT.DLA_D02) +
                      convertToNumber(EXEC_SL_PTM_TBTT.DLA_D03) +
                      convertToNumber(EXEC_SL_PTM_TBTT.DLA_D04) +
                      convertToNumber(EXEC_SL_PTM_TBTT.DLA_D05) +
                      convertToNumber(EXEC_SL_PTM_TBTT.DLA_D06)) *
                      100) /
                      convertToNumberMauso(PLAN_SL_PTM_TBTT.TTKDVT)
                  ) > processKPI
                    ? "bg-green"
                    : "bg-red"
                }
              >
                {loadingExec || loadingPlan ? (
                  <LoadingComponent />
                ) : (
                  convertToFloat2Fixed(
                    ((convertToNumber(EXEC_SL_PTM_TBTT.DLA_T01) +
                      convertToNumber(EXEC_SL_PTM_TBTT.DLA_T02) +
                      convertToNumber(EXEC_SL_PTM_TBTT.DLA_T03) +
                      convertToNumber(EXEC_SL_PTM_TBTT.DLA_T04) +
                      convertToNumber(EXEC_SL_PTM_TBTT.DLA_T05) +
                      convertToNumber(EXEC_SL_PTM_TBTT.DLA_T06) +
                      convertToNumber(EXEC_SL_PTM_TBTT.DLA_T07) +
                      convertToNumber(EXEC_SL_PTM_TBTT.DLA_T08) +
                      convertToNumber(EXEC_SL_PTM_TBTT.DLA_T09) +
                      convertToNumber(EXEC_SL_PTM_TBTT.DLA_T10) +
                      convertToNumber(EXEC_SL_PTM_TBTT.DLA_T11) +
                      convertToNumber(EXEC_SL_PTM_TBTT.DLA_T12) +
                      convertToNumber(EXEC_SL_PTM_TBTT.DLA_T13) +
                      convertToNumber(EXEC_SL_PTM_TBTT.DLA_D01) +
                      convertToNumber(EXEC_SL_PTM_TBTT.DLA_D02) +
                      convertToNumber(EXEC_SL_PTM_TBTT.DLA_D03) +
                      convertToNumber(EXEC_SL_PTM_TBTT.DLA_D04) +
                      convertToNumber(EXEC_SL_PTM_TBTT.DLA_D05) +
                      convertToNumber(EXEC_SL_PTM_TBTT.DLA_D06)) *
                      100) /
                      convertToNumberMauso(PLAN_SL_PTM_TBTT.TTKDVT)
                  ) + "%"
                )}
              </td>
              <td
              // className={
              //   (convertToNumber(EXEC_SL_PTM_TBTT.TTKDGPS) * 100) /
              //     convertToNumberMauso(PLAN_SL_PTM_TBTT.TTKDGPS) >
              //   processKPI
              //     ? "bg-green"
              //     : "bg-red"
              // }
              >
                {loadingExec || loadingPlan ? (
                  <LoadingComponent />
                ) : EXEC_SL_PTM_TBTT.TTKDGPS && PLAN_SL_PTM_TBTT.TTKDGPS ? (
                  convertToFloat2Fixed(
                    (EXEC_SL_PTM_TBTT.TTKDGPS * 100) / PLAN_SL_PTM_TBTT.TTKDGPS
                  ) + "%"
                ) : (
                  ""
                )}
              </td>
            </tr>
            <tr>
              <td rowSpan={3} className="td-title-center  td-stt fix-col-1">
                5.2
              </td>
              <td rowSpan={3} className="td-title   td-content fix-col-2">
                {`TBTS PTM (thoại)`}
              </td>
              <td className="td-title-center td-kh fix-col-3">KH</td>
              <td>
                {" "}
                {loadingPlan ? (
                  <LoadingComponent />
                ) : PLAN_SL_TBTS_PTM_THOAI.DLA_T01 ? (
                  convertToFloat2Fixed(PLAN_SL_TBTS_PTM_THOAI.DLA_T01)
                ) : (
                  ""
                )}
              </td>
              <td>
                {" "}
                {loadingPlan ? (
                  <LoadingComponent />
                ) : PLAN_SL_TBTS_PTM_THOAI.DLA_T02 ? (
                  convertToFloat2Fixed(PLAN_SL_TBTS_PTM_THOAI.DLA_T02)
                ) : (
                  ""
                )}
              </td>
              <td>
                {" "}
                {loadingPlan ? (
                  <LoadingComponent />
                ) : PLAN_SL_TBTS_PTM_THOAI.DLA_T03 ? (
                  convertToFloat2Fixed(PLAN_SL_TBTS_PTM_THOAI.DLA_T03)
                ) : (
                  ""
                )}
              </td>
              <td>
                {" "}
                {loadingPlan ? (
                  <LoadingComponent />
                ) : PLAN_SL_TBTS_PTM_THOAI.DLA_T04 ? (
                  convertToFloat2Fixed(PLAN_SL_TBTS_PTM_THOAI.DLA_T04)
                ) : (
                  ""
                )}
              </td>
              <td>
                {" "}
                {loadingPlan ? (
                  <LoadingComponent />
                ) : PLAN_SL_TBTS_PTM_THOAI.DLA_T05 ? (
                  convertToFloat2Fixed(PLAN_SL_TBTS_PTM_THOAI.DLA_T05)
                ) : (
                  ""
                )}
              </td>
              <td>
                {" "}
                {loadingPlan ? (
                  <LoadingComponent />
                ) : PLAN_SL_TBTS_PTM_THOAI.DLA_T06 ? (
                  convertToFloat2Fixed(PLAN_SL_TBTS_PTM_THOAI.DLA_T06)
                ) : (
                  ""
                )}
              </td>
              <td>
                {" "}
                {loadingPlan ? (
                  <LoadingComponent />
                ) : PLAN_SL_TBTS_PTM_THOAI.DLA_T07 ? (
                  convertToFloat2Fixed(PLAN_SL_TBTS_PTM_THOAI.DLA_T07)
                ) : (
                  ""
                )}
              </td>
              <td>
                {" "}
                {loadingPlan ? (
                  <LoadingComponent />
                ) : PLAN_SL_TBTS_PTM_THOAI.DLA_T08 ? (
                  convertToFloat2Fixed(PLAN_SL_TBTS_PTM_THOAI.DLA_T08)
                ) : (
                  ""
                )}
              </td>
              <td>
                {" "}
                {loadingPlan ? (
                  <LoadingComponent />
                ) : PLAN_SL_TBTS_PTM_THOAI.DLA_T09 ? (
                  convertToFloat2Fixed(PLAN_SL_TBTS_PTM_THOAI.DLA_T09)
                ) : (
                  ""
                )}
              </td>
              <td>
                {" "}
                {loadingPlan ? (
                  <LoadingComponent />
                ) : PLAN_SL_TBTS_PTM_THOAI.DLA_T10 ? (
                  convertToFloat2Fixed(PLAN_SL_TBTS_PTM_THOAI.DLA_T10)
                ) : (
                  ""
                )}
              </td>
              <td>
                {" "}
                {loadingPlan ? (
                  <LoadingComponent />
                ) : PLAN_SL_TBTS_PTM_THOAI.DLA_T11 ? (
                  convertToFloat2Fixed(PLAN_SL_TBTS_PTM_THOAI.DLA_T11)
                ) : (
                  ""
                )}
              </td>
              <td>
                {" "}
                {loadingPlan ? (
                  <LoadingComponent />
                ) : PLAN_SL_TBTS_PTM_THOAI.DLA_T12 ? (
                  convertToFloat2Fixed(PLAN_SL_TBTS_PTM_THOAI.DLA_T12)
                ) : (
                  ""
                )}
              </td>
              <td>
                {" "}
                {loadingPlan ? (
                  <LoadingComponent />
                ) : PLAN_SL_TBTS_PTM_THOAI.DLA_T13 ? (
                  convertToFloat2Fixed(PLAN_SL_TBTS_PTM_THOAI.DLA_T13)
                ) : (
                  ""
                )}
              </td>
              <td>
                {" "}
                {loadingPlan ? (
                  <LoadingComponent />
                ) : PLAN_SL_TBTS_PTM_THOAI.DLA_D01 ? (
                  convertToFloat2Fixed(PLAN_SL_TBTS_PTM_THOAI.DLA_D01)
                ) : (
                  ""
                )}
              </td>
              <td>
                {" "}
                {loadingPlan ? (
                  <LoadingComponent />
                ) : PLAN_SL_TBTS_PTM_THOAI.DLA_D02 ? (
                  convertToFloat2Fixed(PLAN_SL_TBTS_PTM_THOAI.DLA_D02)
                ) : (
                  ""
                )}
              </td>
              <td>
                {" "}
                {loadingPlan ? (
                  <LoadingComponent />
                ) : PLAN_SL_TBTS_PTM_THOAI.DLA_D03 ? (
                  convertToFloat2Fixed(PLAN_SL_TBTS_PTM_THOAI.DLA_D03)
                ) : (
                  ""
                )}
              </td>
              <td>
                {" "}
                {loadingPlan ? (
                  <LoadingComponent />
                ) : PLAN_SL_TBTS_PTM_THOAI.DLA_D04 ? (
                  convertToFloat2Fixed(PLAN_SL_TBTS_PTM_THOAI.DLA_D04)
                ) : (
                  ""
                )}
              </td>
              <td>
                {" "}
                {loadingPlan ? (
                  <LoadingComponent />
                ) : PLAN_SL_TBTS_PTM_THOAI.DLA_D05 ? (
                  convertToFloat2Fixed(PLAN_SL_TBTS_PTM_THOAI.DLA_D05)
                ) : (
                  ""
                )}
              </td>
              <td>
                {" "}
                {loadingPlan ? (
                  <LoadingComponent />
                ) : PLAN_SL_TBTS_PTM_THOAI.DLA_D06 ? (
                  convertToFloat2Fixed(PLAN_SL_TBTS_PTM_THOAI.DLA_D06)
                ) : (
                  ""
                )}
              </td>
              <td>
                {" "}
                {loadingPlan ? (
                  <LoadingComponent />
                ) : PLAN_SL_TBTS_PTM_THOAI.TTKDVT ? (
                  convertToFloat2Fixed(PLAN_SL_TBTS_PTM_THOAI.TTKDVT)
                ) : (
                  ""
                )}
              </td>
              <td>
                {" "}
                {loadingPlan ? (
                  <LoadingComponent />
                ) : PLAN_SL_TBTS_PTM_THOAI.TTKDGPS ? (
                  convertToFloat2Fixed(PLAN_SL_TBTS_PTM_THOAI.TTKDGPS)
                ) : (
                  ""
                )}
              </td>
              <td rowSpan={3}>
                {EXEC_SL_TBTS_PTM_THOAI.LAST_DATE
                  ? getFormattedDate(new Date(EXEC_SL_TBTS_PTM_THOAI.LAST_DATE))
                  : ""}
              </td>
            </tr>
            <tr>
              <td className="td-title-center td-kh fix-col-3">TH</td>
              <td>
                {" "}
                {loadingPlan ? (
                  <LoadingComponent />
                ) : EXEC_SL_TBTS_PTM_THOAI.DLA_T01 ? (
                  convertToFloat2Fixed(EXEC_SL_TBTS_PTM_THOAI.DLA_T01)
                ) : (
                  ""
                )}
              </td>
              <td>
                {" "}
                {loadingPlan ? (
                  <LoadingComponent />
                ) : EXEC_SL_TBTS_PTM_THOAI.DLA_T02 ? (
                  convertToFloat2Fixed(EXEC_SL_TBTS_PTM_THOAI.DLA_T02)
                ) : (
                  ""
                )}
              </td>
              <td>
                {" "}
                {loadingPlan ? (
                  <LoadingComponent />
                ) : EXEC_SL_TBTS_PTM_THOAI.DLA_T03 ? (
                  convertToFloat2Fixed(EXEC_SL_TBTS_PTM_THOAI.DLA_T03)
                ) : (
                  ""
                )}
              </td>
              <td>
                {" "}
                {loadingPlan ? (
                  <LoadingComponent />
                ) : EXEC_SL_TBTS_PTM_THOAI.DLA_T04 ? (
                  convertToFloat2Fixed(EXEC_SL_TBTS_PTM_THOAI.DLA_T04)
                ) : (
                  ""
                )}
              </td>
              <td>
                {" "}
                {loadingPlan ? (
                  <LoadingComponent />
                ) : EXEC_SL_TBTS_PTM_THOAI.DLA_T05 ? (
                  convertToFloat2Fixed(EXEC_SL_TBTS_PTM_THOAI.DLA_T05)
                ) : (
                  ""
                )}
              </td>
              <td>
                {" "}
                {loadingPlan ? (
                  <LoadingComponent />
                ) : EXEC_SL_TBTS_PTM_THOAI.DLA_T06 ? (
                  convertToFloat2Fixed(EXEC_SL_TBTS_PTM_THOAI.DLA_T06)
                ) : (
                  ""
                )}
              </td>
              <td>
                {" "}
                {loadingPlan ? (
                  <LoadingComponent />
                ) : EXEC_SL_TBTS_PTM_THOAI.DLA_T07 ? (
                  convertToFloat2Fixed(EXEC_SL_TBTS_PTM_THOAI.DLA_T07)
                ) : (
                  ""
                )}
              </td>
              <td>
                {" "}
                {loadingPlan ? (
                  <LoadingComponent />
                ) : EXEC_SL_TBTS_PTM_THOAI.DLA_T08 ? (
                  convertToFloat2Fixed(EXEC_SL_TBTS_PTM_THOAI.DLA_T08)
                ) : (
                  ""
                )}
              </td>
              <td>
                {" "}
                {loadingPlan ? (
                  <LoadingComponent />
                ) : EXEC_SL_TBTS_PTM_THOAI.DLA_T09 ? (
                  convertToFloat2Fixed(EXEC_SL_TBTS_PTM_THOAI.DLA_T09)
                ) : (
                  ""
                )}
              </td>
              <td>
                {" "}
                {loadingPlan ? (
                  <LoadingComponent />
                ) : EXEC_SL_TBTS_PTM_THOAI.DLA_T10 ? (
                  convertToFloat2Fixed(EXEC_SL_TBTS_PTM_THOAI.DLA_T10)
                ) : (
                  ""
                )}
              </td>
              <td>
                {" "}
                {loadingPlan ? (
                  <LoadingComponent />
                ) : EXEC_SL_TBTS_PTM_THOAI.DLA_T11 ? (
                  convertToFloat2Fixed(EXEC_SL_TBTS_PTM_THOAI.DLA_T11)
                ) : (
                  ""
                )}
              </td>
              <td>
                {" "}
                {loadingPlan ? (
                  <LoadingComponent />
                ) : EXEC_SL_TBTS_PTM_THOAI.DLA_T12 ? (
                  convertToFloat2Fixed(EXEC_SL_TBTS_PTM_THOAI.DLA_T12)
                ) : (
                  ""
                )}
              </td>
              <td>
                {" "}
                {loadingPlan ? (
                  <LoadingComponent />
                ) : EXEC_SL_TBTS_PTM_THOAI.DLA_T13 ? (
                  convertToFloat2Fixed(EXEC_SL_TBTS_PTM_THOAI.DLA_T13)
                ) : (
                  ""
                )}
              </td>
              <td>
                {" "}
                {loadingPlan ? (
                  <LoadingComponent />
                ) : EXEC_SL_TBTS_PTM_THOAI.DLA_D01 ? (
                  convertToFloat2Fixed(EXEC_SL_TBTS_PTM_THOAI.DLA_D01)
                ) : (
                  ""
                )}
              </td>
              <td>
                {" "}
                {loadingPlan ? (
                  <LoadingComponent />
                ) : EXEC_SL_TBTS_PTM_THOAI.DLA_D02 ? (
                  convertToFloat2Fixed(EXEC_SL_TBTS_PTM_THOAI.DLA_D02)
                ) : (
                  ""
                )}
              </td>
              <td>
                {" "}
                {loadingPlan ? (
                  <LoadingComponent />
                ) : EXEC_SL_TBTS_PTM_THOAI.DLA_D03 ? (
                  convertToFloat2Fixed(EXEC_SL_TBTS_PTM_THOAI.DLA_D03)
                ) : (
                  ""
                )}
              </td>
              <td>
                {" "}
                {loadingPlan ? (
                  <LoadingComponent />
                ) : EXEC_SL_TBTS_PTM_THOAI.DLA_D04 ? (
                  convertToFloat2Fixed(EXEC_SL_TBTS_PTM_THOAI.DLA_D04)
                ) : (
                  ""
                )}
              </td>
              <td>
                {" "}
                {loadingPlan ? (
                  <LoadingComponent />
                ) : EXEC_SL_TBTS_PTM_THOAI.DLA_D05 ? (
                  convertToFloat2Fixed(EXEC_SL_TBTS_PTM_THOAI.DLA_D05)
                ) : (
                  ""
                )}
              </td>
              <td>
                {" "}
                {loadingPlan ? (
                  <LoadingComponent />
                ) : EXEC_SL_TBTS_PTM_THOAI.DLA_D06 ? (
                  convertToFloat2Fixed(EXEC_SL_TBTS_PTM_THOAI.DLA_D06)
                ) : (
                  ""
                )}
              </td>
              <td>
                {" "}
                {loadingPlan ? (
                  <LoadingComponent />
                ) : (
                  convertToFloat2Fixed(
                    convertToNumber(EXEC_SL_TBTS_PTM_THOAI.DLA_T01) +
                      convertToNumber(EXEC_SL_TBTS_PTM_THOAI.DLA_T02) +
                      convertToNumber(EXEC_SL_TBTS_PTM_THOAI.DLA_T03) +
                      convertToNumber(EXEC_SL_TBTS_PTM_THOAI.DLA_T04) +
                      convertToNumber(EXEC_SL_TBTS_PTM_THOAI.DLA_T05) +
                      convertToNumber(EXEC_SL_TBTS_PTM_THOAI.DLA_T06) +
                      convertToNumber(EXEC_SL_TBTS_PTM_THOAI.DLA_T07) +
                      convertToNumber(EXEC_SL_TBTS_PTM_THOAI.DLA_T08) +
                      convertToNumber(EXEC_SL_TBTS_PTM_THOAI.DLA_T09) +
                      convertToNumber(EXEC_SL_TBTS_PTM_THOAI.DLA_T10) +
                      convertToNumber(EXEC_SL_TBTS_PTM_THOAI.DLA_T11) +
                      convertToNumber(EXEC_SL_TBTS_PTM_THOAI.DLA_T12) +
                      convertToNumber(EXEC_SL_TBTS_PTM_THOAI.DLA_T13) +
                      convertToNumber(EXEC_SL_TBTS_PTM_THOAI.DLA_D01) +
                      convertToNumber(EXEC_SL_TBTS_PTM_THOAI.DLA_D02) +
                      convertToNumber(EXEC_SL_TBTS_PTM_THOAI.DLA_D03) +
                      convertToNumber(EXEC_SL_TBTS_PTM_THOAI.DLA_D04) +
                      convertToNumber(EXEC_SL_TBTS_PTM_THOAI.DLA_D05) +
                      convertToNumber(EXEC_SL_TBTS_PTM_THOAI.DLA_D06)
                  )
                )}
              </td>
              <td>
                {" "}
                {loadingPlan ? (
                  <LoadingComponent />
                ) : EXEC_SL_TBTS_PTM_THOAI.TTKDGPS ? (
                  convertToFloat2Fixed(EXEC_SL_TBTS_PTM_THOAI.TTKDGPS)
                ) : (
                  ""
                )}
              </td>
            </tr>
            <tr>
              <td className="td-title-center td-kh fix-col-3">%TH</td>
              <td
                className={
                  (convertToNumber(EXEC_SL_TBTS_PTM_THOAI.DLA_T01) * 100) /
                    convertToNumberMauso(PLAN_SL_TBTS_PTM_THOAI.DLA_T01) >
                  processKPI
                    ? "bg-green"
                    : "bg-red"
                }
              >
                {loadingExec || loadingPlan ? (
                  <LoadingComponent />
                ) : EXEC_SL_TBTS_PTM_THOAI.DLA_T01 &&
                  PLAN_SL_TBTS_PTM_THOAI.DLA_T01 ? (
                  convertToFloat2Fixed(
                    (EXEC_SL_TBTS_PTM_THOAI.DLA_T01 * 100) /
                      PLAN_SL_TBTS_PTM_THOAI.DLA_T01
                  ) + "%"
                ) : (
                  ""
                )}
              </td>
              <td
                className={
                  (convertToNumber(EXEC_SL_TBTS_PTM_THOAI.DLA_T02) * 100) /
                    convertToNumberMauso(PLAN_SL_TBTS_PTM_THOAI.DLA_T02) >
                  processKPI
                    ? "bg-green"
                    : "bg-red"
                }
              >
                {loadingExec || loadingPlan ? (
                  <LoadingComponent />
                ) : EXEC_SL_TBTS_PTM_THOAI.DLA_T02 &&
                  PLAN_SL_TBTS_PTM_THOAI.DLA_T02 ? (
                  convertToFloat2Fixed(
                    (EXEC_SL_TBTS_PTM_THOAI.DLA_T02 * 100) /
                      PLAN_SL_TBTS_PTM_THOAI.DLA_T02
                  ) + "%"
                ) : (
                  ""
                )}
              </td>
              <td
                className={
                  (convertToNumber(EXEC_SL_TBTS_PTM_THOAI.DLA_T03) * 100) /
                    convertToNumberMauso(PLAN_SL_TBTS_PTM_THOAI.DLA_T03) >
                  processKPI
                    ? "bg-green"
                    : "bg-red"
                }
              >
                {loadingExec || loadingPlan ? (
                  <LoadingComponent />
                ) : EXEC_SL_TBTS_PTM_THOAI.DLA_T03 &&
                  PLAN_SL_TBTS_PTM_THOAI.DLA_T03 ? (
                  convertToFloat2Fixed(
                    (EXEC_SL_TBTS_PTM_THOAI.DLA_T03 * 100) /
                      PLAN_SL_TBTS_PTM_THOAI.DLA_T03
                  ) + "%"
                ) : (
                  ""
                )}
              </td>
              <td
                className={
                  (convertToNumber(EXEC_SL_TBTS_PTM_THOAI.DLA_T04) * 100) /
                    convertToNumberMauso(PLAN_SL_TBTS_PTM_THOAI.DLA_T04) >
                  processKPI
                    ? "bg-green"
                    : "bg-red"
                }
              >
                {loadingExec || loadingPlan ? (
                  <LoadingComponent />
                ) : EXEC_SL_TBTS_PTM_THOAI.DLA_T04 &&
                  PLAN_SL_TBTS_PTM_THOAI.DLA_T04 ? (
                  convertToFloat2Fixed(
                    (EXEC_SL_TBTS_PTM_THOAI.DLA_T04 * 100) /
                      PLAN_SL_TBTS_PTM_THOAI.DLA_T04
                  ) + "%"
                ) : (
                  ""
                )}
              </td>
              <td
                className={
                  (convertToNumber(EXEC_SL_TBTS_PTM_THOAI.DLA_T05) * 100) /
                    convertToNumberMauso(PLAN_SL_TBTS_PTM_THOAI.DLA_T05) >
                  processKPI
                    ? "bg-green"
                    : "bg-red"
                }
              >
                {loadingExec || loadingPlan ? (
                  <LoadingComponent />
                ) : EXEC_SL_TBTS_PTM_THOAI.DLA_T05 &&
                  PLAN_SL_TBTS_PTM_THOAI.DLA_T05 ? (
                  convertToFloat2Fixed(
                    (EXEC_SL_TBTS_PTM_THOAI.DLA_T05 * 100) /
                      PLAN_SL_TBTS_PTM_THOAI.DLA_T05
                  ) + "%"
                ) : (
                  ""
                )}
              </td>
              <td
                className={
                  (convertToNumber(EXEC_SL_TBTS_PTM_THOAI.DLA_T06) * 100) /
                    convertToNumberMauso(PLAN_SL_TBTS_PTM_THOAI.DLA_T06) >
                  processKPI
                    ? "bg-green"
                    : "bg-red"
                }
              >
                {loadingExec || loadingPlan ? (
                  <LoadingComponent />
                ) : EXEC_SL_TBTS_PTM_THOAI.DLA_T06 &&
                  PLAN_SL_TBTS_PTM_THOAI.DLA_T06 ? (
                  convertToFloat2Fixed(
                    (EXEC_SL_TBTS_PTM_THOAI.DLA_T06 * 100) /
                      PLAN_SL_TBTS_PTM_THOAI.DLA_T06
                  ) + "%"
                ) : (
                  ""
                )}
              </td>
              <td
                className={
                  (convertToNumber(EXEC_SL_TBTS_PTM_THOAI.DLA_T07) * 100) /
                    convertToNumberMauso(PLAN_SL_TBTS_PTM_THOAI.DLA_T07) >
                  processKPI
                    ? "bg-green"
                    : "bg-red"
                }
              >
                {loadingExec || loadingPlan ? (
                  <LoadingComponent />
                ) : EXEC_SL_TBTS_PTM_THOAI.DLA_T07 &&
                  PLAN_SL_TBTS_PTM_THOAI.DLA_T07 ? (
                  convertToFloat2Fixed(
                    (EXEC_SL_TBTS_PTM_THOAI.DLA_T07 * 100) /
                      PLAN_SL_TBTS_PTM_THOAI.DLA_T07
                  ) + "%"
                ) : (
                  ""
                )}
              </td>
              <td
                className={
                  (convertToNumber(EXEC_SL_TBTS_PTM_THOAI.DLA_T08) * 100) /
                    convertToNumberMauso(PLAN_SL_TBTS_PTM_THOAI.DLA_T08) >
                  processKPI
                    ? "bg-green"
                    : "bg-red"
                }
              >
                {loadingExec || loadingPlan ? (
                  <LoadingComponent />
                ) : EXEC_SL_TBTS_PTM_THOAI.DLA_T08 &&
                  PLAN_SL_TBTS_PTM_THOAI.DLA_T08 ? (
                  convertToFloat2Fixed(
                    (EXEC_SL_TBTS_PTM_THOAI.DLA_T08 * 100) /
                      PLAN_SL_TBTS_PTM_THOAI.DLA_T08
                  ) + "%"
                ) : (
                  ""
                )}
              </td>
              <td
                className={
                  (convertToNumber(EXEC_SL_TBTS_PTM_THOAI.DLA_T09) * 100) /
                    convertToNumberMauso(PLAN_SL_TBTS_PTM_THOAI.DLA_T09) >
                  processKPI
                    ? "bg-green"
                    : "bg-red"
                }
              >
                {loadingExec || loadingPlan ? (
                  <LoadingComponent />
                ) : EXEC_SL_TBTS_PTM_THOAI.DLA_T09 &&
                  PLAN_SL_TBTS_PTM_THOAI.DLA_T09 ? (
                  convertToFloat2Fixed(
                    (EXEC_SL_TBTS_PTM_THOAI.DLA_T09 * 100) /
                      PLAN_SL_TBTS_PTM_THOAI.DLA_T09
                  ) + "%"
                ) : (
                  ""
                )}
              </td>
              <td
                className={
                  (convertToNumber(EXEC_SL_TBTS_PTM_THOAI.DLA_T10) * 100) /
                    convertToNumberMauso(PLAN_SL_TBTS_PTM_THOAI.DLA_T10) >
                  processKPI
                    ? "bg-green"
                    : "bg-red"
                }
              >
                {loadingExec || loadingPlan ? (
                  <LoadingComponent />
                ) : EXEC_SL_TBTS_PTM_THOAI.DLA_T10 &&
                  PLAN_SL_TBTS_PTM_THOAI.DLA_T10 ? (
                  convertToFloat2Fixed(
                    (EXEC_SL_TBTS_PTM_THOAI.DLA_T10 * 100) /
                      PLAN_SL_TBTS_PTM_THOAI.DLA_T10
                  ) + "%"
                ) : (
                  ""
                )}
              </td>
              <td
                className={
                  (convertToNumber(EXEC_SL_TBTS_PTM_THOAI.DLA_T11) * 100) /
                    convertToNumberMauso(PLAN_SL_TBTS_PTM_THOAI.DLA_T11) >
                  processKPI
                    ? "bg-green"
                    : "bg-red"
                }
              >
                {loadingExec || loadingPlan ? (
                  <LoadingComponent />
                ) : EXEC_SL_TBTS_PTM_THOAI.DLA_T11 &&
                  PLAN_SL_TBTS_PTM_THOAI.DLA_T11 ? (
                  convertToFloat2Fixed(
                    (EXEC_SL_TBTS_PTM_THOAI.DLA_T11 * 100) /
                      PLAN_SL_TBTS_PTM_THOAI.DLA_T11
                  ) + "%"
                ) : (
                  ""
                )}
              </td>
              <td
                className={
                  (convertToNumber(EXEC_SL_TBTS_PTM_THOAI.DLA_T12) * 100) /
                    convertToNumberMauso(PLAN_SL_TBTS_PTM_THOAI.DLA_T12) >
                  processKPI
                    ? "bg-green"
                    : "bg-red"
                }
              >
                {loadingExec || loadingPlan ? (
                  <LoadingComponent />
                ) : EXEC_SL_TBTS_PTM_THOAI.DLA_T12 &&
                  PLAN_SL_TBTS_PTM_THOAI.DLA_T12 ? (
                  convertToFloat2Fixed(
                    (EXEC_SL_TBTS_PTM_THOAI.DLA_T12 * 100) /
                      PLAN_SL_TBTS_PTM_THOAI.DLA_T12
                  ) + "%"
                ) : (
                  ""
                )}
              </td>
              <td
                className={
                  (convertToNumber(EXEC_SL_TBTS_PTM_THOAI.DLA_T13) * 100) /
                    convertToNumberMauso(PLAN_SL_TBTS_PTM_THOAI.DLA_T13) >
                  processKPI
                    ? "bg-green"
                    : "bg-red"
                }
              >
                {loadingExec || loadingPlan ? (
                  <LoadingComponent />
                ) : EXEC_SL_TBTS_PTM_THOAI.DLA_T13 &&
                  PLAN_SL_TBTS_PTM_THOAI.DLA_T13 ? (
                  convertToFloat2Fixed(
                    (EXEC_SL_TBTS_PTM_THOAI.DLA_T13 * 100) /
                      PLAN_SL_TBTS_PTM_THOAI.DLA_T13
                  ) + "%"
                ) : (
                  ""
                )}
              </td>
              <td
                className={
                  (convertToNumber(EXEC_SL_TBTS_PTM_THOAI.DLA_D01) * 100) /
                    convertToNumberMauso(PLAN_SL_TBTS_PTM_THOAI.DLA_D01) >
                  processKPI
                    ? "bg-green"
                    : "bg-red"
                }
              >
                {loadingExec || loadingPlan ? (
                  <LoadingComponent />
                ) : EXEC_SL_TBTS_PTM_THOAI.DLA_D01 &&
                  PLAN_SL_TBTS_PTM_THOAI.DLA_D01 ? (
                  convertToFloat2Fixed(
                    (EXEC_SL_TBTS_PTM_THOAI.DLA_D01 * 100) /
                      PLAN_SL_TBTS_PTM_THOAI.DLA_D01
                  ) + "%"
                ) : (
                  ""
                )}
              </td>
              <td
                className={
                  (convertToNumber(EXEC_SL_TBTS_PTM_THOAI.DLA_D02) * 100) /
                    convertToNumberMauso(PLAN_SL_TBTS_PTM_THOAI.DLA_D02) >
                  processKPI
                    ? "bg-green"
                    : "bg-red"
                }
              >
                {loadingExec || loadingPlan ? (
                  <LoadingComponent />
                ) : EXEC_SL_TBTS_PTM_THOAI.DLA_D02 &&
                  PLAN_SL_TBTS_PTM_THOAI.DLA_D02 ? (
                  convertToFloat2Fixed(
                    (EXEC_SL_TBTS_PTM_THOAI.DLA_D02 * 100) /
                      PLAN_SL_TBTS_PTM_THOAI.DLA_D02
                  ) + "%"
                ) : (
                  ""
                )}
              </td>
              <td
                className={
                  (convertToNumber(EXEC_SL_TBTS_PTM_THOAI.DLA_D03) * 100) /
                    convertToNumberMauso(PLAN_SL_TBTS_PTM_THOAI.DLA_D03) >
                  processKPI
                    ? "bg-green"
                    : "bg-red"
                }
              >
                {loadingExec || loadingPlan ? (
                  <LoadingComponent />
                ) : EXEC_SL_TBTS_PTM_THOAI.DLA_D03 &&
                  PLAN_SL_TBTS_PTM_THOAI.DLA_D03 ? (
                  convertToFloat2Fixed(
                    (EXEC_SL_TBTS_PTM_THOAI.DLA_D03 * 100) /
                      PLAN_SL_TBTS_PTM_THOAI.DLA_D03
                  ) + "%"
                ) : (
                  ""
                )}
              </td>
              <td
                className={
                  (convertToNumber(EXEC_SL_TBTS_PTM_THOAI.DLA_D04) * 100) /
                    convertToNumberMauso(PLAN_SL_TBTS_PTM_THOAI.DLA_D04) >
                  processKPI
                    ? "bg-green"
                    : "bg-red"
                }
              >
                {loadingExec || loadingPlan ? (
                  <LoadingComponent />
                ) : EXEC_SL_TBTS_PTM_THOAI.DLA_D04 &&
                  PLAN_SL_TBTS_PTM_THOAI.DLA_D04 ? (
                  convertToFloat2Fixed(
                    (EXEC_SL_TBTS_PTM_THOAI.DLA_D04 * 100) /
                      PLAN_SL_TBTS_PTM_THOAI.DLA_D04
                  ) + "%"
                ) : (
                  ""
                )}
              </td>
              <td
                className={
                  (convertToNumber(EXEC_SL_TBTS_PTM_THOAI.DLA_D05) * 100) /
                    convertToNumberMauso(PLAN_SL_TBTS_PTM_THOAI.DLA_D05) >
                  processKPI
                    ? "bg-green"
                    : "bg-red"
                }
              >
                {loadingExec || loadingPlan ? (
                  <LoadingComponent />
                ) : EXEC_SL_TBTS_PTM_THOAI.DLA_D05 &&
                  PLAN_SL_TBTS_PTM_THOAI.DLA_D05 ? (
                  convertToFloat2Fixed(
                    (EXEC_SL_TBTS_PTM_THOAI.DLA_D05 * 100) /
                      PLAN_SL_TBTS_PTM_THOAI.DLA_D05
                  ) + "%"
                ) : (
                  ""
                )}
              </td>
              <td
                className={
                  (convertToNumber(EXEC_SL_TBTS_PTM_THOAI.DLA_D06) * 100) /
                    convertToNumberMauso(PLAN_SL_TBTS_PTM_THOAI.DLA_D06) >
                  processKPI
                    ? "bg-green"
                    : "bg-red"
                }
              >
                {loadingExec || loadingPlan ? (
                  <LoadingComponent />
                ) : EXEC_SL_TBTS_PTM_THOAI.DLA_D06 &&
                  PLAN_SL_TBTS_PTM_THOAI.DLA_D06 ? (
                  convertToFloat2Fixed(
                    (EXEC_SL_TBTS_PTM_THOAI.DLA_D06 * 100) /
                      PLAN_SL_TBTS_PTM_THOAI.DLA_D06
                  ) + "%"
                ) : (
                  ""
                )}
              </td>
              <td
                className={
                  convertToFloat2Fixed(
                    ((convertToNumber(EXEC_SL_TBTS_PTM_THOAI.DLA_T01) +
                      convertToNumber(EXEC_SL_TBTS_PTM_THOAI.DLA_T02) +
                      convertToNumber(EXEC_SL_TBTS_PTM_THOAI.DLA_T03) +
                      convertToNumber(EXEC_SL_TBTS_PTM_THOAI.DLA_T04) +
                      convertToNumber(EXEC_SL_TBTS_PTM_THOAI.DLA_T05) +
                      convertToNumber(EXEC_SL_TBTS_PTM_THOAI.DLA_T06) +
                      convertToNumber(EXEC_SL_TBTS_PTM_THOAI.DLA_T07) +
                      convertToNumber(EXEC_SL_TBTS_PTM_THOAI.DLA_T08) +
                      convertToNumber(EXEC_SL_TBTS_PTM_THOAI.DLA_T09) +
                      convertToNumber(EXEC_SL_TBTS_PTM_THOAI.DLA_T10) +
                      convertToNumber(EXEC_SL_TBTS_PTM_THOAI.DLA_T11) +
                      convertToNumber(EXEC_SL_TBTS_PTM_THOAI.DLA_T12) +
                      convertToNumber(EXEC_SL_TBTS_PTM_THOAI.DLA_T13) +
                      convertToNumber(EXEC_SL_TBTS_PTM_THOAI.DLA_D01) +
                      convertToNumber(EXEC_SL_TBTS_PTM_THOAI.DLA_D02) +
                      convertToNumber(EXEC_SL_TBTS_PTM_THOAI.DLA_D03) +
                      convertToNumber(EXEC_SL_TBTS_PTM_THOAI.DLA_D04) +
                      convertToNumber(EXEC_SL_TBTS_PTM_THOAI.DLA_D05) +
                      convertToNumber(EXEC_SL_TBTS_PTM_THOAI.DLA_D06)) *
                      100) /
                      convertToNumberMauso(PLAN_SL_TBTS_PTM_THOAI.TTKDVT)
                  ) > processKPI
                    ? "bg-green"
                    : "bg-red"
                }
              >
                {loadingExec || loadingPlan ? (
                  <LoadingComponent />
                ) : (
                  convertToFloat2Fixed(
                    ((convertToNumber(EXEC_SL_TBTS_PTM_THOAI.DLA_T01) +
                      convertToNumber(EXEC_SL_TBTS_PTM_THOAI.DLA_T02) +
                      convertToNumber(EXEC_SL_TBTS_PTM_THOAI.DLA_T03) +
                      convertToNumber(EXEC_SL_TBTS_PTM_THOAI.DLA_T04) +
                      convertToNumber(EXEC_SL_TBTS_PTM_THOAI.DLA_T05) +
                      convertToNumber(EXEC_SL_TBTS_PTM_THOAI.DLA_T06) +
                      convertToNumber(EXEC_SL_TBTS_PTM_THOAI.DLA_T07) +
                      convertToNumber(EXEC_SL_TBTS_PTM_THOAI.DLA_T08) +
                      convertToNumber(EXEC_SL_TBTS_PTM_THOAI.DLA_T09) +
                      convertToNumber(EXEC_SL_TBTS_PTM_THOAI.DLA_T10) +
                      convertToNumber(EXEC_SL_TBTS_PTM_THOAI.DLA_T11) +
                      convertToNumber(EXEC_SL_TBTS_PTM_THOAI.DLA_T12) +
                      convertToNumber(EXEC_SL_TBTS_PTM_THOAI.DLA_T13) +
                      convertToNumber(EXEC_SL_TBTS_PTM_THOAI.DLA_D01) +
                      convertToNumber(EXEC_SL_TBTS_PTM_THOAI.DLA_D02) +
                      convertToNumber(EXEC_SL_TBTS_PTM_THOAI.DLA_D03) +
                      convertToNumber(EXEC_SL_TBTS_PTM_THOAI.DLA_D04) +
                      convertToNumber(EXEC_SL_TBTS_PTM_THOAI.DLA_D05) +
                      convertToNumber(EXEC_SL_TBTS_PTM_THOAI.DLA_D06)) *
                      100) /
                      convertToNumberMauso(PLAN_SL_TBTS_PTM_THOAI.TTKDVT)
                  ) + "%"
                )}
              </td>
              <td
              // className={
              //   (convertToNumber(EXEC_SL_TBTS_PTM_THOAI.TTKDGPS) * 100) /
              //     convertToNumberMauso(PLAN_SL_TBTS_PTM_THOAI.TTKDGPS) >
              //   processKPI
              //     ? "bg-green"
              //     : "bg-red"
              // }
              >
                {loadingExec || loadingPlan ? (
                  <LoadingComponent />
                ) : EXEC_SL_TBTS_PTM_THOAI.TTKDGPS &&
                  PLAN_SL_TBTS_PTM_THOAI.TTKDGPS ? (
                  convertToFloat2Fixed(
                    (EXEC_SL_TBTS_PTM_THOAI.TTKDGPS * 100) /
                      PLAN_SL_TBTS_PTM_THOAI.TTKDGPS
                  ) + "%"
                ) : (
                  ""
                )}
              </td>
            </tr>
            <tr>
              <td rowSpan={3} className="td-title-center  td-stt fix-col-1">
                5.3
              </td>
              <td rowSpan={3} className="td-title   td-content fix-col-2">
                {`TB PTM M2M`}
              </td>
              <td className="td-title-center td-kh fix-col-3">KH</td>
              <td>
                {" "}
                {loadingPlan ? (
                  <LoadingComponent />
                ) : PLAN_SL_TB_PTM_M2M.DLA_T01 ? (
                  convertToFloat2Fixed(PLAN_SL_TB_PTM_M2M.DLA_T01)
                ) : (
                  ""
                )}
              </td>
              <td>
                {" "}
                {loadingPlan ? (
                  <LoadingComponent />
                ) : PLAN_SL_TB_PTM_M2M.DLA_T02 ? (
                  convertToFloat2Fixed(PLAN_SL_TB_PTM_M2M.DLA_T02)
                ) : (
                  ""
                )}
              </td>
              <td>
                {" "}
                {loadingPlan ? (
                  <LoadingComponent />
                ) : PLAN_SL_TB_PTM_M2M.DLA_T03 ? (
                  convertToFloat2Fixed(PLAN_SL_TB_PTM_M2M.DLA_T03)
                ) : (
                  ""
                )}
              </td>
              <td>
                {" "}
                {loadingPlan ? (
                  <LoadingComponent />
                ) : PLAN_SL_TB_PTM_M2M.DLA_T04 ? (
                  convertToFloat2Fixed(PLAN_SL_TB_PTM_M2M.DLA_T04)
                ) : (
                  ""
                )}
              </td>
              <td>
                {" "}
                {loadingPlan ? (
                  <LoadingComponent />
                ) : PLAN_SL_TB_PTM_M2M.DLA_T05 ? (
                  convertToFloat2Fixed(PLAN_SL_TB_PTM_M2M.DLA_T05)
                ) : (
                  ""
                )}
              </td>
              <td>
                {" "}
                {loadingPlan ? (
                  <LoadingComponent />
                ) : PLAN_SL_TB_PTM_M2M.DLA_T06 ? (
                  convertToFloat2Fixed(PLAN_SL_TB_PTM_M2M.DLA_T06)
                ) : (
                  ""
                )}
              </td>
              <td>
                {" "}
                {loadingPlan ? (
                  <LoadingComponent />
                ) : PLAN_SL_TB_PTM_M2M.DLA_T07 ? (
                  convertToFloat2Fixed(PLAN_SL_TB_PTM_M2M.DLA_T07)
                ) : (
                  ""
                )}
              </td>
              <td>
                {" "}
                {loadingPlan ? (
                  <LoadingComponent />
                ) : PLAN_SL_TB_PTM_M2M.DLA_T08 ? (
                  convertToFloat2Fixed(PLAN_SL_TB_PTM_M2M.DLA_T08)
                ) : (
                  ""
                )}
              </td>
              <td>
                {" "}
                {loadingPlan ? (
                  <LoadingComponent />
                ) : PLAN_SL_TB_PTM_M2M.DLA_T09 ? (
                  convertToFloat2Fixed(PLAN_SL_TB_PTM_M2M.DLA_T09)
                ) : (
                  ""
                )}
              </td>
              <td>
                {" "}
                {loadingPlan ? (
                  <LoadingComponent />
                ) : PLAN_SL_TB_PTM_M2M.DLA_T10 ? (
                  convertToFloat2Fixed(PLAN_SL_TB_PTM_M2M.DLA_T10)
                ) : (
                  ""
                )}
              </td>
              <td>
                {" "}
                {loadingPlan ? (
                  <LoadingComponent />
                ) : PLAN_SL_TB_PTM_M2M.DLA_T11 ? (
                  convertToFloat2Fixed(PLAN_SL_TB_PTM_M2M.DLA_T11)
                ) : (
                  ""
                )}
              </td>
              <td>
                {" "}
                {loadingPlan ? (
                  <LoadingComponent />
                ) : PLAN_SL_TB_PTM_M2M.DLA_T12 ? (
                  convertToFloat2Fixed(PLAN_SL_TB_PTM_M2M.DLA_T12)
                ) : (
                  ""
                )}
              </td>
              <td>
                {" "}
                {loadingPlan ? (
                  <LoadingComponent />
                ) : PLAN_SL_TB_PTM_M2M.DLA_T13 ? (
                  convertToFloat2Fixed(PLAN_SL_TB_PTM_M2M.DLA_T13)
                ) : (
                  ""
                )}
              </td>
              <td>
                {" "}
                {loadingPlan ? (
                  <LoadingComponent />
                ) : PLAN_SL_TB_PTM_M2M.DLA_D01 ? (
                  convertToFloat2Fixed(PLAN_SL_TB_PTM_M2M.DLA_D01)
                ) : (
                  ""
                )}
              </td>
              <td>
                {" "}
                {loadingPlan ? (
                  <LoadingComponent />
                ) : PLAN_SL_TB_PTM_M2M.DLA_D02 ? (
                  convertToFloat2Fixed(PLAN_SL_TB_PTM_M2M.DLA_D02)
                ) : (
                  ""
                )}
              </td>
              <td>
                {" "}
                {loadingPlan ? (
                  <LoadingComponent />
                ) : PLAN_SL_TB_PTM_M2M.DLA_D03 ? (
                  convertToFloat2Fixed(PLAN_SL_TB_PTM_M2M.DLA_D03)
                ) : (
                  ""
                )}
              </td>
              <td>
                {" "}
                {loadingPlan ? (
                  <LoadingComponent />
                ) : PLAN_SL_TB_PTM_M2M.DLA_D04 ? (
                  convertToFloat2Fixed(PLAN_SL_TB_PTM_M2M.DLA_D04)
                ) : (
                  ""
                )}
              </td>
              <td>
                {" "}
                {loadingPlan ? (
                  <LoadingComponent />
                ) : PLAN_SL_TB_PTM_M2M.DLA_D05 ? (
                  convertToFloat2Fixed(PLAN_SL_TB_PTM_M2M.DLA_D05)
                ) : (
                  ""
                )}
              </td>
              <td>
                {" "}
                {loadingPlan ? (
                  <LoadingComponent />
                ) : PLAN_SL_TB_PTM_M2M.DLA_D06 ? (
                  convertToFloat2Fixed(PLAN_SL_TB_PTM_M2M.DLA_D06)
                ) : (
                  ""
                )}
              </td>
              <td>
                {" "}
                {loadingPlan ? (
                  <LoadingComponent />
                ) : PLAN_SL_TB_PTM_M2M.TTKDVT ? (
                  convertToFloat2Fixed(PLAN_SL_TB_PTM_M2M.TTKDVT)
                ) : (
                  ""
                )}
              </td>
              <td>
                {" "}
                {loadingPlan ? (
                  <LoadingComponent />
                ) : PLAN_SL_TB_PTM_M2M.TTKDGPS ? (
                  convertToFloat2Fixed(PLAN_SL_TB_PTM_M2M.TTKDGPS)
                ) : (
                  ""
                )}
              </td>
              <td rowSpan={3}>
                {EXEC_SL_TB_PTM_M2M.LAST_DATE
                  ? getFormattedDate(new Date(EXEC_SL_TB_PTM_M2M.LAST_DATE))
                  : ""}
              </td>
            </tr>
            <tr>
              <td className="td-title-center td-kh fix-col-3">TH</td>
              <td>
                {" "}
                {loadingPlan ? (
                  <LoadingComponent />
                ) : EXEC_SL_TB_PTM_M2M.DLA_T01 ? (
                  convertToFloat2Fixed(EXEC_SL_TB_PTM_M2M.DLA_T01)
                ) : (
                  ""
                )}
              </td>
              <td>
                {" "}
                {loadingPlan ? (
                  <LoadingComponent />
                ) : EXEC_SL_TB_PTM_M2M.DLA_T02 ? (
                  convertToFloat2Fixed(EXEC_SL_TB_PTM_M2M.DLA_T02)
                ) : (
                  ""
                )}
              </td>
              <td>
                {" "}
                {loadingPlan ? (
                  <LoadingComponent />
                ) : EXEC_SL_TB_PTM_M2M.DLA_T03 ? (
                  convertToFloat2Fixed(EXEC_SL_TB_PTM_M2M.DLA_T03)
                ) : (
                  ""
                )}
              </td>
              <td>
                {" "}
                {loadingPlan ? (
                  <LoadingComponent />
                ) : EXEC_SL_TB_PTM_M2M.DLA_T04 ? (
                  convertToFloat2Fixed(EXEC_SL_TB_PTM_M2M.DLA_T04)
                ) : (
                  ""
                )}
              </td>
              <td>
                {" "}
                {loadingPlan ? (
                  <LoadingComponent />
                ) : EXEC_SL_TB_PTM_M2M.DLA_T05 ? (
                  convertToFloat2Fixed(EXEC_SL_TB_PTM_M2M.DLA_T05)
                ) : (
                  ""
                )}
              </td>
              <td>
                {" "}
                {loadingPlan ? (
                  <LoadingComponent />
                ) : EXEC_SL_TB_PTM_M2M.DLA_T06 ? (
                  convertToFloat2Fixed(EXEC_SL_TB_PTM_M2M.DLA_T06)
                ) : (
                  ""
                )}
              </td>
              <td>
                {" "}
                {loadingPlan ? (
                  <LoadingComponent />
                ) : EXEC_SL_TB_PTM_M2M.DLA_T07 ? (
                  convertToFloat2Fixed(EXEC_SL_TB_PTM_M2M.DLA_T07)
                ) : (
                  ""
                )}
              </td>
              <td>
                {" "}
                {loadingPlan ? (
                  <LoadingComponent />
                ) : EXEC_SL_TB_PTM_M2M.DLA_T08 ? (
                  convertToFloat2Fixed(EXEC_SL_TB_PTM_M2M.DLA_T08)
                ) : (
                  ""
                )}
              </td>
              <td>
                {" "}
                {loadingPlan ? (
                  <LoadingComponent />
                ) : EXEC_SL_TB_PTM_M2M.DLA_T09 ? (
                  convertToFloat2Fixed(EXEC_SL_TB_PTM_M2M.DLA_T09)
                ) : (
                  ""
                )}
              </td>
              <td>
                {" "}
                {loadingPlan ? (
                  <LoadingComponent />
                ) : EXEC_SL_TB_PTM_M2M.DLA_T10 ? (
                  convertToFloat2Fixed(EXEC_SL_TB_PTM_M2M.DLA_T10)
                ) : (
                  ""
                )}
              </td>
              <td>
                {" "}
                {loadingPlan ? (
                  <LoadingComponent />
                ) : EXEC_SL_TB_PTM_M2M.DLA_T11 ? (
                  convertToFloat2Fixed(EXEC_SL_TB_PTM_M2M.DLA_T11)
                ) : (
                  ""
                )}
              </td>
              <td>
                {" "}
                {loadingPlan ? (
                  <LoadingComponent />
                ) : EXEC_SL_TB_PTM_M2M.DLA_T12 ? (
                  convertToFloat2Fixed(EXEC_SL_TB_PTM_M2M.DLA_T12)
                ) : (
                  ""
                )}
              </td>
              <td>
                {" "}
                {loadingPlan ? (
                  <LoadingComponent />
                ) : EXEC_SL_TB_PTM_M2M.DLA_T13 ? (
                  convertToFloat2Fixed(EXEC_SL_TB_PTM_M2M.DLA_T13)
                ) : (
                  ""
                )}
              </td>
              <td>
                {" "}
                {loadingPlan ? (
                  <LoadingComponent />
                ) : EXEC_SL_TB_PTM_M2M.DLA_D01 ? (
                  convertToFloat2Fixed(EXEC_SL_TB_PTM_M2M.DLA_D01)
                ) : (
                  ""
                )}
              </td>
              <td>
                {" "}
                {loadingPlan ? (
                  <LoadingComponent />
                ) : EXEC_SL_TB_PTM_M2M.DLA_D02 ? (
                  convertToFloat2Fixed(EXEC_SL_TB_PTM_M2M.DLA_D02)
                ) : (
                  ""
                )}
              </td>
              <td>
                {" "}
                {loadingPlan ? (
                  <LoadingComponent />
                ) : EXEC_SL_TB_PTM_M2M.DLA_D03 ? (
                  convertToFloat2Fixed(EXEC_SL_TB_PTM_M2M.DLA_D03)
                ) : (
                  ""
                )}
              </td>
              <td>
                {" "}
                {loadingPlan ? (
                  <LoadingComponent />
                ) : EXEC_SL_TB_PTM_M2M.DLA_D04 ? (
                  convertToFloat2Fixed(EXEC_SL_TB_PTM_M2M.DLA_D04)
                ) : (
                  ""
                )}
              </td>
              <td>
                {" "}
                {loadingPlan ? (
                  <LoadingComponent />
                ) : EXEC_SL_TB_PTM_M2M.DLA_D05 ? (
                  convertToFloat2Fixed(EXEC_SL_TB_PTM_M2M.DLA_D05)
                ) : (
                  ""
                )}
              </td>
              <td>
                {" "}
                {loadingPlan ? (
                  <LoadingComponent />
                ) : EXEC_SL_TB_PTM_M2M.DLA_D06 ? (
                  convertToFloat2Fixed(EXEC_SL_TB_PTM_M2M.DLA_D06)
                ) : (
                  ""
                )}
              </td>
              <td>
                {" "}
                {loadingPlan ? (
                  <LoadingComponent />
                ) : (
                  convertToFloat2Fixed(
                    convertToNumber(EXEC_SL_TB_PTM_M2M.DLA_T01) +
                      convertToNumber(EXEC_SL_TB_PTM_M2M.DLA_T02) +
                      convertToNumber(EXEC_SL_TB_PTM_M2M.DLA_T03) +
                      convertToNumber(EXEC_SL_TB_PTM_M2M.DLA_T04) +
                      convertToNumber(EXEC_SL_TB_PTM_M2M.DLA_T05) +
                      convertToNumber(EXEC_SL_TB_PTM_M2M.DLA_T06) +
                      convertToNumber(EXEC_SL_TB_PTM_M2M.DLA_T07) +
                      convertToNumber(EXEC_SL_TB_PTM_M2M.DLA_T08) +
                      convertToNumber(EXEC_SL_TB_PTM_M2M.DLA_T09) +
                      convertToNumber(EXEC_SL_TB_PTM_M2M.DLA_T10) +
                      convertToNumber(EXEC_SL_TB_PTM_M2M.DLA_T11) +
                      convertToNumber(EXEC_SL_TB_PTM_M2M.DLA_T12) +
                      convertToNumber(EXEC_SL_TB_PTM_M2M.DLA_T13) +
                      convertToNumber(EXEC_SL_TB_PTM_M2M.DLA_D01) +
                      convertToNumber(EXEC_SL_TB_PTM_M2M.DLA_D02) +
                      convertToNumber(EXEC_SL_TB_PTM_M2M.DLA_D03) +
                      convertToNumber(EXEC_SL_TB_PTM_M2M.DLA_D04) +
                      convertToNumber(EXEC_SL_TB_PTM_M2M.DLA_D05) +
                      convertToNumber(EXEC_SL_TB_PTM_M2M.DLA_D06)
                  )
                )}
              </td>
              <td>
                {" "}
                {loadingPlan ? (
                  <LoadingComponent />
                ) : EXEC_SL_TB_PTM_M2M.TTKDGPS ? (
                  convertToFloat2Fixed(EXEC_SL_TB_PTM_M2M.TTKDGPS)
                ) : (
                  ""
                )}
              </td>
            </tr>
            <tr>
              <td className="td-title-center td-kh fix-col-3">%TH</td>
              <td
                className={
                  (convertToNumber(EXEC_SL_TB_PTM_M2M.DLA_T01) * 100) /
                    convertToNumberMauso(PLAN_SL_TB_PTM_M2M.DLA_T01) >
                  processKPI
                    ? "bg-green"
                    : "bg-red"
                }
              >
                {loadingExec || loadingPlan ? (
                  <LoadingComponent />
                ) : EXEC_SL_TB_PTM_M2M.DLA_T01 && PLAN_SL_TB_PTM_M2M.DLA_T01 ? (
                  convertToFloat2Fixed(
                    (EXEC_SL_TB_PTM_M2M.DLA_T01 * 100) /
                      PLAN_SL_TB_PTM_M2M.DLA_T01
                  ) + "%"
                ) : (
                  ""
                )}
              </td>
              <td
                className={
                  (convertToNumber(EXEC_SL_TB_PTM_M2M.DLA_T02) * 100) /
                    convertToNumberMauso(PLAN_SL_TB_PTM_M2M.DLA_T02) >
                  processKPI
                    ? "bg-green"
                    : "bg-red"
                }
              >
                {loadingExec || loadingPlan ? (
                  <LoadingComponent />
                ) : EXEC_SL_TB_PTM_M2M.DLA_T02 && PLAN_SL_TB_PTM_M2M.DLA_T02 ? (
                  convertToFloat2Fixed(
                    (EXEC_SL_TB_PTM_M2M.DLA_T02 * 100) /
                      PLAN_SL_TB_PTM_M2M.DLA_T02
                  ) + "%"
                ) : (
                  ""
                )}
              </td>
              <td
                className={
                  (convertToNumber(EXEC_SL_TB_PTM_M2M.DLA_T03) * 100) /
                    convertToNumberMauso(PLAN_SL_TB_PTM_M2M.DLA_T03) >
                  processKPI
                    ? "bg-green"
                    : "bg-red"
                }
              >
                {loadingExec || loadingPlan ? (
                  <LoadingComponent />
                ) : EXEC_SL_TB_PTM_M2M.DLA_T03 && PLAN_SL_TB_PTM_M2M.DLA_T03 ? (
                  convertToFloat2Fixed(
                    (EXEC_SL_TB_PTM_M2M.DLA_T03 * 100) /
                      PLAN_SL_TB_PTM_M2M.DLA_T03
                  ) + "%"
                ) : (
                  ""
                )}
              </td>
              <td
                className={
                  (convertToNumber(EXEC_SL_TB_PTM_M2M.DLA_T04) * 100) /
                    convertToNumberMauso(PLAN_SL_TB_PTM_M2M.DLA_T04) >
                  processKPI
                    ? "bg-green"
                    : "bg-red"
                }
              >
                {loadingExec || loadingPlan ? (
                  <LoadingComponent />
                ) : EXEC_SL_TB_PTM_M2M.DLA_T04 && PLAN_SL_TB_PTM_M2M.DLA_T04 ? (
                  convertToFloat2Fixed(
                    (EXEC_SL_TB_PTM_M2M.DLA_T04 * 100) /
                      PLAN_SL_TB_PTM_M2M.DLA_T04
                  ) + "%"
                ) : (
                  ""
                )}
              </td>
              <td
                className={
                  (convertToNumber(EXEC_SL_TB_PTM_M2M.DLA_T05) * 100) /
                    convertToNumberMauso(PLAN_SL_TB_PTM_M2M.DLA_T05) >
                  processKPI
                    ? "bg-green"
                    : "bg-red"
                }
              >
                {loadingExec || loadingPlan ? (
                  <LoadingComponent />
                ) : EXEC_SL_TB_PTM_M2M.DLA_T05 && PLAN_SL_TB_PTM_M2M.DLA_T05 ? (
                  convertToFloat2Fixed(
                    (EXEC_SL_TB_PTM_M2M.DLA_T05 * 100) /
                      PLAN_SL_TB_PTM_M2M.DLA_T05
                  ) + "%"
                ) : (
                  ""
                )}
              </td>
              <td
                className={
                  (convertToNumber(EXEC_SL_TB_PTM_M2M.DLA_T06) * 100) /
                    convertToNumberMauso(PLAN_SL_TB_PTM_M2M.DLA_T06) >
                  processKPI
                    ? "bg-green"
                    : "bg-red"
                }
              >
                {loadingExec || loadingPlan ? (
                  <LoadingComponent />
                ) : EXEC_SL_TB_PTM_M2M.DLA_T06 && PLAN_SL_TB_PTM_M2M.DLA_T06 ? (
                  convertToFloat2Fixed(
                    (EXEC_SL_TB_PTM_M2M.DLA_T06 * 100) /
                      PLAN_SL_TB_PTM_M2M.DLA_T06
                  ) + "%"
                ) : (
                  ""
                )}
              </td>
              <td
                className={
                  (convertToNumber(EXEC_SL_TB_PTM_M2M.DLA_T07) * 100) /
                    convertToNumberMauso(PLAN_SL_TB_PTM_M2M.DLA_T07) >
                  processKPI
                    ? "bg-green"
                    : "bg-red"
                }
              >
                {loadingExec || loadingPlan ? (
                  <LoadingComponent />
                ) : EXEC_SL_TB_PTM_M2M.DLA_T07 && PLAN_SL_TB_PTM_M2M.DLA_T07 ? (
                  convertToFloat2Fixed(
                    (EXEC_SL_TB_PTM_M2M.DLA_T07 * 100) /
                      PLAN_SL_TB_PTM_M2M.DLA_T07
                  ) + "%"
                ) : (
                  ""
                )}
              </td>
              <td
                className={
                  (convertToNumber(EXEC_SL_TB_PTM_M2M.DLA_T08) * 100) /
                    convertToNumberMauso(PLAN_SL_TB_PTM_M2M.DLA_T08) >
                  processKPI
                    ? "bg-green"
                    : "bg-red"
                }
              >
                {loadingExec || loadingPlan ? (
                  <LoadingComponent />
                ) : EXEC_SL_TB_PTM_M2M.DLA_T08 && PLAN_SL_TB_PTM_M2M.DLA_T08 ? (
                  convertToFloat2Fixed(
                    (EXEC_SL_TB_PTM_M2M.DLA_T08 * 100) /
                      PLAN_SL_TB_PTM_M2M.DLA_T08
                  ) + "%"
                ) : (
                  ""
                )}
              </td>
              <td
                className={
                  (convertToNumber(EXEC_SL_TB_PTM_M2M.DLA_T09) * 100) /
                    convertToNumberMauso(PLAN_SL_TB_PTM_M2M.DLA_T09) >
                  processKPI
                    ? "bg-green"
                    : "bg-red"
                }
              >
                {loadingExec || loadingPlan ? (
                  <LoadingComponent />
                ) : EXEC_SL_TB_PTM_M2M.DLA_T09 && PLAN_SL_TB_PTM_M2M.DLA_T09 ? (
                  convertToFloat2Fixed(
                    (EXEC_SL_TB_PTM_M2M.DLA_T09 * 100) /
                      PLAN_SL_TB_PTM_M2M.DLA_T09
                  ) + "%"
                ) : (
                  ""
                )}
              </td>
              <td
                className={
                  (convertToNumber(EXEC_SL_TB_PTM_M2M.DLA_T10) * 100) /
                    convertToNumberMauso(PLAN_SL_TB_PTM_M2M.DLA_T10) >
                  processKPI
                    ? "bg-green"
                    : "bg-red"
                }
              >
                {loadingExec || loadingPlan ? (
                  <LoadingComponent />
                ) : EXEC_SL_TB_PTM_M2M.DLA_T10 && PLAN_SL_TB_PTM_M2M.DLA_T10 ? (
                  convertToFloat2Fixed(
                    (EXEC_SL_TB_PTM_M2M.DLA_T10 * 100) /
                      PLAN_SL_TB_PTM_M2M.DLA_T10
                  ) + "%"
                ) : (
                  ""
                )}
              </td>
              <td
                className={
                  (convertToNumber(EXEC_SL_TB_PTM_M2M.DLA_T11) * 100) /
                    convertToNumberMauso(PLAN_SL_TB_PTM_M2M.DLA_T11) >
                  processKPI
                    ? "bg-green"
                    : "bg-red"
                }
              >
                {loadingExec || loadingPlan ? (
                  <LoadingComponent />
                ) : EXEC_SL_TB_PTM_M2M.DLA_T11 && PLAN_SL_TB_PTM_M2M.DLA_T11 ? (
                  convertToFloat2Fixed(
                    (EXEC_SL_TB_PTM_M2M.DLA_T11 * 100) /
                      PLAN_SL_TB_PTM_M2M.DLA_T11
                  ) + "%"
                ) : (
                  ""
                )}
              </td>
              <td
                className={
                  (convertToNumber(EXEC_SL_TB_PTM_M2M.DLA_T12) * 100) /
                    convertToNumberMauso(PLAN_SL_TB_PTM_M2M.DLA_T12) >
                  processKPI
                    ? "bg-green"
                    : "bg-red"
                }
              >
                {loadingExec || loadingPlan ? (
                  <LoadingComponent />
                ) : EXEC_SL_TB_PTM_M2M.DLA_T12 && PLAN_SL_TB_PTM_M2M.DLA_T12 ? (
                  convertToFloat2Fixed(
                    (EXEC_SL_TB_PTM_M2M.DLA_T12 * 100) /
                      PLAN_SL_TB_PTM_M2M.DLA_T12
                  ) + "%"
                ) : (
                  ""
                )}
              </td>
              <td
                className={
                  (convertToNumber(EXEC_SL_TB_PTM_M2M.DLA_T13) * 100) /
                    convertToNumberMauso(PLAN_SL_TB_PTM_M2M.DLA_T13) >
                  processKPI
                    ? "bg-green"
                    : "bg-red"
                }
              >
                {loadingExec || loadingPlan ? (
                  <LoadingComponent />
                ) : EXEC_SL_TB_PTM_M2M.DLA_T13 && PLAN_SL_TB_PTM_M2M.DLA_T13 ? (
                  convertToFloat2Fixed(
                    (EXEC_SL_TB_PTM_M2M.DLA_T13 * 100) /
                      PLAN_SL_TB_PTM_M2M.DLA_T13
                  ) + "%"
                ) : (
                  ""
                )}
              </td>
              <td
                className={
                  (convertToNumber(EXEC_SL_TB_PTM_M2M.DLA_D01) * 100) /
                    convertToNumberMauso(PLAN_SL_TB_PTM_M2M.DLA_D01) >
                  processKPI
                    ? "bg-green"
                    : "bg-red"
                }
              >
                {loadingExec || loadingPlan ? (
                  <LoadingComponent />
                ) : EXEC_SL_TB_PTM_M2M.DLA_D01 && PLAN_SL_TB_PTM_M2M.DLA_D01 ? (
                  convertToFloat2Fixed(
                    (EXEC_SL_TB_PTM_M2M.DLA_D01 * 100) /
                      PLAN_SL_TB_PTM_M2M.DLA_D01
                  ) + "%"
                ) : (
                  ""
                )}
              </td>
              <td
                className={
                  (convertToNumber(EXEC_SL_TB_PTM_M2M.DLA_D02) * 100) /
                    convertToNumberMauso(PLAN_SL_TB_PTM_M2M.DLA_D02) >
                  processKPI
                    ? "bg-green"
                    : "bg-red"
                }
              >
                {loadingExec || loadingPlan ? (
                  <LoadingComponent />
                ) : EXEC_SL_TB_PTM_M2M.DLA_D02 && PLAN_SL_TB_PTM_M2M.DLA_D02 ? (
                  convertToFloat2Fixed(
                    (EXEC_SL_TB_PTM_M2M.DLA_D02 * 100) /
                      PLAN_SL_TB_PTM_M2M.DLA_D02
                  ) + "%"
                ) : (
                  ""
                )}
              </td>
              <td
                className={
                  (convertToNumber(EXEC_SL_TB_PTM_M2M.DLA_D03) * 100) /
                    convertToNumberMauso(PLAN_SL_TB_PTM_M2M.DLA_D03) >
                  processKPI
                    ? "bg-green"
                    : "bg-red"
                }
              >
                {loadingExec || loadingPlan ? (
                  <LoadingComponent />
                ) : EXEC_SL_TB_PTM_M2M.DLA_D03 && PLAN_SL_TB_PTM_M2M.DLA_D03 ? (
                  convertToFloat2Fixed(
                    (EXEC_SL_TB_PTM_M2M.DLA_D03 * 100) /
                      PLAN_SL_TB_PTM_M2M.DLA_D03
                  ) + "%"
                ) : (
                  ""
                )}
              </td>
              <td
                className={
                  (convertToNumber(EXEC_SL_TB_PTM_M2M.DLA_D04) * 100) /
                    convertToNumberMauso(PLAN_SL_TB_PTM_M2M.DLA_D04) >
                  processKPI
                    ? "bg-green"
                    : "bg-red"
                }
              >
                {loadingExec || loadingPlan ? (
                  <LoadingComponent />
                ) : EXEC_SL_TB_PTM_M2M.DLA_D04 && PLAN_SL_TB_PTM_M2M.DLA_D04 ? (
                  convertToFloat2Fixed(
                    (EXEC_SL_TB_PTM_M2M.DLA_D04 * 100) /
                      PLAN_SL_TB_PTM_M2M.DLA_D04
                  ) + "%"
                ) : (
                  ""
                )}
              </td>
              <td
                className={
                  (convertToNumber(EXEC_SL_TB_PTM_M2M.DLA_D05) * 100) /
                    convertToNumberMauso(PLAN_SL_TB_PTM_M2M.DLA_D05) >
                  processKPI
                    ? "bg-green"
                    : "bg-red"
                }
              >
                {loadingExec || loadingPlan ? (
                  <LoadingComponent />
                ) : EXEC_SL_TB_PTM_M2M.DLA_D05 && PLAN_SL_TB_PTM_M2M.DLA_D05 ? (
                  convertToFloat2Fixed(
                    (EXEC_SL_TB_PTM_M2M.DLA_D05 * 100) /
                      PLAN_SL_TB_PTM_M2M.DLA_D05
                  ) + "%"
                ) : (
                  ""
                )}
              </td>
              <td
                className={
                  (convertToNumber(EXEC_SL_TB_PTM_M2M.DLA_D06) * 100) /
                    convertToNumberMauso(PLAN_SL_TB_PTM_M2M.DLA_D06) >
                  processKPI
                    ? "bg-green"
                    : "bg-red"
                }
              >
                {loadingExec || loadingPlan ? (
                  <LoadingComponent />
                ) : EXEC_SL_TB_PTM_M2M.DLA_D06 && PLAN_SL_TB_PTM_M2M.DLA_D06 ? (
                  convertToFloat2Fixed(
                    (EXEC_SL_TB_PTM_M2M.DLA_D06 * 100) /
                      PLAN_SL_TB_PTM_M2M.DLA_D06
                  ) + "%"
                ) : (
                  ""
                )}
              </td>

              <td
                className={
                  convertToFloat2Fixed(
                    ((convertToNumber(EXEC_SL_TB_PTM_M2M.DLA_T01) +
                      convertToNumber(EXEC_SL_TB_PTM_M2M.DLA_T02) +
                      convertToNumber(EXEC_SL_TB_PTM_M2M.DLA_T03) +
                      convertToNumber(EXEC_SL_TB_PTM_M2M.DLA_T04) +
                      convertToNumber(EXEC_SL_TB_PTM_M2M.DLA_T05) +
                      convertToNumber(EXEC_SL_TB_PTM_M2M.DLA_T06) +
                      convertToNumber(EXEC_SL_TB_PTM_M2M.DLA_T07) +
                      convertToNumber(EXEC_SL_TB_PTM_M2M.DLA_T08) +
                      convertToNumber(EXEC_SL_TB_PTM_M2M.DLA_T09) +
                      convertToNumber(EXEC_SL_TB_PTM_M2M.DLA_T10) +
                      convertToNumber(EXEC_SL_TB_PTM_M2M.DLA_T11) +
                      convertToNumber(EXEC_SL_TB_PTM_M2M.DLA_T12) +
                      convertToNumber(EXEC_SL_TB_PTM_M2M.DLA_T13) +
                      convertToNumber(EXEC_SL_TB_PTM_M2M.DLA_D01) +
                      convertToNumber(EXEC_SL_TB_PTM_M2M.DLA_D02) +
                      convertToNumber(EXEC_SL_TB_PTM_M2M.DLA_D03) +
                      convertToNumber(EXEC_SL_TB_PTM_M2M.DLA_D04) +
                      convertToNumber(EXEC_SL_TB_PTM_M2M.DLA_D05) +
                      convertToNumber(EXEC_SL_TB_PTM_M2M.DLA_D06)) *
                      100) /
                      convertToNumberMauso(PLAN_SL_TB_PTM_M2M.TTKDVT)
                  ) > processKPI
                    ? "bg-green"
                    : "bg-red"
                }
              >
                {loadingExec || loadingPlan ? (
                  <LoadingComponent />
                ) : (
                  convertToFloat2Fixed(
                    ((convertToNumber(EXEC_SL_TB_PTM_M2M.DLA_T01) +
                      convertToNumber(EXEC_SL_TB_PTM_M2M.DLA_T02) +
                      convertToNumber(EXEC_SL_TB_PTM_M2M.DLA_T03) +
                      convertToNumber(EXEC_SL_TB_PTM_M2M.DLA_T04) +
                      convertToNumber(EXEC_SL_TB_PTM_M2M.DLA_T05) +
                      convertToNumber(EXEC_SL_TB_PTM_M2M.DLA_T06) +
                      convertToNumber(EXEC_SL_TB_PTM_M2M.DLA_T07) +
                      convertToNumber(EXEC_SL_TB_PTM_M2M.DLA_T08) +
                      convertToNumber(EXEC_SL_TB_PTM_M2M.DLA_T09) +
                      convertToNumber(EXEC_SL_TB_PTM_M2M.DLA_T10) +
                      convertToNumber(EXEC_SL_TB_PTM_M2M.DLA_T11) +
                      convertToNumber(EXEC_SL_TB_PTM_M2M.DLA_T12) +
                      convertToNumber(EXEC_SL_TB_PTM_M2M.DLA_T13) +
                      convertToNumber(EXEC_SL_TB_PTM_M2M.DLA_D01) +
                      convertToNumber(EXEC_SL_TB_PTM_M2M.DLA_D02) +
                      convertToNumber(EXEC_SL_TB_PTM_M2M.DLA_D03) +
                      convertToNumber(EXEC_SL_TB_PTM_M2M.DLA_D04) +
                      convertToNumber(EXEC_SL_TB_PTM_M2M.DLA_D05) +
                      convertToNumber(EXEC_SL_TB_PTM_M2M.DLA_D06)) *
                      100) /
                      convertToNumberMauso(PLAN_SL_TB_PTM_M2M.TTKDVT)
                  ) + "%"
                )}
              </td>
              <td
              // className={
              //   (convertToNumber(EXEC_SL_TB_PTM_M2M.TTKDGPS) * 100) /
              //     convertToNumberMauso(PLAN_SL_TB_PTM_M2M.TTKDGPS) >
              //   processKPI
              //     ? "bg-green"
              //     : "bg-red"
              // }
              >
                {loadingExec || loadingPlan ? (
                  <LoadingComponent />
                ) : EXEC_SL_TB_PTM_M2M.TTKDGPS && PLAN_SL_TB_PTM_M2M.TTKDGPS ? (
                  convertToFloat2Fixed(
                    (EXEC_SL_TB_PTM_M2M.TTKDGPS * 100) /
                      PLAN_SL_TB_PTM_M2M.TTKDGPS
                  ) + "%"
                ) : (
                  ""
                )}
              </td>
            </tr>
            <tr>
              <td
                rowSpan={3}
                className="td-title-center fw-bold td-stt fix-col-1"
              >
                6
              </td>
              <td
                rowSpan={3}
                className="td-title  fw-bold td-content fix-col-2"
              >
                {`TB PTM mạng Saymee`}
              </td>
              <td className="td-title-center fix-col-3">KH</td>
              <td>
                {" "}
                {loadingPlan ? (
                  <LoadingComponent />
                ) : PLAN_TB_PTM_SAYMEE.DLA_T01 ? (
                  convertToFloat2Fixed(PLAN_TB_PTM_SAYMEE.DLA_T01)
                ) : (
                  ""
                )}
              </td>
              <td>
                {" "}
                {loadingPlan ? (
                  <LoadingComponent />
                ) : PLAN_TB_PTM_SAYMEE.DLA_T02 ? (
                  convertToFloat2Fixed(PLAN_TB_PTM_SAYMEE.DLA_T02)
                ) : (
                  ""
                )}
              </td>
              <td>
                {" "}
                {loadingPlan ? (
                  <LoadingComponent />
                ) : PLAN_TB_PTM_SAYMEE.DLA_T03 ? (
                  convertToFloat2Fixed(PLAN_TB_PTM_SAYMEE.DLA_T03)
                ) : (
                  ""
                )}
              </td>
              <td>
                {" "}
                {loadingPlan ? (
                  <LoadingComponent />
                ) : PLAN_TB_PTM_SAYMEE.DLA_T04 ? (
                  convertToFloat2Fixed(PLAN_TB_PTM_SAYMEE.DLA_T04)
                ) : (
                  ""
                )}
              </td>
              <td>
                {" "}
                {loadingPlan ? (
                  <LoadingComponent />
                ) : PLAN_TB_PTM_SAYMEE.DLA_T05 ? (
                  convertToFloat2Fixed(PLAN_TB_PTM_SAYMEE.DLA_T05)
                ) : (
                  ""
                )}
              </td>
              <td>
                {" "}
                {loadingPlan ? (
                  <LoadingComponent />
                ) : PLAN_TB_PTM_SAYMEE.DLA_T06 ? (
                  convertToFloat2Fixed(PLAN_TB_PTM_SAYMEE.DLA_T06)
                ) : (
                  ""
                )}
              </td>
              <td>
                {" "}
                {loadingPlan ? (
                  <LoadingComponent />
                ) : PLAN_TB_PTM_SAYMEE.DLA_T07 ? (
                  convertToFloat2Fixed(PLAN_TB_PTM_SAYMEE.DLA_T07)
                ) : (
                  ""
                )}
              </td>
              <td>
                {" "}
                {loadingPlan ? (
                  <LoadingComponent />
                ) : PLAN_TB_PTM_SAYMEE.DLA_T08 ? (
                  convertToFloat2Fixed(PLAN_TB_PTM_SAYMEE.DLA_T08)
                ) : (
                  ""
                )}
              </td>
              <td>
                {" "}
                {loadingPlan ? (
                  <LoadingComponent />
                ) : PLAN_TB_PTM_SAYMEE.DLA_T09 ? (
                  convertToFloat2Fixed(PLAN_TB_PTM_SAYMEE.DLA_T09)
                ) : (
                  ""
                )}
              </td>
              <td>
                {" "}
                {loadingPlan ? (
                  <LoadingComponent />
                ) : PLAN_TB_PTM_SAYMEE.DLA_T10 ? (
                  convertToFloat2Fixed(PLAN_TB_PTM_SAYMEE.DLA_T10)
                ) : (
                  ""
                )}
              </td>
              <td>
                {" "}
                {loadingPlan ? (
                  <LoadingComponent />
                ) : PLAN_TB_PTM_SAYMEE.DLA_T11 ? (
                  convertToFloat2Fixed(PLAN_TB_PTM_SAYMEE.DLA_T11)
                ) : (
                  ""
                )}
              </td>
              <td>
                {" "}
                {loadingPlan ? (
                  <LoadingComponent />
                ) : PLAN_TB_PTM_SAYMEE.DLA_T12 ? (
                  convertToFloat2Fixed(PLAN_TB_PTM_SAYMEE.DLA_T12)
                ) : (
                  ""
                )}
              </td>
              <td>
                {" "}
                {loadingPlan ? (
                  <LoadingComponent />
                ) : PLAN_TB_PTM_SAYMEE.DLA_T13 ? (
                  convertToFloat2Fixed(PLAN_TB_PTM_SAYMEE.DLA_T13)
                ) : (
                  ""
                )}
              </td>
              <td>
                {" "}
                {loadingPlan ? (
                  <LoadingComponent />
                ) : PLAN_TB_PTM_SAYMEE.DLA_D01 ? (
                  convertToFloat2Fixed(PLAN_TB_PTM_SAYMEE.DLA_D01)
                ) : (
                  ""
                )}
              </td>
              <td>
                {" "}
                {loadingPlan ? (
                  <LoadingComponent />
                ) : PLAN_TB_PTM_SAYMEE.DLA_D02 ? (
                  convertToFloat2Fixed(PLAN_TB_PTM_SAYMEE.DLA_D02)
                ) : (
                  ""
                )}
              </td>
              <td>
                {" "}
                {loadingPlan ? (
                  <LoadingComponent />
                ) : PLAN_TB_PTM_SAYMEE.DLA_D03 ? (
                  convertToFloat2Fixed(PLAN_TB_PTM_SAYMEE.DLA_D03)
                ) : (
                  ""
                )}
              </td>
              <td>
                {" "}
                {loadingPlan ? (
                  <LoadingComponent />
                ) : PLAN_TB_PTM_SAYMEE.DLA_D04 ? (
                  convertToFloat2Fixed(PLAN_TB_PTM_SAYMEE.DLA_D04)
                ) : (
                  ""
                )}
              </td>
              <td>
                {" "}
                {loadingPlan ? (
                  <LoadingComponent />
                ) : PLAN_TB_PTM_SAYMEE.DLA_D05 ? (
                  convertToFloat2Fixed(PLAN_TB_PTM_SAYMEE.DLA_D05)
                ) : (
                  ""
                )}
              </td>
              <td>
                {" "}
                {loadingPlan ? (
                  <LoadingComponent />
                ) : PLAN_TB_PTM_SAYMEE.DLA_D06 ? (
                  convertToFloat2Fixed(PLAN_TB_PTM_SAYMEE.DLA_D06)
                ) : (
                  ""
                )}
              </td>
              <td>
                {" "}
                {loadingPlan ? (
                  <LoadingComponent />
                ) : PLAN_TB_PTM_SAYMEE.TTKDVT ? (
                  convertToFloat2Fixed(PLAN_TB_PTM_SAYMEE.TTKDVT)
                ) : (
                  ""
                )}
              </td>
              <td>
                {" "}
                {loadingPlan ? (
                  <LoadingComponent />
                ) : PLAN_TB_PTM_SAYMEE.TTKDGPS ? (
                  convertToFloat2Fixed(PLAN_TB_PTM_SAYMEE.TTKDGPS)
                ) : (
                  ""
                )}
              </td>
              <td rowSpan={3}>
                {EXEC_TB_PTM_SAYMEE.LAST_DATE
                  ? getFormattedDate(new Date(EXEC_TB_PTM_SAYMEE.LAST_DATE))
                  : ""}
              </td>
            </tr>
            <tr>
              <td className="td-title-center td-kh fix-col-3">TH</td>
              <td>
                {" "}
                {loadingPlan ? (
                  <LoadingComponent />
                ) : EXEC_TB_PTM_SAYMEE.DLA_T01 ? (
                  convertToFloat2Fixed(EXEC_TB_PTM_SAYMEE.DLA_T01)
                ) : (
                  ""
                )}
              </td>
              <td>
                {" "}
                {loadingPlan ? (
                  <LoadingComponent />
                ) : EXEC_TB_PTM_SAYMEE.DLA_T02 ? (
                  convertToFloat2Fixed(EXEC_TB_PTM_SAYMEE.DLA_T02)
                ) : (
                  ""
                )}
              </td>
              <td>
                {" "}
                {loadingPlan ? (
                  <LoadingComponent />
                ) : EXEC_TB_PTM_SAYMEE.DLA_T03 ? (
                  convertToFloat2Fixed(EXEC_TB_PTM_SAYMEE.DLA_T03)
                ) : (
                  ""
                )}
              </td>
              <td>
                {" "}
                {loadingPlan ? (
                  <LoadingComponent />
                ) : EXEC_TB_PTM_SAYMEE.DLA_T04 ? (
                  convertToFloat2Fixed(EXEC_TB_PTM_SAYMEE.DLA_T04)
                ) : (
                  ""
                )}
              </td>
              <td>
                {" "}
                {loadingPlan ? (
                  <LoadingComponent />
                ) : EXEC_TB_PTM_SAYMEE.DLA_T05 ? (
                  convertToFloat2Fixed(EXEC_TB_PTM_SAYMEE.DLA_T05)
                ) : (
                  ""
                )}
              </td>
              <td>
                {" "}
                {loadingPlan ? (
                  <LoadingComponent />
                ) : EXEC_TB_PTM_SAYMEE.DLA_T06 ? (
                  convertToFloat2Fixed(EXEC_TB_PTM_SAYMEE.DLA_T06)
                ) : (
                  ""
                )}
              </td>
              <td>
                {" "}
                {loadingPlan ? (
                  <LoadingComponent />
                ) : EXEC_TB_PTM_SAYMEE.DLA_T07 ? (
                  convertToFloat2Fixed(EXEC_TB_PTM_SAYMEE.DLA_T07)
                ) : (
                  ""
                )}
              </td>
              <td>
                {" "}
                {loadingPlan ? (
                  <LoadingComponent />
                ) : EXEC_TB_PTM_SAYMEE.DLA_T08 ? (
                  convertToFloat2Fixed(EXEC_TB_PTM_SAYMEE.DLA_T08)
                ) : (
                  ""
                )}
              </td>
              <td>
                {" "}
                {loadingPlan ? (
                  <LoadingComponent />
                ) : EXEC_TB_PTM_SAYMEE.DLA_T09 ? (
                  convertToFloat2Fixed(EXEC_TB_PTM_SAYMEE.DLA_T09)
                ) : (
                  ""
                )}
              </td>
              <td>
                {" "}
                {loadingPlan ? (
                  <LoadingComponent />
                ) : EXEC_TB_PTM_SAYMEE.DLA_T10 ? (
                  convertToFloat2Fixed(EXEC_TB_PTM_SAYMEE.DLA_T10)
                ) : (
                  ""
                )}
              </td>
              <td>
                {" "}
                {loadingPlan ? (
                  <LoadingComponent />
                ) : EXEC_TB_PTM_SAYMEE.DLA_T11 ? (
                  convertToFloat2Fixed(EXEC_TB_PTM_SAYMEE.DLA_T11)
                ) : (
                  ""
                )}
              </td>
              <td>
                {" "}
                {loadingPlan ? (
                  <LoadingComponent />
                ) : EXEC_TB_PTM_SAYMEE.DLA_T12 ? (
                  convertToFloat2Fixed(EXEC_TB_PTM_SAYMEE.DLA_T12)
                ) : (
                  ""
                )}
              </td>
              <td>
                {" "}
                {loadingPlan ? (
                  <LoadingComponent />
                ) : EXEC_TB_PTM_SAYMEE.DLA_T13 ? (
                  convertToFloat2Fixed(EXEC_TB_PTM_SAYMEE.DLA_T13)
                ) : (
                  ""
                )}
              </td>
              <td>
                {" "}
                {loadingPlan ? (
                  <LoadingComponent />
                ) : EXEC_TB_PTM_SAYMEE.DLA_D01 ? (
                  convertToFloat2Fixed(EXEC_TB_PTM_SAYMEE.DLA_D01)
                ) : (
                  ""
                )}
              </td>
              <td>
                {" "}
                {loadingPlan ? (
                  <LoadingComponent />
                ) : EXEC_TB_PTM_SAYMEE.DLA_D02 ? (
                  convertToFloat2Fixed(EXEC_TB_PTM_SAYMEE.DLA_D02)
                ) : (
                  ""
                )}
              </td>
              <td>
                {" "}
                {loadingPlan ? (
                  <LoadingComponent />
                ) : EXEC_TB_PTM_SAYMEE.DLA_D03 ? (
                  convertToFloat2Fixed(EXEC_TB_PTM_SAYMEE.DLA_D03)
                ) : (
                  ""
                )}
              </td>
              <td>
                {" "}
                {loadingPlan ? (
                  <LoadingComponent />
                ) : EXEC_TB_PTM_SAYMEE.DLA_D04 ? (
                  convertToFloat2Fixed(EXEC_TB_PTM_SAYMEE.DLA_D04)
                ) : (
                  ""
                )}
              </td>
              <td>
                {" "}
                {loadingPlan ? (
                  <LoadingComponent />
                ) : EXEC_TB_PTM_SAYMEE.DLA_D05 ? (
                  convertToFloat2Fixed(EXEC_TB_PTM_SAYMEE.DLA_D05)
                ) : (
                  ""
                )}
              </td>
              <td>
                {" "}
                {loadingPlan ? (
                  <LoadingComponent />
                ) : EXEC_TB_PTM_SAYMEE.DLA_D06 ? (
                  convertToFloat2Fixed(EXEC_TB_PTM_SAYMEE.DLA_D06)
                ) : (
                  ""
                )}
              </td>
              <td>
                {" "}
                {loadingPlan ? (
                  <LoadingComponent />
                ) : (
                  convertToFloat2Fixed(
                    convertToNumber(EXEC_TB_PTM_SAYMEE.DLA_T01) +
                      convertToNumber(EXEC_TB_PTM_SAYMEE.DLA_T02) +
                      convertToNumber(EXEC_TB_PTM_SAYMEE.DLA_T03) +
                      convertToNumber(EXEC_TB_PTM_SAYMEE.DLA_T04) +
                      convertToNumber(EXEC_TB_PTM_SAYMEE.DLA_T05) +
                      convertToNumber(EXEC_TB_PTM_SAYMEE.DLA_T06) +
                      convertToNumber(EXEC_TB_PTM_SAYMEE.DLA_T07) +
                      convertToNumber(EXEC_TB_PTM_SAYMEE.DLA_T08) +
                      convertToNumber(EXEC_TB_PTM_SAYMEE.DLA_T09) +
                      convertToNumber(EXEC_TB_PTM_SAYMEE.DLA_T10) +
                      convertToNumber(EXEC_TB_PTM_SAYMEE.DLA_T11) +
                      convertToNumber(EXEC_TB_PTM_SAYMEE.DLA_T12) +
                      convertToNumber(EXEC_TB_PTM_SAYMEE.DLA_T13) +
                      convertToNumber(EXEC_TB_PTM_SAYMEE.DLA_D01) +
                      convertToNumber(EXEC_TB_PTM_SAYMEE.DLA_D02) +
                      convertToNumber(EXEC_TB_PTM_SAYMEE.DLA_D03) +
                      convertToNumber(EXEC_TB_PTM_SAYMEE.DLA_D04) +
                      convertToNumber(EXEC_TB_PTM_SAYMEE.DLA_D05) +
                      convertToNumber(EXEC_TB_PTM_SAYMEE.DLA_D06)
                  )
                )}
              </td>
              <td>
                {" "}
                {loadingPlan ? (
                  <LoadingComponent />
                ) : EXEC_TB_PTM_SAYMEE.TTKDGPS ? (
                  convertToFloat2Fixed(EXEC_TB_PTM_SAYMEE.TTKDGPS)
                ) : (
                  ""
                )}
              </td>
            </tr>
            <tr>
              <td className="td-title-center td-kh fix-col-3">%TH</td>
              <td
                className={
                  (convertToNumber(EXEC_TB_PTM_SAYMEE.DLA_T01) * 100) /
                    convertToNumberMauso(PLAN_TB_PTM_SAYMEE.DLA_T01) >
                  processKPI
                    ? "bg-green"
                    : "bg-red"
                }
              >
                {loadingExec || loadingPlan ? (
                  <LoadingComponent />
                ) : EXEC_TB_PTM_SAYMEE.DLA_T01 && PLAN_TB_PTM_SAYMEE.DLA_T01 ? (
                  convertToFloat2Fixed(
                    (EXEC_TB_PTM_SAYMEE.DLA_T01 * 100) /
                      PLAN_TB_PTM_SAYMEE.DLA_T01
                  ) + "%"
                ) : (
                  ""
                )}
              </td>
              <td
                className={
                  (convertToNumber(EXEC_TB_PTM_SAYMEE.DLA_T02) * 100) /
                    convertToNumberMauso(PLAN_TB_PTM_SAYMEE.DLA_T02) >
                  processKPI
                    ? "bg-green"
                    : "bg-red"
                }
              >
                {loadingExec || loadingPlan ? (
                  <LoadingComponent />
                ) : EXEC_TB_PTM_SAYMEE.DLA_T02 && PLAN_TB_PTM_SAYMEE.DLA_T02 ? (
                  convertToFloat2Fixed(
                    (EXEC_TB_PTM_SAYMEE.DLA_T02 * 100) /
                      PLAN_TB_PTM_SAYMEE.DLA_T02
                  ) + "%"
                ) : (
                  ""
                )}
              </td>
              <td
                className={
                  (convertToNumber(EXEC_TB_PTM_SAYMEE.DLA_T03) * 100) /
                    convertToNumberMauso(PLAN_TB_PTM_SAYMEE.DLA_T03) >
                  processKPI
                    ? "bg-green"
                    : "bg-red"
                }
              >
                {loadingExec || loadingPlan ? (
                  <LoadingComponent />
                ) : EXEC_TB_PTM_SAYMEE.DLA_T03 && PLAN_TB_PTM_SAYMEE.DLA_T03 ? (
                  convertToFloat2Fixed(
                    (EXEC_TB_PTM_SAYMEE.DLA_T03 * 100) /
                      PLAN_TB_PTM_SAYMEE.DLA_T03
                  ) + "%"
                ) : (
                  ""
                )}
              </td>
              <td
                className={
                  (convertToNumber(EXEC_TB_PTM_SAYMEE.DLA_T04) * 100) /
                    convertToNumberMauso(PLAN_TB_PTM_SAYMEE.DLA_T04) >
                  processKPI
                    ? "bg-green"
                    : "bg-red"
                }
              >
                {loadingExec || loadingPlan ? (
                  <LoadingComponent />
                ) : EXEC_TB_PTM_SAYMEE.DLA_T04 && PLAN_TB_PTM_SAYMEE.DLA_T04 ? (
                  convertToFloat2Fixed(
                    (EXEC_TB_PTM_SAYMEE.DLA_T04 * 100) /
                      PLAN_TB_PTM_SAYMEE.DLA_T04
                  ) + "%"
                ) : (
                  ""
                )}
              </td>
              <td
                className={
                  (convertToNumber(EXEC_TB_PTM_SAYMEE.DLA_T05) * 100) /
                    convertToNumberMauso(PLAN_TB_PTM_SAYMEE.DLA_T05) >
                  processKPI
                    ? "bg-green"
                    : "bg-red"
                }
              >
                {loadingExec || loadingPlan ? (
                  <LoadingComponent />
                ) : EXEC_TB_PTM_SAYMEE.DLA_T05 && PLAN_TB_PTM_SAYMEE.DLA_T05 ? (
                  convertToFloat2Fixed(
                    (EXEC_TB_PTM_SAYMEE.DLA_T05 * 100) /
                      PLAN_TB_PTM_SAYMEE.DLA_T05
                  ) + "%"
                ) : (
                  ""
                )}
              </td>
              <td
                className={
                  (convertToNumber(EXEC_TB_PTM_SAYMEE.DLA_T06) * 100) /
                    convertToNumberMauso(PLAN_TB_PTM_SAYMEE.DLA_T06) >
                  processKPI
                    ? "bg-green"
                    : "bg-red"
                }
              >
                {loadingExec || loadingPlan ? (
                  <LoadingComponent />
                ) : EXEC_TB_PTM_SAYMEE.DLA_T06 && PLAN_TB_PTM_SAYMEE.DLA_T06 ? (
                  convertToFloat2Fixed(
                    (EXEC_TB_PTM_SAYMEE.DLA_T06 * 100) /
                      PLAN_TB_PTM_SAYMEE.DLA_T06
                  ) + "%"
                ) : (
                  ""
                )}
              </td>
              <td
                className={
                  (convertToNumber(EXEC_TB_PTM_SAYMEE.DLA_T07) * 100) /
                    convertToNumberMauso(PLAN_TB_PTM_SAYMEE.DLA_T07) >
                  processKPI
                    ? "bg-green"
                    : "bg-red"
                }
              >
                {loadingExec || loadingPlan ? (
                  <LoadingComponent />
                ) : EXEC_TB_PTM_SAYMEE.DLA_T07 && PLAN_TB_PTM_SAYMEE.DLA_T07 ? (
                  convertToFloat2Fixed(
                    (EXEC_TB_PTM_SAYMEE.DLA_T07 * 100) /
                      PLAN_TB_PTM_SAYMEE.DLA_T07
                  ) + "%"
                ) : (
                  ""
                )}
              </td>
              <td
                className={
                  (convertToNumber(EXEC_TB_PTM_SAYMEE.DLA_T08) * 100) /
                    convertToNumberMauso(PLAN_TB_PTM_SAYMEE.DLA_T08) >
                  processKPI
                    ? "bg-green"
                    : "bg-red"
                }
              >
                {loadingExec || loadingPlan ? (
                  <LoadingComponent />
                ) : EXEC_TB_PTM_SAYMEE.DLA_T08 && PLAN_TB_PTM_SAYMEE.DLA_T08 ? (
                  convertToFloat2Fixed(
                    (EXEC_TB_PTM_SAYMEE.DLA_T08 * 100) /
                      PLAN_TB_PTM_SAYMEE.DLA_T08
                  ) + "%"
                ) : (
                  ""
                )}
              </td>
              <td
                className={
                  (convertToNumber(EXEC_TB_PTM_SAYMEE.DLA_T09) * 100) /
                    convertToNumberMauso(PLAN_TB_PTM_SAYMEE.DLA_T09) >
                  processKPI
                    ? "bg-green"
                    : "bg-red"
                }
              >
                {loadingExec || loadingPlan ? (
                  <LoadingComponent />
                ) : EXEC_TB_PTM_SAYMEE.DLA_T09 && PLAN_TB_PTM_SAYMEE.DLA_T09 ? (
                  convertToFloat2Fixed(
                    (EXEC_TB_PTM_SAYMEE.DLA_T09 * 100) /
                      PLAN_TB_PTM_SAYMEE.DLA_T09
                  ) + "%"
                ) : (
                  ""
                )}
              </td>
              <td
                className={
                  (convertToNumber(EXEC_TB_PTM_SAYMEE.DLA_T10) * 100) /
                    convertToNumberMauso(PLAN_TB_PTM_SAYMEE.DLA_T10) >
                  processKPI
                    ? "bg-green"
                    : "bg-red"
                }
              >
                {loadingExec || loadingPlan ? (
                  <LoadingComponent />
                ) : EXEC_TB_PTM_SAYMEE.DLA_T10 && PLAN_TB_PTM_SAYMEE.DLA_T10 ? (
                  convertToFloat2Fixed(
                    (EXEC_TB_PTM_SAYMEE.DLA_T10 * 100) /
                      PLAN_TB_PTM_SAYMEE.DLA_T10
                  ) + "%"
                ) : (
                  ""
                )}
              </td>
              <td
                className={
                  (convertToNumber(EXEC_TB_PTM_SAYMEE.DLA_T11) * 100) /
                    convertToNumberMauso(PLAN_TB_PTM_SAYMEE.DLA_T11) >
                  processKPI
                    ? "bg-green"
                    : "bg-red"
                }
              >
                {loadingExec || loadingPlan ? (
                  <LoadingComponent />
                ) : EXEC_TB_PTM_SAYMEE.DLA_T11 && PLAN_TB_PTM_SAYMEE.DLA_T11 ? (
                  convertToFloat2Fixed(
                    (EXEC_TB_PTM_SAYMEE.DLA_T11 * 100) /
                      PLAN_TB_PTM_SAYMEE.DLA_T11
                  ) + "%"
                ) : (
                  ""
                )}
              </td>
              <td
                className={
                  (convertToNumber(EXEC_TB_PTM_SAYMEE.DLA_T12) * 100) /
                    convertToNumberMauso(PLAN_TB_PTM_SAYMEE.DLA_T12) >
                  processKPI
                    ? "bg-green"
                    : "bg-red"
                }
              >
                {loadingExec || loadingPlan ? (
                  <LoadingComponent />
                ) : EXEC_TB_PTM_SAYMEE.DLA_T12 && PLAN_TB_PTM_SAYMEE.DLA_T12 ? (
                  convertToFloat2Fixed(
                    (EXEC_TB_PTM_SAYMEE.DLA_T12 * 100) /
                      PLAN_TB_PTM_SAYMEE.DLA_T12
                  ) + "%"
                ) : (
                  ""
                )}
              </td>
              <td
                className={
                  (convertToNumber(EXEC_TB_PTM_SAYMEE.DLA_T13) * 100) /
                    convertToNumberMauso(PLAN_TB_PTM_SAYMEE.DLA_T13) >
                  processKPI
                    ? "bg-green"
                    : "bg-red"
                }
              >
                {loadingExec || loadingPlan ? (
                  <LoadingComponent />
                ) : EXEC_TB_PTM_SAYMEE.DLA_T13 && PLAN_TB_PTM_SAYMEE.DLA_T13 ? (
                  convertToFloat2Fixed(
                    (EXEC_TB_PTM_SAYMEE.DLA_T13 * 100) /
                      PLAN_TB_PTM_SAYMEE.DLA_T13
                  ) + "%"
                ) : (
                  ""
                )}
              </td>
              <td
                className={
                  (convertToNumber(EXEC_TB_PTM_SAYMEE.DLA_D01) * 100) /
                    convertToNumberMauso(PLAN_TB_PTM_SAYMEE.DLA_D01) >
                  processKPI
                    ? "bg-green"
                    : "bg-red"
                }
              >
                {loadingExec || loadingPlan ? (
                  <LoadingComponent />
                ) : EXEC_TB_PTM_SAYMEE.DLA_D01 && PLAN_TB_PTM_SAYMEE.DLA_D01 ? (
                  convertToFloat2Fixed(
                    (EXEC_TB_PTM_SAYMEE.DLA_D01 * 100) /
                      PLAN_TB_PTM_SAYMEE.DLA_D01
                  ) + "%"
                ) : (
                  ""
                )}
              </td>
              <td
                className={
                  (convertToNumber(EXEC_TB_PTM_SAYMEE.DLA_D02) * 100) /
                    convertToNumberMauso(PLAN_TB_PTM_SAYMEE.DLA_D02) >
                  processKPI
                    ? "bg-green"
                    : "bg-red"
                }
              >
                {loadingExec || loadingPlan ? (
                  <LoadingComponent />
                ) : EXEC_TB_PTM_SAYMEE.DLA_D02 && PLAN_TB_PTM_SAYMEE.DLA_D02 ? (
                  convertToFloat2Fixed(
                    (EXEC_TB_PTM_SAYMEE.DLA_D02 * 100) /
                      PLAN_TB_PTM_SAYMEE.DLA_D02
                  ) + "%"
                ) : (
                  ""
                )}
              </td>
              <td
                className={
                  (convertToNumber(EXEC_TB_PTM_SAYMEE.DLA_D03) * 100) /
                    convertToNumberMauso(PLAN_TB_PTM_SAYMEE.DLA_D03) >
                  processKPI
                    ? "bg-green"
                    : "bg-red"
                }
              >
                {loadingExec || loadingPlan ? (
                  <LoadingComponent />
                ) : EXEC_TB_PTM_SAYMEE.DLA_D03 && PLAN_TB_PTM_SAYMEE.DLA_D03 ? (
                  convertToFloat2Fixed(
                    (EXEC_TB_PTM_SAYMEE.DLA_D03 * 100) /
                      PLAN_TB_PTM_SAYMEE.DLA_D03
                  ) + "%"
                ) : (
                  ""
                )}
              </td>
              <td
                className={
                  (convertToNumber(EXEC_TB_PTM_SAYMEE.DLA_D04) * 100) /
                    convertToNumberMauso(PLAN_TB_PTM_SAYMEE.DLA_D04) >
                  processKPI
                    ? "bg-green"
                    : "bg-red"
                }
              >
                {loadingExec || loadingPlan ? (
                  <LoadingComponent />
                ) : EXEC_TB_PTM_SAYMEE.DLA_D04 && PLAN_TB_PTM_SAYMEE.DLA_D04 ? (
                  convertToFloat2Fixed(
                    (EXEC_TB_PTM_SAYMEE.DLA_D04 * 100) /
                      PLAN_TB_PTM_SAYMEE.DLA_D04
                  ) + "%"
                ) : (
                  ""
                )}
              </td>
              <td
                className={
                  (convertToNumber(EXEC_TB_PTM_SAYMEE.DLA_D05) * 100) /
                    convertToNumberMauso(PLAN_TB_PTM_SAYMEE.DLA_D05) >
                  processKPI
                    ? "bg-green"
                    : "bg-red"
                }
              >
                {loadingExec || loadingPlan ? (
                  <LoadingComponent />
                ) : EXEC_TB_PTM_SAYMEE.DLA_D05 && PLAN_TB_PTM_SAYMEE.DLA_D05 ? (
                  convertToFloat2Fixed(
                    (EXEC_TB_PTM_SAYMEE.DLA_D05 * 100) /
                      PLAN_TB_PTM_SAYMEE.DLA_D05
                  ) + "%"
                ) : (
                  ""
                )}
              </td>
              <td
                className={
                  (convertToNumber(EXEC_TB_PTM_SAYMEE.DLA_D06) * 100) /
                    convertToNumberMauso(PLAN_TB_PTM_SAYMEE.DLA_D06) >
                  processKPI
                    ? "bg-green"
                    : "bg-red"
                }
              >
                {loadingExec || loadingPlan ? (
                  <LoadingComponent />
                ) : EXEC_TB_PTM_SAYMEE.DLA_D06 && PLAN_TB_PTM_SAYMEE.DLA_D06 ? (
                  convertToFloat2Fixed(
                    (EXEC_TB_PTM_SAYMEE.DLA_D06 * 100) /
                      PLAN_TB_PTM_SAYMEE.DLA_D06
                  ) + "%"
                ) : (
                  ""
                )}
              </td>
              <td
                className={
                  convertToFloat2Fixed(
                    ((convertToNumber(EXEC_TB_PTM_SAYMEE.DLA_T01) +
                      convertToNumber(EXEC_TB_PTM_SAYMEE.DLA_T02) +
                      convertToNumber(EXEC_TB_PTM_SAYMEE.DLA_T03) +
                      convertToNumber(EXEC_TB_PTM_SAYMEE.DLA_T04) +
                      convertToNumber(EXEC_TB_PTM_SAYMEE.DLA_T05) +
                      convertToNumber(EXEC_TB_PTM_SAYMEE.DLA_T06) +
                      convertToNumber(EXEC_TB_PTM_SAYMEE.DLA_T07) +
                      convertToNumber(EXEC_TB_PTM_SAYMEE.DLA_T08) +
                      convertToNumber(EXEC_TB_PTM_SAYMEE.DLA_T09) +
                      convertToNumber(EXEC_TB_PTM_SAYMEE.DLA_T10) +
                      convertToNumber(EXEC_TB_PTM_SAYMEE.DLA_T11) +
                      convertToNumber(EXEC_TB_PTM_SAYMEE.DLA_T12) +
                      convertToNumber(EXEC_TB_PTM_SAYMEE.DLA_T13) +
                      convertToNumber(EXEC_TB_PTM_SAYMEE.DLA_D01) +
                      convertToNumber(EXEC_TB_PTM_SAYMEE.DLA_D02) +
                      convertToNumber(EXEC_TB_PTM_SAYMEE.DLA_D03) +
                      convertToNumber(EXEC_TB_PTM_SAYMEE.DLA_D04) +
                      convertToNumber(EXEC_TB_PTM_SAYMEE.DLA_D05) +
                      convertToNumber(EXEC_TB_PTM_SAYMEE.DLA_D06)) *
                      100) /
                      convertToNumberMauso(PLAN_TB_PTM_SAYMEE.TTKDVT)
                  ) > processKPI
                    ? "bg-green"
                    : "bg-red"
                }
              >
                {loadingExec || loadingPlan ? (
                  <LoadingComponent />
                ) : (
                  convertToFloat2Fixed(
                    ((convertToNumber(EXEC_TB_PTM_SAYMEE.DLA_T01) +
                      convertToNumber(EXEC_TB_PTM_SAYMEE.DLA_T02) +
                      convertToNumber(EXEC_TB_PTM_SAYMEE.DLA_T03) +
                      convertToNumber(EXEC_TB_PTM_SAYMEE.DLA_T04) +
                      convertToNumber(EXEC_TB_PTM_SAYMEE.DLA_T05) +
                      convertToNumber(EXEC_TB_PTM_SAYMEE.DLA_T06) +
                      convertToNumber(EXEC_TB_PTM_SAYMEE.DLA_T07) +
                      convertToNumber(EXEC_TB_PTM_SAYMEE.DLA_T08) +
                      convertToNumber(EXEC_TB_PTM_SAYMEE.DLA_T09) +
                      convertToNumber(EXEC_TB_PTM_SAYMEE.DLA_T10) +
                      convertToNumber(EXEC_TB_PTM_SAYMEE.DLA_T11) +
                      convertToNumber(EXEC_TB_PTM_SAYMEE.DLA_T12) +
                      convertToNumber(EXEC_TB_PTM_SAYMEE.DLA_T13) +
                      convertToNumber(EXEC_TB_PTM_SAYMEE.DLA_D01) +
                      convertToNumber(EXEC_TB_PTM_SAYMEE.DLA_D02) +
                      convertToNumber(EXEC_SL_TB_PTM_M2M.DLA_D03) +
                      convertToNumber(EXEC_TB_PTM_SAYMEE.DLA_D04) +
                      convertToNumber(EXEC_TB_PTM_SAYMEE.DLA_D05) +
                      convertToNumber(EXEC_TB_PTM_SAYMEE.DLA_D06)) *
                      100) /
                      convertToNumberMauso(PLAN_TB_PTM_SAYMEE.TTKDVT)
                  ) + "%"
                )}
              </td>
              <td
              // className={
              //   (convertToNumber(EXEC_TB_PTM_SAYMEE.TTKDGPS) * 100) /
              //     convertToNumberMauso(PLAN_TB_PTM_SAYMEE.TTKDGPS) >
              //   processKPI
              //     ? "bg-green"
              //     : "bg-red"
              // }
              >
                {loadingExec || loadingPlan ? (
                  <LoadingComponent />
                ) : EXEC_TB_PTM_SAYMEE.TTKDGPS && PLAN_TB_PTM_SAYMEE.TTKDGPS ? (
                  convertToFloat2Fixed(
                    (EXEC_TB_PTM_SAYMEE.TTKDGPS * 100) /
                      PLAN_TB_PTM_SAYMEE.TTKDGPS
                  ) + "%"
                ) : (
                  ""
                )}
              </td>
            </tr>
            <tr>
              <td
                rowSpan={3}
                className="td-title-center fw-bold td-stt fix-col-1"
              >
                7
              </td>
              <td
                rowSpan={3}
                className="td-title  fw-bold td-content fix-col-2"
              >
                {`TB PTM MobiFiber`}
              </td>
              <td className="td-title-center td-kh fix-col-3">KH</td>
              <td>
                {" "}
                {loadingPlan ? (
                  <LoadingComponent />
                ) : PLAN_TB_PTM_FIBER.DLA_T01 ? (
                  convertToFloat2Fixed(PLAN_TB_PTM_FIBER.DLA_T01)
                ) : (
                  ""
                )}
              </td>
              <td>
                {" "}
                {loadingPlan ? (
                  <LoadingComponent />
                ) : PLAN_TB_PTM_FIBER.DLA_T02 ? (
                  convertToFloat2Fixed(PLAN_TB_PTM_FIBER.DLA_T02)
                ) : (
                  ""
                )}
              </td>
              <td>
                {" "}
                {loadingPlan ? (
                  <LoadingComponent />
                ) : PLAN_TB_PTM_FIBER.DLA_T03 ? (
                  convertToFloat2Fixed(PLAN_TB_PTM_FIBER.DLA_T03)
                ) : (
                  ""
                )}
              </td>
              <td>
                {" "}
                {loadingPlan ? (
                  <LoadingComponent />
                ) : PLAN_TB_PTM_FIBER.DLA_T04 ? (
                  convertToFloat2Fixed(PLAN_TB_PTM_FIBER.DLA_T04)
                ) : (
                  ""
                )}
              </td>
              <td>
                {" "}
                {loadingPlan ? (
                  <LoadingComponent />
                ) : PLAN_TB_PTM_FIBER.DLA_T05 ? (
                  convertToFloat2Fixed(PLAN_TB_PTM_FIBER.DLA_T05)
                ) : (
                  ""
                )}
              </td>
              <td>
                {" "}
                {loadingPlan ? (
                  <LoadingComponent />
                ) : PLAN_TB_PTM_FIBER.DLA_T06 ? (
                  convertToFloat2Fixed(PLAN_TB_PTM_FIBER.DLA_T06)
                ) : (
                  ""
                )}
              </td>
              <td>
                {" "}
                {loadingPlan ? (
                  <LoadingComponent />
                ) : PLAN_TB_PTM_FIBER.DLA_T07 ? (
                  convertToFloat2Fixed(PLAN_TB_PTM_FIBER.DLA_T07)
                ) : (
                  ""
                )}
              </td>
              <td>
                {" "}
                {loadingPlan ? (
                  <LoadingComponent />
                ) : PLAN_TB_PTM_FIBER.DLA_T08 ? (
                  convertToFloat2Fixed(PLAN_TB_PTM_FIBER.DLA_T08)
                ) : (
                  ""
                )}
              </td>
              <td>
                {" "}
                {loadingPlan ? (
                  <LoadingComponent />
                ) : PLAN_TB_PTM_FIBER.DLA_T09 ? (
                  convertToFloat2Fixed(PLAN_TB_PTM_FIBER.DLA_T09)
                ) : (
                  ""
                )}
              </td>
              <td>
                {" "}
                {loadingPlan ? (
                  <LoadingComponent />
                ) : PLAN_TB_PTM_FIBER.DLA_T10 ? (
                  convertToFloat2Fixed(PLAN_TB_PTM_FIBER.DLA_T10)
                ) : (
                  ""
                )}
              </td>
              <td>
                {" "}
                {loadingPlan ? (
                  <LoadingComponent />
                ) : PLAN_TB_PTM_FIBER.DLA_T11 ? (
                  convertToFloat2Fixed(PLAN_TB_PTM_FIBER.DLA_T11)
                ) : (
                  ""
                )}
              </td>
              <td>
                {" "}
                {loadingPlan ? (
                  <LoadingComponent />
                ) : PLAN_TB_PTM_FIBER.DLA_T12 ? (
                  convertToFloat2Fixed(PLAN_TB_PTM_FIBER.DLA_T12)
                ) : (
                  ""
                )}
              </td>
              <td>
                {" "}
                {loadingPlan ? (
                  <LoadingComponent />
                ) : PLAN_TB_PTM_FIBER.DLA_T13 ? (
                  convertToFloat2Fixed(PLAN_TB_PTM_FIBER.DLA_T13)
                ) : (
                  ""
                )}
              </td>
              <td>
                {" "}
                {loadingPlan ? (
                  <LoadingComponent />
                ) : PLAN_TB_PTM_FIBER.DLA_D01 ? (
                  convertToFloat2Fixed(PLAN_TB_PTM_FIBER.DLA_D01)
                ) : (
                  ""
                )}
              </td>
              <td>
                {" "}
                {loadingPlan ? (
                  <LoadingComponent />
                ) : PLAN_TB_PTM_FIBER.DLA_D02 ? (
                  convertToFloat2Fixed(PLAN_TB_PTM_FIBER.DLA_D02)
                ) : (
                  ""
                )}
              </td>
              <td>
                {" "}
                {loadingPlan ? (
                  <LoadingComponent />
                ) : PLAN_TB_PTM_FIBER.DLA_D03 ? (
                  convertToFloat2Fixed(PLAN_TB_PTM_FIBER.DLA_D03)
                ) : (
                  ""
                )}
              </td>
              <td>
                {" "}
                {loadingPlan ? (
                  <LoadingComponent />
                ) : PLAN_TB_PTM_FIBER.DLA_D04 ? (
                  convertToFloat2Fixed(PLAN_TB_PTM_FIBER.DLA_D04)
                ) : (
                  ""
                )}
              </td>
              <td>
                {" "}
                {loadingPlan ? (
                  <LoadingComponent />
                ) : PLAN_TB_PTM_FIBER.DLA_D05 ? (
                  convertToFloat2Fixed(PLAN_TB_PTM_FIBER.DLA_D05)
                ) : (
                  ""
                )}
              </td>
              <td>
                {" "}
                {loadingPlan ? (
                  <LoadingComponent />
                ) : PLAN_TB_PTM_FIBER.DLA_D06 ? (
                  convertToFloat2Fixed(PLAN_TB_PTM_FIBER.DLA_D06)
                ) : (
                  ""
                )}
              </td>
              <td>
                {" "}
                {loadingPlan ? (
                  <LoadingComponent />
                ) : PLAN_TB_PTM_FIBER.TTKDVT ? (
                  convertToFloat2Fixed(PLAN_TB_PTM_FIBER.TTKDVT)
                ) : (
                  ""
                )}
              </td>
              <td>
                {" "}
                {loadingPlan ? (
                  <LoadingComponent />
                ) : PLAN_TB_PTM_FIBER.TTKDGPS ? (
                  convertToFloat2Fixed(PLAN_TB_PTM_FIBER.TTKDGPS)
                ) : (
                  ""
                )}
              </td>
              <td rowSpan={3}>
                {EXEC_TB_PTM_FIBER.LAST_DATE
                  ? getFormattedDate(new Date(EXEC_TB_PTM_FIBER.LAST_DATE))
                  : ""}
              </td>
            </tr>
            <tr>
              <td className="td-title-center td-kh fix-col-3">TH</td>
              <td>
                {" "}
                {loadingPlan ? (
                  <LoadingComponent />
                ) : EXEC_TB_PTM_FIBER.DLA_T01 ? (
                  convertToFloat2Fixed(EXEC_TB_PTM_FIBER.DLA_T01)
                ) : (
                  ""
                )}
              </td>
              <td>
                {" "}
                {loadingPlan ? (
                  <LoadingComponent />
                ) : EXEC_TB_PTM_FIBER.DLA_T02 ? (
                  convertToFloat2Fixed(EXEC_TB_PTM_FIBER.DLA_T02)
                ) : (
                  ""
                )}
              </td>
              <td>
                {" "}
                {loadingPlan ? (
                  <LoadingComponent />
                ) : EXEC_TB_PTM_FIBER.DLA_T03 ? (
                  convertToFloat2Fixed(EXEC_TB_PTM_FIBER.DLA_T03)
                ) : (
                  ""
                )}
              </td>
              <td>
                {" "}
                {loadingPlan ? (
                  <LoadingComponent />
                ) : EXEC_TB_PTM_FIBER.DLA_T04 ? (
                  convertToFloat2Fixed(EXEC_TB_PTM_FIBER.DLA_T04)
                ) : (
                  ""
                )}
              </td>
              <td>
                {" "}
                {loadingPlan ? (
                  <LoadingComponent />
                ) : EXEC_TB_PTM_FIBER.DLA_T05 ? (
                  convertToFloat2Fixed(EXEC_TB_PTM_FIBER.DLA_T05)
                ) : (
                  ""
                )}
              </td>
              <td>
                {" "}
                {loadingPlan ? (
                  <LoadingComponent />
                ) : EXEC_TB_PTM_FIBER.DLA_T06 ? (
                  convertToFloat2Fixed(EXEC_TB_PTM_FIBER.DLA_T06)
                ) : (
                  ""
                )}
              </td>
              <td>
                {" "}
                {loadingPlan ? (
                  <LoadingComponent />
                ) : EXEC_TB_PTM_FIBER.DLA_T07 ? (
                  convertToFloat2Fixed(EXEC_TB_PTM_FIBER.DLA_T07)
                ) : (
                  ""
                )}
              </td>
              <td>
                {" "}
                {loadingPlan ? (
                  <LoadingComponent />
                ) : EXEC_TB_PTM_FIBER.DLA_T08 ? (
                  convertToFloat2Fixed(EXEC_TB_PTM_FIBER.DLA_T08)
                ) : (
                  ""
                )}
              </td>
              <td>
                {" "}
                {loadingPlan ? (
                  <LoadingComponent />
                ) : EXEC_TB_PTM_FIBER.DLA_T09 ? (
                  convertToFloat2Fixed(EXEC_TB_PTM_FIBER.DLA_T09)
                ) : (
                  ""
                )}
              </td>
              <td>
                {" "}
                {loadingPlan ? (
                  <LoadingComponent />
                ) : EXEC_TB_PTM_FIBER.DLA_T10 ? (
                  convertToFloat2Fixed(EXEC_TB_PTM_FIBER.DLA_T10)
                ) : (
                  ""
                )}
              </td>
              <td>
                {" "}
                {loadingPlan ? (
                  <LoadingComponent />
                ) : EXEC_TB_PTM_FIBER.DLA_T11 ? (
                  convertToFloat2Fixed(EXEC_TB_PTM_FIBER.DLA_T11)
                ) : (
                  ""
                )}
              </td>
              <td>
                {" "}
                {loadingPlan ? (
                  <LoadingComponent />
                ) : EXEC_TB_PTM_FIBER.DLA_T12 ? (
                  convertToFloat2Fixed(EXEC_TB_PTM_FIBER.DLA_T12)
                ) : (
                  ""
                )}
              </td>
              <td>
                {" "}
                {loadingPlan ? (
                  <LoadingComponent />
                ) : EXEC_TB_PTM_FIBER.DLA_T13 ? (
                  convertToFloat2Fixed(EXEC_TB_PTM_FIBER.DLA_T13)
                ) : (
                  ""
                )}
              </td>
              <td>
                {" "}
                {loadingPlan ? (
                  <LoadingComponent />
                ) : EXEC_TB_PTM_FIBER.DLA_D01 ? (
                  convertToFloat2Fixed(EXEC_TB_PTM_FIBER.DLA_D01)
                ) : (
                  ""
                )}
              </td>
              <td>
                {" "}
                {loadingPlan ? (
                  <LoadingComponent />
                ) : EXEC_TB_PTM_FIBER.DLA_D02 ? (
                  convertToFloat2Fixed(EXEC_TB_PTM_FIBER.DLA_D02)
                ) : (
                  ""
                )}
              </td>
              <td>
                {" "}
                {loadingPlan ? (
                  <LoadingComponent />
                ) : EXEC_TB_PTM_FIBER.DLA_D03 ? (
                  convertToFloat2Fixed(EXEC_TB_PTM_FIBER.DLA_D03)
                ) : (
                  ""
                )}
              </td>
              <td>
                {" "}
                {loadingPlan ? (
                  <LoadingComponent />
                ) : EXEC_TB_PTM_FIBER.DLA_D04 ? (
                  convertToFloat2Fixed(EXEC_TB_PTM_FIBER.DLA_D04)
                ) : (
                  ""
                )}
              </td>
              <td>
                {" "}
                {loadingPlan ? (
                  <LoadingComponent />
                ) : EXEC_TB_PTM_FIBER.DLA_D05 ? (
                  convertToFloat2Fixed(EXEC_TB_PTM_FIBER.DLA_D05)
                ) : (
                  ""
                )}
              </td>
              <td>
                {" "}
                {loadingPlan ? (
                  <LoadingComponent />
                ) : EXEC_TB_PTM_FIBER.DLA_D06 ? (
                  convertToFloat2Fixed(EXEC_TB_PTM_FIBER.DLA_D06)
                ) : (
                  ""
                )}
              </td>
              <td>
                {" "}
                {loadingPlan ? (
                  <LoadingComponent />
                ) : (
                  convertToFloat2Fixed(
                    convertToNumber(EXEC_TB_PTM_FIBER.DLA_T01) +
                      convertToNumber(EXEC_TB_PTM_FIBER.DLA_T02) +
                      convertToNumber(EXEC_TB_PTM_FIBER.DLA_T03) +
                      convertToNumber(EXEC_TB_PTM_FIBER.DLA_T04) +
                      convertToNumber(EXEC_TB_PTM_FIBER.DLA_T05) +
                      convertToNumber(EXEC_TB_PTM_FIBER.DLA_T06) +
                      convertToNumber(EXEC_TB_PTM_FIBER.DLA_T07) +
                      convertToNumber(EXEC_TB_PTM_FIBER.DLA_T08) +
                      convertToNumber(EXEC_TB_PTM_FIBER.DLA_T09) +
                      convertToNumber(EXEC_TB_PTM_FIBER.DLA_T10) +
                      convertToNumber(EXEC_TB_PTM_FIBER.DLA_T11) +
                      convertToNumber(EXEC_TB_PTM_FIBER.DLA_T12) +
                      convertToNumber(EXEC_TB_PTM_FIBER.DLA_T13) +
                      convertToNumber(EXEC_TB_PTM_FIBER.DLA_D01) +
                      convertToNumber(EXEC_TB_PTM_FIBER.DLA_D02) +
                      convertToNumber(EXEC_TB_PTM_FIBER.DLA_D03) +
                      convertToNumber(EXEC_TB_PTM_FIBER.DLA_D04) +
                      convertToNumber(EXEC_TB_PTM_FIBER.DLA_D05) +
                      convertToNumber(EXEC_TB_PTM_FIBER.DLA_D06)
                  )
                )}
              </td>
              <td>
                {" "}
                {loadingPlan ? (
                  <LoadingComponent />
                ) : EXEC_TB_PTM_FIBER.TTKDGPS ? (
                  convertToFloat2Fixed(EXEC_TB_PTM_FIBER.TTKDGPS)
                ) : (
                  ""
                )}
              </td>
            </tr>
            <tr>
              <td className="td-title-center td-kh fix-col-3">%TH</td>
              <td
                className={
                  (convertToNumber(EXEC_TB_PTM_FIBER.DLA_T01) * 100) /
                    convertToNumberMauso(PLAN_TB_PTM_FIBER.DLA_T01) >
                  processKPI
                    ? "bg-green"
                    : "bg-red"
                }
              >
                {loadingExec || loadingPlan ? (
                  <LoadingComponent />
                ) : EXEC_TB_PTM_FIBER.DLA_T01 && PLAN_TB_PTM_FIBER.DLA_T01 ? (
                  convertToFloat2Fixed(
                    (EXEC_TB_PTM_FIBER.DLA_T01 * 100) /
                      PLAN_TB_PTM_FIBER.DLA_T01
                  ) + "%"
                ) : (
                  ""
                )}
              </td>
              <td
                className={
                  (convertToNumber(EXEC_TB_PTM_FIBER.DLA_T02) * 100) /
                    convertToNumberMauso(PLAN_TB_PTM_FIBER.DLA_T02) >
                  processKPI
                    ? "bg-green"
                    : "bg-red"
                }
              >
                {loadingExec || loadingPlan ? (
                  <LoadingComponent />
                ) : EXEC_TB_PTM_FIBER.DLA_T02 && PLAN_TB_PTM_FIBER.DLA_T02 ? (
                  convertToFloat2Fixed(
                    (EXEC_TB_PTM_FIBER.DLA_T02 * 100) /
                      PLAN_TB_PTM_FIBER.DLA_T02
                  ) + "%"
                ) : (
                  ""
                )}
              </td>
              <td
                className={
                  (convertToNumber(EXEC_TB_PTM_FIBER.DLA_T02) * 100) /
                    convertToNumberMauso(PLAN_TB_PTM_FIBER.DLA_T02) >
                  processKPI
                    ? "bg-green"
                    : "bg-red"
                }
              >
                {loadingExec || loadingPlan ? (
                  <LoadingComponent />
                ) : EXEC_TB_PTM_FIBER.DLA_T03 && PLAN_TB_PTM_FIBER.DLA_T03 ? (
                  convertToFloat2Fixed(
                    (EXEC_TB_PTM_FIBER.DLA_T03 * 100) /
                      PLAN_TB_PTM_FIBER.DLA_T03
                  ) + "%"
                ) : (
                  ""
                )}
              </td>
              <td
                className={
                  (convertToNumber(EXEC_TB_PTM_FIBER.DLA_T04) * 100) /
                    convertToNumberMauso(PLAN_TB_PTM_FIBER.DLA_T04) >
                  processKPI
                    ? "bg-green"
                    : "bg-red"
                }
              >
                {loadingExec || loadingPlan ? (
                  <LoadingComponent />
                ) : EXEC_TB_PTM_FIBER.DLA_T04 && PLAN_TB_PTM_FIBER.DLA_T04 ? (
                  convertToFloat2Fixed(
                    (EXEC_TB_PTM_FIBER.DLA_T04 * 100) /
                      PLAN_TB_PTM_FIBER.DLA_T04
                  ) + "%"
                ) : (
                  ""
                )}
              </td>
              <td
                className={
                  (convertToNumber(EXEC_TB_PTM_FIBER.DLA_T05) * 100) /
                    convertToNumberMauso(PLAN_TB_PTM_FIBER.DLA_T05) >
                  processKPI
                    ? "bg-green"
                    : "bg-red"
                }
              >
                {loadingExec || loadingPlan ? (
                  <LoadingComponent />
                ) : EXEC_TB_PTM_FIBER.DLA_T05 && PLAN_TB_PTM_FIBER.DLA_T05 ? (
                  convertToFloat2Fixed(
                    (EXEC_TB_PTM_FIBER.DLA_T05 * 100) /
                      PLAN_TB_PTM_FIBER.DLA_T05
                  ) + "%"
                ) : (
                  ""
                )}
              </td>
              <td
                className={
                  (convertToNumber(EXEC_TB_PTM_FIBER.DLA_T06) * 100) /
                    convertToNumberMauso(PLAN_TB_PTM_FIBER.DLA_T06) >
                  processKPI
                    ? "bg-green"
                    : "bg-red"
                }
              >
                {loadingExec || loadingPlan ? (
                  <LoadingComponent />
                ) : EXEC_TB_PTM_FIBER.DLA_T06 && PLAN_TB_PTM_FIBER.DLA_T06 ? (
                  convertToFloat2Fixed(
                    (EXEC_TB_PTM_FIBER.DLA_T06 * 100) /
                      PLAN_TB_PTM_FIBER.DLA_T06
                  ) + "%"
                ) : (
                  ""
                )}
              </td>
              <td
                className={
                  (convertToNumber(EXEC_TB_PTM_FIBER.DLA_T07) * 100) /
                    convertToNumberMauso(PLAN_TB_PTM_FIBER.DLA_T07) >
                  processKPI
                    ? "bg-green"
                    : "bg-red"
                }
              >
                {loadingExec || loadingPlan ? (
                  <LoadingComponent />
                ) : EXEC_TB_PTM_FIBER.DLA_T07 && PLAN_TB_PTM_FIBER.DLA_T07 ? (
                  convertToFloat2Fixed(
                    (EXEC_TB_PTM_FIBER.DLA_T07 * 100) /
                      PLAN_TB_PTM_FIBER.DLA_T07
                  ) + "%"
                ) : (
                  ""
                )}
              </td>
              <td
                className={
                  (convertToNumber(EXEC_TB_PTM_FIBER.DLA_T08) * 100) /
                    convertToNumberMauso(PLAN_TB_PTM_FIBER.DLA_T08) >
                  processKPI
                    ? "bg-green"
                    : "bg-red"
                }
              >
                {loadingExec || loadingPlan ? (
                  <LoadingComponent />
                ) : EXEC_TB_PTM_FIBER.DLA_T08 && PLAN_TB_PTM_FIBER.DLA_T08 ? (
                  convertToFloat2Fixed(
                    (EXEC_TB_PTM_FIBER.DLA_T08 * 100) /
                      PLAN_TB_PTM_FIBER.DLA_T08
                  ) + "%"
                ) : (
                  ""
                )}
              </td>
              <td
                className={
                  (convertToNumber(EXEC_TB_PTM_FIBER.DLA_T09) * 100) /
                    convertToNumberMauso(PLAN_TB_PTM_FIBER.DLA_T09) >
                  processKPI
                    ? "bg-green"
                    : "bg-red"
                }
              >
                {loadingExec || loadingPlan ? (
                  <LoadingComponent />
                ) : EXEC_TB_PTM_FIBER.DLA_T09 && PLAN_TB_PTM_FIBER.DLA_T09 ? (
                  convertToFloat2Fixed(
                    (EXEC_TB_PTM_FIBER.DLA_T09 * 100) /
                      PLAN_TB_PTM_FIBER.DLA_T09
                  ) + "%"
                ) : (
                  ""
                )}
              </td>
              <td
                className={
                  (convertToNumber(EXEC_TB_PTM_FIBER.DLA_T10) * 100) /
                    convertToNumberMauso(PLAN_TB_PTM_FIBER.DLA_T10) >
                  processKPI
                    ? "bg-green"
                    : "bg-red"
                }
              >
                {loadingExec || loadingPlan ? (
                  <LoadingComponent />
                ) : EXEC_TB_PTM_FIBER.DLA_T10 && PLAN_TB_PTM_FIBER.DLA_T10 ? (
                  convertToFloat2Fixed(
                    (EXEC_TB_PTM_FIBER.DLA_T10 * 100) /
                      PLAN_TB_PTM_FIBER.DLA_T10
                  ) + "%"
                ) : (
                  ""
                )}
              </td>
              <td
                className={
                  (convertToNumber(EXEC_TB_PTM_FIBER.DLA_T11) * 100) /
                    convertToNumberMauso(PLAN_TB_PTM_FIBER.DLA_T11) >
                  processKPI
                    ? "bg-green"
                    : "bg-red"
                }
              >
                {loadingExec || loadingPlan ? (
                  <LoadingComponent />
                ) : EXEC_TB_PTM_FIBER.DLA_T11 && PLAN_TB_PTM_FIBER.DLA_T11 ? (
                  convertToFloat2Fixed(
                    (EXEC_TB_PTM_FIBER.DLA_T11 * 100) /
                      PLAN_TB_PTM_FIBER.DLA_T11
                  ) + "%"
                ) : (
                  ""
                )}
              </td>
              <td
                className={
                  (convertToNumber(EXEC_TB_PTM_FIBER.DLA_T12) * 100) /
                    convertToNumberMauso(PLAN_TB_PTM_FIBER.DLA_T12) >
                  processKPI
                    ? "bg-green"
                    : "bg-red"
                }
              >
                {loadingExec || loadingPlan ? (
                  <LoadingComponent />
                ) : EXEC_TB_PTM_FIBER.DLA_T12 && PLAN_TB_PTM_FIBER.DLA_T12 ? (
                  convertToFloat2Fixed(
                    (EXEC_TB_PTM_FIBER.DLA_T12 * 100) /
                      PLAN_TB_PTM_FIBER.DLA_T12
                  ) + "%"
                ) : (
                  ""
                )}
              </td>
              <td
                className={
                  (convertToNumber(EXEC_TB_PTM_FIBER.DLA_T13) * 100) /
                    convertToNumberMauso(PLAN_TB_PTM_FIBER.DLA_T13) >
                  processKPI
                    ? "bg-green"
                    : "bg-red"
                }
              >
                {loadingExec || loadingPlan ? (
                  <LoadingComponent />
                ) : EXEC_TB_PTM_FIBER.DLA_T13 && PLAN_TB_PTM_FIBER.DLA_T13 ? (
                  convertToFloat2Fixed(
                    (EXEC_TB_PTM_FIBER.DLA_T13 * 100) /
                      PLAN_TB_PTM_FIBER.DLA_T13
                  ) + "%"
                ) : (
                  ""
                )}
              </td>
              <td
                className={
                  (convertToNumber(EXEC_TB_PTM_FIBER.DLA_D01) * 100) /
                    convertToNumberMauso(PLAN_TB_PTM_FIBER.DLA_D01) >
                  processKPI
                    ? "bg-green"
                    : "bg-red"
                }
              >
                {loadingExec || loadingPlan ? (
                  <LoadingComponent />
                ) : EXEC_TB_PTM_FIBER.DLA_D01 && PLAN_TB_PTM_FIBER.DLA_D01 ? (
                  convertToFloat2Fixed(
                    (EXEC_TB_PTM_FIBER.DLA_D01 * 100) /
                      PLAN_TB_PTM_FIBER.DLA_D01
                  ) + "%"
                ) : (
                  ""
                )}
              </td>
              <td
                className={
                  (convertToNumber(EXEC_TB_PTM_FIBER.DLA_D02) * 100) /
                    convertToNumberMauso(PLAN_TB_PTM_FIBER.DLA_D02) >
                  processKPI
                    ? "bg-green"
                    : "bg-red"
                }
              >
                {loadingExec || loadingPlan ? (
                  <LoadingComponent />
                ) : EXEC_TB_PTM_FIBER.DLA_D02 && PLAN_TB_PTM_FIBER.DLA_D02 ? (
                  convertToFloat2Fixed(
                    (EXEC_TB_PTM_FIBER.DLA_D02 * 100) /
                      PLAN_TB_PTM_FIBER.DLA_D02
                  ) + "%"
                ) : (
                  ""
                )}
              </td>
              <td
                className={
                  (convertToNumber(EXEC_TB_PTM_FIBER.DLA_D03) * 100) /
                    convertToNumberMauso(PLAN_TB_PTM_FIBER.DLA_D03) >
                  processKPI
                    ? "bg-green"
                    : "bg-red"
                }
              >
                {loadingExec || loadingPlan ? (
                  <LoadingComponent />
                ) : EXEC_TB_PTM_FIBER.DLA_D03 && PLAN_TB_PTM_FIBER.DLA_D03 ? (
                  convertToFloat2Fixed(
                    (EXEC_TB_PTM_FIBER.DLA_D03 * 100) /
                      PLAN_TB_PTM_FIBER.DLA_D03
                  ) + "%"
                ) : (
                  ""
                )}
              </td>
              <td
                className={
                  (convertToNumber(EXEC_TB_PTM_FIBER.DLA_D04) * 100) /
                    convertToNumberMauso(PLAN_TB_PTM_FIBER.DLA_D04) >
                  processKPI
                    ? "bg-green"
                    : "bg-red"
                }
              >
                {loadingExec || loadingPlan ? (
                  <LoadingComponent />
                ) : EXEC_TB_PTM_FIBER.DLA_D04 && PLAN_TB_PTM_FIBER.DLA_D04 ? (
                  convertToFloat2Fixed(
                    (EXEC_TB_PTM_FIBER.DLA_D04 * 100) /
                      PLAN_TB_PTM_FIBER.DLA_D04
                  ) + "%"
                ) : (
                  ""
                )}
              </td>
              <td
                className={
                  (convertToNumber(EXEC_TB_PTM_FIBER.DLA_D05) * 100) /
                    convertToNumberMauso(PLAN_TB_PTM_FIBER.DLA_D05) >
                  processKPI
                    ? "bg-green"
                    : "bg-red"
                }
              >
                {loadingExec || loadingPlan ? (
                  <LoadingComponent />
                ) : EXEC_TB_PTM_FIBER.DLA_D05 && PLAN_TB_PTM_FIBER.DLA_D05 ? (
                  convertToFloat2Fixed(
                    (EXEC_TB_PTM_FIBER.DLA_D05 * 100) /
                      PLAN_TB_PTM_FIBER.DLA_D05
                  ) + "%"
                ) : (
                  ""
                )}
              </td>
              <td
                className={
                  (convertToNumber(EXEC_TB_PTM_FIBER.DLA_D06) * 100) /
                    convertToNumberMauso(PLAN_TB_PTM_FIBER.DLA_D06) >
                  processKPI
                    ? "bg-green"
                    : "bg-red"
                }
              >
                {loadingExec || loadingPlan ? (
                  <LoadingComponent />
                ) : EXEC_TB_PTM_FIBER.DLA_D06 && PLAN_TB_PTM_FIBER.DLA_D06 ? (
                  convertToFloat2Fixed(
                    (EXEC_TB_PTM_FIBER.DLA_D06 * 100) /
                      PLAN_TB_PTM_FIBER.DLA_D06
                  ) + "%"
                ) : (
                  ""
                )}
              </td>
              <td
                className={
                  convertToFloat2Fixed(
                    ((convertToNumber(EXEC_TB_PTM_FIBER.DLA_T01) +
                      convertToNumber(EXEC_TB_PTM_FIBER.DLA_T02) +
                      convertToNumber(EXEC_TB_PTM_FIBER.DLA_T03) +
                      convertToNumber(EXEC_TB_PTM_FIBER.DLA_T04) +
                      convertToNumber(EXEC_TB_PTM_FIBER.DLA_T05) +
                      convertToNumber(EXEC_TB_PTM_FIBER.DLA_T06) +
                      convertToNumber(EXEC_TB_PTM_FIBER.DLA_T07) +
                      convertToNumber(EXEC_TB_PTM_FIBER.DLA_T08) +
                      convertToNumber(EXEC_TB_PTM_FIBER.DLA_T09) +
                      convertToNumber(EXEC_TB_PTM_FIBER.DLA_T10) +
                      convertToNumber(EXEC_TB_PTM_FIBER.DLA_T11) +
                      convertToNumber(EXEC_TB_PTM_FIBER.DLA_T12) +
                      convertToNumber(EXEC_TB_PTM_FIBER.DLA_T13) +
                      convertToNumber(EXEC_TB_PTM_FIBER.DLA_D01) +
                      convertToNumber(EXEC_TB_PTM_FIBER.DLA_D02) +
                      convertToNumber(EXEC_TB_PTM_FIBER.DLA_D03) +
                      convertToNumber(EXEC_TB_PTM_FIBER.DLA_D04) +
                      convertToNumber(EXEC_TB_PTM_FIBER.DLA_D05) +
                      convertToNumber(EXEC_TB_PTM_FIBER.DLA_D06)) *
                      100) /
                      convertToNumberMauso(PLAN_TB_PTM_FIBER.TTKDVT)
                  ) > processKPI
                    ? "bg-green"
                    : "bg-red"
                }
              >
                {loadingExec || loadingPlan ? (
                  <LoadingComponent />
                ) : (
                  convertToFloat2Fixed(
                    ((convertToNumber(EXEC_TB_PTM_FIBER.DLA_T01) +
                      convertToNumber(EXEC_TB_PTM_FIBER.DLA_T02) +
                      convertToNumber(EXEC_TB_PTM_FIBER.DLA_T03) +
                      convertToNumber(EXEC_TB_PTM_FIBER.DLA_T04) +
                      convertToNumber(EXEC_TB_PTM_FIBER.DLA_T05) +
                      convertToNumber(EXEC_TB_PTM_FIBER.DLA_T06) +
                      convertToNumber(EXEC_TB_PTM_FIBER.DLA_T07) +
                      convertToNumber(EXEC_TB_PTM_FIBER.DLA_T08) +
                      convertToNumber(EXEC_TB_PTM_FIBER.DLA_T09) +
                      convertToNumber(EXEC_TB_PTM_FIBER.DLA_T10) +
                      convertToNumber(EXEC_TB_PTM_FIBER.DLA_T11) +
                      convertToNumber(EXEC_TB_PTM_FIBER.DLA_T12) +
                      convertToNumber(EXEC_TB_PTM_FIBER.DLA_T13) +
                      convertToNumber(EXEC_TB_PTM_FIBER.DLA_D01) +
                      convertToNumber(EXEC_TB_PTM_FIBER.DLA_D02) +
                      convertToNumber(EXEC_TB_PTM_FIBER.DLA_D03) +
                      convertToNumber(EXEC_TB_PTM_FIBER.DLA_D04) +
                      convertToNumber(EXEC_TB_PTM_FIBER.DLA_D05) +
                      convertToNumber(EXEC_TB_PTM_FIBER.DLA_D06)) *
                      100) /
                      convertToNumberMauso(PLAN_TB_PTM_FIBER.TTKDVT)
                  ) + "%"
                )}
              </td>
              <td
              // className={
              //   (convertToNumber(EXEC_TB_PTM_FIBER.TTKDGPS) * 100) /
              //     convertToNumberMauso(PLAN_TB_PTM_FIBER.TTKDGPS) >
              //   processKPI
              //     ? "bg-green"
              //     : "bg-red"
              // }
              >
                {loadingExec || loadingPlan ? (
                  <LoadingComponent />
                ) : EXEC_TB_PTM_FIBER.TTKDGPS && PLAN_TB_PTM_FIBER.TTKDGPS ? (
                  convertToFloat2Fixed(
                    (EXEC_TB_PTM_FIBER.TTKDGPS * 100) /
                      PLAN_TB_PTM_FIBER.TTKDGPS
                  ) + "%"
                ) : (
                  ""
                )}
              </td>
            </tr>
            <tr>
              <td
                rowSpan={3}
                className="td-title-center fw-bold td-stt fix-col-1"
              >
                8
              </td>
              <td
                rowSpan={3}
                className="td-title  fw-bold td-content fix-col-2"
              >
                {`Tỷ lệ gia hạn gói dài kỳ(%)`}
              </td>
              <td className="td-title-center  td-kh fix-col-3">KH</td>
              <td>
                {" "}
                {loadingPlan ? (
                  <LoadingComponent />
                ) : PLAN_TI_LE_GIA_HAN_GOI_DAI_KY.DLA_T01 ? (
                  convertToFloat2Fixed(PLAN_TI_LE_GIA_HAN_GOI_DAI_KY.DLA_T01)
                ) : (
                  ""
                )}
              </td>
              <td>
                {" "}
                {loadingPlan ? (
                  <LoadingComponent />
                ) : PLAN_TI_LE_GIA_HAN_GOI_DAI_KY.DLA_T02 ? (
                  convertToFloat2Fixed(PLAN_TI_LE_GIA_HAN_GOI_DAI_KY.DLA_T02)
                ) : (
                  ""
                )}
              </td>
              <td>
                {" "}
                {loadingPlan ? (
                  <LoadingComponent />
                ) : PLAN_TI_LE_GIA_HAN_GOI_DAI_KY.DLA_T03 ? (
                  convertToFloat2Fixed(PLAN_TI_LE_GIA_HAN_GOI_DAI_KY.DLA_T03)
                ) : (
                  ""
                )}
              </td>
              <td>
                {" "}
                {loadingPlan ? (
                  <LoadingComponent />
                ) : PLAN_TI_LE_GIA_HAN_GOI_DAI_KY.DLA_T04 ? (
                  convertToFloat2Fixed(PLAN_TI_LE_GIA_HAN_GOI_DAI_KY.DLA_T04)
                ) : (
                  ""
                )}
              </td>
              <td>
                {" "}
                {loadingPlan ? (
                  <LoadingComponent />
                ) : PLAN_TI_LE_GIA_HAN_GOI_DAI_KY.DLA_T05 ? (
                  convertToFloat2Fixed(PLAN_TI_LE_GIA_HAN_GOI_DAI_KY.DLA_T05)
                ) : (
                  ""
                )}
              </td>
              <td>
                {" "}
                {loadingPlan ? (
                  <LoadingComponent />
                ) : PLAN_TI_LE_GIA_HAN_GOI_DAI_KY.DLA_T06 ? (
                  convertToFloat2Fixed(PLAN_TI_LE_GIA_HAN_GOI_DAI_KY.DLA_T06)
                ) : (
                  ""
                )}
              </td>
              <td>
                {" "}
                {loadingPlan ? (
                  <LoadingComponent />
                ) : PLAN_TI_LE_GIA_HAN_GOI_DAI_KY.DLA_T07 ? (
                  convertToFloat2Fixed(PLAN_TI_LE_GIA_HAN_GOI_DAI_KY.DLA_T07)
                ) : (
                  ""
                )}
              </td>
              <td>
                {" "}
                {loadingPlan ? (
                  <LoadingComponent />
                ) : PLAN_TI_LE_GIA_HAN_GOI_DAI_KY.DLA_T08 ? (
                  convertToFloat2Fixed(PLAN_TI_LE_GIA_HAN_GOI_DAI_KY.DLA_T08)
                ) : (
                  ""
                )}
              </td>
              <td>
                {" "}
                {loadingPlan ? (
                  <LoadingComponent />
                ) : PLAN_TI_LE_GIA_HAN_GOI_DAI_KY.DLA_T09 ? (
                  convertToFloat2Fixed(PLAN_TI_LE_GIA_HAN_GOI_DAI_KY.DLA_T09)
                ) : (
                  ""
                )}
              </td>
              <td>
                {" "}
                {loadingPlan ? (
                  <LoadingComponent />
                ) : PLAN_TI_LE_GIA_HAN_GOI_DAI_KY.DLA_T10 ? (
                  convertToFloat2Fixed(PLAN_TI_LE_GIA_HAN_GOI_DAI_KY.DLA_T10)
                ) : (
                  ""
                )}
              </td>
              <td>
                {" "}
                {loadingPlan ? (
                  <LoadingComponent />
                ) : PLAN_TI_LE_GIA_HAN_GOI_DAI_KY.DLA_T11 ? (
                  convertToFloat2Fixed(PLAN_TI_LE_GIA_HAN_GOI_DAI_KY.DLA_T11)
                ) : (
                  ""
                )}
              </td>
              <td>
                {" "}
                {loadingPlan ? (
                  <LoadingComponent />
                ) : PLAN_TI_LE_GIA_HAN_GOI_DAI_KY.DLA_T12 ? (
                  convertToFloat2Fixed(PLAN_TI_LE_GIA_HAN_GOI_DAI_KY.DLA_T12)
                ) : (
                  ""
                )}
              </td>
              <td>
                {" "}
                {loadingPlan ? (
                  <LoadingComponent />
                ) : PLAN_TI_LE_GIA_HAN_GOI_DAI_KY.DLA_T13 ? (
                  convertToFloat2Fixed(PLAN_TI_LE_GIA_HAN_GOI_DAI_KY.DLA_T13)
                ) : (
                  ""
                )}
              </td>
              <td>
                {" "}
                {loadingPlan ? (
                  <LoadingComponent />
                ) : PLAN_TI_LE_GIA_HAN_GOI_DAI_KY.DLA_D01 ? (
                  convertToFloat2Fixed(PLAN_TI_LE_GIA_HAN_GOI_DAI_KY.DLA_D01)
                ) : (
                  ""
                )}
              </td>
              <td>
                {" "}
                {loadingPlan ? (
                  <LoadingComponent />
                ) : PLAN_TI_LE_GIA_HAN_GOI_DAI_KY.DLA_D02 ? (
                  convertToFloat2Fixed(PLAN_TI_LE_GIA_HAN_GOI_DAI_KY.DLA_D02)
                ) : (
                  ""
                )}
              </td>
              <td>
                {" "}
                {loadingPlan ? (
                  <LoadingComponent />
                ) : PLAN_TI_LE_GIA_HAN_GOI_DAI_KY.DLA_D03 ? (
                  convertToFloat2Fixed(PLAN_TI_LE_GIA_HAN_GOI_DAI_KY.DLA_D03)
                ) : (
                  ""
                )}
              </td>
              <td>
                {" "}
                {loadingPlan ? (
                  <LoadingComponent />
                ) : PLAN_TI_LE_GIA_HAN_GOI_DAI_KY.DLA_D04 ? (
                  convertToFloat2Fixed(PLAN_TI_LE_GIA_HAN_GOI_DAI_KY.DLA_D04)
                ) : (
                  ""
                )}
              </td>
              <td>
                {" "}
                {loadingPlan ? (
                  <LoadingComponent />
                ) : PLAN_TI_LE_GIA_HAN_GOI_DAI_KY.DLA_D05 ? (
                  convertToFloat2Fixed(PLAN_TI_LE_GIA_HAN_GOI_DAI_KY.DLA_D05)
                ) : (
                  ""
                )}
              </td>
              <td>
                {" "}
                {loadingPlan ? (
                  <LoadingComponent />
                ) : PLAN_TI_LE_GIA_HAN_GOI_DAI_KY.DLA_D06 ? (
                  convertToFloat2Fixed(PLAN_TI_LE_GIA_HAN_GOI_DAI_KY.DLA_D06)
                ) : (
                  ""
                )}
              </td>
              <td>
                {" "}
                {loadingPlan ? (
                  <LoadingComponent />
                ) : PLAN_TI_LE_GIA_HAN_GOI_DAI_KY.TTKDVT ? (
                  convertToFloat2Fixed(PLAN_TI_LE_GIA_HAN_GOI_DAI_KY.TTKDVT)
                ) : (
                  ""
                )}
              </td>
              <td>
                {" "}
                {loadingPlan ? (
                  <LoadingComponent />
                ) : PLAN_TI_LE_GIA_HAN_GOI_DAI_KY.TTKDGPS ? (
                  convertToFloat2Fixed(PLAN_TI_LE_GIA_HAN_GOI_DAI_KY.TTKDGPS)
                ) : (
                  ""
                )}
              </td>
              <td rowSpan={3}>
                {EXEC_TI_LE_GIA_HAN_GOI_DAI_KY.LAST_DATE
                  ? getFormattedDate(
                      new Date(EXEC_TI_LE_GIA_HAN_GOI_DAI_KY.LAST_DATE)
                    )
                  : ""}
              </td>
            </tr>
            <tr>
              <td className="td-title-center td-kh fix-col-3">TH</td>
              <td>
                {" "}
                {loadingPlan ? (
                  <LoadingComponent />
                ) : EXEC_TI_LE_GIA_HAN_GOI_DAI_KY.DLA_T01 ? (
                  convertToFloat2Fixed(EXEC_TI_LE_GIA_HAN_GOI_DAI_KY.DLA_T01)
                ) : (
                  ""
                )}
              </td>
              <td>
                {" "}
                {loadingPlan ? (
                  <LoadingComponent />
                ) : EXEC_TI_LE_GIA_HAN_GOI_DAI_KY.DLA_T02 ? (
                  convertToFloat2Fixed(EXEC_TI_LE_GIA_HAN_GOI_DAI_KY.DLA_T02)
                ) : (
                  ""
                )}
              </td>
              <td>
                {" "}
                {loadingPlan ? (
                  <LoadingComponent />
                ) : EXEC_TI_LE_GIA_HAN_GOI_DAI_KY.DLA_T03 ? (
                  convertToFloat2Fixed(EXEC_TI_LE_GIA_HAN_GOI_DAI_KY.DLA_T03)
                ) : (
                  ""
                )}
              </td>
              <td>
                {" "}
                {loadingPlan ? (
                  <LoadingComponent />
                ) : EXEC_TI_LE_GIA_HAN_GOI_DAI_KY.DLA_T04 ? (
                  convertToFloat2Fixed(EXEC_TI_LE_GIA_HAN_GOI_DAI_KY.DLA_T04)
                ) : (
                  ""
                )}
              </td>
              <td>
                {" "}
                {loadingPlan ? (
                  <LoadingComponent />
                ) : EXEC_TI_LE_GIA_HAN_GOI_DAI_KY.DLA_T05 ? (
                  convertToFloat2Fixed(EXEC_TI_LE_GIA_HAN_GOI_DAI_KY.DLA_T05)
                ) : (
                  ""
                )}
              </td>
              <td>
                {" "}
                {loadingPlan ? (
                  <LoadingComponent />
                ) : EXEC_TI_LE_GIA_HAN_GOI_DAI_KY.DLA_T06 ? (
                  convertToFloat2Fixed(EXEC_TI_LE_GIA_HAN_GOI_DAI_KY.DLA_T06)
                ) : (
                  ""
                )}
              </td>
              <td>
                {" "}
                {loadingPlan ? (
                  <LoadingComponent />
                ) : EXEC_TI_LE_GIA_HAN_GOI_DAI_KY.DLA_T07 ? (
                  convertToFloat2Fixed(EXEC_TI_LE_GIA_HAN_GOI_DAI_KY.DLA_T07)
                ) : (
                  ""
                )}
              </td>
              <td>
                {" "}
                {loadingPlan ? (
                  <LoadingComponent />
                ) : EXEC_TI_LE_GIA_HAN_GOI_DAI_KY.DLA_T08 ? (
                  convertToFloat2Fixed(EXEC_TI_LE_GIA_HAN_GOI_DAI_KY.DLA_T08)
                ) : (
                  ""
                )}
              </td>
              <td>
                {" "}
                {loadingPlan ? (
                  <LoadingComponent />
                ) : EXEC_TI_LE_GIA_HAN_GOI_DAI_KY.DLA_T09 ? (
                  convertToFloat2Fixed(EXEC_TI_LE_GIA_HAN_GOI_DAI_KY.DLA_T09)
                ) : (
                  ""
                )}
              </td>
              <td>
                {" "}
                {loadingPlan ? (
                  <LoadingComponent />
                ) : EXEC_TI_LE_GIA_HAN_GOI_DAI_KY.DLA_T10 ? (
                  convertToFloat2Fixed(EXEC_TI_LE_GIA_HAN_GOI_DAI_KY.DLA_T10)
                ) : (
                  ""
                )}
              </td>
              <td>
                {" "}
                {loadingPlan ? (
                  <LoadingComponent />
                ) : EXEC_TI_LE_GIA_HAN_GOI_DAI_KY.DLA_T11 ? (
                  convertToFloat2Fixed(EXEC_TI_LE_GIA_HAN_GOI_DAI_KY.DLA_T11)
                ) : (
                  ""
                )}
              </td>
              <td>
                {" "}
                {loadingPlan ? (
                  <LoadingComponent />
                ) : EXEC_TI_LE_GIA_HAN_GOI_DAI_KY.DLA_T12 ? (
                  convertToFloat2Fixed(EXEC_TI_LE_GIA_HAN_GOI_DAI_KY.DLA_T12)
                ) : (
                  ""
                )}
              </td>
              <td>
                {" "}
                {loadingPlan ? (
                  <LoadingComponent />
                ) : EXEC_TI_LE_GIA_HAN_GOI_DAI_KY.DLA_T13 ? (
                  convertToFloat2Fixed(EXEC_TI_LE_GIA_HAN_GOI_DAI_KY.DLA_T13)
                ) : (
                  ""
                )}
              </td>
              <td>
                {" "}
                {loadingPlan ? (
                  <LoadingComponent />
                ) : EXEC_TI_LE_GIA_HAN_GOI_DAI_KY.DLA_D01 ? (
                  convertToFloat2Fixed(EXEC_TI_LE_GIA_HAN_GOI_DAI_KY.DLA_D01)
                ) : (
                  ""
                )}
              </td>
              <td>
                {" "}
                {loadingPlan ? (
                  <LoadingComponent />
                ) : EXEC_TI_LE_GIA_HAN_GOI_DAI_KY.DLA_D02 ? (
                  convertToFloat2Fixed(EXEC_TI_LE_GIA_HAN_GOI_DAI_KY.DLA_D02)
                ) : (
                  ""
                )}
              </td>
              <td>
                {" "}
                {loadingPlan ? (
                  <LoadingComponent />
                ) : EXEC_TI_LE_GIA_HAN_GOI_DAI_KY.DLA_D03 ? (
                  convertToFloat2Fixed(EXEC_TI_LE_GIA_HAN_GOI_DAI_KY.DLA_D03)
                ) : (
                  ""
                )}
              </td>
              <td>
                {" "}
                {loadingPlan ? (
                  <LoadingComponent />
                ) : EXEC_TI_LE_GIA_HAN_GOI_DAI_KY.DLA_D04 ? (
                  convertToFloat2Fixed(EXEC_TI_LE_GIA_HAN_GOI_DAI_KY.DLA_D04)
                ) : (
                  ""
                )}
              </td>
              <td>
                {" "}
                {loadingPlan ? (
                  <LoadingComponent />
                ) : EXEC_TI_LE_GIA_HAN_GOI_DAI_KY.DLA_D05 ? (
                  convertToFloat2Fixed(EXEC_TI_LE_GIA_HAN_GOI_DAI_KY.DLA_D05)
                ) : (
                  ""
                )}
              </td>
              <td>
                {" "}
                {loadingPlan ? (
                  <LoadingComponent />
                ) : EXEC_TI_LE_GIA_HAN_GOI_DAI_KY.DLA_D06 ? (
                  convertToFloat2Fixed(EXEC_TI_LE_GIA_HAN_GOI_DAI_KY.DLA_D06)
                ) : (
                  ""
                )}
              </td>
              <td>
                {" "}
                {loadingPlan ? (
                  <LoadingComponent />
                ) : EXEC_TI_LE_GIA_HAN_GOI_DAI_KY.TTKDVT ? (
                  convertToFloat2Fixed(EXEC_TI_LE_GIA_HAN_GOI_DAI_KY.TTKDVT)
                ) : (
                  ""
                )}
              </td>
              <td>
                {" "}
                {loadingPlan ? (
                  <LoadingComponent />
                ) : EXEC_TI_LE_GIA_HAN_GOI_DAI_KY.TTKDGPS ? (
                  convertToFloat2Fixed(EXEC_TI_LE_GIA_HAN_GOI_DAI_KY.TTKDGPS)
                ) : (
                  ""
                )}
              </td>
            </tr>
            <tr>
              <td className="td-title-center td-kh fix-col-3">%TH</td>
              <td
                className={
                  (convertToNumber(EXEC_TI_LE_GIA_HAN_GOI_DAI_KY.DLA_T01) *
                    100) /
                    convertToNumberMauso(
                      PLAN_TI_LE_GIA_HAN_GOI_DAI_KY.DLA_T01
                    ) >
                  processKPI
                    ? "bg-green"
                    : "bg-red"
                }
              >
                {loadingExec || loadingPlan ? (
                  <LoadingComponent />
                ) : EXEC_TI_LE_GIA_HAN_GOI_DAI_KY.DLA_T01 &&
                  PLAN_TI_LE_GIA_HAN_GOI_DAI_KY.DLA_T01 ? (
                  convertToFloat2Fixed(
                    (EXEC_TI_LE_GIA_HAN_GOI_DAI_KY.DLA_T01 * 100) /
                      PLAN_TI_LE_GIA_HAN_GOI_DAI_KY.DLA_T01
                  ) + "%"
                ) : (
                  ""
                )}
              </td>
              <td
                className={
                  (convertToNumber(EXEC_TI_LE_GIA_HAN_GOI_DAI_KY.DLA_T02) *
                    100) /
                    convertToNumberMauso(
                      PLAN_TI_LE_GIA_HAN_GOI_DAI_KY.DLA_T02
                    ) >
                  processKPI
                    ? "bg-green"
                    : "bg-red"
                }
              >
                {loadingExec || loadingPlan ? (
                  <LoadingComponent />
                ) : EXEC_TI_LE_GIA_HAN_GOI_DAI_KY.DLA_T02 &&
                  PLAN_TI_LE_GIA_HAN_GOI_DAI_KY.DLA_T02 ? (
                  convertToFloat2Fixed(
                    (EXEC_TI_LE_GIA_HAN_GOI_DAI_KY.DLA_T02 * 100) /
                      PLAN_TI_LE_GIA_HAN_GOI_DAI_KY.DLA_T02
                  ) + "%"
                ) : (
                  ""
                )}
              </td>
              <td
                className={
                  (convertToNumber(EXEC_TI_LE_GIA_HAN_GOI_DAI_KY.DLA_T03) *
                    100) /
                    convertToNumberMauso(
                      PLAN_TI_LE_GIA_HAN_GOI_DAI_KY.DLA_T03
                    ) >
                  processKPI
                    ? "bg-green"
                    : "bg-red"
                }
              >
                {loadingExec || loadingPlan ? (
                  <LoadingComponent />
                ) : EXEC_TI_LE_GIA_HAN_GOI_DAI_KY.DLA_T03 &&
                  PLAN_TI_LE_GIA_HAN_GOI_DAI_KY.DLA_T03 ? (
                  convertToFloat2Fixed(
                    (EXEC_TI_LE_GIA_HAN_GOI_DAI_KY.DLA_T03 * 100) /
                      PLAN_TI_LE_GIA_HAN_GOI_DAI_KY.DLA_T03
                  ) + "%"
                ) : (
                  ""
                )}
              </td>
              <td
                className={
                  (convertToNumber(EXEC_TI_LE_GIA_HAN_GOI_DAI_KY.DLA_T04) *
                    100) /
                    convertToNumberMauso(
                      PLAN_TI_LE_GIA_HAN_GOI_DAI_KY.DLA_T04
                    ) >
                  processKPI
                    ? "bg-green"
                    : "bg-red"
                }
              >
                {loadingExec || loadingPlan ? (
                  <LoadingComponent />
                ) : EXEC_TI_LE_GIA_HAN_GOI_DAI_KY.DLA_T04 &&
                  PLAN_TI_LE_GIA_HAN_GOI_DAI_KY.DLA_T04 ? (
                  convertToFloat2Fixed(
                    (EXEC_TI_LE_GIA_HAN_GOI_DAI_KY.DLA_T04 * 100) /
                      PLAN_TI_LE_GIA_HAN_GOI_DAI_KY.DLA_T04
                  ) + "%"
                ) : (
                  ""
                )}
              </td>
              <td
                className={
                  (convertToNumber(EXEC_TI_LE_GIA_HAN_GOI_DAI_KY.DLA_T05) *
                    100) /
                    convertToNumberMauso(
                      PLAN_TI_LE_GIA_HAN_GOI_DAI_KY.DLA_T05
                    ) >
                  processKPI
                    ? "bg-green"
                    : "bg-red"
                }
              >
                {loadingExec || loadingPlan ? (
                  <LoadingComponent />
                ) : EXEC_TI_LE_GIA_HAN_GOI_DAI_KY.DLA_T05 &&
                  PLAN_TI_LE_GIA_HAN_GOI_DAI_KY.DLA_T05 ? (
                  convertToFloat2Fixed(
                    (EXEC_TI_LE_GIA_HAN_GOI_DAI_KY.DLA_T05 * 100) /
                      PLAN_TI_LE_GIA_HAN_GOI_DAI_KY.DLA_T05
                  ) + "%"
                ) : (
                  ""
                )}
              </td>
              <td
                className={
                  (convertToNumber(EXEC_TI_LE_GIA_HAN_GOI_DAI_KY.DLA_T06) *
                    100) /
                    convertToNumberMauso(
                      PLAN_TI_LE_GIA_HAN_GOI_DAI_KY.DLA_T06
                    ) >
                  processKPI
                    ? "bg-green"
                    : "bg-red"
                }
              >
                {loadingExec || loadingPlan ? (
                  <LoadingComponent />
                ) : EXEC_TI_LE_GIA_HAN_GOI_DAI_KY.DLA_T06 &&
                  PLAN_TI_LE_GIA_HAN_GOI_DAI_KY.DLA_T06 ? (
                  convertToFloat2Fixed(
                    (EXEC_TI_LE_GIA_HAN_GOI_DAI_KY.DLA_T06 * 100) /
                      PLAN_TI_LE_GIA_HAN_GOI_DAI_KY.DLA_T06
                  ) + "%"
                ) : (
                  ""
                )}
              </td>
              <td
                className={
                  (convertToNumber(EXEC_TI_LE_GIA_HAN_GOI_DAI_KY.DLA_T07) *
                    100) /
                    convertToNumberMauso(
                      PLAN_TI_LE_GIA_HAN_GOI_DAI_KY.DLA_T07
                    ) >
                  processKPI
                    ? "bg-green"
                    : "bg-red"
                }
              >
                {loadingExec || loadingPlan ? (
                  <LoadingComponent />
                ) : EXEC_TI_LE_GIA_HAN_GOI_DAI_KY.DLA_T07 &&
                  PLAN_TI_LE_GIA_HAN_GOI_DAI_KY.DLA_T07 ? (
                  convertToFloat2Fixed(
                    (EXEC_TI_LE_GIA_HAN_GOI_DAI_KY.DLA_T07 * 100) /
                      PLAN_TI_LE_GIA_HAN_GOI_DAI_KY.DLA_T07
                  ) + "%"
                ) : (
                  ""
                )}
              </td>
              <td
                className={
                  (convertToNumber(EXEC_TI_LE_GIA_HAN_GOI_DAI_KY.DLA_T08) *
                    100) /
                    convertToNumberMauso(
                      PLAN_TI_LE_GIA_HAN_GOI_DAI_KY.DLA_T08
                    ) >
                  processKPI
                    ? "bg-green"
                    : "bg-red"
                }
              >
                {loadingExec || loadingPlan ? (
                  <LoadingComponent />
                ) : EXEC_TI_LE_GIA_HAN_GOI_DAI_KY.DLA_T08 &&
                  PLAN_TI_LE_GIA_HAN_GOI_DAI_KY.DLA_T08 ? (
                  convertToFloat2Fixed(
                    (EXEC_TI_LE_GIA_HAN_GOI_DAI_KY.DLA_T08 * 100) /
                      PLAN_TI_LE_GIA_HAN_GOI_DAI_KY.DLA_T08
                  ) + "%"
                ) : (
                  ""
                )}
              </td>
              <td
                className={
                  (convertToNumber(EXEC_TI_LE_GIA_HAN_GOI_DAI_KY.DLA_T09) *
                    100) /
                    convertToNumberMauso(
                      PLAN_TI_LE_GIA_HAN_GOI_DAI_KY.DLA_T09
                    ) >
                  processKPI
                    ? "bg-green"
                    : "bg-red"
                }
              >
                {loadingExec || loadingPlan ? (
                  <LoadingComponent />
                ) : EXEC_TI_LE_GIA_HAN_GOI_DAI_KY.DLA_T09 &&
                  PLAN_TI_LE_GIA_HAN_GOI_DAI_KY.DLA_T09 ? (
                  convertToFloat2Fixed(
                    (EXEC_TI_LE_GIA_HAN_GOI_DAI_KY.DLA_T09 * 100) /
                      PLAN_TI_LE_GIA_HAN_GOI_DAI_KY.DLA_T09
                  ) + "%"
                ) : (
                  ""
                )}
              </td>
              <td
                className={
                  (convertToNumber(EXEC_TI_LE_GIA_HAN_GOI_DAI_KY.DLA_T10) *
                    100) /
                    convertToNumberMauso(
                      PLAN_TI_LE_GIA_HAN_GOI_DAI_KY.DLA_T10
                    ) >
                  processKPI
                    ? "bg-green"
                    : "bg-red"
                }
              >
                {loadingExec || loadingPlan ? (
                  <LoadingComponent />
                ) : EXEC_TI_LE_GIA_HAN_GOI_DAI_KY.DLA_T10 &&
                  PLAN_TI_LE_GIA_HAN_GOI_DAI_KY.DLA_T10 ? (
                  convertToFloat2Fixed(
                    (EXEC_TI_LE_GIA_HAN_GOI_DAI_KY.DLA_T10 * 100) /
                      PLAN_TI_LE_GIA_HAN_GOI_DAI_KY.DLA_T10
                  ) + "%"
                ) : (
                  ""
                )}
              </td>
              <td
                className={
                  (convertToNumber(EXEC_TI_LE_GIA_HAN_GOI_DAI_KY.DLA_T11) *
                    100) /
                    convertToNumberMauso(
                      PLAN_TI_LE_GIA_HAN_GOI_DAI_KY.DLA_T11
                    ) >
                  processKPI
                    ? "bg-green"
                    : "bg-red"
                }
              >
                {loadingExec || loadingPlan ? (
                  <LoadingComponent />
                ) : EXEC_TI_LE_GIA_HAN_GOI_DAI_KY.DLA_T11 &&
                  PLAN_TI_LE_GIA_HAN_GOI_DAI_KY.DLA_T11 ? (
                  convertToFloat2Fixed(
                    (EXEC_TI_LE_GIA_HAN_GOI_DAI_KY.DLA_T11 * 100) /
                      PLAN_TI_LE_GIA_HAN_GOI_DAI_KY.DLA_T11
                  ) + "%"
                ) : (
                  ""
                )}
              </td>
              <td
                className={
                  (convertToNumber(EXEC_TI_LE_GIA_HAN_GOI_DAI_KY.DLA_T12) *
                    100) /
                    convertToNumberMauso(
                      PLAN_TI_LE_GIA_HAN_GOI_DAI_KY.DLA_T12
                    ) >
                  processKPI
                    ? "bg-green"
                    : "bg-red"
                }
              >
                {loadingExec || loadingPlan ? (
                  <LoadingComponent />
                ) : EXEC_TI_LE_GIA_HAN_GOI_DAI_KY.DLA_T12 &&
                  PLAN_TI_LE_GIA_HAN_GOI_DAI_KY.DLA_T12 ? (
                  convertToFloat2Fixed(
                    (EXEC_TI_LE_GIA_HAN_GOI_DAI_KY.DLA_T12 * 100) /
                      PLAN_TI_LE_GIA_HAN_GOI_DAI_KY.DLA_T12
                  ) + "%"
                ) : (
                  ""
                )}
              </td>
              <td
                className={
                  (convertToNumber(EXEC_TI_LE_GIA_HAN_GOI_DAI_KY.DLA_T13) *
                    100) /
                    convertToNumberMauso(
                      PLAN_TI_LE_GIA_HAN_GOI_DAI_KY.DLA_T13
                    ) >
                  processKPI
                    ? "bg-green"
                    : "bg-red"
                }
              >
                {loadingExec || loadingPlan ? (
                  <LoadingComponent />
                ) : EXEC_TI_LE_GIA_HAN_GOI_DAI_KY.DLA_T13 &&
                  PLAN_TI_LE_GIA_HAN_GOI_DAI_KY.DLA_T13 ? (
                  convertToFloat2Fixed(
                    (EXEC_TI_LE_GIA_HAN_GOI_DAI_KY.DLA_T13 * 100) /
                      PLAN_TI_LE_GIA_HAN_GOI_DAI_KY.DLA_T13
                  ) + "%"
                ) : (
                  ""
                )}
              </td>
              <td
                className={
                  (convertToNumber(EXEC_TI_LE_GIA_HAN_GOI_DAI_KY.DLA_D01) *
                    100) /
                    convertToNumberMauso(
                      PLAN_TI_LE_GIA_HAN_GOI_DAI_KY.DLA_D01
                    ) >
                  processKPI
                    ? "bg-green"
                    : "bg-red"
                }
              >
                {loadingExec || loadingPlan ? (
                  <LoadingComponent />
                ) : EXEC_TI_LE_GIA_HAN_GOI_DAI_KY.DLA_D01 &&
                  PLAN_TI_LE_GIA_HAN_GOI_DAI_KY.DLA_D01 ? (
                  convertToFloat2Fixed(
                    (EXEC_TI_LE_GIA_HAN_GOI_DAI_KY.DLA_D01 * 100) /
                      PLAN_TI_LE_GIA_HAN_GOI_DAI_KY.DLA_D01
                  ) + "%"
                ) : (
                  ""
                )}
              </td>
              <td
                className={
                  (convertToNumber(EXEC_TI_LE_GIA_HAN_GOI_DAI_KY.DLA_D02) *
                    100) /
                    convertToNumberMauso(
                      PLAN_TI_LE_GIA_HAN_GOI_DAI_KY.DLA_D02
                    ) >
                  processKPI
                    ? "bg-green"
                    : "bg-red"
                }
              >
                {loadingExec || loadingPlan ? (
                  <LoadingComponent />
                ) : EXEC_TI_LE_GIA_HAN_GOI_DAI_KY.DLA_D02 &&
                  EXEC_TI_LE_GIA_HAN_GOI_DAI_KY.DLA_D02 ? (
                  convertToFloat2Fixed(
                    (EXEC_TI_LE_GIA_HAN_GOI_DAI_KY.DLA_D02 * 100) /
                      EXEC_TI_LE_GIA_HAN_GOI_DAI_KY.DLA_D02
                  ) + "%"
                ) : (
                  ""
                )}
              </td>
              <td
                className={
                  (convertToNumber(EXEC_TI_LE_GIA_HAN_GOI_DAI_KY.DLA_D03) *
                    100) /
                    convertToNumberMauso(
                      PLAN_TI_LE_GIA_HAN_GOI_DAI_KY.DLA_D03
                    ) >
                  processKPI
                    ? "bg-green"
                    : "bg-red"
                }
              >
                {loadingExec || loadingPlan ? (
                  <LoadingComponent />
                ) : EXEC_TI_LE_GIA_HAN_GOI_DAI_KY.DLA_D03 &&
                  PLAN_TI_LE_GIA_HAN_GOI_DAI_KY.DLA_D03 ? (
                  convertToFloat2Fixed(
                    (EXEC_TI_LE_GIA_HAN_GOI_DAI_KY.DLA_D03 * 100) /
                      PLAN_TI_LE_GIA_HAN_GOI_DAI_KY.DLA_D03
                  ) + "%"
                ) : (
                  ""
                )}
              </td>
              <td
                className={
                  (convertToNumber(EXEC_TI_LE_GIA_HAN_GOI_DAI_KY.DLA_D04) *
                    100) /
                    convertToNumberMauso(
                      PLAN_TI_LE_GIA_HAN_GOI_DAI_KY.DLA_D04
                    ) >
                  processKPI
                    ? "bg-green"
                    : "bg-red"
                }
              >
                {loadingExec || loadingPlan ? (
                  <LoadingComponent />
                ) : EXEC_TI_LE_GIA_HAN_GOI_DAI_KY.DLA_D04 &&
                  PLAN_TI_LE_GIA_HAN_GOI_DAI_KY.DLA_D04 ? (
                  convertToFloat2Fixed(
                    (EXEC_TI_LE_GIA_HAN_GOI_DAI_KY.DLA_D04 * 100) /
                      PLAN_TI_LE_GIA_HAN_GOI_DAI_KY.DLA_D04
                  ) + "%"
                ) : (
                  ""
                )}
              </td>
              <td
                className={
                  (convertToNumber(EXEC_TI_LE_GIA_HAN_GOI_DAI_KY.DLA_D05) *
                    100) /
                    convertToNumberMauso(
                      PLAN_TI_LE_GIA_HAN_GOI_DAI_KY.DLA_D05
                    ) >
                  processKPI
                    ? "bg-green"
                    : "bg-red"
                }
              >
                {loadingExec || loadingPlan ? (
                  <LoadingComponent />
                ) : EXEC_TI_LE_GIA_HAN_GOI_DAI_KY.DLA_D05 &&
                  PLAN_TI_LE_GIA_HAN_GOI_DAI_KY.DLA_D05 ? (
                  convertToFloat2Fixed(
                    (EXEC_TI_LE_GIA_HAN_GOI_DAI_KY.DLA_D05 * 100) /
                      PLAN_TI_LE_GIA_HAN_GOI_DAI_KY.DLA_D05
                  ) + "%"
                ) : (
                  ""
                )}
              </td>
              <td
                className={
                  (convertToNumber(EXEC_TI_LE_GIA_HAN_GOI_DAI_KY.DLA_D06) *
                    100) /
                    convertToNumberMauso(
                      PLAN_TI_LE_GIA_HAN_GOI_DAI_KY.DLA_D06
                    ) >
                  processKPI
                    ? "bg-green"
                    : "bg-red"
                }
              >
                {loadingExec || loadingPlan ? (
                  <LoadingComponent />
                ) : EXEC_TI_LE_GIA_HAN_GOI_DAI_KY.DLA_D06 &&
                  PLAN_TI_LE_GIA_HAN_GOI_DAI_KY.DLA_D06 ? (
                  convertToFloat2Fixed(
                    (EXEC_TI_LE_GIA_HAN_GOI_DAI_KY.DLA_D06 * 100) /
                      PLAN_TI_LE_GIA_HAN_GOI_DAI_KY.DLA_D06
                  ) + "%"
                ) : (
                  ""
                )}
              </td>
              <td
                className={
                  (convertToNumber(EXEC_TI_LE_GIA_HAN_GOI_DAI_KY.TTKDVT) *
                    100) /
                    convertToNumberMauso(PLAN_TI_LE_GIA_HAN_GOI_DAI_KY.TTKDVT) >
                  processKPI
                    ? "bg-green"
                    : "bg-red"
                }
              >
                {loadingExec || loadingPlan ? (
                  <LoadingComponent />
                ) : EXEC_TI_LE_GIA_HAN_GOI_DAI_KY.TTKDVT &&
                  PLAN_TI_LE_GIA_HAN_GOI_DAI_KY.TTKDVT ? (
                  convertToFloat2Fixed(
                    (EXEC_TI_LE_GIA_HAN_GOI_DAI_KY.TTKDVT * 100) /
                      PLAN_TI_LE_GIA_HAN_GOI_DAI_KY.TTKDVT
                  ) + "%"
                ) : (
                  ""
                )}
              </td>
              <td
              // className={
              //   (convertToNumber(EXEC_TI_LE_GIA_HAN_GOI_DAI_KY.TTKDGPS) *
              //     100) /
              //     convertToNumberMauso(
              //       PLAN_TI_LE_GIA_HAN_GOI_DAI_KY.TTKDGPS
              //     ) >
              //   processKPI
              //     ? "bg-green"
              //     : "bg-red"
              // }
              >
                {loadingExec || loadingPlan ? (
                  <LoadingComponent />
                ) : EXEC_TI_LE_GIA_HAN_GOI_DAI_KY.TTKDGPS &&
                  PLAN_TI_LE_GIA_HAN_GOI_DAI_KY.TTKDGPS ? (
                  convertToFloat2Fixed(
                    (EXEC_TI_LE_GIA_HAN_GOI_DAI_KY.TTKDGPS * 100) /
                      PLAN_TI_LE_GIA_HAN_GOI_DAI_KY.TTKDGPS
                  ) + "%"
                ) : (
                  ""
                )}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
});
export default TableDashboardT12;
