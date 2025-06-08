import { HTTP_STATUS, MESSAGES } from "../../constants/index.js";
import {
  getRadioChannelListService,
  getRadioChannelByIdService,
  getRandomAdChannelService,
} from "../../services/radio-channels/radioChannelService.js";

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

    const channel = await getRadioChannelByIdService(
      Number(channelId),
      isAdDetect
    );

    if (!channel) {
      return res.status(HTTP_STATUS.NOT_FOUND).json({
        status: HTTP_STATUS.NOT_FOUND,
        error: MESSAGES.ERROR.CHANNEL_NOT_FOUND,
      });
    }

    res.status(HTTP_STATUS.OK).json(channel);
  } catch (error) {
    next(error);
  }
};

export const getRandomAdChannel = async (_req, res, next) => {
  try {
    const randomChannel = await getRandomAdChannelService();

    if (!randomChannel) {
      return res.status(HTTP_STATUS.NOT_FOUND).json({
        status: HTTP_STATUS.NOT_FOUND,
        error: MESSAGES.ERROR.CHANNEL_NOT_FOUND,
      });
    }

    return res.status(HTTP_STATUS.OK).json(randomChannel);
  } catch (error) {
    next(error);
  }
};
