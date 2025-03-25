import pg from "pg";
import "dotenv/config";

const { Pool } = pg;

export default new Pool({
  host: process.env.HOSTNAME,
  database: process.env.DATABASE_NAME,
  user: process.env.USER_NAME,
  password: process.env.USER_PASSWORD,
  port: process.env.PORT,
});
