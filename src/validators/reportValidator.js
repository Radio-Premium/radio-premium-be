export const validateReportBody = (req, res, next) => {
  const { userId, isAd, detectedAdPhrase, channelId } = req.body || {};

  const isInvalidFormat =
    typeof userId !== "number" ||
    typeof isAd !== "boolean" ||
    typeof detectedAdPhrase !== "string" ||
    typeof channelId !== "number";

  if (isInvalidFormat) {
    return res.status(400).json({
      status: 400,
      error: "올바르지 않은 형식입니다.",
    });
  }

  next();
};
