import { respondInvalidFormat } from "../utils/errorResponse.js";

export const validateReportBody = (req, res, next) => {
  const { userId, isAd, detectedAdPhrase, channelId } = req.body || {};

  const isValidFormat =
    typeof userId === "number" &&
    typeof isAd === "boolean" &&
    (typeof detectedAdPhrase === "string" || detectedAdPhrase === null) &&
    typeof channelId === "number";

  if (!isValidFormat) {
    return respondInvalidFormat(res);
  }

  next();
};
