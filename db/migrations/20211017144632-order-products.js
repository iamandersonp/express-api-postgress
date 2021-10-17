'use strict';

const {
  OrderProductSchema,
  ORDER_PRODUCT_TABLE
} = require('./../models/order-products.model');

module.exports = {
  up: async (queryInterface) => {
    await queryInterface.createTable(
      ORDER_PRODUCT_TABLE,
      OrderProductSchema
    );
  },

  down: async (queryInterface) => {
    await queryInterface.dropTable(ORDER_PRODUCT_TABLE);
  }
};
