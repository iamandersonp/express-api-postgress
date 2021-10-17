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

  async fidOne(id) {
    const order = await models.Order.findByPk(id, {
      include: [
        {
          association: 'customer',
          include: ['user']
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
    const newOrder = await models.Order.create(data);
    return newOrder;
  }

  async addItem(data) {
    const newItem = await models.OrderProduct.create(data);
    return newItem;
  }

  async update(id, data) {
    const order = await this.fidOne(id);
    const rta = await order.update(data);
    return rta;
  }

  async delete(id) {
    const order = await this.fidOne(id);
    await order.destroy();
    return { message: 'Order Deleted' };
  }
}

module.exports = OrdersService;
