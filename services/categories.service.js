const boom = require('@hapi/boom');

const { models } = require('../libs/sequelize');

class CategoriesService {
  constructor() {}

  async getAll() {
    const rta = await models.Category.findAll();
    return rta;
  }

  async fidOne(id) {
    const category = await models.Category.findByPk(id, {
      include: ['products']
    });
    if (!category) {
      throw boom.notFound('Category not found');
    }
    return category;
  }

  async create(data) {
    const newCategory = await models.Category.create(data);
    return newCategory;
  }

  async update(id, data) {
    const category = await this.fidOne(id);
    const rta = await category.update(data);
    return rta;
  }

  async delete(id) {
    const category = await this.fidOne(id);
    await category.destroy();
    return { message: 'Category Deleted' };
  }
}

module.exports = CategoriesService;
