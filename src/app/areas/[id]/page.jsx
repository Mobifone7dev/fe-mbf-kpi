"use client";
import { useRouter } from "next/navigation";

export default function AreaDetail({ params }) {
  const router = useRouter();

  const { id } = params;

  console.log("id", id);

  return (
    <div style={{ padding: 20 }}>
      <button className="btn btn-primary" onClick={() => router.back()}>← Quay lại</button>
      <h1>Trang chi tiết vùng</h1>
      <div>{params.id}</div>
    </div>
  );
}
