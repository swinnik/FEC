require('dotenv').config();
const { Pool } = require('pg');

const pool = new Pool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,

});

pool.connect()
  .then(() => {
    console.log('Connected to PostgreSQL database!!');
  })
  .catch((err) => {
    console.log('UNABLE TO CONNECT', err);
  });

module.exports = pool;

