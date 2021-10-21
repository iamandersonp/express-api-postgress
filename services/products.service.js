const boom = require('@hapi/boom');

const { models } = require('../libs/sequelize');

class ProductsService {
  constructor() {}

  async getAll() {
    const rta = await models.Product.findAll({
      include: ['category']
    });
    return rta;
  }

  async findOne(id) {
    const product = await models.Product.findByPk(id, {
      include: ['category']
    });
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
    const customer = await this.findOne(id);
    const rta = await customer.update(data);
    return rta;
  }

  async delete(id) {
    const product = await this.findOne(id);
    await product.destroy();
    return { message: 'Product Deleted' };
  }
}

module.exports = ProductsService;
