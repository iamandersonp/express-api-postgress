const { config } = require('./../config/config');

const USER = encodeURIComponent(config.db_user);
const PASSWORD = encodeURIComponent(config.db_password);

const URI = `postgres://${USER}:${PASSWORD}@${config.db_host}:${config.db_port}/${config.db_name}`;

module.exports = {
  development: {
    url: URI,
    dialect: 'postgres'
  },
  production: {
    url: URI,
    dialect: 'postgres'
  }
};
