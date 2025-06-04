import transcribedTextHandler from "./transcribedTextHandler.js";

const registerWhisperHandlers = (socket) => {
  transcribedTextHandler(socket);
};

export default registerWhisperHandlers;
