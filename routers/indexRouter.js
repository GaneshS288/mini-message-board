import express from "express";
import { messages } from "../db/messages.js";
import asyncHandler from "../lib/asyncHandler.js";
import postMessage from "../controllers/postMessage.js";
import errorHandler from "../errors/errorHandler.js";

const indexRouter = express.Router();

indexRouter.get("/", (req, res) => {
  res.render("home", { messages });
});

indexRouter.get("/messages/:messageid", (req, res, _next) => {
  const selectedMessage = messages.find(
    (message) => message.messageid === req.params.messageid
  );
  res.render("messagePage", { ...selectedMessage });
});

indexRouter.use("/new", express.urlencoded({ extended: true }));

indexRouter.get("/new", (req, res) => {
  res.render("postMessage");
});
indexRouter.post("/new", [
  asyncHandler(postMessage),
  (req, res) => res.status(201).redirect("/"),
  errorHandler,
]);

indexRouter.get("/*", (req, res) => res.status(404).render("404"));

export default indexRouter;
