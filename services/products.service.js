const boom = require('@hapi/boom');

const { models } = require('../libs/sequelize');

class ProductsService {
  constructor() {}

  async getAll() {
    const rta = await models.Product.findAll();
    return rta;
  }

  async fidOne(id) {
    const product = await models.Product.findByPk(id);
    if (!product) {
      throw boom.notFound('Product not found');
    }
    return product;
  }

  async create(data) {
    const newProduct = await models.Product.create(data);
    return newProduct;
  }

  async update(id, data) {
    const product = await this.fidOne(id);
    const rta = await product.update(data);
    return rta;
  }

  async delete(id) {
    const product = await this.fidOne(id);
    await product.destroy();
    return { message: 'Product Deleted' };
  }
}

module.exports = ProductsService;
