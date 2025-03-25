import pool from "./pool.js";

class DB {
  static async getAllMessages() {
    const { rows } = await pool.query(
      `SELECT name AS user, text, messages.date AS added, messages.id AS messageid FROM users
       JOIN messages ON users.id = messages.user_id;`
    );
    return rows;
  }

  static async getMessageById(id) {
    const {rows} = await pool.query(
      `SELECT name AS user, text, messages.date AS added, messages.id AS messageid FROM users
       JOIN messages ON users.id = messages.user_id
       WHERE messages.id = $1;`,
       [id]
    )
    
    return rows[0];
  }

  static async addMessage(username, text) {
    if (this.doesNameAlreadyExists(username)) {
      try {
        const userId = await this.getUserIdByName(username);

        await pool.query(
          `INSERT INTO messages (user_id, text)
          VALUES ($1, $2)`,
          [userId, text]
        );
      } catch (err) {
        err.status = 500;
        err.message = "internal server error";
        return err;
      }
    } else {
      try {
        const { rows } = await pool.query(
          `INSERT INTO users (name)
          VALUES ($1) ON CONFLICT(name) DO NOTHING RETURNING id;`,
          [username]
        );
        const userId = rows[0].id;

        await pool.query(
          `INSERT INTO messages (user_id, text)
          VALUES ($1, $2)`,
          [userId, text]
        );
      } catch (err) {
        err.status = 500;
        err.message = "internal server error";
        return err;
      }
    }
  }

  static async doesNameAlreadyExists(username) {
    const { rows } = await pool.query(
      "SELECT name FROM users WHERE name = $1",
      [username]
    );
    console.log(rows);
    return rows.length > 0 ? true : false;
  }

  static async getUserIdByName(username) {
    const { rows } = await pool.query("SELECT id FROM users WHERE name = $1", [
      username,
    ]);
    return rows[0].id;
  }
}

const messages = [
  {
    text: "Hi there!",
    user: "Amando",
    added: new Date(),
    messageid: crypto.randomUUID(),
  },
  {
    text: "Hello World!",
    user: "Charles",
    added: new Date(),
    messageid: crypto.randomUUID(),
  },
];

async function addMessage(text, user) {
  const newMessage = {
    text,
    user,
    added: new Date(),
    messageid: crypto.randomUUID(),
  };
  messages.push(newMessage);
}

DB.addMessage("Ganesh", "I am trying something out");

export default DB;
