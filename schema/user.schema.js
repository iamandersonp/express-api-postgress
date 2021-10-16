const joi = require('joi');

const id = joi.number().min(1);
const userName = joi.string().min(3).max(35);
const password = joi.string().min(3).max(35);
const email = joi.string().email().min(3).max(35);

const createUserSchema = joi.object({
  username: userName.required(),
  password: password.required(),
  email: email.required()
});

const updateUserSchema = joi.object({
  username: userName,
  password: password,
  email: email
});

const getUserSchema = joi.object({
  id: id.required()
});

module.exports = {
  createUserSchema,
  updateUserSchema,
  getUserSchema
};
