import express from "express";

import { postWhisperRequest } from "../../controllers/whisper/whisperController.js";

const router = express.Router();

router.post("/", postWhisperRequest);

export default router;
