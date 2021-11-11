const Sequelize = require('sequelize');

const sequelize = require('../helpers/database');

const Cart = sequelize.define('cart', {
  id: {
    type: Sequelize.STRING,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  }
});

module.exports = Cart;