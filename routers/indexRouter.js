import express from "express";
import { messages } from "../db/messages.js";
import asyncHandler from "../lib/asyncHandler.js";
import postMessage from "../controllers/postMessage.js";
import errorHandler from "../errors/errorHandler.js";

const indexRouter = express.Router();

indexRouter.get("/", (req, res) => {
  res.render("home", {messages});
});

indexRouter.use("/new", express.urlencoded({extended: true}));

indexRouter.get("/new", (req, res) => {
  res.render('newMessage');
})
indexRouter.post("/new", [asyncHandler(postMessage), errorHandler]);

export default indexRouter;
