import { findUserById, registerUser } from "../services/userService.js";
import { stringToSnakeCase } from "../utils/caseConverter.js";

export const getUserById = async (req, res, next) => {
  try {
    const { userId } = req.params;
    const user = await findUserById(Number(userId));

    if (!user) {
      return res
        .status(404)
        .json({ status: 404, error: "사용자를 찾을 수 없습니다." });
    }

    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};

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
          return res.status(400).json({
            status: 400,
            error: "올바르지 않은 형식입니다.",
          });
        }
        insertFields[dbKey] = value;
      }
    }

    const message = await registerUser(insertFields);
    res.status(201).json(message);
  } catch (error) {
    next(error);
  }
};
