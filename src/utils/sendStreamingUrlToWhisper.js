import axios from "axios";

export const sendStreamUrlToWhisper = async (url) => {
  try {
    await axios.post("http://localhost:5000/transcribe", {
      url: url,
    });
  } catch (error) {
    console.error("❌ Whisper 서버 요청 실패", error?.message);
  }
};
