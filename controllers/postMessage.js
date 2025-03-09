import { addMessage } from "../db/messages.js";

async function postMessage(req, res, _next) {
  const text = req.body.text;
  const user = req.body.user;

  if (!text || !user) throw new Error("Invalid message, missing properties!");

  await addMessage(text, user);
  _next();
}

export default postMessage;
