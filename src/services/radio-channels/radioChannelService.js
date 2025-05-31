import { toCamelCase } from "../../utils/caseConverter.js";
import { supabase } from "../supabaseClient.js";

export const findRadioChannelList = async () => {
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
    throw new Error("Supabase query failed");
  }

  if (!data) {
    return null;
  }

  const camelData = toCamelCase(data);

  return camelData;
};

export const findRadioChannelById = async (channelId) => {
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
    throw new Error("Supabase query failed");
  }

  if (!data) {
    return null;
  }

  const camelData = toCamelCase(data);

  return {
    ...camelData,
    userId: camelData.id,
    areaName: camelData.areas?.name,
  };
};
