import { User } from "discord.js";
import { Router } from "express";
const router = Router();
import jwt from "jsonwebtoken";

export type userData = User;

router.post('/token', (req, res) => {
  if (!req.body.token) return res.status(404).json({ id: null, err: "로그인 오류" });
  const decode: any = jwt.decode(req.body.token, {
    json: true
  });
  if (!decode) return res.status(404).json({ id: null, err: "로그인 오류" });
  return res.status(200).json(decode);
});

module.exports = router;