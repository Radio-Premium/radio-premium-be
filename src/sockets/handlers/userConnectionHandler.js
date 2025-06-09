const registerUserConnectionHandler = (socket, userMap) => {
  socket.on("registerUser", ({ userId }) => {
    userMap.set(userId, socket.id);
  });

  socket.on("disconnect", () => {
    userMap.delete(socket.id);
  });
};

export default registerUserConnectionHandler;
