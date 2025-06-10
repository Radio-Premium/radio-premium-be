import { sendStreamingUrlToWhisper } from "../../utils/sendStreamingUrlToWhisper.js";

export const postWhisperRequest = async (req, res, next) => {
  try {
    const { streamingUrl, userId, channelId } = req.body;
    await sendStreamingUrlToWhisper(streamingUrl, userId, channelId);
    res.status(200).json({ message: "Whisper 요청 전송 완료" });
  } catch (error) {
    next(error);
  }
};
