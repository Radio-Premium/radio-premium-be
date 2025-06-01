import { HTTP_STATUS, MESSAGES } from "../../constants/index.js";
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
    throw new Error(MESSAGES.ERROR.SUPABASE_INSERT_FAILED);
  }

  const camelData = toCamelCase(data);

  return {
    status: HTTP_STATUS.CREATED,
    message: MESSAGES.SUCCESS.AD_REPORT_CREATED,
    report: camelData,
  };
};
