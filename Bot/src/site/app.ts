import "dotenv/config";
import express from "express";
import cors from "cors";
import { readdirSync } from "fs";
import { join } from "path";

const app = express();

app.use(cors({
  origin: "*",
  // methods: ['GET','POST']
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const route = readdirSync(join(__dirname, 'route')).filter((file) => file.endsWith('.ts') || file.endsWith('.js'));
route.forEach((file) => {
  app.use(require(`./route/${file.replace(/\.js|\.ts/g,"")}`));
});

if (process.env.APISITEPORT) {
  app.listen(process.env.APISITEPORT, () => {
    console.log(`API 사이트 OPEN\n - ${process.env.APISITE}`)
  });
} else {
  console.error(`포트를 찾을수 없음`);
}