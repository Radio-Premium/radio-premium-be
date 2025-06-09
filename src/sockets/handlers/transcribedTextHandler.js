import { getAdKeywords } from "../../cache/adKeywordCache.js";
import { getUserByIdService } from "../../services/users/userService.js";

let isAdPlaying = false;
let adEndTimers = new Map();

const handleTranscribedText =
  (io, userMap) =>
  async ({ text, userId }) => {
    console.log("[Whisper] Received text:", text);
    const socketId = userMap.get(userId);
    if (!socketId) {
      return;
    }

    const keywordList = getAdKeywords();
    const matched = keywordList.find(({ keyword }) => text.includes(keyword));

    if (matched) {
      if (!isAdPlaying) {
        io.to(socketId).emit("radioText", { isAd: true });
        isAdPlaying = true;
      }

      if (adEndTimers.has(userId)) {
        clearTimeout(adEndTimers.get(userId));
        adEndTimers.delete(userId);
      }

      return;
    }

    if (isAdPlaying && !adEndTimers.has(userId)) {
      const timer = setTimeout(async () => {
        try {
          const user = await getUserByIdService(userId);

          if (user.isReturnChannel) {
            io.to(socketId).emit("radioText", { isAd: false });
          }

          isAdPlaying = false;
          adEndTimers.delete(userId);
        } catch (error) {
          console.error("Failed to fetch user information", error);
        }
      }, 5000);

      adEndTimers.set(userId, timer);
    }
  };

const transcribedTextHandler = (whisperSocket, io, userMap) => {
  const listener = handleTranscribedText(io, userMap);

  whisperSocket.off("transcribedRadioText", listener);
  whisperSocket.on("transcribedRadioText", listener);

  whisperSocket.on("disconnect", () => {
    console.log("Whisper disconnected");
  });
};

export default transcribedTextHandler;
