import express from "express";

import {
  getRadioChannelList,
  getRadioChannelById,
  getRandomNoAdChannel,
} from "../../controllers/radio-channels/radioChannelController.js";
import { validateChannelId } from "../../validators/channelValidator.js";

const router = express.Router();

router.get("", getRadioChannelList);
router.get("/random-no-ad", getRandomNoAdChannel);
router.get("/:channelId", validateChannelId, getRadioChannelById);

export default router;
