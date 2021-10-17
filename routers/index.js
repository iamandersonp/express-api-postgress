const express = require('express');
const routerProducts = require('./products.router');
const routerUsers = require('./users.router');
const routerCustomers = require('./customers.router');
const routerCategory = require('./categories.router');

function routerApi(app) {
  const router = express.Router();
  app.use('/api/v1', router);
  router.use('/products', routerProducts);
  router.use('/users', routerUsers);
  router.use('/customers', routerCustomers);
  router.use('/categories', routerCategory);
}

module.exports = routerApi;
