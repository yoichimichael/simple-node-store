const { Pool } = require('pg')
const connectionString = process.env.PG_DB_CONN;

const pool = new Pool({
  connectionString
});

module.exports = pool;