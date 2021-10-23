const boom = require('@hapi/boom');

const { models } = require('../libs/sequelize');

class OrdersService {
  constructor() {}

  async getAll() {
    const rta = await models.Order.findAll({
      include: ['items']
    });
    return rta;
  }

  async findByUser(userId) {
    const order = await models.Order.findAll({
      where: {
        '$customer.user.id$': userId
      },
      include: [
        {
          association: 'customer',
          include: [
            {
              association: 'user',
              include: ['role']
            }
          ]
        }
      ]
    });
    return order;
  }

  async findOne(id) {
    const order = await models.Order.findByPk(id, {
      include: [
        {
          association: 'customer',
          include: [
            {
              association: 'user',
              include: ['role']
            }
          ]
        },
        'items'
      ]
    });
    if (!order) {
      throw boom.notFound('Order not found');
    }
    return order;
  }

  async create(data) {
    const customer = await models.Customer.findAll({
      where: {
        '$user.id$': data.userId
      },
      include: ['user']
    });
    const dataOrder = {
      customerId: customer[0].id
    };
    if (!customer) {
      throw boom.notFound('Customer not found');
    }
    const newOrder = await models.Order.create(dataOrder);
    return newOrder;
  }

  async addItem(data) {
    const newItem = await models.OrderProduct.create(data);
    return newItem;
  }

  async update(id, data) {
    const order = await this.findOne(id);
    const rta = await order.update(data);
    return rta;
  }

  async delete(id) {
    const order = await this.findOne(id);
    await order.destroy();
    return { message: 'Order Deleted' };
  }
}

module.exports = OrdersService;
