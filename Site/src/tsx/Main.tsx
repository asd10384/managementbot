import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { sendData } from '../../../Bot/src/site/route/getguilds';
import '../css/Main.css';
import { getCookie } from '../modules/cookie';

export default function Main() {
  const token = getCookie("token");
  const [ data, setData ] = useState<sendData>();
  if (token) {
    useEffect(() => {
      if (!data) {
        get().then(data => {
          setData(data);
        });
      }
    });
    async function get(): Promise<sendData> {
      return await fetch(`${import.meta.env.VITE_APP_APIURL}/getguilds`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token: token })
      }).then(res => { return res.json() }).catch((err) => {
        return { id: null, err: "로그인 오류" };
      });
    }
  }
  if (data?.user?.id && data.guilds) {
    let userlist: string[] = [];
    for (let key in data.user) {
      userlist.push(key+": "+(data.user as any)[key]);
    }
    return (
      <div className='Main'>
        <div className='Guilds'>
          {data.guilds.map((guild) => {
            return (
              <Link to={"/guild/"+guild.id}>
                <div className='Guild' style={{
                  fontSize: `5vmin`
                }}>
                  {guild.name}
                  <img className='Image' src={guild.iconURL as unknown as string}></img>
                </div>
              </Link>
            );
          })}
          <Link to="/guild/test">
            <div className='Guild' style={{
              fontSize: `5vmin`
            }}>
              test
              <img className='Image' src="https://cdn.discordapp.com/icons/457514742940958731/9727d09f3ec5ff29296308e93bfd8983.png?size=4096"></img>
            </div>
          </Link>
        </div>
      </div>
    );
  }
  return (
    <div className="Main">
      <h2>로그인 후 이용해주세요.</h2>
    </div>
  )
}
