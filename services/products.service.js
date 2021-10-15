const faker = require('faker');
const boom = require('@hapi/boom');

const pool = require('../libs/postgres-pool');
class ProductsService {
  constructor() {
    this.products = [];
    this.generate();
    this.pool = pool;
    this.pool.once('error', (err) => console.error(err));
  }

  generate() {
    for (let index = 0; index < 100; index++) {
      const element = {
        id: faker.datatype.uuid(),
        name: faker.commerce.productName(),
        image: faker.image.imageUrl(),
        price: parseInt(faker.commerce.price(), 10),
        isLocked: faker.datatype.boolean()
      };
      this.products.push(element);
    }
  }

  getIndex(id) {
    const index = this.products.findIndex(
      (element) => element.id === id
    );
    return index;
  }

  async getAll() {
    const query = 'SELECT * FROM products';
    const rta = await this.pool.query(query);
    return rta.rows;
  }

  async fidOne(id) {
    const index = this.getIndex(id);
    if (index === -1) {
      throw boom.notFound('Product not found');
    }
    if (this.products[index].isLocked) {
      throw boom.conflict('Product is Locked');
    }
    return this.products[index];
  }

  async create(data) {
    const newProduct = {
      id: faker.datatype.uuid(),
      ...data
    };
    this.products.push(newProduct);
    return newProduct;
  }

  async update(id, data) {
    const index = this.getIndex(id);
    if (index === -1) {
      throw boom.notFound('Product not found');
    }
    const actualProduct = this.products[index];
    this.products[index] = {
      ...actualProduct,
      ...data
    };
    return this.products[index];
  }

  async delete(id) {
    const index = this.getIndex(id);
    if (index === -1) {
      throw boom.notFound('Product not found');
    }
    this.products.splice(index, 1);
    return { message: 'Product Deleted' };
  }
}

module.exports = ProductsService;
