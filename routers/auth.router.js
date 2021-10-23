const express = require('express');
const passport = require('passport');
const jwt = require('jsonwebtoken');

const { config } = require('./../config/config');
const router = express.Router();

/**
 * @swagger
 * /login:
 *   post:
 *     summary: Retrieve the loged user with the auth token
 *     description: Retrieve the loged user with the auth token.
 */
router.post(
  '/login',
  passport.authenticate('local', { session: false }),
  async (req, res, next) => {
    try {
      const user = req.user;
      const payload = {
        sub: user.id,
        role: user.role.id
      };
      const token = jwt.sign(payload, config.jwt_secret);
      res.status(200).json({
        user,
        token
      });
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;
