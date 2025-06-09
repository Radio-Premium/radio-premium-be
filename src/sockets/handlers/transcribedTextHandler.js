import { getAdKeywords } from "../../cache/adKeywordCache.js";

const transcribedTextHandler = (whisperSocket, io, userMap) => {
  whisperSocket.off("transcribedRadioText");

  whisperSocket.on("transcribedRadioText", ({ text, userId }) => {
    console.log("[Whisper] Received text:", text);
    const socketId = userMap.get(userId);

    const keywords = getAdKeywords();
    const matched = keywords.find((keyword) => text.includes(keyword));

    if (matched) {
      console.log(`🔔 광고 키워드 감지: "${matched}"`);
      io.to(socketId).emit("radioText", { isAd: true });
    }
  });

  whisperSocket.on("disconnect", () => {
    console.log("Whisper disconnected");
  });
};

export default transcribedTextHandler;
