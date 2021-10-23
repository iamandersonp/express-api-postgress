const boom = require('@hapi/boom');
const bcrypt = require('bcrypt');

const { models } = require('../libs/sequelize');

class UsersService {
  constructor() {}

  removePassword(newUser) {
    delete newUser.dataValues.password;
    return newUser;
  }

  async getAll() {
    const rta = await models.User.findAll({
      include: ['role', 'customer']
    });
    return rta;
  }

  async findOne(id) {
    let user = await models.User.findByPk(id, {
      include: ['role', 'customer']
    });
    if (!user) {
      throw boom.notFound('User not found');
    }
    user = this.removePassword(user);
    return user;
  }

  async findByEmail(email) {
    const user = await models.User.findOne({
      where: { email },
      include: ['role', 'customer']
    });
    if (!user) {
      throw boom.notFound('User not found');
    }
    return user;
  }

  async create(data) {
    const hash = await bcrypt.hash(data.password, 10);
    let newUser = await models.User.create({
      ...data,
      password: hash
    });
    newUser = this.removePassword(newUser);
    return newUser;
  }

  async update(id, data) {
    const user = await this.findOne(id);
    if (data.password) {
      const hash = await bcrypt.hash(data.password, 10);
      const data = {
        ...data,
        password: hash
      };
    }
    let rta = await user.update(data);
    rta = this.removePassword(rta);
    return rta;
  }

  async delete(id) {
    const user = await this.findOne(id);
    await user.destroy();
    return { message: 'User Deleted' };
  }
}

module.exports = UsersService;
