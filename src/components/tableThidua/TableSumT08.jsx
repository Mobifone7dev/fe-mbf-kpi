"use client";
import {
  convertIndexToDateM2M,
  formatCurrencyVND,
  getRanking,
} from "../../lib/utils";
import { useRecoilState } from "recoil";
import { kpiSummaryDataT08 as kpiData } from "../../lib/rawData";
import {
  counterSumLTTSL,
  counterLTTSLKHO,
  counterLTTSLDLA,
  counterLTTSLGLA,
  counterLTTSLPYE,
  counterLTTSLDNO,
  counterLTTSLKON,
  counterSumCameraSL,
  counterCameraSLKHO,
  counterCameraSLDLA,
  counterCameraSLGLA,
  counterCameraSLPYE,
  counterCameraSLDNO,
  counterCameraSLKON,
} from "../../lib/states/counter";

import { useEffect, useState } from "react";

const sumPlanLTT = 1000;
const sumPlanCamera = 490;

export function TableSumT08(props) {
  const [counterLocalSumLTTSL, setCounterLocalSumLTTSL] =
    useRecoilState(counterSumLTTSL);
  const [counterLocalLTTSLKHO, setCounterLocalLTTSLKHO] =
    useRecoilState(counterLTTSLKHO);
  const [counterLocalLTTSLDLA, setCounterLocalLTTSLDLA] =
    useRecoilState(counterLTTSLDLA);
  const [counterLocalLTTSLGLA, setCounterLocalLTTSLGLA] =
    useRecoilState(counterLTTSLGLA);
  const [counterLocalLTTSLPYE, setCounterLocalLTTSLPYE] =
    useRecoilState(counterLTTSLPYE);
  const [counterLocalLTTSLDNO, setCounterLocalLTTSLDNO] =
    useRecoilState(counterLTTSLDNO);
  const [counterLocalLTTSLKON, setCounterLocalLTTSLKON] =
    useRecoilState(counterLTTSLKON);

  const [arrayPercentLTT, setArrayPercentLTT] = useState([]);

  const [counterLocalSumCameraSL, setCounterLocalSumCameraSL] =
    useRecoilState(counterSumCameraSL);
  const [counterLocalCameraSLKHO, setCounterLocalCameraSLKHO] =
    useRecoilState(counterCameraSLKHO);
  const [counterLocalCameraSLDLA, setCounterLocalCameraSLDLA] =
    useRecoilState(counterCameraSLDLA);
  const [counterLocalCameraSLGLA, setCounterLocalCameraSLGLA] =
    useRecoilState(counterCameraSLGLA);
  const [counterLocalCameraSLPYE, setCounterLocalCameraSLPYE] =
    useRecoilState(counterCameraSLPYE);
  const [counterLocalCameraSLDNO, setCounterLocalCameraSLDNO] =
    useRecoilState(counterCameraSLDNO);
  const [counterLocalCameraSLKON, setCounterLocalCameraSLKON] =
    useRecoilState(counterCameraSLKON);

  const [arrayPercentCamera, setArrayPercentCamera] = useState([]);


  useEffect(() => {
   
    setArrayPercentLTT([
      parseFloat(
        parseInt(counterLocalLTTSLKHO) / (kpiData.LTT[0].data )
      ).toFixed(2) * 100,
      parseFloat(
        parseInt(counterLocalLTTSLDLA) / (kpiData.LTT[1].data )
      ).toFixed(2) * 100,
      parseFloat(
        parseInt(counterLocalLTTSLGLA) / (kpiData.LTT[2].data )
      ).toFixed(2) * 100,
      parseFloat(
        parseInt(counterLocalLTTSLPYE) / (kpiData.LTT[3].data )
      ).toFixed(2) * 100,
      parseFloat(
        parseInt(counterLocalLTTSLDNO) / (kpiData.LTT[4].data )
      ).toFixed(2) * 100,
      parseFloat(
        parseInt(counterLocalLTTSLKON) / (kpiData.LTT[5].data )
      ).toFixed(2) * 100,
    ]);
  }, [
    counterLocalLTTSLKHO,
    counterLocalLTTSLDLA,
    counterLocalLTTSLGLA,
    counterLocalLTTSLPYE,
    counterLocalLTTSLDNO,
    counterLocalLTTSLKON,
  ]);

  useEffect(() => {
    setArrayPercentCamera([
      parseFloat(
        parseInt(counterLocalCameraSLKHO) / (kpiData.CAMERA[0].data)
      ).toFixed(2) * 100,
      parseFloat(
        parseInt(counterLocalCameraSLDLA) / (kpiData.CAMERA[1].data)
      ).toFixed(2) * 100,
      parseFloat(
        parseInt(counterLocalCameraSLGLA) / (kpiData.CAMERA[2].data)
      ).toFixed(2) * 100,
      parseFloat(
        parseInt(counterLocalCameraSLPYE) / (kpiData.CAMERA[3].data)
      ).toFixed(2) * 100,
      parseFloat(
        parseInt(counterLocalCameraSLDNO) / (kpiData.CAMERA[4].data)
      ).toFixed(2) * 100,
      parseFloat(
        parseInt(counterLocalCameraSLKON) / (kpiData.CAMERA[5].data)
      ).toFixed(2) * 100,
    ]);
  }, [
    counterLocalCameraSLKHO,
    counterLocalCameraSLDLA,
    counterLocalCameraSLGLA,
    counterLocalCameraSLPYE,
    counterLocalCameraSLDNO,
    counterLocalCameraSLKON,
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
        Bảng tổng hợp thi đua 01/08 - 31/08
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
              <td>Số lượng LTT</td>
              {Array.from({ length: 8 }).map((_, i) => (
                <td key={i} className="text-right"></td>
              ))}
            </tr>
            <tr>
              <td></td>
              <td>Kế hoạch thi đua</td>
              <td style={{ fontStyle: "italic" }}>Cái</td>
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
                {parseFloat(parseInt(counterLocalLTTSLKHO) ).toFixed(
                  2
                )}
              </td>
              <td className="text-right">
                {parseFloat(parseInt(counterLocalLTTSLDLA) ).toFixed(
                  2
                )}
              </td>
              <td className="text-right">
                {}
                {parseFloat(parseInt(counterLocalLTTSLGLA) ).toFixed(
                  2
                )}
              </td>
              <td className="text-right">
                {parseFloat(parseInt(counterLocalLTTSLPYE) ).toFixed(
                  2
                )}
              </td>
              <td className="text-right">
                {parseFloat(parseInt(counterLocalLTTSLDNO) ).toFixed(
                  2
                )}
              </td>
              <td className="text-right">
                {parseFloat(parseInt(counterLocalLTTSLKON) ).toFixed(
                  2
                )}
              </td>
              <td className="text-right">
                {parseFloat(parseInt(counterLocalSumLTTSL) ).toFixed(
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
                  (parseInt(counterLocalLTTSLKHO) /
                    (kpiData.LTT[0].data)) *
                    100
                ).toFixed(2)}
                <span> %</span>
              </td>
              <td className="text-right text-danger">
                {parseFloat(
                  (parseInt(counterLocalLTTSLDLA) /
                    (kpiData.LTT[1].data)) *
                    100
                ).toFixed(2)}

                <span> %</span>
              </td>
              <td className="text-right text-danger">
                {parseFloat(
                  (parseInt(counterLocalLTTSLGLA) /
                    (kpiData.LTT[2].data)) *
                    100
                ).toFixed(2)}
                <span> %</span>
              </td>
              <td className="text-right text-danger">
                {parseFloat(
                  (parseInt(counterLocalLTTSLPYE) /
                    (kpiData.LTT[3].data)) *
                    100
                ).toFixed(2)}
                <span> %</span>
              </td>

              <td className="text-right text-danger">
                {parseFloat(
                  (parseInt(counterLocalLTTSLDNO) /
                    (kpiData.LTT[4].data)) *
                    100
                ).toFixed(2)}
                <span> %</span>
              </td>
              <td className="text-right text-danger">
                {parseFloat(
                  (parseInt(counterLocalLTTSLKON) /
                    (kpiData.LTT[5].data)) *
                    100
                ).toFixed(2)}
                <span> %</span>
              </td>
              <td className="text-right text-danger">
                {parseFloat(
                  (counterLocalSumLTTSL / (sumPlanLTT)) * 100
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
                    parseInt(counterLocalLTTSLKHO) /
                      (kpiData.LTT[0].data)
                  ).toFixed(2) * 100
                )}
              </td>

              <td className="text-right">
                {getRanking(
                  arrayPercentLTT,
                  parseFloat(
                    parseInt(counterLocalLTTSLDLA) /
                      (kpiData.LTT[1].data)
                  ).toFixed(2) * 100
                )}
              </td>

              <td className="text-right">
                {getRanking(
                  arrayPercentLTT,
                  parseFloat(
                    parseInt(counterLocalLTTSLGLA) /
                      (kpiData.LTT[2].data)
                  ).toFixed(2) * 100
                )}
              </td>
              <td className="text-right">
                {getRanking(
                  arrayPercentLTT,
                  parseFloat(
                    parseInt(counterLocalLTTSLPYE) /
                      (kpiData.LTT[3].data)
                  ).toFixed(2) * 100
                )}
              </td>

              <td className="text-right">
                {getRanking(
                  arrayPercentLTT,
                  parseFloat(
                    parseInt(counterLocalLTTSLDNO) /
                      (kpiData.LTT[4].data)
                  ).toFixed(2) * 100
                )}
              </td>

              <td className="text-right">
                {getRanking(
                  arrayPercentLTT,
                  parseFloat(
                    parseInt(counterLocalLTTSLKON) /
                      (kpiData.LTT[5].data)
                  ).toFixed(2) * 100
                )}
              </td>
              <td></td>
            </tr>
            <tr>
              <td>2</td>
              <td>Số lượng Camera</td>
              {Array.from({ length: 8 }).map((_, i) => (
                <td key={i} className="text-right"></td>
              ))}
            </tr>
            <tr>
              <td></td>
              <td>Kế hoạch thi đua</td>
              <td style={{ fontStyle: "italic" }}>Cái</td>
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
                  parseInt(counterLocalCameraSLKHO) 
                ).toFixed(2)}
              </td>
              <td className="text-right">
                {parseFloat(
                  parseInt(counterLocalCameraSLDLA) 
                ).toFixed(2)}
              </td>
              <td className="text-right">
                {parseFloat(
                  parseInt(counterLocalCameraSLGLA) 
                ).toFixed(2)}
              </td>
              <td className="text-right">
                {parseFloat(
                  parseInt(counterLocalCameraSLPYE) 
                ).toFixed(2)}
              </td>
              <td className="text-right">
                {parseFloat(
                  parseInt(counterLocalCameraSLDNO) 
                ).toFixed(2)}
              </td>
              <td className="text-right">
                {parseFloat(
                  parseInt(counterLocalCameraSLKON) 
                ).toFixed(2)}
              </td>
              <td className="text-right">
                {parseFloat(
                  parseInt(counterLocalSumCameraSL) 
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
                  (parseInt(counterLocalCameraSLKHO) /
                    (kpiData.CAMERA[0].data)) *
                    100
                ).toFixed(2)}
                <span> %</span>
              </td>
              <td className="text-right text-danger">
                {parseFloat(
                  (parseInt(counterLocalCameraSLDLA) /
                    (kpiData.CAMERA[1].data)) *
                    100
                ).toFixed(2)}
                <span> %</span>
              </td>
              <td className="text-right text-danger">
                {parseFloat(
                  (parseInt(counterLocalCameraSLGLA) /
                    (kpiData.CAMERA[2].data)) *
                    100
                ).toFixed(2)}
                <span> %</span>
              </td>
              <td className="text-right text-danger">
                {parseFloat(
                  (parseInt(counterLocalCameraSLPYE) /
                    (kpiData.CAMERA[3].data)) *
                    100
                ).toFixed(2)}
                <span> %</span>
              </td>

              <td className="text-right text-danger">
                {parseFloat(
                  (parseInt(counterLocalCameraSLDNO) /
                    (kpiData.CAMERA[4].data)) *
                    100
                ).toFixed(2)}
                <span> %</span>
              </td>
              <td className="text-right text-danger">
                {parseFloat(
                  (parseInt(counterLocalCameraSLKON) /
                    (kpiData.CAMERA[5].data)) *
                    100
                ).toFixed(2)}
                <span> %</span>
              </td>
              <td className="text-right text-danger">
                {parseFloat(
                  (counterLocalSumCameraSL / (sumPlanCamera)) * 100
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
                    parseInt(counterLocalCameraSLKHO) /
                      (kpiData.CAMERA[0].data)
                  ).toFixed(2) * 100
                )}
              </td>

              <td className="text-right">
                {getRanking(
                  arrayPercentCamera,
                  parseFloat(
                    parseInt(counterLocalCameraSLDLA) /
                      (kpiData.CAMERA[1].data)
                  ).toFixed(2) * 100
                )}
              </td>

              <td className="text-right">
                {getRanking(
                  arrayPercentCamera,
                  parseFloat(
                    parseInt(counterLocalCameraSLGLA) /
                      (kpiData.CAMERA[2].data)
                  ).toFixed(2) * 100
                )}
              </td>
              <td className="text-right">
                {getRanking(
                  arrayPercentCamera,
                  parseFloat(
                    parseInt(counterLocalCameraSLPYE) /
                      (kpiData.CAMERA[3].data)
                  ).toFixed(2) * 100
                )}
              </td>

              <td className="text-right">
                {getRanking(
                  arrayPercentCamera,
                  parseFloat(
                    parseInt(counterLocalCameraSLDNO) /
                      (kpiData.CAMERA[4].data)
                  ).toFixed(2) * 100
                )}
              </td>

              <td className="text-right">
                {getRanking(
                  arrayPercentCamera,
                  parseFloat(
                    parseInt(counterLocalCameraSLKON) /
                      (kpiData.CAMERA[5].data)
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
