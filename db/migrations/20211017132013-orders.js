'use strict';
const { DataTypes, Sequelize } = require('sequelize');

const { CUSTOMER_TABLE } = require('./customer.model');

const { ORDER_TABLE } = require('./../models/order.model');

module.exports = {
  up: async (queryInterface) => {
    await queryInterface.createTable(ORDER_TABLE, {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE,
        field: 'created_at',
        defaultValue: Sequelize.NOW
      },
      customerId: {
        field: 'user_id',
        allowNull: false,
        type: DataTypes.INTEGER,
        references: {
          model: CUSTOMER_TABLE,
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
      }
    });
  },

  down: async (queryInterface) => {
    await queryInterface.dropTable(ORDER_TABLE);
  }
};
