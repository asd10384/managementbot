import { removeCookie } from "../modules/cookie";

export default function Logout() {
  removeCookie("token");
  window.location.href = "/";
  return (
    <div className="Logout">
      <p style={{ color: "white", fontSize: "3vmin", textAlign: "center" }}>로그아웃</p>
    </div>
  );
}