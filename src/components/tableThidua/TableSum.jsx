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
  const [arrayPercentQuantityAgri1, setArrayPercentQuantityAgri1] = useState(
    []
  );

  const [arrayPercentQuantityAgri2, setArrayPercentQuantityAgri2] = useState(
    []
  );

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
  const [arrayPercentDthuAgri1, setArrayPercentDthuAgri1] = useState([]);
  const [arrayPercentDthuAgri2, setArrayPercentDthuAgri2] = useState([]);

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
  const [arrayPercentQuantityM2M1, setArrayPercentQuantityM2M1] = useState([]);
  const [arrayPercentQuantityM2M2, setArrayPercentQuantityM2M2] = useState([]);

  const [arrayPercentAgriAvg1, setArrayPercentAgriAvg1] = useState([]);
  const [arrayPercentAgriAvg2, setArrayPercentAgriAvg2] = useState([]);

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

  const [arrayPercentCloud1, setArrayPercentCloud1] = useState([]);
  const [arrayPercentCloud2, setArrayPercentCloud2] = useState([]);

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

  const [arrayPercentIOT1, setArrayPercentIOT1] = useState([]);
  const [arrayPercentIOT2, setArrayPercentIOT2] = useState([]);

  useEffect(() => {
    setArrayPercentAgriAvg1([
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
    ]);
  }, [
    counterLocalAgriQuantityKHO,
    counterLocalAgriQuantityDLA,
    counterLocalAgriQuantityGLA,
    counterLocalAgriDthuKHO,
    counterLocalAgriDthuDLA,
    counterLocalAgriDthuGLA,
  ]);

  useEffect(() => {
    setArrayPercentAgriAvg2([
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
    counterLocalAgriQuantityPYE,
    counterLocalAgriQuantityDNO,
    counterLocalAgriQuantityKON,
    counterLocalAgriDthuPYE,
    counterLocalAgriDthuDNO,
    counterLocalAgriDthuKON,
  ]);

  useEffect(() => {
    if (
      counterLocalAgriQuantityKHO ||
      counterLocalAgriQuantityDLA ||
      counterLocalAgriQuantityGLA
    ) {
      setArrayPercentQuantityAgri1([
        parseFloat(
          (counterLocalAgriQuantityKHO * 100) / kpiData.AGRI_SL[0].data
        ).toFixed(2),
        parseFloat(
          (counterLocalAgriQuantityDLA * 100) / kpiData.AGRI_SL[1].data
        ).toFixed(2),
        parseFloat(
          (counterLocalAgriQuantityGLA * 100) / kpiData.AGRI_SL[2].data
        ).toFixed(2),
      ]);
    }
  }, [
    counterLocalAgriQuantityKHO,
    counterLocalAgriQuantityDLA,
    counterLocalAgriQuantityGLA,
  ]);

  useEffect(() => {
    if (
      counterLocalAgriQuantityPYE ||
      counterLocalAgriQuantityDNO ||
      counterLocalAgriQuantityKON
    ) {
      setArrayPercentQuantityAgri2([
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
    counterLocalAgriQuantityPYE,
    counterLocalAgriQuantityDNO,
    counterLocalAgriQuantityKON,
  ]);
  useEffect(() => {
    if (
      counterLocalM2MQuantityPYE ||
      counterLocalM2MQuantityDNO ||
      counterLocalM2MQuantityKON
    ) {
      setArrayPercentQuantityM2M2([
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
    counterLocalM2MQuantityPYE,
    counterLocalM2MQuantityDNO,
    counterLocalM2MQuantityKON,
  ]);

  useEffect(() => {
    if (
      counterLocalM2MQuantityKHO ||
      counterLocalM2MQuantityDLA ||
      counterLocalM2MQuantityGLA
    ) {
      setArrayPercentQuantityM2M1([
        parseFloat(
          (counterLocalM2MQuantityKHO * 100) / kpiData.M2M[0].data
        ).toFixed(2),
        parseFloat(
          (counterLocalM2MQuantityDLA * 100) / kpiData.M2M[1].data
        ).toFixed(2),
        parseFloat(
          (counterLocalM2MQuantityGLA * 100) / kpiData.M2M[2].data
        ).toFixed(2),
      ]);
    }
  }, [
    counterLocalM2MQuantityPYE,
    counterLocalM2MQuantityDNO,
    counterLocalM2MQuantityKON,
  ]);

  useEffect(() => {
    if (
      counterLocalAgriDthuKHO ||
      counterLocalAgriDthuDLA ||
      counterLocalAgriDthuGLA
    ) {
      setArrayPercentDthuAgri1([
        parseFloat(
          (counterLocalAgriDthuKHO * 100) / kpiData.AGRI_DTHU[0].data
        ).toFixed(2),
        parseFloat(
          (counterLocalAgriDthuDLA * 100) / kpiData.AGRI_DTHU[1].data
        ).toFixed(2),
        parseFloat(
          (counterLocalAgriDthuGLA * 100) / kpiData.AGRI_DTHU[2].data
        ).toFixed(2),
      ]);
    }
  }, [
    counterLocalAgriDthuKHO,
    counterLocalAgriDthuDLA,
    counterLocalAgriDthuGLA,
  ]);

  useEffect(() => {
    if (
      counterLocalAgriDthuPYE ||
      counterLocalAgriDthuDNO ||
      counterLocalAgriDthuKON
    ) {
      setArrayPercentDthuAgri2([
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
    counterLocalAgriDthuPYE,
    counterLocalAgriDthuDNO,
    counterLocalAgriDthuKON,
  ]);

  useEffect(() => {
    setArrayPercentCloud1([
      parseFloat(
        (parseInt(counterLocalCloudDthuKHO) +
          counterLocalCloudDthuKHOT4 +
          counterLocalCloudDthuKHOT5) /
          (kpiData.CLOUD[0].data * 1000000)
      ).toFixed(2) * 100,
      parseFloat(
        (parseInt(counterLocalCloudDthuDLA) +
          counterLocalCloudDthuDLAT4 +
          counterLocalCloudDthuDLAT5) /
          (kpiData.CLOUD[1].data * 1000000)
      ).toFixed(2) * 100,
      parseFloat(
        (parseInt(counterLocalCloudDthuGLA) +
          counterLocalCloudDthuGLAT4 +
          counterLocalCloudDthuGLAT5) /
          (kpiData.CLOUD[2].data * 1000000)
      ).toFixed(2) * 100,
    ]);
  }, [
    counterLocalCloudDthuKHO,
    counterLocalCloudDthuDLA,
    counterLocalCloudDthuGLA,
  ]);

  useEffect(() => {
    setArrayPercentCloud2([
      parseFloat(
        (parseInt(counterLocalCloudDthuPYE) +
          counterLocalCloudDthuPYET4 +
          counterLocalCloudDthuPYET5) /
          (kpiData.CLOUD[3].data * 1000000)
      ).toFixed(2) * 100,
      parseFloat(
        (parseInt(counterLocalCloudDthuDNO) +
          counterLocalCloudDthuDNOT4 +
          counterLocalCloudDthuDNOT5) /
          (kpiData.CLOUD[4].data * 1000000)
      ).toFixed(2) * 100,
      parseFloat(
        (parseInt(counterLocalCloudDthuKON) +
          counterLocalCloudDthuKONT4 +
          counterLocalCloudDthuKONT5) /
          (kpiData.CLOUD[5].data * 1000000)
      ).toFixed(2) * 100,
    ]);
  }, [
    counterLocalCloudDthuKHO,
    counterLocalCloudDthuDLA,
    counterLocalCloudDthuGLA,
  ]);

  useEffect(() => {
    setArrayPercentIOT1([
      parseFloat(
        (parseInt(counterLocalIOTDthuKHO) +
          counterLocalIOTDthuKHOT4 +
          counterLocalIOTDthuKHOT5) /
          (kpiData.IOT[0].data * 1000000)
      ).toFixed(2) * 100,
      parseFloat(
        (parseInt(counterLocalIOTDthuDLA) +
          counterLocalIOTDthuDLAT4 +
          counterLocalIOTDthuDLAT5) /
          (kpiData.IOT[1].data * 1000000)
      ).toFixed(2) * 100,
      parseFloat(
        (parseInt(counterLocalIOTDthuGLA) +
          counterLocalIOTDthuGLAT4 +
          counterLocalIOTDthuGLAT5) /
          (kpiData.IOT[2].data * 1000000)
      ).toFixed(2) * 100,
    ]);
  }, [counterLocalIOTDthuKHO, counterLocalIOTDthuDLA, counterLocalIOTDthuGLA]);

  useEffect(() => {
    setArrayPercentIOT2([
      parseFloat(
        (parseInt(counterLocalIOTDthuPYE) +
          counterLocalIOTDthuPYET4 +
          counterLocalIOTDthuPYET5) /
          (kpiData.IOT[3].data * 1000000)
      ).toFixed(2) * 100,
      parseFloat(
        (parseInt(counterLocalIOTDthuDNO) +
          counterLocalIOTDthuDNOT4 +
          counterLocalIOTDthuDNOT5) /
          (kpiData.IOT[4].data * 1000000)
      ).toFixed(2) * 100,
      parseFloat(
        (parseInt(counterLocalIOTDthuKON) +
          counterLocalIOTDthuKONT4 +
          counterLocalIOTDthuKONT5) /
          (kpiData.IOT[5].data * 1000000)
      ).toFixed(2) * 100,
    ]);
  }, [counterLocalIOTDthuKHO, counterLocalIOTDthuDLA, counterLocalIOTDthuGLA]);
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
              <td></td>
              {/* {Array.from({
                length: 8,
              }).map((_, i) => (
                <td key={i} className="text-right"></td>
              ))} */}
              <td className="text-right">
                {parseFloat(
                  (parseInt(counterLocalCloudDthuKHO) +
                    counterLocalCloudDthuKHOT4 +
                    counterLocalCloudDthuKHOT5) /
                    1000000
                ).toFixed(2)}
              </td>
              <td className="text-right">
                {parseFloat(
                  (parseInt(counterLocalCloudDthuDLA) +
                    counterLocalCloudDthuDLAT4 +
                    counterLocalCloudDthuDLAT5) /
                    1000000
                ).toFixed(2)}
              </td>
              <td className="text-right">
                {}
                {parseFloat(
                  (parseInt(counterLocalCloudDthuGLA) +
                    counterLocalCloudDthuGLAT4 +
                    counterLocalCloudDthuGLAT5) /
                    1000000
                ).toFixed(2)}
              </td>
              <td className="text-right">
                {parseFloat(
                  (parseInt(counterLocalCloudDthuPYE) +
                    counterLocalCloudDthuPYET4 +
                    counterLocalCloudDthuPYET5) /
                    1000000
                ).toFixed(2)}
              </td>
              <td className="text-right">
                {parseFloat(
                  (parseInt(counterLocalCloudDthuDNO) +
                    counterLocalCloudDthuDNOT4 +
                    counterLocalCloudDthuDNOT5) /
                    1000000
                ).toFixed(2)}
              </td>
              <td className="text-right">
                {parseFloat(
                  (parseInt(counterLocalCloudDthuKON) +
                    counterLocalCloudDthuKONT4 +
                    counterLocalCloudDthuKONT5) /
                    1000000
                ).toFixed(2)}
              </td>
              <td className="text-right">
                {parseFloat(
                  parseInt(counterLocalSumCloudDthu) / 1000000
                ).toFixed(2)}
              </td>
            </tr>
            <tr>
              <td></td>
              <td>%THKH thi đua</td>
              <td></td>

              <td className="text-right text-danger">
                {parseFloat(
                  ((parseInt(counterLocalCloudDthuKHO) +
                    counterLocalCloudDthuKHOT4 +
                    counterLocalCloudDthuKHOT5) /
                    (kpiData.CLOUD[0].data * 1000000)) *
                    100
                ).toFixed(2)}
                <span> %</span>
              </td>
              <td className="text-right text-danger">
                {parseFloat(
                  ((parseInt(counterLocalCloudDthuDLA) +
                    counterLocalCloudDthuDLAT4 +
                    counterLocalCloudDthuDLAT5) /
                    (kpiData.CLOUD[1].data * 1000000)) *
                    100
                ).toFixed(2)}

                <span> %</span>
              </td>
              <td className="text-right text-danger">
                {parseFloat(
                  ((parseInt(counterLocalCloudDthuGLA) +
                    counterLocalCloudDthuGLAT4 +
                    counterLocalCloudDthuGLAT5) /
                    (kpiData.CLOUD[2].data * 1000000)) *
                    100
                ).toFixed(2)}
                <span> %</span>
              </td>
              <td className="text-right text-danger">
                {parseFloat(
                  ((parseInt(counterLocalCloudDthuPYE) +
                    counterLocalCloudDthuPYET4 +
                    counterLocalCloudDthuPYET5) /
                    (kpiData.CLOUD[3].data * 1000000)) *
                    100
                ).toFixed(2)}
                <span> %</span>
              </td>

              <td className="text-right text-danger">
                {parseFloat(
                  ((parseInt(counterLocalCloudDthuDNO) +
                    counterLocalCloudDthuDNOT4 +
                    counterLocalCloudDthuDNOT5) /
                    (kpiData.CLOUD[4].data * 1000000)) *
                    100
                ).toFixed(2)}
                <span> %</span>
              </td>
              <td className="text-right text-danger">
                {parseFloat(
                  ((parseInt(counterLocalCloudDthuKON) +
                    counterLocalCloudDthuKONT4 +
                    counterLocalCloudDthuKONT5) /
                    (kpiData.CLOUD[5].data * 1000000)) *
                    100
                ).toFixed(2)}
                <span> %</span>
              </td>
              <td className="text-right text-danger">
                {parseFloat(
                  (counterLocalSumCloudDthu / (sumPlanCloud * 1000000)) * 100
                ).toFixed(2)}
                <span> %</span>
              </td>
            </tr>
            <tr>
              <td></td>
              <td>Xếp hạng</td>
              <td></td>
              <td className="text-right">
                {getRanking(
                  arrayPercentCloud1,
                  parseFloat(
                    (parseInt(counterLocalCloudDthuKHO) +
                      counterLocalCloudDthuKHOT4 +
                      counterLocalCloudDthuKHOT5) /
                      (kpiData.CLOUD[0].data * 1000000)
                  ).toFixed(2) * 100
                )}
              </td>

              <td className="text-right">
                {getRanking(
                  arrayPercentCloud1,
                  parseFloat(
                    (parseInt(counterLocalCloudDthuDLA) +
                      counterLocalCloudDthuDLAT4 +
                      counterLocalCloudDthuDLAT5) /
                      (kpiData.CLOUD[1].data * 1000000)
                  ).toFixed(2) * 100
                )}
              </td>

              <td className="text-right">
                {getRanking(
                  arrayPercentCloud1,
                  parseFloat(
                    (parseInt(counterLocalCloudDthuGLA) +
                      counterLocalCloudDthuGLAT4 +
                      counterLocalCloudDthuGLAT5) /
                      (kpiData.CLOUD[2].data * 1000000)
                  ).toFixed(2) * 100
                )}
              </td>
              <td className="text-right">
                {getRanking(
                  arrayPercentCloud2,
                  parseFloat(
                    (parseInt(counterLocalCloudDthuPYE) +
                      counterLocalCloudDthuPYET4 +
                      counterLocalCloudDthuPYET5) /
                      (kpiData.CLOUD[3].data * 1000000)
                  ).toFixed(2) * 100
                )}
              </td>

              <td className="text-right">
                {getRanking(
                  arrayPercentCloud2,
                  parseFloat(
                    (parseInt(counterLocalCloudDthuDNO) +
                      counterLocalCloudDthuDNOT4 +
                      counterLocalCloudDthuDNOT5) /
                      (kpiData.CLOUD[4].data * 1000000)
                  ).toFixed(2) * 100
                )}
              </td>

              <td className="text-right">
                {getRanking(
                  arrayPercentCloud2,
                  parseFloat(
                    (parseInt(counterLocalCloudDthuKON) +
                      counterLocalCloudDthuKONT4 +
                      counterLocalCloudDthuKONT5) /
                      (kpiData.CLOUD[5].data * 1000000)
                  ).toFixed(2) * 100
                )}
              </td>
            </tr>
            <tr>
              <td>2</td>
              <td>Doanh thu IOT</td>
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
              <td></td>
              {/* {Array.from({
                length: 8,
              }).map((_, i) => (
                <td key={i} className="text-right"></td>
              ))} */}
              <td className="text-right">
                {parseFloat(
                  (parseInt(counterLocalIOTDthuKHO) +
                    counterLocalIOTDthuKHOT4 +
                    counterLocalIOTDthuKHOT5) /
                    1000000
                ).toFixed(2)}
              </td>
              <td className="text-right">
                {parseFloat(
                  (parseInt(counterLocalIOTDthuDLA) +
                    counterLocalIOTDthuDLAT4 +
                    counterLocalIOTDthuDLAT5) /
                    1000000
                ).toFixed(2)}
              </td>
              <td className="text-right">
                 {parseFloat(
                  (parseInt(counterLocalIOTDthuGLA) +
                    counterLocalIOTDthuGLAT4 +
                    counterLocalIOTDthuGLAT5) /
                    1000000
                ).toFixed(2)}
              </td>
              <td className="text-right">
                {parseFloat(
                  (parseInt(counterLocalIOTDthuPYE) +
                    counterLocalIOTDthuPYET4 +
                    counterLocalIOTDthuPYET5) /
                    1000000
                ).toFixed(2)}
              </td>
              <td className="text-right">
                {parseFloat(
                  (parseInt(counterLocalIOTDthuDNO) +
                    counterLocalIOTDthuDNOT4 +
                    counterLocalIOTDthuDNOT5) /
                    1000000
                ).toFixed(2)}
              </td>
              <td className="text-right">
                 {parseFloat(
                  (parseInt(counterLocalIOTDthuKON) +
                    counterLocalIOTDthuKONT4 +
                    counterLocalIOTDthuKONT5) /
                    1000000
                ).toFixed(2)}
              </td>
              <td className="text-right">
                {parseFloat(parseInt(counterLocalSumIOTDthu) / 1000000).toFixed(
                  2
                )}
              </td>
            </tr>
            <tr>
              <td></td>
              <td>%THKH thi đua</td>
              <td></td>
              {/* {Array.from({
                length: 8,
              }).map((_, i) => (
                <td key={i} className="text-right"></td>
              ))} */}
              {/* <td className="text-right text-danger">
                
                
              </td> */}
              <td className="text-right text-danger">
                {parseFloat(
                  ((parseInt(counterLocalIOTDthuKHO) +
                    counterLocalIOTDthuKHOT4 +
                    counterLocalIOTDthuKHOT5) /
                    (kpiData.IOT[0].data * 1000000)) *
                    100
                ).toFixed(2)}
                <span> %</span>
              </td>
              <td className="text-right text-danger">
                {parseFloat(
                  ((parseInt(counterLocalIOTDthuDLA) +
                    counterLocalIOTDthuDLAT4 +
                    counterLocalIOTDthuDLAT5) /
                    (kpiData.IOT[1].data * 1000000)) *
                    100
                ).toFixed(2)}
                <span> %</span>
              </td>
              <td className="text-right text-danger">
                {parseFloat(
                  ((parseInt(counterLocalIOTDthuGLA) +
                    counterLocalIOTDthuGLAT4 +
                    counterLocalIOTDthuGLAT5) /
                    (kpiData.IOT[2].data * 1000000)) *
                    100
                ).toFixed(2)}
                <span> %</span>
              </td>
              <td className="text-right text-danger">
                {parseFloat(
                  ((parseInt(counterLocalIOTDthuPYE) +
                    counterLocalIOTDthuPYET4 +
                    counterLocalIOTDthuPYET5) /
                    (kpiData.IOT[3].data * 1000000)) *
                    100
                ).toFixed(2)}
                <span> %</span>
              </td>

              <td className="text-right text-danger">
                {parseFloat(
                  ((parseInt(counterLocalIOTDthuDNO) +
                    counterLocalIOTDthuDNOT4 +
                    counterLocalIOTDthuDNOT5) /
                    (kpiData.IOT[4].data * 1000000)) *
                    100
                ).toFixed(2)}
                <span> %</span>
              </td>
              <td className="text-right text-danger">
                {parseFloat(
                  ((parseInt(counterLocalIOTDthuKON) +
                    counterLocalIOTDthuKONT4 +
                    counterLocalIOTDthuKONT5) /
                    (kpiData.IOT[5].data * 1000000)) *
                    100
                ).toFixed(2)}
                <span> %</span>
              </td>
              <td className="text-right text-danger">
                {parseFloat(
                  (counterLocalSumIOTDthu / (sumPlanIOT * 1000000)) * 100
                ).toFixed(2)}
                <span> %</span>
              </td>
            </tr>
            <tr>
              <td></td>
              <td>Xếp hạng</td>
              <td></td>
              <td className="text-right">
                {getRanking(
                  arrayPercentIOT1,
                  parseFloat(
                    (parseInt(counterLocalIOTDthuKHO) +
                      counterLocalIOTDthuKHOT4 +
                      counterLocalIOTDthuKHOT5) /
                      (kpiData.IOT[0].data * 1000000)
                  ).toFixed(2) * 100
                )}
              </td>

              <td className="text-right">
                {getRanking(
                  arrayPercentIOT1,
                  parseFloat(
                    (parseInt(counterLocalIOTDthuDLA) +
                      counterLocalIOTDthuDLAT4 +
                      counterLocalIOTDthuDLAT5) /
                      (kpiData.IOT[1].data * 1000000)
                  ).toFixed(2) * 100
                )}
              </td>

              <td className="text-right">
                {getRanking(
                  arrayPercentIOT1,
                  parseFloat(
                    (parseInt(counterLocalIOTDthuGLA) +
                      counterLocalIOTDthuGLAT4 +
                      counterLocalIOTDthuGLAT5) /
                      (kpiData.IOT[2].data * 1000000)
                  ).toFixed(2) * 100
                )}
              </td>
              <td className="text-right">
                {getRanking(
                  arrayPercentIOT2,
                  parseFloat(
                    (parseInt(counterLocalIOTDthuPYE) +
                      counterLocalIOTDthuPYET4 +
                      counterLocalIOTDthuPYET5) /
                      (kpiData.IOT[3].data * 1000000)
                  ).toFixed(2) * 100
                )}
              </td>

              <td className="text-right">
                {getRanking(
                  arrayPercentIOT2,
                  parseFloat(
                    (parseInt(counterLocalIOTDthuDNO) +
                      counterLocalIOTDthuDNOT4 +
                      counterLocalIOTDthuDNOT5) /
                      (kpiData.IOT[4].data * 1000000)
                  ).toFixed(2) * 100
                )}
              </td>

              <td className="text-right">
                {getRanking(
                  arrayPercentIOT2,
                  parseFloat(
                    (parseInt(counterLocalIOTDthuKON) +
                      counterLocalIOTDthuKONT4 +
                      counterLocalIOTDthuKONT5) /
                      (kpiData.IOT[5].data * 1000000)
                  ).toFixed(2) * 100
                )}
              </td>
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
                  arrayPercentAgriAvg1,
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
                  arrayPercentAgriAvg1,
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
                  arrayPercentAgriAvg1,
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
                  arrayPercentAgriAvg2,
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
                  arrayPercentAgriAvg2,
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
                  arrayPercentAgriAvg2,
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
                  arrayPercentQuantityAgri1,
                  parseFloat(
                    (counterLocalAgriQuantityKHO * 100) /
                      kpiData.AGRI_SL[0].data
                  ).toFixed(2)
                )}
              </td>
              <td className="text-right">
                {getRanking(
                  arrayPercentQuantityAgri1,
                  parseFloat(
                    (counterLocalAgriQuantityDLA * 100) /
                      kpiData.AGRI_SL[1].data
                  ).toFixed(2)
                )}
              </td>
              <td className="text-right">
                {getRanking(
                  arrayPercentQuantityAgri1,
                  parseFloat(
                    (counterLocalAgriQuantityGLA * 100) /
                      kpiData.AGRI_SL[2].data
                  ).toFixed(2)
                )}
              </td>
              <td className="text-right">
                {getRanking(
                  arrayPercentQuantityAgri2,
                  parseFloat(
                    (counterLocalAgriQuantityPYE * 100) /
                      kpiData.AGRI_SL[3].data
                  ).toFixed(2)
                )}
              </td>
              <td className="text-right">
                {getRanking(
                  arrayPercentQuantityAgri2,
                  parseFloat(
                    (counterLocalAgriQuantityDNO * 100) /
                      kpiData.AGRI_SL[4].data
                  ).toFixed(2)
                )}
              </td>
              <td className="text-right">
                {getRanking(
                  arrayPercentQuantityAgri2,
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
                  arrayPercentDthuAgri1,
                  parseFloat(
                    (counterLocalAgriDthuKHO * 100) / kpiData.AGRI_DTHU[0].data
                  ).toFixed(2)
                )}
              </td>
              <td className="text-right">
                {getRanking(
                  arrayPercentDthuAgri1,
                  parseFloat(
                    (counterLocalAgriDthuDLA * 100) / kpiData.AGRI_DTHU[1].data
                  ).toFixed(2)
                )}
              </td>
              <td className="text-right">
                {getRanking(
                  arrayPercentDthuAgri1,
                  parseFloat(
                    (counterLocalAgriDthuGLA * 100) / kpiData.AGRI_DTHU[2].data
                  ).toFixed(2)
                )}
              </td>
              <td className="text-right">
                {getRanking(
                  arrayPercentDthuAgri2,
                  parseFloat(
                    (counterLocalAgriDthuPYE * 100) / kpiData.AGRI_DTHU[3].data
                  ).toFixed(2)
                )}
              </td>
              <td className="text-right">
                {getRanking(
                  arrayPercentDthuAgri2,
                  parseFloat(
                    (counterLocalAgriDthuDNO * 100) / kpiData.AGRI_DTHU[4].data
                  ).toFixed(2)
                )}
              </td>
              <td className="text-right">
                {getRanking(
                  arrayPercentDthuAgri2,
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
                  arrayPercentQuantityM2M1,
                  parseFloat(
                    (counterLocalM2MQuantityKHO * 100) / kpiData.M2M[0].data
                  ).toFixed(2)
                )}
              </td>
              <td className="text-right">
                {getRanking(
                  arrayPercentQuantityM2M1,
                  parseFloat(
                    (counterLocalM2MQuantityDLA * 100) / kpiData.M2M[1].data
                  ).toFixed(2)
                )}
              </td>
              <td className="text-right">
                {getRanking(
                  arrayPercentQuantityM2M1,
                  parseFloat(
                    (counterLocalM2MQuantityGLA * 100) / kpiData.M2M[2].data
                  ).toFixed(2)
                )}
              </td>
              <td className="text-right">
                {getRanking(
                  arrayPercentQuantityM2M2,
                  parseFloat(
                    (counterLocalM2MQuantityPYE * 100) / kpiData.M2M[3].data
                  ).toFixed(2)
                )}
              </td>
              <td className="text-right">
                {getRanking(
                  arrayPercentQuantityM2M2,
                  parseFloat(
                    (counterLocalM2MQuantityDNO * 100) / kpiData.M2M[4].data
                  ).toFixed(2)
                )}
              </td>
              <td className="text-right">
                {getRanking(
                  arrayPercentQuantityM2M2,
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
