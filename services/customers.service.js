const boom = require('@hapi/boom');

const { models } = require('../libs/sequelize');

class CustomersService {
  constructor() {}

  async getAll() {
    const rta = await models.Customer.findAll({
      include: ['user']
    });
    return rta;
  }

  async fidOne(id) {
    const user = await models.Customer.findByPk(id, {
      include: ['user']
    });
    if (!user) {
      throw boom.notFound('Customer not found');
    }
    return user;
  }

  async create(data) {
    const newUser = await models.Customer.create(data, {
      include: ['user']
    });
    return newUser;
  }

  async update(id, data) {
    const customer = await this.fidOne(id);
    const rta = await customer.update(data);
    return rta;
  }

  async delete(id) {
    const customer = await this.fidOne(id);
    await customer.destroy();
    return { message: 'Customer Deleted' };
  }
}

module.exports = CustomersService;
