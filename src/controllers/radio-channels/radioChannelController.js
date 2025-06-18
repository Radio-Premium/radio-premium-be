import { HTTP_STATUS, MESSAGES } from "../../constants/index.js";
import {
  getRadioChannelListService,
  getRadioChannelByIdService,
  getRandomNoAdChannelService,
} from "../../services/radio-channels/radioChannelService.js";
import { respondNotFound } from "../../utils/errorResponse.js";

export const getRadioChannelList = async (_req, res, next) => {
  try {
    const channels = await getRadioChannelListService();

    return res.status(HTTP_STATUS.OK).json(channels);
  } catch (error) {
    next(error);
  }
};

export const getRadioChannelById = async (req, res, next) => {
  try {
    const { channelId } = req.params;
    const isAdDetect = req.query.isAdDetect === "true";
    const userId = req.query.userId;

    const channel = await getRadioChannelByIdService(
      Number(channelId),
      isAdDetect,
      userId
    );

    if (!channel) {
      return respondNotFound(res, MESSAGES.ERROR.CHANNEL_NOT_FOUND);
    }

    res.status(HTTP_STATUS.OK).json(channel);
  } catch (error) {
    next(error);
  }
};

export const getRandomNoAdChannel = async (_req, res, next) => {
  try {
    const randomChannel = await getRandomNoAdChannelService();

    if (!randomChannel) {
      return respondNotFound(res, MESSAGES.ERROR.CHANNEL_NOT_FOUND);
    }

    return res.status(HTTP_STATUS.OK).json(randomChannel);
  } catch (error) {
    next(error);
  }
};
