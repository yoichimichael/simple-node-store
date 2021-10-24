const { Pool, Client } = require('pg')
const connectionString = process.env.PG_DB_CONN;

const pool = new Pool({
  connectionString
})

module.exports = pool.connect();

// pool.query('SELECT NOW()', (err, res) => {
//   console.log(err, res)
//   pool.end()
// })

// const res = await pool.query('SELECT NOW()')
// await pool.end()

// const client = new Client()
// await client.connect()
// const res = await client.query('SELECT NOW()')
// await client.end()