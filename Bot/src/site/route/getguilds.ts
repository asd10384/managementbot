import { User, Guild } from "discord.js";
import { Router } from "express";
const router = Router();
import jwt from "jsonwebtoken";
import { client } from "../../index";

export interface sendData {
  user?: User,
  guilds?: Guild[]
};

router.post('/getguilds', (req, res) => {
  if (!req.body.token) return res.status(404).json({ user: null, guilds: [] });
  const decode: any = jwt.decode(req.body.token, {
    json: true
  });
  if (!decode) return res.status(404).json({ user: null, guilds: [] });
  const guilds = client.guilds.cache.filter((guild) => guild.members.cache.some((member) => member.user.id === decode.id));
  return res.status(200).json({
    user: decode,
    guilds: guilds
  });
});

module.exports = router;