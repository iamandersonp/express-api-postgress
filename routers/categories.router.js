const express = require('express');
const passport = require('passport');

const CategoriesService = require('../services/categories.service');
const validatorHandler = require('../midleware/validator.handler');
const { checkRole } = require('../midleware/auth.handlers');
const {
  createCategorySchema,
  updateCategorySchema,
  getCategorySchema
} = require('../schema/category.schema');

const router = express.Router();
const service = new CategoriesService();

/**
 * @swagger
 */
router.get('/', async (req, res, next) => {
  try {
    const categories = await service.getAll();
    res.status(200).json(categories);
  } catch (error) {
    next(error);
  }
});

router.get(
  '/:id',
  validatorHandler(getCategorySchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const category = await service.findOne(id);
      res.status(200).json(category);
    } catch (error) {
      next(error);
    }
  }
);

router.post(
  '/',
  passport.authenticate('jwt', { session: false }),
  checkRole(2, 3, 4),
  validatorHandler(createCategorySchema, 'body'),
  async (req, res, next) => {
    try {
      const body = req.body;
      const category = await service.create(body);
      res.status(201).json(category);
    } catch (error) {
      next(error);
    }
  }
);

router.patch(
  '/:id',
  passport.authenticate('jwt', { session: false }),
  checkRole(2, 3, 4),
  validatorHandler(getCategorySchema, 'params'),
  validatorHandler(updateCategorySchema, 'body'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const { body } = req.body;
      const category = await service.update(id, body);
      res.status(200).json(category);
    } catch (error) {
      next(error);
    }
  }
);

router.delete(
  '/:id',
  passport.authenticate('jwt', { session: false }),
  checkRole(2, 3, 4),
  validatorHandler(getCategorySchema, 'params'),
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
