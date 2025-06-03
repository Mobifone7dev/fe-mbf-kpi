"use client";
import Modal from "react-bootstrap/Modal";
import "bootstrap/dist/css/bootstrap.min.css";
import { useEffect, useState, useRef } from "react";
import { DatePickerField } from "../../components/widgets/datePickers/DatePickerField";
import * as Yup from "yup";
import moment from "moment";
import { ErrorMessage, Form, Formik, Field } from "formik";
import "react-datepicker/dist/react-datepicker.css";
import Button from "react-bootstrap/Button";
import CustomDateInput from "../../components/widgets/datePickers/CustomDateInput";
import DatePicker from "react-datepicker";
import { formatDate } from "date-fns";
const API_URL = process.env.NEXTAUTH_APP_API_URL_SSL;

const INIT_VALUES = {
  date: new Date(),
  amountKHO: 0,
  amountDLA: 0,
  amountGLA: 0,
  amountPYE: 0,
  amountDNO: 0,
  amountKON: 0,
};
export function FormCloud(props) {
  const [show, setShow] = useState(props.show);
  const [widthWindow, setWidthWindow] = useState(0);
  const [initValues, setInitValues] = useState(INIT_VALUES);
  const formSchema = Yup.object().shape({});
  const [loading, setLoading] = useState(false);
  const formikRef = useRef();

  useEffect(() => {
    if (typeof window !== "undefined") {
      setWidthWindow(window.innerWidth);
    }
  }, []);

  const hanleLoadData = async (date) => {
    try {
      const response = await fetch(
        `${API_URL}/dashboard-thidua/dthu-thidua-cloud-detail?date=${date}` // Replace with your actual API endpoint
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const result = await response.json();
      console.log("result", result);
      const data = result.data;
      if (data && data.length > 0) {
        let amountKHO = 0;
        let amountDLA = 0;
        let amountGLA = 0;
        let amountPYE = 0;
        let amountDNO = 0;
        let amountKON = 0;

        data.map((item, index) => {
          if (item.PROVINCE == "KHO") {
            amountKHO = item.AMOUNT ?? 0;
          } else if (item.PROVINCE == "DLA") {
            amountDLA = item.AMOUNT ?? 0;
          } else if (item.PROVINCE == "GLA") {
            amountGLA = item.AMOUNT ?? 0;
          } else if (item.PROVINCE == "PYE") {
            amountPYE = item.AMOUNT ?? 0;
          } else if (item.PROVINCE == "DNO") {
            amountDNO = item.AMOUNT ?? 0;
          } else if (item.PROVINCE == "KON") {
            amountKON = item.AMOUNT ?? 0;
          }
        });
        // console.log(amountKHO, amountDLA, amountDNO);
        setInitValues({
          ...initValues,
          amountKHO,
          amountDLA,
          amountGLA,
          amountPYE,
          amountDNO,
          amountKON,
          date: parseDateFromDDMMYYYY(date),
        });
      }
    } catch (err) {
      console.log(err);
    }
  };

  function parseDateFromDDMMYYYY(str) {
    const [day, month, year] = str.split("-");
    return new Date(`${year}-${month}-${day}`);
  }

  useEffect(() => {
    setShow(props.show);
    if (props.show) {
      const formattedDate = `${String(new Date().getDate()).padStart(
        2,
        "0"
      )}-${String(new Date().getMonth() + 1).padStart(
        2,
        "0"
      )}-${new Date().getFullYear()}`;
      hanleLoadData(formattedDate);
    }
  }, [props.show]);
  const handleClose = (isReset) => {
    if (isReset) {
      reset();
    }
    props.handleClose(isReset);
  };
  const reset = () => {
    setInitValues(INIT_VALUES);
  };

  return (
    <Modal
      size={widthWindow > 768 ? "md" : "sm"}
      aria-labelledby="contained-modal-title-vcenter"
      centered
      animation={false}
      show={show}
      onHide={() => handleClose(false)}
    >
      <Modal.Header closeButton>
        <Modal.Title>Thêm doanh thu Cloud(VND)</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Formik
          enableReinitialize={true}
          initialValues={initValues}
          innerRef={formikRef}
          validationSchema={formSchema}
          onSubmit={async (values, { resetForm }) => {
            const {
              date,
              amountKHO,
              amountDLA,
              amountGLA,
              amountPYE,
              amountDNO,
              amountKON,
            } = values;
            if (
              date !== undefined &&
              amountKHO !== undefined &&
              amountDLA !== undefined &&
              amountGLA !== undefined &&
              amountPYE !== undefined &&
              amountDNO !== undefined &&
              amountKON !== undefined
            ) {
              const formattedDate = `${String(date.getDate()).padStart(
                2,
                "0"
              )}-${String(date.getMonth() + 1).padStart(
                2,
                "0"
              )}-${date.getFullYear()}`;

              const kpiList = [
                {
                  province: "KHO",
                  amount: amountKHO,
                  date: formattedDate,
                },
                {
                  province: "DLA",
                  amount: amountDLA,
                  date: formattedDate,
                },
                {
                  province: "GLA",
                  amount: amountGLA,
                  date: formattedDate,
                },
                {
                  province: "PYE",
                  amount: amountPYE,
                  date: formattedDate,
                },
                {
                  province: "DNO",
                  amount: amountDNO,
                  date: formattedDate,
                },
                {
                  province: "KON",
                  amount: amountKON,
                  date: formattedDate,
                },
              ];
              try {
                setLoading(true);

                const response = await fetch(
                  `${API_URL}/dashboard-thidua/dthu-thidua-cloud`,
                  {
                    method: "POST",
                    headers: {
                      "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ kpiList: kpiList }),
                  } // Replace with your actual API endpoint
                );
                if (!response.ok) {
                  throw new Error("Network response was not ok");
                }
                const result = await response.json();
                setLoading(false);
                reset();
                props.handleClose(true);
              } catch (error) {
                throw new Error("error", error);
              }
            }
          }}
        >
          {(formikProps) => {
            return (
              <Form>
                <div className=" filter mb-3 me-5">
                  <div className="filter-body">
                    <div className="form-group">
                      <label
                        htmlFor="selectMonth"
                        className="form-label fs-6 fw-bold text-dark me-2"
                      >
                        Tháng
                      </label>

                      <DatePickerField
                        showMonthYearPicker={false}
                        name={`date`}
                        dateFormat="dd/MM/yyyy"
                        disabled={false}
                        customInput={<CustomDateInput />}
                        callbackSetDate={(e) => {
                          setInitValues({
                            ...initValues,
                            date: e,
                          });

                          const formattedDate = `${String(e.getDate()).padStart(
                            2,
                            "0"
                          )}-${String(e.getMonth() + 1).padStart(
                            2,
                            "0"
                          )}-${e.getFullYear()}`;
                          console.log("formattedDate", formattedDate);
                          hanleLoadData(formattedDate);
                        }}
                      ></DatePickerField>
                    </div>
                    <div className="form-group d-flex  justify-content-center align-items-center">
                      <label
                        className="form-label fw-bold me-2 pt-2"
                        htmlFor="amountKHO"
                        style={{ minWidth: "50px" }}
                      >
                        {" "}
                        KHO:
                      </label>
                      <Field
                        className="form-control"
                        name={`amountKHO`}
                        type="number"
                      />
                    </div>
                    <div className="form-group d-flex  justify-content-center align-items-center">
                      <label
                        className="form-label fw-bold me-2 pt-2"
                        htmlFor="amountDLA"
                        style={{ minWidth: "50px" }}
                      >
                        {" "}
                        DLA:
                      </label>
                      <Field
                        className="form-control"
                        name={"amountDLA"}
                        type="number"
                      />
                    </div>
                    <div className="form-group d-flex  justify-content-center align-items-center">
                      <label
                        className="form-label fw-bold me-2 pt-2"
                        htmlFor="amountGLA"
                        style={{ minWidth: "50px" }}
                      >
                        {" "}
                        GLA:
                      </label>
                      <Field
                        className="form-control"
                        name={"amountGLA"}
                        type="number"
                      />
                    </div>
                    <div className="form-group d-flex  justify-content-center align-items-center">
                      <label
                        className="form-label fw-bold me-2 pt-2"
                        htmlFor="amountPYE"
                        style={{ minWidth: "50px" }}
                      >
                        {" "}
                        PYE :
                      </label>
                      <Field
                        className="form-control"
                        name={"amountPYE"}
                        type="number"
                      />
                    </div>
                    <div className="form-group d-flex  justify-content-center align-items-center">
                      <label
                        className="form-label fw-bold me-2 pt-2"
                        htmlFor="amountDNO"
                        style={{ minWidth: "50px" }}
                      >
                        {" "}
                        DNO:
                      </label>
                      <Field
                        className="form-control"
                        name={"amountDNO"}
                        type="number"
                      />
                    </div>
                    <div className="form-group d-flex  justify-content-center align-items-center">
                      <label
                        className="form-label fw-bold me-2 pt-2"
                        htmlFor="amountKON"
                        style={{ minWidth: "50px" }}
                      >
                        {" "}
                        KON:
                      </label>
                      <Field
                        className="form-control"
                        name={"amountKON"}
                        type="number"
                      />
                    </div>
                  </div>
                </div>
              </Form>
            );
          }}
        </Formik>
      </Modal.Body>
      <Modal.Footer>
        <div className="mt-4 d-flex justify-content-start w-100">
          <Button
            className="me-4 "
            variant="secondary"
            onClick={() => handleClose(false)}
          >
            Close
          </Button>
          <Button
            variant="primary"
            onClick={() => {
              formikRef.current.handleSubmit();
            }}
          >
            {loading ? "Saving ..." : "Save"}
          </Button>
        </div>
      </Modal.Footer>
    </Modal>
  );
}

export default FormCloud;
