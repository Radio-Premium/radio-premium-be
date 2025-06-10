import http from "http";

import dotenv from "dotenv";
import express from "express";

import { loadAdKeywords } from "./init/loadAdKeywords.js";
import { errorHandler } from "./middlewares/errorHandler.js";
import adKeywordRoutes from "./routes/ad-keywords/index.js";
import radioChannelRoutes from "./routes/radio-channels/index.js";
import reportRoutes from "./routes/reports/index.js";
import userRoutes from "./routes/users/index.js";
import whisperRoutes from "./routes/whisper/index.js";
import { initSocket } from "./sockets/index.js";

dotenv.config();

const app = express();
app.use(express.json());

app.use("/ad-keywords", adKeywordRoutes);
app.use("/users", userRoutes);
app.use("/reports", reportRoutes);
app.use("/radio-channels", radioChannelRoutes);
app.use("/whisper", whisperRoutes);

app.use(errorHandler);

await loadAdKeywords();

const server = http.createServer(app);
initSocket(server);

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
