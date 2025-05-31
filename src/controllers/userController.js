import {
  findUserById,
  findInterestChannelsById,
  registerInterestChannel,
  removeInterestChannel,
  updateInterestChannelList,
} from "../services/userService.js";

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

export const getInterestChannelsById = async (req, res, next) => {
  try {
    const { userId } = req.params;
    const channels = await findInterestChannelsById(Number(userId));

    res.status(200).json(channels);
  } catch (error) {
    next(error);
  }
};

export const createInterestChannel = async (req, res, next) => {
  try {
    const { userId } = req.params;
    const { channelId } = req.body;

    if (typeof channelId !== "number") {
      return res.status(400).json({
        status: 400,
        error: "올바르지 않은 형식입니다.",
      });
    }

    const message = await registerInterestChannel(
      Number(userId),
      Number(channelId)
    );

    res.status(200).json(message);
  } catch (error) {
    next(error);
  }
};

export const updateInterestChannels = async (req, res, next) => {
  try {
    const { userId } = req.params;
    const { channelIds } = req.body;

    if (!Array.isArray(channelIds)) {
      return res.status(400).json({
        status: 400,
        error: "channelIds는 배열이어야 합니다.",
      });
    }

    const result = await updateInterestChannelList(Number(userId), channelIds);
    console.log(result);
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

export const deleteInterestChannel = async (req, res, next) => {
  try {
    const { userId } = req.params;
    const { channelId } = req.body;

    if (typeof channelId !== "number") {
      return res.status(400).json({
        status: 400,
        error: "올바르지 않은 형식입니다.",
      });
    }

    const message = await removeInterestChannel(
      Number(userId),
      Number(channelId)
    );

    res.status(200).json(message);
  } catch (error) {
    next(error);
  }
};
