import express from "express";
import path from "path";

const port = 8080;
const app = express();

app.set("views", path.join(import.meta.dirname, "views"));
app.set("view engine", "ejs");

app.get("/", (req, res) => res.send("hello world"));

app.listen(port, () => console.log(`listening at port : ${port}`));