"use client";
import { useRouter } from "next/navigation";
import { useState } from 'react'
import GDVComponent from '../../../components/tabs/area/GDVComponent.jsx';
export default function AreaDetail({ params }) {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('tab1')

  const { id } = params;

  console.log("id", id);

  return (
    <div className="dashboard-kpi-dla">
      <button className="btn btn-primary" onClick={() => router.back()}>
        ← Quay lại
      </button>
      <h1> {`Trang chi tiết vùng ${params.id}`}</h1>
       <div style={{ display: 'flex', gap: 12 }}>
        <button
          className={activeTab === 'tab1' ? 'active' : ''}
          onClick={() => setActiveTab('tab1')}
        >
          KPI GDV
        </button>
        <button
          className={activeTab === 'tab2' ? 'active' : ''}
          onClick={() => setActiveTab('tab2')}
        >
          KPI NVBH
        </button>
        <button
          className={activeTab === 'tab3' ? 'active' : ''}
          onClick={() => setActiveTab('tab3')}
        >
          
        </button>
      </div>

      {/* TAB CONTENT */}
      <div style={{ marginTop: 16 }}>
        {activeTab === 'tab1' && <div>
          <GDVComponent/>
          </div>}
        {activeTab === 'tab2' && <div>Nội dung Tab 2</div>}
        {activeTab === 'tab3' && <div>Nội dung Tab 3</div>}
      </div>
      
    </div>
  );
}
