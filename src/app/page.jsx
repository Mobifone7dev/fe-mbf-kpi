"use client";
import React from "react";
import UserInfo from "../components/userInfo/UserInfo";
import Image from "next/image";
import Slider from "react-slick";
import Link from "next/link";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useState, useEffect } from "react";
import { topSliders } from "@config/constants";

const Page = () => {
  const [widthWindow, setWidthWindow] = useState(0);
  const [topNews, setTopNews] = useState([]);
  useEffect(() => {
    if (typeof window !== "undefined") {
      setWidthWindow(window.innerWidth);
    }
    setTopNews(topSliders);
  }, []);
  const settingTopnews = {
    dots: true,
    dotsClass: "slick-dots slick-top-news",
    infinite: true,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
  };
  return (
    <div className="home-page">
      <div className="top-news">
        {/* <UserInfo /> */}
        <Slider {...settingTopnews}>
          {topNews.map((item, index) => (
            <div key={index}>
              <Link href={"/"} as={"/"} key={index} className="top-news-item">
                <img src={item.imgSrc} alt="top-new" />
                <div className="top-news-content">
                  {/* <h2>{item.title}</h2> */}
                </div>
              </Link>
            </div>
          ))}
        </Slider>
      </div>
      <div className="container">
        <div className="rows">
          <div className="col-md-12">
            <div className="hot-news">
              <div className="news-thumb-top">
                <img src="news/mobifone1.jpg" alt="hot-news" />
              </div>
              <div className="news-content">
                <span className="project-status on-sale-status">
                  Khuyến Mãi Hiện Hành
                </span>
                <h3>
                  Chương trình hỗ trợ đăng ký lại gói cước cũ cho tập khách hàng
                  M0 (từ 15/8-31/12/2024) (62837){" "}
                </h3>
                <div className="news-caption">
                  KH thỏa các tiêu chí của chương trình được đăng ký các gói
                  cước C50N/C90N và các gói dài kỳ tương ứng (CV 3270)
                </div>
                <p>
                  Thời gian triển khai: -Từ ngày{" "}
                  <span style={{ fontWeight: "bold" }}>15/08/2024</span> đến
                  ngày <span style={{ fontWeight: "bold" }}>31/12/2024 </span>{" "}
                  <br></br>
                  Loại thuê bao:{" "}
                  <span style={{ fontWeight: "bold" }}>
                    Trả sau-Trả trước
                  </span>{" "}
                  <br></br>
                  Khu vực áp dụng:{" "}
                  <span style={{ fontWeight: "bold" }}>TỔNG CÔNG TY</span>{" "}
                  <br></br>
                  Nhóm khuyến mãi:
                  <span style={{ fontWeight: "bold" }}> Sử dụng dịch vụ </span>
                </p>
              </div>
              <div className="news-detail">
                <h5>
                  1. ĐỐI TƯỢNG THUÊ BAO ÁP DỤNG: Các thuê bao đáp ứng đồng thời
                  các tiêu chí sau:
                </h5>
                <ul>
                  <li>
                    <p>
                      Thuê bao trả trước/trả sau MobiFone kích hoạt/hòa mạng
                      trước năm 2024, không bao gồm thuê bao MVNO, Saymee,
                      FastConnect. Thuê bao đang hoạt động hoặc ở trạng thái
                      khóa 1C, 2C.
                    </p>
                  </li>
                  <li>
                    <p>
                      Thuê bao đang không có các gói cước (bao gồm gói hạ tầng
                      số, gói combo hạ tầng số/nội dung số) ở thời điểm lấy dữ
                      liệu.
                    </p>
                  </li>
                  <li>
                    <p>
                      Có lịch sử sử dụng gói C50N hoặc C90N và các gói dài kỳ
                      tương ứng (tính từ thời điểm 01/01/2022 đến thời điểm lấy
                      dữ liệu).
                    </p>
                  </li>
                  <li>
                    <p>Đang sử dụng thiết bị smartphone.</p>
                  </li>
                  <li>
                    <p>
                      Có phát sinh lưu lượng dịch vụ chiều đi hoặc đến trong
                      tháng 07/2024 (xét dịch vụ thoại, SMS, data).
                    </p>
                  </li>
                  <li>
                    <p>
                      Có tổng thời gian phát sinh cước trong tháng 07/2024 lớn
                      hơn 15 ngày.
                    </p>
                  </li>
                  <li>
                    <p>ARPU tháng 07/2024 nhỏ hơn 90.000 đồng.</p>
                  </li>
                </ul>
                <h5>2. NỘI DUNG CHƯƠNG TRÌNH:</h5>
                <p>
                  - Mở lại việc đăng ký các gói cước C50N, C90N cho các thuê bao
                  thuộc đối tượng chương trình, cụ thể:
                </p>
                <div className="table-responsive">
                  <table className="table table-row-dashed table-striped  table-row-gray-300 align-middle gs-0 gy-3 ">
                    <thead className="thead-light">
                      <tr>
                        <th scope="col" style={{ minWidth: 10 }}>
                          STT
                        </th>
                        <th scope="col" style={{ minWidth: 180 }}>
                          Nhóm thuê bao
                        </th>
                        <th scope="col" style={{ minWidth: 180 }}>
                          Gói cước có thể tái đăng ký
                        </th>
                        <th scope=" col col-2" style={{ minWidth: 200 }}>
                          Ghi chú
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>1</td>
                        <td>
                          {" "}
                          <ul>
                            <li>Khách hàng thuộc đối tượng chương trình</li>
                            <li>ARPU tháng 7/2024 dưới 50.000 đồng</li>
                          </ul>
                        </td>
                        <td>
                          {" "}
                          <p>
                            {" "}
                            <span style={{ color: "#007bff" }}>
                              C50N và các gói dài kỳ tương ứng
                            </span>
                          </p>
                        </td>
                        <td>
                          Nội dung SMS MO/MT, kịch bản gói cước theo quy định
                          chung của các gói này
                        </td>
                      </tr>
                      <tr>
                        <td>2</td>
                        <td>
                          {" "}
                          <ul>
                            <li>Khách hàng thuộc đối tượng chương trình</li>
                            <li>
                              ARPU tháng 7/2024 từ 50.000 đồng tới dưới 90.000
                              đồng
                            </li>
                          </ul>
                        </td>
                        <td>
                          {" "}
                          <p>
                            {" "}
                            <span style={{ color: "#007bff" }}>
                              C90N và các gói dài kỳ tương ứng
                            </span>
                          </p>
                        </td>
                        <td>
                          Nội dung SMS MO/MT, kịch bản gói cước theo quy định
                          chung của các gói này
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <h5>3. CHÍNH SÁCH ĐĂNG KÝ/ PHÂN PHỐI:</h5>
                <ul>
                  <li>
                    <p>
                      Chỉ mở kênh khách hàng tự đăng ký qua SMS.
                      <span style={{ fontWeight: "bold" }}>Không</span> cung cấp
                      trên các kênh phân phối gián tiếp khác (mSocial, VAS
                      Online,...).
                    </p>
                  </li>
                  <li>
                    <p>
                      Cú pháp:
                      <span style={{ fontWeight: "bold" }}>
                        {" "}
                        DK Tên gói cước
                      </span>{" "}
                      gửi <span style={{ fontWeight: "bold" }}>789/999</span>
                    </p>
                  </li>
                </ul>
                <h5>
                  4. THỜI GIAN ÁP DỤNG:{" "}
                  <span style={{ color: "#0000FF" }}>
                    Từ 15/8/2024 đến hết 31/12/2024
                  </span>{" "}
                </h5>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
