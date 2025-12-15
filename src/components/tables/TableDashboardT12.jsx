import Reatc, {
  useEffect,
  useState,
  forwardRef,
  useImperativeHandle,
} from "react";
import LoadingComponent from "@components/loading/LoadingComponent";
import {
  convertToFloat2Fixed,
  getFormattedDate,
  convertToFloat2FixedNumber,
  daysInMonth,
  changeFormatDateFirstDateInMonth,
} from "../../until/functions.js";
// eslint-disable-next-line react/display-name
const TableDashboardT12 = forwardRef((props, ref) => {
  const [PLAN_DTHU_TKC_HTS, SET_PLAN_DTHU_TKC_HTS] = useState({});
  const [PLAN_DTHU_GPS, SET_PLAN_DTHU_GPS] = useState({});
  const [PLAN_SL_TB_C2C, SET_PLAN_SL_TB_C2C] = useState({});

  const [PLAN_TYLE_GD_C2C, SET_PLAN_TYLE_GD_C2C] = useState({});
  const [PLAN_SL_PTM_TBTT, SET_PLAN_SL_PTM_TBTT] = useState({});
  const [PLAN_SL_TBTS_PTM_THOAI, SET_PLAN_SL_TBTS_PTM_THOAI] = useState({});
  const [PLAN_SL_TB_PTM_M2M, SET_PLAN_SL_TB_PTM_M2M] = useState({});
  const [PLAN_TB_PTM_SAYMEE, SET_PLAN_TB_PTM_SAYMEE] = useState({});
  const [PLAN_TB_PTM_FIBER, SET_PLAN_TB_PTM_FIBER] = useState({});

  // exec
  const [EXEC_DTHU_TKC_HTS, SET_EXEC_DTHU_TKC_HTS] = useState({});
  const [EXEC_DTHU_GPS_KHCN, SET_EXEC_DTHU_GPS_KHCN] = useState({});
  const [EXEC_DTHU_GPS_KHDN, SET_EXEC_DTHU_GPS_KHDN] = useState({});
  const [EXEC_DTHU_GPS, SET_EXEC_DTHU_GPS] = useState({});
  const [EXEC_SL_TB_C2C, SET_EXEC_SL_TB_C2C] = useState({});
  const [EXEC_TYLE_GD_C2C, SET_EXEC_TYLE_GD_C2C] = useState({});
  const [EXEC_SL_PTM_TBTT, SET_EXEC_SL_PTM_TBTT] = useState({});
  const [EXEC_SL_TBTS_PTM_THOAI, SET_EXEC_SL_TBTS_PTM_THOAI] = useState({});
  const [EXEC_SL_TB_PTM_M2M, SET_EXEC_SL_TB_PTM_M2M] = useState({});
  const [EXEC_TB_PTM_SAYMEE, SET_EXEC_TB_PTM_SAYMEE] = useState({});
  const [EXEC_TB_PTM_FIBER, SET_EXEC_TB_PTM_FIBER] = useState({});

  const [planData, setPlanData] = useState({});
  const [loadingPlan, setLoadingPlan] = useState(props.loadingPlan);
  const [execData, setExecData] = useState(props.execData);
  const [loadingExec, setLoadingExec] = useState(props.loadingExec);
  const [selectedDate, setSelectedDate] = useState(props.selectedDate);
  const [sumDateInMonth, setSumDateInMonth] = useState(props.sumDateInMonth);

  useEffect(() => {
    setLoadingExec(props.loadingExec);
  }, [props.loadingExec]);

  useEffect(() => {
    setSelectedDate(props.selectedDate);
  }, [props.selectedDate]);
  useEffect(() => {
    setSumDateInMonth(props.sumDateInMonth);
  }, [props.sumDateInMonth]);

  useImperativeHandle(ref, () => ({
    resetPlan() {
      SET_PLAN_DTHU_TKC_HTS({});
      SET_PLAN_DTHU_GPS({});
      SET_PLAN_SL_TB_C2C({});
      SET_PLAN_TYLE_GD_C2C({});
      SET_PLAN_SL_PTM_TBTT({});
      SET_PLAN_SL_TBTS_PTM_THOAI({});
      SET_PLAN_SL_TB_PTM_M2M({});
      SET_PLAN_TB_PTM_SAYMEE({});
      SET_PLAN_TB_PTM_FIBER({});
    },
    resetExec() {
      SET_EXEC_DTHU_TKC_HTS({});
      SET_EXEC_DTHU_GPS_KHDN({});
      SET_EXEC_DTHU_GPS({});
      SET_EXEC_SL_TB_C2C({});
      SET_EXEC_TYLE_GD_C2C({});
      SET_EXEC_SL_PTM_TBTT({});
      SET_EXEC_SL_TBTS_PTM_THOAI({});
      SET_EXEC_SL_TB_PTM_M2M({});
      SET_EXEC_TB_PTM_SAYMEE({});
      SET_EXEC_TB_PTM_FIBER({});
    },
  }));
  useEffect(() => {
    if (planData.result && planData.result?.length > 0) {
      console.log("planData", planData);
      planData.result.forEach((object, index) => {
        if (object["TEN_CHI_TIEU"] == "DTHU_TKC_HTS") {
          SET_PLAN_DTHU_TKC_HTS(object);
        }

        if (object["TEN_CHI_TIEU"] == "DTHU_GPS") {
          SET_PLAN_DTHU_GPS(object);
        }

        if (object["TEN_CHI_TIEU"] == "SL_TB_C2C") {
          SET_PLAN_SL_TB_C2C(object);
        }
        if (object["TEN_CHI_TIEU"] == "TYLE_GD_C2C") {
          SET_PLAN_TYLE_GD_C2C(object);
        }
        if (object["TEN_CHI_TIEU"] == "SL_PTM_TBTT") {
          SET_PLAN_SL_PTM_TBTT(object);
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
      });
    }
  }, [planData]);

  useEffect(() => {
    if (execData && execData.result?.length > 0) {
      execData.result.forEach((object, index) => {
        if (object["TEN_CHI_TIEU"] == "DTHU_TKC_HTS") {
          SET_EXEC_DTHU_TKC_HTS(object);
        }
        if (object["TEN_CHI_TIEU"] == "DTHU_GPS") {
          console.log("check ne ", object);
          SET_EXEC_DTHU_GPS(object);
        }
        if (object["TEN_CHI_TIEU"] == "DTHU_GPS_KHCN") {
          SET_EXEC_DTHU_GPS_KHCN(object);
        }
      });
    }
  }, [execData]);
  useEffect(() => {
    setPlanData(props.planData);
  }, [props.planData]);
  useEffect(() => {
    setLoadingPlan(props.loadingPlan);
  }, [props.loadingPlan]);
  useEffect(() => {
    setExecData(props.execData);
  }, [props.execData]);

  return (
    <div className="dashboard-kpi-dla">
      <h4 className="m4-4">Dashboard MobiFone Đăk Lăk</h4>
      <div className="table-kpi-dla">
        {/* <h4 className="text-center">Bảng Kpi tháng 08</h4> */}
        <table className=" table-fixed align-middle gs-0 gy-3">
          <colgroup>
            <col style={{ width: "40px" }} /> {/* STT */}
            <col style={{ width: "260px" }} /> {/* Nhiệm vụ */}
            <col style={{ width: "80px" }} /> {/* Nội dung */}
            {Array.from({ length: 22 }).map((_, i) => (
              <col key={i} style={{ width: "100px" }} />
            ))}
          </colgroup>
          <thead className={`table-head`}>
            <tr>
              <th colSpan={2} className="th-title th-color-yellow  ">
                Tiến độ cần thiết để đảm bảo KH tháng
              </th>
              <th className="th-title-per th-color-yellow ">6.5%</th>
              <th className="th-title-dis">{`Thành phố Buôn Ma Thuột`}</th>
              <th className="th-title-dis">Huyện Krông Pắc</th>
              <th className="th-title-dis">Huyện Ea Kar</th>
              <th className="th-title-dis">Thị xã Buôn Hồ</th>
              <th className="th-title-dis">{`Huyện Cư M'gar`}</th>
              <th className="th-title-dis">{`Huyện Cư Kuin`}</th>
              <th className="th-title-dis">{`Huyện Ea H'leo`}</th>
              <th className="th-title-dis">Huyện Krông Năng</th>
              <th className="th-title-dis">{`Huyện Krông Búk`}</th>
              <th className="th-title-dis">{`Huyện Krông Bông + Huyện Lắk`}</th>
              <th className="th-title-dis">{`Huyện Krông A Na`}</th>
              <th className="th-title-dis">{`Huyện Buôn Đôn + Huyện Ea Súp`}</th>
              <th className="th-title-dis">{`Huyện M'ĐrắK`}</th>
              <th className="th-title-dis">{`Thành phố Tuy Hoà`}</th>
              <th className="th-title-dis">{`Huyện Đông Hoà`}</th>
              <th className="th-title-dis">{`Huyện Phú Hoà + Huyện Sơn Hòa`}</th>
              <th className="th-title-dis">{`Huyện Tây Hoà + Huyện Sông Hinh`}</th>
              <th className="th-title-dis">{`Thị xã Sông Cầu`}</th>
              <th className="th-title-dis">{`Huyện Tuy An +Huyện Đồng Xuân`}</th>
              <th className="th-title-dis" rowSpan={2}>{`TT.KDDVVT`}</th>
              <th className="th-title-dis" rowSpan={2}>{`TT.KDGPS`}</th>
              <th className="th-title-dis" rowSpan={2}>{`Ngày cập nhật`}</th>

              {/* <th className="th-title-dis" rowSpan={2}>{`Tổng`}</th> */}
            </tr>

            <tr>
              <th className="th-stt th-color-brow">STT</th>
              <th className="th-color-brow ">Nhiệm vụ</th>
              <th className="th-color-brow ">Nội dung</th>
              <th>DLA_T01</th>
              <th>DLA_T02</th>
              <th>DLA_T03</th>
              <th>DLA_T04</th>
              <th>DLA_T05</th>
              <th>DLA_T06</th>
              <th>DLA_T07</th>
              <th>DLA_T08</th>
              <th>DLA_T09</th>
              <th>DLA_T10</th>
              <th>DLA_T11</th>
              <th>DLA_T12</th>
              <th>DLA_T13</th>
              <th>DLA_D01</th>
              <th>DLA_D02</th>
              <th>DLA_D03</th>
              <th>DLA_D04</th>
              <th>DLA_D05</th>
              <th>DLA_D06</th>
            </tr>
          </thead>
          <tbody className={`table-body`}>
            <tr>
              <td
                colSpan={25}
                className=" td-title td-color-blue"
                style={{ fontWeight: 500 }}
              >
                I. Viễn cảnh tài chính
              </td>
            </tr>
            <tr>
              <td
                className="td-stt td-title-center td-stt fix-col-1"
                rowSpan={3}
              >
                1
              </td>
              <td className="td-title fw-bold td-content fix-col-2" rowSpan={3}>
                Doanh thu Hạ tầng số{" "}
                <span style={{ fontStyle: "italic" }}>(triệu đồng)</span>
              </td>
              <td className="td-title-center fix-col-3">KH</td>
              <td>
                {" "}
                {loadingPlan ? (
                  <LoadingComponent />
                ) : PLAN_DTHU_TKC_HTS.DLA_T01 ? (
                  convertToFloat2Fixed(PLAN_DTHU_TKC_HTS.DLA_T01)
                ) : (
                  ""
                )}
              </td>
              <td>
                {" "}
                {loadingPlan ? (
                  <LoadingComponent />
                ) : PLAN_DTHU_TKC_HTS.DLA_T02 ? (
                  convertToFloat2Fixed(PLAN_DTHU_TKC_HTS.DLA_T02)
                ) : (
                  ""
                )}
              </td>
              <td>
                {" "}
                {loadingPlan ? (
                  <LoadingComponent />
                ) : PLAN_DTHU_TKC_HTS.DLA_T03 ? (
                  convertToFloat2Fixed(PLAN_DTHU_TKC_HTS.DLA_T03)
                ) : (
                  ""
                )}
              </td>
              <td>
                {" "}
                {loadingPlan ? (
                  <LoadingComponent />
                ) : PLAN_DTHU_TKC_HTS.DLA_T04 ? (
                  convertToFloat2Fixed(PLAN_DTHU_TKC_HTS.DLA_T04)
                ) : (
                  ""
                )}
              </td>
              <td>
                {" "}
                {loadingPlan ? (
                  <LoadingComponent />
                ) : PLAN_DTHU_TKC_HTS.DLA_T05 ? (
                  convertToFloat2Fixed(PLAN_DTHU_TKC_HTS.DLA_T05)
                ) : (
                  ""
                )}
              </td>
              <td>
                {" "}
                {loadingPlan ? (
                  <LoadingComponent />
                ) : PLAN_DTHU_TKC_HTS.DLA_T06 ? (
                  convertToFloat2Fixed(PLAN_DTHU_TKC_HTS.DLA_T06)
                ) : (
                  ""
                )}
              </td>
              <td>
                {" "}
                {loadingPlan ? (
                  <LoadingComponent />
                ) : PLAN_DTHU_TKC_HTS.DLA_T07 ? (
                  convertToFloat2Fixed(PLAN_DTHU_TKC_HTS.DLA_T07)
                ) : (
                  ""
                )}
              </td>
              <td>
                {" "}
                {loadingPlan ? (
                  <LoadingComponent />
                ) : PLAN_DTHU_TKC_HTS.DLA_T08 ? (
                  convertToFloat2Fixed(PLAN_DTHU_TKC_HTS.DLA_T08)
                ) : (
                  ""
                )}
              </td>
              <td>
                {" "}
                {loadingPlan ? (
                  <LoadingComponent />
                ) : PLAN_DTHU_TKC_HTS.DLA_T09 ? (
                  convertToFloat2Fixed(PLAN_DTHU_TKC_HTS.DLA_T09)
                ) : (
                  ""
                )}
              </td>
              <td>
                {" "}
                {loadingPlan ? (
                  <LoadingComponent />
                ) : PLAN_DTHU_TKC_HTS.DLA_T10 ? (
                  convertToFloat2Fixed(PLAN_DTHU_TKC_HTS.DLA_T10)
                ) : (
                  ""
                )}
              </td>
              <td>
                {" "}
                {loadingPlan ? (
                  <LoadingComponent />
                ) : PLAN_DTHU_TKC_HTS.DLA_T11 ? (
                  convertToFloat2Fixed(PLAN_DTHU_TKC_HTS.DLA_T11)
                ) : (
                  ""
                )}
              </td>
              <td>
                {" "}
                {loadingPlan ? (
                  <LoadingComponent />
                ) : PLAN_DTHU_TKC_HTS.DLA_T12 ? (
                  convertToFloat2Fixed(PLAN_DTHU_TKC_HTS.DLA_T12)
                ) : (
                  ""
                )}
              </td>
              <td>
                {" "}
                {loadingPlan ? (
                  <LoadingComponent />
                ) : PLAN_DTHU_TKC_HTS.DLA_T13 ? (
                  convertToFloat2Fixed(PLAN_DTHU_TKC_HTS.DLA_T13)
                ) : (
                  ""
                )}
              </td>
              <td>
                {" "}
                {loadingPlan ? (
                  <LoadingComponent />
                ) : PLAN_DTHU_TKC_HTS.DLA_D01 ? (
                  convertToFloat2Fixed(PLAN_DTHU_TKC_HTS.DLA_D01)
                ) : (
                  ""
                )}
              </td>
              <td>
                {" "}
                {loadingPlan ? (
                  <LoadingComponent />
                ) : PLAN_DTHU_TKC_HTS.DLA_D02 ? (
                  convertToFloat2Fixed(PLAN_DTHU_TKC_HTS.DLA_D02)
                ) : (
                  ""
                )}
              </td>
              <td>
                {" "}
                {loadingPlan ? (
                  <LoadingComponent />
                ) : PLAN_DTHU_TKC_HTS.DLA_D03 ? (
                  convertToFloat2Fixed(PLAN_DTHU_TKC_HTS.DLA_D03)
                ) : (
                  ""
                )}
              </td>
              <td>
                {" "}
                {loadingPlan ? (
                  <LoadingComponent />
                ) : PLAN_DTHU_TKC_HTS.DLA_D04 ? (
                  convertToFloat2Fixed(PLAN_DTHU_TKC_HTS.DLA_D04)
                ) : (
                  ""
                )}
              </td>
              <td>
                {" "}
                {loadingPlan ? (
                  <LoadingComponent />
                ) : PLAN_DTHU_TKC_HTS.DLA_D05 ? (
                  convertToFloat2Fixed(PLAN_DTHU_TKC_HTS.DLA_D05)
                ) : (
                  ""
                )}
              </td>
              <td>
                {" "}
                {loadingPlan ? (
                  <LoadingComponent />
                ) : PLAN_DTHU_TKC_HTS.DLA_D06 ? (
                  convertToFloat2Fixed(PLAN_DTHU_TKC_HTS.DLA_D06)
                ) : (
                  ""
                )}
              </td>
              <td>
                {" "}
                {loadingPlan ? (
                  <LoadingComponent />
                ) : PLAN_DTHU_TKC_HTS.TTKDVT ? (
                  convertToFloat2Fixed(PLAN_DTHU_TKC_HTS.TTKDVT)
                ) : (
                  ""
                )}
              </td>
              <td>
                {" "}
                {loadingPlan ? (
                  <LoadingComponent />
                ) : PLAN_DTHU_TKC_HTS.TTKDGPS ? (
                  convertToFloat2Fixed(PLAN_DTHU_TKC_HTS.TTKDGPS)
                ) : (
                  ""
                )}
              </td>
              <td rowSpan={3}>
                {EXEC_DTHU_TKC_HTS.LAST_DATE
                  ? getFormattedDate(new Date(EXEC_DTHU_TKC_HTS.LAST_DATE))
                  : ""}
              </td>
            </tr>
            <tr>
              <td className="td-title-center td-kh fix-col-3">TH</td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
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
              <td className="td-title-center td-kh fix-col-3">%TH</td>
              <td>100%</td>
              <td>100%</td>
              <td>100%</td>
              <td>100%</td>
              <td>100%</td>
              <td>100%</td>
              <td>100%</td>
              <td>100%</td>
              <td>100%</td>
              <td>100%</td>
              <td>100%</td>
              <td>100%</td>
              <td>100%</td>
              <td>100%</td>
              <td>100%</td>
              <td>100%</td>
              <td>100%</td>
              <td>100%</td>
              <td>100%</td>
              <td>100%</td>
              <td>100%</td>
            </tr>
            <tr>
              <td rowSpan={3} className="td-stt td-title-center fix-col-1">
                2
              </td>
              <td rowSpan={3} className="td-title fw-bold td-content fix-col-2">
                Doanh thu Giải pháp số/Nền tảng số{" "}
                <span style={{ fontStyle: "italic" }}>(triệu đồng)</span>
              </td>
              <td className="td-title-center fix-col-3">KH</td>
              <td>
                {" "}
                {loadingPlan ? (
                  <LoadingComponent />
                ) : PLAN_DTHU_GPS.DLA_T01 ? (
                  convertToFloat2Fixed(PLAN_DTHU_GPS.DLA_T01)
                ) : (
                  ""
                )}
              </td>
              <td>
                {" "}
                {loadingPlan ? (
                  <LoadingComponent />
                ) : PLAN_DTHU_GPS.DLA_T02 ? (
                  convertToFloat2Fixed(PLAN_DTHU_GPS.DLA_T03)
                ) : (
                  ""
                )}
              </td>
              <td>
                {" "}
                {loadingPlan ? (
                  <LoadingComponent />
                ) : PLAN_DTHU_GPS.DLA_T02 ? (
                  convertToFloat2Fixed(PLAN_DTHU_GPS.DLA_T03)
                ) : (
                  ""
                )}
              </td>
              <td>
                {" "}
                {loadingPlan ? (
                  <LoadingComponent />
                ) : PLAN_DTHU_GPS.DLA_T03 ? (
                  convertToFloat2Fixed(PLAN_DTHU_GPS.DLA_T04)
                ) : (
                  ""
                )}
              </td>
              <td>
                {" "}
                {loadingPlan ? (
                  <LoadingComponent />
                ) : PLAN_DTHU_GPS.DLA_T05 ? (
                  convertToFloat2Fixed(PLAN_DTHU_GPS.DLA_T05)
                ) : (
                  ""
                )}
              </td>
              <td>
                {" "}
                {loadingPlan ? (
                  <LoadingComponent />
                ) : PLAN_DTHU_GPS.DLA_T06 ? (
                  convertToFloat2Fixed(PLAN_DTHU_GPS.DLA_T06)
                ) : (
                  ""
                )}
              </td>
              <td>
                {" "}
                {loadingPlan ? (
                  <LoadingComponent />
                ) : PLAN_DTHU_GPS.DLA_T07 ? (
                  convertToFloat2Fixed(PLAN_DTHU_GPS.DLA_T07)
                ) : (
                  ""
                )}
              </td>
              <td>
                {" "}
                {loadingPlan ? (
                  <LoadingComponent />
                ) : PLAN_DTHU_GPS.DLA_T08 ? (
                  convertToFloat2Fixed(PLAN_DTHU_GPS.DLA_T08)
                ) : (
                  ""
                )}
              </td>
              <td>
                {" "}
                {loadingPlan ? (
                  <LoadingComponent />
                ) : PLAN_DTHU_GPS.DLA_T09 ? (
                  convertToFloat2Fixed(PLAN_DTHU_GPS.DLA_T09)
                ) : (
                  ""
                )}
              </td>
              <td>
                {" "}
                {loadingPlan ? (
                  <LoadingComponent />
                ) : PLAN_DTHU_GPS.DLA_T10 ? (
                  convertToFloat2Fixed(PLAN_DTHU_GPS.DLA_T10)
                ) : (
                  ""
                )}
              </td>
              <td>
                {" "}
                {loadingPlan ? (
                  <LoadingComponent />
                ) : PLAN_DTHU_GPS.DLA_T11 ? (
                  convertToFloat2Fixed(PLAN_DTHU_GPS.DLA_T11)
                ) : (
                  ""
                )}
              </td>
              <td>
                {" "}
                {loadingPlan ? (
                  <LoadingComponent />
                ) : PLAN_DTHU_GPS.DLA_T12 ? (
                  convertToFloat2Fixed(PLAN_DTHU_GPS.DLA_T12)
                ) : (
                  ""
                )}
              </td>
              <td>
                {" "}
                {loadingPlan ? (
                  <LoadingComponent />
                ) : PLAN_DTHU_GPS.DLA_T13 ? (
                  convertToFloat2Fixed(PLAN_DTHU_GPS.DLA_T13)
                ) : (
                  ""
                )}
              </td>
              <td>
                {" "}
                {loadingPlan ? (
                  <LoadingComponent />
                ) : PLAN_DTHU_GPS.DLA_D01 ? (
                  convertToFloat2Fixed(PLAN_DTHU_GPS.DLA_D01)
                ) : (
                  ""
                )}
              </td>
              <td>
                {" "}
                {loadingPlan ? (
                  <LoadingComponent />
                ) : PLAN_DTHU_GPS.DLA_D02 ? (
                  convertToFloat2Fixed(PLAN_DTHU_GPS.DLA_D02)
                ) : (
                  ""
                )}
              </td>
              <td>
                {" "}
                {loadingPlan ? (
                  <LoadingComponent />
                ) : PLAN_DTHU_GPS.DLA_D03 ? (
                  convertToFloat2Fixed(PLAN_DTHU_GPS.DLA_D03)
                ) : (
                  ""
                )}
              </td>
              <td>
                {" "}
                {loadingPlan ? (
                  <LoadingComponent />
                ) : PLAN_DTHU_GPS.DLA_D04 ? (
                  convertToFloat2Fixed(PLAN_DTHU_GPS.DLA_D04)
                ) : (
                  ""
                )}
              </td>
              <td>
                {" "}
                {loadingPlan ? (
                  <LoadingComponent />
                ) : PLAN_DTHU_GPS.DLA_D05 ? (
                  convertToFloat2Fixed(PLAN_DTHU_GPS.DLA_D05)
                ) : (
                  ""
                )}
              </td>
              <td>
                {" "}
                {loadingPlan ? (
                  <LoadingComponent />
                ) : PLAN_DTHU_GPS.DLA_D06 ? (
                  convertToFloat2Fixed(PLAN_DTHU_GPS.DLA_D06)
                ) : (
                  ""
                )}
              </td>
              <td>
                {" "}
                {loadingPlan ? (
                  <LoadingComponent />
                ) : PLAN_DTHU_GPS.TTKDVT ? (
                  convertToFloat2Fixed(PLAN_DTHU_GPS.TTKDVT)
                ) : (
                  ""
                )}
              </td>
              <td>
                {" "}
                {loadingPlan ? (
                  <LoadingComponent />
                ) : PLAN_DTHU_GPS.TTKDGPS ? (
                  convertToFloat2Fixed(PLAN_DTHU_GPS.TTKDGPS)
                ) : (
                  ""
                )}
              </td>
              <td rowSpan={3}>
                {EXEC_DTHU_GPS.LAST_DATE
                  ? getFormattedDate(new Date(EXEC_DTHU_GPS.LAST_DATE))
                  : ""}
              </td>
            </tr>
            <tr>
              <td className="td-title-center fix-col-3">TH</td>
              <td>
                {loadingExec ? (
                  <LoadingComponent />
                ) : EXEC_DTHU_GPS.DLA_T01 ? (
                  convertToFloat2Fixed(EXEC_DTHU_GPS.DLA_T01 / 1000000)
                ) : (
                  ""
                )}
              </td>
              <td>
                {loadingExec ? (
                  <LoadingComponent />
                ) : EXEC_DTHU_GPS.DLA_T02 ? (
                  convertToFloat2Fixed(EXEC_DTHU_GPS.DLA_T02 / 1000000)
                ) : (
                  ""
                )}
              </td>
              <td>
                {loadingExec ? (
                  <LoadingComponent />
                ) : EXEC_DTHU_GPS.DLA_T03 ? (
                  convertToFloat2Fixed(EXEC_DTHU_GPS.DLA_T03 / 1000000)
                ) : (
                  ""
                )}
              </td>
              <td>
                {loadingExec ? (
                  <LoadingComponent />
                ) : EXEC_DTHU_GPS.DLA_T04 ? (
                  convertToFloat2Fixed(EXEC_DTHU_GPS.DLA_T04 / 1000000)
                ) : (
                  ""
                )}
              </td>
              <td>
                {loadingExec ? (
                  <LoadingComponent />
                ) : EXEC_DTHU_GPS.DLA_T05 ? (
                  convertToFloat2Fixed(EXEC_DTHU_GPS.DLA_T05 / 1000000)
                ) : (
                  ""
                )}
              </td>
              <td>
                {loadingExec ? (
                  <LoadingComponent />
                ) : EXEC_DTHU_GPS.DLA_T06 ? (
                  convertToFloat2Fixed(EXEC_DTHU_GPS.DLA_T06 / 1000000)
                ) : (
                  ""
                )}
              </td>
              <td>
                {loadingExec ? (
                  <LoadingComponent />
                ) : EXEC_DTHU_GPS.DLA_T07 ? (
                  convertToFloat2Fixed(EXEC_DTHU_GPS.DLA_T07 / 1000000)
                ) : (
                  ""
                )}
              </td>
              <td>
                {loadingExec ? (
                  <LoadingComponent />
                ) : EXEC_DTHU_GPS.DLA_T08 ? (
                  convertToFloat2Fixed(EXEC_DTHU_GPS.DLA_T08 / 1000000)
                ) : (
                  ""
                )}
              </td>
              <td>
                {loadingExec ? (
                  <LoadingComponent />
                ) : EXEC_DTHU_GPS.DLA_T09 ? (
                  convertToFloat2Fixed(EXEC_DTHU_GPS.DLA_T09 / 1000000)
                ) : (
                  ""
                )}
              </td>
              <td>
                {loadingExec ? (
                  <LoadingComponent />
                ) : EXEC_DTHU_GPS.DLA_T10 ? (
                  convertToFloat2Fixed(EXEC_DTHU_GPS.DLA_T10 / 1000000)
                ) : (
                  ""
                )}
              </td>
              <td>
                {loadingExec ? (
                  <LoadingComponent />
                ) : EXEC_DTHU_GPS.DLA_T11 ? (
                  convertToFloat2Fixed(EXEC_DTHU_GPS.DLA_T11 / 1000000)
                ) : (
                  ""
                )}
              </td>
              <td>
                {loadingExec ? (
                  <LoadingComponent />
                ) : EXEC_DTHU_GPS.DLA_T12 ? (
                  convertToFloat2Fixed(EXEC_DTHU_GPS.DLA_T12 / 1000000)
                ) : (
                  ""
                )}
              </td>
              <td>
                {loadingExec ? (
                  <LoadingComponent />
                ) : EXEC_DTHU_GPS.DLA_T13 ? (
                  convertToFloat2Fixed(EXEC_DTHU_GPS.DLA_T13 / 1000000)
                ) : (
                  ""
                )}
              </td>
              <td>
                {loadingExec ? (
                  <LoadingComponent />
                ) : EXEC_DTHU_GPS.DLA_D01 ? (
                  convertToFloat2Fixed(EXEC_DTHU_GPS.DLA_D01 / 1000000)
                ) : (
                  ""
                )}
              </td>
              <td>
                {loadingExec ? (
                  <LoadingComponent />
                ) : EXEC_DTHU_GPS.DLA_D02 ? (
                  convertToFloat2Fixed(EXEC_DTHU_GPS.DLA_D02 / 1000000)
                ) : (
                  ""
                )}
              </td>
              <td>
                {loadingExec ? (
                  <LoadingComponent />
                ) : EXEC_DTHU_GPS.DLA_D03 ? (
                  convertToFloat2Fixed(EXEC_DTHU_GPS.DLA_D03 / 1000000)
                ) : (
                  ""
                )}
              </td>
              <td>
                {loadingExec ? (
                  <LoadingComponent />
                ) : EXEC_DTHU_GPS.DLA_D04 ? (
                  convertToFloat2Fixed(EXEC_DTHU_GPS.DLA_D04 / 1000000)
                ) : (
                  ""
                )}
              </td>
              <td>
                {loadingExec ? (
                  <LoadingComponent />
                ) : EXEC_DTHU_GPS.DLA_D05 ? (
                  convertToFloat2Fixed(EXEC_DTHU_GPS.DLA_D05 / 1000000)
                ) : (
                  ""
                )}
              </td>
              <td>
                {loadingExec ? (
                  <LoadingComponent />
                ) : EXEC_DTHU_GPS.DLA_D06 ? (
                  convertToFloat2Fixed(EXEC_DTHU_GPS.DLA_D06 / 1000000)
                ) : (
                  ""
                )}
              </td>
              <td>
                {loadingExec ? (
                  <LoadingComponent />
                ) : EXEC_DTHU_GPS.TTKDVT ? (
                  convertToFloat2Fixed(EXEC_DTHU_GPS.TTDKVT / 1000000)
                ) : (
                  ""
                )}
              </td>
              <td>
                {loadingExec ? (
                  <LoadingComponent />
                ) : EXEC_DTHU_GPS.TTKDGPS ? (
                  convertToFloat2Fixed(EXEC_DTHU_GPS.TTKDGPS / 1000000)
                ) : (
                  ""
                )}
              </td>
            </tr>
            <tr>
              <td className="td-title-center td-kh fix-col-3">%TH</td>
              <td>100%</td>
              <td>100%</td>
              <td>100%</td>
              <td>100%</td>
              <td>100%</td>
              <td>100%</td>
              <td>100%</td>
              <td>100%</td>
              <td>100%</td>
              <td>100%</td>
              <td>100%</td>
              <td>100%</td>
              <td>100%</td>
              <td>100%</td>
              <td>100%</td>
              <td>100%</td>
              <td>100%</td>
              <td>100%</td>
              <td>100%</td>
              <td>100%</td>
              <td>100%</td>
            </tr>
            <tr>
              <td
                className="td-title-center td-stt fix-col-1"
                style={{ fontStyle: "italic", color: "red" }}
              >
                2.1
              </td>
              <td
                className="td-title td-content fix-col-2"
                style={{ fontStyle: "italic", color: "red" }}
              >
                Doanh thu GPS KHCN(TKC)
              </td>
              <td className="td-title-center td-kh fix-col-3">TH</td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td>
                {EXEC_DTHU_GPS_KHCN.LAST_DATE
                  ? getFormattedDate(new Date(EXEC_DTHU_GPS_KHCN.LAST_DATE))
                  : ""}
              </td>
            </tr>
            <tr>
              <td
                className="td-title-center td-stt fix-col-1"
                style={{ fontStyle: "italic", color: "red" }}
              >
                2.2
              </td>
              <td
                className="td-title td-content fix-col-2"
                style={{ fontStyle: "italic", color: "red" }}
              >
                Doanh thu GPS KHDN(Ngoài TKC)
              </td>
              <td className="td-title-center td-kh fix-col-3">TH</td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td>
                {EXEC_DTHU_GPS_KHDN.LAST_DATE
                  ? getFormattedDate(new Date(EXEC_DTHU_GPS_KHDN.LAST_DATE))
                  : ""}
              </td>
            </tr>
            <tr>
              <td
                colSpan={25}
                className=" td-title td-color-blue fw-bold td-stt "
              >
                II. Viễn cảnh khách hàng
              </td>
            </tr>
            <tr>
              <td className="td-title-center ">3</td>
              <td colSpan={24} className="td-title fw-bold td-content">
                Phát triển kênh phân phối
              </td>
            </tr>
            <tr>
              <td rowSpan={3} className="td-title-center  td-stt fix-col-1 ">
                3.1
              </td>
              <td rowSpan={3} className="td-title   td-content fix-col-2">
                Số lượng thuê bao phát triển mới qua kênh C2C
              </td>
              <td className="td-title-center td-kh fix-col-3">KH</td>
              <td>
                {" "}
                {loadingPlan ? (
                  <LoadingComponent />
                ) : PLAN_SL_TB_C2C.DLA_T01 ? (
                  convertToFloat2Fixed(PLAN_SL_TB_C2C.DLA_T01)
                ) : (
                  ""
                )}
              </td>
              <td>
                {" "}
                {loadingPlan ? (
                  <LoadingComponent />
                ) : PLAN_SL_TB_C2C.DLA_T02 ? (
                  convertToFloat2Fixed(PLAN_SL_TB_C2C.DLA_T02)
                ) : (
                  ""
                )}
              </td>
              <td>
                {" "}
                {loadingPlan ? (
                  <LoadingComponent />
                ) : PLAN_SL_TB_C2C.DLA_T03 ? (
                  convertToFloat2Fixed(PLAN_SL_TB_C2C.DLA_T03)
                ) : (
                  ""
                )}
              </td>
              <td>
                {" "}
                {loadingPlan ? (
                  <LoadingComponent />
                ) : PLAN_SL_TB_C2C.DLA_T04 ? (
                  convertToFloat2Fixed(PLAN_SL_TB_C2C.DLA_T04)
                ) : (
                  ""
                )}
              </td>
              <td>
                {" "}
                {loadingPlan ? (
                  <LoadingComponent />
                ) : PLAN_SL_TB_C2C.DLA_T05 ? (
                  convertToFloat2Fixed(PLAN_SL_TB_C2C.DLA_T05)
                ) : (
                  ""
                )}
              </td>
              <td>
                {" "}
                {loadingPlan ? (
                  <LoadingComponent />
                ) : PLAN_SL_TB_C2C.DLA_T06 ? (
                  convertToFloat2Fixed(PLAN_SL_TB_C2C.DLA_T06)
                ) : (
                  ""
                )}
              </td>
              <td>
                {" "}
                {loadingPlan ? (
                  <LoadingComponent />
                ) : PLAN_SL_TB_C2C.DLA_T07 ? (
                  convertToFloat2Fixed(PLAN_SL_TB_C2C.DLA_T07)
                ) : (
                  ""
                )}
              </td>
              <td>
                {" "}
                {loadingPlan ? (
                  <LoadingComponent />
                ) : PLAN_SL_TB_C2C.DLA_T08 ? (
                  convertToFloat2Fixed(PLAN_SL_TB_C2C.DLA_T08)
                ) : (
                  ""
                )}
              </td>
              <td>
                {" "}
                {loadingPlan ? (
                  <LoadingComponent />
                ) : PLAN_SL_TB_C2C.DLA_T09 ? (
                  convertToFloat2Fixed(PLAN_SL_TB_C2C.DLA_T09)
                ) : (
                  ""
                )}
              </td>
              <td>
                {" "}
                {loadingPlan ? (
                  <LoadingComponent />
                ) : PLAN_SL_TB_C2C.DLA_T10 ? (
                  convertToFloat2Fixed(PLAN_SL_TB_C2C.DLA_T10)
                ) : (
                  ""
                )}
              </td>
              <td>
                {" "}
                {loadingPlan ? (
                  <LoadingComponent />
                ) : PLAN_SL_TB_C2C.DLA_T11 ? (
                  convertToFloat2Fixed(PLAN_SL_TB_C2C.DLA_T11)
                ) : (
                  ""
                )}
              </td>
              <td>
                {" "}
                {loadingPlan ? (
                  <LoadingComponent />
                ) : PLAN_SL_TB_C2C.DLA_T12 ? (
                  convertToFloat2Fixed(PLAN_SL_TB_C2C.DLA_T12)
                ) : (
                  ""
                )}
              </td>
              <td>
                {" "}
                {loadingPlan ? (
                  <LoadingComponent />
                ) : PLAN_SL_TB_C2C.DLA_T13 ? (
                  convertToFloat2Fixed(PLAN_SL_TB_C2C.DLA_T13)
                ) : (
                  ""
                )}
              </td>
              <td>
                {" "}
                {loadingPlan ? (
                  <LoadingComponent />
                ) : PLAN_SL_TB_C2C.DLA_D01 ? (
                  convertToFloat2Fixed(PLAN_SL_TB_C2C.DLA_D01)
                ) : (
                  ""
                )}
              </td>
              <td>
                {" "}
                {loadingPlan ? (
                  <LoadingComponent />
                ) : PLAN_SL_TB_C2C.DLA_D02 ? (
                  convertToFloat2Fixed(PLAN_SL_TB_C2C.DLA_D02)
                ) : (
                  ""
                )}
              </td>
              <td>
                {" "}
                {loadingPlan ? (
                  <LoadingComponent />
                ) : PLAN_SL_TB_C2C.DLA_D03 ? (
                  convertToFloat2Fixed(PLAN_SL_TB_C2C.DLA_D03)
                ) : (
                  ""
                )}
              </td>
              <td>
                {" "}
                {loadingPlan ? (
                  <LoadingComponent />
                ) : PLAN_SL_TB_C2C.DLA_D04 ? (
                  convertToFloat2Fixed(PLAN_SL_TB_C2C.DLA_D04)
                ) : (
                  ""
                )}
              </td>
              <td>
                {" "}
                {loadingPlan ? (
                  <LoadingComponent />
                ) : PLAN_SL_TB_C2C.DLA_D05 ? (
                  convertToFloat2Fixed(PLAN_SL_TB_C2C.DLA_D05)
                ) : (
                  ""
                )}
              </td>
              <td>
                {" "}
                {loadingPlan ? (
                  <LoadingComponent />
                ) : PLAN_SL_TB_C2C.DLA_D06 ? (
                  convertToFloat2Fixed(PLAN_SL_TB_C2C.DLA_D06)
                ) : (
                  ""
                )}
              </td>
              <td>
                {" "}
                {loadingPlan ? (
                  <LoadingComponent />
                ) : PLAN_SL_TB_C2C.TTKDVT ? (
                  convertToFloat2Fixed(PLAN_SL_TB_C2C.TTKDVT)
                ) : (
                  ""
                )}
              </td>
              <td>
                {" "}
                {loadingPlan ? (
                  <LoadingComponent />
                ) : PLAN_SL_TB_C2C.TTKDGPS ? (
                  convertToFloat2Fixed(PLAN_SL_TB_C2C.TTKDGPS)
                ) : (
                  ""
                )}
              </td>
              <td rowSpan={3}>
                {EXEC_SL_TB_C2C.LAST_DATE
                  ? getFormattedDate(new Date(EXEC_SL_TB_C2C.LAST_DATE))
                  : ""}
              </td>
            </tr>
            <tr>
              <td className="td-title-center td-kh fix-col-3">TH</td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
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
              <td className="td-title-center td-kh fix-col-3">%TH</td>
              <td>100%</td>
              <td>100%</td>
              <td>100%</td>
              <td>100%</td>
              <td>100%</td>
              <td>100%</td>
              <td>100%</td>
              <td>100%</td>
              <td>100%</td>
              <td>100%</td>
              <td>100%</td>
              <td>100%</td>
              <td>100%</td>
              <td>100%</td>
              <td>100%</td>
              <td>100%</td>
              <td>100%</td>
              <td>100%</td>
              <td>100%</td>
              <td>100%</td>
              <td>100%</td>
            </tr>
            <tr>
              <td rowSpan={3} className="td-title-center  td-stt fix-col-1">
                3.2
              </td>
              <td rowSpan={3} className="td-title   td-content fix-col-2">
                {`Tỷ lệ điểm bán C2C có phát sinh giao dịch(%)`}
              </td>
              <td className="td-title-center td-kh fix-col-3">KH</td>
              <td>
                {" "}
                {loadingPlan ? (
                  <LoadingComponent />
                ) : PLAN_TYLE_GD_C2C.DLA_T01 ? (
                  convertToFloat2Fixed(PLAN_TYLE_GD_C2C.DLA_T01)
                ) : (
                  ""
                )}
              </td>
              <td>
                {" "}
                {loadingPlan ? (
                  <LoadingComponent />
                ) : PLAN_TYLE_GD_C2C.DLA_T02 ? (
                  convertToFloat2Fixed(PLAN_TYLE_GD_C2C.DLA_T02)
                ) : (
                  ""
                )}
              </td>
              <td>
                {" "}
                {loadingPlan ? (
                  <LoadingComponent />
                ) : PLAN_TYLE_GD_C2C.DLA_T03 ? (
                  convertToFloat2Fixed(PLAN_TYLE_GD_C2C.DLA_T03)
                ) : (
                  ""
                )}
              </td>
              <td>
                {" "}
                {loadingPlan ? (
                  <LoadingComponent />
                ) : PLAN_TYLE_GD_C2C.DLA_T04 ? (
                  convertToFloat2Fixed(PLAN_TYLE_GD_C2C.DLA_T04)
                ) : (
                  ""
                )}
              </td>
              <td>
                {" "}
                {loadingPlan ? (
                  <LoadingComponent />
                ) : PLAN_TYLE_GD_C2C.DLA_T05 ? (
                  convertToFloat2Fixed(PLAN_TYLE_GD_C2C.DLA_T05)
                ) : (
                  ""
                )}
              </td>
              <td>
                {" "}
                {loadingPlan ? (
                  <LoadingComponent />
                ) : PLAN_TYLE_GD_C2C.DLA_T06 ? (
                  convertToFloat2Fixed(PLAN_TYLE_GD_C2C.DLA_T06)
                ) : (
                  ""
                )}
              </td>
              <td>
                {" "}
                {loadingPlan ? (
                  <LoadingComponent />
                ) : PLAN_TYLE_GD_C2C.DLA_T07 ? (
                  convertToFloat2Fixed(PLAN_TYLE_GD_C2C.DLA_T07)
                ) : (
                  ""
                )}
              </td>
              <td>
                {" "}
                {loadingPlan ? (
                  <LoadingComponent />
                ) : PLAN_TYLE_GD_C2C.DLA_T08 ? (
                  convertToFloat2Fixed(PLAN_TYLE_GD_C2C.DLA_T08)
                ) : (
                  ""
                )}
              </td>
              <td>
                {" "}
                {loadingPlan ? (
                  <LoadingComponent />
                ) : PLAN_TYLE_GD_C2C.DLA_T09 ? (
                  convertToFloat2Fixed(PLAN_TYLE_GD_C2C.DLA_T09)
                ) : (
                  ""
                )}
              </td>
              <td>
                {" "}
                {loadingPlan ? (
                  <LoadingComponent />
                ) : PLAN_TYLE_GD_C2C.DLA_T10 ? (
                  convertToFloat2Fixed(PLAN_TYLE_GD_C2C.DLA_T10)
                ) : (
                  ""
                )}
              </td>
              <td>
                {" "}
                {loadingPlan ? (
                  <LoadingComponent />
                ) : PLAN_TYLE_GD_C2C.DLA_T11 ? (
                  convertToFloat2Fixed(PLAN_TYLE_GD_C2C.DLA_T11)
                ) : (
                  ""
                )}
              </td>
              <td>
                {" "}
                {loadingPlan ? (
                  <LoadingComponent />
                ) : PLAN_TYLE_GD_C2C.DLA_T12 ? (
                  convertToFloat2Fixed(PLAN_TYLE_GD_C2C.DLA_T12)
                ) : (
                  ""
                )}
              </td>
              <td>
                {" "}
                {loadingPlan ? (
                  <LoadingComponent />
                ) : PLAN_TYLE_GD_C2C.DLA_T13 ? (
                  convertToFloat2Fixed(PLAN_TYLE_GD_C2C.DLA_T13)
                ) : (
                  ""
                )}
              </td>
              <td>
                {" "}
                {loadingPlan ? (
                  <LoadingComponent />
                ) : PLAN_TYLE_GD_C2C.DLA_D01 ? (
                  convertToFloat2Fixed(PLAN_TYLE_GD_C2C.DLA_D01)
                ) : (
                  ""
                )}
              </td>
              <td>
                {" "}
                {loadingPlan ? (
                  <LoadingComponent />
                ) : PLAN_TYLE_GD_C2C.DLA_D02 ? (
                  convertToFloat2Fixed(PLAN_TYLE_GD_C2C.DLA_D02)
                ) : (
                  ""
                )}
              </td>
              <td>
                {" "}
                {loadingPlan ? (
                  <LoadingComponent />
                ) : PLAN_TYLE_GD_C2C.DLA_D03 ? (
                  convertToFloat2Fixed(PLAN_TYLE_GD_C2C.DLA_D03)
                ) : (
                  ""
                )}
              </td>
              <td>
                {" "}
                {loadingPlan ? (
                  <LoadingComponent />
                ) : PLAN_TYLE_GD_C2C.DLA_D04 ? (
                  convertToFloat2Fixed(PLAN_TYLE_GD_C2C.DLA_D04)
                ) : (
                  ""
                )}
              </td>
              <td>
                {" "}
                {loadingPlan ? (
                  <LoadingComponent />
                ) : PLAN_TYLE_GD_C2C.DLA_D05 ? (
                  convertToFloat2Fixed(PLAN_TYLE_GD_C2C.DLA_D05)
                ) : (
                  ""
                )}
              </td>
              <td>
                {" "}
                {loadingPlan ? (
                  <LoadingComponent />
                ) : PLAN_TYLE_GD_C2C.DLA_D06 ? (
                  convertToFloat2Fixed(PLAN_TYLE_GD_C2C.DLA_D06)
                ) : (
                  ""
                )}
              </td>
              <td>
                {" "}
                {loadingPlan ? (
                  <LoadingComponent />
                ) : PLAN_TYLE_GD_C2C.TTKDVT ? (
                  convertToFloat2Fixed(PLAN_TYLE_GD_C2C.TTKDVT)
                ) : (
                  ""
                )}
              </td>
              <td>
                {" "}
                {loadingPlan ? (
                  <LoadingComponent />
                ) : PLAN_TYLE_GD_C2C.TTKDGPS ? (
                  convertToFloat2Fixed(PLAN_TYLE_GD_C2C.TTKDGPS)
                ) : (
                  ""
                )}
              </td>
              <td rowSpan={3}>
                {EXEC_TYLE_GD_C2C.LAST_DATE
                  ? getFormattedDate(new Date(EXEC_TYLE_GD_C2C.LAST_DATE))
                  : ""}
              </td>
            </tr>
            <tr>
              <td className="td-title-center td-kh fix-col-3">TH</td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
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
              <td className="td-title-center td-kh fix-col-3">%TH</td>
              <td>100%</td>
              <td>100%</td>
              <td>100%</td>
              <td>100%</td>
              <td>100%</td>
              <td>100%</td>
              <td>100%</td>
              <td>100%</td>
              <td>100%</td>
              <td>100%</td>
              <td>100%</td>
              <td>100%</td>
              <td>100%</td>
              <td>100%</td>
              <td>100%</td>
              <td>100%</td>
              <td>100%</td>
              <td>100%</td>
              <td>100%</td>
              <td>100%</td>
              <td>100%</td>
            </tr>
            <tr>
              <td className="td-title-center td-stt">4</td>
              <td colSpan={24} className="td-title fw-bold td-content">
                TB PTM mạng MobiFone
              </td>
            </tr>
            <tr>
              <td rowSpan={3} className="td-title-center fix-col-1 ">
                4.1
              </td>
              <td rowSpan={3} className="td-title fix-col-2 ">
                TBTT PTM
              </td>
              <td className="td-title-center td-kh fix-col-3">KH</td>
              <td>
                {" "}
                {loadingPlan ? (
                  <LoadingComponent />
                ) : PLAN_SL_PTM_TBTT.DLA_T01 ? (
                  convertToFloat2Fixed(PLAN_SL_PTM_TBTT.DLA_T01)
                ) : (
                  ""
                )}
              </td>
              <td>
                {" "}
                {loadingPlan ? (
                  <LoadingComponent />
                ) : PLAN_SL_PTM_TBTT.DLA_T02 ? (
                  convertToFloat2Fixed(PLAN_SL_PTM_TBTT.DLA_T02)
                ) : (
                  ""
                )}
              </td>
              <td>
                {" "}
                {loadingPlan ? (
                  <LoadingComponent />
                ) : PLAN_SL_PTM_TBTT.DLA_T03 ? (
                  convertToFloat2Fixed(PLAN_SL_PTM_TBTT.DLA_T03)
                ) : (
                  ""
                )}
              </td>
              <td>
                {" "}
                {loadingPlan ? (
                  <LoadingComponent />
                ) : PLAN_SL_PTM_TBTT.DLA_T04 ? (
                  convertToFloat2Fixed(PLAN_SL_PTM_TBTT.DLA_T04)
                ) : (
                  ""
                )}
              </td>
              <td>
                {" "}
                {loadingPlan ? (
                  <LoadingComponent />
                ) : PLAN_SL_PTM_TBTT.DLA_T05 ? (
                  convertToFloat2Fixed(PLAN_SL_PTM_TBTT.DLA_T05)
                ) : (
                  ""
                )}
              </td>
              <td>
                {" "}
                {loadingPlan ? (
                  <LoadingComponent />
                ) : PLAN_SL_PTM_TBTT.DLA_T06 ? (
                  convertToFloat2Fixed(PLAN_SL_PTM_TBTT.DLA_T06)
                ) : (
                  ""
                )}
              </td>
              <td>
                {" "}
                {loadingPlan ? (
                  <LoadingComponent />
                ) : PLAN_SL_PTM_TBTT.DLA_T07 ? (
                  convertToFloat2Fixed(PLAN_SL_PTM_TBTT.DLA_T07)
                ) : (
                  ""
                )}
              </td>
              <td>
                {" "}
                {loadingPlan ? (
                  <LoadingComponent />
                ) : PLAN_SL_PTM_TBTT.DLA_T08 ? (
                  convertToFloat2Fixed(PLAN_SL_PTM_TBTT.DLA_T08)
                ) : (
                  ""
                )}
              </td>
              <td>
                {" "}
                {loadingPlan ? (
                  <LoadingComponent />
                ) : PLAN_SL_PTM_TBTT.DLA_T09 ? (
                  convertToFloat2Fixed(PLAN_SL_PTM_TBTT.DLA_T09)
                ) : (
                  ""
                )}
              </td>
              <td>
                {" "}
                {loadingPlan ? (
                  <LoadingComponent />
                ) : PLAN_SL_PTM_TBTT.DLA_T10 ? (
                  convertToFloat2Fixed(PLAN_SL_PTM_TBTT.DLA_T10)
                ) : (
                  ""
                )}
              </td>
              <td>
                {" "}
                {loadingPlan ? (
                  <LoadingComponent />
                ) : PLAN_SL_PTM_TBTT.DLA_T11 ? (
                  convertToFloat2Fixed(PLAN_SL_PTM_TBTT.DLA_T11)
                ) : (
                  ""
                )}
              </td>
              <td>
                {" "}
                {loadingPlan ? (
                  <LoadingComponent />
                ) : PLAN_SL_PTM_TBTT.DLA_T12 ? (
                  convertToFloat2Fixed(PLAN_SL_PTM_TBTT.DLA_T12)
                ) : (
                  ""
                )}
              </td>
              <td>
                {" "}
                {loadingPlan ? (
                  <LoadingComponent />
                ) : PLAN_SL_PTM_TBTT.DLA_T13 ? (
                  convertToFloat2Fixed(PLAN_SL_PTM_TBTT.DLA_T13)
                ) : (
                  ""
                )}
              </td>
              <td>
                {" "}
                {loadingPlan ? (
                  <LoadingComponent />
                ) : PLAN_SL_PTM_TBTT.DLA_D01 ? (
                  convertToFloat2Fixed(PLAN_SL_PTM_TBTT.DLA_D01)
                ) : (
                  ""
                )}
              </td>
              <td>
                {" "}
                {loadingPlan ? (
                  <LoadingComponent />
                ) : PLAN_SL_PTM_TBTT.DLA_D02 ? (
                  convertToFloat2Fixed(PLAN_SL_PTM_TBTT.DLA_D02)
                ) : (
                  ""
                )}
              </td>
              <td>
                {" "}
                {loadingPlan ? (
                  <LoadingComponent />
                ) : PLAN_SL_PTM_TBTT.DLA_D03 ? (
                  convertToFloat2Fixed(PLAN_SL_PTM_TBTT.DLA_D03)
                ) : (
                  ""
                )}
              </td>
              <td>
                {" "}
                {loadingPlan ? (
                  <LoadingComponent />
                ) : PLAN_SL_PTM_TBTT.DLA_D04 ? (
                  convertToFloat2Fixed(PLAN_SL_PTM_TBTT.DLA_D04)
                ) : (
                  ""
                )}
              </td>
              <td>
                {" "}
                {loadingPlan ? (
                  <LoadingComponent />
                ) : PLAN_SL_PTM_TBTT.DLA_D05 ? (
                  convertToFloat2Fixed(PLAN_SL_PTM_TBTT.DLA_D05)
                ) : (
                  ""
                )}
              </td>
              <td>
                {" "}
                {loadingPlan ? (
                  <LoadingComponent />
                ) : PLAN_SL_PTM_TBTT.DLA_D06 ? (
                  convertToFloat2Fixed(PLAN_SL_PTM_TBTT.DLA_D06)
                ) : (
                  ""
                )}
              </td>
              <td>
                {" "}
                {loadingPlan ? (
                  <LoadingComponent />
                ) : PLAN_SL_PTM_TBTT.TTKDVT ? (
                  convertToFloat2Fixed(PLAN_SL_PTM_TBTT.TTKDVT)
                ) : (
                  ""
                )}
              </td>
              <td>
                {" "}
                {loadingPlan ? (
                  <LoadingComponent />
                ) : PLAN_SL_PTM_TBTT.TTKDGPS ? (
                  convertToFloat2Fixed(PLAN_SL_PTM_TBTT.TTKDGPS)
                ) : (
                  ""
                )}
              </td>
              <td rowSpan={3}>
                {EXEC_SL_PTM_TBTT.LAST_DATE
                  ? getFormattedDate(new Date(EXEC_SL_PTM_TBTT.LAST_DATE))
                  : ""}
              </td>
            </tr>
            <tr>
              <td className="td-title-center td-kh fix-col-3">TH</td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
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
              <td className="td-title-center td-kh fix-col-3">%TH</td>
              <td>100%</td>
              <td>100%</td>
              <td>100%</td>
              <td>100%</td>
              <td>100%</td>
              <td>100%</td>
              <td>100%</td>
              <td>100%</td>
              <td>100%</td>
              <td>100%</td>
              <td>100%</td>
              <td>100%</td>
              <td>100%</td>
              <td>100%</td>
              <td>100%</td>
              <td>100%</td>
              <td>100%</td>
              <td>100%</td>
              <td>100%</td>
              <td>100%</td>
              <td>100%</td>
            </tr>
            <tr>
              <td rowSpan={3} className="td-title-center  td-stt fix-col-1">
                4.2
              </td>
              <td rowSpan={3} className="td-title   td-content fix-col-2">
                {`TBTS PTM (thoại)`}
              </td>
              <td className="td-title-center td-kh fix-col-3">KH</td>
              <td>
                {" "}
                {loadingPlan ? (
                  <LoadingComponent />
                ) : PLAN_SL_TBTS_PTM_THOAI.DLA_T01 ? (
                  convertToFloat2Fixed(PLAN_SL_TBTS_PTM_THOAI.DLA_T01)
                ) : (
                  ""
                )}
              </td>
              <td>
                {" "}
                {loadingPlan ? (
                  <LoadingComponent />
                ) : PLAN_SL_TBTS_PTM_THOAI.DLA_T02 ? (
                  convertToFloat2Fixed(PLAN_SL_TBTS_PTM_THOAI.DLA_T02)
                ) : (
                  ""
                )}
              </td>
              <td>
                {" "}
                {loadingPlan ? (
                  <LoadingComponent />
                ) : PLAN_SL_TBTS_PTM_THOAI.DLA_T03 ? (
                  convertToFloat2Fixed(PLAN_SL_TBTS_PTM_THOAI.DLA_T03)
                ) : (
                  ""
                )}
              </td>
              <td>
                {" "}
                {loadingPlan ? (
                  <LoadingComponent />
                ) : PLAN_SL_TBTS_PTM_THOAI.DLA_T04 ? (
                  convertToFloat2Fixed(PLAN_SL_TBTS_PTM_THOAI.DLA_T04)
                ) : (
                  ""
                )}
              </td>
              <td>
                {" "}
                {loadingPlan ? (
                  <LoadingComponent />
                ) : PLAN_SL_TBTS_PTM_THOAI.DLA_T05 ? (
                  convertToFloat2Fixed(PLAN_SL_TBTS_PTM_THOAI.DLA_T05)
                ) : (
                  ""
                )}
              </td>
              <td>
                {" "}
                {loadingPlan ? (
                  <LoadingComponent />
                ) : PLAN_SL_TBTS_PTM_THOAI.DLA_T06 ? (
                  convertToFloat2Fixed(PLAN_SL_TBTS_PTM_THOAI.DLA_T06)
                ) : (
                  ""
                )}
              </td>
              <td>
                {" "}
                {loadingPlan ? (
                  <LoadingComponent />
                ) : PLAN_SL_TBTS_PTM_THOAI.DLA_T07 ? (
                  convertToFloat2Fixed(PLAN_SL_TBTS_PTM_THOAI.DLA_T07)
                ) : (
                  ""
                )}
              </td>
              <td>
                {" "}
                {loadingPlan ? (
                  <LoadingComponent />
                ) : PLAN_SL_TBTS_PTM_THOAI.DLA_T08 ? (
                  convertToFloat2Fixed(PLAN_SL_TBTS_PTM_THOAI.DLA_T08)
                ) : (
                  ""
                )}
              </td>
              <td>
                {" "}
                {loadingPlan ? (
                  <LoadingComponent />
                ) : PLAN_SL_TBTS_PTM_THOAI.DLA_T09 ? (
                  convertToFloat2Fixed(PLAN_SL_TBTS_PTM_THOAI.DLA_T09)
                ) : (
                  ""
                )}
              </td>
              <td>
                {" "}
                {loadingPlan ? (
                  <LoadingComponent />
                ) : PLAN_SL_TBTS_PTM_THOAI.DLA_T10 ? (
                  convertToFloat2Fixed(PLAN_SL_TBTS_PTM_THOAI.DLA_T10)
                ) : (
                  ""
                )}
              </td>
              <td>
                {" "}
                {loadingPlan ? (
                  <LoadingComponent />
                ) : PLAN_SL_TBTS_PTM_THOAI.DLA_T11 ? (
                  convertToFloat2Fixed(PLAN_SL_TBTS_PTM_THOAI.DLA_T11)
                ) : (
                  ""
                )}
              </td>
              <td>
                {" "}
                {loadingPlan ? (
                  <LoadingComponent />
                ) : PLAN_SL_TBTS_PTM_THOAI.DLA_T12 ? (
                  convertToFloat2Fixed(PLAN_SL_TBTS_PTM_THOAI.DLA_T12)
                ) : (
                  ""
                )}
              </td>
              <td>
                {" "}
                {loadingPlan ? (
                  <LoadingComponent />
                ) : PLAN_SL_TBTS_PTM_THOAI.DLA_T13 ? (
                  convertToFloat2Fixed(PLAN_SL_TBTS_PTM_THOAI.DLA_T13)
                ) : (
                  ""
                )}
              </td>
              <td>
                {" "}
                {loadingPlan ? (
                  <LoadingComponent />
                ) : PLAN_SL_TBTS_PTM_THOAI.DLA_D01 ? (
                  convertToFloat2Fixed(PLAN_SL_TBTS_PTM_THOAI.DLA_D01)
                ) : (
                  ""
                )}
              </td>
              <td>
                {" "}
                {loadingPlan ? (
                  <LoadingComponent />
                ) : PLAN_SL_TBTS_PTM_THOAI.DLA_D02 ? (
                  convertToFloat2Fixed(PLAN_SL_TBTS_PTM_THOAI.DLA_D02)
                ) : (
                  ""
                )}
              </td>
              <td>
                {" "}
                {loadingPlan ? (
                  <LoadingComponent />
                ) : PLAN_SL_TBTS_PTM_THOAI.DLA_D03 ? (
                  convertToFloat2Fixed(PLAN_SL_TBTS_PTM_THOAI.DLA_D03)
                ) : (
                  ""
                )}
              </td>
              <td>
                {" "}
                {loadingPlan ? (
                  <LoadingComponent />
                ) : PLAN_SL_TBTS_PTM_THOAI.DLA_D04 ? (
                  convertToFloat2Fixed(PLAN_SL_TBTS_PTM_THOAI.DLA_D04)
                ) : (
                  ""
                )}
              </td>
              <td>
                {" "}
                {loadingPlan ? (
                  <LoadingComponent />
                ) : PLAN_SL_TBTS_PTM_THOAI.DLA_D05 ? (
                  convertToFloat2Fixed(PLAN_SL_TBTS_PTM_THOAI.DLA_D05)
                ) : (
                  ""
                )}
              </td>
              <td>
                {" "}
                {loadingPlan ? (
                  <LoadingComponent />
                ) : PLAN_SL_TBTS_PTM_THOAI.DLA_D06 ? (
                  convertToFloat2Fixed(PLAN_SL_TBTS_PTM_THOAI.DLA_D06)
                ) : (
                  ""
                )}
              </td>
              <td>
                {" "}
                {loadingPlan ? (
                  <LoadingComponent />
                ) : PLAN_SL_TBTS_PTM_THOAI.TTKDVT ? (
                  convertToFloat2Fixed(PLAN_SL_TBTS_PTM_THOAI.TTKDVT)
                ) : (
                  ""
                )}
              </td>
              <td>
                {" "}
                {loadingPlan ? (
                  <LoadingComponent />
                ) : PLAN_SL_TBTS_PTM_THOAI.TTKDGPS ? (
                  convertToFloat2Fixed(PLAN_SL_TBTS_PTM_THOAI.TTKDGPS)
                ) : (
                  ""
                )}
              </td>
              <td rowSpan={3}>
                {EXEC_SL_TBTS_PTM_THOAI.LAST_DATE
                  ? getFormattedDate(new Date(EXEC_SL_TBTS_PTM_THOAI.LAST_DATE))
                  : ""}
              </td>
            </tr>
            <tr>
              <td className="td-title-center td-kh fix-col-3">TH</td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
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
              <td className="td-title-center td-kh fix-col-3">%TH</td>
              <td>100%</td>
              <td>100%</td>
              <td>100%</td>
              <td>100%</td>
              <td>100%</td>
              <td>100%</td>
              <td>100%</td>
              <td>100%</td>
              <td>100%</td>
              <td>100%</td>
              <td>100%</td>
              <td>100%</td>
              <td>100%</td>
              <td>100%</td>
              <td>100%</td>
              <td>100%</td>
              <td>100%</td>
              <td>100%</td>
              <td>100%</td>
              <td>100%</td>
              <td>100%</td>
            </tr>
            <tr>
              <td rowSpan={3} className="td-title-center  td-stt fix-col-1">
                4.3
              </td>
              <td rowSpan={3} className="td-title   td-content fix-col-2">
                {`TB PTM M2M`}
              </td>
              <td className="td-title-center td-kh fix-col-3">KH</td>
              <td>
                {" "}
                {loadingPlan ? (
                  <LoadingComponent />
                ) : PLAN_SL_TB_PTM_M2M.DLA_T01 ? (
                  convertToFloat2Fixed(PLAN_SL_TB_PTM_M2M.DLA_T01)
                ) : (
                  ""
                )}
              </td>
              <td>
                {" "}
                {loadingPlan ? (
                  <LoadingComponent />
                ) : PLAN_SL_TB_PTM_M2M.DLA_T02 ? (
                  convertToFloat2Fixed(PLAN_SL_TB_PTM_M2M.DLA_T02)
                ) : (
                  ""
                )}
              </td>
              <td>
                {" "}
                {loadingPlan ? (
                  <LoadingComponent />
                ) : PLAN_SL_TB_PTM_M2M.DLA_T03 ? (
                  convertToFloat2Fixed(PLAN_SL_TB_PTM_M2M.DLA_T03)
                ) : (
                  ""
                )}
              </td>
              <td>
                {" "}
                {loadingPlan ? (
                  <LoadingComponent />
                ) : PLAN_SL_TB_PTM_M2M.DLA_T04 ? (
                  convertToFloat2Fixed(PLAN_SL_TB_PTM_M2M.DLA_T04)
                ) : (
                  ""
                )}
              </td>
              <td>
                {" "}
                {loadingPlan ? (
                  <LoadingComponent />
                ) : PLAN_SL_TB_PTM_M2M.DLA_T05 ? (
                  convertToFloat2Fixed(PLAN_SL_TB_PTM_M2M.DLA_T05)
                ) : (
                  ""
                )}
              </td>
              <td>
                {" "}
                {loadingPlan ? (
                  <LoadingComponent />
                ) : PLAN_SL_TB_PTM_M2M.DLA_T06 ? (
                  convertToFloat2Fixed(PLAN_SL_TB_PTM_M2M.DLA_T06)
                ) : (
                  ""
                )}
              </td>
              <td>
                {" "}
                {loadingPlan ? (
                  <LoadingComponent />
                ) : PLAN_SL_TB_PTM_M2M.DLA_T07 ? (
                  convertToFloat2Fixed(PLAN_SL_TB_PTM_M2M.DLA_T07)
                ) : (
                  ""
                )}
              </td>
              <td>
                {" "}
                {loadingPlan ? (
                  <LoadingComponent />
                ) : PLAN_SL_TB_PTM_M2M.DLA_T08 ? (
                  convertToFloat2Fixed(PLAN_SL_TB_PTM_M2M.DLA_T08)
                ) : (
                  ""
                )}
              </td>
              <td>
                {" "}
                {loadingPlan ? (
                  <LoadingComponent />
                ) : PLAN_SL_TB_PTM_M2M.DLA_T09 ? (
                  convertToFloat2Fixed(PLAN_SL_TB_PTM_M2M.DLA_T09)
                ) : (
                  ""
                )}
              </td>
              <td>
                {" "}
                {loadingPlan ? (
                  <LoadingComponent />
                ) : PLAN_SL_TB_PTM_M2M.DLA_T10 ? (
                  convertToFloat2Fixed(PLAN_SL_TB_PTM_M2M.DLA_T10)
                ) : (
                  ""
                )}
              </td>
              <td>
                {" "}
                {loadingPlan ? (
                  <LoadingComponent />
                ) : PLAN_SL_TB_PTM_M2M.DLA_T11 ? (
                  convertToFloat2Fixed(PLAN_SL_TB_PTM_M2M.DLA_T11)
                ) : (
                  ""
                )}
              </td>
              <td>
                {" "}
                {loadingPlan ? (
                  <LoadingComponent />
                ) : PLAN_SL_TB_PTM_M2M.DLA_T12 ? (
                  convertToFloat2Fixed(PLAN_SL_TB_PTM_M2M.DLA_T12)
                ) : (
                  ""
                )}
              </td>
              <td>
                {" "}
                {loadingPlan ? (
                  <LoadingComponent />
                ) : PLAN_SL_TB_PTM_M2M.DLA_T13 ? (
                  convertToFloat2Fixed(PLAN_SL_TB_PTM_M2M.DLA_T13)
                ) : (
                  ""
                )}
              </td>
              <td>
                {" "}
                {loadingPlan ? (
                  <LoadingComponent />
                ) : PLAN_SL_TB_PTM_M2M.DLA_D01 ? (
                  convertToFloat2Fixed(PLAN_SL_TB_PTM_M2M.DLA_D01)
                ) : (
                  ""
                )}
              </td>
              <td>
                {" "}
                {loadingPlan ? (
                  <LoadingComponent />
                ) : PLAN_SL_TB_PTM_M2M.DLA_D02 ? (
                  convertToFloat2Fixed(PLAN_SL_TB_PTM_M2M.DLA_D02)
                ) : (
                  ""
                )}
              </td>
              <td>
                {" "}
                {loadingPlan ? (
                  <LoadingComponent />
                ) : PLAN_SL_TB_PTM_M2M.DLA_D03 ? (
                  convertToFloat2Fixed(PLAN_SL_TB_PTM_M2M.DLA_D03)
                ) : (
                  ""
                )}
              </td>
              <td>
                {" "}
                {loadingPlan ? (
                  <LoadingComponent />
                ) : PLAN_SL_TB_PTM_M2M.DLA_D04 ? (
                  convertToFloat2Fixed(PLAN_SL_TB_PTM_M2M.DLA_D04)
                ) : (
                  ""
                )}
              </td>
              <td>
                {" "}
                {loadingPlan ? (
                  <LoadingComponent />
                ) : PLAN_SL_TB_PTM_M2M.DLA_D05 ? (
                  convertToFloat2Fixed(PLAN_SL_TB_PTM_M2M.DLA_D05)
                ) : (
                  ""
                )}
              </td>
              <td>
                {" "}
                {loadingPlan ? (
                  <LoadingComponent />
                ) : PLAN_SL_TB_PTM_M2M.DLA_D06 ? (
                  convertToFloat2Fixed(PLAN_SL_TB_PTM_M2M.DLA_D06)
                ) : (
                  ""
                )}
              </td>
              <td>
                {" "}
                {loadingPlan ? (
                  <LoadingComponent />
                ) : PLAN_SL_TB_PTM_M2M.TTKDVT ? (
                  convertToFloat2Fixed(PLAN_SL_TB_PTM_M2M.TTKDVT)
                ) : (
                  ""
                )}
              </td>
              <td>
                {" "}
                {loadingPlan ? (
                  <LoadingComponent />
                ) : PLAN_SL_TB_PTM_M2M.TTKDGPS ? (
                  convertToFloat2Fixed(PLAN_SL_TB_PTM_M2M.TTKDGPS)
                ) : (
                  ""
                )}
              </td>
              <td rowSpan={3}>
                {EXEC_SL_TB_PTM_M2M.LAST_DATE
                  ? getFormattedDate(new Date(EXEC_SL_TB_PTM_M2M.LAST_DATE))
                  : ""}
              </td>
            </tr>
            <tr>
              <td className="td-title-center td-kh fix-col-3">TH</td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
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
              <td className="td-title-center td-kh fix-col-3">%TH</td>
              <td>100%</td>
              <td>100%</td>
              <td>100%</td>
              <td>100%</td>
              <td>100%</td>
              <td>100%</td>
              <td>100%</td>
              <td>100%</td>
              <td>100%</td>
              <td>100%</td>
              <td>100%</td>
              <td>100%</td>
              <td>100%</td>
              <td>100%</td>
              <td>100%</td>
              <td>100%</td>
              <td>100%</td>
              <td>100%</td>
              <td>100%</td>
              <td>100%</td>
              <td>100%</td>
            </tr>
            <tr>
              <td
                rowSpan={3}
                className="td-title-center fw-bold td-stt fix-col-1"
              >
                5
              </td>
              <td
                rowSpan={3}
                className="td-title  fw-bold td-content fix-col-2"
              >
                {`TB PTM mạng Saymee`}
              </td>
              <td className="td-title-center fix-col-3">KH</td>
              <td>
                {" "}
                {loadingPlan ? (
                  <LoadingComponent />
                ) : PLAN_TB_PTM_SAYMEE.DLA_T01 ? (
                  convertToFloat2Fixed(PLAN_TB_PTM_SAYMEE.DLA_T01)
                ) : (
                  ""
                )}
              </td>
              <td>
                {" "}
                {loadingPlan ? (
                  <LoadingComponent />
                ) : PLAN_TB_PTM_SAYMEE.DLA_T02 ? (
                  convertToFloat2Fixed(PLAN_TB_PTM_SAYMEE.DLA_T02)
                ) : (
                  ""
                )}
              </td>
              <td>
                {" "}
                {loadingPlan ? (
                  <LoadingComponent />
                ) : PLAN_TB_PTM_SAYMEE.DLA_T03 ? (
                  convertToFloat2Fixed(PLAN_TB_PTM_SAYMEE.DLA_T03)
                ) : (
                  ""
                )}
              </td>
              <td>
                {" "}
                {loadingPlan ? (
                  <LoadingComponent />
                ) : PLAN_TB_PTM_SAYMEE.DLA_T04 ? (
                  convertToFloat2Fixed(PLAN_TB_PTM_SAYMEE.DLA_T04)
                ) : (
                  ""
                )}
              </td>
              <td>
                {" "}
                {loadingPlan ? (
                  <LoadingComponent />
                ) : PLAN_TB_PTM_SAYMEE.DLA_T05 ? (
                  convertToFloat2Fixed(PLAN_TB_PTM_SAYMEE.DLA_T05)
                ) : (
                  ""
                )}
              </td>
              <td>
                {" "}
                {loadingPlan ? (
                  <LoadingComponent />
                ) : PLAN_TB_PTM_SAYMEE.DLA_T06 ? (
                  convertToFloat2Fixed(PLAN_TB_PTM_SAYMEE.DLA_T06)
                ) : (
                  ""
                )}
              </td>
              <td>
                {" "}
                {loadingPlan ? (
                  <LoadingComponent />
                ) : PLAN_TB_PTM_SAYMEE.DLA_T07 ? (
                  convertToFloat2Fixed(PLAN_TB_PTM_SAYMEE.DLA_T07)
                ) : (
                  ""
                )}
              </td>
              <td>
                {" "}
                {loadingPlan ? (
                  <LoadingComponent />
                ) : PLAN_TB_PTM_SAYMEE.DLA_T08 ? (
                  convertToFloat2Fixed(PLAN_TB_PTM_SAYMEE.DLA_T08)
                ) : (
                  ""
                )}
              </td>
              <td>
                {" "}
                {loadingPlan ? (
                  <LoadingComponent />
                ) : PLAN_TB_PTM_SAYMEE.DLA_T09 ? (
                  convertToFloat2Fixed(PLAN_TB_PTM_SAYMEE.DLA_T09)
                ) : (
                  ""
                )}
              </td>
              <td>
                {" "}
                {loadingPlan ? (
                  <LoadingComponent />
                ) : PLAN_TB_PTM_SAYMEE.DLA_T10 ? (
                  convertToFloat2Fixed(PLAN_TB_PTM_SAYMEE.DLA_T10)
                ) : (
                  ""
                )}
              </td>
              <td>
                {" "}
                {loadingPlan ? (
                  <LoadingComponent />
                ) : PLAN_TB_PTM_SAYMEE.DLA_T11 ? (
                  convertToFloat2Fixed(PLAN_TB_PTM_SAYMEE.DLA_T11)
                ) : (
                  ""
                )}
              </td>
              <td>
                {" "}
                {loadingPlan ? (
                  <LoadingComponent />
                ) : PLAN_TB_PTM_SAYMEE.DLA_T12 ? (
                  convertToFloat2Fixed(PLAN_TB_PTM_SAYMEE.DLA_T12)
                ) : (
                  ""
                )}
              </td>
              <td>
                {" "}
                {loadingPlan ? (
                  <LoadingComponent />
                ) : PLAN_TB_PTM_SAYMEE.DLA_T13 ? (
                  convertToFloat2Fixed(PLAN_TB_PTM_SAYMEE.DLA_T13)
                ) : (
                  ""
                )}
              </td>
              <td>
                {" "}
                {loadingPlan ? (
                  <LoadingComponent />
                ) : PLAN_TB_PTM_SAYMEE.DLA_D01 ? (
                  convertToFloat2Fixed(PLAN_TB_PTM_SAYMEE.DLA_D01)
                ) : (
                  ""
                )}
              </td>
              <td>
                {" "}
                {loadingPlan ? (
                  <LoadingComponent />
                ) : PLAN_TB_PTM_SAYMEE.DLA_D02 ? (
                  convertToFloat2Fixed(PLAN_TB_PTM_SAYMEE.DLA_D02)
                ) : (
                  ""
                )}
              </td>
              <td>
                {" "}
                {loadingPlan ? (
                  <LoadingComponent />
                ) : PLAN_TB_PTM_SAYMEE.DLA_D03 ? (
                  convertToFloat2Fixed(PLAN_TB_PTM_SAYMEE.DLA_D03)
                ) : (
                  ""
                )}
              </td>
              <td>
                {" "}
                {loadingPlan ? (
                  <LoadingComponent />
                ) : PLAN_TB_PTM_SAYMEE.DLA_D04 ? (
                  convertToFloat2Fixed(PLAN_TB_PTM_SAYMEE.DLA_D04)
                ) : (
                  ""
                )}
              </td>
              <td>
                {" "}
                {loadingPlan ? (
                  <LoadingComponent />
                ) : PLAN_TB_PTM_SAYMEE.DLA_D05 ? (
                  convertToFloat2Fixed(PLAN_TB_PTM_SAYMEE.DLA_D05)
                ) : (
                  ""
                )}
              </td>
              <td>
                {" "}
                {loadingPlan ? (
                  <LoadingComponent />
                ) : PLAN_TB_PTM_SAYMEE.DLA_D06 ? (
                  convertToFloat2Fixed(PLAN_TB_PTM_SAYMEE.DLA_D06)
                ) : (
                  ""
                )}
              </td>
              <td>
                {" "}
                {loadingPlan ? (
                  <LoadingComponent />
                ) : PLAN_TB_PTM_SAYMEE.TTKDVT ? (
                  convertToFloat2Fixed(PLAN_TB_PTM_SAYMEE.TTKDVT)
                ) : (
                  ""
                )}
              </td>
              <td>
                {" "}
                {loadingPlan ? (
                  <LoadingComponent />
                ) : PLAN_TB_PTM_SAYMEE.TTKDGPS ? (
                  convertToFloat2Fixed(PLAN_TB_PTM_SAYMEE.TTKDGPS)
                ) : (
                  ""
                )}
              </td>
              <td rowSpan={3}>
                {EXEC_TB_PTM_SAYMEE.LAST_DATE
                  ? getFormattedDate(new Date(EXEC_TB_PTM_SAYMEE.LAST_DATE))
                  : ""}
              </td>
            </tr>
            <tr>
              <td className="td-title-center td-kh fix-col-3">TH</td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
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
              <td className="td-title-center td-kh fix-col-3">%TH</td>
              <td>100%</td>
              <td>100%</td>
              <td>100%</td>
              <td>100%</td>
              <td>100%</td>
              <td>100%</td>
              <td>100%</td>
              <td>100%</td>
              <td>100%</td>
              <td>100%</td>
              <td>100%</td>
              <td>100%</td>
              <td>100%</td>
              <td>100%</td>
              <td>100%</td>
              <td>100%</td>
              <td>100%</td>
              <td>100%</td>
              <td>100%</td>
              <td>100%</td>
              <td>100%</td>
            </tr>
            <tr>
              <td
                rowSpan={3}
                className="td-title-center fw-bold td-stt fix-col-1"
              >
                6
              </td>
              <td
                rowSpan={3}
                className="td-title  fw-bold td-content fix-col-2"
              >
                {`TB PTM MobiFiber`}
              </td>
              <td className="td-title-center td-kh fix-col-3">KH</td>
              <td>
                {" "}
                {loadingPlan ? (
                  <LoadingComponent />
                ) : PLAN_TB_PTM_FIBER.DLA_T01 ? (
                  convertToFloat2Fixed(PLAN_TB_PTM_FIBER.DLA_T01)
                ) : (
                  ""
                )}
              </td>
              <td>
                {" "}
                {loadingPlan ? (
                  <LoadingComponent />
                ) : PLAN_TB_PTM_FIBER.DLA_T02 ? (
                  convertToFloat2Fixed(PLAN_TB_PTM_FIBER.DLA_T02)
                ) : (
                  ""
                )}
              </td>
              <td>
                {" "}
                {loadingPlan ? (
                  <LoadingComponent />
                ) : PLAN_TB_PTM_FIBER.DLA_T03 ? (
                  convertToFloat2Fixed(PLAN_TB_PTM_FIBER.DLA_T03)
                ) : (
                  ""
                )}
              </td>
              <td>
                {" "}
                {loadingPlan ? (
                  <LoadingComponent />
                ) : PLAN_TB_PTM_FIBER.DLA_T04 ? (
                  convertToFloat2Fixed(PLAN_TB_PTM_FIBER.DLA_T04)
                ) : (
                  ""
                )}
              </td>
              <td>
                {" "}
                {loadingPlan ? (
                  <LoadingComponent />
                ) : PLAN_TB_PTM_FIBER.DLA_T05 ? (
                  convertToFloat2Fixed(PLAN_TB_PTM_FIBER.DLA_T05)
                ) : (
                  ""
                )}
              </td>
              <td>
                {" "}
                {loadingPlan ? (
                  <LoadingComponent />
                ) : PLAN_TB_PTM_FIBER.DLA_T06 ? (
                  convertToFloat2Fixed(PLAN_TB_PTM_FIBER.DLA_T06)
                ) : (
                  ""
                )}
              </td>
              <td>
                {" "}
                {loadingPlan ? (
                  <LoadingComponent />
                ) : PLAN_TB_PTM_FIBER.DLA_T07 ? (
                  convertToFloat2Fixed(PLAN_TB_PTM_FIBER.DLA_T07)
                ) : (
                  ""
                )}
              </td>
              <td>
                {" "}
                {loadingPlan ? (
                  <LoadingComponent />
                ) : PLAN_TB_PTM_FIBER.DLA_T08 ? (
                  convertToFloat2Fixed(PLAN_TB_PTM_FIBER.DLA_T08)
                ) : (
                  ""
                )}
              </td>
              <td>
                {" "}
                {loadingPlan ? (
                  <LoadingComponent />
                ) : PLAN_TB_PTM_FIBER.DLA_T09 ? (
                  convertToFloat2Fixed(PLAN_TB_PTM_FIBER.DLA_T09)
                ) : (
                  ""
                )}
              </td>
              <td>
                {" "}
                {loadingPlan ? (
                  <LoadingComponent />
                ) : PLAN_TB_PTM_FIBER.DLA_T10 ? (
                  convertToFloat2Fixed(PLAN_TB_PTM_FIBER.DLA_T10)
                ) : (
                  ""
                )}
              </td>
              <td>
                {" "}
                {loadingPlan ? (
                  <LoadingComponent />
                ) : PLAN_TB_PTM_FIBER.DLA_T11 ? (
                  convertToFloat2Fixed(PLAN_TB_PTM_FIBER.DLA_T11)
                ) : (
                  ""
                )}
              </td>
              <td>
                {" "}
                {loadingPlan ? (
                  <LoadingComponent />
                ) : PLAN_TB_PTM_FIBER.DLA_T12 ? (
                  convertToFloat2Fixed(PLAN_TB_PTM_FIBER.DLA_T12)
                ) : (
                  ""
                )}
              </td>
              <td>
                {" "}
                {loadingPlan ? (
                  <LoadingComponent />
                ) : PLAN_TB_PTM_FIBER.DLA_T13 ? (
                  convertToFloat2Fixed(PLAN_TB_PTM_FIBER.DLA_T13)
                ) : (
                  ""
                )}
              </td>
              <td>
                {" "}
                {loadingPlan ? (
                  <LoadingComponent />
                ) : PLAN_TB_PTM_FIBER.DLA_D01 ? (
                  convertToFloat2Fixed(PLAN_TB_PTM_FIBER.DLA_D01)
                ) : (
                  ""
                )}
              </td>
              <td>
                {" "}
                {loadingPlan ? (
                  <LoadingComponent />
                ) : PLAN_TB_PTM_FIBER.DLA_D02 ? (
                  convertToFloat2Fixed(PLAN_TB_PTM_FIBER.DLA_D02)
                ) : (
                  ""
                )}
              </td>
              <td>
                {" "}
                {loadingPlan ? (
                  <LoadingComponent />
                ) : PLAN_TB_PTM_FIBER.DLA_D03 ? (
                  convertToFloat2Fixed(PLAN_TB_PTM_FIBER.DLA_D03)
                ) : (
                  ""
                )}
              </td>
              <td>
                {" "}
                {loadingPlan ? (
                  <LoadingComponent />
                ) : PLAN_TB_PTM_FIBER.DLA_D04 ? (
                  convertToFloat2Fixed(PLAN_TB_PTM_FIBER.DLA_D04)
                ) : (
                  ""
                )}
              </td>
              <td>
                {" "}
                {loadingPlan ? (
                  <LoadingComponent />
                ) : PLAN_TB_PTM_FIBER.DLA_D05 ? (
                  convertToFloat2Fixed(PLAN_TB_PTM_FIBER.DLA_D05)
                ) : (
                  ""
                )}
              </td>
              <td>
                {" "}
                {loadingPlan ? (
                  <LoadingComponent />
                ) : PLAN_TB_PTM_FIBER.DLA_D06 ? (
                  convertToFloat2Fixed(PLAN_TB_PTM_FIBER.DLA_D06)
                ) : (
                  ""
                )}
              </td>
              <td>
                {" "}
                {loadingPlan ? (
                  <LoadingComponent />
                ) : PLAN_TB_PTM_FIBER.TTKDVT ? (
                  convertToFloat2Fixed(PLAN_TB_PTM_FIBER.TTKDVT)
                ) : (
                  ""
                )}
              </td>
              <td>
                {" "}
                {loadingPlan ? (
                  <LoadingComponent />
                ) : PLAN_TB_PTM_FIBER.TTKDGPS ? (
                  convertToFloat2Fixed(PLAN_TB_PTM_FIBER.TTKDGPS)
                ) : (
                  ""
                )}
              </td>
              <td rowSpan={3}>
                {EXEC_TB_PTM_FIBER.LAST_DATE
                  ? getFormattedDate(new Date(EXEC_TB_PTM_FIBER.LAST_DATE))
                  : ""}
              </td>
            </tr>
            <tr>
              <td className="td-title-center td-kh fix-col-3">TH</td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
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
              <td className="td-title-center td-kh fix-col-3">%TH</td>
              <td>100%</td>
              <td>100%</td>
              <td>100%</td>
              <td>100%</td>
              <td>100%</td>
              <td>100%</td>
              <td>100%</td>
              <td>100%</td>
              <td>100%</td>
              <td>100%</td>
              <td>100%</td>
              <td>100%</td>
              <td>100%</td>
              <td>100%</td>
              <td>100%</td>
              <td>100%</td>
              <td>100%</td>
              <td>100%</td>
              <td>100%</td>
              <td>100%</td>
              <td>100%</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
});
export default TableDashboardT12;
