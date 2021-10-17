'use strict';

const {
  CategorySchema,
  CATEGORY_TABLE
} = require('./../models/category.model');

const {
  PRODUCT_TABLE,
  ProductSchema
} = require('./../models/product.model');

module.exports = {
  up: async (queryInterface) => {
    await queryInterface.createTable(
      CATEGORY_TABLE,
      CategorySchema
    );
    await queryInterface.addColumn(
      PRODUCT_TABLE,
      'category_id',
      ProductSchema.categoryId
    );
  },

  down: async (queryInterface) => {
    await queryInterface.removeColumn(
      PRODUCT_TABLE,
      'category_id'
    );
    await queryInterface.dropTable(CATEGORY_TABLE);
  }
};
