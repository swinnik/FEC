/* eslint-disable camelcase */
/* eslint-disable no-console */
const pool = require('../db/db');

module.exports = {

  getAllReviews: (req) => {
    const {page, count, sort, product_id} = req
    console.log(req, 'MODEL MODEL MODEL')
    const offset = (page - 1) * count;
    let sorter;
    if (sort === 'newest') { sorter = 'date'; }
    if (sort === 'helpful') { sorter = 'recommend'; }
    if (sort === 'relevant') { sorter = 'recommend'; }
    else {sorter = 'date'}

    const query = {
      text: `
      SELECT *
      FROM review
      WHERE product_id = $1
      ORDER BY ${sorter} DESC
      LIMIT $2 OFFSET $3;
      `,
      values: [product_id, count, offset],
    };
    return pool.query(query)
      .then((res) => res.rows)
      .catch((err) => {
        console.log('error querying database', err);
        throw err;
      });
  },
};
