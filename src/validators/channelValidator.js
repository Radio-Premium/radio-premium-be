export const validateChannelId = (req, res, next) => {
  const { channelId } = req.params;

  if (Number.isNaN(Number(channelId))) {
    return res.status(400).json({
      status: 400,
      error: "올바르지 않은 형식입니다.",
    });
  }

  next();
};
