import { getAdKeywords } from "../../cache/adKeywordCache.js";
import { getUserByIdService } from "../../services/users/userService.js";

const userIsAdPlaying = new Map();
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
    const adKey = `${userId}:${channelId}`;
    const userStatus = userChannelStatus.get(userId);

    const isMovedChannel =
      userStatus?.prevChannelId && channelId === userStatus.prevChannelId;

    if (matched) {
      if (!userIsAdPlaying.get(adKey)) {
        io.to(socketId).emit("radioText", { isAd: true });
        userChannelStatus.set(userId, { prevChannelId: channelId });
        userIsAdPlaying.set(adKey, true);
      }

      if (userAdEndTimers.has(userId)) {
        clearTimeout(userAdEndTimers.get(userId));
        userAdEndTimers.delete(userId);
      }

      return;
    }

    if (isMovedChannel && userIsAdPlaying.get(adKey)) {
      if (!userAdEndTimers.has(userId)) {
        const timer = setTimeout(async () => {
          try {
            const user = await getUserByIdService(userId);
            if (user.isReturnChannel) {
              io.to(socketId).emit("radioText", { isAd: false });
            }

            userIsAdPlaying.set(adKey, false);
            userAdEndTimers.delete(userId);
            userChannelStatus.delete(userId);
          } catch (error) {
            console.error("Failed to fetch user information", error);
          }
        }, 5000);

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
