import express from "express";

import {
  createUser,
  getUserById,
} from "../../controllers/users/userController.js";
import {
  createInterestChannel,
  getInterestChannelById,
  updateInterestChannels,
  deleteInterestChannel,
} from "../../controllers/users/userInterestChannelController.js";
import { updateUserSettingsById } from "../../controllers/users/userSettingController.js";
import { validateUserId } from "../../validators/userValidator.js";

const router = express.Router();

router.post("", createUser);
router.get("/:userId", validateUserId, getUserById);
router.patch("/:userId/settings", validateUserId, updateUserSettingsById);

router.post(
  "/:userId/interest-channels",
  validateUserId,
  createInterestChannel
);
router.get(
  "/:userId/interest-channels",
  validateUserId,
  getInterestChannelById
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
