import { getAdKeywords } from "../../cache/adKeywordCache.js";

const transcribedTextHandler = (whisperSocket, io) => {
  whisperSocket.on("transcribedRadioText", ({ text }) => {
    console.log("[Whisper] Received text:", text);

    const keywords = getAdKeywords();
    const matched = keywords.find((keyword) => text.includes(keyword));

    if (matched) {
      console.log(`🔔 광고 키워드 감지: "${matched}"`);
      io.emit("radioText", { isAd: true });
    }
  });

  whisperSocket.on("disconnect", () => {
    console.log("Whisper disconnected");
  });
};

export default transcribedTextHandler;
