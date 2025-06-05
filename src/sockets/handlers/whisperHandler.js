import transcribedTextHandler from "./transcribedTextHandler.js";

const registerWhisperHandlers = (socket, io) => {
  transcribedTextHandler(socket, io);
};

export default registerWhisperHandlers;
