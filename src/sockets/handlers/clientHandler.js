import registerUserConnectionHandler from "./userConnectionHandler.js";

const registerClientHandlers = (socket, userMap) => {
  registerUserConnectionHandler(socket, userMap);
};

export default registerClientHandlers;
