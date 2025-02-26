import { NextResponse } from "next/server";
import axios from "axios";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { signOut } from "next-auth/react";

export async function GET(request: Request, response: Response) {
    const URL = process.env.NEXTAUTH_APP_API_URL;

    const month = getQSParamFromURL("month", request.url);    
    console.log("URL", URL+`/dashboard/dashboard-plan-kpi?month=${month}`)
    let res;
    try {
        console.log("cookies.value",cookies().get("accessToken")?.value)
        
        res = await fetch(
            URL+`/dashboard/dashboard-plan-kpi?month=${month}`,    
            { headers: {"Authorization" : `Bearer ${cookies().get("accessToken")?.value}`} })
            if(res.status == 403) {
                signOut({ redirect: false });
                redirect("/login");
            }
        const data = await res.json()
        if (res) {
            return NextResponse.json({
                success: true,result : data.result
            });
        } else {
            console.log('res', res)
            return NextResponse.json({ success: false });
        }

    } catch (e) {
       console.log(e)
        return NextResponse.json({ success: false })
    }

   

}
function getQSParamFromURL(key:string, url:string) {
    if (!url) return "";
    const search = new URL(url).search;
    const urlParams = new URLSearchParams(search);
    return urlParams.get(key);
  }
 
 