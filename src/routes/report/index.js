import express from "express";

import { postAdReport } from "../../controllers/reportController.js";
import { validateReportBody } from "../../validators/reportValidator.js";

const router = express.Router();

router.post("/", validateReportBody, postAdReport);

export default router;
