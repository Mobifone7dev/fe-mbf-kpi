"use client";
import React from "react";
import { useState, useEffect } from "react";

const Page = () => {
  const [widthWindow, setWidthWindow] = useState(0);
  useEffect(() => {
    if (typeof window !== "undefined") {
      setWidthWindow(window.innerWidth);
    }
  }, []);
  
  <div className="dashboard-page">
    <div className="top-news">
    <h1>DashBoard KPI</h1>
    </div>
  </div>;
};

export default Page;
