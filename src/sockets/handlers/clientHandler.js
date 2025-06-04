import registerRadioTextHandler from "./radioTextHandler.js";

const registerClientHandlers = (socket) => {
  registerRadioTextHandler(socket);
};

export default registerClientHandlers;
