import { HTTP_STATUS, MESSAGES } from "../../constants/index.js";
import { supabase } from "../supabaseClient.js";

export const updateUserSettingsByIdService = async (userId, updateFields) => {
  const { error } = await supabase
    .from("users")
    .update(updateFields)
    .eq("id", userId);

  if (error) {
    console.error("Supabase update error:", error);
    throw new Error(MESSAGES.ERROR.SUPABASE_UPDATE_FAILED);
  }

  return {
    status: HTTP_STATUS.OK,
    message: MESSAGES.SUCCESS.USER_SETTINGS_UPDATED,
  };
};
