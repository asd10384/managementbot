import { Guild } from "discord.js";
import "dotenv/config";
import { client } from "../index";
import MDB from "../database/Mongodb";


/** onReady 핸들러 */
export default function guildDelete(guild: Guild) {
  MDB.module.guild.findOneAndDelete({ id: guild.id }).catch((err) => {
    if (client.debug) console.log(`서버 삭제 실패: 오류발생`);
  }).then((guildDB) => {
    if (client.debug) {
      if (guildDB) {
        console.log(`서버 삭제 성공: ${guildDB.name}`);
      } else {
        console.log(`서버를 삭제 실패: 발견하지 못함`);
      }
    }
  });
}