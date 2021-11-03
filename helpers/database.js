const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(process.env.PG_DB_CONN);

module.exports = sequelize;

/* 
=== Connecting to DB with pg package ===

const { Pool } = require('pg')
const connectionString = process.env.PG_DB_CONN;

module.exports = new Pool({
  connectionString
});
*/


