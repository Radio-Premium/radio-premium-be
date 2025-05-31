import dotenv from "dotenv";
import express from "express";

import { errorHandler } from "./middlewares/errorHandler.js";
import adKeywordRoutes from "./routes/ad-keywords/index.js";
import radioChannelRoutes from "./routes/radio-channels/index.js";
import reportRoutes from "./routes/reports/index.js";
import userRoutes from "./routes/users/index.js";

dotenv.config();

const app = express();

app.use(express.json());

app.use("/ad-keywords", adKeywordRoutes);
app.use("/users", userRoutes);
app.use("/reports", reportRoutes);
app.use("/radio-channels", radioChannelRoutes);

app.use(errorHandler);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
