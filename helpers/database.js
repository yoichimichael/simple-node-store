const { Sequelize } = require('sequelize');

// const sequelize = new Sequelize(process.env.PG_DB_CONN);

const sequelize = new Sequelize('academind_node_shop', 'Yoichi', `${process.env.PG_DB_PASS}`, {
  host: 'localhost',
  dialect: 'postgres',
});

module.exports = sequelize;

/* 
=== Connecting to DB with pg package ===

const { Pool } = require('pg')
const connectionString = process.env.PG_DB_CONN;

module.exports = new Pool({
  connectionString
});
*/


