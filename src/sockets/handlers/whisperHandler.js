import transcribedTextHandler from "./transcribedTextHandler.js";

const registerWhisperHandlers = (socket, io, userMap) => {
  transcribedTextHandler(socket, io, userMap);
};

export default registerWhisperHandlers;
