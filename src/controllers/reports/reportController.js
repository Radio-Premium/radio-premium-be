import { HTTP_STATUS } from "../../constants/index.js";
import { createAdReportService } from "../../services/reports/reportService.js";

export const createAdReport = async (req, res, next) => {
  try {
    const { userId, isAd, detectedAdPhrase, channelId } = req.body;

    const result = await createAdReportService({
      userId,
      isAd,
      detectedAdPhrase,
      channelId,
    });

    res.status(HTTP_STATUS.CREATED).json(result);
  } catch (error) {
    next(error);
  }
};
