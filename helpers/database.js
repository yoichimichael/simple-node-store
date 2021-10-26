const { Pool } = require('pg')
const connectionString = process.env.PG_DB_CONN;

module.exports = new Pool({
  connectionString
});
