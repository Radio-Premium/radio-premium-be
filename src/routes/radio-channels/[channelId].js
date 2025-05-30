import express from "express";

import { getRadioChannelById } from "../../controllers/radioChannelController.js";
import { validateChannelId } from "../../validators/channelValidator.js";

const router = express.Router();

router.get("/:channelId", validateChannelId, getRadioChannelById);

export default router;
