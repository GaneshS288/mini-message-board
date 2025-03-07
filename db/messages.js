const messages = [
  {
    text: "Hi there!",
    user: "Amando",
    added: new Date(),
  },
  {
    text: "Hello World!",
    user: "Charles",
    added: new Date(),
  },
];

async function addMessage(text, user) {
  if (!text || !user) {
    const invalidMessageError = new Error("invalid message");
    throw invalidMessageError;
  }

  const newMessage = { text, user, added: new Date() };
  messages.push(newMessage);
}

export { messages, addMessage };
