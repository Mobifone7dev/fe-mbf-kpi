"use client";
import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import LoadingComponent from "@components/loading/LoadingComponent";
import { dataRawKpi } from "../../lib/rawData";
import { convertIndexToDateLTT, formatCurrencyVND } from "../../lib/utils";
const API_URL = process.env.NEXTAUTH_APP_API_URL_SSL;
import Spinner from "react-bootstrap/Spinner";
import { useRecoilState } from "recoil";
import {
  counterSumLTTDthu,
  counterLTTDthuKHO,
  counterLTTDthuDLA,
  counterLTTDthuGLA,
  counterLTTDthuPYE,
  counterLTTDthuDNO,
  counterLTTDthuKON
} from "../../lib/states/counter";
import FormLTT from "./FormLTT";
function TableLTT(props) {
  const [loadingLTT, setLoadingLTT] = useState(false);
  const [dataDthuLTT, setDataDthuLTT] = useState([]);
  const [visibleColumns, setVisibleColumns] = useState(8);

  const [counterLocalSumLTTDthu, setCounterLocalSumLTTDthu] =
    useRecoilState(counterSumLTTDthu);
  const [counterLocalLTTDthuKHO, setCounterLocalLTTDthuKHO] =
    useRecoilState(counterLTTDthuKHO);
  const [counterLocalLTTDthuDLA, setCounterLocalLTTDthuDLA] =
    useRecoilState(counterLTTDthuDLA);
  const [counterLocalLTTDthuGLA, setCounterLocalLTTDthuGLA] =
    useRecoilState(counterLTTDthuGLA);
  const [counterLocalLTTDthuPYE, setCounterLocalLTTDthuPYE] =
    useRecoilState(counterLTTDthuPYE);
  const [counterLocalLTTDthuDNO, setCounterLocalLTTDthuDNO] =
    useRecoilState(counterLTTDthuDNO);
  const [counterLocalLTTDthuKON, setCounterLocalLTTDthuKON] =
    useRecoilState(counterLTTDthuKON);
  const [show, setShow] = useState(false);
 
  useEffect(() => {
    getDataLTT();
  }, []);
  useEffect(() => {
    let sumDthu = 0;
    dataDthuLTT &&
      dataDthuLTT.length > 0 &&
      dataDthuLTT.map((item, index) => {
        const AMOUNT = item.data.reduce((acc, curr) => {

          return curr.AMOUNT && curr.AMOUNT !== null
            ? acc + parseInt(curr.AMOUNT)
            : acc;
        }, 0);

        if (item.province == "KHO") {
          console.log("check local", AMOUNT);
          setCounterLocalLTTDthuKHO(AMOUNT);
        }
        if (item.province == "DLA") {
          setCounterLocalLTTDthuDLA(AMOUNT);
        }
        if (item.province == "GLA") {
          setCounterLocalLTTDthuGLA(AMOUNT);
        }
        if (item.province == "PYE") {
          setCounterLocalLTTDthuPYE(AMOUNT);
        }
        if (item.province == "DNO") {
          setCounterLocalLTTDthuDNO(AMOUNT);
        }
        if (item.province == "KON") {
          setCounterLocalLTTDthuKON(AMOUNT);
        }
        sumDthu = sumDthu + parseInt(AMOUNT);
      });

    setCounterLocalSumLTTDthu(
      sumDthu
    );
  }, [dataDthuLTT]);

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
  const getDataLTT = async () => {
    setLoadingLTT(true);
    try {
      const response = await fetch(
        `${API_URL}/dashboard-thidua-t08/dthu-thidua-ltt` // Replace with your actual API endpoint
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      let dataDthuLTTKHO = { province: "KHO", data: [] };
      let dataDthuLTTDLA = { province: "DLA", data: [] };
      let dataDthuLTTGLA = { province: "GLA", data: [] };
      let dataDthuLTTPYE = { province: "PYE", data: [] };
      let dataDthuLTTDNO = { province: "DNO", data: [] };
      let dataDthuLTTKON = { province: "KON", data: [] };
      if (data && data.data && data.data.length > 0) {
        data.data.forEach((item) => {
          if (item.PROVINCE === "KHO") {
            dataDthuLTTKHO.data.push(item);
          } else if (item.PROVINCE === "DLA") {
            dataDthuLTTDLA.data.push(item);
          } else if (item.PROVINCE === "GLA") {
            dataDthuLTTGLA.data.push(item);
          } else if (item.PROVINCE === "PYE") {
            dataDthuLTTPYE.data.push(item);
          } else if (item.PROVINCE === "DNO") {
            dataDthuLTTDNO.data.push(item);
          } else if (item.PROVINCE === "KON") {
            dataDthuLTTKON.data.push(item);
          }
        });
        setDataDthuLTT([
          dataDthuLTTKHO,
          dataDthuLTTDLA,
          dataDthuLTTGLA,
          dataDthuLTTPYE,
          dataDthuLTTDNO,
          dataDthuLTTKON,
        ]);
      }
      setLoadingLTT(false);
    } catch (error) {
      console.error("Error fetching data:", error);
      setLoadingLTT(false);
      return;
    }
  };
  const handleOpenPopup = () => {
    setShow(true);
  };

  return (
    <div className="dashboard-thidua">
      <div className="LTT-section">
        {/* <h4>MobiLTT platform</h4> */}
        {loadingLTT ? (
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
                Thêm dữ liệu LTT
              </button>
            </div>
            <div className="table-responsive">
              <table className=" table table-LTT align-middle table-bordered gs-0 gy-3 table-frozen">
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
                        {i < visibleColumns ? convertIndexToDateLTT(i) : ""}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="text-left title-sub">1</td>
                    <td colSpan={37} className="text-left title-sub">
                      Doanh thu LTT
                    </td>
                  </tr>

                  {dataDthuLTT &&
                    dataDthuLTT.length > 0 &&
                    dataDthuLTT.map((item, index) => {
                      const objectProvince = dataDthuLTT[index];
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
      <FormLTT
        show={show}
        handleClose={(isReset) => {
          setShow(false);
          if (isReset) {
            getDataLTT();
          }
        }}
      />
    </div>
  );
}

export default TableLTT;
