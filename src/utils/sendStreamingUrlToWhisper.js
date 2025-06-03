import axios from "axios";

export const sendStreamUrlToWhisper = async (url) => {
  try {
    // TODO: Whisper 서버 배포 시 주소 변경
    await axios.post("http://localhost:5000/transcribe", {
      url: url,
    });
  } catch (error) {
    console.error("❌ Whisper 서버 요청 실패", error?.message);
  }
};
