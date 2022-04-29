import "dotenv/config";
import fetch from "node-fetch";
import { Router } from "express";
const router = Router();
import jwt from "jsonwebtoken";

const clientid = process.env.CLIENTID ? process.env.CLIENTID : undefined;
const clientsecret = process.env.CLIENTSECRET ? process.env.CLIENTSECRET : undefined;

router.get('/login', async (req, res) => {
  if (!clientid || !clientsecret) return res.status(404).json({ message: "can't found", code: 0 });
  const code: any = req.query.code;
  if (code) {
    try {
      const oauthResult = await fetch('https://discord.com/api/oauth2/token', {
        method: "POST",
        body: new URLSearchParams({
          client_id: clientid,
          client_secret: clientsecret,
          grant_type: "authorization_code",
					redirect_uri: `${process.env.APISITE}/login`,
					scope: 'identify',
          code
        }),
        headers: {
					'Content-Type': 'application/x-www-form-urlencoded'
        }
      });
      const oauthData = await oauthResult.json();
      
      const userResult = await fetch('https://discord.com/api/users/@me', {
        headers: {
          'authorization': `${oauthData.token_type} ${oauthData.access_token}`
        }
      });
      const userData = await userResult.json();
      const token = jwt.sign(JSON.stringify(userData), process.env.JWTSECRET!);
      return res.status(200).redirect(`${process.env.CLIENTSITE}/login?token=${token}`);
    } catch (err) {
      return res.status(404).redirect(`${process.env.CLIENTSITE}/login?token=null&err=${err}`);
    }
  }
});

module.exports = router;