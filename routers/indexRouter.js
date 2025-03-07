import express from "express";
import { messages, addMessage } from "../db/messages.js";
import asyncHandler from "../lib/asyncHandler.js";
import postMessage from "../controllers/postMessage.js";
import errorHandler from "../errors/errorHandler.js";

const indexRouter = express.Router();

indexRouter.get("/", (req, res) => {
  res.send("hello world");
});

indexRouter.use("/new", express.json());
indexRouter.post("/new", [asyncHandler(postMessage), errorHandler]);

export default indexRouter;
