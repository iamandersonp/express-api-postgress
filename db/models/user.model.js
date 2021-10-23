const {
  Model,
  DataTypes,
  Sequelize
} = require('sequelize');

const { ROLE_TABLE } = require('./role.model');

const USER_TABLE = 'users';

const UserSchema = {
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
    allowNull: false,
    type: DataTypes.INTEGER,
    defaultValue: 1,
    references: {
      model: ROLE_TABLE,
      key: 'id'
    },
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL'
  }
};

class User extends Model {
  static associate(models) {
    this.belongsTo(models.Role, {
      as: 'role'
    });
    this.hasOne(models.Customer, {
      as: 'customer',
      foreignKey: 'userId'
    });
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: USER_TABLE,
      modelName: 'User',
      timestamps: false
    };
  }
}

module.exports = { USER_TABLE, UserSchema, User };
