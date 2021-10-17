const joi = require('joi');

const id = joi.number().min(1);
const uuid = joi.string().uuid();
const name = joi.string().min(3).max(35);
const price = joi.number().integer().min(10);
const image = joi.string().uri();

const createProductSchema = joi.object({
  name: name.required(),
  price: price.required(),
  image: image.required(),
  categoryId: id.required()
});

const updateProductSchema = joi.object({
  name: name,
  uuid: uuid,
  price: price,
  image: image,
  categoryId: id
});

const getProductSchema = joi.object({
  id: id.required()
});

module.exports = {
  createProductSchema,
  updateProductSchema,
  getProductSchema
};
