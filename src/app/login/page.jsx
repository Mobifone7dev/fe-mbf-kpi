"use client";
import axios from "axios";
import React, { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import ReCAPTCHA from "react-google-recaptcha";
import Button from "react-bootstrap-button-loader";
const API_URL = process.env.NEXTAUTH_APP_API_URL_SSL;
const ReCAPTCHA_SITE_KEY = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY;
export const LOGIN_URL = `${API_URL}/login`;
const Page = () => {
  const [typePassword, setTypePassword] = useState("password");
  const [password, setPassword] = useState("");
  const [loginTitle, setLoginTitle] = useState(
    "Chào mừng bạn đến với MobiFone"
  );
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [errorEmail, setErrorEmail] = useState("");
  const [submit, setSubmit] = useState("");
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [captchaToken, setCaptchaToken] = useState("");
  const recaptchaRef = useRef();
  const resetCaptcha = () => {
    recaptchaRef.current.reset(); // 👈 reset lại captcha
  };

  function checkIfEmailInString(text) {
    var re =
      /(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))/;
    return re.test(text);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    let newStringEmail = email;
    if (!checkIfEmailInString(email)) {
      newStringEmail = email + "@mobifone.vn";
    }
    if (!captchaToken) {
      setError("Vui lòng xác thực reCAPTCHA");
      return;
    }
    try {
      setLoading(true);
      const result = await fetch(LOGIN_URL, {
        rejectUnauthorized: false,
        method: "POST", // *GET, POST, PUT, DELETE, etc
        headers: {
          "Content-Type": "application/json",
          // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: JSON.stringify({
          username: newStringEmail,
          password,
          captchaToken,
        }), // body data type must match "Content-Type" header
      });
      if (!result) {
        setError("Invalid credentials");
        setLoading(false);
        return;
      } else {
        const user = await result.json();
        localStorage.setItem("accessToken", user.accessToken);
        localStorage.setItem("user", JSON.stringify(user));

        // await signIn("credentials", {
        //   email: newStringEmail,
        //   password,
        //   user: user,
        //   accessToken: user.accessToken,
        //   redirect: false,
        // });
        console.log("check thanh cong")
        setLoading(false);
        router.replace("/");
      }
    } catch (error) {
      setError("Invalid credentials");
      setLoading(false);
      resetCaptcha();
      return null;
    }
  };

  const handleShowPass = (e) => {
    let isChecked = e.target.checked;
    if (isChecked) {
      setTypePassword("text");
    } else {
      setTypePassword("password");
    }
  };

  return (
    <div className="login-test">
      <div className="container-login">
        <div className="login-box">
          <form onSubmit={handleSubmit}>
            <div className="page-box">
              <div className="login-title">
                <h2 className="loginTitle-text">Login</h2>
                <div className="caption mt-2">
                  <p>Sử dụng email MobiFone để login vào hệ thống</p>
                </div>{" "}
              </div>
              <div className="page email-page">
                <div className="input-box">
                  <input
                    type="text"
                    className="email"
                    value={email}
                    autoFocus
                    required
                    placeholder="Enter Your Email"
                    onChange={(e) => {
                      setEmail(e.target.value);
                    }}
                    onKeyDown={(e) => {
                      if (e.key === "Tab") e.preventDefault();
                    }}
                  />
                </div>

                <div className="input-box">
                  <input
                    type={typePassword}
                    onChange={(e) => {
                      setPassword(e.target.value);
                    }}
                    className="password"
                    required
                  />
                  <label htmlFor="password">Enter your password</label>
                </div>
                {errorEmail && (
                  <div className="bg-red-500 text-white w-fit text-sm py-1 px-3 rounded-md mt-4">
                    {errorEmail}
                  </div>
                )}
                <div style={{ marginTop: "20px" }}>
                  {/* Google reCAPTCHA */}
                  <ReCAPTCHA
                    sitekey={ReCAPTCHA_SITE_KEY}
                    onChange={(token) => setCaptchaToken(token)}
                    ref={recaptchaRef}
                  />
                </div>
                <div className="forgot show">
                  <label>
                    <input
                      type="checkbox"
                      className="checkbox-pass"
                      onClick={handleShowPass}
                    />
                    Show password
                  </label>
                  <div className="btn-box">
                    {loading && (
                      <div role="status">
                        <svg
                          aria-hidden="true"
                          className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
                          viewBox="0 0 100 101"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                            fill="currentColor"
                          />
                          <path
                            d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                            fill="currentFill"
                          />
                        </svg>
                        <span className="sr-only">Loading...</span>
                      </div>
                    )}
                    {!loading && (
                      <Button
                        loading={loading}
                        className="bnt-next"
                        type="submit"
                      >
                        Login
                      </Button>
                    )}
                  </div>
                  {submit && <p className="text-lg text-center">{submit}</p>}
                </div>

                {error && (
                  <div className="bg-red-500 text-white w-fit text-sm py-1 px-3 rounded-md mt-4">
                    {error}
                  </div>
                )}
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Page;
