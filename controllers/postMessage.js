import DB from "../db/messages.js";

async function postMessage(req, res, next) {
  const text = req.body.text;
  const user = req.body.user;

  if (!text || !user) throw new Error("Invalid message, missing properties!");

  const DBresponse = await DB.addMessage(user, text);
  if(DBresponse instanceof Error)
    throw DBresponse;
  
  next();
}

export default postMessage;
