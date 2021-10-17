const express = require('express');
const CustomersService = require('../services/customers.service');
const validatorHandler = require('../midleware/validator.handler');
const {
  createCustomerSchema,
  updateCustomerSchema,
  getCustomerSchema
} = require('../schema/customer.schema');

const router = express.Router();
const service = new CustomersService();

/**
 * @swagger
 * /users:
 *   get:
 *     summary: Retrieve a list of JSONPlaceholder users
 *     description: Retrieve a list of users from JSONPlaceholder. Can be used to populate a list of fake users when prototyping or testing an API.
 */
router.get('/', async (req, res, next) => {
  try {
    const customers = await service.getAll();
    res.status(200).json(customers);
  } catch (error) {
    next(error);
  }
});

router.get(
  '/:id',
  validatorHandler(getCustomerSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const customers = await service.fidOne(id);
      res.status(200).json(customers);
    } catch (error) {
      next(error);
    }
  }
);

router.post(
  '/',
  validatorHandler(createCustomerSchema, 'body'),
  async (req, res, next) => {
    try {
      const body = req.body;
      const customer = await service.create(body);
      res.status(201).json(customer);
    } catch (error) {
      next(error);
    }
  }
);

router.patch(
  '/:id',
  validatorHandler(getCustomerSchema, 'params'),
  validatorHandler(updateCustomerSchema, 'body'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const { body } = req.body;
      const customer = await service.update(id, body);
      res.status(200).json(customer);
    } catch (error) {
      next(error);
    }
  }
);

router.delete(
  '/:id',
  validatorHandler(getCustomerSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const resp = await service.delete(id);
      res.status(200).json(resp);
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;
