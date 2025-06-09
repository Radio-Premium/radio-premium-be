import axios from "axios";

export const sendStreamingUrlToWhisper = async (url, userId) => {
  try {
    // TODO: Whisper 서버 배포 시 주소 변경
    await axios.post("http://localhost:5000/transcribe", {
      url,
      userId,
    });
  } catch (error) {
    console.error("❌ Whisper 서버 요청 실패", error?.message);
  }
};
