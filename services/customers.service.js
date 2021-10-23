const boom = require('@hapi/boom');
const bcrypt = require('bcrypt');

const { models } = require('../libs/sequelize');

class CustomersService {
  constructor() {}

  removePassword(newCustomer) {
    delete newCustomer.dataValues.user.dataValues.password;
    return newCustomer;
  }

  async getAll() {
    const rta = await models.Customer.findAll({
      include: [
        {
          association: 'user',
          include: ['role']
        }
      ]
    });
    return rta;
  }

  async findOne(id) {
    let customer = await models.Customer.findByPk(id, {
      include: [
        {
          association: 'user',
          include: ['role']
        }
      ]
    });
    if (!customer) {
      throw boom.notFound('Customer not found');
    }
    customer = this.removePassword(customer);
    return customer;
  }

  async create(data) {
    const hash = await bcrypt.hash(data.user.password, 10);
    const newData = {
      ...data,
      user: {
        ...data.user,
        password: hash
      }
    };
    let newCustomer = await models.Customer.create(
      newData,
      {
        include: ['user']
      }
    );
    newCustomer = this.removePassword(newCustomer);
    return newCustomer;
  }

  async update(id, data) {
    const customer = await this.findOne(id);
    let rta = await customer.update(data);
    rta = this.removePassword(rta);
    return rta;
  }

  async delete(id) {
    const customer = await this.findOne(id);
    await customer.destroy();
    return { message: 'Customer Deleted' };
  }
}

module.exports = CustomersService;
