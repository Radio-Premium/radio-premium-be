import { setAdKeywords } from "../cache/adKeywordCache.js";
import { getAdKeywordListService } from "../services/ad-keywords/adKeywordService.js";

export const loadAdKeywords = async () => {
  const keywords = await getAdKeywordListService();

  setAdKeywords(keywords);

  console.log(`✅ Loaded ${keywords.length} ad keywords into cache`);
};
