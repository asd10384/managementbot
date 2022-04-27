import { Router } from "express";
const router = Router();
import jwt from "jsonwebtoken";

export interface userData {
  id: string | null, //'293719842274541579',
  err?: string,
  username?: string, //'사금향',
  avatar?: string, //'9686a28fc8202099eb7d11069c08b958',     
  avatar_decoration?: any, //null,
  discriminator?: string, //'1111',
  public_flags?: number, //128,
  flags?: number, //128,
  banner?: string, //'a_7eb34b8abe9353ada320a41bf19efa60',   
  banner_color?: any, //null,
  accent_color?: any, //null,
  locale?: string, //'ko',
  mfa_enabled?: boolean, //true,
  premium_type?: number //2
};

router.post('/token', (req, res) => {
  if (!req.body.token) return res.status(404).json({ id: null, err: "로그인 오류" });
  const decode: any = jwt.decode(req.body.token, {
    json: true
  });
  if (!decode) return res.status(404).json({ id: null, err: "로그인 오류" });
  return res.status(200).json(decode);
});

module.exports = router;