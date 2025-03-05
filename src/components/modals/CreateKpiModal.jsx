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

var x = new Date();
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
const INIT_KPI_VALUES = {
  selectKpiMonth: x,
  province: { value: "KHO", label: "Khánh Hòa" },
  nameKpi: { value: "DTHU_FIBER", label: "Doanh thu Fiber" },
  kpi: "",
};
const initDataFiber = [
  {
    id: "dthu_fiber",
    province: "KHO",
    value: 0,
  },
  {
    id: "dthu_fiber",
    province: "DLA",
    value: 0,
  },
  {
    id: "dthu_fiber",
    province: "GLA",
    value: 0,
  },
  {
    id: "dthu_fiber",
    province: "PYE",
    value: 0,
  },
  {
    id: "dthu_fiber",
    province: "DNO",
    value: 0,
  },
  {
    id: "dthu_fiber",
    province: "KON",
    value: 0,
  },
  {
    id: "dthu_fiber",
    province: "CTY7",
    value: 0,
  },
];
const initDataMass = [
  {
    id: "dthu_mass",
    province: "KHO",
    value: 0,
  },
  {
    id: "dthu_mass",
    province: "DLA",
    value: 0,
  },
  {
    id: "dthu_mass",
    province: "GLA",
    value: 0,
  },
  {
    id: "dthu_mass",
    province: "PYE",
    value: 0,
  },
  {
    id: "dthu_mass",
    province: "DNO",
    value: 0,
  },
  {
    id: "dthu_mass",
    province: "KON",
    value: 0,
  },
  {
    id: "dthu_mass",
    province: "CTY7",
    value: 0,
  },
];

const initDataDuan = [
  {
    id: "dthu_duan",
    province: "KHO",
    value: 0,
  },
  {
    id: "dthu_duan",
    province: "DLA",
    value: 0,
  },
  {
    id: "dthu_duan",
    province: "GLA",
    value: 0,
  },
  {
    id: "dthu_duan",
    province: "PYE",
    value: 0,
  },
  {
    id: "dthu_duan",
    province: "DNO",
    value: 0,
  },
  {
    id: "dthu_duan",
    province: "KON",
    value: 0,
  },
  {
    id: "dthu_duan",
    province: "CTY7",
    value: 0,
  },
];

const initDataGps = [
  {
    id: "dthu_gps",
    province: "KHO",
    value: 0,
  },
  {
    id: "dthu_gps",
    province: "DLA",
    value: 0,
  },
  {
    id: "dthu_gps",
    province: "GLA",
    value: 0,
  },
  {
    id: "dthu_gps",
    province: "PYE",
    value: 0,
  },
  {
    id: "dthu_gps",
    province: "DNO",
    value: 0,
  },
  {
    id: "dthu_gps",
    province: "KON",
    value: 0,
  },
  {
    id: "dthu_gps",
    province: "CTY7",
    value: 0,
  },
];

const CreateKpiModal = (props) => {
  const [initKpiValues, setInitKpiValues] = useState(INIT_KPI_VALUES);
  const [loadingCreateManualKpi, setLoadingCreateManualKpi] = useState(false);
  const [show, setShow] = useState(props.show);
  const [mounted, setMounted] = useState(false);
  const [dataFiber, setDataFiber] = useState(initDataFiber);
  const [dataMass, setDataMass] = useState(initDataMass);
  const [dataDuan, setDataDuan] = useState(initDataDuan);
  const [dataGps, setDataGps] = useState(initDataGps);

  const handleSubmit = async (e) => {};
  const handleClose = async (e) => {
    props.handleClose();
  };
  const formKpiSchema = Yup.object().shape({
    kpi: Yup.number().required(),
  });

  useEffect(() => {
    console.log("check show", props.show);
    setShow(props.show);
  }, [props.show]);

  useEffect(() => {
    setMounted(true);
  }, []);

 const  handleValueUpdate = (id, valueInput, province) => {
    if (id == "dthu_fiber") {
      const tempData = dataFiber.map((object) => {
        if (object.province == province) {
          return {
            ...object,
            value: valueInput,
          };
        }
      });
      setDataFiber(tempData);
    } else if (id == "dthu_mass") {
      const tempData = dataMass.map((object) => {
        if (object.province == province) {
          return {
            ...object,
            value: valueInput,
          };
        }
      });
      setDataMass(tempData);
    } else if (id == "dthu_duan") {
      const tempData = dataDuan.map((object) => {
        if (object.province == province) {
          return {
            ...object,
            value: valueInput,
          };
        }
      });
      setDataDuan(tempData);
    } else if (id == "dthu_gps") {
      const tempData = dataGps.map((object) => {
        if (object.province == province) {
          return {
            ...object,
            value: valueInput,
          };
        }
      });
      setDataGps(tempData);
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
            try {
              console.log("values", values);
              const info = {
                month: moment(values.selectKpiMonth).format("DD-MM-YYYY"),
                kpi: values.kpi,
                nameKpi: values.nameKpi.value,
                province: values.province.value,
              };
              setLoadingCreateManualKpi(true);
              const result = await fetch("/api/create-manual-kpi", {
                method: "POST",
                headers: {
                  "Content-type": "application/json",
                },
                body: JSON.stringify(info),
              });
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
                <div className="container">
                  <div className="d-flex">
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
                  </div>
                  <div className="table-responsive">
                    <table className="table table-hover  align-middle gs-0 gy-3">
                      <thead>
                        <tr className="table-head">
                          <th colSpan={4}>Kpi</th>
                          <th>DVT</th>
                          <th className="bg-green-secondary">KHO</th>
                          <th className="bg-green-secondary">DLA</th>
                          <th className="bg-green-secondary">GLA</th>
                          <th className="bg-green-secondary">PYE</th>
                          <th className="bg-green-secondary">DNO</th>
                          <th className="bg-green-secondary">KON</th>
                          <th className="bg-green-secondary">Tổng</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>Doanh thu Fiber</td>
                          <td>triệu đồng</td>
                          {dataFiber.map((object, index) => (
                            <h1 key={index}>{JSON.stringify(object)}</h1>
                          ))}
                          {/* {dataFiber.map((object, index) => (
                            <td key={index + `_fiber`}>
                              <input
                                type="number"
                                className="form-control"
                                value={object.value}
                                onChange={()=>handleValueUpdate(object.id, object.value, object.province)}
                              />
                            </td>
                          ))} */}
                        </tr>
                        <tr>
                          <td>Doanh thu Mass</td>
                          <td>triệu đồng</td>
                          {dataMass.map((object, index) => (
                            <td key={index + `_mass`}>
                              <input
                                type="number"
                                className="form-control"
                                value={object.value}
                                onChange={()=>handleValueUpdate(object.id, object.value, object.province)}

                              />
                            </td>
                          ))}
                        </tr>
                        <tr>
                          <td>Doanh thu Dự án</td>
                          <td>triệu đồng</td>
                          {dataDuan.map((object, index) => (
                            <td key={index + `_duan`}>
                              <input
                                className="form-control"
                                value={object.value}
                                type="number"
                                onChange={()=>handleValueUpdate(object.id, object.value, object.province)}

                              />
                            </td>
                          ))}
                        </tr>
                        <tr>
                          <td>Doanh thu Giải pháp số</td>
                          <td>triệu đồng</td>
                          {dataGps.map((object, index) => (
                            <td key={index + `_gps`}>
                              <input
                                className="form-control"
                                value={object.value}
                                type="number"
                                onChange={()=>handleValueUpdate(object.id, object.value, object.province)}

                              />
                            </td>
                          ))}
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
                <label
                  className="form-label fs-6 fw-bold text-dark me-2 mt-1"
                  htmlFor="name-kpi"
                >
                  Tên chỉ tiêu
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

                  <Button variant="primary" onClick={formikProps.handleSubmit}>
                    {loadingCreateManualKpi ? "Saving ..." : "Save"}
                  </Button>
                </div>
              </div>
            );
          }}
        </Formik>
      </Modal.Body>
    </Modal>
  );
};

export default CreateKpiModal;
