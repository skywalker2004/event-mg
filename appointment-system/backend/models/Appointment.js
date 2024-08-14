const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/config');

const Appointment = sequelize.define('Appointment', {
    userId: { type: DataTypes.INTEGER, allowNull: false },
    date: { type: DataTypes.DATE, allowNull: false },
    amount: { type: DataTypes.DECIMAL, allowNull: false },
  });

  module.exports = Appointment;
