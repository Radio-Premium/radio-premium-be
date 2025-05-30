export const validateUserId = (req, res, next) => {
  const { userId } = req.params;

  if (Number.isNaN(Number(userId))) {
    return res.status(400).json({
      status: 400,
      error: "올바르지 않은 형식입니다.",
    });
  }

  next();
};
