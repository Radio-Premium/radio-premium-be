import { createAdReport } from "../services/reportService.js";

export const postAdReport = async (req, res, next) => {
  try {
    const { userId, isAd, detectedAdPhrase, channelId } = req.body;

    const result = await createAdReport({
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
