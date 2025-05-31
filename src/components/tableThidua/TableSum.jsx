"use client";
import { convertIndexToDateM2M, formatCurrencyVND } from "../../lib/utils";
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
} from "../../lib/states/counter";

import { useEffect } from "react";

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

  useEffect(() => {
    // console.log(
    //   "check",
    //   parseFloat(
    //     (counterLocalAgriQuantityKHO * 100) / kpiData.AGRI_SL[0].data
    //   ).toFixed(2)
    // );
  }, []);

  return (
    <>
      <h5 className="mb-2 text-center mt-2">
        Bảng tổng hợp thi đua 23/05 - 30/06
      </h5>
      <div className="table-responsive  d-flex justify-content-center aligns-item-center">
        <table className="table table-bordered table-sum">
          <thead>
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
          <tbody>
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
              <td>{sumPlanCloud}</td>
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
                    (counterLocalSumAgriQuantity * 100) /
                      sumAgriQuantity
                  ).toFixed(2)}
                </span>{" "}
                <span style={{ fontStyle: "italic" }}>%</span>
              </td>
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
                    ? kpiData.AGRI_DTHU[i].data / 1000000
                    : ""}
                </td>
              ))}
              <td>{sumAgriDthu / 1000000}</td>
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
              <td>4</td>
              <td>Thuê bao PTM M2M</td>
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
                  {kpiData && kpiData.M2M[i] && kpiData.M2M[i].data}
                </td>
              ))}
              <td>{sumM2MQuantity}</td>
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
          </tbody>
        </table>
      </div>
    </>
  );
}
