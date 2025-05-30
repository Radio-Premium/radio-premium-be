import express from "express";

import { getRadioChannelList } from "../../controllers/radioController.js";

const router = express.Router();

router.get("", getRadioChannelList);

export default router;
