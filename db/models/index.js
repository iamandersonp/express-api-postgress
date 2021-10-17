const { User, UserSchema } = require('./user.model');
const {
  Product,
  ProductSchema
} = require('./product.model');

const {
  Customer,
  CustomerSchema
} = require('./customer.model');

function setupModels(sequelize) {
  User.init(UserSchema, User.config(sequelize));
  Product.init(ProductSchema, Product.config(sequelize));
  Customer.init(CustomerSchema, Customer.config(sequelize));

  User.associate(sequelize.models);
  Customer.associate(sequelize.models);
}

module.exports = setupModels;
