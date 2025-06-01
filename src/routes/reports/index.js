import express from "express";

import { createAdReport } from "../../controllers/reports/reportController.js";
import { validateReportBody } from "../../validators/reportValidator.js";

const router = express.Router();

router.post("/", validateReportBody, createAdReport);

export default router;
