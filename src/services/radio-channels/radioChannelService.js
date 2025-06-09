import { MESSAGES } from "../../constants/index.js";
import { toCamelCase } from "../../utils/caseConverter.js";
import { sendStreamingUrlToWhisper } from "../../utils/sendStreamingUrlToWhisper.js";
import { supabase } from "../supabaseClient.js";

export const getRadioChannelListService = async () => {
  const { data, error } = await supabase.from("channels").select(
    `
      id,
      station,
      name,
      area_id,
      url,
      is_api_exposed,
      logo_url,
      is_ad_channel,
      created_at
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

export const getRadioChannelByIdService = async (
  channelId,
  isAdDetect,
  userId
) => {
  const { data, error } = await supabase
    .from("channels")
    .select(
      `
      id,
      station,
      name,
      area_id,
      url,
      is_api_exposed,
      logo_url,
      is_ad_channel,
      created_at,
      areas (
        name
      )
      `
    )
    .eq("id", channelId)
    .maybeSingle();

  if (error) {
    console.error("Supabase error:", error);
    throw new Error(MESSAGES.ERROR.SUPABASE_QUERY_FAILED);
  }

  if (!data) {
    return null;
  }

  const camelData = toCamelCase(data);
  const streamingUrl = await getRadioChannelUrlService(camelData);
  if (isAdDetect) {
    sendStreamingUrlToWhisper(streamingUrl, userId);
  }

  return {
    ...camelData,
    userId: camelData.id,
    areaName: camelData.areas?.name,
    url: streamingUrl,
  };
};

export const getRadioChannelUrlService = async ({
  isApiExposed,
  url,
  station,
}) => {
  if (!isApiExposed) {
    return url;
  }

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(MESSAGES.STATION_FAILED);
  }

  let result;

  switch (station) {
    case "KBS": {
      const json = await response.json();
      result = json.channel_item[0].service_url;
      break;
    }
    case "MBC":
    case "SBS": {
      result = await response.text();
      break;
    }
    default: {
      result = url;
      break;
    }
  }

  return result;
};
