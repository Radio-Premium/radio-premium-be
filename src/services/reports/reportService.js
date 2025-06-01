import { toCamelCase } from "../../utils/caseConverter.js";
import { supabase } from "../supabaseClient.js";

export const createAdReportService = async ({
  userId,
  isAd,
  detectedAdPhrase,
  channelId,
}) => {
  const { data, error } = await supabase
    .from("user_reports")
    .insert([
      {
        user_id: userId,
        is_ad: isAd,
        detected_ad_phrase: detectedAdPhrase,
        channel_id: channelId,
      },
    ])
    .select()
    .single();

  if (error) {
    throw new Error("Supabase insert failed");
  }

  const camelData = toCamelCase(data);

  return {
    status: 201,
    message: "광고 제보 등록 성공했습니다.",
    report: camelData,
  };
};
