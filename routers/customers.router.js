const express = require('express');
const passport = require('passport');

const { checkRole } = require('../midleware/auth.handlers');
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
 */
router.get(
  '/',
  passport.authenticate('jwt', { session: false }),
  checkRole(2, 3, 4),
  async (req, res, next) => {
    try {
      const customers = await service.getAll();
      res.status(200).json(customers);
    } catch (error) {
      next(error);
    }
  }
);

router.get(
  '/:id',
  passport.authenticate('jwt', { session: false }),
  validatorHandler(getCustomerSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const customers = await service.findOne(id);
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
  passport.authenticate('jwt', { session: false }),
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
  passport.authenticate('jwt', { session: false }),
  checkRole(2, 3, 4),
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
