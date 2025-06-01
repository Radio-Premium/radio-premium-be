import { MESSAGES } from "../../constants/index.js";
import { toCamelCase } from "../../utils/caseConverter.js";
import { supabase } from "../supabaseClient.js";

export const getAdKeywordListService = async () => {
  const { data, error } = await supabase.from("ad_keywords").select(
    `
      id,
      keyword
    `
  );

  if (error) {
    console.error("Supabase error:", error);
    throw new Error(MESSAGES.ERROR.SUPABASE_QUERY_FAILED);
  }

  if (!data) {
    return null;
  }

  const camelData = toCamelCase(data);

  return camelData;
};
