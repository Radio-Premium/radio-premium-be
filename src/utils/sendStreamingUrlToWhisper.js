import axios from "axios";

const whisperURL = process.env.WHISPER_API_URL;

export const sendStreamingUrlToWhisper = async (url, userId, channelId) => {
  try {
    await axios.post(`${whisperURL}/transcription`, {
      url,
      userId,
      channelId,
    });
  } catch (error) {
    console.error("❌ Whisper 서버 요청 실패", error?.message);
  }
};
