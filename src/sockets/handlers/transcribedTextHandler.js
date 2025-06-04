const transcribedTextHandler = (socket) => {
  socket.on("transcribedRadioText", ({ text }) => {
    console.log("[Whisper] Received text: ", text);
    // TODO: Whisper로부터 받은 텍스트 처리 로직 구현 후 transcribedTextHandler와 연결
  });

  socket.on("disconnect", () => {
    console.log("Whisper disconnected");
  });
};

export default transcribedTextHandler;
