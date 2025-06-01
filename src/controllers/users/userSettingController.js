import { getUserByIdService } from "../../services/users/userService.js";
import { updateUserSettingsByIdService } from "../../services/users/userSettingService.js";
import { stringToSnakeCase } from "../../utils/caseConverter.js";

export const updateUserSettingsById = async (req, res, next) => {
  try {
    const { userId } = req.params;
    const reqSettingFields = ["isAdDetect", "isReturnChannel"];
    const settingFields = reqSettingFields.map((key) => [
      key,
      stringToSnakeCase(key),
    ]);

    const updateFields = {};
    for (const [reqKey, dbKey] of settingFields) {
      const value = req.body?.[reqKey];
      if (value !== undefined) {
        if (typeof value !== "boolean") {
          return res.status(400).json({
            status: 400,
            error: "올바르지 않은 형식입니다.",
          });
        }
        updateFields[dbKey] = value;
      }
    }

    if (Object.keys(updateFields).length === 0) {
      return res.status(400).json({
        status: 400,
        error: "올바르지 않은 형식입니다.",
      });
    }

    const user = await getUserByIdService(Number(userId));
    if (!user) {
      return res
        .status(404)
        .json({ status: 404, error: "사용자를 찾을 수 없습니다." });
    }

    const message = await updateUserSettingsByIdService(
      Number(userId),
      updateFields
    );
    res.status(200).json(message);
  } catch (error) {
    next(error);
  }
};
