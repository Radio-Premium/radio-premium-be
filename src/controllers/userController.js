import { findUserById } from "../services/userService.js";

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
