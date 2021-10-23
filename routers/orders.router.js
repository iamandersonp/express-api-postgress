const express = require('express');
const passport = require('passport');

const { checkRole } = require('../midleware/auth.handlers');
const CategoriesService = require('../services/orders.service');
const validatorHandler = require('../midleware/validator.handler');
const {
  //createOrderSchema,
  updateOrderSchema,
  addItemSchema,
  getOrderSchema
} = require('../schema/order.schema');

const router = express.Router();
const service = new CategoriesService();

/**
 * @swagger
 */
router.get(
  '/',
  passport.authenticate('jwt', { session: false }),
  checkRole(2, 3, 4),
  async (req, res, next) => {
    try {
      const orders = await service.getAll();
      res.status(200).json(orders);
    } catch (error) {
      next(error);
    }
  }
);

router.get(
  '/:id',
  passport.authenticate('jwt', { session: false }),
  validatorHandler(getOrderSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const order = await service.findOne(id);
      res.status(200).json(order);
    } catch (error) {
      next(error);
    }
  }
);

router.post(
  '/',
  passport.authenticate('jwt', { session: false }),
  //validatorHandler(createOrderSchema, 'body'),
  async (req, res, next) => {
    try {
      const body = {
        userId: req.user.sub
      };
      const order = await service.create(body);
      res.status(201).json(order);
    } catch (error) {
      next(error);
    }
  }
);

router.post(
  '/add-item',
  passport.authenticate('jwt', { session: false }),
  validatorHandler(addItemSchema, 'body'),
  async (req, res, next) => {
    try {
      const body = req.body;
      const order = await service.addItem(body);
      res.status(201).json(order);
    } catch (error) {
      next(error);
    }
  }
);

router.patch(
  '/:id',
  passport.authenticate('jwt', { session: false }),
  validatorHandler(getOrderSchema, 'params'),
  validatorHandler(updateOrderSchema, 'body'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const { body } = req.body;
      const order = await service.update(id, body);
      res.status(200).json(order);
    } catch (error) {
      next(error);
    }
  }
);

router.delete(
  '/:id',
  passport.authenticate('jwt', { session: false }),
  checkRole(2, 3, 4),
  validatorHandler(getOrderSchema, 'params'),
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
