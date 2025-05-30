import dotenv from "dotenv";
import express from "express";

import { errorHandler } from "./middlewares/errorHandler.js";
import radioChannelRoutes from "./routes/radio-channels/[channelId].js";
import userRoutes from "./routes/users/[userId].js";

dotenv.config();

const app = express();

app.use(express.json());

app.use("/users", userRoutes);
app.use("/radio-channels", radioChannelRoutes);

app.use(errorHandler);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
