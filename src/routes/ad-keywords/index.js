import express from "express";

import { getAdKeywordList } from "../../controllers/adKeywordController";

const router = express.Router();

router.get("", getAdKeywordList);

export default router;
