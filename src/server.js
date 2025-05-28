import express from "express";
import dotenv from "dotenv";

import { supabase } from "./services/supabaseClient.js";

dotenv.config();
const app = express();

app.get("/users", async (req, res) => {
  const { data, error } = await supabase.from("users").select("*");

  if (error) {
    return res.status(500).json({ error });
  }

  res.json(data);
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
