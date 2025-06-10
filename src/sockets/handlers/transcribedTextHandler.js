import { getAdKeywords } from "../../cache/adKeywordCache.js";
import { getUserByIdService } from "../../services/users/userService.js";

const isAdPlaying = new Map();
const userAdEndTimers = new Map();
const userChannelStatus = new Map();

const handleTranscribedText =
  (io, userMap) =>
  async ({ text, userId, channelId }) => {
    const socketId = userMap.get(userId);
    if (!socketId) {
      return;
    }

    const keywordList = getAdKeywords();
    const matched = keywordList.find(({ keyword }) => text.includes(keyword));
    const userChannelKey = `${userId}:${channelId}`;
    const userStatus = userChannelStatus.get(userId);

    const isMovedChannel =
      userStatus?.prevChannelId && channelId === userStatus.prevChannelId;

    if (matched) {
      if (!isAdPlaying.get(userChannelKey)) {
        io.to(socketId).emit("radioText", { isAd: true });
        userChannelStatus.set(userId, { prevChannelId: channelId });
        isAdPlaying.set(userChannelKey, true);
      }

      if (userAdEndTimers.has(userId)) {
        clearTimeout(userAdEndTimers.get(userId));
        userAdEndTimers.delete(userId);
      }

      return;
    }

    if (isMovedChannel && isAdPlaying.get(userChannelKey)) {
      if (!userAdEndTimers.has(userId)) {
        const timer = setTimeout(async () => {
          try {
            const user = await getUserByIdService(userId);
            if (user.isReturnChannel) {
              io.to(socketId).emit("radioText", { isAd: false });
            }

            isAdPlaying.set(userChannelKey, false);
            userAdEndTimers.delete(userId);
            userChannelStatus.delete(userId);
          } catch (error) {
            console.error("Failed to fetch user information", error);
          }
        }, 15000);

        userAdEndTimers.set(userId, timer);
      }
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
