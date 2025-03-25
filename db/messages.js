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
    if (await this.doesNameAlreadyExists(username)) {
      try {
        const userId = await this.getUserIdByName(username);
        const date = new Date().toDateString();

        await pool.query(
          `INSERT INTO messages (user_id, text, date)
          VALUES ($1, $2, $3)`,
          [userId, text, date]
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
          VALUES ($1) RETURNING id;`,
          [username]
        );
        const userId = rows[0].id;
        const date = new Date().toDateString();

        await pool.query(
          `INSERT INTO messages (user_id, text, date)
          VALUES ($1, $2, $3)`,
          [userId, text, date]
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
      "SELECT name FROM users WHERE LOWER(name) = $1",
      [username.toLowerCase()]
    );
    console.log(rows);
    return rows.length > 0 ? true : false;
  }

  static async getUserIdByName(username) {
    const { rows } = await pool.query("SELECT id FROM users WHERE LOWER(name) = $1", [
      username.toLowerCase(),
    ]);
    return rows[0].id;
  }
}


export default DB;
