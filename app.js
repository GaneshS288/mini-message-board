import express from "express";
import path from "path";
import indexRouter from "./routers/indexRouter.js";

const port = 8080;
const app = express();
const assetsPath = path.join(import.meta.dirname, "public");

app.set("views", path.join(import.meta.dirname, "views"));
app.set("view engine", "ejs");

app.use(express.static(assetsPath));
app.use("/", indexRouter);

app.listen(port, () => console.log(`listening at port : ${port}`));