const express = require('express');
const routerProducts = require('./products.router');
const routerUsers = require('./users.router');

function routerApi(app) {
  const router = express.Router();
  app.use('/api/v1', router);
  router.use('/products', routerProducts);
  router.use('/users', routerUsers);
}

module.exports = routerApi;
