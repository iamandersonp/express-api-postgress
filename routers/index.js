const express = require('express');
const routerProducts = require('./products.router');

function routerApi(app) {
  const router = express.Router();
  app.use('/api/v1', router);
  router.use('/products', routerProducts);
}

module.exports = routerApi;
