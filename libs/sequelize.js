const { Sequelize } = require('sequelize');

const { config } = require('./../config/config');
const setupModels = require('./../db/models');

const USER = encodeURIComponent(config.db_user);
const PASSWORD = encodeURIComponent(config.db_password);

const URI = `postgres://${USER}:${PASSWORD}@${config.db_host}:${config.db_port}/${config.db_name}`;

const sequelize = new Sequelize(URI, {
  dialect: 'postgres',
  login: true
});

setupModels(sequelize);

sequelize.sync();

module.exports = sequelize;
