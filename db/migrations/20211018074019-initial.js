'use strict';
const { DataTypes, Sequelize } = require('sequelize');
const bcrypt = require('bcrypt');

const { ORDER_TABLE } = require('./../models/order.model');
const { USER_TABLE } = require('./../models/user.model');
const { ROLE_TABLE } = require('./../models/role.model');
const {
  PRODUCT_TABLE
} = require('./../models/product.model');
const {
  CUSTOMER_TABLE
} = require('./../models/customer.model');
const {
  CATEGORY_TABLE
} = require('./../models/category.model');
const {
  ORDER_PRODUCT_TABLE
} = require('./../models/order-products.model');

module.exports = {
  up: async (queryInterface) => {
    // Create Role table
    await queryInterface.createTable(ROLE_TABLE, {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      role: {
        allowNull: false,
        type: DataTypes.STRING,
        unique: true
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE,
        field: 'created_at',
        defaultValue: Sequelize.NOW
      }
    });
    // Insert Default Roles
    await queryInterface.bulkInsert(ROLE_TABLE, [
      {
        role: 'CUSTOMER',
        created_at: new Date()
      },
      {
        role: 'SELLER',
        created_at: new Date()
      },
      {
        role: 'ADMIN',
        created_at: new Date()
      },
      {
        role: 'SUPER ADMIN',
        created_at: new Date()
      }
    ]);

    // Create User Table
    await queryInterface.createTable(USER_TABLE, {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      username: {
        allowNull: false,
        type: DataTypes.STRING,
        unique: true
      },
      email: {
        allowNull: false,
        type: DataTypes.STRING,
        unique: true
      },
      password: {
        allowNull: false,
        type: DataTypes.STRING
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE,
        field: 'created_at',
        defaultValue: Sequelize.NOW
      },
      roleId: {
        field: 'role_id',
        defaultValue: 1,
        allowNull: false,
        type: DataTypes.INTEGER,
        references: {
          model: ROLE_TABLE,
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
      }
    });
    // Insert Default Admin User
    const hash = await bcrypt.hash('123456', 10);
    await queryInterface.bulkInsert(USER_TABLE, [
      {
        username: 'admin',
        email: 'admin@domain.com',
        password: hash,
        role_id: 4,
        created_at: new Date()
      }
    ]);

    // create Category Table
    await queryInterface.createTable(CATEGORY_TABLE, {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      name: {
        allowNull: false,
        type: DataTypes.STRING,
        unique: true
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE,
        field: 'created_at',
        defaultValue: Sequelize.NOW
      }
    });

    // Create Product Table
    await queryInterface.createTable(PRODUCT_TABLE, {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      uuid: {
        allowNull: false,
        type: DataTypes.UUID,
        unique: true,
        defaultValue: Sequelize.UUIDV4
      },
      name: {
        allowNull: false,
        type: DataTypes.STRING,
        unique: true
      },
      price: {
        allowNull: false,
        type: DataTypes.DECIMAL
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE,
        field: 'created_at',
        defaultValue: Sequelize.NOW
      },
      categoryId: {
        allowNull: true,
        type: DataTypes.INTEGER,
        field: 'category_id',
        references: {
          model: CATEGORY_TABLE,
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
      }
    });

    // Create Customer Table
    await queryInterface.createTable(CUSTOMER_TABLE, {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      firstName: {
        allowNull: false,
        type: DataTypes.STRING,
        field: 'first_name',
        unique: true
      },
      lastName: {
        allowNull: false,
        type: DataTypes.STRING,
        field: 'last_name',
        unique: true
      },
      phone: {
        allowNull: false,
        type: DataTypes.STRING
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE,
        field: 'created_at',
        defaultValue: Sequelize.NOW
      },
      userId: {
        field: 'user_id',
        allowNull: false,
        type: DataTypes.INTEGER,
        unique: true,
        references: {
          model: USER_TABLE,
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
      }
    });

    // create Orders table
    await queryInterface.createTable(ORDER_TABLE, {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE,
        field: 'created_at',
        defaultValue: Sequelize.NOW
      },
      customerId: {
        field: 'user_id',
        allowNull: false,
        type: DataTypes.INTEGER,
        references: {
          model: CUSTOMER_TABLE,
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
      }
    });

    // Create OrderProduct table
    await queryInterface.createTable(ORDER_PRODUCT_TABLE, {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      amount: {
        allowNull: false,
        type: DataTypes.INTEGER
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE,
        field: 'created_at',
        defaultValue: Sequelize.NOW
      },
      orderId: {
        field: 'order_id',
        allowNull: false,
        type: DataTypes.INTEGER,
        references: {
          model: ORDER_TABLE,
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
      },
      productId: {
        field: 'product_id',
        allowNull: false,
        type: DataTypes.INTEGER,
        references: {
          model: PRODUCT_TABLE,
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
      }
    });
  },

  down: async (queryInterface) => {
    await queryInterface.dropTable(ORDER_PRODUCT_TABLE);
    await queryInterface.dropTable(ORDER_TABLE);
    await queryInterface.dropTable(PRODUCT_TABLE);
    await queryInterface.dropTable(CUSTOMER_TABLE);
    await queryInterface.dropTable(CATEGORY_TABLE);
    await queryInterface.dropTable(USER_TABLE);
    await queryInterface.dropTable(ROLE_TABLE);
  }
};
