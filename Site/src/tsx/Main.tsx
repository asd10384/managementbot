import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { userData } from '../../../Bot/src/site/route/token';
import '../css/Main.css';
import { getCookie } from '../modules/cookie';

export default function Main() {
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
  if (user?.id) {
    let set: any = user;
    let list: string[] = [];
    for (let key in set) {
      list.push(key+": "+set[key]);
    }
    return (
      <div className='Main'>
      <Link to="/logout"><button className='btn'>로그아웃</button></Link>
        {list.map(val => <div className='Data'>{val}</div>)}
      </div>
    );
  }
  return (
    <div className="Main">
      <h1>로그인 후 이용해주세요.</h1>
    </div>
  )
}
