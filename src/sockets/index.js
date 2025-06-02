import { Server } from "socket.io";

import registerSocketHandler from "./handlers";

export const initSocket = (server) => {
  const io = new Server(server, {
    cors: {
      // TODO: 서버 배포 시 origin 업데이트
      origin: "*",
    },
  });

  io.on("connection", (socket) => {
    console.log("Client connected");
    registerSocketHandler(socket);
  });
};
