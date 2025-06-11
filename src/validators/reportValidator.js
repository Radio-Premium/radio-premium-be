import { HTTP_STATUS, MESSAGES } from "../constants/index.js";

export const validateReportBody = (req, res, next) => {
  const { userId, isAd, detectedAdPhrase, channelId } = req.body || {};

  const isInvalidFormat =
    typeof userId !== "number" ||
    typeof isAd !== "boolean" ||
    !(typeof detectedAdPhrase === "string" || detectedAdPhrase === null) ||
    typeof channelId !== "number";

  if (isInvalidFormat) {
    return res.status(HTTP_STATUS.BAD_REQUEST).json({
      status: HTTP_STATUS.BAD_REQUEST,
      error: MESSAGES.ERROR.INVALID_FORMAT,
    });
  }

  next();
};
