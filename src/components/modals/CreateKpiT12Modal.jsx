"use client";
import React, { useEffect, useState } from "react";
import LoadingComponent from "@components/loading/LoadingComponent";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import moment from "moment";
import { ErrorMessage, Form, Formik } from "formik";
import "react-datepicker/dist/react-datepicker.css";
import { DatePickerField } from "../widgets/datePickers/DatePickerField.tsx";
import * as Yup from "yup";
import "bootstrap/dist/css/bootstrap.min.css";
import MySelectSingle from "@components/selects/MySelectSingle";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import { changeFormatDateFirstDateInMonth } from "../../until/functions.js";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import CustomDateInput from "../widgets/datePickers/CustomDateInput.tsx";
import {
  handleGetExecKpiDLA,
  createManualApiList,
  createManualApiListDLA,
} from "../../lib/api.ts";
import {
  initDataFiber,
  initDataGPS,
  initDataGPSKHCN,
  initDataGPSKHDN,
  initSLTBC2C,
  initTYLEGDC2C,
} from "../../lib/dlaData.ts";
var x = new Date();
const INIT_KPI_VALUES = {
  selectKpiMonth: x,
};

const CreateKpiT12Modal = (props) => {
  const [initKpiValues, setInitKpiValues] = useState(INIT_KPI_VALUES);
  const [loadingCreateManualKpi, setLoadingCreateManualKpi] = useState(false);
  const [loadingExecKpi, setLoadingExecKpi] = useState(false);
  const [show, setShow] = useState(props.show);
  const [mounted, setMounted] = useState(false);
  const [dataFiber, setDataFiber] = useState(initDataFiber);
  const [dataGPS, setDataGPS] = useState(initDataGPS);
  const [dataGPSKHCN, setDataGPSKHCN] = useState(initDataGPSKHCN);
  const [dataGPSKHDN, setDataGPSKHDN] = useState(initDataGPSKHDN);
  // const [dataSLTBC2C, setSLTBC2C] = useState(initSLTBC2C);
  const [dataTYLEGDC2C, setTYLEGDC2C] = useState(initTYLEGDC2C);
  const [EXEC_DTHU_FIBER, SET_EXEC_DTHU_FIBER] = useState({});
  const [EXEC_DTHU_GPS, SET_EXEC_DTHU_GPS] = useState({});
  const [EXEC_DTHU_GPS_KHCN, SET_EXEC_DTHU_GPS_KHCN] = useState({});
  const [EXEC_DTHU_GPS_KHDN, SET_EXEC_DTHU_GPS_KHDN] = useState({});
  const [EXEC_SL_TB_C2C, SET_EXEC_SL_TB_C2C] = useState({ initSLTBC2C });
  const [EXEC_TYLE_GD_C2C, SET_EXEC_TYLE_GD_C2C] = useState({ initTYLEGDC2C });
  const [dateUpdateFiber, setDateUpdateFiber] = useState(new Date());
  const [dateUpdateGPS, setDateUpdateGPS] = useState(new Date());
  const [dateUpdateGPSKHCN, setDateUpdateGPSKHCN] = useState(new Date());
  const [dateUpdateGPSKHDN, setDateUpdateGPSKHDN] = useState(new Date());
  const [dateUpdateSLTBC2C, setDateUpdateSLTBC2C] = useState(new Date());
  const [dateUpdateTYLEGDC2C, setDateUpdateTYLEGDC2C] = useState(new Date());
  const [errorDiv, setErrorDiv] = useState("");
  const handleClose = async (e) => {
    props.handleClose();
  };

  useEffect(() => {
    setShow(props.show);
  }, [props.show]);

  useEffect(() => {
    setMounted(true);
  }, []);
  useEffect(() => {
    getExecKpi(changeFormatDateFirstDateInMonth(x));
  }, []);
  const formKpiSchema = Yup.object().shape({});

  useEffect(() => {
    if (Object.keys(EXEC_DTHU_FIBER).length > 0) {
      setInitFiber();
    }
    if (Object.keys(EXEC_DTHU_GPS).length > 0) {
      setInitGPS();
    }

    if (Object.keys(EXEC_DTHU_GPS_KHCN).length > 0) {
      setInitGPSKHCN();
    }
    if (Object.keys(EXEC_DTHU_GPS_KHDN).length > 0) {
      setInitGPSKHDN();
    }
    // if (Object.keys(EXEC_SL_TB_C2C).length > 0) {
    //   setInitSLTBC2C();
    // }
    if (Object.keys(EXEC_TYLE_GD_C2C).length > 0) {
      setInitTYLEGDC2C();
    }
  }, [
    EXEC_DTHU_FIBER,
    EXEC_DTHU_GPS,
    EXEC_DTHU_GPS_KHCN,
    EXEC_DTHU_GPS_KHDN,
    EXEC_SL_TB_C2C,
    EXEC_TYLE_GD_C2C,
  ]);
  const setInitFiber = () => {
    let tempData = [];

    tempData.push({
      id: "DTHU_FIBER",
      value: EXEC_DTHU_FIBER.DLA_T01 ? EXEC_DTHU_FIBER.DLA_T01 : 0,
      area: "DLA_T01",
    });
    tempData.push({
      id: "DTHU_FIBER",
      value: EXEC_DTHU_FIBER.DLA_T02 ? EXEC_DTHU_FIBER.DLA_T02 : 0,
      area: "DLA_T02",
    });
    tempData.push({
      id: "DTHU_FIBER",
      value: EXEC_DTHU_FIBER.DLA_T03 ? EXEC_DTHU_FIBER.DLA_T03 : 0,
      area: "DLA_T03",
    });
    tempData.push({
      id: "DTHU_FIBER",
      value: EXEC_DTHU_FIBER.DLA_T04 ? EXEC_DTHU_FIBER.DLA_T04 : 0,
      area: "DLA_T04",
    });
    tempData.push({
      id: "DTHU_FIBER",
      value: EXEC_DTHU_FIBER.DLA_T05 ? EXEC_DTHU_FIBER.DLA_T05 : 0,
      area: "DLA_T05",
    });
    tempData.push({
      id: "DTHU_FIBER",
      value: EXEC_DTHU_FIBER.DLA_T06 ? EXEC_DTHU_FIBER.DLA_T06 : 0,
      area: "DLA_T06",
    });
    tempData.push({
      id: "DTHU_FIBER",
      value: EXEC_DTHU_FIBER.DLA_T07 ? EXEC_DTHU_FIBER.DLA_T07 : 0,
      area: "DLA_T07",
    });
    tempData.push({
      id: "DTHU_FIBER",
      value: EXEC_DTHU_FIBER.DLA_T08 ? EXEC_DTHU_FIBER.DLA_T08 : 0,
      area: "DLA_T08",
    });
    tempData.push({
      id: "DTHU_FIBER",
      value: EXEC_DTHU_FIBER.DLA_T09 ? EXEC_DTHU_FIBER.DLA_T09 : 0,
      area: "DLA_T09",
    });
    tempData.push({
      id: "DTHU_FIBER",
      value: EXEC_DTHU_FIBER.DLA_T10 ? EXEC_DTHU_FIBER.DLA_T10 : 0,
      area: "DLA_T10",
    });
    tempData.push({
      id: "DTHU_FIBER",
      value: EXEC_DTHU_FIBER.DLA_T11 ? EXEC_DTHU_FIBER.DLA_T11 : 0,
      area: "DLA_T11",
    });
    tempData.push({
      id: "DTHU_FIBER",
      value: EXEC_DTHU_FIBER.DLA_T12 ? EXEC_DTHU_FIBER.DLA_T12 : 0,
      area: "DLA_T12",
    });
    tempData.push({
      id: "DTHU_FIBER",
      value: EXEC_DTHU_FIBER.DLA_T13 ? EXEC_DTHU_FIBER.DLA_T13 : 0,
      area: "DLA_T13",
    });
    tempData.push({
      id: "DTHU_FIBER",
      value: EXEC_DTHU_FIBER.DLA_D01 ? EXEC_DTHU_FIBER.DLA_D01 : 0,
      area: "DLA_D01",
    });
    tempData.push({
      id: "DTHU_FIBER",
      value: EXEC_DTHU_FIBER.DLA_D02 ? EXEC_DTHU_FIBER.DLA_D02 : 0,
      area: "DLA_D02",
    });
    tempData.push({
      id: "DTHU_FIBER",
      value: EXEC_DTHU_FIBER.DLA_D03 ? EXEC_DTHU_FIBER.DLA_D03 : 0,
      area: "DLA_D03",
    });
    tempData.push({
      id: "DTHU_FIBER",
      value: EXEC_DTHU_FIBER.DLA_D04 ? EXEC_DTHU_FIBER.DLA_D04 : 0,
      area: "DLA_D04",
    });
    tempData.push({
      id: "DTHU_FIBER",
      value: EXEC_DTHU_FIBER.DLA_D05 ? EXEC_DTHU_FIBER.DLA_D05 : 0,
      area: "DLA_D05",
    });
    tempData.push({
      id: "DTHU_FIBER",
      value: EXEC_DTHU_FIBER.DLA_D06 ? EXEC_DTHU_FIBER.DLA_D06 : 0,
      area: "DLA_D06",
    });
    tempData.push({
      id: "DTHU_FIBER",
      value: EXEC_DTHU_FIBER.TTKDVT ? EXEC_DTHU_FIBER.TTKDVT : 0,
      area: "TTKDVT",
    });
    tempData.push({
      id: "DTHU_FIBER",
      value: EXEC_DTHU_FIBER.TTKDGPS ? EXEC_DTHU_FIBER.TTKDGPS : 0,
      area: "TTKDGPS",
    });

    setDataFiber(tempData);
  };
  const setInitGPS = () => {
    let tempData = [];

    tempData.push({
      id: "DTHU_GPS",
      value: EXEC_DTHU_GPS.DLA_T01 ? EXEC_DTHU_GPS.DLA_T01 : 0,
      area: "DLA_T01",
    });
    tempData.push({
      id: "DTHU_GPS",
      value: EXEC_DTHU_GPS.DLA_T02 ? EXEC_DTHU_GPS.DLA_T02 : 0,
      area: "DLA_T02",
    });
    tempData.push({
      id: "DTHU_GPS",
      value: EXEC_DTHU_GPS.DLA_T03 ? EXEC_DTHU_GPS.DLA_T03 : 0,
      area: "DLA_T03",
    });
    tempData.push({
      id: "DTHU_GPS",
      value: EXEC_DTHU_GPS.DLA_T04 ? EXEC_DTHU_GPS.DLA_T04 : 0,
      area: "DLA_T04",
    });
    tempData.push({
      id: "DTHU_GPS",
      value: EXEC_DTHU_GPS.DLA_T05 ? EXEC_DTHU_GPS.DLA_T05 : 0,
      area: "DLA_T05",
    });
    tempData.push({
      id: "DTHU_GPS",
      value: EXEC_DTHU_GPS.DLA_T06 ? EXEC_DTHU_GPS.DLA_T06 : 0,
      area: "DLA_T06",
    });
    tempData.push({
      id: "DTHU_GPS",
      value: EXEC_DTHU_GPS.DLA_T07 ? EXEC_DTHU_GPS.DLA_T07 : 0,
      area: "DLA_T07",
    });
    tempData.push({
      id: "DTHU_GPS",
      value: EXEC_DTHU_GPS.DLA_T08 ? EXEC_DTHU_GPS.DLA_T08 : 0,
      area: "DLA_T08",
    });
    tempData.push({
      id: "DTHU_GPS",
      value: EXEC_DTHU_GPS.DLA_T09 ? EXEC_DTHU_GPS.DLA_T09 : 0,
      area: "DLA_T09",
    });
    tempData.push({
      id: "DTHU_GPS",
      value: EXEC_DTHU_GPS.DLA_T10 ? EXEC_DTHU_GPS.DLA_T10 : 0,
      area: "DLA_T10",
    });
    tempData.push({
      id: "DTHU_GPS",
      value: EXEC_DTHU_GPS.DLA_T11 ? EXEC_DTHU_GPS.DLA_T11 : 0,
      area: "DLA_T11",
    });
    tempData.push({
      id: "DTHU_GPS",
      value: EXEC_DTHU_GPS.DLA_T12 ? EXEC_DTHU_GPS.DLA_T12 : 0,
      area: "DLA_T12",
    });
    tempData.push({
      id: "DTHU_GPS",
      value: EXEC_DTHU_GPS.DLA_T13 ? EXEC_DTHU_GPS.DLA_T13 : 0,
      area: "DLA_T13",
    });
    tempData.push({
      id: "DTHU_GPS",
      value: EXEC_DTHU_GPS.DLA_D01 ? EXEC_DTHU_GPS.DLA_D01 : 0,
      area: "DLA_D01",
    });
    tempData.push({
      id: "DTHU_GPS",
      value: EXEC_DTHU_GPS.DLA_D02 ? EXEC_DTHU_GPS.DLA_D02 : 0,
      area: "DLA_D02",
    });
    tempData.push({
      id: "DTHU_GPS",
      value: EXEC_DTHU_GPS.DLA_D03 ? EXEC_DTHU_GPS.DLA_D03 : 0,
      area: "DLA_D03",
    });
    tempData.push({
      id: "DTHU_GPS",
      value: EXEC_DTHU_GPS.DLA_D04 ? EXEC_DTHU_GPS.DLA_D04 : 0,
      area: "DLA_D04",
    });
    tempData.push({
      id: "DTHU_GPS",
      value: EXEC_DTHU_GPS.DLA_D05 ? EXEC_DTHU_GPS.DLA_D05 : 0,
      area: "DLA_D05",
    });
    tempData.push({
      id: "DTHU_GPS",
      value: EXEC_DTHU_GPS.DLA_D06 ? EXEC_DTHU_GPS.DLA_D06 : 0,
      area: "DLA_D06",
    });
    tempData.push({
      id: "DTHU_GPS",
      value: EXEC_DTHU_GPS.TTKDVT ? EXEC_DTHU_GPS.TTKDVT : 0,
      area: "TTKDVT",
    });
    tempData.push({
      id: "DTHU_GPS",
      value: EXEC_DTHU_GPS.TTKDGPS ? EXEC_DTHU_GPS.TTKDGPS : 0,
      area: "TTKDGPS",
    });
    setDataGPS(tempData);
  };
  const setInitGPSKHCN = () => {
    let tempData = [];

    tempData.push({
      id: "DTHU_GPS_KHCN",
      value: EXEC_DTHU_GPS_KHCN.DLA_T01 ? EXEC_DTHU_GPS_KHCN.DLA_T01 : 0,
      area: "DLA_T01",
    });
    tempData.push({
      id: "DTHU_GPS_KHCN",
      value: EXEC_DTHU_GPS_KHCN.DLA_T02 ? EXEC_DTHU_GPS_KHCN.DLA_T02 : 0,
      area: "DLA_T02",
    });
    tempData.push({
      id: "DTHU_GPS_KHCN",
      value: EXEC_DTHU_GPS_KHCN.DLA_T03 ? EXEC_DTHU_GPS_KHCN.DLA_T03 : 0,
      area: "DLA_T03",
    });
    tempData.push({
      id: "DTHU_GPS_KHCN",
      value: EXEC_DTHU_GPS_KHCN.DLA_T04 ? EXEC_DTHU_GPS_KHCN.DLA_T04 : 0,
      area: "DLA_T04",
    });
    tempData.push({
      id: "DTHU_GPS_KHCN",
      value: EXEC_DTHU_GPS_KHCN.DLA_T05 ? EXEC_DTHU_GPS_KHCN.DLA_T05 : 0,
      area: "DLA_T05",
    });
    tempData.push({
      id: "DTHU_GPS_KHCN",
      value: EXEC_DTHU_GPS_KHCN.DLA_T06 ? EXEC_DTHU_GPS_KHCN.DLA_T06 : 0,
      area: "DLA_T06",
    });
    tempData.push({
      id: "DTHU_GPS_KHCN",
      value: EXEC_DTHU_GPS_KHCN.DLA_T07 ? EXEC_DTHU_GPS_KHCN.DLA_T07 : 0,
      area: "DLA_T07",
    });
    tempData.push({
      id: "DTHU_GPS_KHCN",
      value: EXEC_DTHU_GPS_KHCN.DLA_T08 ? EXEC_DTHU_GPS_KHCN.DLA_T08 : 0,
      area: "DLA_T08",
    });
    tempData.push({
      id: "DTHU_GPS_KHCN",
      value: EXEC_DTHU_GPS_KHCN.DLA_T09 ? EXEC_DTHU_GPS_KHCN.DLA_T09 : 0,
      area: "DLA_T09",
    });
    tempData.push({
      id: "DTHU_GPS_KHCN",
      value: EXEC_DTHU_GPS_KHCN.DLA_T10 ? EXEC_DTHU_GPS_KHCN.DLA_T10 : 0,
      area: "DLA_T10",
    });
    tempData.push({
      id: "DTHU_GPS_KHCN",
      value: EXEC_DTHU_GPS_KHCN.DLA_T11 ? EXEC_DTHU_GPS_KHCN.DLA_T11 : 0,
      area: "DLA_T11",
    });
    tempData.push({
      id: "DTHU_GPS_KHCN",
      value: EXEC_DTHU_GPS_KHCN.DLA_T12 ? EXEC_DTHU_GPS_KHCN.DLA_T12 : 0,
      area: "DLA_T12",
    });
    tempData.push({
      id: "DTHU_GPS_KHCN",
      value: EXEC_DTHU_GPS_KHCN.DLA_T13 ? EXEC_DTHU_GPS_KHCN.DLA_T13 : 0,
      area: "DLA_T13",
    });
    tempData.push({
      id: "DTHU_GPS_KHCN",
      value: EXEC_DTHU_GPS_KHCN.DLA_D01 ? EXEC_DTHU_GPS_KHCN.DLA_D01 : 0,
      area: "DLA_D01",
    });
    tempData.push({
      id: "DTHU_GPS_KHCN",
      value: EXEC_DTHU_GPS_KHCN.DLA_D02 ? EXEC_DTHU_GPS_KHCN.DLA_D02 : 0,
      area: "DLA_D02",
    });
    tempData.push({
      id: "DTHU_GPS_KHCN",
      value: EXEC_DTHU_GPS_KHCN.DLA_D03 ? EXEC_DTHU_GPS_KHCN.DLA_D03 : 0,
      area: "DLA_D03",
    });
    tempData.push({
      id: "DTHU_GPS_KHCN",
      value: EXEC_DTHU_GPS_KHCN.DLA_D04 ? EXEC_DTHU_GPS_KHCN.DLA_D04 : 0,
      area: "DLA_D04",
    });
    tempData.push({
      id: "DTHU_GPS_KHCN",
      value: EXEC_DTHU_GPS_KHCN.DLA_D05 ? EXEC_DTHU_GPS_KHCN.DLA_D05 : 0,
      area: "DLA_D05",
    });
    tempData.push({
      id: "DTHU_GPS_KHCN",
      value: EXEC_DTHU_GPS_KHCN.DLA_D06 ? EXEC_DTHU_GPS_KHCN.DLA_D06 : 0,
      area: "DLA_D06",
    });
    tempData.push({
      id: "DTHU_GPS_KHCN",
      value: EXEC_DTHU_GPS_KHCN.TTKDVT ? EXEC_DTHU_GPS_KHCN.TTKDVT : 0,
      area: "TTKDVT",
    });
    tempData.push({
      id: "DTHU_GPS_KHCN",
      value: EXEC_DTHU_GPS_KHCN.TTKDGPS ? EXEC_DTHU_GPS_KHCN.TTKDGPS : 0,
      area: "TTKDGPS",
    });
    setDataGPSKHCN(tempData);
  };

  const setInitGPSKHDN = () => {
    let tempData = [];

    tempData.push({
      id: "DTHU_GPS_KHDN",
      value: EXEC_DTHU_GPS_KHDN.DLA_T01 ? EXEC_DTHU_GPS_KHDN.DLA_T01 : 0,
      area: "DLA_T01",
    });
    tempData.push({
      id: "DTHU_GPS_KHDN",
      value: EXEC_DTHU_GPS_KHDN.DLA_T02 ? EXEC_DTHU_GPS_KHDN.DLA_T02 : 0,
      area: "DLA_T02",
    });
    tempData.push({
      id: "DTHU_GPS_KHDN",
      value: EXEC_DTHU_GPS_KHDN.DLA_T03 ? EXEC_DTHU_GPS_KHDN.DLA_T03 : 0,
      area: "DLA_T03",
    });
    tempData.push({
      id: "DTHU_GPS_KHDN",
      value: EXEC_DTHU_GPS_KHDN.DLA_T04 ? EXEC_DTHU_GPS_KHDN.DLA_T04 : 0,
      area: "DLA_T04",
    });
    tempData.push({
      id: "DTHU_GPS_KHDN",
      value: EXEC_DTHU_GPS_KHDN.DLA_T05 ? EXEC_DTHU_GPS_KHDN.DLA_T05 : 0,
      area: "DLA_T05",
    });
    tempData.push({
      id: "DTHU_GPS_KHDN",
      value: EXEC_DTHU_GPS_KHDN.DLA_T06 ? EXEC_DTHU_GPS_KHDN.DLA_T06 : 0,
      area: "DLA_T06",
    });
    tempData.push({
      id: "DTHU_GPS_KHDN",
      value: EXEC_DTHU_GPS_KHDN.DLA_T07 ? EXEC_DTHU_GPS_KHDN.DLA_T07 : 0,
      area: "DLA_T07",
    });
    tempData.push({
      id: "DTHU_GPS_KHDN",
      value: EXEC_DTHU_GPS_KHDN.DLA_T08 ? EXEC_DTHU_GPS_KHDN.DLA_T08 : 0,
      area: "DLA_T08",
    });
    tempData.push({
      id: "DTHU_GPS_KHDN",
      value: EXEC_DTHU_GPS_KHDN.DLA_T09 ? EXEC_DTHU_GPS_KHDN.DLA_T09 : 0,
      area: "DLA_T09",
    });
    tempData.push({
      id: "DTHU_GPS_KHDN",
      value: EXEC_DTHU_GPS_KHDN.DLA_T10 ? EXEC_DTHU_GPS_KHDN.DLA_T10 : 0,
      area: "DLA_T10",
    });
    tempData.push({
      id: "DTHU_GPS_KHDN",
      value: EXEC_DTHU_GPS_KHDN.DLA_T11 ? EXEC_DTHU_GPS_KHDN.DLA_T11 : 0,
      area: "DLA_T11",
    });
    tempData.push({
      id: "DTHU_GPS_KHDN",
      value: EXEC_DTHU_GPS_KHDN.DLA_T12 ? EXEC_DTHU_GPS_KHDN.DLA_T12 : 0,
      area: "DLA_T12",
    });
    tempData.push({
      id: "DTHU_GPS_KHDN",
      value: EXEC_DTHU_GPS_KHDN.DLA_T13 ? EXEC_DTHU_GPS_KHDN.DLA_T13 : 0,
      area: "DLA_T13",
    });
    tempData.push({
      id: "DTHU_GPS_KHDN",
      value: EXEC_DTHU_GPS_KHDN.DLA_D01 ? EXEC_DTHU_GPS_KHDN.DLA_D01 : 0,
      area: "DLA_D01",
    });
    tempData.push({
      id: "DTHU_GPS_KHDN",
      value: EXEC_DTHU_GPS_KHDN.DLA_D02 ? EXEC_DTHU_GPS_KHDN.DLA_D02 : 0,
      area: "DLA_D02",
    });
    tempData.push({
      id: "DTHU_GPS_KHDN",
      value: EXEC_DTHU_GPS_KHDN.DLA_D03 ? EXEC_DTHU_GPS_KHDN.DLA_D03 : 0,
      area: "DLA_D03",
    });
    tempData.push({
      id: "DTHU_GPS_KHDN",
      value: EXEC_DTHU_GPS_KHDN.DLA_D04 ? EXEC_DTHU_GPS_KHDN.DLA_D04 : 0,
      area: "DLA_D04",
    });
    tempData.push({
      id: "DTHU_GPS_KHDN",
      value: EXEC_DTHU_GPS_KHDN.DLA_D05 ? EXEC_DTHU_GPS_KHDN.DLA_D05 : 0,
      area: "DLA_D05",
    });
    tempData.push({
      id: "DTHU_GPS_KHDN",
      value: EXEC_DTHU_GPS_KHDN.DLA_D06 ? EXEC_DTHU_GPS_KHDN.DLA_D06 : 0,
      area: "DLA_D06",
    });
    tempData.push({
      id: "DTHU_GPS_KHDN",
      value: EXEC_DTHU_GPS_KHDN.TTKDVT ? EXEC_DTHU_GPS_KHDN.TTKDVT : 0,
      area: "TTKDVT",
    });
    tempData.push({
      id: "DTHU_GPS_KHDN",
      value: EXEC_DTHU_GPS_KHDN.TTKDGPS ? EXEC_DTHU_GPS_KHDN.TTKDGPS : 0,
      area: "TTKDGPS",
    });
    setDataGPSKHDN(tempData);
  };

  // const setInitSLTBC2C = () => {
  //   let tempData = [];

  //   tempData.push({
  //     id: "SL_TB_C2C",
  //     value: EXEC_SL_TB_C2C.DLA_T01 ? EXEC_SL_TB_C2C.DLA_T01 : 0,
  //     area: "DLA_T01",
  //   });
  //   tempData.push({
  //     id: "SL_TB_C2C",
  //     value: EXEC_SL_TB_C2C.DLA_T02 ? EXEC_SL_TB_C2C.DLA_T02 : 0,
  //     area: "DLA_T02",
  //   });
  //   tempData.push({
  //     id: "SL_TB_C2C",
  //     value: EXEC_SL_TB_C2C.DLA_T03 ? EXEC_SL_TB_C2C.DLA_T03 : 0,
  //     area: "DLA_T03",
  //   });
  //   tempData.push({
  //     id: "SL_TB_C2C",
  //     value: EXEC_SL_TB_C2C.DLA_T04 ? EXEC_SL_TB_C2C.DLA_T04 : 0,
  //     area: "DLA_T04",
  //   });
  //   tempData.push({
  //     id: "SL_TB_C2C",
  //     value: EXEC_SL_TB_C2C.DLA_T05 ? EXEC_SL_TB_C2C.DLA_T05 : 0,
  //     area: "DLA_T05",
  //   });
  //   tempData.push({
  //     id: "SL_TB_C2C",
  //     value: EXEC_SL_TB_C2C.DLA_T06 ? EXEC_SL_TB_C2C.DLA_T06 : 0,
  //     area: "DLA_T06",
  //   });
  //   tempData.push({
  //     id: "SL_TB_C2C",
  //     value: EXEC_SL_TB_C2C.DLA_T07 ? EXEC_SL_TB_C2C.DLA_T07 : 0,
  //     area: "DLA_T07",
  //   });
  //   tempData.push({
  //     id: "SL_TB_C2C",
  //     value: EXEC_SL_TB_C2C.DLA_T08 ? EXEC_SL_TB_C2C.DLA_T08 : 0,
  //     area: "DLA_T08",
  //   });
  //   tempData.push({
  //     id: "SL_TB_C2C",
  //     value: EXEC_SL_TB_C2C.DLA_T09 ? EXEC_SL_TB_C2C.DLA_T09 : 0,
  //     area: "DLA_T09",
  //   });
  //   tempData.push({
  //     id: "SL_TB_C2C",
  //     value: EXEC_SL_TB_C2C.DLA_T10 ? EXEC_SL_TB_C2C.DLA_T10 : 0,
  //     area: "DLA_T10",
  //   });
  //   tempData.push({
  //     id: "SL_TB_C2C",
  //     value: EXEC_SL_TB_C2C.DLA_T11 ? EXEC_SL_TB_C2C.DLA_T11 : 0,
  //     area: "DLA_T11",
  //   });
  //   tempData.push({
  //     id: "SL_TB_C2C",
  //     value: EXEC_SL_TB_C2C.DLA_T12 ? EXEC_SL_TB_C2C.DLA_T12 : 0,
  //     area: "DLA_T12",
  //   });
  //   tempData.push({
  //     id: "SL_TB_C2C",
  //     value: EXEC_SL_TB_C2C.DLA_T13 ? EXEC_SL_TB_C2C.DLA_T13 : 0,
  //     area: "DLA_T13",
  //   });
  //   tempData.push({
  //     id: "SL_TB_C2C",
  //     value: EXEC_SL_TB_C2C.DLA_D01 ? EXEC_SL_TB_C2C.DLA_D01 : 0,
  //     area: "DLA_D01",
  //   });
  //   tempData.push({
  //     id: "SL_TB_C2C",
  //     value: EXEC_SL_TB_C2C.DLA_D02 ? EXEC_SL_TB_C2C.DLA_D02 : 0,
  //     area: "DLA_D02",
  //   });
  //   tempData.push({
  //     id: "SL_TB_C2C",
  //     value: EXEC_SL_TB_C2C.DLA_D03 ? EXEC_SL_TB_C2C.DLA_D03 : 0,
  //     area: "DLA_D03",
  //   });
  //   tempData.push({
  //     id: "SL_TB_C2C",
  //     value: EXEC_SL_TB_C2C.DLA_D04 ? EXEC_SL_TB_C2C.DLA_D04 : 0,
  //     area: "DLA_D04",
  //   });
  //   tempData.push({
  //     id: "SL_TB_C2C",
  //     value: EXEC_SL_TB_C2C.DLA_D05 ? EXEC_SL_TB_C2C.DLA_D05 : 0,
  //     area: "DLA_D05",
  //   });
  //   tempData.push({
  //     id: "SL_TB_C2C",
  //     value: EXEC_SL_TB_C2C.DLA_D06 ? EXEC_SL_TB_C2C.DLA_D06 : 0,
  //     area: "DLA_D06",
  //   });
  //   tempData.push({
  //     id: "SL_TB_C2C",
  //     value: EXEC_SL_TB_C2C.TTKDVT ? EXEC_SL_TB_C2C.TTKDVT : 0,
  //     area: "TTKDVT",
  //   });
  //   tempData.push({
  //     id: "SL_TB_C2C",
  //     value: EXEC_SL_TB_C2C.TTKDGPS ? EXEC_SL_TB_C2C.TTKDGPS : 0,
  //     area: "TTKDGPS",
  //   });
  //   setSLTBC2C(tempData);
  // };

  const setInitTYLEGDC2C = () => {
    let tempData = [];

    tempData.push({
      id: "TYLE_GD_C2C",
      value: EXEC_TYLE_GD_C2C.DLA_T01 ? EXEC_TYLE_GD_C2C.DLA_T01 : 0,
      area: "DLA_T01",
    });
    tempData.push({
      id: "TYLE_GD_C2C",
      value: EXEC_TYLE_GD_C2C.DLA_T02 ? EXEC_TYLE_GD_C2C.DLA_T02 : 0,
      area: "DLA_T02",
    });
    tempData.push({
      id: "TYLE_GD_C2C",
      value: EXEC_TYLE_GD_C2C.DLA_T03 ? EXEC_TYLE_GD_C2C.DLA_T03 : 0,
      area: "DLA_T03",
    });
    tempData.push({
      id: "TYLE_GD_C2C",
      value: EXEC_TYLE_GD_C2C.DLA_T04 ? EXEC_TYLE_GD_C2C.DLA_T04 : 0,
      area: "DLA_T04",
    });
    tempData.push({
      id: "TYLE_GD_C2C",
      value: EXEC_TYLE_GD_C2C.DLA_T05 ? EXEC_TYLE_GD_C2C.DLA_T05 : 0,
      area: "DLA_T05",
    });
    tempData.push({
      id: "TYLE_GD_C2C",
      value: EXEC_TYLE_GD_C2C.DLA_T06 ? EXEC_TYLE_GD_C2C.DLA_T06 : 0,
      area: "DLA_T06",
    });
    tempData.push({
      id: "TYLE_GD_C2C",
      value: EXEC_TYLE_GD_C2C.DLA_T07 ? EXEC_TYLE_GD_C2C.DLA_T07 : 0,
      area: "DLA_T07",
    });
    tempData.push({
      id: "TYLE_GD_C2C",
      value: EXEC_TYLE_GD_C2C.DLA_T08 ? EXEC_TYLE_GD_C2C.DLA_T08 : 0,
      area: "DLA_T08",
    });
    tempData.push({
      id: "TYLE_GD_C2C",
      value: EXEC_TYLE_GD_C2C.DLA_T09 ? EXEC_TYLE_GD_C2C.DLA_T09 : 0,
      area: "DLA_T09",
    });
    tempData.push({
      id: "TYLE_GD_C2C",
      value: EXEC_TYLE_GD_C2C.DLA_T10 ? EXEC_TYLE_GD_C2C.DLA_T10 : 0,
      area: "DLA_T10",
    });
    tempData.push({
      id: "TYLE_GD_C2C",
      value: EXEC_TYLE_GD_C2C.DLA_T11 ? EXEC_TYLE_GD_C2C.DLA_T11 : 0,
      area: "DLA_T11",
    });
    tempData.push({
      id: "TYLE_GD_C2C",
      value: EXEC_TYLE_GD_C2C.DLA_T12 ? EXEC_TYLE_GD_C2C.DLA_T12 : 0,
      area: "DLA_T12",
    });
    tempData.push({
      id: "TYLE_GD_C2C",
      value: EXEC_TYLE_GD_C2C.DLA_T13 ? EXEC_TYLE_GD_C2C.DLA_T13 : 0,
      area: "DLA_T13",
    });
    tempData.push({
      id: "TYLE_GD_C2C",
      value: EXEC_TYLE_GD_C2C.DLA_D01 ? EXEC_TYLE_GD_C2C.DLA_D01 : 0,
      area: "DLA_D01",
    });
    tempData.push({
      id: "TYLE_GD_C2C",
      value: EXEC_TYLE_GD_C2C.DLA_D02 ? EXEC_TYLE_GD_C2C.DLA_D02 : 0,
      area: "DLA_D02",
    });
    tempData.push({
      id: "TYLE_GD_C2C",
      value: EXEC_TYLE_GD_C2C.DLA_D03 ? EXEC_TYLE_GD_C2C.DLA_D03 : 0,
      area: "DLA_D03",
    });
    tempData.push({
      id: "TYLE_GD_C2C",
      value: EXEC_TYLE_GD_C2C.DLA_D04 ? EXEC_TYLE_GD_C2C.DLA_D04 : 0,
      area: "DLA_D04",
    });
    tempData.push({
      id: "TYLE_GD_C2C",
      value: EXEC_TYLE_GD_C2C.DLA_D05 ? EXEC_TYLE_GD_C2C.DLA_D05 : 0,
      area: "DLA_D05",
    });
    tempData.push({
      id: "TYLE_GD_C2C",
      value: EXEC_TYLE_GD_C2C.DLA_D06 ? EXEC_TYLE_GD_C2C.DLA_D06 : 0,
      area: "DLA_D06",
    });
    tempData.push({
      id: "TYLE_GD_C2C",
      value: EXEC_TYLE_GD_C2C.TTKDVT ? EXEC_TYLE_GD_C2C.TTKDVT : 0,
      area: "TTKDVT",
    });
    tempData.push({
      id: "TYLE_GD_C2C",
      value: EXEC_TYLE_GD_C2C.TTKDGPS ? EXEC_TYLE_GD_C2C.TTKDGPS : 0,
      area: "TTKDGPS",
    });
    setTYLEGDC2C(tempData);
  };

  const resetFiber = () => {
    SET_EXEC_DTHU_FIBER(initDataFiber);
  };
  const resetGPS = () => {
    SET_EXEC_DTHU_GPS(initDataGPS);
  };
  const resetGPSKHCN = () => {
    SET_EXEC_DTHU_GPS_KHCN(initDataGPSKHCN);
  };

  const resetGPSKHDN = () => {
    SET_EXEC_DTHU_GPS_KHDN(initDataGPSKHDN);
  };
  const resetSLTBC2C = () => {
    SET_EXEC_SL_TB_C2C(initSLTBC2C);
  };
  const resetTYLEGDC2C = () => {
    SET_EXEC_TYLE_GD_C2C(initTYLEGDC2C);
  };

  const handleValueUpdate = (id, valueInput, area) => {
    if (id == "DTHU_FIBER") {
      const tempData = dataFiber.map((object) => {
        if (object.area == area) {
          return {
            ...object,
            value: valueInput,
          };
        } else return object;
      });
      setDataFiber(tempData);
    } else if (id == "DTHU_GPS") {
      const tempData = dataGPS.map((object) => {
        if (object.area == area) {
          return {
            ...object,
            value: valueInput,
          };
        } else return object;
      });
      setDataGPS(tempData);
    } else if (id == "DTHU_GPS_KHCN") {
      const tempData = dataGPSKHCN.map((object) => {
        if (object.area == area) {
          return {
            ...object,
            value: valueInput,
          };
        } else return object;
      });
      setDataGPSKHCN(tempData);
    } else if (id == "DTHU_GPS_KHDN") {
      const tempData = dataGPSKHDN.map((object) => {
        if (object.area == area) {
          return {
            ...object,
            value: valueInput,
          };
        } else return object;
      });
      setDataGPSKHDN(tempData);
    } else if (id == "SL_TB_C2C") {
      // const tempData = dataSLTBC2C.map((object) => {
      //   if (object.area == area) {
      //     return {
      //       ...object,
      //       value: valueInput,
      //     };
      //   } else return object;
      // });
      // setSLTBC2C(tempData);
    } else if (id == "TYLE_GD_C2C") {
      const tempData = dataTYLEGDC2C.map((object) => {
        if (object.area == area) {
          return {
            ...object,
            value: valueInput,
          };
        } else return object;
      });
      setTYLEGDC2C(tempData);
    }
  };
  const getExecKpi = (month) => {
    setLoadingExecKpi(true);
    handleGetExecKpiDLA(month).then(async (res) => {
      setLoadingExecKpi(false);
      resetFiber();
      resetGPS();
      resetGPSKHCN();
      resetGPSKHDN();
      resetSLTBC2C();
      resetTYLEGDC2C();
      const data = await res.json();
      if (data && data.result) {
        data.result.map((object, index) => {
          if (object["TEN_CHI_TIEU"] == "DTHU_FIBER") {
            SET_EXEC_DTHU_FIBER(object);
            if (object["LAST_DATE"]) {
              setDateUpdateFiber(new Date(object["LAST_DATE"]));
            }
          }
          if (object["TEN_CHI_TIEU"] == "DTHU_GPS") {
            SET_EXEC_DTHU_GPS(object);
            if (object["LAST_DATE"]) {
              setDateUpdateGPS(new Date(object["LAST_DATE"]));
            }
          }
          if (object["TEN_CHI_TIEU"] == "DTHU_GPS_KHCN") {
            SET_EXEC_DTHU_GPS_KHCN(object);
            if (object["LAST_DATE"]) {
              setDateUpdateGPSKHCN(new Date(object["LAST_DATE"]));
            }
          }
          if (object["TEN_CHI_TIEU"] == "DTHU_GPS_KHDN") {
            SET_EXEC_DTHU_GPS_KHDN(object);
            if (object["LAST_DATE"]) {
              setDateUpdateGPSKHDN(new Date(object["LAST_DATE"]));
            }
          }
          if (object["TEN_CHI_TIEU"] == "SL_TB_C2C") {
            SET_EXEC_SL_TB_C2C(object);
            if (object["LAST_DATE"]) {
              setDateUpdateSLTBC2C(new Date(object["LAST_DATE"]));
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
    });
  };

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
            // console.log("submit", values);
            const tempDataFiber = dataFiber.map((object, index) => {
              return {
                ...object,
                value: object.value ? object.value : 0,
              };
            });

            // const tempDataSLTBC2C = dataSLTBC2C.map((object, index) => {
            //   return {
            //     ...object,
            //     value: object.value ? object.value : 0,
            //   };
            // });
            const tempDataGPS = dataGPS.map((object, index) => {
              return {
                ...object,
                value: object.value ? object.value : 0,
              };
            });

            const tempDataGPSKHCN = dataGPSKHCN.map((object, index) => {
              return {
                ...object,
                value: object.value ? object.value : 0,
              };
            });

            const tempDataGPSKHDN = dataGPSKHDN.map((object, index) => {
              return {
                ...object,
                value: object.value ? object.value : 0,
              };
            });
            const tempDataTYLEGDC2C = dataTYLEGDC2C.map((object, index) => {
              return {
                ...object,
                value: object.value ? object.value : 0,
              };
            });
            try {
              const info = {
                month: moment(values.selectKpiMonth).format("DD-MM-YYYY"),
                kpiList: tempDataFiber.concat(
                  tempDataGPS,
                  tempDataGPSKHCN,
                  tempDataGPSKHDN,
                  // tempDataSLTBC2C,
                  tempDataTYLEGDC2C
                ),
                dateUpdateFiber: dateUpdateFiber.toISOString(),
                dateUpdateGPS: dateUpdateGPS.toISOString(),
                dateUpdateGPSKHCN: dateUpdateGPSKHCN.toISOString(),
                dateUpdateGPSKHDN: dateUpdateGPSKHDN.toISOString(),
                dateUpdateSLTBC2C: dateUpdateSLTBC2C.toISOString(),
                dateUpdateTYLEGDC2C: dateUpdateTYLEGDC2C.toISOString(),
              };
              console.log("info", info);
              setLoadingCreateManualKpi(true);
              await createManualApiListDLA(info);
              setLoadingCreateManualKpi(false);
              handleClose();
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
                      //   getExecKpi(date);
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
                    <table className="table-responsive align-middle gs-0 gy-3 table-bordered">
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
                          <th className="bg-green-secondary">DLA_T01</th>
                          <th className="bg-green-secondary">DLA_T02</th>
                          <th className="bg-green-secondary">DLA_T03</th>
                          <th className="bg-green-secondary">DLA_T04</th>
                          <th className="bg-green-secondary">DLA_T05</th>
                          <th className="bg-green-secondary">DLA_T06</th>
                          <th className="bg-green-secondary">DLA_T07</th>
                          <th className="bg-green-secondary">DLA_T08</th>
                          <th className="bg-green-secondary">DLA_T09</th>
                          <th className="bg-green-secondary">DLA_T10</th>
                          <th className="bg-green-secondary">DLA_T11</th>
                          <th className="bg-green-secondary">DLA_T12</th>
                          <th className="bg-green-secondary">DLA_T13</th>
                          <th className="bg-green-secondary">DLA_D01</th>
                          <th className="bg-green-secondary">DLA_D02</th>
                          <th className="bg-green-secondary">DLA_D03</th>
                          <th className="bg-green-secondary">DLA_D04</th>
                          <th className="bg-green-secondary">DLA_D05</th>
                          <th className="bg-green-secondary">DLA_D06</th>
                          <th className="bg-green-secondary">TTKDVT</th>
                          <th className="bg-green-secondary">TTKDGPS</th>
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
                              đồng
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
                                      object.area
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
                          <td>Dthu GPS</td>
                          <td>
                            <span
                              style={{
                                paddingLeft: "10px",
                                paddingRight: "10px",
                              }}
                            >
                              đồng
                            </span>
                          </td>
                          {dataGPS &&
                            dataGPS.map((object, index) => (
                              <td key={index + `_gps`}>
                                <input
                                  type="number"
                                  className="form-control input-kpi"
                                  value={object.value}
                                  onChange={(e) =>
                                    handleValueUpdate(
                                      object.id,
                                      e.target.value,
                                      object.area
                                    )
                                  }
                                />
                              </td>
                            ))}
                          <td className="pt-2">
                            <DatePicker
                              selected={dateUpdateGPS}
                              dateFormat={"dd/MM/yyyy"}
                              onChange={(date) => setDateUpdateGPS(date)}
                              customInput={<CustomDateInput />}
                            />
                          </td>
                        </tr>
                        <tr>
                          <td>Dthu GPS KHCN</td>
                          <td>
                            <span
                              style={{
                                paddingLeft: "10px",
                                paddingRight: "10px",
                              }}
                            >
                              {" "}
                              đồng
                            </span>
                          </td>
                          {dataGPSKHCN.map((object, index) => (
                            <td key={index + `_gps_khcn`}>
                              <input
                                type="number"
                                className="form-control input-kpi"
                                value={object.value}
                                onChange={(e) =>
                                  handleValueUpdate(
                                    object.id,
                                    e.target.value,
                                    object.area
                                  )
                                }
                              />
                            </td>
                          ))}
                          <td className="pt-2">
                            <DatePicker
                              selected={dateUpdateGPS}
                              dateFormat={"dd/MM/yyyy"}
                              onChange={(date) => setDateUpdateGPSKHCN(date)}
                              customInput={<CustomDateInput />}
                            />
                          </td>
                        </tr>
                        <tr>
                          <td>Dthu GPS KHDN</td>
                          <td>
                            <span
                              style={{
                                paddingLeft: "10px",
                                paddingRight: "10px",
                              }}
                            >
                              đồng
                            </span>
                          </td>
                          {dataGPSKHDN.map((object, index) => (
                            <td key={index + `_gps_khdn`}>
                              <input
                                className="form-control input-kpi"
                                value={object.value}
                                type="number"
                                onChange={(e) =>
                                  handleValueUpdate(
                                    object.id,
                                    e.target.value,
                                    object.area
                                  )
                                }
                              />
                            </td>
                          ))}
                          <td className="pt-2">
                            <DatePicker
                              selected={dateUpdateGPSKHDN}
                              dateFormat={"dd/MM/yyyy"}
                              onChange={(date) => setDateUpdateGPSKHDN(date)}
                              customInput={<CustomDateInput />}
                            />
                          </td>
                        </tr>

                        {/* <tr>
                          <td>Số lượng TB C2C</td>
                          <td style={{ paddingLeft: "10px" }}>điểm</td>
                          {dataSLTBC2C.map((object, index) => (
                            <td key={index + `_SL_TB_C2C`}>
                              <input
                                className="form-control input-kpi"
                                value={object.value}
                                type="number"
                                onChange={(e) =>
                                  handleValueUpdate(
                                    object.id,
                                    e.target.value,
                                    object.area
                                  )
                                }
                              />
                            </td>
                          ))}
                          <td className="pt-2">
                            <DatePicker
                              selected={dateUpdateSLTBC2C}
                              dateFormat={"dd/MM/yyyy"}
                              onChange={(date) => setDateUpdateSLTBC2C(date)}
                              customInput={<CustomDateInput />}
                            />
                          </td>
                        </tr> */}
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
                                    object.area
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

export default CreateKpiT12Modal;
