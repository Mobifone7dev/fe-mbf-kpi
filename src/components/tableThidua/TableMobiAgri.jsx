"use client";
import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import LoadingComponent from "@components/loading/LoadingComponent";
import { dataRawKpi } from "../../lib/rawData";
import { convertIndexToDate ,formatCurrencyVND} from "../../lib/utils";
const API_URL = process.env.NEXTAUTH_APP_API_URL_SSL;
import Spinner from "react-bootstrap/Spinner";

function TableMobiAgri(props) {
  const [loadingMobiAgri, setLoadingMobiAgri] = useState(true);
  const [data, setData] = useState(dataRawKpi);
  const [dataQuantityAgri, setDataQuantityAgri] = useState([]);
  const [dataDthuAgri, setDataDthuAgri] = useState([]);
  const [visibleColumns, setVisibleColumns] = useState(8);

  useEffect(() => {
    getDataAgri();
  }, []);

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
  const getDataAgri = async () => {
    setLoadingMobiAgri(true);
    try {
      const response = await fetch(
        `${API_URL}/dashboard-thidua/sl-thidua-mobiagri` // Replace with your actual API endpoint
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      console.log("data", data);
      let dataQuantityAgriKHO = { province: "KHO", data: [] };
      let dataQuantityAgriDLA = { province: "DLA", data: [] };
      let dataQuantityAgriGLA = { province: "GLA", data: [] };
      let dataQuantityAgriPYE = { province: "PYE", data: [] };
      let dataQuantityAgriDNO = { province: "DNO", data: [] };
      let dataQuantityAgriKON = { province: "KON", data: [] };

      if (data && data.data && data.data.length > 0) {
        data.data.forEach((item) => {
          if (item.PROVINCE_PT === "KHO") {
            dataQuantityAgriKHO.data.push(item);
          } else if (item.PROVINCE_PT === "DLA") {
            dataQuantityAgriDLA.data.push(item);
          } else if (item.PROVINCE_PT === "GLA") {
            dataQuantityAgriGLA.data.push(item);
          } else if (item.PROVINCE_PT === "PYE") {
            dataQuantityAgriPYE.data.push(item);
          } else if (item.PROVINCE_PT === "DNO") {
            dataQuantityAgriDNO.data.push(item);
          } else if (item.PROVINCE_PT === "KON") {
            dataQuantityAgriKON.data.push(item);
          }
        });
        setDataQuantityAgri([
          dataQuantityAgriKHO,
          dataQuantityAgriDLA,
          dataQuantityAgriGLA,
          dataQuantityAgriPYE,
          dataQuantityAgriDNO,
          dataQuantityAgriKON,
        ]);
      }

      const responseDthu = await fetch(
        `${API_URL}/dashboard-thidua/dt-thidua-mobiagri` // Replace with your actual API endpoint
      );
      if (!responseDthu.ok) {
        throw new Error("Network response was not ok");
      }
      const dataDthu = await responseDthu.json();
      console.log("dataDthu", dataDthu);
      let dataDthuAgriKHO = { province: "KHO", data: [] };
      let dataDthuAgriDLA = { province: "DLA", data: [] };
      let dataDthuAgriGLA = { province: "GLA", data: [] };
      let dataDthuAgriPYE = { province: "PYE", data: [] };
      let dataDthuAgriDNO = { province: "DNO", data: [] };
      let dataDthuAgriKON = { province: "KON", data: [] };
      if (dataDthu && dataDthu.data && dataDthu.data.length > 0) {
        dataDthu.data.forEach((item) => {
          if (item.PROVINCE_PT === "KHO") {
            dataDthuAgriKHO.data.push(item);
          } else if (item.PROVINCE_PT === "DLA") {
            dataDthuAgriDLA.data.push(item);
          } else if (item.PROVINCE_PT === "GLA") {
            dataDthuAgriGLA.data.push(item);
          } else if (item.PROVINCE_PT === "PYE") {
            dataDthuAgriPYE.data.push(item);
          } else if (item.PROVINCE_PT === "DNO") {
            dataDthuAgriDNO.data.push(item);
          } else if (item.PROVINCE_PT === "KON") {
            dataDthuAgriKON.data.push(item);
          }
        });
        setDataDthuAgri([
          dataDthuAgriKHO,
          dataDthuAgriDLA,
          dataDthuAgriGLA,
          dataDthuAgriPYE,
          dataDthuAgriDNO,
          dataDthuAgriKON,
        ]);
      }

      setLoadingMobiAgri(false);
    } catch (error) {
      console.error("Error fetching data:", error);
      setLoadingMobiAgri(false);
      return;
    }
  };

  return (
    <div className="dashboard-thidua">
      <div className="agri-section">
        {/* <h4>MobiAgri platform</h4> */}
        {loadingMobiAgri ? (
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
              <table className=" table table-agri align-middle table-bordered gs-0 gy-3 table-frozen">
                <thead>
                  <tr>
                    <th rowSpan={2} className="text-center align-middle">
                      STT
                    </th>
                    <th rowSpan={2} className="text-center align-middle">
                      Đơn vị
                    </th>

                    <th colSpan={9} className="text-center  align-middle">
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
                      length: 39,
                    }).map((_, i) => (
                      <th
                        key={i}
                        className={
                          i <= visibleColumns ? "text-center" : "d-none"
                        }
                      >
                        {convertIndexToDate(i)}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="text-left title-sub">3</td>
                    <td colSpan={41} className="text-left title-sub">
                      Platform Agri
                    </td>
                  </tr>
                  <tr>
                    <td className="text-left title-sub2">3.1</td>
                    <td colSpan={41} className="text-left title-sub2">
                      Số lượng thuê bao PTM Platform Agri
                    </td>
                  </tr>

                  {dataQuantityAgri &&
                    dataQuantityAgri.length > 0 &&
                    dataQuantityAgri.map((item, index) => {
                      const objectProvince = dataQuantityAgri[index];
                      return (
                        <tr key={index}>
                          <td className="text-left">{index + 1}</td>
                          <td className="text-left">
                            {objectProvince.province}
                          </td>
                          {objectProvince.data.map((day, dayIndex) => (
                            <td
                              key={dayIndex}
                              className={
                                dayIndex < visibleColumns
                                  ? "text-center"
                                  : "d-none"
                              }
                            >
                              {day.QUANTITY}
                            </td>
                          ))}
                          {Array.from({
                            length: 39 - objectProvince.data.length,
                          }).map((_, i) => (
                            <td
                              key={objectProvince.data.length + i}
                              //   className={
                              //     i + 5 <= visibleColumns ? "text-center" : "d-none"
                              //   }
                              className="text-center p-0"
                            ></td>
                          ))}
                          <td className="text-center">
                            {objectProvince.data.reduce(
                              (acc, curr) => acc + curr.QUANTITY,
                              0
                            )}
                          </td>
                        </tr>
                      );
                    })}
                   
                  <tr>
                    <td className="text-left title-sub2">3.2</td>
                    <td colSpan={41} className="text-left title-sub2">
                       Doanh thu tập TB PTM Platform Agri
                    </td>
                  </tr>
                  {dataDthuAgri &&
                    dataDthuAgri.length > 0 &&
                    dataDthuAgri.map((item, index) => {
                      const objectProvince = dataDthuAgri[index];
                      return (
                        <tr key={index}>
                          <td className="text-left">{index + 1}</td>
                          <td className="text-left">
                            {objectProvince.province}
                          </td>
                          {objectProvince.data.map((day, dayIndex) => (
                            <td
                              key={dayIndex}
                              className={
                                dayIndex < visibleColumns
                                  ? "text-center"
                                  : "d-none"
                              }
                            >
                              {formatCurrencyVND(day.DT)}
                            </td>
                          ))}
                          {Array.from({
                            length: 39 - objectProvince.data.length,
                          }).map((_, i) => (
                            <td
                              key={objectProvince.data.length + i}
                                // className={
                                //   i + 8 <= visibleColumns ? "text-center" : "d-none"
                                // }
                              className="text-center p-0"
                            ></td>
                          ))}
                          <td className="text-center">
                            {formatCurrencyVND(objectProvince.data.reduce(
                              (acc, curr) => acc + curr.DT,
                              0
                            ))}
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

export default TableMobiAgri;
