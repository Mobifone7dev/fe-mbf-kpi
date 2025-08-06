"use client";
import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import LoadingComponent from "@components/loading/LoadingComponent";
import { dataRawKpi } from "../../lib/rawData";
import { convertIndexToDateCamera, formatCurrencyVND } from "../../lib/utils";
const API_URL = process.env.NEXTAUTH_APP_API_URL_SSL;
import Spinner from "react-bootstrap/Spinner";
import { useRecoilState } from "recoil";
import {
  counterSumCameraDthu,
  counterCameraDthuKHO,
  counterCameraDthuDLA,
  counterCameraDthuGLA,
  counterCameraDthuPYE,
  counterCameraDthuDNO,
  counterCameraDthuKON
} from "../../lib/states/counter";
import FormCamera from "./FormCamera";
function TableCamera(props) {
  const [loadingCamera, setLoadingCamera] = useState(false);
  const [dataDthuCamera, setDataDthuCamera] = useState([]);
  const [visibleColumns, setVisibleColumns] = useState(8);
  const [counterLocalSumCameraDthu, setCounterLocalSumCameraDthu] =
      useRecoilState(counterSumCameraDthu);
    const [counterLocalCameraDthuKHO, setCounterLocalCameraDthuKHO] =
      useRecoilState(counterCameraDthuKHO);
    const [counterLocalCameraDthuDLA, setCounterLocalCameraDthuDLA] =
      useRecoilState(counterCameraDthuDLA);
    const [counterLocalCameraDthuGLA, setCounterLocalCameraDthuGLA] =
      useRecoilState(counterCameraDthuGLA);
    const [counterLocalCameraDthuPYE, setCounterLocalCameraDthuPYE] =
      useRecoilState(counterCameraDthuPYE);
    const [counterLocalCameraDthuDNO, setCounterLocalCameraDthuDNO] =
      useRecoilState(counterCameraDthuDNO);
    const [counterLocalCameraDthuKON, setCounterLocalCameraDthuKON] =
      useRecoilState(counterCameraDthuKON);
  const [show, setShow] = useState(false);
 
  useEffect(() => {
    getDataCamera();
  }, []);
  useEffect(() => {
    let sumDthu = 0;
    dataDthuCamera &&
      dataDthuCamera.length > 0 &&
      dataDthuCamera.map((item, index) => {
        const AMOUNT = item.data.reduce((acc, curr) => {

          return curr.AMOUNT && curr.AMOUNT !== null
            ? acc + parseInt(curr.AMOUNT)
            : acc;
        }, 0);

        if (item.province == "KHO") {
          console.log("check local", AMOUNT);
          setCounterLocalCameraDthuKHO(AMOUNT);
        }
        if (item.province == "DLA") {
          setCounterLocalCameraDthuDLA(AMOUNT);
        }
        if (item.province == "GLA") {
          setCounterLocalCameraDthuGLA(AMOUNT);
        }
        if (item.province == "PYE") {
          setCounterLocalCameraDthuPYE(AMOUNT);
        }
        if (item.province == "DNO") {
          setCounterLocalCameraDthuDNO(AMOUNT);
        }
        if (item.province == "KON") {
          setCounterLocalCameraDthuKON(AMOUNT);
        }
        sumDthu = sumDthu + parseInt(AMOUNT);
      });

    setCounterLocalSumCameraDthu(
      sumDthu
    );
  }, [dataDthuCamera]);

  const handleShowMore = () => {
    const newVisibleColumns = visibleColumns + 10;
    if (newVisibleColumns <= 34) {
      setVisibleColumns(newVisibleColumns);
    } else {
      setVisibleColumns(34); // Limit to 34 columns
    }
  };
  const handleShowLess = () => {
    setVisibleColumns((prev) => (prev > 10 ? prev - 10 : 10));
    if (visibleColumns <= 10) {
      setVisibleColumns(10); // Limit to 10 columns
    }
  };
  const getDataCamera = async () => {
    setLoadingCamera(true);
    try {
      const response = await fetch(
        `${API_URL}/dashboard-thidua-t08/dthu-thidua-camera` // Replace with your actual API endpoint
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      let dataDthuCameraKHO = { province: "KHO", data: [] };
      let dataDthuCameraDLA = { province: "DLA", data: [] };
      let dataDthuCameraGLA = { province: "GLA", data: [] };
      let dataDthuCameraPYE = { province: "PYE", data: [] };
      let dataDthuCameraDNO = { province: "DNO", data: [] };
      let dataDthuCameraKON = { province: "KON", data: [] };
      if (data && data.data && data.data.length > 0) {
        data.data.forEach((item) => {
          if (item.PROVINCE === "KHO") {
            dataDthuCameraKHO.data.push(item);
          } else if (item.PROVINCE === "DLA") {
            dataDthuCameraDLA.data.push(item);
          } else if (item.PROVINCE === "GLA") {
            dataDthuCameraGLA.data.push(item);
          } else if (item.PROVINCE === "PYE") {
            dataDthuCameraPYE.data.push(item);
          } else if (item.PROVINCE === "DNO") {
            dataDthuCameraDNO.data.push(item);
          } else if (item.PROVINCE === "KON") {
            dataDthuCameraKON.data.push(item);
          }
        });
        setDataDthuCamera([
          dataDthuCameraKHO,
          dataDthuCameraDLA,
          dataDthuCameraGLA,
          dataDthuCameraPYE,
          dataDthuCameraDNO,
          dataDthuCameraKON,
        ]);
      }
      setLoadingCamera(false);
    } catch (error) {
      console.error("Error fetching data:", error);
      setLoadingCamera(false);
      return;
    }
  };
  const handleOpenPopup = () => {
    setShow(true);
  };

  return (
    <div className="dashboard-thidua">
      <div className="Camera-section">
        {/* <h4>MobiCamera platform</h4> */}
        {loadingCamera ? (
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
                Thêm dữ liệu Camera
              </button>
            </div>
            <div className="table-responsive">
              <table className=" table table-Camera align-middle table-bordered gs-0 gy-3 table-frozen">
                <thead>
                  <tr>
                    <th rowSpan={2} className="text-center align-middle">
                      STT
                    </th>
                    <th rowSpan={2} className="text-center align-middle">
                      Đơn vị
                    </th>

                    <th colSpan={30} className="text-center align-middle">
                      Lũy kế tháng 08
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
                        {i < visibleColumns ? convertIndexToDateCamera(i) : ""}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="text-left title-sub">1</td>
                    <td colSpan={37} className="text-left title-sub">
                      Doanh thu Camera
                    </td>
                  </tr>

                  {dataDthuCamera &&
                    dataDthuCamera.length > 0 &&
                    dataDthuCamera.map((item, index) => {
                      const objectProvince = dataDthuCamera[index];
                      let sumDthu = objectProvince.data.reduce((acc, curr) => {
                        return acc + parseInt(curr.AMOUNT);
                      }, 0);
                      let lkSum = sumDthu;
                      return (
                        <tr key={`${index} + tr`}>
                          <td className="text-left"></td>
                          <td className="text-left">
                            {objectProvince.province}
                          </td>
                          {objectProvince.data.map((day, dayIndex) => (
                            <td
                              key={`${dayIndex} + dayIndex`}
                              className={
                                dayIndex < visibleColumns
                                  ? "text-right"
                                  : "hiden-colum  "
                              }
                            >
                              {dayIndex < visibleColumns ? formatCurrencyVND(parseFloat(day.AMOUNT)) : ""}
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
      <FormCamera
        show={show}
        handleClose={(isReset) => {
          setShow(false);
          if (isReset) {
            getDataCamera();
          }
        }}
      />
    </div>
  );
}

export default TableCamera;
