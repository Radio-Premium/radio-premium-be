import { supabase } from "../supabaseClient.js";

export const updateUserSettingById = async (userId, updateFields) => {
  const { error } = await supabase
    .from("users")
    .update(updateFields)
    .eq("id", userId);

  if (error) {
    console.error("Supabase update error:", error);
    throw new Error("Supabase update failed");
  }

  return {
    status: 200,
    message: "사용자 설정이 성공적으로 변경되었습니다.",
  };
};
