const { config } = require('./../config/config');

const USER = encodeURIComponent(config.db_user);
const PASSWORD = encodeURIComponent(config.db_password);
let URI = '';
if (config.env == 'development') {
  URI = `${config.dialect}://${USER}:${PASSWORD}@${config.db_host}:${config.db_port}/${config.db_name}`;
} else {
  URI = config.URI;
}

module.exports = {
  development: {
    url: URI,
    dialect: config.dialect
  },
  production: {
    url: URI,
    dialect: config.dialect
  }
};
