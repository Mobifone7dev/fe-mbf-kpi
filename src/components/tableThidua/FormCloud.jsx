"use client";
import Modal from "react-bootstrap/Modal";
import "bootstrap/dist/css/bootstrap.min.css";
import { useEffect, useState, useRef } from "react";
import { DatePickerField } from "../../components/widgets/datePickers/DatePickerField";
import * as Yup from "yup";
import moment from "moment";
import { ErrorMessage, Form, Formik } from "formik";
import "react-datepicker/dist/react-datepicker.css";
import Button from "react-bootstrap/Button";
import CustomDateInput from "../../components/widgets/datePickers/CustomDateInput";
import DatePicker from "react-datepicker";

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

  useEffect(() => {
    if (typeof window !== "undefined") {
      setWidthWindow(window.innerWidth);
    }
  }, []);
  useEffect(() => {
    setShow(props.show);
  }, [props.show]);
  const handleClose = (isReset) => {
    if (isReset) {
      reset();
    }
    props.handleClose();
  };
  const reset = () => {};

  const handleSubmit = () => {};
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
        <Modal.Title>Thêm doanh thu Cloud</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Formik
          enableReinitialize={true}
          initialValues={initValues}
          validationSchema={formSchema}
          onSubmit={async (values, { resetForm }) => {
            // setInitValues({
            //   date: values.date,
            //   amountKHO: values.amountKHO
            // });
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
                        showMonthYearPicker={true}
                        name={`date`}
                        dateFormat="dd/MM/yyyy"
                        disabled={false}
                        customInput={<CustomDateInput />}
                        callbackSetDate={(e) => {
                          setInitValues({
                            ...initValues,
                            date: e,
                          });
                        }}
                      ></DatePickerField>
                    </div>
                    <div className="form-group d-flex  justify-content-center align-items-center">
                      <label className="form-label fw-bold me-2 pt-2" htmlFor="amount">
                        {" "}
                     KHO:
                      </label>
                      <input
                        className="form-control"
                        name={`amountKHO`}
                        type="number"
                        onChange={(e) =>
                          setInitValues({
                            ...initValues,
                            amountKHO: e,
                          })
                        }
                      />
                    </div>
                    <div className="form-group d-flex  justify-content-center align-items-center">
                      <label className="form-label fw-bold me-2 pt-2" htmlFor="amount">
                        {" "}
                     DLA:
                      </label>
                      <input
                        className="form-control"
                        name={"amountDLA"}
                        type="number"
                        onChange={(e) =>
                          setInitValues({
                            ...initValues,
                            amountDLA: e,
                          })
                        }
                      />
                    </div>
                    <div className="form-group d-flex  justify-content-center align-items-center">
                      <label className="form-label fw-bold me-2 pt-2" htmlFor="amount">
                        {" "}
                     GLA:
                      </label>
                      <input
                        className="form-control"
                        name={"amountGLA"}
                        type="number"
                        onChange={(e) =>
                          setInitValues({
                            ...initValues,
                            amountGLA: e,
                          })
                        }
                      />
                    </div>
                    <div className="form-group d-flex  justify-content-center align-items-center">
                      <label className="form-label fw-bold me-2 pt-2" htmlFor="amount">
                        {" "}
                     PYE:
                      </label>
                      <input
                        className="form-control"
                        name={"amountPYE"}
                        type="number"
                        onChange={(e) =>
                          setInitValues({
                            ...initValues,
                            amountPYE: e,
                          })
                        }
                      />
                    </div>
                    <div className="form-group d-flex  justify-content-center align-items-center">
                      <label className="form-label fw-bold me-2 pt-2" htmlFor="amount">
                        {" "}
                     DNO:
                      </label>
                      <input
                        className="form-control"
                        name={"amountDNO"}
                        type="number"
                        onChange={(e) =>
                          setInitValues({
                            ...initValues,
                            amountDNO: e,
                          })
                        }
                      />
                    </div>
                    <div className="form-group d-flex  justify-content-center align-items-center">
                      <label className="form-label fw-bold me-2 pt-2" htmlFor="amount">
                        {" "}
                     KON:
                      </label>
                      <input
                        className="form-control"
                        name={"amountKON"}
                        type="number"
                        onChange={(e) =>
                          setInitValues({
                            ...initValues,
                            amountKON: e,
                          })
                        }
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
          <Button variant="primary" onClick={handleSubmit}>
            {loading ? "Saving ..." : "Save"}
          </Button>
        </div>
      </Modal.Footer>
    </Modal>
  );
}

export default FormCloud;
