"use client";
import React, { useState, useEffect, useRef } from "react";
import moment from "moment";
import { ErrorMessage, Form, Formik } from "formik";
import "react-datepicker/dist/react-datepicker.css";
import { DatePickerField } from "../components/widgets/datePickers/DatePickerField";
import * as Yup from "yup";
import "bootstrap/dist/css/bootstrap.min.css";
import LoadingComponent from "@components/loading/LoadingComponent";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

import {
  convertToFloat2Fixed,
  convertToFloat2FixedNumber,
  daysInMonth,
  changeFormatDateFirstDateInMonth,
} from "../until/functions";
import MySelectSingle from "@components/selects/MySelectSingle";

let kpiManualList = [
  { value: "DTHU_FIBER", label: "Doanh thu Fiber" },
  {
    value: "DTHU_MASS",
    label: "Doanh thu Mass",
  },
  {
    value: "DTHU_DUAN",
    label: "Doanh thu dự án",
  },
  {
    value: "DTHU_GPS",
    label: "Doanh thu GPS",
  },
  { value: "TB_PLAT_TT", label: "Thuê bao Nội dung số trả trước" },
];
let provinceList = [
  { value: "KHO", label: "Khánh Hòa" },
  { value: "DLA", label: "Đăk Lăk" },

  { value: "GLA", label: "Gia Lai" },

  { value: "PYE", label: "Phú Yên" },

  { value: "DNO", label: "Đăk Nông" },

  { value: "KON", label: "Kon Tum" },
  { value: "CTY7", label: "Tổng" },
];

var x = new Date();
x.setDate(1);
x.setMonth(x.getMonth());
const INIT_VALUES = {
  selectMonth: x,
};
const INIT_KPI_VALUES = {
  selectKpiMonth: x,
  province: { value: "KHO", label: "Khánh Hòa" },
  nameKpi: { value: "DTHU_FIBER", label: "Doanh thu Fiber" },
  kpi: "",
};
const Page = () => {
  const firstUpdate = useRef(true);
  const [initValues, setInitValues] = useState(INIT_VALUES);
  const [initKpiValues, setInitKpiValues] = useState(INIT_KPI_VALUES);

  const [indexDateInMonth, setIndexDateInMonth] = useState(
    new Date().getDate()
  );
  const [sumDateInMonth, setSumDateInMonth] = useState(daysInMonth(new Date()));
  const formSchema = Yup.object().shape({});

  const formKpiSchema = Yup.object().shape({
    kpi: Yup.number().required(),
  });

  const [PLAN_DTHU_TKC_HTS, SET_PLAN_DTHU_TKC_HTS] = useState({});
  const [PLAN_DTHU_FIBER, SET_PLAN_DTHU_FIBER] = useState({});
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
  // kpi thuc hien
  // //////////////////////////////////////////////////////////////
  const [EXEC_DTHU_TKC_HTS, SET_EXEC_DTHU_TKC_HTS] = useState({});
  const [EXEC_DTHU_FIBER, SET_EXEC_DTHU_FIBER] = useState({});
  const [EXEC_DTHU_MASS, SET_EXEC_DTHU_MASS] = useState({});
  const [EXEC_DTHU_DUAN, SET_EXEC_DTHU_DUAN] = useState({});
  const [EXEC_DTHU_NDS, SET_EXEC_DTHU_NDS] = useState({});


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

  const [loadingPlan, setLoadingPlan] = useState(false);
  const [loadingExec, setLoadingExec] = useState(false);
  const [loadingCreateManualKpi, setLoadingCreateManualKpi] = useState(false);


  // usetate value
  const [selectedDate, setSelectedDate] = useState(new Date());

  useEffect(() => {
    getPlanKpi(changeFormatDateFirstDateInMonth(x));
    getExecKpi(changeFormatDateFirstDateInMonth(x));
  }, []);
  useEffect(() => {
    if (firstUpdate.current) {
      firstUpdate.current = false;
      return;
    }
    const date = changeFormatDateFirstDateInMonth(selectedDate);
    getPlanKpi(date);
    getExecKpi(date);
  }, [selectedDate]);

  const getPlanKpi = (month) => {
    setLoadingPlan(true);

    fetch(`api/get-plan-kpi?month=${month}`).then(async (res) => {
      setLoadingPlan(false);
      const data = await res.json();
      if (data && data.result) {
        if (data.result.length > 0) {
          data.result.map((object, index) => {
            if (object["TEN_CHI_TIEU"] == "DTHU_TKC_HTS") {
              SET_PLAN_DTHU_TKC_HTS(object);
            }
            if (object["TEN_CHI_TIEU"] == "DTHU_FIBER") {
              SET_PLAN_DTHU_FIBER(object);
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
          });
        } else {
          resetPlan();
        }
      }
    });
  };
  const getExecKpi = (month) => {
    setLoadingExec(true);

    fetch(`api/get-exec-kpi?month=${month}`).then(async (res) => {
      setLoadingExec(false);
      const data = await res.json();
      console.log("data", data);
      if (data.result.length > 0) {
        data.result.map((object, index) => {
          if (object["TEN_CHI_TIEU"] == "DTHU_TKC_HTS") {
            SET_EXEC_DTHU_TKC_HTS(object);
          }
          if (object["TEN_CHI_TIEU"] == "DTHU_FIBER") {
            SET_EXEC_DTHU_FIBER(object);
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


          if (object["TEN_CHI_TIEU"] == "TB_PTM_FIBER") {
            SET_EXEC_TB_PTM_FIBER(object);
          }
          if (object["TEN_CHI_TIEU"] == "DTHU_SAYMEE") {
            SET_EXEC_DTHU_SAYMEE(object);
          }
          if (object["TEN_CHI_TIEU"] == "TB_PSC") {
            SET_EXEC_TB_PSC(object);
          }
          if (object["TEN_CHI_TIEU"] == "TB_PLAT_TT") {
            SET_EXEC_TB_PLAT_TT(object);
          }
          if (object["TEN_CHI_TIEU"] == "SL_TB_PTM_M2M") {
            SET_EXEC_SL_TB_PTM_M2M(object);
          }
          if (object["TEN_CHI_TIEU"] == "TYLE_GD_C2C") {
            SET_EXEC_TYLE_GD_C2C(object);
          }
          if (object["TEN_CHI_TIEU"] == "SL_PTM_TBTT_NDS") {
            SET_EXEC_SL_PTM_TBTT_NDS(object);
          }
          if (object["TEN_CHI_TIEU"] == "TILE_N_1_DONKY") {
            SET_EXEC_TILE_N_1_DONKY(object);
          }
          if (object["TEN_CHI_TIEU"] == "TI_LE_N_1_DAIKY") {
            SET_EXEC_TILE_N_1_DAIKY(object);
          }

          if (object["TEN_CHI_TIEU"] == "TILE_N_1_GOI") {
            SET_EXEC_TILE_N_1_GOI(object);
          }

          if (object["TEN_CHI_TIEU"] == "TB_PTM_SAYMEE") {
            SET_EXEC_TB_PTM_SAYMEE(object);
          }
          if (object["TEN_CHI_TIEU"] == "TB_VLR") {
            SET_EXEC_TB_VLR(object);
          }
          if (object["TEN_CHI_TIEU"] == "SL_TB_C2C") {
            SET_EXEC_SL_TB_C2C(object);
          }
          if (object["TEN_CHI_TIEU"] == "SL_PTM_TBTT_HTS") {
            SET_EXEC_SL_PTM_TBTT_HTS(object);
          }
          if (object["TEN_CHI_TIEU"] == "TILE_MNP") {
            SET_EXEC_TILE_MNP(object);
          }
        });
      } else {
        resetExec();
      }
    });
  };
  const resetPlan = () => {
    SET_PLAN_DTHU_TKC_HTS({});
    SET_PLAN_DTHU_FIBER({});
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
  };

  const resetExec = () => {
    SET_EXEC_DTHU_TKC_HTS({});
    SET_EXEC_DTHU_FIBER({});
    SET_EXEC_TB_PTM_FIBER({});
    SET_EXEC_DTHU_SAYMEE({});
    SET_EXEC_TB_PSC({});
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
  };
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <div className="dashboard-kpi">
      <div className="d-flex select-filter mt-2">
        <Formik
          enableReinitialize={true}
          initialValues={initValues}
          validationSchema={formSchema}
          onSubmit={async (values, { resetForm }) => {
            setInitValues({
              selectMonth: values.selectMonth,
            });
          }}
        >
          {(formikProps) => {
            return (
              <Form>
                <div className=" filter mb-3 me-5">
                  <div className="filter-body d-flex flex-start">
                    <div className="select-filter">
                      <label
                        htmlFor="selectMonth"
                        className="form-label fs-6 fw-bold text-dark me-2"
                      >
                        Tháng
                      </label>
                      <DatePickerField
                        showMonthYearPicker={true}
                        name={`selectMonth`}
                        dateFormat="MM/yyyy"
                        disabled={false}
                        callbackSetDate={(e) => {
                          setSelectedDate(e);
                          let indexDate;
                          if (e < new Date()) {
                            indexDate = daysInMonth(e);
                          } else {
                            indexDate = e.getDate();
                          }
                          console.log("indexDate", indexDate);
                          setIndexDateInMonth(indexDate);
                          const sumDate = daysInMonth(e);
                          console.log("sumdate", sumDate);
                          setSumDateInMonth(sumDate);
                          setInitValues({
                            ...initValues,
                            selectMonth: e,
                          });
                        }}
                      ></DatePickerField>

                      <div className="text-danger">
                        <ErrorMessage name="selectMonth" />
                      </div>
                    </div>
                  </div>
                </div>
              </Form>
            );
          }}
        </Formik>
        <div>
          <Button
            onClick={() => {
              setShow(true);
            }}
          >
            Thêm Kpi đã thực hiện
          </Button>
          <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>Thêm Kpi đã thực hiện</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Formik
                enableReinitialize={true}
                initialValues={initKpiValues}
                validationSchema={formKpiSchema}
                onSubmit={async (values, { resetForm }) => {
                  try {
                    console.log("values", values);
                    const info = {
                      month: moment(values.selectKpiMonth).format("DD-MM-YYYY"),
                      kpi: values.kpi,
                      nameKpi: values.nameKpi.value,
                      province: values.province.value
                    };
                    setLoadingCreateManualKpi(true)
                    const result=  await fetch('/api/create-manual-kpi',
                      {
                        method: 'POST',
                        headers: {
                            'Content-type': 'application/json',
                        },
                        body: JSON.stringify(info),
                      }
                    )
                    setLoadingCreateManualKpi(false)
                    const isCreated =  await result.json()
                    console.log("isCreated",isCreated)
                    if(isCreated){
                        handleClose()
                        getExecKpi(changeFormatDateFirstDateInMonth(selectedDate));
                    }
                    
                  } catch (error) {
                    console.log('error',error)
                  }
                 
                  
                }}
              >
                {(formikProps) => {
                  return (
                    <div className="select-filter form-group">
                      <label
                        htmlFor="selectKpiMonth"
                        className="form-label fs-6 fw-bold text-dark me-2"
                      >
                        Tháng
                      </label>
                      <DatePickerField
                        showMonthYearPicker={true}
                        name={`selectKpiMonth`}
                        dateFormat="MM/yyyy"
                        disabled={false}
                        callbackSetDate={(e) => {
                          setInitKpiValues({
                            ...initKpiValues,
                            selectKpiMonth: e,
                          });
                        }}
                      ></DatePickerField>

                      <div className="text-danger">
                        <ErrorMessage name="selectKpiMonth" />
                      </div>
                      <label
                        className="form-label fs-6 fw-bold text-dark me-2"
                        htmlFor="province"
                      >
                        Tỉnh
                      </label>
                      <MySelectSingle
                        options={provinceList}
                        value={{
                          value: "KHO",
                          label: "Khánh Hòa",
                        }}
                        onChange={(e) => {
                          setInitKpiValues({
                            ...initKpiValues,
                            province: e,
                          });
                        }}
                        name="province"
                      ></MySelectSingle>
                      <label
                        className="form-label fs-6 fw-bold text-dark me-2 mt-1"
                        htmlFor="name-kpi"
                      >
                        Tên chỉ tiêu
                      </label>
                      <MySelectSingle
                        options={kpiManualList}
                        value={{
                          value: "DTHU_FIBER",
                          label: "Doanh thu Fiber",
                        }}
                        onChange={(e) => {
                          setInitKpiValues({
                            ...initKpiValues,
                            nameKpi: e,
                          });
                        }}
                        name="nameKpi"
                      ></MySelectSingle>
                      <div className="text-danger">
                        <ErrorMessage name="nameKpi" />
                      </div>
                      <label
                        className="form-label fs-6 fw-bold text-dark me-2 mt-1"
                        htmlFor="name-kpi"
                      >
                        Kpi
                      </label>
                      <input
                        onChange={(e) => {
                          setInitKpiValues({
                            ...initKpiValues,
                            kpi: e.target.value,
                          });
                        }}
                        type="number"
                        className="form-control"
                        name="kpi"
                      />
                      <div className="text-danger">
                        <ErrorMessage name="kpi" />
                      </div>
                      <div className="mt-4 d-flex justify-content-around">
                        <Button variant="secondary" onClick={handleClose}>
                          Close
                        </Button>

                        <Button
                          variant="primary"
                          onClick={formikProps.handleSubmit}
                        >
                          {loadingCreateManualKpi ? 'Saving ...':'Save'}
                        </Button>
                      </div>
                    </div>
                  );
                }}
              </Formik>
            </Modal.Body>
          </Modal>
        </div>
      </div>

      <div className="table-kpi">
        <table className="table-responsive  align-middle gs-0 gy-3">
          <thead>
            <tr className="table-head">
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
          <tbody>
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
              <td rowSpan={4} className="text-sub2">
                Doanh thu hạ tầng số
              </td>
              <td rowSpan={4}>triệu đồng</td>
              <td className="text-sub4">Kế hoạch tháng</td>
              <td>
                {loadingPlan ? (
                  <LoadingComponent />
                ) : PLAN_DTHU_TKC_HTS.KHO ? (
                  convertToFloat2Fixed(PLAN_DTHU_TKC_HTS.KHO)
                ) : (
                  ""
                )}
              </td>
              <td>
                {loadingPlan ? (
                  <LoadingComponent />
                ) : PLAN_DTHU_TKC_HTS.DLA ? (
                  convertToFloat2Fixed(PLAN_DTHU_TKC_HTS.DLA)
                ) : (
                  ""
                )}
              </td>
              <td>
                {loadingPlan ? (
                  <LoadingComponent />
                ) : PLAN_DTHU_TKC_HTS.GLA ? (
                  convertToFloat2Fixed(PLAN_DTHU_TKC_HTS.GLA)
                ) : (
                  ""
                )}
              </td>
              <td>
                {loadingPlan ? (
                  <LoadingComponent />
                ) : PLAN_DTHU_TKC_HTS.PYE ? (
                  convertToFloat2Fixed(PLAN_DTHU_TKC_HTS.PYE)
                ) : (
                  ""
                )}
              </td>
              <td>
                {loadingPlan ? (
                  <LoadingComponent />
                ) : PLAN_DTHU_TKC_HTS.DNO ? (
                  convertToFloat2Fixed(PLAN_DTHU_TKC_HTS.DNO)
                ) : (
                  ""
                )}
              </td>
              <td>
                {loadingPlan ? (
                  <LoadingComponent />
                ) : PLAN_DTHU_TKC_HTS.KON ? (
                  convertToFloat2Fixed(PLAN_DTHU_TKC_HTS.KON)
                ) : (
                  ""
                )}
              </td>
              <td>
                {loadingPlan ? (
                  <LoadingComponent />
                ) : PLAN_DTHU_TKC_HTS.CTY7 ? (
                  convertToFloat2Fixed(PLAN_DTHU_TKC_HTS.CTY7)
                ) : (
                  ""
                )}
              </td>
              <td rowSpan={4}>DVVT</td>
            </tr>
            <tr>
              <td className="text-sub4">Thực hiện lũy kế</td>
              <td>
                {loadingExec ? (
                  <LoadingComponent />
                ) : EXEC_DTHU_TKC_HTS.KHO ? (
                  convertToFloat2Fixed(EXEC_DTHU_TKC_HTS.KHO / 1000000)
                ) : (
                  ""
                )}
              </td>
              <td>
                {loadingExec ? (
                  <LoadingComponent />
                ) : EXEC_DTHU_TKC_HTS.DLA ? (
                  convertToFloat2Fixed(EXEC_DTHU_TKC_HTS.DLA / 1000000)
                ) : (
                  ""
                )}
              </td>
              <td>
                {loadingExec ? (
                  <LoadingComponent />
                ) : EXEC_DTHU_TKC_HTS.GLA ? (
                  convertToFloat2Fixed(EXEC_DTHU_TKC_HTS.GLA / 1000000)
                ) : (
                  ""
                )}
              </td>
              <td>
                {loadingExec ? (
                  <LoadingComponent />
                ) : EXEC_DTHU_TKC_HTS.PYE ? (
                  convertToFloat2Fixed(EXEC_DTHU_TKC_HTS.PYE / 1000000)
                ) : (
                  ""
                )}
              </td>
              <td>
                {loadingExec ? (
                  <LoadingComponent />
                ) : EXEC_DTHU_TKC_HTS.DNO ? (
                  convertToFloat2Fixed(EXEC_DTHU_TKC_HTS.DNO / 1000000)
                ) : (
                  ""
                )}
              </td>
              <td>
                {loadingExec ? (
                  <LoadingComponent />
                ) : EXEC_DTHU_TKC_HTS.KON ? (
                  convertToFloat2Fixed(EXEC_DTHU_TKC_HTS.KON / 1000000)
                ) : (
                  ""
                )}
              </td>
              <td>
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
              <td className="text-sub4">%HTKH lũy kế </td>
              <td>
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
                <span className="text-sub4">%</span>
              </td>
              <td>
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
                <span className="text-sub4">%</span>
              </td>
              <td>
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
                <span className="text-sub4">%</span>
              </td>
              <td>
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
                <span className="text-sub4">%</span>
              </td>
              <td>
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
                <span className="text-sub4">%</span>
              </td>
              <td>
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
                <span className="text-sub4">%</span>
              </td>
              <td>
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
                <span className="text-sub4">%</span>
              </td>
            </tr>
            <tr>
              <td className="text-sub4">Ước %HTKH tháng</td>
              <td
                className={
                  convertToFloat2Fixed(
                    ((EXEC_DTHU_TKC_HTS.KHO / indexDateInMonth) *
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
                    ((EXEC_DTHU_TKC_HTS.KHO / indexDateInMonth) *
                      sumDateInMonth *
                      100) /
                      (PLAN_DTHU_TKC_HTS.KHO * 1000000)
                  )
                ) : (
                  ""
                )}
                {/* <br />
                <span>{indexDateInMonth}</span>
                <br />
                <span>{sumDateInMonth}</span> */}
                <span className="text-sub4">%</span>
              </td>
              <td
                className={
                  convertToFloat2Fixed(
                    ((EXEC_DTHU_TKC_HTS.DLA / indexDateInMonth) *
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
                    ((EXEC_DTHU_TKC_HTS.DLA / indexDateInMonth) *
                      sumDateInMonth *
                      100) /
                      (PLAN_DTHU_TKC_HTS.DLA * 1000000)
                  )
                ) : (
                  ""
                )}
                <span className="text-sub4">%</span>
              </td>
              <td
                className={
                  convertToFloat2Fixed(
                    ((EXEC_DTHU_TKC_HTS.GLA / indexDateInMonth) *
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
                    ((EXEC_DTHU_TKC_HTS.GLA / indexDateInMonth) *
                      sumDateInMonth *
                      100) /
                      (PLAN_DTHU_TKC_HTS.GLA * 1000000)
                  )
                ) : (
                  ""
                )}
                <span className="text-sub4">%</span>
              </td>
              <td
                className={
                  convertToFloat2Fixed(
                    ((EXEC_DTHU_TKC_HTS.PYE / indexDateInMonth) *
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
                    ((EXEC_DTHU_TKC_HTS.PYE / indexDateInMonth) *
                      sumDateInMonth *
                      100) /
                      (PLAN_DTHU_TKC_HTS.PYE * 1000000)
                  )
                ) : (
                  ""
                )}
                <span className="text-sub4">%</span>
              </td>
              <td
                className={
                  convertToFloat2Fixed(
                    ((EXEC_DTHU_TKC_HTS.DNO / indexDateInMonth) *
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
                    ((EXEC_DTHU_TKC_HTS.DNO / indexDateInMonth) *
                      sumDateInMonth *
                      100) /
                      (PLAN_DTHU_TKC_HTS.DNO * 1000000)
                  )
                ) : (
                  ""
                )}
                <span className="text-sub4">%</span>
              </td>
              <td
                className={
                  convertToFloat2Fixed(
                    ((EXEC_DTHU_TKC_HTS.KON / indexDateInMonth) *
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
                    ((EXEC_DTHU_TKC_HTS.KON / indexDateInMonth) *
                      sumDateInMonth *
                      100) /
                      (PLAN_DTHU_TKC_HTS.KON * 1000000)
                  )
                ) : (
                  ""
                )}
                <span className="text-sub4">%</span>
              </td>
              <td
                className={
                  convertToFloat2Fixed(
                    ((EXEC_DTHU_TKC_HTS.CTY7 / indexDateInMonth) *
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
                    ((EXEC_DTHU_TKC_HTS.CTY7 / indexDateInMonth) *
                      sumDateInMonth *
                      100) /
                      (PLAN_DTHU_TKC_HTS.CTY7 * 1000000)
                  )
                ) : (
                  ""
                )}
                <span className="text-sub4">%</span>
              </td>
            </tr>
            <tr>
              <td rowSpan={4} className="text-sub2">
                2
              </td>
              <td rowSpan={4} className="text-sub2">
                Doanh thu MobiFiber
              </td>
              <td rowSpan={4}>triệu đồng</td>
              <td className="text-sub4">Kế hoạch tháng</td>
              <td>
                {" "}
                {loadingPlan ? (
                  <LoadingComponent />
                ) : PLAN_DTHU_FIBER.KHO ? (
                  convertToFloat2Fixed(PLAN_DTHU_FIBER.KHO)
                ) : (
                  ""
                )}
              </td>
              <td>
                {loadingPlan ? (
                  <LoadingComponent />
                ) : PLAN_DTHU_FIBER.DLA ? (
                  convertToFloat2Fixed(PLAN_DTHU_FIBER.DLA)
                ) : (
                  ""
                )}
              </td>
              <td>
                {loadingPlan ? (
                  <LoadingComponent />
                ) : PLAN_DTHU_FIBER.GLA ? (
                  convertToFloat2Fixed(PLAN_DTHU_FIBER.GLA)
                ) : (
                  ""
                )}
              </td>
              <td>
                {loadingPlan ? (
                  <LoadingComponent />
                ) : PLAN_DTHU_FIBER.PYE ? (
                  convertToFloat2Fixed(PLAN_DTHU_FIBER.PYE)
                ) : (
                  ""
                )}
              </td>
              <td>
                {loadingPlan ? (
                  <LoadingComponent />
                ) : PLAN_DTHU_FIBER.DNO ? (
                  convertToFloat2Fixed(PLAN_DTHU_FIBER.DNO)
                ) : (
                  ""
                )}
              </td>
              <td>
                {loadingPlan ? (
                  <LoadingComponent />
                ) : PLAN_DTHU_FIBER.KON ? (
                  convertToFloat2Fixed(PLAN_DTHU_FIBER.KON)
                ) : (
                  ""
                )}
              </td>
              <td>
                {loadingPlan ? (
                  <LoadingComponent />
                ) : PLAN_DTHU_FIBER.CTY7 ? (
                  convertToFloat2Fixed(PLAN_DTHU_FIBER.CTY7)
                ) : (
                  ""
                )}
              </td>
              <td rowSpan={4}>DVVT</td>
            </tr>
            <tr>
              <td className="text-sub4">Thực hiện lũy kế</td>
              <td>
              {loadingExec ? (
                  <LoadingComponent />
                ) : EXEC_DTHU_FIBER.KHO ? (
                  convertToFloat2Fixed(EXEC_DTHU_FIBER.KHO / 1000000)
                ) : (
                  ""
                )}
              </td>
              <td>
              {loadingExec ? (
                  <LoadingComponent />
                ) : EXEC_DTHU_FIBER.DLA ? (
                  convertToFloat2Fixed(EXEC_DTHU_FIBER.DLA / 1000000)
                ) : (
                  ""
                )}
              </td>
              <td>
              {loadingExec ? (
                  <LoadingComponent />
                ) : EXEC_DTHU_FIBER.GLA ? (
                  convertToFloat2Fixed(EXEC_DTHU_FIBER.GLA / 1000000)
                ) : (
                  ""
                )}
              </td>
              <td>
              {loadingExec ? (
                  <LoadingComponent />
                ) : EXEC_DTHU_FIBER.PYE ? (
                  convertToFloat2Fixed(EXEC_DTHU_FIBER.PYE / 1000000)
                ) : (
                  ""
                )}
              </td>
              <td>
              {loadingExec ? (
                  <LoadingComponent />
                ) : EXEC_DTHU_FIBER.DNO ? (
                  convertToFloat2Fixed(EXEC_DTHU_FIBER.DNO / 1000000)
                ) : (
                  ""
                )}
              </td>
              <td>
              {loadingExec ? (
                  <LoadingComponent />
                ) : EXEC_DTHU_FIBER.KON ? (
                  convertToFloat2Fixed(EXEC_DTHU_FIBER.KON / 1000000)
                ) : (
                  ""
                )}
              </td>
              <td>
              {loadingExec ? (
                  <LoadingComponent />
                ) : EXEC_DTHU_FIBER.CTY7 ? (
                  convertToFloat2Fixed(EXEC_DTHU_FIBER.CTY7 / 1000000)
                ) : (
                  ""
                )}
              </td>
            </tr>
            <tr>
              <td className="text-sub4">%HTKH lũy kế </td>
              <td>

              {loadingExec || loadingPlan ? (
                  <LoadingComponent />
                ) : EXEC_DTHU_FIBER.KHO && PLAN_DTHU_FIBER.KHO ? (
                  convertToFloat2Fixed(
                    (EXEC_DTHU_FIBER.KHO * 100) /
                      (PLAN_DTHU_FIBER.KHO * 1000000)
                  )
                ) : (
                  ""
                )}
                <span className="text-sub4">%</span>
              </td>
              <td>
              {loadingExec || loadingPlan ? (
                  <LoadingComponent />
                ) : EXEC_DTHU_FIBER.DLA && PLAN_DTHU_FIBER.DLA ? (
                  convertToFloat2Fixed(
                    (EXEC_DTHU_FIBER.DLA * 100) /
                      (PLAN_DTHU_FIBER.DLA * 1000000)
                  )
                ) : (
                  ""
                )}
                <span className="text-sub4">%</span>
              </td>
              <td>
              {loadingExec || loadingPlan ? (
                  <LoadingComponent />
                ) : EXEC_DTHU_FIBER.GLA && PLAN_DTHU_FIBER.GLA ? (
                  convertToFloat2Fixed(
                    (EXEC_DTHU_FIBER.GLA * 100) /
                      (PLAN_DTHU_FIBER.GLA * 1000000)
                  )
                ) : (
                  ""
                )}
                <span className="text-sub4">%</span>
              </td>
              <td>
              {loadingExec || loadingPlan ? (
                  <LoadingComponent />
                ) : EXEC_DTHU_FIBER.PYE && PLAN_DTHU_FIBER.PYE ? (
                  convertToFloat2Fixed(
                    (EXEC_DTHU_FIBER.PYE * 100) /
                      (PLAN_DTHU_FIBER.PYE * 1000000)
                  )
                ) : (
                  ""
                )}
                <span className="text-sub4">%</span>
              </td>
              <td>
              {loadingExec || loadingPlan ? (
                  <LoadingComponent />
                ) : EXEC_DTHU_FIBER.DNO && PLAN_DTHU_FIBER.DNO ? (
                  convertToFloat2Fixed(
                    (EXEC_DTHU_FIBER.DNO * 100) /
                      (PLAN_DTHU_FIBER.DNO * 1000000)
                  )
                ) : (
                  ""
                )}
                <span className="text-sub4">%</span>
              </td>
              <td>
              {loadingExec || loadingPlan ? (
                  <LoadingComponent />
                ) : EXEC_DTHU_FIBER.KON && PLAN_DTHU_FIBER.KON ? (
                  convertToFloat2Fixed(
                    (EXEC_DTHU_FIBER.KON * 100) /
                      (PLAN_DTHU_FIBER.KON * 1000000)
                  )
                ) : (
                  ""
                )}
                <span className="text-sub4">%</span>
              </td>
              <td>
              {loadingExec || loadingPlan ? (
                  <LoadingComponent />
                ) : EXEC_DTHU_FIBER.CTY7 && PLAN_DTHU_FIBER.CTY7 ? (
                  convertToFloat2Fixed(
                    (EXEC_DTHU_FIBER.CTY7 * 100) /
                      (PLAN_DTHU_FIBER.CTY7 * 1000000)
                  )
                ) : (
                  ""
                )}
                <span className="text-sub4">%</span>
              </td>
            </tr>
            <tr>
              <td className="text-sub4">Ước %HTKH tháng</td>
              <td
                className={
                  convertToFloat2Fixed(
                    ((EXEC_DTHU_FIBER.KHO / indexDateInMonth) *
                      sumDateInMonth *
                      100) /
                      (PLAN_DTHU_FIBER.KHO * 1000000)
                  ) > 100
                    ? "bg-green"
                    : "bg-red"
                }
              >
                {loadingExec || loadingPlan ? (
                  <LoadingComponent />
                ) : EXEC_DTHU_FIBER.KHO && PLAN_DTHU_FIBER.KHO ? (
                  convertToFloat2Fixed(
                    ((EXEC_DTHU_FIBER.KHO / indexDateInMonth) *
                      sumDateInMonth *
                      100) /
                      (PLAN_DTHU_FIBER.KHO * 1000000)
                  )
                ) : (
                  ""
                )}
                <span className="text-sub4">%</span>
              </td>
              <td
                className={
                  convertToFloat2Fixed(
                    ((EXEC_DTHU_FIBER.DLA / indexDateInMonth) *
                      sumDateInMonth *
                      100) /
                      (PLAN_DTHU_FIBER.DLA * 1000000)
                  ) > 100
                    ? "bg-green"
                    : "bg-red"
                }
              >
                {loadingExec || loadingPlan ? (
                  <LoadingComponent />
                ) : EXEC_DTHU_FIBER.DLA && PLAN_DTHU_FIBER.DLA ? (
                  convertToFloat2Fixed(
                    ((EXEC_DTHU_FIBER.DLA / indexDateInMonth) *
                      sumDateInMonth *
                      100) /
                      (PLAN_DTHU_FIBER.DLA * 1000000)
                  )
                ) : (
                  ""
                )}
                <span className="text-sub4">%</span>
              </td>
              <td
                className={
                  convertToFloat2Fixed(
                    ((EXEC_DTHU_FIBER.GLA / indexDateInMonth) *
                      sumDateInMonth *
                      100) /
                      (PLAN_DTHU_FIBER.GLA * 1000000)
                  ) > 100
                    ? "bg-green"
                    : "bg-red"
                }
              >
                {loadingExec || loadingPlan ? (
                  <LoadingComponent />
                ) : EXEC_DTHU_FIBER.GLA && PLAN_DTHU_FIBER.GLA ? (
                  convertToFloat2Fixed(
                    ((EXEC_DTHU_FIBER.GLA / indexDateInMonth) *
                      sumDateInMonth *
                      100) /
                      (PLAN_DTHU_FIBER.GLA * 1000000)
                  )
                ) : (
                  ""
                )}
                <span className="text-sub4">%</span>
              </td>
              <td
                className={
                  convertToFloat2Fixed(
                    ((EXEC_DTHU_FIBER.PYE / indexDateInMonth) *
                      sumDateInMonth *
                      100) /
                      (PLAN_DTHU_FIBER.PYE * 1000000)
                  ) > 100
                    ? "bg-green"
                    : "bg-red"
                }
              >
                {loadingExec || loadingPlan ? (
                  <LoadingComponent />
                ) : EXEC_DTHU_FIBER.PYE && PLAN_DTHU_FIBER.PYE ? (
                  convertToFloat2Fixed(
                    ((EXEC_DTHU_FIBER.PYE / indexDateInMonth) *
                      sumDateInMonth *
                      100) /
                      (PLAN_DTHU_FIBER.PYE * 1000000)
                  )
                ) : (
                  ""
                )}
                <span className="text-sub4">%</span>
              </td>
              <td
                className={
                  convertToFloat2Fixed(
                    ((EXEC_DTHU_FIBER.DNO / indexDateInMonth) *
                      sumDateInMonth *
                      100) /
                      (PLAN_DTHU_FIBER.DNO * 1000000)
                  ) > 100
                    ? "bg-green"
                    : "bg-red"
                }
              >
                {loadingExec || loadingPlan ? (
                  <LoadingComponent />
                ) : EXEC_DTHU_FIBER.DNO && PLAN_DTHU_FIBER.DNO ? (
                  convertToFloat2Fixed(
                    ((EXEC_DTHU_FIBER.DNO / indexDateInMonth) *
                      sumDateInMonth *
                      100) /
                      (PLAN_DTHU_FIBER.DNO * 1000000)
                  )
                ) : (
                  ""
                )}
                <span className="text-sub4">%</span>
              </td>
              <td
                className={
                  convertToFloat2Fixed(
                    ((EXEC_DTHU_FIBER.KON / indexDateInMonth) *
                      sumDateInMonth *
                      100) /
                      (PLAN_DTHU_FIBER.KON * 1000000)
                  ) > 100
                    ? "bg-green"
                    : "bg-red"
                }
              >
                {loadingExec || loadingPlan ? (
                  <LoadingComponent />
                ) : EXEC_DTHU_FIBER.KON && PLAN_DTHU_FIBER.KON ? (
                  convertToFloat2Fixed(
                    ((EXEC_DTHU_FIBER.KON / indexDateInMonth) *
                      sumDateInMonth *
                      100) /
                      (PLAN_DTHU_FIBER.KON * 1000000)
                  )
                ) : (
                  ""
                )}
                <span className="text-sub4">%</span>
              </td>
              <td
                className={
                  convertToFloat2Fixed(
                    ((EXEC_DTHU_FIBER.CTY7 / indexDateInMonth) *
                      sumDateInMonth *
                      100) /
                      (PLAN_DTHU_FIBER.CTY7 * 1000000)
                  ) > 100
                    ? "bg-green"
                    : "bg-red"
                }
              >
                {loadingExec || loadingPlan ? (
                  <LoadingComponent />
                ) : EXEC_DTHU_FIBER.CTY7 && PLAN_DTHU_FIBER.CTY7 ? (
                  convertToFloat2Fixed(
                    ((EXEC_DTHU_FIBER.CTY7 / indexDateInMonth) *
                      sumDateInMonth *
                      100) /
                      (PLAN_DTHU_FIBER.CTY7 * 1000000)
                  )
                ) : (
                  ""
                )}
                <span className="text-sub4">%</span>
              </td>
            </tr>
            <tr>
              <td rowSpan={1} className="text-sub2">
                3
              </td>
              <td colSpan={11} className="text-sub2">
                Doanh thu Giải pháp số/Nền tảng số (*)
              </td>
            </tr>
            <tr>
              <td rowSpan={4} className="text-sub3">
                3.1
              </td>
              <td rowSpan={4} className="text-sub3">
                Doanh thu bán Mass
              </td>
              <td rowSpan={4}>triệu đồng</td>
              <td className="text-sub4">Kế hoạch tháng</td>
              <td>
                {loadingPlan ? (
                  <LoadingComponent />
                ) : PLAN_DTHU_MASS.KHO ? (
                  convertToFloat2Fixed(PLAN_DTHU_MASS.KHO)
                ) : (
                  ""
                )}
              </td>
              <td>
                {loadingPlan ? (
                  <LoadingComponent />
                ) : PLAN_DTHU_MASS.DLA ? (
                  convertToFloat2Fixed(PLAN_DTHU_MASS.DLA)
                ) : (
                  ""
                )}
              </td>
              <td>
                {loadingPlan ? (
                  <LoadingComponent />
                ) : PLAN_DTHU_MASS.GLA ? (
                  convertToFloat2Fixed(PLAN_DTHU_MASS.GLA)
                ) : (
                  ""
                )}
              </td>
              <td>
                {loadingPlan ? (
                  <LoadingComponent />
                ) : PLAN_DTHU_MASS.PYE ? (
                  convertToFloat2Fixed(PLAN_DTHU_MASS.PYE)
                ) : (
                  ""
                )}
              </td>
              <td>
                {loadingPlan ? (
                  <LoadingComponent />
                ) : PLAN_DTHU_MASS.DNO ? (
                  convertToFloat2Fixed(PLAN_DTHU_MASS.DNO)
                ) : (
                  ""
                )}
              </td>
              <td>
                {loadingPlan ? (
                  <LoadingComponent />
                ) : PLAN_DTHU_MASS.KON ? (
                  convertToFloat2Fixed(PLAN_DTHU_MASS.KON)
                ) : (
                  ""
                )}
              </td>
              <td>
                {loadingPlan ? (
                  <LoadingComponent />
                ) : PLAN_DTHU_MASS.CTY7 ? (
                  convertToFloat2Fixed(PLAN_DTHU_MASS.CTY7)
                ) : (
                  ""
                )}
              </td>
              <td rowSpan={4}>CNS</td>
            </tr>
            <tr>
              <td className="text-sub4">Thực hiện lũy kế</td>
              <td>
              {loadingExec ? (
                  <LoadingComponent />
                ) : EXEC_DTHU_MASS.KHO ? (
                  convertToFloat2Fixed(EXEC_DTHU_MASS.KHO)
                ) : (
                  ""
                )}
              </td>
              <td>
              {loadingExec ? (
                  <LoadingComponent />
                ) : EXEC_DTHU_MASS.DLA ? (
                  convertToFloat2Fixed(EXEC_DTHU_MASS.DLA)
                ) : (
                  ""
                )}
              </td>
              <td>
              {loadingExec ? (
                  <LoadingComponent />
                ) : EXEC_DTHU_MASS.GLA ? (
                  convertToFloat2Fixed(EXEC_DTHU_MASS.GLA)
                ) : (
                  ""
                )}
              </td>
              <td>
              {loadingExec ? (
                  <LoadingComponent />
                ) : EXEC_DTHU_MASS.PYE ? (
                  convertToFloat2Fixed(EXEC_DTHU_MASS.PYE)
                ) : (
                  ""
                )}
              </td>
              <td>
              {loadingExec ? (
                  <LoadingComponent />
                ) : EXEC_DTHU_MASS.DNO ? (
                  convertToFloat2Fixed(EXEC_DTHU_MASS.DNO)
                ) : (
                  ""
                )}
              </td>
              <td>
              {loadingExec ? (
                  <LoadingComponent />
                ) : EXEC_DTHU_MASS.KON ? (
                  convertToFloat2Fixed(EXEC_DTHU_MASS.KON)
                ) : (
                  ""
                )}
              </td>
              <td>
              {loadingExec ? (
                  <LoadingComponent />
                ) : EXEC_DTHU_MASS.CTY7 ? (
                  convertToFloat2Fixed(EXEC_DTHU_MASS.CTY7)
                ) : (
                  ""
                )}
              </td>
            </tr>
            <tr>
              <td className="text-sub4">%HTKH lũy kế </td>
              <td>
              {loadingExec || loadingPlan ? (
                  <LoadingComponent />
                ) : EXEC_DTHU_MASS.KHO && PLAN_DTHU_MASS.KHO ? (
                  convertToFloat2Fixed(
                    (EXEC_DTHU_MASS.KHO * 100) /
                      (PLAN_DTHU_MASS.KHO * 1000000)
                  )
                ) : (
                  ""
                )}
                <span className="text-sub4">%</span>
              </td>
              <td>
              {loadingExec || loadingPlan ? (
                  <LoadingComponent />
                ) : EXEC_DTHU_MASS.DLA && PLAN_DTHU_MASS.DLA ? (
                  convertToFloat2Fixed(
                    (EXEC_DTHU_MASS.DLA * 100) /
                      (PLAN_DTHU_MASS.DLA * 1000000)
                  )
                ) : (
                  ""
                )}
                <span className="text-sub4">%</span>
              </td>
              <td>
              {loadingExec || loadingPlan ? (
                  <LoadingComponent />
                ) : EXEC_DTHU_MASS.GLA && PLAN_DTHU_MASS.GLA ? (
                  convertToFloat2Fixed(
                    (EXEC_DTHU_MASS.GLA * 100) /
                      (PLAN_DTHU_MASS.GLA * 1000000)
                  )
                ) : (
                  ""
                )}
                <span className="text-sub4">%</span>
              </td>
              <td>
              {loadingExec || loadingPlan ? (
                  <LoadingComponent />
                ) : EXEC_DTHU_MASS.PYE && PLAN_DTHU_MASS.PYE ? (
                  convertToFloat2Fixed(
                    (EXEC_DTHU_MASS.PYE * 100) /
                      (PLAN_DTHU_MASS.PYE * 1000000)
                  )
                ) : (
                  ""
                )}
                <span className="text-sub4">%</span>
              </td>
              <td>
              {loadingExec || loadingPlan ? (
                  <LoadingComponent />
                ) : EXEC_DTHU_MASS.DNO && PLAN_DTHU_MASS.DNO ? (
                  convertToFloat2Fixed(
                    (EXEC_DTHU_MASS.DNO * 100) /
                      (PLAN_DTHU_MASS.DNO * 1000000)
                  )
                ) : (
                  ""
                )}
                <span className="text-sub4">%</span>
              </td>
              <td>
              {loadingExec || loadingPlan ? (
                  <LoadingComponent />
                ) : EXEC_DTHU_MASS.KON && PLAN_DTHU_MASS.KON ? (
                  convertToFloat2Fixed(
                    (EXEC_DTHU_MASS.KON * 100) /
                      (PLAN_DTHU_MASS.KON * 1000000)
                  )
                ) : (
                  ""
                )}
                <span className="text-sub4">%</span>
              </td>
              <td>
              {loadingExec || loadingPlan ? (
                  <LoadingComponent />
                ) : EXEC_DTHU_MASS.CTY7 && PLAN_DTHU_MASS.CTY7 ? (
                  convertToFloat2Fixed(
                    (EXEC_DTHU_MASS.CTY7 * 100) /
                      (PLAN_DTHU_MASS.CTY7 * 1000000)
                  )
                ) : (
                  ""
                )}
                <span className="text-sub4">%</span>
              </td>
            </tr>
            <tr>
              <td className="text-sub4">Ước %HTKH tháng</td>
              <td
                className={
                  convertToFloat2Fixed(
                    ((EXEC_DTHU_MASS.KHO / indexDateInMonth) *
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
                    ((EXEC_DTHU_MASS.KHO / indexDateInMonth) *
                      sumDateInMonth *
                      100) /
                      (PLAN_DTHU_MASS.KHO * 1000000)
                  )
                ) : (
                  ""
                )}
                <span className="text-sub4">%</span>
              </td>
              <td
                className={
                  convertToFloat2Fixed(
                    ((EXEC_DTHU_MASS.DLA / indexDateInMonth) *
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
                    ((EXEC_DTHU_MASS.DLA / indexDateInMonth) *
                      sumDateInMonth *
                      100) /
                      (PLAN_DTHU_MASS.DLA * 1000000)
                  )
                ) : (
                  ""
                )}
                <span className="text-sub4">%</span>
              </td>
              <td
                className={
                  convertToFloat2Fixed(
                    ((EXEC_DTHU_MASS.GLA / indexDateInMonth) *
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
                    ((EXEC_DTHU_MASS.GLA / indexDateInMonth) *
                      sumDateInMonth *
                      100) /
                      (PLAN_DTHU_MASS.GLA * 1000000)
                  )
                ) : (
                  ""
                )}
                <span className="text-sub4">%</span>
              </td>
              <td
                className={
                  convertToFloat2Fixed(
                    ((EXEC_DTHU_MASS.PYE / indexDateInMonth) *
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
                    ((EXEC_DTHU_MASS.PYE / indexDateInMonth) *
                      sumDateInMonth *
                      100) /
                      (PLAN_DTHU_MASS.PYE * 1000000)
                  )
                ) : (
                  ""
                )}
                <span className="text-sub4">%</span>
              </td>
              <td
                className={
                  convertToFloat2Fixed(
                    ((EXEC_DTHU_MASS.DNO / indexDateInMonth) *
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
                    ((EXEC_DTHU_MASS.DNO / indexDateInMonth) *
                      sumDateInMonth *
                      100) /
                      (PLAN_DTHU_MASS.DNO * 1000000)
                  )
                ) : (
                  ""
                )}
                <span className="text-sub4">%</span>
              </td>
              <td
                className={
                  convertToFloat2Fixed(
                    ((EXEC_DTHU_MASS.KON / indexDateInMonth) *
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
                    ((EXEC_DTHU_MASS.KON / indexDateInMonth) *
                      sumDateInMonth *
                      100) /
                      (PLAN_DTHU_MASS.KON * 1000000)
                  )
                ) : (
                  ""
                )}
                <span className="text-sub4">%</span>
              </td>
              <td
                className={
                  convertToFloat2Fixed(
                    ((EXEC_DTHU_MASS.CTY7 / indexDateInMonth) *
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
                    ((EXEC_DTHU_MASS.CTY7 / indexDateInMonth) *
                      sumDateInMonth *
                      100) /
                      (PLAN_DTHU_MASS.CTY7 * 1000000)
                  )
                ) : (
                  ""
                )}
                <span className="text-sub4">%</span>
              </td>
            </tr>
            <tr>
              <td rowSpan={4} className="text-sub3">
                3.2
              </td>
              <td rowSpan={4} className="text-sub3">
                Doanh thu dự án
              </td>
              <td rowSpan={4}>triệu đồng</td>
              <td className="text-sub4">Kế hoạch tháng</td>
              <td>
                {loadingPlan ? (
                  <LoadingComponent />
                ) : PLAN_DTHU_DUAN.KHO ? (
                  convertToFloat2Fixed(PLAN_DTHU_DUAN.KHO)
                ) : (
                  ""
                )}
              </td>
              <td>
                {loadingPlan ? (
                  <LoadingComponent />
                ) : PLAN_DTHU_DUAN.DLA ? (
                  convertToFloat2Fixed(PLAN_DTHU_DUAN.DLA)
                ) : (
                  ""
                )}
              </td>
              <td>
                {loadingPlan ? (
                  <LoadingComponent />
                ) : PLAN_DTHU_DUAN.GLA ? (
                  convertToFloat2Fixed(PLAN_DTHU_DUAN.GLA)
                ) : (
                  ""
                )}
              </td>
              <td>
                {loadingPlan ? (
                  <LoadingComponent />
                ) : PLAN_DTHU_DUAN.PYE ? (
                  convertToFloat2Fixed(PLAN_DTHU_DUAN.PYE)
                ) : (
                  ""
                )}
              </td>
              <td>
                {loadingPlan ? (
                  <LoadingComponent />
                ) : PLAN_DTHU_DUAN.DNO ? (
                  convertToFloat2Fixed(PLAN_DTHU_DUAN.DNO)
                ) : (
                  ""
                )}
              </td>
              <td>
                {loadingPlan ? (
                  <LoadingComponent />
                ) : PLAN_DTHU_DUAN.KON ? (
                  convertToFloat2Fixed(PLAN_DTHU_DUAN.KON)
                ) : (
                  ""
                )}
              </td>
              <td>
                {loadingPlan ? (
                  <LoadingComponent />
                ) : PLAN_DTHU_DUAN.CTY7 ? (
                  convertToFloat2Fixed(PLAN_DTHU_DUAN.CTY7)
                ) : (
                  ""
                )}
              </td>
              <td rowSpan={4}>CNS</td>
            </tr>
            <tr>
              <td className="text-sub4">Thực hiện lũy kế</td>
              <td>
              {loadingExec ? (
                  <LoadingComponent />
                ) : EXEC_DTHU_DUAN.KHO ? (
                  convertToFloat2Fixed(EXEC_DTHU_DUAN.KHO)
                ) : (
                  ""
                )}
              </td>
              <td>
              {loadingExec ? (
                  <LoadingComponent />
                ) : EXEC_DTHU_DUAN.DLA ? (
                  convertToFloat2Fixed(EXEC_DTHU_DUAN.DLA)
                ) : (
                  ""
                )}
              </td>
              <td>
              {loadingExec ? (
                  <LoadingComponent />
                ) : EXEC_DTHU_DUAN.GLA ? (
                  convertToFloat2Fixed(EXEC_DTHU_DUAN.GLA)
                ) : (
                  ""
                )}
              </td>
              <td>
              {loadingExec ? (
                  <LoadingComponent />
                ) : EXEC_DTHU_DUAN.PYE ? (
                  convertToFloat2Fixed(EXEC_DTHU_DUAN.PYE)
                ) : (
                  ""
                )}
              </td>
              <td>
              {loadingExec ? (
                  <LoadingComponent />
                ) : EXEC_DTHU_DUAN.DNO ? (
                  convertToFloat2Fixed(EXEC_DTHU_DUAN.DNO)
                ) : (
                  ""
                )}
              </td>
              <td>
              {loadingExec ? (
                  <LoadingComponent />
                ) : EXEC_DTHU_DUAN.KON ? (
                  convertToFloat2Fixed(EXEC_DTHU_DUAN.KON)
                ) : (
                  ""
                )}
              </td>
              <td>
              {loadingExec ? (
                  <LoadingComponent />
                ) : EXEC_DTHU_DUAN.CTY7 ? (
                  convertToFloat2Fixed(EXEC_DTHU_DUAN.CTY7)
                ) : (
                  ""
                )}
              </td>
            </tr>
            <tr>
              <td className="text-sub4">%HTKH lũy kế </td>
              <td>
              {loadingExec || loadingPlan ? (
                  <LoadingComponent />
                ) : EXEC_DTHU_DUAN.KHO && PLAN_DTHU_DUAN.KHO ? (
                  convertToFloat2Fixed(
                    (EXEC_DTHU_DUAN.KHO * 100) /
                      (PLAN_DTHU_DUAN.KHO * 1000000)
                  )
                ) : (
                  ""
                )}
                <span className="text-sub4">%</span>
              </td>
              <td>
              {loadingExec || loadingPlan ? (
                  <LoadingComponent />
                ) : EXEC_DTHU_DUAN.DLA && PLAN_DTHU_DUAN.DLA ? (
                  convertToFloat2Fixed(
                    (EXEC_DTHU_DUAN.DLA * 100) /
                      (PLAN_DTHU_DUAN.DLA * 1000000)
                  )
                ) : (
                  ""
                )}
                <span className="text-sub4">%</span>
              </td>
              <td>
              {loadingExec || loadingPlan ? (
                  <LoadingComponent />
                ) : EXEC_DTHU_DUAN.GLA && PLAN_DTHU_DUAN.GLA ? (
                  convertToFloat2Fixed(
                    (EXEC_DTHU_DUAN.GLA * 100) /
                      (PLAN_DTHU_DUAN.GLA * 1000000)
                  )
                ) : (
                  ""
                )}
                <span className="text-sub4">%</span>
              </td>
              <td>
              {loadingExec || loadingPlan ? (
                  <LoadingComponent />
                ) : EXEC_DTHU_DUAN.PYE && PLAN_DTHU_DUAN.PYE ? (
                  convertToFloat2Fixed(
                    (EXEC_DTHU_DUAN.PYE * 100) /
                      (PLAN_DTHU_DUAN.PYE * 1000000)
                  )
                ) : (
                  ""
                )}
                <span className="text-sub4">%</span>
              </td>
              <td>
              {loadingExec || loadingPlan ? (
                  <LoadingComponent />
                ) : EXEC_DTHU_DUAN.DNO && PLAN_DTHU_DUAN.DNO ? (
                  convertToFloat2Fixed(
                    (EXEC_DTHU_DUAN.DNO * 100) /
                      (PLAN_DTHU_DUAN.DNO * 1000000)
                  )
                ) : (
                  ""
                )}
                <span className="text-sub4">%</span>
              </td>
              <td>
              {loadingExec || loadingPlan ? (
                  <LoadingComponent />
                ) : EXEC_DTHU_DUAN.KON && PLAN_DTHU_DUAN.KON ? (
                  convertToFloat2Fixed(
                    (EXEC_DTHU_DUAN.KON * 100) /
                      (PLAN_DTHU_DUAN.KON * 1000000)
                  )
                ) : (
                  ""
                )}
                <span className="text-sub4">%</span>
              </td>
              <td>
              {loadingExec || loadingPlan ? (
                  <LoadingComponent />
                ) : EXEC_DTHU_DUAN.CTY7 && PLAN_DTHU_DUAN.CTY7 ? (
                  convertToFloat2Fixed(
                    (EXEC_DTHU_DUAN.CTY7 * 100) /
                      (PLAN_DTHU_DUAN.CTY7 * 1000000)
                  )
                ) : (
                  ""
                )}
                <span className="text-sub4">%</span>
              </td>
            </tr>
            <tr>
              <td className="text-sub4">Ước %HTKH tháng</td>
              <td
                className={
                  convertToFloat2Fixed(
                    ((EXEC_DTHU_DUAN.KHO / indexDateInMonth) *
                      sumDateInMonth *
                      100) /
                      (PLAN_DTHU_DUAN.KHO * 1000000)
                  ) > 100
                    ? "bg-green"
                    : "bg-red"
                }
              >
                {loadingExec || loadingPlan ? (
                  <LoadingComponent />
                ) : EXEC_DTHU_DUAN.KHO && PLAN_DTHU_DUAN.KHO ? (
                  convertToFloat2Fixed(
                    ((EXEC_DTHU_DUAN.KHO / indexDateInMonth) *
                      sumDateInMonth *
                      100) /
                      (PLAN_DTHU_DUAN.KHO * 1000000)
                  )
                ) : (
                  ""
                )}
                <span className="text-sub4">%</span>
              </td>
              <td
                className={
                  convertToFloat2Fixed(
                    ((EXEC_DTHU_DUAN.DLA / indexDateInMonth) *
                      sumDateInMonth *
                      100) /
                      (PLAN_DTHU_DUAN.DLA * 1000000)
                  ) > 100
                    ? "bg-green"
                    : "bg-red"
                }
              >
                {loadingExec || loadingPlan ? (
                  <LoadingComponent />
                ) : EXEC_DTHU_DUAN.DLA && PLAN_DTHU_DUAN.DLA ? (
                  convertToFloat2Fixed(
                    ((EXEC_DTHU_DUAN.DLA / indexDateInMonth) *
                      sumDateInMonth *
                      100) /
                      (PLAN_DTHU_DUAN.DLA * 1000000)
                  )
                ) : (
                  ""
                )}
                <span className="text-sub4">%</span>
              </td>
              <td
                className={
                  convertToFloat2Fixed(
                    ((EXEC_DTHU_DUAN.GLA / indexDateInMonth) *
                      sumDateInMonth *
                      100) /
                      (PLAN_DTHU_DUAN.GLA * 1000000)
                  ) > 100
                    ? "bg-green"
                    : "bg-red"
                }
              >
                {loadingExec || loadingPlan ? (
                  <LoadingComponent />
                ) : EXEC_DTHU_DUAN.GLA && PLAN_DTHU_DUAN.KHO ? (
                  convertToFloat2Fixed(
                    ((EXEC_DTHU_DUAN.GLA / indexDateInMonth) *
                      sumDateInMonth *
                      100) /
                      (PLAN_DTHU_DUAN.GLA * 1000000)
                  )
                ) : (
                  ""
                )}
                <span className="text-sub4">%</span>
              </td>
              <td
                className={
                  convertToFloat2Fixed(
                    ((EXEC_DTHU_DUAN.PYE / indexDateInMonth) *
                      sumDateInMonth *
                      100) /
                      (PLAN_DTHU_DUAN.PYE * 1000000)
                  ) > 100
                    ? "bg-green"
                    : "bg-red"
                }
              >
                {loadingExec || loadingPlan ? (
                  <LoadingComponent />
                ) : EXEC_DTHU_DUAN.PYE && PLAN_DTHU_DUAN.PYE ? (
                  convertToFloat2Fixed(
                    ((EXEC_DTHU_DUAN.PYE / indexDateInMonth) *
                      sumDateInMonth *
                      100) /
                      (PLAN_DTHU_DUAN.PYE * 1000000)
                  )
                ) : (
                  ""
                )}
                <span className="text-sub4">%</span>
              </td>
              <td
                className={
                  convertToFloat2Fixed(
                    ((EXEC_DTHU_DUAN.DNO / indexDateInMonth) *
                      sumDateInMonth *
                      100) /
                      (PLAN_DTHU_DUAN.DNO * 1000000)
                  ) > 100
                    ? "bg-green"
                    : "bg-red"
                }
              >
                {loadingExec || loadingPlan ? (
                  <LoadingComponent />
                ) : EXEC_DTHU_DUAN.DNO && PLAN_DTHU_DUAN.DNO ? (
                  convertToFloat2Fixed(
                    ((EXEC_DTHU_DUAN.DNO / indexDateInMonth) *
                      sumDateInMonth *
                      100) /
                      (PLAN_DTHU_DUAN.DNO * 1000000)
                  )
                ) : (
                  ""
                )}
                <span className="text-sub4">%</span>
              </td>
              <td
                className={
                  convertToFloat2Fixed(
                    ((EXEC_DTHU_DUAN.KON / indexDateInMonth) *
                      sumDateInMonth *
                      100) /
                      (PLAN_DTHU_DUAN.KON * 1000000)
                  ) > 100
                    ? "bg-green"
                    : "bg-red"
                }
              >
                {loadingExec || loadingPlan ? (
                  <LoadingComponent />
                ) : EXEC_DTHU_DUAN.KON && PLAN_DTHU_DUAN.KON ? (
                  convertToFloat2Fixed(
                    ((EXEC_DTHU_DUAN.KON / indexDateInMonth) *
                      sumDateInMonth *
                      100) /
                      (PLAN_DTHU_DUAN.KON * 1000000)
                  )
                ) : (
                  ""
                )}
                <span className="text-sub4">%</span>
              </td>
              <td
                className={
                  convertToFloat2Fixed(
                    ((EXEC_DTHU_DUAN.CTY7 / indexDateInMonth) *
                      sumDateInMonth *
                      100) /
                      (PLAN_DTHU_DUAN.CTY7 * 1000000)
                  ) > 100
                    ? "bg-green"
                    : "bg-red"
                }
              >
                {loadingExec || loadingPlan ? (
                  <LoadingComponent />
                ) : EXEC_DTHU_DUAN.CTY7 && PLAN_DTHU_DUAN.CTY7 ? (
                  convertToFloat2Fixed(
                    ((EXEC_DTHU_DUAN.CTY7 / indexDateInMonth) *
                      sumDateInMonth *
                      100) /
                      (PLAN_DTHU_DUAN.CTY7 * 1000000)
                  )
                ) : (
                  ""
                )}
                <span className="text-sub4">%</span>
              </td>
            </tr>

            <tr>
              <td rowSpan={4} className="text-sub2">
                4
              </td>
              <td rowSpan={4} className="text-sub2">
                Doanh thu NDS Platform
              </td>
              <td rowSpan={4}>triệu đồng</td>
              <td className="text-sub4">Kế hoạch tháng</td>
              <td>
                {loadingPlan ? (
                  <LoadingComponent />
                ) : PLAN_DTHU_NDS.KHO ? (
                  convertToFloat2Fixed(PLAN_DTHU_NDS.KHO)
                ) : (
                  ""
                )}
              </td>
              <td>
                {loadingPlan ? (
                  <LoadingComponent />
                ) : PLAN_DTHU_NDS.DLA ? (
                  convertToFloat2Fixed(PLAN_DTHU_NDS.DLA)
                ) : (
                  ""
                )}
              </td>
              <td>
                {loadingPlan ? (
                  <LoadingComponent />
                ) : PLAN_DTHU_NDS.GLA ? (
                  convertToFloat2Fixed(PLAN_DTHU_NDS.GLA)
                ) : (
                  ""
                )}
              </td>
              <td>
                {loadingPlan ? (
                  <LoadingComponent />
                ) : PLAN_DTHU_NDS.PYE ? (
                  convertToFloat2Fixed(PLAN_DTHU_NDS.PYE)
                ) : (
                  ""
                )}
              </td>
              <td>
                {loadingPlan ? (
                  <LoadingComponent />
                ) : PLAN_DTHU_NDS.DNO ? (
                  convertToFloat2Fixed(PLAN_DTHU_NDS.DNO)
                ) : (
                  ""
                )}
              </td>
              <td>
                {loadingPlan ? (
                  <LoadingComponent />
                ) : PLAN_DTHU_NDS.KON ? (
                  convertToFloat2Fixed(PLAN_DTHU_NDS.KON)
                ) : (
                  ""
                )}
              </td>
              <td>
                {loadingPlan ? (
                  <LoadingComponent />
                ) : PLAN_DTHU_NDS.CTY7 ? (
                  convertToFloat2Fixed(PLAN_DTHU_NDS.CTY7)
                ) : (
                  ""
                )}
              </td>
              <td rowSpan={4}>CNS</td>
            </tr>
            <tr>
              <td className="text-sub4">Thực hiện lũy kế</td>
              <td>
              {loadingExec ? (
                  <LoadingComponent />
                ) : EXEC_DTHU_NDS.KHO ? (
                  convertToFloat2Fixed(EXEC_DTHU_NDS.KHO/1000000)
                ) : (
                  ""
                )}
              </td>
              <td>
              {loadingExec ? (
                  <LoadingComponent />
                ) : EXEC_DTHU_NDS.DLA ? (
                  convertToFloat2Fixed(EXEC_DTHU_NDS.DLA/1000000)
                ) : (
                  ""
                )}
              </td>
              <td>
              {loadingExec ? (
                  <LoadingComponent />
                ) : EXEC_DTHU_NDS.GLA ? (
                  convertToFloat2Fixed(EXEC_DTHU_NDS.GLA/1000000)
                ) : (
                  ""
                )}
              </td>
              <td>
              {loadingExec ? (
                  <LoadingComponent />
                ) : EXEC_DTHU_NDS.PYE ? (
                  convertToFloat2Fixed(EXEC_DTHU_NDS.PYE/1000000)
                ) : (
                  ""
                )}
              </td>
              <td>
              {loadingExec ? (
                  <LoadingComponent />
                ) : EXEC_DTHU_NDS.DNO ? (
                  convertToFloat2Fixed(EXEC_DTHU_NDS.DNO/1000000)
                ) : (
                  ""
                )}
              </td>
              <td>
              {loadingExec ? (
                  <LoadingComponent />
                ) : EXEC_DTHU_NDS.KON ? (
                  convertToFloat2Fixed(EXEC_DTHU_NDS.KON/1000000)
                ) : (
                  ""
                )}
              </td>
              <td>
              {loadingExec ? (
                  <LoadingComponent />
                ) : EXEC_DTHU_NDS.CTY7 ? (
                  convertToFloat2Fixed(EXEC_DTHU_NDS.CTY7/1000000)
                ) : (
                  ""
                )}
              </td>
            </tr>
            <tr>
              <td className="text-sub4">%HTKH lũy kế </td>
              <td>
              {loadingExec || loadingPlan ? (
                  <LoadingComponent />
                ) : EXEC_DTHU_NDS.KHO && PLAN_DTHU_NDS.KHO ? (
                  convertToFloat2Fixed(
                    (EXEC_DTHU_NDS.KHO * 100) /
                      (PLAN_DTHU_NDS.KHO * 1000000)
                  )
                ) : (
                  ""
                )}
                <span className="text-sub4">%</span>
              </td>
              <td>
              {loadingExec || loadingPlan ? (
                  <LoadingComponent />
                ) : EXEC_DTHU_NDS.DLA && PLAN_DTHU_NDS.DLA ? (
                  convertToFloat2Fixed(
                    (EXEC_DTHU_NDS.DLA * 100) /
                      (PLAN_DTHU_NDS.DLA * 1000000)
                  )
                ) : (
                  ""
                )}
                <span className="text-sub4">%</span>
              </td>
              <td>
              {loadingExec || loadingPlan ? (
                  <LoadingComponent />
                ) : EXEC_DTHU_NDS.GLA && PLAN_DTHU_NDS.GLA ? (
                  convertToFloat2Fixed(
                    (EXEC_DTHU_NDS.GLA * 100) /
                      (PLAN_DTHU_NDS.GLA * 1000000)
                  )
                ) : (
                  ""
                )}
                <span className="text-sub4">%</span>
              </td>
              <td>
              {loadingExec || loadingPlan ? (
                  <LoadingComponent />
                ) : EXEC_DTHU_NDS.PYE && PLAN_DTHU_NDS.PYE ? (
                  convertToFloat2Fixed(
                    (EXEC_DTHU_NDS.PYE * 100) /
                      (PLAN_DTHU_NDS.PYE * 1000000)
                  )
                ) : (
                  ""
                )}
                <span className="text-sub4">%</span>
              </td>
              <td>
              {loadingExec || loadingPlan ? (
                  <LoadingComponent />
                ) : EXEC_DTHU_NDS.DNO && PLAN_DTHU_NDS.DNO ? (
                  convertToFloat2Fixed(
                    (EXEC_DTHU_NDS.DNO * 100) /
                      (PLAN_DTHU_NDS.DNO * 1000000)
                  )
                ) : (
                  ""
                )}
                <span className="text-sub4">%</span>
              </td>
              <td>
              {loadingExec || loadingPlan ? (
                  <LoadingComponent />
                ) : EXEC_DTHU_NDS.KON && PLAN_DTHU_NDS.KON ? (
                  convertToFloat2Fixed(
                    (EXEC_DTHU_NDS.KON * 100) /
                      (PLAN_DTHU_NDS.KON * 1000000)
                  )
                ) : (
                  ""
                )}
                <span className="text-sub4">%</span>
              </td>
              <td>
              {loadingExec || loadingPlan ? (
                  <LoadingComponent />
                ) : EXEC_DTHU_NDS.CTY7 && PLAN_DTHU_NDS.CTY7 ? (
                  convertToFloat2Fixed(
                    (EXEC_DTHU_NDS.CTY7 * 100) /
                      (PLAN_DTHU_NDS.CTY7 * 1000000)
                  )
                ) : (
                  ""
                )}
                <span className="text-sub4">%</span>
              </td>
            </tr>
            <tr>
              <td className="text-sub4">Ước %HTKH tháng</td>
              <td
                className={
                  convertToFloat2Fixed(
                    ((EXEC_DTHU_NDS.KHO / indexDateInMonth) *
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
                    ((EXEC_DTHU_NDS.KHO / indexDateInMonth) *
                      sumDateInMonth *
                      100) /
                      (PLAN_DTHU_NDS.KHO * 1000000)
                  )
                ) : (
                  ""
                )}
                <span className="text-sub4">%</span>
              </td>
              <td
                className={
                  convertToFloat2Fixed(
                    ((EXEC_DTHU_NDS.DLA / indexDateInMonth) *
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
                    ((EXEC_DTHU_NDS.DLA / indexDateInMonth) *
                      sumDateInMonth *
                      100) /
                      (PLAN_DTHU_NDS.DLA * 1000000)
                  )
                ) : (
                  ""
                )}
                <span className="text-sub4">%</span>
              </td>
              <td
                className={
                  convertToFloat2Fixed(
                    ((EXEC_DTHU_NDS.GLA / indexDateInMonth) *
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
                    ((EXEC_DTHU_NDS.GLA / indexDateInMonth) *
                      sumDateInMonth *
                      100) /
                      (PLAN_DTHU_NDS.GLA * 1000000)
                  )
                ) : (
                  ""
                )}
                <span className="text-sub4">%</span>
              </td>
              <td
                className={
                  convertToFloat2Fixed(
                    ((EXEC_DTHU_NDS.PYE / indexDateInMonth) *
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
                    ((EXEC_DTHU_NDS.PYE / indexDateInMonth) *
                      sumDateInMonth *
                      100) /
                      (PLAN_DTHU_NDS.PYE * 1000000)
                  )
                ) : (
                  ""
                )}
                <span className="text-sub4">%</span>
              </td>
              <td
                className={
                  convertToFloat2Fixed(
                    ((EXEC_DTHU_NDS.DNO / indexDateInMonth) *
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
                    ((EXEC_DTHU_NDS.DNO / indexDateInMonth) *
                      sumDateInMonth *
                      100) /
                      (PLAN_DTHU_NDS.DNO * 1000000)
                  )
                ) : (
                  ""
                )}
                <span className="text-sub4">%</span>
              </td>
              <td
                className={
                  convertToFloat2Fixed(
                    ((EXEC_DTHU_NDS.KON / indexDateInMonth) *
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
                    ((EXEC_DTHU_NDS.KON / indexDateInMonth) *
                      sumDateInMonth *
                      100) /
                      (PLAN_DTHU_NDS.KON * 1000000)
                  )
                ) : (
                  ""
                )}
                <span className="text-sub4">%</span>
              </td>
              <td
                className={
                  convertToFloat2Fixed(
                    ((EXEC_DTHU_NDS.CTY7 / indexDateInMonth) *
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
                    ((EXEC_DTHU_NDS.CTY7 / indexDateInMonth) *
                      sumDateInMonth *
                      100) /
                      (PLAN_DTHU_NDS.CTY7 * 1000000)
                  )
                ) : (
                  ""
                )}
                <span className="text-sub4">%</span>
              </td>
            </tr>
            <tr>
              <td rowSpan={4} className="text-sub2">
                5
              </td>
              <td rowSpan={4} className="text-sub2">
                Doanh thu thương hiệu giới trẻ
              </td>
              <td rowSpan={4}>triệu đồng</td>
              <td className="text-sub4">Kế hoạch tháng</td>
              <td>
                {loadingPlan ? (
                  <LoadingComponent />
                ) : PLAN_DTHU_SAYMEE.KHO ? (
                  convertToFloat2Fixed(PLAN_DTHU_SAYMEE.KHO)
                ) : (
                  ""
                )}
              </td>
              <td>
                {loadingPlan ? (
                  <LoadingComponent />
                ) : PLAN_DTHU_SAYMEE.DLA ? (
                  convertToFloat2Fixed(PLAN_DTHU_SAYMEE.DLA)
                ) : (
                  ""
                )}
              </td>
              <td>
                {loadingPlan ? (
                  <LoadingComponent />
                ) : PLAN_DTHU_SAYMEE.GLA ? (
                  convertToFloat2Fixed(PLAN_DTHU_SAYMEE.GLA)
                ) : (
                  ""
                )}
              </td>
              <td>
                {loadingPlan ? (
                  <LoadingComponent />
                ) : PLAN_DTHU_SAYMEE.PYE ? (
                  convertToFloat2Fixed(PLAN_DTHU_SAYMEE.PYE)
                ) : (
                  ""
                )}
              </td>
              <td>
                {loadingPlan ? (
                  <LoadingComponent />
                ) : PLAN_DTHU_SAYMEE.DNO ? (
                  convertToFloat2Fixed(PLAN_DTHU_SAYMEE.DNO)
                ) : (
                  ""
                )}
              </td>
              <td>
                {loadingPlan ? (
                  <LoadingComponent />
                ) : PLAN_DTHU_SAYMEE.KON ? (
                  convertToFloat2Fixed(PLAN_DTHU_SAYMEE.KON)
                ) : (
                  ""
                )}
              </td>
              <td>
                {loadingPlan ? (
                  <LoadingComponent />
                ) : PLAN_DTHU_SAYMEE.CTY7 ? (
                  convertToFloat2Fixed(PLAN_DTHU_SAYMEE.CTY7)
                ) : (
                  ""
                )}
              </td>
              <td rowSpan={4}>DVVT</td>
            </tr>
            <tr>
              <td className="text-sub4">Thực hiện lũy kế</td>
              <td>
                {loadingExec ? (
                  <LoadingComponent />
                ) : EXEC_DTHU_SAYMEE.KHO ? (
                  convertToFloat2Fixed(EXEC_DTHU_SAYMEE.KHO / 1000000)
                ) : (
                  ""
                )}
              </td>
              <td>
                {loadingExec ? (
                  <LoadingComponent />
                ) : EXEC_DTHU_SAYMEE.DLA ? (
                  convertToFloat2Fixed(EXEC_DTHU_SAYMEE.DLA / 1000000)
                ) : (
                  ""
                )}
              </td>
              <td>
                {loadingExec ? (
                  <LoadingComponent />
                ) : EXEC_DTHU_SAYMEE.GLA ? (
                  convertToFloat2Fixed(EXEC_DTHU_SAYMEE.GLA / 1000000)
                ) : (
                  ""
                )}
              </td>
              <td>
                {loadingExec ? (
                  <LoadingComponent />
                ) : EXEC_DTHU_SAYMEE.PYE ? (
                  convertToFloat2Fixed(EXEC_DTHU_SAYMEE.PYE / 1000000)
                ) : (
                  ""
                )}
              </td>
              <td>
                {loadingExec ? (
                  <LoadingComponent />
                ) : EXEC_DTHU_SAYMEE.DNO ? (
                  convertToFloat2Fixed(EXEC_DTHU_SAYMEE.DNO / 1000000)
                ) : (
                  ""
                )}
              </td>
              <td>
                {loadingExec ? (
                  <LoadingComponent />
                ) : EXEC_DTHU_SAYMEE.KON ? (
                  convertToFloat2Fixed(EXEC_DTHU_SAYMEE.KON / 1000000)
                ) : (
                  ""
                )}
              </td>
              <td>
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
              <td className="text-sub4">%HTKH lũy kế </td>
              <td>
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
                <span className="text-sub4">%</span>
              </td>
              <td>
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
                <span className="text-sub4">%</span>
              </td>
              <td>
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
                <span className="text-sub4">%</span>
              </td>
              <td>
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
                <span className="text-sub4">%</span>
              </td>
              <td>
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
                <span className="text-sub4">%</span>
              </td>
              <td>
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
                <span className="text-sub4">%</span>
              </td>
              <td>
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
                <span className="text-sub4">%</span>
              </td>
            </tr>
            <tr>
              <td className="text-sub4">Ước %HTKH tháng</td>
              <td
                className={
                  convertToFloat2Fixed(
                    ((EXEC_DTHU_SAYMEE.KHO / indexDateInMonth) *
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
                    ((EXEC_DTHU_SAYMEE.KHO / indexDateInMonth) *
                      sumDateInMonth *
                      100) /
                      (PLAN_DTHU_SAYMEE.KHO * 1000000)
                  )
                ) : (
                  ""
                )}
                <span className="text-sub4">%</span>
              </td>
              <td
                className={
                  convertToFloat2Fixed(
                    ((EXEC_DTHU_SAYMEE.DLA / indexDateInMonth) *
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
                    ((EXEC_DTHU_SAYMEE.DLA / indexDateInMonth) *
                      sumDateInMonth *
                      100) /
                      (PLAN_DTHU_SAYMEE.DLA * 1000000)
                  )
                ) : (
                  ""
                )}
                <span className="text-sub4">%</span>
              </td>
              <td
                className={
                  convertToFloat2Fixed(
                    ((EXEC_DTHU_SAYMEE.GLA / indexDateInMonth) *
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
                    ((EXEC_DTHU_SAYMEE.GLA / indexDateInMonth) *
                      sumDateInMonth *
                      100) /
                      (PLAN_DTHU_SAYMEE.GLA * 1000000)
                  )
                ) : (
                  ""
                )}
                <span className="text-sub4">%</span>
              </td>
              <td
                className={
                  convertToFloat2Fixed(
                    ((EXEC_DTHU_SAYMEE.PYE / indexDateInMonth) *
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
                    ((EXEC_DTHU_SAYMEE.PYE / indexDateInMonth) *
                      sumDateInMonth *
                      100) /
                      (PLAN_DTHU_SAYMEE.PYE * 1000000)
                  )
                ) : (
                  ""
                )}
                <span className="text-sub4">%</span>
              </td>
              <td
                className={
                  convertToFloat2Fixed(
                    ((EXEC_DTHU_SAYMEE.DNO / indexDateInMonth) *
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
                    ((EXEC_DTHU_SAYMEE.DNO / indexDateInMonth) *
                      sumDateInMonth *
                      100) /
                      (PLAN_DTHU_SAYMEE.DNO * 1000000)
                  )
                ) : (
                  ""
                )}
                <span className="text-sub4">%</span>
              </td>
              <td
                className={
                  convertToFloat2Fixed(
                    ((EXEC_DTHU_SAYMEE.KON / indexDateInMonth) *
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
                    ((EXEC_DTHU_SAYMEE.KON / indexDateInMonth) *
                      sumDateInMonth *
                      100) /
                      (PLAN_DTHU_SAYMEE.KON * 1000000)
                  )
                ) : (
                  ""
                )}
                <span className="text-sub4">%</span>
              </td>
              <td
                className={
                  convertToFloat2Fixed(
                    ((EXEC_DTHU_SAYMEE.CTY7 / indexDateInMonth) *
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
                    ((EXEC_DTHU_SAYMEE.CTY7 / indexDateInMonth) *
                      sumDateInMonth *
                      100) /
                      (PLAN_DTHU_SAYMEE.CTY7 * 1000000)
                  )
                ) : (
                  ""
                )}
                <span className="text-sub4">%</span>
              </td>
            </tr>

            <tr>
              <td rowSpan={4} className="text-sub2">
                6
              </td>
              <td rowSpan={4} className="text-sub2">
                Doanh thu GPS không gian mới
              </td>
              <td rowSpan={4}>triệu đồng</td>
              <td className="text-sub4">Kế hoạch tháng</td>
              <td>
                {loadingPlan ? (
                  <LoadingComponent />
                ) : PLAN_DTHU_GPS.KHO ? (
                  convertToFloat2Fixed(PLAN_DTHU_GPS.KHO)
                ) : (
                  ""
                )}
              </td>
              <td>
                {loadingPlan ? (
                  <LoadingComponent />
                ) : PLAN_DTHU_GPS.DLA ? (
                  convertToFloat2Fixed(PLAN_DTHU_GPS.DLA)
                ) : (
                  ""
                )}
              </td>
              <td>
                {loadingPlan ? (
                  <LoadingComponent />
                ) : PLAN_DTHU_GPS.GLA ? (
                  convertToFloat2Fixed(PLAN_DTHU_GPS.GLA)
                ) : (
                  ""
                )}
              </td>
              <td>
                {loadingPlan ? (
                  <LoadingComponent />
                ) : PLAN_DTHU_GPS.PYE ? (
                  convertToFloat2Fixed(PLAN_DTHU_GPS.PYE)
                ) : (
                  ""
                )}
              </td>
              <td>
                {loadingPlan ? (
                  <LoadingComponent />
                ) : PLAN_DTHU_GPS.DNO ? (
                  convertToFloat2Fixed(PLAN_DTHU_GPS.DNO)
                ) : (
                  ""
                )}
              </td>
              <td>
                {loadingPlan ? (
                  <LoadingComponent />
                ) : PLAN_DTHU_GPS.KON ? (
                  convertToFloat2Fixed(PLAN_DTHU_GPS.KON)
                ) : (
                  ""
                )}
              </td>
              <td>
                {loadingPlan ? (
                  <LoadingComponent />
                ) : PLAN_DTHU_GPS.CTY7 ? (
                  convertToFloat2Fixed(PLAN_DTHU_GPS.CTY7)
                ) : (
                  ""
                )}
              </td>
              <td rowSpan={4}>CNS</td>
            </tr>
            <tr>
              <td className="text-sub4">Thực hiện lũy kế</td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
            </tr>
            <tr>
              <td className="text-sub4">%HTKH lũy kế </td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
            </tr>
            <tr>
              <td className="text-sub4">Ước %HTKH tháng</td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
            </tr>
            <tr>
              <td className="text-sub1">II</td>
              <td className="text-sub1" colSpan={12}>
                <span className="text-bold">Viễn cảnh khách hàng</span>
              </td>
            </tr>
            <tr>
              <td className="text-sub2">7</td>
              <td colSpan={11} className="text-sub2">
                Phát triển kênh phân phối
              </td>
            </tr>
            <tr>
              <td rowSpan={4} className="text-sub3">
                7.1
              </td>
              <td rowSpan={4} className="text-sub3">
                Số lượng điểm C2C
              </td>
              <td rowSpan={4}>điểm</td>
              <td className="text-sub4">Kế hoạch tháng</td>
              <td>
                {loadingPlan ? (
                  <LoadingComponent />
                ) : PLAN_SL_C2C.KHO ? (
                  parseInt(PLAN_SL_C2C.KHO)
                ) : (
                  ""
                )}
              </td>
              <td>
                {loadingPlan ? (
                  <LoadingComponent />
                ) : PLAN_SL_C2C.DLA ? (
                  parseInt(PLAN_SL_C2C.DLA)
                ) : (
                  ""
                )}
              </td>
              <td>
                {loadingPlan ? (
                  <LoadingComponent />
                ) : PLAN_SL_C2C.GLA ? (
                  parseInt(PLAN_SL_C2C.GLA)
                ) : (
                  ""
                )}
              </td>
              <td>
                {loadingPlan ? (
                  <LoadingComponent />
                ) : PLAN_SL_C2C.PYE ? (
                  parseInt(PLAN_SL_C2C.PYE)
                ) : (
                  ""
                )}
              </td>
              <td>
                {loadingPlan ? (
                  <LoadingComponent />
                ) : PLAN_SL_C2C.DNO ? (
                  parseInt(PLAN_SL_C2C.DNO)
                ) : (
                  ""
                )}
              </td>
              <td>
                {loadingPlan ? (
                  <LoadingComponent />
                ) : PLAN_SL_C2C.KON ? (
                  parseInt(PLAN_SL_C2C.KON)
                ) : (
                  ""
                )}
              </td>
              <td>
                {loadingPlan ? (
                  <LoadingComponent />
                ) : PLAN_SL_C2C.CTY7 ? (
                  parseInt(PLAN_SL_C2C.CTY7)
                ) : (
                  ""
                )}
              </td>
              <td rowSpan={4}>DVVT</td>
            </tr>
            <tr>
              <td className="text-sub4">Thực hiện lũy kế</td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
            </tr>
            <tr>
              <td className="text-sub4">%HTKH lũy kế </td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
            </tr>
            <tr>
              <td className="text-sub4">Ước %HTKH tháng</td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
            </tr>

            <tr>
              <td rowSpan={4} className="text-sub3">
                7.2
              </td>
              <td rowSpan={4} className="text-sub3">
                Số lượng TB PTM qua kênh C2C
              </td>
              <td rowSpan={4}>thuê bao</td>
              <td className="text-sub4">Kế hoạch tháng</td>
              <td>
                {loadingPlan ? (
                  <LoadingComponent />
                ) : PLAN_SL_TB_C2C.KHO ? (
                  parseInt(PLAN_SL_TB_C2C.KHO)
                ) : (
                  ""
                )}
              </td>
              <td>
                {loadingPlan ? (
                  <LoadingComponent />
                ) : PLAN_SL_TB_C2C.DLA ? (
                  parseInt(PLAN_SL_TB_C2C.DLA)
                ) : (
                  ""
                )}
              </td>
              <td>
                {loadingPlan ? (
                  <LoadingComponent />
                ) : PLAN_SL_TB_C2C.GLA ? (
                  parseInt(PLAN_SL_TB_C2C.GLA)
                ) : (
                  ""
                )}
              </td>
              <td>
                {loadingPlan ? (
                  <LoadingComponent />
                ) : PLAN_SL_TB_C2C.PYE ? (
                  parseInt(PLAN_SL_TB_C2C.PYE)
                ) : (
                  ""
                )}
              </td>
              <td>
                {loadingPlan ? (
                  <LoadingComponent />
                ) : PLAN_SL_TB_C2C.DNO ? (
                  parseInt(PLAN_SL_TB_C2C.DNO)
                ) : (
                  ""
                )}
              </td>
              <td>
                {loadingPlan ? (
                  <LoadingComponent />
                ) : PLAN_SL_TB_C2C.KON ? (
                  parseInt(PLAN_SL_TB_C2C.KON)
                ) : (
                  ""
                )}
              </td>
              <td>
                {loadingPlan ? (
                  <LoadingComponent />
                ) : PLAN_SL_TB_C2C.CTY7 ? (
                  parseInt(PLAN_SL_TB_C2C.CTY7)
                ) : (
                  ""
                )}
              </td>
              <td rowSpan={4}>DVVT</td>
            </tr>
            <tr>
              <td className="text-sub4">Thực hiện lũy kế</td>
              <td>
                {loadingExec ? (
                  <LoadingComponent />
                ) : EXEC_SL_TB_C2C.KHO ? (
                  parseInt(EXEC_SL_TB_C2C.KHO)
                ) : (
                  ""
                )}
              </td>
              <td>
                {loadingExec ? (
                  <LoadingComponent />
                ) : EXEC_SL_TB_C2C.DLA ? (
                  parseInt(EXEC_SL_TB_C2C.DLA)
                ) : (
                  ""
                )}
              </td>
              <td>
                {loadingExec ? (
                  <LoadingComponent />
                ) : EXEC_SL_TB_C2C.GLA ? (
                  parseInt(EXEC_SL_TB_C2C.GLA)
                ) : (
                  ""
                )}
              </td>
              <td>
                {loadingExec ? (
                  <LoadingComponent />
                ) : EXEC_SL_TB_C2C.PYE ? (
                  parseInt(EXEC_SL_TB_C2C.PYE)
                ) : (
                  ""
                )}
              </td>

              <td>
                {loadingExec ? (
                  <LoadingComponent />
                ) : EXEC_SL_TB_C2C.DNO ? (
                  parseInt(EXEC_SL_TB_C2C.DNO)
                ) : (
                  ""
                )}
              </td>
              <td>
                {loadingExec ? (
                  <LoadingComponent />
                ) : EXEC_SL_TB_C2C.KON ? (
                  parseInt(EXEC_SL_TB_C2C.KON)
                ) : (
                  ""
                )}
              </td>
              <td>
                {loadingExec ? (
                  <LoadingComponent />
                ) : EXEC_SL_TB_C2C.CTY7 ? (
                  parseInt(EXEC_SL_TB_C2C.CTY7)
                ) : (
                  ""
                )}
              </td>
            </tr>
            <tr>
              <td className="text-sub4">%HTKH lũy kế </td>
              <td>
                {loadingExec || loadingPlan ? (
                  <LoadingComponent />
                ) : EXEC_SL_TB_C2C.KHO && PLAN_SL_TB_C2C.KHO ? (
                  convertToFloat2Fixed(
                    (EXEC_SL_TB_C2C.KHO * 100) / PLAN_SL_TB_C2C.KHO
                  )
                ) : (
                  ""
                )}
                <span className="text-sub4">%</span>
              </td>
              <td>
                {loadingExec || loadingPlan ? (
                  <LoadingComponent />
                ) : EXEC_SL_TB_C2C.DLA && PLAN_SL_TB_C2C.DLA ? (
                  convertToFloat2Fixed(
                    (EXEC_SL_TB_C2C.DLA * 100) / PLAN_SL_TB_C2C.DLA
                  )
                ) : (
                  ""
                )}
                <span className="text-sub4">%</span>
              </td>
              <td>
                {loadingExec || loadingPlan ? (
                  <LoadingComponent />
                ) : EXEC_SL_TB_C2C.GLA && PLAN_SL_TB_C2C.GLA ? (
                  convertToFloat2Fixed(
                    (EXEC_SL_TB_C2C.GLA * 100) / PLAN_SL_TB_C2C.GLA
                  )
                ) : (
                  ""
                )}
                <span className="text-sub4">%</span>
              </td>
              <td>
                {loadingExec || loadingPlan ? (
                  <LoadingComponent />
                ) : EXEC_SL_TB_C2C.PYE && PLAN_SL_TB_C2C.PYE ? (
                  convertToFloat2Fixed(
                    (EXEC_SL_TB_C2C.PYE * 100) / PLAN_SL_TB_C2C.PYE
                  )
                ) : (
                  ""
                )}
                <span className="text-sub4">%</span>
              </td>
              <td>
                {loadingExec || loadingPlan ? (
                  <LoadingComponent />
                ) : EXEC_SL_TB_C2C.DNO && PLAN_SL_TB_C2C.DNO ? (
                  convertToFloat2Fixed(
                    (EXEC_SL_TB_C2C.DNO * 100) / PLAN_SL_TB_C2C.DNO
                  )
                ) : (
                  ""
                )}
                <span className="text-sub4">%</span>
              </td>
              <td>
                {loadingExec || loadingPlan ? (
                  <LoadingComponent />
                ) : EXEC_SL_TB_C2C.KON && PLAN_SL_TB_C2C.KON ? (
                  convertToFloat2Fixed(
                    (EXEC_SL_TB_C2C.KON * 100) / PLAN_SL_TB_C2C.KON
                  )
                ) : (
                  ""
                )}
                <span className="text-sub4">%</span>
              </td>
              <td>
                {loadingExec || loadingPlan ? (
                  <LoadingComponent />
                ) : EXEC_SL_TB_C2C.CTY7 && PLAN_SL_TB_C2C.CTY7 ? (
                  convertToFloat2Fixed(
                    (EXEC_SL_TB_C2C.CTY7 * 100) / PLAN_SL_TB_C2C.CTY7
                  )
                ) : (
                  ""
                )}
                <span className="text-sub4">%</span>
              </td>
            </tr>
            <tr>
              <td className="text-sub4">Ước %HTKH tháng</td>
              <td
                className={
                  convertToFloat2Fixed(
                    ((EXEC_SL_TB_C2C.KHO / indexDateInMonth) *
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
                    ((EXEC_SL_TB_C2C.KHO / indexDateInMonth) *
                      sumDateInMonth *
                      100) /
                      PLAN_SL_TB_C2C.KHO
                  )
                ) : (
                  ""
                )}
                <span className="text-sub4">%</span>
              </td>
              <td
                className={
                  convertToFloat2Fixed(
                    ((EXEC_SL_TB_C2C.DLA / indexDateInMonth) *
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
                    ((EXEC_SL_TB_C2C.DLA / indexDateInMonth) *
                      sumDateInMonth *
                      100) /
                      PLAN_SL_TB_C2C.DLA
                  )
                ) : (
                  ""
                )}
                <span className="text-sub4">%</span>
              </td>
              <td
                className={
                  convertToFloat2Fixed(
                    ((EXEC_SL_TB_C2C.GLA / indexDateInMonth) *
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
                    ((EXEC_SL_TB_C2C.GLA / indexDateInMonth) *
                      sumDateInMonth *
                      100) /
                      PLAN_SL_TB_C2C.GLA
                  )
                ) : (
                  ""
                )}
                <span className="text-sub4">%</span>
              </td>
              <td
                className={
                  convertToFloat2Fixed(
                    ((EXEC_SL_TB_C2C.PYE / indexDateInMonth) *
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
                    ((EXEC_SL_TB_C2C.PYE / indexDateInMonth) *
                      sumDateInMonth *
                      100) /
                      PLAN_SL_TB_C2C.PYE
                  )
                ) : (
                  ""
                )}
                <span className="text-sub4">%</span>
              </td>
              <td
                className={
                  convertToFloat2Fixed(
                    ((EXEC_SL_TB_C2C.DNO / indexDateInMonth) *
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
                    ((EXEC_SL_TB_C2C.DNO / indexDateInMonth) *
                      sumDateInMonth *
                      100) /
                      PLAN_SL_TB_C2C.DNO
                  )
                ) : (
                  ""
                )}
                <span className="text-sub4">%</span>
              </td>
              <td
                className={
                  convertToFloat2Fixed(
                    ((EXEC_SL_TB_C2C.KON / indexDateInMonth) *
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
                    ((EXEC_SL_TB_C2C.KON / indexDateInMonth) *
                      sumDateInMonth *
                      100) /
                      PLAN_SL_TB_C2C.KON
                  )
                ) : (
                  ""
                )}
                <span className="text-sub4">%</span>
              </td>
              <td
                className={
                  convertToFloat2Fixed(
                    ((EXEC_SL_TB_C2C.CTY7 / indexDateInMonth) *
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
                    ((EXEC_SL_TB_C2C.CTY7 / indexDateInMonth) *
                      sumDateInMonth *
                      100) /
                      PLAN_SL_TB_C2C.CTY7
                  )
                ) : (
                  ""
                )}
                <span className="text-sub4">%</span>
              </td>
            </tr>

            <tr>
              <td rowSpan={4} className="text-sub3">
                7.3
              </td>
              <td rowSpan={4} className="text-sub3">
                Tỷ lệ Điểm bán C2C có phát sinh giao dịch
              </td>
              <td rowSpan={4}>thuê bao</td>
              <td className="text-sub4">Kế hoạch tháng</td>
              <td>
                {loadingPlan ? (
                  <LoadingComponent />
                ) : PLAN_TYLE_GD_C2C.KHO ? (
                  parseInt(PLAN_TYLE_GD_C2C.KHO)
                ) : (
                  ""
                )}
              </td>
              <td>
                {loadingPlan ? (
                  <LoadingComponent />
                ) : PLAN_TYLE_GD_C2C.DLA ? (
                  parseInt(PLAN_TYLE_GD_C2C.DLA)
                ) : (
                  ""
                )}
              </td>
              <td>
                {loadingPlan ? (
                  <LoadingComponent />
                ) : PLAN_TYLE_GD_C2C.GLA ? (
                  parseInt(PLAN_TYLE_GD_C2C.GLA)
                ) : (
                  ""
                )}
              </td>
              <td>
                {loadingPlan ? (
                  <LoadingComponent />
                ) : PLAN_TYLE_GD_C2C.PYE ? (
                  parseInt(PLAN_TYLE_GD_C2C.PYE)
                ) : (
                  ""
                )}
              </td>
              <td>
                {loadingPlan ? (
                  <LoadingComponent />
                ) : PLAN_TYLE_GD_C2C.DNO ? (
                  parseInt(PLAN_TYLE_GD_C2C.DNO)
                ) : (
                  ""
                )}
              </td>
              <td>
                {loadingPlan ? (
                  <LoadingComponent />
                ) : PLAN_TYLE_GD_C2C.KON ? (
                  parseInt(PLAN_TYLE_GD_C2C.KON)
                ) : (
                  ""
                )}
              </td>
              <td>
                {loadingPlan ? (
                  <LoadingComponent />
                ) : PLAN_TYLE_GD_C2C.CTY7 ? (
                  parseInt(PLAN_TYLE_GD_C2C.CTY7)
                ) : (
                  ""
                )}
              </td>
              <td rowSpan={4}>DVVT</td>
            </tr>
            <tr>
              <td className="text-sub4">Thực hiện lũy kế</td>
              <td>
                {loadingExec ? (
                  <LoadingComponent />
                ) : EXEC_TYLE_GD_C2C.KHO ? (
                  parseInt(EXEC_TYLE_GD_C2C.KHO)
                ) : (
                  ""
                )}
              </td>
              <td>
                {loadingExec ? (
                  <LoadingComponent />
                ) : EXEC_TYLE_GD_C2C.DLA ? (
                  parseInt(EXEC_TYLE_GD_C2C.DLA)
                ) : (
                  ""
                )}
              </td>
              <td>
                {loadingExec ? (
                  <LoadingComponent />
                ) : EXEC_TYLE_GD_C2C.GLA ? (
                  parseInt(EXEC_TYLE_GD_C2C.GLA)
                ) : (
                  ""
                )}
              </td>
              <td>
                {loadingExec ? (
                  <LoadingComponent />
                ) : EXEC_TYLE_GD_C2C.PYE ? (
                  parseInt(EXEC_TYLE_GD_C2C.PYE)
                ) : (
                  ""
                )}
              </td>
              <td>
                {loadingExec ? (
                  <LoadingComponent />
                ) : EXEC_TYLE_GD_C2C.DNO ? (
                  parseInt(EXEC_TYLE_GD_C2C.DNO)
                ) : (
                  ""
                )}
              </td>
              <td>
                {loadingExec ? (
                  <LoadingComponent />
                ) : EXEC_TYLE_GD_C2C.KON ? (
                  parseInt(EXEC_TYLE_GD_C2C.KON)
                ) : (
                  ""
                )}
              </td>
              <td>
                {loadingExec ? (
                  <LoadingComponent />
                ) : EXEC_TYLE_GD_C2C.CTY7 ? (
                  parseInt(EXEC_TYLE_GD_C2C.CTY7)
                ) : (
                  ""
                )}
              </td>
            </tr>
            <tr>
              <td className="text-sub4">%HTKH lũy kế </td>
              <td>
                {loadingExec || loadingPlan ? (
                  <LoadingComponent />
                ) : EXEC_TYLE_GD_C2C.KHO && PLAN_TYLE_GD_C2C.KHO ? (
                  convertToFloat2Fixed(
                    (EXEC_TYLE_GD_C2C.KHO * 100) / PLAN_TYLE_GD_C2C.KHO
                  )
                ) : (
                  ""
                )}
                <span className="text-sub4">%</span>
              </td>
              <td>
                {loadingExec || loadingPlan ? (
                  <LoadingComponent />
                ) : EXEC_TYLE_GD_C2C.DLA && PLAN_TYLE_GD_C2C.DLA ? (
                  convertToFloat2Fixed(
                    (EXEC_TYLE_GD_C2C.DLA * 100) / PLAN_TYLE_GD_C2C.DLA
                  )
                ) : (
                  ""
                )}
                <span className="text-sub4">%</span>
              </td>
              <td>
                {loadingExec || loadingPlan ? (
                  <LoadingComponent />
                ) : EXEC_TYLE_GD_C2C.GLA && PLAN_TYLE_GD_C2C.GLA ? (
                  convertToFloat2Fixed(
                    (EXEC_TYLE_GD_C2C.GLA * 100) / PLAN_TYLE_GD_C2C.GLA
                  )
                ) : (
                  ""
                )}
                <span className="text-sub4">%</span>
              </td>
              <td>
                {loadingExec || loadingPlan ? (
                  <LoadingComponent />
                ) : EXEC_TYLE_GD_C2C.PYE && PLAN_TYLE_GD_C2C.PYE ? (
                  convertToFloat2Fixed(
                    (EXEC_TYLE_GD_C2C.PYE * 100) / PLAN_TYLE_GD_C2C.PYE
                  )
                ) : (
                  ""
                )}
                <span className="text-sub4">%</span>
              </td>
              <td>
                {loadingExec || loadingPlan ? (
                  <LoadingComponent />
                ) : EXEC_TYLE_GD_C2C.DNO && PLAN_TYLE_GD_C2C.DNO ? (
                  convertToFloat2Fixed(
                    (EXEC_TYLE_GD_C2C.DNO * 100) / PLAN_TYLE_GD_C2C.DNO
                  )
                ) : (
                  ""
                )}
                <span className="text-sub4">%</span>
              </td>
              <td>
                {loadingExec || loadingPlan ? (
                  <LoadingComponent />
                ) : EXEC_TYLE_GD_C2C.KON && PLAN_TYLE_GD_C2C.KON ? (
                  convertToFloat2Fixed(
                    (EXEC_TYLE_GD_C2C.KON * 100) / PLAN_TYLE_GD_C2C.KON
                  )
                ) : (
                  ""
                )}
                <span className="text-sub4">%</span>
              </td>
              <td>
                {loadingExec || loadingPlan ? (
                  <LoadingComponent />
                ) : EXEC_TYLE_GD_C2C.CTY7 && PLAN_TYLE_GD_C2C.CTY7 ? (
                  convertToFloat2Fixed(
                    (EXEC_TYLE_GD_C2C.CTY7 * 100) / PLAN_TYLE_GD_C2C.CTY7
                  )
                ) : (
                  ""
                )}
                <span className="text-sub4">%</span>
              </td>
            </tr>
            <tr>
              <td className="text-sub4">Ước %HTKH tháng</td>
              <td
                className={
                  convertToFloat2Fixed(
                    ((EXEC_TYLE_GD_C2C.KHO / indexDateInMonth) *
                      sumDateInMonth *
                      100) /
                      PLAN_TYLE_GD_C2C.KHO
                  ) > 100
                    ? "bg-green"
                    : "bg-red"
                }
              >
                {loadingExec || loadingPlan ? (
                  <LoadingComponent />
                ) : EXEC_TYLE_GD_C2C.KHO && PLAN_TYLE_GD_C2C.KHO ? (
                  convertToFloat2Fixed(
                    ((EXEC_TYLE_GD_C2C.KHO / indexDateInMonth) *
                      sumDateInMonth *
                      100) /
                      PLAN_TYLE_GD_C2C.KHO
                  )
                ) : (
                  ""
                )}
                <span className="text-sub4">%</span>
              </td>
              <td
                className={
                  convertToFloat2Fixed(
                    ((EXEC_TYLE_GD_C2C.DLA / indexDateInMonth) *
                      sumDateInMonth *
                      100) /
                      PLAN_TYLE_GD_C2C.DLA
                  ) > 100
                    ? "bg-green"
                    : "bg-red"
                }
              >
                {loadingExec || loadingPlan ? (
                  <LoadingComponent />
                ) : EXEC_TYLE_GD_C2C.DLA && PLAN_TYLE_GD_C2C.DLA ? (
                  convertToFloat2Fixed(
                    ((EXEC_TYLE_GD_C2C.DLA / indexDateInMonth) *
                      sumDateInMonth *
                      100) /
                      PLAN_TYLE_GD_C2C.DLA
                  )
                ) : (
                  ""
                )}
                <span className="text-sub4">%</span>
              </td>
              <td
                className={
                  convertToFloat2Fixed(
                    ((EXEC_TYLE_GD_C2C.GLA / indexDateInMonth) *
                      sumDateInMonth *
                      100) /
                      PLAN_TYLE_GD_C2C.GLA
                  ) > 100
                    ? "bg-green"
                    : "bg-red"
                }
              >
                {loadingExec || loadingPlan ? (
                  <LoadingComponent />
                ) : EXEC_TYLE_GD_C2C.GLA && PLAN_TYLE_GD_C2C.GLA ? (
                  convertToFloat2Fixed(
                    ((EXEC_TYLE_GD_C2C.GLA / indexDateInMonth) *
                      sumDateInMonth *
                      100) /
                      PLAN_TYLE_GD_C2C.GLA
                  )
                ) : (
                  ""
                )}
                <span className="text-sub4">%</span>
              </td>
              <td
                className={
                  convertToFloat2Fixed(
                    ((EXEC_TYLE_GD_C2C.PYE / indexDateInMonth) *
                      sumDateInMonth *
                      100) /
                      PLAN_TYLE_GD_C2C.PYE
                  ) > 100
                    ? "bg-green"
                    : "bg-red"
                }
              >
                {loadingExec || loadingPlan ? (
                  <LoadingComponent />
                ) : EXEC_TYLE_GD_C2C.PYE && PLAN_TYLE_GD_C2C.PYE ? (
                  convertToFloat2Fixed(
                    ((EXEC_TYLE_GD_C2C.PYE / indexDateInMonth) *
                      sumDateInMonth *
                      100) /
                      PLAN_TYLE_GD_C2C.PYE
                  )
                ) : (
                  ""
                )}
                <span className="text-sub4">%</span>
              </td>
              <td
                className={
                  convertToFloat2Fixed(
                    ((EXEC_TYLE_GD_C2C.DNO / indexDateInMonth) *
                      sumDateInMonth *
                      100) /
                      PLAN_TYLE_GD_C2C.DNO
                  ) > 100
                    ? "bg-green"
                    : "bg-red"
                }
              >
                {loadingExec || loadingPlan ? (
                  <LoadingComponent />
                ) : EXEC_TYLE_GD_C2C.DNO && PLAN_TYLE_GD_C2C.DNO ? (
                  convertToFloat2Fixed(
                    ((EXEC_TYLE_GD_C2C.DNO / indexDateInMonth) *
                      sumDateInMonth *
                      100) /
                      PLAN_TYLE_GD_C2C.DNO
                  )
                ) : (
                  ""
                )}
                <span className="text-sub4">%</span>
              </td>
              <td
                className={
                  convertToFloat2Fixed(
                    ((EXEC_TYLE_GD_C2C.KHO / indexDateInMonth) *
                      sumDateInMonth *
                      100) /
                      PLAN_TYLE_GD_C2C.KHO
                  ) > 100
                    ? "bg-green"
                    : "bg-red"
                }
              >
                {loadingExec || loadingPlan ? (
                  <LoadingComponent />
                ) : EXEC_TYLE_GD_C2C.KON && PLAN_TYLE_GD_C2C.KON ? (
                  convertToFloat2Fixed(
                    ((EXEC_TYLE_GD_C2C.KON / indexDateInMonth) *
                      sumDateInMonth *
                      100) /
                      PLAN_TYLE_GD_C2C.KON
                  )
                ) : (
                  ""
                )}
                <span className="text-sub4">%</span>
              </td>
              <td
                className={
                  convertToFloat2Fixed(
                    ((EXEC_TYLE_GD_C2C.CTY7 / indexDateInMonth) *
                      sumDateInMonth *
                      100) /
                      PLAN_TYLE_GD_C2C.CTY7
                  ) > 100
                    ? "bg-green"
                    : "bg-red"
                }
              >
                {loadingExec || loadingPlan ? (
                  <LoadingComponent />
                ) : EXEC_TYLE_GD_C2C.CTY7 && PLAN_TYLE_GD_C2C.CTY7 ? (
                  convertToFloat2Fixed(
                    ((EXEC_TYLE_GD_C2C.CTY7 / indexDateInMonth) *
                      sumDateInMonth *
                      100) /
                      PLAN_TYLE_GD_C2C.CTY7
                  )
                ) : (
                  ""
                )}
                <span className="text-sub4">%</span>
              </td>
            </tr>
            <tr>
              <td className="text-sub2">8</td>
              <td colSpan={11} className="text-sub2">
                TB PTM mạng MobiFone
              </td>
            </tr>
            <tr>
              <td rowSpan={4} className="text-sub3">
                8.1
              </td>
              <td rowSpan={4} className="text-sub3">
                TBTT PTM Hạ tầng số
              </td>
              <td rowSpan={4}>thuê bao</td>
              <td>Kế hoạch tháng </td>
              <td>
                {loadingPlan ? (
                  <LoadingComponent />
                ) : PLAN_SL_PTM_TBTT_HTS.KHO ? (
                  parseInt(PLAN_SL_PTM_TBTT_HTS.KHO)
                ) : (
                  ""
                )}
              </td>
              <td>
                {loadingPlan ? (
                  <LoadingComponent />
                ) : PLAN_SL_PTM_TBTT_HTS.DLA ? (
                  parseInt(PLAN_SL_PTM_TBTT_HTS.DLA)
                ) : (
                  ""
                )}
              </td>
              <td>
                {loadingPlan ? (
                  <LoadingComponent />
                ) : PLAN_SL_PTM_TBTT_HTS.GLA ? (
                  parseInt(PLAN_SL_PTM_TBTT_HTS.GLA)
                ) : (
                  ""
                )}
              </td>
              <td>
                {loadingPlan ? (
                  <LoadingComponent />
                ) : PLAN_SL_PTM_TBTT_HTS.PYE ? (
                  parseInt(PLAN_SL_PTM_TBTT_HTS.PYE)
                ) : (
                  ""
                )}
              </td>
              <td>
                {loadingPlan ? (
                  <LoadingComponent />
                ) : PLAN_SL_PTM_TBTT_HTS.DNO ? (
                  parseInt(PLAN_SL_PTM_TBTT_HTS.DNO)
                ) : (
                  ""
                )}
              </td>
              <td>
                {loadingPlan ? (
                  <LoadingComponent />
                ) : PLAN_SL_PTM_TBTT_HTS.KON ? (
                  parseInt(PLAN_SL_PTM_TBTT_HTS.KON)
                ) : (
                  ""
                )}
              </td>
              <td>
                {loadingPlan ? (
                  <LoadingComponent />
                ) : PLAN_SL_PTM_TBTT_HTS.CTY7 ? (
                  parseInt(PLAN_SL_PTM_TBTT_HTS.CTY7)
                ) : (
                  ""
                )}
              </td>
              <td rowSpan={4}>DVVT</td>
            </tr>
            <tr>
              <td className="text-sub4">Thực hiện lũy kế</td>
              <td>
                {loadingExec ? (
                  <LoadingComponent />
                ) : EXEC_SL_PTM_TBTT_HTS.KHO ? (
                  parseInt(EXEC_SL_PTM_TBTT_HTS.KHO)
                ) : (
                  ""
                )}
              </td>
              <td>
                {loadingExec ? (
                  <LoadingComponent />
                ) : EXEC_SL_PTM_TBTT_HTS.DLA ? (
                  parseInt(EXEC_SL_PTM_TBTT_HTS.DLA)
                ) : (
                  ""
                )}
              </td>
              <td>
                {loadingExec ? (
                  <LoadingComponent />
                ) : EXEC_SL_PTM_TBTT_HTS.GLA ? (
                  parseInt(EXEC_SL_PTM_TBTT_HTS.GLA)
                ) : (
                  ""
                )}
              </td>
              <td>
                {loadingExec ? (
                  <LoadingComponent />
                ) : EXEC_SL_PTM_TBTT_HTS.PYE ? (
                  parseInt(EXEC_SL_PTM_TBTT_HTS.PYE)
                ) : (
                  ""
                )}
              </td>
              <td>
                {loadingExec ? (
                  <LoadingComponent />
                ) : EXEC_SL_PTM_TBTT_HTS.DNO ? (
                  parseInt(EXEC_SL_PTM_TBTT_HTS.DNO)
                ) : (
                  ""
                )}
              </td>
              <td>
                {loadingExec ? (
                  <LoadingComponent />
                ) : EXEC_SL_PTM_TBTT_HTS.KON ? (
                  parseInt(EXEC_SL_PTM_TBTT_HTS.KON)
                ) : (
                  ""
                )}
              </td>
              <td>
                {loadingExec ? (
                  <LoadingComponent />
                ) : EXEC_SL_PTM_TBTT_HTS.CTY7 ? (
                  parseInt(EXEC_SL_PTM_TBTT_HTS.CTY7)
                ) : (
                  ""
                )}
              </td>
            </tr>
            <tr>
              <td className="text-sub4">%HTKH lũy kế </td>
              <td>
                {loadingExec || loadingPlan ? (
                  <LoadingComponent />
                ) : EXEC_SL_PTM_TBTT_HTS.KHO && PLAN_SL_PTM_TBTT_HTS.KHO ? (
                  convertToFloat2Fixed(
                    (EXEC_SL_PTM_TBTT_HTS.KHO * 100) / PLAN_SL_PTM_TBTT_HTS.KHO
                  )
                ) : (
                  ""
                )}
                <span className="text-sub4">%</span>
              </td>
              <td>
                {loadingExec || loadingPlan ? (
                  <LoadingComponent />
                ) : EXEC_SL_PTM_TBTT_HTS.DLA && PLAN_SL_PTM_TBTT_HTS.DLA ? (
                  convertToFloat2Fixed(
                    (EXEC_SL_PTM_TBTT_HTS.DLA * 100) / PLAN_SL_PTM_TBTT_HTS.DLA
                  )
                ) : (
                  ""
                )}
                <span className="text-sub4">%</span>
              </td>
              <td>
                {loadingExec || loadingPlan ? (
                  <LoadingComponent />
                ) : EXEC_SL_PTM_TBTT_HTS.GLA && PLAN_SL_PTM_TBTT_HTS.GLA ? (
                  convertToFloat2Fixed(
                    (EXEC_SL_PTM_TBTT_HTS.GLA * 100) / PLAN_SL_PTM_TBTT_HTS.GLA
                  )
                ) : (
                  ""
                )}
                <span className="text-sub4">%</span>
              </td>
              <td>
                {loadingExec || loadingPlan ? (
                  <LoadingComponent />
                ) : EXEC_SL_PTM_TBTT_HTS.PYE && PLAN_SL_PTM_TBTT_HTS.PYE ? (
                  convertToFloat2Fixed(
                    (EXEC_SL_PTM_TBTT_HTS.PYE * 100) / PLAN_SL_PTM_TBTT_HTS.PYE
                  )
                ) : (
                  ""
                )}
                <span className="text-sub4">%</span>
              </td>
              <td>
                {loadingExec || loadingPlan ? (
                  <LoadingComponent />
                ) : EXEC_SL_PTM_TBTT_HTS.DNO && PLAN_SL_PTM_TBTT_HTS.DNO ? (
                  convertToFloat2Fixed(
                    (EXEC_SL_PTM_TBTT_HTS.DNO * 100) / PLAN_SL_PTM_TBTT_HTS.DNO
                  )
                ) : (
                  ""
                )}
                <span className="text-sub4">%</span>
              </td>
              <td>
                {loadingExec || loadingPlan ? (
                  <LoadingComponent />
                ) : EXEC_SL_PTM_TBTT_HTS.KON && PLAN_SL_PTM_TBTT_HTS.KON ? (
                  convertToFloat2Fixed(
                    (EXEC_SL_PTM_TBTT_HTS.KON * 100) / PLAN_SL_PTM_TBTT_HTS.KON
                  )
                ) : (
                  ""
                )}
                <span className="text-sub4">%</span>
              </td>
              <td>
                {loadingExec || loadingPlan ? (
                  <LoadingComponent />
                ) : EXEC_SL_PTM_TBTT_HTS.CTY7 && PLAN_SL_PTM_TBTT_HTS.CTY7 ? (
                  convertToFloat2Fixed(
                    (EXEC_SL_PTM_TBTT_HTS.CTY7 * 100) /
                      PLAN_SL_PTM_TBTT_HTS.CTY7
                  )
                ) : (
                  ""
                )}
                <span className="text-sub4">%</span>
              </td>
            </tr>
            <tr>
              <td className="text-sub4">Ước %HTKH tháng</td>
              <td
                className={
                  convertToFloat2Fixed(
                    ((EXEC_SL_PTM_TBTT_HTS.KHO / indexDateInMonth) *
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
                    ((EXEC_SL_PTM_TBTT_HTS.KHO / indexDateInMonth) *
                      sumDateInMonth *
                      100) /
                      PLAN_SL_PTM_TBTT_HTS.KHO
                  )
                ) : (
                  ""
                )}
                <span className="text-sub4">%</span>
              </td>
              <td
                className={
                  convertToFloat2Fixed(
                    ((EXEC_SL_PTM_TBTT_HTS.DLA / indexDateInMonth) *
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
                    ((EXEC_SL_PTM_TBTT_HTS.DLA / indexDateInMonth) *
                      sumDateInMonth *
                      100) /
                      PLAN_SL_PTM_TBTT_HTS.DLA
                  )
                ) : (
                  ""
                )}
                <span className="text-sub4">%</span>
              </td>
              <td
                className={
                  convertToFloat2Fixed(
                    ((EXEC_SL_PTM_TBTT_HTS.GLA / indexDateInMonth) *
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
                    ((EXEC_SL_PTM_TBTT_HTS.GLA / indexDateInMonth) *
                      sumDateInMonth *
                      100) /
                      PLAN_SL_PTM_TBTT_HTS.GLA
                  )
                ) : (
                  ""
                )}
                <span className="text-sub4">%</span>
              </td>
              <td
                className={
                  convertToFloat2Fixed(
                    ((EXEC_SL_PTM_TBTT_HTS.PYE / indexDateInMonth) *
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
                    ((EXEC_SL_PTM_TBTT_HTS.PYE / indexDateInMonth) *
                      sumDateInMonth *
                      100) /
                      PLAN_SL_PTM_TBTT_HTS.PYE
                  )
                ) : (
                  ""
                )}
                <span className="text-sub4">%</span>
              </td>
              <td
                className={
                  convertToFloat2Fixed(
                    ((EXEC_SL_PTM_TBTT_HTS.DNO / indexDateInMonth) *
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
                    ((EXEC_SL_PTM_TBTT_HTS.DNO / indexDateInMonth) *
                      sumDateInMonth *
                      100) /
                      PLAN_SL_PTM_TBTT_HTS.DNO
                  )
                ) : (
                  ""
                )}
                <span className="text-sub4">%</span>
              </td>
              <td
                className={
                  convertToFloat2Fixed(
                    ((EXEC_SL_PTM_TBTT_HTS.KON / indexDateInMonth) *
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
                    ((EXEC_SL_PTM_TBTT_HTS.KON / indexDateInMonth) *
                      sumDateInMonth *
                      100) /
                      PLAN_SL_PTM_TBTT_HTS.KON
                  )
                ) : (
                  ""
                )}
                <span className="text-sub4">%</span>
              </td>
              <td
                className={
                  convertToFloat2Fixed(
                    ((EXEC_SL_PTM_TBTT_HTS.CTY7 / indexDateInMonth) *
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
                    ((EXEC_SL_PTM_TBTT_HTS.CTY7 / indexDateInMonth) *
                      sumDateInMonth *
                      100) /
                      PLAN_SL_PTM_TBTT_HTS.CTY7
                  )
                ) : (
                  ""
                )}
                <span className="text-sub4">%</span>
              </td>
            </tr>
            <tr>
              <td rowSpan={4} className="text-sub3">
                8.2
              </td>
              <td rowSpan={4} className="text-sub3">
                TBTT PTM Nội dung số
              </td>
              <td rowSpan={4}>thuê bao</td>
              <td>Kế hoạch tháng </td>
              <td>
                {loadingPlan ? (
                  <LoadingComponent />
                ) : PLAN_SL_PTM_TBTT_NDS.KHO ? (
                  parseInt(PLAN_SL_PTM_TBTT_NDS.KHO)
                ) : (
                  ""
                )}
              </td>
              <td>
                {loadingPlan ? (
                  <LoadingComponent />
                ) : PLAN_SL_PTM_TBTT_NDS.DLA ? (
                  parseInt(PLAN_SL_PTM_TBTT_NDS.DLA)
                ) : (
                  ""
                )}
              </td>
              <td>
                {loadingPlan ? (
                  <LoadingComponent />
                ) : PLAN_SL_PTM_TBTT_NDS.GLA ? (
                  parseInt(PLAN_SL_PTM_TBTT_NDS.GLA)
                ) : (
                  ""
                )}
              </td>
              <td>
                {loadingPlan ? (
                  <LoadingComponent />
                ) : PLAN_SL_PTM_TBTT_NDS.PYE ? (
                  parseInt(PLAN_SL_PTM_TBTT_NDS.PYE)
                ) : (
                  ""
                )}
              </td>
              <td>
                {loadingPlan ? (
                  <LoadingComponent />
                ) : PLAN_SL_PTM_TBTT_NDS.DNO ? (
                  parseInt(PLAN_SL_PTM_TBTT_NDS.DNO)
                ) : (
                  ""
                )}
              </td>
              <td>
                {loadingPlan ? (
                  <LoadingComponent />
                ) : PLAN_SL_PTM_TBTT_NDS.KON ? (
                  parseInt(PLAN_SL_PTM_TBTT_NDS.KON)
                ) : (
                  ""
                )}
              </td>
              <td>
                {loadingPlan ? (
                  <LoadingComponent />
                ) : PLAN_SL_PTM_TBTT_NDS.CTY7 ? (
                  parseInt(PLAN_SL_PTM_TBTT_NDS.CTY7)
                ) : (
                  ""
                )}
              </td>
              <td rowSpan={4}>CNS</td>
            </tr>
            <tr>
              <td className="text-sub4">Thực hiện lũy kế</td>
              <td>
                {loadingExec ? (
                  <LoadingComponent />
                ) : EXEC_SL_PTM_TBTT_NDS.KHO ? (
                  parseInt(EXEC_SL_PTM_TBTT_NDS.KHO)
                ) : (
                  ""
                )}
              </td>
              <td>
                {loadingExec ? (
                  <LoadingComponent />
                ) : EXEC_SL_PTM_TBTT_NDS.DLA ? (
                  parseInt(EXEC_SL_PTM_TBTT_NDS.DLA)
                ) : (
                  ""
                )}
              </td>
              <td>
                {loadingExec ? (
                  <LoadingComponent />
                ) : EXEC_SL_PTM_TBTT_NDS.GLA ? (
                  parseInt(EXEC_SL_PTM_TBTT_NDS.GLA)
                ) : (
                  ""
                )}
              </td>
              <td>
                {loadingExec ? (
                  <LoadingComponent />
                ) : EXEC_SL_PTM_TBTT_NDS.PYE ? (
                  parseInt(EXEC_SL_PTM_TBTT_NDS.PYE)
                ) : (
                  ""
                )}
              </td>
              <td>
                {loadingExec ? (
                  <LoadingComponent />
                ) : EXEC_SL_PTM_TBTT_NDS.DNO ? (
                  parseInt(EXEC_SL_PTM_TBTT_NDS.DNO)
                ) : (
                  ""
                )}
              </td>
              <td>
                {loadingExec ? (
                  <LoadingComponent />
                ) : EXEC_SL_PTM_TBTT_NDS.KON ? (
                  parseInt(EXEC_SL_PTM_TBTT_NDS.KON)
                ) : (
                  ""
                )}
              </td>
              <td>
                {loadingExec ? (
                  <LoadingComponent />
                ) : EXEC_SL_PTM_TBTT_NDS.CTY7 ? (
                  parseInt(EXEC_SL_PTM_TBTT_NDS.CTY7)
                ) : (
                  ""
                )}
              </td>
            </tr>
            <tr>
              <td className="text-sub4">%HTKH lũy kế </td>
              <td>
                {loadingExec || loadingPlan ? (
                  <LoadingComponent />
                ) : EXEC_SL_PTM_TBTT_NDS.KHO && PLAN_SL_PTM_TBTT_NDS.KHO ? (
                  convertToFloat2Fixed(
                    (EXEC_SL_PTM_TBTT_NDS.KHO * 100) / PLAN_SL_PTM_TBTT_NDS.KHO
                  )
                ) : (
                  ""
                )}
                <span className="text-sub4">%</span>
              </td>
              <td>
                {loadingExec || loadingPlan ? (
                  <LoadingComponent />
                ) : EXEC_SL_PTM_TBTT_NDS.DLA && PLAN_SL_PTM_TBTT_NDS.DLA ? (
                  convertToFloat2Fixed(
                    (EXEC_SL_PTM_TBTT_NDS.DLA * 100) / PLAN_SL_PTM_TBTT_NDS.DLA
                  )
                ) : (
                  ""
                )}
                <span className="text-sub4">%</span>
              </td>
              <td>
                {loadingExec || loadingPlan ? (
                  <LoadingComponent />
                ) : EXEC_SL_PTM_TBTT_NDS.GLA && PLAN_SL_PTM_TBTT_NDS.GLA ? (
                  convertToFloat2Fixed(
                    (EXEC_SL_PTM_TBTT_NDS.GLA * 100) / PLAN_SL_PTM_TBTT_NDS.GLA
                  )
                ) : (
                  ""
                )}
                <span className="text-sub4">%</span>
              </td>
              <td>
                {loadingExec || loadingPlan ? (
                  <LoadingComponent />
                ) : EXEC_SL_PTM_TBTT_NDS.PYE && PLAN_SL_PTM_TBTT_NDS.PYE ? (
                  convertToFloat2Fixed(
                    (EXEC_SL_PTM_TBTT_NDS.PYE * 100) / PLAN_SL_PTM_TBTT_NDS.PYE
                  )
                ) : (
                  ""
                )}
                <span className="text-sub4">%</span>
              </td>
              <td>
                {loadingExec || loadingPlan ? (
                  <LoadingComponent />
                ) : EXEC_SL_PTM_TBTT_NDS.DNO && PLAN_SL_PTM_TBTT_NDS.DNO ? (
                  convertToFloat2Fixed(
                    (EXEC_SL_PTM_TBTT_NDS.DNO * 100) / PLAN_SL_PTM_TBTT_NDS.DNO
                  )
                ) : (
                  ""
                )}
                <span className="text-sub4">%</span>
              </td>
              <td>
                {loadingExec || loadingPlan ? (
                  <LoadingComponent />
                ) : EXEC_SL_PTM_TBTT_NDS.KON && PLAN_SL_PTM_TBTT_NDS.KON ? (
                  convertToFloat2Fixed(
                    (EXEC_SL_PTM_TBTT_NDS.KON * 100) / PLAN_SL_PTM_TBTT_NDS.KON
                  )
                ) : (
                  ""
                )}
                <span className="text-sub4">%</span>
              </td>
              <td>
                {loadingExec || loadingPlan ? (
                  <LoadingComponent />
                ) : EXEC_SL_PTM_TBTT_NDS.CTY7 && PLAN_SL_PTM_TBTT_NDS.CTY7 ? (
                  convertToFloat2Fixed(
                    (EXEC_SL_PTM_TBTT_NDS.CTY7 * 100) /
                      PLAN_SL_PTM_TBTT_NDS.CTY7
                  )
                ) : (
                  ""
                )}
                <span className="text-sub4">%</span>
              </td>
            </tr>
            <tr>
              <td className="text-sub4">Ước %HTKH tháng</td>
              <td
                className={
                  convertToFloat2Fixed(
                    ((EXEC_SL_PTM_TBTT_NDS.KHO / indexDateInMonth) *
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
                    ((EXEC_SL_PTM_TBTT_NDS.KHO / indexDateInMonth) *
                      sumDateInMonth *
                      100) /
                      PLAN_SL_PTM_TBTT_NDS.KHO
                  )
                ) : (
                  ""
                )}
                <span className="text-sub4">%</span>
              </td>
              <td
                className={
                  convertToFloat2Fixed(
                    ((EXEC_SL_PTM_TBTT_NDS.DLA / indexDateInMonth) *
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
                    ((EXEC_SL_PTM_TBTT_NDS.DLA / indexDateInMonth) *
                      sumDateInMonth *
                      100) /
                      PLAN_SL_PTM_TBTT_NDS.DLA
                  )
                ) : (
                  ""
                )}
                <span className="text-sub4">%</span>
              </td>
              <td
                className={
                  convertToFloat2Fixed(
                    ((EXEC_SL_PTM_TBTT_NDS.GLA / indexDateInMonth) *
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
                    ((EXEC_SL_PTM_TBTT_NDS.GLA / indexDateInMonth) *
                      sumDateInMonth *
                      100) /
                      PLAN_SL_PTM_TBTT_NDS.GLA
                  )
                ) : (
                  ""
                )}
                <span className="text-sub4">%</span>
              </td>
              <td
                className={
                  convertToFloat2Fixed(
                    ((EXEC_SL_PTM_TBTT_NDS.PYE / indexDateInMonth) *
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
                    ((EXEC_SL_PTM_TBTT_NDS.PYE / indexDateInMonth) *
                      sumDateInMonth *
                      100) /
                      PLAN_SL_PTM_TBTT_NDS.PYE
                  )
                ) : (
                  ""
                )}
                <span className="text-sub4">%</span>
              </td>
              <td
                className={
                  convertToFloat2Fixed(
                    ((EXEC_SL_PTM_TBTT_NDS.DNO / indexDateInMonth) *
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
                    ((EXEC_SL_PTM_TBTT_NDS.DNO / indexDateInMonth) *
                      sumDateInMonth *
                      100) /
                      PLAN_SL_PTM_TBTT_NDS.DNO
                  )
                ) : (
                  ""
                )}
                <span className="text-sub4">%</span>
              </td>
              <td
                className={
                  convertToFloat2Fixed(
                    ((EXEC_SL_PTM_TBTT_NDS.KON / indexDateInMonth) *
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
                    ((EXEC_SL_PTM_TBTT_NDS.KON / indexDateInMonth) *
                      sumDateInMonth *
                      100) /
                      PLAN_SL_PTM_TBTT_NDS.KON
                  )
                ) : (
                  ""
                )}
                <span className="text-sub4">%</span>
              </td>
              <td
                className={
                  convertToFloat2Fixed(
                    ((EXEC_SL_PTM_TBTT_NDS.CTY7 / indexDateInMonth) *
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
                    ((EXEC_SL_PTM_TBTT_NDS.CTY7 / indexDateInMonth) *
                      sumDateInMonth *
                      100) /
                      PLAN_SL_PTM_TBTT_NDS.CTY7
                  )
                ) : (
                  ""
                )}
                <span className="text-sub4">%</span>
              </td>
            </tr>
            <tr>
              <td rowSpan={4} className="text-sub3">
                8.3
              </td>
              <td rowSpan={4} className="text-sub3">
                TBTS PTM (thoại)
              </td>
              <td rowSpan={4}>thuê bao</td>
              <td>Kế hoạch tháng </td>
              <td>
                {loadingPlan ? (
                  <LoadingComponent />
                ) : PLAN_SL_TBTS_PTM_THOAI.KHO ? (
                  parseInt(PLAN_SL_TBTS_PTM_THOAI.KHO)
                ) : (
                  ""
                )}
              </td>
              <td>
                {loadingPlan ? (
                  <LoadingComponent />
                ) : PLAN_SL_TBTS_PTM_THOAI.DLA ? (
                  parseInt(PLAN_SL_TBTS_PTM_THOAI.DLA)
                ) : (
                  ""
                )}
              </td>
              <td>
                {loadingPlan ? (
                  <LoadingComponent />
                ) : PLAN_SL_TBTS_PTM_THOAI.GLA ? (
                  parseInt(PLAN_SL_TBTS_PTM_THOAI.GLA)
                ) : (
                  ""
                )}
              </td>
              <td>
                {loadingPlan ? (
                  <LoadingComponent />
                ) : PLAN_SL_TBTS_PTM_THOAI.PYE ? (
                  parseInt(PLAN_SL_TBTS_PTM_THOAI.PYE)
                ) : (
                  ""
                )}
              </td>
              <td>
                {loadingPlan ? (
                  <LoadingComponent />
                ) : PLAN_SL_TBTS_PTM_THOAI.DNO ? (
                  parseInt(PLAN_SL_TBTS_PTM_THOAI.DNO)
                ) : (
                  ""
                )}
              </td>
              <td>
                {loadingPlan ? (
                  <LoadingComponent />
                ) : PLAN_SL_TBTS_PTM_THOAI.KON ? (
                  parseInt(PLAN_SL_TBTS_PTM_THOAI.KON)
                ) : (
                  ""
                )}
              </td>
              <td>
                {loadingPlan ? (
                  <LoadingComponent />
                ) : PLAN_SL_TBTS_PTM_THOAI.CTY7 ? (
                  parseInt(PLAN_SL_TBTS_PTM_THOAI.CTY7)
                ) : (
                  ""
                )}
              </td>
              <td rowSpan={4}>DVVT</td>
            </tr>
            <tr>
              <td className="text-sub4">Thực hiện lũy kế</td>
              <td>
                {loadingPlan ? (
                  <LoadingComponent />
                ) : EXEC_SL_TBTS_PTM_THOAI.KHO ? (
                  parseInt(EXEC_SL_TBTS_PTM_THOAI.KHO)
                ) : (
                  ""
                )}
              </td>
              <td>
                {loadingPlan ? (
                  <LoadingComponent />
                ) : EXEC_SL_TBTS_PTM_THOAI.DLA ? (
                  parseInt(EXEC_SL_TBTS_PTM_THOAI.DLA)
                ) : (
                  ""
                )}
              </td>
              <td>
                {loadingPlan ? (
                  <LoadingComponent />
                ) : EXEC_SL_TBTS_PTM_THOAI.GLA ? (
                  parseInt(EXEC_SL_TBTS_PTM_THOAI.GLA)
                ) : (
                  ""
                )}
              </td>
              <td>
                {loadingPlan ? (
                  <LoadingComponent />
                ) : EXEC_SL_TBTS_PTM_THOAI.PYE ? (
                  parseInt(EXEC_SL_TBTS_PTM_THOAI.PYE)
                ) : (
                  ""
                )}
              </td>
              <td>
                {loadingPlan ? (
                  <LoadingComponent />
                ) : EXEC_SL_TBTS_PTM_THOAI.DNO ? (
                  parseInt(EXEC_SL_TBTS_PTM_THOAI.DNO)
                ) : (
                  ""
                )}
              </td>
              <td>
                {loadingPlan ? (
                  <LoadingComponent />
                ) : EXEC_SL_TBTS_PTM_THOAI.KON ? (
                  parseInt(EXEC_SL_TBTS_PTM_THOAI.KON)
                ) : (
                  ""
                )}
              </td>
              <td>
                {loadingPlan ? (
                  <LoadingComponent />
                ) : EXEC_SL_TBTS_PTM_THOAI.CTY7 ? (
                  parseInt(EXEC_SL_TBTS_PTM_THOAI.CTY7)
                ) : (
                  ""
                )}
              </td>
            </tr>
            <tr>
              <td className="text-sub4">%HTKH lũy kế </td>
              <td>
                {loadingExec || loadingPlan ? (
                  <LoadingComponent />
                ) : EXEC_SL_TBTS_PTM_THOAI.KHO && PLAN_SL_TBTS_PTM_THOAI.KHO ? (
                  convertToFloat2Fixed(
                    (EXEC_SL_TBTS_PTM_THOAI.KHO * 100) /
                      (PLAN_SL_TBTS_PTM_THOAI.KHO * 1000000)
                  )
                ) : (
                  ""
                )}
                <span className="text-sub4">%</span>
              </td>
              <td>
                {loadingExec || loadingPlan ? (
                  <LoadingComponent />
                ) : EXEC_SL_TBTS_PTM_THOAI.DLA && PLAN_SL_TBTS_PTM_THOAI.DLA ? (
                  convertToFloat2Fixed(
                    (EXEC_SL_TBTS_PTM_THOAI.DLA * 100) /
                      (PLAN_SL_TBTS_PTM_THOAI.DLA * 1000000)
                  )
                ) : (
                  ""
                )}
                <span className="text-sub4">%</span>
              </td>
              <td>
                {loadingExec || loadingPlan ? (
                  <LoadingComponent />
                ) : EXEC_SL_TBTS_PTM_THOAI.GLA && PLAN_SL_TBTS_PTM_THOAI.GLA ? (
                  convertToFloat2Fixed(
                    (EXEC_SL_TBTS_PTM_THOAI.GLA * 100) /
                      (PLAN_SL_TBTS_PTM_THOAI.GLA * 1000000)
                  )
                ) : (
                  ""
                )}
                <span className="text-sub4">%</span>
              </td>
              <td>
                {loadingExec || loadingPlan ? (
                  <LoadingComponent />
                ) : EXEC_SL_TBTS_PTM_THOAI.PYE && PLAN_SL_TBTS_PTM_THOAI.PYE ? (
                  convertToFloat2Fixed(
                    (EXEC_SL_TBTS_PTM_THOAI.PYE * 100) /
                      (PLAN_SL_TBTS_PTM_THOAI.PYE * 1000000)
                  )
                ) : (
                  ""
                )}
                <span className="text-sub4">%</span>
              </td>
              <td>
                {loadingExec || loadingPlan ? (
                  <LoadingComponent />
                ) : EXEC_SL_TBTS_PTM_THOAI.DNO && PLAN_SL_TBTS_PTM_THOAI.DNO ? (
                  convertToFloat2Fixed(
                    (EXEC_SL_TBTS_PTM_THOAI.DNO * 100) /
                      (PLAN_SL_TBTS_PTM_THOAI.DNO * 1000000)
                  )
                ) : (
                  ""
                )}
                <span className="text-sub4">%</span>
              </td>
              <td>
                {loadingExec || loadingPlan ? (
                  <LoadingComponent />
                ) : EXEC_SL_TBTS_PTM_THOAI.KON && PLAN_SL_TBTS_PTM_THOAI.KON ? (
                  convertToFloat2Fixed(
                    (EXEC_SL_TBTS_PTM_THOAI.KON * 100) /
                      (PLAN_SL_TBTS_PTM_THOAI.KON * 1000000)
                  )
                ) : (
                  ""
                )}
                <span className="text-sub4">%</span>
              </td>
              <td>
                {loadingExec || loadingPlan ? (
                  <LoadingComponent />
                ) : EXEC_SL_TBTS_PTM_THOAI.CTY7 &&
                  PLAN_SL_TBTS_PTM_THOAI.CTY7 ? (
                  convertToFloat2Fixed(
                    (EXEC_SL_TBTS_PTM_THOAI.CTY7 * 100) /
                      (PLAN_SL_TBTS_PTM_THOAI.CTY7 * 1000000)
                  )
                ) : (
                  ""
                )}
                <span className="text-sub4">%</span>
              </td>
            </tr>
            <tr>
              <td className="text-sub4">Ước %HTKH tháng</td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
            </tr>
            <tr>
              <td rowSpan={4} className="text-sub3">
                8.3
              </td>
              <td rowSpan={4} className="text-sub3">
                TB PTM M2M
              </td>
              <td rowSpan={4}>thuê bao</td>
              <td>Kế hoạch tháng </td>
              <td>
                {loadingPlan ? (
                  <LoadingComponent />
                ) : PLAN_SL_TB_PTM_M2M.KHO ? (
                  parseInt(PLAN_SL_TB_PTM_M2M.KHO)
                ) : (
                  ""
                )}
              </td>
              <td>
                {loadingPlan ? (
                  <LoadingComponent />
                ) : PLAN_SL_TB_PTM_M2M.DLA ? (
                  parseInt(PLAN_SL_TB_PTM_M2M.DLA)
                ) : (
                  ""
                )}
              </td>
              <td>
                {loadingPlan ? (
                  <LoadingComponent />
                ) : PLAN_SL_TB_PTM_M2M.GLA ? (
                  parseInt(PLAN_SL_TB_PTM_M2M.GLA)
                ) : (
                  ""
                )}
              </td>
              <td>
                {loadingPlan ? (
                  <LoadingComponent />
                ) : PLAN_SL_TB_PTM_M2M.PYE ? (
                  parseInt(PLAN_SL_TB_PTM_M2M.PYE)
                ) : (
                  ""
                )}
              </td>
              <td>
                {loadingPlan ? (
                  <LoadingComponent />
                ) : PLAN_SL_TB_PTM_M2M.DNO ? (
                  parseInt(PLAN_SL_TB_PTM_M2M.DNO)
                ) : (
                  ""
                )}
              </td>
              <td>
                {loadingPlan ? (
                  <LoadingComponent />
                ) : PLAN_SL_TB_PTM_M2M.KON ? (
                  parseInt(PLAN_SL_TB_PTM_M2M.KON)
                ) : (
                  ""
                )}
              </td>
              <td>
                {loadingPlan ? (
                  <LoadingComponent />
                ) : PLAN_SL_TB_PTM_M2M.CTY7 ? (
                  parseInt(PLAN_SL_TB_PTM_M2M.CTY7)
                ) : (
                  ""
                )}
              </td>
              <td rowSpan={4}>DVVT</td>
            </tr>
            <tr>
              <td className="text-sub4">Thực hiện lũy kế</td>
              <td>
                {loadingExec ? (
                  <LoadingComponent />
                ) : EXEC_SL_TB_PTM_M2M.KHO ? (
                  parseInt(EXEC_SL_TB_PTM_M2M.KHO)
                ) : (
                  ""
                )}
              </td>
              <td>
                {loadingExec ? (
                  <LoadingComponent />
                ) : EXEC_SL_TB_PTM_M2M.DLA ? (
                  parseInt(EXEC_SL_TB_PTM_M2M.DLA)
                ) : (
                  ""
                )}
              </td>
              <td>
                {loadingExec ? (
                  <LoadingComponent />
                ) : EXEC_SL_TB_PTM_M2M.GLA ? (
                  parseInt(EXEC_SL_TB_PTM_M2M.GLA)
                ) : (
                  ""
                )}
              </td>
              <td>
                {loadingExec ? (
                  <LoadingComponent />
                ) : EXEC_SL_TB_PTM_M2M.PYE ? (
                  parseInt(EXEC_SL_TB_PTM_M2M.PYE)
                ) : (
                  ""
                )}
              </td>
              <td>
                {loadingExec ? (
                  <LoadingComponent />
                ) : EXEC_SL_TB_PTM_M2M.DNO ? (
                  parseInt(EXEC_SL_TB_PTM_M2M.DNO)
                ) : (
                  ""
                )}
              </td>
              <td>
                {loadingExec ? (
                  <LoadingComponent />
                ) : EXEC_SL_TB_PTM_M2M.KON ? (
                  parseInt(EXEC_SL_TB_PTM_M2M.KON)
                ) : (
                  ""
                )}
              </td>
              <td>
                {loadingExec ? (
                  <LoadingComponent />
                ) : EXEC_SL_TB_PTM_M2M.CTY7 ? (
                  parseInt(EXEC_SL_TB_PTM_M2M.CTY7)
                ) : (
                  ""
                )}
              </td>
            </tr>
            <tr>
              <td className="text-sub4">%HTKH lũy kế </td>
              <td>
                {loadingExec || loadingPlan ? (
                  <LoadingComponent />
                ) : EXEC_SL_TB_PTM_M2M.KHO && PLAN_SL_TB_PTM_M2M.KHO ? (
                  convertToFloat2Fixed(
                    (EXEC_SL_TB_PTM_M2M.KHO * 100) / PLAN_SL_TB_PTM_M2M.KHO
                  )
                ) : (
                  ""
                )}
                <span className="text-sub4">%</span>
              </td>
              <td>
                {loadingExec || loadingPlan ? (
                  <LoadingComponent />
                ) : EXEC_SL_TB_PTM_M2M.DLA && PLAN_SL_TB_PTM_M2M.DLA ? (
                  convertToFloat2Fixed(
                    (EXEC_SL_TB_PTM_M2M.DLA * 100) / PLAN_SL_TB_PTM_M2M.DLA
                  )
                ) : (
                  ""
                )}
                <span className="text-sub4">%</span>
              </td>
              <td>
                {loadingExec || loadingPlan ? (
                  <LoadingComponent />
                ) : EXEC_SL_TB_PTM_M2M.GLA && PLAN_SL_TB_PTM_M2M.GLA ? (
                  convertToFloat2Fixed(
                    (EXEC_SL_TB_PTM_M2M.GLA * 100) / PLAN_SL_TB_PTM_M2M.GLA
                  )
                ) : (
                  ""
                )}
                <span className="text-sub4">%</span>
              </td>
              <td>
                {loadingExec || loadingPlan ? (
                  <LoadingComponent />
                ) : EXEC_SL_TB_PTM_M2M.PYE && PLAN_SL_TB_PTM_M2M.PYE ? (
                  convertToFloat2Fixed(
                    (EXEC_SL_TB_PTM_M2M.PYE * 100) / PLAN_SL_TB_PTM_M2M.PYE
                  )
                ) : (
                  ""
                )}
                <span className="text-sub4">%</span>
              </td>
              <td>
                {loadingExec || loadingPlan ? (
                  <LoadingComponent />
                ) : EXEC_SL_TB_PTM_M2M.DNO && PLAN_SL_TB_PTM_M2M.DNO ? (
                  convertToFloat2Fixed(
                    (EXEC_SL_TB_PTM_M2M.DNO * 100) / PLAN_SL_TB_PTM_M2M.DNO
                  )
                ) : (
                  ""
                )}
                <span className="text-sub4">%</span>
              </td>
              <td>
                {loadingExec || loadingPlan ? (
                  <LoadingComponent />
                ) : EXEC_SL_TB_PTM_M2M.KON && PLAN_SL_TB_PTM_M2M.KON ? (
                  convertToFloat2Fixed(
                    (EXEC_SL_TB_PTM_M2M.KON * 100) / PLAN_SL_TB_PTM_M2M.KON
                  )
                ) : (
                  ""
                )}
                <span className="text-sub4">%</span>
              </td>
              <td>
                {loadingExec || loadingPlan ? (
                  <LoadingComponent />
                ) : EXEC_SL_TB_PTM_M2M.CTY7 && PLAN_SL_TB_PTM_M2M.CTY7 ? (
                  convertToFloat2Fixed(
                    (EXEC_SL_TB_PTM_M2M.CTY7 * 100) / PLAN_SL_TB_PTM_M2M.CTY7
                  )
                ) : (
                  ""
                )}
                <span className="text-sub4">%</span>
              </td>
            </tr>
            <tr>
              <td className="text-sub4">Ước %HTKH tháng</td>
              <td
                className={
                  convertToFloat2Fixed(
                    ((SET_EXEC_SL_TB_PTM_M2M.KHO / indexDateInMonth) *
                      sumDateInMonth *
                      100) /
                      PLAN_SL_TB_PTM_M2M.KHO
                  ) > 100
                    ? "bg-green"
                    : "bg-red"
                }
              >
                {loadingExec || loadingPlan ? (
                  <LoadingComponent />
                ) : EXEC_SL_TB_PTM_M2M.KHO && PLAN_SL_TB_PTM_M2M.KHO ? (
                  convertToFloat2Fixed(
                    ((EXEC_SL_TB_PTM_M2M.KHO / indexDateInMonth) *
                      sumDateInMonth *
                      100) /
                      PLAN_SL_TB_PTM_M2M.KHO
                  )
                ) : (
                  ""
                )}
                <span className="text-sub4">%</span>
              </td>
              <td
                className={
                  convertToFloat2Fixed(
                    ((SET_EXEC_SL_TB_PTM_M2M.DLA / indexDateInMonth) *
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
                    ((EXEC_SL_TB_PTM_M2M.DLA / indexDateInMonth) *
                      sumDateInMonth *
                      100) /
                      PLAN_SL_TB_PTM_M2M.DLA
                  )
                ) : (
                  ""
                )}
                <span className="text-sub4">%</span>
              </td>
              <td
                className={
                  convertToFloat2Fixed(
                    ((SET_EXEC_SL_TB_PTM_M2M.GLA / indexDateInMonth) *
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
                    ((EXEC_SL_TB_PTM_M2M.GLA / indexDateInMonth) *
                      sumDateInMonth *
                      100) /
                      PLAN_SL_TB_PTM_M2M.GLA
                  )
                ) : (
                  ""
                )}
                <span className="text-sub4">%</span>
              </td>
              <td
                className={
                  convertToFloat2Fixed(
                    ((SET_EXEC_SL_TB_PTM_M2M.PYE / indexDateInMonth) *
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
                    ((EXEC_SL_TB_PTM_M2M.PYE / indexDateInMonth) *
                      sumDateInMonth *
                      100) /
                      PLAN_SL_TB_PTM_M2M.PYE
                  )
                ) : (
                  ""
                )}
                <span className="text-sub4">%</span>
              </td>
              <td
                className={
                  convertToFloat2Fixed(
                    ((SET_EXEC_SL_TB_PTM_M2M.DNO / indexDateInMonth) *
                      sumDateInMonth *
                      100) /
                      PLAN_SL_TB_PTM_M2M.DNO
                  ) > 100
                    ? "bg-green"
                    : "bg-red"
                }
              >
                {loadingExec || loadingPlan ? (
                  <LoadingComponent />
                ) : EXEC_SL_TB_PTM_M2M.DNO && PLAN_SL_TB_PTM_M2M.DNO ? (
                  convertToFloat2Fixed(
                    ((EXEC_SL_TB_PTM_M2M.DNO / indexDateInMonth) *
                      sumDateInMonth *
                      100) /
                      PLAN_SL_TB_PTM_M2M.DNO
                  )
                ) : (
                  ""
                )}
                <span className="text-sub4">%</span>
              </td>
              <td
                className={
                  convertToFloat2Fixed(
                    ((SET_EXEC_SL_TB_PTM_M2M.KON / indexDateInMonth) *
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
                    ((EXEC_SL_TB_PTM_M2M.KON / indexDateInMonth) *
                      sumDateInMonth *
                      100) /
                      PLAN_SL_TB_PTM_M2M.KON
                  )
                ) : (
                  ""
                )}
                <span className="text-sub4">%</span>
              </td>
              <td
                className={
                  convertToFloat2Fixed(
                    ((SET_EXEC_SL_TB_PTM_M2M.CTY7 / indexDateInMonth) *
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
                    ((EXEC_SL_TB_PTM_M2M.CTY7 / indexDateInMonth) *
                      sumDateInMonth *
                      100) /
                      PLAN_SL_TB_PTM_M2M.CTY7
                  )
                ) : (
                  ""
                )}
                <span className="text-sub4">%</span>
              </td>
            </tr>
            <tr>
              <td rowSpan={4} className="text-sub2">
                9
              </td>
              <td rowSpan={4} className="text-sub2">
                TB PTM mạng Saymee
              </td>
              <td rowSpan={4}>thuê bao</td>
              <td className="text-sub4">Kế hoạch tháng</td>
              <td>
                {loadingPlan ? (
                  <LoadingComponent />
                ) : PLAN_TB_PTM_SAYMEE.KHO ? (
                  parseInt(PLAN_TB_PTM_SAYMEE.KHO)
                ) : (
                  ""
                )}
              </td>
              <td>
                {loadingPlan ? (
                  <LoadingComponent />
                ) : PLAN_TB_PTM_SAYMEE.DLA ? (
                  parseInt(PLAN_TB_PTM_SAYMEE.DLA)
                ) : (
                  ""
                )}
              </td>
              <td>
                {loadingPlan ? (
                  <LoadingComponent />
                ) : PLAN_TB_PTM_SAYMEE.GLA ? (
                  parseInt(PLAN_TB_PTM_SAYMEE.GLA)
                ) : (
                  ""
                )}
              </td>
              <td>
                {loadingPlan ? (
                  <LoadingComponent />
                ) : PLAN_TB_PTM_SAYMEE.PYE ? (
                  parseInt(PLAN_TB_PTM_SAYMEE.PYE)
                ) : (
                  ""
                )}
              </td>
              <td>
                {loadingPlan ? (
                  <LoadingComponent />
                ) : PLAN_TB_PTM_SAYMEE.DNO ? (
                  parseInt(PLAN_TB_PTM_SAYMEE.DNO)
                ) : (
                  ""
                )}
              </td>
              <td>
                {loadingPlan ? (
                  <LoadingComponent />
                ) : PLAN_TB_PTM_SAYMEE.KON ? (
                  parseInt(PLAN_TB_PTM_SAYMEE.KON)
                ) : (
                  ""
                )}
              </td>
              <td>
                {loadingPlan ? (
                  <LoadingComponent />
                ) : PLAN_TB_PTM_SAYMEE.CTY7 ? (
                  parseInt(PLAN_TB_PTM_SAYMEE.CTY7)
                ) : (
                  ""
                )}
              </td>
              <td rowSpan={4}>DVVT</td>
            </tr>
            <tr>
              <td className="text-sub4">Thực hiện lũy kế</td>
              <td>
                {loadingExec ? (
                  <LoadingComponent />
                ) : EXEC_TB_PTM_SAYMEE.KHO ? (
                  parseInt(EXEC_TB_PTM_SAYMEE.KHO)
                ) : (
                  ""
                )}
              </td>
              <td>
                {loadingExec ? (
                  <LoadingComponent />
                ) : EXEC_TB_PTM_SAYMEE.DLA ? (
                  parseInt(EXEC_TB_PTM_SAYMEE.DLA)
                ) : (
                  ""
                )}
              </td>
              <td>
                {loadingExec ? (
                  <LoadingComponent />
                ) : EXEC_TB_PTM_SAYMEE.GLA ? (
                  parseInt(EXEC_TB_PTM_SAYMEE.GLA)
                ) : (
                  ""
                )}
              </td>
              <td>
                {loadingExec ? (
                  <LoadingComponent />
                ) : EXEC_TB_PTM_SAYMEE.PYE ? (
                  parseInt(EXEC_TB_PTM_SAYMEE.PYE)
                ) : (
                  ""
                )}
              </td>
              <td>
                {loadingExec ? (
                  <LoadingComponent />
                ) : EXEC_TB_PTM_SAYMEE.DNO ? (
                  parseInt(EXEC_TB_PTM_SAYMEE.DNO)
                ) : (
                  ""
                )}
              </td>
              <td>
                {loadingExec ? (
                  <LoadingComponent />
                ) : EXEC_TB_PTM_SAYMEE.KON ? (
                  parseInt(EXEC_TB_PTM_SAYMEE.KON)
                ) : (
                  ""
                )}
              </td>
              <td>
                {loadingExec ? (
                  <LoadingComponent />
                ) : EXEC_TB_PTM_SAYMEE.CTY7 ? (
                  parseInt(EXEC_TB_PTM_SAYMEE.CTY7)
                ) : (
                  ""
                )}
              </td>
            </tr>
            <tr>
              <td className="text-sub4">%HTKH lũy kế </td>
              <td>
                {loadingExec || loadingPlan ? (
                  <LoadingComponent />
                ) : EXEC_TB_PTM_SAYMEE.KHO && PLAN_TB_PTM_SAYMEE.KHO ? (
                  convertToFloat2Fixed(
                    (EXEC_TB_PTM_SAYMEE.KHO * 100) / PLAN_TB_PTM_SAYMEE.KHO
                  )
                ) : (
                  ""
                )}
                <span className="text-sub4">%</span>
              </td>
              <td>
                {loadingExec || loadingPlan ? (
                  <LoadingComponent />
                ) : EXEC_TB_PTM_SAYMEE.DLA && PLAN_TB_PTM_SAYMEE.DLA ? (
                  convertToFloat2Fixed(
                    (EXEC_TB_PTM_SAYMEE.DLA * 100) / PLAN_TB_PTM_SAYMEE.DLA
                  )
                ) : (
                  ""
                )}
                <span className="text-sub4">%</span>
              </td>
              <td>
                {loadingExec || loadingPlan ? (
                  <LoadingComponent />
                ) : EXEC_TB_PTM_SAYMEE.GLA && PLAN_TB_PTM_SAYMEE.GLA ? (
                  convertToFloat2Fixed(
                    (EXEC_TB_PTM_SAYMEE.GLA * 100) / PLAN_TB_PTM_SAYMEE.GLA
                  )
                ) : (
                  ""
                )}
                <span className="text-sub4">%</span>
              </td>
              <td>
                {loadingExec || loadingPlan ? (
                  <LoadingComponent />
                ) : EXEC_TB_PTM_SAYMEE.PYE && PLAN_TB_PTM_SAYMEE.PYE ? (
                  convertToFloat2Fixed(
                    (EXEC_TB_PTM_SAYMEE.PYE * 100) / PLAN_TB_PTM_SAYMEE.PYE
                  )
                ) : (
                  ""
                )}
                <span className="text-sub4">%</span>
              </td>
              <td>
                {loadingExec || loadingPlan ? (
                  <LoadingComponent />
                ) : EXEC_TB_PTM_SAYMEE.DNO && PLAN_TB_PTM_SAYMEE.DNO ? (
                  convertToFloat2Fixed(
                    (EXEC_TB_PTM_SAYMEE.DNO * 100) / PLAN_TB_PTM_SAYMEE.DNO
                  )
                ) : (
                  ""
                )}
                <span className="text-sub4">%</span>
              </td>
              <td>
                {loadingExec || loadingPlan ? (
                  <LoadingComponent />
                ) : EXEC_TB_PTM_SAYMEE.KON && PLAN_TB_PTM_SAYMEE.KON ? (
                  convertToFloat2Fixed(
                    (EXEC_TB_PTM_SAYMEE.KON * 100) / PLAN_TB_PTM_SAYMEE.KON
                  )
                ) : (
                  ""
                )}
                <span className="text-sub4">%</span>
              </td>
              <td>
                {loadingExec || loadingPlan ? (
                  <LoadingComponent />
                ) : EXEC_TB_PTM_SAYMEE.CTY7 && PLAN_TB_PTM_SAYMEE.CTY7 ? (
                  convertToFloat2Fixed(
                    (EXEC_TB_PTM_SAYMEE.CTY7 * 100) / PLAN_TB_PTM_SAYMEE.CTY7
                  )
                ) : (
                  ""
                )}
                <span className="text-sub4">%</span>
              </td>
            </tr>
            <tr>
              <td className="text-sub4">Ước %HTKH tháng</td>
              <td
                className={
                  convertToFloat2Fixed(
                    ((EXEC_TB_PTM_SAYMEE.KHO / indexDateInMonth) *
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
                    ((EXEC_TB_PTM_SAYMEE.KHO / indexDateInMonth) *
                      sumDateInMonth *
                      100) /
                      PLAN_TB_PTM_SAYMEE.KHO
                  )
                ) : (
                  ""
                )}
                <span className="text-sub4">%</span>
              </td>
              <td
                className={
                  convertToFloat2Fixed(
                    ((EXEC_TB_PTM_SAYMEE.DLA / indexDateInMonth) *
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
                    ((EXEC_TB_PTM_SAYMEE.DLA / indexDateInMonth) *
                      sumDateInMonth *
                      100) /
                      PLAN_TB_PTM_SAYMEE.DLA
                  )
                ) : (
                  ""
                )}
                <span className="text-sub4">%</span>
              </td>
              <td
                className={
                  convertToFloat2Fixed(
                    ((EXEC_TB_PTM_SAYMEE.GLA / indexDateInMonth) *
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
                    ((EXEC_TB_PTM_SAYMEE.GLA / indexDateInMonth) *
                      sumDateInMonth *
                      100) /
                      PLAN_TB_PTM_SAYMEE.GLA
                  )
                ) : (
                  ""
                )}
                <span className="text-sub4">%</span>
              </td>
              <td
                className={
                  convertToFloat2Fixed(
                    ((EXEC_TB_PTM_SAYMEE.PYE / indexDateInMonth) *
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
                    ((EXEC_TB_PTM_SAYMEE.PYE / indexDateInMonth) *
                      sumDateInMonth *
                      100) /
                      PLAN_TB_PTM_SAYMEE.PYE
                  )
                ) : (
                  ""
                )}
                <span className="text-sub4">%</span>
              </td>
              <td
                className={
                  convertToFloat2Fixed(
                    ((EXEC_TB_PTM_SAYMEE.DNO / indexDateInMonth) *
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
                    ((EXEC_TB_PTM_SAYMEE.DNO / indexDateInMonth) *
                      sumDateInMonth *
                      100) /
                      PLAN_TB_PTM_SAYMEE.DNO
                  )
                ) : (
                  ""
                )}
                <span className="text-sub4">%</span>
              </td>
              <td
                className={
                  convertToFloat2Fixed(
                    ((EXEC_TB_PTM_SAYMEE.KON / indexDateInMonth) *
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
                    ((EXEC_TB_PTM_SAYMEE.KON / indexDateInMonth) *
                      sumDateInMonth *
                      100) /
                      PLAN_TB_PTM_SAYMEE.KON
                  )
                ) : (
                  ""
                )}
                <span className="text-sub4">%</span>
              </td>
              <td
                className={
                  convertToFloat2Fixed(
                    ((EXEC_TB_PTM_SAYMEE.CTY7 / indexDateInMonth) *
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
                    ((EXEC_TB_PTM_SAYMEE.CTY7 / indexDateInMonth) *
                      sumDateInMonth *
                      100) /
                      PLAN_TB_PTM_SAYMEE.CTY7
                  )
                ) : (
                  ""
                )}
                <span className="text-sub4">%</span>
              </td>
            </tr>
            <tr>
              <td rowSpan={4} className="text-sub2">
                10
              </td>
              <td rowSpan={4} className="text-sub2">
                TB PTM MobiFiber
              </td>
              <td rowSpan={4}>thuê bao</td>
              <td className="text-sub4">Kế hoạch tháng</td>
              <td>
                {loadingPlan ? (
                  <LoadingComponent />
                ) : PLAN_TB_PTM_FIBER.KHO ? (
                  parseInt(PLAN_TB_PTM_FIBER.KHO)
                ) : (
                  ""
                )}
              </td>
              <td>
                {loadingPlan ? (
                  <LoadingComponent />
                ) : PLAN_TB_PTM_FIBER.DLA ? (
                  parseInt(PLAN_TB_PTM_FIBER.DLA)
                ) : (
                  ""
                )}
              </td>
              <td>
                {loadingPlan ? (
                  <LoadingComponent />
                ) : PLAN_TB_PTM_FIBER.GLA ? (
                  parseInt(PLAN_TB_PTM_FIBER.GLA)
                ) : (
                  ""
                )}
              </td>
              <td>
                {loadingPlan ? (
                  <LoadingComponent />
                ) : PLAN_TB_PTM_FIBER.PYE ? (
                  parseInt(PLAN_TB_PTM_FIBER.PYE)
                ) : (
                  ""
                )}
              </td>
              <td>
                {loadingPlan ? (
                  <LoadingComponent />
                ) : PLAN_TB_PTM_FIBER.DNO ? (
                  parseInt(PLAN_TB_PTM_FIBER.DNO)
                ) : (
                  ""
                )}
              </td>
              <td>
                {loadingPlan ? (
                  <LoadingComponent />
                ) : PLAN_TB_PTM_FIBER.KON ? (
                  parseInt(PLAN_TB_PTM_FIBER.KON)
                ) : (
                  ""
                )}
              </td>
              <td>
                {loadingPlan ? (
                  <LoadingComponent />
                ) : PLAN_TB_PTM_FIBER.CTY7 ? (
                  parseInt(PLAN_TB_PTM_FIBER.CTY7)
                ) : (
                  ""
                )}
              </td>
              <td rowSpan={4}>DVVT</td>
            </tr>
            <tr>
              <td className="text-sub4">Thực hiện lũy kế</td>
              <td>
                {loadingExec ? (
                  <LoadingComponent />
                ) : EXEC_TB_PTM_FIBER.KHO ? (
                  parseInt(EXEC_TB_PTM_FIBER.KHO)
                ) : (
                  ""
                )}
              </td>
              <td>
                {loadingExec ? (
                  <LoadingComponent />
                ) : EXEC_TB_PTM_FIBER.DLA ? (
                  parseInt(EXEC_TB_PTM_FIBER.DLA)
                ) : (
                  ""
                )}
              </td>
              <td>
                {loadingExec ? (
                  <LoadingComponent />
                ) : EXEC_TB_PTM_FIBER.GLA ? (
                  parseInt(EXEC_TB_PTM_FIBER.GLA)
                ) : (
                  ""
                )}
              </td>
              <td>
                {loadingExec ? (
                  <LoadingComponent />
                ) : EXEC_TB_PTM_FIBER.PYE ? (
                  parseInt(EXEC_TB_PTM_FIBER.PYE)
                ) : (
                  ""
                )}
              </td>
              <td>
                {loadingExec ? (
                  <LoadingComponent />
                ) : EXEC_TB_PTM_FIBER.DNO ? (
                  parseInt(EXEC_TB_PTM_FIBER.DNO)
                ) : (
                  ""
                )}
              </td>
              <td>
                {loadingExec ? (
                  <LoadingComponent />
                ) : EXEC_TB_PTM_FIBER.KON ? (
                  parseInt(EXEC_TB_PTM_FIBER.KON)
                ) : (
                  ""
                )}
              </td>
              <td>
                {loadingExec ? (
                  <LoadingComponent />
                ) : EXEC_TB_PTM_FIBER.CTY7 ? (
                  parseInt(EXEC_TB_PTM_FIBER.CTY7)
                ) : (
                  ""
                )}
              </td>
            </tr>
            <tr>
              <td className="text-sub4">%HTKH lũy kế </td>
              <td>
                {loadingExec || loadingPlan ? (
                  <LoadingComponent />
                ) : PLAN_TB_PTM_FIBER.KHO && EXEC_TB_PTM_FIBER.KHO ? (
                  convertToFloat2Fixed(
                    (EXEC_TB_PTM_FIBER.KHO * 100) / PLAN_TB_PTM_FIBER.KHO
                  )
                ) : (
                  ""
                )}
                <span className="text-sub4">%</span>
              </td>
              <td>
                {loadingExec || loadingPlan ? (
                  <LoadingComponent />
                ) : PLAN_TB_PTM_FIBER.DLA && EXEC_TB_PTM_FIBER.DLA ? (
                  convertToFloat2Fixed(
                    (EXEC_TB_PTM_FIBER.DLA * 100) / PLAN_TB_PTM_FIBER.DLA
                  )
                ) : (
                  ""
                )}
                <span className="text-sub4">%</span>
              </td>

              <td>
                {loadingExec || loadingPlan ? (
                  <LoadingComponent />
                ) : PLAN_TB_PTM_FIBER.GLA && EXEC_TB_PTM_FIBER.GLA ? (
                  convertToFloat2Fixed(
                    (EXEC_TB_PTM_FIBER.GLA * 100) / PLAN_TB_PTM_FIBER.GLA
                  )
                ) : (
                  ""
                )}
                <span className="text-sub4">%</span>
              </td>
              <td>
                {loadingExec || loadingPlan ? (
                  <LoadingComponent />
                ) : PLAN_TB_PTM_FIBER.PYE && EXEC_TB_PTM_FIBER.PYE ? (
                  convertToFloat2Fixed(
                    (EXEC_TB_PTM_FIBER.PYE * 100) / PLAN_TB_PTM_FIBER.PYE
                  )
                ) : (
                  ""
                )}
                <span className="text-sub4">%</span>
              </td>
              <td>
                {loadingExec || loadingPlan ? (
                  <LoadingComponent />
                ) : PLAN_TB_PTM_FIBER.DNO && EXEC_TB_PTM_FIBER.DNO ? (
                  convertToFloat2Fixed(
                    (EXEC_TB_PTM_FIBER.DNO * 100) / PLAN_TB_PTM_FIBER.DNO
                  )
                ) : (
                  ""
                )}
                <span className="text-sub4">%</span>
              </td>
              <td>
                {loadingExec || loadingPlan ? (
                  <LoadingComponent />
                ) : PLAN_TB_PTM_FIBER.KON && EXEC_TB_PTM_FIBER.KON ? (
                  convertToFloat2Fixed(
                    (EXEC_TB_PTM_FIBER.KON * 100) / PLAN_TB_PTM_FIBER.KON
                  )
                ) : (
                  ""
                )}
                <span className="text-sub4">%</span>
              </td>
              <td>
                {loadingExec || loadingPlan ? (
                  <LoadingComponent />
                ) : PLAN_TB_PTM_FIBER.DLA && EXEC_TB_PTM_FIBER.DLA ? (
                  convertToFloat2Fixed(
                    (EXEC_TB_PTM_FIBER.DLA * 100) / PLAN_TB_PTM_FIBER.DLA
                  )
                ) : (
                  ""
                )}
                <span className="text-sub4">%</span>
              </td>
            </tr>
            <tr>
              <td className="text-sub4">Ước %HTKH tháng</td>
              <td
                className={
                  convertToFloat2Fixed(
                    ((EXEC_TB_PTM_FIBER.KHO / indexDateInMonth) *
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
                    ((EXEC_TB_PTM_FIBER.KHO / indexDateInMonth) *
                      sumDateInMonth *
                      100) /
                      PLAN_TB_PTM_FIBER.KHO
                  )
                ) : (
                  ""
                )}
                <span className="text-sub4">%</span>
              </td>
              <td
                className={
                  convertToFloat2Fixed(
                    ((EXEC_TB_PTM_FIBER.DLA / indexDateInMonth) *
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
                    ((EXEC_TB_PTM_FIBER.DLA / indexDateInMonth) *
                      sumDateInMonth *
                      100) /
                      PLAN_TB_PTM_FIBER.DLA
                  )
                ) : (
                  ""
                )}
                <span className="text-sub4">%</span>
              </td>
              <td
                className={
                  convertToFloat2Fixed(
                    ((EXEC_TB_PTM_FIBER.GLA / indexDateInMonth) *
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
                    ((EXEC_TB_PTM_FIBER.GLA / indexDateInMonth) *
                      sumDateInMonth *
                      100) /
                      PLAN_TB_PTM_FIBER.GLA
                  )
                ) : (
                  ""
                )}
                <span className="text-sub4">%</span>
              </td>

              <td
                className={
                  convertToFloat2Fixed(
                    ((EXEC_TB_PTM_FIBER.PYE / indexDateInMonth) *
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
                    ((EXEC_TB_PTM_FIBER.PYE / indexDateInMonth) *
                      sumDateInMonth *
                      100) /
                      PLAN_TB_PTM_FIBER.PYE
                  )
                ) : (
                  ""
                )}
                <span className="text-sub4">%</span>
              </td>
              <td
                className={
                  convertToFloat2Fixed(
                    ((EXEC_TB_PTM_FIBER.DNO / indexDateInMonth) *
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
                    ((EXEC_TB_PTM_FIBER.DNO / indexDateInMonth) *
                      sumDateInMonth *
                      100) /
                      PLAN_TB_PTM_FIBER.DNO
                  )
                ) : (
                  ""
                )}
                <span className="text-sub4">%</span>
              </td>
              <td
                className={
                  convertToFloat2Fixed(
                    ((EXEC_TB_PTM_FIBER.KON / indexDateInMonth) *
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
                    ((EXEC_TB_PTM_FIBER.KON / indexDateInMonth) *
                      sumDateInMonth *
                      100) /
                      PLAN_TB_PTM_FIBER.KON
                  )
                ) : (
                  ""
                )}
                <span className="text-sub4">%</span>
              </td>
              <td
                className={
                  convertToFloat2Fixed(
                    ((EXEC_TB_PTM_FIBER.CTY7 / indexDateInMonth) *
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
                    ((EXEC_TB_PTM_FIBER.CTY7 / indexDateInMonth) *
                      sumDateInMonth *
                      100) /
                      PLAN_TB_PTM_FIBER.CTY7
                  )
                ) : (
                  ""
                )}
                <span className="text-sub4">%</span>
              </td>
            </tr>
            <tr>
              <td rowSpan={4} className="text-sub2">
                11
              </td>
              <td rowSpan={4} className="text-sub2">
                TB VLR (MobiFone + Saymee)
              </td>
              <td rowSpan={4}>thuê bao</td>
              <td className="text-sub4">Kế hoạch tháng</td>
              <td>
                {loadingPlan ? (
                  <LoadingComponent />
                ) : PLAN_TB_VLR.KHO ? (
                  parseInt(PLAN_TB_VLR.KHO)
                ) : (
                  ""
                )}
              </td>
              <td>
                {loadingPlan ? (
                  <LoadingComponent />
                ) : PLAN_TB_VLR.DLA ? (
                  parseInt(PLAN_TB_VLR.DLA)
                ) : (
                  ""
                )}
              </td>
              <td>
                {loadingPlan ? (
                  <LoadingComponent />
                ) : PLAN_TB_VLR.GLA ? (
                  parseInt(PLAN_TB_VLR.GLA)
                ) : (
                  ""
                )}
              </td>
              <td>
                {loadingPlan ? (
                  <LoadingComponent />
                ) : PLAN_TB_VLR.PYE ? (
                  parseInt(PLAN_TB_VLR.PYE)
                ) : (
                  ""
                )}
              </td>
              <td>
                {loadingPlan ? (
                  <LoadingComponent />
                ) : PLAN_TB_VLR.DNO ? (
                  parseInt(PLAN_TB_VLR.DNO)
                ) : (
                  ""
                )}
              </td>
              <td>
                {loadingPlan ? (
                  <LoadingComponent />
                ) : PLAN_TB_VLR.KON ? (
                  convertToFloat2Fixed(PLAN_TB_VLR.KON)
                ) : (
                  ""
                )}
              </td>
              <td>
                {loadingPlan ? (
                  <LoadingComponent />
                ) : PLAN_TB_VLR.CTY7 ? (
                  parseInt(PLAN_TB_VLR.CTY7)
                ) : (
                  ""
                )}
              </td>
              <td rowSpan={4}>DVVT</td>
            </tr>
            <tr>
              <td className="text-sub4">Thực hiện lũy kế</td>
              <td>
                {loadingPlan ? (
                  <LoadingComponent />
                ) : EXEC_TB_VLR.KHO ? (
                  parseInt(EXEC_TB_VLR.KHO)
                ) : (
                  ""
                )}
              </td>
              <td>
                {loadingPlan ? (
                  <LoadingComponent />
                ) : EXEC_TB_VLR.DLA ? (
                  parseInt(EXEC_TB_VLR.DLA)
                ) : (
                  ""
                )}
              </td>
              <td>
                {loadingPlan ? (
                  <LoadingComponent />
                ) : EXEC_TB_VLR.GLA ? (
                  parseInt(EXEC_TB_VLR.GLA)
                ) : (
                  ""
                )}
              </td>
              <td>
                {loadingPlan ? (
                  <LoadingComponent />
                ) : EXEC_TB_VLR.PYE ? (
                  parseInt(EXEC_TB_VLR.PYE)
                ) : (
                  ""
                )}
              </td>
              <td>
                {loadingPlan ? (
                  <LoadingComponent />
                ) : EXEC_TB_VLR.DNO ? (
                  parseInt(EXEC_TB_VLR.DNO)
                ) : (
                  ""
                )}
              </td>
              <td>
                {loadingPlan ? (
                  <LoadingComponent />
                ) : EXEC_TB_VLR.KON ? (
                  parseInt(EXEC_TB_VLR.KON)
                ) : (
                  ""
                )}
              </td>
              <td>
                {loadingPlan ? (
                  <LoadingComponent />
                ) : EXEC_TB_VLR.CTY7 ? (
                  parseInt(EXEC_TB_VLR.CTY7)
                ) : (
                  ""
                )}
              </td>
            </tr>
            <tr>
              <td className="text-sub4">%HTKH lũy kế </td>
              <td>
                {loadingExec || loadingPlan ? (
                  <LoadingComponent />
                ) : EXEC_TB_VLR.KHO && PLAN_TB_VLR.KHO ? (
                  convertToFloat2Fixed(
                    (EXEC_TB_VLR.KHO * 100) / PLAN_TB_VLR.KHO
                  )
                ) : (
                  ""
                )}
                <span className="text-sub4">%</span>
              </td>
              <td>
                {loadingExec || loadingPlan ? (
                  <LoadingComponent />
                ) : EXEC_TB_VLR.DLA && PLAN_TB_VLR.DLA ? (
                  convertToFloat2Fixed(
                    (EXEC_TB_VLR.DLA * 100) / PLAN_TB_VLR.DLA
                  )
                ) : (
                  ""
                )}
                <span className="text-sub4">%</span>
              </td>
              <td>
                {loadingExec || loadingPlan ? (
                  <LoadingComponent />
                ) : EXEC_TB_VLR.GLA && PLAN_TB_VLR.GLA ? (
                  convertToFloat2Fixed(
                    (EXEC_TB_VLR.GLA * 100) / PLAN_TB_VLR.GLA
                  )
                ) : (
                  ""
                )}
                <span className="text-sub4">%</span>
              </td>
              <td>
                {loadingExec || loadingPlan ? (
                  <LoadingComponent />
                ) : EXEC_TB_VLR.PYE && PLAN_TB_VLR.PYE ? (
                  convertToFloat2Fixed(
                    (EXEC_TB_VLR.PYE * 100) / PLAN_TB_VLR.PYE
                  )
                ) : (
                  ""
                )}
                <span className="text-sub4">%</span>
              </td>
              <td>
                {loadingExec || loadingPlan ? (
                  <LoadingComponent />
                ) : EXEC_TB_VLR.DNO && PLAN_TB_VLR.DNO ? (
                  convertToFloat2Fixed(
                    (EXEC_TB_VLR.DNO * 100) / PLAN_TB_VLR.DNO
                  )
                ) : (
                  ""
                )}
                <span className="text-sub4">%</span>
              </td>
              <td>
                {loadingExec || loadingPlan ? (
                  <LoadingComponent />
                ) : EXEC_TB_VLR.KON && PLAN_TB_VLR.KON ? (
                  convertToFloat2Fixed(
                    (EXEC_TB_VLR.KON * 100) / PLAN_TB_VLR.KON
                  )
                ) : (
                  ""
                )}
                <span className="text-sub4">%</span>
              </td>
              <td>
                {loadingExec || loadingPlan ? (
                  <LoadingComponent />
                ) : EXEC_TB_VLR.CTY7 && PLAN_TB_VLR.CTY7 ? (
                  convertToFloat2Fixed(
                    (EXEC_TB_VLR.CTY7 * 100) / PLAN_TB_VLR.CTY7
                  )
                ) : (
                  ""
                )}
                <span className="text-sub4">%</span>
              </td>
            </tr>
            <tr>
              <td className="text-sub4">Ước %HTKH tháng</td>
              <td
                className={
                  convertToFloat2Fixed(
                    (EXEC_TB_VLR.KHO * 100) / PLAN_TB_VLR.KHO
                  ) > 100
                    ? "bg-green"
                    : "bg-red"
                }
              >
                {loadingExec || loadingPlan ? (
                  <LoadingComponent />
                ) : EXEC_TB_VLR.KHO && PLAN_TB_VLR.KHO ? (
                  convertToFloat2Fixed(
                    (EXEC_TB_VLR.KHO * 100) / PLAN_TB_VLR.KHO
                  )
                ) : (
                  ""
                )}
                <span className="text-sub4">%</span>
              </td>
              <td
                className={
                  convertToFloat2Fixed(
                    (EXEC_TB_VLR.DLA * 100) / PLAN_TB_VLR.DLA
                  ) > 100
                    ? "bg-green"
                    : "bg-red"
                }
              >
                {loadingExec || loadingPlan ? (
                  <LoadingComponent />
                ) : EXEC_TB_VLR.DLA && PLAN_TB_VLR.DLA ? (
                  convertToFloat2Fixed(
                    (EXEC_TB_VLR.DLA * 100) / PLAN_TB_VLR.DLA
                  )
                ) : (
                  ""
                )}
                <span className="text-sub4">%</span>
              </td>
              <td
                className={
                  convertToFloat2Fixed(
                    (EXEC_TB_VLR.GLA * 100) / PLAN_TB_VLR.GLA
                  ) > 100
                    ? "bg-green"
                    : "bg-red"
                }
              >
                {loadingExec || loadingPlan ? (
                  <LoadingComponent />
                ) : EXEC_TB_VLR.GLA && PLAN_TB_VLR.GLA ? (
                  convertToFloat2Fixed(
                    (EXEC_TB_VLR.GLA * 100) / PLAN_TB_VLR.GLA
                  )
                ) : (
                  ""
                )}
                <span className="text-sub4">%</span>
              </td>
              <td
                className={
                  convertToFloat2Fixed(
                    (EXEC_TB_VLR.PYE * 100) / PLAN_TB_VLR.PYE
                  ) > 100
                    ? "bg-green"
                    : "bg-red"
                }
              >
                {loadingExec || loadingPlan ? (
                  <LoadingComponent />
                ) : EXEC_TB_VLR.PYE && PLAN_TB_VLR.PYE ? (
                  convertToFloat2Fixed(
                    (EXEC_TB_VLR.PYE * 100) / PLAN_TB_VLR.PYE
                  )
                ) : (
                  ""
                )}
                <span className="text-sub4">%</span>
              </td>
              <td
                className={
                  convertToFloat2Fixed(
                    (EXEC_TB_VLR.DNO * 100) / PLAN_TB_VLR.DNO
                  ) > 100
                    ? "bg-green"
                    : "bg-red"
                }
              >
                {loadingExec || loadingPlan ? (
                  <LoadingComponent />
                ) : EXEC_TB_VLR.DNO && PLAN_TB_VLR.DNO ? (
                  convertToFloat2Fixed(
                    (EXEC_TB_VLR.DNO * 100) / PLAN_TB_VLR.DNO
                  )
                ) : (
                  ""
                )}
                <span className="text-sub4">%</span>
              </td>
              <td
                className={
                  convertToFloat2Fixed(
                    (EXEC_TB_VLR.KON * 100) / PLAN_TB_VLR.KON
                  ) > 100
                    ? "bg-green"
                    : "bg-red"
                }
              >
                {loadingExec || loadingPlan ? (
                  <LoadingComponent />
                ) : EXEC_TB_VLR.KON && PLAN_TB_VLR.KON ? (
                  convertToFloat2Fixed(
                    (EXEC_TB_VLR.KON * 100) / PLAN_TB_VLR.KON
                  )
                ) : (
                  ""
                )}
                <span className="text-sub4">%</span>
              </td>
              <td
                className={
                  convertToFloat2Fixed(
                    (EXEC_TB_VLR.CTY7 * 100) / PLAN_TB_VLR.CTY7
                  ) > 100
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
                <span className="text-sub4">%</span>
              </td>
            </tr>
            <tr>
              <td rowSpan={4} className="text-sub2">
                12
              </td>
              <td rowSpan={4} className="text-sub2">
                TB PSC (MobiFone + Saymee)
              </td>
              <td rowSpan={4}>thuê bao</td>
              <td className="text-sub4">Kế hoạch tháng</td>
              <td>
                {loadingPlan ? (
                  <LoadingComponent />
                ) : PLAN_TB_PSC.KHO ? (
                  parseInt(PLAN_TB_PSC.KHO)
                ) : (
                  ""
                )}
              </td>
              <td>
                {loadingPlan ? (
                  <LoadingComponent />
                ) : PLAN_TB_PSC.DLA ? (
                  parseInt(PLAN_TB_PSC.DLA)
                ) : (
                  ""
                )}
              </td>
              <td>
                {loadingPlan ? (
                  <LoadingComponent />
                ) : PLAN_TB_PSC.GLA ? (
                  parseInt(PLAN_TB_PSC.GLA)
                ) : (
                  ""
                )}
              </td>
              <td>
                {loadingPlan ? (
                  <LoadingComponent />
                ) : PLAN_TB_PSC.PYE ? (
                  parseInt(PLAN_TB_PSC.PYE)
                ) : (
                  ""
                )}
              </td>
              <td>
                {loadingPlan ? (
                  <LoadingComponent />
                ) : PLAN_TB_PSC.DNO ? (
                  parseInt(PLAN_TB_PSC.DNO)
                ) : (
                  ""
                )}
              </td>
              <td>
                {loadingPlan ? (
                  <LoadingComponent />
                ) : PLAN_TB_PSC.KON ? (
                  parseInt(PLAN_TB_PSC.KON)
                ) : (
                  ""
                )}
              </td>
              <td>
                {loadingPlan ? (
                  <LoadingComponent />
                ) : PLAN_TB_PSC.CTY7 ? (
                  parseInt(PLAN_TB_PSC.CTY7)
                ) : (
                  ""
                )}
              </td>
              <td rowSpan={4}>DVVT</td>
            </tr>
            <tr>
              <td className="text-sub4">Thực hiện lũy kế</td>
              <td>
                {loadingExec ? (
                  <LoadingComponent />
                ) : EXEC_TB_PSC.KHO ? (
                  parseInt(EXEC_TB_PSC.KHO)
                ) : (
                  ""
                )}
              </td>
              <td>
                {loadingExec ? (
                  <LoadingComponent />
                ) : EXEC_TB_PSC.DLA ? (
                  parseInt(EXEC_TB_PSC.DLA)
                ) : (
                  ""
                )}
              </td>
              <td>
                {loadingExec ? (
                  <LoadingComponent />
                ) : EXEC_TB_PSC.GLA ? (
                  parseInt(EXEC_TB_PSC.GLA)
                ) : (
                  ""
                )}
              </td>
              <td>
                {loadingExec ? (
                  <LoadingComponent />
                ) : EXEC_TB_PSC.PYE ? (
                  parseInt(EXEC_TB_PSC.PYE)
                ) : (
                  ""
                )}
              </td>
              <td>
                {loadingExec ? (
                  <LoadingComponent />
                ) : EXEC_TB_PSC.DNO ? (
                  parseInt(EXEC_TB_PSC.DNO)
                ) : (
                  ""
                )}
              </td>
              <td>
                {loadingExec ? (
                  <LoadingComponent />
                ) : EXEC_TB_PSC.KON ? (
                  parseInt(EXEC_TB_PSC.KON)
                ) : (
                  ""
                )}
              </td>
              <td>
                {loadingExec ? (
                  <LoadingComponent />
                ) : EXEC_TB_PSC.CTY7 ? (
                  parseInt(EXEC_TB_PSC.CTY7)
                ) : (
                  ""
                )}
              </td>
            </tr>
            <tr>
              <td className="text-sub4">%HTKH lũy kế </td>
              <td>
                {loadingExec || loadingPlan ? (
                  <LoadingComponent />
                ) : EXEC_TB_PSC.KHO && PLAN_TB_PSC.KHO ? (
                  convertToFloat2Fixed(
                    (EXEC_TB_PSC.KHO * 100) / PLAN_TB_PSC.KHO
                  )
                ) : (
                  ""
                )}
                <span className="text-sub4">%</span>
              </td>
              <td>
                {loadingExec || loadingPlan ? (
                  <LoadingComponent />
                ) : EXEC_TB_PSC.DLA && PLAN_TB_PSC.DLA ? (
                  convertToFloat2Fixed(
                    (EXEC_TB_PSC.DLA * 100) / PLAN_TB_PSC.DLA
                  )
                ) : (
                  ""
                )}
                <span className="text-sub4">%</span>
              </td>
              <td>
                {loadingExec || loadingPlan ? (
                  <LoadingComponent />
                ) : EXEC_TB_PSC.GLA && PLAN_TB_PSC.GLA ? (
                  convertToFloat2Fixed(
                    (EXEC_TB_PSC.GLA * 100) / PLAN_TB_PSC.GLA
                  )
                ) : (
                  ""
                )}
                <span className="text-sub4">%</span>
              </td>
              <td>
                {loadingExec || loadingPlan ? (
                  <LoadingComponent />
                ) : EXEC_TB_PSC.PYE && PLAN_TB_PSC.PYE ? (
                  convertToFloat2Fixed(
                    (EXEC_TB_PSC.PYE * 100) / PLAN_TB_PSC.PYE
                  )
                ) : (
                  ""
                )}
                <span className="text-sub4">%</span>
              </td>
              <td>
                {loadingExec || loadingPlan ? (
                  <LoadingComponent />
                ) : EXEC_TB_PSC.DNO && PLAN_TB_PSC.DNO ? (
                  convertToFloat2Fixed(
                    (EXEC_TB_PSC.DNO * 100) / PLAN_TB_PSC.DNO
                  )
                ) : (
                  ""
                )}
                <span className="text-sub4">%</span>
              </td>
              <td>
                {loadingExec || loadingPlan ? (
                  <LoadingComponent />
                ) : EXEC_TB_PSC.KON && PLAN_TB_PSC.KON ? (
                  convertToFloat2Fixed(
                    (EXEC_TB_PSC.KON * 100) / PLAN_TB_PSC.KON
                  )
                ) : (
                  ""
                )}
                <span className="text-sub4">%</span>
              </td>
              <td>
                {loadingExec || loadingPlan ? (
                  <LoadingComponent />
                ) : EXEC_TB_PSC.CTY7 && PLAN_TB_PSC.CTY7 ? (
                  convertToFloat2Fixed(
                    (EXEC_TB_PSC.CTY7 * 100) / PLAN_TB_PSC.CTY7
                  )
                ) : (
                  ""
                )}
                <span className="text-sub4">%</span>
              </td>
            </tr>
            <tr>
              <td className="text-sub4">Ước %HTKH tháng</td>
              <td
                className={
                  convertToFloat2Fixed(
                    (EXEC_TB_PSC.KHO * 100) / PLAN_TB_PSC.KHO
                  ) > 100
                    ? "bg-green"
                    : "bg-red"
                }
              >
                {loadingExec || loadingPlan ? (
                  <LoadingComponent />
                ) : EXEC_TB_PSC.KHO && PLAN_TB_PSC.KHO ? (
                  convertToFloat2Fixed(
                    (EXEC_TB_PSC.KHO * 100) / PLAN_TB_PSC.KHO
                  )
                ) : (
                  ""
                )}
                <span className="text-sub4">%</span>
              </td>
              <td
                className={
                  convertToFloat2Fixed(
                    (EXEC_TB_PSC.DLA * 100) / PLAN_TB_PSC.DLA
                  ) > 100
                    ? "bg-green"
                    : "bg-red"
                }
              >
                {loadingExec || loadingPlan ? (
                  <LoadingComponent />
                ) : EXEC_TB_PSC.DLA && PLAN_TB_PSC.DLA ? (
                  convertToFloat2Fixed(
                    (EXEC_TB_PSC.DLA * 100) / PLAN_TB_PSC.DLA
                  )
                ) : (
                  ""
                )}
                <span className="text-sub4">%</span>
              </td>
              <td
                className={
                  convertToFloat2Fixed(
                    (EXEC_TB_PSC.GLA * 100) / PLAN_TB_PSC.GLA
                  ) > 100
                    ? "bg-green"
                    : "bg-red"
                }
              >
                {loadingExec || loadingPlan ? (
                  <LoadingComponent />
                ) : EXEC_TB_PSC.GLA && PLAN_TB_PSC.GLA ? (
                  convertToFloat2Fixed(
                    (EXEC_TB_PSC.GLA * 100) / PLAN_TB_PSC.GLA
                  )
                ) : (
                  ""
                )}
                <span className="text-sub4">%</span>
              </td>
              <td
                className={
                  convertToFloat2Fixed(
                    (EXEC_TB_PSC.PYE * 100) / PLAN_TB_PSC.PYE
                  ) > 100
                    ? "bg-green"
                    : "bg-red"
                }
              >
                {loadingExec || loadingPlan ? (
                  <LoadingComponent />
                ) : EXEC_TB_PSC.PYE && PLAN_TB_PSC.PYE ? (
                  convertToFloat2Fixed(
                    (EXEC_TB_PSC.PYE * 100) / PLAN_TB_PSC.PYE
                  )
                ) : (
                  ""
                )}
                <span className="text-sub4">%</span>
              </td>
              <td
                className={
                  convertToFloat2Fixed(
                    (EXEC_TB_PSC.DNO * 100) / PLAN_TB_PSC.DNO
                  ) > 100
                    ? "bg-green"
                    : "bg-red"
                }
              >
                {loadingExec || loadingPlan ? (
                  <LoadingComponent />
                ) : EXEC_TB_PSC.DNO && PLAN_TB_PSC.DNO ? (
                  convertToFloat2Fixed(
                    (EXEC_TB_PSC.DNO * 100) / PLAN_TB_PSC.DNO
                  )
                ) : (
                  ""
                )}
                <span className="text-sub4">%</span>
              </td>
              <td
                className={
                  convertToFloat2Fixed(
                    (EXEC_TB_PSC.KON * 100) / PLAN_TB_PSC.KON
                  ) > 100
                    ? "bg-green"
                    : "bg-red"
                }
              >
                {loadingExec || loadingPlan ? (
                  <LoadingComponent />
                ) : EXEC_TB_PSC.KON && PLAN_TB_PSC.KON ? (
                  convertToFloat2Fixed(
                    (EXEC_TB_PSC.KON * 100) / PLAN_TB_PSC.KON
                  )
                ) : (
                  ""
                )}
                <span className="text-sub4">%</span>
              </td>
              <td
                className={
                  convertToFloat2Fixed(
                    (EXEC_TB_PSC.CTY7 * 100) / PLAN_TB_PSC.CTY7
                  ) > 100
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
                <span className="text-sub4">%</span>
              </td>
            </tr>
            <tr>
              <td rowSpan={4} className="text-sub2">
                13
              </td>
              <td rowSpan={4} className="text-sub2">
                TB Platform tương tác
              </td>
              <td rowSpan={4}>%</td>
              <td className="text-sub4">Kế hoạch tháng</td>
              <td>
                {loadingPlan ? (
                  <LoadingComponent />
                ) : PLAN_TB_PLAT_TT.KHO ? (
                  convertToFloat2Fixed(PLAN_TB_PLAT_TT.KHO)
                ) : (
                  ""
                )}
              </td>

              <td>
                {loadingPlan ? (
                  <LoadingComponent />
                ) : PLAN_TB_PLAT_TT.DLA ? (
                  convertToFloat2Fixed(PLAN_TB_PLAT_TT.DLA)
                ) : (
                  ""
                )}
              </td>
              <td>
                {loadingPlan ? (
                  <LoadingComponent />
                ) : PLAN_TB_PLAT_TT.GLA ? (
                  convertToFloat2Fixed(PLAN_TB_PLAT_TT.GLA)
                ) : (
                  ""
                )}
              </td>
              <td>
                {loadingPlan ? (
                  <LoadingComponent />
                ) : PLAN_TB_PLAT_TT.PYE ? (
                  convertToFloat2Fixed(PLAN_TB_PLAT_TT.PYE)
                ) : (
                  ""
                )}
              </td>
              <td>
                {loadingPlan ? (
                  <LoadingComponent />
                ) : PLAN_TB_PLAT_TT.DNO ? (
                  convertToFloat2Fixed(PLAN_TB_PLAT_TT.DNO)
                ) : (
                  ""
                )}
              </td>
              <td>
                {loadingPlan ? (
                  <LoadingComponent />
                ) : PLAN_TB_PLAT_TT.KON ? (
                  convertToFloat2Fixed(PLAN_TB_PLAT_TT.KON)
                ) : (
                  ""
                )}
              </td>
              <td>
                {loadingPlan ? (
                  <LoadingComponent />
                ) : PLAN_TB_PLAT_TT.CTY7 ? (
                  convertToFloat2Fixed(PLAN_TB_PLAT_TT.CTY7)
                ) : (
                  ""
                )}
              </td>
              <td rowSpan={4}>CNS</td>
            </tr>
            <tr>
              <td className="text-sub4">Thực hiện lũy kế</td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
            </tr>
            <tr>
              <td className="text-sub4">%HTKH lũy kế </td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
            </tr>
            <tr>
              <td className="text-sub4">Ước %HTKH tháng</td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
            </tr>
            <tr>
              <td rowSpan={4} className="text-sub2">
                14
              </td>
              <td rowSpan={4} className="text-sub2">
                Tỷ lệ Thuê bao N-1 có gói cước
              </td>
              <td rowSpan={4}>%</td>
              <td className="text-sub4">Kế hoạch tháng</td>
              <td>
                {loadingPlan ? (
                  <LoadingComponent />
                ) : PLAN_TILE_N_1_GOI.KHO ? (
                  convertToFloat2Fixed(PLAN_TILE_N_1_GOI.KHO)
                ) : (
                  ""
                )}
              </td>
              <td>
                {loadingPlan ? (
                  <LoadingComponent />
                ) : PLAN_TILE_N_1_GOI.DLA ? (
                  convertToFloat2Fixed(PLAN_TILE_N_1_GOI.DLA)
                ) : (
                  ""
                )}
              </td>
              <td>
                {loadingPlan ? (
                  <LoadingComponent />
                ) : PLAN_TILE_N_1_GOI.GLA ? (
                  convertToFloat2Fixed(PLAN_TILE_N_1_GOI.GLA)
                ) : (
                  ""
                )}
              </td>
              <td>
                {loadingPlan ? (
                  <LoadingComponent />
                ) : PLAN_TILE_N_1_GOI.PYE ? (
                  convertToFloat2Fixed(PLAN_TILE_N_1_GOI.PYE)
                ) : (
                  ""
                )}
              </td>
              <td>
                {loadingPlan ? (
                  <LoadingComponent />
                ) : PLAN_TILE_N_1_GOI.DNO ? (
                  convertToFloat2Fixed(PLAN_TILE_N_1_GOI.DNO)
                ) : (
                  ""
                )}
              </td>
              <td>
                {loadingPlan ? (
                  <LoadingComponent />
                ) : PLAN_TILE_N_1_GOI.KON ? (
                  convertToFloat2Fixed(PLAN_TILE_N_1_GOI.KON)
                ) : (
                  ""
                )}
              </td>
              <td>
                {loadingPlan ? (
                  <LoadingComponent />
                ) : PLAN_TILE_N_1_GOI.CTY7 ? (
                  convertToFloat2Fixed(PLAN_TILE_N_1_GOI.CTY7)
                ) : (
                  ""
                )}
              </td>
              <td rowSpan={4}>CSKH</td>
            </tr>
            <tr>
              <td className="text-sub4">Thực hiện lũy kế</td>
              <td>
                {loadingPlan ? (
                  <LoadingComponent />
                ) : EXEC_TILE_N_1_GOI.KHO ? (
                  convertToFloat2Fixed(EXEC_TILE_N_1_GOI.KHO)
                ) : (
                  ""
                )}
              </td>
              <td>
                {loadingPlan ? (
                  <LoadingComponent />
                ) : EXEC_TILE_N_1_GOI.DLA ? (
                  convertToFloat2Fixed(EXEC_TILE_N_1_GOI.DLA)
                ) : (
                  ""
                )}
              </td>
              <td>
                {loadingPlan ? (
                  <LoadingComponent />
                ) : EXEC_TILE_N_1_GOI.GLA ? (
                  convertToFloat2Fixed(EXEC_TILE_N_1_GOI.GLA)
                ) : (
                  ""
                )}
              </td>
              <td>
                {" "}
                {loadingPlan ? (
                  <LoadingComponent />
                ) : EXEC_TILE_N_1_GOI.PYE ? (
                  convertToFloat2Fixed(EXEC_TILE_N_1_GOI.PYE)
                ) : (
                  ""
                )}
              </td>
              <td>
                {loadingPlan ? (
                  <LoadingComponent />
                ) : EXEC_TILE_N_1_GOI.DNO ? (
                  convertToFloat2Fixed(EXEC_TILE_N_1_GOI.DNO)
                ) : (
                  ""
                )}
              </td>
              <td>
                {loadingPlan ? (
                  <LoadingComponent />
                ) : EXEC_TILE_N_1_GOI.KON ? (
                  convertToFloat2Fixed(EXEC_TILE_N_1_GOI.KON)
                ) : (
                  ""
                )}
              </td>
              <td>
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
              <td className="text-sub4">%HTKH lũy kế </td>
              <td>
                {loadingExec || loadingPlan ? (
                  <LoadingComponent />
                ) : EXEC_TILE_N_1_GOI.KHO && PLAN_TILE_N_1_GOI.KHO ? (
                  convertToFloat2Fixed(
                    (EXEC_TILE_N_1_GOI.KHO * 100) / PLAN_TILE_N_1_GOI.KHO
                  )
                ) : (
                  ""
                )}
                <span className="text-sub4">%</span>
              </td>
              <td>
                {loadingExec || loadingPlan ? (
                  <LoadingComponent />
                ) : EXEC_TILE_N_1_GOI.DLA && PLAN_TILE_N_1_GOI.DLA ? (
                  convertToFloat2Fixed(
                    (EXEC_TILE_N_1_GOI.DLA * 100) / PLAN_TILE_N_1_GOI.DLA
                  )
                ) : (
                  ""
                )}
                <span className="text-sub4">%</span>
              </td>
              <td>
                {loadingExec || loadingPlan ? (
                  <LoadingComponent />
                ) : EXEC_TILE_N_1_GOI.GLA && PLAN_TILE_N_1_GOI.GLA ? (
                  convertToFloat2Fixed(
                    (EXEC_TILE_N_1_GOI.GLA * 100) / PLAN_TILE_N_1_GOI.GLA
                  )
                ) : (
                  ""
                )}
                <span className="text-sub4">%</span>
              </td>
              <td>
                {loadingExec || loadingPlan ? (
                  <LoadingComponent />
                ) : EXEC_TILE_N_1_GOI.PYE && PLAN_TILE_N_1_GOI.PYE ? (
                  convertToFloat2Fixed(
                    (EXEC_TILE_N_1_GOI.PYE * 100) / PLAN_TILE_N_1_GOI.PYE
                  )
                ) : (
                  ""
                )}
                <span className="text-sub4">%</span>
              </td>
              <td>
                {loadingExec || loadingPlan ? (
                  <LoadingComponent />
                ) : EXEC_TILE_N_1_GOI.DNO && PLAN_TILE_N_1_GOI.DNO ? (
                  convertToFloat2Fixed(
                    (EXEC_TILE_N_1_GOI.DNO * 100) / PLAN_TILE_N_1_GOI.DNO
                  )
                ) : (
                  ""
                )}
                <span className="text-sub4">%</span>
              </td>
              <td>
                {loadingExec || loadingPlan ? (
                  <LoadingComponent />
                ) : EXEC_TILE_N_1_GOI.KON && PLAN_TILE_N_1_GOI.KON ? (
                  convertToFloat2Fixed(
                    (EXEC_TILE_N_1_GOI.KON * 100) / PLAN_TILE_N_1_GOI.KON
                  )
                ) : (
                  ""
                )}
                <span className="text-sub4">%</span>
              </td>
              <td>
                {loadingExec || loadingPlan ? (
                  <LoadingComponent />
                ) : EXEC_TILE_N_1_GOI.CTY7 && PLAN_TILE_N_1_GOI.CTY7 ? (
                  convertToFloat2Fixed(
                    (EXEC_TILE_N_1_GOI.CTY7 * 100) / PLAN_TILE_N_1_GOI.CTY7
                  )
                ) : (
                  ""
                )}
                <span className="text-sub4">%</span>
              </td>
            </tr>
            <tr>
              <td className="text-sub4">Ước %HTKH tháng</td>
              <td
                className={
                  convertToFloat2Fixed(
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
                <span className="text-sub4">%</span>
              </td>

              <td
                className={
                  convertToFloat2Fixed(
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
                <span className="text-sub4">%</span>
              </td>
              <td
                className={
                  convertToFloat2Fixed(
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
                <span className="text-sub4">%</span>
              </td>
              <td
                className={
                  convertToFloat2Fixed(
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
                <span className="text-sub4">%</span>
              </td>
              <td
                className={
                  convertToFloat2Fixed(
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
                <span className="text-sub4">%</span>
              </td>
              <td
                className={
                  convertToFloat2Fixed(
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
                <span className="text-sub4">%</span>
              </td>
              <td
                className={
                    convertToFloat2Fixed(
                      (EXEC_TILE_N_1_GOI.CTY7 * 100) / PLAN_TILE_N_1_GOI.CTY7
                    )> 100
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
                <span className="text-sub4">%</span>
              </td>
            </tr>
            <tr>
              <td className="text-sub2">15</td>
              <td colSpan={11} className="text-sub2">
                Tỷ lệ Thuê bao N-1 gia hạn gói cước
              </td>
            </tr>
            <tr>
              <td rowSpan={4} className="text-sub3">
                15.1
              </td>
              <td rowSpan={4} className="text-sub3">
                Đơn kỳ
              </td>
              <td rowSpan={4}>%</td>
              <td>Kế hoạch tháng </td>
              <td>
                {loadingPlan ? (
                  <LoadingComponent />
                ) : PLAN_TILE_N_1_DONKY.KHO ? (
                  convertToFloat2Fixed(PLAN_TILE_N_1_DONKY.KHO)
                ) : (
                  ""
                )}
              </td>
              <td>
                {loadingPlan ? (
                  <LoadingComponent />
                ) : PLAN_TILE_N_1_DONKY.DLA ? (
                  convertToFloat2Fixed(PLAN_TILE_N_1_DONKY.DLA)
                ) : (
                  ""
                )}
              </td>
              <td>
                {loadingPlan ? (
                  <LoadingComponent />
                ) : PLAN_TILE_N_1_DONKY.GLA ? (
                  convertToFloat2Fixed(PLAN_TILE_N_1_DONKY.GLA)
                ) : (
                  ""
                )}
              </td>
              <td>
                {loadingPlan ? (
                  <LoadingComponent />
                ) : PLAN_TILE_N_1_DONKY.PYE ? (
                  convertToFloat2Fixed(PLAN_TILE_N_1_DONKY.PYE)
                ) : (
                  ""
                )}
              </td>
              <td>
                {loadingPlan ? (
                  <LoadingComponent />
                ) : PLAN_TILE_N_1_DONKY.DNO ? (
                  convertToFloat2Fixed(PLAN_TILE_N_1_DONKY.DNO)
                ) : (
                  ""
                )}
              </td>
              <td>
                {loadingPlan ? (
                  <LoadingComponent />
                ) : PLAN_TILE_N_1_DONKY.KON ? (
                  convertToFloat2Fixed(PLAN_TILE_N_1_DONKY.KON)
                ) : (
                  ""
                )}
              </td>
              <td>
                {loadingPlan ? (
                  <LoadingComponent />
                ) : PLAN_TILE_N_1_DONKY.CTY7 ? (
                  convertToFloat2Fixed(PLAN_TILE_N_1_DONKY.CTY7)
                ) : (
                  ""
                )}
              </td>
              <td rowSpan={4}>CSKH</td>
            </tr>
            <tr>
              <td className="text-sub4">Thực hiện lũy kế</td>
              <td>
                {loadingExec ? (
                  <LoadingComponent />
                ) : EXEC_TILE_N_1_DONKY.KHO ? (
                  convertToFloat2Fixed(EXEC_TILE_N_1_DONKY.KHO)
                ) : (
                  ""
                )}
              </td>
              <td>
                {loadingExec ? (
                  <LoadingComponent />
                ) : EXEC_TILE_N_1_DONKY.DLA ? (
                  convertToFloat2Fixed(EXEC_TILE_N_1_DONKY.DLA)
                ) : (
                  ""
                )}
              </td>
              <td>
                {loadingExec ? (
                  <LoadingComponent />
                ) : EXEC_TILE_N_1_DONKY.GLA ? (
                  convertToFloat2Fixed(EXEC_TILE_N_1_DONKY.GLA)
                ) : (
                  ""
                )}
              </td>
              <td>
                {loadingExec ? (
                  <LoadingComponent />
                ) : EXEC_TILE_N_1_DONKY.PYE ? (
                  convertToFloat2Fixed(EXEC_TILE_N_1_DONKY.PYE)
                ) : (
                  ""
                )}
              </td>
              <td>
                {loadingExec ? (
                  <LoadingComponent />
                ) : EXEC_TILE_N_1_DONKY.DNO ? (
                  convertToFloat2Fixed(EXEC_TILE_N_1_DONKY.DNO)
                ) : (
                  ""
                )}
              </td>
              <td>
                {loadingExec ? (
                  <LoadingComponent />
                ) : EXEC_TILE_N_1_DONKY.KON ? (
                  convertToFloat2Fixed(EXEC_TILE_N_1_DONKY.KON)
                ) : (
                  ""
                )}
              </td>
              <td>
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
              <td className="text-sub4">%HTKH lũy kế </td>
              <td>
                {loadingExec || loadingPlan ? (
                  <LoadingComponent />
                ) : EXEC_TILE_N_1_DONKY.KHO && PLAN_TILE_N_1_DONKY.KHO ? (
                  convertToFloat2Fixed(
                    (EXEC_TILE_N_1_DONKY.KHO * 100) / PLAN_TILE_N_1_DONKY.KHO
                  )
                ) : (
                  ""
                )}
                <span className="text-sub4">%</span>
              </td>
              <td>
                {loadingExec || loadingPlan ? (
                  <LoadingComponent />
                ) : EXEC_TILE_N_1_DONKY.DLA && PLAN_TILE_N_1_DONKY.DLA ? (
                  convertToFloat2Fixed(
                    (EXEC_TILE_N_1_DONKY.DLA * 100) / PLAN_TILE_N_1_DONKY.DLA
                  )
                ) : (
                  ""
                )}
                <span className="text-sub4">%</span>
              </td>
              <td>
                {loadingExec || loadingPlan ? (
                  <LoadingComponent />
                ) : EXEC_TILE_N_1_DONKY.GLA && PLAN_TILE_N_1_DONKY.GLA ? (
                  convertToFloat2Fixed(
                    (EXEC_TILE_N_1_DONKY.GLA * 100) / PLAN_TILE_N_1_DONKY.GLA
                  )
                ) : (
                  ""
                )}
                <span className="text-sub4">%</span>
              </td>
              <td>
                {loadingExec || loadingPlan ? (
                  <LoadingComponent />
                ) : EXEC_TILE_N_1_DONKY.PYE && PLAN_TILE_N_1_DONKY.PYE ? (
                  convertToFloat2Fixed(
                    (EXEC_TILE_N_1_DONKY.PYE * 100) / PLAN_TILE_N_1_DONKY.PYE
                  )
                ) : (
                  ""
                )}
                <span className="text-sub4">%</span>
              </td>
              <td>
                {loadingExec || loadingPlan ? (
                  <LoadingComponent />
                ) : EXEC_TILE_N_1_DONKY.DNO && PLAN_TILE_N_1_DONKY.DNO ? (
                  convertToFloat2Fixed(
                    (EXEC_TILE_N_1_DONKY.DNO * 100) / PLAN_TILE_N_1_DONKY.DNO
                  )
                ) : (
                  ""
                )}
                <span className="text-sub4">%</span>
              </td>
              <td>
                {loadingExec || loadingPlan ? (
                  <LoadingComponent />
                ) : EXEC_TILE_N_1_DONKY.KON && PLAN_TILE_N_1_DONKY.KON ? (
                  convertToFloat2Fixed(
                    (EXEC_TILE_N_1_DONKY.KON * 100) / PLAN_TILE_N_1_DONKY.KON
                  )
                ) : (
                  ""
                )}
                <span className="text-sub4">%</span>
              </td>
              <td>
                {loadingExec || loadingPlan ? (
                  <LoadingComponent />
                ) : EXEC_TILE_N_1_DONKY.CTY7 && PLAN_TILE_N_1_DONKY.CTY7 ? (
                  convertToFloat2Fixed(
                    (EXEC_TILE_N_1_DONKY.CTY7 * 100) / PLAN_TILE_N_1_DONKY.CTY7
                  )
                ) : (
                  ""
                )}
                <span className="text-sub4">%</span>
              </td>
            </tr>
            <tr>
              <td className="text-sub4">Ước %HTKH tháng</td>
              <td
                className={
                  convertToFloat2Fixed(
                    ((EXEC_TILE_N_1_DONKY.KHO / indexDateInMonth) *
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
                    ((EXEC_TILE_N_1_DONKY.KHO / indexDateInMonth) *
                      sumDateInMonth *
                      100) /
                      PLAN_TILE_N_1_DONKY.KHO
                  )
                ) : (
                  ""
                )}
                <span className="text-sub4">%</span>
              </td>
              <td
                className={
                  convertToFloat2Fixed(
                    ((EXEC_TILE_N_1_DONKY.DLA / indexDateInMonth) *
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
                    ((EXEC_TILE_N_1_DONKY.DLA / indexDateInMonth) *
                      sumDateInMonth *
                      100) /
                      PLAN_TILE_N_1_DONKY.DLA
                  )
                ) : (
                  ""
                )}
                <span className="text-sub4">%</span>
              </td>
              <td
                className={
                  convertToFloat2Fixed(
                    ((EXEC_TILE_N_1_DONKY.GLA / indexDateInMonth) *
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
                    ((EXEC_TILE_N_1_DONKY.GLA / indexDateInMonth) *
                      sumDateInMonth *
                      100) /
                      PLAN_TILE_N_1_DONKY.GLA
                  )
                ) : (
                  ""
                )}
                <span className="text-sub4">%</span>
              </td>
              <td
                className={
                  convertToFloat2Fixed(
                    ((EXEC_TILE_N_1_DONKY.PYE / indexDateInMonth) *
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
                    ((EXEC_TILE_N_1_DONKY.PYE / indexDateInMonth) *
                      sumDateInMonth *
                      100) /
                      PLAN_TILE_N_1_DONKY.PYE
                  )
                ) : (
                  ""
                )}
                <span className="text-sub4">%</span>
              </td>
              <td
                className={
                  convertToFloat2Fixed(
                    ((EXEC_TILE_N_1_DONKY.DNO / indexDateInMonth) *
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
                    ((EXEC_TILE_N_1_DONKY.DNO / indexDateInMonth) *
                      sumDateInMonth *
                      100) /
                      PLAN_TILE_N_1_DONKY.DNO
                  )
                ) : (
                  ""
                )}
                <span className="text-sub4">%</span>
              </td>
              <td
                className={
                  convertToFloat2Fixed(
                    ((EXEC_TILE_N_1_DONKY.KON / indexDateInMonth) *
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
                    ((EXEC_TILE_N_1_DONKY.KON / indexDateInMonth) *
                      sumDateInMonth *
                      100) /
                      PLAN_TILE_N_1_DONKY.KON
                  )
                ) : (
                  ""
                )}
                <span className="text-sub4">%</span>
              </td>
              <td
                className={
                  convertToFloat2Fixed(
                    ((EXEC_TILE_N_1_DONKY.CTY7 / indexDateInMonth) *
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
                    ((EXEC_TILE_N_1_DONKY.CTY7 / indexDateInMonth) *
                      sumDateInMonth *
                      100) /
                      PLAN_TILE_N_1_DONKY.CTY7
                  )
                ) : (
                  ""
                )}
                <span className="text-sub4">%</span>
              </td>
            </tr>
            <tr>
              <td rowSpan={4} className="text-sub3">
                15.2
              </td>
              <td rowSpan={4} className="text-sub3">
                Dài kỳ
              </td>
              <td rowSpan={4}>%</td>
              <td>Kế hoạch tháng </td>
              <td>
                {loadingPlan ? (
                  <LoadingComponent />
                ) : PLAN_TILE_N_1_DAIKY.KHO ? (
                  convertToFloat2Fixed(PLAN_TILE_N_1_DAIKY.KHO)
                ) : (
                  ""
                )}
              </td>
              <td>
                {loadingPlan ? (
                  <LoadingComponent />
                ) : PLAN_TILE_N_1_DAIKY.DLA ? (
                  convertToFloat2Fixed(PLAN_TILE_N_1_DAIKY.DLA)
                ) : (
                  ""
                )}
              </td>
              <td>
                {loadingPlan ? (
                  <LoadingComponent />
                ) : PLAN_TILE_N_1_DAIKY.GLA ? (
                  convertToFloat2Fixed(PLAN_TILE_N_1_DAIKY.GLA)
                ) : (
                  ""
                )}
              </td>
              <td>
                {loadingPlan ? (
                  <LoadingComponent />
                ) : PLAN_TILE_N_1_DAIKY.PYE ? (
                  convertToFloat2Fixed(PLAN_TILE_N_1_DAIKY.PYE)
                ) : (
                  ""
                )}
              </td>
              <td>
                {loadingPlan ? (
                  <LoadingComponent />
                ) : PLAN_TILE_N_1_DAIKY.DNO ? (
                  convertToFloat2Fixed(PLAN_TILE_N_1_DAIKY.DNO)
                ) : (
                  ""
                )}
              </td>
              <td>
                {loadingPlan ? (
                  <LoadingComponent />
                ) : PLAN_TILE_N_1_DAIKY.KON ? (
                  convertToFloat2Fixed(PLAN_TILE_N_1_DAIKY.KON)
                ) : (
                  ""
                )}
              </td>
              <td>
                {loadingPlan ? (
                  <LoadingComponent />
                ) : PLAN_TILE_N_1_DAIKY.CTY7 ? (
                  convertToFloat2Fixed(PLAN_TILE_N_1_DAIKY.CTY7)
                ) : (
                  ""
                )}
              </td>
              <td rowSpan={4}>CSKH</td>
            </tr>
            <tr>
              <td className="text-sub4">Thực hiện lũy kế</td>
              <td>
                {loadingPlan ? (
                  <LoadingComponent />
                ) : EXEC_TILE_N_1_DAIKY.KHO ? (
                  convertToFloat2Fixed(EXEC_TILE_N_1_DAIKY.KHO)
                ) : (
                  ""
                )}
              </td>
              <td>
                {loadingPlan ? (
                  <LoadingComponent />
                ) : EXEC_TILE_N_1_DAIKY.DLA ? (
                  convertToFloat2Fixed(EXEC_TILE_N_1_DAIKY.DLA)
                ) : (
                  ""
                )}
              </td>
              <td>
                {loadingPlan ? (
                  <LoadingComponent />
                ) : EXEC_TILE_N_1_DAIKY.GLA ? (
                  convertToFloat2Fixed(EXEC_TILE_N_1_DAIKY.GLA)
                ) : (
                  ""
                )}
              </td>
              <td>
                {loadingPlan ? (
                  <LoadingComponent />
                ) : EXEC_TILE_N_1_DAIKY.PYE ? (
                  convertToFloat2Fixed(EXEC_TILE_N_1_DAIKY.PYE)
                ) : (
                  ""
                )}
              </td>
              <td>
                {loadingPlan ? (
                  <LoadingComponent />
                ) : EXEC_TILE_N_1_DAIKY.DNO ? (
                  convertToFloat2Fixed(EXEC_TILE_N_1_DAIKY.DNO)
                ) : (
                  ""
                )}
              </td>
              <td>
                {loadingPlan ? (
                  <LoadingComponent />
                ) : EXEC_TILE_N_1_DAIKY.KON ? (
                  convertToFloat2Fixed(EXEC_TILE_N_1_DAIKY.KON)
                ) : (
                  ""
                )}
              </td>
              <td>
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
              <td className="text-sub4">%HTKH lũy kế </td>
              <td>
                {loadingExec || loadingPlan ? (
                  <LoadingComponent />
                ) : EXEC_TILE_N_1_DAIKY.KHO && PLAN_TILE_N_1_DAIKY.KHO ? (
                  convertToFloat2Fixed(
                    (EXEC_TILE_N_1_DAIKY.KHO * 100) / PLAN_TILE_N_1_DAIKY.KHO
                  )
                ) : (
                  ""
                )}
                <span className="text-sub4">%</span>
              </td>
              <td>
                {loadingExec || loadingPlan ? (
                  <LoadingComponent />
                ) : EXEC_TILE_N_1_DAIKY.DLA && PLAN_TILE_N_1_DAIKY.DLA ? (
                  convertToFloat2Fixed(
                    (EXEC_TILE_N_1_DAIKY.DLA * 100) / PLAN_TILE_N_1_DAIKY.DLA
                  )
                ) : (
                  ""
                )}
                <span className="text-sub4">%</span>
              </td>
              <td>
                {loadingExec || loadingPlan ? (
                  <LoadingComponent />
                ) : EXEC_TILE_N_1_DAIKY.GLA && PLAN_TILE_N_1_DAIKY.GLA ? (
                  convertToFloat2Fixed(
                    (EXEC_TILE_N_1_DAIKY.GLA * 100) / PLAN_TILE_N_1_DAIKY.GLA
                  )
                ) : (
                  ""
                )}
                <span className="text-sub4">%</span>
              </td>
              <td>
                {loadingExec || loadingPlan ? (
                  <LoadingComponent />
                ) : EXEC_TILE_N_1_DAIKY.PYE && PLAN_TILE_N_1_DAIKY.PYE ? (
                  convertToFloat2Fixed(
                    (EXEC_TILE_N_1_DAIKY.PYE * 100) / PLAN_TILE_N_1_DAIKY.PYE
                  )
                ) : (
                  ""
                )}
                <span className="text-sub4">%</span>
              </td>
              <td>
                {loadingExec || loadingPlan ? (
                  <LoadingComponent />
                ) : EXEC_TILE_N_1_DAIKY.DNO && PLAN_TILE_N_1_DAIKY.DNO ? (
                  convertToFloat2Fixed(
                    (EXEC_TILE_N_1_DAIKY.DNO * 100) / PLAN_TILE_N_1_DAIKY.DNO
                  )
                ) : (
                  ""
                )}
                <span className="text-sub4">%</span>
              </td>
              <td>
                {loadingExec || loadingPlan ? (
                  <LoadingComponent />
                ) : EXEC_TILE_N_1_DAIKY.KON && PLAN_TILE_N_1_DAIKY.KON ? (
                  convertToFloat2Fixed(
                    (EXEC_TILE_N_1_DAIKY.KON * 100) / PLAN_TILE_N_1_DAIKY.KON
                  )
                ) : (
                  ""
                )}
                <span className="text-sub4">%</span>
              </td>
              <td>
                {loadingExec || loadingPlan ? (
                  <LoadingComponent />
                ) : EXEC_TILE_N_1_DAIKY.CTY7 && PLAN_TILE_N_1_DAIKY.CTY7 ? (
                  convertToFloat2Fixed(
                    (EXEC_TILE_N_1_DAIKY.CTY7 * 100) / PLAN_TILE_N_1_DAIKY.CTY7
                  )
                ) : (
                  ""
                )}
                <span className="text-sub4">%</span>
              </td>
            </tr>
            <tr>
              <td className="text-sub4">Ước %HTKH tháng</td>
              <td
                className={
                  convertToFloat2Fixed(
                    ((EXEC_TILE_N_1_DAIKY.KHO / indexDateInMonth) *
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
                    ((EXEC_TILE_N_1_DAIKY.KHO / indexDateInMonth) *
                      sumDateInMonth *
                      100) /
                      PLAN_TILE_N_1_DAIKY.KHO
                  )
                ) : (
                  ""
                )}
                <span className="text-sub4">%</span>
              </td>
              <td
                className={
                  convertToFloat2Fixed(
                    ((EXEC_TILE_N_1_DAIKY.DLA / indexDateInMonth) *
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
                    ((EXEC_TILE_N_1_DAIKY.DLA / indexDateInMonth) *
                      sumDateInMonth *
                      100) /
                      PLAN_TILE_N_1_DAIKY.DLA
                  )
                ) : (
                  ""
                )}
                <span className="text-sub4">%</span>
              </td>
              <td
                className={
                  convertToFloat2Fixed(
                    ((EXEC_TILE_N_1_DAIKY.GLA / indexDateInMonth) *
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
                    ((EXEC_TILE_N_1_DAIKY.GLA / indexDateInMonth) *
                      sumDateInMonth *
                      100) /
                      PLAN_TILE_N_1_DAIKY.GLA
                  )
                ) : (
                  ""
                )}
                <span className="text-sub4">%</span>
              </td>
              <td
                className={
                  convertToFloat2Fixed(
                    ((EXEC_TILE_N_1_DAIKY.PYE / indexDateInMonth) *
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
                    ((EXEC_TILE_N_1_DAIKY.PYE / indexDateInMonth) *
                      sumDateInMonth *
                      100) /
                      PLAN_TILE_N_1_DAIKY.PYE
                  )
                ) : (
                  ""
                )}
                <span className="text-sub4">%</span>
              </td>
              <td
                className={
                  convertToFloat2Fixed(
                    ((EXEC_TILE_N_1_DAIKY.DNO / indexDateInMonth) *
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
                    ((EXEC_TILE_N_1_DAIKY.DNO / indexDateInMonth) *
                      sumDateInMonth *
                      100) /
                      PLAN_TILE_N_1_DAIKY.DNO
                  )
                ) : (
                  ""
                )}
                <span className="text-sub4">%</span>
              </td>
              <td
                className={
                  convertToFloat2Fixed(
                    ((EXEC_TILE_N_1_DAIKY.KON / indexDateInMonth) *
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
                    ((EXEC_TILE_N_1_DAIKY.KON / indexDateInMonth) *
                      sumDateInMonth *
                      100) /
                      PLAN_TILE_N_1_DAIKY.KON
                  )
                ) : (
                  ""
                )}
                <span className="text-sub4">%</span>
              </td>
              <td
                className={
                  convertToFloat2Fixed(
                    ((EXEC_TILE_N_1_DAIKY.CTY7 / indexDateInMonth) *
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
                    ((EXEC_TILE_N_1_DAIKY.CTY7 / indexDateInMonth) *
                      sumDateInMonth *
                      100) /
                      PLAN_TILE_N_1_DAIKY.CTY7
                  )
                ) : (
                  ""
                )}
                <span className="text-sub4">%</span>
              </td>
            </tr>
            <tr>
              <td rowSpan={4} className="text-sub2">
                16
              </td>
              <td rowSpan={4} className="text-sub2">
                Tỷ lệ TB MNP đến - đi (1:1)
              </td>
              <td rowSpan={4}>%</td>
              <td className="text-sub4">Kế hoạch tháng</td>
              <td>
                {loadingPlan ? (
                  <LoadingComponent />
                ) : PLAN_TILE_MNP.KHO ? (
                  parseInt(PLAN_TILE_MNP.KHO)
                ) : (
                  ""
                )}
              </td>
              <td>
                {loadingPlan ? (
                  <LoadingComponent />
                ) : PLAN_TILE_MNP.DLA ? (
                  parseInt(PLAN_TILE_MNP.DLA)
                ) : (
                  ""
                )}
              </td>
              <td>
                {loadingPlan ? (
                  <LoadingComponent />
                ) : PLAN_TILE_MNP.GLA ? (
                  parseInt(PLAN_TILE_MNP.GLA)
                ) : (
                  ""
                )}
              </td>
              <td>
                {loadingPlan ? (
                  <LoadingComponent />
                ) : PLAN_TILE_MNP.PYE ? (
                  parseInt(PLAN_TILE_MNP.PYE)
                ) : (
                  ""
                )}
              </td>
              <td>
                {loadingPlan ? (
                  <LoadingComponent />
                ) : PLAN_TILE_MNP.DNO ? (
                  parseInt(PLAN_TILE_MNP.DNO)
                ) : (
                  ""
                )}
              </td>
              <td>
                {loadingPlan ? (
                  <LoadingComponent />
                ) : PLAN_TILE_MNP.KON ? (
                  parseInt(PLAN_TILE_MNP.KON)
                ) : (
                  ""
                )}
              </td>
              <td>
                {loadingPlan ? (
                  <LoadingComponent />
                ) : PLAN_TILE_MNP.CTY7 ? (
                  parseInt(PLAN_TILE_MNP.CTY7)
                ) : (
                  ""
                )}
              </td>
              <td rowSpan={4}>CSKH</td>
            </tr>
            <tr>
              <td className="text-sub4">Thực hiện lũy kế</td>
              <td>
                {loadingExec ? (
                  <LoadingComponent />
                ) : EXEC_TILE_MNP.KHO ? (
                  parseInt(EXEC_TILE_MNP.KHO)
                ) : (
                  ""
                )}
              </td>
              <td>
                {loadingExec ? (
                  <LoadingComponent />
                ) : EXEC_TILE_MNP.DLA ? (
                  parseInt(EXEC_TILE_MNP.DLA)
                ) : (
                  ""
                )}
              </td>
              <td>
                {loadingExec ? (
                  <LoadingComponent />
                ) : EXEC_TILE_MNP.GLA ? (
                  parseInt(EXEC_TILE_MNP.GLA)
                ) : (
                  ""
                )}
              </td>

              <td>
                {loadingExec ? (
                  <LoadingComponent />
                ) : EXEC_TILE_MNP.PYE ? (
                  parseInt(EXEC_TILE_MNP.PYE)
                ) : (
                  ""
                )}
              </td>
              <td>
                {loadingExec ? (
                  <LoadingComponent />
                ) : EXEC_TILE_MNP.DNO ? (
                  parseInt(EXEC_TILE_MNP.DNO)
                ) : (
                  ""
                )}
              </td>
              <td>
                {loadingExec ? (
                  <LoadingComponent />
                ) : EXEC_TILE_MNP.KON ? (
                  parseInt(EXEC_TILE_MNP.KON)
                ) : (
                  ""
                )}
              </td>
              <td>
                {loadingExec ? (
                  <LoadingComponent />
                ) : EXEC_TILE_MNP.CT7 ? (
                  parseInt(EXEC_TILE_MNP.CTY7)
                ) : (
                  ""
                )}
              </td>
            </tr>
            <tr>
              <td className="text-sub4">%HTKH lũy kế </td>
              <td>
                {loadingExec || loadingPlan ? (
                  <LoadingComponent />
                ) : EXEC_TILE_MNP.KHO && PLAN_TILE_MNP.KHO ? (
                  convertToFloat2Fixed(
                    (EXEC_TILE_MNP.KHO * 100) / PLAN_TILE_MNP.KHO
                  )
                ) : (
                  ""
                )}
                <span className="text-sub4">%</span>
              </td>
              <td>
                {loadingExec || loadingPlan ? (
                  <LoadingComponent />
                ) : EXEC_TILE_MNP.DLA && PLAN_TILE_MNP.DLA ? (
                  convertToFloat2Fixed(
                    (EXEC_TILE_MNP.DLA * 100) / PLAN_TILE_MNP.DLA
                  )
                ) : (
                  ""
                )}
                <span className="text-sub4">%</span>
              </td>
              <td>
                {loadingExec || loadingPlan ? (
                  <LoadingComponent />
                ) : EXEC_TILE_MNP.GLA && PLAN_TILE_MNP.GLA ? (
                  convertToFloat2Fixed(
                    (EXEC_TILE_MNP.GLA * 100) / PLAN_TILE_MNP.GLA
                  )
                ) : (
                  ""
                )}
                <span className="text-sub4">%</span>
              </td>
              <td>
                {loadingExec || loadingPlan ? (
                  <LoadingComponent />
                ) : EXEC_TILE_MNP.PYE && PLAN_TILE_MNP.PYE ? (
                  convertToFloat2Fixed(
                    (EXEC_TILE_MNP.PYE * 100) / PLAN_TILE_MNP.PYE
                  )
                ) : (
                  ""
                )}
                <span className="text-sub4">%</span>
              </td>
              <td>
                {loadingExec || loadingPlan ? (
                  <LoadingComponent />
                ) : EXEC_TILE_MNP.DNO && PLAN_TILE_MNP.DNO ? (
                  convertToFloat2Fixed(
                    (EXEC_TILE_MNP.DNO * 100) / PLAN_TILE_MNP.DNO
                  )
                ) : (
                  ""
                )}
                <span className="text-sub4">%</span>
              </td>
              <td>
                {loadingExec || loadingPlan ? (
                  <LoadingComponent />
                ) : EXEC_TILE_MNP.KON && PLAN_TILE_MNP.KON ? (
                  convertToFloat2Fixed(
                    (EXEC_TILE_MNP.KON * 100) / PLAN_TILE_MNP.KON
                  )
                ) : (
                  ""
                )}
                <span className="text-sub4">%</span>
              </td>
              <td>
                {loadingExec || loadingPlan ? (
                  <LoadingComponent />
                ) : EXEC_TILE_MNP.CTY7 && PLAN_TILE_MNP.CTY7 ? (
                  convertToFloat2Fixed(
                    (EXEC_TILE_MNP.CTY7 * 100) / PLAN_TILE_MNP.CTY7
                  )
                ) : (
                  ""
                )}
                <span className="text-sub4">%</span>
              </td>
            </tr>
            <tr>
              <td className="text-sub4">Ước %HTKH tháng</td>
              <td
                className={
                  convertToFloat2Fixed(
                    (EXEC_TILE_MNP.KHO * 100) / PLAN_TILE_MNP.KHO
                  ) > 100
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
                <span className="text-sub4">%</span>
              </td>

              <td
                className={
                  convertToFloat2Fixed(
                    (EXEC_TILE_MNP.DLA * 100) / PLAN_TILE_MNP.DLA
                  ) > 100
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
                <span className="text-sub4">%</span>
              </td>

              <td
                className={
                  convertToFloat2Fixed(
                    (EXEC_TILE_MNP.GLA * 100) / PLAN_TILE_MNP.GLA
                  ) > 100
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
                <span className="text-sub4">%</span>
              </td>

              <td
                className={
                  convertToFloat2Fixed(
                    (EXEC_TILE_MNP.PYE * 100) / PLAN_TILE_MNP.PYE
                  ) > 100
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
                <span className="text-sub4">%</span>
              </td>

              <td
                className={
                  convertToFloat2Fixed(
                    (EXEC_TILE_MNP.DNO * 100) / PLAN_TILE_MNP.DNO
                  ) > 100
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
                <span className="text-sub4">%</span>
              </td>

              <td
                className={
                  convertToFloat2Fixed(
                    (EXEC_TILE_MNP.KON * 100) / PLAN_TILE_MNP.KON
                  ) > 100
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
                <span className="text-sub4">%</span>
              </td>

              <td
                className={
                  convertToFloat2Fixed(
                    (EXEC_TILE_MNP.CTY7 * 100) / PLAN_TILE_MNP.CTY7
                  ) > 100
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
                <span className="text-sub4">%</span>
              </td>
            </tr>
            <tr>
              <td rowSpan={4} className="text-sub2">
                17
              </td>
              <td rowSpan={4} className="text-sub2">
                Tỷ lệ DN sử dụng giải pháp MobiFone
              </td>
              <td rowSpan={4}>%</td>
              <td className="text-sub4">Kế hoạch tháng</td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td rowSpan={4}>CNS</td>
            </tr>
            <tr>
              <td className="text-sub4">Thực hiện lũy kế</td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
            </tr>
            <tr>
              <td className="text-sub4">%HTKH lũy kế </td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
            </tr>
            <tr>
              <td className="text-sub4">Ước %HTKH tháng</td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
            </tr>
            <tr>
              <td className="text-sub1">V</td>
              <td className="text-sub1" colSpan={12}>
                <span className="text-bold">Quy mô</span>
              </td>
            </tr>
            <tr>
              <td rowSpan={4} className="text-sub2">
                18
              </td>
              <td rowSpan={4} className="text-sub2">
                Tăng trưởng Doanh thu quản trị
              </td>
              <td rowSpan={4}>triệu đồng</td>
              <td className="text-sub4">Kế hoạch tháng</td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td rowSpan={4}>TH</td>
            </tr>
            <tr>
              <td className="text-sub4">Thực hiện lũy kế</td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
            </tr>
            <tr>
              <td className="text-sub4">%HTKH lũy kế </td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
            </tr>
            <tr>
              <td className="text-sub4">Ước %HTKH tháng</td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Page;
