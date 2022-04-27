import "dotenv/config";
import { Router } from "express";
const router = Router();
import jwt from "jsonwebtoken";

router.post('/check', async (req, res) => {
  if (!req.body.token) return res.status(404).json({ check: false, err: "오류" });
  const check = jwt.verify(req.body.token, process.env.JWTSECRET!);
  return res.status(200).json({ check: true, err: null });
});

module.exports = router;