"use client";
import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import LoadingComponent from "@components/loading/LoadingComponent";
import { dataRawKpi } from "../../lib/rawData";
import { convertIndexToDate } from "../../lib/utils";
const API_URL = process.env.NEXTAUTH_APP_API_URL_SSL;

function Page(props) {
  const [loading, setLoading] = useState(false);
  const [loadingMobiAgri, setLoadingMobiAgri] = useState(false);
  const [data, setData] = useState(dataRawKpi);
  const [dataCloud, setDataCloud] = useState([]);
  const [dataAgri, setDataAgri] = useState([]);
  const [visibleColumns, setVisibleColumns] = useState(10);

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
    const response = await fetch(
      `${API_URL}/dashboard-thidua/sl-thidua-mobiagri` // Replace with your actual API endpoint
    );
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    console.log("data", data);
    let dataAgriKHO = { province: "KHO", data: [] };
    let dataAgriDLA = { province: "DLA", data: [] };
    let dataAgriGLA = { province: "GLA", data: [] };
    let dataAgriPYE = { province: "PYE", data: [] };
    let dataAgriDNO = { province: "DNO", data: [] };
    let dataAgriKON = { province: "KON", data: [] };

    if (data && data.data && data.data.length > 0) {
      data.data.forEach((item) => {
        if (item.PROVINCE_PT === "KHO") {
          dataAgriKHO.data.push(item);
        } else if (item.PROVINCE_PT === "DLA") {
          dataAgriDLA.data.push(item);
        } else if (item.PROVINCE_PT === "GLA") {
          dataAgriGLA.data.push(item);
        } else if (item.PROVINCE_PT === "PYE") {
          dataAgriPYE.data.push(item);
        } else if (item.PROVINCE_PT === "DNO") {
          dataAgriDNO.data.push(item);
        } else if (item.PROVINCE_PT === "KON") {
          dataAgriKON.data.push(item);
        }
      });
    }
    setLoadingMobiAgri(false);
    console.log("dataAgriKHO", dataAgriKHO);
    console.log("dataAgriDLA", dataAgriDLA);

    setDataAgri([
      dataAgriKHO,
      dataAgriDLA,
      dataAgriGLA,
      dataAgriPYE,
      dataAgriDNO,
      dataAgriKON,
    ]);
  };

  return (
    <div className="dashboard-thidua">
      <h3 className="mt-2 title">Dashboard thi đua 27/05 - 30/06</h3>
      <div className="table-sum"></div>

      <div className="agri-section">
        <h4>MobiAgri platform</h4>
        <div className="d-flex flex-start flex-wrap mb-3">
          <button
            className="btn btn-primary  me-5"
            onClick={() => handleShowMore()}
          >
           {`Mở rộng bảng  >>`}
          </button>

          <button
            className="btn btn-primary  "
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
                    className={i <= visibleColumns ? "text-center" : "d-none"}
                  >
                    {convertIndexToDate(i)}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="text-left">3</td>
                <td colSpan={41} className="text-left">
                  Platform Agri
                </td>
              </tr>
              <tr>
                <td className="text-left">3.1</td>
                <td colSpan={41} className="text-left">
                  Số lượng thuê bao PTM Platform Agri
                </td>
              </tr>

              {dataAgri &&
                dataAgri.length > 0 &&
                dataAgri.map((item, index) => {
                  const objectProvince = dataAgri[index];
                  return (
                    <tr key={index}>
                      <td className="text-left">{index + 1}</td>
                      <td className="text-left">{objectProvince.province}</td>
                      {objectProvince.data.map((day, dayIndex) => (
                        <td
                          key={dayIndex}
                          className={
                            dayIndex < visibleColumns ? "text-center" : "d-none"
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
                        //     i + 10 <= visibleColumns ? "text-center" : "d-none"
                        //   }
                        className="text-center"
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
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Page;
