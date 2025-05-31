import express from "express";

import {
  createUser,
  getUserById,
} from "../../controllers/users/userController.js";
import {
  createInterestChannel,
  getInterestChannelsById,
  updateInterestChannels,
  deleteInterestChannel,
} from "../../controllers/users/userInterestChannelController.js";
import { updateUserSettings } from "../../controllers/users/userSettingController.js";
import { validateUserId } from "../../validators/userValidator.js";

const router = express.Router();

router.post("", createUser);
router.get("/:userId", validateUserId, getUserById);
router.put("/:userId/settings", validateUserId, updateUserSettings);

router.post(
  "/:userId/interest-channels",
  validateUserId,
  createInterestChannel
);
router.get(
  "/:userId/interest-channels",
  validateUserId,
  getInterestChannelsById
);
router.put(
  "/:userId/interest-channels",
  validateUserId,
  updateInterestChannels
);
router.delete(
  "/:userId/interest-channels",
  validateUserId,
  deleteInterestChannel
);

export default router;
