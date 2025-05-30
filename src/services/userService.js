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

export const registerInterestChannel = async (userId, channelId) => {
  const { data: user, error: userError } = await supabase
    .from("users")
    .select("id")
    .eq("id", userId)
    .maybeSingle();

  if (userError) {
    throw new Error("Supabase query failed: user check");
  }
  if (!user) {
    return { status: 404, error: "사용자를 찾을 수 없습니다." };
  }

  const { data: channel, error: channelError } = await supabase
    .from("channels")
    .select("id")
    .eq("id", channelId)
    .maybeSingle();

  if (channelError) {
    throw new Error("Supabase query failed: channel check");
  }
  if (!channel) {
    return { status: 404, error: "채널을 찾을 수 없습니다." };
  }

  const { data: interestList } = await supabase
    .from("interest_channels")
    .select("id")
    .eq("user_id", userId);

  const priority = interestList?.length || 0;

  const { error: insertError } = await supabase
    .from("interest_channels")
    .insert([
      {
        user_id: userId,
        channel_id: channelId,
        priority,
      },
    ]);

  if (insertError) {
    throw new Error("Supabase insert failed");
  }

  return { status: 201, message: "관심 채널 등록 성공했습니다." };
};
