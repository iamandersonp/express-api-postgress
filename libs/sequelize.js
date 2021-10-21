const { Sequelize } = require('sequelize');

const { config } = require('./../config/config');
const setupModels = require('./../db/models');

const USER = encodeURIComponent(config.db_user);
const PASSWORD = encodeURIComponent(config.db_password);

let URI = '';
if (config.env == 'development') {
  URI = `${config.dialect}://${USER}:${PASSWORD}@${config.db_host}:${config.db_port}/${config.db_name}`;
} else {
  URI = config.URI;
}

const sequelize = new Sequelize(URI, {
  dialect: config.dialect,
  login: true
});

setupModels(sequelize);

//sequelize.sync();

module.exports = sequelize;
