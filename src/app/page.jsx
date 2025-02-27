"use client";
import React, { useState, useEffect } from "react";
import moment from "moment";
import { ErrorMessage, Form, Formik } from "formik";
import "react-datepicker/dist/react-datepicker.css";
import { DatePickerField } from "../components/widgets/datePickers/DatePickerField";
import * as Yup from "yup";
import "bootstrap/dist/css/bootstrap.min.css";
import LoadingComponent from "@components/loading/LoadingComponent";
import { convertToFloat2Fixed,daysInThisMonth } from "../until/functions";

var x = new Date();
x.setDate(1);
x.setMonth(x.getMonth());
const INIT_VALUES = {
  selectMonth: x,
};

var indexDateInMonth = new Date().getDate();

console.log('indexDateInMonth',indexDateInMonth)
var sumDateInMonth = daysInThisMonth();
console.log('sumDateInMonth')

const Page = () => {
  const [initValues, setInitValues] = useState(INIT_VALUES);
  const formSchema = Yup.object().shape({});
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

  const [loadingPlan, setLoadingPlan] = useState(false);

  const [loadingExec, setLoadingExec] = useState(false);

  useEffect(() => {
    setLoadingPlan(true);
    setLoadingExec(true);
    fetch("api/get-plan-kpi?month=01-02-2025").then(async (res) => {
      setLoadingPlan(false);
      const data = await res.json();
      console.log("data", data);
      if (data && data.result) {
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
          if (object["TEN_CHI_TIEU"] == "TILE_N_1_DAIKY") {
            SET_PLAN_TILE_N_1_DAIKY(object);
          }
          if (object["TEN_CHI_TIEU"] == "TILE_MNP") {
            SET_PLAN_TILE_MNP(object);
          }
        });
      }
    });

    fetch("api/get-exec-kpi?month=01-02-2025").then(async (res) => {
      setLoadingExec(false);
      const data = await res.json();
      data.result.map((object, index) => {
        if (object["TEN_CHI_TIEU"] == "DTHU_TKC_HTS") {
          SET_EXEC_DTHU_TKC_HTS(object);
        }
      });
    });
  }, []);

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
                   ( EXEC_DTHU_TKC_HTS.KHO *100)  /
                      (PLAN_DTHU_TKC_HTS.KHO *1000000 )
                    
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
                    ( EXEC_DTHU_TKC_HTS.DLA *100)  /
                      (PLAN_DTHU_TKC_HTS.DLA *1000000 )
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
                    ( EXEC_DTHU_TKC_HTS.GLA *100)  /
                    (PLAN_DTHU_TKC_HTS.GLA *1000000 )
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
                    ( EXEC_DTHU_TKC_HTS.PYE *100)  /
                    (PLAN_DTHU_TKC_HTS.PYE *1000000 )
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
                    ( EXEC_DTHU_TKC_HTS.DNO *100)  /
                    (PLAN_DTHU_TKC_HTS.DNO *1000000 )
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
                    ( EXEC_DTHU_TKC_HTS.KON *100)  /
                    (PLAN_DTHU_TKC_HTS.KON *1000000 )
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
                    ( EXEC_DTHU_TKC_HTS.CTY7 *100)  /
                    (PLAN_DTHU_TKC_HTS.CTY7 *1000000 )
                  )
                ) : (
                  ""
                )}
                <span className="text-sub4">%</span>
              </td>
            </tr>
            <tr>
              <td className="text-sub4">Ước %HTKH tháng</td>
              <td className={convertToFloat2Fixed(
                    ( EXEC_DTHU_TKC_HTS.KHO /indexDateInMonth*sumDateInMonth)*100  /
                    (PLAN_DTHU_TKC_HTS.KHO *1000000 )
                  ) >100 ? "bg-green": "bg-red"}>

              {loadingExec || loadingPlan ? (
                  <LoadingComponent />
                ) : EXEC_DTHU_TKC_HTS.KHO && PLAN_DTHU_TKC_HTS.KHO ? (
                  convertToFloat2Fixed(
                    ( EXEC_DTHU_TKC_HTS.KHO /indexDateInMonth*sumDateInMonth)*100  /
                    (PLAN_DTHU_TKC_HTS.KHO *1000000 )
                  )
                ) : (
                  ""
                )}
                <span className="text-sub4">%</span>
              </td>
              <td className={convertToFloat2Fixed(
                    ( EXEC_DTHU_TKC_HTS.DLA /indexDateInMonth*sumDateInMonth)*100  /
                    (PLAN_DTHU_TKC_HTS.DLA *1000000 )
                  ) >100 ? "bg-green": "bg-red"}>
              {loadingExec || loadingPlan ? (
                  <LoadingComponent />
                ) : EXEC_DTHU_TKC_HTS.DLA && PLAN_DTHU_TKC_HTS.DLA ? (
                  convertToFloat2Fixed(
                    ( EXEC_DTHU_TKC_HTS.DLA /indexDateInMonth*sumDateInMonth)*100  /
                    (PLAN_DTHU_TKC_HTS.DLA *1000000 )
                  )
                ) : (
                  ""
                )}
                <span className="text-sub4">%</span>
              </td>
              <td className={convertToFloat2Fixed(
                    ( EXEC_DTHU_TKC_HTS.GLA /indexDateInMonth*sumDateInMonth)*100  /
                    (PLAN_DTHU_TKC_HTS.GLA *1000000 )
                  ) >100 ? "bg-green": "bg-red"}>
              {loadingExec || loadingPlan ? (
                  <LoadingComponent />
                ) : EXEC_DTHU_TKC_HTS.GLA && PLAN_DTHU_TKC_HTS.GLA ? (
                  convertToFloat2Fixed(
                    ( EXEC_DTHU_TKC_HTS.GLA /indexDateInMonth*sumDateInMonth)*100  /
                    (PLAN_DTHU_TKC_HTS.GLA *1000000 )
                  )
                ) : (
                  ""
                )}
                <span className="text-sub4">%</span>
              </td>
              <td className={convertToFloat2Fixed(
                    ( EXEC_DTHU_TKC_HTS.PYE /indexDateInMonth*sumDateInMonth)*100  /
                    (PLAN_DTHU_TKC_HTS.PYE *1000000 )
                  ) >100 ? "bg-green": "bg-red"}>
              {loadingExec || loadingPlan ? (
                  <LoadingComponent />
                ) : EXEC_DTHU_TKC_HTS.PYE && PLAN_DTHU_TKC_HTS.PYE ? (
                  convertToFloat2Fixed(
                    ( EXEC_DTHU_TKC_HTS.PYE /indexDateInMonth*sumDateInMonth)*100  /
                    (PLAN_DTHU_TKC_HTS.PYE *1000000 )
                  )
                ) : (
                  ""
                )}
                <span className="text-sub4">%</span>
              </td>
              <td className={convertToFloat2Fixed(
                    ( EXEC_DTHU_TKC_HTS.DNO /indexDateInMonth*sumDateInMonth)*100  /
                    (PLAN_DTHU_TKC_HTS.DNO *1000000 )
                  ) >100 ? "bg-green": "bg-red"}>
              {loadingExec || loadingPlan ? (
                  <LoadingComponent />
                ) : EXEC_DTHU_TKC_HTS.DNO && PLAN_DTHU_TKC_HTS.DNO ? (
                  convertToFloat2Fixed(
                    ( EXEC_DTHU_TKC_HTS.DNO /indexDateInMonth*sumDateInMonth)*100  /
                    (PLAN_DTHU_TKC_HTS.DNO *1000000 )
                  )
                ) : (
                  ""
                )}
                <span className="text-sub4">%</span>
              </td>
              <td className={convertToFloat2Fixed(
                    ( EXEC_DTHU_TKC_HTS.KON /indexDateInMonth*sumDateInMonth)*100  /
                    (PLAN_DTHU_TKC_HTS.KON *1000000 )
                  ) >100 ? "bg-green": "bg-red"}>
              {loadingExec || loadingPlan ? (
                  <LoadingComponent />
                ) : EXEC_DTHU_TKC_HTS.KON && PLAN_DTHU_TKC_HTS.KON ? (
                  convertToFloat2Fixed(
                    ( EXEC_DTHU_TKC_HTS.KON /indexDateInMonth*sumDateInMonth)*100  /
                    (PLAN_DTHU_TKC_HTS.KON *1000000 )
                  )
                ) : (
                  ""
                )}
                <span className="text-sub4">%</span>
              </td>
              <td className={convertToFloat2Fixed(
                    ( EXEC_DTHU_TKC_HTS.CTY7 /indexDateInMonth*sumDateInMonth)*100  /
                    (PLAN_DTHU_TKC_HTS.CTY7 *1000000 )
                  ) >100 ? "bg-green": "bg-red"}>
              {loadingExec || loadingPlan ? (
                  <LoadingComponent />
                ) : EXEC_DTHU_TKC_HTS.CTY7 && PLAN_DTHU_TKC_HTS.CTY7 ? (
                  convertToFloat2Fixed(
                    ( EXEC_DTHU_TKC_HTS.CTY7 /indexDateInMonth*sumDateInMonth)*100  /
                    (PLAN_DTHU_TKC_HTS.CTY7 *1000000 )
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
                  convertToFloat2Fixed(PLAN_SL_C2C.KHO)
                ) : (
                  ""
                )}
              </td>
              <td>
                {loadingPlan ? (
                  <LoadingComponent />
                ) : PLAN_SL_C2C.DLA ? (
                  convertToFloat2Fixed(PLAN_SL_C2C.DLA)
                ) : (
                  ""
                )}
              </td>
              <td>
                {loadingPlan ? (
                  <LoadingComponent />
                ) : PLAN_SL_C2C.GLA ? (
                  convertToFloat2Fixed(PLAN_SL_C2C.GLA)
                ) : (
                  ""
                )}
              </td>
              <td>
                {loadingPlan ? (
                  <LoadingComponent />
                ) : PLAN_SL_C2C.PYE ? (
                  convertToFloat2Fixed(PLAN_SL_C2C.PYE)
                ) : (
                  ""
                )}
              </td>
              <td>
                {loadingPlan ? (
                  <LoadingComponent />
                ) : PLAN_SL_C2C.DNO ? (
                  convertToFloat2Fixed(PLAN_SL_C2C.DNO)
                ) : (
                  ""
                )}
              </td>
              <td>
                {loadingPlan ? (
                  <LoadingComponent />
                ) : PLAN_SL_C2C.KON ? (
                  convertToFloat2Fixed(PLAN_SL_C2C.KON)
                ) : (
                  ""
                )}
              </td>
              <td>
                {loadingPlan ? (
                  <LoadingComponent />
                ) : PLAN_SL_C2C.CTY7 ? (
                  convertToFloat2Fixed(PLAN_SL_C2C.CTY7)
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
                  convertToFloat2Fixed(PLAN_TYLE_GD_C2C.KHO)
                ) : (
                  ""
                )}
              </td>
              <td>
                {loadingPlan ? (
                  <LoadingComponent />
                ) : PLAN_TYLE_GD_C2C.DLA ? (
                  convertToFloat2Fixed(PLAN_TYLE_GD_C2C.DLA)
                ) : (
                  ""
                )}
              </td>
              <td>
                {loadingPlan ? (
                  <LoadingComponent />
                ) : PLAN_TYLE_GD_C2C.GLA ? (
                  convertToFloat2Fixed(PLAN_TYLE_GD_C2C.GLA)
                ) : (
                  ""
                )}
              </td>
              <td>
                {loadingPlan ? (
                  <LoadingComponent />
                ) : PLAN_TYLE_GD_C2C.PYE ? (
                  convertToFloat2Fixed(PLAN_TYLE_GD_C2C.PYE)
                ) : (
                  ""
                )}
              </td>
              <td>
                {loadingPlan ? (
                  <LoadingComponent />
                ) : PLAN_TYLE_GD_C2C.DNO ? (
                  convertToFloat2Fixed(PLAN_TYLE_GD_C2C.DNO)
                ) : (
                  ""
                )}
              </td>
              <td>
                {loadingPlan ? (
                  <LoadingComponent />
                ) : PLAN_TYLE_GD_C2C.KON ? (
                  convertToFloat2Fixed(PLAN_TYLE_GD_C2C.KON)
                ) : (
                  ""
                )}
              </td>
              <td>
                {loadingPlan ? (
                  <LoadingComponent />
                ) : PLAN_TYLE_GD_C2C.CTY7 ? (
                  convertToFloat2Fixed(PLAN_TYLE_GD_C2C.CTY7)
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
                  convertToFloat2Fixed(PLAN_SL_PTM_TBTT_HTS.KHO)
                ) : (
                  ""
                )}
              </td>
              <td>
                {loadingPlan ? (
                  <LoadingComponent />
                ) : PLAN_SL_PTM_TBTT_HTS.DLA ? (
                  convertToFloat2Fixed(PLAN_SL_PTM_TBTT_HTS.DLA)
                ) : (
                  ""
                )}
              </td>
              <td>
                {loadingPlan ? (
                  <LoadingComponent />
                ) : PLAN_SL_PTM_TBTT_HTS.GLA ? (
                  convertToFloat2Fixed(PLAN_SL_PTM_TBTT_HTS.GLA)
                ) : (
                  ""
                )}
              </td>
              <td>
                {loadingPlan ? (
                  <LoadingComponent />
                ) : PLAN_SL_PTM_TBTT_HTS.PYE ? (
                  convertToFloat2Fixed(PLAN_SL_PTM_TBTT_HTS.PYE)
                ) : (
                  ""
                )}
              </td>
              <td>
                {loadingPlan ? (
                  <LoadingComponent />
                ) : PLAN_SL_PTM_TBTT_HTS.DNO ? (
                  convertToFloat2Fixed(PLAN_SL_PTM_TBTT_HTS.DNO)
                ) : (
                  ""
                )}
              </td>
              <td>
                {loadingPlan ? (
                  <LoadingComponent />
                ) : PLAN_SL_PTM_TBTT_HTS.KON ? (
                  convertToFloat2Fixed(PLAN_SL_PTM_TBTT_HTS.KON)
                ) : (
                  ""
                )}
              </td>
              <td>
                {loadingPlan ? (
                  <LoadingComponent />
                ) : PLAN_SL_PTM_TBTT_HTS.CTY7 ? (
                  convertToFloat2Fixed(PLAN_SL_PTM_TBTT_HTS.CTY7)
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
                  convertToFloat2Fixed(PLAN_SL_PTM_TBTT_NDS.KHO)
                ) : (
                  ""
                )}
              </td>
              <td>
                {loadingPlan ? (
                  <LoadingComponent />
                ) : PLAN_SL_PTM_TBTT_NDS.DLA ? (
                  convertToFloat2Fixed(PLAN_SL_PTM_TBTT_NDS.DLA)
                ) : (
                  ""
                )}
              </td>
              <td>
                {loadingPlan ? (
                  <LoadingComponent />
                ) : PLAN_SL_PTM_TBTT_NDS.GLA ? (
                  convertToFloat2Fixed(PLAN_SL_PTM_TBTT_NDS.GLA)
                ) : (
                  ""
                )}
              </td>
              <td>
                {loadingPlan ? (
                  <LoadingComponent />
                ) : PLAN_SL_PTM_TBTT_NDS.PYE ? (
                  convertToFloat2Fixed(PLAN_SL_PTM_TBTT_NDS.PYE)
                ) : (
                  ""
                )}
              </td>
              <td>
                {loadingPlan ? (
                  <LoadingComponent />
                ) : PLAN_SL_PTM_TBTT_NDS.DNO ? (
                  convertToFloat2Fixed(PLAN_SL_PTM_TBTT_NDS.DNO)
                ) : (
                  ""
                )}
              </td>
              <td>
                {loadingPlan ? (
                  <LoadingComponent />
                ) : PLAN_SL_PTM_TBTT_NDS.KON ? (
                  convertToFloat2Fixed(PLAN_SL_PTM_TBTT_NDS.KON)
                ) : (
                  ""
                )}
              </td>
              <td>
                {loadingPlan ? (
                  <LoadingComponent />
                ) : PLAN_SL_PTM_TBTT_NDS.CTY7 ? (
                  convertToFloat2Fixed(PLAN_SL_PTM_TBTT_NDS.CTY7)
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
                  convertToFloat2Fixed(PLAN_SL_TBTS_PTM_THOAI.KHO)
                ) : (
                  ""
                )}
              </td>
              <td>
                {loadingPlan ? (
                  <LoadingComponent />
                ) : PLAN_SL_TBTS_PTM_THOAI.DLA ? (
                  convertToFloat2Fixed(PLAN_SL_TBTS_PTM_THOAI.DLA)
                ) : (
                  ""
                )}
              </td>
              <td>
                {loadingPlan ? (
                  <LoadingComponent />
                ) : PLAN_SL_TBTS_PTM_THOAI.GLA ? (
                  convertToFloat2Fixed(PLAN_SL_TBTS_PTM_THOAI.GLA)
                ) : (
                  ""
                )}
              </td>
              <td>
                {loadingPlan ? (
                  <LoadingComponent />
                ) : PLAN_SL_TBTS_PTM_THOAI.PYE ? (
                  convertToFloat2Fixed(PLAN_SL_TBTS_PTM_THOAI.PYE)
                ) : (
                  ""
                )}
              </td>
              <td>
                {loadingPlan ? (
                  <LoadingComponent />
                ) : PLAN_SL_TBTS_PTM_THOAI.DNO ? (
                  convertToFloat2Fixed(PLAN_SL_TBTS_PTM_THOAI.DNO)
                ) : (
                  ""
                )}
              </td>
              <td>
                {loadingPlan ? (
                  <LoadingComponent />
                ) : PLAN_SL_TBTS_PTM_THOAI.KON ? (
                  convertToFloat2Fixed(PLAN_SL_TBTS_PTM_THOAI.KON)
                ) : (
                  ""
                )}
              </td>
              <td>
                {loadingPlan ? (
                  <LoadingComponent />
                ) : PLAN_SL_TBTS_PTM_THOAI.CTY7 ? (
                  convertToFloat2Fixed(PLAN_SL_TBTS_PTM_THOAI.CTY7)
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
                  convertToFloat2Fixed(PLAN_SL_TB_PTM_M2M.KHO)
                ) : (
                  ""
                )}
              </td>
              <td>
                {loadingPlan ? (
                  <LoadingComponent />
                ) : PLAN_SL_TB_PTM_M2M.DLA ? (
                  convertToFloat2Fixed(PLAN_SL_TB_PTM_M2M.DLA)
                ) : (
                  ""
                )}
              </td>
              <td>
                {loadingPlan ? (
                  <LoadingComponent />
                ) : PLAN_SL_TB_PTM_M2M.GLA ? (
                  convertToFloat2Fixed(PLAN_SL_TB_PTM_M2M.GLA)
                ) : (
                  ""
                )}
              </td>
              <td>
                {loadingPlan ? (
                  <LoadingComponent />
                ) : PLAN_SL_TB_PTM_M2M.PYE ? (
                  convertToFloat2Fixed(PLAN_SL_TB_PTM_M2M.PYE)
                ) : (
                  ""
                )}
              </td>
              <td>
                {loadingPlan ? (
                  <LoadingComponent />
                ) : PLAN_SL_TB_PTM_M2M.DNO ? (
                  convertToFloat2Fixed(PLAN_SL_TB_PTM_M2M.DNO)
                ) : (
                  ""
                )}
              </td>
              <td>
                {loadingPlan ? (
                  <LoadingComponent />
                ) : PLAN_SL_TB_PTM_M2M.KON ? (
                  convertToFloat2Fixed(PLAN_SL_TB_PTM_M2M.KON)
                ) : (
                  ""
                )}
              </td>
              <td>
                {loadingPlan ? (
                  <LoadingComponent />
                ) : PLAN_SL_TB_PTM_M2M.CTY7 ? (
                  convertToFloat2Fixed(PLAN_SL_TB_PTM_M2M.CTY7)
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
                  convertToFloat2Fixed(PLAN_TB_PTM_SAYMEE.KHO)
                ) : (
                  ""
                )}
              </td>
              <td>
                {loadingPlan ? (
                  <LoadingComponent />
                ) : PLAN_TB_PTM_SAYMEE.DLA ? (
                  convertToFloat2Fixed(PLAN_TB_PTM_SAYMEE.DLA)
                ) : (
                  ""
                )}
              </td>
              <td>
                {loadingPlan ? (
                  <LoadingComponent />
                ) : PLAN_TB_PTM_SAYMEE.GLA ? (
                  convertToFloat2Fixed(PLAN_TB_PTM_SAYMEE.GLA)
                ) : (
                  ""
                )}
              </td>
              <td>
                {loadingPlan ? (
                  <LoadingComponent />
                ) : PLAN_TB_PTM_SAYMEE.PYE ? (
                  convertToFloat2Fixed(PLAN_TB_PTM_SAYMEE.PYE)
                ) : (
                  ""
                )}
              </td>
              <td>
                {loadingPlan ? (
                  <LoadingComponent />
                ) : PLAN_TB_PTM_SAYMEE.DNO ? (
                  convertToFloat2Fixed(PLAN_TB_PTM_SAYMEE.DNO)
                ) : (
                  ""
                )}
              </td>
              <td>
                {loadingPlan ? (
                  <LoadingComponent />
                ) : PLAN_TB_PTM_SAYMEE.KON ? (
                  convertToFloat2Fixed(PLAN_TB_PTM_SAYMEE.KON)
                ) : (
                  ""
                )}
              </td>
              <td>
                {loadingPlan ? (
                  <LoadingComponent />
                ) : PLAN_TB_PTM_SAYMEE.CTY7 ? (
                  convertToFloat2Fixed(PLAN_TB_PTM_SAYMEE.CTY7)
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
                  convertToFloat2Fixed(PLAN_TB_PTM_FIBER.KHO)
                ) : (
                  ""
                )}
              </td>
              <td>
                {loadingPlan ? (
                  <LoadingComponent />
                ) : PLAN_TB_PTM_FIBER.DLA ? (
                  convertToFloat2Fixed(PLAN_TB_PTM_FIBER.DLA)
                ) : (
                  ""
                )}
              </td>
              <td>
                {loadingPlan ? (
                  <LoadingComponent />
                ) : PLAN_TB_PTM_FIBER.GLA ? (
                  convertToFloat2Fixed(PLAN_TB_PTM_FIBER.GLA)
                ) : (
                  ""
                )}
              </td>
              <td>
                {loadingPlan ? (
                  <LoadingComponent />
                ) : PLAN_TB_PTM_FIBER.PYE ? (
                  convertToFloat2Fixed(PLAN_TB_PTM_FIBER.PYE)
                ) : (
                  ""
                )}
              </td>
              <td>
                {loadingPlan ? (
                  <LoadingComponent />
                ) : PLAN_TB_PTM_FIBER.DNO ? (
                  convertToFloat2Fixed(PLAN_TB_PTM_FIBER.DNO)
                ) : (
                  ""
                )}
              </td>
              <td>
                {loadingPlan ? (
                  <LoadingComponent />
                ) : PLAN_TB_PTM_FIBER.KON ? (
                  convertToFloat2Fixed(PLAN_TB_PTM_FIBER.KON)
                ) : (
                  ""
                )}
              </td>
              <td>
                {loadingPlan ? (
                  <LoadingComponent />
                ) : PLAN_TB_PTM_FIBER.CTY7 ? (
                  convertToFloat2Fixed(PLAN_TB_PTM_FIBER.CTY7)
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
                  convertToFloat2Fixed(PLAN_TB_VLR.KHO)
                ) : (
                  ""
                )}
              </td>
              <td>
                {loadingPlan ? (
                  <LoadingComponent />
                ) : PLAN_TB_VLR.DLA ? (
                  convertToFloat2Fixed(PLAN_TB_VLR.DLA)
                ) : (
                  ""
                )}
              </td>
              <td>
                {loadingPlan ? (
                  <LoadingComponent />
                ) : PLAN_TB_VLR.GLA ? (
                  convertToFloat2Fixed(PLAN_TB_VLR.GLA)
                ) : (
                  ""
                )}
              </td>
              <td>
                {loadingPlan ? (
                  <LoadingComponent />
                ) : PLAN_TB_VLR.PYE ? (
                  convertToFloat2Fixed(PLAN_TB_VLR.PYE)
                ) : (
                  ""
                )}
              </td>
              <td>
                {loadingPlan ? (
                  <LoadingComponent />
                ) : PLAN_TB_VLR.DNO ? (
                  convertToFloat2Fixed(PLAN_TB_VLR.DNO)
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
                  convertToFloat2Fixed(PLAN_TB_VLR.CTY7)
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
                  convertToFloat2Fixed(PLAN_TB_PSC.KHO)
                ) : (
                  ""
                )}
              </td>
              <td>
                {loadingPlan ? (
                  <LoadingComponent />
                ) : PLAN_TB_PSC.DLA ? (
                  convertToFloat2Fixed(PLAN_TB_PSC.DLA)
                ) : (
                  ""
                )}
              </td>
              <td>
                {loadingPlan ? (
                  <LoadingComponent />
                ) : PLAN_TB_PSC.GLA ? (
                  convertToFloat2Fixed(PLAN_TB_PSC.GLA)
                ) : (
                  ""
                )}
              </td>
              <td>
                {loadingPlan ? (
                  <LoadingComponent />
                ) : PLAN_TB_PSC.PYE ? (
                  convertToFloat2Fixed(PLAN_TB_PSC.PYE)
                ) : (
                  ""
                )}
              </td>
              <td>
                {loadingPlan ? (
                  <LoadingComponent />
                ) : PLAN_TB_PSC.DNO ? (
                  convertToFloat2Fixed(PLAN_TB_PSC.DNO)
                ) : (
                  ""
                )}
              </td>
              <td>
                {loadingPlan ? (
                  <LoadingComponent />
                ) : PLAN_TB_PSC.KON ? (
                  convertToFloat2Fixed(PLAN_TB_PSC.KON)
                ) : (
                  ""
                )}
              </td>
              <td>
                {loadingPlan ? (
                  <LoadingComponent />
                ) : PLAN_TB_PSC.CTY7 ? (
                  convertToFloat2Fixed(PLAN_TB_PSC.CTY7)
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
                  convertToFloat2Fixed(PLAN_TILE_MNP.KHO)
                ) : (
                  ""
                )}
              </td>
              <td>
                {loadingPlan ? (
                  <LoadingComponent />
                ) : PLAN_TILE_MNP.DLA ? (
                  convertToFloat2Fixed(PLAN_TILE_MNP.DLA)
                ) : (
                  ""
                )}
              </td>
              <td>
                {loadingPlan ? (
                  <LoadingComponent />
                ) : PLAN_TILE_MNP.GLA ? (
                  convertToFloat2Fixed(PLAN_TILE_MNP.GLA)
                ) : (
                  ""
                )}
              </td>
              <td>
                {loadingPlan ? (
                  <LoadingComponent />
                ) : PLAN_TILE_MNP.PYE ? (
                  convertToFloat2Fixed(PLAN_TILE_MNP.PYE)
                ) : (
                  ""
                )}
              </td>
              <td>
                {loadingPlan ? (
                  <LoadingComponent />
                ) : PLAN_TILE_MNP.DNO ? (
                  convertToFloat2Fixed(PLAN_TILE_MNP.DNO)
                ) : (
                  ""
                )}
              </td>
              <td>
                {loadingPlan ? (
                  <LoadingComponent />
                ) : PLAN_TILE_MNP.KON ? (
                  convertToFloat2Fixed(PLAN_TILE_MNP.KON)
                ) : (
                  ""
                )}
              </td>
              <td>
                {loadingPlan ? (
                  <LoadingComponent />
                ) : PLAN_TILE_MNP.CTY7 ? (
                  convertToFloat2Fixed(PLAN_TILE_MNP.CTY7)
                ) : (
                  ""
                )}
              </td>
              <td rowSpan={4}>CSKH</td>
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
