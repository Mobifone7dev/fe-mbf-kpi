import axios from "axios";

const API_URL = process.env.NEXTAUTH_APP_API_URL_SSL;

export const GET_USER_BY_ACCESSTOKEN_URL = `${API_URL}/verify_token`;
// export const LOGIN_URL = `${API_URL}/sys-user/login`
export const LOGIN_URL = `${API_URL}/login`;
export const REGISTER_URL = `${API_URL}/register`;
export const REQUEST_PASSWORD_URL = `${API_URL}/forgot_password`;
export const CHECK_PACKAGE_URL = `${API_URL}/website/package`;
export const CHECK_TYPE_PACKAGE_URL = `${API_URL}/website/type`;

axios.interceptors.response.use(
  function (response) {
    // Do something with response data
    console.log("check log o day", response)
    return response.data;
  },
  function (error) {
    // Do something with response error
    return Promise.reject(error);
  }
);

// Server should return AuthModel
export async function login(email: string, password: string) {
  console.log('LOGIN_URL', LOGIN_URL, email, password)

  const result = await fetch(LOGIN_URL, {
    method: "POST",// *GET, POST, PUT, DELETE, etc
    headers: {
      "Content-Type": "application/json",
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: JSON.stringify({
      username: email,
      password,
    }), // body data type must match "Content-Type" header
  });
  return result.json();
}

// Server should return AuthModel
export function register(
  email: string,
  firstname: string,
  lastname: string,
  password: string,
  password_confirmation: string
) {
  return axios.post(REGISTER_URL, {
    email,
    first_name: firstname,
    last_name: lastname,
    password,
    password_confirmation,
  });
}

// Server should return object => { result: boolean } (Is Email in DB)
export function requestPassword(email: string) {
  return axios.post<{ result: boolean }>(REQUEST_PASSWORD_URL, {
    email,
  });
}

export function getUserByToken(token: string) {
  // const user: UserModel = {
  //   username: "demo",
  //   password: "123456",
  //   api_token: "sdfsdfsd34sg456trtgfxdg",
  //   created_at: "2022-03-30T12:17:50.000000Z",
  //   email: "admin@admin.com",
  //   email_verified_at: "2022-03-30T12:17:50.000000Z",
  //   first_name: "Maeve",
  //   id: 2,
  //   last_name: "Casper",
  //   updated_at: "2022-03-30T12:17:50.000000Z",
  // } as UserModel;

  return { data: "unknow" };
  //  axios.post<UserModel>(GET_USER_BY_ACCESSTOKEN_URL, {
  //   api_token: token,
  // })
}

export async function checkPackage(searchVal?: string) {
  console.log("CHECK_PACKAGE_URL", CHECK_PACKAGE_URL + `?isdn=${searchVal}`);
  const result = await fetch(CHECK_PACKAGE_URL + `?isdn=${searchVal}`);
  return result;
}

export async function checkTypePackage(searchVal?: string) {
  console.log(
    "CHECK_TYPE_PACKAGE_URL",
    CHECK_TYPE_PACKAGE_URL + `?isdn=${searchVal}`
  );
  const result = await fetch(CHECK_TYPE_PACKAGE_URL + `?isdn=${searchVal}`);
  return result;
}

async function postData(url = "", data = {}) {
  // Default options are marked with *
  const response = await fetch(url, {
    method: "POST", // *GET, POST, PUT, DELETE, etc.
    mode: "cors", // no-cors, *cors, same-origin
    cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
    credentials: "same-origin", // include, *same-origin, omit
    headers: {
      "Content-Type": "application/json",
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    redirect: "follow", // manual, *follow, error
    referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
    body: JSON.stringify(data), // body data type must match "Content-Type" header
  });
  return response.json(); // parses JSON response into native JavaScript objects
}
export async function createManualApiList(postData: any) {
  const URL = process.env.NEXTAUTH_APP_API_URL_SSL;
  console.log("postData", postData);
  let res;
  const token = localStorage.getItem("accessToken");

  try {
    res = await fetch(
      URL + `/dashboard/dashboard-create-manual-list-kpi`,
      {
        method: 'POST',
        headers: {
          "Authorization": `Bearer ${token}`,
          'Content-type': 'application/json',
        },
        body: JSON.stringify(postData)

      })
    if (res.status == 403) {
      throw { unauthorized: true };
    }
    const data = await res.json()
    if (res) {
      return Response.json({
        success: true, result: data.result
      });
    } else {
      console.log('res', res)
      return Response.json({ success: false });
    }

  } catch (e) {
    console.log(e)
    return Response.json(
      { message: "An error occurred while get code.", e },
      { status: 500 }
    );
  }

}

export async function logout() {
  const URL = process.env.NEXTAUTH_APP_API_URL_SSL;
  let res;
  const token = localStorage.getItem("accessToken");

  try {
    res = await fetch(URL + `/authentication/logout`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-type": "application/json",
      },
      body: JSON.stringify({}),
    });
    if (res.status == 403) {
      throw { unauthorized: true };
    }
    const data = await res.json();
    if (res) {
      return Response.json({
        success: true,
        result: data.result,
      });
    } else {
      console.log("res", res);
      return Response.json({ success: false });
    }
  } catch (e) {
    console.log(e);
    return Response.json(
      { message: "An error occurred while get code.", e },
      { status: 500 }
    );
  }
}

export async function createManualApiListDLA(postData: any) {
  const URL = process.env.NEXTAUTH_APP_API_URL_SSL;
  console.log("postData", postData);
  let res;
  const token = localStorage.getItem("accessToken");

  try {
    res = await fetch(URL + `/dashboard/dashboard-create-manual-list-kpi-dla`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-type": "application/json",
      },
      body: JSON.stringify(postData),
    });
    if (res.status == 403 || res.status == 401) {
      throw { unauthorized: true };
    }
    const data = await res.json();
    if (res) {
      return Response.json({
        success: true,
        result: data.result,
      });
    } else {
      console.log("res", res);
      return Response.json({ success: false });
    }
  } catch (e) {
    console.log(e);
    return Response.json(
      { message: "An error occurred while get code.", e },
      { status: 500 }
    );
  }
}

export async function createManualApiListDLAEmployee(postData: any) {
  const URL = process.env.NEXTAUTH_APP_API_URL_SSL;
  console.log("postData", postData);
  let res;
  const token = localStorage.getItem("accessToken");

  try {
    res = await fetch(URL + `/dashboard/dashboard-create-manual-list-kpi-dla-nhan-vien`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-type": "application/json",
      },
      body: JSON.stringify(postData),
    });
    if (res.status == 403 || res.status == 401) {
      throw { unauthorized: true };
    }
    const data = await res.json();
    if (res) {
      return Response.json({
        success: true,
        result: data.result,
      });
    } else {
      console.log("res", res);
      return Response.json({ success: false });
    }
  } catch (e) {
    console.log(e);
    return Response.json(
      { message: "An error occurred while get code.", e },
      { status: 500 }
    );
  }
}

export async function createManualApiListDLAEmployeeExec(postData: any) {
  const URL = process.env.NEXTAUTH_APP_API_URL_SSL;
  console.log("postData", postData);
  let res;
  const token = localStorage.getItem("accessToken");

  try {
    res = await fetch(URL + `/dashboard/dashboard-create-manual-list-kpi-dla-nhan-vien-thuc-hien`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-type": "application/json",
      },
      body: JSON.stringify(postData),
    });
    if (res.status == 403 || res.status == 401) {
      throw { unauthorized: true };
    }
    const data = await res.json();
    if (res) {
      return Response.json({
        success: true,
        result: data.result,
      });
    } else {
      console.log("res", res);
      return Response.json({ success: false });
    }
  } catch (e) {
    console.log(e);
    return Response.json(
      { message: "An error occurred while get code.", e },
      { status: 500 }
    );
  }
}
export async function handleGetPlanKpi(month: string, district?: string) {

  const URL = process.env.NEXTAUTH_APP_API_URL_SSL;
  console.log("URL", URL + `/dashboard/dashboard-plan-kpi?month=${month}`)
  let res;
  const token = localStorage.getItem("accessToken");
  const urlApi = district && district.length > 0 ? URL + `/dashboard/dashboard-plan-kpi?month=${month}&&province=${district}` : URL + `/dashboard/dashboard-plan-kpi-dla?month=${month}`;
  try {
    res = await fetch(
      urlApi,
      { headers: { "Authorization": `Bearer ${token}` } })
    if (res.status == 403) {
      throw { unauthorized: true };
    }
    const data = await res.json()
    if (res) {
      return Response.json({
        success: true, result: data.result
      });
    } else {
      return Response.json({ success: false });
    }

  } catch (e) {
    console.log(e)
    return Response.json(
      { message: "An error occurred while get code.", e },
      { status: 500 }
    );
  }

}

export async function handleGetPlanKpiDLA(month: string, district?: string) {
  const URL = process.env.NEXTAUTH_APP_API_URL_SSL;
  console.log("URL", URL + `/dashboard/dashboard-plan-kpi?month=${month}`);
  let res;
  const token = localStorage.getItem("accessToken");
  const urlApi = URL + `/dashboard/dashboard-plan-kpi-dla?month=${month}`;
  try {
    res = await fetch(urlApi, {
      headers: { Authorization: `Bearer ${token}` },
    });
    if (res.status === 401 || res.status === 403) {
      throw {
        unauthorized: true,
        status: res.status,
        message: "Unauthorized or Forbidden"
      };
    }
    const data = await res.json();
    if (res) {
      return Response.json({
        success: true,
        result: data.result,
      });
    } else {
      return Response.json({ success: false });
    }
  } catch (e) {
    const err = e as { status?: number; message?: string };
    return Response.json(
      {
        message: err.message || "An error occurred while get code.",
        status: err.status || 500,
      },
      {
        status: err.status || 500,
      }
    );
  }
}

export async function handleGetPlanKpiDLAEmployee(month: string, matchSearch: string) {
  const URL = process.env.NEXTAUTH_APP_API_URL_SSL;
  let res;
  const token = localStorage.getItem("accessToken");
  const urlApi = URL + `/dashboard/dashboard-plan-kpi-dla-nhan-vien?month=${month}&matchSearch=${matchSearch}`;
  try {
    res = await fetch(urlApi, {
      headers: { Authorization: `Bearer ${token}` },
    });
    if (res.status == 403 || res.status == 401) {
      throw { unauthorized: true };
    }
    const data = await res.json();
    if (res) {
      return Response.json({
        success: true,
        result: data.result,
      });
    } else {
      console.log("res", res);
      return Response.json({ success: false });
    }
  } catch (e) {
    console.log(e);
    return Response.json(
      { message: "An error occurred while get code.", e },
      { status: 500 }
    );
  }
}

export async function handleGetExecKpi(month: string, province?: string) {
  const URL = process.env.NEXTAUTH_APP_API_URL_SSL;
  let res;
  const token = localStorage.getItem("accessToken");

  try {
    const urlApi = province && province.length > 0 ? URL + `/dashboard/dashboard-exec-kpi?month=${month}&&province=${province}` : URL + `/dashboard/dashboard-exec-kpi?month=${month}`;
    res = await fetch(
      urlApi,
      { headers: { "Authorization": `Bearer ${token}` } })
    if (res.status == 403 || res.status == 401) {
      throw { unauthorized: true };
    }
    const data = await res.json()
    if (res) {
      return Response.json({
        success: true, result: data.result
      });
    } else {
      console.log('res', res)
      return Response.json({ success: false });
    }

  } catch (e) {
    console.log(e)
    return Response.json(
      { message: "An error occurred while get code.", e },
      { status: 500 }
    );
  }
}

export async function handleGetExecKpiDLA(month: string) {
  const URL = process.env.NEXTAUTH_APP_API_URL_SSL;
  let res;
  const token = localStorage.getItem("accessToken");

  try {
    const urlApi =
      URL + `/dashboard/dashboard-exec-kpi-dla?month=${month}`;
    res = await fetch(urlApi, {
      headers: { Authorization: `Bearer ${token}` },
    });
    if (res.status == 403 || res.status == 401) {
      throw { unauthorized: true };
    }
    const data = await res.json();
    if (res) {
      return Response.json({
        success: true,
        result: data.result,
      });
    } else {
      console.log("res", res);
      return Response.json({ success: false });
    }
  } catch (e) {
    console.log(e);
    return Response.json(
      { message: "An error occurred while get code.", e },
      { status: 500 }
    );
  }
}

export async function handleGetExecKpiDLAEmployee(month: string, matchSearch: string, area?: string) {
  const URL = process.env.NEXTAUTH_APP_API_URL_SSL;
  let res;
  const token = localStorage.getItem("accessToken");
  if (month && matchSearch) {
    try {
      let urlApi =
        URL + `/dashboard/dashboard-exec-kpi-dla-nhan-vien?month=${month}&matchSearch=${matchSearch}`;
      if (area) {
        urlApi += `&area=${area}`;
      }
      res = await fetch(urlApi, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.status == 403 || res.status == 401) {
        throw { unauthorized: true };
      }
      const data = await res.json();
      if (res) {
        return Response.json({
          success: true,
          result: data.result,
        });
      } else {
        console.log("res", res);
        return Response.json({ success: false });
      }
    } catch (e) {
      console.log(e);
      return Response.json(
        { message: "An error occurred while get code.", e },
        { status: 500 }
      );
    }
  } else {
    return Response.json(
      { message: "thieu truong match search va month" },
      { status: 400 }
    );
  }


}


export async function handleGetPtmByWard(month: string) {
  const URL = process.env.NEXTAUTH_APP_API_URL_SSL;
  let res;
  const token = localStorage.getItem("accessToken");
  if (month) {
    try {
      let urlApi =
        URL + `/dashboard/dashboard-ptm-by-area?month=${month}`;

      res = await fetch(urlApi, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.status == 403 || res.status == 401) {
        throw { unauthorized: true };
      }
      const data = await res.json();
      if (res) {
        return Response.json({
          success: true,
          result: data.result,
        });
      } else {
        console.log("res", res);
        return Response.json({ success: false });
      }
    } catch (e) {
      console.log(e);
      return Response.json(
        { message: "An error occurred while get code.", e },
        { status: 500 }
      );
    }
  } else {
    return Response.json(
      { message: "thieu truong match search va month" },
      { status: 400 }
    );
  }


}

export async function handleGetWebUser(userEmail: string) {

  const URL = process.env.NEXTAUTH_APP_API_URL_SSL;
  let res;
  const token = localStorage.getItem("accessToken");

  try {
    res = await fetch(
      URL + `/user-role/web-user?userEmail=${userEmail}`,
      { headers: { "Authorization": `Bearer ${token}` } })
    if (res.status == 403 || res.status == 401) {
      throw { unauthorized: true };
    }
    const data = await res.json()
    if (res) {
      return Response.json({
        success: true, result: data.result
      });
    } else {
      console.log('res', res)
      return Response.json({ success: false });
    }

  } catch (e) {
    console.log(e)
    return Response.json(
      { message: "An error occurred while get code.", e },
      { status: 500 }
    );
  }
}

export async function handleGetUserRole(userEmail: string) {

  const URL = process.env.NEXTAUTH_APP_API_URL_SSL;
  let res;
  const token = localStorage.getItem("accessToken");

  try {
    res = await fetch(
      URL + `/user-role/get-user-role?userEmail=${userEmail}`,
      { headers: { "Authorization": `Bearer ${token}` } })
    if (res.status == 403 || res.status == 401) {
      throw { unauthorized: true };
    }
    const data = await res.json()
    if (res) {
      return Response.json({
        success: true, result: data.roles
      });
    } else {
      console.log('res', res)
      return Response.json({ success: false });
    }

  } catch (e) {
    console.log(e)
    return Response.json(
      { message: "An error occurred while get code.", e },
      { status: 500 }
    );
  }
}

export async function handleUpdateUseRole(postData: any) {
  const URL = process.env.NEXTAUTH_APP_API_URL_SSL;
  console.log("postData", postData);
  let res;
  const token = localStorage.getItem("accessToken");

  try {
    res = await fetch(
      URL + `/user-role/update-user-role`,
      {
        method: 'POST',
        headers: {
          "Authorization": `Bearer ${token}`,
          'Content-type': 'application/json',
        },
        body: JSON.stringify(postData)

      })
    if (res.status == 403 || res.status == 401) {
      throw { unauthorized: true };
    }
    const data = await res.json()
    if (res) {
      return Response.json({
        success: true, result: data.result
      });
    } else {
      console.log('res', res)
      return Response.json({ success: false });
    }

  } catch (e) {
    console.log(e)
    return Response.json(
      { message: "An error occurred while get code.", e },
      { status: 500 }
    );
  }

}


export async function handleGetExecKpiExcel(month: string, kpiType: string, provincePt: string = "") {
  const URL = process.env.NEXTAUTH_APP_API_URL_SSL;

  // Chuyển từ "MM/YYYY" → "01/MM/YYYY"
  const formattedMonth = `01/${month.replace("-", "/")}`; // Chuyển "03-2025" → "01/03/2025"
  const provinceQuery = provincePt ? `&provincePt=${provincePt}` : "";
  const apiUrl = `${URL}/dashboard/dashboard-export-excel-exec-kpi?month=${formattedMonth}&kpiType=${kpiType}${provinceQuery}`;

  console.log("📌 Gửi request đến API:", apiUrl);

  const token = localStorage.getItem("accessToken");

  try {
    console.log("📌 Token:", token);

    const res = await fetch(apiUrl, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    if (res.status == 403 || res.status == 401) {
      throw { unauthorized: true };
      return;
    }

    const data = await res.json();
    console.log("📌 Phản hồi đầy đủ từ API:", data);

    if (res.ok && Array.isArray(data.result) && data.result.length > 0) {
      return Response.json({
        success: true,
        result: data.result,
      });
    } else {
      console.log("📌 Lỗi từ server: Không có dữ liệu");
      return Response.json({ success: false, message: "Không có dữ liệu Excel" });
    }
  } catch (e) {
    console.error("❌ Lỗi khi tải dữ liệu Excel:", e);
    return Response.json(
      { message: "Lỗi khi tải dữ liệu Excel", error: e },
      { status: 500 }
    );
  }
}
export async function handleSearchEmployeeByArea(
  area: string,
  matchSearch: string
) {
  const URL = process.env.NEXTAUTH_APP_API_URL_SSL;
  let res;
  const token = localStorage.getItem("accessToken");
  const encodedSearch = encodeURIComponent(matchSearch);

  const urlApi =
    URL +
    `/dashboard/dashboard-search-employee-by-area?area=${area}&matchSearch=${encodedSearch}`;
  try {
    res = await fetch(urlApi, {
      headers: { Authorization: `Bearer ${token}` },
    });
    if (res.status == 403 || res.status == 401) {
      throw { unauthorized: true };
    }
    const data = await res.json();
    if (res) {
      return Response.json({
        success: true,
        result: data.data,
      });
    } else {
      console.log("res", res);
      return Response.json({ success: false });
    }
  } catch (e) {
    console.log(e);
    return Response.json(
      { message: "An error occurred while get code.", e },
      { status: 500 }
    );
  }
}

export async function handleSearchEmployeeByEmpcode(
  matchSearch: string
) {
  const URL = process.env.NEXTAUTH_APP_API_URL_SSL;
  let res;
  const token = localStorage.getItem("accessToken");
  const encodedSearch = encodeURIComponent(matchSearch);
  console.log("check", encodedSearch);

  const urlApi =
    URL +
    `/dashboard/dashboard-search-employee-by-empcode?matchSearch=${encodedSearch}`;
  try {
    res = await fetch(urlApi, {
      headers: { Authorization: `Bearer ${token}` },
    });
    if (res.status == 403 || res.status == 401) {
      throw { unauthorized: true };
    }
    const data = await res.json();
    if (res) {
      return Response.json({
        success: true,
        result: data.data,
      });
    } else {
      console.log("res", res);
      return Response.json({ success: false });
    }
  } catch (e) {
    console.log(e);
    return Response.json(
      { message: "An error occurred while get code.", e },
      { status: 500 }
    );
  }
}

export async function handleSearchPTMEmployeeByEmpcode(
  matchSearch: string, month: string
) {
  const URL = process.env.NEXTAUTH_APP_API_URL_SSL;
  let res;
  const token = localStorage.getItem("accessToken");
  const encodedSearch = encodeURIComponent(matchSearch);
  console.log("check", encodedSearch);
  if (month && encodedSearch) {
    const urlApi =
      URL +
      `/dashboard/dashboard-search-employee-ptm-by-empcode?matchSearch=${encodedSearch}&month=${month}`;
    try {
      res = await fetch(urlApi, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.status == 403 || res.status == 401) {
        throw { unauthorized: true };
      }
      const data = await res.json();
      if (res) {
        return Response.json({
          success: true,
          result: data.data,
        });
      } else {
        console.log("res", res);
        return Response.json({ success: false });
      }
    } catch (e) {
      console.log(e);
      return Response.json(
        { message: "An error occurred while get code.", e },
        { status: 500 }
      );
    }
  } else {
    return Response.json(
      { message: "thieu params dau vao" },
      { status: 400 }
    );
  }


}

