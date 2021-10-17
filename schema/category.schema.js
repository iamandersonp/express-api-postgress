const joi = require('joi');

const id = joi.number().min(1);
const name = joi.string().min(3).max(35);

const createCategorySchema = joi.object({
  name: name.required()
});

const updateCategorySchema = joi.object({
  name: name.required()
});

const getCategorySchema = joi.object({
  id: id.required()
});

module.exports = {
  createCategorySchema,
  updateCategorySchema,
  getCategorySchema
};
