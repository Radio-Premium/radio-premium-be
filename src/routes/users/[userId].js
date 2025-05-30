import express from "express";

import {
  createInterestChannel,
  getInterestChannelsById,
  getUserById,
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

export default router;
