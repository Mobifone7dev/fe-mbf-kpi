"use client";
import {
  convertIndexToDateM2M,
  formatCurrencyVND,
  getRanking,
} from "../../lib/utils";
import { useRecoilState } from "recoil";
import { kpiSummaryData as kpiData } from "../../lib/rawData";
import {
  counterSumAgriQuantity,
  counterAgriQuantityKHO,
  counterAgriQuantityDLA,
  counterAgriQuantityGLA,
  counterAgriQuantityPYE,
  counterAgriQuantityDNO,
  counterAgriQuantityKON,
  counterSumAgriDthu,
  counterAgriDthuKHO,
  counterAgriDthuDLA,
  counterAgriDthuGLA,
  counterAgriDthuPYE,
  counterAgriDthuDNO,
  counterAgriDthuKON,
  counterSumM2MQuantity,
  counterM2MQuantityKHO,
  counterM2MQuantityDLA,
  counterM2MQuantityGLA,
  counterM2MQuantityPYE,
  counterM2MQuantityDNO,
  counterM2MQuantityKON,
} from "../../lib/states/counter";

import { useEffect, useState } from "react";

const sumPlanCloud = 1088;
const sumPlanIOT = 1103;
const sumAgriDthu = 818181818;
const sumAgriQuantity = 9000;
const sumM2MQuantity = 1600;
export function TableSum(props) {
  const [counterLocalSumAgriQuantity, setCounterLocalSumAgriQuantity] =
    useRecoilState(counterSumAgriQuantity);
  const [counterLocalAgriQuantityKHO, setCounterLocalAgriQuantityKHO] =
    useRecoilState(counterAgriQuantityKHO);
  const [counterLocalAgriQuantityDLA, setCounterLocalAgriQuantityDLA] =
    useRecoilState(counterAgriQuantityDLA);
  const [counterLocalAgriQuantityGLA, setCounterLocalAgriQuantityGLA] =
    useRecoilState(counterAgriQuantityGLA);
  const [counterLocalAgriQuantityPYE, setCounterLocalAgriQuantityPYE] =
    useRecoilState(counterAgriQuantityPYE);
  const [counterLocalAgriQuantityDNO, setCounterLocalAgriQuantityDNO] =
    useRecoilState(counterAgriQuantityDNO);
  const [counterLocalAgriQuantityKON, setCounterLocalAgriQuantityKON] =
    useRecoilState(counterAgriQuantityKON);
  const [arrayPercentQuantityAgri, setArrayPercentQuantityAgri] = useState([]);

  const [counterLocalSumAgriDthu, setCounterLocalSumAgriDthu] =
    useRecoilState(counterSumAgriDthu);
  const [counterLocalAgriDthuKHO, setCounterLocalAgriDthuKHO] =
    useRecoilState(counterAgriDthuKHO);
  const [counterLocalAgriDthuDLA, setCounterLocalAgriDthuDLA] =
    useRecoilState(counterAgriDthuDLA);
  const [counterLocalAgriDthuGLA, setCounterLocalAgriDthuGLA] =
    useRecoilState(counterAgriDthuGLA);
  const [counterLocalAgriDthuPYE, setCounterLocalAgriDthuPYE] =
    useRecoilState(counterAgriDthuPYE);
  const [counterLocalAgriDthuDNO, setCounterLocalAgriDthuDNO] =
    useRecoilState(counterAgriDthuDNO);
  const [counterLocalAgriDthuKON, setCounterLocalAgriDthuKON] =
    useRecoilState(counterAgriDthuKON);
  const [arrayPercentDthuAgri, setArrayPercentDthuAgri] = useState([]);

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
  const [arrayPercentQuantityM2M, setArrayPercentQuantityM2M] = useState([]);
  const [arrayPercentAgriAvg, setArrayPercentAgriAvg] = useState([]);

  useEffect(() => {
    setArrayPercentAgriAvg([
      parseFloat(
        ((counterLocalAgriDthuKHO * 100) / kpiData.AGRI_DTHU[0].data +
          (counterLocalAgriQuantityKHO * 100) / kpiData.AGRI_SL[0].data) /
          2
      ).toFixed(2),
      parseFloat(
        ((counterLocalAgriDthuDLA * 100) / kpiData.AGRI_DTHU[1].data +
          (counterLocalAgriQuantityDLA * 100) / kpiData.AGRI_SL[1].data) /
          2
      ).toFixed(2),
      parseFloat(
        ((counterLocalAgriDthuGLA * 100) / kpiData.AGRI_DTHU[2].data +
          (counterLocalAgriQuantityGLA * 100) / kpiData.AGRI_SL[2].data) /
          2
      ).toFixed(2),
      parseFloat(
        ((counterLocalAgriDthuPYE * 100) / kpiData.AGRI_DTHU[3].data +
          (counterLocalAgriQuantityPYE * 100) / kpiData.AGRI_SL[3].data) /
          2
      ).toFixed(2),
      parseFloat(
        ((counterLocalAgriDthuDNO * 100) / kpiData.AGRI_DTHU[4].data +
          (counterLocalAgriQuantityDNO * 100) / kpiData.AGRI_SL[4].data) /
          2
      ).toFixed(2),
      parseFloat(
        ((counterLocalAgriDthuKON * 100) / kpiData.AGRI_DTHU[5].data +
          (counterLocalAgriQuantityKON * 100) / kpiData.AGRI_SL[5].data) /
          2
      ).toFixed(2),
    ]);
  }, [
    counterLocalAgriQuantityKHO,
    counterLocalAgriQuantityDLA,
    counterLocalAgriQuantityGLA,
    counterLocalAgriQuantityPYE,
    counterLocalAgriQuantityDNO,
    counterLocalAgriQuantityKON,
    counterLocalAgriDthuKHO,
    counterLocalAgriDthuDLA,
    counterLocalAgriDthuGLA,
    counterLocalAgriDthuPYE,
    counterLocalAgriDthuDNO,
    counterLocalAgriDthuKON,
  ]);

  useEffect(() => {
    if (
      counterLocalAgriQuantityKHO ||
      counterLocalAgriQuantityDLA ||
      counterLocalAgriQuantityGLA ||
      counterLocalAgriQuantityPYE ||
      counterLocalAgriQuantityDNO ||
      counterLocalAgriQuantityKON
    ) {
      setArrayPercentQuantityAgri([
        parseFloat(
          (counterLocalAgriQuantityKHO * 100) / kpiData.AGRI_SL[0].data
        ).toFixed(2),
        parseFloat(
          (counterLocalAgriQuantityDLA * 100) / kpiData.AGRI_SL[1].data
        ).toFixed(2),
        parseFloat(
          (counterLocalAgriQuantityGLA * 100) / kpiData.AGRI_SL[2].data
        ).toFixed(2),
        parseFloat(
          (counterLocalAgriQuantityPYE * 100) / kpiData.AGRI_SL[3].data
        ).toFixed(2),
        parseFloat(
          (counterLocalAgriQuantityDNO * 100) / kpiData.AGRI_SL[4].data
        ).toFixed(2),
        parseFloat(
          (counterLocalAgriQuantityKON * 100) / kpiData.AGRI_SL[5].data
        ).toFixed(2),
      ]);
    }
  }, [
    counterLocalAgriQuantityKHO,
    counterLocalAgriQuantityDLA,
    counterLocalAgriQuantityGLA,
    counterLocalAgriQuantityPYE,
    counterLocalAgriQuantityDNO,
    counterLocalAgriQuantityKON,
  ]);
 

  useEffect(() => {
    if (
      counterLocalM2MQuantityKHO ||
      counterLocalM2MQuantityDLA ||
      counterLocalM2MQuantityGLA ||
      counterLocalM2MQuantityPYE ||
      counterLocalM2MQuantityDNO ||
      counterLocalM2MQuantityKON
    ) {
      setArrayPercentQuantityM2M([
        parseFloat(
          (counterLocalM2MQuantityKHO * 100) / kpiData.M2M[0].data
        ).toFixed(2),
        parseFloat(
          (counterLocalM2MQuantityDLA * 100) / kpiData.M2M[1].data
        ).toFixed(2),
        parseFloat(
          (counterLocalM2MQuantityGLA * 100) / kpiData.M2M[2].data
        ).toFixed(2),
        parseFloat(
          (counterLocalM2MQuantityPYE * 100) / kpiData.M2M[3].data
        ).toFixed(2),
        parseFloat(
          (counterLocalM2MQuantityDNO * 100) / kpiData.M2M[4].data
        ).toFixed(2),
        parseFloat(
          (counterLocalM2MQuantityKON * 100) / kpiData.M2M[5].data
        ).toFixed(2),
      ]);
    }
  }, [
    counterLocalM2MQuantityKHO,
    counterLocalM2MQuantityDLA,
    counterLocalM2MQuantityGLA,
    counterLocalM2MQuantityPYE,
    counterLocalM2MQuantityDNO,
    counterLocalM2MQuantityKON,
  ]);

  useEffect(() => {
    if (
      counterLocalAgriDthuKHO ||
      counterLocalAgriDthuDLA ||
      counterLocalAgriDthuGLA ||
      counterLocalAgriDthuPYE ||
      counterLocalAgriDthuDNO ||
      counterLocalAgriDthuKON
    ) {
      setArrayPercentDthuAgri([
        parseFloat(
          (counterLocalAgriDthuKHO * 100) / kpiData.AGRI_DTHU[0].data
        ).toFixed(2),
        parseFloat(
          (counterLocalAgriDthuDLA * 100) / kpiData.AGRI_DTHU[1].data
        ).toFixed(2),
        parseFloat(
          (counterLocalAgriDthuGLA * 100) / kpiData.AGRI_DTHU[2].data
        ).toFixed(2),
        parseFloat(
          (counterLocalAgriDthuPYE * 100) / kpiData.AGRI_DTHU[3].data
        ).toFixed(2),
        parseFloat(
          (counterLocalAgriDthuDNO * 100) / kpiData.AGRI_DTHU[4].data
        ).toFixed(2),
        parseFloat(
          (counterLocalAgriDthuKON * 100) / kpiData.AGRI_DTHU[5].data
        ).toFixed(2),
      ]);
    }
  }, [
    counterLocalAgriDthuKHO,
    counterLocalAgriDthuDLA,
    counterLocalAgriDthuGLA,
    counterLocalAgriDthuPYE,
    counterLocalAgriDthuDNO,
    counterLocalAgriDthuKON,
  ]);
  const [isSticky, setisSticky] = useState(false);
  const handleSticky = () => {
    const scrollTop = window.scrollY;
    scrollTop > 60 && scrollTop < 1350 ? setisSticky(true) : setisSticky(false);
  };
  useEffect(() => {
    window.addEventListener("scroll", handleSticky);
    return () => {
      window.removeEventListener("scroll", handleSticky);
    };
  });

  return (
    <>
      <h5 className="mb-2 text-center mt-2">
        Bảng tổng hợp thi đua 23/05 - 30/06
      </h5>
      <div className="table-responsive  d-flex justify-content-center aligns-item-center">
        <table className="table table-bordered table-sum">
          <thead className={` ${isSticky && "is-sticky"}`}>
            <tr>
              <th>STT</th>
              <th>Nội dung</th>
              <th>Đơn vị</th>
              <th>Khánh Hòa</th>
              <th>Đắk Lắk</th>
              <th>Gia Lai</th>
              <th>Phú Yên</th>
              <th>Đắk Nông</th>
              <th>Kon Tum</th>
              <th>Tổng</th>
            </tr>
          </thead>
          <tbody className={` ${isSticky && "is-sticky"}`}>
            <tr>
              <td>1</td>
              <td>Doanh thu Cloud</td>
              {Array.from({ length: 8 }).map((_, i) => (
                <td key={i} className="text-right"></td>
              ))}
            </tr>
            <tr>
              <td></td>
              <td>Kế hoạch thi đua</td>
              <td style={{ fontStyle: "italic" }}>triệu đồng</td>
              {Array.from({
                length: 6,
              }).map((_, i) => (
                <td key={i} className="text-right">
                  {kpiData && kpiData.CLOUD[i] && kpiData.CLOUD[i].data}
                </td>
              ))}
              <td className="text-right">{sumPlanCloud}</td>
            </tr>
            <tr>
              <td></td>
              <td>Lũy kế thực hiện</td>
              {Array.from({
                length: 8,
              }).map((_, i) => (
                <td key={i} className="text-right"></td>
              ))}
            </tr>
            <tr>
              <td></td>
              <td>%THKH thi đua</td>
              {Array.from({
                length: 8,
              }).map((_, i) => (
                <td key={i} className="text-right"></td>
              ))}
              {/* <td className="text-right text-danger">
                
              </td> */}
            </tr>
            <tr>
              <td></td>
              <td>Xếp hạng</td>

              {Array.from({
                length: 8,
              }).map((_, i) => (
                <td key={i} className="text-right"></td>
              ))}
            </tr>
            <tr>
              <td>2</td>
              <td>Doanh thu IoT</td>

              {Array.from({ length: 8 }).map((_, i) => (
                <td key={i} className="text-right"></td>
              ))}
            </tr>
            <tr>
              <td></td>
              <td>Kế hoạch thi đua</td>
              <td style={{ fontStyle: "italic" }}>triệu đồng</td>

              {Array.from({
                length: 6,
              }).map((_, i) => (
                <td key={i} className="text-right">
                  {kpiData && kpiData.IOT[i] && kpiData.IOT[i].data}
                </td>
              ))}
              <td className="text-right">{sumPlanIOT}</td>
            </tr>
            <tr>
              <td></td>
              <td>Lũy kế thực hiện</td>
              {Array.from({
                length: 8,
              }).map((_, i) => (
                <td key={i} className="text-right"></td>
              ))}
            </tr>
            <tr>
              <td></td>
              <td>%THKH thi đua</td>

              {Array.from({
                length: 8,
              }).map((_, i) => (
                <td key={i} className="text-right"></td>
              ))}
            </tr>
            <tr>
              <td></td>
              <td>Xếp hạng</td>
              {Array.from({
                length: 8,
              }).map((_, i) => (
                <td key={i} className="text-right"></td>
              ))}
            </tr>
            <tr>
              <td>3</td>
              <td>Platform Agri</td>
              <td></td>
              {Array.from({ length: 7 }).map((_, i) => (
                <td key={i} className="text-right"></td>
              ))}
            </tr>

            <tr>
              <td></td>
              <td>%THKH thi đua</td>
              <td></td>
              <td className="text-right text-danger">
                {parseFloat(
                  ((counterLocalAgriDthuKHO * 100) / kpiData.AGRI_DTHU[0].data +
                    (counterLocalAgriQuantityKHO * 100) /
                      kpiData.AGRI_SL[0].data) /
                    2
                ).toFixed(2)}
                <span style={{ fontStyle: "italic" }}>%</span>
              </td>

              <td className="text-right text-danger">
                {parseFloat(
                  ((counterLocalAgriDthuDLA * 100) / kpiData.AGRI_DTHU[1].data +
                    (counterLocalAgriQuantityDLA * 100) /
                      kpiData.AGRI_SL[1].data) /
                    2
                ).toFixed(2)}
                <span style={{ fontStyle: "italic" }}>%</span>
              </td>
              <td className="text-right text-danger">
                {parseFloat(
                  ((counterLocalAgriDthuGLA * 100) / kpiData.AGRI_DTHU[2].data +
                    (counterLocalAgriQuantityGLA * 100) /
                      kpiData.AGRI_SL[2].data) /
                    2
                ).toFixed(2)}
                <span style={{ fontStyle: "italic" }}>%</span>
              </td>
              <td className="text-right text-danger">
                {parseFloat(
                  ((counterLocalAgriDthuPYE * 100) / kpiData.AGRI_DTHU[3].data +
                    (counterLocalAgriQuantityPYE * 100) /
                      kpiData.AGRI_SL[3].data) /
                    2
                ).toFixed(2)}
                <span style={{ fontStyle: "italic" }}>%</span>
              </td>
              <td className="text-right text-danger">
                {parseFloat(
                  ((counterLocalAgriDthuDNO * 100) / kpiData.AGRI_DTHU[4].data +
                    (counterLocalAgriQuantityDNO * 100) /
                      kpiData.AGRI_SL[4].data) /
                    2
                ).toFixed(2)}
                <span style={{ fontStyle: "italic" }}>%</span>
              </td>
              <td className="text-right text-danger">
                {parseFloat(
                  ((counterLocalAgriDthuKON * 100) / kpiData.AGRI_DTHU[5].data +
                    (counterLocalAgriQuantityKON * 100) /
                      kpiData.AGRI_SL[5].data) /
                    2
                ).toFixed(2)}
                <span style={{ fontStyle: "italic" }}>%</span>
              </td>
              <td></td>
            </tr>
            <tr>
              <td></td>
              <td>Xếp hạng</td>
              <td></td>
              <td className="text-right">
                {getRanking(
                  arrayPercentAgriAvg,
                  parseFloat(
                    ((counterLocalAgriDthuKHO * 100) /
                      kpiData.AGRI_DTHU[0].data +
                      (counterLocalAgriQuantityKHO * 100) /
                        kpiData.AGRI_SL[0].data) /
                      2
                  ).toFixed(2)
                )}
              </td>
              <td className="text-right">
                {getRanking(
                  arrayPercentAgriAvg,
                  parseFloat(
                    ((counterLocalAgriDthuDLA * 100) /
                      kpiData.AGRI_DTHU[1].data +
                      (counterLocalAgriQuantityDLA * 100) /
                        kpiData.AGRI_SL[1].data) /
                      2
                  ).toFixed(2)
                )}
              </td>
              <td className="text-right">
                {getRanking(
                  arrayPercentAgriAvg,
                  parseFloat(
                    ((counterLocalAgriDthuGLA * 100) /
                      kpiData.AGRI_DTHU[2].data +
                      (counterLocalAgriQuantityGLA * 100) /
                        kpiData.AGRI_SL[2].data) /
                      2
                  ).toFixed(2)
                )}
              </td>
              <td className="text-right">
                {getRanking(
                  arrayPercentAgriAvg,
                  parseFloat(
                    ((counterLocalAgriDthuPYE * 100) /
                      kpiData.AGRI_DTHU[3].data +
                      (counterLocalAgriQuantityPYE * 100) /
                        kpiData.AGRI_SL[3].data) /
                      2
                  ).toFixed(2)
                )}
              </td>
              <td className="text-right">
                {getRanking(
                  arrayPercentAgriAvg,
                  parseFloat(
                    ((counterLocalAgriDthuDNO * 100) /
                      kpiData.AGRI_DTHU[4].data +
                      (counterLocalAgriQuantityDNO * 100) /
                        kpiData.AGRI_SL[4].data) /
                      2
                  ).toFixed(2)
                )}
              </td>
              <td className="text-right">
                {getRanking(
                  arrayPercentAgriAvg,
                  parseFloat(
                    ((counterLocalAgriDthuKON * 100) /
                      kpiData.AGRI_DTHU[5].data +
                      (counterLocalAgriQuantityKON * 100) /
                        kpiData.AGRI_SL[5].data) /
                      2
                  ).toFixed(2)
                )}
              </td>
            </tr>
            <tr>
              <td>3.1</td>
              <td>Thuê bao PTM Plaform Agri</td>
              <td></td>
              {Array.from({ length: 7 }).map((_, i) => (
                <td key={i} className="text-right"></td>
              ))}
            </tr>
            <tr>
              <td></td>
              <td>Kế hoạch thi đua</td>
              <td style={{ fontStyle: "italic" }}>Thuê bao</td>

              {Array.from({
                length: 6,
              }).map((_, i) => (
                <td key={i} className="text-right">
                  {kpiData && kpiData.AGRI_SL[i] && kpiData.AGRI_SL[i].data}
                </td>
              ))}
              <td className="text-right">{sumAgriQuantity}</td>
            </tr>
            <tr>
              <td></td>
              <td>Lũy kế thực hiện</td>
              <td></td>
              <td className="text-right">{counterLocalAgriQuantityKHO}</td>
              <td className="text-right">{counterLocalAgriQuantityDLA}</td>
              <td className="text-right">{counterLocalAgriQuantityGLA}</td>
              <td className="text-right">{counterLocalAgriQuantityPYE}</td>
              <td className="text-right">{counterLocalAgriQuantityDNO}</td>
              <td className="text-right">{counterLocalAgriQuantityKON}</td>

              {/* {Array.from({
                length: 5,
              }).map((_, i) => (
                <td key={i} className="text-right"></td>
              ))} */}
              <td className="text-right">{counterLocalSumAgriQuantity}</td>
            </tr>
            <tr>
              <td></td>
              <td>%THKH thi đua</td>
              <td></td>
              <td className="text-right text-danger">
                <span>
                  {parseFloat(
                    (counterLocalAgriQuantityKHO * 100) /
                      kpiData.AGRI_SL[0].data
                  ).toFixed(2)}
                </span>{" "}
                <span style={{ fontStyle: "italic" }}>%</span>
              </td>
              <td className="text-right text-danger">
                <span>
                  {parseFloat(
                    (counterLocalAgriQuantityDLA * 100) /
                      kpiData.AGRI_SL[1].data
                  ).toFixed(2)}
                </span>{" "}
                <span style={{ fontStyle: "italic" }}>%</span>
              </td>
              <td className="text-right text-danger">
                <span>
                  {parseFloat(
                    (counterLocalAgriQuantityGLA * 100) /
                      kpiData.AGRI_SL[2].data
                  ).toFixed(2)}
                </span>{" "}
                <span style={{ fontStyle: "italic" }}>%</span>
              </td>
              <td className="text-right text-danger">
                <span>
                  {parseFloat(
                    (counterLocalAgriQuantityPYE * 100) /
                      kpiData.AGRI_SL[3].data
                  ).toFixed(2)}
                </span>{" "}
                <span style={{ fontStyle: "italic" }}>%</span>
              </td>
              <td className="text-right text-danger">
                <span>
                  {parseFloat(
                    (counterLocalAgriQuantityDNO * 100) /
                      kpiData.AGRI_SL[4].data
                  ).toFixed(2)}
                </span>{" "}
                <span style={{ fontStyle: "italic" }}>%</span>
              </td>
              <td className="text-right text-danger">
                <span>
                  {parseFloat(
                    (counterLocalAgriQuantityKON * 100) /
                      kpiData.AGRI_SL[5].data
                  ).toFixed(2)}
                </span>{" "}
                <span style={{ fontStyle: "italic" }}>%</span>
              </td>
              <td className="text-right text-danger">
                <span>
                  {parseFloat(
                    (counterLocalSumAgriQuantity * 100) / sumAgriQuantity
                  ).toFixed(2)}
                </span>{" "}
                <span style={{ fontStyle: "italic" }}>%</span>
              </td>
            </tr>
            <tr>
              <td></td>
              <td>Xếp hạng</td>
              {/* {Array.from({
                length: 8,
              }).map((_, i) => (
                <td key={i} className="text-right"></td>
              ))} */}
              <td></td>
              <td className="text-right">
                {getRanking(
                  arrayPercentQuantityAgri,
                  parseFloat(
                    (counterLocalAgriQuantityKHO * 100) /
                      kpiData.AGRI_SL[0].data
                  ).toFixed(2)
                )}
              </td>
              <td className="text-right">
                {getRanking(
                  arrayPercentQuantityAgri,
                  parseFloat(
                    (counterLocalAgriQuantityDLA * 100) /
                      kpiData.AGRI_SL[1].data
                  ).toFixed(2)
                )}
              </td>
              <td className="text-right">
                {getRanking(
                  arrayPercentQuantityAgri,
                  parseFloat(
                    (counterLocalAgriQuantityGLA * 100) /
                      kpiData.AGRI_SL[2].data
                  ).toFixed(2)
                )}
              </td>
              <td className="text-right">
                {getRanking(
                  arrayPercentQuantityAgri,
                  parseFloat(
                    (counterLocalAgriQuantityPYE * 100) /
                      kpiData.AGRI_SL[3].data
                  ).toFixed(2)
                )}
              </td>
              <td className="text-right">
                {getRanking(
                  arrayPercentQuantityAgri,
                  parseFloat(
                    (counterLocalAgriQuantityDNO * 100) /
                      kpiData.AGRI_SL[4].data
                  ).toFixed(2)
                )}
              </td>
              <td className="text-right">
                {getRanking(
                  arrayPercentQuantityAgri,
                  parseFloat(
                    (counterLocalAgriQuantityKON * 100) /
                      kpiData.AGRI_SL[5].data
                  ).toFixed(2)
                )}
              </td>
            </tr>

            <tr>
              <td>3.2</td>
              <td>Doanh thu PTM Plaform Agri</td>
              <td></td>
              {Array.from({ length: 7 }).map((_, i) => (
                <td key={i} className="text-right"></td>
              ))}
            </tr>
            <tr>
              <td></td>
              <td>Kế hoạch thi đua</td>
              <td style={{ fontStyle: "italic" }}>Triệu đồng</td>
              {Array.from({
                length: 6,
              }).map((_, i) => (
                <td key={i} className="text-right">
                  {kpiData && kpiData.AGRI_DTHU[i] && kpiData.AGRI_DTHU[i].data
                    ? parseFloat(kpiData.AGRI_DTHU[i].data / 1000000).toFixed(2)
                    : ""}
                </td>
              ))}
              <td className="text-right">
                {parseFloat(sumAgriDthu / 1000000).toFixed(2)}
              </td>
            </tr>
            <tr>
              <td></td>
              <td>Lũy kế thực hiện</td>
              <td></td>
              <td className="text-right">
                {counterLocalAgriDthuKHO / 1000000}
              </td>
              <td className="text-right">
                {counterLocalAgriDthuDLA / 1000000}
              </td>
              <td className="text-right">
                {counterLocalAgriDthuGLA / 1000000}
              </td>
              <td className="text-right">
                {counterLocalAgriDthuPYE / 1000000}
              </td>
              <td className="text-right">
                {counterLocalAgriDthuDNO / 1000000}
              </td>
              <td className="text-right">
                {counterLocalAgriDthuKON / 1000000}
              </td>
              <td className="text-right">
                {counterLocalSumAgriDthu / 1000000}
              </td>
            </tr>
            <tr>
              <td></td>
              <td>%THKH thi đua</td>
              <td></td>
              <td className="text-right text-danger">
                {parseFloat(
                  (counterLocalAgriDthuKHO * 100) / kpiData.AGRI_DTHU[0].data
                ).toFixed(2)}
                <span style={{ fontStyle: "italic" }}>%</span>
              </td>
              <td className="text-right text-danger">
                {parseFloat(
                  (counterLocalAgriDthuDLA * 100) / kpiData.AGRI_DTHU[1].data
                ).toFixed(2)}
                <span style={{ fontStyle: "italic" }}>%</span>
              </td>
              <td className="text-right text-danger">
                {parseFloat(
                  (counterLocalAgriDthuGLA * 100) / kpiData.AGRI_DTHU[2].data
                ).toFixed(2)}
                <span style={{ fontStyle: "italic" }}>%</span>
              </td>
              <td className="text-right text-danger">
                {parseFloat(
                  (counterLocalAgriDthuPYE * 100) / kpiData.AGRI_DTHU[3].data
                ).toFixed(2)}
                <span style={{ fontStyle: "italic" }}>%</span>
              </td>
              <td className="text-right text-danger">
                {parseFloat(
                  (counterLocalAgriDthuDNO * 100) / kpiData.AGRI_DTHU[4].data
                ).toFixed(2)}
                <span style={{ fontStyle: "italic" }}>%</span>
              </td>
              <td className="text-right text-danger">
                {parseFloat(
                  (counterLocalAgriDthuKON * 100) / kpiData.AGRI_DTHU[5].data
                ).toFixed(2)}
                <span style={{ fontStyle: "italic" }}>%</span>
              </td>
              <td className="text-right text-danger">
                {parseFloat(
                  (counterLocalSumAgriDthu * 100) / sumAgriDthu
                ).toFixed(2)}
                <span style={{ fontStyle: "italic" }}>%</span>
              </td>
            </tr>
            <tr>
              <td></td>
              <td>Xếp hạng</td>
              <td></td>
              <td className="text-right">
                {getRanking(
                  arrayPercentDthuAgri,
                  parseFloat(
                    (counterLocalAgriDthuKHO * 100) / kpiData.AGRI_DTHU[0].data
                  ).toFixed(2)
                )}
              </td>
              <td className="text-right">
                {getRanking(
                  arrayPercentDthuAgri,
                  parseFloat(
                    (counterLocalAgriDthuDLA * 100) / kpiData.AGRI_DTHU[1].data
                  ).toFixed(2)
                )}
              </td>
              <td className="text-right">
                {getRanking(
                  arrayPercentDthuAgri,
                  parseFloat(
                    (counterLocalAgriDthuGLA * 100) / kpiData.AGRI_DTHU[2].data
                  ).toFixed(2)
                )}
              </td>
              <td className="text-right">
                {getRanking(
                  arrayPercentDthuAgri,
                  parseFloat(
                    (counterLocalAgriDthuPYE * 100) / kpiData.AGRI_DTHU[3].data
                  ).toFixed(2)
                )}
              </td>
              <td className="text-right">
                {getRanking(
                  arrayPercentDthuAgri,
                  parseFloat(
                    (counterLocalAgriDthuDNO * 100) / kpiData.AGRI_DTHU[4].data
                  ).toFixed(2)
                )}
              </td>
              <td className="text-right">
                {getRanking(
                  arrayPercentDthuAgri,
                  parseFloat(
                    (counterLocalAgriDthuKON * 100) / kpiData.AGRI_DTHU[5].data
                  ).toFixed(2)
                )}
              </td>
              <td></td>
            </tr>
            <tr>
              <td>4</td>
              <td>Thuê bao PTM M2M</td>
              <td></td>
              {Array.from({
                length: 7,
              }).map((_, i) => (
                <td key={i} className="text-right"></td>
              ))}
            </tr>
            <tr>
              <td></td>
              <td>Kế hoạch thi đua</td>
              <td style={{ fontStyle: "italic" }}>Thuê bao</td>

              {Array.from({
                length: 6,
              }).map((_, i) => (
                <td key={i} className="text-right">
                  {kpiData && kpiData.M2M[i] && kpiData.M2M[i].data}
                </td>
              ))}
              <td className="text-right">{sumM2MQuantity}</td>
            </tr>
            <tr>
              <td></td>
              <td>Lũy kế thực hiện</td>
              <td></td>
              <td className="text-right">{counterLocalM2MQuantityKHO}</td>
              <td className="text-right">{counterLocalM2MQuantityDLA}</td>
              <td className="text-right">{counterLocalM2MQuantityGLA}</td>
              <td className="text-right">{counterLocalM2MQuantityPYE}</td>
              <td className="text-right">{counterLocalM2MQuantityDNO}</td>
              <td className="text-right">{counterLocalM2MQuantityKON}</td>
              <td className="text-right">{counterLocalSumM2MQuantity}</td>
            </tr>
            <tr>
              <td></td>
              <td>%THKH thi đua</td>
              <td></td>
              <td className="text-right text-danger">
                {parseFloat(
                  (counterLocalM2MQuantityKHO * 100) / kpiData.M2M[0].data
                ).toFixed(2)}
                <span style={{ fontStyle: "italic" }}>%</span>
              </td>
              <td className="text-right text-danger">
                {parseFloat(
                  (counterLocalM2MQuantityDLA * 100) / kpiData.M2M[1].data
                ).toFixed(2)}
                <span style={{ fontStyle: "italic" }}>%</span>
              </td>
              <td className="text-right text-danger">
                {parseFloat(
                  (counterLocalM2MQuantityGLA * 100) / kpiData.M2M[2].data
                ).toFixed(2)}
                <span style={{ fontStyle: "italic" }}>%</span>
              </td>
              <td className="text-right text-danger">
                {parseFloat(
                  (counterLocalM2MQuantityPYE * 100) / kpiData.M2M[3].data
                ).toFixed(2)}
                <span style={{ fontStyle: "italic" }}>%</span>
              </td>
              <td className="text-right text-danger">
                {parseFloat(
                  (counterLocalM2MQuantityDNO * 100) / kpiData.M2M[4].data
                ).toFixed(2)}
                <span style={{ fontStyle: "italic" }}>%</span>
              </td>
              <td className="text-right text-danger">
                {parseFloat(
                  (counterLocalM2MQuantityKON * 100) / kpiData.M2M[5].data
                ).toFixed(2)}
                <span style={{ fontStyle: "italic" }}>%</span>
              </td>
              <td className="text-right text-danger">
                {parseFloat(
                  (counterLocalSumM2MQuantity * 100) / sumM2MQuantity
                ).toFixed(2)}
                <span style={{ fontStyle: "italic" }}>%</span>
              </td>
            </tr>
            <tr>
              <td></td>
              <td>Xếp hạng</td>
              <td></td>
              <td className="text-right">
                {getRanking(
                  arrayPercentQuantityM2M,
                  parseFloat(
                    (counterLocalM2MQuantityKHO * 100) / kpiData.M2M[0].data
                  ).toFixed(2)
                )}
              </td>
              <td className="text-right">
                {getRanking(
                  arrayPercentQuantityM2M,
                  parseFloat(
                    (counterLocalM2MQuantityDLA * 100) / kpiData.M2M[1].data
                  ).toFixed(2)
                )}
              </td>
              <td className="text-right">
                {getRanking(
                  arrayPercentQuantityM2M,
                  parseFloat(
                    (counterLocalM2MQuantityGLA * 100) / kpiData.M2M[2].data
                  ).toFixed(2)
                )}
              </td>
              <td className="text-right">
                {getRanking(
                  arrayPercentQuantityM2M,
                  parseFloat(
                    (counterLocalM2MQuantityPYE * 100) / kpiData.M2M[3].data
                  ).toFixed(2)
                )}
              </td>
              <td className="text-right">
                {getRanking(
                  arrayPercentQuantityM2M,
                  parseFloat(
                    (counterLocalM2MQuantityDNO * 100) / kpiData.M2M[4].data
                  ).toFixed(2)
                )}
              </td>
              <td className="text-right">
                {getRanking(
                  arrayPercentQuantityM2M,
                  parseFloat(
                    (counterLocalM2MQuantityKON * 100) / kpiData.M2M[5].data
                  ).toFixed(2)
                )}
              </td>
              <td></td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
}
