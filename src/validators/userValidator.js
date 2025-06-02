import { HTTP_STATUS, MESSAGES } from "../constants/index.js";

export const validateUserId = (req, res, next) => {
  const { userId } = req.params;

  if (Number.isNaN(Number(userId))) {
    return res.status(HTTP_STATUS.BAD_REQUEST).json({
      status: HTTP_STATUS.BAD_REQUEST,
      error: MESSAGES.ERROR.INVALID_FORMAT,
    });
  }

  next();
};
