import {
  getRadioChannelListService,
  getRadioChannelByIdService,
} from "../../services/radio-channels/radioChannelService.js";

export const getRadioChannelList = async (_req, res, next) => {
  try {
    const channels = await getRadioChannelListService();

    return res.status(200).json(channels);
  } catch (error) {
    next(error);
  }
};

export const getRadioChannelById = async (req, res, next) => {
  try {
    const { channelId } = req.params;
    const channel = await getRadioChannelByIdService(Number(channelId));

    if (!channel) {
      return res
        .status(404)
        .json({ status: 404, error: "채널을 찾을 수 없습니다." });
    }

    res.status(200).json(channel);
  } catch (error) {
    next(error);
  }
};
