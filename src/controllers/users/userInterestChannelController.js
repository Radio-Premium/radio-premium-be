import { HTTP_STATUS } from "../../constants/index.js";
import {
  createInterestChannelService,
  getInterestChannelByIdService,
  updateInterestChannelsService,
  deleteInterestChannelService,
} from "../../services/users/userInterestChannelService.js";
import { respondInvalidFormat } from "../../utils/errorResponse.js";

export const createInterestChannel = async (req, res, next) => {
  try {
    const { userId } = req.params;
    const { channelId } = req.body;

    if (typeof channelId !== "number") {
      return respondInvalidFormat(res);
    }

    const message = await createInterestChannelService(
      Number(userId),
      Number(channelId)
    );

    res.status(HTTP_STATUS.OK).json(message);
  } catch (error) {
    next(error);
  }
};

export const getInterestChannelById = async (req, res, next) => {
  try {
    const { userId } = req.params;
    const channels = await getInterestChannelByIdService(Number(userId));

    res.status(HTTP_STATUS.OK).json(channels);
  } catch (error) {
    next(error);
  }
};

export const updateInterestChannels = async (req, res, next) => {
  try {
    const { userId } = req.params;
    const { channelIds } = req.body;

    if (!Array.isArray(channelIds)) {
      return respondInvalidFormat(res);
    }

    const result = await updateInterestChannelsService(
      Number(userId),
      channelIds
    );
    res.status(HTTP_STATUS.OK).json(result);
  } catch (error) {
    next(error);
  }
};

export const deleteInterestChannel = async (req, res, next) => {
  try {
    const { userId } = req.params;
    const { channelId } = req.body;

    if (typeof channelId !== "number") {
      return respondInvalidFormat(res);
    }

    const message = await deleteInterestChannelService(
      Number(userId),
      Number(channelId)
    );

    res.status(HTTP_STATUS.OK).json(message);
  } catch (error) {
    next(error);
  }
};
