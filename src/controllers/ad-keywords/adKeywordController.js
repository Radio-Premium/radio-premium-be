import { HTTP_STATUS } from "../../constants/index.js";
import { getAdKeywordListService } from "../../services/ad-keywords/adKeywordService.js";

export const getAdKeywordList = async (_req, res, next) => {
  try {
    const adKeywords = await getAdKeywordListService();

    return res.status(HTTP_STATUS.OK).json(adKeywords);
  } catch (error) {
    next(error);
  }
};
