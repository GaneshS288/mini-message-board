import express from "express";

const indexRouter = express.Router();

indexRouter.get("/", (req, res) => {
  res.send("hello world");
});

indexRouter.use("/new", express.json())
indexRouter.post("/new", (req, res) => {
  console.log(req.body);
  res.send("posted new message");
});

export default indexRouter;