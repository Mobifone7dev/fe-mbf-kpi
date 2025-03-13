import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { signOut } from "next-auth/react";
import { getQSParamFromURL } from "../../../until/functions";

export async function GET(request: Request) {
    try {
        const URL = process.env.NEXTAUTH_APP_API_URL;
        if (!URL) {
            console.error("❌ Lỗi: NEXTAUTH_APP_API_URL không được định nghĩa");
            return NextResponse.json({ message: "API URL không được định nghĩa" }, { status: 500 });
        }

        const kpiType = getQSParamFromURL("kpiType", request.url);
        const month = getQSParamFromURL("month", request.url);
        const provincePt = getQSParamFromURL("provincePt", request.url);
        console.log("📌 FE gửi province_pt:", provincePt);
        if (!month || !kpiType) {
            return NextResponse.json({ message: "Thiếu tham số month hoặc kpiType" }, { status: 400 });
        }

        // Chuyển đổi format month từ "MM/YYYY" → "DD/MM/YYYY"
        const convertedMonth = `01/${month}`;

        const accessToken = cookies().get("accessToken")?.value;
        if (!accessToken) {
            console.error("❌ Không tìm thấy accessToken");
            return NextResponse.json({ message: "Không tìm thấy accessToken" }, { status: 401 });
        }

        // 🔥 Thêm provincePt vào API backend nếu có
        const provinceQuery = provincePt ? `&provincePt=${provincePt}` : ""; // 🔥 Đúng key BE yêu cầu
        const apiUrl = `${URL}/dashboard/dashboard-export-excel-exec-kpi?month=${convertedMonth}&kpiType=${kpiType}${provinceQuery}`;

        
        console.log("📌 Gọi API backend:", apiUrl);

        const res = await fetch(apiUrl, {
            headers: { Authorization: `Bearer ${accessToken}` },
        });

        console.log("📌 Response status:", res.status, res.statusText);

        if (res.status === 403) {
            signOut({ redirect: false });
            redirect("/login");
        }

        if (!res.ok) {
            console.error("❌ Lỗi khi gọi API backend:", res.status);
            return NextResponse.json({ success: false, message: "Lỗi từ API backend" }, { status: res.status });
        }

        const data = await res.json();
        // console.log("📌 Dữ liệu từ backend:", JSON.stringify(data, null, 2));

        return NextResponse.json({ success: true, result: data.result });
    } catch (error) {
        console.error("❌ Lỗi trong API Router:", error);
        return NextResponse.json({ message: "Lỗi server", error }, { status: 500 });
    }
}
