import { findRadioChannelList } from "../services/radioChannelService.js";

export const getRadioChannelList = async (_req, res, next) => {
  try {
    const channels = await findRadioChannelList();

    return res.status(200).json(channels);
  } catch (error) {
    next(error);
  }
};
