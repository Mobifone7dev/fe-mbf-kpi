"use client";
import React, { useState, useEffect, useRef } from "react";
import moment from "moment";
import { ErrorMessage, Form, Formik } from "formik";
import "react-datepicker/dist/react-datepicker.css";
import { DatePickerField } from "../components/widgets/datePickers/DatePickerField";
import * as Yup from "yup";
import "bootstrap/dist/css/bootstrap.min.css";
import Button from "react-bootstrap/Button";
import CreateKpiModal from "@components/modals/CreateKpiModal";
import CreateKpiT08Modal from "@components/modals/CreateKpiT08Modal";
import CreateKpiT12Modal from "@components/modals/CreateKpiT12Modal";

import TableDashboardT03 from "@components/tables/TableDashboardT03";
import TableDashboardT04 from "@components/tables/TableDashboardT04";
import TableDashboardT08 from "@components/tables/TableDashboardT08";
import TableDashboardT12 from "@components/tables/TableDashboardT12";

import { redirect } from "next/navigation";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import {
  handleGetPlanKpi,
  handleGetExecKpi,
  handleGetExecKpiExcel,
} from "../lib/api";
import {
  convertToFloat2Fixed,
  getFormattedDate,
  convertToFloat2FixedNumber,
  formatIntegerWithCommas,
  daysInMonth,
  changeFormatDateFirstDateInMonth,
} from "../until/functions";

var x = new Date();
x.setDate(1);
x.setMonth(x.getMonth());
const INIT_VALUES = {
  selectMonth: x,
};

const Page = () => {
  const firstUpdate = useRef(true);
  const [initValues, setInitValues] = useState(INIT_VALUES);
  const [sumDateInMonth, setSumDateInMonth] = useState(daysInMonth(new Date()));
  const formSchema = Yup.object().shape({});
  const [isSticky, setisSticky] = useState(false);
  const [loadingPlan, setLoadingPlan] = useState(false);
  const [loadingExec, setLoadingExec] = useState(false);
  // usetate value
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [indexDateInMonth, setIndexDateInMonth] = useState(
    new Date().getDate()
  );

  const [planData, setPlanData] = useState({});
  const [execData, setExecData] = useState({});
  const [kpiPageRole, setkpiPageRole] = useState();
  const childRef = useRef();

  useEffect(() => {
    try {
      const user =
        localStorage.getItem("user") && JSON.parse(localStorage.getItem("user"))
          ? JSON.parse(localStorage.getItem("user"))
          : null;
      if (user && user.roles) {
        if (user.roles.find((object) => (object.menu_id = "1"))) {
          setkpiPageRole(user.roles.find((object) => (object.menu_id = "1")));
        }
        const date = changeFormatDateFirstDateInMonth(selectedDate);

        getPlanKpi(date);
      } else {
        localStorage.removeItem("user");
        redirect("/login");
      }
    } catch (error) {
      console.log(error);
      localStorage.removeItem("user");
      redirect("/login");
    }
  }, []);
  useEffect(() => {
    if (!loadingExec && !loadingPlan) {
      handleCaculateKpiKHO();
    }
  }, [loadingExec, loadingPlan]);

  useEffect(() => {
    if (firstUpdate.current) {
      firstUpdate.current = false;
      return;
    }
    const date = changeFormatDateFirstDateInMonth(selectedDate);
    console.log("check ne");
    getPlanKpi(date);
    // getExecKpi(date);
  }, [selectedDate]);
  const handleSticky = () => {
    const scrollTop = window.scrollY;
    scrollTop > 80 ? setisSticky(true) : setisSticky(false);
  };
  useEffect(() => {
    window.addEventListener("scroll", handleSticky);
    return () => {
      window.removeEventListener("scroll", handleSticky);
    };
  });

  const handleCaculateKpiKHO = () => {
    if (childRef.current) {
      childRef.current.caculateKpiKHO();
    }
  };
  const getPlanKpi = (month) => {
    setLoadingPlan(true);
    if (childRef.current) {
      childRef.current.resetPlan();
    }
    handleGetPlanKpi(month).then(async (res) => {
      const data = await res.json();
      if (data && data.result) {
        setPlanData(data);
      }
      setLoadingPlan(false);
    });
  };

  // const getExecKpi = (month) => {
  //   setLoadingExec(true);
  //   if (childRef.current) {
  //     childRef.current.resetExec();
  //   }
  //   handleGetExecKpi(month).then(async (res) => {
  //     const data = await res.json();
  //     setExecData(data);
  //     setLoadingExec(false);
  //   });
  // };

  const [show, setShow] = useState(false);

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
                          console.log("Selected date:", e.getMonth());
                          setSelectedDate(e);
                          let indexDate;
                          if (e < new Date()) {
                            indexDate = daysInMonth(e);
                          } else {
                            indexDate = e.getDate();
                          }
                          setIndexDateInMonth(indexDate);
                          const sumDate = daysInMonth(e);
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

          {/* <CreateKpiModal
            show={show}
            handleClose={() => {
              setShow(false);
              const date = changeFormatDateFirstDateInMonth(selectedDate);
              getExecKpi(date);
            }}
          /> */}

          <CreateKpiT12Modal
            show={show}
            handleClose={() => {
              setShow(false);
              const date = changeFormatDateFirstDateInMonth(selectedDate);
              // getExecKpi(date);
            }}
          />
        </div>
      </div>
      {/* selectDate se cham hon 1 thang */}
      {selectedDate.getMonth() > 10 ? (
        <TableDashboardT12
          ref={childRef}
          planData={planData}
          execData={execData}
          loadingExec={loadingExec}
          loadingPlan={loadingPlan}
          selectedDate={selectedDate}
          sumDateInMonth={sumDateInMonth}
          isSticky={isSticky}
        />
      ) : (
        <></>
      )}
    </div>
  );
};

export default Page;
