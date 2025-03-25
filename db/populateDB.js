import pg from "pg";
import "dotenv/config";

const { Client } = pg;

const data = [
  { username: "Bob", text: "Javascript is a pain", date: new Date() },
  { username: "Ganesh", text: "need more SQL practice", date: new Date() },
  { username: "borgar", text: "I am a borgar", date: new Date() },
];

const SQL = `CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    name VARCHAR (255) UNIQUE
);

CREATE TABLE IF NOT EXISTS messages (
    id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    user_id INTEGER REFERENCES users(id),
    text VARCHAR (255) NOT NULL,
    date DATE NOT NULL
);
`;

async function populate(data) {
  console.log("seeding...");
  const client = new Client({
    host: process.env.HOSTNAME,
    database: process.env.DATABASE_NAME,
    user: process.env.USER_NAME,
    password: process.env.USER_PASSWORD,
    port: process.env.PORT,
  });

  await client.connect();
  await client.query(SQL);
  for (let item of data) {
    const { rows } = await client.query(
      "INSERT INTO users (name) VALUES ($1) RETURNING id",
      [item.username]
    );
    console.log(rows);
    await client.query(
      "INSERT INTO MESSAGES (user_id, text, date) VALUES($1, $2, $3)",
      [rows[0].id, item.text, item.date.toDateString()]
    );
  }
  await client.end();
  console.log("done");
}

populate(data);
