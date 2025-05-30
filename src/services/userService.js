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

export const findInterestChannelsById = async (userId) => {
  const { data, error } = await supabase
    .from("interest_channels")
    .select("channel_id, priority")
    .eq("user_id", userId)
    .order("priority", { ascending: true });

  if (error) {
    console.error("Supabase error:", error);
    throw new Error("Supabase query failed");
  }

  const camelData = toCamelCase(data);

  return camelData;
};
