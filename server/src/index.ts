import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import db from "./config/db";
import "./models";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8080;

app.use(express.json());
app.use(cors({ origin: process.env.CLIENT_ORIGIN as string }));

db();

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
