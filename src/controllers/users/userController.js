import { HTTP_STATUS, MESSAGES } from "../../constants/index.js";
import {
  createUserService,
  getUserByIdService,
} from "../../services/users/userService.js";
import { stringToSnakeCase } from "../../utils/caseConverter.js";

export const createUser = async (req, res, next) => {
  try {
    const reqSettingFields = ["isAdDetect", "isReturnChannel"];
    const settingFields = reqSettingFields.map((key) => [
      key,
      stringToSnakeCase(key),
    ]);

    const insertFields = {};
    for (const [reqKey, dbKey] of settingFields) {
      const value = req.body?.[reqKey];
      if (value !== undefined) {
        if (typeof value !== "boolean") {
          return res.status(HTTP_STATUS.BAD_REQUEST).json({
            status: HTTP_STATUS.BAD_REQUEST,
            error: MESSAGES.ERROR.INVALID_FORMAT,
          });
        }
        insertFields[dbKey] = value;
      }
    }

    const message = await createUserService(insertFields);
    res.status(HTTP_STATUS.CREATED).json(message);
  } catch (error) {
    next(error);
  }
};

export const getUserById = async (req, res, next) => {
  try {
    const { userId } = req.params;
    const user = await getUserByIdService(Number(userId));

    if (!user) {
      return res.status(HTTP_STATUS.NOT_FOUND).json({
        status: HTTP_STATUS.NOT_FOUND,
        error: MESSAGES.ERROR.USER_NOT_FOUND,
      });
    }

    res.status(HTTP_STATUS.OK).json(user);
  } catch (error) {
    next(error);
  }
};
