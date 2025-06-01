import { HTTP_STATUS, MESSAGES } from "../constants/index.js";

export const validateChannelId = (req, res, next) => {
  const { channelId } = req.params;

  if (Number.isNaN(Number(channelId))) {
    return res.status(HTTP_STATUS.BAD_REQUEST).json({
      status: HTTP_STATUS.BAD_REQUEST,
      error: MESSAGES.ERROR.INVALID_FORMAT,
    });
  }

  next();
};
