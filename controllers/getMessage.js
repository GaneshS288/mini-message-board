import DB from "../db/messages.js";

async function getAllMessages(req, res, _next) {
  let messages = await DB.getAllMessages();
  if (messages instanceof Error) throw messages;

  res.render("home", { messages });
}

async function getMessage(req, res, _next) {
    const messageId = req.params.messageid;
    const message = await DB.getMessageById(messageId);
    res.render("messagePage", { ...message });
}

export { getAllMessages, getMessage };
