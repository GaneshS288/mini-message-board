import crypto from "crypto"

const messages = [
  {
    text: "Hi there!",
    user: "Amando",
    added: new Date(),
    messageid : crypto.randomUUID(),
  },
  {
    text: "Hello World!",
    user: "Charles",
    added: new Date(),
    messageid : crypto.randomUUID(),
  },
];

async function addMessage(text, user) {
  const newMessage = { text, user, added: new Date(), messageid: crypto.randomUUID() };
  messages.push(newMessage);
}

export { messages, addMessage };
