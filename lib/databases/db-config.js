import pg from "pg";

///pg
const { Pool } = pg;

///remote database
const pool = new Pool({
  user: process.env.POSTGRES_USER,
  host: process.env.POSTGRES_HOST,
  database: process.env.POSTGRES_DATABASE,
  password: process.env.POSTGRES_PASSWORD,
  port: process.env.POSTGRES_PORT,
});

///localDB
///remote database
// const pool = new Pool({
//   user: process.env.POSTGRES_USER,
//   host: process.env.POSTGRES_HOST_DEV,
//   database: process.env.POSTGRES_DATABASE,
//   password: process.env.POSTGRES_PASSWORD,
//   port: process.env.POSTGRES_PORT,
// });

export { pool };
