const boom = require('@hapi/boom');

const { models } = require('../libs/sequelize');

class UsersService {
  constructor() {}

  async getAll() {
    const rta = await models.User.findAll({
      include: ['customer']
    });
    return rta;
  }

  async fidOne(id) {
    const user = await models.User.findByPk(id, {
      include: ['customer']
    });
    if (!user) {
      throw boom.notFound('User not found');
    }
    return user;
  }

  async create(data) {
    const newUser = await models.User.create(data);
    return newUser;
  }

  async update(id, data) {
    const user = await this.fidOne(id);
    const rta = await user.update(data);
    return rta;
  }

  async delete(id) {
    const user = await this.fidOne(id);
    await user.destroy();
    return { message: 'User Deleted' };
  }
}

module.exports = UsersService;
