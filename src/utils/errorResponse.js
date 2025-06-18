import { HTTP_STATUS, MESSAGES } from "../constants/index.js";

export const respondInvalidFormat = (res) => {
  return res.status(HTTP_STATUS.BAD_REQUEST).json({
    status: HTTP_STATUS.BAD_REQUEST,
    error: MESSAGES.ERROR.INVALID_FORMAT,
  });
};

export const respondNotFound = (res, message) => {
  return res.status(HTTP_STATUS.NOT_FOUND).json({
    status: HTTP_STATUS.NOT_FOUND,
    error: message,
  });
};
