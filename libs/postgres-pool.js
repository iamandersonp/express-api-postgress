const { config } = require('../config/config');
const { Pool } = require('pg');

const USER = encodeURIComponent(config.db_user);
const PASSWORD = encodeURIComponent(config.db_password);

const URI = `postgress://${USER}:${PASSWORD}@${config.db_host}:${config.db_port}/${config.db_name}`;

const pool = new Pool({ connectionString: URI });

module.exports = pool;
