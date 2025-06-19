import { respondInvalidFormat } from "../utils/errorResponse.js";

export const validateChannelId = (req, res, next) => {
  const { channelId } = req.params;

  if (Number.isNaN(Number(channelId))) {
    return respondInvalidFormat(res);
  }

  next();
};
