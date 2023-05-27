require('dotenv').config();
const { Pool } = require('pg');

const pool = new Pool({
  host: 'localhost',
  port: process.env.DB_PORT,
  user: 'seanwinnik',
  password: '',
  database: 'reviews',

});

pool.connect()
  .then(() => {
    console.log('Connected to PostgreSQL database!!');
  })
  .catch((err) => {
    console.log('UNABLE TO CONNECT', err);
  });

module.exports = pool;

