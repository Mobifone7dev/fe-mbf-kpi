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
import TableDashboardT03 from "@components/tables/TableDashboardT03";
import TableDashboardT04 from "@components/tables/TableDashboardT04";

import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import {
  handleGetPlanKpi,
  handleGetExecKpi,
  handleGetExecKpiExcel,
} from "../lib/api";
import { convertKeyToProvinceObject } from "../lib/utils";
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
  const [province, setProvince] = useState({
    value: "",
    label: "Không xác định",
  });
  const [planData, setPlanData] = useState({});
  const [execData, setExecData] = useState({});
  const [kpiPageRole, setkpiPageRole] = useState();
  const childRef = useRef();

  useEffect(() => {
    try {
      const user = localStorage.getItem("user")&&JSON.parse(localStorage.getItem("user"))
        ? JSON.parse(localStorage.getItem("user"))
        : null;
      if (user && user.roles) {
        if (user.roles.find((object) => (object.menu_id = "1"))) {
          setkpiPageRole(user.roles.find((object) => (object.menu_id = "1")));
        }
      }else {
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
    if (
      kpiPageRole &&
      kpiPageRole.PROVINCE &&
      kpiPageRole.PROVINCE.length > 0
    ) {
      setProvince(convertKeyToProvinceObject(kpiPageRole.PROVINCE));
    }
  }, [kpiPageRole]);

  useEffect(() => {
    getPlanKpi(changeFormatDateFirstDateInMonth(x), province.value);
    getExecKpi(changeFormatDateFirstDateInMonth(x), province.value);
  }, [province]);

  useEffect(() => {
    if (firstUpdate.current) {
      firstUpdate.current = false;
      return;
    }
    const date = changeFormatDateFirstDateInMonth(selectedDate);
    getPlanKpi(date, province.value);
    getExecKpi(date, province.value);
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
  const getPlanKpi = (month, province) => {
    setLoadingPlan(true);
    if (childRef.current) {
      childRef.current.resetPlan();
    }
    handleGetPlanKpi(month, province).then(async (res) => {
      const data = await res.json();
      if (data && data.result) {
        setPlanData(data);
      }
      setLoadingPlan(false);
    });
  };

  const getExecKpi = (month, province) => {
    setLoadingExec(true);
    if (childRef.current) {
      childRef.current.resetExec();
    }
    handleGetExecKpi(month, province).then(async (res) => {
      const data = await res.json();
      setExecData(data);
      setLoadingExec(false);
    });
  };
  const handleDownloadExcel = async (kpiType, provincePt = "") => {
    if (!selectedDate) {
      console.error("🚨 Lỗi: Chưa chọn tháng!");
      alert("Vui lòng chọn tháng trước khi tải Excel.");
      return;
    }

    const formattedMonth = new Date(selectedDate)
      .toLocaleDateString("en-GB", { month: "2-digit", year: "numeric" })
      .replace(" ", "/");

    try {
      alert("🔄 Đang tải file Excel...");

      // 🛠️ Gọi API từ api.ts
      let data = await handleGetExecKpiExcel(
        formattedMonth,
        kpiType,
        provincePt
      );

      console.log("📌 Phản hồi từ API trước khi kiểm tra:", data);

      // Nếu dữ liệu là Response object, cần parse JSON
      if (data instanceof Response) {
        console.warn("⚠️ Dữ liệu từ API là Response object, cần parse JSON");
        data = await data.json();
      }

      console.log("📌 Dữ liệu đã parse JSON:", data);

      // Kiểm tra dữ liệu trả về
      if (
        !data ||
        !data.result ||
        !Array.isArray(data.result) ||
        data.result.length === 0
      ) {
        console.error("🚨 Không có dữ liệu hợp lệ từ API:", data);
        throw new Error("Không có dữ liệu để xuất Excel");
      }

      // ✅ Chuyển đổi JSON thành worksheet
      const worksheet = XLSX.utils.json_to_sheet(data.result);

      // ✅ Tạo workbook và gán worksheet vào
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, "KPI Data");

      // ✅ Lấy thời gian hiện tại để đặt tên file
      const now = new Date();
      const timeStamp = now
        .toLocaleTimeString("en-GB", { hour12: false })
        .replace(/:/g, "-");
      const provinceSuffix = provincePt ? `_${provincePt}` : "";
      const fileName = `KPI_${kpiType}${provinceSuffix}_${formattedMonth.replace(
        "/",
        "-"
      )}_${timeStamp}.xlsx`;

      // ✅ Xuất file Excel
      const excelBuffer = XLSX.write(workbook, {
        bookType: "xlsx",
        type: "array",
      });
      const excelBlob = new Blob([excelBuffer], {
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      });

      // ✅ Lưu file xuống
      saveAs(excelBlob, fileName);
      alert("✅ Tải file Excel thành công!");
      console.log("✅ Tải xuống thành công! File:", fileName);
    } catch (error) {
      alert(`❌ Lỗi khi tải Excel: ${error.message}`);
      console.error("❌ Lỗi khi tải Excel:", error);
    }
  };

  const [show, setShow] = useState(false);

  return kpiPageRole ? (
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

          <CreateKpiModal
            show={show}
            handleClose={() => {
              setShow(false);
              const date = changeFormatDateFirstDateInMonth(selectedDate);
              getExecKpi(date);
            }}
          />
        </div>
      </div>
      { selectedDate.getMonth()  < 3? (
        <TableDashboardT03
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
        <TableDashboardT04
          ref={childRef}
          planData={planData}
          execData={execData}
          loadingExec={loadingExec}
          loadingPlan={loadingPlan}
          selectedDate={selectedDate}
          sumDateInMonth={sumDateInMonth}
          isSticky={isSticky}
        />
      )}
    </div>
  ) : (
    <></>
  );
};

export default Page;
