import { supabase } from "./supabaseClient.js";
import { toCamelCase } from "../utils/caseConverter.js";

export const findAdKeywordList = async () => {
  const { data, error } = await supabase.from("ad_keywords").select(
    `
      id,
      keyword
      `
  );

  if (error) {
    console.error("Supabase error:", error);
    throw new Error("Supabase query failed");
  }

  if (!data) {
    return null;
  }

  const camelData = toCamelCase(data);

  return camelData;
};
