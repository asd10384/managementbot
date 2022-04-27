import { useEffect, useState } from 'react';
import logo from '../logo.svg';
import { getCookie } from '../modules/cookie';
import '../css/Header.css';
import { userData } from "../../../Bot/src/site/route/token";

export default function Header() {
  const token = getCookie("token");
  const [ user, setuser ] = useState<userData>();
  if (token) {
    useEffect(() => {
      if (!user) {
        get().then(data => {
          setuser(data);
        });
      }
    });
    async function get(): Promise<userData> {
      return await fetch(`${import.meta.env.VITE_APP_APIURL}/token`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token: token })
      }).then(res => { return res.json() }).catch((err) => {
        return { id: null, err: "로그인 오류" };
      });
    }
  }
  return (
    <div>
      <header className="Header">
        <div className="Header-logo">
          <a href='/'><img src={logo} alt="logo" /></a>
        </div>
        <div className="Header-login">
          {user?.username ? <a href='/profile'>{user?.username}</a> : <a href='/login'>로그인</a>}
        </div>
      </header>
    </div>
  );
}