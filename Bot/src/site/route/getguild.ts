import { User, Guild } from "discord.js";
import { Router } from "express";
const router = Router();
import jwt from "jsonwebtoken";
import { client } from "../../index";

export type guildData = Guild;

router.post('/getguild', (req, res) => {
  if (!req.body.token) return res.status(404).json({ id: null });
  if (!req.body.guildId) return res.status(404).json({ id: null });
  const decode: any = jwt.decode(req.body.token, {
    json: true
  });
  if (!decode) return res.status(404).json({ id: null });
  const guild = client.guilds.cache.get(req.body.guildId);
  if (!guild) return res.status(404).json({ id: null });
  if (!guild.members.cache.get(decode.id)?.permissions.has("ADMINISTRATOR")) return res.status(404).json({ id: null });
  return res.status(200).json(guild);
});

module.exports = router;