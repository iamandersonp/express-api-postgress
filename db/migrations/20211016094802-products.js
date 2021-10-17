'use strict';

const {
  ProductSchema,
  PRODUCT_TABLE
} = require('./../models/product.model');

module.exports = {
  up: async (queryInterface) => {
    await queryInterface.createTable(
      PRODUCT_TABLE,
      ProductSchema
    );
  },

  down: async (queryInterface) => {
    await queryInterface.drop(PRODUCT_TABLE);
  }
};
