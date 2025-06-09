import { Server } from "socket.io";

import registerClientHandlers from "./handlers/clientHandler.js";
import registerWhisperHandlers from "./handlers/whisperHandler.js";

const userMap = new Map();

export const initSocket = (server) => {
  const io = new Server(server, {
    cors: {
      // TODO: 서버 배포 시 origin 업데이트
      origin: "*",
    },
  });

  io.on("connection", (socket) => {
    console.log("Client connected");
    registerClientHandlers(socket, userMap);
  });

  io.of("/whisper").on("connection", (socket) => {
    console.log("Whisper connected");
    registerWhisperHandlers(socket, io, userMap);
  });
};
