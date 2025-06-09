import { getAdKeywords } from "../../cache/adKeywordCache.js";
import { getUserByIdService } from "../../services/users/index.js";

let isAdPlaying = false;

const transcribedTextHandler = (whisperSocket, io, userMap) => {
  whisperSocket.off("transcribedRadioText");

  whisperSocket.on("transcribedRadioText", async ({ text, userId }) => {
    console.log("[Whisper] Received text:", text);
    const socketId = userMap.get(userId);

    const keywords = getAdKeywords();
    const matched = keywords.find((keyword) => text.includes(keyword));

    if (matched && !isAdPlaying) {
      io.to(socketId).emit("radioText", { isAd: true });
      isAdPlaying = true;
      return;
    }

    if (!matched && isAdPlaying) {
      try {
        const user = await getUserByIdService(userId);

        if (user.isReturnChannel) {
          io.to(socketId).emit("radioText", { isAd: false });
        }

        isAdPlaying = false;
      } catch (error) {
        console.error("Failed to fetch user information", error);
      }
    }
  });

  whisperSocket.on("disconnect", () => {
    console.log("Whisper disconnected");
  });
};

export default transcribedTextHandler;
