const registerRadioTextHandler = (socket) => {
  const intervalId = setInterval(() => {
    try {
      // TODO: Whisper 서버로부터 받아온 텍스트 응답값으로 업데이트
      socket.emit("radioText", "맥스 안터져요~");
    } catch (error) {
      console.log("Radio text emit error:", error);
    }
  }, 5000);

  socket.on("disconnect", () => {
    console.log("Client disconnectd");
    clearInterval(intervalId);
  });

  socket.on("error", (error) => {
    console.log("Socket error:", error);
  });
};

export default registerRadioTextHandler;
