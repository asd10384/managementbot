import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import '../css/Guild.css';
import { getCookie } from '../modules/cookie';
import { guildData } from "../../../Bot/src/site/route/getguild";

export default function Guild() {
  const parmas = useParams();
  const token = getCookie("token");
  const [ guild, setGuild ] = useState<guildData>();
  if (token) {
    useEffect(() => {
      if (!guild) {
        get().then(data => {
          setGuild(data);
        });
      }
    });
    async function get(): Promise<guildData> {
      return await fetch(`${import.meta.env.VITE_APP_APIURL}/getguild`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token: token, guildId: parmas.guildId })
      }).then(res => { return res.json() }).catch((err) => {
        return { id: null, err: "로그인 오류" };
      });
    }
  }
  if (guild?.id) return (
    <div className="Guild">
      {`${JSON.stringify(guild)}`}
    </div>
  );
  if (parmas.guildId) return (
    <div className="Guild">
      <h2>서버를 찾을수 없음</h2>
    </div>
  );
  window.location.href = "/login";
}
