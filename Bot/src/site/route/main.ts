import { Router } from "express";
const router = Router();

router.get('/', (req, res) => {
  return res.status(200).redirect("https://github.com/asd10384/managementbot");
});

module.exports = router;