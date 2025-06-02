import { HTTP_STATUS, MESSAGES } from "../../constants/index.js";
import { toCamelCase } from "../../utils/caseConverter.js";
import { supabase } from "../supabaseClient.js";

export const createInterestChannelService = async (userId, channelId) => {
  const { data: user, error: userError } = await supabase
    .from("users")
    .select("id")
    .eq("id", userId)
    .maybeSingle();

  if (userError) {
    throw new Error(`${MESSAGES.ERROR.SUPABASE_QUERY_FAILED}: user check`);
  }
  if (!user) {
    return {
      status: HTTP_STATUS.NOT_FOUND,
      error: MESSAGES.ERROR.USER_NOT_FOUND,
    };
  }

  const { data: channel, error: channelError } = await supabase
    .from("channels")
    .select("id")
    .eq("id", channelId)
    .maybeSingle();

  if (channelError) {
    throw new Error(`${MESSAGES.ERROR.SUPABASE_QUERY_FAILED}: channel check`);
  }
  if (!channel) {
    return {
      status: HTTP_STATUS.NOT_FOUND,
      error: MESSAGES.ERROR.CHANNEL_NOT_FOUND,
    };
  }

  const { data: existingInterest } = await supabase
    .from("interest_channels")
    .select("id")
    .eq("user_id", userId)
    .eq("channel_id", channelId)
    .maybeSingle();

  if (existingInterest) {
    return {
      status: HTTP_STATUS.BAD_REQUEST,
      error: MESSAGES.ERROR.INTEREST_CHANNEL_EXISTS,
    };
  }

  const { data: interestList, error: priorityError } = await supabase
    .from("interest_channels")
    .select("priority")
    .eq("user_id", userId)
    .order("priority", { ascending: false })
    .limit(1);

  if (priorityError) {
    throw new Error(`${MESSAGES.ERROR.SUPABASE_QUERY_FAILED}: priority check`);
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
    throw new Error(MESSAGES.ERROR.SUPABASE_INSERT_FAILED);
  }

  return {
    status: HTTP_STATUS.CREATED,
    message: MESSAGES.SUCCESS.INTEREST_CHANNEL_CREATED,
  };
};

export const getInterestChannelByIdService = async (userId) => {
  const { data, error } = await supabase
    .from("interest_channels")
    .select("channel_id, priority")
    .eq("user_id", userId)
    .order("priority", { ascending: true });

  if (error) {
    throw new Error(MESSAGES.ERROR.SUPABASE_QUERY_FAILED);
  }

  const camelData = toCamelCase(data);

  return camelData;
};

export const updateInterestChannelsService = async (userId, channelIds) => {
  const { data: user, error: userError } = await supabase
    .from("users")
    .select("id")
    .eq("id", userId)
    .maybeSingle();

  if (userError) {
    throw new Error(`${MESSAGES.ERROR.SUPABASE_QUERY_FAILED}: user check`);
  }
  if (!user) {
    return {
      status: HTTP_STATUS.NOT_FOUND,
      error: MESSAGES.ERROR.USER_NOT_FOUND,
    };
  }

  const { data: validChannels, error: channelError } = await supabase
    .from("channels")
    .select("id")
    .in("id", channelIds);

  if (channelError) {
    throw new Error(`${MESSAGES.ERROR.SUPABASE_QUERY_FAILED}: channel check`);
  }

  const validChannelIds = validChannels.map((channel) => channel.id);
  const invalidChannelIds = channelIds.filter(
    (id) => !validChannelIds.includes(id)
  );

  if (invalidChannelIds.length > 0) {
    return {
      status: HTTP_STATUS.NOT_FOUND,
      error: MESSAGES.ERROR.INVALID_CHANNELS,
    };
  }

  const { error: deleteError } = await supabase
    .from("interest_channels")
    .delete()
    .eq("user_id", userId);

  if (deleteError) {
    throw new Error(MESSAGES.ERROR.SUPABASE_DELETE_FAILED);
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
    throw new Error(MESSAGES.ERROR.SUPABASE_INSERT_FAILED);
  }

  return {
    status: HTTP_STATUS.OK,
    message: MESSAGES.SUCCESS.INTEREST_CHANNELS_UPDATED,
  };
};

export const deleteInterestChannelService = async (userId, channelId) => {
  const { data: user, error: userError } = await supabase
    .from("users")
    .select("id")
    .eq("id", userId)
    .maybeSingle();

  if (userError) {
    throw new Error(`${MESSAGES.ERROR.SUPABASE_QUERY_FAILED}: user check`);
  }
  if (!user) {
    return {
      status: HTTP_STATUS.NOT_FOUND,
      error: MESSAGES.ERROR.USER_NOT_FOUND,
    };
  }

  const { data: channel, error: channelError } = await supabase
    .from("channels")
    .select("id")
    .eq("id", channelId)
    .maybeSingle();

  if (channelError) {
    throw new Error(`${MESSAGES.ERROR.SUPABASE_QUERY_FAILED}: channel check`);
  }
  if (!channel) {
    return {
      status: HTTP_STATUS.NOT_FOUND,
      error: MESSAGES.ERROR.CHANNEL_NOT_FOUND,
    };
  }

  const { data: interest, error: interestError } = await supabase
    .from("interest_channels")
    .select("user_id, channel_id, priority")
    .eq("user_id", userId)
    .eq("channel_id", channelId)
    .maybeSingle();

  if (interestError) {
    throw new Error(`${MESSAGES.ERROR.SUPABASE_QUERY_FAILED}: interest check`);
  }
  if (!interest) {
    return {
      status: HTTP_STATUS.NOT_FOUND,
      error: MESSAGES.ERROR.INTEREST_CHANNEL_NOT_FOUND,
    };
  }

  const removedPriority = interest.priority;

  const { error: deleteError } = await supabase
    .from("interest_channels")
    .delete()
    .eq("user_id", userId)
    .eq("channel_id", channelId);

  if (deleteError) {
    throw new Error(MESSAGES.ERROR.SUPABASE_DELETE_FAILED);
  }

  const { data: channelsToUpdate, error: selectError } = await supabase
    .from("interest_channels")
    .select("channel_id, priority")
    .eq("user_id", userId)
    .gt("priority", removedPriority);

  if (selectError) {
    throw new Error(`${MESSAGES.ERROR.SUPABASE_QUERY_FAILED}: reorder`);
  }

  for (const item of channelsToUpdate) {
    await supabase
      .from("interest_channels")
      .update({ priority: item.priority - 1 })
      .eq("user_id", userId)
      .eq("channel_id", item.channel_id);
  }

  return {
    status: HTTP_STATUS.OK,
    message: MESSAGES.SUCCESS.INTEREST_CHANNEL_DELETED,
  };
};
