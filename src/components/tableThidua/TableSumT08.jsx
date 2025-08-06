"use client";
import {
  convertIndexToDateM2M,
  formatCurrencyVND,
  getRanking,
} from "../../lib/utils";
import { useRecoilState } from "recoil";
import { kpiSummaryDataT08 as kpiData } from "../../lib/rawData";
import {
  counterSumLTTDthu,
  counterLTTDthuKHO,
  counterLTTDthuDLA,
  counterLTTDthuGLA,
  counterLTTDthuPYE,
  counterLTTDthuDNO,
  counterLTTDthuKON,
  counterSumCameraDthu,
  counterCameraDthuKHO,
  counterCameraDthuDLA,
  counterCameraDthuGLA,
  counterCameraDthuPYE,
  counterCameraDthuDNO,
  counterCameraDthuKON,
} from "../../lib/states/counter";

import { useEffect, useState } from "react";

const sumPlanLTT = 550;
const sumPlanCamera = 450;

export function TableSumT08(props) {
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

  const [arrayPercentLTT, setArrayPercentLTT] = useState([]);

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

  const [arrayPercentCamera, setArrayPercentCamera] = useState([]);


  useEffect(() => {
   
    setArrayPercentLTT([
      parseFloat(
        parseInt(counterLocalLTTDthuKHO) / (kpiData.LTT[0].data * 1000000)
      ).toFixed(2) * 100,
      parseFloat(
        parseInt(counterLocalLTTDthuDLA) / (kpiData.LTT[1].data * 1000000)
      ).toFixed(2) * 100,
      parseFloat(
        parseInt(counterLocalLTTDthuGLA) / (kpiData.LTT[2].data * 1000000)
      ).toFixed(2) * 100,
      parseFloat(
        parseInt(counterLocalLTTDthuPYE) / (kpiData.LTT[3].data * 1000000)
      ).toFixed(2) * 100,
      parseFloat(
        parseInt(counterLocalLTTDthuDNO) / (kpiData.LTT[4].data * 1000000)
      ).toFixed(2) * 100,
      parseFloat(
        parseInt(counterLocalLTTDthuKON) / (kpiData.LTT[5].data * 1000000)
      ).toFixed(2) * 100,
    ]);
  }, [
    counterLocalLTTDthuKHO,
    counterLocalLTTDthuDLA,
    counterLocalLTTDthuGLA,
    counterLocalLTTDthuPYE,
    counterLocalLTTDthuDNO,
    counterLocalLTTDthuKON,
  ]);

  useEffect(() => {
    setArrayPercentCamera([
      parseFloat(
        parseInt(counterLocalCameraDthuKHO) / (kpiData.CAMERA[0].data * 1000000)
      ).toFixed(2) * 100,
      parseFloat(
        parseInt(counterLocalCameraDthuDLA) / (kpiData.CAMERA[1].data * 1000000)
      ).toFixed(2) * 100,
      parseFloat(
        parseInt(counterLocalCameraDthuGLA) / (kpiData.CAMERA[2].data * 1000000)
      ).toFixed(2) * 100,
      parseFloat(
        parseInt(counterLocalCameraDthuPYE) / (kpiData.CAMERA[3].data * 1000000)
      ).toFixed(2) * 100,
      parseFloat(
        parseInt(counterLocalCameraDthuDNO) / (kpiData.CAMERA[4].data * 1000000)
      ).toFixed(2) * 100,
      parseFloat(
        parseInt(counterLocalCameraDthuKON) / (kpiData.CAMERA[5].data * 1000000)
      ).toFixed(2) * 100,
    ]);
  }, [
    counterLocalCameraDthuKHO,
    counterLocalCameraDthuDLA,
    counterLocalCameraDthuGLA,
    counterLocalCameraDthuPYE,
    counterLocalCameraDthuDNO,
    counterLocalCameraDthuKON,
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
        Bảng tổng hợp thi đua 01/08 - 30/08
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
              <td>Doanh thu LTT</td>
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
                  {kpiData && kpiData.LTT[i] && kpiData.LTT[i].data}
                </td>
              ))}
              <td className="text-right">{sumPlanLTT}</td>
            </tr>
            <tr>
              <td></td>
              <td>Lũy kế thực hiện</td>
              <td></td>
              <td className="text-right">
                {parseFloat(parseInt(counterLocalLTTDthuKHO) / 1000000).toFixed(
                  2
                )}
              </td>
              <td className="text-right">
                {parseFloat(parseInt(counterLocalLTTDthuDLA) / 1000000).toFixed(
                  2
                )}
              </td>
              <td className="text-right">
                {}
                {parseFloat(parseInt(counterLocalLTTDthuGLA) / 1000000).toFixed(
                  2
                )}
              </td>
              <td className="text-right">
                {parseFloat(parseInt(counterLocalLTTDthuPYE) / 1000000).toFixed(
                  2
                )}
              </td>
              <td className="text-right">
                {parseFloat(parseInt(counterLocalLTTDthuDNO) / 1000000).toFixed(
                  2
                )}
              </td>
              <td className="text-right">
                {parseFloat(parseInt(counterLocalLTTDthuKON) / 1000000).toFixed(
                  2
                )}
              </td>
              <td className="text-right">
                {parseFloat(parseInt(counterLocalSumLTTDthu) / 1000000).toFixed(
                  2
                )}
              </td>
            </tr>
            <tr>
              <td></td>
              <td>%THKH thi đua</td>
              <td></td>

              <td className="text-right text-danger">
                {parseFloat(
                  (parseInt(counterLocalLTTDthuKHO) /
                    (kpiData.LTT[0].data * 1000000)) *
                    100
                ).toFixed(2)}
                <span> %</span>
              </td>
              <td className="text-right text-danger">
                {parseFloat(
                  (parseInt(counterLocalLTTDthuDLA) /
                    (kpiData.LTT[1].data * 1000000)) *
                    100
                ).toFixed(2)}

                <span> %</span>
              </td>
              <td className="text-right text-danger">
                {parseFloat(
                  (parseInt(counterLocalLTTDthuGLA) /
                    (kpiData.LTT[2].data * 1000000)) *
                    100
                ).toFixed(2)}
                <span> %</span>
              </td>
              <td className="text-right text-danger">
                {parseFloat(
                  (parseInt(counterLocalLTTDthuPYE) /
                    (kpiData.LTT[3].data * 1000000)) *
                    100
                ).toFixed(2)}
                <span> %</span>
              </td>

              <td className="text-right text-danger">
                {parseFloat(
                  (parseInt(counterLocalLTTDthuDNO) /
                    (kpiData.LTT[4].data * 1000000)) *
                    100
                ).toFixed(2)}
                <span> %</span>
              </td>
              <td className="text-right text-danger">
                {parseFloat(
                  (parseInt(counterLocalLTTDthuKON) /
                    (kpiData.LTT[5].data * 1000000)) *
                    100
                ).toFixed(2)}
                <span> %</span>
              </td>
              <td className="text-right text-danger">
                {parseFloat(
                  (counterLocalSumLTTDthu / (sumPlanLTT * 1000000)) * 100
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
                  arrayPercentLTT,
                  parseFloat(
                    parseInt(counterLocalLTTDthuKHO) /
                      (kpiData.LTT[0].data * 1000000)
                  ).toFixed(2) * 100
                )}
              </td>

              <td className="text-right">
                {getRanking(
                  arrayPercentLTT,
                  parseFloat(
                    parseInt(counterLocalLTTDthuDLA) /
                      (kpiData.LTT[1].data * 1000000)
                  ).toFixed(2) * 100
                )}
              </td>

              <td className="text-right">
                {getRanking(
                  arrayPercentLTT,
                  parseFloat(
                    parseInt(counterLocalLTTDthuGLA) /
                      (kpiData.LTT[2].data * 1000000)
                  ).toFixed(2) * 100
                )}
              </td>
              <td className="text-right">
                {getRanking(
                  arrayPercentLTT,
                  parseFloat(
                    parseInt(counterLocalLTTDthuPYE) /
                      (kpiData.LTT[3].data * 1000000)
                  ).toFixed(2) * 100
                )}
              </td>

              <td className="text-right">
                {getRanking(
                  arrayPercentLTT,
                  parseFloat(
                    parseInt(counterLocalLTTDthuDNO) /
                      (kpiData.LTT[4].data * 1000000)
                  ).toFixed(2) * 100
                )}
              </td>

              <td className="text-right">
                {getRanking(
                  arrayPercentLTT,
                  parseFloat(
                    parseInt(counterLocalLTTDthuKON) /
                      (kpiData.LTT[5].data * 1000000)
                  ).toFixed(2) * 100
                )}
              </td>
              <td></td>
            </tr>
            <tr>
              <td>2</td>
              <td>Doanh thu Camera</td>
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
                  {kpiData && kpiData.CAMERA[i] && kpiData.CAMERA[i].data}
                </td>
              ))}
              <td className="text-right">{sumPlanCamera}</td>
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
                  parseInt(counterLocalCameraDthuKHO) / 1000000
                ).toFixed(2)}
              </td>
              <td className="text-right">
                {parseFloat(
                  parseInt(counterLocalCameraDthuDLA) / 1000000
                ).toFixed(2)}
              </td>
              <td className="text-right">
                {parseFloat(
                  parseInt(counterLocalCameraDthuGLA) / 1000000
                ).toFixed(2)}
              </td>
              <td className="text-right">
                {parseFloat(
                  parseInt(counterLocalCameraDthuPYE) / 1000000
                ).toFixed(2)}
              </td>
              <td className="text-right">
                {parseFloat(
                  parseInt(counterLocalCameraDthuDNO) / 1000000
                ).toFixed(2)}
              </td>
              <td className="text-right">
                {parseFloat(
                  parseInt(counterLocalCameraDthuKON) / 1000000
                ).toFixed(2)}
              </td>
              <td className="text-right">
                {parseFloat(
                  parseInt(counterLocalSumCameraDthu) / 1000000
                ).toFixed(2)}
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
                  (parseInt(counterLocalCameraDthuKHO) /
                    (kpiData.CAMERA[0].data * 1000000)) *
                    100
                ).toFixed(2)}
                <span> %</span>
              </td>
              <td className="text-right text-danger">
                {parseFloat(
                  (parseInt(counterLocalCameraDthuDLA) /
                    (kpiData.CAMERA[1].data * 1000000)) *
                    100
                ).toFixed(2)}
                <span> %</span>
              </td>
              <td className="text-right text-danger">
                {parseFloat(
                  (parseInt(counterLocalCameraDthuGLA) /
                    (kpiData.CAMERA[2].data * 1000000)) *
                    100
                ).toFixed(2)}
                <span> %</span>
              </td>
              <td className="text-right text-danger">
                {parseFloat(
                  (parseInt(counterLocalCameraDthuPYE) /
                    (kpiData.CAMERA[3].data * 1000000)) *
                    100
                ).toFixed(2)}
                <span> %</span>
              </td>

              <td className="text-right text-danger">
                {parseFloat(
                  (parseInt(counterLocalCameraDthuDNO) /
                    (kpiData.CAMERA[4].data * 1000000)) *
                    100
                ).toFixed(2)}
                <span> %</span>
              </td>
              <td className="text-right text-danger">
                {parseFloat(
                  (parseInt(counterLocalCameraDthuKON) /
                    (kpiData.CAMERA[5].data * 1000000)) *
                    100
                ).toFixed(2)}
                <span> %</span>
              </td>
              <td className="text-right text-danger">
                {parseFloat(
                  (counterLocalSumCameraDthu / (sumPlanCamera * 1000000)) * 100
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
                  arrayPercentCamera,
                  parseFloat(
                    parseInt(counterLocalCameraDthuKHO) /
                      (kpiData.CAMERA[0].data * 1000000)
                  ).toFixed(2) * 100
                )}
              </td>

              <td className="text-right">
                {getRanking(
                  arrayPercentCamera,
                  parseFloat(
                    parseInt(counterLocalCameraDthuDLA) /
                      (kpiData.CAMERA[1].data * 1000000)
                  ).toFixed(2) * 100
                )}
              </td>

              <td className="text-right">
                {getRanking(
                  arrayPercentCamera,
                  parseFloat(
                    parseInt(counterLocalCameraDthuGLA) /
                      (kpiData.CAMERA[2].data * 1000000)
                  ).toFixed(2) * 100
                )}
              </td>
              <td className="text-right">
                {getRanking(
                  arrayPercentCamera,
                  parseFloat(
                    parseInt(counterLocalCameraDthuPYE) /
                      (kpiData.CAMERA[3].data * 1000000)
                  ).toFixed(2) * 100
                )}
              </td>

              <td className="text-right">
                {getRanking(
                  arrayPercentCamera,
                  parseFloat(
                    parseInt(counterLocalCameraDthuDNO) /
                      (kpiData.CAMERA[4].data * 1000000)
                  ).toFixed(2) * 100
                )}
              </td>

              <td className="text-right">
                {getRanking(
                  arrayPercentCamera,
                  parseFloat(
                    parseInt(counterLocalCameraDthuKON) /
                      (kpiData.CAMERA[5].data * 1000000)
                  ).toFixed(2) * 100
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
