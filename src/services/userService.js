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

  const { data: existingInterest } = await supabase
    .from("interest_channels")
    .select("id")
    .eq("user_id", userId)
    .eq("channel_id", channelId)
    .maybeSingle();

  if (existingInterest) {
    return { status: 400, error: "이미 등록된 관심 채널입니다." };
  }

  const { data: interestList, error: priorityError } = await supabase
    .from("interest_channels")
    .select("priority")
    .eq("user_id", userId)
    .order("priority", { ascending: false })
    .limit(1);

  if (priorityError) {
    throw new Error("Supabase query failed: priority check");
  }

  const currentMaxPriority = interestList?.[0]?.priority;
  const nextPriority =
    typeof currentMaxPriority === "number" ? currentMaxPriority + 1 : 0;

  const { error: insertError } = await supabase
    .from("interest_channels")
    .insert([
      {
        user_id: userId,
        channel_id: channelId,
        priority: nextPriority,
      },
    ]);

  if (insertError) {
    throw new Error("Supabase insert failed");
  }

  return { status: 201, message: "관심 채널 등록 성공했습니다." };
};

export const updateInterestChannelList = async (userId, channelIds) => {
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

  const { data: validChannels, error: channelError } = await supabase
    .from("channels")
    .select("id")
    .in("id", channelIds);

  if (channelError) {
    throw new Error("Supabase query failed: channel check");
  }

  const validChannelIds = validChannels.map((channel) => channel.id);
  const invalidChannelIds = channelIds.filter(
    (id) => !validChannelIds.includes(id)
  );

  if (invalidChannelIds.length > 0) {
    return {
      status: 404,
      error: "존재하지 않는 채널이 포함되어 있습니다.",
    };
  }

  const { error: deleteError } = await supabase
    .from("interest_channels")
    .delete()
    .eq("user_id", userId);

  if (deleteError) {
    throw new Error("Supabase delete failed");
  }

  const insertData = channelIds.map((id, index) => ({
    user_id: userId,
    channel_id: id,
    priority: index,
  }));

  const { error: insertError } = await supabase
    .from("interest_channels")
    .insert(insertData);

  if (insertError) {
    throw new Error("Supabase insert failed");
  }

  return { status: 200, message: "관심 채널 갱신에 성공했습니다." };
};

export const removeInterestChannel = async (userId, channelId) => {
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

  const { data: interest, error: interestError } = await supabase
    .from("interest_channels")
    .select("user_id, channel_id, priority")
    .eq("user_id", userId)
    .eq("channel_id", channelId)
    .maybeSingle();

  if (interestError) {
    throw new Error("Supabase query failed: interest check");
  }
  if (!interest) {
    return { status: 404, error: "등록된 관심 채널이 없습니다." };
  }

  const removedPriority = interest.priority;

  const { error: deleteError } = await supabase
    .from("interest_channels")
    .delete()
    .eq("user_id", userId)
    .eq("channel_id", channelId);

  if (deleteError) {
    throw new Error("Supabase delete failed");
  }

  const { data: channelsToUpdate, error: selectError } = await supabase
    .from("interest_channels")
    .select("channel_id, priority")
    .eq("user_id", userId)
    .gt("priority", removedPriority);

  if (selectError) {
    throw new Error("Supabase query failed: reorder");
  }

  for (const item of channelsToUpdate) {
    await supabase
      .from("interest_channels")
      .update({ priority: item.priority - 1 })
      .eq("user_id", userId)
      .eq("channel_id", item.channel_id);
  }

  return { status: 200, message: "관심 채널 삭제 성공했습니다." };
};
