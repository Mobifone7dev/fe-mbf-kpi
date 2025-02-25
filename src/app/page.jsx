"use client";
import React, { useState, useEffect } from "react";
import moment from "moment";
import { ErrorMessage, Form, Formik } from "formik";
import "react-datepicker/dist/react-datepicker.css";
import { DatePickerField } from "../components/widgets/datePickers/DatePickerField";
import * as Yup from "yup";
import "bootstrap/dist/css/bootstrap.min.css";

var x = new Date();
x.setDate(1);
x.setMonth(x.getMonth());
const INIT_VALUES = {
  selectMonth: x,
};

const Page = () => {
  const [initValues, setInitValues] = useState(INIT_VALUES);
  const formSchema = Yup.object().shape({});

  return (
    <div className="dashboard-kpi">
      <h1>DashBoard KPI</h1>
      <div className="d-flex select-filter">
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
              <th className="bg-green-secondary">TTKDCNS</th>
              <th className="bg-green-secondary">Tổng</th>
              <th className="bg-green-secondary">Đ/v phụ trách</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="text-sub1">I</td>
              <td className="text-sub1" colSpan={13}>
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
              <td>Kế hoạch tháng</td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td rowSpan={4}>DVVT</td>
            </tr>
            <tr>
              <td>Thực hiện lũy kế</td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
            </tr>
            <tr>
              <td>%HTKH lũy kế </td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
            </tr>
            <tr>
              <td>Ước %HTKH tháng</td>
              <td></td>
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
              <td>Kế hoạch tháng</td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td rowSpan={4}>DVVT</td>
            </tr>
            <tr>
              <td>Thực hiện lũy kế</td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
            </tr>
            <tr>
              <td>%HTKH lũy kế </td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
            </tr>
            <tr>
              <td>Ước %HTKH tháng</td>
              <td></td>
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
              <td colSpan={13} className="text-sub2">
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
              <td>Kế hoạch tháng</td>
              <td></td>
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
              <td>Thực hiện lũy kế</td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
            </tr>
            <tr>
              <td>%HTKH lũy kế </td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
            </tr>
            <tr>
              <td>Ước %HTKH tháng</td>
              <td></td>
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
              <td>Kế hoạch tháng</td>
              <td></td>
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
              <td>Thực hiện lũy kế</td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
            </tr>
            <tr>
              <td>%HTKH lũy kế </td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
            </tr>
            <tr>
              <td>Ước %HTKH tháng</td>
              <td></td>
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
              <td>Kế hoạch tháng</td>
              <td></td>
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
              <td>Thực hiện lũy kế</td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
            </tr>
            <tr>
              <td>%HTKH lũy kế </td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
            </tr>
            <tr>
              <td>Ước %HTKH tháng</td>
              <td></td>
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
              <td>Kế hoạch tháng</td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td rowSpan={4}>DVVT</td>
            </tr>
            <tr>
              <td>Thực hiện lũy kế</td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
            </tr>
            <tr>
              <td>%HTKH lũy kế </td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
            </tr>
            <tr>
              <td>Ước %HTKH tháng</td>
              <td></td>
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
              <td>Kế hoạch tháng</td>
              <td></td>
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
              <td>Thực hiện lũy kế</td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
            </tr>
            <tr>
              <td>%HTKH lũy kế </td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
            </tr>
            <tr>
              <td>Ước %HTKH tháng</td>
              <td></td>
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
              <td colSpan={13} className="text-sub2">
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
              <td>Kế hoạch tháng</td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td rowSpan={4}>DVVT</td>
            </tr>
            <tr>
              <td>Thực hiện lũy kế</td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
            </tr>
            <tr>
              <td>%HTKH lũy kế </td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
            </tr>
            <tr>
              <td>Ước %HTKH tháng</td>
              <td></td>
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
              <td>Kế hoạch tháng</td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td rowSpan={4}>DVVT</td>
            </tr>
            <tr>
              <td>Thực hiện lũy kế</td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
            </tr>
            <tr>
              <td>%HTKH lũy kế </td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
            </tr>
            <tr>
              <td>Ước %HTKH tháng</td>
              <td></td>
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
              <td>Kế hoạch tháng</td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td rowSpan={4}>DVVT</td>
            </tr>
            <tr>
              <td>Thực hiện lũy kế</td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
            </tr>
            <tr>
              <td>%HTKH lũy kế </td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
            </tr>
            <tr>
              <td>Ước %HTKH tháng</td>
              <td></td>
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
              <td colSpan={13} className="text-sub2">
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
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td rowSpan={4}>DVVT</td>
            </tr>
            <tr>
              <td>Thực hiện lũy kế</td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
            </tr>
            <tr>
              <td>%HTKH lũy kế </td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
            </tr>
            <tr>
              <td>Ước %HTKH tháng</td>
              <td></td>
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
              <td></td>
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
              <td>Thực hiện lũy kế</td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
            </tr>
            <tr>
              <td>%HTKH lũy kế </td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
            </tr>
            <tr>
              <td>Ước %HTKH tháng</td>
              <td></td>
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
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td rowSpan={4}>DVVT</td>
            </tr>
            <tr>
              <td>Thực hiện lũy kế</td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
            </tr>
            <tr>
              <td>%HTKH lũy kế </td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
            </tr>
            <tr>
              <td>Ước %HTKH tháng</td>
              <td></td>
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
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td rowSpan={4}>DVVT</td>
            </tr>
            <tr>
              <td>Thực hiện lũy kế</td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
            </tr>
            <tr>
              <td>%HTKH lũy kế </td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
            </tr>
            <tr>
              <td>Ước %HTKH tháng</td>
              <td></td>
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
              <td>Kế hoạch tháng</td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td rowSpan={4}>DVVT</td>
            </tr>
            <tr>
              <td>Thực hiện lũy kế</td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
            </tr>
            <tr>
              <td>%HTKH lũy kế </td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
            </tr>
            <tr>
              <td>Ước %HTKH tháng</td>
              <td></td>
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
              <td>Kế hoạch tháng</td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td rowSpan={4}>DVVT</td>
            </tr>
            <tr>
              <td>Thực hiện lũy kế</td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
            </tr>
            <tr>
              <td>%HTKH lũy kế </td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
            </tr>
            <tr>
              <td>Ước %HTKH tháng</td>
              <td></td>
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
              <td>Kế hoạch tháng</td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td rowSpan={4}>DVVT</td>
            </tr>
            <tr>
              <td>Thực hiện lũy kế</td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
            </tr>
            <tr>
              <td>%HTKH lũy kế </td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
            </tr>
            <tr>
              <td>Ước %HTKH tháng</td>
              <td></td>
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
              <td>Kế hoạch tháng</td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td rowSpan={4}>DVVT</td>
            </tr>
            <tr>
              <td>Thực hiện lũy kế</td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
            </tr>
            <tr>
              <td>%HTKH lũy kế </td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
            </tr>
            <tr>
              <td>Ước %HTKH tháng</td>
              <td></td>
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
              <td>Kế hoạch tháng</td>
              <td></td>
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
              <td>Thực hiện lũy kế</td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
            </tr>
            <tr>
              <td>%HTKH lũy kế </td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
            </tr>
            <tr>
              <td>Ước %HTKH tháng</td>
              <td></td>
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
              <td>Kế hoạch tháng</td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td rowSpan={4}>CSKH</td>
            </tr>
            <tr>
              <td>Thực hiện lũy kế</td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
            </tr>
            <tr>
              <td>%HTKH lũy kế </td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
            </tr>
            <tr>
              <td>Ước %HTKH tháng</td>
              <td></td>
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
              <td colSpan={13} className="text-sub2">
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
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td rowSpan={4}>CSKH</td>
            </tr>
            <tr>
              <td>Thực hiện lũy kế</td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
            </tr>
            <tr>
              <td>%HTKH lũy kế </td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
            </tr>
            <tr>
              <td>Ước %HTKH tháng</td>
              <td></td>
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
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td rowSpan={4}>CSKH</td>
            </tr>
            <tr>
              <td>Thực hiện lũy kế</td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
            </tr>
            <tr>
              <td>%HTKH lũy kế </td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
            </tr>
            <tr>
              <td>Ước %HTKH tháng</td>
              <td></td>
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
              <td>Kế hoạch tháng</td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td rowSpan={4}>CSKH</td>
            </tr>
            <tr>
              <td>Thực hiện lũy kế</td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
            </tr>
            <tr>
              <td>%HTKH lũy kế </td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
            </tr>
            <tr>
              <td>Ước %HTKH tháng</td>
              <td></td>
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
              <td>Kế hoạch tháng</td>
              <td></td>
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
              <td>Thực hiện lũy kế</td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
            </tr>
            <tr>
              <td>%HTKH lũy kế </td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
            </tr>
            <tr>
              <td>Ước %HTKH tháng</td>
              <td></td>
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
              <td>Kế hoạch tháng</td>
              <td></td>
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
              <td>Thực hiện lũy kế</td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
            </tr>
            <tr>
              <td>%HTKH lũy kế </td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
            </tr>
            <tr>
              <td>Ước %HTKH tháng</td>
              <td></td>
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
