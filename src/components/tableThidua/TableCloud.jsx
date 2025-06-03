"use client";
import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import LoadingComponent from "@components/loading/LoadingComponent";
import { dataRawKpi } from "../../lib/rawData";
import { convertIndexToDateCloud, formatCurrencyVND } from "../../lib/utils";
const API_URL = process.env.NEXTAUTH_APP_API_URL_SSL;
import Spinner from "react-bootstrap/Spinner";
import { useRecoilState } from "recoil";
import {
  counterSumCloudDthu,
  counterCloudDthuKHO,
  counterCloudDthuDLA,
  counterCloudDthuGLA,
  counterCloudDthuPYE,
  counterCloudDthuDNO,
  counterCloudDthuKON,
  counterCloudDthuKHOT4,
  counterCloudDthuDLAT4,
  counterCloudDthuGLAT4,
  counterCloudDthuPYET4,
  counterCloudDthuDNOT4,
  counterCloudDthuKONT4,
  counterCloudDthuKHOT5,
  counterCloudDthuDLAT5,
  counterCloudDthuGLAT5,
  counterCloudDthuPYET5,
  counterCloudDthuDNOT5,
  counterCloudDthuKONT5,
} from "../../lib/states/counter";
import FormCloud from "./FormCloud";
function TableCloud(props) {
  const [loadingCloud, setLoadingCloud] = useState(false);
  const [dataDthuCloud, setDataDthuCloud] = useState([]);
  const [visibleColumns, setVisibleColumns] = useState(8);

  const [counterLocalSumCloudDthu, setCounterLocalSumCloudDthu] =
    useRecoilState(counterSumCloudDthu);
  const [counterLocalCloudDthuKHO, setCounterLocalCloudDthuKHO] =
    useRecoilState(counterCloudDthuKHO);
  const [counterLocalCloudDthuDLA, setCounterLocalCloudDthuDLA] =
    useRecoilState(counterCloudDthuDLA);
  const [counterLocalCloudDthuGLA, setCounterLocalCloudDthuGLA] =
    useRecoilState(counterCloudDthuGLA);
  const [counterLocalCloudDthuPYE, setCounterLocalCloudDthuPYE] =
    useRecoilState(counterCloudDthuPYE);
  const [counterLocalCloudDthuDNO, setCounterLocalCloudDthuDNO] =
    useRecoilState(counterCloudDthuDNO);
  const [counterLocalCloudDthuKON, setCounterLocalCloudDthuKON] =
    useRecoilState(counterCloudDthuKON);
  const [show, setShow] = useState(false);
  const [counterLocalCloudDthuKHOT4, setCounterLocalCloudDthuKHOT4] =
    useRecoilState(counterCloudDthuKHOT4);
  const [counterLocalCloudDthuDLAT4, setCounterLocalCloudDthuDLAT4] =
    useRecoilState(counterCloudDthuDLAT4);
  const [counterLocalCloudDthuGLAT4, setCounterLocalCloudDthuGLAT4] =
    useRecoilState(counterCloudDthuGLAT4);
  const [counterLocalCloudDthuPYET4, setCounterLocalCloudDthuPYET4] =
    useRecoilState(counterCloudDthuPYET4);
  const [counterLocalCloudDthuDNOT4, setCounterLocalCloudDthuDNOT4] =
    useRecoilState(counterCloudDthuDNOT4);
  const [counterLocalCloudDthuKONT4, setCounterLocalCloudDthuKONT4] =
    useRecoilState(counterCloudDthuKONT4);

  const [counterLocalCloudDthuKHOT5, setCounterLocalCloudDthuKHOT5] =
    useRecoilState(counterCloudDthuKHOT5);
  const [counterLocalCloudDthuDLAT5, setCounterLocalCloudDthuDLAT5] =
    useRecoilState(counterCloudDthuDLAT5);
  const [counterLocalCloudDthuGLAT5, setCounterLocalCloudDthuGLAT5] =
    useRecoilState(counterCloudDthuGLAT5);
  const [counterLocalCloudDthuPYET5, setCounterLocalCloudDthuPYET5] =
    useRecoilState(counterCloudDthuPYET5);
  const [counterLocalCloudDthuDNOT5, setCounterLocalCloudDthuDNOT5] =
    useRecoilState(counterCloudDthuDNOT5);
  const [counterLocalCloudDthuKONT5, setCounterLocalCloudDthuKONT5] =
    useRecoilState(counterCloudDthuKONT5);

  useEffect(() => {
    getDataCloud();
  }, []);
  useEffect(() => {
    let sumDthu = 0;
    dataDthuCloud &&
      dataDthuCloud.length > 0 &&
      dataDthuCloud.map((item, index) => {
        const AMOUNT = item.data.reduce(
          (acc, curr) => acc + parseInt(curr.AMOUNT),
          0
        );
        if (item.province == "KHO") {
          setCounterLocalCloudDthuKHO(AMOUNT);
        }
        if (item.province == "DLA") {
          setCounterLocalCloudDthuDLA(AMOUNT);
        }
        if (item.province == "GLA") {
          setCounterLocalCloudDthuGLA(AMOUNT);
        }
        if (item.province == "PYE") {
          setCounterLocalCloudDthuPYE(AMOUNT);
        }
        if (item.province == "DNO") {
          setCounterLocalCloudDthuDNO(AMOUNT);
        }
        if (item.province == "KON") {
          setCounterLocalCloudDthuKON(AMOUNT);
        }
        sumDthu = sumDthu + parseInt(AMOUNT);
      });
    setCounterLocalSumCloudDthu(
      sumDthu +
        counterLocalCloudDthuKHOT4 +
        counterLocalCloudDthuDLAT4 +
        counterLocalCloudDthuGLAT4 +
        counterLocalCloudDthuPYET4 +
        counterLocalCloudDthuDNOT4 +
        counterLocalCloudDthuKONT4 +
        counterLocalCloudDthuKHOT5 +
        counterLocalCloudDthuDLAT5 +
        counterLocalCloudDthuGLAT5 +
        counterLocalCloudDthuPYET5 +
        counterLocalCloudDthuDNOT5 +
        counterLocalCloudDthuKONT5
    );
  }, [dataDthuCloud]);

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
  const getDataCloud = async () => {
    setLoadingCloud(true);
    try {
      const response = await fetch(
        `${API_URL}/dashboard-thidua/dthu-thidua-cloud` // Replace with your actual API endpoint
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      let dataDthuCloudKHO = { province: "KHO", data: [] };
      let dataDthuCloudDLA = { province: "DLA", data: [] };
      let dataDthuCloudGLA = { province: "GLA", data: [] };
      let dataDthuCloudPYE = { province: "PYE", data: [] };
      let dataDthuCloudDNO = { province: "DNO", data: [] };
      let dataDthuCloudKON = { province: "KON", data: [] };
      if (data && data.data && data.data.length > 0) {
        data.data.forEach((item) => {
          if (item.PROVINCE === "KHO") {
            dataDthuCloudKHO.data.push(item);
          } else if (item.PROVINCE === "DLA") {
            dataDthuCloudDLA.data.push(item);
          } else if (item.PROVINCE === "GLA") {
            dataDthuCloudGLA.data.push(item);
          } else if (item.PROVINCE === "PYE") {
            dataDthuCloudPYE.data.push(item);
          } else if (item.PROVINCE === "DNO") {
            dataDthuCloudDNO.data.push(item);
          } else if (item.PROVINCE === "KON") {
            dataDthuCloudKON.data.push(item);
          }
        });
        setDataDthuCloud([
          dataDthuCloudKHO,
          dataDthuCloudDLA,
          dataDthuCloudGLA,
          dataDthuCloudPYE,
          dataDthuCloudDNO,
          dataDthuCloudKON,
        ]);
      }
      setLoadingCloud(false);
    } catch (error) {
      console.error("Error fetching data:", error);
      setLoadingCloud(false);
      return;
    }
  };
  const handleOpenPopup = () => {
    setShow(true);
  };

  return (
    <div className="dashboard-thidua">
      <div className="cloud-section">
        {/* <h4>MobiCloud platform</h4> */}
        {loadingCloud ? (
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
                Thêm dữ liệu
              </button>
            </div>
            <div className="table-responsive">
              <table className=" table table-Cloud align-middle table-bordered gs-0 gy-3 table-frozen">
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
                          i < visibleColumns ? "text-right" : "hiden-colum"
                        }
                      >
                        {i < visibleColumns ? convertIndexToDateCloud(i) : ""}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="text-left title-sub">4</td>
                    <td colSpan={41} className="text-left title-sub">
                      Số lượng thuê bao Cloud Cloud
                    </td>
                  </tr>

                  {dataDthuCloud &&
                    dataDthuCloud.length > 0 &&
                    dataDthuCloud.map((item, index) => {
                      const objectProvince = dataDthuCloud[index];
                      let sumDthu = objectProvince.data.reduce((acc, curr) => {
                        return acc + parseInt(curr.AMOUNT);
                      }, 0);
                      let lkSum = 0;
                      let lkT4 = 0;
                      let lkT5 = 0;

                      if (index == 0) {
                        lkSum =
                          sumDthu +
                          counterLocalCloudDthuKHOT4 +
                          counterLocalCloudDthuKHOT5;
                      } else if (index == 1) {
                        lkSum =
                          sumDthu +
                          counterLocalCloudDthuDLAT4 +
                          counterLocalCloudDthuDLAT5;
                      } else if (index == 2) {
                        lkSum =
                          sumDthu +
                          counterLocalCloudDthuGLAT4 +
                          counterLocalCloudDthuGLAT5;
                      } else if (index == 3) {
                        lkSum =
                          sumDthu +
                          counterLocalCloudDthuPYET4 +
                          counterLocalCloudDthuPYET5;
                      } else if (index == 4) {
                        lkSum =
                          sumDthu +
                          counterLocalCloudDthuDNOT4 +
                          counterLocalCloudDthuDNOT5;
                      } else if (index == 5) {
                        lkSum =
                          sumDthu +
                          counterLocalCloudDthuKONT4 +
                          counterLocalCloudDthuKONT5;
                      }

                      if (index == 0) {
                        lkT4 = counterLocalCloudDthuKHOT4;
                      } else if (index == 1) {
                        lkT4 = counterLocalCloudDthuDLAT4;
                      } else if (index == 2) {
                        lkT4 = counterLocalCloudDthuGLAT4;
                      } else if (index == 3) {
                        lkT4 = counterLocalCloudDthuPYET4;
                      } else if (index == 4) {
                        lkT4 = counterLocalCloudDthuDNOT4;
                      } else if (index == 5) {
                        lkT4 = counterLocalCloudDthuKONT4;
                      }
                      if (index == 0) {
                        lkT5 = counterLocalCloudDthuKHOT5;
                      } else if (index == 1) {
                        lkT5 = counterLocalCloudDthuDLAT5;
                      } else if (index == 2) {
                        lkT5 = counterLocalCloudDthuGLAT5;
                      } else if (index == 3) {
                        lkT5 = counterLocalCloudDthuPYET5;
                      } else if (index == 4) {
                        lkT5 = counterLocalCloudDthuDNOT5;
                      } else if (index == 5) {
                        lkT5 = counterLocalCloudDthuKONT5;
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
                                  : "hiden-colum"
                              }
                            >
                              {formatCurrencyVND(parseFloat(day.AMOUNT))}
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
      <FormCloud
        show={show}
        handleClose={() => {
          setShow(false);
        }}
      />
    </div>
  );
}

export default TableCloud;
