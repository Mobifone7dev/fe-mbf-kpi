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

  useEffect(() => {
    getDataCloud();
  }, []);
  useEffect(() => {
    let sumDthu = 0;
    dataDthuCloud &&
      dataDthuCloud.length > 0 &&
      dataDthuCloud.map((item, index) => {
        const Dthu = item.data.reduce((acc, curr) => acc + curr.Dthu ?? 0, 0);
        if (item.province == "KHO") {
          setCounterLocalCloudDthuKHO(Dthu);
        }
        if (item.province == "DLA") {
          setCounterLocalCloudDthuDLA(Dthu);
        }
        if (item.province == "GLA") {
          setCounterLocalCloudDthuGLA(Dthu);
        }
        if (item.province == "PYE") {
          setCounterLocalCloudDthuPYE(Dthu);
        }
        if (item.province == "DNO") {
          setCounterLocalCloudDthuDNO(Dthu);
        }
        if (item.province == "KON") {
          setCounterLocalCloudDthuKON(Dthu);
        }

        sumDthu += Dthu;
      });

    setCounterLocalSumCloudDthu(sumDthu);
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
    // setLoadingCloud(true);
    // try {
    //   const response = await fetch(
    //     `${API_URL}/dashboard-thidua/sl-thidua-Cloud` // Replace with your actual API endpoint
    //   );
    //   if (!response.ok) {
    //     throw new Error("Network response was not ok");
    //   }
    //   const data = await response.json();
    //   let dataDthuCloudKHO = { province: "KHO", data: [] };
    //   let dataDthuCloudDLA = { province: "DLA", data: [] };
    //   let dataDthuCloudGLA = { province: "GLA", data: [] };
    //   let dataDthuCloudPYE = { province: "PYE", data: [] };
    //   let dataDthuCloudDNO = { province: "DNO", data: [] };
    //   let dataDthuCloudKON = { province: "KON", data: [] };
    //   if (data && data.data && data.data.length > 0) {
    //     data.data.forEach((item) => {
    //       if (item.PROVINCE_PT === "KHO") {
    //         dataDthuCloudKHO.data.push(item);
    //       } else if (item.PROVINCE_PT === "DLA") {
    //         dataDthuCloudDLA.data.push(item);
    //       } else if (item.PROVINCE_PT === "GLA") {
    //         dataDthuCloudGLA.data.push(item);
    //       } else if (item.PROVINCE_PT === "PYE") {
    //         dataDthuCloudPYE.data.push(item);
    //       } else if (item.PROVINCE_PT === "DNO") {
    //         dataDthuCloudDNO.data.push(item);
    //       } else if (item.PROVINCE_PT === "KON") {
    //         dataDthuCloudKON.data.push(item);
    //       }
    //     });
    //     setDataDthuCloud([
    //       dataDthuCloudKHO,
    //       dataDthuCloudDLA,
    //       dataDthuCloudGLA,
    //       dataDthuCloudPYE,
    //       dataDthuCloudDNO,
    //       dataDthuCloudKON,
    //     ]);
    //   }
    //   setLoadingCloud(false);
    // } catch (error) {
    //   console.error("Error fetching data:", error);
    //   setLoadingCloud(false);
    //   return;
    // }
  };
  const handleOpenPopup = () => {
    console.log("check")
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
                          i <= visibleColumns ? "text-right" : "d-none"
                        }
                      >
                        {convertIndexToDateCloud(i)}
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
                                  : "d-none"
                              }
                            >
                              {day.Dthu}
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
                              (acc, curr) => acc + curr.Dthu ?? 0,
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
      <FormCloud show={show} handleClose={()=>{
        setShow(false)
      }}/>
    </div>
  );
}

export default TableCloud;
