"use client";
import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import LoadingComponent from "@components/loading/LoadingComponent";
import { dataRawKpi } from "../../lib/rawData";
import { convertIndexToDateM2M, formatCurrencyVND } from "../../lib/utils";
const API_URL = process.env.NEXTAUTH_APP_API_URL_SSL;
import Spinner from "react-bootstrap/Spinner";
import { useRecoilState } from "recoil";
import {
  counterSumM2MQuantity,
  counterM2MQuantityKHO,
  counterM2MQuantityDLA,
  counterM2MQuantityGLA,
  counterM2MQuantityPYE,
  counterM2MQuantityDNO,
  counterM2MQuantityKON,
} from "../../lib/states/counter";
function TablePTMM2M(props) {
  const [loadingM2M, setLoadingM2M] = useState(true);
  const [dataQuantityM2M, setDataQuantityM2M] = useState([]);
  const [visibleColumns, setVisibleColumns] = useState(8);

  const [counterLocalSumM2MQuantity, setCounterLocalSumM2MQuantity] =
    useRecoilState(counterSumM2MQuantity);
  const [counterLocalM2MQuantityKHO, setCounterLocalM2MQuantityKHO] =
    useRecoilState(counterM2MQuantityKHO);
  const [counterLocalM2MQuantityDLA, setCounterLocalM2MQuantityDLA] =
    useRecoilState(counterM2MQuantityDLA);
  const [counterLocalM2MQuantityGLA, setCounterLocalM2MQuantityGLA] =
    useRecoilState(counterM2MQuantityGLA);
  const [counterLocalM2MQuantityPYE, setCounterLocalM2MQuantityPYE] =
    useRecoilState(counterM2MQuantityPYE);
  const [counterLocalM2MQuantityDNO, setCounterLocalM2MQuantityDNO] =
    useRecoilState(counterM2MQuantityDNO);
  const [counterLocalM2MQuantityKON, setCounterLocalM2MQuantityKON] =
    useRecoilState(counterM2MQuantityKON);

  useEffect(() => {
    getDataM2M();
  }, []);
  useEffect(() => {
    let sumQuantity = 0;
    dataQuantityM2M &&
      dataQuantityM2M.length > 0 &&
      dataQuantityM2M.map((item, index) => {
        const quantity = item.data.reduce(
          (acc, curr) => acc + curr.QUANTITY ?? 0,
          0
        );
        if (item.province == "KHO") {
          setCounterLocalM2MQuantityKHO(quantity);
        }
        if (item.province == "DLA") {
          setCounterLocalM2MQuantityDLA(quantity);
        }
        if (item.province == "GLA") {
          setCounterLocalM2MQuantityGLA(quantity);
        }
        if (item.province == "PYE") {
          setCounterLocalM2MQuantityPYE(quantity);
        }
        if (item.province == "DNO") {
          setCounterLocalM2MQuantityDNO(quantity);
        }
        if (item.province == "KON") {
          setCounterLocalM2MQuantityKON(quantity);
        }

        sumQuantity += quantity;
      });

    setCounterLocalSumM2MQuantity(sumQuantity);
  }, [dataQuantityM2M]);

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
  const getDataM2M = async () => {
    setLoadingM2M(true);
    try {
      const response = await fetch(
        `${API_URL}/dashboard-thidua/sl-thidua-M2M` // Replace with your actual API endpoint
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      let dataQuantityM2MKHO = { province: "KHO", data: [] };
      let dataQuantityM2MDLA = { province: "DLA", data: [] };
      let dataQuantityM2MGLA = { province: "GLA", data: [] };
      let dataQuantityM2MPYE = { province: "PYE", data: [] };
      let dataQuantityM2MDNO = { province: "DNO", data: [] };
      let dataQuantityM2MKON = { province: "KON", data: [] };

      if (data && data.data && data.data.length > 0) {
        data.data.forEach((item) => {
          if (item.PROVINCE_PT === "KHO") {
            dataQuantityM2MKHO.data.push(item);
          } else if (item.PROVINCE_PT === "DLA") {
            dataQuantityM2MDLA.data.push(item);
          } else if (item.PROVINCE_PT === "GLA") {
            dataQuantityM2MGLA.data.push(item);
          } else if (item.PROVINCE_PT === "PYE") {
            dataQuantityM2MPYE.data.push(item);
          } else if (item.PROVINCE_PT === "DNO") {
            dataQuantityM2MDNO.data.push(item);
          } else if (item.PROVINCE_PT === "KON") {
            dataQuantityM2MKON.data.push(item);
          }
        });
        setDataQuantityM2M([
          dataQuantityM2MKHO,
          dataQuantityM2MDLA,
          dataQuantityM2MGLA,
          dataQuantityM2MPYE,
          dataQuantityM2MDNO,
          dataQuantityM2MKON,
        ]);
      }

      setLoadingM2M(false);
    } catch (error) {
      console.error("Error fetching data:", error);
      setLoadingM2M(false);
      return;
    }
  };

  return (
    <div className="dashboard-thidua">
      <div className="M2M-section">
        {/* <h4>MobiM2M platform</h4> */}
        {loadingM2M ? (
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
            </div>
            <div className="table-responsive">
              <table className=" table table-M2M align-middle table-bordered gs-0 gy-3 table-frozen">
                <thead>
                  <tr>
                    <th rowSpan={2} className="text-center align-middle">
                      STT
                    </th>
                    <th rowSpan={2} className="text-center align-middle">
                      Đơn vị
                    </th>

                    <th colSpan={6} className="text-center  align-middle">
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
                      length: 36,
                    }).map((_, i) => (
                      <th
                        key={i}
                        className={
                          i < visibleColumns ? "text-right" : "hiden-colum "
                        }
                      >
                        {i < visibleColumns ? convertIndexToDateM2M(i) : ""}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="text-left title-sub">4</td>
                    <td colSpan={41} className="text-left title-sub">
                      Số lượng thuê bao PTM M2M
                    </td>
                  </tr>

                  {dataQuantityM2M &&
                    dataQuantityM2M.length > 0 &&
                    dataQuantityM2M.map((item, index) => {
                      const objectProvince = dataQuantityM2M[index];
                      return (
                        <tr key={index}>
                          <td className="text-left"></td>
                          <td className="text-left">
                            {objectProvince.province}
                          </td>
                          {objectProvince.data.map((day, dayIndex) => (
                            <td
                              key={dayIndex}
                              className={
                                dayIndex < visibleColumns
                                  ? "text-right"
                                  : "hiden-colum "
                              }
                            >
                              {dayIndex < visibleColumns ? day.QUANTITY : ""}
                            </td>
                          ))}
                          {Array.from({
                            length: 36 - objectProvince.data.length,
                          }).map((_, i) => (
                            <td
                              key={objectProvince.data.length + i}
                              className="text-center p-0"
                            ></td>
                          ))}
                          <td className="text-right">
                            {objectProvince.data.reduce(
                              (acc, curr) => acc + curr.QUANTITY ?? 0,
                              0
                            )}
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
    </div>
  );
}

export default TablePTMM2M;
