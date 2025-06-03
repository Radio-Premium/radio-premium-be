import { MESSAGES } from "../../constants/index.js";
import { toCamelCase } from "../../utils/caseConverter.js";
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

export const getRadioChannelByIdService = async (channelId) => {
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

  return {
    ...camelData,
    userId: camelData.id,
    areaName: camelData.areas?.name,
    url: streamingUrl,
  };
};

export const getRadioChannelUrlService = async (data) => {
  if (!data.isApiExposed) {
    return data.url;
  }

  const response = await fetch(data.url);
  let result;

  switch (data.station) {
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
      result = data.url;
      break;
    }
  }

  return result;
};
