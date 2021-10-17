const joi = require('joi');

const id = joi.number().min(1);
const amount = joi.number().min(1);
const productId = joi.number().min(1);

const createOrderSchema = joi.object({
  customerId: id.required()
});

const updateOrderSchema = joi.object({
  customerId: id
});

const addItemSchema = joi.object({
  orderId: id.required(),
  amount: amount.required(),
  productId: productId.required()
});

const getOrderSchema = joi.object({
  id: id.required()
});

module.exports = {
  createOrderSchema,
  updateOrderSchema,
  addItemSchema,
  getOrderSchema
};
