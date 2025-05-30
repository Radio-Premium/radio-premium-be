import express from "express";

import { getUserById } from "../../controllers/userController.js";
import { validateUserId } from "../../validators/userValidator.js";

const router = express.Router();

router.get("/:userId", validateUserId, getUserById);

export default router;
