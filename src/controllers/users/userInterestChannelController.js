import {
  createInterestChannel as createInterestChannelService,
  getInterestChannelById as getInterestChannelByIdService,
  updateInterestChannels as updateInterestChannelsService,
  deleteInterestChannel as deleteInterestChannelService,
} from "../../services/users/userInterestChannelService.js";

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

    const message = await createInterestChannelService(
      Number(userId),
      Number(channelId)
    );

    res.status(200).json(message);
  } catch (error) {
    next(error);
  }
};

export const getInterestChannelById = async (req, res, next) => {
  try {
    const { userId } = req.params;
    const channels = await getInterestChannelByIdService(Number(userId));

    res.status(200).json(channels);
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
        error: "올바르지 않은 형식입니다.",
      });
    }

    const result = await updateInterestChannelsService(
      Number(userId),
      channelIds
    );
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

    const message = await deleteInterestChannelService(
      Number(userId),
      Number(channelId)
    );

    res.status(200).json(message);
  } catch (error) {
    next(error);
  }
};
