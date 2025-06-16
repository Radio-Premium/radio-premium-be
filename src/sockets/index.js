import { Server } from "socket.io";

import { allowedOrigin } from "../constants/env.js";
import registerClientHandlers from "./handlers/clientHandler.js";
import registerWhisperHandlers from "./handlers/whisperHandler.js";

const userMap = new Map();

export const initSocket = (server) => {
  const io = new Server(server, {
    cors: {
      origin: allowedOrigin,
      methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
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
