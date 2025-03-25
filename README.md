# mini-message-board

A message board made with ejs and express.

## setup

You need to have a postgres server running to store the message data and an env file must be configured for the database access. See .env.example for the env variable standard.

## features

- Message Cards display author's name, publish date and the actual message contents
- Users can post new messages by filling out a form
- any invalid url or invalid message returns an appropriate error page
