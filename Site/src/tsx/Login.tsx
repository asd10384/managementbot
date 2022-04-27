import { useLocation } from "react-router-dom";
import queryString from "query-string";
import { useEffect, useState } from "react";
import { setCookie } from "../modules/cookie";

export default function Login() {
  const [ user, setuser ] = useState("");
  const query = queryString.parse(useLocation().search);
  if (query?.token) {
    useEffect(() => {
      if (!user) {
        get().then(data => {
          if (data.check) {
            setuser("true");
            setCookie("token", query.token as string, {
              maxAge: 1000*60*60*12
            });
            window.location.href = "/";
          } else {
            setuser("false");
            query["err"] = "로그인 오류<br />다시 시도해주세요.";
          }
        });
      }
    });
    async function get(): Promise<{ check: boolean, err: string | null }> {
      return await fetch(`${import.meta.env.VITE_APP_APIURL}/check`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token: query.token })
      }).then(res => { return res.json() }).catch((err) => {
        return { user: "" };
      });
    }
  }
  else if (query?.err || user === "false") {
    return (
      <div className="Login">
        <p style={{ color: "white", fontSize: "6vmin", textAlign: "center" }}>{query?.err}</p>
      </div>
    );
  }
  else if (user.length === 0) {
    window.location.href = `${import.meta.env.VITE_APP_LOGINPAGE}`;
  }
  return (
    <div className="Login">
      <p style={{ color: "white", fontSize: "3vmin", textAlign: "center" }}>로그인 페이지로 이동중...</p>
    </div>
  );
}