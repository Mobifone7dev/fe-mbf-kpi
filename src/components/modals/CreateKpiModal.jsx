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
    id: "DTHU_GPS",
    province: "KHO",
    value: 0,
  },
  {
    id: "DTHU_GPS",
    province: "DLA",
    value: 0,
  },
  {
    id: "DTHU_GPS",
    province: "GLA",
    value: 0,
  },
  {
    id: "DTHU_GPS",
    province: "PYE",
    value: 0,
  },
  {
    id: "DTHU_GPS",
    province: "DNO",
    value: 0,
  },
  {
    id: "DTHU_GPS",
    province: "KON",
    value: 0,
  },
  {
    id: "DTHU_GPS",
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
  const [loadingPlan, setLoadingPlan] = useState(false);
  const [EXEC_DTHU_FIBER, SET_EXEC_DTHU_FIBER] = useState({});
  const [EXEC_DTHU_MASS, SET_EXEC_DTHU_MASS] = useState({});
  const [EXEC_DTHU_DUAN, SET_EXEC_DTHU_DUAN] = useState({});
  const [EXEC_DTHU_GPS, SET_EXEC_DTHU_GPS] = useState({});
  const [loadingExecKpi, setLoadingExecKpi] = useState(false);

  const handleSubmit = async (e) => {};
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
    if (Object.keys(EXEC_DTHU_DUAN).length > 0) {
      setInitDuan();
    }
    if (Object.keys(EXEC_DTHU_MASS).length > 0) {
      setInitMass();
    }
    if (Object.keys(EXEC_DTHU_GPS).length > 0) {
      setInitGps();
    }
  }, [EXEC_DTHU_FIBER, EXEC_DTHU_DUAN, EXEC_DTHU_MASS, EXEC_DTHU_GPS]);

  const setInitFiber = () => {
    let tempData = [];

    tempData.push({
      id: "DTHU_FIBER",
      value: EXEC_DTHU_FIBER.KHO ? EXEC_DTHU_FIBER.KHO / 1000000 : 0,
      province: "KHO",
    });
    tempData.push({
      id: "DTHU_FIBER",
      value: EXEC_DTHU_FIBER.DLA ? EXEC_DTHU_FIBER.DLA / 1000000: 0,
      province: "DLA",
    });
    tempData.push({
      id: "DTHU_FIBER",
      value: EXEC_DTHU_FIBER.GLA ? EXEC_DTHU_FIBER.GLA / 1000000: 0,
      province: "GLA",
    });
    tempData.push({
      id: "DTHU_FIBER",
      value: EXEC_DTHU_FIBER.PYE ? EXEC_DTHU_FIBER.PYE/ 1000000 : 0,
      province: "PYE",
    });
    tempData.push({
      id: "DTHU_FIBER",
      value: EXEC_DTHU_FIBER.DNO ? EXEC_DTHU_FIBER.DNO / 1000000: 0,
      province: "DNO",
    });
    tempData.push({
      id: "DTHU_FIBER",
      value: EXEC_DTHU_FIBER.KON ? EXEC_DTHU_FIBER.KON / 1000000: 0,
      province: "KON",
    });
    tempData.push({
      id: "DTHU_FIBER",
      value: EXEC_DTHU_FIBER.CTY7 ? EXEC_DTHU_FIBER.CTY7 / 1000000 : 0,
      province: "CTY7",
    });

    setDataFiber(tempData);
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
      id: "DTHU_GPS",
      value: EXEC_DTHU_GPS.KHO ? EXEC_DTHU_GPS.KHO / 1000000 : 0,
      province: "KHO",
    });
    tempData.push({
      id: "DTHU_GPS",
      value: EXEC_DTHU_GPS.DLA ? EXEC_DTHU_GPS.DLA / 1000000 : 0,
      province: "DLA",
    });
    tempData.push({
      id: "DTHU_GPS",
      value: EXEC_DTHU_GPS.GLA ? EXEC_DTHU_GPS.GLA / 1000000 : 0,
      province: "GLA",
    });
    tempData.push({
      id: "DTHU_GPS",
      value: EXEC_DTHU_GPS.PYE ? EXEC_DTHU_GPS.PYE / 1000000 : 0,
      province: "PYE",
    });
    tempData.push({
      id: "DTHU_GPS",
      value: EXEC_DTHU_GPS.DNO ? EXEC_DTHU_GPS.DNO / 1000000 : 0,
      province: "DNO",
    });
    tempData.push({
      id: "DTHU_GPS",
      value: EXEC_DTHU_GPS.KON ? EXEC_DTHU_GPS.KON / 1000000 : 0,
      province: "KON",
    });
    tempData.push({
      id: "DTHU_GPS",
      value: EXEC_DTHU_GPS.CTY7 ? EXEC_DTHU_GPS.CTY7 / 1000000 : 0,
      province: "CTY7",
    });

    setDataGps(tempData);
  };
  const getExecKpi = (month) => {
    setLoadingExecKpi(true);
    fetch(`api/get-exec-kpi?month=${month}`).then(async (res) => {
      setLoadingExecKpi(false);
      resetFiber();
      resetMass()
      resetDuan();
      resetGps();
      const data = await res.json();
      if (data && data.result) {
        if (data.result.length > 0) {
          data.result.map((object, index) => {
            if (object["TEN_CHI_TIEU"] == "DTHU_FIBER") {
              SET_EXEC_DTHU_FIBER(object);
            }
            if (object["TEN_CHI_TIEU"] == "DTHU_MASS") {
              SET_EXEC_DTHU_MASS(object);
            }
            if (object["TEN_CHI_TIEU"] == "DTHU_DUAN") {
              SET_EXEC_DTHU_DUAN(object);
            }
            if (object["TEN_CHI_TIEU"] == "DTHU_GPS") {
              SET_EXEC_DTHU_GPS(object);
            }
          });
        }
      }
    });
  };
  const resetFiber= () => {
    SET_EXEC_DTHU_FIBER(initDataFiber);

  }
  const resetDuan= () => {
    SET_EXEC_DTHU_DUAN(initDataDuan);

  }
  const resetMass= () => {
    SET_EXEC_DTHU_MASS(initDataMass);

  }
  const resetGps= () => {
    SET_EXEC_DTHU_GPS(initDataGps);

  }

  const handleValueUpdate = (id, valueInput, province) => {
    console.log("id, valueInput, province", id, valueInput, province);
    if (id == "DTHU_FIBER") {
      const tempData = dataFiber.map((object) => {
        if (object.province == province) {
          return {
            ...object,
            value: valueInput,
          };
        } else return object;
      });
      console.log("tempData", tempData);
      setDataFiber(tempData);
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
    } else if (id == "DTHU_GPS") {
      const tempData = dataGps.map((object) => {
        if (object.province == province) {
          return {
            ...object,
            value: valueInput,
          };
        } else return object;
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
            const tempDataFiber = dataFiber.map((object, index) => {
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
            try {
              console.log("values", values);
              const info = {
                month: moment(values.selectKpiMonth).format("DD-MM-YYYY"),
                kpiList: tempDataFiber.concat(
                  tempDataMass,
                  tempDataDuan,
                  tempDataGps
                ),
              };
              setLoadingCreateManualKpi(true);
              const result = await fetch("/api/create-manual-list-kpi", {
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
                                 whiteSpace: "nowrap"
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
              </div>
            );
          }}
        </Formik>
      </Modal.Body>
    </Modal>
  );
};

export default CreateKpiModal;
