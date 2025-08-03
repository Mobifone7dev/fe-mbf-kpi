"use client";
import React, { useEffect, useState } from "react";
import LoadingComponent from "@components/loading/LoadingComponent";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import moment from "moment";
import { ErrorMessage, Form, Formik } from "formik";
import "react-datepicker/dist/react-datepicker.css";
import { DatePickerField } from "../../components/widgets/datePickers/DatePickerField";
import * as Yup from "yup";
import "bootstrap/dist/css/bootstrap.min.css";
import MySelectSingle from "@components/selects/MySelectSingle";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import { changeFormatDateFirstDateInMonth } from "../../until/functions";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import CustomDateInput from "../../components/widgets/datePickers/CustomDateInput";
import { handleGetExecKpi, createManualApiList } from "../../lib/api";

var x = new Date();

const INIT_KPI_VALUES = {
  selectKpiMonth: x,
};
const initDataFiber = [
  {
    id: "DTHU_FIBER",
    province: "KHO",
    value: 0,
  },
  {
    id: "DTHU_FIBER",
    province: "DLA",
    value: 0,
  },
  {
    id: "DTHU_FIBER",
    province: "GLA",
    value: 0,
  },
  {
    id: "DTHU_FIBER",
    province: "PYE",
    value: 0,
  },
  {
    id: "DTHU_FIBER",
    province: "DNO",
    value: 0,
  },
  {
    id: "DTHU_FIBER",
    province: "KON",
    value: 0,
  },
  {
    id: "DTHU_FIBER",
    province: "CTY7",
    value: 0,
  },
];
const initDataCloudDC = [
  {
    id: "DTHU_CLOUD_DC",
    province: "KHO",
    value: 0,
  },
  {
    id: "DTHU_CLOUD_DC",
    province: "DLA",
    value: 0,
  },
  {
    id: "DTHU_CLOUD_DC",
    province: "GLA",
    value: 0,
  },
  {
    id: "DTHU_CLOUD_DC",
    province: "PYE",
    value: 0,
  },
  {
    id: "DTHU_CLOUD_DC",
    province: "DNO",
    value: 0,
  },
  {
    id: "DTHU_CLOUD_DC",
    province: "KON",
    value: 0,
  },
  {
    id: "DTHU_CLOUD_DC",
    province: "CTY7",
    value: 0,
  },
];
const initDataMass = [
  {
    id: "DTHU_MASS",
    province: "KHO",
    value: 0,
  },
  {
    id: "DTHU_MASS",
    province: "DLA",
    value: 0,
  },
  {
    id: "DTHU_MASS",
    province: "GLA",
    value: 0,
  },
  {
    id: "DTHU_MASS",
    province: "PYE",
    value: 0,
  },
  {
    id: "DTHU_MASS",
    province: "DNO",
    value: 0,
  },
  {
    id: "DTHU_MASS",
    province: "KON",
    value: 0,
  },
  {
    id: "DTHU_MASS",
    province: "CTY7",
    value: 0,
  },
];

const initDataDuan = [
  {
    id: "DTHU_DUAN",
    province: "KHO",
    value: 0,
  },
  {
    id: "DTHU_DUAN",
    province: "DLA",
    value: 0,
  },
  {
    id: "DTHU_DUAN",
    province: "GLA",
    value: 0,
  },
  {
    id: "DTHU_DUAN",
    province: "PYE",
    value: 0,
  },
  {
    id: "DTHU_DUAN",
    province: "DNO",
    value: 0,
  },
  {
    id: "DTHU_DUAN",
    province: "KON",
    value: 0,
  },
  {
    id: "DTHU_DUAN",
    province: "CTY7",
    value: 0,
  },
];

const initDataGps = [
  {
    id: "DTHU_GPS_KGM",
    province: "KHO",
    value: 0,
  },
  {
    id: "DTHU_GPS_KGM",
    province: "DLA",
    value: 0,
  },
  {
    id: "DTHU_GPS_KGM",
    province: "GLA",
    value: 0,
  },
  {
    id: "DTHU_GPS_KGM",
    province: "PYE",
    value: 0,
  },
  {
    id: "DTHU_GPS_KGM",
    province: "DNO",
    value: 0,
  },
  {
    id: "DTHU_GPS_KGM",
    province: "KON",
    value: 0,
  },
  {
    id: "DTHU_GPS_KGM",
    province: "CTY7",
    value: 0,
  },
];
const initDNSDGP = [
  {
    id: "TI_LE_DN_SU_DUNG_GP_MBF",
    province: "KHO",
    value: 0,
  },
  {
    id: "TI_LE_DN_SU_DUNG_GP_MBF",
    province: "DLA",
    value: 0,
  },
  {
    id: "TI_LE_DN_SU_DUNG_GP_MBF",
    province: "GLA",
    value: 0,
  },
  {
    id: "TI_LE_DN_SU_DUNG_GP_MBF",
    province: "PYE",
    value: 0,
  },
  {
    id: "TI_LE_DN_SU_DUNG_GP_MBF",
    province: "DNO",
    value: 0,
  },
  {
    id: "TI_LE_DN_SU_DUNG_GP_MBF",
    province: "KON",
    value: 0,
  },
  {
    id: "TI_LE_DN_SU_DUNG_GP_MBF",
    province: "CTY7",
    value: 0,
  },
];
const initTbPlatTT = [
  {
    id: "TB_PLAT_TT",
    province: "KHO",
    value: 0,
  },
  {
    id: "TB_PLAT_TT",
    province: "DLA",
    value: 0,
  },
  {
    id: "TB_PLAT_TT",
    province: "GLA",
    value: 0,
  },
  {
    id: "TB_PLAT_TT",
    province: "PYE",
    value: 0,
  },
  {
    id: "TB_PLAT_TT",
    province: "DNO",
    value: 0,
  },
  {
    id: "TB_PLAT_TT",
    province: "KON",
    value: 0,
  },
  {
    id: "TB_PLAT_TT",
    province: "CTY7",
    value: 0,
  },
];
const initSLC2C = [
  {
    id: "SL_C2C",
    province: "KHO",
    value: 0,
  },
  {
    id: "SL_C2C",
    province: "DLA",
    value: 0,
  },
  {
    id: "SL_C2C",
    province: "GLA",
    value: 0,
  },
  {
    id: "SL_C2C",
    province: "PYE",
    value: 0,
  },
  {
    id: "SL_C2C",
    province: "DNO",
    value: 0,
  },
  {
    id: "SL_C2C",
    province: "KON",
    value: 0,
  },
  {
    id: "SL_C2C",
    province: "CTY7",
    value: 0,
  },
];

const initSL_HD_GPS_KHDN = [
  {
    id: "SL_HD_GPS_KHDN",
    province: "KHO",
    value: 0,
  },
  {
    id: "SL_HD_GPS_KHDN",
    province: "DLA",
    value: 0,
  },
  {
    id: "SL_HD_GPS_KHDN",
    province: "GLA",
    value: 0,
  },
  {
    id: "SL_HD_GPS_KHDN",
    province: "PYE",
    value: 0,
  },
  {
    id: "SL_HD_GPS_KHDN",
    province: "DNO",
    value: 0,
  },
  {
    id: "SL_HD_GPS_KHDN",
    province: "KON",
    value: 0,
  },
  {
    id: "SL_HD_GPS_KHDN",
    province: "CTY7",
    value: 0,
  },
];

const initTYLEGDC2C = [
  {
    id: "TYLE_GD_C2C",
    province: "KHO",
    value: 0,
  },
  {
    id: "TYLE_GD_C2C",
    province: "DLA",
    value: 0,
  },
  {
    id: "TYLE_GD_C2C",
    province: "GLA",
    value: 0,
  },
  {
    id: "TYLE_GD_C2C",
    province: "PYE",
    value: 0,
  },
  {
    id: "TYLE_GD_C2C",
    province: "DNO",
    value: 0,
  },
  {
    id: "TYLE_GD_C2C",
    province: "KON",
    value: 0,
  },
  {
    id: "TYLE_GD_C2C",
    province: "CTY7",
    value: 0,
  },
];
const CreateKpiT08Modal = (props) => {
  const [initKpiValues, setInitKpiValues] = useState(INIT_KPI_VALUES);
  const [loadingCreateManualKpi, setLoadingCreateManualKpi] = useState(false);
  const [show, setShow] = useState(props.show);
  const [mounted, setMounted] = useState(false);
  const [dataFiber, setDataFiber] = useState(initDataFiber);
  const [dataCloudDC, setDataCloudDC] = useState(initDataCloudDC);
  const [dataMass, setDataMass] = useState(initDataMass);
  const [dataDuan, setDataDuan] = useState(initDataDuan);
  const [dataGps, setDataGps] = useState(initDataGps);
  const [dataDNSDGP, setDataDNSDGP] = useState(initDNSDGP);
  const [dataTbPlatTT, setDataTbPlatTT] = useState(initTbPlatTT);
  const [dataSLC2C, setDataSLC2C] = useState(initSLC2C);
  const [dataSL_HD_GPS_KHDN, setDataSL_HD_GPS_KHDN] =
    useState(initSL_HD_GPS_KHDN);
  const [dataTYLEGDC2C, setDataTYLEGDC2C] = useState(initTYLEGDC2C);
  const [EXEC_TI_LE_DN_SU_DUNG_GP_MBF, SET_EXEC_TI_LE_DN_SU_DUNG_GP_MBF] =
    useState({ initDNSDGP });
  const [EXEC_DTHU_FIBER, SET_EXEC_DTHU_FIBER] = useState({});
  const [EXEC_DTHU_CLOUD_DC, SET_EXEC_DTHU_CLOUD_DC] = useState({});
  const [EXEC_DTHU_MASS, SET_EXEC_DTHU_MASS] = useState({});
  const [EXEC_DTHU_DUAN, SET_EXEC_DTHU_DUAN] = useState({});
  const [EXEC_DTHU_GPS_KGM, SET_EXEC_DTHU_GPS_KGM] = useState({});
  const [loadingExecKpi, setLoadingExecKpi] = useState(false);
  const [EXEC_TB_PLAT_TT, SET_EXEC_TB_PLAT_TT] = useState({ initTbPlatTT });
  const [EXEC_SL_C2C, SET_EXEC_SL_C2C] = useState({ initSLC2C });
  const [EXEC_SL_HD_GPS_KHDN, SET_EXEC_SL_HD_GPS_KHDN] = useState({});
  const [EXEC_TYLE_GD_C2C, SET_EXEC_TYLE_GD_C2C] = useState({ initTYLEGDC2C });

  const [dateUpdateFiber, setDateUpdateFiber] = useState(new Date());
  const [dateUpdateCloudDC, setDateUpdateCloudDC] = useState(new Date());
  const [dateUpdateTbPlatTT, setDateUpdateTbPlatTT] = useState(new Date());
  const [dateUpdateDthuMass, setDateUpdateDthuMass] = useState(new Date());
  const [dateUpdateDthuDuan, setDateUpdateDthuDuan] = useState(new Date());
  const [dateUpdateDthuGps, setDateUpdateDthuGps] = useState(new Date());
  const [dateUpdateGpMbf, setDateUpdateGpMbf] = useState(new Date());
  const [dateUpdateSLC2C, setDateUpdateSLC2C] = useState(new Date());
  const [dateUpdateSL_HD_GPS_KHDN, setDateUpdateSL_HD_GPS_KHDN] = useState(
    new Date()
  );
  const [dateUpdateTYLEGDC2C, setDateUpdateTYLEGDC2C] = useState(new Date());
  const [errorDiv, setErrorDiv] = useState("");

  const handleClose = async (e) => {
    props.handleClose();
  };
  const formKpiSchema = Yup.object().shape({});

  useEffect(() => {
    setShow(props.show);
  }, [props.show]);

  useEffect(() => {
    setMounted(true);
  }, []);
  useEffect(() => {
    getExecKpi(changeFormatDateFirstDateInMonth(x));
  }, []);

  useEffect(() => {
    if (Object.keys(EXEC_DTHU_FIBER).length > 0) {
      setInitFiber();
    }
    if (Object.keys(EXEC_DTHU_CLOUD_DC).length > 0) {
      setInitCloudDC();
    }

    if (Object.keys(EXEC_DTHU_DUAN).length > 0) {
      setInitDuan();
    }
    if (Object.keys(EXEC_DTHU_MASS).length > 0) {
      setInitMass();
    }
    if (Object.keys(EXEC_DTHU_GPS_KGM).length > 0) {
      setInitGps();
    }
    if (Object.keys(EXEC_TI_LE_DN_SU_DUNG_GP_MBF).length > 0) {
      setInitDNSDGP();
    }
    if (Object.keys(EXEC_TB_PLAT_TT).length > 0) {
      setInitTbPlatTT();
    }
    if (Object.keys(EXEC_SL_C2C).length > 0) {
      setInitSLC2C();
    }
    if (Object.keys(EXEC_SL_HD_GPS_KHDN).length > 0) {
      setInitSL_HD_GPS_KHDN();
    }
    if (Object.keys(EXEC_TYLE_GD_C2C).length > 0) {
      setInitTYLEGDC2C();
    }
  }, [
    EXEC_DTHU_FIBER,
    EXEC_DTHU_CLOUD_DC,
    EXEC_DTHU_DUAN,
    EXEC_DTHU_MASS,
    EXEC_DTHU_GPS_KGM,
    EXEC_TI_LE_DN_SU_DUNG_GP_MBF,
    EXEC_TB_PLAT_TT,
    EXEC_SL_C2C,
    EXEC_SL_HD_GPS_KHDN,
    EXEC_TYLE_GD_C2C,
  ]);

  const setInitFiber = () => {
    let tempData = [];

    tempData.push({
      id: "DTHU_FIBER",
      value: EXEC_DTHU_FIBER.KHO ? EXEC_DTHU_FIBER.KHO / 1000000 : 0,
      province: "KHO",
    });
    tempData.push({
      id: "DTHU_FIBER",
      value: EXEC_DTHU_FIBER.DLA ? EXEC_DTHU_FIBER.DLA / 1000000 : 0,
      province: "DLA",
    });
    tempData.push({
      id: "DTHU_FIBER",
      value: EXEC_DTHU_FIBER.GLA ? EXEC_DTHU_FIBER.GLA / 1000000 : 0,
      province: "GLA",
    });
    tempData.push({
      id: "DTHU_FIBER",
      value: EXEC_DTHU_FIBER.PYE ? EXEC_DTHU_FIBER.PYE / 1000000 : 0,
      province: "PYE",
    });
    tempData.push({
      id: "DTHU_FIBER",
      value: EXEC_DTHU_FIBER.DNO ? EXEC_DTHU_FIBER.DNO / 1000000 : 0,
      province: "DNO",
    });
    tempData.push({
      id: "DTHU_FIBER",
      value: EXEC_DTHU_FIBER.KON ? EXEC_DTHU_FIBER.KON / 1000000 : 0,
      province: "KON",
    });
    tempData.push({
      id: "DTHU_FIBER",
      value: EXEC_DTHU_FIBER.CTY7 ? EXEC_DTHU_FIBER.CTY7 / 1000000 : 0,
      province: "CTY7",
    });

    setDataFiber(tempData);
  };
  const setInitCloudDC = () => {
    let tempData = [];

    tempData.push({
      id: "DTHU_CLOUD_DC",
      value: EXEC_DTHU_CLOUD_DC.KHO ? EXEC_DTHU_CLOUD_DC.KHO / 1000000 : 0,
      province: "KHO",
    });
    tempData.push({
      id: "DTHU_CLOUD_DC",
      value: EXEC_DTHU_CLOUD_DC.DLA ? EXEC_DTHU_CLOUD_DC.DLA / 1000000 : 0,
      province: "DLA",
    });
    tempData.push({
      id: "DTHU_CLOUD_DC",
      value: EXEC_DTHU_CLOUD_DC.GLA ? EXEC_DTHU_CLOUD_DC.GLA / 1000000 : 0,
      province: "GLA",
    });
    tempData.push({
      id: "DTHU_CLOUD_DC",
      value: EXEC_DTHU_CLOUD_DC.PYE ? EXEC_DTHU_CLOUD_DC.PYE / 1000000 : 0,
      province: "PYE",
    });
    tempData.push({
      id: "DTHU_CLOUD_DC",
      value: EXEC_DTHU_CLOUD_DC.DNO ? EXEC_DTHU_CLOUD_DC.DNO / 1000000 : 0,
      province: "DNO",
    });
    tempData.push({
      id: "DTHU_CLOUD_DC",
      value: EXEC_DTHU_CLOUD_DC.KON ? EXEC_DTHU_CLOUD_DC.KON / 1000000 : 0,
      province: "KON",
    });
    tempData.push({
      id: "DTHU_CLOUD_DC",
      value: EXEC_DTHU_CLOUD_DC.CTY7 ? EXEC_DTHU_CLOUD_DC.CTY7 / 1000000 : 0,
      province: "CTY7",
    });

    setDataCloudDC(tempData);
  };

  const setInitDuan = () => {
    let tempData = [];

    tempData.push({
      id: "DTHU_DUAN",
      value: EXEC_DTHU_DUAN.KHO ? EXEC_DTHU_DUAN.KHO / 1000000 : 0,
      province: "KHO",
    });
    tempData.push({
      id: "DTHU_DUAN",
      value: EXEC_DTHU_DUAN.DLA ? EXEC_DTHU_DUAN.DLA / 1000000 : 0,
      province: "DLA",
    });
    tempData.push({
      id: "DTHU_DUAN",
      value: EXEC_DTHU_DUAN.GLA ? EXEC_DTHU_DUAN.GLA / 1000000 : 0,
      province: "GLA",
    });
    tempData.push({
      id: "DTHU_DUAN",
      value: EXEC_DTHU_DUAN.PYE ? EXEC_DTHU_DUAN.PYE / 1000000 : 0,
      province: "PYE",
    });
    tempData.push({
      id: "DTHU_DUAN",
      value: EXEC_DTHU_DUAN.DNO ? EXEC_DTHU_DUAN.DNO / 1000000 : 0,
      province: "DNO",
    });
    tempData.push({
      id: "DTHU_DUAN",
      value: EXEC_DTHU_DUAN.KON ? EXEC_DTHU_DUAN.KON / 1000000 : 0,
      province: "KON",
    });
    tempData.push({
      id: "DTHU_DUAN",
      value: EXEC_DTHU_DUAN.CTY7 ? EXEC_DTHU_DUAN.CTY7 / 1000000 : 0,
      province: "CTY7",
    });

    setDataDuan(tempData);
  };
  const setInitMass = () => {
    let tempData = [];

    tempData.push({
      id: "DTHU_MASS",
      value: EXEC_DTHU_MASS.KHO ? EXEC_DTHU_MASS.KHO / 1000000 : 0,
      province: "KHO",
    });
    tempData.push({
      id: "DTHU_MASS",
      value: EXEC_DTHU_MASS.DLA ? EXEC_DTHU_MASS.DLA / 1000000 : 0,
      province: "DLA",
    });
    tempData.push({
      id: "DTHU_MASS",
      value: EXEC_DTHU_MASS.GLA ? EXEC_DTHU_MASS.GLA / 1000000 : 0,
      province: "GLA",
    });
    tempData.push({
      id: "DTHU_MASS",
      value: EXEC_DTHU_MASS.PYE ? EXEC_DTHU_MASS.PYE / 1000000 : 0,
      province: "PYE",
    });
    tempData.push({
      id: "DTHU_MASS",
      value: EXEC_DTHU_MASS.DNO ? EXEC_DTHU_MASS.DNO / 1000000 : 0,
      province: "DNO",
    });
    tempData.push({
      id: "DTHU_MASS",
      value: EXEC_DTHU_MASS.KON ? EXEC_DTHU_MASS.KON / 1000000 : 0,
      province: "KON",
    });
    tempData.push({
      id: "DTHU_MASS",
      value: EXEC_DTHU_MASS.CTY7 ? EXEC_DTHU_MASS.CTY7 / 1000000 : 0,
      province: "CTY7",
    });

    setDataMass(tempData);
  };
  const setInitGps = () => {
    let tempData = [];
    tempData.push({
      id: "DTHU_GPS_KGM",
      value: EXEC_DTHU_GPS_KGM.KHO ? EXEC_DTHU_GPS_KGM.KHO / 1000000 : 0,
      province: "KHO",
    });
    tempData.push({
      id: "DTHU_GPS_KGM",
      value: EXEC_DTHU_GPS_KGM.DLA ? EXEC_DTHU_GPS_KGM.DLA / 1000000 : 0,
      province: "DLA",
    });
    tempData.push({
      id: "DTHU_GPS_KGM",
      value: EXEC_DTHU_GPS_KGM.GLA ? EXEC_DTHU_GPS_KGM.GLA / 1000000 : 0,
      province: "GLA",
    });
    tempData.push({
      id: "DTHU_GPS_KGM",
      value: EXEC_DTHU_GPS_KGM.PYE ? EXEC_DTHU_GPS_KGM.PYE / 1000000 : 0,
      province: "PYE",
    });
    tempData.push({
      id: "DTHU_GPS_KGM",
      value: EXEC_DTHU_GPS_KGM.DNO ? EXEC_DTHU_GPS_KGM.DNO / 1000000 : 0,
      province: "DNO",
    });
    tempData.push({
      id: "DTHU_GPS_KGM",
      value: EXEC_DTHU_GPS_KGM.KON ? EXEC_DTHU_GPS_KGM.KON / 1000000 : 0,
      province: "KON",
    });
    tempData.push({
      id: "DTHU_GPS_KGM",
      value: EXEC_DTHU_GPS_KGM.CTY7 ? EXEC_DTHU_GPS_KGM.CTY7 / 1000000 : 0,
      province: "CTY7",
    });

    setDataGps(tempData);
  };
  const setInitDNSDGP = () => {
    let tempData = [];
    tempData.push({
      id: "TI_LE_DN_SU_DUNG_GP_MBF",
      value: EXEC_TI_LE_DN_SU_DUNG_GP_MBF.KHO
        ? EXEC_TI_LE_DN_SU_DUNG_GP_MBF.KHO
        : 0,
      province: "KHO",
    });
    tempData.push({
      id: "TI_LE_DN_SU_DUNG_GP_MBF",
      value: EXEC_TI_LE_DN_SU_DUNG_GP_MBF.DLA
        ? EXEC_TI_LE_DN_SU_DUNG_GP_MBF.DLA
        : 0,
      province: "DLA",
    });
    tempData.push({
      id: "TI_LE_DN_SU_DUNG_GP_MBF",
      value: EXEC_TI_LE_DN_SU_DUNG_GP_MBF.GLA
        ? EXEC_TI_LE_DN_SU_DUNG_GP_MBF.GLA
        : 0,
      province: "GLA",
    });
    tempData.push({
      id: "TI_LE_DN_SU_DUNG_GP_MBF",
      value: EXEC_TI_LE_DN_SU_DUNG_GP_MBF.PYE
        ? EXEC_TI_LE_DN_SU_DUNG_GP_MBF.PYE
        : 0,
      province: "PYE",
    });
    tempData.push({
      id: "TI_LE_DN_SU_DUNG_GP_MBF",
      value: EXEC_TI_LE_DN_SU_DUNG_GP_MBF.DNO
        ? EXEC_TI_LE_DN_SU_DUNG_GP_MBF.DNO
        : 0,
      province: "DNO",
    });
    tempData.push({
      id: "TI_LE_DN_SU_DUNG_GP_MBF",
      value: EXEC_TI_LE_DN_SU_DUNG_GP_MBF.KON
        ? EXEC_TI_LE_DN_SU_DUNG_GP_MBF.KON
        : 0,
      province: "KON",
    });
    tempData.push({
      id: "TI_LE_DN_SU_DUNG_GP_MBF",
      value: EXEC_TI_LE_DN_SU_DUNG_GP_MBF.CTY7
        ? EXEC_TI_LE_DN_SU_DUNG_GP_MBF.CTY7
        : 0,
      province: "CTY7",
    });

    setDataDNSDGP(tempData);
  };

  const setInitTbPlatTT = () => {
    let tempData = [];
    tempData.push({
      id: "TB_PLAT_TT",
      value: EXEC_TB_PLAT_TT.KHO ? EXEC_TB_PLAT_TT.KHO : 0,
      province: "KHO",
    });
    tempData.push({
      id: "TB_PLAT_TT",
      value: EXEC_TB_PLAT_TT.DLA ? EXEC_TB_PLAT_TT.DLA : 0,
      province: "DLA",
    });
    tempData.push({
      id: "TB_PLAT_TT",
      value: EXEC_TB_PLAT_TT.GLA ? EXEC_TB_PLAT_TT.GLA : 0,
      province: "GLA",
    });
    tempData.push({
      id: "TB_PLAT_TT",
      value: EXEC_TB_PLAT_TT.PYE ? EXEC_TB_PLAT_TT.PYE : 0,
      province: "PYE",
    });
    tempData.push({
      id: "TB_PLAT_TT",
      value: EXEC_TB_PLAT_TT.DNO ? EXEC_TB_PLAT_TT.DNO : 0,
      province: "DNO",
    });
    tempData.push({
      id: "TB_PLAT_TT",
      value: EXEC_TB_PLAT_TT.KON ? EXEC_TB_PLAT_TT.KON : 0,
      province: "KON",
    });
    tempData.push({
      id: "TB_PLAT_TT",
      value: EXEC_TB_PLAT_TT.CTY7 ? EXEC_TB_PLAT_TT.CTY7 : 0,
      province: "CTY7",
    });
    setDataTbPlatTT(tempData);
  };

  const setInitSLC2C = () => {
    let tempData = [];
    tempData.push({
      id: "SL_C2C",
      value: EXEC_SL_C2C.KHO ? EXEC_SL_C2C.KHO : 0,
      province: "KHO",
    });
    tempData.push({
      id: "SL_C2C",
      value: EXEC_SL_C2C.DLA ? EXEC_SL_C2C.DLA : 0,
      province: "DLA",
    });
    tempData.push({
      id: "SL_C2C",
      value: EXEC_SL_C2C.GLA ? EXEC_SL_C2C.GLA : 0,
      province: "GLA",
    });
    tempData.push({
      id: "SL_C2C",
      value: EXEC_SL_C2C.PYE ? EXEC_SL_C2C.PYE : 0,
      province: "PYE",
    });
    tempData.push({
      id: "SL_C2C",
      value: EXEC_SL_C2C.DNO ? EXEC_SL_C2C.DNO : 0,
      province: "DNO",
    });
    tempData.push({
      id: "SL_C2C",
      value: EXEC_SL_C2C.KON ? EXEC_SL_C2C.KON : 0,
      province: "KON",
    });
    tempData.push({
      id: "SL_C2C",
      value: EXEC_SL_C2C.CTY7 ? EXEC_SL_C2C.CTY7 : 0,
      province: "CTY7",
    });
    setDataSLC2C(tempData);
  };
  const setInitSL_HD_GPS_KHDN = () => {
    let tempData = [];
    tempData.push({
      id: "SL_HD_GPS_KHDN",
      value: EXEC_SL_HD_GPS_KHDN.KHO ? EXEC_SL_HD_GPS_KHDN.KHO : 0,
      province: "KHO",
    });
    tempData.push({
      id: "SL_HD_GPS_KHDN",
      value: EXEC_SL_HD_GPS_KHDN.DLA ? EXEC_SL_HD_GPS_KHDN.DLA : 0,
      province: "DLA",
    });
    tempData.push({
      id: "SL_HD_GPS_KHDN",
      value: EXEC_SL_HD_GPS_KHDN.GLA ? EXEC_SL_HD_GPS_KHDN.GLA : 0,
      province: "GLA",
    });
    tempData.push({
      id: "SL_HD_GPS_KHDN",
      value: EXEC_SL_HD_GPS_KHDN.PYE ? EXEC_SL_HD_GPS_KHDN.PYE : 0,
      province: "PYE",
    });
    tempData.push({
      id: "SL_HD_GPS_KHDN",
      value: EXEC_SL_HD_GPS_KHDN.DNO ? EXEC_SL_HD_GPS_KHDN.DNO : 0,
      province: "DNO",
    });
    tempData.push({
      id: "SL_HD_GPS_KHDN",
      value: EXEC_SL_HD_GPS_KHDN.KON ? EXEC_SL_HD_GPS_KHDN.KON : 0,
      province: "KON",
    });
    tempData.push({
      id: "SL_HD_GPS_KHDN",
      value: EXEC_SL_HD_GPS_KHDN.CTY7 ? EXEC_SL_HD_GPS_KHDN.CTY7 : 0,
      province: "CTY7",
    });
    setDataSL_HD_GPS_KHDN(tempData);
  };
  const setInitTYLEGDC2C = () => {
    let tempData = [];
    tempData.push({
      id: "TYLE_GD_C2C",
      value: EXEC_TYLE_GD_C2C.KHO ? EXEC_TYLE_GD_C2C.KHO : 0,
      province: "KHO",
    });
    tempData.push({
      id: "TYLE_GD_C2C",
      value: EXEC_TYLE_GD_C2C.DLA ? EXEC_TYLE_GD_C2C.DLA : 0,
      province: "DLA",
    });
    tempData.push({
      id: "TYLE_GD_C2C",
      value: EXEC_TYLE_GD_C2C.GLA ? EXEC_TYLE_GD_C2C.GLA : 0,
      province: "GLA",
    });
    tempData.push({
      id: "TYLE_GD_C2C",
      value: EXEC_TYLE_GD_C2C.PYE ? EXEC_TYLE_GD_C2C.PYE : 0,
      province: "PYE",
    });
    tempData.push({
      id: "TYLE_GD_C2C",
      value: EXEC_TYLE_GD_C2C.DNO ? EXEC_TYLE_GD_C2C.DNO : 0,
      province: "DNO",
    });
    tempData.push({
      id: "TYLE_GD_C2C",
      value: EXEC_TYLE_GD_C2C.KON ? EXEC_TYLE_GD_C2C.KON : 0,
      province: "KON",
    });
    tempData.push({
      id: "TYLE_GD_C2C",
      value: EXEC_TYLE_GD_C2C.CTY7 ? EXEC_TYLE_GD_C2C.CTY7 : 0,
      province: "CTY7",
    });
    setDataTYLEGDC2C(tempData);
  };
  const getExecKpi = (month) => {
    setLoadingExecKpi(true);
    handleGetExecKpi(month).then(async (res) => {
      setLoadingExecKpi(false);
      resetFiber();
      resetCloudDC();
      resetMass();
      resetDuan();
      resetGps();
      resetDNSDGP();
      resetTBPlatTT();
      resetSLC2C();
      resetSL_HD_GPS_KHDN();

      resetTYLEGDC2C();
      const data = await res.json();
      if (data && data.result) {
        if (data.result.length > 0) {
          data.result.map((object, index) => {
            if (object["TEN_CHI_TIEU"] == "DTHU_FIBER") {
              SET_EXEC_DTHU_FIBER(object);
              if (object["LAST_DATE"]) {
                setDateUpdateFiber(new Date(object["LAST_DATE"]));
              }
            }
            if (object["TEN_CHI_TIEU"] == "DTHU_CLOUD_DC") {
              SET_EXEC_DTHU_CLOUD_DC(object);
              if (object["LAST_DATE"]) {
                setDateUpdateCloudDC(new Date(object["LAST_DATE"]));
              }
            }
            if (object["TEN_CHI_TIEU"] == "DTHU_MASS") {
              SET_EXEC_DTHU_MASS(object);
              if (object["LAST_DATE"]) {
                setDateUpdateDthuMass(new Date(object["LAST_DATE"]));
              }
            }
            if (object["TEN_CHI_TIEU"] == "DTHU_DUAN") {
              SET_EXEC_DTHU_DUAN(object);
              if (object["LAST_DATE"]) {
                setDateUpdateDthuDuan(new Date(object["LAST_DATE"]));
              }
            }
            if (object["TEN_CHI_TIEU"] == "DTHU_GPS_KGM") {
              SET_EXEC_DTHU_GPS_KGM(object);
              if (object["LAST_DATE"]) {
                setDateUpdateDthuGps(new Date(object["LAST_DATE"]));
              }
            }
            if (object["TEN_CHI_TIEU"] == "TI_LE_DN_SU_DUNG_GP_MBF") {
              SET_EXEC_TI_LE_DN_SU_DUNG_GP_MBF(object);
              if (object["LAST_DATE"]) {
                setDateUpdateGpMbf(new Date(object["LAST_DATE"]));
              }
            }
            if (object["TEN_CHI_TIEU"] == "TB_PLAT_TT") {
              SET_EXEC_TB_PLAT_TT(object);
              if (object["LAST_DATE"]) {
                setDateUpdateTbPlatTT(new Date(object["LAST_DATE"]));
              }
            }
            if (object["TEN_CHI_TIEU"] == "SL_C2C") {
              SET_EXEC_SL_C2C(object);
              if (object["LAST_DATE"]) {
                setDateUpdateSLC2C(new Date(object["LAST_DATE"]));
              }
            }
            if (object["TEN_CHI_TIEU"] == "SL_HD_GPS_KHDN") {
              console.log("object khdn", object);
              SET_EXEC_SL_HD_GPS_KHDN(object);
              if (object["LAST_DATE"]) {
                setDateUpdateSL_HD_GPS_KHDN(new Date(object["LAST_DATE"]));
              }
            }
            if (object["TEN_CHI_TIEU"] == "TYLE_GD_C2C") {
              SET_EXEC_TYLE_GD_C2C(object);
              if (object["LAST_DATE"]) {
                setDateUpdateTYLEGDC2C(new Date(object["LAST_DATE"]));
              }
            }
          });
        }
      }
    });
  };
  const resetFiber = () => {
    SET_EXEC_DTHU_FIBER(initDataFiber);
  };
  const resetCloudDC = () => {
    SET_EXEC_DTHU_CLOUD_DC(initDataCloudDC);
  };
  const resetDuan = () => {
    SET_EXEC_DTHU_DUAN(initDataDuan);
  };
  const resetMass = () => {
    SET_EXEC_DTHU_MASS(initDataMass);
  };
  const resetGps = () => {
    SET_EXEC_DTHU_GPS_KGM(initDataGps);
  };
  const resetDNSDGP = () => {
    SET_EXEC_TI_LE_DN_SU_DUNG_GP_MBF(initDNSDGP);
  };
  const resetTBPlatTT = () => {
    SET_EXEC_TB_PLAT_TT(initTbPlatTT);
  };
  const resetSLC2C = () => {
    SET_EXEC_SL_C2C(initSLC2C);
  };
  const resetSL_HD_GPS_KHDN = () => {
    SET_EXEC_SL_HD_GPS_KHDN(initSL_HD_GPS_KHDN);
  };
  const resetTYLEGDC2C = () => {
    SET_EXEC_TYLE_GD_C2C(initTYLEGDC2C);
  };

  const handleValueUpdate = (id, valueInput, province) => {
    if (id == "DTHU_FIBER") {
      const tempData = dataFiber.map((object) => {
        if (object.province == province) {
          return {
            ...object,
            value: valueInput,
          };
        } else return object;
      });
      setDataFiber(tempData);
    } else if (id == "DTHU_CLOUD_DC") {
      const tempData = dataCloudDC.map((object) => {
        if (object.province == province) {
          return {
            ...object,
            value: valueInput,
          };
        } else return object;
      });
      setDataCloudDC(tempData);
    } else if (id == "DTHU_MASS") {
      const tempData = dataMass.map((object) => {
        if (object.province == province) {
          return {
            ...object,
            value: valueInput,
          };
        } else return object;
      });
      setDataMass(tempData);
    } else if (id == "DTHU_DUAN") {
      const tempData = dataDuan.map((object) => {
        if (object.province == province) {
          return {
            ...object,
            value: valueInput,
          };
        } else return object;
      });
      setDataDuan(tempData);
    } else if (id == "DTHU_GPS_KGM") {
      const tempData = dataGps.map((object) => {
        if (object.province == province) {
          return {
            ...object,
            value: valueInput,
          };
        } else return object;
      });
      setDataGps(tempData);
    } else if (id == "TI_LE_DN_SU_DUNG_GP_MBF") {
      const tempData = dataDNSDGP.map((object) => {
        if (object.province == province) {
          return {
            ...object,
            value: valueInput,
          };
        } else return object;
      });
      setDataDNSDGP(tempData);
    } else if (id == "TB_PLAT_TT") {
      const tempData = dataTbPlatTT.map((object) => {
        if (object.province == province) {
          return {
            ...object,
            value: valueInput,
          };
        } else return object;
      });
      setDataTbPlatTT(tempData);
    } else if (id == "SL_C2C") {
      const tempData = dataSLC2C.map((object) => {
        if (object.province == province) {
          return {
            ...object,
            value: valueInput,
          };
        } else return object;
      });
      setDataSLC2C(tempData);
    } else if (id == "SL_HD_GPS_KHDN") {
      const tempData = dataSL_HD_GPS_KHDN.map((object) => {
        if (object.province == province) {
          return {
            ...object,
            value: valueInput,
          };
        } else return object;
      });
      setDataSL_HD_GPS_KHDN(tempData);
    } else if (id == "TYLE_GD_C2C") {
      const tempData = dataTYLEGDC2C.map((object) => {
        if (object.province == province) {
          return {
            ...object,
            value: valueInput,
          };
        } else return object;
      });
      setDataTYLEGDC2C(tempData);
    }
  };

  if (!mounted) return <></>;

  return (
    <Modal
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      animation={false}
      show={show}
      onHide={handleClose}
    >
      <Modal.Header closeButton>
        <Modal.Title>Thêm Kpi đã thực hiện</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Formik
          enableReinitialize={true}
          initialValues={initKpiValues}
          validationSchema={formKpiSchema}
          onSubmit={async (values, { resetForm }) => {
            const tempDataFiber = dataFiber.map((object, index) => {
              return {
                ...object,
                value: object.value ? object.value * 1000000 : 0,
              };
            });
            const tempDataCloudDC = dataCloudDC.map((object, index) => {
              return {
                ...object,
                value: object.value ? object.value * 1000000 : 0,
              };
            });
            const tempDataMass = dataMass.map((object, index) => {
              return {
                ...object,
                value: object.value ? object.value * 1000000 : 0,
              };
            });

            const tempDataDuan = dataDuan.map((object, index) => {
              return {
                ...object,
                value: object.value ? object.value * 1000000 : 0,
              };
            });
            const tempDataGps = dataGps.map((object, index) => {
              return {
                ...object,
                value: object.value ? object.value * 1000000 : 0,
              };
            });

            const tempDataDNSDGP = dataDNSDGP.map((object, index) => {
              return {
                ...object,
                value: object.value ? object.value : 0,
              };
            });

            const tempDataTbPlatTT = dataTbPlatTT.map((object, index) => {
              return {
                ...object,
                value: object.value ? object.value : 0,
              };
            });

            const tempDataSLC2C = dataSLC2C.map((object, index) => {
              return {
                ...object,
                value: object.value ? object.value : 0,
              };
            });
            const tempDataSL_HD_GPS_KHDN = dataSL_HD_GPS_KHDN.map(
              (object, index) => {
                return {
                  ...object,
                  value: object.value ? object.value : 0,
                };
              }
            );
            const tempDataTYLEGDC2C = dataTYLEGDC2C.map((object, index) => {
              return {
                ...object,
                value: object.value ? object.value : 0,
              };
            });
            const now = new Date();
            if (
              now.getMonth() !== values.selectKpiMonth.getMonth() ||
              now.getFullYear() != values.selectKpiMonth.getFullYear()
            ) {
              setErrorDiv("Chỉ được tạo kpi cho tháng hiện tại");
              return;
            }else {
              setErrorDiv("");
            }
            try {
              const info = {
                month: moment(values.selectKpiMonth).format("DD-MM-YYYY"),
                kpiList: tempDataFiber.concat(
                  tempDataCloudDC,
                  tempDataMass,
                  tempDataDuan,
                  tempDataGps,
                  tempDataDNSDGP,
                  tempDataTbPlatTT,
                  tempDataSLC2C,
                  tempDataSL_HD_GPS_KHDN,
                  tempDataTYLEGDC2C
                ),
                dateUpdateFiber: dateUpdateFiber.toISOString(),
                dateUpdateCloudDC: dateUpdateCloudDC.toISOString(),
                dateUpdateDthuMass: dateUpdateDthuMass.toISOString(),
                dateUpdateDthuDuan: dateUpdateDthuDuan.toISOString(),
                dateUpdateDthuGps: dateUpdateDthuGps.toISOString(),
                dateUpdateTbPlatTT: dateUpdateTbPlatTT.toISOString(),
                dateUpdateGpMbf: dateUpdateGpMbf.toISOString(),
                dateUpdateSLC2C: dateUpdateSLC2C.toISOString(),
                dateUpdateSL_HD_GPS_KHDN:
                  dateUpdateSL_HD_GPS_KHDN.toISOString(),
                dateUpdateTYLEGDC2C: dateUpdateTYLEGDC2C.toISOString(),
              };
              setLoadingCreateManualKpi(true);
              const result = await createManualApiList(info);
              setLoadingCreateManualKpi(false);
              const isCreated = await result.json();
              if (isCreated) {
                handleClose();
              }
            } catch (error) {
              console.log("error", error);
            }
          }}
        >
          {(formikProps) => {
            return (
              <div className="select-filter form-group">
                <div className="d-flex">
                  <label
                    htmlFor="selectKpiMonth"
                    className="form-label fs-6 fw-bold text-dark me-2 mt-2"
                  >
                    Tháng
                  </label>
                  <DatePickerField
                    showMonthYearPicker={true}
                    name={`selectKpiMonth`}
                    dateFormat="MM/yyyy"
                    disabled={false}
                    callbackSetDate={(e) => {
                      const date = changeFormatDateFirstDateInMonth(e);
                      getExecKpi(date);
                      setInitKpiValues({
                        ...initKpiValues,
                        selectKpiMonth: e,
                      });
                    }}
                  ></DatePickerField>
                </div>
                {loadingExecKpi ? (
                  <div className="d-flex justify-content-center align-items-center">
                    <LoadingComponent />
                  </div>
                ) : (
                  <div className=" table-create-kpi">
                    <table className="table-responsive align-middle gs-0 gy-3">
                      <thead>
                        <tr className="table-head">
                          <th>
                            {" "}
                            <span style={{ whiteSpace: "nowrap" }}>
                              {" "}
                              Kpi đã thực hiện
                            </span>{" "}
                          </th>
                          <th>
                            {" "}
                            <span
                              style={{
                                paddingLeft: "10px",
                                paddingRight: "10px",
                                whiteSpace: "nowrap",
                              }}
                            >
                              {" "}
                              Đơn vị tính{" "}
                            </span>{" "}
                          </th>
                          <th className="bg-green-secondary">KHO</th>
                          <th className="bg-green-secondary">DLA</th>
                          <th className="bg-green-secondary">GLA</th>
                          <th className="bg-green-secondary">PYE</th>
                          <th className="bg-green-secondary">DNO</th>
                          <th className="bg-green-secondary">KON</th>
                          <th className="bg-green-secondary">Tổng</th>
                          <th className="bg-green-secondary">Ngày cập nhật</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>Dthu Fiber</td>
                          <td>
                            <span
                              style={{
                                paddingLeft: "10px",
                                paddingRight: "10px",
                              }}
                            >
                              triệu đồng
                            </span>
                          </td>
                          {dataFiber &&
                            dataFiber.map((object, index) => (
                              <td key={index + `_fiber`}>
                                <input
                                  type="number"
                                  className="form-control input-kpi"
                                  value={object.value}
                                  onChange={(e) =>
                                    handleValueUpdate(
                                      object.id,
                                      e.target.value,
                                      object.province
                                    )
                                  }
                                />
                              </td>
                            ))}
                          <td className="pt-2">
                            <DatePicker
                              selected={dateUpdateFiber}
                              dateFormat={"dd/MM/yyyy"}
                              onChange={(date) => setDateUpdateFiber(date)}
                              customInput={<CustomDateInput />}
                            />
                          </td>
                        </tr>

                        <tr>
                          <td>Dthu Cloud DC</td>
                          <td>
                            <span
                              style={{
                                paddingLeft: "10px",
                                paddingRight: "10px",
                              }}
                            >
                              triệu đồng
                            </span>
                          </td>
                          {dataCloudDC &&
                            dataCloudDC.map((object, index) => (
                              <td key={index + `_cloud_dc`}>
                                <input
                                  type="number"
                                  className="form-control input-kpi"
                                  value={object.value}
                                  onChange={(e) =>
                                    handleValueUpdate(
                                      object.id,
                                      e.target.value,
                                      object.province
                                    )
                                  }
                                />
                              </td>
                            ))}
                          <td className="pt-2">
                            <DatePicker
                              selected={dateUpdateCloudDC}
                              dateFormat={"dd/MM/yyyy"}
                              onChange={(date) => setDateUpdateCloudDC(date)}
                              customInput={<CustomDateInput />}
                            />
                          </td>
                        </tr>
                        <tr>
                          <td>Dthu Mass</td>
                          <td>
                            <span
                              style={{
                                paddingLeft: "10px",
                                paddingRight: "10px",
                              }}
                            >
                              {" "}
                              triệu đồng
                            </span>
                          </td>
                          {dataMass.map((object, index) => (
                            <td key={index + `_mass`}>
                              <input
                                type="number"
                                className="form-control input-kpi"
                                value={object.value}
                                onChange={(e) =>
                                  handleValueUpdate(
                                    object.id,
                                    e.target.value,
                                    object.province
                                  )
                                }
                              />
                            </td>
                          ))}
                          <td className="pt-2">
                            <DatePicker
                              selected={dateUpdateDthuMass}
                              dateFormat={"dd/MM/yyyy"}
                              onChange={(date) => setDateUpdateDthuMass(date)}
                              customInput={<CustomDateInput />}
                            />
                          </td>
                        </tr>
                        <tr>
                          <td>Dthu Dự án</td>
                          <td>
                            <span
                              style={{
                                paddingLeft: "10px",
                                paddingRight: "10px",
                              }}
                            >
                              triệu đồng
                            </span>
                          </td>
                          {dataDuan.map((object, index) => (
                            <td key={index + `_duan`}>
                              <input
                                className="form-control input-kpi"
                                value={object.value}
                                type="number"
                                onChange={(e) =>
                                  handleValueUpdate(
                                    object.id,
                                    e.target.value,
                                    object.province
                                  )
                                }
                              />
                            </td>
                          ))}
                          <td className="pt-2">
                            <DatePicker
                              selected={dateUpdateDthuDuan}
                              dateFormat={"dd/MM/yyyy"}
                              onChange={(date) => setDateUpdateDthuDuan(date)}
                              customInput={<CustomDateInput />}
                            />
                          </td>
                        </tr>
                        <tr>
                          <td>Dthu GPS</td>
                          <td>
                            <span
                              style={{
                                paddingLeft: "10px",
                                paddingRight: "10px",
                              }}
                            >
                              triệu đồng
                            </span>
                          </td>
                          {dataGps.map((object, index) => (
                            <td key={index + `_gps`}>
                              <input
                                className="form-control input-kpi"
                                value={object.value}
                                type="number"
                                onChange={(e) =>
                                  handleValueUpdate(
                                    object.id,
                                    e.target.value,
                                    object.province
                                  )
                                }
                              />
                            </td>
                          ))}
                          <td className="pt-2">
                            <DatePicker
                              selected={dateUpdateDthuGps}
                              dateFormat={"dd/MM/yyyy"}
                              onChange={(date) => setDateUpdateDthuGps(date)}
                              customInput={<CustomDateInput />}
                            />
                          </td>
                        </tr>
                        <tr>
                          <td>Tỷ lệ DN sử dụng GP MobiFone</td>
                          <td>
                            <span
                              style={{
                                paddingLeft: "10px",
                                paddingRight: "10px",
                              }}
                            >
                              %
                            </span>
                          </td>
                          {dataDNSDGP.map((object, index) => (
                            <td key={index + `_DN`}>
                              <input
                                className="form-control input-kpi"
                                value={object.value}
                                type="number"
                                onChange={(e) =>
                                  handleValueUpdate(
                                    object.id,
                                    e.target.value,
                                    object.province
                                  )
                                }
                              />
                            </td>
                          ))}
                          <td className="pt-2">
                            <DatePicker
                              selected={dateUpdateGpMbf}
                              dateFormat={"dd/MM/yyyy"}
                              onChange={(date) => setDateUpdateGpMbf(date)}
                              customInput={<CustomDateInput />}
                            />
                          </td>
                        </tr>
                        <tr>
                          <td>TB Plat tương tác</td>
                          <td>
                            <span
                              style={{
                                paddingLeft: "10px",
                                paddingRight: "10px",
                              }}
                            >
                              %
                            </span>
                          </td>
                          {dataTbPlatTT.map((object, index) => (
                            <td key={index + `_TB_PLAT`}>
                              <input
                                className="form-control input-kpi"
                                value={object.value}
                                type="number"
                                onChange={(e) =>
                                  handleValueUpdate(
                                    object.id,
                                    e.target.value,
                                    object.province
                                  )
                                }
                              />
                            </td>
                          ))}
                          <td className="pt-2">
                            <DatePicker
                              selected={dateUpdateTbPlatTT}
                              dateFormat={"dd/MM/yyyy"}
                              onChange={(date) => setDateUpdateTbPlatTT(date)}
                              customInput={<CustomDateInput />}
                            />
                          </td>
                        </tr>
                        <tr>
                          <td>Số lượng điểm C2C</td>
                          <td style={{ paddingLeft: "10px" }}>điểm</td>
                          {dataSLC2C.map((object, index) => (
                            <td key={index + `_SL_C2C`}>
                              <input
                                className="form-control input-kpi"
                                value={object.value}
                                type="number"
                                onChange={(e) =>
                                  handleValueUpdate(
                                    object.id,
                                    e.target.value,
                                    object.province
                                  )
                                }
                              />
                            </td>
                          ))}
                          <td className="pt-2">
                            <DatePicker
                              selected={dateUpdateSLC2C}
                              dateFormat={"dd/MM/yyyy"}
                              onChange={(date) => setDateUpdateSLC2C(date)}
                              customInput={<CustomDateInput />}
                            />
                          </td>
                        </tr>
                        <tr>
                          <td>Tỷ Lệ GD C2C</td>
                          <td>
                            <span
                              style={{
                                paddingLeft: "10px",
                                paddingRight: "10px",
                              }}
                            >
                              %
                            </span>
                          </td>
                          {dataTYLEGDC2C.map((object, index) => (
                            <td key={index + `_TYLE_GD_C2C`}>
                              <input
                                className="form-control input-kpi"
                                value={object.value}
                                type="number"
                                onChange={(e) =>
                                  handleValueUpdate(
                                    object.id,
                                    e.target.value,
                                    object.province
                                  )
                                }
                              />
                            </td>
                          ))}
                          <td className="pt-2">
                            <DatePicker
                              selected={dateUpdateTYLEGDC2C}
                              dateFormat={"dd/MM/yyyy"}
                              onChange={(date) => setDateUpdateTYLEGDC2C(date)}
                              customInput={<CustomDateInput />}
                            />
                          </td>
                        </tr>
                        <tr>
                          <td>Số lượng HD GPS KHDN</td>
                          <td style={{ paddingLeft: "10px" }}>điểm</td>
                          {dataSL_HD_GPS_KHDN.map((object, index) => (
                            <td key={index + `_SL_HD_GPS_KHDN`}>
                              <input
                                className="form-control input-kpi"
                                value={object.value}
                                type="number"
                                onChange={(e) =>
                                  handleValueUpdate(
                                    object.id,
                                    e.target.value,
                                    object.province
                                  )
                                }
                              />
                            </td>
                          ))}
                          <td className="pt-2">
                            <DatePicker
                              selected={dateUpdateSLC2C}
                              dateFormat={"dd/MM/yyyy"}
                              onChange={(date) => setDateUpdateSLC2C(date)}
                              customInput={<CustomDateInput />}
                            />
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                )}

                <div className="mt-4 d-flex justify-content-around">
                  <Button variant="secondary" onClick={handleClose}>
                    Close
                  </Button>

                  <Button variant="primary" onClick={formikProps.handleSubmit}>
                    {loadingCreateManualKpi ? "Saving ..." : "Save"}
                  </Button>
                </div>
                {errorDiv && (
                  <div className="alert alert-danger mt-3" role="alert">
                    {errorDiv}
                  </div>
                )}
              </div>
            );
          }}
        </Formik>
      </Modal.Body>
    </Modal>
  );
};

export default CreateKpiT08Modal;
