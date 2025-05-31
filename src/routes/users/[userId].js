import express from "express";

import {
  createInterestChannel,
  deleteInterestChannel,
  getInterestChannelsById,
  getUserById,
  updateInterestChannels,
} from "../../controllers/userController.js";
import { validateUserId } from "../../validators/userValidator.js";

const router = express.Router();

router.get("/:userId", validateUserId, getUserById);
router.get(
  "/:userId/interest-channels",
  validateUserId,
  getInterestChannelsById
);
router.post(
  "/:userId/interest-channels",
  validateUserId,
  createInterestChannel
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
