"use client";
import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import LoadingComponent from "@components/loading/LoadingComponent";
import { dataRawKpi } from "../../lib/rawData";
import { convertIndexToDateIOT, formatCurrencyVND } from "../../lib/utils";
const API_URL = process.env.NEXTAUTH_APP_API_URL_SSL;
import Spinner from "react-bootstrap/Spinner";
import { useRecoilState } from "recoil";
import {
  counterSumIOTDthu,
  counterIOTDthuKHO,
  counterIOTDthuDLA,
  counterIOTDthuGLA,
  counterIOTDthuPYE,
  counterIOTDthuDNO,
  counterIOTDthuKON,
  counterIOTDthuKHOT4,
  counterIOTDthuDLAT4,
  counterIOTDthuGLAT4,
  counterIOTDthuPYET4,
  counterIOTDthuDNOT4,
  counterIOTDthuKONT4,
  counterIOTDthuKHOT5,
  counterIOTDthuDLAT5,
  counterIOTDthuGLAT5,
  counterIOTDthuPYET5,
  counterIOTDthuDNOT5,
  counterIOTDthuKONT5,
} from "../../lib/states/counter";
import FormIOT from "./FormIOT";
function TableIOT(props) {
  const [loadingIOT, setLoadingIOT] = useState(false);
  const [dataDthuIOT, setDataDthuIOT] = useState([]);
  const [visibleColumns, setVisibleColumns] = useState(8);

  const [counterLocalSumIOTDthu, setCounterLocalSumIOTDthu] =
    useRecoilState(counterSumIOTDthu);
  const [counterLocalIOTDthuKHO, setCounterLocalIOTDthuKHO] =
    useRecoilState(counterIOTDthuKHO);
  const [counterLocalIOTDthuDLA, setCounterLocalIOTDthuDLA] =
    useRecoilState(counterIOTDthuDLA);
  const [counterLocalIOTDthuGLA, setCounterLocalIOTDthuGLA] =
    useRecoilState(counterIOTDthuGLA);
  const [counterLocalIOTDthuPYE, setCounterLocalIOTDthuPYE] =
    useRecoilState(counterIOTDthuPYE);
  const [counterLocalIOTDthuDNO, setCounterLocalIOTDthuDNO] =
    useRecoilState(counterIOTDthuDNO);
  const [counterLocalIOTDthuKON, setCounterLocalIOTDthuKON] =
    useRecoilState(counterIOTDthuKON);
  const [show, setShow] = useState(false);
  const [counterLocalIOTDthuKHOT4, setCounterLocalIOTDthuKHOT4] =
    useRecoilState(counterIOTDthuKHOT4);
  const [counterLocalIOTDthuDLAT4, setCounterLocalIOTDthuDLAT4] =
    useRecoilState(counterIOTDthuDLAT4);
  const [counterLocalIOTDthuGLAT4, setCounterLocalIOTDthuGLAT4] =
    useRecoilState(counterIOTDthuGLAT4);
  const [counterLocalIOTDthuPYET4, setCounterLocalIOTDthuPYET4] =
    useRecoilState(counterIOTDthuPYET4);
  const [counterLocalIOTDthuDNOT4, setCounterLocalIOTDthuDNOT4] =
    useRecoilState(counterIOTDthuDNOT4);
  const [counterLocalIOTDthuKONT4, setCounterLocalIOTDthuKONT4] =
    useRecoilState(counterIOTDthuKONT4);

  const [counterLocalIOTDthuKHOT5, setCounterLocalIOTDthuKHOT5] =
    useRecoilState(counterIOTDthuKHOT5);
  const [counterLocalIOTDthuDLAT5, setCounterLocalIOTDthuDLAT5] =
    useRecoilState(counterIOTDthuDLAT5);
  const [counterLocalIOTDthuGLAT5, setCounterLocalIOTDthuGLAT5] =
    useRecoilState(counterIOTDthuGLAT5);
  const [counterLocalIOTDthuPYET5, setCounterLocalIOTDthuPYET5] =
    useRecoilState(counterIOTDthuPYET5);
  const [counterLocalIOTDthuDNOT5, setCounterLocalIOTDthuDNOT5] =
    useRecoilState(counterIOTDthuDNOT5);
  const [counterLocalIOTDthuKONT5, setCounterLocalIOTDthuKONT5] =
    useRecoilState(counterIOTDthuKONT5);

  useEffect(() => {
    getDataIOT();
  }, []);
  useEffect(() => {
    let sumDthu = 0;
    dataDthuIOT &&
      dataDthuIOT.length > 0 &&
      dataDthuIOT.map((item, index) => {
        const AMOUNT = item.data.reduce((acc, curr) => {
          // if (curr.PROVINCE == "DLA") {
          //   console.log("DLA", curr.AMOUNT);
          // }
          // console.log("check",curr.AMOUNT, curr.AMOUNT !== null )

          return curr.AMOUNT && curr.AMOUNT !== null
            ? acc + parseInt(curr.AMOUNT)
            : acc;
        }, 0);
        if (item.province == "KHO") {
          setCounterLocalIOTDthuKHO(AMOUNT);
        }
        if (item.province == "DLA") {
          setCounterLocalIOTDthuDLA(AMOUNT);
        }
        if (item.province == "GLA") {
          setCounterLocalIOTDthuGLA(AMOUNT);
        }
        if (item.province == "PYE") {
          setCounterLocalIOTDthuPYE(AMOUNT);
        }
        if (item.province == "DNO") {
          setCounterLocalIOTDthuDNO(AMOUNT);
        }
        if (item.province == "KON") {
          setCounterLocalIOTDthuKON(AMOUNT);
        }
        sumDthu = sumDthu + parseInt(AMOUNT);
      });
    // console.log("sumDthu",sumDthu)
    setCounterLocalSumIOTDthu(
      sumDthu +
        counterLocalIOTDthuKHOT4 +
        counterLocalIOTDthuDLAT4 +
        counterLocalIOTDthuGLAT4 +
        counterLocalIOTDthuPYET4 +
        counterLocalIOTDthuDNOT4 +
        counterLocalIOTDthuKONT4 +
        counterLocalIOTDthuKHOT5 +
        counterLocalIOTDthuDLAT5 +
        counterLocalIOTDthuGLAT5 +
        counterLocalIOTDthuPYET5 +
        counterLocalIOTDthuDNOT5 +
        counterLocalIOTDthuKONT5
    );
  }, [dataDthuIOT]);

  const handleShowMore = () => {
    const newVisibleColumns = visibleColumns + 10;
    if (newVisibleColumns <= 38) {
      setVisibleColumns(newVisibleColumns);
    } else {
      setVisibleColumns(38); // Limit to 38 columns
    }
  };
  const handleShowLess = () => {
    setVisibleColumns((prev) => (prev > 10 ? prev - 10 : 10));
    if (visibleColumns <= 10) {
      setVisibleColumns(10); // Limit to 10 columns
    }
  };
  const getDataIOT = async () => {
    setLoadingIOT(true);
    try {
      const response = await fetch(
        `${API_URL}/dashboard-thidua/dthu-thidua-iot` // Replace with your actual API endpoint
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      let dataDthuIOTKHO = { province: "KHO", data: [] };
      let dataDthuIOTDLA = { province: "DLA", data: [] };
      let dataDthuIOTGLA = { province: "GLA", data: [] };
      let dataDthuIOTPYE = { province: "PYE", data: [] };
      let dataDthuIOTDNO = { province: "DNO", data: [] };
      let dataDthuIOTKON = { province: "KON", data: [] };
      if (data && data.data && data.data.length > 0) {
        data.data.forEach((item) => {
          if (item.PROVINCE === "KHO") {
            dataDthuIOTKHO.data.push(item);
          } else if (item.PROVINCE === "DLA") {
            dataDthuIOTDLA.data.push(item);
          } else if (item.PROVINCE === "GLA") {
            dataDthuIOTGLA.data.push(item);
          } else if (item.PROVINCE === "PYE") {
            dataDthuIOTPYE.data.push(item);
          } else if (item.PROVINCE === "DNO") {
            dataDthuIOTDNO.data.push(item);
          } else if (item.PROVINCE === "KON") {
            dataDthuIOTKON.data.push(item);
          }
        });
        setDataDthuIOT([
          dataDthuIOTKHO,
          dataDthuIOTDLA,
          dataDthuIOTGLA,
          dataDthuIOTPYE,
          dataDthuIOTDNO,
          dataDthuIOTKON,
        ]);
      }
      setLoadingIOT(false);
    } catch (error) {
      console.error("Error fetching data:", error);
      setLoadingIOT(false);
      return;
    }
  };
  const handleOpenPopup = () => {
    setShow(true);
  };

  return (
    <div className="dashboard-thidua">
      <div className="IOT-section">
        {/* <h4>MobiIOT platform</h4> */}
        {loadingIOT ? (
          <Spinner
            animation="grow"
            variant="primary"
            size="lg"
            className="d-flex justify-content-center align-items-center"
          >
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        ) : (
          <>
            <div className="d-flex flex-start flex-wrap mb-3">
              <button
                className="btn btn-outline-primary me-5"
                onClick={() => handleShowMore()}
              >
                {`Mở rộng bảng  >>`}
              </button>

              <button
                className="btn btn-outline-primary "
                onClick={() => handleShowLess()}
              >
                {`Thu nhỏ bảng  <<`}
              </button>

              <button
                className="btn btn-outline-primary me-5 ms-5"
                onClick={handleOpenPopup}
              >
                {" "}
                Thêm dữ liệu IOT
              </button>
            </div>
            <div className="table-responsive">
              <table className=" table table-IOT align-middle table-bordered gs-0 gy-3 table-frozen">
                <thead>
                  <tr>
                    <th rowSpan={2} className="text-center align-middle">
                      STT
                    </th>
                    <th rowSpan={2} className="text-center align-middle">
                      Đơn vị
                    </th>
                    <th rowSpan={2} className="text-center  align-middle">
                      Lũy kế tháng 04
                    </th>
                    <th rowSpan={2} className="text-center  align-middle">
                      Lũy kế tháng 05
                    </th>
                    <th colSpan={30} className="text-center align-middle">
                      Lũy kế tháng 06
                    </th>
                    <th rowSpan={2} className="text-center  align-middle">
                      Thực hiện lũy kế
                    </th>
                  </tr>
                  <tr>
                    {Array.from({
                      length: 30,
                    }).map((_, i) => (
                      <th
                        key={`${i} + th`}
                        className={
                          i < visibleColumns ? "text-right" : "hiden-colum "
                        }
                      >
                        {i < visibleColumns ? convertIndexToDateIOT(i) : ""}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="text-left title-sub">2</td>
                    <td colSpan={41} className="text-left title-sub">
                      Doanh thu IOT
                    </td>
                  </tr>

                  {dataDthuIOT &&
                    dataDthuIOT.length > 0 &&
                    dataDthuIOT.map((item, index) => {
                      const objectProvince = dataDthuIOT[index];
                      let sumDthu = objectProvince.data.reduce((acc, curr) => {
                        return acc + parseInt(curr.AMOUNT);
                      }, 0);
                      let lkSum = 0;
                      let lkT4 = 0;
                      let lkT5 = 0;

                      if (index == 0) {
                        lkSum =
                          sumDthu +
                          counterLocalIOTDthuKHOT4 +
                          counterLocalIOTDthuKHOT5;
                      } else if (index == 1) {
                        lkSum =
                          sumDthu +
                          counterLocalIOTDthuDLAT4 +
                          counterLocalIOTDthuDLAT5;
                      } else if (index == 2) {
                        lkSum =
                          sumDthu +
                          counterLocalIOTDthuGLAT4 +
                          counterLocalIOTDthuGLAT5;
                      } else if (index == 3) {
                        lkSum =
                          sumDthu +
                          counterLocalIOTDthuPYET4 +
                          counterLocalIOTDthuPYET5;
                      } else if (index == 4) {
                        lkSum =
                          sumDthu +
                          counterLocalIOTDthuDNOT4 +
                          counterLocalIOTDthuDNOT5;
                      } else if (index == 5) {
                        lkSum =
                          sumDthu +
                          counterLocalIOTDthuKONT4 +
                          counterLocalIOTDthuKONT5;
                      }

                      if (index == 0) {
                        lkT4 = counterLocalIOTDthuKHOT4;
                      } else if (index == 1) {
                        lkT4 = counterLocalIOTDthuDLAT4;
                      } else if (index == 2) {
                        lkT4 = counterLocalIOTDthuGLAT4;
                      } else if (index == 3) {
                        lkT4 = counterLocalIOTDthuPYET4;
                      } else if (index == 4) {
                        lkT4 = counterLocalIOTDthuDNOT4;
                      } else if (index == 5) {
                        lkT4 = counterLocalIOTDthuKONT4;
                      }
                      if (index == 0) {
                        lkT5 = counterLocalIOTDthuKHOT5;
                      } else if (index == 1) {
                        lkT5 = counterLocalIOTDthuDLAT5;
                      } else if (index == 2) {
                        lkT5 = counterLocalIOTDthuGLAT5;
                      } else if (index == 3) {
                        lkT5 = counterLocalIOTDthuPYET5;
                      } else if (index == 4) {
                        lkT5 = counterLocalIOTDthuDNOT5;
                      } else if (index == 5) {
                        lkT5 = counterLocalIOTDthuKONT5;
                      }

                      return (
                        <tr key={`${index} + tr`}>
                          <td className="text-left"></td>
                          <td className="text-left">
                            {objectProvince.province}
                          </td>
                          <td>{formatCurrencyVND(lkT4)}</td>
                          <td>{formatCurrencyVND(lkT5)}</td>
                          {objectProvince.data.map((day, dayIndex) => (
                            <td
                              key={`${dayIndex} + dayIndex`}
                              className={
                                dayIndex < visibleColumns
                                  ? "text-right"
                                  : "hiden-colum "
                              }
                            >
                              {dayIndex < visibleColumns ?formatCurrencyVND(parseFloat(day.AMOUNT)) : ""}
                            </td>
                          ))}
                          {Array.from({
                            length: 30 - objectProvince.data.length,
                          }).map((_, i) => (
                            <td
                              key={objectProvince.data.length + i}
                              className="text-center p-0"
                            ></td>
                          ))}
                          <td className="text-right">
                            {formatCurrencyVND(lkSum)}
                          </td>
                        </tr>
                      );
                    })}
                </tbody>
              </table>
            </div>
          </>
        )}
      </div>
      <FormIOT
        show={show}
        handleClose={(isReset) => {
          setShow(false);
          if (isReset) {
            getDataIOT();
          }
        }}
      />
    </div>
  );
}

export default TableIOT;
