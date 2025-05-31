import express from "express";

import { getAdKeywordList } from "../../controllers/ad-keywords/adKeywordController.js";

const router = express.Router();

router.get("", getAdKeywordList);

export default router;
