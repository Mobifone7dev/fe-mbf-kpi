"use client";
import React, { useState, useEffect } from "react";
import moment from "moment";
import { ErrorMessage, Form, Formik } from "formik";
import "react-datepicker/dist/react-datepicker.css";
import { DatePickerField } from "../components/widgets/datePickers/DatePickerField";
import * as Yup from "yup";
import "bootstrap/dist/css/bootstrap.min.css";
import LoadingComponent from "@components/loading/LoadingComponent";

var x = new Date();
x.setDate(1);
x.setMonth(x.getMonth());
const INIT_VALUES = {
  selectMonth: x,
};

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

  const [loadingPlan, setLoadingPlan] = useState(false);
  useEffect(() => {
    setLoadingPlan(true);
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
                  parseFloat(PLAN_DTHU_TKC_HTS.KHO).toFixed(2)
                ) : (
                  ""
                )}
              </td>
              <td>
                {loadingPlan ? (
                  <LoadingComponent />
                ) : PLAN_DTHU_TKC_HTS.DLA ? (
                  parseFloat(PLAN_DTHU_TKC_HTS.DLA).toFixed(2)
                ) : (
                  ""
                )}
              </td>
              <td>
                {loadingPlan ? (
                  <LoadingComponent />
                ) : PLAN_DTHU_TKC_HTS.GLA ? (
                  parseFloat(PLAN_DTHU_TKC_HTS.GLA).toFixed(2)
                ) : (
                  ""
                )}
              </td>
              <td>
                {loadingPlan ? (
                  <LoadingComponent />
                ) : PLAN_DTHU_TKC_HTS.PYE ? (
                  parseFloat(PLAN_DTHU_TKC_HTS.PYE).toFixed(2)
                ) : (
                  ""
                )}
              </td>
              <td>
                {loadingPlan ? (
                  <LoadingComponent />
                ) : PLAN_DTHU_TKC_HTS.DNO ? (
                  parseFloat(PLAN_DTHU_TKC_HTS.DNO).toFixed(2)
                ) : (
                  ""
                )}
              </td>
              <td>
                {loadingPlan ? (
                  <LoadingComponent />
                ) : PLAN_DTHU_TKC_HTS.KON ? (
                  parseFloat(PLAN_DTHU_TKC_HTS.KON).toFixed(2)
                ) : (
                  ""
                )}
              </td>
              <td>
                {loadingPlan ? (
                  <LoadingComponent />
                ) : PLAN_DTHU_TKC_HTS.CTY7 ? (
                  parseFloat(PLAN_DTHU_TKC_HTS.CTY7).toFixed(2)
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
                  parseFloat(PLAN_DTHU_FIBER.KHO).toFixed(2)
                ) : (
                  ""
                )}
              </td>
              <td>
                {loadingPlan ? (
                  <LoadingComponent />
                ) : PLAN_DTHU_FIBER.DLA ? (
                  parseFloat(PLAN_DTHU_FIBER.DLA).toFixed(2)
                ) : (
                  ""
                )}
              </td>
              <td>
                {loadingPlan ? (
                  <LoadingComponent />
                ) : PLAN_DTHU_FIBER.GLA ? (
                  parseFloat(PLAN_DTHU_FIBER.GLA).toFixed(2)
                ) : (
                  ""
                )}
              </td>
              <td>
                {loadingPlan ? (
                  <LoadingComponent />
                ) : PLAN_DTHU_FIBER.PYE ? (
                  parseFloat(PLAN_DTHU_FIBER.PYE).toFixed(2)
                ) : (
                  ""
                )}
              </td>
              <td>
                {loadingPlan ? (
                  <LoadingComponent />
                ) : PLAN_DTHU_FIBER.DNO ? (
                  parseFloat(PLAN_DTHU_FIBER.DNO).toFixed(2)
                ) : (
                  ""
                )}
              </td>
              <td>
                {loadingPlan ? (
                  <LoadingComponent />
                ) : PLAN_DTHU_FIBER.KON ? (
                  parseFloat(PLAN_DTHU_FIBER.KON).toFixed(2)
                ) : (
                  ""
                )}
              </td>
              <td>
                {loadingPlan ? (
                  <LoadingComponent />
                ) : PLAN_DTHU_FIBER.CTY7 ? (
                  parseFloat(PLAN_DTHU_FIBER.CTY7).toFixed(2)
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
                  parseFloat(PLAN_DTHU_MASS.KHO).toFixed(2)
                ) : (
                  ""
                )}
              </td>
              <td>
                {loadingPlan ? (
                  <LoadingComponent />
                ) : PLAN_DTHU_MASS.DLA ? (
                  parseFloat(PLAN_DTHU_MASS.DLA).toFixed(2)
                ) : (
                  ""
                )}
              </td>
              <td>
                {loadingPlan ? (
                  <LoadingComponent />
                ) : PLAN_DTHU_MASS.GLA ? (
                  parseFloat(PLAN_DTHU_MASS.GLA).toFixed(2)
                ) : (
                  ""
                )}
              </td>
              <td>
                {loadingPlan ? (
                  <LoadingComponent />
                ) : PLAN_DTHU_MASS.PYE ? (
                  parseFloat(PLAN_DTHU_MASS.PYE).toFixed(2)
                ) : (
                  ""
                )}
              </td>
              <td>
                {loadingPlan ? (
                  <LoadingComponent />
                ) : PLAN_DTHU_MASS.DNO ? (
                  parseFloat(PLAN_DTHU_MASS.DNO).toFixed(2)
                ) : (
                  ""
                )}
              </td>
              <td>
                {loadingPlan ? (
                  <LoadingComponent />
                ) : PLAN_DTHU_MASS.KON ? (
                  parseFloat(PLAN_DTHU_MASS.KON).toFixed(2)
                ) : (
                  ""
                )}
              </td>
              <td>
                {loadingPlan ? (
                  <LoadingComponent />
                ) : PLAN_DTHU_MASS.CTY7 ? (
                  parseFloat(PLAN_DTHU_MASS.CTY7).toFixed(2)
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
                  parseFloat(PLAN_DTHU_DUAN.KHO).toFixed(2)
                ) : (
                  ""
                )}
              </td>
              <td>
                {loadingPlan ? (
                  <LoadingComponent />
                ) : PLAN_DTHU_DUAN.DLA ? (
                  parseFloat(PLAN_DTHU_DUAN.DLA).toFixed(2)
                ) : (
                  ""
                )}
              </td>
              <td>
                {loadingPlan ? (
                  <LoadingComponent />
                ) : PLAN_DTHU_DUAN.GLA ? (
                  parseFloat(PLAN_DTHU_DUAN.GLA).toFixed(2)
                ) : (
                  ""
                )}
              </td>
              <td>
                {loadingPlan ? (
                  <LoadingComponent />
                ) : PLAN_DTHU_DUAN.PYE ? (
                  parseFloat(PLAN_DTHU_DUAN.PYE).toFixed(2)
                ) : (
                  ""
                )}
              </td>
              <td>
                {loadingPlan ? (
                  <LoadingComponent />
                ) : PLAN_DTHU_DUAN.DNO ? (
                  parseFloat(PLAN_DTHU_DUAN.DNO).toFixed(2)
                ) : (
                  ""
                )}
              </td>
              <td>
                {loadingPlan ? (
                  <LoadingComponent />
                ) : PLAN_DTHU_DUAN.KON ? (
                  parseFloat(PLAN_DTHU_DUAN.KON).toFixed(2)
                ) : (
                  ""
                )}
              </td>
              <td>
                {loadingPlan ? (
                  <LoadingComponent />
                ) : PLAN_DTHU_DUAN.CTY7 ? (
                  parseFloat(PLAN_DTHU_DUAN.CTY7).toFixed(2)
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
                  parseFloat(PLAN_DTHU_NDS.KHO).toFixed(2)
                ) : (
                  ""
                )}
              </td>
              <td>
                {loadingPlan ? (
                  <LoadingComponent />
                ) : PLAN_DTHU_NDS.DLA ? (
                  parseFloat(PLAN_DTHU_NDS.DLA).toFixed(2)
                ) : (
                  ""
                )}
              </td>
              <td>
                {loadingPlan ? (
                  <LoadingComponent />
                ) : PLAN_DTHU_NDS.GLA ? (
                  parseFloat(PLAN_DTHU_NDS.GLA).toFixed(2)
                ) : (
                  ""
                )}
              </td>
              <td>
                {loadingPlan ? (
                  <LoadingComponent />
                ) : PLAN_DTHU_NDS.PYE ? (
                  parseFloat(PLAN_DTHU_NDS.PYE).toFixed(2)
                ) : (
                  ""
                )}
              </td>
              <td>
                {loadingPlan ? (
                  <LoadingComponent />
                ) : PLAN_DTHU_NDS.DNO ? (
                  parseFloat(PLAN_DTHU_NDS.DNO).toFixed(2)
                ) : (
                  ""
                )}
              </td>
              <td>
                {loadingPlan ? (
                  <LoadingComponent />
                ) : PLAN_DTHU_NDS.KON ? (
                  parseFloat(PLAN_DTHU_NDS.KON).toFixed(2)
                ) : (
                  ""
                )}
              </td>
              <td>
                {loadingPlan ? (
                  <LoadingComponent />
                ) : PLAN_DTHU_NDS.CTY7 ? (
                  parseFloat(PLAN_DTHU_NDS.CTY7).toFixed(2)
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
                  parseFloat(PLAN_DTHU_SAYMEE.KHO).toFixed(2)
                ) : (
                  ""
                )}
              </td>
              <td>
                {loadingPlan ? (
                  <LoadingComponent />
                ) : PLAN_DTHU_SAYMEE.DLA ? (
                  parseFloat(PLAN_DTHU_SAYMEE.DLA).toFixed(2)
                ) : (
                  ""
                )}
              </td>
              <td>
                {loadingPlan ? (
                  <LoadingComponent />
                ) : PLAN_DTHU_SAYMEE.GLA ? (
                  parseFloat(PLAN_DTHU_SAYMEE.GLA).toFixed(2)
                ) : (
                  ""
                )}
              </td>
              <td>
                {loadingPlan ? (
                  <LoadingComponent />
                ) : PLAN_DTHU_SAYMEE.PYE ? (
                  parseFloat(PLAN_DTHU_SAYMEE.PYE).toFixed(2)
                ) : (
                  ""
                )}
              </td>
              <td>
                {loadingPlan ? (
                  <LoadingComponent />
                ) : PLAN_DTHU_SAYMEE.DNO ? (
                  parseFloat(PLAN_DTHU_SAYMEE.DNO).toFixed(2)
                ) : (
                  ""
                )}
              </td>
              <td>
                {loadingPlan ? (
                  <LoadingComponent />
                ) : PLAN_DTHU_SAYMEE.KON ? (
                  parseFloat(PLAN_DTHU_SAYMEE.KON).toFixed(2)
                ) : (
                  ""
                )}
              </td>
              <td>
                {loadingPlan ? (
                  <LoadingComponent />
                ) : PLAN_DTHU_SAYMEE.CTY7 ? (
                  parseFloat(PLAN_DTHU_SAYMEE.CTY7).toFixed(2)
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
                  parseFloat(PLAN_DTHU_GPS.KHO).toFixed(2)
                ) : (
                  ""
                )}
              </td>
              <td>
                {loadingPlan ? (
                  <LoadingComponent />
                ) : PLAN_DTHU_GPS.DLA ? (
                  parseFloat(PLAN_DTHU_GPS.DLA).toFixed(2)
                ) : (
                  ""
                )}
              </td>
              <td>
                {loadingPlan ? (
                  <LoadingComponent />
                ) : PLAN_DTHU_GPS.GLA ? (
                  parseFloat(PLAN_DTHU_GPS.GLA).toFixed(2)
                ) : (
                  ""
                )}
              </td>
              <td>
                {loadingPlan ? (
                  <LoadingComponent />
                ) : PLAN_DTHU_GPS.PYE ? (
                  parseFloat(PLAN_DTHU_GPS.PYE).toFixed(2)
                ) : (
                  ""
                )}
              </td>
              <td>
                {loadingPlan ? (
                  <LoadingComponent />
                ) : PLAN_DTHU_GPS.DNO ? (
                  parseFloat(PLAN_DTHU_GPS.DNO).toFixed(2)
                ) : (
                  ""
                )}
              </td>
              <td>
                {loadingPlan ? (
                  <LoadingComponent />
                ) : PLAN_DTHU_GPS.KON ? (
                  parseFloat(PLAN_DTHU_GPS.KON).toFixed(2)
                ) : (
                  ""
                )}
              </td>
              <td>
                {loadingPlan ? (
                  <LoadingComponent />
                ) : PLAN_DTHU_GPS.CTY7 ? (
                  parseFloat(PLAN_DTHU_GPS.CTY7).toFixed(2)
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
                  parseFloat(PLAN_SL_C2C.KHO).toFixed(2)
                ) : (
                  ""
                )}
              </td>
              <td>
                {loadingPlan ? (
                  <LoadingComponent />
                ) : PLAN_SL_C2C.DLA ? (
                  parseFloat(PLAN_SL_C2C.DLA).toFixed(2)
                ) : (
                  ""
                )}
              </td>
              <td>
                {loadingPlan ? (
                  <LoadingComponent />
                ) : PLAN_SL_C2C.GLA ? (
                  parseFloat(PLAN_SL_C2C.GLA).toFixed(2)
                ) : (
                  ""
                )}
              </td>
              <td>
                {loadingPlan ? (
                  <LoadingComponent />
                ) : PLAN_SL_C2C.PYE ? (
                  parseFloat(PLAN_SL_C2C.PYE).toFixed(2)
                ) : (
                  ""
                )}
              </td>
              <td>
                {loadingPlan ? (
                  <LoadingComponent />
                ) : PLAN_SL_C2C.DNO ? (
                  parseFloat(PLAN_SL_C2C.DNO).toFixed(2)
                ) : (
                  ""
                )}
              </td>
              <td>
                {loadingPlan ? (
                  <LoadingComponent />
                ) : PLAN_SL_C2C.KON ? (
                  parseFloat(PLAN_SL_C2C.KON).toFixed(2)
                ) : (
                  ""
                )}
              </td>
              <td>
                {loadingPlan ? (
                  <LoadingComponent />
                ) : PLAN_SL_C2C.CTY7 ? (
                  parseFloat(PLAN_SL_C2C.CTY7).toFixed(2)
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
                  parseInt(PLAN_SL_TB_C2C.KHO).toFixed(2)
                ) : (
                  ""
                )}
              </td>
              <td>
                {loadingPlan ? (
                  <LoadingComponent />
                ) : PLAN_SL_TB_C2C.DLA ? (
                  parseInt(PLAN_SL_TB_C2C.DLA).toFixed(2)
                ) : (
                  ""
                )}
              </td>
              <td>
                {loadingPlan ? (
                  <LoadingComponent />
                ) : PLAN_SL_TB_C2C.GLA ? (
                  parseInt(PLAN_SL_TB_C2C.GLA).toFixed(2)
                ) : (
                  ""
                )}
              </td>
              <td>
                {loadingPlan ? (
                  <LoadingComponent />
                ) : PLAN_SL_TB_C2C.PYE ? (
                  parseInt(PLAN_SL_TB_C2C.PYE).toFixed(2)
                ) : (
                  ""
                )}
              </td>
              <td>
                {loadingPlan ? (
                  <LoadingComponent />
                ) : PLAN_SL_TB_C2C.DNO ? (
                  parseInt(PLAN_SL_TB_C2C.DNO).toFixed(2)
                ) : (
                  ""
                )}
              </td>
              <td>
                {loadingPlan ? (
                  <LoadingComponent />
                ) : PLAN_SL_TB_C2C.KON ? (
                  parseInt(PLAN_SL_TB_C2C.KON).toFixed(2)
                ) : (
                  ""
                )}
              </td>
              <td>
                {loadingPlan ? (
                  <LoadingComponent />
                ) : PLAN_SL_TB_C2C.CTY7 ? (
                  parseInt(PLAN_SL_TB_C2C.CTY7).toFixed(2)
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
                  parseFloat(PLAN_TYLE_GD_C2C.KHO).toFixed(2)
                ) : (
                  ""
                )}
              </td>
              <td>
                {loadingPlan ? (
                  <LoadingComponent />
                ) : PLAN_TYLE_GD_C2C.DLA ? (
                  parseFloat(PLAN_TYLE_GD_C2C.DLA).toFixed(2)
                ) : (
                  ""
                )}
              </td>
              <td>
                {loadingPlan ? (
                  <LoadingComponent />
                ) : PLAN_TYLE_GD_C2C.GLA ? (
                  parseFloat(PLAN_TYLE_GD_C2C.GLA).toFixed(2)
                ) : (
                  ""
                )}
              </td>
              <td>
                {loadingPlan ? (
                  <LoadingComponent />
                ) : PLAN_TYLE_GD_C2C.PYE ? (
                  parseFloat(PLAN_TYLE_GD_C2C.PYE).toFixed(2)
                ) : (
                  ""
                )}
              </td>
              <td>
                {loadingPlan ? (
                  <LoadingComponent />
                ) : PLAN_TYLE_GD_C2C.DNO ? (
                  parseFloat(PLAN_TYLE_GD_C2C.DNO).toFixed(2)
                ) : (
                  ""
                )}
              </td>
              <td>
                {loadingPlan ? (
                  <LoadingComponent />
                ) : PLAN_TYLE_GD_C2C.KON ? (
                  parseFloat(PLAN_TYLE_GD_C2C.KON).toFixed(2)
                ) : (
                  ""
                )}
              </td>
              <td>
                {loadingPlan ? (
                  <LoadingComponent />
                ) : PLAN_TYLE_GD_C2C.CTY7 ? (
                  parseFloat(PLAN_TYLE_GD_C2C.CTY7).toFixed(2)
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
                  parseFloat(PLAN_SL_PTM_TBTT_HTS.KHO).toFixed(2)
                ) : (
                  ""
                )}
              </td>
              <td>
                {loadingPlan ? (
                  <LoadingComponent />
                ) : PLAN_SL_PTM_TBTT_HTS.DLA ? (
                  parseFloat(PLAN_SL_PTM_TBTT_HTS.DLA).toFixed(2)
                ) : (
                  ""
                )}
              </td>
              <td>
                {loadingPlan ? (
                  <LoadingComponent />
                ) : PLAN_SL_PTM_TBTT_HTS.GLA ? (
                  parseFloat(PLAN_SL_PTM_TBTT_HTS.GLA).toFixed(2)
                ) : (
                  ""
                )}
              </td>
              <td>
                {loadingPlan ? (
                  <LoadingComponent />
                ) : PLAN_SL_PTM_TBTT_HTS.PYE ? (
                  parseFloat(PLAN_SL_PTM_TBTT_HTS.PYE).toFixed(2)
                ) : (
                  ""
                )}
              </td>
              <td>
                {loadingPlan ? (
                  <LoadingComponent />
                ) : PLAN_SL_PTM_TBTT_HTS.DNO ? (
                  parseFloat(PLAN_SL_PTM_TBTT_HTS.DNO).toFixed(2)
                ) : (
                  ""
                )}
              </td>
              <td>
                {loadingPlan ? (
                  <LoadingComponent />
                ) : PLAN_SL_PTM_TBTT_HTS.KON ? (
                  parseFloat(PLAN_SL_PTM_TBTT_HTS.KON).toFixed(2)
                ) : (
                  ""
                )}
              </td>
              <td>
                {loadingPlan ? (
                  <LoadingComponent />
                ) : PLAN_SL_PTM_TBTT_HTS.CTY7 ? (
                  parseFloat(PLAN_SL_PTM_TBTT_HTS.CTY7).toFixed(2)
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
                  parseFloat(PLAN_SL_PTM_TBTT_NDS.KHO).toFixed(2)
                ) : (
                  ""
                )}
              </td>
              <td>
                {loadingPlan ? (
                  <LoadingComponent />
                ) : PLAN_SL_PTM_TBTT_NDS.DLA ? (
                  parseFloat(PLAN_SL_PTM_TBTT_NDS.DLA).toFixed(2)
                ) : (
                  ""
                )}
              </td>
              <td>
                {loadingPlan ? (
                  <LoadingComponent />
                ) : PLAN_SL_PTM_TBTT_NDS.GLA ? (
                  parseFloat(PLAN_SL_PTM_TBTT_NDS.GLA).toFixed(2)
                ) : (
                  ""
                )}
              </td>
              <td>
                {loadingPlan ? (
                  <LoadingComponent />
                ) : PLAN_SL_PTM_TBTT_NDS.PYE ? (
                  parseFloat(PLAN_SL_PTM_TBTT_NDS.PYE).toFixed(2)
                ) : (
                  ""
                )}
              </td>
              <td>
                {loadingPlan ? (
                  <LoadingComponent />
                ) : PLAN_SL_PTM_TBTT_NDS.DNO ? (
                  parseFloat(PLAN_SL_PTM_TBTT_NDS.DNO).toFixed(2)
                ) : (
                  ""
                )}
              </td>
              <td>
                {loadingPlan ? (
                  <LoadingComponent />
                ) : PLAN_SL_PTM_TBTT_NDS.KON ? (
                  parseFloat(PLAN_SL_PTM_TBTT_NDS.KON).toFixed(2)
                ) : (
                  ""
                )}
              </td>
              <td>
                {loadingPlan ? (
                  <LoadingComponent />
                ) : PLAN_SL_PTM_TBTT_NDS.CTY7 ? (
                  parseFloat(PLAN_SL_PTM_TBTT_NDS.CTY7).toFixed(2)
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
                  parseFloat(PLAN_SL_TBTS_PTM_THOAI.KHO).toFixed(2)
                ) : (
                  ""
                )}
              </td>
              <td>
                {loadingPlan ? (
                  <LoadingComponent />
                ) : PLAN_SL_TBTS_PTM_THOAI.DLA ? (
                  parseFloat(PLAN_SL_TBTS_PTM_THOAI.DLA).toFixed(2)
                ) : (
                  ""
                )}
              </td>
              <td>
                {loadingPlan ? (
                  <LoadingComponent />
                ) : PLAN_SL_TBTS_PTM_THOAI.GLA ? (
                  parseFloat(PLAN_SL_TBTS_PTM_THOAI.GLA).toFixed(2)
                ) : (
                  ""
                )}
              </td>
              <td>
                {loadingPlan ? (
                  <LoadingComponent />
                ) : PLAN_SL_TBTS_PTM_THOAI.PYE ? (
                  parseFloat(PLAN_SL_TBTS_PTM_THOAI.PYE).toFixed(2)
                ) : (
                  ""
                )}
              </td>
              <td>
                {loadingPlan ? (
                  <LoadingComponent />
                ) : PLAN_SL_TBTS_PTM_THOAI.DNO ? (
                  parseFloat(PLAN_SL_TBTS_PTM_THOAI.DNO).toFixed(2)
                ) : (
                  ""
                )}
              </td>
              <td>
                {loadingPlan ? (
                  <LoadingComponent />
                ) : PLAN_SL_TBTS_PTM_THOAI.KON ? (
                  parseFloat(PLAN_SL_TBTS_PTM_THOAI.KON).toFixed(2)
                ) : (
                  ""
                )}
              </td>
              <td>
                {loadingPlan ? (
                  <LoadingComponent />
                ) : PLAN_SL_TBTS_PTM_THOAI.CTY7 ? (
                  parseFloat(PLAN_SL_TBTS_PTM_THOAI.CTY7).toFixed(2)
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
                  parseFloat(PLAN_SL_TB_PTM_M2M.KHO).toFixed(2)
                ) : (
                  ""
                )}
              </td>
              <td>
                {loadingPlan ? (
                  <LoadingComponent />
                ) : PLAN_SL_TB_PTM_M2M.DLA ? (
                  parseFloat(PLAN_SL_TB_PTM_M2M.DLA).toFixed(2)
                ) : (
                  ""
                )}
              </td>
              <td>
                {loadingPlan ? (
                  <LoadingComponent />
                ) : PLAN_SL_TB_PTM_M2M.GLA ? (
                  parseFloat(PLAN_SL_TB_PTM_M2M.GLA).toFixed(2)
                ) : (
                  ""
                )}
              </td>
              <td>
                {loadingPlan ? (
                  <LoadingComponent />
                ) : PLAN_SL_TB_PTM_M2M.PYE ? (
                  parseFloat(PLAN_SL_TB_PTM_M2M.PYE).toFixed(2)
                ) : (
                  ""
                )}
              </td>
              <td>
                {loadingPlan ? (
                  <LoadingComponent />
                ) : PLAN_SL_TB_PTM_M2M.DNO ? (
                  parseFloat(PLAN_SL_TB_PTM_M2M.DNO).toFixed(2)
                ) : (
                  ""
                )}
              </td>
              <td>
                {loadingPlan ? (
                  <LoadingComponent />
                ) : PLAN_SL_TB_PTM_M2M.KON ? (
                  parseFloat(PLAN_SL_TB_PTM_M2M.KON).toFixed(2)
                ) : (
                  ""
                )}
              </td>
              <td>
                {loadingPlan ? (
                  <LoadingComponent />
                ) : PLAN_SL_TB_PTM_M2M.CTY7 ? (
                  parseFloat(PLAN_SL_TB_PTM_M2M.CTY7).toFixed(2)
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
                  parseFloat(PLAN_TB_PTM_SAYMEE.KHO).toFixed(2)
                ) : (
                  ""
                )}
              </td>
              <td>
                {loadingPlan ? (
                  <LoadingComponent />
                ) : PLAN_TB_PTM_SAYMEE.DLA ? (
                  parseFloat(PLAN_TB_PTM_SAYMEE.DLA).toFixed(2)
                ) : (
                  ""
                )}
              </td>
              <td>
                {loadingPlan ? (
                  <LoadingComponent />
                ) : PLAN_TB_PTM_SAYMEE.GLA ? (
                  parseFloat(PLAN_TB_PTM_SAYMEE.GLA).toFixed(2)
                ) : (
                  ""
                )}
              </td>
              <td>
                {loadingPlan ? (
                  <LoadingComponent />
                ) : PLAN_TB_PTM_SAYMEE.PYE ? (
                  parseFloat(PLAN_TB_PTM_SAYMEE.PYE).toFixed(2)
                ) : (
                  ""
                )}
              </td>
              <td>
                {loadingPlan ? (
                  <LoadingComponent />
                ) : PLAN_TB_PTM_SAYMEE.DNO ? (
                  parseFloat(PLAN_TB_PTM_SAYMEE.DNO).toFixed(2)
                ) : (
                  ""
                )}
              </td>
              <td>
                {loadingPlan ? (
                  <LoadingComponent />
                ) : PLAN_TB_PTM_SAYMEE.KON ? (
                  parseFloat(PLAN_TB_PTM_SAYMEE.KON).toFixed(2)
                ) : (
                  ""
                )}
              </td>
              <td>
                {loadingPlan ? (
                  <LoadingComponent />
                ) : PLAN_TB_PTM_SAYMEE.CTY7 ? (
                  parseFloat(PLAN_TB_PTM_SAYMEE.CTY7).toFixed(2)
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
                  parseFloat(PLAN_TB_PTM_FIBER.KHO).toFixed(2)
                ) : (
                  ""
                )}
              </td>
              <td>
                {loadingPlan ? (
                  <LoadingComponent />
                ) : PLAN_TB_PTM_FIBER.DLA ? (
                  parseFloat(PLAN_TB_PTM_FIBER.DLA).toFixed(2)
                ) : (
                  ""
                )}
              </td>
              <td>
                {loadingPlan ? (
                  <LoadingComponent />
                ) : PLAN_TB_PTM_FIBER.GLA ? (
                  parseFloat(PLAN_TB_PTM_FIBER.GLA).toFixed(2)
                ) : (
                  ""
                )}
              </td>
              <td>
                {loadingPlan ? (
                  <LoadingComponent />
                ) : PLAN_TB_PTM_FIBER.PYE ? (
                  parseFloat(PLAN_TB_PTM_FIBER.PYE).toFixed(2)
                ) : (
                  ""
                )}
              </td>
              <td>
                {loadingPlan ? (
                  <LoadingComponent />
                ) : PLAN_TB_PTM_FIBER.DNO ? (
                  parseFloat(PLAN_TB_PTM_FIBER.DNO).toFixed(2)
                ) : (
                  ""
                )}
              </td>
              <td>
                {loadingPlan ? (
                  <LoadingComponent />
                ) : PLAN_TB_PTM_FIBER.KON ? (
                  parseFloat(PLAN_TB_PTM_FIBER.KON).toFixed(2)
                ) : (
                  ""
                )}
              </td>
              <td>
                {loadingPlan ? (
                  <LoadingComponent />
                ) : PLAN_TB_PTM_FIBER.CTY7 ? (
                  parseFloat(PLAN_TB_PTM_FIBER.CTY7).toFixed(2)
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
                  parseFloat(PLAN_TB_VLR.KHO).toFixed(2)
                ) : (
                  ""
                )}
              </td>
              <td>
                {loadingPlan ? (
                  <LoadingComponent />
                ) : PLAN_TB_VLR.DLA ? (
                  parseFloat(PLAN_TB_VLR.DLA).toFixed(2)
                ) : (
                  ""
                )}
              </td>
              <td>
                {loadingPlan ? (
                  <LoadingComponent />
                ) : PLAN_TB_VLR.GLA ? (
                  parseFloat(PLAN_TB_VLR.GLA).toFixed(2)
                ) : (
                  ""
                )}
              </td>
              <td>
                {loadingPlan ? (
                  <LoadingComponent />
                ) : PLAN_TB_VLR.PYE ? (
                  parseFloat(PLAN_TB_VLR.PYE).toFixed(2)
                ) : (
                  ""
                )}
              </td>
              <td>
                {loadingPlan ? (
                  <LoadingComponent />
                ) : PLAN_TB_VLR.DNO ? (
                  parseFloat(PLAN_TB_VLR.DNO).toFixed(2)
                ) : (
                  ""
                )}
              </td>
              <td>
                {loadingPlan ? (
                  <LoadingComponent />
                ) : PLAN_TB_VLR.KON ? (
                  parseFloat(PLAN_TB_VLR.KON).toFixed(2)
                ) : (
                  ""
                )}
              </td>
              <td>
                {loadingPlan ? (
                  <LoadingComponent />
                ) : PLAN_TB_VLR.CTY7 ? (
                  parseFloat(PLAN_TB_VLR.CTY7).toFixed(2)
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
                  parseFloat(PLAN_TB_PSC.KHO).toFixed(2)
                ) : (
                  ""
                )}
              </td>
              <td>
                {loadingPlan ? (
                  <LoadingComponent />
                ) : PLAN_TB_PSC.DLA ? (
                  parseFloat(PLAN_TB_PSC.DLA).toFixed(2)
                ) : (
                  ""
                )}
              </td>
              <td>
                {loadingPlan ? (
                  <LoadingComponent />
                ) : PLAN_TB_PSC.GLA ? (
                  parseFloat(PLAN_TB_PSC.GLA).toFixed(2)
                ) : (
                  ""
                )}
              </td>
              <td>
                {loadingPlan ? (
                  <LoadingComponent />
                ) : PLAN_TB_PSC.PYE ? (
                  parseFloat(PLAN_TB_PSC.PYE).toFixed(2)
                ) : (
                  ""
                )}
              </td>
              <td>
                {loadingPlan ? (
                  <LoadingComponent />
                ) : PLAN_TB_PSC.DNO ? (
                  parseFloat(PLAN_TB_PSC.DNO).toFixed(2)
                ) : (
                  ""
                )}
              </td>
              <td>
                {loadingPlan ? (
                  <LoadingComponent />
                ) : PLAN_TB_PSC.KON ? (
                  parseFloat(PLAN_TB_PSC.KON).toFixed(2)
                ) : (
                  ""
                )}
              </td>
              <td>
                {loadingPlan ? (
                  <LoadingComponent />
                ) : PLAN_TB_PSC.CTY7 ? (
                  parseFloat(PLAN_TB_PSC.CTY7).toFixed(2)
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
                  parseFloat(PLAN_TB_PLAT_TT.KHO).toFixed(2)
                ) : (
                  ""
                )}
              </td>

              <td>
                {loadingPlan ? (
                  <LoadingComponent />
                ) : PLAN_TB_PLAT_TT.DLA ? (
                  parseFloat(PLAN_TB_PLAT_TT.DLA).toFixed(2)
                ) : (
                  ""
                )}
              </td>
              <td>
                {loadingPlan ? (
                  <LoadingComponent />
                ) : PLAN_TB_PLAT_TT.GLA ? (
                  parseFloat(PLAN_TB_PLAT_TT.GLA).toFixed(2)
                ) : (
                  ""
                )}
              </td>
              <td>
                {loadingPlan ? (
                  <LoadingComponent />
                ) : PLAN_TB_PLAT_TT.PYE ? (
                  parseFloat(PLAN_TB_PLAT_TT.PYE).toFixed(2)
                ) : (
                  ""
                )}
              </td>
              <td>
                {loadingPlan ? (
                  <LoadingComponent />
                ) : PLAN_TB_PLAT_TT.DNO ? (
                  parseFloat(PLAN_TB_PLAT_TT.DNO).toFixed(2)
                ) : (
                  ""
                )}
              </td>
              <td>
                {loadingPlan ? (
                  <LoadingComponent />
                ) : PLAN_TB_PLAT_TT.KON ? (
                  parseFloat(PLAN_TB_PLAT_TT.KON).toFixed(2)
                ) : (
                  ""
                )}
              </td>
              <td>
                {loadingPlan ? (
                  <LoadingComponent />
                ) : PLAN_TB_PLAT_TT.CTY7 ? (
                  parseFloat(PLAN_TB_PLAT_TT.CTY7).toFixed(2)
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
                  parseFloat(PLAN_TILE_N_1_GOI.KHO).toFixed(2)
                ) : (
                  ""
                )}
              </td>
              <td>
                {loadingPlan ? (
                  <LoadingComponent />
                ) : PLAN_TILE_N_1_GOI.DLA ? (
                  parseFloat(PLAN_TILE_N_1_GOI.DLA).toFixed(2)
                ) : (
                  ""
                )}
              </td>
              <td>
                {loadingPlan ? (
                  <LoadingComponent />
                ) : PLAN_TILE_N_1_GOI.GLA ? (
                  parseFloat(PLAN_TILE_N_1_GOI.GLA).toFixed(2)
                ) : (
                  ""
                )}
              </td>
              <td>
                {loadingPlan ? (
                  <LoadingComponent />
                ) : PLAN_TILE_N_1_GOI.PYE ? (
                  parseFloat(PLAN_TILE_N_1_GOI.PYE).toFixed(2)
                ) : (
                  ""
                )}
              </td>
              <td>
                {loadingPlan ? (
                  <LoadingComponent />
                ) : PLAN_TILE_N_1_GOI.DNO ? (
                  parseFloat(PLAN_TILE_N_1_GOI.DNO).toFixed(2)
                ) : (
                  ""
                )}
              </td>
              <td>
                {loadingPlan ? (
                  <LoadingComponent />
                ) : PLAN_TILE_N_1_GOI.KON ? (
                  parseFloat(PLAN_TILE_N_1_GOI.KON).toFixed(2)
                ) : (
                  ""
                )}
              </td>
              <td>
                {loadingPlan ? (
                  <LoadingComponent />
                ) : PLAN_TILE_N_1_GOI.CTY7 ? (
                  parseFloat(PLAN_TILE_N_1_GOI.CTY7).toFixed(2)
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
                  parseFloat(PLAN_TILE_N_1_DONKY.KHO).toFixed(2)
                ) : (
                  ""
                )}
              </td>
              <td>
                {loadingPlan ? (
                  <LoadingComponent />
                ) : PLAN_TILE_N_1_DONKY.DLA ? (
                  parseFloat(PLAN_TILE_N_1_DONKY.DLA).toFixed(2)
                ) : (
                  ""
                )}
              </td>
              <td>
                {loadingPlan ? (
                  <LoadingComponent />
                ) : PLAN_TILE_N_1_DONKY.GLA ? (
                  parseFloat(PLAN_TILE_N_1_DONKY.GLA).toFixed(2)
                ) : (
                  ""
                )}
              </td>
              <td>
                {loadingPlan ? (
                  <LoadingComponent />
                ) : PLAN_TILE_N_1_DONKY.PYE ? (
                  parseFloat(PLAN_TILE_N_1_DONKY.PYE).toFixed(2)
                ) : (
                  ""
                )}
              </td>
              <td>
                {loadingPlan ? (
                  <LoadingComponent />
                ) : PLAN_TILE_N_1_DONKY.DNO ? (
                  parseFloat(PLAN_TILE_N_1_DONKY.DNO).toFixed(2)
                ) : (
                  ""
                )}
              </td>
              <td>
                {loadingPlan ? (
                  <LoadingComponent />
                ) : PLAN_TILE_N_1_DONKY.KON ? (
                  parseFloat(PLAN_TILE_N_1_DONKY.KON).toFixed(2)
                ) : (
                  ""
                )}
              </td>
              <td>
                {loadingPlan ? (
                  <LoadingComponent />
                ) : PLAN_TILE_N_1_DONKY.CTY7 ? (
                  parseFloat(PLAN_TILE_N_1_DONKY.CTY7).toFixed(2)
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
                  parseFloat(PLAN_TILE_N_1_DAIKY.KHO).toFixed(2)
                ) : (
                  ""
                )}
              </td>
              <td>
                {loadingPlan ? (
                  <LoadingComponent />
                ) : PLAN_TILE_N_1_DAIKY.DLA ? (
                  parseFloat(PLAN_TILE_N_1_DAIKY.DLA).toFixed(2)
                ) : (
                  ""
                )}
              </td>
              <td>
                {loadingPlan ? (
                  <LoadingComponent />
                ) : PLAN_TILE_N_1_DAIKY.GLA ? (
                  parseFloat(PLAN_TILE_N_1_DAIKY.GLA).toFixed(2)
                ) : (
                  ""
                )}
              </td>
              <td>
                {loadingPlan ? (
                  <LoadingComponent />
                ) : PLAN_TILE_N_1_DAIKY.PYE ? (
                  parseFloat(PLAN_TILE_N_1_DAIKY.PYE).toFixed(2)
                ) : (
                  ""
                )}
              </td>
              <td>
                {loadingPlan ? (
                  <LoadingComponent />
                ) : PLAN_TILE_N_1_DAIKY.DNO ? (
                  parseFloat(PLAN_TILE_N_1_DAIKY.DNO).toFixed(2)
                ) : (
                  ""
                )}
              </td>
              <td>
                {loadingPlan ? (
                  <LoadingComponent />
                ) : PLAN_TILE_N_1_DAIKY.KON ? (
                  parseFloat(PLAN_TILE_N_1_DAIKY.KON).toFixed(2)
                ) : (
                  ""
                )}
              </td>
              <td>
                {loadingPlan ? (
                  <LoadingComponent />
                ) : PLAN_TILE_N_1_DAIKY.CTY7 ? (
                  parseFloat(PLAN_TILE_N_1_DAIKY.CTY7).toFixed(2)
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
                  parseFloat(PLAN_TILE_MNP.KHO).toFixed(2)
                ) : (
                  ""
                )}
              </td>
              <td>
                {loadingPlan ? (
                  <LoadingComponent />
                ) : PLAN_TILE_MNP.DLA ? (
                  parseFloat(PLAN_TILE_MNP.DLA).toFixed(2)
                ) : (
                  ""
                )}
              </td>
              <td>
                {loadingPlan ? (
                  <LoadingComponent />
                ) : PLAN_TILE_MNP.GLA ? (
                  parseFloat(PLAN_TILE_MNP.GLA).toFixed(2)
                ) : (
                  ""
                )}
              </td>
              <td>
                {loadingPlan ? (
                  <LoadingComponent />
                ) : PLAN_TILE_MNP.PYE ? (
                  parseFloat(PLAN_TILE_MNP.PYE).toFixed(2)
                ) : (
                  ""
                )}
              </td>
              <td>
                {loadingPlan ? (
                  <LoadingComponent />
                ) : PLAN_TILE_MNP.DNO ? (
                  parseFloat(PLAN_TILE_MNP.DNO).toFixed(2)
                ) : (
                  ""
                )}
              </td>
              <td>
                {loadingPlan ? (
                  <LoadingComponent />
                ) : PLAN_TILE_MNP.KON ? (
                  parseFloat(PLAN_TILE_MNP.KON).toFixed(2)
                ) : (
                  ""
                )}
              </td>
              <td>
                {loadingPlan ? (
                  <LoadingComponent />
                ) : PLAN_TILE_MNP.CTY7 ? (
                  parseFloat(PLAN_TILE_MNP.CTY7).toFixed(2)
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
