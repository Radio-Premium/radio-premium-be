import { respondInvalidFormat } from "../../utils/errorResponse.js";

export const validateUserId = (req, res, next) => {
  const { userId } = req.params;

  if (Number.isNaN(Number(userId))) {
    return respondInvalidFormat(res);
  }

  next();
};
