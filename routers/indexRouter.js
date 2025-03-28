import express from "express";
import asyncHandler from "../lib/asyncHandler.js";
import postMessage from "../controllers/postMessage.js";
import errorHandler from "../errors/errorHandler.js";
import { getAllMessages, getMessage } from "../controllers/getMessage.js";

const indexRouter = express.Router();

indexRouter.get("/", [asyncHandler(getAllMessages), errorHandler]);

indexRouter.get("/messages/:messageid", asyncHandler(getMessage)); 

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
