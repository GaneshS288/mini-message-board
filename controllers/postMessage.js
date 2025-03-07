import { addMessage, messages } from "../db/messages.js";

async function postMessage(req, res, next) {
  const text = req.body.text;
  const user = req.body.user;

  if (!text || !user) throw new Error("Invalid message, missing properties!");

  await addMessage(text, user);

  console.log(messages);
  res.send("posted new message");
}

export default postMessage;
