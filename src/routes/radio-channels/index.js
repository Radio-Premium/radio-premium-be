import express from "express";

import {
  getRadioChannelList,
  getRadioChannelById,
  getRandomAdChannel,
} from "../../controllers/radio-channels/radioChannelController.js";
import { validateChannelId } from "../../validators/channelValidator.js";

const router = express.Router();

router.get("", getRadioChannelList);
router.get("/random-ad", getRandomAdChannel);
router.get("/:channelId", validateChannelId, getRadioChannelById);

export default router;
