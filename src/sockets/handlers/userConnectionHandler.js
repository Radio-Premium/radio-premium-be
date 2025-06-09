const registerUserConnectionHandler = (socket, userMap) => {
  let currentUserId = null;

  socket.on("registerUser", ({ userId }) => {
    currentUserId = userId;
    userMap.set(userId, socket.id);
  });

  socket.on("disconnect", () => {
    if (currentUserId) {
      userMap.delete(currentUserId);
    }
  });
};

export default registerUserConnectionHandler;
