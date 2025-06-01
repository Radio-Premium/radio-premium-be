import { getAdKeywordListService } from "../../services/ad-keywords/adKeywordService.js";

export const getAdKeywordList = async (_req, res, next) => {
  try {
    const adKeywords = await getAdKeywordListService();

    return res.status(200).json(adKeywords);
  } catch (error) {
    next(error);
  }
};
