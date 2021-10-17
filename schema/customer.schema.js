const joi = require('joi');

const {
  createUserSchema,
  updateUserSchema
} = require('./user.schema');

const id = joi.number().min(1);
const firstName = joi.string().min(3).max(35);
const lastName = joi.string().min(3).max(35);
const phone = joi.string().min(3).max(35);

const createCustomerSchema = joi.object({
  firstName: firstName.required(),
  lastName: lastName.required(),
  phone: phone.required(),
  user: createUserSchema
});

const updateCustomerSchema = joi.object({
  firstname: firstName,
  lastname: lastName,
  phone: phone,
  user: updateUserSchema
});

const getCustomerSchema = joi.object({
  id: id.required()
});

module.exports = {
  createCustomerSchema,
  updateCustomerSchema,
  getCustomerSchema
};
