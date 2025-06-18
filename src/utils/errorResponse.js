import { HTTP_STATUS, MESSAGES } from "../constants/index.js";

const respondWithError = (res, status, message) => {
  return res.status(status).json({ status, error: message });
};

export const respondInvalidFormat = (res) => {
  return respondWithError(
    res,
    HTTP_STATUS.BAD_REQUEST,
    MESSAGES.ERROR.INVALID_FORMAT
  );
};

export const respondNotFound = (res, message) => {
  return respondWithError(res, HTTP_STATUS.NOT_FOUND, message);
};
