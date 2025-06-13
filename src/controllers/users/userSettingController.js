import { HTTP_STATUS, MESSAGES } from "../../constants/index.js";
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
          return res.status(HTTP_STATUS.BAD_REQUEST).json({
            status: HTTP_STATUS.BAD_REQUEST,
            error: MESSAGES.ERROR.INVALID_FORMAT,
          });
        }
        updateFields[dbKey] = value;
      }
    }

    const { adRedirectChannelId } = req.body;
    if (adRedirectChannelId != undefined) {
      const isValidChannelId = Number.isInteger(adRedirectChannelId);
      if (!isValidChannelId) {
        return res.status(HTTP_STATUS.BAD_REQUEST).json({
          status: HTTP_STATUS.BAD_REQUEST,
          error: MESSAGES.ERROR.INVALID_FORMAT,
        });
      }
      updateFields["ad_redirect_channel_id"] = adRedirectChannelId;
    }

    if (Object.keys(updateFields).length === 0) {
      return res.status(HTTP_STATUS.BAD_REQUEST).json({
        status: HTTP_STATUS.BAD_REQUEST,
        error: MESSAGES.ERROR.INVALID_FORMAT,
      });
    }

    const user = await getUserByIdService(Number(userId));
    if (!user) {
      return res.status(HTTP_STATUS.NOT_FOUND).json({
        status: HTTP_STATUS.NOT_FOUND,
        error: MESSAGES.ERROR.USER_NOT_FOUND,
      });
    }

    const message = await updateUserSettingsByIdService(
      Number(userId),
      updateFields
    );
    res.status(HTTP_STATUS.OK).json(message);
  } catch (error) {
    next(error);
  }
};
