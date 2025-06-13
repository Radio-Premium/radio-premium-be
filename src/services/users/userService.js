import { HTTP_STATUS, MESSAGES } from "../../constants/index.js";
import { toCamelCase } from "../../utils/caseConverter.js";
import { supabase } from "../supabaseClient.js";

export const createUserService = async (insertFields) => {
  const { data, error } = await supabase
    .from("users")
    .insert([insertFields])
    .select();

  if (error && !data) {
    throw new Error(MESSAGES.ERROR.SUPABASE_INSERT_FAILED);
  }

  return {
    status: HTTP_STATUS.CREATED,
    message: MESSAGES.SUCCESS.USER_CREATED,
    userId: data?.[0]?.id,
  };
};

export const getUserByIdService = async (userId) => {
  const { data, error } = await supabase
    .from("users")
    .select(
      `
      id,
      is_ad_detect,
      is_return_channel,
      ad_redirect_channel_id,
      created_at,
      interest_channels (
        channel_id
      )
      `
    )
    .eq("id", userId)
    .maybeSingle();

  if (error) {
    console.error("Supabase error:", error);
    throw new Error(MESSAGES.ERROR.SUPABASE_QUERY_FAILED);
  }

  if (!data) {
    return null;
  }

  const camelData = toCamelCase(data);

  return {
    ...camelData,
    userId: camelData.id,
    interestChannels: camelData.interestChannels.map((item) => ({
      channelId: item.channelId,
    })),
  };
};
