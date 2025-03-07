import express from "express";
import {messages, addMessage} from "../db/messages.js";

const indexRouter = express.Router();

indexRouter.get("/", (req, res) => {
  res.send("hello world");
});

indexRouter.use("/new", express.json())
indexRouter.post("/new", async (req, res) => {
  await addMessage(req.body.text, req.body.user);
  console.log(messages);
  res.send("posted new message");
});

export default indexRouter;