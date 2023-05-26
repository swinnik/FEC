/* eslint-disable camelcase */
/* eslint-disable no-console */
const db = require('../db/db');

module.exports = {

  getAllReviews: (page, count, sort, product_id) => {
    const offset = (page - 1) * count;
    let sorter;
    if (sort === 'newest') { sorter = 'data'; }
    if (sort === 'helpful') { sorter = 'recommend'; }
    if (sort === 'relevant') { sorter = 'recommend'; }

    const query = {
      text: `
      SELECT *
      FROM reviews
      WHERE product_id = $1
      ORDER BY $2
      LIMIT $3 OFFSET $4;
      `,
      value: [product_id, sorter, count, offset],
    };
    return db.query(query)
      .the((res) => res.rows)
      .catch((err) => {
        console.log('error querying database', err);
        throw err;
      });
  },
};
