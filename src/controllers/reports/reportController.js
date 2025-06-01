import { createAdReport as createAdReportService } from "../../services/reports/reportService.js";

export const createAdReport = async (req, res, next) => {
  try {
    const { userId, isAd, detectedAdPhrase, channelId } = req.body;

    const result = await createAdReportService({
      userId,
      isAd,
      detectedAdPhrase,
      channelId,
    });

    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
};
