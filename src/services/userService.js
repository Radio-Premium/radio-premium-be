import { supabase } from "./supabaseClient.js";
import { toCamelCase } from "../utils/caseConverter.js";

export const findUserById = async (userId) => {
  const { data, error } = await supabase
    .from("users")
    .select(
      `
      id,
      is_ad_detect,
      is_return_channel,
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
    throw new Error("Supabase query failed");
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

export const registerUser = async (insertFields) => {
  const { data, error } = await supabase
    .from("users")
    .insert([insertFields])
    .select();

  if (error && !data) {
    throw new Error("Supabase insert failed");
  }

  return {
    status: 201,
    message: "사용자 등록 성공했습니다.",
    userId: data?.[0]?.id,
  };
};
