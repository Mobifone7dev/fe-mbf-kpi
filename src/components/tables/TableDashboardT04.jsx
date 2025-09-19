/* eslint-disable react/display-name */
import React, {
  useState,
  useEffect,
  useRef,
  forwardRef,
  useImperativeHandle,
} from "react";
import LoadingComponent from "@components/loading/LoadingComponent";
import { kpiData } from "../../lib/rawData.ts";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  convertToFloat2Fixed,
  getFormattedDate,
  convertToFloat2FixedNumber,
  daysInMonth,
  changeFormatDateFirstDateInMonth,
} from "../../until/functions.js";
import {
  handleGetExecKpiExcel,
} from "../../lib/api";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
const TableDashboardT04 = forwardRef((props, ref) => {
  const [PLAN_DTHU_TKC_HTS, SET_PLAN_DTHU_TKC_HTS] = useState({});
  const [PLAN_DTHU_CLOUD_DC, SET_PLAN_DTHU_CLOUD_DC] = useState({});
  const [PLAN_DTHU_MASS, SET_PLAN_DTHU_MASS] = useState({});
  const [PLAN_DTHU_DUAN, SET_PLAN_DTHU_DUAN] = useState({});
  const [PLAN_DTHU_NDS, SET_PLAN_DTHU_NDS] = useState({});
  const [PLAN_DTHU_SAYMEE, SET_PLAN_DTHU_SAYMEE] = useState({});
  const [PLAN_DTHU_GPS, SET_PLAN_DTHU_GPS] = useState({});
  const [PLAN_SL_C2C, SET_PLAN_SL_C2C] = useState({});
  const [PLAN_SL_TB_C2C, SET_PLAN_SL_TB_C2C] = useState({});
  const [PLAN_TYLE_GD_C2C, SET_PLAN_TYLE_GD_C2C] = useState({});
  const [PLAN_SL_PTM_TBTT_HTS, SET_PLAN_SL_PTM_TBTT_HTS] = useState({});
  const [PLAN_SL_PTM_TBTT_NDS, SET_PLAN_SL_PTM_TBTT_NDS] = useState({});
  const [PLAN_SL_TBTS_PTM_THOAI, SET_PLAN_SL_TBTS_PTM_THOAI] = useState({});
  const [PLAN_SL_TB_PTM_M2M, SET_PLAN_SL_TB_PTM_M2M] = useState({});
  const [PLAN_TB_PTM_SAYMEE, SET_PLAN_TB_PTM_SAYMEE] = useState({});
  const [PLAN_TB_PTM_FIBER, SET_PLAN_TB_PTM_FIBER] = useState({});
  const [PLAN_TB_VLR, SET_PLAN_TB_VLR] = useState({});
  const [PLAN_TB_PSC, SET_PLAN_TB_PSC] = useState({});
  const [PLAN_TB_PLAT_TT, SET_PLAN_TB_PLAT_TT] = useState({});
  const [PLAN_TILE_N_1_GOI, SET_PLAN_TILE_N_1_GOI] = useState({});
  const [PLAN_TILE_N_1_DONKY, SET_PLAN_TILE_N_1_DONKY] = useState({});
  const [PLAN_TILE_N_1_DAIKY, SET_PLAN_TILE_N_1_DAIKY] = useState({});
  const [PLAN_TILE_MNP, SET_PLAN_TILE_MNP] = useState({});
  const [PLAN_SL_HD_GPS_KHDN, SET_PLAN_SL_HD_GPS_KHDN] =
    useState({});
  // kpi thuc hien
  // //////////////////////////////////////////////////////////////
  const [EXEC_DTHU_TKC_HTS, SET_EXEC_DTHU_TKC_HTS] = useState({});
  const [EXEC_DTHU_FIBER, SET_EXEC_DTHU_FIBER] = useState({});
  const [EXEC_DTHU_CLOUD_DC, SET_EXEC_DTHU_CLOUD_DC] = useState({});
  const [EXEC_DTHU_MASS, SET_EXEC_DTHU_MASS] = useState({});
  const [EXEC_DTHU_DUAN, SET_EXEC_DTHU_DUAN] = useState({});
  const [EXEC_DTHU_NDS, SET_EXEC_DTHU_NDS] = useState({});
  const [EXEC_DTHU_GPS, SET_EXEC_DTHU_GPS] = useState({});

  const [EXEC_TB_PTM_FIBER, SET_EXEC_TB_PTM_FIBER] = useState({});
  const [EXEC_DTHU_SAYMEE, SET_EXEC_DTHU_SAYMEE] = useState({});
  const [EXEC_TB_PSC, SET_EXEC_TB_PSC] = useState({});
  const [EXEC_TB_PLAT_TT, SET_EXEC_TB_PLAT_TT] = useState({});
  const [EXEC_SL_TB_PTM_M2M, SET_EXEC_SL_TB_PTM_M2M] = useState({});
  const [EXEC_TYLE_GD_C2C, SET_EXEC_TYLE_GD_C2C] = useState({});
  const [EXEC_SL_PTM_TBTT_NDS, SET_EXEC_SL_PTM_TBTT_NDS] = useState({});
  const [EXEC_TILE_N_1_GOI, SET_EXEC_TILE_N_1_GOI] = useState({});
  const [EXEC_TILE_N_1_DONKY, SET_EXEC_TILE_N_1_DONKY] = useState({});
  const [EXEC_TILE_N_1_DAIKY, SET_EXEC_TILE_N_1_DAIKY] = useState({});
  const [EXEC_SL_TBTS_PTM_THOAI, SET_EXEC_SL_TBTS_PTM_THOAI] = useState({});
  const [EXEC_TB_PTM_SAYMEE, SET_EXEC_TB_PTM_SAYMEE] = useState({});
  const [EXEC_TB_VLR, SET_EXEC_TB_VLR] = useState({});
  const [EXEC_SL_TB_C2C, SET_EXEC_SL_TB_C2C] = useState({});
  const [EXEC_SL_PTM_TBTT_HTS, SET_EXEC_SL_PTM_TBTT_HTS] = useState({});
  const [EXEC_TILE_MNP, SET_EXEC_TILE_MNP] = useState({});
  const [EXEC_SL_C2C, SET_EXEC_SL_C2C] = useState({});
  const [EXEC_SL_HD_GPS_KHDN, SET_EXEC_SL_HD_GPS_KHDN] = useState({});

  const [isSticky, setIsSticky] = useState(props.isSticky);
  const [kpiPointKHO, setKpiPointKHO] = useState(8); //bao gom co 2 chi tieu th chi dao cua lddv và tang truong doanh thu quan tri 5+3
  const [kpiPointDLA, setKpiPointDLA] = useState(0);
  const [kpoPointGLA, setKpiPointGLA] = useState(0);
  const [kpoPointPYE, setKpiPointPYE] = useState(0);
  const [kpoPointDNO, setKpiPointDNO] = useState(0);
  const [kpoPointKON, setKpiPointKON] = useState(0);
  const [kpoPointCTY7, setKpiPointCTY7] = useState(0);
  const [planData, setPlanData] = useState(props.planData);
  const [loadingPlan, setLoadingPlan] = useState(props.loadingPlan);
  const [loadingExec, setLoadingExec] = useState(props.loadingExec);
  const [execData, setExecData] = useState(props.execData);
  const [selectedDate, setSelectedDate] = useState(props.selectedDate);
  const [sumDateInMonth, setSumDateInMonth] = useState(props.sumDateInMonth);
  useEffect(() => {
    setIsSticky(props.isSticky);
  }, [props.isSticky]);

  useEffect(() => {
    setLoadingPlan(props.loadingPlan);
  }, [props.loadingPlan]);

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
      SET_PLAN_DTHU_CLOUD_DC({});
      SET_PLAN_DTHU_MASS({});
      SET_PLAN_DTHU_DUAN({});
      SET_PLAN_DTHU_NDS({});
      SET_PLAN_DTHU_SAYMEE({});
      SET_PLAN_DTHU_GPS({});
      SET_PLAN_SL_C2C({});
      SET_PLAN_SL_TB_C2C({});
      SET_PLAN_TYLE_GD_C2C({});
      SET_PLAN_SL_PTM_TBTT_HTS({});
      SET_PLAN_SL_PTM_TBTT_NDS({});
      SET_PLAN_SL_TBTS_PTM_THOAI({});
      SET_PLAN_SL_TB_PTM_M2M({});
      SET_PLAN_TB_PTM_SAYMEE({});
      SET_PLAN_TB_PTM_FIBER({});
      SET_PLAN_TB_VLR({});
      SET_PLAN_TB_PSC({});
      SET_PLAN_TB_PLAT_TT({});
      SET_PLAN_TILE_N_1_GOI({});
      SET_PLAN_TILE_N_1_DONKY({});
      SET_PLAN_TILE_N_1_DAIKY({});
      SET_PLAN_TILE_MNP({});
      SET_PLAN_SL_C2C({});
      SET_PLAN_SL_HD_GPS_KHDN({});
      SET_PLAN_DTHU_CLOUD_DC({});
      SET_PLAN_DTHU_GPS({});
      SET_PLAN_DTHU_MASS({});
      SET_PLAN_DTHU_DUAN({});
      SET_PLAN_SL_TBTS_PTM_THOAI({});
      SET_PLAN_SL_HD_GPS_KHDN({});
    },
    resetExec() {
      SET_EXEC_DTHU_TKC_HTS({});
      SET_EXEC_DTHU_CLOUD_DC({});
      SET_EXEC_TB_PTM_FIBER({});
      SET_EXEC_DTHU_SAYMEE({});
      SET_EXEC_TB_PSC({});
      SET_EXEC_DTHU_NDS({});
      SET_EXEC_SL_TB_PTM_M2M({});
      SET_EXEC_TYLE_GD_C2C({});
      SET_EXEC_SL_PTM_TBTT_NDS({});
      SET_EXEC_TILE_N_1_GOI({});
      SET_EXEC_TILE_N_1_DONKY({});
      SET_EXEC_TILE_N_1_DAIKY({});
      SET_EXEC_SL_TBTS_PTM_THOAI({});
      SET_EXEC_TB_PTM_SAYMEE({});
      SET_EXEC_TB_VLR({});
      SET_EXEC_SL_TB_C2C({});
      SET_EXEC_SL_PTM_TBTT_HTS({});
      SET_EXEC_TILE_MNP({});
      SET_EXEC_SL_C2C({});
      SET_EXEC_SL_HD_GPS_KHDN({});
      SET_EXEC_DTHU_CLOUD_DC({});
      SET_EXEC_DTHU_GPS({});
      SET_EXEC_DTHU_MASS({});
      SET_EXEC_DTHU_DUAN({});
      SET_EXEC_SL_TBTS_PTM_THOAI({});
      SET_EXEC_SL_HD_GPS_KHDN({});
    },
    caculateKpiKHO() {
      handleCaculateKpiKHO();
    },
  }));
  useEffect(() => {
    if (planData.result && planData.result?.length > 0) {
      planData.result.forEach((object, index) => {
        if (object["TEN_CHI_TIEU"] == "DTHU_TKC_HTS") {
          SET_PLAN_DTHU_TKC_HTS(object);
        }
        if (object["TEN_CHI_TIEU"] == "DTHU_CLOUD_DC") {
          SET_PLAN_DTHU_CLOUD_DC(object);
        }
        if (object["TEN_CHI_TIEU"] == "DTHU_MASS") {
          SET_PLAN_DTHU_MASS(object);
        }
        if (object["TEN_CHI_TIEU"] == "DTHU_DUAN") {
          SET_PLAN_DTHU_DUAN(object);
        }
        if (object["TEN_CHI_TIEU"] == "DTHU_NDS") {
          SET_PLAN_DTHU_NDS(object);
        }
        if (object["TEN_CHI_TIEU"] == "DTHU_SAYMEE") {
          SET_PLAN_DTHU_SAYMEE(object);
        }
        if (object["TEN_CHI_TIEU"] == "DTHU_GPS") {
          SET_PLAN_DTHU_GPS(object);
        }
        if (object["TEN_CHI_TIEU"] == "SL_C2C") {
          SET_PLAN_SL_C2C(object);
        }
        if (object["TEN_CHI_TIEU"] == "SL_HD_GPS_KHDN") {
            SET_PLAN_SL_HD_GPS_KHDN(object);
          }
        if (object["TEN_CHI_TIEU"] == "SL_TB_C2C") {
          SET_PLAN_SL_TB_C2C(object);
        }

        if (object["TEN_CHI_TIEU"] == "TYLE_GD_C2C") {
          SET_PLAN_TYLE_GD_C2C(object);
        }
        if (object["TEN_CHI_TIEU"] == "SL_PTM_TBTT_HTS") {
          SET_PLAN_SL_PTM_TBTT_HTS(object);
        }
        if (object["TEN_CHI_TIEU"] == "SL_PTM_TBTT_NDS") {
          SET_PLAN_SL_PTM_TBTT_NDS(object);
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
        if (object["TEN_CHI_TIEU"] == "TB_VLR") {
          SET_PLAN_TB_VLR(object);
        }
        if (object["TEN_CHI_TIEU"] == "TB_PSC") {
          SET_PLAN_TB_PSC(object);
        }
        if (object["TEN_CHI_TIEU"] == "TB_PLAT_TT") {
          SET_PLAN_TB_PLAT_TT(object);
        }
        if (object["TEN_CHI_TIEU"] == "TILE_N_1_GOI") {
          SET_PLAN_TILE_N_1_GOI(object);
        }
        if (object["TEN_CHI_TIEU"] == "TILE_N_1_DONKY") {
          SET_PLAN_TILE_N_1_DONKY(object);
        }
        if (object["TEN_CHI_TIEU"] == "TI_LE_N_1_DAIKY") {
          SET_PLAN_TILE_N_1_DAIKY(object);
        }

        if (object["TEN_CHI_TIEU"] == "TILE_MNP") {
          SET_PLAN_TILE_MNP(object);
        }
        if (object["TEN_CHI_TIEU"] == "SL_HD_GPS_KHDN") {
          SET_PLAN_SL_HD_GPS_KHDN(object);
        }
      });
    }
  }, [planData]);
  useEffect(() => {
    setPlanData(props.planData);
  }, [props.planData]);
  useEffect(() => {
    setExecData(props.execData);
  }, [props.execData]);

  useEffect(() => {
    if (execData && execData.result?.length > 0) {
      execData.result.forEach((object, index) => {
        if (object["TEN_CHI_TIEU"] == "DTHU_TKC_HTS") {
          SET_EXEC_DTHU_TKC_HTS(object);
        }

        if (object["TEN_CHI_TIEU"] == "DTHU_FIBER") {
          SET_EXEC_DTHU_FIBER(object);
        }
        if (object["TEN_CHI_TIEU"] == "DTHU_CLOUD_DC") {
          SET_EXEC_DTHU_CLOUD_DC(object);
        }
        if (object["TEN_CHI_TIEU"] == "DTHU_MASS") {
          SET_EXEC_DTHU_MASS(object);
        }

        if (object["TEN_CHI_TIEU"] == "DTHU_DUAN") {
          SET_EXEC_DTHU_DUAN(object);
        }

        if (object["TEN_CHI_TIEU"] == "DTHU_NDS") {
          SET_EXEC_DTHU_NDS(object);
        }

        if (object["TEN_CHI_TIEU"] == "DTHU_GPS") {
          SET_EXEC_DTHU_GPS(object);
        }

        if (object["TEN_CHI_TIEU"] == "DTHU_SAYMEE") {
          SET_EXEC_DTHU_SAYMEE(object);
        }

        if (object["TEN_CHI_TIEU"] == "TB_PLAT_TT") {
          SET_EXEC_TB_PLAT_TT(object);
        }

        if (object["TEN_CHI_TIEU"] == "TYLE_GD_C2C") {
          SET_EXEC_TYLE_GD_C2C(object);
        }
        if (object["TEN_CHI_TIEU"] == "SL_PTM_TBTT_HTS") {
          SET_EXEC_SL_PTM_TBTT_HTS(object);
        }
        if (object["TEN_CHI_TIEU"] == "SL_PTM_TBTT_NDS") {
          SET_EXEC_SL_PTM_TBTT_NDS(object);
        }
        if (object["TEN_CHI_TIEU"] == "TB_PTM_SAYMEE") {
          SET_EXEC_TB_PTM_SAYMEE(object);
        }
        if (object["TEN_CHI_TIEU"] == "SL_TBTS_PTM_THOAI") {
          SET_EXEC_SL_TBTS_PTM_THOAI(object);
        }

        if (object["TEN_CHI_TIEU"] == "TB_PTM_FIBER") {
          SET_EXEC_TB_PTM_FIBER(object);
        }

        if (object["TEN_CHI_TIEU"] == "SL_TB_PTM_M2M") {
          SET_EXEC_SL_TB_PTM_M2M(object);
        }
        if (object["TEN_CHI_TIEU"] == "TB_PSC") {
          SET_EXEC_TB_PSC(object);
        }

        if (object["TEN_CHI_TIEU"] == "TB_VLR") {
          SET_EXEC_TB_VLR(object);
        }

        if (object["TEN_CHI_TIEU"] == "TILE_N_1_GOI") {
          SET_EXEC_TILE_N_1_GOI(object);
        }

        if (object["TEN_CHI_TIEU"] == "TILE_N_1_DONKY") {
          SET_EXEC_TILE_N_1_DONKY(object);
        }
        if (object["TEN_CHI_TIEU"] == "TI_LE_N_1_DAIKY") {
          SET_EXEC_TILE_N_1_DAIKY(object);
        }

        if (object["TEN_CHI_TIEU"] == "SL_TB_C2C") {
          SET_EXEC_SL_TB_C2C(object);
        }

        if (object["TEN_CHI_TIEU"] == "SL_C2C") {
          SET_EXEC_SL_C2C(object);
        }
        if (object["TEN_CHI_TIEU"] == "SL_HD_GPS_KHDN") {
            SET_EXEC_SL_HD_GPS_KHDN(object);
          }

        if (object["TEN_CHI_TIEU"] == "TILE_MNP") {
          SET_EXEC_TILE_MNP(object);
        }

        if (object["TEN_CHI_TIEU"] == "SL_HD_GPS_KHDN") {
          SET_EXEC_SL_HD_GPS_KHDN(object);
        }
      });
    }
  }, [execData]);

  const handleCaculateKpiKHO = () => {
    if (!loadingExec && !loadingPlan) {
      let sumKpiKHO = 8;
      kpiData.forEach((object, index) => {
        if (object.nameKpi == "DTHU_TKC_HTS") {
          const uocTh = parseFloat(
            ((EXEC_DTHU_TKC_HTS.KHO /
              (new Date(
                selectedDate.getFullYear(),
                selectedDate.getMonth() + 1,
                0
              ) < new Date(EXEC_DTHU_TKC_HTS.LAST_DATE)
                ? sumDateInMonth
                : new Date(EXEC_DTHU_TKC_HTS.LAST_DATE).getDate())) *
              sumDateInMonth *
              100) /
              (PLAN_DTHU_TKC_HTS.KHO * 1000000)
          );

          const kpiDthuTKCHTS =
            PLAN_DTHU_TKC_HTS.KHO == 0
              ? (object.point * object.maxPercent) / 100
              : uocTh > 120
              ? (object.point * object.maxPercent) / 100
              : (uocTh / 100) * object.point;
          sumKpiKHO += kpiDthuTKCHTS;
        }
        if (object.nameKpi == "DTHU_CLOUD_DC") {
          const uocTh = parseFloat(
            ((EXEC_DTHU_CLOUD_DC.KHO /
              (new Date(
                selectedDate.getFullYear(),
                selectedDate.getMonth() + 1,
                0
              ) < new Date(EXEC_DTHU_CLOUD_DC.LAST_DATE)
                ? sumDateInMonth
                : new Date(EXEC_DTHU_CLOUD_DC.LAST_DATE).getDate())) *
              sumDateInMonth *
              100) /
              (PLAN_DTHU_CLOUD_DC.KHO * 1000000)
          );
          const kpiDthuFiber =
            PLAN_DTHU_CLOUD_DC.KHO == 0
              ? (object.point * object.maxPercent) / 100
              : uocTh > 120
              ? (object.point * object.maxPercent) / 100
              : (uocTh / 100) * object.point;
          sumKpiKHO += kpiDthuFiber;
        }
        if (object.nameKpi == "DTHU_DUAN") {
          const uocTh = parseFloat(
            ((EXEC_DTHU_DUAN.KHO /
              (new Date(
                selectedDate.getFullYear(),
                selectedDate.getMonth() + 1,
                0
              ) < new Date(EXEC_DTHU_DUAN.LAST_DATE)
                ? sumDateInMonth
                : new Date(EXEC_DTHU_DUAN.LAST_DATE).getDate())) *
              sumDateInMonth *
              100) /
              (PLAN_DTHU_DUAN.KHO * 1000000)
          );
          const kpiDthuDuan =
            PLAN_DTHU_DUAN.KHO == 0
              ? (object.point * object.maxPercent) / 100
              : uocTh > 120
              ? (object.point * object.maxPercent) / 100
              : (uocTh / 100) * object.point;
          sumKpiKHO += kpiDthuDuan;
        }
        if (object.nameKpi == "DTHU_MASS") {
          const uocTh = parseFloat(
            ((EXEC_DTHU_MASS.KHO /
              (new Date(
                selectedDate.getFullYear(),
                selectedDate.getMonth() + 1,
                0
              ) < new Date(EXEC_DTHU_MASS.LAST_DATE)
                ? sumDateInMonth
                : new Date(EXEC_DTHU_MASS.LAST_DATE).getDate())) *
              sumDateInMonth *
              100) /
              (PLAN_DTHU_MASS.KHO * 1000000)
          );
          const kpiDthuMass =
            PLAN_DTHU_MASS.KHO == 0
              ? (object.point * object.maxPercent) / 100
              : uocTh > 120
              ? (object.point * object.maxPercent) / 100
              : (uocTh / 100) * object.point;
          sumKpiKHO += kpiDthuMass;
        }
        if (object.nameKpi == "DTHU_GPS") {
          const uocTh = parseFloat(
            ((EXEC_DTHU_GPS.KHO /
              (new Date(
                selectedDate.getFullYear(),
                selectedDate.getMonth() + 1,
                0
              ) < new Date(EXEC_DTHU_GPS.LAST_DATE)
                ? sumDateInMonth
                : new Date(EXEC_DTHU_GPS.LAST_DATE).getDate())) *
              sumDateInMonth *
              100) /
              (PLAN_DTHU_GPS.KHO * 1000000)
          );
          const kpiDthuGps =
            PLAN_DTHU_GPS.KHO == 0
              ? (object.point * object.maxPercent) / 100
              : uocTh > 120
              ? (object.point * object.maxPercent) / 100
              : (uocTh / 100) * object.point;
          sumKpiKHO += kpiDthuGps;
        }
        if (object.nameKpi == "DTHU_NDS") {
          const uocTh = parseFloat(
            ((EXEC_DTHU_NDS.KHO /
              (new Date(
                selectedDate.getFullYear(),
                selectedDate.getMonth() + 1,
                0
              ) < new Date(EXEC_DTHU_NDS.LAST_DATE)
                ? sumDateInMonth
                : new Date(EXEC_DTHU_NDS.LAST_DATE).getDate())) *
              sumDateInMonth *
              100) /
              (PLAN_DTHU_NDS.KHO * 1000000)
          );
          const kpiDthuNds =
            PLAN_DTHU_NDS.KHO == 0
              ? (object.point * object.maxPercent) / 100
              : uocTh > 120
              ? (object.point * object.maxPercent) / 100
              : (uocTh / 100) * object.point;

          sumKpiKHO += kpiDthuNds;
        }

        if (object.nameKpi == "DTHU_SAYMEE") {
          const uocTh = parseFloat(
            ((EXEC_DTHU_SAYMEE.KHO /
              (new Date(
                selectedDate.getFullYear(),
                selectedDate.getMonth() + 1,
                0
              ) < new Date(EXEC_DTHU_SAYMEE.LAST_DATE)
                ? sumDateInMonth
                : new Date(EXEC_DTHU_SAYMEE.LAST_DATE).getDate())) *
              sumDateInMonth *
              100) /
              (PLAN_DTHU_SAYMEE.KHO * 1000000)
          );
          const kpiDthuSaymee =
            PLAN_DTHU_SAYMEE.KHO == 0
              ? (object.point * object.maxPercent) / 100
              : uocTh > 120
              ? (object.point * object.maxPercent) / 100
              : (uocTh / 100) * object.point;
          sumKpiKHO += kpiDthuSaymee;
        }
        if (object.nameKpi == "SL_C2C") {
          const uocTh = parseFloat((EXEC_SL_C2C.KHO * 100) / PLAN_SL_C2C.KHO);
          const kpiSlC2C =
            PLAN_SL_C2C.KHO == 0
              ? (object.point * object.maxPercent) / 100
              : uocTh > 120
              ? (object.point * object.maxPercent) / 100
              : (uocTh / 100) * object.point;
          sumKpiKHO += kpiSlC2C;
        }
        if (object.nameKpi == "SL_TB_C2C") {
          const uocTh = parseFloat(
            ((EXEC_SL_TB_C2C.KHO /
              (new Date(
                selectedDate.getFullYear(),
                selectedDate.getMonth() + 1,
                0
              ) < new Date(EXEC_SL_C2C.LAST_DATE)
                ? sumDateInMonth
                : new Date(EXEC_SL_C2C.LAST_DATE).getDate())) *
              sumDateInMonth *
              100) /
              PLAN_SL_TB_C2C.KHO
          );
          const kpiSlTBC2C =
            PLAN_SL_TB_C2C.KHO == 0
              ? (object.point * object.maxPercent) / 100
              : uocTh > 120
              ? (object.point * object.maxPercent) / 100
              : (uocTh / 100) * object.point;
          sumKpiKHO += kpiSlTBC2C;
        }
        if (object.nameKpi == "TYLE_GD_C2C") {
          const uocTh = parseFloat(
            (EXEC_TYLE_GD_C2C.KHO * 100) / PLAN_TYLE_GD_C2C.KHO
          );
          const kpiTYLEGDC2C =
            PLAN_TYLE_GD_C2C.KHO == 0
              ? (object.point * object.maxPercent) / 100
              : uocTh > 120
              ? (object.point * object.maxPercent) / 100
              : (uocTh / 100) * object.point;
          sumKpiKHO += kpiTYLEGDC2C;
        }
        if (object.nameKpi == "SL_PTM_TBTT_HTS") {
          const uocTh = parseFloat(
            ((EXEC_SL_PTM_TBTT_HTS.KHO /
              (new Date(
                selectedDate.getFullYear(),
                selectedDate.getMonth() + 1,
                0
              ) < new Date(EXEC_SL_PTM_TBTT_HTS.LAST_DATE)
                ? sumDateInMonth
                : new Date(EXEC_SL_PTM_TBTT_HTS.LAST_DATE).getDate())) *
              sumDateInMonth *
              100) /
              PLAN_SL_PTM_TBTT_HTS.KHO
          );
          const kpi_SL_PTM_TBTT_HTS =
            PLAN_SL_PTM_TBTT_HTS.KHO == 0
              ? (object.point * object.maxPercent) / 100
              : uocTh > 120
              ? (object.point * object.maxPercent) / 100
              : (uocTh / 100) * object.point;
          sumKpiKHO += kpi_SL_PTM_TBTT_HTS;
        }

        if (object.nameKpi == "SL_PTM_TBTT_NDS") {
          const uocTh = parseFloat(
            ((EXEC_SL_PTM_TBTT_NDS.KHO /
              (new Date(
                selectedDate.getFullYear(),
                selectedDate.getMonth() + 1,
                0
              ) < new Date(EXEC_SL_PTM_TBTT_NDS.LAST_DATE)
                ? sumDateInMonth
                : new Date(EXEC_SL_PTM_TBTT_NDS.LAST_DATE).getDate())) *
              sumDateInMonth *
              100) /
              PLAN_SL_PTM_TBTT_NDS.KHO
          );
          const kpi_SL_PTM_TBTT_NDS =
            PLAN_SL_PTM_TBTT_NDS.KHO == 0
              ? (object.point * object.maxPercent) / 100
              : uocTh > 120
              ? (object.point * object.maxPercent) / 100
              : (uocTh / 100) * object.point;
          sumKpiKHO += kpi_SL_PTM_TBTT_NDS;
        }

        if (object.nameKpi == "SL_TBTS_PTM_THOAI") {
          const uocTh = parseFloat(
            ((EXEC_SL_TBTS_PTM_THOAI.KHO /
              (new Date(
                selectedDate.getFullYear(),
                selectedDate.getMonth() + 1,
                0
              ) < new Date(EXEC_SL_TBTS_PTM_THOAI.LAST_DATE)
                ? sumDateInMonth
                : new Date(EXEC_SL_TBTS_PTM_THOAI.LAST_DATE).getDate())) *
              sumDateInMonth *
              100) /
              PLAN_SL_TBTS_PTM_THOAI.KHO
          );
          const kpi_SL_TBTS_PTM_THOAI =
            PLAN_SL_TBTS_PTM_THOAI.KHO == 0
              ? (object.point * object.maxPercent) / 100
              : uocTh > 120
              ? (object.point * object.maxPercent) / 100
              : (uocTh / 100) * object.point;
          sumKpiKHO += kpi_SL_TBTS_PTM_THOAI;
        }

        if (object.nameKpi == "SL_TB_PTM_M2M") {
          const uocTh = parseFloat(
            ((EXEC_SL_TB_PTM_M2M.KHO /
              (new Date(
                selectedDate.getFullYear(),
                selectedDate.getMonth() + 1,
                0
              ) < new Date(EXEC_SL_TB_PTM_M2M.LAST_DATE)
                ? sumDateInMonth
                : new Date(EXEC_SL_TB_PTM_M2M.LAST_DATE).getDate())) *
              sumDateInMonth *
              100) /
              PLAN_SL_TB_PTM_M2M.KHO
          );
          const kpi_SL_TB_PTM_M2M =
            PLAN_SL_TB_PTM_M2M.KHO == 0
              ? (object.point * object.maxPercent) / 100
              : uocTh > 120
              ? (object.point * object.maxPercent) / 100
              : (uocTh / 100) * object.point;
          sumKpiKHO += kpi_SL_TB_PTM_M2M;
        }

        if (object.nameKpi == "TB_PTM_SAYMEE") {
          const uocTh = parseFloat(
            ((EXEC_TB_PTM_SAYMEE.KHO /
              (new Date(
                selectedDate.getFullYear(),
                selectedDate.getMonth() + 1,
                0
              ) < new Date(EXEC_TB_PTM_SAYMEE.LAST_DATE)
                ? sumDateInMonth
                : new Date(EXEC_TB_PTM_SAYMEE.LAST_DATE).getDate())) *
              sumDateInMonth *
              100) /
              PLAN_TB_PTM_SAYMEE.KHO
          );
          const kpi_TB_PTM_SAYMEE =
            PLAN_TB_PTM_SAYMEE.KHO == 0
              ? (object.point * object.maxPercent) / 100
              : uocTh > 120
              ? (object.point * object.maxPercent) / 100
              : (uocTh / 100) * object.point;
          sumKpiKHO += kpi_TB_PTM_SAYMEE;
        }

        if (object.nameKpi == "TB_PTM_FIBER") {
          const uocTh = parseFloat(
            ((EXEC_TB_PTM_FIBER.KHO /
              (new Date(
                selectedDate.getFullYear(),
                selectedDate.getMonth() + 1,
                0
              ) < new Date(EXEC_TB_PTM_FIBER.LAST_DATE)
                ? sumDateInMonth
                : new Date(EXEC_TB_PTM_FIBER.LAST_DATE).getDate())) *
              sumDateInMonth *
              100) /
              PLAN_TB_PTM_FIBER.KHO
          );
          const kpi_TB_PTM_FIBER =
            PLAN_TB_PTM_FIBER.KHO == 0
              ? (object.point * object.maxPercent) / 100
              : uocTh > 120
              ? (object.point * object.maxPercent) / 100
              : (uocTh / 100) * object.point;
          sumKpiKHO += kpi_TB_PTM_FIBER;
        }

        if (object.nameKpi == "TB_VLR") {
          const uocTh = parseFloat((EXEC_TB_VLR.KHO * 100) / PLAN_TB_VLR.KHO);
          const kpi_TB_VLR =
            PLAN_TB_VLR.KHO == 0
              ? (object.point * object.maxPercent) / 100
              : uocTh > 120
              ? (object.point * object.maxPercent) / 100
              : (uocTh / 100) * object.point;
          sumKpiKHO += kpi_TB_VLR;
        }

        if (object.nameKpi == "TB_PSC") {
          const uocTh = parseFloat((EXEC_TB_PSC.KHO * 100) / PLAN_TB_PSC.KHO);
          const kpi_TB_PSC =
            PLAN_TB_PSC.KHO == 0
              ? (object.point * object.maxPercent) / 100
              : uocTh > 120
              ? (object.point * object.maxPercent) / 100
              : (uocTh / 100) * object.point;
          sumKpiKHO += kpi_TB_PSC;
        }

        if (object.nameKpi == "TB_PLAT_TT") {
          const uocTh = parseFloat(
            (EXEC_TB_PLAT_TT.KHO * 100) / PLAN_TB_PLAT_TT.KHO
          );
          const kpi_TB_PLAT_TT =
            PLAN_TB_PLAT_TT.KHO == 0
              ? (object.point * object.maxPercent) / 100
              : uocTh > 120
              ? (object.point * object.maxPercent) / 100
              : (uocTh / 100) * object.point;
          sumKpiKHO += kpi_TB_PLAT_TT;
        }
        if (object.nameKpi == "TILE_N_1_GOI") {
          const uocTh = parseFloat(
            (EXEC_TILE_N_1_GOI.KHO * 100) / PLAN_TILE_N_1_GOI.KHO
          );
          const kpi_TILE_N_1_GOI =
            PLAN_TILE_N_1_GOI.KHO == 0
              ? (object.point * object.maxPercent) / 100
              : uocTh > 120
              ? (object.point * object.maxPercent) / 100
              : (uocTh / 100) * object.point;
          sumKpiKHO += kpi_TILE_N_1_GOI;
        }

        if (object.nameKpi == "TILE_N_1_DONKY") {
          const uocTh = parseFloat(
            ((EXEC_TILE_N_1_DONKY.KHO /
              (new Date(
                selectedDate.getFullYear(),
                selectedDate.getMonth() + 1,
                0
              ) < new Date(EXEC_TILE_N_1_DONKY.LAST_DATE)
                ? sumDateInMonth
                : new Date(EXEC_TILE_N_1_DONKY.LAST_DATE).getDate())) *
              sumDateInMonth *
              100) /
              PLAN_TILE_N_1_DONKY.KHO
          );
          const kpi_TILE_N_1_DONKY =
            PLAN_TILE_N_1_DONKY.KHO == 0
              ? (object.point * object.maxPercent) / 100
              : uocTh > 120
              ? (object.point * object.maxPercent) / 100
              : (uocTh / 100) * object.point;

          sumKpiKHO += kpi_TILE_N_1_DONKY;
        }

        if (object.nameKpi == "TILE_N_1_DAIKY") {
          const uocTh = parseFloat(
            ((EXEC_TILE_N_1_DAIKY.KHO /
              (new Date(
                selectedDate.getFullYear(),
                selectedDate.getMonth() + 1,
                0
              ) < new Date(EXEC_TILE_N_1_DAIKY.LAST_DATE)
                ? sumDateInMonth
                : new Date(EXEC_TILE_N_1_DAIKY.LAST_DATE).getDate())) *
              sumDateInMonth *
              100) /
              PLAN_TILE_N_1_DAIKY.KHO
          );
          const kpi_TILE_N_1_DAIKY =
            PLAN_TILE_N_1_DAIKY.KHO == 0
              ? (object.point * object.maxPercent) / 100
              : uocTh > 120
              ? (object.point * object.maxPercent) / 100
              : (uocTh / 100) * object.point;
          sumKpiKHO += kpi_TILE_N_1_DAIKY;
        }

        if (object.nameKpi == "TILE_MNP") {
          const uocTh = parseFloat(
            (EXEC_TILE_MNP.KHO * 100) / PLAN_TILE_MNP.KHO
          );
          const kpi_TILE_MNP =
            PLAN_TILE_MNP.KHO == 0
              ? (object.point * object.maxPercent) / 100
              : uocTh > 120
              ? (object.point * object.maxPercent) / 100
              : (uocTh / 100) * object.point;
          sumKpiKHO += kpi_TILE_MNP;
        }

        if (object.nameKpi == "SL_HD_GPS_KHDN") {
          const uocTh = parseFloat(
            (EXEC_SL_HD_GPS_KHDN.KHO * 100) /
              PLAN_SL_HD_GPS_KHDN.KHO
          );
          const kpi_SL_HD_GPS_KHDN =
            PLAN_SL_HD_GPS_KHDN.KHO == 0
              ? (object.point * object.maxPercent) / 100
              : uocTh > 120
              ? (object.point * object.maxPercent) / 100
              : (uocTh / 100) * object.point;
          sumKpiKHO += kpi_SL_HD_GPS_KHDN;
        }
        setKpiPointKHO(sumKpiKHO);
      });
    }
  };
  const handleDownloadExcel = async (kpiType, provincePt = "") => {
    if (!selectedDate) {
      console.error("🚨 Lỗi: Chưa chọn tháng!");
      alert("Vui lòng chọn tháng trước khi tải Excel.");
      return;
    }

    const formattedMonth = new Date(selectedDate)
      .toLocaleDateString("en-GB", { month: "2-digit", year: "numeric" })
      .replace(" ", "/");

    try {
      alert("🔄 Đang tải file Excel...");

      // 🛠️ Gọi API từ api.ts
      let data = await handleGetExecKpiExcel(
        formattedMonth,
        kpiType,
        provincePt
      );

      console.log("📌 Phản hồi từ API trước khi kiểm tra:", data);

      // Nếu dữ liệu là Response object, cần parse JSON
      if (data instanceof Response) {
        console.warn("⚠️ Dữ liệu từ API là Response object, cần parse JSON");
        data = await data.json();
      }

      console.log("📌 Dữ liệu đã parse JSON:", data);

      // Kiểm tra dữ liệu trả về
      if (
        !data ||
        !data.result ||
        !Array.isArray(data.result) ||
        data.result.length === 0
      ) {
        console.error("🚨 Không có dữ liệu hợp lệ từ API:", data);
        throw new Error("Không có dữ liệu để xuất Excel");
      }

      // ✅ Chuyển đổi JSON thành worksheet
      const worksheet = XLSX.utils.json_to_sheet(data.result);

      // ✅ Tạo workbook và gán worksheet vào
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, "KPI Data");

      // ✅ Lấy thời gian hiện tại để đặt tên file
      const now = new Date();
      const timeStamp = now
        .toLocaleTimeString("en-GB", { hour12: false })
        .replace(/:/g, "-");
      const provinceSuffix = provincePt ? `_${provincePt}` : "";
      const fileName = `KPI_${kpiType}${provinceSuffix}_${formattedMonth.replace(
        "/",
        "-"
      )}_${timeStamp}.xlsx`;

      // ✅ Xuất file Excel
      const excelBuffer = XLSX.write(workbook, {
        bookType: "xlsx",
        type: "array",
      });
      const excelBlob = new Blob([excelBuffer], {
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      });

      // ✅ Lưu file xuống
      saveAs(excelBlob, fileName);
      alert("✅ Tải file Excel thành công!");
      console.log("✅ Tải xuống thành công! File:", fileName);
    } catch (error) {
      alert(`❌ Lỗi khi tải Excel: ${error.message}`);
      console.error("❌ Lỗi khi tải Excel:", error);
    }
  };
  return (
    <div className="table-kpi">
      <table className=" table-responsive  align-middle gs-0 gy-3">
        <thead>
          <tr className={`table-head ${isSticky && "is-sticky"}`}>
            <th>STT</th>
            <th>Nhiệm vụ</th>
            <th>DVT</th>
            <th>Nội dung</th>
            <th className="bg-green-secondary">KHO</th>
            <th className="bg-green-secondary">DLA</th>
            <th className="bg-green-secondary">GLA</th>
            <th className="bg-green-secondary">PYE</th>
            <th className="bg-green-secondary">DNO</th>
            <th className="bg-green-secondary">KON</th>
            <th className="bg-green-secondary">Tổng</th>
            <th className="bg-green-secondary">Đ/v phụ trách</th>
          </tr>
        </thead>
        <tbody className={` ${isSticky && "is-sticky"}`}>
          <tr>
            <td className="text-sub1">I</td>
            <td className="text-sub1" colSpan={11}>
              <span className="text-bold">Viễn cảnh tài chính</span>
            </td>
          </tr>
          <tr>
            <td rowSpan={4} className="text-sub2">
              1
            </td>
            <td rowSpan={4} className="text-sub2 cell-kpi">
              Doanh thu hạ tầng số
            </td>
            <td rowSpan={4} className="kpi-dvt">
              triệu đồng
            </td>
            <td className="text-sub4 kpi-kht">KHT</td>
            <td className="cell-number">
              {loadingPlan ? (
                <LoadingComponent />
              ) : PLAN_DTHU_TKC_HTS.KHO ? (
                convertToFloat2Fixed(PLAN_DTHU_TKC_HTS.KHO)
              ) : (
                ""
              )}
            </td>
            <td className="cell-number">
              {loadingPlan ? (
                <LoadingComponent />
              ) : PLAN_DTHU_TKC_HTS.DLA ? (
                convertToFloat2Fixed(PLAN_DTHU_TKC_HTS.DLA)
              ) : (
                ""
              )}
            </td>
            <td className="cell-number">
              {loadingPlan ? (
                <LoadingComponent />
              ) : PLAN_DTHU_TKC_HTS.GLA ? (
                convertToFloat2Fixed(PLAN_DTHU_TKC_HTS.GLA)
              ) : (
                ""
              )}
            </td>
            <td className="cell-number">
              {loadingPlan ? (
                <LoadingComponent />
              ) : PLAN_DTHU_TKC_HTS.PYE ? (
                convertToFloat2Fixed(PLAN_DTHU_TKC_HTS.PYE)
              ) : (
                ""
              )}
            </td>
            <td className="cell-number">
              {loadingPlan ? (
                <LoadingComponent />
              ) : PLAN_DTHU_TKC_HTS.DNO ? (
                convertToFloat2Fixed(PLAN_DTHU_TKC_HTS.DNO)
              ) : (
                ""
              )}
            </td>
            <td className="cell-number">
              {loadingPlan ? (
                <LoadingComponent />
              ) : PLAN_DTHU_TKC_HTS.KON ? (
                convertToFloat2Fixed(PLAN_DTHU_TKC_HTS.KON)
              ) : (
                ""
              )}
            </td>
            <td className="cell-number">
              {loadingPlan ? (
                <LoadingComponent />
              ) : PLAN_DTHU_TKC_HTS.CTY7 ? (
                convertToFloat2Fixed(PLAN_DTHU_TKC_HTS.CTY7)
              ) : (
                ""
              )}
            </td>
            <td rowSpan={6} className="cell-donviphutrach">
              DVVT
              <br />
              <span>
                {EXEC_DTHU_TKC_HTS.LAST_DATE
                  ? getFormattedDate(new Date(EXEC_DTHU_TKC_HTS.LAST_DATE))
                  : ""}
              </span>
            </td>
          </tr>

          <tr>
            <td className="text-sub4 kpi-thlk">THLK</td>
            <td className="cell-number">
              {loadingExec ? (
                <LoadingComponent />
              ) : EXEC_DTHU_TKC_HTS.KHO ? (
                convertToFloat2Fixed(EXEC_DTHU_TKC_HTS.KHO / 1000000 + (EXEC_DTHU_FIBER.KHO  ? EXEC_DTHU_FIBER.KHO / 1000000: 0)) 
              ) : (
                ""
              )}
            </td>
            <td className="cell-number">
              {loadingExec ? (
                <LoadingComponent />
              ) : EXEC_DTHU_TKC_HTS.DLA ? (
                convertToFloat2Fixed(EXEC_DTHU_TKC_HTS.DLA / 1000000 + (EXEC_DTHU_FIBER.DLA  ? EXEC_DTHU_FIBER.DLA / 1000000: 0)) 
              ) : (
                ""
              )}
            </td>
            <td className="cell-number">
              {loadingExec ? (
                <LoadingComponent />
              ) : EXEC_DTHU_TKC_HTS.GLA ? (
                convertToFloat2Fixed(EXEC_DTHU_TKC_HTS.GLA / 1000000 + + (EXEC_DTHU_FIBER.GLA  ? EXEC_DTHU_FIBER.GLA / 1000000: 0)) 
              ) : (
                ""
              )}
            </td>
            <td className="cell-number">
              {loadingExec ? (
                <LoadingComponent />
              ) : EXEC_DTHU_TKC_HTS.PYE ? (
                convertToFloat2Fixed(EXEC_DTHU_TKC_HTS.PYE / 1000000 + + (EXEC_DTHU_FIBER.PYE  ? EXEC_DTHU_FIBER.PYE / 1000000: 0)) 
              ) : (
                ""
              )}
            </td>
            <td className="cell-number">
              {loadingExec ? (
                <LoadingComponent />
              ) : EXEC_DTHU_TKC_HTS.DNO ? (
                convertToFloat2Fixed(EXEC_DTHU_TKC_HTS.DNO / 1000000 + + (EXEC_DTHU_FIBER.DNO  ? EXEC_DTHU_FIBER.DNO / 1000000: 0)) 
              ) : (
                ""
              )}
            </td>
            <td className="cell-number">
              {loadingExec ? (
                <LoadingComponent />
              ) : EXEC_DTHU_TKC_HTS.KON ? (
                convertToFloat2Fixed(EXEC_DTHU_TKC_HTS.KON / 1000000 + + (EXEC_DTHU_FIBER.KON  ? EXEC_DTHU_FIBER.KON / 1000000: 0)) 
              ) : (
                ""
              )}
            </td>
            <td className="cell-number">
              {loadingExec ? (
                <LoadingComponent />
              ) : EXEC_DTHU_TKC_HTS.CTY7 ? (
                convertToFloat2Fixed(EXEC_DTHU_TKC_HTS.CTY7 / 1000000  + (EXEC_DTHU_FIBER.CTY7  ? EXEC_DTHU_FIBER.CTY7 / 1000000: 0))
              ) : (
                ""
              )}
            </td>
          </tr>
          <tr>
            <td className="text-sub4 kpi-percent-lk">%HTKH </td>
            <td className="cell-number">
              {loadingExec || loadingPlan ? (
                <LoadingComponent />
              ) : EXEC_DTHU_TKC_HTS.KHO && PLAN_DTHU_TKC_HTS.KHO ? (
                convertToFloat2Fixed(
                  (EXEC_DTHU_TKC_HTS.KHO * 100) /
                    (PLAN_DTHU_TKC_HTS.KHO * 1000000)
                )
              ) : (
                ""
              )}
            </td>
            <td className="cell-number">
              {loadingExec || loadingPlan ? (
                <LoadingComponent />
              ) : EXEC_DTHU_TKC_HTS.DLA && PLAN_DTHU_TKC_HTS.DLA ? (
                convertToFloat2Fixed(
                  (EXEC_DTHU_TKC_HTS.DLA * 100) /
                    (PLAN_DTHU_TKC_HTS.DLA * 1000000)
                )
              ) : (
                ""
              )}
            </td>
            <td className="cell-number">
              {loadingExec || loadingPlan ? (
                <LoadingComponent />
              ) : EXEC_DTHU_TKC_HTS.GLA && PLAN_DTHU_TKC_HTS.GLA ? (
                convertToFloat2Fixed(
                  (EXEC_DTHU_TKC_HTS.GLA * 100) /
                    (PLAN_DTHU_TKC_HTS.GLA * 1000000)
                )
              ) : (
                ""
              )}
            </td>
            <td className="cell-number">
              {loadingExec || loadingPlan ? (
                <LoadingComponent />
              ) : EXEC_DTHU_TKC_HTS.PYE && PLAN_DTHU_TKC_HTS.PYE ? (
                convertToFloat2Fixed(
                  (EXEC_DTHU_TKC_HTS.PYE * 100) /
                    (PLAN_DTHU_TKC_HTS.PYE * 1000000)
                )
              ) : (
                ""
              )}
            </td>
            <td className="cell-number">
              {loadingExec || loadingPlan ? (
                <LoadingComponent />
              ) : EXEC_DTHU_TKC_HTS.DNO && PLAN_DTHU_TKC_HTS.DNO ? (
                convertToFloat2Fixed(
                  (EXEC_DTHU_TKC_HTS.DNO * 100) /
                    (PLAN_DTHU_TKC_HTS.DNO * 1000000)
                )
              ) : (
                ""
              )}
            </td>
            <td className="cell-number">
              {loadingExec || loadingPlan ? (
                <LoadingComponent />
              ) : EXEC_DTHU_TKC_HTS.KON && PLAN_DTHU_TKC_HTS.KON ? (
                convertToFloat2Fixed(
                  (EXEC_DTHU_TKC_HTS.KON * 100) /
                    (PLAN_DTHU_TKC_HTS.KON * 1000000)
                )
              ) : (
                ""
              )}
            </td>
            <td className="cell-number">
              {loadingExec || loadingPlan ? (
                <LoadingComponent />
              ) : EXEC_DTHU_TKC_HTS.CTY7 && PLAN_DTHU_TKC_HTS.CTY7 ? (
                convertToFloat2Fixed(
                  (EXEC_DTHU_TKC_HTS.CTY7 * 100) /
                    (PLAN_DTHU_TKC_HTS.CTY7 * 1000000)
                )
              ) : (
                ""
              )}
            </td>
          </tr>
          <tr>
            <td className="text-sub4 kpi-percent-th">Ước %HTKH</td>
            <td
              className={
                parseFloat(
                  ((EXEC_DTHU_TKC_HTS.KHO /
                    (new Date(
                      selectedDate.getFullYear(),
                      selectedDate.getMonth() + 1,
                      0
                    ) < new Date(EXEC_DTHU_TKC_HTS.LAST_DATE)
                      ? sumDateInMonth
                      : new Date(EXEC_DTHU_TKC_HTS.LAST_DATE).getDate())) *
                    sumDateInMonth *
                    100) /
                    (PLAN_DTHU_TKC_HTS.KHO * 1000000)
                ) > 100
                  ? "bg-green"
                  : "bg-red"
              }
            >
              {loadingExec || loadingPlan ? (
                <LoadingComponent />
              ) : EXEC_DTHU_TKC_HTS.KHO && PLAN_DTHU_TKC_HTS.KHO ? (
                convertToFloat2Fixed(
                  ((EXEC_DTHU_TKC_HTS.KHO /
                    (new Date(
                      selectedDate.getFullYear(),
                      selectedDate.getMonth() + 1,
                      0
                    ) < new Date(EXEC_DTHU_TKC_HTS.LAST_DATE)
                      ? sumDateInMonth
                      : new Date(EXEC_DTHU_TKC_HTS.LAST_DATE).getDate())) *
                    sumDateInMonth *
                    100) /
                    (PLAN_DTHU_TKC_HTS.KHO * 1000000)
                )
              ) : (
                ""
              )}
            </td>
            <td
              className={
                parseFloat(
                  ((EXEC_DTHU_TKC_HTS.DLA /
                    (new Date(
                      selectedDate.getFullYear(),
                      selectedDate.getMonth() + 1,
                      0
                    ) < new Date(EXEC_DTHU_TKC_HTS.LAST_DATE)
                      ? sumDateInMonth
                      : new Date(EXEC_DTHU_TKC_HTS.LAST_DATE).getDate())) *
                    sumDateInMonth *
                    100) /
                    (PLAN_DTHU_TKC_HTS.DLA * 1000000)
                ) > 100
                  ? "bg-green"
                  : "bg-red"
              }
            >
              {loadingExec || loadingPlan ? (
                <LoadingComponent />
              ) : EXEC_DTHU_TKC_HTS.DLA && PLAN_DTHU_TKC_HTS.DLA ? (
                convertToFloat2Fixed(
                  ((EXEC_DTHU_TKC_HTS.DLA /
                    (new Date(
                      selectedDate.getFullYear(),
                      selectedDate.getMonth() + 1,
                      0
                    ) < new Date(EXEC_DTHU_TKC_HTS.LAST_DATE)
                      ? sumDateInMonth
                      : new Date(EXEC_DTHU_TKC_HTS.LAST_DATE).getDate())) *
                    sumDateInMonth *
                    100) /
                    (PLAN_DTHU_TKC_HTS.DLA * 1000000)
                )
              ) : (
                ""
              )}
            </td>
            <td
              className={
                parseFloat(
                  ((EXEC_DTHU_TKC_HTS.GLA /
                    (new Date(
                      selectedDate.getFullYear(),
                      selectedDate.getMonth() + 1,
                      0
                    ) < new Date(EXEC_DTHU_TKC_HTS.LAST_DATE)
                      ? sumDateInMonth
                      : new Date(EXEC_DTHU_TKC_HTS.LAST_DATE).getDate())) *
                    sumDateInMonth *
                    100) /
                    (PLAN_DTHU_TKC_HTS.GLA * 1000000)
                ) > 100
                  ? "bg-green"
                  : "bg-red"
              }
            >
              {loadingExec || loadingPlan ? (
                <LoadingComponent />
              ) : EXEC_DTHU_TKC_HTS.GLA && PLAN_DTHU_TKC_HTS.GLA ? (
                convertToFloat2Fixed(
                  ((EXEC_DTHU_TKC_HTS.GLA /
                    (new Date(
                      selectedDate.getFullYear(),
                      selectedDate.getMonth() + 1,
                      0
                    ) < new Date(EXEC_DTHU_TKC_HTS.LAST_DATE)
                      ? sumDateInMonth
                      : new Date(EXEC_DTHU_TKC_HTS.LAST_DATE).getDate())) *
                    sumDateInMonth *
                    100) /
                    (PLAN_DTHU_TKC_HTS.GLA * 1000000)
                )
              ) : (
                ""
              )}
            </td>
            <td
              className={
                parseFloat(
                  ((EXEC_DTHU_TKC_HTS.PYE /
                    (new Date(
                      selectedDate.getFullYear(),
                      selectedDate.getMonth() + 1,
                      0
                    ) < new Date(EXEC_DTHU_TKC_HTS.LAST_DATE)
                      ? sumDateInMonth
                      : new Date(EXEC_DTHU_TKC_HTS.LAST_DATE).getDate())) *
                    sumDateInMonth *
                    100) /
                    (PLAN_DTHU_TKC_HTS.PYE * 1000000)
                ) > 100
                  ? "bg-green"
                  : "bg-red"
              }
            >
              {loadingExec || loadingPlan ? (
                <LoadingComponent />
              ) : EXEC_DTHU_TKC_HTS.PYE && PLAN_DTHU_TKC_HTS.PYE ? (
                convertToFloat2Fixed(
                  ((EXEC_DTHU_TKC_HTS.PYE /
                    (new Date(
                      selectedDate.getFullYear(),
                      selectedDate.getMonth() + 1,
                      0
                    ) < new Date(EXEC_DTHU_TKC_HTS.LAST_DATE)
                      ? sumDateInMonth
                      : new Date(EXEC_DTHU_TKC_HTS.LAST_DATE).getDate())) *
                    sumDateInMonth *
                    100) /
                    (PLAN_DTHU_TKC_HTS.PYE * 1000000)
                )
              ) : (
                ""
              )}
            </td>
            <td
              className={
                parseFloat(
                  ((EXEC_DTHU_TKC_HTS.DNO /
                    (new Date(
                      selectedDate.getFullYear(),
                      selectedDate.getMonth() + 1,
                      0
                    ) < new Date(EXEC_DTHU_TKC_HTS.LAST_DATE)
                      ? sumDateInMonth
                      : new Date(EXEC_DTHU_TKC_HTS.LAST_DATE).getDate())) *
                    sumDateInMonth *
                    100) /
                    (PLAN_DTHU_TKC_HTS.DNO * 1000000)
                ) > 100
                  ? "bg-green"
                  : "bg-red"
              }
            >
              {loadingExec || loadingPlan ? (
                <LoadingComponent />
              ) : EXEC_DTHU_TKC_HTS.DNO && PLAN_DTHU_TKC_HTS.DNO ? (
                convertToFloat2Fixed(
                  ((EXEC_DTHU_TKC_HTS.DNO /
                    (new Date(
                      selectedDate.getFullYear(),
                      selectedDate.getMonth() + 1,
                      0
                    ) < new Date(EXEC_DTHU_TKC_HTS.LAST_DATE)
                      ? sumDateInMonth
                      : new Date(EXEC_DTHU_TKC_HTS.LAST_DATE).getDate())) *
                    sumDateInMonth *
                    100) /
                    (PLAN_DTHU_TKC_HTS.DNO * 1000000)
                )
              ) : (
                ""
              )}
            </td>
            <td
              className={
                parseFloat(
                  ((EXEC_DTHU_TKC_HTS.KON /
                    (new Date(
                      selectedDate.getFullYear(),
                      selectedDate.getMonth() + 1,
                      0
                    ) < new Date(EXEC_DTHU_TKC_HTS.LAST_DATE)
                      ? sumDateInMonth
                      : new Date(EXEC_DTHU_TKC_HTS.LAST_DATE).getDate())) *
                    sumDateInMonth *
                    100) /
                    (PLAN_DTHU_TKC_HTS.KON * 1000000)
                ) > 100
                  ? "bg-green"
                  : "bg-red"
              }
            >
              {loadingExec || loadingPlan ? (
                <LoadingComponent />
              ) : EXEC_DTHU_TKC_HTS.KON && PLAN_DTHU_TKC_HTS.KON ? (
                convertToFloat2Fixed(
                  ((EXEC_DTHU_TKC_HTS.KON /
                    (new Date(
                      selectedDate.getFullYear(),
                      selectedDate.getMonth() + 1,
                      0
                    ) < new Date(EXEC_DTHU_TKC_HTS.LAST_DATE)
                      ? sumDateInMonth
                      : new Date(EXEC_DTHU_TKC_HTS.LAST_DATE).getDate())) *
                    sumDateInMonth *
                    100) /
                    (PLAN_DTHU_TKC_HTS.KON * 1000000)
                )
              ) : (
                ""
              )}
            </td>
            <td
              className={
                parseFloat(
                  ((EXEC_DTHU_TKC_HTS.CTY7 /
                    (new Date(
                      selectedDate.getFullYear(),
                      selectedDate.getMonth() + 1,
                      0
                    ) < new Date(EXEC_DTHU_TKC_HTS.LAST_DATE)
                      ? sumDateInMonth
                      : new Date(EXEC_DTHU_TKC_HTS.LAST_DATE).getDate())) *
                    sumDateInMonth *
                    100) /
                    (PLAN_DTHU_TKC_HTS.CTY7 * 1000000)
                ) > 100
                  ? "bg-green"
                  : "bg-red"
              }
            >
              {loadingExec || loadingPlan ? (
                <LoadingComponent />
              ) : EXEC_DTHU_TKC_HTS.CTY7 && PLAN_DTHU_TKC_HTS.CTY7 ? (
                convertToFloat2Fixed(
                  ((EXEC_DTHU_TKC_HTS.CTY7 /
                    (new Date(
                      selectedDate.getFullYear(),
                      selectedDate.getMonth() + 1,
                      0
                    ) < new Date(EXEC_DTHU_TKC_HTS.LAST_DATE)
                      ? sumDateInMonth
                      : new Date(EXEC_DTHU_TKC_HTS.LAST_DATE).getDate())) *
                    sumDateInMonth *
                    100) /
                    (PLAN_DTHU_TKC_HTS.CTY7 * 1000000)
                )
              ) : (
                ""
              )}
            </td>
          </tr>
          <tr>
            <td rowSpan={1} className="text-sub2">
              1.1
            </td>
            <td rowSpan={1} className="text-sub3 cell-kpi">
              DT TKC hạ tầng số
            </td>
            <td rowSpan={1} className="kpi-dvt">
              triệu đồng
            </td>
            <td className="text-sub4 kpi-kht">THLK</td>
            <td className="cell-number">
              {loadingExec ? (
                <LoadingComponent />
              ) : EXEC_DTHU_TKC_HTS.KHO ? (
                convertToFloat2Fixed(EXEC_DTHU_TKC_HTS.KHO / 1000000)
              ) : (
                ""
              )}
            </td>
            <td className="cell-number">
              {loadingExec ? (
                <LoadingComponent />
              ) : EXEC_DTHU_TKC_HTS.DLA ? (
                convertToFloat2Fixed(EXEC_DTHU_TKC_HTS.DLA / 1000000)
              ) : (
                ""
              )}
            </td>
            <td className="cell-number">
              {loadingExec ? (
                <LoadingComponent />
              ) : EXEC_DTHU_TKC_HTS.GLA ? (
                convertToFloat2Fixed(EXEC_DTHU_TKC_HTS.GLA / 1000000)
              ) : (
                ""
              )}
            </td>
            <td className="cell-number">
              {loadingExec ? (
                <LoadingComponent />
              ) : EXEC_DTHU_TKC_HTS.PYE ? (
                convertToFloat2Fixed(EXEC_DTHU_TKC_HTS.PYE / 1000000)
              ) : (
                ""
              )}
            </td>
            <td className="cell-number">
              {loadingExec ? (
                <LoadingComponent />
              ) : EXEC_DTHU_TKC_HTS.DNO ? (
                convertToFloat2Fixed(EXEC_DTHU_TKC_HTS.DNO / 1000000)
              ) : (
                ""
              )}
            </td>
            <td className="cell-number">
              {loadingExec ? (
                <LoadingComponent />
              ) : EXEC_DTHU_TKC_HTS.KON ? (
                convertToFloat2Fixed(EXEC_DTHU_TKC_HTS.KON / 1000000)
              ) : (
                ""
              )}
            </td>
            <td className="cell-number">
              {loadingExec ? (
                <LoadingComponent />
              ) : EXEC_DTHU_TKC_HTS.CTY7 ? (
                convertToFloat2Fixed(EXEC_DTHU_TKC_HTS.CTY7 / 1000000)
              ) : (
                ""
              )}
            </td>
          </tr>
          <tr>
            <td rowSpan={1} className="text-sub2">
              1.2
            </td>
            <td rowSpan={1} className="text-sub3 cell-kpi">
              DT Fiber và băng rộng cố định
            </td>
            <td rowSpan={1} className="kpi-dvt">
              triệu đồng
            </td>
            <td className="text-sub4 kpi-kht">THLK</td>
            <td className="cell-number">
              {loadingPlan ? (
                <LoadingComponent />
              ) : EXEC_DTHU_FIBER.KHO ? (
                convertToFloat2Fixed(EXEC_DTHU_FIBER.KHO / 1000000)
              ) : (
                ""
              )}
            </td>
            <td className="cell-number">
              {loadingPlan ? (
                <LoadingComponent />
              ) : EXEC_DTHU_FIBER.DLA ? (
                convertToFloat2Fixed(EXEC_DTHU_FIBER.DLA / 1000000)
              ) : (
                ""
              )}
            </td>
            <td className="cell-number">
              {loadingPlan ? (
                <LoadingComponent />
              ) : EXEC_DTHU_FIBER.GLA ? (
                convertToFloat2Fixed(EXEC_DTHU_FIBER.GLA / 1000000)
              ) : (
                ""
              )}
            </td>
            <td className="cell-number">
              {loadingPlan ? (
                <LoadingComponent />
              ) : EXEC_DTHU_FIBER.PYE ? (
                convertToFloat2Fixed(EXEC_DTHU_FIBER.PYE / 1000000)
              ) : (
                ""
              )}
            </td>
            <td className="cell-number">
              {loadingPlan ? (
                <LoadingComponent />
              ) : EXEC_DTHU_FIBER.DNO ? (
                convertToFloat2Fixed(EXEC_DTHU_FIBER.DNO / 1000000)
              ) : (
                ""
              )}
            </td>
            <td className="cell-number">
              {loadingPlan ? (
                <LoadingComponent />
              ) : EXEC_DTHU_FIBER.KON ? (
                convertToFloat2Fixed(EXEC_DTHU_FIBER.KON / 1000000)
              ) : (
                ""
              )}
            </td>
            <td className="cell-number">
              {loadingPlan ? (
                <LoadingComponent />
              ) : EXEC_DTHU_FIBER.CTY7 ? (
                convertToFloat2Fixed(EXEC_DTHU_FIBER.CTY7 / 1000000)
              ) : (
                ""
              )}
            </td>
          </tr>

          <tr>
            <td rowSpan={1} className="text-sub2">
              2
            </td>
            <td colSpan={11} className="text-sub2">
              Doanh thu Giải pháp số/Nền tảng số (
              <span style={{ color: "red" }}>*</span>)
            </td>
          </tr>
          <tr>
            <td rowSpan={4} className="text-sub3">
              2.1
            </td>
            <td rowSpan={4} className="text-sub3 cell-kpi">
              Doanh thu bán Mass(tính 1 lần)
              <span style={{ color: "red" }}>*</span>
            </td>
            <td rowSpan={4} className="kpi-dvt">
              triệu đồng
            </td>
            <td className="text-sub4 kpi-kht">KHT</td>
            <td className="cell-number">
              {loadingPlan ? (
                <LoadingComponent />
              ) : PLAN_DTHU_MASS.KHO ? (
                convertToFloat2Fixed(PLAN_DTHU_MASS.KHO)
              ) : (
                ""
              )}
            </td>
            <td className="cell-number">
              {loadingPlan ? (
                <LoadingComponent />
              ) : PLAN_DTHU_MASS.DLA ? (
                convertToFloat2Fixed(PLAN_DTHU_MASS.DLA)
              ) : (
                ""
              )}
            </td>
            <td className="cell-number">
              {loadingPlan ? (
                <LoadingComponent />
              ) : PLAN_DTHU_MASS.GLA ? (
                convertToFloat2Fixed(PLAN_DTHU_MASS.GLA)
              ) : (
                ""
              )}
            </td>
            <td className="cell-number">
              {loadingPlan ? (
                <LoadingComponent />
              ) : PLAN_DTHU_MASS.PYE ? (
                convertToFloat2Fixed(PLAN_DTHU_MASS.PYE)
              ) : (
                ""
              )}
            </td>
            <td className="cell-number">
              {loadingPlan ? (
                <LoadingComponent />
              ) : PLAN_DTHU_MASS.DNO ? (
                convertToFloat2Fixed(PLAN_DTHU_MASS.DNO)
              ) : (
                ""
              )}
            </td>
            <td className="cell-number">
              {loadingPlan ? (
                <LoadingComponent />
              ) : PLAN_DTHU_MASS.KON ? (
                convertToFloat2Fixed(PLAN_DTHU_MASS.KON)
              ) : (
                ""
              )}
            </td>
            <td className="cell-number">
              {loadingPlan ? (
                <LoadingComponent />
              ) : PLAN_DTHU_MASS.CTY7 ? (
                convertToFloat2Fixed(PLAN_DTHU_MASS.CTY7)
              ) : (
                ""
              )}
            </td>
            <td rowSpan={4} className="cell-donviphutrach">
              CNS
              <br />
              <span>
                {EXEC_DTHU_MASS.LAST_DATE
                  ? getFormattedDate(new Date(EXEC_DTHU_MASS.LAST_DATE))
                  : ""}
              </span>
            </td>
          </tr>
          <tr>
            <td className="text-sub4 kpi-thlk">THLK</td>
            <td className="cell-number">
              {loadingExec ? (
                <LoadingComponent />
              ) : EXEC_DTHU_MASS.KHO ? (
                convertToFloat2Fixed(EXEC_DTHU_MASS.KHO / 1000000)
              ) : (
                ""
              )}
            </td>
            <td className="cell-number">
              {loadingExec ? (
                <LoadingComponent />
              ) : EXEC_DTHU_MASS.DLA ? (
                convertToFloat2Fixed(EXEC_DTHU_MASS.DLA / 1000000)
              ) : (
                ""
              )}
            </td>
            <td className="cell-number">
              {loadingExec ? (
                <LoadingComponent />
              ) : EXEC_DTHU_MASS.GLA ? (
                convertToFloat2Fixed(EXEC_DTHU_MASS.GLA / 1000000)
              ) : (
                ""
              )}
            </td>
            <td className="cell-number">
              {loadingExec ? (
                <LoadingComponent />
              ) : EXEC_DTHU_MASS.PYE ? (
                convertToFloat2Fixed(EXEC_DTHU_MASS.PYE / 1000000)
              ) : (
                ""
              )}
            </td>
            <td className="cell-number">
              {loadingExec ? (
                <LoadingComponent />
              ) : EXEC_DTHU_MASS.DNO ? (
                convertToFloat2Fixed(EXEC_DTHU_MASS.DNO / 1000000)
              ) : (
                ""
              )}
            </td>
            <td className="cell-number">
              {loadingExec ? (
                <LoadingComponent />
              ) : EXEC_DTHU_MASS.KON ? (
                convertToFloat2Fixed(EXEC_DTHU_MASS.KON / 1000000)
              ) : (
                ""
              )}
            </td>
            <td className="cell-number">
              {loadingExec ? (
                <LoadingComponent />
              ) : EXEC_DTHU_MASS.CTY7 ? (
                convertToFloat2Fixed(EXEC_DTHU_MASS.CTY7 / 1000000)
              ) : (
                ""
              )}
            </td>
          </tr>
          <tr>
            <td className="text-sub4 kpi-percent-lk">%HTKH </td>
            <td className="cell-number">
              {loadingExec || loadingPlan ? (
                <LoadingComponent />
              ) : EXEC_DTHU_MASS.KHO && PLAN_DTHU_MASS.KHO ? (
                convertToFloat2Fixed(
                  (EXEC_DTHU_MASS.KHO * 100) / (PLAN_DTHU_MASS.KHO * 1000000)
                )
              ) : (
                ""
              )}
            </td>
            <td className="cell-number">
              {loadingExec || loadingPlan ? (
                <LoadingComponent />
              ) : EXEC_DTHU_MASS.DLA && PLAN_DTHU_MASS.DLA ? (
                convertToFloat2Fixed(
                  (EXEC_DTHU_MASS.DLA * 100) / (PLAN_DTHU_MASS.DLA * 1000000)
                )
              ) : (
                ""
              )}
            </td>
            <td className="cell-number">
              {loadingExec || loadingPlan ? (
                <LoadingComponent />
              ) : EXEC_DTHU_MASS.GLA && PLAN_DTHU_MASS.GLA ? (
                convertToFloat2Fixed(
                  (EXEC_DTHU_MASS.GLA * 100) / (PLAN_DTHU_MASS.GLA * 1000000)
                )
              ) : (
                ""
              )}
            </td>
            <td className="cell-number">
              {loadingExec || loadingPlan ? (
                <LoadingComponent />
              ) : EXEC_DTHU_MASS.PYE && PLAN_DTHU_MASS.PYE ? (
                convertToFloat2Fixed(
                  (EXEC_DTHU_MASS.PYE * 100) / (PLAN_DTHU_MASS.PYE * 1000000)
                )
              ) : (
                ""
              )}
            </td>
            <td className="cell-number">
              {loadingExec || loadingPlan ? (
                <LoadingComponent />
              ) : EXEC_DTHU_MASS.DNO && PLAN_DTHU_MASS.DNO ? (
                convertToFloat2Fixed(
                  (EXEC_DTHU_MASS.DNO * 100) / (PLAN_DTHU_MASS.DNO * 1000000)
                )
              ) : (
                ""
              )}
            </td>
            <td className="cell-number">
              {loadingExec || loadingPlan ? (
                <LoadingComponent />
              ) : EXEC_DTHU_MASS.KON && PLAN_DTHU_MASS.KON ? (
                convertToFloat2Fixed(
                  (EXEC_DTHU_MASS.KON * 100) / (PLAN_DTHU_MASS.KON * 1000000)
                )
              ) : (
                ""
              )}
            </td>
            <td className="cell-number">
              {loadingExec || loadingPlan ? (
                <LoadingComponent />
              ) : EXEC_DTHU_MASS.CTY7 && PLAN_DTHU_MASS.CTY7 ? (
                convertToFloat2Fixed(
                  (EXEC_DTHU_MASS.CTY7 * 100) / (PLAN_DTHU_MASS.CTY7 * 1000000)
                )
              ) : (
                ""
              )}
            </td>
          </tr>
          <tr>
            <td className="text-sub4 kpi-percent-th">Ước %HTKH</td>
            <td
              className={
                parseFloat(
                  ((EXEC_DTHU_MASS.KHO /
                    (new Date(
                      selectedDate.getFullYear(),
                      selectedDate.getMonth() + 1,
                      0
                    ) < new Date(EXEC_DTHU_MASS.LAST_DATE).getDate()
                      ? sumDateInMonth
                      : new Date(EXEC_DTHU_MASS.LAST_DATE).getDate())) *
                    sumDateInMonth *
                    100) /
                    (PLAN_DTHU_MASS.KHO * 1000000)
                ) > 100
                  ? "bg-green"
                  : "bg-red"
              }
            >
              {loadingExec || loadingPlan ? (
                <LoadingComponent />
              ) : EXEC_DTHU_MASS.KHO && PLAN_DTHU_MASS.KHO ? (
                convertToFloat2Fixed(
                  ((EXEC_DTHU_MASS.KHO /
                    (new Date(
                      selectedDate.getFullYear(),
                      selectedDate.getMonth() + 1,
                      0
                    ) < new Date(EXEC_DTHU_MASS.LAST_DATE).getDate()
                      ? sumDateInMonth
                      : new Date(EXEC_DTHU_MASS.LAST_DATE).getDate())) *
                    sumDateInMonth *
                    100) /
                    (PLAN_DTHU_MASS.KHO * 1000000)
                )
              ) : (
                ""
              )}
            </td>
            <td
              className={
                parseFloat(
                  ((EXEC_DTHU_MASS.DLA /
                    (new Date(
                      selectedDate.getFullYear(),
                      selectedDate.getMonth() + 1,
                      0
                    ) < new Date(EXEC_DTHU_MASS.LAST_DATE).getDate()
                      ? sumDateInMonth
                      : new Date(EXEC_DTHU_MASS.LAST_DATE).getDate())) *
                    sumDateInMonth *
                    100) /
                    (PLAN_DTHU_MASS.DLA * 1000000)
                ) > 100
                  ? "bg-green"
                  : "bg-red"
              }
            >
              {loadingExec || loadingPlan ? (
                <LoadingComponent />
              ) : EXEC_DTHU_MASS.DLA && PLAN_DTHU_MASS.DLA ? (
                convertToFloat2Fixed(
                  ((EXEC_DTHU_MASS.DLA /
                    (new Date(
                      selectedDate.getFullYear(),
                      selectedDate.getMonth() + 1,
                      0
                    ) < new Date(EXEC_DTHU_MASS.LAST_DATE).getDate()
                      ? sumDateInMonth
                      : new Date(EXEC_DTHU_MASS.LAST_DATE).getDate())) *
                    sumDateInMonth *
                    100) /
                    (PLAN_DTHU_MASS.DLA * 1000000)
                )
              ) : (
                ""
              )}
            </td>
            <td
              className={
                parseFloat(
                  ((EXEC_DTHU_MASS.GLA /
                    (new Date(
                      selectedDate.getFullYear(),
                      selectedDate.getMonth() + 1,
                      0
                    ) < new Date(EXEC_DTHU_MASS.LAST_DATE).getDate()
                      ? sumDateInMonth
                      : new Date(EXEC_DTHU_MASS.LAST_DATE).getDate())) *
                    sumDateInMonth *
                    100) /
                    (PLAN_DTHU_MASS.GLA * 1000000)
                ) > 100
                  ? "bg-green"
                  : "bg-red"
              }
            >
              {loadingExec || loadingPlan ? (
                <LoadingComponent />
              ) : EXEC_DTHU_MASS.GLA && PLAN_DTHU_MASS.GLA ? (
                convertToFloat2Fixed(
                  ((EXEC_DTHU_MASS.GLA /
                    (new Date(
                      selectedDate.getFullYear(),
                      selectedDate.getMonth() + 1,
                      0
                    ) < new Date(EXEC_DTHU_MASS.LAST_DATE).getDate()
                      ? sumDateInMonth
                      : new Date(EXEC_DTHU_MASS.LAST_DATE).getDate())) *
                    sumDateInMonth *
                    100) /
                    (PLAN_DTHU_MASS.GLA * 1000000)
                )
              ) : (
                ""
              )}
            </td>
            <td
              className={
                parseFloat(
                  ((EXEC_DTHU_MASS.PYE /
                    (new Date(
                      selectedDate.getFullYear(),
                      selectedDate.getMonth() + 1,
                      0
                    ) < new Date(EXEC_DTHU_MASS.LAST_DATE).getDate()
                      ? sumDateInMonth
                      : new Date(EXEC_DTHU_MASS.LAST_DATE).getDate())) *
                    sumDateInMonth *
                    100) /
                    (PLAN_DTHU_MASS.PYE * 1000000)
                ) > 100
                  ? "bg-green"
                  : "bg-red"
              }
            >
              {loadingExec || loadingPlan ? (
                <LoadingComponent />
              ) : EXEC_DTHU_MASS.PYE && PLAN_DTHU_MASS.PYE ? (
                convertToFloat2Fixed(
                  ((EXEC_DTHU_MASS.PYE /
                    (new Date(
                      selectedDate.getFullYear(),
                      selectedDate.getMonth() + 1,
                      0
                    ) < new Date(EXEC_DTHU_MASS.LAST_DATE).getDate()
                      ? sumDateInMonth
                      : new Date(EXEC_DTHU_MASS.LAST_DATE).getDate())) *
                    sumDateInMonth *
                    100) /
                    (PLAN_DTHU_MASS.PYE * 1000000)
                )
              ) : (
                ""
              )}
            </td>
            <td
              className={
                parseFloat(
                  ((EXEC_DTHU_MASS.DNO /
                    (new Date(
                      selectedDate.getFullYear(),
                      selectedDate.getMonth() + 1,
                      0
                    ) < new Date(EXEC_DTHU_MASS.LAST_DATE).getDate()
                      ? sumDateInMonth
                      : new Date(EXEC_DTHU_MASS.LAST_DATE).getDate())) *
                    sumDateInMonth *
                    100) /
                    (PLAN_DTHU_MASS.DNO * 1000000)
                ) > 100
                  ? "bg-green"
                  : "bg-red"
              }
            >
              {loadingExec || loadingPlan ? (
                <LoadingComponent />
              ) : EXEC_DTHU_MASS.DNO && PLAN_DTHU_MASS.DNO ? (
                convertToFloat2Fixed(
                  ((EXEC_DTHU_MASS.DNO /
                    (new Date(
                      selectedDate.getFullYear(),
                      selectedDate.getMonth() + 1,
                      0
                    ) < new Date(EXEC_DTHU_MASS.LAST_DATE).getDate()
                      ? sumDateInMonth
                      : new Date(EXEC_DTHU_MASS.LAST_DATE).getDate())) *
                    sumDateInMonth *
                    100) /
                    (PLAN_DTHU_MASS.DNO * 1000000)
                )
              ) : (
                ""
              )}
            </td>
            <td
              className={
                parseFloat(
                  ((EXEC_DTHU_MASS.KON /
                    (new Date(
                      selectedDate.getFullYear(),
                      selectedDate.getMonth() + 1,
                      0
                    ) < new Date(EXEC_DTHU_MASS.LAST_DATE).getDate()
                      ? sumDateInMonth
                      : new Date(EXEC_DTHU_MASS.LAST_DATE).getDate())) *
                    sumDateInMonth *
                    100) /
                    (PLAN_DTHU_MASS.KON * 1000000)
                ) > 100
                  ? "bg-green"
                  : "bg-red"
              }
            >
              {loadingExec || loadingPlan ? (
                <LoadingComponent />
              ) : EXEC_DTHU_MASS.KON && PLAN_DTHU_MASS.KON ? (
                convertToFloat2Fixed(
                  ((EXEC_DTHU_MASS.KON /
                    (new Date(
                      selectedDate.getFullYear(),
                      selectedDate.getMonth() + 1,
                      0
                    ) < new Date(EXEC_DTHU_MASS.LAST_DATE).getDate()
                      ? sumDateInMonth
                      : new Date(EXEC_DTHU_MASS.LAST_DATE).getDate())) *
                    sumDateInMonth *
                    100) /
                    (PLAN_DTHU_MASS.KON * 1000000)
                )
              ) : (
                ""
              )}
            </td>
            <td
              className={
                parseFloat(
                  ((EXEC_DTHU_MASS.CTY7 /
                    (new Date(
                      selectedDate.getFullYear(),
                      selectedDate.getMonth() + 1,
                      0
                    ) < new Date(EXEC_DTHU_MASS.LAST_DATE).getDate()
                      ? sumDateInMonth
                      : new Date(EXEC_DTHU_MASS.LAST_DATE).getDate())) *
                    sumDateInMonth *
                    100) /
                    (PLAN_DTHU_MASS.CTY7 * 1000000)
                ) > 100
                  ? "bg-green"
                  : "bg-red"
              }
            >
              {loadingExec || loadingPlan ? (
                <LoadingComponent />
              ) : EXEC_DTHU_MASS.CTY7 && PLAN_DTHU_MASS.CTY7 ? (
                convertToFloat2Fixed(
                  ((EXEC_DTHU_MASS.CTY7 /
                    (new Date(
                      selectedDate.getFullYear(),
                      selectedDate.getMonth() + 1,
                      0
                    ) < new Date(EXEC_DTHU_MASS.LAST_DATE).getDate()
                      ? sumDateInMonth
                      : new Date(EXEC_DTHU_MASS.LAST_DATE).getDate())) *
                    sumDateInMonth *
                    100) /
                    (PLAN_DTHU_MASS.CTY7 * 1000000)
                )
              ) : (
                ""
              )}
            </td>
          </tr>
          <tr>
            <td rowSpan={4} className="text-sub3">
              2.2
            </td>
            <td rowSpan={4} className="text-sub3 cell-kpi">
              DT GPS(IoT, Cyber, mobiEdu, dự án ...)
              <span style={{ color: "red" }}>*</span>
            </td>
            <td rowSpan={4} className="kpi-dvt">
              triệu đồng
            </td>
            <td className="text-sub4 kpi-kht">KHT</td>
            <td className="cell-number">
              {loadingPlan ? (
                <LoadingComponent />
              ) : PLAN_DTHU_DUAN.KHO ? (
                convertToFloat2Fixed(PLAN_DTHU_DUAN.KHO)
              ) : (
                ""
              )}
            </td>
            <td className="cell-number">
              {loadingPlan ? (
                <LoadingComponent />
              ) : PLAN_DTHU_DUAN.DLA ? (
                convertToFloat2Fixed(PLAN_DTHU_DUAN.DLA)
              ) : (
                ""
              )}
            </td>
            <td className="cell-number">
              {loadingPlan ? (
                <LoadingComponent />
              ) : PLAN_DTHU_DUAN.GLA ? (
                convertToFloat2Fixed(PLAN_DTHU_DUAN.GLA)
              ) : (
                ""
              )}
            </td>
            <td className="cell-number">
              {loadingPlan ? (
                <LoadingComponent />
              ) : PLAN_DTHU_DUAN.PYE ? (
                convertToFloat2Fixed(PLAN_DTHU_DUAN.PYE)
              ) : (
                ""
              )}
            </td>
            <td className="cell-number">
              {loadingPlan ? (
                <LoadingComponent />
              ) : PLAN_DTHU_DUAN.DNO ? (
                convertToFloat2Fixed(PLAN_DTHU_DUAN.DNO)
              ) : (
                ""
              )}
            </td>
            <td className="cell-number">
              {loadingPlan ? (
                <LoadingComponent />
              ) : PLAN_DTHU_DUAN.KON ? (
                convertToFloat2Fixed(PLAN_DTHU_DUAN.KON)
              ) : (
                ""
              )}
            </td>
            <td className="cell-number">
              {loadingPlan ? (
                <LoadingComponent />
              ) : PLAN_DTHU_DUAN.CTY7 ? (
                convertToFloat2Fixed(PLAN_DTHU_DUAN.CTY7)
              ) : (
                ""
              )}
            </td>
            <td rowSpan={4} className="cell-donviphutrach">
              CNS
              <br />
              <span>
                {EXEC_DTHU_DUAN.LAST_DATE
                  ? getFormattedDate(new Date(EXEC_DTHU_DUAN.LAST_DATE))
                  : ""}
              </span>
            </td>
          </tr>
          <tr>
            <td className="text-sub4 kpi-thlk">THLK</td>
            <td className="cell-number">
              {loadingExec ? (
                <LoadingComponent />
              ) : EXEC_DTHU_DUAN.KHO ? (
                convertToFloat2Fixed(EXEC_DTHU_DUAN.KHO / 1000000)
              ) : (
                ""
              )}
            </td>
            <td className="cell-number">
              {loadingExec ? (
                <LoadingComponent />
              ) : EXEC_DTHU_DUAN.DLA ? (
                convertToFloat2Fixed(EXEC_DTHU_DUAN.DLA / 1000000)
              ) : (
                ""
              )}
            </td>
            <td className="cell-number">
              {loadingExec ? (
                <LoadingComponent />
              ) : EXEC_DTHU_DUAN.GLA ? (
                convertToFloat2Fixed(EXEC_DTHU_DUAN.GLA / 1000000)
              ) : (
                ""
              )}
            </td>
            <td className="cell-number">
              {loadingExec ? (
                <LoadingComponent />
              ) : EXEC_DTHU_DUAN.PYE ? (
                convertToFloat2Fixed(EXEC_DTHU_DUAN.PYE / 1000000)
              ) : (
                ""
              )}
            </td>
            <td className="cell-number">
              {loadingExec ? (
                <LoadingComponent />
              ) : EXEC_DTHU_DUAN.DNO ? (
                convertToFloat2Fixed(EXEC_DTHU_DUAN.DNO / 1000000)
              ) : (
                ""
              )}
            </td>
            <td className="cell-number">
              {loadingExec ? (
                <LoadingComponent />
              ) : EXEC_DTHU_DUAN.KON ? (
                convertToFloat2Fixed(EXEC_DTHU_DUAN.KON / 1000000)
              ) : (
                ""
              )}
            </td>
            <td className="cell-number">
              {loadingExec ? (
                <LoadingComponent />
              ) : EXEC_DTHU_DUAN.CTY7 ? (
                convertToFloat2Fixed(EXEC_DTHU_DUAN.CTY7 / 1000000)
              ) : (
                ""
              )}
            </td>
          </tr>
          <tr>
            <td className="text-sub4 kpi-percent-lk">%HTKH </td>
            <td className="cell-number">
              {loadingExec || loadingPlan ? (
                <LoadingComponent />
              ) : EXEC_DTHU_DUAN.KHO && PLAN_DTHU_DUAN.KHO ? (
                convertToFloat2Fixed(
                  (EXEC_DTHU_DUAN.KHO * 100) / (PLAN_DTHU_DUAN.KHO * 1000000)
                )
              ) : (
                ""
              )}
            </td>
            <td className="cell-number">
              {loadingExec || loadingPlan ? (
                <LoadingComponent />
              ) : EXEC_DTHU_DUAN.DLA && PLAN_DTHU_DUAN.DLA ? (
                convertToFloat2Fixed(
                  (EXEC_DTHU_DUAN.DLA * 100) / (PLAN_DTHU_DUAN.DLA * 1000000)
                )
              ) : (
                ""
              )}
            </td>
            <td className="cell-number">
              {loadingExec || loadingPlan ? (
                <LoadingComponent />
              ) : EXEC_DTHU_DUAN.GLA && PLAN_DTHU_DUAN.GLA ? (
                convertToFloat2Fixed(
                  (EXEC_DTHU_DUAN.GLA * 100) / (PLAN_DTHU_DUAN.GLA * 1000000)
                )
              ) : (
                ""
              )}
            </td>
            <td className="cell-number">
              {loadingExec || loadingPlan ? (
                <LoadingComponent />
              ) : EXEC_DTHU_DUAN.PYE && PLAN_DTHU_DUAN.PYE ? (
                convertToFloat2Fixed(
                  (EXEC_DTHU_DUAN.PYE * 100) / (PLAN_DTHU_DUAN.PYE * 1000000)
                )
              ) : (
                ""
              )}
            </td>
            <td className="cell-number">
              {loadingExec || loadingPlan ? (
                <LoadingComponent />
              ) : EXEC_DTHU_DUAN.DNO && PLAN_DTHU_DUAN.DNO ? (
                convertToFloat2Fixed(
                  (EXEC_DTHU_DUAN.DNO * 100) / (PLAN_DTHU_DUAN.DNO * 1000000)
                )
              ) : (
                ""
              )}
            </td>
            <td className="cell-number">
              {loadingExec || loadingPlan ? (
                <LoadingComponent />
              ) : EXEC_DTHU_DUAN.KON && PLAN_DTHU_DUAN.KON ? (
                convertToFloat2Fixed(
                  (EXEC_DTHU_DUAN.KON * 100) / (PLAN_DTHU_DUAN.KON * 1000000)
                )
              ) : (
                ""
              )}
            </td>
            <td className="cell-number">
              {loadingExec || loadingPlan ? (
                <LoadingComponent />
              ) : EXEC_DTHU_DUAN.CTY7 && PLAN_DTHU_DUAN.CTY7 ? (
                convertToFloat2Fixed(
                  (EXEC_DTHU_DUAN.CTY7 * 100) / (PLAN_DTHU_DUAN.CTY7 * 1000000)
                )
              ) : (
                ""
              )}
            </td>
          </tr>
          <tr>
            <td className="text-sub4 kpi-percent-th">Ước %HTKH</td>
            <td
              className={
                parseFloat(
                  ((EXEC_DTHU_DUAN.KHO /
                    (new Date(
                      selectedDate.getFullYear(),
                      selectedDate.getMonth() + 1,
                      0
                    ) < new Date(EXEC_DTHU_DUAN.LAST_DATE)
                      ? sumDateInMonth
                      : new Date(EXEC_DTHU_DUAN.LAST_DATE).getDate())) *
                    sumDateInMonth *
                    100) /
                    (PLAN_DTHU_DUAN.KHO * 1000000)
                ) > 100 || PLAN_DTHU_DUAN.KHO == 0
                  ? "bg-green"
                  : "bg-red"
              }
            >
              {loadingExec || loadingPlan ? (
                <LoadingComponent />
              ) : EXEC_DTHU_DUAN.KHO && PLAN_DTHU_DUAN.KHO ? (
                convertToFloat2Fixed(
                  ((EXEC_DTHU_DUAN.KHO /
                    (new Date(
                      selectedDate.getFullYear(),
                      selectedDate.getMonth() + 1,
                      0
                    ) < new Date(EXEC_DTHU_DUAN.LAST_DATE)
                      ? sumDateInMonth
                      : new Date(EXEC_DTHU_DUAN.LAST_DATE).getDate())) *
                    sumDateInMonth *
                    100) /
                    (PLAN_DTHU_DUAN.KHO * 1000000)
                )
              ) : PLAN_DTHU_DUAN.KHO == 0 ? (
                120
              ) : (
                ""
              )}
            </td>
            <td
              className={
                parseFloat(
                  ((EXEC_DTHU_DUAN.DLA /
                    (new Date(
                      selectedDate.getFullYear(),
                      selectedDate.getMonth() + 1,
                      0
                    ) < new Date(EXEC_DTHU_DUAN.LAST_DATE)
                      ? sumDateInMonth
                      : new Date(EXEC_DTHU_DUAN.LAST_DATE).getDate())) *
                    sumDateInMonth *
                    100) /
                    (PLAN_DTHU_DUAN.DLA * 1000000)
                ) > 100 || PLAN_DTHU_DUAN.DLA == 0
                  ? "bg-green"
                  : "bg-red"
              }
            >
              {loadingExec || loadingPlan ? (
                <LoadingComponent />
              ) : EXEC_DTHU_DUAN.DLA && PLAN_DTHU_DUAN.DLA ? (
                convertToFloat2Fixed(
                  ((EXEC_DTHU_DUAN.DLA /
                    (new Date(
                      selectedDate.getFullYear(),
                      selectedDate.getMonth() + 1,
                      0
                    ) < new Date(EXEC_DTHU_DUAN.LAST_DATE)
                      ? sumDateInMonth
                      : new Date(EXEC_DTHU_DUAN.LAST_DATE).getDate())) *
                    sumDateInMonth *
                    100) /
                    (PLAN_DTHU_DUAN.DLA * 1000000)
                )
              ) : PLAN_DTHU_DUAN.DLA == 0 ? (
                120
              ) : (
                ""
              )}
            </td>
            <td
              className={
                parseFloat(
                  ((EXEC_DTHU_DUAN.GLA /
                    (new Date(
                      selectedDate.getFullYear(),
                      selectedDate.getMonth() + 1,
                      0
                    ) < new Date(EXEC_DTHU_DUAN.LAST_DATE)
                      ? sumDateInMonth
                      : new Date(EXEC_DTHU_DUAN.LAST_DATE).getDate())) *
                    sumDateInMonth *
                    100) /
                    (PLAN_DTHU_DUAN.GLA * 1000000)
                ) > 100 || PLAN_DTHU_DUAN.GLA == 0
                  ? "bg-green"
                  : "bg-red"
              }
            >
              {loadingExec || loadingPlan ? (
                <LoadingComponent />
              ) : EXEC_DTHU_DUAN.GLA && PLAN_DTHU_DUAN.KHO ? (
                convertToFloat2Fixed(
                  ((EXEC_DTHU_DUAN.GLA /
                    (new Date(
                      selectedDate.getFullYear(),
                      selectedDate.getMonth() + 1,
                      0
                    ) < new Date(EXEC_DTHU_DUAN.LAST_DATE)
                      ? sumDateInMonth
                      : new Date(EXEC_DTHU_DUAN.LAST_DATE).getDate())) *
                    sumDateInMonth *
                    100) /
                    (PLAN_DTHU_DUAN.GLA * 1000000)
                )
              ) : PLAN_DTHU_DUAN.GLA == 0 ? (
                120
              ) : (
                ""
              )}
            </td>
            <td
              className={
                parseFloat(
                  ((EXEC_DTHU_DUAN.PYE /
                    (new Date(
                      selectedDate.getFullYear(),
                      selectedDate.getMonth() + 1,
                      0
                    ) < new Date(EXEC_DTHU_DUAN.LAST_DATE)
                      ? sumDateInMonth
                      : new Date(EXEC_DTHU_DUAN.LAST_DATE).getDate())) *
                    sumDateInMonth *
                    100) /
                    (PLAN_DTHU_DUAN.PYE * 1000000)
                ) > 100 || PLAN_DTHU_DUAN.PYE == 0
                  ? "bg-green"
                  : "bg-red"
              }
            >
              {loadingExec || loadingPlan ? (
                <LoadingComponent />
              ) : EXEC_DTHU_DUAN.PYE && PLAN_DTHU_DUAN.PYE ? (
                convertToFloat2Fixed(
                  ((EXEC_DTHU_DUAN.PYE /
                    (new Date(
                      selectedDate.getFullYear(),
                      selectedDate.getMonth() + 1,
                      0
                    ) < new Date(EXEC_DTHU_DUAN.LAST_DATE)
                      ? sumDateInMonth
                      : new Date(EXEC_DTHU_DUAN.LAST_DATE).getDate())) *
                    sumDateInMonth *
                    100) /
                    (PLAN_DTHU_DUAN.PYE * 1000000)
                )
              ) : PLAN_DTHU_DUAN.PYE == 0 ? (
                120
              ) : (
                ""
              )}
            </td>
            <td
              className={
                parseFloat(
                  ((EXEC_DTHU_DUAN.DNO /
                    (new Date(
                      selectedDate.getFullYear(),
                      selectedDate.getMonth() + 1,
                      0
                    ) < new Date(EXEC_DTHU_DUAN.LAST_DATE)
                      ? sumDateInMonth
                      : new Date(EXEC_DTHU_DUAN.LAST_DATE).getDate())) *
                    sumDateInMonth *
                    100) /
                    (PLAN_DTHU_DUAN.DNO * 1000000)
                ) > 100 || PLAN_DTHU_DUAN.DNO == 0
                  ? "bg-green"
                  : "bg-red"
              }
            >
              {loadingExec || loadingPlan ? (
                <LoadingComponent />
              ) : EXEC_DTHU_DUAN.DNO && PLAN_DTHU_DUAN.DNO ? (
                convertToFloat2Fixed(
                  ((EXEC_DTHU_DUAN.DNO /
                    (new Date(
                      selectedDate.getFullYear(),
                      selectedDate.getMonth() + 1,
                      0
                    ) < new Date(EXEC_DTHU_DUAN.LAST_DATE)
                      ? sumDateInMonth
                      : new Date(EXEC_DTHU_DUAN.LAST_DATE).getDate())) *
                    sumDateInMonth *
                    100) /
                    (PLAN_DTHU_DUAN.DNO * 1000000)
                )
              ) : PLAN_DTHU_DUAN.DNO == 0 ? (
                120
              ) : (
                ""
              )}
            </td>
            <td
              className={
                parseFloat(
                  ((EXEC_DTHU_DUAN.KON /
                    (new Date(
                      selectedDate.getFullYear(),
                      selectedDate.getMonth() + 1,
                      0
                    ) < new Date(EXEC_DTHU_DUAN.LAST_DATE)
                      ? sumDateInMonth
                      : new Date(EXEC_DTHU_DUAN.LAST_DATE).getDate())) *
                    sumDateInMonth *
                    100) /
                    (PLAN_DTHU_DUAN.KON * 1000000)
                ) > 100 || PLAN_DTHU_DUAN.KON == 0
                  ? "bg-green"
                  : "bg-red"
              }
            >
              {loadingExec || loadingPlan ? (
                <LoadingComponent />
              ) : EXEC_DTHU_DUAN.KON && PLAN_DTHU_DUAN.KON ? (
                convertToFloat2Fixed(
                  ((EXEC_DTHU_DUAN.KON /
                    (new Date(
                      selectedDate.getFullYear(),
                      selectedDate.getMonth() + 1,
                      0
                    ) < new Date(EXEC_DTHU_DUAN.LAST_DATE)
                      ? sumDateInMonth
                      : new Date(EXEC_DTHU_DUAN.LAST_DATE).getDate())) *
                    sumDateInMonth *
                    100) /
                    (PLAN_DTHU_DUAN.KON * 1000000)
                )
              ) : PLAN_DTHU_DUAN.KON ? (
                120
              ) : (
                ""
              )}
            </td>
            <td
              className={
                parseFloat(
                  ((EXEC_DTHU_DUAN.CTY7 /
                    (new Date(
                      selectedDate.getFullYear(),
                      selectedDate.getMonth() + 1,
                      0
                    ) < new Date(EXEC_DTHU_DUAN.LAST_DATE)
                      ? sumDateInMonth
                      : new Date(EXEC_DTHU_DUAN.LAST_DATE).getDate())) *
                    sumDateInMonth *
                    100) /
                    (PLAN_DTHU_DUAN.CTY7 * 1000000)
                ) > 100 || PLAN_DTHU_DUAN.CTY7 == 0
                  ? "bg-green"
                  : "bg-red"
              }
            >
              {loadingExec || loadingPlan ? (
                <LoadingComponent />
              ) : EXEC_DTHU_DUAN.CTY7 && PLAN_DTHU_DUAN.CTY7 ? (
                convertToFloat2Fixed(
                  ((EXEC_DTHU_DUAN.CTY7 /
                    (new Date(
                      selectedDate.getFullYear(),
                      selectedDate.getMonth() + 1,
                      0
                    ) < new Date(EXEC_DTHU_DUAN.LAST_DATE)
                      ? sumDateInMonth
                      : new Date(EXEC_DTHU_DUAN.LAST_DATE).getDate())) *
                    sumDateInMonth *
                    100) /
                    (PLAN_DTHU_DUAN.CTY7 * 1000000)
                )
              ) : PLAN_DTHU_DUAN.CTY7 ? (
                120
              ) : (
                ""
              )}
            </td>
          </tr>

          <tr>
            <td rowSpan={4} className="text-sub2">
              3
            </td>
            <td rowSpan={4} className="text-sub2 cell-kpi">
              Doanh thu NDS Platform
            </td>
            <td rowSpan={4} className="kpi-dvt">
              triệu đồng
            </td>
            <td className="text-sub4 kpi-kht">KHT</td>
            <td className="cell-number">
              {loadingPlan ? (
                <LoadingComponent />
              ) : PLAN_DTHU_NDS.KHO ? (
                convertToFloat2Fixed(PLAN_DTHU_NDS.KHO)
              ) : (
                ""
              )}
            </td>
            <td className="cell-number">
              {loadingPlan ? (
                <LoadingComponent />
              ) : PLAN_DTHU_NDS.DLA ? (
                convertToFloat2Fixed(PLAN_DTHU_NDS.DLA)
              ) : (
                ""
              )}
            </td>
            <td className="cell-number">
              {loadingPlan ? (
                <LoadingComponent />
              ) : PLAN_DTHU_NDS.GLA ? (
                convertToFloat2Fixed(PLAN_DTHU_NDS.GLA)
              ) : (
                ""
              )}
            </td>
            <td className="cell-number">
              {loadingPlan ? (
                <LoadingComponent />
              ) : PLAN_DTHU_NDS.PYE ? (
                convertToFloat2Fixed(PLAN_DTHU_NDS.PYE)
              ) : (
                ""
              )}
            </td>
            <td className="cell-number">
              {loadingPlan ? (
                <LoadingComponent />
              ) : PLAN_DTHU_NDS.DNO ? (
                convertToFloat2Fixed(PLAN_DTHU_NDS.DNO)
              ) : (
                ""
              )}
            </td>
            <td className="cell-number">
              {loadingPlan ? (
                <LoadingComponent />
              ) : PLAN_DTHU_NDS.KON ? (
                convertToFloat2Fixed(PLAN_DTHU_NDS.KON)
              ) : (
                ""
              )}
            </td>
            <td className="cell-number">
              {loadingPlan ? (
                <LoadingComponent />
              ) : PLAN_DTHU_NDS.CTY7 ? (
                convertToFloat2Fixed(PLAN_DTHU_NDS.CTY7)
              ) : (
                ""
              )}
            </td>
            <td rowSpan={4} className="cell-donviphutrach">
              CNS
              <br />
              <span>
                {EXEC_DTHU_NDS.LAST_DATE
                  ? getFormattedDate(new Date(EXEC_DTHU_NDS.LAST_DATE))
                  : ""}
              </span>
            </td>
          </tr>
          <tr>
            <td className="text-sub4 kpi-thlk">THLK</td>
            <td className="cell-number">
              {loadingExec ? (
                <LoadingComponent />
              ) : EXEC_DTHU_NDS.KHO ? (
                convertToFloat2Fixed(EXEC_DTHU_NDS.KHO / 1000000)
              ) : (
                ""
              )}
            </td>
            <td className="cell-number">
              {loadingExec ? (
                <LoadingComponent />
              ) : EXEC_DTHU_NDS.DLA ? (
                convertToFloat2Fixed(EXEC_DTHU_NDS.DLA / 1000000)
              ) : (
                ""
              )}
            </td>
            <td className="cell-number">
              {loadingExec ? (
                <LoadingComponent />
              ) : EXEC_DTHU_NDS.GLA ? (
                convertToFloat2Fixed(EXEC_DTHU_NDS.GLA / 1000000)
              ) : (
                ""
              )}
            </td>
            <td className="cell-number">
              {loadingExec ? (
                <LoadingComponent />
              ) : EXEC_DTHU_NDS.PYE ? (
                convertToFloat2Fixed(EXEC_DTHU_NDS.PYE / 1000000)
              ) : (
                ""
              )}
            </td>
            <td className="cell-number">
              {loadingExec ? (
                <LoadingComponent />
              ) : EXEC_DTHU_NDS.DNO ? (
                convertToFloat2Fixed(EXEC_DTHU_NDS.DNO / 1000000)
              ) : (
                ""
              )}
            </td>
            <td className="cell-number">
              {loadingExec ? (
                <LoadingComponent />
              ) : EXEC_DTHU_NDS.KON ? (
                convertToFloat2Fixed(EXEC_DTHU_NDS.KON / 1000000)
              ) : (
                ""
              )}
            </td>
            <td className="cell-number">
              {loadingExec ? (
                <LoadingComponent />
              ) : EXEC_DTHU_NDS.CTY7 ? (
                convertToFloat2Fixed(EXEC_DTHU_NDS.CTY7 / 1000000)
              ) : (
                ""
              )}
            </td>
          </tr>
          <tr>
            <td className="text-sub4 kpi-percent-lk">%HTKH </td>
            <td className="cell-number">
              {loadingExec || loadingPlan ? (
                <LoadingComponent />
              ) : EXEC_DTHU_NDS.KHO && PLAN_DTHU_NDS.KHO ? (
                convertToFloat2Fixed(
                  (EXEC_DTHU_NDS.KHO * 100) / (PLAN_DTHU_NDS.KHO * 1000000)
                )
              ) : (
                ""
              )}
            </td>
            <td className="cell-number">
              {loadingExec || loadingPlan ? (
                <LoadingComponent />
              ) : EXEC_DTHU_NDS.DLA && PLAN_DTHU_NDS.DLA ? (
                convertToFloat2Fixed(
                  (EXEC_DTHU_NDS.DLA * 100) / (PLAN_DTHU_NDS.DLA * 1000000)
                )
              ) : (
                ""
              )}
            </td>
            <td className="cell-number">
              {loadingExec || loadingPlan ? (
                <LoadingComponent />
              ) : EXEC_DTHU_NDS.GLA && PLAN_DTHU_NDS.GLA ? (
                convertToFloat2Fixed(
                  (EXEC_DTHU_NDS.GLA * 100) / (PLAN_DTHU_NDS.GLA * 1000000)
                )
              ) : (
                ""
              )}
            </td>
            <td className="cell-number">
              {loadingExec || loadingPlan ? (
                <LoadingComponent />
              ) : EXEC_DTHU_NDS.PYE && PLAN_DTHU_NDS.PYE ? (
                convertToFloat2Fixed(
                  (EXEC_DTHU_NDS.PYE * 100) / (PLAN_DTHU_NDS.PYE * 1000000)
                )
              ) : (
                ""
              )}
            </td>
            <td className="cell-number">
              {loadingExec || loadingPlan ? (
                <LoadingComponent />
              ) : EXEC_DTHU_NDS.DNO && PLAN_DTHU_NDS.DNO ? (
                convertToFloat2Fixed(
                  (EXEC_DTHU_NDS.DNO * 100) / (PLAN_DTHU_NDS.DNO * 1000000)
                )
              ) : (
                ""
              )}
            </td>
            <td className="cell-number">
              {loadingExec || loadingPlan ? (
                <LoadingComponent />
              ) : EXEC_DTHU_NDS.KON && PLAN_DTHU_NDS.KON ? (
                convertToFloat2Fixed(
                  (EXEC_DTHU_NDS.KON * 100) / (PLAN_DTHU_NDS.KON * 1000000)
                )
              ) : (
                ""
              )}
            </td>
            <td className="cell-number">
              {loadingExec || loadingPlan ? (
                <LoadingComponent />
              ) : EXEC_DTHU_NDS.CTY7 && PLAN_DTHU_NDS.CTY7 ? (
                convertToFloat2Fixed(
                  (EXEC_DTHU_NDS.CTY7 * 100) / (PLAN_DTHU_NDS.CTY7 * 1000000)
                )
              ) : (
                ""
              )}
            </td>
          </tr>
          <tr>
            <td className="text-sub4 kpi-percent-th">Ước %HTKH</td>
            <td
              className={
                parseFloat(
                  ((EXEC_DTHU_NDS.KHO /
                    (new Date(
                      selectedDate.getFullYear(),
                      selectedDate.getMonth() + 1,
                      0
                    ) < new Date(EXEC_DTHU_NDS.LAST_DATE)
                      ? sumDateInMonth
                      : new Date(EXEC_DTHU_NDS.LAST_DATE).getDate())) *
                    sumDateInMonth *
                    100) /
                    (PLAN_DTHU_NDS.KHO * 1000000)
                ) > 100
                  ? "bg-green"
                  : "bg-red"
              }
            >
              {loadingExec || loadingPlan ? (
                <LoadingComponent />
              ) : EXEC_DTHU_NDS.KHO && PLAN_DTHU_NDS.KHO ? (
                convertToFloat2Fixed(
                  ((EXEC_DTHU_NDS.KHO /
                    (new Date(
                      selectedDate.getFullYear(),
                      selectedDate.getMonth() + 1,
                      0
                    ) < new Date(EXEC_DTHU_NDS.LAST_DATE)
                      ? sumDateInMonth
                      : new Date(EXEC_DTHU_NDS.LAST_DATE).getDate())) *
                    sumDateInMonth *
                    100) /
                    (PLAN_DTHU_NDS.KHO * 1000000)
                )
              ) : (
                ""
              )}
            </td>
            <td
              className={
                parseFloat(
                  ((EXEC_DTHU_NDS.DLA /
                    (new Date(
                      selectedDate.getFullYear(),
                      selectedDate.getMonth() + 1,
                      0
                    ) < new Date(EXEC_DTHU_NDS.LAST_DATE)
                      ? sumDateInMonth
                      : new Date(EXEC_DTHU_NDS.LAST_DATE).getDate())) *
                    sumDateInMonth *
                    100) /
                    (PLAN_DTHU_NDS.DLA * 1000000)
                ) > 100
                  ? "bg-green"
                  : "bg-red"
              }
            >
              {loadingExec || loadingPlan ? (
                <LoadingComponent />
              ) : EXEC_DTHU_NDS.DLA && PLAN_DTHU_NDS.DLA ? (
                convertToFloat2Fixed(
                  ((EXEC_DTHU_NDS.DLA /
                    (new Date(
                      selectedDate.getFullYear(),
                      selectedDate.getMonth() + 1,
                      0
                    ) < new Date(EXEC_DTHU_NDS.LAST_DATE)
                      ? sumDateInMonth
                      : new Date(EXEC_DTHU_NDS.LAST_DATE).getDate())) *
                    sumDateInMonth *
                    100) /
                    (PLAN_DTHU_NDS.DLA * 1000000)
                )
              ) : (
                ""
              )}
            </td>
            <td
              className={
                parseFloat(
                  ((EXEC_DTHU_NDS.GLA /
                    (new Date(
                      selectedDate.getFullYear(),
                      selectedDate.getMonth() + 1,
                      0
                    ) < new Date(EXEC_DTHU_NDS.LAST_DATE)
                      ? sumDateInMonth
                      : new Date(EXEC_DTHU_NDS.LAST_DATE).getDate())) *
                    sumDateInMonth *
                    100) /
                    (PLAN_DTHU_NDS.GLA * 1000000)
                ) > 100
                  ? "bg-green"
                  : "bg-red"
              }
            >
              {loadingExec || loadingPlan ? (
                <LoadingComponent />
              ) : EXEC_DTHU_NDS.GLA && PLAN_DTHU_NDS.GLA ? (
                convertToFloat2Fixed(
                  ((EXEC_DTHU_NDS.GLA /
                    (new Date(
                      selectedDate.getFullYear(),
                      selectedDate.getMonth() + 1,
                      0
                    ) < new Date(EXEC_DTHU_NDS.LAST_DATE)
                      ? sumDateInMonth
                      : new Date(EXEC_DTHU_NDS.LAST_DATE).getDate())) *
                    sumDateInMonth *
                    100) /
                    (PLAN_DTHU_NDS.GLA * 1000000)
                )
              ) : (
                ""
              )}
            </td>
            <td
              className={
                parseFloat(
                  ((EXEC_DTHU_NDS.PYE /
                    (new Date(
                      selectedDate.getFullYear(),
                      selectedDate.getMonth() + 1,
                      0
                    ) < new Date(EXEC_DTHU_NDS.LAST_DATE)
                      ? sumDateInMonth
                      : new Date(EXEC_DTHU_NDS.LAST_DATE).getDate())) *
                    sumDateInMonth *
                    100) /
                    (PLAN_DTHU_NDS.PYE * 1000000)
                ) > 100
                  ? "bg-green"
                  : "bg-red"
              }
            >
              {loadingExec || loadingPlan ? (
                <LoadingComponent />
              ) : EXEC_DTHU_NDS.PYE && PLAN_DTHU_NDS.PYE ? (
                convertToFloat2Fixed(
                  ((EXEC_DTHU_NDS.PYE /
                    (new Date(
                      selectedDate.getFullYear(),
                      selectedDate.getMonth() + 1,
                      0
                    ) < new Date(EXEC_DTHU_NDS.LAST_DATE)
                      ? sumDateInMonth
                      : new Date(EXEC_DTHU_NDS.LAST_DATE).getDate())) *
                    sumDateInMonth *
                    100) /
                    (PLAN_DTHU_NDS.PYE * 1000000)
                )
              ) : (
                ""
              )}
            </td>
            <td
              className={
                parseFloat(
                  ((EXEC_DTHU_NDS.DNO /
                    (new Date(
                      selectedDate.getFullYear(),
                      selectedDate.getMonth() + 1,
                      0
                    ) < new Date(EXEC_DTHU_NDS.LAST_DATE)
                      ? sumDateInMonth
                      : new Date(EXEC_DTHU_NDS.LAST_DATE).getDate())) *
                    sumDateInMonth *
                    100) /
                    (PLAN_DTHU_NDS.DNO * 1000000)
                ) > 100
                  ? "bg-green"
                  : "bg-red"
              }
            >
              {loadingExec || loadingPlan ? (
                <LoadingComponent />
              ) : EXEC_DTHU_NDS.DNO && PLAN_DTHU_NDS.DNO ? (
                convertToFloat2Fixed(
                  ((EXEC_DTHU_NDS.DNO /
                    (new Date(
                      selectedDate.getFullYear(),
                      selectedDate.getMonth() + 1,
                      0
                    ) < new Date(EXEC_DTHU_NDS.LAST_DATE)
                      ? sumDateInMonth
                      : new Date(EXEC_DTHU_NDS.LAST_DATE).getDate())) *
                    sumDateInMonth *
                    100) /
                    (PLAN_DTHU_NDS.DNO * 1000000)
                )
              ) : (
                ""
              )}
            </td>
            <td
              className={
                parseFloat(
                  ((EXEC_DTHU_NDS.KON /
                    (new Date(
                      selectedDate.getFullYear(),
                      selectedDate.getMonth() + 1,
                      0
                    ) < new Date(EXEC_DTHU_NDS.LAST_DATE)
                      ? sumDateInMonth
                      : new Date(EXEC_DTHU_NDS.LAST_DATE).getDate())) *
                    sumDateInMonth *
                    100) /
                    (PLAN_DTHU_NDS.KON * 1000000)
                ) > 100
                  ? "bg-green"
                  : "bg-red"
              }
            >
              {loadingExec || loadingPlan ? (
                <LoadingComponent />
              ) : EXEC_DTHU_NDS.KON && PLAN_DTHU_NDS.KON ? (
                convertToFloat2Fixed(
                  ((EXEC_DTHU_NDS.KON /
                    (new Date(
                      selectedDate.getFullYear(),
                      selectedDate.getMonth() + 1,
                      0
                    ) < new Date(EXEC_DTHU_NDS.LAST_DATE)
                      ? sumDateInMonth
                      : new Date(EXEC_DTHU_NDS.LAST_DATE).getDate())) *
                    sumDateInMonth *
                    100) /
                    (PLAN_DTHU_NDS.KON * 1000000)
                )
              ) : (
                ""
              )}
            </td>
            <td
              className={
                parseFloat(
                  ((EXEC_DTHU_NDS.CTY7 /
                    (new Date(
                      selectedDate.getFullYear(),
                      selectedDate.getMonth() + 1,
                      0
                    ) < new Date(EXEC_DTHU_NDS.LAST_DATE)
                      ? sumDateInMonth
                      : new Date(EXEC_DTHU_NDS.LAST_DATE).getDate())) *
                    sumDateInMonth *
                    100) /
                    (PLAN_DTHU_NDS.CTY7 * 1000000)
                ) > 100
                  ? "bg-green"
                  : "bg-red"
              }
            >
              {loadingExec || loadingPlan ? (
                <LoadingComponent />
              ) : EXEC_DTHU_NDS.CTY7 && PLAN_DTHU_NDS.CTY7 ? (
                convertToFloat2Fixed(
                  ((EXEC_DTHU_NDS.CTY7 /
                    (new Date(
                      selectedDate.getFullYear(),
                      selectedDate.getMonth() + 1,
                      0
                    ) < new Date(EXEC_DTHU_NDS.LAST_DATE)
                      ? sumDateInMonth
                      : new Date(EXEC_DTHU_NDS.LAST_DATE).getDate())) *
                    sumDateInMonth *
                    100) /
                    (PLAN_DTHU_NDS.CTY7 * 1000000)
                )
              ) : (
                ""
              )}
            </td>
          </tr>
          <tr>
            <td rowSpan={4} className="text-sub2">
              4
            </td>
            <td rowSpan={4} className="text-sub2 cell-kpi">
              Doanh thu thương hiệu giới trẻ
            </td>
            <td rowSpan={4} className="kpi-dvt">
              triệu đồng
            </td>
            <td className="text-sub4 kpi-kht">KHT</td>
            <td className="cell-number">
              {loadingPlan ? (
                <LoadingComponent />
              ) : PLAN_DTHU_SAYMEE.KHO ? (
                convertToFloat2Fixed(PLAN_DTHU_SAYMEE.KHO)
              ) : (
                ""
              )}
            </td>
            <td className="cell-number">
              {loadingPlan ? (
                <LoadingComponent />
              ) : PLAN_DTHU_SAYMEE.DLA ? (
                convertToFloat2Fixed(PLAN_DTHU_SAYMEE.DLA)
              ) : (
                ""
              )}
            </td>
            <td className="cell-number">
              {loadingPlan ? (
                <LoadingComponent />
              ) : PLAN_DTHU_SAYMEE.GLA ? (
                convertToFloat2Fixed(PLAN_DTHU_SAYMEE.GLA)
              ) : (
                ""
              )}
            </td>
            <td className="cell-number">
              {loadingPlan ? (
                <LoadingComponent />
              ) : PLAN_DTHU_SAYMEE.PYE ? (
                convertToFloat2Fixed(PLAN_DTHU_SAYMEE.PYE)
              ) : (
                ""
              )}
            </td>
            <td className="cell-number">
              {loadingPlan ? (
                <LoadingComponent />
              ) : PLAN_DTHU_SAYMEE.DNO ? (
                convertToFloat2Fixed(PLAN_DTHU_SAYMEE.DNO)
              ) : (
                ""
              )}
            </td>
            <td className="cell-number">
              {loadingPlan ? (
                <LoadingComponent />
              ) : PLAN_DTHU_SAYMEE.KON ? (
                convertToFloat2Fixed(PLAN_DTHU_SAYMEE.KON)
              ) : (
                ""
              )}
            </td>
            <td className="cell-number">
              {loadingPlan ? (
                <LoadingComponent />
              ) : PLAN_DTHU_SAYMEE.CTY7 ? (
                convertToFloat2Fixed(PLAN_DTHU_SAYMEE.CTY7)
              ) : (
                ""
              )}
            </td>
            <td rowSpan={4} className="cell-donviphutrach">
              DVVT
              <br />
              <span>
                {EXEC_DTHU_SAYMEE.LAST_DATE
                  ? getFormattedDate(new Date(EXEC_DTHU_SAYMEE.LAST_DATE))
                  : ""}
              </span>
            </td>
          </tr>
          <tr>
            <td className="text-sub4 kpi-thlk">THLK</td>
            <td className="cell-number">
              {loadingExec ? (
                <LoadingComponent />
              ) : EXEC_DTHU_SAYMEE.KHO ? (
                convertToFloat2Fixed(EXEC_DTHU_SAYMEE.KHO / 1000000)
              ) : (
                ""
              )}
            </td>
            <td className="cell-number">
              {loadingExec ? (
                <LoadingComponent />
              ) : EXEC_DTHU_SAYMEE.DLA ? (
                convertToFloat2Fixed(EXEC_DTHU_SAYMEE.DLA / 1000000)
              ) : (
                ""
              )}
            </td>
            <td className="cell-number">
              {loadingExec ? (
                <LoadingComponent />
              ) : EXEC_DTHU_SAYMEE.GLA ? (
                convertToFloat2Fixed(EXEC_DTHU_SAYMEE.GLA / 1000000)
              ) : (
                ""
              )}
            </td>
            <td className="cell-number">
              {loadingExec ? (
                <LoadingComponent />
              ) : EXEC_DTHU_SAYMEE.PYE ? (
                convertToFloat2Fixed(EXEC_DTHU_SAYMEE.PYE / 1000000)
              ) : (
                ""
              )}
            </td>
            <td className="cell-number">
              {loadingExec ? (
                <LoadingComponent />
              ) : EXEC_DTHU_SAYMEE.DNO ? (
                convertToFloat2Fixed(EXEC_DTHU_SAYMEE.DNO / 1000000)
              ) : (
                ""
              )}
            </td>
            <td className="cell-number">
              {loadingExec ? (
                <LoadingComponent />
              ) : EXEC_DTHU_SAYMEE.KON ? (
                convertToFloat2Fixed(EXEC_DTHU_SAYMEE.KON / 1000000)
              ) : (
                ""
              )}
            </td>
            <td className="cell-number">
              {loadingExec ? (
                <LoadingComponent />
              ) : EXEC_DTHU_SAYMEE.CTY7 ? (
                convertToFloat2Fixed(EXEC_DTHU_SAYMEE.CTY7 / 1000000)
              ) : (
                ""
              )}
            </td>
          </tr>
          <tr>
            <td className="text-sub4 kpi-percent-lk">%HTKH </td>
            <td className="cell-number">
              {loadingExec || loadingPlan ? (
                <LoadingComponent />
              ) : EXEC_DTHU_SAYMEE.KHO && PLAN_DTHU_SAYMEE.KHO ? (
                convertToFloat2Fixed(
                  (EXEC_DTHU_SAYMEE.KHO * 100) /
                    (PLAN_DTHU_SAYMEE.KHO * 1000000)
                )
              ) : (
                ""
              )}
            </td>
            <td className="cell-number">
              {loadingExec || loadingPlan ? (
                <LoadingComponent />
              ) : EXEC_DTHU_SAYMEE.DLA && PLAN_DTHU_SAYMEE.DLA ? (
                convertToFloat2Fixed(
                  (EXEC_DTHU_SAYMEE.DLA * 100) /
                    (PLAN_DTHU_SAYMEE.DLA * 1000000)
                )
              ) : (
                ""
              )}
            </td>
            <td className="cell-number">
              {loadingExec || loadingPlan ? (
                <LoadingComponent />
              ) : EXEC_DTHU_SAYMEE.GLA && PLAN_DTHU_SAYMEE.GLA ? (
                convertToFloat2Fixed(
                  (EXEC_DTHU_SAYMEE.GLA * 100) /
                    (PLAN_DTHU_SAYMEE.GLA * 1000000)
                )
              ) : (
                ""
              )}
            </td>
            <td className="cell-number">
              {loadingExec || loadingPlan ? (
                <LoadingComponent />
              ) : EXEC_DTHU_SAYMEE.PYE && PLAN_DTHU_SAYMEE.PYE ? (
                convertToFloat2Fixed(
                  (EXEC_DTHU_SAYMEE.PYE * 100) /
                    (PLAN_DTHU_SAYMEE.PYE * 1000000)
                )
              ) : (
                ""
              )}
            </td>
            <td className="cell-number">
              {loadingExec || loadingPlan ? (
                <LoadingComponent />
              ) : EXEC_DTHU_SAYMEE.DNO && PLAN_DTHU_SAYMEE.DNO ? (
                convertToFloat2Fixed(
                  (EXEC_DTHU_SAYMEE.DNO * 100) /
                    (PLAN_DTHU_SAYMEE.DNO * 1000000)
                )
              ) : (
                ""
              )}
            </td>
            <td className="cell-number">
              {loadingExec || loadingPlan ? (
                <LoadingComponent />
              ) : EXEC_DTHU_SAYMEE.KON && PLAN_DTHU_SAYMEE.KON ? (
                convertToFloat2Fixed(
                  (EXEC_DTHU_SAYMEE.KON * 100) /
                    (PLAN_DTHU_SAYMEE.KON * 1000000)
                )
              ) : (
                ""
              )}
            </td>
            <td className="cell-number">
              {loadingExec || loadingPlan ? (
                <LoadingComponent />
              ) : EXEC_DTHU_SAYMEE.CTY7 && PLAN_DTHU_SAYMEE.CTY7 ? (
                convertToFloat2Fixed(
                  (EXEC_DTHU_SAYMEE.CTY7 * 100) /
                    (PLAN_DTHU_SAYMEE.CTY7 * 1000000)
                )
              ) : (
                ""
              )}
            </td>
          </tr>
          <tr>
            <td className="text-sub4 kpi-percent-th">Ước %HTKH</td>
            <td
              className={
                parseFloat(
                  ((EXEC_DTHU_SAYMEE.KHO /
                    (new Date(
                      selectedDate.getFullYear(),
                      selectedDate.getMonth() + 1,
                      0
                    ) < new Date(EXEC_DTHU_SAYMEE.LAST_DATE)
                      ? sumDateInMonth
                      : new Date(EXEC_DTHU_SAYMEE.LAST_DATE).getDate())) *
                    sumDateInMonth *
                    100) /
                    (PLAN_DTHU_SAYMEE.KHO * 1000000)
                ) > 100
                  ? "bg-green"
                  : "bg-red"
              }
            >
              {loadingExec || loadingPlan ? (
                <LoadingComponent />
              ) : EXEC_DTHU_SAYMEE.KHO && PLAN_DTHU_SAYMEE.KHO ? (
                convertToFloat2Fixed(
                  ((EXEC_DTHU_SAYMEE.KHO /
                    (new Date(
                      selectedDate.getFullYear(),
                      selectedDate.getMonth() + 1,
                      0
                    ) < new Date(EXEC_DTHU_SAYMEE.LAST_DATE)
                      ? sumDateInMonth
                      : new Date(EXEC_DTHU_SAYMEE.LAST_DATE).getDate())) *
                    sumDateInMonth *
                    100) /
                    (PLAN_DTHU_SAYMEE.KHO * 1000000)
                )
              ) : (
                ""
              )}
            </td>
            <td
              className={
                parseFloat(
                  ((EXEC_DTHU_SAYMEE.DLA /
                    (new Date(
                      selectedDate.getFullYear(),
                      selectedDate.getMonth() + 1,
                      0
                    ) < new Date(EXEC_DTHU_SAYMEE.LAST_DATE)
                      ? sumDateInMonth
                      : new Date(EXEC_DTHU_SAYMEE.LAST_DATE).getDate())) *
                    sumDateInMonth *
                    100) /
                    (PLAN_DTHU_SAYMEE.DLA * 1000000)
                ) > 100
                  ? "bg-green"
                  : "bg-red"
              }
            >
              {loadingExec || loadingPlan ? (
                <LoadingComponent />
              ) : EXEC_DTHU_SAYMEE.DLA && PLAN_DTHU_SAYMEE.DLA ? (
                convertToFloat2Fixed(
                  ((EXEC_DTHU_SAYMEE.DLA /
                    (new Date(
                      selectedDate.getFullYear(),
                      selectedDate.getMonth() + 1,
                      0
                    ) < new Date(EXEC_DTHU_SAYMEE.LAST_DATE)
                      ? sumDateInMonth
                      : new Date(EXEC_DTHU_SAYMEE.LAST_DATE).getDate())) *
                    sumDateInMonth *
                    100) /
                    (PLAN_DTHU_SAYMEE.DLA * 1000000)
                )
              ) : (
                ""
              )}
            </td>
            <td
              className={
                parseFloat(
                  ((EXEC_DTHU_SAYMEE.GLA /
                    (new Date(
                      selectedDate.getFullYear(),
                      selectedDate.getMonth() + 1,
                      0
                    ) < new Date(EXEC_DTHU_SAYMEE.LAST_DATE)
                      ? sumDateInMonth
                      : new Date(EXEC_DTHU_SAYMEE.LAST_DATE).getDate())) *
                    sumDateInMonth *
                    100) /
                    (PLAN_DTHU_SAYMEE.GLA * 1000000)
                ) > 100
                  ? "bg-green"
                  : "bg-red"
              }
            >
              {loadingExec || loadingPlan ? (
                <LoadingComponent />
              ) : EXEC_DTHU_SAYMEE.GLA && PLAN_DTHU_SAYMEE.GLA ? (
                convertToFloat2Fixed(
                  ((EXEC_DTHU_SAYMEE.GLA /
                    (new Date(
                      selectedDate.getFullYear(),
                      selectedDate.getMonth() + 1,
                      0
                    ) < new Date(EXEC_DTHU_SAYMEE.LAST_DATE)
                      ? sumDateInMonth
                      : new Date(EXEC_DTHU_SAYMEE.LAST_DATE).getDate())) *
                    sumDateInMonth *
                    100) /
                    (PLAN_DTHU_SAYMEE.GLA * 1000000)
                )
              ) : (
                ""
              )}
            </td>
            <td
              className={
                parseFloat(
                  ((EXEC_DTHU_SAYMEE.PYE /
                    (new Date(
                      selectedDate.getFullYear(),
                      selectedDate.getMonth() + 1,
                      0
                    ) < new Date(EXEC_DTHU_SAYMEE.LAST_DATE)
                      ? sumDateInMonth
                      : new Date(EXEC_DTHU_SAYMEE.LAST_DATE).getDate())) *
                    sumDateInMonth *
                    100) /
                    (PLAN_DTHU_SAYMEE.PYE * 1000000)
                ) > 100
                  ? "bg-green"
                  : "bg-red"
              }
            >
              {loadingExec || loadingPlan ? (
                <LoadingComponent />
              ) : EXEC_DTHU_SAYMEE.PYE && PLAN_DTHU_SAYMEE.PYE ? (
                convertToFloat2Fixed(
                  ((EXEC_DTHU_SAYMEE.PYE /
                    (new Date(
                      selectedDate.getFullYear(),
                      selectedDate.getMonth() + 1,
                      0
                    ) < new Date(EXEC_DTHU_SAYMEE.LAST_DATE)
                      ? sumDateInMonth
                      : new Date(EXEC_DTHU_SAYMEE.LAST_DATE).getDate())) *
                    sumDateInMonth *
                    100) /
                    (PLAN_DTHU_SAYMEE.PYE * 1000000)
                )
              ) : (
                ""
              )}
            </td>
            <td
              className={
                parseFloat(
                  ((EXEC_DTHU_SAYMEE.DNO /
                    (new Date(
                      selectedDate.getFullYear(),
                      selectedDate.getMonth() + 1,
                      0
                    ) < new Date(EXEC_DTHU_SAYMEE.LAST_DATE)
                      ? sumDateInMonth
                      : new Date(EXEC_DTHU_SAYMEE.LAST_DATE).getDate())) *
                    sumDateInMonth *
                    100) /
                    (PLAN_DTHU_SAYMEE.DNO * 1000000)
                ) > 100
                  ? "bg-green"
                  : "bg-red"
              }
            >
              {loadingExec || loadingPlan ? (
                <LoadingComponent />
              ) : EXEC_DTHU_SAYMEE.DNO && PLAN_DTHU_SAYMEE.DNO ? (
                convertToFloat2Fixed(
                  ((EXEC_DTHU_SAYMEE.DNO /
                    (new Date(
                      selectedDate.getFullYear(),
                      selectedDate.getMonth() + 1,
                      0
                    ) < new Date(EXEC_DTHU_SAYMEE.LAST_DATE)
                      ? sumDateInMonth
                      : new Date(EXEC_DTHU_SAYMEE.LAST_DATE).getDate())) *
                    sumDateInMonth *
                    100) /
                    (PLAN_DTHU_SAYMEE.DNO * 1000000)
                )
              ) : (
                ""
              )}
            </td>
            <td
              className={
                parseFloat(
                  ((EXEC_DTHU_SAYMEE.KON /
                    (new Date(
                      selectedDate.getFullYear(),
                      selectedDate.getMonth() + 1,
                      0
                    ) < new Date(EXEC_DTHU_SAYMEE.LAST_DATE)
                      ? sumDateInMonth
                      : new Date(EXEC_DTHU_SAYMEE.LAST_DATE).getDate())) *
                    sumDateInMonth *
                    100) /
                    (PLAN_DTHU_SAYMEE.KON * 1000000)
                ) > 100
                  ? "bg-green"
                  : "bg-red"
              }
            >
              {loadingExec || loadingPlan ? (
                <LoadingComponent />
              ) : EXEC_DTHU_SAYMEE.KON && PLAN_DTHU_SAYMEE.KON ? (
                convertToFloat2Fixed(
                  ((EXEC_DTHU_SAYMEE.KON /
                    (new Date(
                      selectedDate.getFullYear(),
                      selectedDate.getMonth() + 1,
                      0
                    ) < new Date(EXEC_DTHU_SAYMEE.LAST_DATE)
                      ? sumDateInMonth
                      : new Date(EXEC_DTHU_SAYMEE.LAST_DATE).getDate())) *
                    sumDateInMonth *
                    100) /
                    (PLAN_DTHU_SAYMEE.KON * 1000000)
                )
              ) : (
                ""
              )}
            </td>
            <td
              className={
                parseFloat(
                  ((EXEC_DTHU_SAYMEE.CTY7 /
                    (new Date(
                      selectedDate.getFullYear(),
                      selectedDate.getMonth() + 1,
                      0
                    ) < new Date(EXEC_DTHU_SAYMEE.LAST_DATE)
                      ? sumDateInMonth
                      : new Date(EXEC_DTHU_SAYMEE.LAST_DATE).getDate())) *
                    sumDateInMonth *
                    100) /
                    (PLAN_DTHU_SAYMEE.CTY7 * 1000000)
                ) > 100
                  ? "bg-green"
                  : "bg-red"
              }
            >
              {loadingExec || loadingPlan ? (
                <LoadingComponent />
              ) : EXEC_DTHU_SAYMEE.CTY7 && PLAN_DTHU_SAYMEE.CTY7 ? (
                convertToFloat2Fixed(
                  ((EXEC_DTHU_SAYMEE.CTY7 /
                    (new Date(
                      selectedDate.getFullYear(),
                      selectedDate.getMonth() + 1,
                      0
                    ) < new Date(EXEC_DTHU_SAYMEE.LAST_DATE)
                      ? sumDateInMonth
                      : new Date(EXEC_DTHU_SAYMEE.LAST_DATE).getDate())) *
                    sumDateInMonth *
                    100) /
                    (PLAN_DTHU_SAYMEE.CTY7 * 1000000)
                )
              ) : (
                ""
              )}
            </td>
          </tr>

          <tr>
            <td rowSpan={4} className="text-sub2">
              5
            </td>
            <td rowSpan={4} className="text-sub2 cell-kpi">
              Doanh thu Cloud DC
            </td>
            <td rowSpan={4} className="kpi-dvt">
              triệu đồng
            </td>
            <td className="text-sub4 kpi-kht">KHT</td>
            <td className="cell-number">
              {loadingPlan ? (
                <LoadingComponent />
              ) : PLAN_DTHU_CLOUD_DC.KHO ? (
                convertToFloat2Fixed(PLAN_DTHU_CLOUD_DC.KHO)
              ) : (
                ""
              )}
            </td>
            <td className="cell-number">
              {loadingPlan ? (
                <LoadingComponent />
              ) : PLAN_DTHU_CLOUD_DC.DLA ? (
                convertToFloat2Fixed(PLAN_DTHU_CLOUD_DC.DLA)
              ) : (
                ""
              )}
            </td>
            <td className="cell-number">
              {loadingPlan ? (
                <LoadingComponent />
              ) : PLAN_DTHU_CLOUD_DC.GLA ? (
                convertToFloat2Fixed(PLAN_DTHU_CLOUD_DC.GLA)
              ) : (
                ""
              )}
            </td>
            <td className="cell-number">
              {loadingPlan ? (
                <LoadingComponent />
              ) : PLAN_DTHU_CLOUD_DC.PYE ? (
                convertToFloat2Fixed(PLAN_DTHU_CLOUD_DC.PYE)
              ) : (
                ""
              )}
            </td>
            <td className="cell-number">
              {loadingPlan ? (
                <LoadingComponent />
              ) : PLAN_DTHU_CLOUD_DC.DNO ? (
                convertToFloat2Fixed(PLAN_DTHU_CLOUD_DC.DNO)
              ) : (
                ""
              )}
            </td>
            <td className="cell-number">
              {loadingPlan ? (
                <LoadingComponent />
              ) : PLAN_DTHU_CLOUD_DC.KON ? (
                convertToFloat2Fixed(PLAN_DTHU_CLOUD_DC.KON)
              ) : (
                ""
              )}
            </td>
            <td className="cell-number">
              {loadingPlan ? (
                <LoadingComponent />
              ) : PLAN_DTHU_CLOUD_DC.CTY7 ? (
                convertToFloat2Fixed(PLAN_DTHU_CLOUD_DC.CTY7)
              ) : (
                ""
              )}
            </td>
            <td rowSpan={4} className="cell-donviphutrach">
              CNS
              <br />
              <span>
                {EXEC_DTHU_CLOUD_DC.LAST_DATE
                  ? getFormattedDate(new Date(EXEC_DTHU_CLOUD_DC.LAST_DATE))
                  : ""}
              </span>
            </td>
          </tr>
          <tr>
            <td className="text-sub4 kpi-thlk">THLK</td>
            <td className="cell-number">
              {loadingExec ? (
                <LoadingComponent />
              ) : EXEC_DTHU_CLOUD_DC.KHO ? (
                convertToFloat2Fixed(EXEC_DTHU_CLOUD_DC.KHO / 1000000)
              ) : (
                ""
              )}
            </td>
            <td className="cell-number">
              {loadingExec ? (
                <LoadingComponent />
              ) : EXEC_DTHU_CLOUD_DC.DLA ? (
                convertToFloat2Fixed(EXEC_DTHU_CLOUD_DC.DLA / 1000000)
              ) : (
                ""
              )}
            </td>
            <td className="cell-number">
              {loadingExec ? (
                <LoadingComponent />
              ) : EXEC_DTHU_CLOUD_DC.GLA ? (
                convertToFloat2Fixed(EXEC_DTHU_CLOUD_DC.GLA / 1000000)
              ) : (
                ""
              )}
            </td>
            <td className="cell-number">
              {loadingExec ? (
                <LoadingComponent />
              ) : EXEC_DTHU_CLOUD_DC.PYE ? (
                convertToFloat2Fixed(EXEC_DTHU_CLOUD_DC.PYE / 1000000)
              ) : (
                ""
              )}
            </td>
            <td className="cell-number">
              {loadingExec ? (
                <LoadingComponent />
              ) : EXEC_DTHU_CLOUD_DC.DNO ? (
                convertToFloat2Fixed(EXEC_DTHU_CLOUD_DC.DNO / 1000000)
              ) : (
                ""
              )}
            </td>
            <td className="cell-number">
              {loadingExec ? (
                <LoadingComponent />
              ) : EXEC_DTHU_CLOUD_DC.KON ? (
                convertToFloat2Fixed(EXEC_DTHU_CLOUD_DC.KON / 1000000)
              ) : (
                ""
              )}
            </td>
            <td className="cell-number">
              {loadingExec ? (
                <LoadingComponent />
              ) : EXEC_DTHU_CLOUD_DC.CTY7 ? (
                convertToFloat2Fixed(EXEC_DTHU_CLOUD_DC.CTY7 / 1000000)
              ) : (
                ""
              )}
            </td>
          </tr>
          <tr>
            <td className="text-sub4 kpi-percent-lk">%HTKH </td>
            <td className="cell-number">
              {loadingExec || loadingPlan ? (
                <LoadingComponent />
              ) : EXEC_DTHU_CLOUD_DC.KHO && PLAN_DTHU_CLOUD_DC.KHO ? (
                convertToFloat2Fixed(
                  (EXEC_DTHU_CLOUD_DC.KHO * 100) /
                    (PLAN_DTHU_CLOUD_DC.KHO * 1000000)
                )
              ) : (
                ""
              )}
            </td>
            <td className="cell-number">
              {loadingExec || loadingPlan ? (
                <LoadingComponent />
              ) : EXEC_DTHU_CLOUD_DC.DLA && PLAN_DTHU_CLOUD_DC.DLA ? (
                convertToFloat2Fixed(
                  (EXEC_DTHU_CLOUD_DC.DLA * 100) /
                    (PLAN_DTHU_CLOUD_DC.DLA * 1000000)
                )
              ) : (
                ""
              )}
            </td>
            <td className="cell-number">
              {loadingExec || loadingPlan ? (
                <LoadingComponent />
              ) : EXEC_DTHU_CLOUD_DC.GLA && PLAN_DTHU_CLOUD_DC.GLA ? (
                convertToFloat2Fixed(
                  (EXEC_DTHU_CLOUD_DC.GLA * 100) /
                    (PLAN_DTHU_CLOUD_DC.GLA * 1000000)
                )
              ) : (
                ""
              )}
            </td>
            <td className="cell-number">
              {loadingExec || loadingPlan ? (
                <LoadingComponent />
              ) : EXEC_DTHU_CLOUD_DC.PYE && PLAN_DTHU_CLOUD_DC.PYE ? (
                convertToFloat2Fixed(
                  (EXEC_DTHU_CLOUD_DC.PYE * 100) /
                    (PLAN_DTHU_CLOUD_DC.PYE * 1000000)
                )
              ) : (
                ""
              )}
            </td>
            <td className="cell-number">
              {loadingExec || loadingPlan ? (
                <LoadingComponent />
              ) : EXEC_DTHU_CLOUD_DC.DNO && PLAN_DTHU_CLOUD_DC.DNO ? (
                convertToFloat2Fixed(
                  (EXEC_DTHU_CLOUD_DC.DNO * 100) /
                    (PLAN_DTHU_CLOUD_DC.DNO * 1000000)
                )
              ) : (
                ""
              )}
            </td>
            <td className="cell-number">
              {loadingExec || loadingPlan ? (
                <LoadingComponent />
              ) : EXEC_DTHU_CLOUD_DC.KON && PLAN_DTHU_CLOUD_DC.KON ? (
                convertToFloat2Fixed(
                  (EXEC_DTHU_CLOUD_DC.KON * 100) /
                    (PLAN_DTHU_CLOUD_DC.KON * 1000000)
                )
              ) : (
                ""
              )}
            </td>
            <td className="cell-number">
              {loadingExec || loadingPlan ? (
                <LoadingComponent />
              ) : EXEC_DTHU_CLOUD_DC.CTY7 && PLAN_DTHU_CLOUD_DC.CTY7 ? (
                convertToFloat2Fixed(
                  (EXEC_DTHU_CLOUD_DC.CTY7 * 100) /
                    (PLAN_DTHU_CLOUD_DC.CTY7 * 1000000)
                )
              ) : (
                ""
              )}
            </td>
          </tr>
          <tr>
            <td className="text-sub4 kpi-percent-th">Ước %HTKH</td>
            <td
              className={
                parseFloat(
                  ((EXEC_DTHU_CLOUD_DC.KHO /
                    (new Date(
                      selectedDate.getFullYear(),
                      selectedDate.getMonth() + 1,
                      0
                    ) < new Date(EXEC_DTHU_CLOUD_DC.LAST_DATE)
                      ? sumDateInMonth
                      : new Date(EXEC_DTHU_CLOUD_DC.LAST_DATE).getDate())) *
                    sumDateInMonth *
                    100) /
                    (PLAN_DTHU_CLOUD_DC.KHO * 1000000)
                ) > 100
                  ? "bg-green"
                  : "bg-red"
              }
            >
              {loadingExec || loadingPlan ? (
                <LoadingComponent />
              ) : EXEC_DTHU_CLOUD_DC.KHO && PLAN_DTHU_CLOUD_DC.KHO ? (
                convertToFloat2Fixed(
                  ((EXEC_DTHU_CLOUD_DC.KHO /
                    (new Date(
                      selectedDate.getFullYear(),
                      selectedDate.getMonth() + 1,
                      0
                    ) < new Date(EXEC_DTHU_CLOUD_DC.LAST_DATE)
                      ? sumDateInMonth
                      : new Date(EXEC_DTHU_CLOUD_DC.LAST_DATE).getDate())) *
                    sumDateInMonth *
                    100) /
                    (PLAN_DTHU_CLOUD_DC.KHO * 1000000)
                )
              ) : (
                ""
              )}
            </td>
            <td
              className={
                parseFloat(
                  ((EXEC_DTHU_CLOUD_DC.DLA /
                    (new Date(
                      selectedDate.getFullYear(),
                      selectedDate.getMonth() + 1,
                      0
                    ) < new Date(EXEC_DTHU_CLOUD_DC.LAST_DATE)
                      ? sumDateInMonth
                      : new Date(EXEC_DTHU_CLOUD_DC.LAST_DATE).getDate())) *
                    sumDateInMonth *
                    100) /
                    (PLAN_DTHU_CLOUD_DC.DLA * 1000000)
                ) > 100
                  ? "bg-green"
                  : "bg-red"
              }
            >
              {loadingExec || loadingPlan ? (
                <LoadingComponent />
              ) : EXEC_DTHU_CLOUD_DC.DLA && PLAN_DTHU_CLOUD_DC.DLA ? (
                convertToFloat2Fixed(
                  ((EXEC_DTHU_CLOUD_DC.DLA /
                    (new Date(
                      selectedDate.getFullYear(),
                      selectedDate.getMonth() + 1,
                      0
                    ) < new Date(EXEC_DTHU_CLOUD_DC.LAST_DATE)
                      ? sumDateInMonth
                      : new Date(EXEC_DTHU_CLOUD_DC.LAST_DATE).getDate())) *
                    sumDateInMonth *
                    100) /
                    (PLAN_DTHU_CLOUD_DC.DLA * 1000000)
                )
              ) : (
                ""
              )}
            </td>
            <td
              className={
                parseFloat(
                  ((EXEC_DTHU_CLOUD_DC.GLA /
                    (new Date(
                      selectedDate.getFullYear(),
                      selectedDate.getMonth() + 1,
                      0
                    ) < new Date(EXEC_DTHU_CLOUD_DC.LAST_DATE)
                      ? sumDateInMonth
                      : new Date(EXEC_DTHU_CLOUD_DC.LAST_DATE).getDate())) *
                    sumDateInMonth *
                    100) /
                    (PLAN_DTHU_CLOUD_DC.GLA * 1000000)
                ) > 100
                  ? "bg-green"
                  : "bg-red"
              }
            >
              {loadingExec || loadingPlan ? (
                <LoadingComponent />
              ) : EXEC_DTHU_CLOUD_DC.GLA && PLAN_DTHU_CLOUD_DC.GLA ? (
                convertToFloat2Fixed(
                  ((EXEC_DTHU_CLOUD_DC.GLA /
                    (new Date(
                      selectedDate.getFullYear(),
                      selectedDate.getMonth() + 1,
                      0
                    ) < new Date(EXEC_DTHU_CLOUD_DC.LAST_DATE)
                      ? sumDateInMonth
                      : new Date(EXEC_DTHU_CLOUD_DC.LAST_DATE).getDate())) *
                    sumDateInMonth *
                    100) /
                    (PLAN_DTHU_CLOUD_DC.GLA * 1000000)
                )
              ) : (
                ""
              )}
            </td>
            <td
              className={
                parseFloat(
                  ((EXEC_DTHU_CLOUD_DC.PYE /
                    (new Date(
                      selectedDate.getFullYear(),
                      selectedDate.getMonth() + 1,
                      0
                    ) < new Date(EXEC_DTHU_CLOUD_DC.LAST_DATE)
                      ? sumDateInMonth
                      : new Date(EXEC_DTHU_CLOUD_DC.LAST_DATE).getDate())) *
                    sumDateInMonth *
                    100) /
                    (PLAN_DTHU_CLOUD_DC.PYE * 1000000)
                ) > 100
                  ? "bg-green"
                  : "bg-red"
              }
            >
              {loadingExec || loadingPlan ? (
                <LoadingComponent />
              ) : EXEC_DTHU_CLOUD_DC.PYE && PLAN_DTHU_CLOUD_DC.PYE ? (
                convertToFloat2Fixed(
                  ((EXEC_DTHU_CLOUD_DC.PYE /
                    (new Date(
                      selectedDate.getFullYear(),
                      selectedDate.getMonth() + 1,
                      0
                    ) < new Date(EXEC_DTHU_CLOUD_DC.LAST_DATE)
                      ? sumDateInMonth
                      : new Date(EXEC_DTHU_CLOUD_DC.LAST_DATE).getDate())) *
                    sumDateInMonth *
                    100) /
                    (PLAN_DTHU_CLOUD_DC.PYE * 1000000)
                )
              ) : (
                ""
              )}
            </td>
            <td
              className={
                parseFloat(
                  ((EXEC_DTHU_CLOUD_DC.DNO /
                    (new Date(
                      selectedDate.getFullYear(),
                      selectedDate.getMonth() + 1,
                      0
                    ) < new Date(EXEC_DTHU_CLOUD_DC.LAST_DATE)
                      ? sumDateInMonth
                      : new Date(EXEC_DTHU_CLOUD_DC.LAST_DATE).getDate())) *
                    sumDateInMonth *
                    100) /
                    (PLAN_DTHU_CLOUD_DC.DNO * 1000000)
                ) > 100
                  ? "bg-green"
                  : "bg-red"
              }
            >
              {loadingExec || loadingPlan ? (
                <LoadingComponent />
              ) : EXEC_DTHU_CLOUD_DC.DNO && PLAN_DTHU_CLOUD_DC.DNO ? (
                convertToFloat2Fixed(
                  ((EXEC_DTHU_CLOUD_DC.DNO /
                    (new Date(
                      selectedDate.getFullYear(),
                      selectedDate.getMonth() + 1,
                      0
                    ) < new Date(EXEC_DTHU_CLOUD_DC.LAST_DATE)
                      ? sumDateInMonth
                      : new Date(EXEC_DTHU_CLOUD_DC.LAST_DATE).getDate())) *
                    sumDateInMonth *
                    100) /
                    (PLAN_DTHU_CLOUD_DC.DNO * 1000000)
                )
              ) : (
                ""
              )}
            </td>
            <td
              className={
                parseFloat(
                  ((EXEC_DTHU_CLOUD_DC.KON /
                    (new Date(
                      selectedDate.getFullYear(),
                      selectedDate.getMonth() + 1,
                      0
                    ) < new Date(EXEC_DTHU_CLOUD_DC.LAST_DATE)
                      ? sumDateInMonth
                      : new Date(EXEC_DTHU_CLOUD_DC.LAST_DATE).getDate())) *
                    sumDateInMonth *
                    100) /
                    (PLAN_DTHU_CLOUD_DC.KON * 1000000)
                ) > 100
                  ? "bg-green"
                  : "bg-red"
              }
            >
              {loadingExec || loadingPlan ? (
                <LoadingComponent />
              ) : EXEC_DTHU_CLOUD_DC.KON && PLAN_DTHU_CLOUD_DC.KON ? (
                convertToFloat2Fixed(
                  ((EXEC_DTHU_CLOUD_DC.KON /
                    (new Date(
                      selectedDate.getFullYear(),
                      selectedDate.getMonth() + 1,
                      0
                    ) < new Date(EXEC_DTHU_CLOUD_DC.LAST_DATE)
                      ? sumDateInMonth
                      : new Date(EXEC_DTHU_CLOUD_DC.LAST_DATE).getDate())) *
                    sumDateInMonth *
                    100) /
                    (PLAN_DTHU_CLOUD_DC.KON * 1000000)
                )
              ) : (
                ""
              )}
            </td>
            <td
              className={
                parseFloat(
                  ((EXEC_DTHU_CLOUD_DC.CTY7 /
                    (new Date(
                      selectedDate.getFullYear(),
                      selectedDate.getMonth() + 1,
                      0
                    ) < new Date(EXEC_DTHU_CLOUD_DC.LAST_DATE)
                      ? sumDateInMonth
                      : new Date(EXEC_DTHU_CLOUD_DC.LAST_DATE).getDate())) *
                    sumDateInMonth *
                    100) /
                    (PLAN_DTHU_CLOUD_DC.CTY7 * 1000000)
                ) > 100
                  ? "bg-green"
                  : "bg-red"
              }
            >
              {loadingExec || loadingPlan ? (
                <LoadingComponent />
              ) : EXEC_DTHU_CLOUD_DC.CTY7 && PLAN_DTHU_CLOUD_DC.CTY7 ? (
                convertToFloat2Fixed(
                  ((EXEC_DTHU_CLOUD_DC.CTY7 /
                    (new Date(
                      selectedDate.getFullYear(),
                      selectedDate.getMonth() + 1,
                      0
                    ) < new Date(EXEC_DTHU_CLOUD_DC.LAST_DATE)
                      ? sumDateInMonth
                      : new Date(EXEC_DTHU_CLOUD_DC.LAST_DATE).getDate())) *
                    sumDateInMonth *
                    100) /
                    (PLAN_DTHU_CLOUD_DC.CTY7 * 1000000)
                )
              ) : (
                ""
              )}
            </td>
          </tr>
          <tr>
            <td className="text-sub1">II</td>
            <td className="text-sub1" colSpan={12}>
              <span className="text-bold">Viễn cảnh khách hàng</span>
            </td>
          </tr>
          <tr>
            <td className="text-sub2">6</td>
            <td colSpan={11} className="text-sub2">
              Phát triển kênh phân phối
            </td>
          </tr>
          <tr>
            <td rowSpan={4} className="text-sub3">
              6.1
            </td>
            <td rowSpan={4} className="text-sub3 cell-kpi">
              Số lượng điểm C2C<span style={{color:"red"}}>*</span>
            </td>
            <td rowSpan={4} className="kpi-dvt">
              điểm
            </td>
            <td className="text-sub4 kpi-kht">KHT</td>
            <td className="cell-number">
              {loadingPlan ? (
                <LoadingComponent />
              ) : PLAN_SL_C2C.KHO ? (
                convertToFloat2Fixed(PLAN_SL_C2C.KHO)
              ) : (
                ""
              )}
            </td>
            <td className="cell-number">
              {loadingPlan ? (
                <LoadingComponent />
              ) : PLAN_SL_C2C.DLA ? (
                convertToFloat2Fixed(PLAN_SL_C2C.DLA)
              ) : (
                ""
              )}
            </td>
            <td className="cell-number">
              {loadingPlan ? (
                <LoadingComponent />
              ) : PLAN_SL_C2C.GLA ? (
                convertToFloat2Fixed(PLAN_SL_C2C.GLA)
              ) : (
                ""
              )}
            </td>
            <td className="cell-number">
              {loadingPlan ? (
                <LoadingComponent />
              ) : PLAN_SL_C2C.PYE ? (
                convertToFloat2Fixed(PLAN_SL_C2C.PYE)
              ) : (
                ""
              )}
            </td>
            <td className="cell-number">
              {loadingPlan ? (
                <LoadingComponent />
              ) : PLAN_SL_C2C.DNO ? (
                convertToFloat2Fixed(PLAN_SL_C2C.DNO)
              ) : (
                ""
              )}
            </td>
            <td className="cell-number">
              {loadingPlan ? (
                <LoadingComponent />
              ) : PLAN_SL_C2C.KON ? (
                convertToFloat2Fixed(PLAN_SL_C2C.KON)
              ) : (
                ""
              )}
            </td>
            <td className="cell-number">
              {loadingPlan ? (
                <LoadingComponent />
              ) : PLAN_SL_C2C.CTY7 ? (
                convertToFloat2Fixed(PLAN_SL_C2C.CTY7)
              ) : (
                ""
              )}
            </td>
            <td rowSpan={4} className="cell-donviphutrach">
              DVVT
              <br />
              <span>
                {EXEC_SL_C2C.LAST_DATE
                  ? getFormattedDate(new Date(EXEC_SL_C2C.LAST_DATE))
                  : ""}
              </span>
            </td>
          </tr>
          <tr>
            <td className="text-sub4 kpi-thlk">THLK</td>
            <td className="cell-number">
              {loadingExec ? (
                <LoadingComponent />
              ) : EXEC_SL_C2C.KHO ? (
                convertToFloat2Fixed(EXEC_SL_C2C.KHO)
              ) : (
                ""
              )}
            </td>
            <td className="cell-number">
              {loadingExec ? (
                <LoadingComponent />
              ) : EXEC_SL_C2C.DLA ? (
                convertToFloat2Fixed(EXEC_SL_C2C.DLA)
              ) : (
                ""
              )}
            </td>
            <td className="cell-number">
              {loadingExec ? (
                <LoadingComponent />
              ) : EXEC_SL_C2C.GLA ? (
                convertToFloat2Fixed(EXEC_SL_C2C.GLA)
              ) : (
                ""
              )}
            </td>
            <td className="cell-number">
              {loadingExec ? (
                <LoadingComponent />
              ) : EXEC_SL_C2C.PYE ? (
                convertToFloat2Fixed(EXEC_SL_C2C.PYE)
              ) : (
                ""
              )}
            </td>
            <td className="cell-number">
              {loadingExec ? (
                <LoadingComponent />
              ) : EXEC_SL_C2C.DNO ? (
                convertToFloat2Fixed(EXEC_SL_C2C.DNO)
              ) : (
                ""
              )}
            </td>
            <td className="cell-number">
              {loadingExec ? (
                <LoadingComponent />
              ) : EXEC_SL_C2C.KON ? (
                convertToFloat2Fixed(EXEC_SL_C2C.KON)
              ) : (
                ""
              )}
            </td>
            <td className="cell-number">
              {loadingExec ? (
                <LoadingComponent />
              ) : EXEC_SL_C2C.CTY7 ? (
                convertToFloat2Fixed(EXEC_SL_C2C.CTY7)
              ) : (
                ""
              )}
            </td>
          </tr>
          <tr>
            <td className="text-sub4 kpi-percent-lk">%HTKH </td>
            <td className="cell-number">
              {loadingExec || loadingPlan ? (
                <LoadingComponent />
              ) : EXEC_SL_C2C.KHO && PLAN_SL_C2C.KHO ? (
                convertToFloat2Fixed((EXEC_SL_C2C.KHO * 100) / PLAN_SL_C2C.KHO)
              ) : (
                ""
              )}
            </td>
            <td className="cell-number">
              {loadingExec || loadingPlan ? (
                <LoadingComponent />
              ) : EXEC_SL_C2C.DLA && PLAN_SL_C2C.DLA ? (
                convertToFloat2Fixed((EXEC_SL_C2C.DLA * 100) / PLAN_SL_C2C.DLA)
              ) : (
                ""
              )}
            </td>
            <td className="cell-number">
              {loadingExec || loadingPlan ? (
                <LoadingComponent />
              ) : EXEC_SL_C2C.GLA && PLAN_SL_C2C.GLA ? (
                convertToFloat2Fixed((EXEC_SL_C2C.GLA * 100) / PLAN_SL_C2C.GLA)
              ) : (
                ""
              )}
            </td>
            <td className="cell-number">
              {loadingExec || loadingPlan ? (
                <LoadingComponent />
              ) : EXEC_SL_C2C.PYE && PLAN_SL_C2C.PYE ? (
                convertToFloat2Fixed((EXEC_SL_C2C.PYE * 100) / PLAN_SL_C2C.PYE)
              ) : (
                ""
              )}
            </td>
            <td className="cell-number">
              {loadingExec || loadingPlan ? (
                <LoadingComponent />
              ) : EXEC_SL_C2C.DNO && PLAN_SL_C2C.DNO ? (
                convertToFloat2Fixed((EXEC_SL_C2C.DNO * 100) / PLAN_SL_C2C.DNO)
              ) : (
                ""
              )}
            </td>
            <td className="cell-number">
              {loadingExec || loadingPlan ? (
                <LoadingComponent />
              ) : EXEC_SL_C2C.KON && PLAN_SL_C2C.KON ? (
                convertToFloat2Fixed((EXEC_SL_C2C.KON * 100) / PLAN_SL_C2C.KON)
              ) : (
                ""
              )}
            </td>
            <td className="cell-number">
              {loadingExec || loadingPlan ? (
                <LoadingComponent />
              ) : EXEC_SL_C2C.CTY7 && PLAN_SL_C2C.CTY7 ? (
                convertToFloat2Fixed(
                  (EXEC_SL_C2C.CTY7 * 100) / PLAN_SL_C2C.CTY7
                )
              ) : (
                ""
              )}
            </td>
          </tr>
          <tr>
            <td className="text-sub4 kpi-percent-th">Ước %HTKH</td>
            <td
              className={
                parseFloat((EXEC_SL_C2C.KHO * 100) / PLAN_SL_C2C.KHO) > 100
                  ? "bg-green"
                  : "bg-red"
              }
            >
              {loadingExec || loadingPlan ? (
                <LoadingComponent />
              ) : EXEC_SL_C2C.KHO && PLAN_SL_C2C.KHO ? (
                convertToFloat2Fixed((EXEC_SL_C2C.KHO * 100) / PLAN_SL_C2C.KHO)
              ) : (
                ""
              )}
            </td>
            <td
              className={
                parseFloat((EXEC_SL_C2C.DLA * 100) / PLAN_SL_C2C.DLA) > 100
                  ? "bg-green"
                  : "bg-red"
              }
            >
              {loadingExec || loadingPlan ? (
                <LoadingComponent />
              ) : EXEC_SL_C2C.DLA && PLAN_SL_C2C.DLA ? (
                convertToFloat2Fixed((EXEC_SL_C2C.DLA * 100) / PLAN_SL_C2C.DLA)
              ) : (
                ""
              )}
            </td>
            <td
              className={
                parseFloat((EXEC_SL_C2C.GLA * 100) / PLAN_SL_C2C.GLA) > 100
                  ? "bg-green"
                  : "bg-red"
              }
            >
              {loadingExec || loadingPlan ? (
                <LoadingComponent />
              ) : EXEC_SL_C2C.GLA && PLAN_SL_C2C.GLA ? (
                convertToFloat2Fixed((EXEC_SL_C2C.GLA * 100) / PLAN_SL_C2C.GLA)
              ) : (
                ""
              )}
            </td>
            <td
              className={
                parseFloat((EXEC_SL_C2C.PYE * 100) / PLAN_SL_C2C.PYE) > 100
                  ? "bg-green"
                  : "bg-red"
              }
            >
              {loadingExec || loadingPlan ? (
                <LoadingComponent />
              ) : EXEC_SL_C2C.PYE && PLAN_SL_C2C.PYE ? (
                convertToFloat2Fixed((EXEC_SL_C2C.PYE * 100) / PLAN_SL_C2C.PYE)
              ) : (
                ""
              )}
            </td>
            <td
              className={
                parseFloat((EXEC_SL_C2C.DNO * 100) / PLAN_SL_C2C.DNO) > 100
                  ? "bg-green"
                  : "bg-red"
              }
            >
              {loadingExec || loadingPlan ? (
                <LoadingComponent />
              ) : EXEC_SL_C2C.DNO && PLAN_SL_C2C.DNO ? (
                convertToFloat2Fixed((EXEC_SL_C2C.DNO * 100) / PLAN_SL_C2C.DNO)
              ) : (
                ""
              )}
            </td>
            <td
              className={
                parseFloat((EXEC_SL_C2C.KON * 100) / PLAN_SL_C2C.KON) > 100
                  ? "bg-green"
                  : "bg-red"
              }
            >
              {loadingExec || loadingPlan ? (
                <LoadingComponent />
              ) : EXEC_SL_C2C.KON && PLAN_SL_C2C.KON ? (
                convertToFloat2Fixed((EXEC_SL_C2C.KON * 100) / PLAN_SL_C2C.KON)
              ) : (
                ""
              )}
            </td>
            <td
              className={
                parseFloat((EXEC_SL_C2C.CTY7 * 100) / PLAN_SL_C2C.CTY7) > 100
                  ? "bg-green"
                  : "bg-red"
              }
            >
              {loadingExec || loadingPlan ? (
                <LoadingComponent />
              ) : EXEC_SL_C2C.CTY7 && PLAN_SL_C2C.CTY7 ? (
                convertToFloat2Fixed(
                  (EXEC_SL_C2C.CTY7 * 100) / PLAN_SL_C2C.CTY7
                )
              ) : (
                ""
              )}
            </td>
          </tr>

          <tr>
            <td rowSpan={4} className="text-sub3">
              6.2
            </td>
            <td rowSpan={4} className="text-sub3 cell-kpi">
              Số lượng TB PTM qua kênh C2C
            </td>
            <td rowSpan={4} className="kpi-dvt">
              thuê bao
            </td>
            <td className="text-sub4 kpi-kht">KHT</td>
            <td className="cell-number">
              {loadingPlan ? (
                <LoadingComponent />
              ) : PLAN_SL_TB_C2C.KHO ? (
                convertToFloat2Fixed(PLAN_SL_TB_C2C.KHO)
              ) : (
                ""
              )}
            </td>
            <td className="cell-number">
              {loadingPlan ? (
                <LoadingComponent />
              ) : PLAN_SL_TB_C2C.DLA ? (
                convertToFloat2Fixed(PLAN_SL_TB_C2C.DLA)
              ) : (
                ""
              )}
            </td>
            <td className="cell-number">
              {loadingPlan ? (
                <LoadingComponent />
              ) : PLAN_SL_TB_C2C.GLA ? (
                convertToFloat2Fixed(PLAN_SL_TB_C2C.GLA)
              ) : (
                ""
              )}
            </td>
            <td className="cell-number">
              {loadingPlan ? (
                <LoadingComponent />
              ) : PLAN_SL_TB_C2C.PYE ? (
                convertToFloat2Fixed(PLAN_SL_TB_C2C.PYE)
              ) : (
                ""
              )}
            </td>
            <td className="cell-number">
              {loadingPlan ? (
                <LoadingComponent />
              ) : PLAN_SL_TB_C2C.DNO ? (
                convertToFloat2Fixed(PLAN_SL_TB_C2C.DNO)
              ) : (
                ""
              )}
            </td>
            <td className="cell-number">
              {loadingPlan ? (
                <LoadingComponent />
              ) : PLAN_SL_TB_C2C.KON ? (
                convertToFloat2Fixed(PLAN_SL_TB_C2C.KON)
              ) : (
                ""
              )}
            </td>
            <td className="cell-number">
              {loadingPlan ? (
                <LoadingComponent />
              ) : PLAN_SL_TB_C2C.CTY7 ? (
                convertToFloat2Fixed(PLAN_SL_TB_C2C.CTY7)
              ) : (
                ""
              )}
            </td>
            <td rowSpan={4} className="cell-donviphutrach">
              DVVT
              <br />
              <span>
                {EXEC_SL_TB_C2C.LAST_DATE
                  ? getFormattedDate(new Date(EXEC_SL_TB_C2C.LAST_DATE))
                  : ""}
              </span>
            </td>
          </tr>
          <tr>
            <td className="text-sub4 kpi-thlk">THLK</td>
            <td className="cell-number">
              {loadingExec ? (
                <LoadingComponent />
              ) : EXEC_SL_TB_C2C.KHO ? (
                convertToFloat2Fixed(EXEC_SL_TB_C2C.KHO)
              ) : (
                ""
              )}
            </td>
            <td className="cell-number">
              {loadingExec ? (
                <LoadingComponent />
              ) : EXEC_SL_TB_C2C.DLA ? (
                convertToFloat2Fixed(EXEC_SL_TB_C2C.DLA)
              ) : (
                ""
              )}
            </td>
            <td className="cell-number">
              {loadingExec ? (
                <LoadingComponent />
              ) : EXEC_SL_TB_C2C.GLA ? (
                convertToFloat2Fixed(EXEC_SL_TB_C2C.GLA)
              ) : (
                ""
              )}
            </td>
            <td className="cell-number">
              {loadingExec ? (
                <LoadingComponent />
              ) : EXEC_SL_TB_C2C.PYE ? (
                convertToFloat2Fixed(EXEC_SL_TB_C2C.PYE)
              ) : (
                ""
              )}
            </td>

            <td className="cell-number">
              {loadingExec ? (
                <LoadingComponent />
              ) : EXEC_SL_TB_C2C.DNO ? (
                convertToFloat2Fixed(EXEC_SL_TB_C2C.DNO)
              ) : (
                ""
              )}
            </td>
            <td className="cell-number">
              {loadingExec ? (
                <LoadingComponent />
              ) : EXEC_SL_TB_C2C.KON ? (
                convertToFloat2Fixed(EXEC_SL_TB_C2C.KON)
              ) : (
                ""
              )}
            </td>
            <td className="cell-number">
              {loadingExec ? (
                <LoadingComponent />
              ) : EXEC_SL_TB_C2C.CTY7 ? (
                convertToFloat2Fixed(EXEC_SL_TB_C2C.CTY7)
              ) : (
                ""
              )}
            </td>
          </tr>
          <tr>
            <td className="text-sub4 kpi-percent-lk">%HTKH </td>
            <td className="cell-number">
              {loadingExec || loadingPlan ? (
                <LoadingComponent />
              ) : EXEC_SL_TB_C2C.KHO && PLAN_SL_TB_C2C.KHO ? (
                convertToFloat2Fixed(
                  (EXEC_SL_TB_C2C.KHO * 100) / PLAN_SL_TB_C2C.KHO
                )
              ) : (
                ""
              )}
            </td>
            <td className="cell-number">
              {loadingExec || loadingPlan ? (
                <LoadingComponent />
              ) : EXEC_SL_TB_C2C.DLA && PLAN_SL_TB_C2C.DLA ? (
                convertToFloat2Fixed(
                  (EXEC_SL_TB_C2C.DLA * 100) / PLAN_SL_TB_C2C.DLA
                )
              ) : (
                ""
              )}
            </td>
            <td className="cell-number">
              {loadingExec || loadingPlan ? (
                <LoadingComponent />
              ) : EXEC_SL_TB_C2C.GLA && PLAN_SL_TB_C2C.GLA ? (
                convertToFloat2Fixed(
                  (EXEC_SL_TB_C2C.GLA * 100) / PLAN_SL_TB_C2C.GLA
                )
              ) : (
                ""
              )}
            </td>
            <td className="cell-number">
              {loadingExec || loadingPlan ? (
                <LoadingComponent />
              ) : EXEC_SL_TB_C2C.PYE && PLAN_SL_TB_C2C.PYE ? (
                convertToFloat2Fixed(
                  (EXEC_SL_TB_C2C.PYE * 100) / PLAN_SL_TB_C2C.PYE
                )
              ) : (
                ""
              )}
            </td>
            <td className="cell-number">
              {loadingExec || loadingPlan ? (
                <LoadingComponent />
              ) : EXEC_SL_TB_C2C.DNO && PLAN_SL_TB_C2C.DNO ? (
                convertToFloat2Fixed(
                  (EXEC_SL_TB_C2C.DNO * 100) / PLAN_SL_TB_C2C.DNO
                )
              ) : (
                ""
              )}
            </td>
            <td className="cell-number">
              {loadingExec || loadingPlan ? (
                <LoadingComponent />
              ) : EXEC_SL_TB_C2C.KON && PLAN_SL_TB_C2C.KON ? (
                convertToFloat2Fixed(
                  (EXEC_SL_TB_C2C.KON * 100) / PLAN_SL_TB_C2C.KON
                )
              ) : (
                ""
              )}
            </td>
            <td className="cell-number">
              {loadingExec || loadingPlan ? (
                <LoadingComponent />
              ) : EXEC_SL_TB_C2C.CTY7 && PLAN_SL_TB_C2C.CTY7 ? (
                convertToFloat2Fixed(
                  (EXEC_SL_TB_C2C.CTY7 * 100) / PLAN_SL_TB_C2C.CTY7
                )
              ) : (
                ""
              )}
            </td>
          </tr>
          <tr>
            <td className="text-sub4 kpi-percent-th">Ước %HTKH</td>
            <td
              className={
                parseFloat(
                  ((EXEC_SL_TB_C2C.KHO /
                    (new Date(
                      selectedDate.getFullYear(),
                      selectedDate.getMonth() + 1,
                      0
                    ) < new Date(EXEC_SL_TB_C2C.LAST_DATE)
                      ? sumDateInMonth
                      : new Date(EXEC_SL_TB_C2C.LAST_DATE).getDate())) *
                    sumDateInMonth *
                    100) /
                    PLAN_SL_TB_C2C.KHO
                ) > 100
                  ? "bg-green"
                  : "bg-red"
              }
            >
              {loadingExec || loadingPlan ? (
                <LoadingComponent />
              ) : EXEC_SL_TB_C2C.KHO && PLAN_SL_TB_C2C.KHO ? (
                convertToFloat2Fixed(
                  ((EXEC_SL_TB_C2C.KHO /
                    (new Date(
                      selectedDate.getFullYear(),
                      selectedDate.getMonth() + 1,
                      0
                    ) < new Date(EXEC_SL_TB_C2C.LAST_DATE)
                      ? sumDateInMonth
                      : new Date(EXEC_SL_TB_C2C.LAST_DATE).getDate())) *
                    sumDateInMonth *
                    100) /
                    PLAN_SL_TB_C2C.KHO
                )
              ) : (
                ""
              )}
            </td>
            <td
              className={
                parseFloat(
                  ((EXEC_SL_TB_C2C.DLA /
                    (new Date(
                      selectedDate.getFullYear(),
                      selectedDate.getMonth() + 1,
                      0
                    ) < new Date(EXEC_SL_TB_C2C.LAST_DATE)
                      ? sumDateInMonth
                      : new Date(EXEC_SL_TB_C2C.LAST_DATE).getDate())) *
                    sumDateInMonth *
                    100) /
                    PLAN_SL_TB_C2C.DLA
                ) > 100
                  ? "bg-green"
                  : "bg-red"
              }
            >
              {loadingExec || loadingPlan ? (
                <LoadingComponent />
              ) : EXEC_SL_TB_C2C.DLA && PLAN_SL_TB_C2C.DLA ? (
                convertToFloat2Fixed(
                  ((EXEC_SL_TB_C2C.DLA /
                    (new Date(
                      selectedDate.getFullYear(),
                      selectedDate.getMonth() + 1,
                      0
                    ) < new Date(EXEC_SL_TB_C2C.LAST_DATE)
                      ? sumDateInMonth
                      : new Date(EXEC_SL_TB_C2C.LAST_DATE).getDate())) *
                    sumDateInMonth *
                    100) /
                    PLAN_SL_TB_C2C.DLA
                )
              ) : (
                ""
              )}
            </td>
            <td
              className={
                parseFloat(
                  ((EXEC_SL_TB_C2C.GLA /
                    (new Date(
                      selectedDate.getFullYear(),
                      selectedDate.getMonth() + 1,
                      0
                    ) < new Date(EXEC_SL_TB_C2C.LAST_DATE)
                      ? sumDateInMonth
                      : new Date(EXEC_SL_TB_C2C.LAST_DATE).getDate())) *
                    sumDateInMonth *
                    100) /
                    PLAN_SL_TB_C2C.GLA
                ) > 100
                  ? "bg-green"
                  : "bg-red"
              }
            >
              {loadingExec || loadingPlan ? (
                <LoadingComponent />
              ) : EXEC_SL_TB_C2C.GLA && PLAN_SL_TB_C2C.GLA ? (
                convertToFloat2Fixed(
                  ((EXEC_SL_TB_C2C.GLA /
                    (new Date(
                      selectedDate.getFullYear(),
                      selectedDate.getMonth() + 1,
                      0
                    ) < new Date(EXEC_SL_TB_C2C.LAST_DATE)
                      ? sumDateInMonth
                      : new Date(EXEC_SL_TB_C2C.LAST_DATE).getDate())) *
                    sumDateInMonth *
                    100) /
                    PLAN_SL_TB_C2C.GLA
                )
              ) : (
                ""
              )}
            </td>
            <td
              className={
                parseFloat(
                  ((EXEC_SL_TB_C2C.PYE /
                    (new Date(
                      selectedDate.getFullYear(),
                      selectedDate.getMonth() + 1,
                      0
                    ) < new Date(EXEC_SL_TB_C2C.LAST_DATE)
                      ? sumDateInMonth
                      : new Date(EXEC_SL_TB_C2C.LAST_DATE).getDate())) *
                    sumDateInMonth *
                    100) /
                    PLAN_SL_TB_C2C.PYE
                ) > 100
                  ? "bg-green"
                  : "bg-red"
              }
            >
              {loadingExec || loadingPlan ? (
                <LoadingComponent />
              ) : EXEC_SL_TB_C2C.PYE && PLAN_SL_TB_C2C.PYE ? (
                convertToFloat2Fixed(
                  ((EXEC_SL_TB_C2C.PYE /
                    (new Date(
                      selectedDate.getFullYear(),
                      selectedDate.getMonth() + 1,
                      0
                    ) < new Date(EXEC_SL_TB_C2C.LAST_DATE)
                      ? sumDateInMonth
                      : new Date(EXEC_SL_TB_C2C.LAST_DATE).getDate())) *
                    sumDateInMonth *
                    100) /
                    PLAN_SL_TB_C2C.PYE
                )
              ) : (
                ""
              )}
            </td>
            <td
              className={
                parseFloat(
                  ((EXEC_SL_TB_C2C.DNO /
                    (new Date(
                      selectedDate.getFullYear(),
                      selectedDate.getMonth() + 1,
                      0
                    ) < new Date(EXEC_SL_TB_C2C.LAST_DATE)
                      ? sumDateInMonth
                      : new Date(EXEC_SL_TB_C2C.LAST_DATE).getDate())) *
                    sumDateInMonth *
                    100) /
                    PLAN_SL_TB_C2C.DNO
                ) > 100
                  ? "bg-green"
                  : "bg-red"
              }
            >
              {loadingExec || loadingPlan ? (
                <LoadingComponent />
              ) : EXEC_SL_TB_C2C.DNO && PLAN_SL_TB_C2C.DNO ? (
                convertToFloat2Fixed(
                  ((EXEC_SL_TB_C2C.DNO /
                    (new Date(
                      selectedDate.getFullYear(),
                      selectedDate.getMonth() + 1,
                      0
                    ) < new Date(EXEC_SL_TB_C2C.LAST_DATE)
                      ? sumDateInMonth
                      : new Date(EXEC_SL_TB_C2C.LAST_DATE).getDate())) *
                    sumDateInMonth *
                    100) /
                    PLAN_SL_TB_C2C.DNO
                )
              ) : (
                ""
              )}
            </td>
            <td
              className={
                parseFloat(
                  ((EXEC_SL_TB_C2C.KON /
                    (new Date(
                      selectedDate.getFullYear(),
                      selectedDate.getMonth() + 1,
                      0
                    ) < new Date(EXEC_SL_TB_C2C.LAST_DATE)
                      ? sumDateInMonth
                      : new Date(EXEC_SL_TB_C2C.LAST_DATE).getDate())) *
                    sumDateInMonth *
                    100) /
                    PLAN_SL_TB_C2C.KON
                ) > 100
                  ? "bg-green"
                  : "bg-red"
              }
            >
              {loadingExec || loadingPlan ? (
                <LoadingComponent />
              ) : EXEC_SL_TB_C2C.KON && PLAN_SL_TB_C2C.KON ? (
                convertToFloat2Fixed(
                  ((EXEC_SL_TB_C2C.KON /
                    (new Date(
                      selectedDate.getFullYear(),
                      selectedDate.getMonth() + 1,
                      0
                    ) < new Date(EXEC_SL_TB_C2C.LAST_DATE)
                      ? sumDateInMonth
                      : new Date(EXEC_SL_TB_C2C.LAST_DATE).getDate())) *
                    sumDateInMonth *
                    100) /
                    PLAN_SL_TB_C2C.KON
                )
              ) : (
                ""
              )}
            </td>
            <td
              className={
                parseFloat(
                  ((EXEC_SL_TB_C2C.CTY7 /
                    (new Date(
                      selectedDate.getFullYear(),
                      selectedDate.getMonth() + 1,
                      0
                    ) < new Date(EXEC_SL_TB_C2C.LAST_DATE)
                      ? sumDateInMonth
                      : new Date(EXEC_SL_TB_C2C.LAST_DATE).getDate())) *
                    sumDateInMonth *
                    100) /
                    PLAN_SL_TB_C2C.CTY7
                ) > 100
                  ? "bg-green"
                  : "bg-red"
              }
            >
              {loadingExec || loadingPlan ? (
                <LoadingComponent />
              ) : EXEC_SL_TB_C2C.CTY7 && PLAN_SL_TB_C2C.CTY7 ? (
                convertToFloat2Fixed(
                  ((EXEC_SL_TB_C2C.CTY7 /
                    (new Date(
                      selectedDate.getFullYear(),
                      selectedDate.getMonth() + 1,
                      0
                    ) < new Date(EXEC_SL_TB_C2C.LAST_DATE)
                      ? sumDateInMonth
                      : new Date(EXEC_SL_TB_C2C.LAST_DATE).getDate())) *
                    sumDateInMonth *
                    100) /
                    PLAN_SL_TB_C2C.CTY7
                )
              ) : (
                ""
              )}
            </td>
          </tr>

          <tr>
            <td rowSpan={4} className="text-sub3">
              6.3
            </td>
            <td rowSpan={4} className="text-sub3 cell-kpi">
              Tỷ lệ Điểm bán C2C có phát sinh giao dịch<span style={{color:"red"}}>*</span>
            </td>
            <td rowSpan={4} className="kpi-dvt">
              thuê bao
            </td>
            <td className="text-sub4 kpi-kht">KHT</td>
            <td className="cell-number">
              {loadingPlan ? (
                <LoadingComponent />
              ) : PLAN_TYLE_GD_C2C.KHO ? (
                convertToFloat2Fixed(PLAN_TYLE_GD_C2C.KHO)
              ) : (
                ""
              )}
            </td>
            <td className="cell-number">
              {loadingPlan ? (
                <LoadingComponent />
              ) : PLAN_TYLE_GD_C2C.DLA ? (
                convertToFloat2Fixed(PLAN_TYLE_GD_C2C.DLA)
              ) : (
                ""
              )}
            </td>
            <td className="cell-number">
              {loadingPlan ? (
                <LoadingComponent />
              ) : PLAN_TYLE_GD_C2C.GLA ? (
                convertToFloat2Fixed(PLAN_TYLE_GD_C2C.GLA)
              ) : (
                ""
              )}
            </td>
            <td className="cell-number">
              {loadingPlan ? (
                <LoadingComponent />
              ) : PLAN_TYLE_GD_C2C.PYE ? (
                convertToFloat2Fixed(PLAN_TYLE_GD_C2C.PYE)
              ) : (
                ""
              )}
            </td>
            <td className="cell-number">
              {loadingPlan ? (
                <LoadingComponent />
              ) : PLAN_TYLE_GD_C2C.DNO ? (
                convertToFloat2Fixed(PLAN_TYLE_GD_C2C.DNO)
              ) : (
                ""
              )}
            </td>
            <td className="cell-number">
              {loadingPlan ? (
                <LoadingComponent />
              ) : PLAN_TYLE_GD_C2C.KON ? (
                convertToFloat2Fixed(PLAN_TYLE_GD_C2C.KON)
              ) : (
                ""
              )}
            </td>
            <td className="cell-number">
              {loadingPlan ? (
                <LoadingComponent />
              ) : PLAN_TYLE_GD_C2C.CTY7 ? (
                convertToFloat2Fixed(PLAN_TYLE_GD_C2C.CTY7)
              ) : (
                ""
              )}
            </td>
            <td rowSpan={4} className="cell-donviphutrach">
              DVVT
              <br />
              <span>
                {EXEC_TYLE_GD_C2C.LAST_DATE
                  ? getFormattedDate(new Date(EXEC_TYLE_GD_C2C.LAST_DATE))
                  : ""}
              </span>
            </td>
          </tr>
          <tr>
            <td className="text-sub4 kpi-thlk">THLK</td>
            <td className="cell-number">
              {loadingExec ? (
                <LoadingComponent />
              ) : EXEC_TYLE_GD_C2C.KHO ? (
                convertToFloat2Fixed(EXEC_TYLE_GD_C2C.KHO)
              ) : (
                ""
              )}
            </td>
            <td className="cell-number">
              {loadingExec ? (
                <LoadingComponent />
              ) : EXEC_TYLE_GD_C2C.DLA ? (
                convertToFloat2Fixed(EXEC_TYLE_GD_C2C.DLA)
              ) : (
                ""
              )}
            </td>
            <td className="cell-number">
              {loadingExec ? (
                <LoadingComponent />
              ) : EXEC_TYLE_GD_C2C.GLA ? (
                convertToFloat2Fixed(EXEC_TYLE_GD_C2C.GLA)
              ) : (
                ""
              )}
            </td>
            <td className="cell-number">
              {loadingExec ? (
                <LoadingComponent />
              ) : EXEC_TYLE_GD_C2C.PYE ? (
                convertToFloat2Fixed(EXEC_TYLE_GD_C2C.PYE)
              ) : (
                ""
              )}
            </td>
            <td className="cell-number">
              {loadingExec ? (
                <LoadingComponent />
              ) : EXEC_TYLE_GD_C2C.DNO ? (
                convertToFloat2Fixed(EXEC_TYLE_GD_C2C.DNO)
              ) : (
                ""
              )}
            </td>
            <td className="cell-number">
              {loadingExec ? (
                <LoadingComponent />
              ) : EXEC_TYLE_GD_C2C.KON ? (
                convertToFloat2Fixed(EXEC_TYLE_GD_C2C.KON)
              ) : (
                ""
              )}
            </td>
            <td className="cell-number">
              {loadingExec ? (
                <LoadingComponent />
              ) : EXEC_TYLE_GD_C2C.CTY7 ? (
                convertToFloat2Fixed(EXEC_TYLE_GD_C2C.CTY7)
              ) : (
                ""
              )}
            </td>
          </tr>
          <tr>
            <td className="text-sub4 kpi-percent-lk">%HTKH </td>
            <td className="cell-number">
              {loadingExec || loadingPlan ? (
                <LoadingComponent />
              ) : EXEC_TYLE_GD_C2C.KHO && PLAN_TYLE_GD_C2C.KHO ? (
                convertToFloat2Fixed(
                  (EXEC_TYLE_GD_C2C.KHO * 100) / PLAN_TYLE_GD_C2C.KHO
                )
              ) : (
                ""
              )}
            </td>
            <td className="cell-number">
              {loadingExec || loadingPlan ? (
                <LoadingComponent />
              ) : EXEC_TYLE_GD_C2C.DLA && PLAN_TYLE_GD_C2C.DLA ? (
                convertToFloat2Fixed(
                  (EXEC_TYLE_GD_C2C.DLA * 100) / PLAN_TYLE_GD_C2C.DLA
                )
              ) : (
                ""
              )}
            </td>
            <td className="cell-number">
              {loadingExec || loadingPlan ? (
                <LoadingComponent />
              ) : EXEC_TYLE_GD_C2C.GLA && PLAN_TYLE_GD_C2C.GLA ? (
                convertToFloat2Fixed(
                  (EXEC_TYLE_GD_C2C.GLA * 100) / PLAN_TYLE_GD_C2C.GLA
                )
              ) : (
                ""
              )}
            </td>
            <td className="cell-number">
              {loadingExec || loadingPlan ? (
                <LoadingComponent />
              ) : EXEC_TYLE_GD_C2C.PYE && PLAN_TYLE_GD_C2C.PYE ? (
                convertToFloat2Fixed(
                  (EXEC_TYLE_GD_C2C.PYE * 100) / PLAN_TYLE_GD_C2C.PYE
                )
              ) : (
                ""
              )}
            </td>
            <td className="cell-number">
              {loadingExec || loadingPlan ? (
                <LoadingComponent />
              ) : EXEC_TYLE_GD_C2C.DNO && PLAN_TYLE_GD_C2C.DNO ? (
                convertToFloat2Fixed(
                  (EXEC_TYLE_GD_C2C.DNO * 100) / PLAN_TYLE_GD_C2C.DNO
                )
              ) : (
                ""
              )}
            </td>
            <td className="cell-number">
              {loadingExec || loadingPlan ? (
                <LoadingComponent />
              ) : EXEC_TYLE_GD_C2C.KON && PLAN_TYLE_GD_C2C.KON ? (
                convertToFloat2Fixed(
                  (EXEC_TYLE_GD_C2C.KON * 100) / PLAN_TYLE_GD_C2C.KON
                )
              ) : (
                ""
              )}
            </td>
            <td className="cell-number">
              {loadingExec || loadingPlan ? (
                <LoadingComponent />
              ) : EXEC_TYLE_GD_C2C.CTY7 && PLAN_TYLE_GD_C2C.CTY7 ? (
                convertToFloat2Fixed(
                  (EXEC_TYLE_GD_C2C.CTY7 * 100) / PLAN_TYLE_GD_C2C.CTY7
                )
              ) : (
                ""
              )}
            </td>
          </tr>
          <tr>
            <td className="text-sub4 kpi-percent-th">Ước %HTKH</td>
            <td
              className={
                parseFloat(
                  (EXEC_TYLE_GD_C2C.KHO * 100) / PLAN_TYLE_GD_C2C.KHO
                ) > 100
                  ? "bg-green"
                  : "bg-red"
              }
            >
              {loadingExec || loadingPlan ? (
                <LoadingComponent />
              ) : EXEC_TYLE_GD_C2C.KHO && PLAN_TYLE_GD_C2C.KHO ? (
                convertToFloat2Fixed(
                  (EXEC_TYLE_GD_C2C.KHO * 100) / PLAN_TYLE_GD_C2C.KHO
                )
              ) : (
                ""
              )}
            </td>
            <td
              className={
                parseFloat(
                  (EXEC_TYLE_GD_C2C.DLA * 100) / PLAN_TYLE_GD_C2C.DLA
                ) > 100
                  ? "bg-green"
                  : "bg-red"
              }
            >
              {loadingExec || loadingPlan ? (
                <LoadingComponent />
              ) : EXEC_TYLE_GD_C2C.DLA && PLAN_TYLE_GD_C2C.DLA ? (
                convertToFloat2Fixed(
                  (EXEC_TYLE_GD_C2C.DLA * 100) / PLAN_TYLE_GD_C2C.DLA
                )
              ) : (
                ""
              )}
            </td>
            <td
              className={
                parseFloat(
                  (EXEC_TYLE_GD_C2C.GLA * 100) / PLAN_TYLE_GD_C2C.GLA
                ) > 100
                  ? "bg-green"
                  : "bg-red"
              }
            >
              {loadingExec || loadingPlan ? (
                <LoadingComponent />
              ) : EXEC_TYLE_GD_C2C.GLA && PLAN_TYLE_GD_C2C.GLA ? (
                convertToFloat2Fixed(
                  (EXEC_TYLE_GD_C2C.GLA * 100) / PLAN_TYLE_GD_C2C.GLA
                )
              ) : (
                ""
              )}
            </td>
            <td
              className={
                parseFloat(
                  (EXEC_TYLE_GD_C2C.PYE * 100) / PLAN_TYLE_GD_C2C.PYE
                ) > 100
                  ? "bg-green"
                  : "bg-red"
              }
            >
              {loadingExec || loadingPlan ? (
                <LoadingComponent />
              ) : EXEC_TYLE_GD_C2C.PYE && PLAN_TYLE_GD_C2C.PYE ? (
                convertToFloat2Fixed(
                  (EXEC_TYLE_GD_C2C.PYE * 100) / PLAN_TYLE_GD_C2C.PYE
                )
              ) : (
                ""
              )}
            </td>
            <td
              className={
                parseFloat(
                  (EXEC_TYLE_GD_C2C.DNO * 100) / PLAN_TYLE_GD_C2C.DNO
                ) > 100
                  ? "bg-green"
                  : "bg-red"
              }
            >
              {loadingExec || loadingPlan ? (
                <LoadingComponent />
              ) : EXEC_TYLE_GD_C2C.DNO && PLAN_TYLE_GD_C2C.DNO ? (
                convertToFloat2Fixed(
                  (EXEC_TYLE_GD_C2C.DNO * 100) / PLAN_TYLE_GD_C2C.DNO
                )
              ) : (
                ""
              )}
            </td>
            <td
              className={
                parseFloat(
                  (EXEC_TYLE_GD_C2C.KON * 100) / PLAN_TYLE_GD_C2C.KON
                ) > 100
                  ? "bg-green"
                  : "bg-red"
              }
            >
              {loadingExec || loadingPlan ? (
                <LoadingComponent />
              ) : EXEC_TYLE_GD_C2C.KON && PLAN_TYLE_GD_C2C.KON ? (
                convertToFloat2Fixed(
                  (EXEC_TYLE_GD_C2C.KON * 100) / PLAN_TYLE_GD_C2C.KON
                )
              ) : (
                ""
              )}
            </td>
            <td
              className={
                parseFloat(
                  (EXEC_TYLE_GD_C2C.CTY7 * 100) / PLAN_TYLE_GD_C2C.CTY7
                ) > 100
                  ? "bg-green"
                  : "bg-red"
              }
            >
              {loadingExec || loadingPlan ? (
                <LoadingComponent />
              ) : EXEC_TYLE_GD_C2C.CTY7 && PLAN_TYLE_GD_C2C.CTY7 ? (
                convertToFloat2Fixed(
                  (EXEC_TYLE_GD_C2C.CTY7 * 100) / PLAN_TYLE_GD_C2C.CTY7
                )
              ) : (
                ""
              )}
            </td>
          </tr>
          <tr>
            <td className="text-sub2">7</td>
            <td colSpan={11} className="text-sub2">
              TB PTM mạng MobiFone
            </td>
          </tr>
          <tr>
            <td rowSpan={4} className="text-sub3">
              7.1
            </td>
            <td rowSpan={4} className="text-sub3 cell-kpi">
              TBTT PTM Hạ tầng số
            </td>
            <td rowSpan={4} className="kpi-dvt">
              thuê bao
            </td>
            <td className="text-sub4 kpi-kht">KHT</td>
            <td className="cell-number">
              {loadingPlan ? (
                <LoadingComponent />
              ) : PLAN_SL_PTM_TBTT_HTS.KHO ? (
                convertToFloat2Fixed(PLAN_SL_PTM_TBTT_HTS.KHO)
              ) : (
                ""
              )}
            </td>
            <td className="cell-number">
              {loadingPlan ? (
                <LoadingComponent />
              ) : PLAN_SL_PTM_TBTT_HTS.DLA ? (
                convertToFloat2Fixed(PLAN_SL_PTM_TBTT_HTS.DLA)
              ) : (
                ""
              )}
            </td>
            <td className="cell-number">
              {loadingPlan ? (
                <LoadingComponent />
              ) : PLAN_SL_PTM_TBTT_HTS.GLA ? (
                convertToFloat2Fixed(PLAN_SL_PTM_TBTT_HTS.GLA)
              ) : (
                ""
              )}
            </td>
            <td className="cell-number">
              {loadingPlan ? (
                <LoadingComponent />
              ) : PLAN_SL_PTM_TBTT_HTS.PYE ? (
                convertToFloat2Fixed(PLAN_SL_PTM_TBTT_HTS.PYE)
              ) : (
                ""
              )}
            </td>
            <td className="cell-number">
              {loadingPlan ? (
                <LoadingComponent />
              ) : PLAN_SL_PTM_TBTT_HTS.DNO ? (
                convertToFloat2Fixed(PLAN_SL_PTM_TBTT_HTS.DNO)
              ) : (
                ""
              )}
            </td>
            <td className="cell-number">
              {loadingPlan ? (
                <LoadingComponent />
              ) : PLAN_SL_PTM_TBTT_HTS.KON ? (
                convertToFloat2Fixed(PLAN_SL_PTM_TBTT_HTS.KON)
              ) : (
                ""
              )}
            </td>
            <td className="cell-number ">
              {loadingPlan ? (
                <LoadingComponent />
              ) : PLAN_SL_PTM_TBTT_HTS.CTY7 ? (
                convertToFloat2Fixed(PLAN_SL_PTM_TBTT_HTS.CTY7)
              ) : (
                ""
              )}
            </td>
            <td rowSpan={4} className="cell-donviphutrach">
              DVVT
              <br />
              <span>
                {EXEC_SL_PTM_TBTT_HTS.LAST_DATE
                  ? getFormattedDate(new Date(EXEC_SL_PTM_TBTT_HTS.LAST_DATE))
                  : ""}
              </span>
            </td>
          </tr>
          <tr>
            <td className="text-sub4 kpi-thlk">THLK</td>
            <td
              className="cell-number kpi-cell"
              onClick={() => handleDownloadExcel("KPI_PTM_HTS", "KHO")}
            >
              {loadingExec ? (
                <LoadingComponent />
              ) : EXEC_SL_PTM_TBTT_HTS.KHO ? (
                convertToFloat2Fixed(EXEC_SL_PTM_TBTT_HTS.KHO)
              ) : (
                ""
              )}
            </td>
            <td
              className="cell-number kpi-cell"
              onClick={() => handleDownloadExcel("KPI_PTM_HTS", "DLA")}
            >
              {loadingExec ? (
                <LoadingComponent />
              ) : EXEC_SL_PTM_TBTT_HTS.DLA ? (
                convertToFloat2Fixed(EXEC_SL_PTM_TBTT_HTS.DLA)
              ) : (
                ""
              )}
            </td>
            <td
              className="cell-number kpi-cell"
              onClick={() => handleDownloadExcel("KPI_PTM_HTS", "GLA")}
            >
              {loadingExec ? (
                <LoadingComponent />
              ) : EXEC_SL_PTM_TBTT_HTS.GLA ? (
                convertToFloat2Fixed(EXEC_SL_PTM_TBTT_HTS.GLA)
              ) : (
                ""
              )}
            </td>
            <td
              className="cell-number kpi-cell"
              onClick={() => handleDownloadExcel("KPI_PTM_HTS", "PYE")}
            >
              {loadingExec ? (
                <LoadingComponent />
              ) : EXEC_SL_PTM_TBTT_HTS.PYE ? (
                convertToFloat2Fixed(EXEC_SL_PTM_TBTT_HTS.PYE)
              ) : (
                ""
              )}
            </td>
            <td
              className="cell-number kpi-cell"
              onClick={() => handleDownloadExcel("KPI_PTM_HTS", "DNO")}
            >
              {loadingExec ? (
                <LoadingComponent />
              ) : EXEC_SL_PTM_TBTT_HTS.DNO ? (
                convertToFloat2Fixed(EXEC_SL_PTM_TBTT_HTS.DNO)
              ) : (
                ""
              )}
            </td>
            <td
              className="cell-number kpi-cell"
              onClick={() => handleDownloadExcel("KPI_PTM_HTS", "KON")} // Truyền province = KON
            >
              {loadingExec ? (
                <LoadingComponent />
              ) : EXEC_SL_PTM_TBTT_HTS.KON ? (
                convertToFloat2Fixed(EXEC_SL_PTM_TBTT_HTS.KON)
              ) : (
                ""
              )}
            </td>
            <td
              id="exec-kpi-hts"
              className="cell-number"
              onClick={() => handleDownloadExcel("KPI_PTM_HTS")}
            >
              {loadingExec ? (
                <LoadingComponent />
              ) : EXEC_SL_PTM_TBTT_HTS.CTY7 ? (
                convertToFloat2Fixed(EXEC_SL_PTM_TBTT_HTS.CTY7)
              ) : (
                ""
              )}
            </td>
          </tr>
          <tr>
            <td className="text-sub4 kpi-percent-lk">%HTKH </td>
            <td className="cell-number">
              {loadingExec || loadingPlan ? (
                <LoadingComponent />
              ) : EXEC_SL_PTM_TBTT_HTS.KHO && PLAN_SL_PTM_TBTT_HTS.KHO ? (
                convertToFloat2Fixed(
                  (EXEC_SL_PTM_TBTT_HTS.KHO * 100) / PLAN_SL_PTM_TBTT_HTS.KHO
                )
              ) : (
                ""
              )}
            </td>
            <td className="cell-number">
              {loadingExec || loadingPlan ? (
                <LoadingComponent />
              ) : EXEC_SL_PTM_TBTT_HTS.DLA && PLAN_SL_PTM_TBTT_HTS.DLA ? (
                convertToFloat2Fixed(
                  (EXEC_SL_PTM_TBTT_HTS.DLA * 100) / PLAN_SL_PTM_TBTT_HTS.DLA
                )
              ) : (
                ""
              )}
            </td>
            <td className="cell-number">
              {loadingExec || loadingPlan ? (
                <LoadingComponent />
              ) : EXEC_SL_PTM_TBTT_HTS.GLA && PLAN_SL_PTM_TBTT_HTS.GLA ? (
                convertToFloat2Fixed(
                  (EXEC_SL_PTM_TBTT_HTS.GLA * 100) / PLAN_SL_PTM_TBTT_HTS.GLA
                )
              ) : (
                ""
              )}
            </td>
            <td className="cell-number">
              {loadingExec || loadingPlan ? (
                <LoadingComponent />
              ) : EXEC_SL_PTM_TBTT_HTS.PYE && PLAN_SL_PTM_TBTT_HTS.PYE ? (
                convertToFloat2Fixed(
                  (EXEC_SL_PTM_TBTT_HTS.PYE * 100) / PLAN_SL_PTM_TBTT_HTS.PYE
                )
              ) : (
                ""
              )}
            </td>
            <td className="cell-number">
              {loadingExec || loadingPlan ? (
                <LoadingComponent />
              ) : EXEC_SL_PTM_TBTT_HTS.DNO && PLAN_SL_PTM_TBTT_HTS.DNO ? (
                convertToFloat2Fixed(
                  (EXEC_SL_PTM_TBTT_HTS.DNO * 100) / PLAN_SL_PTM_TBTT_HTS.DNO
                )
              ) : (
                ""
              )}
            </td>
            <td className="cell-number">
              {loadingExec || loadingPlan ? (
                <LoadingComponent />
              ) : EXEC_SL_PTM_TBTT_HTS.KON && PLAN_SL_PTM_TBTT_HTS.KON ? (
                convertToFloat2Fixed(
                  (EXEC_SL_PTM_TBTT_HTS.KON * 100) / PLAN_SL_PTM_TBTT_HTS.KON
                )
              ) : (
                ""
              )}
            </td>
            <td className="cell-number">
              {loadingExec || loadingPlan ? (
                <LoadingComponent />
              ) : EXEC_SL_PTM_TBTT_HTS.CTY7 && PLAN_SL_PTM_TBTT_HTS.CTY7 ? (
                convertToFloat2Fixed(
                  (EXEC_SL_PTM_TBTT_HTS.CTY7 * 100) / PLAN_SL_PTM_TBTT_HTS.CTY7
                )
              ) : (
                ""
              )}
            </td>
          </tr>
          <tr>
            <td className="text-sub4 kpi-percent-th">Ước %HTKH</td>
            <td
              className={
                parseFloat(
                  ((EXEC_SL_PTM_TBTT_HTS.KHO /
                    (new Date(
                      selectedDate.getFullYear(),
                      selectedDate.getMonth() + 1,
                      0
                    ) < new Date(EXEC_SL_PTM_TBTT_HTS.LAST_DATE)
                      ? sumDateInMonth
                      : new Date(EXEC_SL_PTM_TBTT_HTS.LAST_DATE).getDate())) *
                    sumDateInMonth *
                    100) /
                    PLAN_SL_PTM_TBTT_HTS.KHO
                ) > 100
                  ? "bg-green"
                  : "bg-red"
              }
            >
              {loadingExec || loadingPlan ? (
                <LoadingComponent />
              ) : EXEC_SL_PTM_TBTT_HTS.KHO && PLAN_SL_PTM_TBTT_HTS.KHO ? (
                convertToFloat2Fixed(
                  ((EXEC_SL_PTM_TBTT_HTS.KHO /
                    (new Date(
                      selectedDate.getFullYear(),
                      selectedDate.getMonth() + 1,
                      0
                    ) < new Date(EXEC_SL_PTM_TBTT_HTS.LAST_DATE)
                      ? sumDateInMonth
                      : new Date(EXEC_SL_PTM_TBTT_HTS.LAST_DATE).getDate())) *
                    sumDateInMonth *
                    100) /
                    PLAN_SL_PTM_TBTT_HTS.KHO
                )
              ) : (
                ""
              )}
            </td>
            <td
              className={
                parseFloat(
                  ((EXEC_SL_PTM_TBTT_HTS.DLA /
                    (new Date(
                      selectedDate.getFullYear(),
                      selectedDate.getMonth() + 1,
                      0
                    ) < new Date(EXEC_SL_PTM_TBTT_HTS.LAST_DATE)
                      ? sumDateInMonth
                      : new Date(EXEC_SL_PTM_TBTT_HTS.LAST_DATE).getDate())) *
                    sumDateInMonth *
                    100) /
                    PLAN_SL_PTM_TBTT_HTS.DLA
                ) > 100
                  ? "bg-green"
                  : "bg-red"
              }
            >
              {loadingExec || loadingPlan ? (
                <LoadingComponent />
              ) : EXEC_SL_PTM_TBTT_HTS.DLA && PLAN_SL_PTM_TBTT_HTS.DLA ? (
                convertToFloat2Fixed(
                  ((EXEC_SL_PTM_TBTT_HTS.DLA /
                    (new Date(
                      selectedDate.getFullYear(),
                      selectedDate.getMonth() + 1,
                      0
                    ) < new Date(EXEC_SL_PTM_TBTT_HTS.LAST_DATE)
                      ? sumDateInMonth
                      : new Date(EXEC_SL_PTM_TBTT_HTS.LAST_DATE).getDate())) *
                    sumDateInMonth *
                    100) /
                    PLAN_SL_PTM_TBTT_HTS.DLA
                )
              ) : (
                ""
              )}
            </td>
            <td
              className={
                parseFloat(
                  ((EXEC_SL_PTM_TBTT_HTS.GLA /
                    (new Date(
                      selectedDate.getFullYear(),
                      selectedDate.getMonth() + 1,
                      0
                    ) < new Date(EXEC_SL_PTM_TBTT_HTS.LAST_DATE)
                      ? sumDateInMonth
                      : new Date(EXEC_SL_PTM_TBTT_HTS.LAST_DATE).getDate())) *
                    sumDateInMonth *
                    100) /
                    PLAN_SL_PTM_TBTT_HTS.GLA
                ) > 100
                  ? "bg-green"
                  : "bg-red"
              }
            >
              {loadingExec || loadingPlan ? (
                <LoadingComponent />
              ) : EXEC_SL_PTM_TBTT_HTS.GLA && PLAN_SL_PTM_TBTT_HTS.GLA ? (
                convertToFloat2Fixed(
                  ((EXEC_SL_PTM_TBTT_HTS.GLA /
                    (new Date(
                      selectedDate.getFullYear(),
                      selectedDate.getMonth() + 1,
                      0
                    ) < new Date(EXEC_SL_PTM_TBTT_HTS.LAST_DATE)
                      ? sumDateInMonth
                      : new Date(EXEC_SL_PTM_TBTT_HTS.LAST_DATE).getDate())) *
                    sumDateInMonth *
                    100) /
                    PLAN_SL_PTM_TBTT_HTS.GLA
                )
              ) : (
                ""
              )}
            </td>
            <td
              className={
                parseFloat(
                  ((EXEC_SL_PTM_TBTT_HTS.PYE /
                    (new Date(
                      selectedDate.getFullYear(),
                      selectedDate.getMonth() + 1,
                      0
                    ) < new Date(EXEC_SL_PTM_TBTT_HTS.LAST_DATE)
                      ? sumDateInMonth
                      : new Date(EXEC_SL_PTM_TBTT_HTS.LAST_DATE).getDate())) *
                    sumDateInMonth *
                    100) /
                    PLAN_SL_PTM_TBTT_HTS.PYE
                ) > 100
                  ? "bg-green"
                  : "bg-red"
              }
            >
              {loadingExec || loadingPlan ? (
                <LoadingComponent />
              ) : EXEC_SL_PTM_TBTT_HTS.PYE && PLAN_SL_PTM_TBTT_HTS.PYE ? (
                convertToFloat2Fixed(
                  ((EXEC_SL_PTM_TBTT_HTS.PYE /
                    (new Date(
                      selectedDate.getFullYear(),
                      selectedDate.getMonth() + 1,
                      0
                    ) < new Date(EXEC_SL_PTM_TBTT_HTS.LAST_DATE)
                      ? sumDateInMonth
                      : new Date(EXEC_SL_PTM_TBTT_HTS.LAST_DATE).getDate())) *
                    sumDateInMonth *
                    100) /
                    PLAN_SL_PTM_TBTT_HTS.PYE
                )
              ) : (
                ""
              )}
            </td>
            <td
              className={
                parseFloat(
                  ((EXEC_SL_PTM_TBTT_HTS.DNO /
                    (new Date(
                      selectedDate.getFullYear(),
                      selectedDate.getMonth() + 1,
                      0
                    ) < new Date(EXEC_SL_PTM_TBTT_HTS.LAST_DATE)
                      ? sumDateInMonth
                      : new Date(EXEC_SL_PTM_TBTT_HTS.LAST_DATE).getDate())) *
                    sumDateInMonth *
                    100) /
                    PLAN_SL_PTM_TBTT_HTS.DNO
                ) > 100
                  ? "bg-green"
                  : "bg-red"
              }
            >
              {loadingExec || loadingPlan ? (
                <LoadingComponent />
              ) : EXEC_SL_PTM_TBTT_HTS.DNO && PLAN_SL_PTM_TBTT_HTS.DNO ? (
                convertToFloat2Fixed(
                  ((EXEC_SL_PTM_TBTT_HTS.DNO /
                    (new Date(
                      selectedDate.getFullYear(),
                      selectedDate.getMonth() + 1,
                      0
                    ) < new Date(EXEC_SL_PTM_TBTT_HTS.LAST_DATE)
                      ? sumDateInMonth
                      : new Date(EXEC_SL_PTM_TBTT_HTS.LAST_DATE).getDate())) *
                    sumDateInMonth *
                    100) /
                    PLAN_SL_PTM_TBTT_HTS.DNO
                )
              ) : (
                ""
              )}
            </td>
            <td
              className={
                parseFloat(
                  ((EXEC_SL_PTM_TBTT_HTS.KON /
                    (new Date(
                      selectedDate.getFullYear(),
                      selectedDate.getMonth() + 1,
                      0
                    ) < new Date(EXEC_SL_PTM_TBTT_HTS.LAST_DATE)
                      ? sumDateInMonth
                      : new Date(EXEC_SL_PTM_TBTT_HTS.LAST_DATE).getDate())) *
                    sumDateInMonth *
                    100) /
                    PLAN_SL_PTM_TBTT_HTS.KON
                ) > 100
                  ? "bg-green"
                  : "bg-red"
              }
            >
              {loadingExec || loadingPlan ? (
                <LoadingComponent />
              ) : EXEC_SL_PTM_TBTT_HTS.KON && PLAN_SL_PTM_TBTT_HTS.KON ? (
                convertToFloat2Fixed(
                  ((EXEC_SL_PTM_TBTT_HTS.KON /
                    (new Date(
                      selectedDate.getFullYear(),
                      selectedDate.getMonth() + 1,
                      0
                    ) < new Date(EXEC_SL_PTM_TBTT_HTS.LAST_DATE)
                      ? sumDateInMonth
                      : new Date(EXEC_SL_PTM_TBTT_HTS.LAST_DATE).getDate())) *
                    sumDateInMonth *
                    100) /
                    PLAN_SL_PTM_TBTT_HTS.KON
                )
              ) : (
                ""
              )}
            </td>
            <td
              className={
                parseFloat(
                  ((EXEC_SL_PTM_TBTT_HTS.CTY7 /
                    (new Date(
                      selectedDate.getFullYear(),
                      selectedDate.getMonth() + 1,
                      0
                    ) < new Date(EXEC_SL_PTM_TBTT_HTS.LAST_DATE)
                      ? sumDateInMonth
                      : new Date(EXEC_SL_PTM_TBTT_HTS.LAST_DATE).getDate())) *
                    sumDateInMonth *
                    100) /
                    PLAN_SL_PTM_TBTT_HTS.CTY7
                ) > 100
                  ? "bg-green"
                  : "bg-red"
              }
            >
              {loadingExec || loadingPlan ? (
                <LoadingComponent />
              ) : EXEC_SL_PTM_TBTT_HTS.CTY7 && PLAN_SL_PTM_TBTT_HTS.CTY7 ? (
                convertToFloat2Fixed(
                  ((EXEC_SL_PTM_TBTT_HTS.CTY7 /
                    (new Date(
                      selectedDate.getFullYear(),
                      selectedDate.getMonth() + 1,
                      0
                    ) < new Date(EXEC_SL_PTM_TBTT_HTS.LAST_DATE)
                      ? sumDateInMonth
                      : new Date(EXEC_SL_PTM_TBTT_HTS.LAST_DATE).getDate())) *
                    sumDateInMonth *
                    100) /
                    PLAN_SL_PTM_TBTT_HTS.CTY7
                )
              ) : (
                ""
              )}
            </td>
          </tr>
          <tr>
            <td rowSpan={4} className="text-sub3">
              7.2
            </td>
            <td rowSpan={4} className="text-sub3 cell-kpi">
              TBTT PTM Nội dung số
            </td>
            <td rowSpan={4} className="kpi-dvt">
              thuê bao
            </td>
            <td className="text-sub4 kpi-kht">KHT</td>
            <td className="cell-number">
              {loadingPlan ? (
                <LoadingComponent />
              ) : PLAN_SL_PTM_TBTT_NDS.KHO ? (
                convertToFloat2Fixed(PLAN_SL_PTM_TBTT_NDS.KHO)
              ) : (
                ""
              )}
            </td>
            <td className="cell-number">
              {loadingPlan ? (
                <LoadingComponent />
              ) : PLAN_SL_PTM_TBTT_NDS.DLA ? (
                convertToFloat2Fixed(PLAN_SL_PTM_TBTT_NDS.DLA)
              ) : (
                ""
              )}
            </td>
            <td className="cell-number">
              {loadingPlan ? (
                <LoadingComponent />
              ) : PLAN_SL_PTM_TBTT_NDS.GLA ? (
                convertToFloat2Fixed(PLAN_SL_PTM_TBTT_NDS.GLA)
              ) : (
                ""
              )}
            </td>
            <td className="cell-number">
              {loadingPlan ? (
                <LoadingComponent />
              ) : PLAN_SL_PTM_TBTT_NDS.PYE ? (
                convertToFloat2Fixed(PLAN_SL_PTM_TBTT_NDS.PYE)
              ) : (
                ""
              )}
            </td>
            <td className="cell-number">
              {loadingPlan ? (
                <LoadingComponent />
              ) : PLAN_SL_PTM_TBTT_NDS.DNO ? (
                convertToFloat2Fixed(PLAN_SL_PTM_TBTT_NDS.DNO)
              ) : (
                ""
              )}
            </td>
            <td className="cell-number">
              {loadingPlan ? (
                <LoadingComponent />
              ) : PLAN_SL_PTM_TBTT_NDS.KON ? (
                convertToFloat2Fixed(PLAN_SL_PTM_TBTT_NDS.KON)
              ) : (
                ""
              )}
            </td>
            <td className="cell-number">
              {loadingPlan ? (
                <LoadingComponent />
              ) : PLAN_SL_PTM_TBTT_NDS.CTY7 ? (
                convertToFloat2Fixed(PLAN_SL_PTM_TBTT_NDS.CTY7)
              ) : (
                ""
              )}
            </td>
            <td rowSpan={4} className="cell-donviphutrach">
              CNS
              <br />
              <span>
                {EXEC_SL_PTM_TBTT_NDS.LAST_DATE
                  ? getFormattedDate(new Date(EXEC_SL_PTM_TBTT_NDS.LAST_DATE))
                  : ""}
              </span>
            </td>
          </tr>
          <tr>
            <td className="text-sub4 kpi-thlk">THLK</td>
            <td
              className="cell-number kpi-cell"
              onClick={() => handleDownloadExcel("KPI_PTM_NDS", "KHO")}
            >
              {loadingExec ? (
                <LoadingComponent />
              ) : EXEC_SL_PTM_TBTT_NDS.KHO ? (
                convertToFloat2Fixed(EXEC_SL_PTM_TBTT_NDS.KHO)
              ) : (
                ""
              )}
            </td>
            <td
              className="cell-number kpi-cell"
              onClick={() => handleDownloadExcel("KPI_PTM_NDS", "DLA")}
            >
              {loadingExec ? (
                <LoadingComponent />
              ) : EXEC_SL_PTM_TBTT_NDS.DLA ? (
                convertToFloat2Fixed(EXEC_SL_PTM_TBTT_NDS.DLA)
              ) : (
                ""
              )}
            </td>
            <td
              className="cell-number kpi-cell"
              onClick={() => handleDownloadExcel("KPI_PTM_NDS", "GLA")}
            >
              {loadingExec ? (
                <LoadingComponent />
              ) : EXEC_SL_PTM_TBTT_NDS.GLA ? (
                convertToFloat2Fixed(EXEC_SL_PTM_TBTT_NDS.GLA)
              ) : (
                ""
              )}
            </td>
            <td
              className="cell-number kpi-cell"
              onClick={() => handleDownloadExcel("KPI_PTM_NDS", "PYE")}
            >
              {loadingExec ? (
                <LoadingComponent />
              ) : EXEC_SL_PTM_TBTT_NDS.PYE ? (
                convertToFloat2Fixed(EXEC_SL_PTM_TBTT_NDS.PYE)
              ) : (
                ""
              )}
            </td>
            <td
              className="cell-number kpi-cell"
              onClick={() => handleDownloadExcel("KPI_PTM_NDS", "DNO")}
            >
              {loadingExec ? (
                <LoadingComponent />
              ) : EXEC_SL_PTM_TBTT_NDS.DNO ? (
                convertToFloat2Fixed(EXEC_SL_PTM_TBTT_NDS.DNO)
              ) : (
                ""
              )}
            </td>
            <td
              className="cell-number kpi-cell"
              onClick={() => handleDownloadExcel("KPI_PTM_NDS", "KON")}
            >
              {loadingExec ? (
                <LoadingComponent />
              ) : EXEC_SL_PTM_TBTT_NDS.KON ? (
                convertToFloat2Fixed(EXEC_SL_PTM_TBTT_NDS.KON)
              ) : (
                ""
              )}
            </td>
            <td
              id="exec-kpi-nds"
              className="cell-number"
              onClick={() => handleDownloadExcel("KPI_PTM_NDS")}
            >
              {loadingExec ? (
                <LoadingComponent />
              ) : EXEC_SL_PTM_TBTT_NDS.CTY7 ? (
                convertToFloat2Fixed(EXEC_SL_PTM_TBTT_NDS.CTY7)
              ) : (
                ""
              )}
            </td>
          </tr>
          <tr>
            <td className="text-sub4 kpi-percent-lk">%HTKH </td>
            <td className="cell-number">
              {loadingExec || loadingPlan ? (
                <LoadingComponent />
              ) : EXEC_SL_PTM_TBTT_NDS.KHO && PLAN_SL_PTM_TBTT_NDS.KHO ? (
                convertToFloat2Fixed(
                  (EXEC_SL_PTM_TBTT_NDS.KHO * 100) / PLAN_SL_PTM_TBTT_NDS.KHO
                )
              ) : (
                ""
              )}
            </td>
            <td className="cell-number">
              {loadingExec || loadingPlan ? (
                <LoadingComponent />
              ) : EXEC_SL_PTM_TBTT_NDS.DLA && PLAN_SL_PTM_TBTT_NDS.DLA ? (
                convertToFloat2Fixed(
                  (EXEC_SL_PTM_TBTT_NDS.DLA * 100) / PLAN_SL_PTM_TBTT_NDS.DLA
                )
              ) : (
                ""
              )}
            </td>
            <td className="cell-number">
              {loadingExec || loadingPlan ? (
                <LoadingComponent />
              ) : EXEC_SL_PTM_TBTT_NDS.GLA && PLAN_SL_PTM_TBTT_NDS.GLA ? (
                convertToFloat2Fixed(
                  (EXEC_SL_PTM_TBTT_NDS.GLA * 100) / PLAN_SL_PTM_TBTT_NDS.GLA
                )
              ) : (
                ""
              )}
            </td>
            <td className="cell-number">
              {loadingExec || loadingPlan ? (
                <LoadingComponent />
              ) : EXEC_SL_PTM_TBTT_NDS.PYE && PLAN_SL_PTM_TBTT_NDS.PYE ? (
                convertToFloat2Fixed(
                  (EXEC_SL_PTM_TBTT_NDS.PYE * 100) / PLAN_SL_PTM_TBTT_NDS.PYE
                )
              ) : (
                ""
              )}
            </td>
            <td className="cell-number">
              {loadingExec || loadingPlan ? (
                <LoadingComponent />
              ) : EXEC_SL_PTM_TBTT_NDS.DNO && PLAN_SL_PTM_TBTT_NDS.DNO ? (
                convertToFloat2Fixed(
                  (EXEC_SL_PTM_TBTT_NDS.DNO * 100) / PLAN_SL_PTM_TBTT_NDS.DNO
                )
              ) : (
                ""
              )}
            </td>
            <td className="cell-number">
              {loadingExec || loadingPlan ? (
                <LoadingComponent />
              ) : EXEC_SL_PTM_TBTT_NDS.KON && PLAN_SL_PTM_TBTT_NDS.KON ? (
                convertToFloat2Fixed(
                  (EXEC_SL_PTM_TBTT_NDS.KON * 100) / PLAN_SL_PTM_TBTT_NDS.KON
                )
              ) : (
                ""
              )}
            </td>
            <td className="cell-number">
              {loadingExec || loadingPlan ? (
                <LoadingComponent />
              ) : EXEC_SL_PTM_TBTT_NDS.CTY7 && PLAN_SL_PTM_TBTT_NDS.CTY7 ? (
                convertToFloat2Fixed(
                  (EXEC_SL_PTM_TBTT_NDS.CTY7 * 100) / PLAN_SL_PTM_TBTT_NDS.CTY7
                )
              ) : (
                ""
              )}
            </td>
          </tr>
          <tr>
            <td className="text-sub4 kpi-percent-th">Ước %HTKH</td>
            <td
              className={
                parseFloat(
                  ((EXEC_SL_PTM_TBTT_NDS.KHO /
                    (new Date(
                      selectedDate.getFullYear(),
                      selectedDate.getMonth() + 1,
                      0
                    ) < new Date(EXEC_SL_PTM_TBTT_NDS.LAST_DATE)
                      ? sumDateInMonth
                      : new Date(EXEC_SL_PTM_TBTT_NDS.LAST_DATE).getDate())) *
                    sumDateInMonth *
                    100) /
                    PLAN_SL_PTM_TBTT_NDS.KHO
                ) > 100
                  ? "bg-green"
                  : "bg-red"
              }
            >
              {loadingExec || loadingPlan ? (
                <LoadingComponent />
              ) : EXEC_SL_PTM_TBTT_NDS.KHO && PLAN_SL_PTM_TBTT_NDS.KHO ? (
                convertToFloat2Fixed(
                  ((EXEC_SL_PTM_TBTT_NDS.KHO /
                    (new Date(
                      selectedDate.getFullYear(),
                      selectedDate.getMonth() + 1,
                      0
                    ) < new Date(EXEC_SL_PTM_TBTT_NDS.LAST_DATE)
                      ? sumDateInMonth
                      : new Date(EXEC_SL_PTM_TBTT_NDS.LAST_DATE).getDate())) *
                    sumDateInMonth *
                    100) /
                    PLAN_SL_PTM_TBTT_NDS.KHO
                )
              ) : (
                ""
              )}
            </td>
            <td
              className={
                parseFloat(
                  ((EXEC_SL_PTM_TBTT_NDS.DLA /
                    (new Date(
                      selectedDate.getFullYear(),
                      selectedDate.getMonth() + 1,
                      0
                    ) < new Date(EXEC_SL_PTM_TBTT_NDS.LAST_DATE)
                      ? sumDateInMonth
                      : new Date(EXEC_SL_PTM_TBTT_NDS.LAST_DATE).getDate())) *
                    sumDateInMonth *
                    100) /
                    PLAN_SL_PTM_TBTT_NDS.DLA
                ) > 100
                  ? "bg-green"
                  : "bg-red"
              }
            >
              {loadingExec || loadingPlan ? (
                <LoadingComponent />
              ) : EXEC_SL_PTM_TBTT_NDS.DLA && PLAN_SL_PTM_TBTT_NDS.DLA ? (
                convertToFloat2Fixed(
                  ((EXEC_SL_PTM_TBTT_NDS.DLA /
                    (new Date(
                      selectedDate.getFullYear(),
                      selectedDate.getMonth() + 1,
                      0
                    ) < new Date(EXEC_SL_PTM_TBTT_NDS.LAST_DATE)
                      ? sumDateInMonth
                      : new Date(EXEC_SL_PTM_TBTT_NDS.LAST_DATE).getDate())) *
                    sumDateInMonth *
                    100) /
                    PLAN_SL_PTM_TBTT_NDS.DLA
                )
              ) : (
                ""
              )}
            </td>
            <td
              className={
                parseFloat(
                  ((EXEC_SL_PTM_TBTT_NDS.GLA /
                    (new Date(
                      selectedDate.getFullYear(),
                      selectedDate.getMonth() + 1,
                      0
                    ) < new Date(EXEC_SL_PTM_TBTT_NDS.LAST_DATE)
                      ? sumDateInMonth
                      : new Date(EXEC_SL_PTM_TBTT_NDS.LAST_DATE).getDate())) *
                    sumDateInMonth *
                    100) /
                    PLAN_SL_PTM_TBTT_NDS.GLA
                ) > 100
                  ? "bg-green"
                  : "bg-red"
              }
            >
              {loadingExec || loadingPlan ? (
                <LoadingComponent />
              ) : EXEC_SL_PTM_TBTT_NDS.GLA && PLAN_SL_PTM_TBTT_NDS.GLA ? (
                convertToFloat2Fixed(
                  ((EXEC_SL_PTM_TBTT_NDS.GLA /
                    (new Date(
                      selectedDate.getFullYear(),
                      selectedDate.getMonth() + 1,
                      0
                    ) < new Date(EXEC_SL_PTM_TBTT_NDS.LAST_DATE)
                      ? sumDateInMonth
                      : new Date(EXEC_SL_PTM_TBTT_NDS.LAST_DATE).getDate())) *
                    sumDateInMonth *
                    100) /
                    PLAN_SL_PTM_TBTT_NDS.GLA
                )
              ) : (
                ""
              )}
            </td>
            <td
              className={
                parseFloat(
                  ((EXEC_SL_PTM_TBTT_NDS.PYE /
                    (new Date(
                      selectedDate.getFullYear(),
                      selectedDate.getMonth() + 1,
                      0
                    ) < new Date(EXEC_SL_PTM_TBTT_NDS.LAST_DATE)
                      ? sumDateInMonth
                      : new Date(EXEC_SL_PTM_TBTT_NDS.LAST_DATE).getDate())) *
                    sumDateInMonth *
                    100) /
                    PLAN_SL_PTM_TBTT_NDS.PYE
                ) > 100
                  ? "bg-green"
                  : "bg-red"
              }
            >
              {loadingExec || loadingPlan ? (
                <LoadingComponent />
              ) : EXEC_SL_PTM_TBTT_NDS.PYE && PLAN_SL_PTM_TBTT_NDS.PYE ? (
                convertToFloat2Fixed(
                  ((EXEC_SL_PTM_TBTT_NDS.PYE /
                    (new Date(
                      selectedDate.getFullYear(),
                      selectedDate.getMonth() + 1,
                      0
                    ) < new Date(EXEC_SL_PTM_TBTT_NDS.LAST_DATE)
                      ? sumDateInMonth
                      : new Date(EXEC_SL_PTM_TBTT_NDS.LAST_DATE).getDate())) *
                    sumDateInMonth *
                    100) /
                    PLAN_SL_PTM_TBTT_NDS.PYE
                )
              ) : (
                ""
              )}
            </td>
            <td
              className={
                parseFloat(
                  ((EXEC_SL_PTM_TBTT_NDS.DNO /
                    (new Date(
                      selectedDate.getFullYear(),
                      selectedDate.getMonth() + 1,
                      0
                    ) < new Date(EXEC_SL_PTM_TBTT_NDS.LAST_DATE)
                      ? sumDateInMonth
                      : new Date(EXEC_SL_PTM_TBTT_NDS.LAST_DATE).getDate())) *
                    sumDateInMonth *
                    100) /
                    PLAN_SL_PTM_TBTT_NDS.DNO
                ) > 100
                  ? "bg-green"
                  : "bg-red"
              }
            >
              {loadingExec || loadingPlan ? (
                <LoadingComponent />
              ) : EXEC_SL_PTM_TBTT_NDS.DNO && PLAN_SL_PTM_TBTT_NDS.DNO ? (
                convertToFloat2Fixed(
                  ((EXEC_SL_PTM_TBTT_NDS.DNO /
                    (new Date(
                      selectedDate.getFullYear(),
                      selectedDate.getMonth() + 1,
                      0
                    ) < new Date(EXEC_SL_PTM_TBTT_NDS.LAST_DATE)
                      ? sumDateInMonth
                      : new Date(EXEC_SL_PTM_TBTT_NDS.LAST_DATE).getDate())) *
                    sumDateInMonth *
                    100) /
                    PLAN_SL_PTM_TBTT_NDS.DNO
                )
              ) : (
                ""
              )}
            </td>
            <td
              className={
                parseFloat(
                  ((EXEC_SL_PTM_TBTT_NDS.KON /
                    (new Date(
                      selectedDate.getFullYear(),
                      selectedDate.getMonth() + 1,
                      0
                    ) < new Date(EXEC_SL_PTM_TBTT_NDS.LAST_DATE)
                      ? sumDateInMonth
                      : new Date(EXEC_SL_PTM_TBTT_NDS.LAST_DATE).getDate())) *
                    sumDateInMonth *
                    100) /
                    PLAN_SL_PTM_TBTT_NDS.KON
                ) > 100
                  ? "bg-green"
                  : "bg-red"
              }
            >
              {loadingExec || loadingPlan ? (
                <LoadingComponent />
              ) : EXEC_SL_PTM_TBTT_NDS.KON && PLAN_SL_PTM_TBTT_NDS.KON ? (
                convertToFloat2Fixed(
                  ((EXEC_SL_PTM_TBTT_NDS.KON /
                    (new Date(
                      selectedDate.getFullYear(),
                      selectedDate.getMonth() + 1,
                      0
                    ) < new Date(EXEC_SL_PTM_TBTT_NDS.LAST_DATE)
                      ? sumDateInMonth
                      : new Date(EXEC_SL_PTM_TBTT_NDS.LAST_DATE).getDate())) *
                    sumDateInMonth *
                    100) /
                    PLAN_SL_PTM_TBTT_NDS.KON
                )
              ) : (
                ""
              )}
            </td>
            <td
              className={
                parseFloat(
                  ((EXEC_SL_PTM_TBTT_NDS.CTY7 /
                    (new Date(
                      selectedDate.getFullYear(),
                      selectedDate.getMonth() + 1,
                      0
                    ) < new Date(EXEC_SL_PTM_TBTT_NDS.LAST_DATE)
                      ? sumDateInMonth
                      : new Date(EXEC_SL_PTM_TBTT_NDS.LAST_DATE).getDate())) *
                    sumDateInMonth *
                    100) /
                    PLAN_SL_PTM_TBTT_NDS.CTY7
                ) > 100
                  ? "bg-green"
                  : "bg-red"
              }
            >
              {loadingExec || loadingPlan ? (
                <LoadingComponent />
              ) : EXEC_SL_PTM_TBTT_NDS.CTY7 && PLAN_SL_PTM_TBTT_NDS.CTY7 ? (
                convertToFloat2Fixed(
                  ((EXEC_SL_PTM_TBTT_NDS.CTY7 /
                    (new Date(
                      selectedDate.getFullYear(),
                      selectedDate.getMonth() + 1,
                      0
                    ) < new Date(EXEC_SL_PTM_TBTT_NDS.LAST_DATE)
                      ? sumDateInMonth
                      : new Date(EXEC_SL_PTM_TBTT_NDS.LAST_DATE).getDate())) *
                    sumDateInMonth *
                    100) /
                    PLAN_SL_PTM_TBTT_NDS.CTY7
                )
              ) : (
                ""
              )}
            </td>
          </tr>
          <tr>
            <td rowSpan={4} className="text-sub3">
              7.3
            </td>
            <td rowSpan={4} className="text-sub3 cell-kpi">
              TBTS PTM (thoại)
            </td>
            <td rowSpan={4} className="kpi-dvt">
              thuê bao
            </td>
            <td className="text-sub4 kpi-kht">KHT</td>
            <td className="cell-number">
              {loadingPlan ? (
                <LoadingComponent />
              ) : PLAN_SL_TBTS_PTM_THOAI.KHO ? (
                convertToFloat2Fixed(PLAN_SL_TBTS_PTM_THOAI.KHO)
              ) : (
                ""
              )}
            </td>
            <td className="cell-number">
              {loadingPlan ? (
                <LoadingComponent />
              ) : PLAN_SL_TBTS_PTM_THOAI.DLA ? (
                convertToFloat2Fixed(PLAN_SL_TBTS_PTM_THOAI.DLA)
              ) : (
                ""
              )}
            </td>
            <td className="cell-number">
              {loadingPlan ? (
                <LoadingComponent />
              ) : PLAN_SL_TBTS_PTM_THOAI.GLA ? (
                convertToFloat2Fixed(PLAN_SL_TBTS_PTM_THOAI.GLA)
              ) : (
                ""
              )}
            </td>
            <td className="cell-number">
              {loadingPlan ? (
                <LoadingComponent />
              ) : PLAN_SL_TBTS_PTM_THOAI.PYE ? (
                convertToFloat2Fixed(PLAN_SL_TBTS_PTM_THOAI.PYE)
              ) : (
                ""
              )}
            </td>
            <td className="cell-number">
              {loadingPlan ? (
                <LoadingComponent />
              ) : PLAN_SL_TBTS_PTM_THOAI.DNO ? (
                convertToFloat2Fixed(PLAN_SL_TBTS_PTM_THOAI.DNO)
              ) : (
                ""
              )}
            </td>
            <td className="cell-number">
              {loadingPlan ? (
                <LoadingComponent />
              ) : PLAN_SL_TBTS_PTM_THOAI.KON ? (
                convertToFloat2Fixed(PLAN_SL_TBTS_PTM_THOAI.KON)
              ) : (
                ""
              )}
            </td>
            <td className="cell-number">
              {loadingPlan ? (
                <LoadingComponent />
              ) : PLAN_SL_TBTS_PTM_THOAI.CTY7 ? (
                convertToFloat2Fixed(PLAN_SL_TBTS_PTM_THOAI.CTY7)
              ) : (
                ""
              )}
            </td>
            <td rowSpan={4} className="cell-donviphutrach">
              DVVT
              <br />
              <span>
                {EXEC_SL_TBTS_PTM_THOAI.LAST_DATE
                  ? getFormattedDate(new Date(EXEC_SL_TBTS_PTM_THOAI.LAST_DATE))
                  : ""}
              </span>
            </td>
          </tr>
          <tr>
            <td className="text-sub4 kpi-thlk">THLK</td>
            <td
              className="cell-number kpi-cell"
              onClick={() => handleDownloadExcel("KPI_PTM_TBTS_THOAI", "KHO")}
            >
              {loadingPlan ? (
                <LoadingComponent />
              ) : EXEC_SL_TBTS_PTM_THOAI.KHO ? (
                convertToFloat2Fixed(EXEC_SL_TBTS_PTM_THOAI.KHO)
              ) : (
                ""
              )}
            </td>
            <td
              className="cell-number kpi-cell"
              onClick={() => handleDownloadExcel("KPI_PTM_TBTS_THOAI", "DLA")}
            >
              {loadingPlan ? (
                <LoadingComponent />
              ) : EXEC_SL_TBTS_PTM_THOAI.DLA ? (
                convertToFloat2Fixed(EXEC_SL_TBTS_PTM_THOAI.DLA)
              ) : (
                ""
              )}
            </td>
            <td
              className="cell-number kpi-cell"
              onClick={() => handleDownloadExcel("KPI_PTM_TBTS_THOAI", "GLA")}
            >
              {loadingPlan ? (
                <LoadingComponent />
              ) : EXEC_SL_TBTS_PTM_THOAI.GLA ? (
                convertToFloat2Fixed(EXEC_SL_TBTS_PTM_THOAI.GLA)
              ) : (
                ""
              )}
            </td>
            <td
              className="cell-number kpi-cell"
              onClick={() => handleDownloadExcel("KPI_PTM_TBTS_THOAI", "PYE")}
            >
              {loadingPlan ? (
                <LoadingComponent />
              ) : EXEC_SL_TBTS_PTM_THOAI.PYE ? (
                convertToFloat2Fixed(EXEC_SL_TBTS_PTM_THOAI.PYE)
              ) : (
                ""
              )}
            </td>
            <td
              className="cell-number kpi-cell"
              onClick={() => handleDownloadExcel("KPI_PTM_TBTS_THOAI", "DNO")}
            >
              {loadingPlan ? (
                <LoadingComponent />
              ) : EXEC_SL_TBTS_PTM_THOAI.DNO ? (
                convertToFloat2Fixed(EXEC_SL_TBTS_PTM_THOAI.DNO)
              ) : (
                ""
              )}
            </td>
            <td
              className="cell-number kpi-cell"
              onClick={() => handleDownloadExcel("KPI_PTM_TBTS_THOAI", "KON")}
            >
              {loadingPlan ? (
                <LoadingComponent />
              ) : EXEC_SL_TBTS_PTM_THOAI.KON ? (
                convertToFloat2Fixed(EXEC_SL_TBTS_PTM_THOAI.KON)
              ) : (
                ""
              )}
            </td>
            <td
              id="exec-kpi-thoai"
              className="cell-number"
              onClick={() => handleDownloadExcel("KPI_PTM_TBTS_THOAI")}
            >
              {loadingPlan ? (
                <LoadingComponent />
              ) : EXEC_SL_TBTS_PTM_THOAI.CTY7 ? (
                convertToFloat2Fixed(EXEC_SL_TBTS_PTM_THOAI.CTY7)
              ) : (
                ""
              )}
            </td>
          </tr>
          <tr>
            <td className="text-sub4 kpi-percent-lk">%HTKH </td>
            <td className="cell-number">
              {loadingExec || loadingPlan ? (
                <LoadingComponent />
              ) : EXEC_SL_TBTS_PTM_THOAI.KHO && PLAN_SL_TBTS_PTM_THOAI.KHO ? (
                convertToFloat2Fixed(
                  (EXEC_SL_TBTS_PTM_THOAI.KHO * 100) /
                    PLAN_SL_TBTS_PTM_THOAI.KHO
                )
              ) : (
                ""
              )}
            </td>
            <td className="cell-number">
              {loadingExec || loadingPlan ? (
                <LoadingComponent />
              ) : EXEC_SL_TBTS_PTM_THOAI.DLA && PLAN_SL_TBTS_PTM_THOAI.DLA ? (
                convertToFloat2Fixed(
                  (EXEC_SL_TBTS_PTM_THOAI.DLA * 100) /
                    PLAN_SL_TBTS_PTM_THOAI.DLA
                )
              ) : (
                ""
              )}
            </td>
            <td className="cell-number">
              {loadingExec || loadingPlan ? (
                <LoadingComponent />
              ) : EXEC_SL_TBTS_PTM_THOAI.GLA && PLAN_SL_TBTS_PTM_THOAI.GLA ? (
                convertToFloat2Fixed(
                  (EXEC_SL_TBTS_PTM_THOAI.GLA * 100) /
                    PLAN_SL_TBTS_PTM_THOAI.GLA
                )
              ) : (
                ""
              )}
            </td>
            <td className="cell-number">
              {loadingExec || loadingPlan ? (
                <LoadingComponent />
              ) : EXEC_SL_TBTS_PTM_THOAI.PYE && PLAN_SL_TBTS_PTM_THOAI.PYE ? (
                convertToFloat2Fixed(
                  (EXEC_SL_TBTS_PTM_THOAI.PYE * 100) /
                    PLAN_SL_TBTS_PTM_THOAI.PYE
                )
              ) : (
                ""
              )}
            </td>
            <td className="cell-number">
              {loadingExec || loadingPlan ? (
                <LoadingComponent />
              ) : EXEC_SL_TBTS_PTM_THOAI.DNO && PLAN_SL_TBTS_PTM_THOAI.DNO ? (
                convertToFloat2Fixed(
                  (EXEC_SL_TBTS_PTM_THOAI.DNO * 100) /
                    PLAN_SL_TBTS_PTM_THOAI.DNO
                )
              ) : (
                ""
              )}
            </td>
            <td className="cell-number">
              {loadingExec || loadingPlan ? (
                <LoadingComponent />
              ) : EXEC_SL_TBTS_PTM_THOAI.KON && PLAN_SL_TBTS_PTM_THOAI.KON ? (
                convertToFloat2Fixed(
                  (EXEC_SL_TBTS_PTM_THOAI.KON * 100) /
                    PLAN_SL_TBTS_PTM_THOAI.KON
                )
              ) : (
                ""
              )}
            </td>
            <td className="cell-number">
              {loadingExec || loadingPlan ? (
                <LoadingComponent />
              ) : EXEC_SL_TBTS_PTM_THOAI.CTY7 && PLAN_SL_TBTS_PTM_THOAI.CTY7 ? (
                convertToFloat2Fixed(
                  (EXEC_SL_TBTS_PTM_THOAI.CTY7 * 100) /
                    PLAN_SL_TBTS_PTM_THOAI.CTY7
                )
              ) : (
                ""
              )}
            </td>
          </tr>
          <tr>
            <td className="text-sub4 kpi-percent-th">Ước %HTKH</td>
            <td
              className={
                parseFloat(
                  ((EXEC_SL_TBTS_PTM_THOAI.KHO /
                    (new Date(
                      selectedDate.getFullYear(),
                      selectedDate.getMonth() + 1,
                      0
                    ) < new Date(EXEC_SL_TBTS_PTM_THOAI.LAST_DATE)
                      ? sumDateInMonth
                      : new Date(EXEC_SL_TBTS_PTM_THOAI.LAST_DATE).getDate())) *
                    sumDateInMonth *
                    100) /
                    PLAN_SL_TBTS_PTM_THOAI.KHO
                ) > 100
                  ? "bg-green"
                  : "bg-red"
              }
            >
              {loadingExec || loadingPlan ? (
                <LoadingComponent />
              ) : EXEC_SL_TBTS_PTM_THOAI.KHO && PLAN_SL_TBTS_PTM_THOAI.KHO ? (
                convertToFloat2Fixed(
                  ((EXEC_SL_TBTS_PTM_THOAI.KHO /
                    (new Date(
                      selectedDate.getFullYear(),
                      selectedDate.getMonth() + 1,
                      0
                    ) < new Date(EXEC_SL_TBTS_PTM_THOAI.LAST_DATE)
                      ? sumDateInMonth
                      : new Date(EXEC_SL_TBTS_PTM_THOAI.LAST_DATE).getDate())) *
                    sumDateInMonth *
                    100) /
                    PLAN_SL_TBTS_PTM_THOAI.KHO
                )
              ) : (
                ""
              )}
            </td>
            <td
              className={
                parseFloat(
                  ((EXEC_SL_TBTS_PTM_THOAI.DLA /
                    (new Date(
                      selectedDate.getFullYear(),
                      selectedDate.getMonth() + 1,
                      0
                    ) < new Date(EXEC_SL_TBTS_PTM_THOAI.LAST_DATE)
                      ? sumDateInMonth
                      : new Date(EXEC_SL_TBTS_PTM_THOAI.LAST_DATE).getDate())) *
                    sumDateInMonth *
                    100) /
                    PLAN_SL_TBTS_PTM_THOAI.DLA
                ) > 100
                  ? "bg-green"
                  : "bg-red"
              }
            >
              {loadingExec || loadingPlan ? (
                <LoadingComponent />
              ) : EXEC_SL_TBTS_PTM_THOAI.DLA && PLAN_SL_TBTS_PTM_THOAI.DLA ? (
                convertToFloat2Fixed(
                  ((EXEC_SL_TBTS_PTM_THOAI.DLA /
                    (new Date(
                      selectedDate.getFullYear(),
                      selectedDate.getMonth() + 1,
                      0
                    ) < new Date(EXEC_SL_TBTS_PTM_THOAI.LAST_DATE)
                      ? sumDateInMonth
                      : new Date(EXEC_SL_TBTS_PTM_THOAI.LAST_DATE).getDate())) *
                    sumDateInMonth *
                    100) /
                    PLAN_SL_TBTS_PTM_THOAI.DLA
                )
              ) : (
                ""
              )}
            </td>
            <td
              className={
                parseFloat(
                  ((EXEC_SL_TBTS_PTM_THOAI.GLA /
                    (new Date(
                      selectedDate.getFullYear(),
                      selectedDate.getMonth() + 1,
                      0
                    ) < new Date(EXEC_SL_TBTS_PTM_THOAI.LAST_DATE)
                      ? sumDateInMonth
                      : new Date(EXEC_SL_TBTS_PTM_THOAI.LAST_DATE).getDate())) *
                    sumDateInMonth *
                    100) /
                    PLAN_SL_TBTS_PTM_THOAI.GLA
                ) > 100
                  ? "bg-green"
                  : "bg-red"
              }
            >
              {loadingExec || loadingPlan ? (
                <LoadingComponent />
              ) : EXEC_SL_TBTS_PTM_THOAI.GLA && PLAN_SL_TBTS_PTM_THOAI.GLA ? (
                convertToFloat2Fixed(
                  ((EXEC_SL_TBTS_PTM_THOAI.GLA /
                    (new Date(
                      selectedDate.getFullYear(),
                      selectedDate.getMonth() + 1,
                      0
                    ) < new Date(EXEC_SL_TBTS_PTM_THOAI.LAST_DATE)
                      ? sumDateInMonth
                      : new Date(EXEC_SL_TBTS_PTM_THOAI.LAST_DATE).getDate())) *
                    sumDateInMonth *
                    100) /
                    PLAN_SL_TBTS_PTM_THOAI.GLA
                )
              ) : (
                ""
              )}
            </td>
            <td
              className={
                parseFloat(
                  ((EXEC_SL_TBTS_PTM_THOAI.PYE /
                    (new Date(
                      selectedDate.getFullYear(),
                      selectedDate.getMonth() + 1,
                      0
                    ) < new Date(EXEC_SL_TBTS_PTM_THOAI.LAST_DATE)
                      ? sumDateInMonth
                      : new Date(EXEC_SL_TBTS_PTM_THOAI.LAST_DATE).getDate())) *
                    sumDateInMonth *
                    100) /
                    PLAN_SL_TBTS_PTM_THOAI.PYE
                ) > 100
                  ? "bg-green"
                  : "bg-red"
              }
            >
              {loadingExec || loadingPlan ? (
                <LoadingComponent />
              ) : EXEC_SL_TBTS_PTM_THOAI.PYE && PLAN_SL_TBTS_PTM_THOAI.PYE ? (
                convertToFloat2Fixed(
                  ((EXEC_SL_TBTS_PTM_THOAI.PYE /
                    (new Date(
                      selectedDate.getFullYear(),
                      selectedDate.getMonth() + 1,
                      0
                    ) < new Date(EXEC_SL_TBTS_PTM_THOAI.LAST_DATE)
                      ? sumDateInMonth
                      : new Date(EXEC_SL_TBTS_PTM_THOAI.LAST_DATE).getDate())) *
                    sumDateInMonth *
                    100) /
                    PLAN_SL_TBTS_PTM_THOAI.PYE
                )
              ) : (
                ""
              )}
            </td>
            <td
              className={
                parseFloat(
                  ((EXEC_SL_TBTS_PTM_THOAI.DNO /
                    (new Date(
                      selectedDate.getFullYear(),
                      selectedDate.getMonth() + 1,
                      0
                    ) < new Date(EXEC_SL_TBTS_PTM_THOAI.LAST_DATE)
                      ? sumDateInMonth
                      : new Date(EXEC_SL_TBTS_PTM_THOAI.LAST_DATE).getDate())) *
                    sumDateInMonth *
                    100) /
                    PLAN_SL_TBTS_PTM_THOAI.DNO
                ) > 100
                  ? "bg-green"
                  : "bg-red"
              }
            >
              {loadingExec || loadingPlan ? (
                <LoadingComponent />
              ) : EXEC_SL_TBTS_PTM_THOAI.DNO && PLAN_SL_TBTS_PTM_THOAI.DNO ? (
                convertToFloat2Fixed(
                  ((EXEC_SL_TBTS_PTM_THOAI.DNO /
                    (new Date(
                      selectedDate.getFullYear(),
                      selectedDate.getMonth() + 1,
                      0
                    ) < new Date(EXEC_SL_TBTS_PTM_THOAI.LAST_DATE)
                      ? sumDateInMonth
                      : new Date(EXEC_SL_TBTS_PTM_THOAI.LAST_DATE).getDate())) *
                    sumDateInMonth *
                    100) /
                    PLAN_SL_TBTS_PTM_THOAI.DNO
                )
              ) : (
                ""
              )}
            </td>
            <td
              className={
                parseFloat(
                  ((EXEC_SL_TBTS_PTM_THOAI.KON /
                    (new Date(
                      selectedDate.getFullYear(),
                      selectedDate.getMonth() + 1,
                      0
                    ) < new Date(EXEC_SL_TBTS_PTM_THOAI.LAST_DATE)
                      ? sumDateInMonth
                      : new Date(EXEC_SL_TBTS_PTM_THOAI.LAST_DATE).getDate())) *
                    sumDateInMonth *
                    100) /
                    PLAN_SL_TBTS_PTM_THOAI.KON
                ) > 100
                  ? "bg-green"
                  : "bg-red"
              }
            >
              {loadingExec || loadingPlan ? (
                <LoadingComponent />
              ) : EXEC_SL_TBTS_PTM_THOAI.KON && PLAN_SL_TBTS_PTM_THOAI.KON ? (
                convertToFloat2Fixed(
                  ((EXEC_SL_TBTS_PTM_THOAI.KON /
                    (new Date(
                      selectedDate.getFullYear(),
                      selectedDate.getMonth() + 1,
                      0
                    ) < new Date(EXEC_SL_TBTS_PTM_THOAI.LAST_DATE)
                      ? sumDateInMonth
                      : new Date(EXEC_SL_TBTS_PTM_THOAI.LAST_DATE).getDate())) *
                    sumDateInMonth *
                    100) /
                    PLAN_SL_TBTS_PTM_THOAI.KON
                )
              ) : (
                ""
              )}
            </td>
            <td
              className={
                parseFloat(
                  ((EXEC_SL_TBTS_PTM_THOAI.CTY7 /
                    (new Date(
                      selectedDate.getFullYear(),
                      selectedDate.getMonth() + 1,
                      0
                    ) < new Date(EXEC_SL_TBTS_PTM_THOAI.LAST_DATE)
                      ? sumDateInMonth
                      : new Date(EXEC_SL_TBTS_PTM_THOAI.LAST_DATE).getDate())) *
                    sumDateInMonth *
                    100) /
                    PLAN_SL_TBTS_PTM_THOAI.CTY7
                ) > 100
                  ? "bg-green"
                  : "bg-red"
              }
            >
              {loadingExec || loadingPlan ? (
                <LoadingComponent />
              ) : EXEC_SL_TBTS_PTM_THOAI.CTY7 && PLAN_SL_TBTS_PTM_THOAI.CTY7 ? (
                convertToFloat2Fixed(
                  ((EXEC_SL_TBTS_PTM_THOAI.CTY7 /
                    (new Date(
                      selectedDate.getFullYear(),
                      selectedDate.getMonth() + 1,
                      0
                    ) < new Date(EXEC_SL_TBTS_PTM_THOAI.LAST_DATE)
                      ? sumDateInMonth
                      : new Date(EXEC_SL_TBTS_PTM_THOAI.LAST_DATE).getDate())) *
                    sumDateInMonth *
                    100) /
                    PLAN_SL_TBTS_PTM_THOAI.CTY7
                )
              ) : (
                ""
              )}
            </td>
          </tr>
          <tr>
            <td rowSpan={4} className="text-sub3">
              7.4
            </td>
            <td rowSpan={4} className="text-sub3 cell-kpi">
              TB PTM M2M
            </td>
            <td rowSpan={4} className="kpi-dvt">
              thuê bao
            </td>
            <td className="text-sub4 kpi-kht">KHT</td>
            <td className="cell-number">
              {loadingPlan ? (
                <LoadingComponent />
              ) : PLAN_SL_TB_PTM_M2M.KHO ? (
                convertToFloat2Fixed(PLAN_SL_TB_PTM_M2M.KHO)
              ) : (
                ""
              )}
            </td>
            <td className="cell-number">
              {loadingPlan ? (
                <LoadingComponent />
              ) : PLAN_SL_TB_PTM_M2M.DLA ? (
                convertToFloat2Fixed(PLAN_SL_TB_PTM_M2M.DLA)
              ) : (
                ""
              )}
            </td>
            <td className="cell-number">
              {loadingPlan ? (
                <LoadingComponent />
              ) : PLAN_SL_TB_PTM_M2M.GLA ? (
                convertToFloat2Fixed(PLAN_SL_TB_PTM_M2M.GLA)
              ) : (
                ""
              )}
            </td>
            <td className="cell-number">
              {loadingPlan ? (
                <LoadingComponent />
              ) : PLAN_SL_TB_PTM_M2M.PYE ? (
                convertToFloat2Fixed(PLAN_SL_TB_PTM_M2M.PYE)
              ) : (
                ""
              )}
            </td>
            <td className="cell-number">
              {loadingPlan ? (
                <LoadingComponent />
              ) : PLAN_SL_TB_PTM_M2M.DNO ? (
                convertToFloat2Fixed(PLAN_SL_TB_PTM_M2M.DNO)
              ) : (
                ""
              )}
            </td>
            <td className="cell-number">
              {loadingPlan ? (
                <LoadingComponent />
              ) : PLAN_SL_TB_PTM_M2M.KON ? (
                convertToFloat2Fixed(PLAN_SL_TB_PTM_M2M.KON)
              ) : (
                ""
              )}
            </td>
            <td className="cell-number">
              {loadingPlan ? (
                <LoadingComponent />
              ) : PLAN_SL_TB_PTM_M2M.CTY7 ? (
                convertToFloat2Fixed(PLAN_SL_TB_PTM_M2M.CTY7)
              ) : (
                ""
              )}
            </td>
            <td rowSpan={4} className="cell-donviphutrach">
              DVVT
              <br />
              <span>
                {EXEC_SL_TB_PTM_M2M.LAST_DATE
                  ? getFormattedDate(new Date(EXEC_SL_TB_PTM_M2M.LAST_DATE))
                  : ""}
              </span>
            </td>
          </tr>
          <tr>
            <td className="text-sub4 kpi-thlk">THLK</td>
            <td
              className="cell-number kpi-cell"
              onClick={() => handleDownloadExcel("KPI_PTM_M2M", "KHO")}
            >
              {loadingExec ? (
                <LoadingComponent />
              ) : EXEC_SL_TB_PTM_M2M.KHO ? (
                convertToFloat2Fixed(EXEC_SL_TB_PTM_M2M.KHO)
              ) : (
                ""
              )}
            </td>
            <td
              className="cell-number kpi-cell"
              onClick={() => handleDownloadExcel("KPI_PTM_M2M", "DLA")}
            >
              {loadingExec ? (
                <LoadingComponent />
              ) : EXEC_SL_TB_PTM_M2M.DLA ? (
                convertToFloat2Fixed(EXEC_SL_TB_PTM_M2M.DLA)
              ) : (
                ""
              )}
            </td>
            <td
              className="cell-number kpi-cell"
              onClick={() => handleDownloadExcel("KPI_PTM_M2M", "GLA")}
            >
              {loadingExec ? (
                <LoadingComponent />
              ) : EXEC_SL_TB_PTM_M2M.GLA ? (
                convertToFloat2Fixed(EXEC_SL_TB_PTM_M2M.GLA)
              ) : (
                ""
              )}
            </td>
            <td
              className="cell-number kpi-cell"
              onClick={() => handleDownloadExcel("KPI_PTM_M2M", "PYE")}
            >
              {loadingExec ? (
                <LoadingComponent />
              ) : EXEC_SL_TB_PTM_M2M.PYE ? (
                convertToFloat2Fixed(EXEC_SL_TB_PTM_M2M.PYE)
              ) : (
                ""
              )}
            </td>
            <td
              className="cell-number kpi-cell"
              onClick={() => handleDownloadExcel("KPI_PTM_M2M", "DNO")}
            >
              {loadingExec ? (
                <LoadingComponent />
              ) : EXEC_SL_TB_PTM_M2M.DNO ? (
                convertToFloat2Fixed(EXEC_SL_TB_PTM_M2M.DNO)
              ) : (
                ""
              )}
            </td>
            <td
              className="cell-number kpi-cell"
              onClick={() => handleDownloadExcel("KPI_PTM_M2M", "KON")}
            >
              {loadingExec ? (
                <LoadingComponent />
              ) : EXEC_SL_TB_PTM_M2M.KON ? (
                convertToFloat2Fixed(EXEC_SL_TB_PTM_M2M.KON)
              ) : (
                ""
              )}
            </td>
            <td
              id="exec-kpi-m2m"
              className="cell-number"
              onClick={() => handleDownloadExcel("KPI_PTM_M2M")}
            >
              {loadingExec ? (
                <LoadingComponent />
              ) : EXEC_SL_TB_PTM_M2M.CTY7 ? (
                convertToFloat2Fixed(EXEC_SL_TB_PTM_M2M.CTY7)
              ) : (
                ""
              )}
            </td>
          </tr>
          <tr>
            <td className="text-sub4 kpi-percent-lk">%HTKH </td>
            <td className="cell-number">
              {loadingExec || loadingPlan ? (
                <LoadingComponent />
              ) : EXEC_SL_TB_PTM_M2M.KHO && PLAN_SL_TB_PTM_M2M.KHO ? (
                convertToFloat2Fixed(
                  (EXEC_SL_TB_PTM_M2M.KHO * 100) / PLAN_SL_TB_PTM_M2M.KHO
                )
              ) : (
                ""
              )}
            </td>
            <td className="cell-number">
              {loadingExec || loadingPlan ? (
                <LoadingComponent />
              ) : EXEC_SL_TB_PTM_M2M.DLA && PLAN_SL_TB_PTM_M2M.DLA ? (
                convertToFloat2Fixed(
                  (EXEC_SL_TB_PTM_M2M.DLA * 100) / PLAN_SL_TB_PTM_M2M.DLA
                )
              ) : (
                ""
              )}
            </td>
            <td className="cell-number">
              {loadingExec || loadingPlan ? (
                <LoadingComponent />
              ) : EXEC_SL_TB_PTM_M2M.GLA && PLAN_SL_TB_PTM_M2M.GLA ? (
                convertToFloat2Fixed(
                  (EXEC_SL_TB_PTM_M2M.GLA * 100) / PLAN_SL_TB_PTM_M2M.GLA
                )
              ) : (
                ""
              )}
            </td>
            <td className="cell-number">
              {loadingExec || loadingPlan ? (
                <LoadingComponent />
              ) : EXEC_SL_TB_PTM_M2M.PYE && PLAN_SL_TB_PTM_M2M.PYE ? (
                convertToFloat2Fixed(
                  (EXEC_SL_TB_PTM_M2M.PYE * 100) / PLAN_SL_TB_PTM_M2M.PYE
                )
              ) : (
                ""
              )}
            </td>
            <td className="cell-number">
              {loadingExec || loadingPlan ? (
                <LoadingComponent />
              ) : EXEC_SL_TB_PTM_M2M.DNO && PLAN_SL_TB_PTM_M2M.DNO ? (
                convertToFloat2Fixed(
                  (EXEC_SL_TB_PTM_M2M.DNO * 100) / PLAN_SL_TB_PTM_M2M.DNO
                )
              ) : (
                ""
              )}
            </td>
            <td className="cell-number">
              {loadingExec || loadingPlan ? (
                <LoadingComponent />
              ) : EXEC_SL_TB_PTM_M2M.KON && PLAN_SL_TB_PTM_M2M.KON ? (
                convertToFloat2Fixed(
                  (EXEC_SL_TB_PTM_M2M.KON * 100) / PLAN_SL_TB_PTM_M2M.KON
                )
              ) : (
                ""
              )}
            </td>
            <td className="cell-number">
              {loadingExec || loadingPlan ? (
                <LoadingComponent />
              ) : EXEC_SL_TB_PTM_M2M.CTY7 && PLAN_SL_TB_PTM_M2M.CTY7 ? (
                convertToFloat2Fixed(
                  (EXEC_SL_TB_PTM_M2M.CTY7 * 100) / PLAN_SL_TB_PTM_M2M.CTY7
                )
              ) : (
                ""
              )}
            </td>
          </tr>
          <tr>
            <td className="text-sub4 kpi-percent-th">Ước %HTKH</td>
            <td
              className={
                parseFloat(
                  ((EXEC_SL_TB_PTM_M2M.KHO /
                    (new Date(
                      selectedDate.getFullYear(),
                      selectedDate.getMonth() + 1,
                      0
                    ) < new Date(EXEC_SL_TB_PTM_M2M.LAST_DATE)
                      ? sumDateInMonth
                      : new Date(EXEC_SL_TB_PTM_M2M.LAST_DATE).getDate())) *
                    sumDateInMonth *
                    100) /
                    PLAN_SL_TB_PTM_M2M.KHO
                ) > 100 || PLAN_SL_TB_PTM_M2M.KHO == 0
                  ? "bg-green"
                  : "bg-red"
              }
            >
              {loadingExec || loadingPlan ? (
                <LoadingComponent />
              ) : EXEC_SL_TB_PTM_M2M.KHO && PLAN_SL_TB_PTM_M2M.KHO ? (
                convertToFloat2Fixed(
                  ((EXEC_SL_TB_PTM_M2M.KHO /
                    (new Date(
                      selectedDate.getFullYear(),
                      selectedDate.getMonth() + 1,
                      0
                    ) < new Date(EXEC_SL_TB_PTM_M2M.LAST_DATE)
                      ? sumDateInMonth
                      : new Date(EXEC_SL_TB_PTM_M2M.LAST_DATE).getDate())) *
                    sumDateInMonth *
                    100) /
                    PLAN_SL_TB_PTM_M2M.KHO
                )
              ) : PLAN_SL_TB_PTM_M2M.KHO == 0 ? (
                105
              ) : (
                ""
              )}
            </td>
            <td
              className={
                parseFloat(
                  ((EXEC_SL_TB_PTM_M2M.DLA /
                    (new Date(
                      selectedDate.getFullYear(),
                      selectedDate.getMonth() + 1,
                      0
                    ) < new Date(EXEC_SL_TB_PTM_M2M.LAST_DATE)
                      ? sumDateInMonth
                      : new Date(EXEC_SL_TB_PTM_M2M.LAST_DATE).getDate())) *
                    sumDateInMonth *
                    100) /
                    PLAN_SL_TB_PTM_M2M.DLA
                ) > 100
                  ? "bg-green"
                  : "bg-red"
              }
            >
              {loadingExec || loadingPlan ? (
                <LoadingComponent />
              ) : EXEC_SL_TB_PTM_M2M.DLA && PLAN_SL_TB_PTM_M2M.DLA ? (
                convertToFloat2Fixed(
                  ((EXEC_SL_TB_PTM_M2M.DLA /
                    (new Date(
                      selectedDate.getFullYear(),
                      selectedDate.getMonth() + 1,
                      0
                    ) < new Date(EXEC_SL_TB_PTM_M2M.LAST_DATE)
                      ? sumDateInMonth
                      : new Date(EXEC_SL_TB_PTM_M2M.LAST_DATE).getDate())) *
                    sumDateInMonth *
                    100) /
                    PLAN_SL_TB_PTM_M2M.DLA
                )
              ) : (
                ""
              )}
            </td>
            <td
              className={
                parseFloat(
                  ((EXEC_SL_TB_PTM_M2M.GLA /
                    (new Date(
                      selectedDate.getFullYear(),
                      selectedDate.getMonth() + 1,
                      0
                    ) < new Date(EXEC_SL_TB_PTM_M2M.LAST_DATE)
                      ? sumDateInMonth
                      : new Date(EXEC_SL_TB_PTM_M2M.LAST_DATE).getDate())) *
                    sumDateInMonth *
                    100) /
                    PLAN_SL_TB_PTM_M2M.GLA
                ) > 100
                  ? "bg-green"
                  : "bg-red"
              }
            >
              {loadingExec || loadingPlan ? (
                <LoadingComponent />
              ) : EXEC_SL_TB_PTM_M2M.GLA && PLAN_SL_TB_PTM_M2M.GLA ? (
                convertToFloat2Fixed(
                  ((EXEC_SL_TB_PTM_M2M.GLA /
                    (new Date(
                      selectedDate.getFullYear(),
                      selectedDate.getMonth() + 1,
                      0
                    ) < new Date(EXEC_SL_TB_PTM_M2M.LAST_DATE)
                      ? sumDateInMonth
                      : new Date(EXEC_SL_TB_PTM_M2M.LAST_DATE).getDate())) *
                    sumDateInMonth *
                    100) /
                    PLAN_SL_TB_PTM_M2M.GLA
                )
              ) : (
                ""
              )}
            </td>
            <td
              className={
                parseFloat(
                  ((EXEC_SL_TB_PTM_M2M.PYE /
                    (new Date(
                      selectedDate.getFullYear(),
                      selectedDate.getMonth() + 1,
                      0
                    ) < new Date(EXEC_SL_TB_PTM_M2M.LAST_DATE)
                      ? sumDateInMonth
                      : new Date(EXEC_SL_TB_PTM_M2M.LAST_DATE).getDate())) *
                    sumDateInMonth *
                    100) /
                    PLAN_SL_TB_PTM_M2M.PYE
                ) > 100
                  ? "bg-green"
                  : "bg-red"
              }
            >
              {loadingExec || loadingPlan ? (
                <LoadingComponent />
              ) : EXEC_SL_TB_PTM_M2M.PYE && PLAN_SL_TB_PTM_M2M.PYE ? (
                convertToFloat2Fixed(
                  ((EXEC_SL_TB_PTM_M2M.PYE /
                    (new Date(
                      selectedDate.getFullYear(),
                      selectedDate.getMonth() + 1,
                      0
                    ) < new Date(EXEC_SL_TB_PTM_M2M.LAST_DATE)
                      ? sumDateInMonth
                      : new Date(EXEC_SL_TB_PTM_M2M.LAST_DATE).getDate())) *
                    sumDateInMonth *
                    100) /
                    PLAN_SL_TB_PTM_M2M.PYE
                )
              ) : (
                ""
              )}
            </td>
            <td
              className={
                parseFloat(
                  ((EXEC_SL_TB_PTM_M2M.DNO /
                    (new Date(
                      selectedDate.getFullYear(),
                      selectedDate.getMonth() + 1,
                      0
                    ) < new Date(EXEC_SL_TB_PTM_M2M.LAST_DATE)
                      ? sumDateInMonth
                      : new Date(EXEC_SL_TB_PTM_M2M.LAST_DATE).getDate())) *
                    sumDateInMonth *
                    100) /
                    PLAN_SL_TB_PTM_M2M.DNO
                ) > 100 || PLAN_SL_TB_PTM_M2M.DNO == 0
                  ? "bg-green"
                  : "bg-red"
              }
            >
              {loadingExec || loadingPlan ? (
                <LoadingComponent />
              ) : EXEC_SL_TB_PTM_M2M.DNO && PLAN_SL_TB_PTM_M2M.DNO ? (
                convertToFloat2Fixed(
                  ((EXEC_SL_TB_PTM_M2M.DNO /
                    (new Date(
                      selectedDate.getFullYear(),
                      selectedDate.getMonth() + 1,
                      0
                    ) < new Date(EXEC_SL_TB_PTM_M2M.LAST_DATE)
                      ? sumDateInMonth
                      : new Date(EXEC_SL_TB_PTM_M2M.LAST_DATE).getDate())) *
                    sumDateInMonth *
                    100) /
                    PLAN_SL_TB_PTM_M2M.DNO
                )
              ) : PLAN_SL_TB_PTM_M2M.DNO == 0 ? (
                105
              ) : (
                ""
              )}
            </td>
            <td
              className={
                parseFloat(
                  ((EXEC_SL_TB_PTM_M2M.KON /
                    (new Date(
                      selectedDate.getFullYear(),
                      selectedDate.getMonth() + 1,
                      0
                    ) < new Date(EXEC_SL_TB_PTM_M2M.LAST_DATE)
                      ? sumDateInMonth
                      : new Date(EXEC_SL_TB_PTM_M2M.LAST_DATE).getDate())) *
                    sumDateInMonth *
                    100) /
                    PLAN_SL_TB_PTM_M2M.KON
                ) > 100
                  ? "bg-green"
                  : "bg-red"
              }
            >
              {loadingExec || loadingPlan ? (
                <LoadingComponent />
              ) : EXEC_SL_TB_PTM_M2M.KON && PLAN_SL_TB_PTM_M2M.KON ? (
                convertToFloat2Fixed(
                  ((EXEC_SL_TB_PTM_M2M.KON /
                    (new Date(
                      selectedDate.getFullYear(),
                      selectedDate.getMonth() + 1,
                      0
                    ) < new Date(EXEC_SL_TB_PTM_M2M.LAST_DATE)
                      ? sumDateInMonth
                      : new Date(EXEC_SL_TB_PTM_M2M.LAST_DATE).getDate())) *
                    sumDateInMonth *
                    100) /
                    PLAN_SL_TB_PTM_M2M.KON
                )
              ) : (
                ""
              )}
            </td>
            <td
              className={
                parseFloat(
                  ((EXEC_SL_TB_PTM_M2M.CTY7 /
                    (new Date(
                      selectedDate.getFullYear(),
                      selectedDate.getMonth() + 1,
                      0
                    ) < new Date(EXEC_SL_TB_PTM_M2M.LAST_DATE)
                      ? sumDateInMonth
                      : new Date(EXEC_SL_TB_PTM_M2M.LAST_DATE).getDate())) *
                    sumDateInMonth *
                    100) /
                    PLAN_SL_TB_PTM_M2M.CTY7
                ) > 100
                  ? "bg-green"
                  : "bg-red"
              }
            >
              {loadingExec || loadingPlan ? (
                <LoadingComponent />
              ) : EXEC_SL_TB_PTM_M2M.CTY7 && PLAN_SL_TB_PTM_M2M.CTY7 ? (
                convertToFloat2Fixed(
                  ((EXEC_SL_TB_PTM_M2M.CTY7 /
                    (new Date(
                      selectedDate.getFullYear(),
                      selectedDate.getMonth() + 1,
                      0
                    ) < new Date(EXEC_SL_TB_PTM_M2M.LAST_DATE)
                      ? sumDateInMonth
                      : new Date(EXEC_SL_TB_PTM_M2M.LAST_DATE).getDate())) *
                    sumDateInMonth *
                    100) /
                    PLAN_SL_TB_PTM_M2M.CTY7
                )
              ) : (
                ""
              )}
            </td>
          </tr>
          <tr>
            <td rowSpan={4} className="text-sub2">
              8
            </td>
            <td rowSpan={4} className="text-sub2 cell-kpi">
              TB PTM mạng Saymee
            </td>
            <td rowSpan={4} className="kpi-dvt">
              thuê bao
            </td>
            <td className="text-sub4 kpi-kht">KHT</td>
            <td className="cell-number">
              {loadingPlan ? (
                <LoadingComponent />
              ) : PLAN_TB_PTM_SAYMEE.KHO ? (
                convertToFloat2Fixed(PLAN_TB_PTM_SAYMEE.KHO)
              ) : (
                ""
              )}
            </td>
            <td className="cell-number">
              {loadingPlan ? (
                <LoadingComponent />
              ) : PLAN_TB_PTM_SAYMEE.DLA ? (
                convertToFloat2Fixed(PLAN_TB_PTM_SAYMEE.DLA)
              ) : (
                ""
              )}
            </td>
            <td className="cell-number">
              {loadingPlan ? (
                <LoadingComponent />
              ) : PLAN_TB_PTM_SAYMEE.GLA ? (
                convertToFloat2Fixed(PLAN_TB_PTM_SAYMEE.GLA)
              ) : (
                ""
              )}
            </td>
            <td className="cell-number">
              {loadingPlan ? (
                <LoadingComponent />
              ) : PLAN_TB_PTM_SAYMEE.PYE ? (
                convertToFloat2Fixed(PLAN_TB_PTM_SAYMEE.PYE)
              ) : (
                ""
              )}
            </td>
            <td className="cell-number">
              {loadingPlan ? (
                <LoadingComponent />
              ) : PLAN_TB_PTM_SAYMEE.DNO ? (
                convertToFloat2Fixed(PLAN_TB_PTM_SAYMEE.DNO)
              ) : (
                ""
              )}
            </td>
            <td className="cell-number">
              {loadingPlan ? (
                <LoadingComponent />
              ) : PLAN_TB_PTM_SAYMEE.KON ? (
                convertToFloat2Fixed(PLAN_TB_PTM_SAYMEE.KON)
              ) : (
                ""
              )}
            </td>
            <td className="cell-number">
              {loadingPlan ? (
                <LoadingComponent />
              ) : PLAN_TB_PTM_SAYMEE.CTY7 ? (
                convertToFloat2Fixed(PLAN_TB_PTM_SAYMEE.CTY7)
              ) : (
                ""
              )}
            </td>
            <td rowSpan={4} className="cell-donviphutrach">
              DVVT
              <br />
              <span>
                {EXEC_TB_PTM_SAYMEE.LAST_DATE
                  ? getFormattedDate(new Date(EXEC_TB_PTM_SAYMEE.LAST_DATE))
                  : ""}
              </span>
            </td>
          </tr>
          <tr>
            <td className="text-sub4 kpi-thlk">THLK</td>
            <td
              className="cell-number kpi-cell"
              onClick={() => handleDownloadExcel("KPI_PTM_SAYMEE", "KHO")}
            >
              {loadingExec ? (
                <LoadingComponent />
              ) : EXEC_TB_PTM_SAYMEE.KHO ? (
                convertToFloat2Fixed(EXEC_TB_PTM_SAYMEE.KHO)
              ) : (
                ""
              )}
            </td>
            <td
              className="cell-number kpi-cell"
              onClick={() => handleDownloadExcel("KPI_PTM_SAYMEE", "DLA")}
            >
              {loadingExec ? (
                <LoadingComponent />
              ) : EXEC_TB_PTM_SAYMEE.DLA ? (
                convertToFloat2Fixed(EXEC_TB_PTM_SAYMEE.DLA)
              ) : (
                ""
              )}
            </td>
            <td
              className="cell-number kpi-cell"
              onClick={() => handleDownloadExcel("KPI_PTM_SAYMEE", "GLA")}
            >
              {loadingExec ? (
                <LoadingComponent />
              ) : EXEC_TB_PTM_SAYMEE.GLA ? (
                convertToFloat2Fixed(EXEC_TB_PTM_SAYMEE.GLA)
              ) : (
                ""
              )}
            </td>
            <td
              className="cell-number kpi-cell"
              onClick={() => handleDownloadExcel("KPI_PTM_SAYMEE", "PYE")}
            >
              {loadingExec ? (
                <LoadingComponent />
              ) : EXEC_TB_PTM_SAYMEE.PYE ? (
                convertToFloat2Fixed(EXEC_TB_PTM_SAYMEE.PYE)
              ) : (
                ""
              )}
            </td>
            <td
              className="cell-number kpi-cell"
              onClick={() => handleDownloadExcel("KPI_PTM_SAYMEE", "DNO")}
            >
              {loadingExec ? (
                <LoadingComponent />
              ) : EXEC_TB_PTM_SAYMEE.DNO ? (
                convertToFloat2Fixed(EXEC_TB_PTM_SAYMEE.DNO)
              ) : (
                ""
              )}
            </td>
            <td
              className="cell-number kpi-cell"
              onClick={() => handleDownloadExcel("KPI_PTM_SAYMEE", "KON")}
            >
              {loadingExec ? (
                <LoadingComponent />
              ) : EXEC_TB_PTM_SAYMEE.KON ? (
                convertToFloat2Fixed(EXEC_TB_PTM_SAYMEE.KON)
              ) : (
                ""
              )}
            </td>
            <td
              id="exec-kpi-saymee"
              className="cell-number"
              onClick={() => handleDownloadExcel("KPI_PTM_SAYMEE")}
            >
              {loadingExec ? (
                <LoadingComponent />
              ) : EXEC_TB_PTM_SAYMEE.CTY7 ? (
                convertToFloat2Fixed(EXEC_TB_PTM_SAYMEE.CTY7)
              ) : (
                ""
              )}
            </td>
          </tr>
          <tr>
            <td className="text-sub4 kpi-percent-lk">%HTKH </td>
            <td className="cell-number">
              {loadingExec || loadingPlan ? (
                <LoadingComponent />
              ) : EXEC_TB_PTM_SAYMEE.KHO && PLAN_TB_PTM_SAYMEE.KHO ? (
                convertToFloat2Fixed(
                  (EXEC_TB_PTM_SAYMEE.KHO * 100) / PLAN_TB_PTM_SAYMEE.KHO
                )
              ) : (
                ""
              )}
            </td>
            <td className="cell-number">
              {loadingExec || loadingPlan ? (
                <LoadingComponent />
              ) : EXEC_TB_PTM_SAYMEE.DLA && PLAN_TB_PTM_SAYMEE.DLA ? (
                convertToFloat2Fixed(
                  (EXEC_TB_PTM_SAYMEE.DLA * 100) / PLAN_TB_PTM_SAYMEE.DLA
                )
              ) : (
                ""
              )}
            </td>
            <td className="cell-number">
              {loadingExec || loadingPlan ? (
                <LoadingComponent />
              ) : EXEC_TB_PTM_SAYMEE.GLA && PLAN_TB_PTM_SAYMEE.GLA ? (
                convertToFloat2Fixed(
                  (EXEC_TB_PTM_SAYMEE.GLA * 100) / PLAN_TB_PTM_SAYMEE.GLA
                )
              ) : (
                ""
              )}
            </td>
            <td className="cell-number">
              {loadingExec || loadingPlan ? (
                <LoadingComponent />
              ) : EXEC_TB_PTM_SAYMEE.PYE && PLAN_TB_PTM_SAYMEE.PYE ? (
                convertToFloat2Fixed(
                  (EXEC_TB_PTM_SAYMEE.PYE * 100) / PLAN_TB_PTM_SAYMEE.PYE
                )
              ) : (
                ""
              )}
            </td>
            <td className="cell-number">
              {loadingExec || loadingPlan ? (
                <LoadingComponent />
              ) : EXEC_TB_PTM_SAYMEE.DNO && PLAN_TB_PTM_SAYMEE.DNO ? (
                convertToFloat2Fixed(
                  (EXEC_TB_PTM_SAYMEE.DNO * 100) / PLAN_TB_PTM_SAYMEE.DNO
                )
              ) : (
                ""
              )}
            </td>
            <td className="cell-number">
              {loadingExec || loadingPlan ? (
                <LoadingComponent />
              ) : EXEC_TB_PTM_SAYMEE.KON && PLAN_TB_PTM_SAYMEE.KON ? (
                convertToFloat2Fixed(
                  (EXEC_TB_PTM_SAYMEE.KON * 100) / PLAN_TB_PTM_SAYMEE.KON
                )
              ) : (
                ""
              )}
            </td>
            <td className="cell-number">
              {loadingExec || loadingPlan ? (
                <LoadingComponent />
              ) : EXEC_TB_PTM_SAYMEE.CTY7 && PLAN_TB_PTM_SAYMEE.CTY7 ? (
                convertToFloat2Fixed(
                  (EXEC_TB_PTM_SAYMEE.CTY7 * 100) / PLAN_TB_PTM_SAYMEE.CTY7
                )
              ) : (
                ""
              )}
            </td>
          </tr>
          <tr>
            <td className="text-sub4 kpi-percent-th">Ước %HTKH</td>
            <td
              className={
                parseFloat(
                  ((EXEC_TB_PTM_SAYMEE.KHO /
                    (new Date(
                      selectedDate.getFullYear(),
                      selectedDate.getMonth() + 1,
                      0
                    ) < new Date(EXEC_TB_PTM_SAYMEE.LAST_DATE)
                      ? sumDateInMonth
                      : new Date(EXEC_TB_PTM_SAYMEE.LAST_DATE).getDate())) *
                    sumDateInMonth *
                    100) /
                    PLAN_TB_PTM_SAYMEE.KHO
                ) > 100
                  ? "bg-green"
                  : "bg-red"
              }
            >
              {loadingExec || loadingPlan ? (
                <LoadingComponent />
              ) : EXEC_TB_PTM_SAYMEE.KHO && PLAN_TB_PTM_SAYMEE.KON ? (
                convertToFloat2Fixed(
                  ((EXEC_TB_PTM_SAYMEE.KHO /
                    (new Date(
                      selectedDate.getFullYear(),
                      selectedDate.getMonth() + 1,
                      0
                    ) < new Date(EXEC_TB_PTM_SAYMEE.LAST_DATE)
                      ? sumDateInMonth
                      : new Date(EXEC_TB_PTM_SAYMEE.LAST_DATE).getDate())) *
                    sumDateInMonth *
                    100) /
                    PLAN_TB_PTM_SAYMEE.KHO
                )
              ) : (
                ""
              )}
            </td>
            <td
              className={
                parseFloat(
                  ((EXEC_TB_PTM_SAYMEE.DLA /
                    (new Date(
                      selectedDate.getFullYear(),
                      selectedDate.getMonth() + 1,
                      0
                    ) < new Date(EXEC_TB_PTM_SAYMEE.LAST_DATE)
                      ? sumDateInMonth
                      : new Date(EXEC_TB_PTM_SAYMEE.LAST_DATE).getDate())) *
                    sumDateInMonth *
                    100) /
                    PLAN_TB_PTM_SAYMEE.DLA
                ) > 100
                  ? "bg-green"
                  : "bg-red"
              }
            >
              {loadingExec || loadingPlan ? (
                <LoadingComponent />
              ) : EXEC_TB_PTM_SAYMEE.DLA && PLAN_TB_PTM_SAYMEE.KON ? (
                convertToFloat2Fixed(
                  ((EXEC_TB_PTM_SAYMEE.DLA /
                    (new Date(
                      selectedDate.getFullYear(),
                      selectedDate.getMonth() + 1,
                      0
                    ) < new Date(EXEC_TB_PTM_SAYMEE.LAST_DATE)
                      ? sumDateInMonth
                      : new Date(EXEC_TB_PTM_SAYMEE.LAST_DATE).getDate())) *
                    sumDateInMonth *
                    100) /
                    PLAN_TB_PTM_SAYMEE.DLA
                )
              ) : (
                ""
              )}
            </td>
            <td
              className={
                parseFloat(
                  ((EXEC_TB_PTM_SAYMEE.GLA /
                    (new Date(
                      selectedDate.getFullYear(),
                      selectedDate.getMonth() + 1,
                      0
                    ) < new Date(EXEC_TB_PTM_SAYMEE.LAST_DATE)
                      ? sumDateInMonth
                      : new Date(EXEC_TB_PTM_SAYMEE.LAST_DATE).getDate())) *
                    sumDateInMonth *
                    100) /
                    PLAN_TB_PTM_SAYMEE.GLA
                ) > 100
                  ? "bg-green"
                  : "bg-red"
              }
            >
              {loadingExec || loadingPlan ? (
                <LoadingComponent />
              ) : EXEC_TB_PTM_SAYMEE.GLA && PLAN_TB_PTM_SAYMEE.KON ? (
                convertToFloat2Fixed(
                  ((EXEC_TB_PTM_SAYMEE.GLA /
                    (new Date(
                      selectedDate.getFullYear(),
                      selectedDate.getMonth() + 1,
                      0
                    ) < new Date(EXEC_TB_PTM_SAYMEE.LAST_DATE)
                      ? sumDateInMonth
                      : new Date(EXEC_TB_PTM_SAYMEE.LAST_DATE).getDate())) *
                    sumDateInMonth *
                    100) /
                    PLAN_TB_PTM_SAYMEE.GLA
                )
              ) : (
                ""
              )}
            </td>
            <td
              className={
                parseFloat(
                  ((EXEC_TB_PTM_SAYMEE.PYE /
                    (new Date(
                      selectedDate.getFullYear(),
                      selectedDate.getMonth() + 1,
                      0
                    ) < new Date(EXEC_TB_PTM_SAYMEE.LAST_DATE)
                      ? sumDateInMonth
                      : new Date(EXEC_TB_PTM_SAYMEE.LAST_DATE).getDate())) *
                    sumDateInMonth *
                    100) /
                    PLAN_TB_PTM_SAYMEE.PYE
                ) > 100
                  ? "bg-green"
                  : "bg-red"
              }
            >
              {loadingExec || loadingPlan ? (
                <LoadingComponent />
              ) : EXEC_TB_PTM_SAYMEE.PYE && PLAN_TB_PTM_SAYMEE.KON ? (
                convertToFloat2Fixed(
                  ((EXEC_TB_PTM_SAYMEE.PYE /
                    (new Date(
                      selectedDate.getFullYear(),
                      selectedDate.getMonth() + 1,
                      0
                    ) < new Date(EXEC_TB_PTM_SAYMEE.LAST_DATE)
                      ? sumDateInMonth
                      : new Date(EXEC_TB_PTM_SAYMEE.LAST_DATE).getDate())) *
                    sumDateInMonth *
                    100) /
                    PLAN_TB_PTM_SAYMEE.PYE
                )
              ) : (
                ""
              )}
            </td>
            <td
              className={
                parseFloat(
                  ((EXEC_TB_PTM_SAYMEE.DNO /
                    (new Date(
                      selectedDate.getFullYear(),
                      selectedDate.getMonth() + 1,
                      0
                    ) < new Date(EXEC_TB_PTM_SAYMEE.LAST_DATE)
                      ? sumDateInMonth
                      : new Date(EXEC_TB_PTM_SAYMEE.LAST_DATE).getDate())) *
                    sumDateInMonth *
                    100) /
                    PLAN_TB_PTM_SAYMEE.DNO
                ) > 100
                  ? "bg-green"
                  : "bg-red"
              }
            >
              {loadingExec || loadingPlan ? (
                <LoadingComponent />
              ) : EXEC_TB_PTM_SAYMEE.DNO && PLAN_TB_PTM_SAYMEE.KON ? (
                convertToFloat2Fixed(
                  ((EXEC_TB_PTM_SAYMEE.DNO /
                    (new Date(
                      selectedDate.getFullYear(),
                      selectedDate.getMonth() + 1,
                      0
                    ) < new Date(EXEC_TB_PTM_SAYMEE.LAST_DATE)
                      ? sumDateInMonth
                      : new Date(EXEC_TB_PTM_SAYMEE.LAST_DATE).getDate())) *
                    sumDateInMonth *
                    100) /
                    PLAN_TB_PTM_SAYMEE.DNO
                )
              ) : (
                ""
              )}
            </td>
            <td
              className={
                parseFloat(
                  ((EXEC_TB_PTM_SAYMEE.KON /
                    (new Date(
                      selectedDate.getFullYear(),
                      selectedDate.getMonth() + 1,
                      0
                    ) < new Date(EXEC_TB_PTM_SAYMEE.LAST_DATE)
                      ? sumDateInMonth
                      : new Date(EXEC_TB_PTM_SAYMEE.LAST_DATE).getDate())) *
                    sumDateInMonth *
                    100) /
                    PLAN_TB_PTM_SAYMEE.KON
                ) > 100
                  ? "bg-green"
                  : "bg-red"
              }
            >
              {loadingExec || loadingPlan ? (
                <LoadingComponent />
              ) : EXEC_TB_PTM_SAYMEE.KON && PLAN_TB_PTM_SAYMEE.KON ? (
                convertToFloat2Fixed(
                  ((EXEC_TB_PTM_SAYMEE.KON /
                    (new Date(
                      selectedDate.getFullYear(),
                      selectedDate.getMonth() + 1,
                      0
                    ) < new Date(EXEC_TB_PTM_SAYMEE.LAST_DATE)
                      ? sumDateInMonth
                      : new Date(EXEC_TB_PTM_SAYMEE.LAST_DATE).getDate())) *
                    sumDateInMonth *
                    100) /
                    PLAN_TB_PTM_SAYMEE.KON
                )
              ) : (
                ""
              )}
            </td>
            <td
              className={
                parseFloat(
                  ((EXEC_TB_PTM_SAYMEE.CTY7 /
                    (new Date(
                      selectedDate.getFullYear(),
                      selectedDate.getMonth() + 1,
                      0
                    ) < new Date(EXEC_TB_PTM_SAYMEE.LAST_DATE)
                      ? sumDateInMonth
                      : new Date(EXEC_TB_PTM_SAYMEE.LAST_DATE).getDate())) *
                    sumDateInMonth *
                    100) /
                    PLAN_TB_PTM_SAYMEE.CTY7
                ) > 100
                  ? "bg-green"
                  : "bg-red"
              }
            >
              {loadingExec || loadingPlan ? (
                <LoadingComponent />
              ) : EXEC_TB_PTM_SAYMEE.CTY7 && PLAN_TB_PTM_SAYMEE.KON ? (
                convertToFloat2Fixed(
                  ((EXEC_TB_PTM_SAYMEE.CTY7 /
                    (new Date(
                      selectedDate.getFullYear(),
                      selectedDate.getMonth() + 1,
                      0
                    ) < new Date(EXEC_TB_PTM_SAYMEE.LAST_DATE)
                      ? sumDateInMonth
                      : new Date(EXEC_TB_PTM_SAYMEE.LAST_DATE).getDate())) *
                    sumDateInMonth *
                    100) /
                    PLAN_TB_PTM_SAYMEE.CTY7
                )
              ) : (
                ""
              )}
            </td>
          </tr>
          <tr>
            <td rowSpan={4} className="text-sub2">
              9
            </td>
            <td rowSpan={4} className="text-sub2 cell-kpi">
              TB PTM MobiFiber
            </td>
            <td rowSpan={4} className="kpi-dvt">
              thuê bao
            </td>
            <td className="text-sub4 kpi-kht">KHT</td>
            <td className="cell-number">
              {loadingPlan ? (
                <LoadingComponent />
              ) : PLAN_TB_PTM_FIBER.KHO ? (
                convertToFloat2Fixed(PLAN_TB_PTM_FIBER.KHO)
              ) : (
                ""
              )}
            </td>
            <td className="cell-number">
              {loadingPlan ? (
                <LoadingComponent />
              ) : PLAN_TB_PTM_FIBER.DLA ? (
                convertToFloat2Fixed(PLAN_TB_PTM_FIBER.DLA)
              ) : (
                ""
              )}
            </td>
            <td className="cell-number">
              {loadingPlan ? (
                <LoadingComponent />
              ) : PLAN_TB_PTM_FIBER.GLA ? (
                convertToFloat2Fixed(PLAN_TB_PTM_FIBER.GLA)
              ) : (
                ""
              )}
            </td>
            <td className="cell-number">
              {loadingPlan ? (
                <LoadingComponent />
              ) : PLAN_TB_PTM_FIBER.PYE ? (
                convertToFloat2Fixed(PLAN_TB_PTM_FIBER.PYE)
              ) : (
                ""
              )}
            </td>
            <td className="cell-number">
              {loadingPlan ? (
                <LoadingComponent />
              ) : PLAN_TB_PTM_FIBER.DNO ? (
                convertToFloat2Fixed(PLAN_TB_PTM_FIBER.DNO)
              ) : (
                ""
              )}
            </td>
            <td className="cell-number">
              {loadingPlan ? (
                <LoadingComponent />
              ) : PLAN_TB_PTM_FIBER.KON ? (
                convertToFloat2Fixed(PLAN_TB_PTM_FIBER.KON)
              ) : (
                ""
              )}
            </td>
            <td className="cell-number">
              {loadingPlan ? (
                <LoadingComponent />
              ) : PLAN_TB_PTM_FIBER.CTY7 ? (
                convertToFloat2Fixed(PLAN_TB_PTM_FIBER.CTY7)
              ) : (
                ""
              )}
            </td>
            <td rowSpan={4} className="cell-donviphutrach">
              DVVT
              <br />
              <span>
                {EXEC_TB_PTM_FIBER.LAST_DATE
                  ? getFormattedDate(new Date(EXEC_TB_PTM_FIBER.LAST_DATE))
                  : ""}
              </span>
            </td>
          </tr>
          <tr>
            <td className="text-sub4 kpi-thlk">THLK</td>
            <td className="cell-number">
              {loadingExec ? (
                <LoadingComponent />
              ) : EXEC_TB_PTM_FIBER.KHO != null ||EXEC_TB_PTM_FIBER.KHO != undefined  ? (
                convertToFloat2Fixed(EXEC_TB_PTM_FIBER.KHO)
              ) : (
                ""
              )}
            </td>
            <td className="cell-number">
              {loadingExec ? (
                <LoadingComponent />
              ) :  EXEC_TB_PTM_FIBER.DLA != null ||EXEC_TB_PTM_FIBER.DLA != undefined  ? (
                convertToFloat2Fixed(EXEC_TB_PTM_FIBER.DLA)
              ) : (
                ""
              )}
            </td>
            <td className="cell-number">
              {loadingExec ? (
                <LoadingComponent />
              ) :  EXEC_TB_PTM_FIBER.GLA != null ||EXEC_TB_PTM_FIBER.GLA != undefined ? (
                convertToFloat2Fixed(EXEC_TB_PTM_FIBER.GLA)
              ) : (
                ""
              )}
            </td>
            <td className="cell-number">
              {loadingExec ? (
                <LoadingComponent />
              ) : EXEC_TB_PTM_FIBER.PYE != null ||EXEC_TB_PTM_FIBER.PYE != undefined ? (
                convertToFloat2Fixed(EXEC_TB_PTM_FIBER.PYE)
              ) : (
                ""
              )}
            </td>
            <td className="cell-number">
              {loadingExec ? (
                <LoadingComponent />
              ) :  EXEC_TB_PTM_FIBER.DNO != null ||EXEC_TB_PTM_FIBER.DNO != undefined ? (
                convertToFloat2Fixed(EXEC_TB_PTM_FIBER.DNO)
              ) : (
                ""
              )}
            </td>
            <td className="cell-number">
              {loadingExec ? (
                <LoadingComponent />
              ) :  EXEC_TB_PTM_FIBER.KON != null ||EXEC_TB_PTM_FIBER.KON != undefined ? (
                convertToFloat2Fixed(EXEC_TB_PTM_FIBER.KON)
              ) : (
                ""
              )}
            </td>
            <td className="cell-number">
              {loadingExec ? (
                <LoadingComponent />
              ) :  EXEC_TB_PTM_FIBER.CTY7 != null ||EXEC_TB_PTM_FIBER.CTY7 != undefined ? (
                convertToFloat2Fixed(EXEC_TB_PTM_FIBER.CTY7)
              ) : (
                ""
              )}
            </td>
          </tr>
          <tr>
            <td className="text-sub4 kpi-percent-lk">%HTKH </td>
            <td className="cell-number">
              {loadingExec || loadingPlan ? (
                <LoadingComponent />
              ) : PLAN_TB_PTM_FIBER.KHO && EXEC_TB_PTM_FIBER.KHO ? (
                convertToFloat2Fixed(
                  (EXEC_TB_PTM_FIBER.KHO * 100) / PLAN_TB_PTM_FIBER.KHO
                )
              ) : (
                "0"
              )}
            </td>
            <td className="cell-number">
              {loadingExec || loadingPlan ? (
                <LoadingComponent />
              ) : PLAN_TB_PTM_FIBER.DLA && EXEC_TB_PTM_FIBER.DLA ? (
                convertToFloat2Fixed(
                  (EXEC_TB_PTM_FIBER.DLA * 100) / PLAN_TB_PTM_FIBER.DLA
                )
              ) : (
                "0"
              )}
            </td>

            <td className="cell-number">
              {loadingExec || loadingPlan ? (
                <LoadingComponent />
              ) : PLAN_TB_PTM_FIBER.GLA && EXEC_TB_PTM_FIBER.GLA ? (
                convertToFloat2Fixed(
                  (EXEC_TB_PTM_FIBER.GLA * 100) / PLAN_TB_PTM_FIBER.GLA
                )
              ) : (
                "0"
              )}
            </td>
            <td className="cell-number">
              {loadingExec || loadingPlan ? (
                <LoadingComponent />
              ) : PLAN_TB_PTM_FIBER.PYE && EXEC_TB_PTM_FIBER.PYE ? (
                convertToFloat2Fixed(
                  (EXEC_TB_PTM_FIBER.PYE * 100) / PLAN_TB_PTM_FIBER.PYE
                )
              ) : (
                "0"
              )}
            </td>
            <td className="cell-number">
              {loadingExec || loadingPlan ? (
                <LoadingComponent />
              ) : PLAN_TB_PTM_FIBER.DNO && EXEC_TB_PTM_FIBER.DNO ? (
                convertToFloat2Fixed(
                  (EXEC_TB_PTM_FIBER.DNO * 100) / PLAN_TB_PTM_FIBER.DNO
                )
              ) : (
                "0"
              )}
            </td>
            <td className="cell-number">
              {loadingExec || loadingPlan ? (
                <LoadingComponent />
              ) : PLAN_TB_PTM_FIBER.KON && EXEC_TB_PTM_FIBER.KON ? (
                convertToFloat2Fixed(
                  (EXEC_TB_PTM_FIBER.KON * 100) / PLAN_TB_PTM_FIBER.KON
                )
              ) : (
                "0"
              )}
            </td>
            <td className="cell-number">
              {loadingExec || loadingPlan ? (
                <LoadingComponent />
              ) : PLAN_TB_PTM_FIBER.DLA && EXEC_TB_PTM_FIBER.DLA ? (
                convertToFloat2Fixed(
                  (EXEC_TB_PTM_FIBER.DLA * 100) / PLAN_TB_PTM_FIBER.DLA
                )
              ) : (
                "0"
              )}
            </td>
          </tr>
          <tr>
            <td className="text-sub4 kpi-percent-th">Ước %HTKH</td>
            <td
              className={
                parseFloat(
                  ((EXEC_TB_PTM_FIBER.KHO /
                    (new Date(
                      selectedDate.getFullYear(),
                      selectedDate.getMonth() + 1,
                      0
                    ) < new Date(EXEC_TB_PTM_FIBER.LAST_DATE)
                      ? sumDateInMonth
                      : new Date(EXEC_TB_PTM_FIBER.LAST_DATE).getDate())) *
                    sumDateInMonth *
                    100) /
                    PLAN_TB_PTM_FIBER.KHO
                ) > 100
                  ? "bg-green"
                  : "bg-red"
              }
            >
              {loadingExec || loadingPlan ? (
                <LoadingComponent />
              ) : EXEC_TB_PTM_FIBER.KHO && PLAN_TB_PTM_FIBER.KHO ? (
                convertToFloat2Fixed(
                  ((EXEC_TB_PTM_FIBER.KHO /
                    (new Date(
                      selectedDate.getFullYear(),
                      selectedDate.getMonth() + 1,
                      0
                    ) < new Date(EXEC_TB_PTM_FIBER.LAST_DATE)
                      ? sumDateInMonth
                      : new Date(EXEC_TB_PTM_FIBER.LAST_DATE).getDate())) *
                    sumDateInMonth *
                    100) /
                    PLAN_TB_PTM_FIBER.KHO
                )
              ) : (
                ""
              )}
            </td>
            <td
              className={
                parseFloat(
                  ((EXEC_TB_PTM_FIBER.DLA /
                    (new Date(
                      selectedDate.getFullYear(),
                      selectedDate.getMonth() + 1,
                      0
                    ) < new Date(EXEC_TB_PTM_FIBER.LAST_DATE)
                      ? sumDateInMonth
                      : new Date(EXEC_TB_PTM_FIBER.LAST_DATE).getDate())) *
                    sumDateInMonth *
                    100) /
                    PLAN_TB_PTM_FIBER.DLA
                ) > 100
                  ? "bg-green"
                  : "bg-red"
              }
            >
              {loadingExec || loadingPlan ? (
                <LoadingComponent />
              ) : EXEC_TB_PTM_FIBER.DLA && PLAN_TB_PTM_FIBER.DLA ? (
                convertToFloat2Fixed(
                  ((EXEC_TB_PTM_FIBER.DLA /
                    (new Date(
                      selectedDate.getFullYear(),
                      selectedDate.getMonth() + 1,
                      0
                    ) < new Date(EXEC_TB_PTM_FIBER.LAST_DATE)
                      ? sumDateInMonth
                      : new Date(EXEC_TB_PTM_FIBER.LAST_DATE).getDate())) *
                    sumDateInMonth *
                    100) /
                    PLAN_TB_PTM_FIBER.DLA
                )
              ) : (
                "0"
              )}
            </td>
            <td
              className={
                parseFloat(
                  ((EXEC_TB_PTM_FIBER.GLA /
                    (new Date(
                      selectedDate.getFullYear(),
                      selectedDate.getMonth() + 1,
                      0
                    ) < new Date(EXEC_TB_PTM_FIBER.LAST_DATE)
                      ? sumDateInMonth
                      : new Date(EXEC_TB_PTM_FIBER.LAST_DATE).getDate())) *
                    sumDateInMonth *
                    100) /
                    PLAN_TB_PTM_FIBER.GLA
                ) > 100
                  ? "bg-green"
                  : "bg-red"
              }
            >
              {loadingExec || loadingPlan ? (
                <LoadingComponent />
              ) : EXEC_TB_PTM_FIBER.GLA && PLAN_TB_PTM_FIBER.GLA ? (
                convertToFloat2Fixed(
                  ((EXEC_TB_PTM_FIBER.GLA /
                    (new Date(
                      selectedDate.getFullYear(),
                      selectedDate.getMonth() + 1,
                      0
                    ) < new Date(EXEC_TB_PTM_FIBER.LAST_DATE)
                      ? sumDateInMonth
                      : new Date(EXEC_TB_PTM_FIBER.LAST_DATE).getDate())) *
                    sumDateInMonth *
                    100) /
                    PLAN_TB_PTM_FIBER.GLA
                )
              ) : (
                "0"
              )}
            </td>

            <td
              className={
                parseFloat(
                  ((EXEC_TB_PTM_FIBER.PYE /
                    (new Date(
                      selectedDate.getFullYear(),
                      selectedDate.getMonth() + 1,
                      0
                    ) < new Date(EXEC_TB_PTM_FIBER.LAST_DATE)
                      ? sumDateInMonth
                      : new Date(EXEC_TB_PTM_FIBER.LAST_DATE).getDate())) *
                    sumDateInMonth *
                    100) /
                    PLAN_TB_PTM_FIBER.PYE
                ) > 100
                  ? "bg-green"
                  : "bg-red"
              }
            >
              {loadingExec || loadingPlan ? (
                <LoadingComponent />
              ) : EXEC_TB_PTM_FIBER.PYE && PLAN_TB_PTM_FIBER.PYE ? (
                convertToFloat2Fixed(
                  ((EXEC_TB_PTM_FIBER.PYE /
                    (new Date(
                      selectedDate.getFullYear(),
                      selectedDate.getMonth() + 1,
                      0
                    ) < new Date(EXEC_TB_PTM_FIBER.LAST_DATE)
                      ? sumDateInMonth
                      : new Date(EXEC_TB_PTM_FIBER.LAST_DATE).getDate())) *
                    sumDateInMonth *
                    100) /
                    PLAN_TB_PTM_FIBER.PYE
                )
              ) : (
                "0"
              )}
            </td>
            <td
              className={
                parseFloat(
                  ((EXEC_TB_PTM_FIBER.DNO /
                    (new Date(
                      selectedDate.getFullYear(),
                      selectedDate.getMonth() + 1,
                      0
                    ) < new Date(EXEC_TB_PTM_FIBER.LAST_DATE)
                      ? sumDateInMonth
                      : new Date(EXEC_TB_PTM_FIBER.LAST_DATE).getDate())) *
                    sumDateInMonth *
                    100) /
                    PLAN_TB_PTM_FIBER.DNO
                ) > 100
                  ? "bg-green"
                  : "bg-red"
              }
            >
              {loadingExec || loadingPlan ? (
                <LoadingComponent />
              ) : EXEC_TB_PTM_FIBER.DNO && PLAN_TB_PTM_FIBER.DNO ? (
                convertToFloat2Fixed(
                  ((EXEC_TB_PTM_FIBER.DNO /
                    (new Date(
                      selectedDate.getFullYear(),
                      selectedDate.getMonth() + 1,
                      0
                    ) < new Date(EXEC_TB_PTM_FIBER.LAST_DATE)
                      ? sumDateInMonth
                      : new Date(EXEC_TB_PTM_FIBER.LAST_DATE).getDate())) *
                    sumDateInMonth *
                    100) /
                    PLAN_TB_PTM_FIBER.DNO
                )
              ) : (
                "0"
              )}
            </td>
            <td
              className={
                parseFloat(
                  ((EXEC_TB_PTM_FIBER.KON /
                    (new Date(
                      selectedDate.getFullYear(),
                      selectedDate.getMonth() + 1,
                      0
                    ) < new Date(EXEC_TB_PTM_FIBER.LAST_DATE)
                      ? sumDateInMonth
                      : new Date(EXEC_TB_PTM_FIBER.LAST_DATE).getDate())) *
                    sumDateInMonth *
                    100) /
                    PLAN_TB_PTM_FIBER.KON
                ) > 100
                  ? "bg-green"
                  : "bg-red"
              }
            >
              {loadingExec || loadingPlan ? (
                <LoadingComponent />
              ) : EXEC_TB_PTM_FIBER.KON && PLAN_TB_PTM_FIBER.KON ? (
                convertToFloat2Fixed(
                  ((EXEC_TB_PTM_FIBER.KON /
                    (new Date(
                      selectedDate.getFullYear(),
                      selectedDate.getMonth() + 1,
                      0
                    ) < new Date(EXEC_TB_PTM_FIBER.LAST_DATE)
                      ? sumDateInMonth
                      : new Date(EXEC_TB_PTM_FIBER.LAST_DATE).getDate())) *
                    sumDateInMonth *
                    100) /
                    PLAN_TB_PTM_FIBER.KON
                )
              ) : (
                "0"
              )}
            </td>
            <td
              className={
                parseFloat(
                  ((EXEC_TB_PTM_FIBER.CTY7 /
                    (new Date(
                      selectedDate.getFullYear(),
                      selectedDate.getMonth() + 1,
                      0
                    ) < new Date(EXEC_TB_PTM_FIBER.LAST_DATE)
                      ? sumDateInMonth
                      : new Date(EXEC_TB_PTM_FIBER.LAST_DATE).getDate())) *
                    sumDateInMonth *
                    100) /
                    PLAN_TB_PTM_FIBER.CTY7
                ) > 100
                  ? "bg-green"
                  : "bg-red"
              }
            >
              {loadingExec || loadingPlan ? (
                <LoadingComponent />
              ) : EXEC_TB_PTM_FIBER.CTY7 && PLAN_TB_PTM_FIBER.CTY7 ? (
                convertToFloat2Fixed(
                  ((EXEC_TB_PTM_FIBER.CTY7 /
                    (new Date(
                      selectedDate.getFullYear(),
                      selectedDate.getMonth() + 1,
                      0
                    ) < new Date(EXEC_TB_PTM_FIBER.LAST_DATE)
                      ? sumDateInMonth
                      : new Date(EXEC_TB_PTM_FIBER.LAST_DATE).getDate())) *
                    sumDateInMonth *
                    100) /
                    PLAN_TB_PTM_FIBER.CTY7
                )
              ) : (
                "0"
              )}
            </td>
          </tr>
          <tr>
            <td rowSpan={4} className="text-sub2">
              10
            </td>
            <td rowSpan={4} className="text-sub2 cell-kpi">
              TB VLR (MobiFone + Saymee)
            </td>
            <td rowSpan={4} className="kpi-dvt">
              thuê bao
            </td>
            <td className="text-sub4 kpi-kht">KHT</td>
            <td className="cell-number">
              {loadingPlan ? (
                <LoadingComponent />
              ) : PLAN_TB_VLR.KHO ? (
                convertToFloat2Fixed(PLAN_TB_VLR.KHO)
              ) : (
                ""
              )}
            </td>
            <td className="cell-number">
              {loadingPlan ? (
                <LoadingComponent />
              ) : PLAN_TB_VLR.DLA ? (
                convertToFloat2Fixed(PLAN_TB_VLR.DLA)
              ) : (
                ""
              )}
            </td>
            <td className="cell-number">
              {loadingPlan ? (
                <LoadingComponent />
              ) : PLAN_TB_VLR.GLA ? (
                convertToFloat2Fixed(PLAN_TB_VLR.GLA)
              ) : (
                ""
              )}
            </td>
            <td className="cell-number">
              {loadingPlan ? (
                <LoadingComponent />
              ) : PLAN_TB_VLR.PYE ? (
                convertToFloat2Fixed(PLAN_TB_VLR.PYE)
              ) : (
                ""
              )}
            </td>
            <td className="cell-number">
              {loadingPlan ? (
                <LoadingComponent />
              ) : PLAN_TB_VLR.DNO ? (
                convertToFloat2Fixed(PLAN_TB_VLR.DNO)
              ) : (
                ""
              )}
            </td>
            <td className="cell-number">
              {loadingPlan ? (
                <LoadingComponent />
              ) : PLAN_TB_VLR.KON ? (
                convertToFloat2Fixed(PLAN_TB_VLR.KON)
              ) : (
                ""
              )}
            </td>
            <td className="cell-number">
              {loadingPlan ? (
                <LoadingComponent />
              ) : PLAN_TB_VLR.CTY7 ? (
                convertToFloat2Fixed(PLAN_TB_VLR.CTY7)
              ) : (
                ""
              )}
            </td>
            <td rowSpan={4} className="cell-donviphutrach">
              DVVT
              <br />
              <span>
                {EXEC_TB_VLR.LAST_DATE
                  ? getFormattedDate(new Date(EXEC_TB_VLR.LAST_DATE))
                  : ""}
              </span>
            </td>
          </tr>
          <tr>
            <td className="text-sub4 kpi-thlk">THLK</td>
            <td className="cell-number">
              {loadingPlan ? (
                <LoadingComponent />
              ) : EXEC_TB_VLR.KHO ? (
                convertToFloat2Fixed(EXEC_TB_VLR.KHO)
              ) : (
                ""
              )}
            </td>
            <td className="cell-number">
              {loadingPlan ? (
                <LoadingComponent />
              ) : EXEC_TB_VLR.DLA ? (
                convertToFloat2Fixed(EXEC_TB_VLR.DLA)
              ) : (
                ""
              )}
            </td>
            <td className="cell-number">
              {loadingPlan ? (
                <LoadingComponent />
              ) : EXEC_TB_VLR.GLA ? (
                convertToFloat2Fixed(EXEC_TB_VLR.GLA)
              ) : (
                ""
              )}
            </td>
            <td className="cell-number">
              {loadingPlan ? (
                <LoadingComponent />
              ) : EXEC_TB_VLR.PYE ? (
                convertToFloat2Fixed(EXEC_TB_VLR.PYE)
              ) : (
                ""
              )}
            </td>
            <td className="cell-number">
              {loadingPlan ? (
                <LoadingComponent />
              ) : EXEC_TB_VLR.DNO ? (
                convertToFloat2Fixed(EXEC_TB_VLR.DNO)
              ) : (
                ""
              )}
            </td>
            <td className="cell-number">
              {loadingPlan ? (
                <LoadingComponent />
              ) : EXEC_TB_VLR.KON ? (
                convertToFloat2Fixed(EXEC_TB_VLR.KON)
              ) : (
                ""
              )}
            </td>
            <td className="cell-number">
              {loadingPlan ? (
                <LoadingComponent />
              ) : EXEC_TB_VLR.CTY7 ? (
                convertToFloat2Fixed(EXEC_TB_VLR.CTY7)
              ) : (
                ""
              )}
            </td>
          </tr>
          <tr>
            <td className="text-sub4 kpi-percent-lk">%HTKH </td>
            <td className="cell-number">
              {loadingExec || loadingPlan ? (
                <LoadingComponent />
              ) : EXEC_TB_VLR.KHO && PLAN_TB_VLR.KHO ? (
                convertToFloat2Fixed((EXEC_TB_VLR.KHO * 100) / PLAN_TB_VLR.KHO)
              ) : (
                ""
              )}
            </td>
            <td className="cell-number">
              {loadingExec || loadingPlan ? (
                <LoadingComponent />
              ) : EXEC_TB_VLR.DLA && PLAN_TB_VLR.DLA ? (
                convertToFloat2Fixed((EXEC_TB_VLR.DLA * 100) / PLAN_TB_VLR.DLA)
              ) : (
                ""
              )}
            </td>
            <td className="cell-number">
              {loadingExec || loadingPlan ? (
                <LoadingComponent />
              ) : EXEC_TB_VLR.GLA && PLAN_TB_VLR.GLA ? (
                convertToFloat2Fixed((EXEC_TB_VLR.GLA * 100) / PLAN_TB_VLR.GLA)
              ) : (
                ""
              )}
            </td>
            <td className="cell-number">
              {loadingExec || loadingPlan ? (
                <LoadingComponent />
              ) : EXEC_TB_VLR.PYE && PLAN_TB_VLR.PYE ? (
                convertToFloat2Fixed((EXEC_TB_VLR.PYE * 100) / PLAN_TB_VLR.PYE)
              ) : (
                ""
              )}
            </td>
            <td className="cell-number">
              {loadingExec || loadingPlan ? (
                <LoadingComponent />
              ) : EXEC_TB_VLR.DNO && PLAN_TB_VLR.DNO ? (
                convertToFloat2Fixed((EXEC_TB_VLR.DNO * 100) / PLAN_TB_VLR.DNO)
              ) : (
                ""
              )}
            </td>
            <td className="cell-number">
              {loadingExec || loadingPlan ? (
                <LoadingComponent />
              ) : EXEC_TB_VLR.KON && PLAN_TB_VLR.KON ? (
                convertToFloat2Fixed((EXEC_TB_VLR.KON * 100) / PLAN_TB_VLR.KON)
              ) : (
                ""
              )}
            </td>
            <td className="cell-number">
              {loadingExec || loadingPlan ? (
                <LoadingComponent />
              ) : EXEC_TB_VLR.CTY7 && PLAN_TB_VLR.CTY7 ? (
                convertToFloat2Fixed(
                  (EXEC_TB_VLR.CTY7 * 100) / PLAN_TB_VLR.CTY7
                )
              ) : (
                ""
              )}
            </td>
          </tr>
          <tr>
            <td className="text-sub4 kpi-percent-th">Ước %HTKH</td>
            <td
              className={
                parseFloat((EXEC_TB_VLR.KHO * 100) / PLAN_TB_VLR.KHO) > 100
                  ? "bg-green"
                  : "bg-red"
              }
            >
              {loadingExec || loadingPlan ? (
                <LoadingComponent />
              ) : EXEC_TB_VLR.KHO && PLAN_TB_VLR.KHO ? (
                convertToFloat2Fixed((EXEC_TB_VLR.KHO * 100) / PLAN_TB_VLR.KHO)
              ) : (
                ""
              )}
            </td>
            <td
              className={
                parseFloat((EXEC_TB_VLR.DLA * 100) / PLAN_TB_VLR.DLA) > 100
                  ? "bg-green"
                  : "bg-red"
              }
            >
              {loadingExec || loadingPlan ? (
                <LoadingComponent />
              ) : EXEC_TB_VLR.DLA && PLAN_TB_VLR.DLA ? (
                convertToFloat2Fixed((EXEC_TB_VLR.DLA * 100) / PLAN_TB_VLR.DLA)
              ) : (
                ""
              )}
            </td>
            <td
              className={
                parseFloat((EXEC_TB_VLR.GLA * 100) / PLAN_TB_VLR.GLA) > 100
                  ? "bg-green"
                  : "bg-red"
              }
            >
              {loadingExec || loadingPlan ? (
                <LoadingComponent />
              ) : EXEC_TB_VLR.GLA && PLAN_TB_VLR.GLA ? (
                convertToFloat2Fixed((EXEC_TB_VLR.GLA * 100) / PLAN_TB_VLR.GLA)
              ) : (
                ""
              )}
            </td>
            <td
              className={
                parseFloat((EXEC_TB_VLR.PYE * 100) / PLAN_TB_VLR.PYE) > 100
                  ? "bg-green"
                  : "bg-red"
              }
            >
              {loadingExec || loadingPlan ? (
                <LoadingComponent />
              ) : EXEC_TB_VLR.PYE && PLAN_TB_VLR.PYE ? (
                convertToFloat2Fixed((EXEC_TB_VLR.PYE * 100) / PLAN_TB_VLR.PYE)
              ) : (
                ""
              )}
            </td>
            <td
              className={
                parseFloat((EXEC_TB_VLR.DNO * 100) / PLAN_TB_VLR.DNO) > 100
                  ? "bg-green"
                  : "bg-red"
              }
            >
              {loadingExec || loadingPlan ? (
                <LoadingComponent />
              ) : EXEC_TB_VLR.DNO && PLAN_TB_VLR.DNO ? (
                convertToFloat2Fixed((EXEC_TB_VLR.DNO * 100) / PLAN_TB_VLR.DNO)
              ) : (
                ""
              )}
            </td>
            <td
              className={
                parseFloat((EXEC_TB_VLR.KON * 100) / PLAN_TB_VLR.KON) > 100
                  ? "bg-green"
                  : "bg-red"
              }
            >
              {loadingExec || loadingPlan ? (
                <LoadingComponent />
              ) : EXEC_TB_VLR.KON && PLAN_TB_VLR.KON ? (
                convertToFloat2Fixed((EXEC_TB_VLR.KON * 100) / PLAN_TB_VLR.KON)
              ) : (
                ""
              )}
            </td>
            <td
              className={
                parseFloat((EXEC_TB_VLR.CTY7 * 100) / PLAN_TB_VLR.CTY7) > 100
                  ? "bg-green"
                  : "bg-red"
              }
            >
              {loadingExec || loadingPlan ? (
                <LoadingComponent />
              ) : EXEC_TB_VLR.CTY7 && PLAN_TB_VLR.CTY7 ? (
                convertToFloat2Fixed(
                  (EXEC_TB_VLR.CTY7 * 100) / PLAN_TB_VLR.CTY7
                )
              ) : (
                ""
              )}
            </td>
          </tr>
          {/* <tr>
              <td rowSpan={4} className="text-sub2">
                12
              </td>
              <td rowSpan={4} className="text-sub2 cell-kpi">
                TB PSC (MobiFone + Saymee)
              </td>
              <td rowSpan={4} className="kpi-dvt">
                thuê bao
              </td>
              <td className="text-sub4 kpi-kht">KHT</td>
              <td className="cell-number">
                {loadingPlan ? (
                  <LoadingComponent />
                ) : PLAN_TB_PSC.KHO ? (
                  convertToFloat2Fixed(PLAN_TB_PSC.KHO)
                ) : (
                  ""
                )}
              </td>
              <td className="cell-number">
                {loadingPlan ? (
                  <LoadingComponent />
                ) : PLAN_TB_PSC.DLA ? (
                  convertToFloat2Fixed(PLAN_TB_PSC.DLA)
                ) : (
                  ""
                )}
              </td>
              <td className="cell-number">
                {loadingPlan ? (
                  <LoadingComponent />
                ) : PLAN_TB_PSC.GLA ? (
                  convertToFloat2Fixed(PLAN_TB_PSC.GLA)
                ) : (
                  ""
                )}
              </td>
              <td className="cell-number">
                {loadingPlan ? (
                  <LoadingComponent />
                ) : PLAN_TB_PSC.PYE ? (
                  convertToFloat2Fixed(PLAN_TB_PSC.PYE)
                ) : (
                  ""
                )}
              </td>
              <td className="cell-number">
                {loadingPlan ? (
                  <LoadingComponent />
                ) : PLAN_TB_PSC.DNO ? (
                  convertToFloat2Fixed(PLAN_TB_PSC.DNO)
                ) : (
                  ""
                )}
              </td>
              <td className="cell-number">
                {loadingPlan ? (
                  <LoadingComponent />
                ) : PLAN_TB_PSC.KON ? (
                  convertToFloat2Fixed(PLAN_TB_PSC.KON)
                ) : (
                  ""
                )}
              </td>
              <td className="cell-number">
                {loadingPlan ? (
                  <LoadingComponent />
                ) : PLAN_TB_PSC.CTY7 ? (
                  convertToFloat2Fixed(PLAN_TB_PSC.CTY7)
                ) : (
                  ""
                )}
              </td>
              <td rowSpan={4} className="cell-donviphutrach">
                DVVT
                <br />
                <span>
                  {EXEC_TB_PSC.LAST_DATE
                    ? getFormattedDate(new Date(EXEC_TB_PSC.LAST_DATE))
                    : ""}
                </span>
              </td>
            </tr>
            <tr>
              <td className="text-sub4 kpi-thlk">THLK</td>
              <td className="cell-number">
                {loadingExec ? (
                  <LoadingComponent />
                ) : EXEC_TB_PSC.KHO ? (
                  convertToFloat2Fixed(EXEC_TB_PSC.KHO)
                ) : (
                  ""
                )}
              </td>
              <td className="cell-number">
                {loadingExec ? (
                  <LoadingComponent />
                ) : EXEC_TB_PSC.DLA ? (
                  convertToFloat2Fixed(EXEC_TB_PSC.DLA)
                ) : (
                  ""
                )}
              </td>
              <td className="cell-number">
                {loadingExec ? (
                  <LoadingComponent />
                ) : EXEC_TB_PSC.GLA ? (
                  convertToFloat2Fixed(EXEC_TB_PSC.GLA)
                ) : (
                  ""
                )}
              </td>
              <td className="cell-number">
                {loadingExec ? (
                  <LoadingComponent />
                ) : EXEC_TB_PSC.PYE ? (
                  convertToFloat2Fixed(EXEC_TB_PSC.PYE)
                ) : (
                  ""
                )}
              </td>
              <td className="cell-number">
                {loadingExec ? (
                  <LoadingComponent />
                ) : EXEC_TB_PSC.DNO ? (
                  convertToFloat2Fixed(EXEC_TB_PSC.DNO)
                ) : (
                  ""
                )}
              </td>
              <td className="cell-number">
                {loadingExec ? (
                  <LoadingComponent />
                ) : EXEC_TB_PSC.KON ? (
                  convertToFloat2Fixed(EXEC_TB_PSC.KON)
                ) : (
                  ""
                )}
              </td>
              <td className="cell-number">
                {loadingExec ? (
                  <LoadingComponent />
                ) : EXEC_TB_PSC.CTY7 ? (
                  convertToFloat2Fixed(EXEC_TB_PSC.CTY7)
                ) : (
                  ""
                )}
              </td>
            </tr>
            <tr>
              <td className="text-sub4 kpi-percent-lk">%HTKH </td>
              <td className="cell-number">
                {loadingExec || loadingPlan ? (
                  <LoadingComponent />
                ) : EXEC_TB_PSC.KHO && PLAN_TB_PSC.KHO ? (
                  convertToFloat2Fixed((EXEC_TB_PSC.KHO * 100) / PLAN_TB_PSC.KHO)
                ) : (
                  ""
                )}
              </td>
              <td className="cell-number">
                {loadingExec || loadingPlan ? (
                  <LoadingComponent />
                ) : EXEC_TB_PSC.DLA && PLAN_TB_PSC.DLA ? (
                  convertToFloat2Fixed((EXEC_TB_PSC.DLA * 100) / PLAN_TB_PSC.DLA)
                ) : (
                  ""
                )}
              </td>
              <td className="cell-number">
                {loadingExec || loadingPlan ? (
                  <LoadingComponent />
                ) : EXEC_TB_PSC.GLA && PLAN_TB_PSC.GLA ? (
                  convertToFloat2Fixed((EXEC_TB_PSC.GLA * 100) / PLAN_TB_PSC.GLA)
                ) : (
                  ""
                )}
              </td>
              <td className="cell-number">
                {loadingExec || loadingPlan ? (
                  <LoadingComponent />
                ) : EXEC_TB_PSC.PYE && PLAN_TB_PSC.PYE ? (
                  convertToFloat2Fixed((EXEC_TB_PSC.PYE * 100) / PLAN_TB_PSC.PYE)
                ) : (
                  ""
                )}
              </td>
              <td className="cell-number">
                {loadingExec || loadingPlan ? (
                  <LoadingComponent />
                ) : EXEC_TB_PSC.DNO && PLAN_TB_PSC.DNO ? (
                  convertToFloat2Fixed((EXEC_TB_PSC.DNO * 100) / PLAN_TB_PSC.DNO)
                ) : (
                  ""
                )}
              </td>
              <td className="cell-number">
                {loadingExec || loadingPlan ? (
                  <LoadingComponent />
                ) : EXEC_TB_PSC.KON && PLAN_TB_PSC.KON ? (
                  convertToFloat2Fixed((EXEC_TB_PSC.KON * 100) / PLAN_TB_PSC.KON)
                ) : (
                  ""
                )}
              </td>
              <td className="cell-number">
                {loadingExec || loadingPlan ? (
                  <LoadingComponent />
                ) : EXEC_TB_PSC.CTY7 && PLAN_TB_PSC.CTY7 ? (
                  convertToFloat2Fixed(
                    (EXEC_TB_PSC.CTY7 * 100) / PLAN_TB_PSC.CTY7
                  )
                ) : (
                  ""
                )}
              </td>
            </tr>
            <tr>
              <td className="text-sub4 kpi-percent-th">Ước %HTKH</td>
              <td
                className={
                  parseFloat((EXEC_TB_PSC.KHO * 100) / PLAN_TB_PSC.KHO) > 100
                    ? "bg-green"
                    : "bg-red"
                }
              >
                {loadingExec || loadingPlan ? (
                  <LoadingComponent />
                ) : EXEC_TB_PSC.KHO && PLAN_TB_PSC.KHO ? (
                  convertToFloat2Fixed((EXEC_TB_PSC.KHO * 100) / PLAN_TB_PSC.KHO)
                ) : (
                  ""
                )}
              </td>
              <td
                className={
                  parseFloat((EXEC_TB_PSC.DLA * 100) / PLAN_TB_PSC.DLA) > 100
                    ? "bg-green"
                    : "bg-red"
                }
              >
                {loadingExec || loadingPlan ? (
                  <LoadingComponent />
                ) : EXEC_TB_PSC.DLA && PLAN_TB_PSC.DLA ? (
                  convertToFloat2Fixed((EXEC_TB_PSC.DLA * 100) / PLAN_TB_PSC.DLA)
                ) : (
                  ""
                )}
              </td>
              <td
                className={
                  parseFloat((EXEC_TB_PSC.GLA * 100) / PLAN_TB_PSC.GLA) > 100
                    ? "bg-green"
                    : "bg-red"
                }
              >
                {loadingExec || loadingPlan ? (
                  <LoadingComponent />
                ) : EXEC_TB_PSC.GLA && PLAN_TB_PSC.GLA ? (
                  convertToFloat2Fixed((EXEC_TB_PSC.GLA * 100) / PLAN_TB_PSC.GLA)
                ) : (
                  ""
                )}
              </td>
              <td
                className={
                  parseFloat((EXEC_TB_PSC.PYE * 100) / PLAN_TB_PSC.PYE) > 100
                    ? "bg-green"
                    : "bg-red"
                }
              >
                {loadingExec || loadingPlan ? (
                  <LoadingComponent />
                ) : EXEC_TB_PSC.PYE && PLAN_TB_PSC.PYE ? (
                  convertToFloat2Fixed((EXEC_TB_PSC.PYE * 100) / PLAN_TB_PSC.PYE)
                ) : (
                  ""
                )}
              </td>
              <td
                className={
                  parseFloat((EXEC_TB_PSC.DNO * 100) / PLAN_TB_PSC.DNO) > 100
                    ? "bg-green"
                    : "bg-red"
                }
              >
                {loadingExec || loadingPlan ? (
                  <LoadingComponent />
                ) : EXEC_TB_PSC.DNO && PLAN_TB_PSC.DNO ? (
                  convertToFloat2Fixed((EXEC_TB_PSC.DNO * 100) / PLAN_TB_PSC.DNO)
                ) : (
                  ""
                )}
              </td>
              <td
                className={
                  parseFloat((EXEC_TB_PSC.KON * 100) / PLAN_TB_PSC.KON) > 100
                    ? "bg-green"
                    : "bg-red"
                }
              >
                {loadingExec || loadingPlan ? (
                  <LoadingComponent />
                ) : EXEC_TB_PSC.KON && PLAN_TB_PSC.KON ? (
                  convertToFloat2Fixed((EXEC_TB_PSC.KON * 100) / PLAN_TB_PSC.KON)
                ) : (
                  ""
                )}
              </td>
              <td
                className={
                  parseFloat((EXEC_TB_PSC.CTY7 * 100) / PLAN_TB_PSC.CTY7) > 100
                    ? "bg-green"
                    : "bg-red"
                }
              >
                {loadingExec || loadingPlan ? (
                  <LoadingComponent />
                ) : EXEC_TB_PSC.CTY7 && PLAN_TB_PSC.CTY7 ? (
                  convertToFloat2Fixed(
                    (EXEC_TB_PSC.CTY7 * 100) / PLAN_TB_PSC.CTY7
                  )
                ) : (
                  ""
                )}
              </td>
            </tr> */}
          <tr>
            <td rowSpan={4} className="text-sub2">
              11
            </td>
            <td rowSpan={4} className="text-sub2 cell-kpi">
              TB Platform tương tác(<span style={{ color: "red" }}>*</span>)
            </td>
            <td rowSpan={4} className="kpi-dvt">
              %
            </td>
            <td className="text-sub4 kpi-kht">KHT</td>
            <td className="cell-number">
              {loadingPlan ? (
                <LoadingComponent />
              ) : PLAN_TB_PLAT_TT.KHO ? (
                convertToFloat2Fixed(PLAN_TB_PLAT_TT.KHO)
              ) : (
                ""
              )}
            </td>
            <td className="cell-number">
              {loadingPlan ? (
                <LoadingComponent />
              ) : PLAN_TB_PLAT_TT.DLA ? (
                convertToFloat2Fixed(PLAN_TB_PLAT_TT.DLA)
              ) : (
                ""
              )}
            </td>
            <td className="cell-number">
              {loadingPlan ? (
                <LoadingComponent />
              ) : PLAN_TB_PLAT_TT.GLA ? (
                convertToFloat2Fixed(PLAN_TB_PLAT_TT.GLA)
              ) : (
                ""
              )}
            </td>
            <td className="cell-number">
              {loadingPlan ? (
                <LoadingComponent />
              ) : PLAN_TB_PLAT_TT.PYE ? (
                convertToFloat2Fixed(PLAN_TB_PLAT_TT.PYE)
              ) : (
                ""
              )}
            </td>
            <td className="cell-number">
              {loadingPlan ? (
                <LoadingComponent />
              ) : PLAN_TB_PLAT_TT.DNO ? (
                convertToFloat2Fixed(PLAN_TB_PLAT_TT.DNO)
              ) : (
                ""
              )}
            </td>
            <td className="cell-number">
              {loadingPlan ? (
                <LoadingComponent />
              ) : PLAN_TB_PLAT_TT.KON ? (
                convertToFloat2Fixed(PLAN_TB_PLAT_TT.KON)
              ) : (
                ""
              )}
            </td>
            <td className="cell-number">
              {loadingPlan ? (
                <LoadingComponent />
              ) : PLAN_TB_PLAT_TT.CTY7 ? (
                convertToFloat2Fixed(PLAN_TB_PLAT_TT.CTY7)
              ) : (
                ""
              )}
            </td>
            <td rowSpan={4} className="cell-donviphutrach">
              CNS
              <br />
              <span>
                {EXEC_TB_PLAT_TT.LAST_DATE
                  ? getFormattedDate(new Date(EXEC_TB_PLAT_TT.LAST_DATE))
                  : ""}
              </span>
            </td>
          </tr>
          <tr>
            <td className="text-sub4 kpi-thlk">THLK</td>
            <td className="cell-number">
              {loadingExec ? (
                <LoadingComponent />
              ) : EXEC_TB_PLAT_TT.KHO ? (
                convertToFloat2Fixed(EXEC_TB_PLAT_TT.KHO)
              ) : (
                ""
              )}
            </td>
            <td className="cell-number">
              {loadingExec ? (
                <LoadingComponent />
              ) : EXEC_TB_PLAT_TT.DLA ? (
                convertToFloat2Fixed(EXEC_TB_PLAT_TT.DLA)
              ) : (
                ""
              )}
            </td>
            <td className="cell-number">
              {loadingExec ? (
                <LoadingComponent />
              ) : EXEC_TB_PLAT_TT.GLA ? (
                convertToFloat2Fixed(EXEC_TB_PLAT_TT.GLA)
              ) : (
                ""
              )}
            </td>
            <td className="cell-number">
              {loadingExec ? (
                <LoadingComponent />
              ) : EXEC_TB_PLAT_TT.PYE ? (
                convertToFloat2Fixed(EXEC_TB_PLAT_TT.PYE)
              ) : (
                ""
              )}
            </td>
            <td className="cell-number">
              {loadingExec ? (
                <LoadingComponent />
              ) : EXEC_TB_PLAT_TT.DNO ? (
                convertToFloat2Fixed(EXEC_TB_PLAT_TT.DNO)
              ) : (
                ""
              )}
            </td>
            <td className="cell-number">
              {loadingExec ? (
                <LoadingComponent />
              ) : EXEC_TB_PLAT_TT.KON ? (
                convertToFloat2Fixed(EXEC_TB_PLAT_TT.KON)
              ) : (
                ""
              )}
            </td>
            <td className="cell-number">
              {loadingExec ? (
                <LoadingComponent />
              ) : EXEC_TB_PLAT_TT.CTY7 ? (
                convertToFloat2Fixed(EXEC_TB_PLAT_TT.CTY7)
              ) : (
                ""
              )}
            </td>
          </tr>
          <tr>
            <td className="text-sub4 kpi-percent-lk">%HTKH </td>
            <td className="cell-number">
              {loadingExec || loadingPlan ? (
                <LoadingComponent />
              ) : EXEC_TB_PLAT_TT.KHO && PLAN_TB_PLAT_TT.KHO ? (
                convertToFloat2Fixed(
                  (EXEC_TB_PLAT_TT.KHO * 100) / PLAN_TB_PLAT_TT.KHO
                )
              ) : (
                ""
              )}
            </td>
            <td className="cell-number">
              {loadingExec || loadingPlan ? (
                <LoadingComponent />
              ) : EXEC_TB_PLAT_TT.DLA && PLAN_TB_PLAT_TT.DLA ? (
                convertToFloat2Fixed(
                  (EXEC_TB_PLAT_TT.DLA * 100) / PLAN_TB_PLAT_TT.DLA
                )
              ) : (
                ""
              )}
            </td>
            <td className="cell-number">
              {loadingExec || loadingPlan ? (
                <LoadingComponent />
              ) : EXEC_TB_PLAT_TT.GLA && PLAN_TB_PLAT_TT.GLA ? (
                convertToFloat2Fixed(
                  (EXEC_TB_PLAT_TT.GLA * 100) / PLAN_TB_PLAT_TT.GLA
                )
              ) : (
                ""
              )}
            </td>
            <td className="cell-number">
              {loadingExec || loadingPlan ? (
                <LoadingComponent />
              ) : EXEC_TB_PLAT_TT.PYE && PLAN_TB_PLAT_TT.PYE ? (
                convertToFloat2Fixed(
                  (EXEC_TB_PLAT_TT.PYE * 100) / PLAN_TB_PLAT_TT.PYE
                )
              ) : (
                ""
              )}
            </td>
            <td className="cell-number">
              {loadingExec || loadingPlan ? (
                <LoadingComponent />
              ) : EXEC_TB_PLAT_TT.DNO && PLAN_TB_PLAT_TT.DNO ? (
                convertToFloat2Fixed(
                  (EXEC_TB_PLAT_TT.DNO * 100) / PLAN_TB_PLAT_TT.DNO
                )
              ) : (
                ""
              )}
            </td>
            <td className="cell-number">
              {loadingExec || loadingPlan ? (
                <LoadingComponent />
              ) : EXEC_TB_PLAT_TT.KON && PLAN_TB_PLAT_TT.KON ? (
                convertToFloat2Fixed(
                  (EXEC_TB_PLAT_TT.KON * 100) / PLAN_TB_PLAT_TT.KON
                )
              ) : (
                ""
              )}
            </td>
            <td className="cell-number">
              {loadingExec || loadingPlan ? (
                <LoadingComponent />
              ) : EXEC_TB_PLAT_TT.CTY7 && PLAN_TB_PLAT_TT.CTY7 ? (
                convertToFloat2Fixed(
                  (EXEC_TB_PLAT_TT.CTY7 * 100) / PLAN_TB_PLAT_TT.CTY7
                )
              ) : (
                ""
              )}
            </td>
          </tr>
          <tr>
            <td className="text-sub4 kpi-percent-th">Ước %HTKH</td>
            <td
              className={
                parseFloat((EXEC_TB_PLAT_TT.KHO * 100) / PLAN_TB_PLAT_TT.KHO) >
                100
                  ? "bg-green"
                  : "bg-red"
              }
            >
              {loadingExec || loadingPlan ? (
                <LoadingComponent />
              ) : EXEC_TB_PLAT_TT.KHO && PLAN_TB_PLAT_TT.KHO ? (
                convertToFloat2Fixed(
                  (EXEC_TB_PLAT_TT.KHO * 100) / PLAN_TB_PLAT_TT.KHO
                )
              ) : (
                ""
              )}
            </td>
            <td
              className={
                parseFloat((EXEC_TB_PLAT_TT.DLA * 100) / PLAN_TB_PLAT_TT.DLA) >
                100
                  ? "bg-green"
                  : "bg-red"
              }
            >
              {loadingExec || loadingPlan ? (
                <LoadingComponent />
              ) : EXEC_TB_PLAT_TT.DLA && PLAN_TB_PLAT_TT.DLA ? (
                convertToFloat2Fixed(
                  (EXEC_TB_PLAT_TT.DLA * 100) / PLAN_TB_PLAT_TT.DLA
                )
              ) : (
                ""
              )}
            </td>
            <td
              className={
                parseFloat((EXEC_TB_PLAT_TT.GLA * 100) / PLAN_TB_PLAT_TT.GLA) >
                100
                  ? "bg-green"
                  : "bg-red"
              }
            >
              {loadingExec || loadingPlan ? (
                <LoadingComponent />
              ) : EXEC_TB_PLAT_TT.GLA && PLAN_TB_PLAT_TT.GLA ? (
                convertToFloat2Fixed(
                  (EXEC_TB_PLAT_TT.GLA * 100) / PLAN_TB_PLAT_TT.GLA
                )
              ) : (
                ""
              )}
            </td>
            <td
              className={
                parseFloat((EXEC_TB_PLAT_TT.PYE * 100) / PLAN_TB_PLAT_TT.PYE) >
                100
                  ? "bg-green"
                  : "bg-red"
              }
            >
              {loadingExec || loadingPlan ? (
                <LoadingComponent />
              ) : EXEC_TB_PLAT_TT.PYE && PLAN_TB_PLAT_TT.PYE ? (
                convertToFloat2Fixed(
                  (EXEC_TB_PLAT_TT.PYE * 100) / PLAN_TB_PLAT_TT.PYE
                )
              ) : (
                ""
              )}
            </td>
            <td
              className={
                parseFloat((EXEC_TB_PLAT_TT.DNO * 100) / PLAN_TB_PLAT_TT.DNO) >
                100
                  ? "bg-green"
                  : "bg-red"
              }
            >
              {loadingExec || loadingPlan ? (
                <LoadingComponent />
              ) : EXEC_TB_PLAT_TT.DNO && PLAN_TB_PLAT_TT.DNO ? (
                convertToFloat2Fixed(
                  (EXEC_TB_PLAT_TT.DNO * 100) / PLAN_TB_PLAT_TT.DNO
                )
              ) : (
                ""
              )}
            </td>
            <td
              className={
                parseFloat((EXEC_TB_PLAT_TT.KON * 100) / PLAN_TB_PLAT_TT.KON) >
                100
                  ? "bg-green"
                  : "bg-red"
              }
            >
              {loadingExec || loadingPlan ? (
                <LoadingComponent />
              ) : EXEC_TB_PLAT_TT.KON && PLAN_TB_PLAT_TT.KON ? (
                convertToFloat2Fixed(
                  (EXEC_TB_PLAT_TT.KON * 100) / PLAN_TB_PLAT_TT.KON
                )
              ) : (
                ""
              )}
            </td>
            <td
              className={
                parseFloat(
                  (EXEC_TB_PLAT_TT.CTY7 * 100) / PLAN_TB_PLAT_TT.CTY7
                ) > 100
                  ? "bg-green"
                  : "bg-red"
              }
            >
              {loadingExec || loadingPlan ? (
                <LoadingComponent />
              ) : EXEC_TB_PLAT_TT.CTY7 && PLAN_TB_PLAT_TT.CTY7 ? (
                convertToFloat2Fixed(
                  (EXEC_TB_PLAT_TT.CTY7 * 100) / PLAN_TB_PLAT_TT.CTY7
                )
              ) : (
                ""
              )}
            </td>
          </tr>
          <tr>
            <td rowSpan={4} className="text-sub2">
              12
            </td>
            <td rowSpan={4} className="text-sub2 cell-kpi">
              Tỷ lệ Thuê bao N-1 có gói cước
            </td>
            <td rowSpan={4} className="kpi-dvt">
              %
            </td>
            <td className="text-sub4 kpi-kht">KHT</td>
            <td className="cell-number">
              {loadingPlan ? (
                <LoadingComponent />
              ) : PLAN_TILE_N_1_GOI.KHO ? (
                convertToFloat2Fixed(PLAN_TILE_N_1_GOI.KHO)
              ) : (
                ""
              )}
            </td>
            <td className="cell-number">
              {loadingPlan ? (
                <LoadingComponent />
              ) : PLAN_TILE_N_1_GOI.DLA ? (
                convertToFloat2Fixed(PLAN_TILE_N_1_GOI.DLA)
              ) : (
                ""
              )}
            </td>
            <td className="cell-number">
              {loadingPlan ? (
                <LoadingComponent />
              ) : PLAN_TILE_N_1_GOI.GLA ? (
                convertToFloat2Fixed(PLAN_TILE_N_1_GOI.GLA)
              ) : (
                ""
              )}
            </td>
            <td className="cell-number">
              {loadingPlan ? (
                <LoadingComponent />
              ) : PLAN_TILE_N_1_GOI.PYE ? (
                convertToFloat2Fixed(PLAN_TILE_N_1_GOI.PYE)
              ) : (
                ""
              )}
            </td>
            <td className="cell-number">
              {loadingPlan ? (
                <LoadingComponent />
              ) : PLAN_TILE_N_1_GOI.DNO ? (
                convertToFloat2Fixed(PLAN_TILE_N_1_GOI.DNO)
              ) : (
                ""
              )}
            </td>
            <td className="cell-number">
              {loadingPlan ? (
                <LoadingComponent />
              ) : PLAN_TILE_N_1_GOI.KON ? (
                convertToFloat2Fixed(PLAN_TILE_N_1_GOI.KON)
              ) : (
                ""
              )}
            </td>
            <td className="cell-number">
              {loadingPlan ? (
                <LoadingComponent />
              ) : PLAN_TILE_N_1_GOI.CTY7 ? (
                convertToFloat2Fixed(PLAN_TILE_N_1_GOI.CTY7)
              ) : (
                ""
              )}
            </td>
            <td className="cell-donviphutrach" rowSpan={4}>
              CSKH
              <br />
              {EXEC_TILE_N_1_GOI && EXEC_TILE_N_1_GOI.LAST_DATE
                ? getFormattedDate(new Date(EXEC_TILE_N_1_GOI.LAST_DATE))
                : ""}
            </td>
          </tr>
          <tr>
            <td className="text-sub4 kpi-thlk">THLK</td>
            <td className="cell-number">
              {loadingPlan ? (
                <LoadingComponent />
              ) : EXEC_TILE_N_1_GOI.KHO ? (
                convertToFloat2Fixed(EXEC_TILE_N_1_GOI.KHO)
              ) : (
                ""
              )}
            </td>
            <td className="cell-number">
              {loadingPlan ? (
                <LoadingComponent />
              ) : EXEC_TILE_N_1_GOI.DLA ? (
                convertToFloat2Fixed(EXEC_TILE_N_1_GOI.DLA)
              ) : (
                ""
              )}
            </td>
            <td className="cell-number">
              {loadingPlan ? (
                <LoadingComponent />
              ) : EXEC_TILE_N_1_GOI.GLA ? (
                convertToFloat2Fixed(EXEC_TILE_N_1_GOI.GLA)
              ) : (
                ""
              )}
            </td>
            <td className="cell-number">
              {loadingPlan ? (
                <LoadingComponent />
              ) : EXEC_TILE_N_1_GOI.PYE ? (
                convertToFloat2Fixed(EXEC_TILE_N_1_GOI.PYE)
              ) : (
                ""
              )}
            </td>
            <td className="cell-number">
              {loadingPlan ? (
                <LoadingComponent />
              ) : EXEC_TILE_N_1_GOI.DNO ? (
                convertToFloat2Fixed(EXEC_TILE_N_1_GOI.DNO)
              ) : (
                ""
              )}
            </td>
            <td className="cell-number">
              {loadingPlan ? (
                <LoadingComponent />
              ) : EXEC_TILE_N_1_GOI.KON ? (
                convertToFloat2Fixed(EXEC_TILE_N_1_GOI.KON)
              ) : (
                ""
              )}
            </td>
            <td className="cell-number">
              {loadingPlan ? (
                <LoadingComponent />
              ) : EXEC_TILE_N_1_GOI.CTY7 ? (
                convertToFloat2Fixed(EXEC_TILE_N_1_GOI.CTY7)
              ) : (
                ""
              )}
            </td>
          </tr>
          <tr>
            <td className="text-sub4 kpi-percent-lk">%HTKH </td>
            <td className="cell-number">
              {loadingExec || loadingPlan ? (
                <LoadingComponent />
              ) : EXEC_TILE_N_1_GOI.KHO && PLAN_TILE_N_1_GOI.KHO ? (
                convertToFloat2Fixed(
                  (EXEC_TILE_N_1_GOI.KHO * 100) / PLAN_TILE_N_1_GOI.KHO
                )
              ) : (
                ""
              )}
            </td>
            <td className="cell-number">
              {loadingExec || loadingPlan ? (
                <LoadingComponent />
              ) : EXEC_TILE_N_1_GOI.DLA && PLAN_TILE_N_1_GOI.DLA ? (
                convertToFloat2Fixed(
                  (EXEC_TILE_N_1_GOI.DLA * 100) / PLAN_TILE_N_1_GOI.DLA
                )
              ) : (
                ""
              )}
            </td>
            <td className="cell-number">
              {loadingExec || loadingPlan ? (
                <LoadingComponent />
              ) : EXEC_TILE_N_1_GOI.GLA && PLAN_TILE_N_1_GOI.GLA ? (
                convertToFloat2Fixed(
                  (EXEC_TILE_N_1_GOI.GLA * 100) / PLAN_TILE_N_1_GOI.GLA
                )
              ) : (
                ""
              )}
            </td>
            <td className="cell-number">
              {loadingExec || loadingPlan ? (
                <LoadingComponent />
              ) : EXEC_TILE_N_1_GOI.PYE && PLAN_TILE_N_1_GOI.PYE ? (
                convertToFloat2Fixed(
                  (EXEC_TILE_N_1_GOI.PYE * 100) / PLAN_TILE_N_1_GOI.PYE
                )
              ) : (
                ""
              )}
            </td>
            <td className="cell-number">
              {loadingExec || loadingPlan ? (
                <LoadingComponent />
              ) : EXEC_TILE_N_1_GOI.DNO && PLAN_TILE_N_1_GOI.DNO ? (
                convertToFloat2Fixed(
                  (EXEC_TILE_N_1_GOI.DNO * 100) / PLAN_TILE_N_1_GOI.DNO
                )
              ) : (
                ""
              )}
            </td>
            <td className="cell-number">
              {loadingExec || loadingPlan ? (
                <LoadingComponent />
              ) : EXEC_TILE_N_1_GOI.KON && PLAN_TILE_N_1_GOI.KON ? (
                convertToFloat2Fixed(
                  (EXEC_TILE_N_1_GOI.KON * 100) / PLAN_TILE_N_1_GOI.KON
                )
              ) : (
                ""
              )}
            </td>
            <td className="cell-number">
              {loadingExec || loadingPlan ? (
                <LoadingComponent />
              ) : EXEC_TILE_N_1_GOI.CTY7 && PLAN_TILE_N_1_GOI.CTY7 ? (
                convertToFloat2Fixed(
                  (EXEC_TILE_N_1_GOI.CTY7 * 100) / PLAN_TILE_N_1_GOI.CTY7
                )
              ) : (
                ""
              )}
            </td>
          </tr>
          <tr>
            <td className="text-sub4 kpi-percent-th">Ước %HTKH</td>
            <td
              className={
                parseFloat(
                  (EXEC_TILE_N_1_GOI.KHO * 100) / PLAN_TILE_N_1_GOI.KHO
                ) > 100
                  ? "bg-green"
                  : "bg-red"
              }
            >
              {loadingExec || loadingPlan ? (
                <LoadingComponent />
              ) : EXEC_TILE_N_1_GOI.KHO && PLAN_TILE_N_1_GOI.KHO ? (
                convertToFloat2Fixed(
                  (EXEC_TILE_N_1_GOI.KHO * 100) / PLAN_TILE_N_1_GOI.KHO
                )
              ) : (
                ""
              )}
            </td>

            <td
              className={
                parseFloat(
                  (EXEC_TILE_N_1_GOI.DLA * 100) / PLAN_TILE_N_1_GOI.DLA
                ) > 100
                  ? "bg-green"
                  : "bg-red"
              }
            >
              {loadingExec || loadingPlan ? (
                <LoadingComponent />
              ) : EXEC_TILE_N_1_GOI.DLA && PLAN_TILE_N_1_GOI.DLA ? (
                convertToFloat2Fixed(
                  (EXEC_TILE_N_1_GOI.DLA * 100) / PLAN_TILE_N_1_GOI.DLA
                )
              ) : (
                ""
              )}
            </td>
            <td
              className={
                parseFloat(
                  (EXEC_TILE_N_1_GOI.GLA * 100) / PLAN_TILE_N_1_GOI.GLA
                ) > 100
                  ? "bg-green"
                  : "bg-red"
              }
            >
              {loadingExec || loadingPlan ? (
                <LoadingComponent />
              ) : EXEC_TILE_N_1_GOI.GLA && PLAN_TILE_N_1_GOI.GLA ? (
                convertToFloat2Fixed(
                  (EXEC_TILE_N_1_GOI.GLA * 100) / PLAN_TILE_N_1_GOI.GLA
                )
              ) : (
                ""
              )}
            </td>
            <td
              className={
                parseFloat(
                  (EXEC_TILE_N_1_GOI.PYE * 100) / PLAN_TILE_N_1_GOI.PYE
                ) > 100
                  ? "bg-green"
                  : "bg-red"
              }
            >
              {loadingExec || loadingPlan ? (
                <LoadingComponent />
              ) : EXEC_TILE_N_1_GOI.PYE && PLAN_TILE_N_1_GOI.PYE ? (
                convertToFloat2Fixed(
                  (EXEC_TILE_N_1_GOI.PYE * 100) / PLAN_TILE_N_1_GOI.PYE
                )
              ) : (
                ""
              )}
            </td>
            <td
              className={
                parseFloat(
                  (EXEC_TILE_N_1_GOI.DNO * 100) / PLAN_TILE_N_1_GOI.DNO
                ) > 100
                  ? "bg-green"
                  : "bg-red"
              }
            >
              {loadingExec || loadingPlan ? (
                <LoadingComponent />
              ) : EXEC_TILE_N_1_GOI.DNO && PLAN_TILE_N_1_GOI.DNO ? (
                convertToFloat2Fixed(
                  (EXEC_TILE_N_1_GOI.DNO * 100) / PLAN_TILE_N_1_GOI.DNO
                )
              ) : (
                ""
              )}
            </td>
            <td
              className={
                parseFloat(
                  (EXEC_TILE_N_1_GOI.KON * 100) / PLAN_TILE_N_1_GOI.KON
                ) > 100
                  ? "bg-green"
                  : "bg-red"
              }
            >
              {loadingExec || loadingPlan ? (
                <LoadingComponent />
              ) : EXEC_TILE_N_1_GOI.KON && PLAN_TILE_N_1_GOI.KON ? (
                convertToFloat2Fixed(
                  (EXEC_TILE_N_1_GOI.KON * 100) / PLAN_TILE_N_1_GOI.KON
                )
              ) : (
                ""
              )}
            </td>
            <td
              className={
                parseFloat(
                  (EXEC_TILE_N_1_GOI.CTY7 * 100) / PLAN_TILE_N_1_GOI.CTY7
                ) > 100
                  ? "bg-green"
                  : "bg-red"
              }
            >
              {loadingExec || loadingPlan ? (
                <LoadingComponent />
              ) : EXEC_TILE_N_1_GOI.CTY7 && PLAN_TILE_N_1_GOI.CTY7 ? (
                convertToFloat2Fixed(
                  (EXEC_TILE_N_1_GOI.CTY7 * 100) / PLAN_TILE_N_1_GOI.CTY7
                )
              ) : (
                ""
              )}
            </td>
          </tr>
          <tr>
            <td className="text-sub2">13</td>
            <td colSpan={11} className="text-sub2">
              Tỷ lệ Thuê bao N-1 gia hạn gói cước
            </td>
          </tr>
          <tr>
            <td rowSpan={4} className="text-sub3">
              13.1
            </td>
            <td rowSpan={4} className="text-sub3 cell-kpi">
              Đơn kỳ
            </td>
            <td rowSpan={4} className="kpi-dvt">
              %
            </td>
            <td className="text-sub4 kpi-kht">KHT</td>
            <td className="cell-number">
              {loadingPlan ? (
                <LoadingComponent />
              ) : PLAN_TILE_N_1_DONKY.KHO ? (
                convertToFloat2Fixed(PLAN_TILE_N_1_DONKY.KHO)
              ) : (
                ""
              )}
            </td>
            <td className="cell-number">
              {loadingPlan ? (
                <LoadingComponent />
              ) : PLAN_TILE_N_1_DONKY.DLA ? (
                convertToFloat2Fixed(PLAN_TILE_N_1_DONKY.DLA)
              ) : (
                ""
              )}
            </td>
            <td className="cell-number">
              {loadingPlan ? (
                <LoadingComponent />
              ) : PLAN_TILE_N_1_DONKY.GLA ? (
                convertToFloat2Fixed(PLAN_TILE_N_1_DONKY.GLA)
              ) : (
                ""
              )}
            </td>
            <td className="cell-number">
              {loadingPlan ? (
                <LoadingComponent />
              ) : PLAN_TILE_N_1_DONKY.PYE ? (
                convertToFloat2Fixed(PLAN_TILE_N_1_DONKY.PYE)
              ) : (
                ""
              )}
            </td>
            <td className="cell-number">
              {loadingPlan ? (
                <LoadingComponent />
              ) : PLAN_TILE_N_1_DONKY.DNO ? (
                convertToFloat2Fixed(PLAN_TILE_N_1_DONKY.DNO)
              ) : (
                ""
              )}
            </td>
            <td className="cell-number">
              {loadingPlan ? (
                <LoadingComponent />
              ) : PLAN_TILE_N_1_DONKY.KON ? (
                convertToFloat2Fixed(PLAN_TILE_N_1_DONKY.KON)
              ) : (
                ""
              )}
            </td>
            <td className="cell-number">
              {loadingPlan ? (
                <LoadingComponent />
              ) : PLAN_TILE_N_1_DONKY.CTY7 ? (
                convertToFloat2Fixed(PLAN_TILE_N_1_DONKY.CTY7)
              ) : (
                ""
              )}
            </td>
            <td rowSpan={4} className="cell-donviphutrach">
              CSKH
              <br />
              <span>
                {EXEC_TILE_N_1_DONKY.LAST_DATE
                  ? getFormattedDate(new Date(EXEC_TILE_N_1_DONKY.LAST_DATE))
                  : ""}
              </span>
            </td>
          </tr>
          <tr>
            <td className="text-sub4 kpi-thlk">THLK</td>
            <td className="cell-number">
              {loadingExec ? (
                <LoadingComponent />
              ) : EXEC_TILE_N_1_DONKY.KHO ? (
                convertToFloat2Fixed(EXEC_TILE_N_1_DONKY.KHO)
              ) : (
                ""
              )}
            </td>
            <td className="cell-number">
              {loadingExec ? (
                <LoadingComponent />
              ) : EXEC_TILE_N_1_DONKY.DLA ? (
                convertToFloat2Fixed(EXEC_TILE_N_1_DONKY.DLA)
              ) : (
                ""
              )}
            </td>
            <td className="cell-number">
              {loadingExec ? (
                <LoadingComponent />
              ) : EXEC_TILE_N_1_DONKY.GLA ? (
                convertToFloat2Fixed(EXEC_TILE_N_1_DONKY.GLA)
              ) : (
                ""
              )}
            </td>
            <td className="cell-number">
              {loadingExec ? (
                <LoadingComponent />
              ) : EXEC_TILE_N_1_DONKY.PYE ? (
                convertToFloat2Fixed(EXEC_TILE_N_1_DONKY.PYE)
              ) : (
                ""
              )}
            </td>
            <td className="cell-number">
              {loadingExec ? (
                <LoadingComponent />
              ) : EXEC_TILE_N_1_DONKY.DNO ? (
                convertToFloat2Fixed(EXEC_TILE_N_1_DONKY.DNO)
              ) : (
                ""
              )}
            </td>
            <td className="cell-number">
              {loadingExec ? (
                <LoadingComponent />
              ) : EXEC_TILE_N_1_DONKY.KON ? (
                convertToFloat2Fixed(EXEC_TILE_N_1_DONKY.KON)
              ) : (
                ""
              )}
            </td>
            <td className="cell-number">
              {loadingExec ? (
                <LoadingComponent />
              ) : EXEC_TILE_N_1_DONKY.CTY7 ? (
                convertToFloat2Fixed(EXEC_TILE_N_1_DONKY.CTY7)
              ) : (
                ""
              )}
            </td>
          </tr>
          <tr>
            <td className="text-sub4 kpi-percent-lk">%HTKH </td>
            <td className="cell-number">
              {loadingExec || loadingPlan ? (
                <LoadingComponent />
              ) : EXEC_TILE_N_1_DONKY.KHO && PLAN_TILE_N_1_DONKY.KHO ? (
                convertToFloat2Fixed(
                  (EXEC_TILE_N_1_DONKY.KHO * 100) / PLAN_TILE_N_1_DONKY.KHO
                )
              ) : (
                ""
              )}
            </td>
            <td className="cell-number">
              {loadingExec || loadingPlan ? (
                <LoadingComponent />
              ) : EXEC_TILE_N_1_DONKY.DLA && PLAN_TILE_N_1_DONKY.DLA ? (
                convertToFloat2Fixed(
                  (EXEC_TILE_N_1_DONKY.DLA * 100) / PLAN_TILE_N_1_DONKY.DLA
                )
              ) : (
                ""
              )}
            </td>
            <td className="cell-number">
              {loadingExec || loadingPlan ? (
                <LoadingComponent />
              ) : EXEC_TILE_N_1_DONKY.GLA && PLAN_TILE_N_1_DONKY.GLA ? (
                convertToFloat2Fixed(
                  (EXEC_TILE_N_1_DONKY.GLA * 100) / PLAN_TILE_N_1_DONKY.GLA
                )
              ) : (
                ""
              )}
            </td>
            <td className="cell-number">
              {loadingExec || loadingPlan ? (
                <LoadingComponent />
              ) : EXEC_TILE_N_1_DONKY.PYE && PLAN_TILE_N_1_DONKY.PYE ? (
                convertToFloat2Fixed(
                  (EXEC_TILE_N_1_DONKY.PYE * 100) / PLAN_TILE_N_1_DONKY.PYE
                )
              ) : (
                ""
              )}
            </td>
            <td className="cell-number">
              {loadingExec || loadingPlan ? (
                <LoadingComponent />
              ) : EXEC_TILE_N_1_DONKY.DNO && PLAN_TILE_N_1_DONKY.DNO ? (
                convertToFloat2Fixed(
                  (EXEC_TILE_N_1_DONKY.DNO * 100) / PLAN_TILE_N_1_DONKY.DNO
                )
              ) : (
                ""
              )}
            </td>
            <td className="cell-number">
              {loadingExec || loadingPlan ? (
                <LoadingComponent />
              ) : EXEC_TILE_N_1_DONKY.KON && PLAN_TILE_N_1_DONKY.KON ? (
                convertToFloat2Fixed(
                  (EXEC_TILE_N_1_DONKY.KON * 100) / PLAN_TILE_N_1_DONKY.KON
                )
              ) : (
                ""
              )}
            </td>
            <td className="cell-number">
              {loadingExec || loadingPlan ? (
                <LoadingComponent />
              ) : EXEC_TILE_N_1_DONKY.CTY7 && PLAN_TILE_N_1_DONKY.CTY7 ? (
                convertToFloat2Fixed(
                  (EXEC_TILE_N_1_DONKY.CTY7 * 100) / PLAN_TILE_N_1_DONKY.CTY7
                )
              ) : (
                ""
              )}
            </td>
          </tr>
          <tr>
            <td className="text-sub4 kpi-percent-th">Ước %HTKH</td>
            <td
              className={
                parseFloat(
                  ((EXEC_TILE_N_1_DONKY.KHO /
                    (new Date(
                      selectedDate.getFullYear(),
                      selectedDate.getMonth() + 1,
                      0
                    ) < new Date(EXEC_TILE_N_1_DONKY.LAST_DATE)
                      ? sumDateInMonth
                      : new Date(EXEC_TILE_N_1_DONKY.LAST_DATE).getDate())) *
                    sumDateInMonth *
                    100) /
                    PLAN_TILE_N_1_DONKY.KHO
                ) > 100
                  ? "bg-green"
                  : "bg-red"
              }
            >
              {loadingExec || loadingPlan ? (
                <LoadingComponent />
              ) : EXEC_TILE_N_1_DONKY.KHO && PLAN_TILE_N_1_DONKY.KHO ? (
                convertToFloat2Fixed(
                  ((EXEC_TILE_N_1_DONKY.KHO /
                    (new Date(
                      selectedDate.getFullYear(),
                      selectedDate.getMonth() + 1,
                      0
                    ) < new Date(EXEC_TILE_N_1_DONKY.LAST_DATE)
                      ? sumDateInMonth
                      : new Date(EXEC_TILE_N_1_DONKY.LAST_DATE).getDate())) *
                    sumDateInMonth *
                    100) /
                    PLAN_TILE_N_1_DONKY.KHO
                )
              ) : (
                ""
              )}
            </td>
            <td
              className={
                parseFloat(
                  ((EXEC_TILE_N_1_DONKY.DLA /
                    (new Date(
                      selectedDate.getFullYear(),
                      selectedDate.getMonth() + 1,
                      0
                    ) < new Date(EXEC_TILE_N_1_DONKY.LAST_DATE)
                      ? sumDateInMonth
                      : new Date(EXEC_TILE_N_1_DONKY.LAST_DATE).getDate())) *
                    sumDateInMonth *
                    100) /
                    PLAN_TILE_N_1_DONKY.DLA
                ) > 100
                  ? "bg-green"
                  : "bg-red"
              }
            >
              {loadingExec || loadingPlan ? (
                <LoadingComponent />
              ) : EXEC_TILE_N_1_DONKY.DLA && PLAN_TILE_N_1_DONKY.DLA ? (
                convertToFloat2Fixed(
                  ((EXEC_TILE_N_1_DONKY.DLA /
                    (new Date(
                      selectedDate.getFullYear(),
                      selectedDate.getMonth() + 1,
                      0
                    ) < new Date(EXEC_TILE_N_1_DONKY.LAST_DATE)
                      ? sumDateInMonth
                      : new Date(EXEC_TILE_N_1_DONKY.LAST_DATE).getDate())) *
                    sumDateInMonth *
                    100) /
                    PLAN_TILE_N_1_DONKY.DLA
                )
              ) : (
                ""
              )}
            </td>
            <td
              className={
                parseFloat(
                  ((EXEC_TILE_N_1_DONKY.GLA /
                    (new Date(
                      selectedDate.getFullYear(),
                      selectedDate.getMonth() + 1,
                      0
                    ) < new Date(EXEC_TILE_N_1_DONKY.LAST_DATE)
                      ? sumDateInMonth
                      : new Date(EXEC_TILE_N_1_DONKY.LAST_DATE).getDate())) *
                    sumDateInMonth *
                    100) /
                    PLAN_TILE_N_1_DONKY.GLA
                ) > 100
                  ? "bg-green"
                  : "bg-red"
              }
            >
              {loadingExec || loadingPlan ? (
                <LoadingComponent />
              ) : EXEC_TILE_N_1_DONKY.GLA && PLAN_TILE_N_1_DONKY.GLA ? (
                convertToFloat2Fixed(
                  ((EXEC_TILE_N_1_DONKY.GLA /
                    (new Date(
                      selectedDate.getFullYear(),
                      selectedDate.getMonth() + 1,
                      0
                    ) < new Date(EXEC_TILE_N_1_DONKY.LAST_DATE)
                      ? sumDateInMonth
                      : new Date(EXEC_TILE_N_1_DONKY.LAST_DATE).getDate())) *
                    sumDateInMonth *
                    100) /
                    PLAN_TILE_N_1_DONKY.GLA
                )
              ) : (
                ""
              )}
            </td>
            <td
              className={
                parseFloat(
                  ((EXEC_TILE_N_1_DONKY.PYE /
                    (new Date(
                      selectedDate.getFullYear(),
                      selectedDate.getMonth() + 1,
                      0
                    ) < new Date(EXEC_TILE_N_1_DONKY.LAST_DATE)
                      ? sumDateInMonth
                      : new Date(EXEC_TILE_N_1_DONKY.LAST_DATE).getDate())) *
                    sumDateInMonth *
                    100) /
                    PLAN_TILE_N_1_DONKY.PYE
                ) > 100
                  ? "bg-green"
                  : "bg-red"
              }
            >
              {loadingExec || loadingPlan ? (
                <LoadingComponent />
              ) : EXEC_TILE_N_1_DONKY.PYE && PLAN_TILE_N_1_DONKY.PYE ? (
                convertToFloat2Fixed(
                  ((EXEC_TILE_N_1_DONKY.PYE /
                    (new Date(
                      selectedDate.getFullYear(),
                      selectedDate.getMonth() + 1,
                      0
                    ) < new Date(EXEC_TILE_N_1_DONKY.LAST_DATE)
                      ? sumDateInMonth
                      : new Date(EXEC_TILE_N_1_DONKY.LAST_DATE).getDate())) *
                    sumDateInMonth *
                    100) /
                    PLAN_TILE_N_1_DONKY.PYE
                )
              ) : (
                ""
              )}
            </td>
            <td
              className={
                parseFloat(
                  ((EXEC_TILE_N_1_DONKY.DNO /
                    (new Date(
                      selectedDate.getFullYear(),
                      selectedDate.getMonth() + 1,
                      0
                    ) < new Date(EXEC_TILE_N_1_DONKY.LAST_DATE)
                      ? sumDateInMonth
                      : new Date(EXEC_TILE_N_1_DONKY.LAST_DATE).getDate())) *
                    sumDateInMonth *
                    100) /
                    PLAN_TILE_N_1_DONKY.DNO
                ) > 100
                  ? "bg-green"
                  : "bg-red"
              }
            >
              {loadingExec || loadingPlan ? (
                <LoadingComponent />
              ) : EXEC_TILE_N_1_DONKY.DNO && PLAN_TILE_N_1_DONKY.DNO ? (
                convertToFloat2Fixed(
                  ((EXEC_TILE_N_1_DONKY.DNO /
                    (new Date(
                      selectedDate.getFullYear(),
                      selectedDate.getMonth() + 1,
                      0
                    ) < new Date(EXEC_TILE_N_1_DONKY.LAST_DATE)
                      ? sumDateInMonth
                      : new Date(EXEC_TILE_N_1_DONKY.LAST_DATE).getDate())) *
                    sumDateInMonth *
                    100) /
                    PLAN_TILE_N_1_DONKY.DNO
                )
              ) : (
                ""
              )}
            </td>
            <td
              className={
                parseFloat(
                  ((EXEC_TILE_N_1_DONKY.KON /
                    (new Date(
                      selectedDate.getFullYear(),
                      selectedDate.getMonth() + 1,
                      0
                    ) < new Date(EXEC_TILE_N_1_DONKY.LAST_DATE)
                      ? sumDateInMonth
                      : new Date(EXEC_TILE_N_1_DONKY.LAST_DATE).getDate())) *
                    sumDateInMonth *
                    100) /
                    PLAN_TILE_N_1_DONKY.KON
                ) > 100
                  ? "bg-green"
                  : "bg-red"
              }
            >
              {loadingExec || loadingPlan ? (
                <LoadingComponent />
              ) : EXEC_TILE_N_1_DONKY.KON && PLAN_TILE_N_1_DONKY.KON ? (
                convertToFloat2Fixed(
                  ((EXEC_TILE_N_1_DONKY.KON /
                    (new Date(
                      selectedDate.getFullYear(),
                      selectedDate.getMonth() + 1,
                      0
                    ) < new Date(EXEC_TILE_N_1_DONKY.LAST_DATE)
                      ? sumDateInMonth
                      : new Date(EXEC_TILE_N_1_DONKY.LAST_DATE).getDate())) *
                    sumDateInMonth *
                    100) /
                    PLAN_TILE_N_1_DONKY.KON
                )
              ) : (
                ""
              )}
            </td>
            <td
              className={
                parseFloat(
                  ((EXEC_TILE_N_1_DONKY.CTY7 /
                    (new Date(
                      selectedDate.getFullYear(),
                      selectedDate.getMonth() + 1,
                      0
                    ) < new Date(EXEC_TILE_N_1_DONKY.LAST_DATE)
                      ? sumDateInMonth
                      : new Date(EXEC_TILE_N_1_DONKY.LAST_DATE).getDate())) *
                    sumDateInMonth *
                    100) /
                    PLAN_TILE_N_1_DONKY.CTY7
                ) > 100
                  ? "bg-green"
                  : "bg-red"
              }
            >
              {loadingExec || loadingPlan ? (
                <LoadingComponent />
              ) : EXEC_TILE_N_1_DONKY.CTY7 && PLAN_TILE_N_1_DONKY.CTY7 ? (
                convertToFloat2Fixed(
                  ((EXEC_TILE_N_1_DONKY.CTY7 /
                    (new Date(
                      selectedDate.getFullYear(),
                      selectedDate.getMonth() + 1,
                      0
                    ) < new Date(EXEC_TILE_N_1_DONKY.LAST_DATE)
                      ? sumDateInMonth
                      : new Date(EXEC_TILE_N_1_DONKY.LAST_DATE).getDate())) *
                    sumDateInMonth *
                    100) /
                    PLAN_TILE_N_1_DONKY.CTY7
                )
              ) : (
                ""
              )}
            </td>
          </tr>
          <tr>
            <td rowSpan={4} className="text-sub3">
              13.2
            </td>
            <td rowSpan={4} className="text-sub3 cell-kpi">
              Dài kỳ
            </td>
            <td rowSpan={4} className="kpi-dvt">
              %
            </td>
            <td className="text-sub4 kpi-kht">KHT</td>
            <td className="cell-number">
              {loadingPlan ? (
                <LoadingComponent />
              ) : PLAN_TILE_N_1_DAIKY.KHO ? (
                convertToFloat2Fixed(PLAN_TILE_N_1_DAIKY.KHO)
              ) : (
                ""
              )}
            </td>
            <td className="cell-number">
              {loadingPlan ? (
                <LoadingComponent />
              ) : PLAN_TILE_N_1_DAIKY.DLA ? (
                convertToFloat2Fixed(PLAN_TILE_N_1_DAIKY.DLA)
              ) : (
                ""
              )}
            </td>
            <td className="cell-number">
              {loadingPlan ? (
                <LoadingComponent />
              ) : PLAN_TILE_N_1_DAIKY.GLA ? (
                convertToFloat2Fixed(PLAN_TILE_N_1_DAIKY.GLA)
              ) : (
                ""
              )}
            </td>
            <td className="cell-number">
              {loadingPlan ? (
                <LoadingComponent />
              ) : PLAN_TILE_N_1_DAIKY.PYE ? (
                convertToFloat2Fixed(PLAN_TILE_N_1_DAIKY.PYE)
              ) : (
                ""
              )}
            </td>
            <td className="cell-number">
              {loadingPlan ? (
                <LoadingComponent />
              ) : PLAN_TILE_N_1_DAIKY.DNO ? (
                convertToFloat2Fixed(PLAN_TILE_N_1_DAIKY.DNO)
              ) : (
                ""
              )}
            </td>
            <td className="cell-number">
              {loadingPlan ? (
                <LoadingComponent />
              ) : PLAN_TILE_N_1_DAIKY.KON ? (
                convertToFloat2Fixed(PLAN_TILE_N_1_DAIKY.KON)
              ) : (
                ""
              )}
            </td>
            <td className="cell-number">
              {loadingPlan ? (
                <LoadingComponent />
              ) : PLAN_TILE_N_1_DAIKY.CTY7 ? (
                convertToFloat2Fixed(PLAN_TILE_N_1_DAIKY.CTY7)
              ) : (
                ""
              )}
            </td>
            <td rowSpan={4} className="cell-donviphutrach">
              CSKH
              <br />
              <span>
                {EXEC_TILE_N_1_DAIKY.LAST_DATE
                  ? getFormattedDate(new Date(EXEC_TILE_N_1_DAIKY.LAST_DATE))
                  : ""}
              </span>
            </td>
          </tr>
          <tr>
            <td className="text-sub4 kpi-thlk">THLK</td>
            <td className="cell-number">
              {loadingPlan ? (
                <LoadingComponent />
              ) : EXEC_TILE_N_1_DAIKY.KHO ? (
                convertToFloat2Fixed(EXEC_TILE_N_1_DAIKY.KHO)
              ) : (
                ""
              )}
            </td>
            <td className="cell-number">
              {loadingPlan ? (
                <LoadingComponent />
              ) : EXEC_TILE_N_1_DAIKY.DLA ? (
                convertToFloat2Fixed(EXEC_TILE_N_1_DAIKY.DLA)
              ) : (
                ""
              )}
            </td>
            <td className="cell-number">
              {loadingPlan ? (
                <LoadingComponent />
              ) : EXEC_TILE_N_1_DAIKY.GLA ? (
                convertToFloat2Fixed(EXEC_TILE_N_1_DAIKY.GLA)
              ) : (
                ""
              )}
            </td>
            <td className="cell-number">
              {loadingPlan ? (
                <LoadingComponent />
              ) : EXEC_TILE_N_1_DAIKY.PYE ? (
                convertToFloat2Fixed(EXEC_TILE_N_1_DAIKY.PYE)
              ) : (
                ""
              )}
            </td>
            <td className="cell-number">
              {loadingPlan ? (
                <LoadingComponent />
              ) : EXEC_TILE_N_1_DAIKY.DNO ? (
                convertToFloat2Fixed(EXEC_TILE_N_1_DAIKY.DNO)
              ) : (
                ""
              )}
            </td>
            <td className="cell-number">
              {loadingPlan ? (
                <LoadingComponent />
              ) : EXEC_TILE_N_1_DAIKY.KON ? (
                convertToFloat2Fixed(EXEC_TILE_N_1_DAIKY.KON)
              ) : (
                ""
              )}
            </td>
            <td className="cell-number">
              {loadingPlan ? (
                <LoadingComponent />
              ) : EXEC_TILE_N_1_DAIKY.CTY7 ? (
                convertToFloat2Fixed(EXEC_TILE_N_1_DAIKY.CTY7)
              ) : (
                ""
              )}
            </td>
          </tr>
          <tr>
            <td className="text-sub4 kpi-percent-lk">%HTKH </td>
            <td className="cell-number">
              {loadingExec || loadingPlan ? (
                <LoadingComponent />
              ) : EXEC_TILE_N_1_DAIKY.KHO && PLAN_TILE_N_1_DAIKY.KHO ? (
                convertToFloat2Fixed(
                  (EXEC_TILE_N_1_DAIKY.KHO * 100) / PLAN_TILE_N_1_DAIKY.KHO
                )
              ) : (
                ""
              )}
            </td>
            <td className="cell-number">
              {loadingExec || loadingPlan ? (
                <LoadingComponent />
              ) : EXEC_TILE_N_1_DAIKY.DLA && PLAN_TILE_N_1_DAIKY.DLA ? (
                convertToFloat2Fixed(
                  (EXEC_TILE_N_1_DAIKY.DLA * 100) / PLAN_TILE_N_1_DAIKY.DLA
                )
              ) : (
                ""
              )}
            </td>
            <td className="cell-number">
              {loadingExec || loadingPlan ? (
                <LoadingComponent />
              ) : EXEC_TILE_N_1_DAIKY.GLA && PLAN_TILE_N_1_DAIKY.GLA ? (
                convertToFloat2Fixed(
                  (EXEC_TILE_N_1_DAIKY.GLA * 100) / PLAN_TILE_N_1_DAIKY.GLA
                )
              ) : (
                ""
              )}
            </td>
            <td className="cell-number">
              {loadingExec || loadingPlan ? (
                <LoadingComponent />
              ) : EXEC_TILE_N_1_DAIKY.PYE && PLAN_TILE_N_1_DAIKY.PYE ? (
                convertToFloat2Fixed(
                  (EXEC_TILE_N_1_DAIKY.PYE * 100) / PLAN_TILE_N_1_DAIKY.PYE
                )
              ) : (
                ""
              )}
            </td>
            <td className="cell-number">
              {loadingExec || loadingPlan ? (
                <LoadingComponent />
              ) : EXEC_TILE_N_1_DAIKY.DNO && PLAN_TILE_N_1_DAIKY.DNO ? (
                convertToFloat2Fixed(
                  (EXEC_TILE_N_1_DAIKY.DNO * 100) / PLAN_TILE_N_1_DAIKY.DNO
                )
              ) : (
                ""
              )}
            </td>
            <td className="cell-number">
              {loadingExec || loadingPlan ? (
                <LoadingComponent />
              ) : EXEC_TILE_N_1_DAIKY.KON && PLAN_TILE_N_1_DAIKY.KON ? (
                convertToFloat2Fixed(
                  (EXEC_TILE_N_1_DAIKY.KON * 100) / PLAN_TILE_N_1_DAIKY.KON
                )
              ) : (
                ""
              )}
            </td>
            <td className="cell-number">
              {loadingExec || loadingPlan ? (
                <LoadingComponent />
              ) : EXEC_TILE_N_1_DAIKY.CTY7 && PLAN_TILE_N_1_DAIKY.CTY7 ? (
                convertToFloat2Fixed(
                  (EXEC_TILE_N_1_DAIKY.CTY7 * 100) / PLAN_TILE_N_1_DAIKY.CTY7
                )
              ) : (
                ""
              )}
            </td>
          </tr>
          <tr>
            <td className="text-sub4 kpi-percent-th">Ước %HTKH</td>
            <td
              className={
                parseFloat(
                  ((EXEC_TILE_N_1_DAIKY.KHO /
                    (new Date(
                      selectedDate.getFullYear(),
                      selectedDate.getMonth() + 1,
                      0
                    ) < new Date(EXEC_TILE_N_1_DAIKY.LAST_DATE)
                      ? sumDateInMonth
                      : new Date(EXEC_TILE_N_1_DAIKY.LAST_DATE).getDate())) *
                    sumDateInMonth *
                    100) /
                    PLAN_TILE_N_1_DAIKY.KHO
                ) > 100
                  ? "bg-green"
                  : "bg-red"
              }
            >
              {loadingExec || loadingPlan ? (
                <LoadingComponent />
              ) : EXEC_TILE_N_1_DAIKY.KHO && PLAN_TILE_N_1_DAIKY.KHO ? (
                convertToFloat2Fixed(
                  ((EXEC_TILE_N_1_DAIKY.KHO /
                    (new Date(
                      selectedDate.getFullYear(),
                      selectedDate.getMonth() + 1,
                      0
                    ) < new Date(EXEC_TILE_N_1_DAIKY.LAST_DATE)
                      ? sumDateInMonth
                      : new Date(EXEC_TILE_N_1_DAIKY.LAST_DATE).getDate())) *
                    sumDateInMonth *
                    100) /
                    PLAN_TILE_N_1_DAIKY.KHO
                )
              ) : (
                ""
              )}
            </td>
            <td
              className={
                parseFloat(
                  ((EXEC_TILE_N_1_DAIKY.DLA /
                    (new Date(
                      selectedDate.getFullYear(),
                      selectedDate.getMonth() + 1,
                      0
                    ) < new Date(EXEC_TILE_N_1_DAIKY.LAST_DATE)
                      ? sumDateInMonth
                      : new Date(EXEC_TILE_N_1_DAIKY.LAST_DATE).getDate())) *
                    sumDateInMonth *
                    100) /
                    PLAN_TILE_N_1_DAIKY.DLA
                ) > 100
                  ? "bg-green"
                  : "bg-red"
              }
            >
              {loadingExec || loadingPlan ? (
                <LoadingComponent />
              ) : EXEC_TILE_N_1_DAIKY.DLA && PLAN_TILE_N_1_DAIKY.DLA ? (
                convertToFloat2Fixed(
                  ((EXEC_TILE_N_1_DAIKY.DLA /
                    (new Date(
                      selectedDate.getFullYear(),
                      selectedDate.getMonth() + 1,
                      0
                    ) < new Date(EXEC_TILE_N_1_DAIKY.LAST_DATE)
                      ? sumDateInMonth
                      : new Date(EXEC_TILE_N_1_DAIKY.LAST_DATE).getDate())) *
                    sumDateInMonth *
                    100) /
                    PLAN_TILE_N_1_DAIKY.DLA
                )
              ) : (
                ""
              )}
            </td>
            <td
              className={
                parseFloat(
                  ((EXEC_TILE_N_1_DAIKY.GLA /
                    (new Date(
                      selectedDate.getFullYear(),
                      selectedDate.getMonth() + 1,
                      0
                    ) < new Date(EXEC_TILE_N_1_DAIKY.LAST_DATE)
                      ? sumDateInMonth
                      : new Date(EXEC_TILE_N_1_DAIKY.LAST_DATE).getDate())) *
                    sumDateInMonth *
                    100) /
                    PLAN_TILE_N_1_DAIKY.GLA
                ) > 100
                  ? "bg-green"
                  : "bg-red"
              }
            >
              {loadingExec || loadingPlan ? (
                <LoadingComponent />
              ) : EXEC_TILE_N_1_DAIKY.GLA && PLAN_TILE_N_1_DAIKY.GLA ? (
                convertToFloat2Fixed(
                  ((EXEC_TILE_N_1_DAIKY.GLA /
                    (new Date(
                      selectedDate.getFullYear(),
                      selectedDate.getMonth() + 1,
                      0
                    ) < new Date(EXEC_TILE_N_1_DAIKY.LAST_DATE)
                      ? sumDateInMonth
                      : new Date(EXEC_TILE_N_1_DAIKY.LAST_DATE).getDate())) *
                    sumDateInMonth *
                    100) /
                    PLAN_TILE_N_1_DAIKY.GLA
                )
              ) : (
                ""
              )}
            </td>
            <td
              className={
                parseFloat(
                  ((EXEC_TILE_N_1_DAIKY.PYE /
                    (new Date(
                      selectedDate.getFullYear(),
                      selectedDate.getMonth() + 1,
                      0
                    ) < new Date(EXEC_TILE_N_1_DAIKY.LAST_DATE)
                      ? sumDateInMonth
                      : new Date(EXEC_TILE_N_1_DAIKY.LAST_DATE).getDate())) *
                    sumDateInMonth *
                    100) /
                    PLAN_TILE_N_1_DAIKY.PYE
                ) > 100
                  ? "bg-green"
                  : "bg-red"
              }
            >
              {loadingExec || loadingPlan ? (
                <LoadingComponent />
              ) : EXEC_TILE_N_1_DAIKY.PYE && PLAN_TILE_N_1_DAIKY.PYE ? (
                convertToFloat2Fixed(
                  ((EXEC_TILE_N_1_DAIKY.PYE /
                    (new Date(
                      selectedDate.getFullYear(),
                      selectedDate.getMonth() + 1,
                      0
                    ) < new Date(EXEC_TILE_N_1_DAIKY.LAST_DATE)
                      ? sumDateInMonth
                      : new Date(EXEC_TILE_N_1_DAIKY.LAST_DATE).getDate())) *
                    sumDateInMonth *
                    100) /
                    PLAN_TILE_N_1_DAIKY.PYE
                )
              ) : (
                ""
              )}
            </td>
            <td
              className={
                parseFloat(
                  ((EXEC_TILE_N_1_DAIKY.DNO /
                    (new Date(
                      selectedDate.getFullYear(),
                      selectedDate.getMonth() + 1,
                      0
                    ) < new Date(EXEC_TILE_N_1_DAIKY.LAST_DATE)
                      ? sumDateInMonth
                      : new Date(EXEC_TILE_N_1_DAIKY.LAST_DATE).getDate())) *
                    sumDateInMonth *
                    100) /
                    PLAN_TILE_N_1_DAIKY.DNO
                ) > 100
                  ? "bg-green"
                  : "bg-red"
              }
            >
              {loadingExec || loadingPlan ? (
                <LoadingComponent />
              ) : EXEC_TILE_N_1_DAIKY.DNO && PLAN_TILE_N_1_DAIKY.DNO ? (
                convertToFloat2Fixed(
                  ((EXEC_TILE_N_1_DAIKY.DNO /
                    (new Date(
                      selectedDate.getFullYear(),
                      selectedDate.getMonth() + 1,
                      0
                    ) < new Date(EXEC_TILE_N_1_DAIKY.LAST_DATE)
                      ? sumDateInMonth
                      : new Date(EXEC_TILE_N_1_DAIKY.LAST_DATE).getDate())) *
                    sumDateInMonth *
                    100) /
                    PLAN_TILE_N_1_DAIKY.DNO
                )
              ) : (
                ""
              )}
            </td>
            <td
              className={
                parseFloat(
                  ((EXEC_TILE_N_1_DAIKY.KON /
                    (new Date(
                      selectedDate.getFullYear(),
                      selectedDate.getMonth() + 1,
                      0
                    ) < new Date(EXEC_TILE_N_1_DAIKY.LAST_DATE)
                      ? sumDateInMonth
                      : new Date(EXEC_TILE_N_1_DAIKY.LAST_DATE).getDate())) *
                    sumDateInMonth *
                    100) /
                    PLAN_TILE_N_1_DAIKY.KON
                ) > 100
                  ? "bg-green"
                  : "bg-red"
              }
            >
              {loadingExec || loadingPlan ? (
                <LoadingComponent />
              ) : EXEC_TILE_N_1_DAIKY.KON && PLAN_TILE_N_1_DAIKY.KON ? (
                convertToFloat2Fixed(
                  ((EXEC_TILE_N_1_DAIKY.KON /
                    (new Date(
                      selectedDate.getFullYear(),
                      selectedDate.getMonth() + 1,
                      0
                    ) < new Date(EXEC_TILE_N_1_DAIKY.LAST_DATE)
                      ? sumDateInMonth
                      : new Date(EXEC_TILE_N_1_DAIKY.LAST_DATE).getDate())) *
                    sumDateInMonth *
                    100) /
                    PLAN_TILE_N_1_DAIKY.KON
                )
              ) : (
                ""
              )}
            </td>
            <td
              className={
                parseFloat(
                  ((EXEC_TILE_N_1_DAIKY.CTY7 /
                    (new Date(
                      selectedDate.getFullYear(),
                      selectedDate.getMonth() + 1,
                      0
                    ) < new Date(EXEC_TILE_N_1_DAIKY.LAST_DATE)
                      ? sumDateInMonth
                      : new Date(EXEC_TILE_N_1_DAIKY.LAST_DATE).getDate())) *
                    sumDateInMonth *
                    100) /
                    PLAN_TILE_N_1_DAIKY.CTY7
                ) > 100
                  ? "bg-green"
                  : "bg-red"
              }
            >
              {loadingExec || loadingPlan ? (
                <LoadingComponent />
              ) : EXEC_TILE_N_1_DAIKY.CTY7 && PLAN_TILE_N_1_DAIKY.CTY7 ? (
                convertToFloat2Fixed(
                  ((EXEC_TILE_N_1_DAIKY.CTY7 /
                    (new Date(
                      selectedDate.getFullYear(),
                      selectedDate.getMonth() + 1,
                      0
                    ) < new Date(EXEC_TILE_N_1_DAIKY.LAST_DATE)
                      ? sumDateInMonth
                      : new Date(EXEC_TILE_N_1_DAIKY.LAST_DATE).getDate())) *
                    sumDateInMonth *
                    100) /
                    PLAN_TILE_N_1_DAIKY.CTY7
                )
              ) : (
                ""
              )}
            </td>
          </tr>
          <tr>
            <td rowSpan={4} className="text-sub2">
              14
            </td>
            <td rowSpan={4} className="text-sub2 cell-kpi">
              Tỷ lệ TB MNP đến - đi (1:1)
            </td>
            <td rowSpan={4} className="kpi-dvt">
              %
            </td>
            <td className="text-sub4 kpi-kht">KHT</td>
            <td className="cell-number">
              {loadingPlan ? (
                <LoadingComponent />
              ) : PLAN_TILE_MNP.KHO ? (
                convertToFloat2Fixed(PLAN_TILE_MNP.KHO)
              ) : (
                ""
              )}
            </td>
            <td className="cell-number">
              {loadingPlan ? (
                <LoadingComponent />
              ) : PLAN_TILE_MNP.DLA ? (
                convertToFloat2Fixed(PLAN_TILE_MNP.DLA)
              ) : (
                ""
              )}
            </td>
            <td className="cell-number">
              {loadingPlan ? (
                <LoadingComponent />
              ) : PLAN_TILE_MNP.GLA ? (
                convertToFloat2Fixed(PLAN_TILE_MNP.GLA)
              ) : (
                ""
              )}
            </td>
            <td className="cell-number">
              {loadingPlan ? (
                <LoadingComponent />
              ) : PLAN_TILE_MNP.PYE ? (
                convertToFloat2Fixed(PLAN_TILE_MNP.PYE)
              ) : (
                ""
              )}
            </td>
            <td className="cell-number">
              {loadingPlan ? (
                <LoadingComponent />
              ) : PLAN_TILE_MNP.DNO ? (
                convertToFloat2Fixed(PLAN_TILE_MNP.DNO)
              ) : (
                ""
              )}
            </td>
            <td className="cell-number">
              {loadingPlan ? (
                <LoadingComponent />
              ) : PLAN_TILE_MNP.KON ? (
                convertToFloat2Fixed(PLAN_TILE_MNP.KON)
              ) : (
                ""
              )}
            </td>
            <td className="cell-number">
              {loadingPlan ? (
                <LoadingComponent />
              ) : PLAN_TILE_MNP.CTY7 ? (
                convertToFloat2Fixed(PLAN_TILE_MNP.CTY7)
              ) : (
                ""
              )}
            </td>
            <td rowSpan={4} className="cell-donviphutrach">
              CSKH
              <br />
              <span>
                {EXEC_TILE_MNP.LAST_DATE
                  ? getFormattedDate(new Date(EXEC_TILE_MNP.LAST_DATE))
                  : ""}
              </span>
            </td>
          </tr>
          <tr>
            <td className="text-sub4 kpi-thlk">THLK</td>
            <td className="cell-number">
              {loadingExec ? (
                <LoadingComponent />
              ) : EXEC_TILE_MNP.KHO ? (
                convertToFloat2Fixed(EXEC_TILE_MNP.KHO)
              ) : (
                ""
              )}
            </td>
            <td className="cell-number">
              {loadingExec ? (
                <LoadingComponent />
              ) : EXEC_TILE_MNP.DLA ? (
                convertToFloat2Fixed(EXEC_TILE_MNP.DLA)
              ) : (
                ""
              )}
            </td>
            <td className="cell-number">
              {loadingExec ? (
                <LoadingComponent />
              ) : EXEC_TILE_MNP.GLA ? (
                convertToFloat2Fixed(EXEC_TILE_MNP.GLA)
              ) : (
                ""
              )}
            </td>

            <td className="cell-number">
              {loadingExec ? (
                <LoadingComponent />
              ) : EXEC_TILE_MNP.PYE ? (
                convertToFloat2Fixed(EXEC_TILE_MNP.PYE)
              ) : (
                ""
              )}
            </td>
            <td className="cell-number">
              {loadingExec ? (
                <LoadingComponent />
              ) : EXEC_TILE_MNP.DNO ? (
                convertToFloat2Fixed(EXEC_TILE_MNP.DNO)
              ) : (
                ""
              )}
            </td>
            <td className="cell-number">
              {loadingExec ? (
                <LoadingComponent />
              ) : EXEC_TILE_MNP.KON ? (
                convertToFloat2Fixed(EXEC_TILE_MNP.KON)
              ) : (
                ""
              )}
            </td>
            <td className="cell-number">
              {loadingExec ? (
                <LoadingComponent />
              ) : EXEC_TILE_MNP.CT7 ? (
                convertToFloat2Fixed(EXEC_TILE_MNP.CTY7)
              ) : (
                ""
              )}
            </td>
          </tr>
          <tr>
            <td className="text-sub4 kpi-percent-lk">%HTKH </td>
            <td className="cell-number">
              {loadingExec || loadingPlan ? (
                <LoadingComponent />
              ) : EXEC_TILE_MNP.KHO && PLAN_TILE_MNP.KHO ? (
                convertToFloat2Fixed(
                  (EXEC_TILE_MNP.KHO * 100) / PLAN_TILE_MNP.KHO
                )
              ) : (
                ""
              )}
            </td>
            <td className="cell-number">
              {loadingExec || loadingPlan ? (
                <LoadingComponent />
              ) : EXEC_TILE_MNP.DLA && PLAN_TILE_MNP.DLA ? (
                convertToFloat2Fixed(
                  (EXEC_TILE_MNP.DLA * 100) / PLAN_TILE_MNP.DLA
                )
              ) : (
                ""
              )}
            </td>
            <td className="cell-number">
              {loadingExec || loadingPlan ? (
                <LoadingComponent />
              ) : EXEC_TILE_MNP.GLA && PLAN_TILE_MNP.GLA ? (
                convertToFloat2Fixed(
                  (EXEC_TILE_MNP.GLA * 100) / PLAN_TILE_MNP.GLA
                )
              ) : (
                ""
              )}
            </td>
            <td className="cell-number">
              {loadingExec || loadingPlan ? (
                <LoadingComponent />
              ) : EXEC_TILE_MNP.PYE && PLAN_TILE_MNP.PYE ? (
                convertToFloat2Fixed(
                  (EXEC_TILE_MNP.PYE * 100) / PLAN_TILE_MNP.PYE
                )
              ) : (
                ""
              )}
            </td>
            <td className="cell-number">
              {loadingExec || loadingPlan ? (
                <LoadingComponent />
              ) : EXEC_TILE_MNP.DNO && PLAN_TILE_MNP.DNO ? (
                convertToFloat2Fixed(
                  (EXEC_TILE_MNP.DNO * 100) / PLAN_TILE_MNP.DNO
                )
              ) : (
                ""
              )}
            </td>
            <td className="cell-number">
              {loadingExec || loadingPlan ? (
                <LoadingComponent />
              ) : EXEC_TILE_MNP.KON && PLAN_TILE_MNP.KON ? (
                convertToFloat2Fixed(
                  (EXEC_TILE_MNP.KON * 100) / PLAN_TILE_MNP.KON
                )
              ) : (
                ""
              )}
            </td>
            <td className="cell-number">
              {loadingExec || loadingPlan ? (
                <LoadingComponent />
              ) : EXEC_TILE_MNP.CTY7 && PLAN_TILE_MNP.CTY7 ? (
                convertToFloat2Fixed(
                  (EXEC_TILE_MNP.CTY7 * 100) / PLAN_TILE_MNP.CTY7
                )
              ) : (
                ""
              )}
            </td>
          </tr>
          <tr>
            <td className="text-sub4 kpi-percent-th">Ước %HTKH</td>
            <td
              className={
                parseFloat((EXEC_TILE_MNP.KHO * 100) / PLAN_TILE_MNP.KHO) > 100
                  ? "bg-green"
                  : "bg-red"
              }
            >
              {loadingExec || loadingPlan ? (
                <LoadingComponent />
              ) : EXEC_TILE_MNP.KHO && PLAN_TILE_MNP.KHO ? (
                convertToFloat2Fixed(
                  (EXEC_TILE_MNP.KHO * 100) / PLAN_TILE_MNP.KHO
                )
              ) : (
                ""
              )}
            </td>

            <td
              className={
                parseFloat((EXEC_TILE_MNP.DLA * 100) / PLAN_TILE_MNP.DLA) > 100
                  ? "bg-green"
                  : "bg-red"
              }
            >
              {loadingExec || loadingPlan ? (
                <LoadingComponent />
              ) : EXEC_TILE_MNP.DLA && PLAN_TILE_MNP.DLA ? (
                convertToFloat2Fixed(
                  (EXEC_TILE_MNP.DLA * 100) / PLAN_TILE_MNP.DLA
                )
              ) : (
                ""
              )}
            </td>

            <td
              className={
                parseFloat((EXEC_TILE_MNP.GLA * 100) / PLAN_TILE_MNP.GLA) > 100
                  ? "bg-green"
                  : "bg-red"
              }
            >
              {loadingExec || loadingPlan ? (
                <LoadingComponent />
              ) : EXEC_TILE_MNP.GLA && PLAN_TILE_MNP.GLA ? (
                convertToFloat2Fixed(
                  (EXEC_TILE_MNP.GLA * 100) / PLAN_TILE_MNP.GLA
                )
              ) : (
                ""
              )}
            </td>

            <td
              className={
                parseFloat((EXEC_TILE_MNP.PYE * 100) / PLAN_TILE_MNP.PYE) > 100
                  ? "bg-green"
                  : "bg-red"
              }
            >
              {loadingExec || loadingPlan ? (
                <LoadingComponent />
              ) : EXEC_TILE_MNP.PYE && PLAN_TILE_MNP.PYE ? (
                convertToFloat2Fixed(
                  (EXEC_TILE_MNP.PYE * 100) / PLAN_TILE_MNP.PYE
                )
              ) : (
                ""
              )}
            </td>

            <td
              className={
                parseFloat((EXEC_TILE_MNP.DNO * 100) / PLAN_TILE_MNP.DNO) > 100
                  ? "bg-green"
                  : "bg-red"
              }
            >
              {loadingExec || loadingPlan ? (
                <LoadingComponent />
              ) : EXEC_TILE_MNP.DNO && PLAN_TILE_MNP.DNO ? (
                convertToFloat2Fixed(
                  (EXEC_TILE_MNP.DNO * 100) / PLAN_TILE_MNP.DNO
                )
              ) : (
                ""
              )}
            </td>

            <td
              className={
                parseFloat((EXEC_TILE_MNP.KON * 100) / PLAN_TILE_MNP.KON) > 100
                  ? "bg-green"
                  : "bg-red"
              }
            >
              {loadingExec || loadingPlan ? (
                <LoadingComponent />
              ) : EXEC_TILE_MNP.KON && PLAN_TILE_MNP.KON ? (
                convertToFloat2Fixed(
                  (EXEC_TILE_MNP.KON * 100) / PLAN_TILE_MNP.KON
                )
              ) : (
                ""
              )}
            </td>

            <td
              className={
                parseFloat((EXEC_TILE_MNP.CTY7 * 100) / PLAN_TILE_MNP.CTY7) >
                100
                  ? "bg-green"
                  : "bg-red"
              }
            >
              {loadingExec || loadingPlan ? (
                <LoadingComponent />
              ) : EXEC_TILE_MNP.CTY7 && PLAN_TILE_MNP.CTY7 ? (
                convertToFloat2Fixed(
                  (EXEC_TILE_MNP.CTY7 * 100) / PLAN_TILE_MNP.CTY7
                )
              ) : (
                ""
              )}
            </td>
          </tr>
          <tr>
            <td rowSpan={4} className="text-sub2">
              15
            </td>
            <td rowSpan={4} className="text-sub2 cell-kpi">
              Số lượng hợp đồng dịch vụ GPS kí mới KHDN
              <span style={{ color: "red" }}>*</span>
            </td>
            <td rowSpan={4} className="kpi-dvt">
              hợp đồng
            </td>
            <td className="text-sub4 kpi-kht">KHT</td>
            <td className="cell-number">
              {loadingPlan ? (
                <LoadingComponent />
              ) : PLAN_SL_HD_GPS_KHDN.KHO ? (
                convertToFloat2FixedNumber(PLAN_SL_HD_GPS_KHDN.KHO)
              ) : (
                ""
              )}
            </td>
            <td className="cell-number">
              {loadingPlan ? (
                <LoadingComponent />
              ) : PLAN_SL_HD_GPS_KHDN.DLA ? (
                convertToFloat2FixedNumber(PLAN_SL_HD_GPS_KHDN.DLA)
              ) : (
                ""
              )}
            </td>
            <td className="cell-number">
              {loadingPlan ? (
                <LoadingComponent />
              ) : PLAN_SL_HD_GPS_KHDN.GLA ? (
                convertToFloat2FixedNumber(PLAN_SL_HD_GPS_KHDN.GLA)
              ) : (
                ""
              )}
            </td>
            <td className="cell-number">
              {loadingPlan ? (
                <LoadingComponent />
              ) : PLAN_SL_HD_GPS_KHDN.PYE ? (
                convertToFloat2FixedNumber(PLAN_SL_HD_GPS_KHDN.PYE)
              ) : (
                ""
              )}
            </td>
            <td className="cell-number">
              {loadingPlan ? (
                <LoadingComponent />
              ) : PLAN_SL_HD_GPS_KHDN.DNO ? (
                convertToFloat2FixedNumber(PLAN_SL_HD_GPS_KHDN.DNO)
              ) : (
                ""
              )}
            </td>
            <td className="cell-number">
              {loadingPlan ? (
                <LoadingComponent />
              ) : PLAN_SL_HD_GPS_KHDN.KON ? (
                convertToFloat2FixedNumber(PLAN_SL_HD_GPS_KHDN.KON)
              ) : (
                ""
              )}
            </td>
            <td className="cell-number">
              {loadingPlan ? (
                <LoadingComponent />
              ) : PLAN_SL_HD_GPS_KHDN.CTY7 ? (
                convertToFloat2FixedNumber(PLAN_SL_HD_GPS_KHDN.CTY7)
              ) : (
                ""
              )}
            </td>
            <td rowSpan={4} className="cell-donviphutrach">
              CNS
              <br />
              <span>
                {EXEC_SL_HD_GPS_KHDN.LAST_DATE
                  ? getFormattedDate(
                      new Date(EXEC_SL_HD_GPS_KHDN.LAST_DATE)
                    )
                  : ""}
              </span>
            </td>
          </tr>
          <tr>
            <td className="text-sub4">THLK </td>
            <td className="cell-number">
              {loadingExec ? (
                <LoadingComponent />
              ) : EXEC_SL_HD_GPS_KHDN.KHO ? (
                convertToFloat2FixedNumber(EXEC_SL_HD_GPS_KHDN.KHO)
              ) : (
                ""
              )}
            </td>
            <td className="cell-number">
              {loadingExec ? (
                <LoadingComponent />
              ) : EXEC_SL_HD_GPS_KHDN.DLA ? (
                convertToFloat2FixedNumber(EXEC_SL_HD_GPS_KHDN.DLA)
              ) : (
                ""
              )}
            </td>
            <td className="cell-number">
              {loadingExec ? (
                <LoadingComponent />
              ) : EXEC_SL_HD_GPS_KHDN.GLA ? (
                convertToFloat2FixedNumber(EXEC_SL_HD_GPS_KHDN.GLA)
              ) : (
                ""
              )}
            </td>
            <td className="cell-number">
              {loadingExec ? (
                <LoadingComponent />
              ) : EXEC_SL_HD_GPS_KHDN.PYE ? (
                convertToFloat2FixedNumber(EXEC_SL_HD_GPS_KHDN.PYE)
              ) : (
                ""
              )}
            </td>
            <td className="cell-number">
              {loadingExec ? (
                <LoadingComponent />
              ) : EXEC_SL_HD_GPS_KHDN.DNO ? (
                convertToFloat2FixedNumber(EXEC_SL_HD_GPS_KHDN.DNO)
              ) : (
                ""
              )}
            </td>
            <td className="cell-number">
              {loadingExec ? (
                <LoadingComponent />
              ) : EXEC_SL_HD_GPS_KHDN.KON ? (
                convertToFloat2FixedNumber(EXEC_SL_HD_GPS_KHDN.KON)
              ) : (
                ""
              )}
            </td>
            <td className="cell-number">
              {loadingExec ? (
                <LoadingComponent />
              ) : EXEC_SL_HD_GPS_KHDN.CTY7 ? (
                convertToFloat2FixedNumber(EXEC_SL_HD_GPS_KHDN.CTY7)
              ) : (
                ""
              )}
            </td>
          </tr>
          <tr>
            <td className="text-sub4">%HTKH</td>
            <td className="cell-number">
              {loadingExec || loadingPlan ? (
                <LoadingComponent />
              ) : EXEC_SL_HD_GPS_KHDN.KHO &&
                PLAN_SL_HD_GPS_KHDN.KHO ? (
                convertToFloat2Fixed(
                  (EXEC_SL_HD_GPS_KHDN.KHO * 100) /
                    PLAN_SL_HD_GPS_KHDN.KHO
                )
              ) : (
                ""
              )}
            </td>
            <td className="cell-number">
              {loadingExec || loadingPlan ? (
                <LoadingComponent />
              ) : EXEC_SL_HD_GPS_KHDN.DLA &&
                PLAN_SL_HD_GPS_KHDN.DLA ? (
                convertToFloat2Fixed(
                  (EXEC_SL_HD_GPS_KHDN.DLA * 100) /
                    PLAN_SL_HD_GPS_KHDN.DLA
                )
              ) : (
                ""
              )}
            </td>
            <td className="cell-number">
              {loadingExec || loadingPlan ? (
                <LoadingComponent />
              ) : EXEC_SL_HD_GPS_KHDN.GLA &&
                PLAN_SL_HD_GPS_KHDN.GLA ? (
                convertToFloat2Fixed(
                  (EXEC_SL_HD_GPS_KHDN.GLA * 100) /
                    PLAN_SL_HD_GPS_KHDN.GLA
                )
              ) : (
                ""
              )}
            </td>
            <td className="cell-number">
              {loadingExec || loadingPlan ? (
                <LoadingComponent />
              ) : EXEC_SL_HD_GPS_KHDN.PYE &&
                PLAN_SL_HD_GPS_KHDN.PYE ? (
                convertToFloat2Fixed(
                  (EXEC_SL_HD_GPS_KHDN.PYE * 100) /
                    PLAN_SL_HD_GPS_KHDN.PYE
                )
              ) : (
                ""
              )}
            </td>
            <td className="cell-number">
              {loadingExec || loadingPlan ? (
                <LoadingComponent />
              ) : EXEC_SL_HD_GPS_KHDN.DNO &&
                PLAN_SL_HD_GPS_KHDN.DNO ? (
                convertToFloat2Fixed(
                  (EXEC_SL_HD_GPS_KHDN.DNO * 100) /
                    PLAN_SL_HD_GPS_KHDN.DNO
                )
              ) : (
                ""
              )}
            </td>
            <td className="cell-number">
              {loadingExec || loadingPlan ? (
                <LoadingComponent />
              ) : EXEC_SL_HD_GPS_KHDN.KON &&
                PLAN_SL_HD_GPS_KHDN.KON ? (
                convertToFloat2Fixed(
                  (EXEC_SL_HD_GPS_KHDN.KON * 100) /
                    PLAN_SL_HD_GPS_KHDN.KON
                )
              ) : (
                ""
              )}
            </td>
            <td className="cell-number">
              {loadingExec || loadingPlan ? (
                <LoadingComponent />
              ) : EXEC_SL_HD_GPS_KHDN.CTY7 &&
                PLAN_SL_HD_GPS_KHDN.CTY7 ? (
                convertToFloat2Fixed(
                  (EXEC_SL_HD_GPS_KHDN.CTY7 * 100) /
                    PLAN_SL_HD_GPS_KHDN.CTY7
                )
              ) : (
                ""
              )}
            </td>
          </tr>

          <tr>
            <td className="text-sub4 kpi-percent-th">Ước %HTKH</td>
            <td
              className={
                parseFloat(
                  ((EXEC_SL_HD_GPS_KHDN.KHO /
                    (new Date(
                      selectedDate.getFullYear(),
                      selectedDate.getMonth() + 1,
                      0
                    ) < new Date(EXEC_SL_HD_GPS_KHDN.LAST_DATE)
                      ? sumDateInMonth
                      : new Date(EXEC_SL_HD_GPS_KHDN.LAST_DATE).getDate())) *
                    sumDateInMonth *
                    100) /
                    PLAN_SL_HD_GPS_KHDN.KHO
                ) > 100
                  ? "bg-green"
                  : "bg-red"
              }
            >
              {loadingExec || loadingPlan ? (
                <LoadingComponent />
              ) : EXEC_SL_HD_GPS_KHDN.KHO && PLAN_SL_HD_GPS_KHDN.KHO ? (
                convertToFloat2Fixed(
                  ((EXEC_SL_HD_GPS_KHDN.KHO /
                    (new Date(
                      selectedDate.getFullYear(),
                      selectedDate.getMonth() + 1,
                      0
                    ) < new Date(EXEC_SL_HD_GPS_KHDN.LAST_DATE)
                      ? sumDateInMonth
                      : new Date(EXEC_SL_HD_GPS_KHDN.LAST_DATE).getDate())) *
                    sumDateInMonth *
                    100) /
                    PLAN_SL_HD_GPS_KHDN.KHO
                )
              ) : (
                ""
              )}
            </td>
            <td
              className={
                parseFloat(
                  ((EXEC_SL_HD_GPS_KHDN.DLA /
                    (new Date(
                      selectedDate.getFullYear(),
                      selectedDate.getMonth() + 1,
                      0
                    ) < new Date(EXEC_SL_HD_GPS_KHDN.LAST_DATE)
                      ? sumDateInMonth
                      : new Date(EXEC_SL_HD_GPS_KHDN.LAST_DATE).getDate())) *
                    sumDateInMonth *
                    100) /
                    PLAN_SL_HD_GPS_KHDN.DLA
                ) > 100
                  ? "bg-green"
                  : "bg-red"
              }
            >
              {loadingExec || loadingPlan ? (
                <LoadingComponent />
              ) : EXEC_SL_HD_GPS_KHDN.DLA && PLAN_SL_HD_GPS_KHDN.DLA ? (
                convertToFloat2Fixed(
                  ((EXEC_SL_HD_GPS_KHDN.DLA /
                    (new Date(
                      selectedDate.getFullYear(),
                      selectedDate.getMonth() + 1,
                      0
                    ) < new Date(EXEC_SL_HD_GPS_KHDN.LAST_DATE)
                      ? sumDateInMonth
                      : new Date(EXEC_SL_HD_GPS_KHDN.LAST_DATE).getDate())) *
                    sumDateInMonth *
                    100) /
                    PLAN_SL_HD_GPS_KHDN.DLA
                )
              ) : (
                ""
              )}
            </td>
            <td
              className={
                parseFloat(
                  ((EXEC_SL_HD_GPS_KHDN.GLA /
                    (new Date(
                      selectedDate.getFullYear(),
                      selectedDate.getMonth() + 1,
                      0
                    ) < new Date(EXEC_SL_HD_GPS_KHDN.LAST_DATE)
                      ? sumDateInMonth
                      : new Date(EXEC_SL_HD_GPS_KHDN.LAST_DATE).getDate())) *
                    sumDateInMonth *
                    100) /
                    PLAN_SL_HD_GPS_KHDN.GLA
                ) > 100
                  ? "bg-green"
                  : "bg-red"
              }
            >
              {loadingExec || loadingPlan ? (
                <LoadingComponent />
              ) : EXEC_SL_HD_GPS_KHDN.GLA && PLAN_SL_HD_GPS_KHDN.GLA ? (
                convertToFloat2Fixed(
                  ((EXEC_SL_HD_GPS_KHDN.GLA /
                    (new Date(
                      selectedDate.getFullYear(),
                      selectedDate.getMonth() + 1,
                      0
                    ) < new Date(EXEC_SL_HD_GPS_KHDN.LAST_DATE)
                      ? sumDateInMonth
                      : new Date(EXEC_SL_HD_GPS_KHDN.LAST_DATE).getDate())) *
                    sumDateInMonth *
                    100) /
                    PLAN_SL_HD_GPS_KHDN.GLA
                )
              ) : (
                ""
              )}
            </td>
            <td
              className={
                parseFloat(
                  ((EXEC_SL_HD_GPS_KHDN.PYE /
                    (new Date(
                      selectedDate.getFullYear(),
                      selectedDate.getMonth() + 1,
                      0
                    ) < new Date(EXEC_SL_HD_GPS_KHDN.LAST_DATE)
                      ? sumDateInMonth
                      : new Date(EXEC_SL_HD_GPS_KHDN.LAST_DATE).getDate())) *
                    sumDateInMonth *
                    100) /
                    PLAN_SL_HD_GPS_KHDN.PYE
                ) > 100
                  ? "bg-green"
                  : "bg-red"
              }
            >
              {loadingExec || loadingPlan ? (
                <LoadingComponent />
              ) : EXEC_SL_HD_GPS_KHDN.PYE && PLAN_SL_HD_GPS_KHDN.PYE ? (
                convertToFloat2Fixed(
                  ((EXEC_SL_HD_GPS_KHDN.PYE /
                    (new Date(
                      selectedDate.getFullYear(),
                      selectedDate.getMonth() + 1,
                      0
                    ) < new Date(EXEC_SL_HD_GPS_KHDN.LAST_DATE)
                      ? sumDateInMonth
                      : new Date(EXEC_SL_HD_GPS_KHDN.LAST_DATE).getDate())) *
                    sumDateInMonth *
                    100) /
                    PLAN_SL_HD_GPS_KHDN.PYE
                )
              ) : (
                ""
              )}
            </td>
            <td
              className={
                parseFloat(
                  ((EXEC_SL_HD_GPS_KHDN.DNO /
                    (new Date(
                      selectedDate.getFullYear(),
                      selectedDate.getMonth() + 1,
                      0
                    ) < new Date(EXEC_SL_HD_GPS_KHDN.LAST_DATE)
                      ? sumDateInMonth
                      : new Date(EXEC_SL_HD_GPS_KHDN.LAST_DATE).getDate())) *
                    sumDateInMonth *
                    100) /
                    PLAN_SL_HD_GPS_KHDN.DNO
                ) > 100
                  ? "bg-green"
                  : "bg-red"
              }
            >
              {loadingExec || loadingPlan ? (
                <LoadingComponent />
              ) : EXEC_SL_HD_GPS_KHDN.DNO && PLAN_SL_HD_GPS_KHDN.DNO ? (
                convertToFloat2Fixed(
                  ((EXEC_SL_HD_GPS_KHDN.DNO /
                    (new Date(
                      selectedDate.getFullYear(),
                      selectedDate.getMonth() + 1,
                      0
                    ) < new Date(EXEC_SL_HD_GPS_KHDN.LAST_DATE)
                      ? sumDateInMonth
                      : new Date(EXEC_SL_HD_GPS_KHDN.LAST_DATE).getDate())) *
                    sumDateInMonth *
                    100) /
                    PLAN_SL_HD_GPS_KHDN.DNO
                )
              ) : (
                ""
              )}
            </td>
            <td
              className={
                parseFloat(
                  ((EXEC_SL_HD_GPS_KHDN.KON /
                    (new Date(
                      selectedDate.getFullYear(),
                      selectedDate.getMonth() + 1,
                      0
                    ) < new Date(EXEC_SL_HD_GPS_KHDN.LAST_DATE)
                      ? sumDateInMonth
                      : new Date(EXEC_SL_HD_GPS_KHDN.LAST_DATE).getDate())) *
                    sumDateInMonth *
                    100) /
                    PLAN_SL_HD_GPS_KHDN.KON
                ) > 100
                  ? "bg-green"
                  : "bg-red"
              }
            >
              {loadingExec || loadingPlan ? (
                <LoadingComponent />
              ) : EXEC_SL_HD_GPS_KHDN.KON && PLAN_SL_HD_GPS_KHDN.KON ? (
                convertToFloat2Fixed(
                  ((EXEC_SL_HD_GPS_KHDN.KON /
                    (new Date(
                      selectedDate.getFullYear(),
                      selectedDate.getMonth() + 1,
                      0
                    ) < new Date(EXEC_SL_HD_GPS_KHDN.LAST_DATE)
                      ? sumDateInMonth
                      : new Date(EXEC_SL_HD_GPS_KHDN.LAST_DATE).getDate())) *
                    sumDateInMonth *
                    100) /
                    PLAN_SL_HD_GPS_KHDN.KON
                )
              ) : (
                ""
              )}
            </td>
            <td
              className={
                parseFloat(
                  ((EXEC_SL_HD_GPS_KHDN.CTY7 /
                    (new Date(
                      selectedDate.getFullYear(),
                      selectedDate.getMonth() + 1,
                      0
                    ) < new Date(EXEC_SL_HD_GPS_KHDN.LAST_DATE)
                      ? sumDateInMonth
                      : new Date(EXEC_SL_HD_GPS_KHDN.LAST_DATE).getDate())) *
                    sumDateInMonth *
                    100) /
                    PLAN_SL_HD_GPS_KHDN.CTY7
                ) > 100
                  ? "bg-green"
                  : "bg-red"
              }
            >
              {loadingExec || loadingPlan ? (
                <LoadingComponent />
              ) : EXEC_SL_HD_GPS_KHDN.CTY7 && PLAN_SL_HD_GPS_KHDN.CTY7 ? (
                convertToFloat2Fixed(
                  ((EXEC_SL_HD_GPS_KHDN.CTY7 /
                    (new Date(
                      selectedDate.getFullYear(),
                      selectedDate.getMonth() + 1,
                      0
                    ) < new Date(EXEC_SL_HD_GPS_KHDN.LAST_DATE)
                      ? sumDateInMonth
                      : new Date(EXEC_SL_HD_GPS_KHDN.LAST_DATE).getDate())) *
                    sumDateInMonth *
                    100) /
                    PLAN_SL_HD_GPS_KHDN.CTY7
                )
              ) : (
                ""
              )}
            </td>
          </tr>
          <tr>
            <td className="text-sub1">III</td>
            <td className="text-sub1" colSpan={12}>
              <span className="text-bold">Viễn cảnh nội bộ</span>
            </td>
          </tr>
          <tr>
            <td rowSpan={4} className="text-sub2">
              16
            </td>
            <td rowSpan={4} className="text-sub2 text-sub2">
              TLHT thực hiện nhiệm vụ LDCT giao đơn vị
            </td>
            <td rowSpan={4} className="kpi-dvt">
              %
            </td>
            <td className="text-sub4 kpi-kht">KHT</td>
            <td className="cell-number"></td>
            <td className="cell-number"></td>
            <td className="cell-number"></td>
            <td className="cell-number"></td>
            <td className="cell-number"></td>
            <td className="cell-number"></td>
            <td className="cell-number"></td>
            <td rowSpan={4} className="cell-donviphutrach">
              TH
            </td>
          </tr>
          <tr>
            <td className="text-sub4 kpi-thlk">THLK</td>
            <td className="cell-number"></td>
            <td className="cell-number"></td>
            <td className="cell-number"></td>
            <td className="cell-number"></td>
            <td className="cell-number"></td>
            <td className="cell-number"></td>
            <td className="cell-number"></td>
          </tr>
          <tr>
            <td className="text-sub4 kpi-percent-lk">%HTKH </td>
            <td className="cell-number"></td>
            <td className="cell-number"></td>
            <td className="cell-number"></td>
            <td className="cell-number"></td>
            <td className="cell-number"></td>
            <td className="cell-number"></td>
            <td className="cell-number"></td>
          </tr>
          <tr>
            <td className="text-sub4 kpi-percent-th">Ước %HTKH</td>
            <td className="cell-number"></td>
            <td className="cell-number"></td>
            <td className="cell-number"></td>
            <td className="cell-number"></td>
            <td className="cell-number"></td>
            <td className="cell-number"></td>
            <td className="cell-number"></td>
          </tr>

          <tr>
            <td className="text-sub1">V</td>
            <td className="text-sub1" colSpan={12}>
              <span className="text-bold">Quy mô</span>
            </td>
          </tr>
          <tr>
            <td rowSpan={4} className="text-sub2">
              17
            </td>
            <td rowSpan={4} className="text-sub2 text-sub2">
              Tăng trưởng doanh thu quản trị
            </td>
            <td rowSpan={4} className="kpi-dvt">
              triệu đồng
            </td>
            <td className="text-sub4 kpi-kht">KHT</td>
            <td className="cell-number"></td>
            <td className="cell-number"></td>
            <td className="cell-number"></td>
            <td className="cell-number"></td>
            <td className="cell-number"></td>
            <td className="cell-number"></td>
            <td className="cell-number"></td>
            <td rowSpan={4} className="cell-donviphutrach">
              TH
            </td>
          </tr>
          <tr>
            <td className="text-sub4 kpi-thlk">THLK</td>
            <td className="cell-number"></td>
            <td className="cell-number"></td>
            <td className="cell-number"></td>
            <td className="cell-number"></td>
            <td className="cell-number"></td>
            <td className="cell-number"></td>
            <td className="cell-number"></td>
          </tr>
          <tr>
            <td className="text-sub4 kpi-percent-lk">%HTKH </td>
            <td className="cell-number"></td>
            <td className="cell-number"></td>
            <td className="cell-number"></td>
            <td className="cell-number"></td>
            <td className="cell-number"></td>
            <td className="cell-number"></td>
            <td className="cell-number"></td>
          </tr>
          <tr>
            <td className="text-sub4 kpi-percent-th">Ước %HTKH</td>
            <td className="cell-number"></td>
            <td className="cell-number"></td>
            <td className="cell-number"></td>
            <td className="cell-number"></td>
            <td className="cell-number"></td>
            <td className="cell-number"></td>
            <td className="cell-number"></td>
          </tr>

          {/* <tr>
          <td rowSpan={4} className="text-sub2">
            19
          </td>
          <td rowSpan={4} className="text-sub2 text-sub2">
            Tổng điểm KPI dự kiến
          </td>
          <td rowSpan={4} className="kpi-dvt">
            %
          </td>
          <td className="text-sub4 kpi-kht"></td>
          <td className="cell-number">{kpiPointKHO ? convertToFloat2Fixed(kpiPointKHO) : 0}</td>
          <td className="cell-number">{kpiPointDLA}</td>
          <td className="cell-number">{kpoPointGLA}</td>
          <td className="cell-number">{kpoPointPYE}</td>
          <td className="cell-number">{kpoPointDNO}</td>
          <td className="cell-number">{kpoPointKON}</td>
          <td className="cell-number">{kpoPointCTY7}</td>
          <td rowSpan={4} className="cell-donviphutrach"></td>
        </tr> */}
        </tbody>
      </table>
    </div>
  );
});
export default TableDashboardT04;
