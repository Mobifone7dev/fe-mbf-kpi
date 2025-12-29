"use client";
import { useRouter } from "next/navigation";
import { useState } from 'react'
import GDVComponent from '../../../components/tabs/area/GDVComponent.jsx';
import NVBHComponent from "../../../components/tabs/area/NVBHComponent.jsx";
export default function AreaDetail({ params }) {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('tab1')

  const { id } = params;

  console.log("id", id);

  return (
    <div className="dashboard-kpi-area">
      <button className="btn btn-primary" onClick={() => router.back()}>
        ← Quay lại
      </button>
      <h4> {`Trang chi tiết vùng ${params.id}`}</h4>
      <ul className="nav nav-tabs">
        <li className="nav-item">
          <button
            className={`nav-link ${activeTab === "tab1" ? "active" : ""}`}
            onClick={() => setActiveTab("tab1")}
          >
            KPI thực hiện của GDV
          </button>
        </li>
        <li className="nav-item">
          <button
            className={`nav-link ${activeTab === "tab2" ? "active" : ""}`}
            onClick={() => setActiveTab("tab2")}
          >
            KPI thực hiện của NVBH
          </button>
        </li>
        {/* <li className="nav-item">
          <button
            className={`nav-link ${activeTab === "tab3" ? "active" : ""}`}
            onClick={() => setActiveTab("tab3")}
          >
            KPI thực hiện của AM
          </button>
        </li> */}
      </ul>

      {/* TAB CONTENT */}
      <div className="tab-content border border-top-0 p-3 bg-white">
        {activeTab === "tab1" && (
          <div className="tab-pane active">
            <GDVComponent area={id} />
          </div>
        )}

        {activeTab === "tab2" && (
          <div className="tab-pane active">
            <NVBHComponent area={id}/>
          </div>
        )}

        {/* {activeTab === "tab3" && (
          <div className="tab-pane active">
            <h4>AM</h4>
          </div>
        )} */}
      </div>
    </div>
  );
}
