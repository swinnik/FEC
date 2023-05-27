const pool = require('../db/db');

module.exports = {
  getAllReviews: async (req, res) => {
    try {
      let { page, count, sort, product_id } = req.query;
      console.log(req.query, 'QUERY PARAMS');
      switch (sort) {
        case 'newest':
          sort = 'date DESC';
          break;
        case 'helpful':
          sort = 'helpfulness DESC';
          break;
        case 'relevant':
          sort = 'helpfulness DESC';
          break;
        default:
          sort = 'date DESC';
      }

      product_id = product_id || 2;
      page = page || 1;
      count = count || 5;
      if (!product_id || !sort) {
        throw new Error(`Missing headers. Received product_id: ${product_id}, sort: ${sort}`);
      }

      await pool.connect();
      const data = await pool.query(
        `SELECT review.id AS review_id, array_agg(json_build_object('id', review_photos,  'url', review_photos.url))
        as photos, rating,  summary, recommended, response,  body,
        TO_TIMESTAMP(date/1000) as date, reviewer_name, helpfulness FROM review FULL OUTER JOIN
        review_photos ON review_photos.review_id = review.id WHERE review.product_id= $1 AND review.
        reported = false GROUP BY review.id ORDER BY ${sort} OFFSET ${(page - 1) * count} LIMIT ${count};`,
        [product_id]
      );
      return data
    } catch (err) {
      console.log(err);
      res.status(500).send('***ERROR RETRIEVING REVIEWS***');
    }
  },
  getMeta: async (req, res) => {
    try {
      let { product_id } = req.query;
      console.log(req.query, 'QUERY PARAMS');

      product_id = product_id || 2;
      if (!product_id) {
        throw new Error(`Missing headers. Received product_id: ${product_id}`);
      }

      await pool.connect();
      const data = await pool.query(
        `SELECT * FROM characteristic_reviews LIMIT 15;`
      );
      return data
    } catch (err) {
      console.log(err);
      res.status(500).send('***ERROR RETRIEVING REVIEWS***');
    }
  },
};



/* eslint-disable camelcase */
/* eslint-disable no-console */
// const pool = require('../db/db');

// module.exports = {

//   getAllReviews: (req,res) => {
//     try {
//       let { page, count, sort, product_id} = req.query;
//       console.log(req.query, 'QUERY PARAMS')
//       switch (sort) {
//         case 'newest':
//           sort = 'date DESC';
//           break;
//         case 'helpful':
//           sort = 'helpfulness DESC';
//           break;
//         case 'relevant':
//           sort = 'helpfulness DESC';
//           break;
//         default:
//           sort = 'date DESC';
//       }

//       product_id = product_id || 2;
//       page = page || 1;
//       count = count || 5;
//       if (!product_id || !sort) {
//         throw new Error(`Missing headers. Received product_id: ${product_id}, sort: ${sort}`)
//       }

//       pool.connect()
//         .then(() => {
//           pool.query(`SELECT review.id AS review_id, array_agg(json_build_object('id', review_photos,  'url', review_photos.url)) as photos, rating,  summary, recommended, response,  body,
//             TO_TIMESTAMP(date/1000) as date, reviewer_name, helpfulness FROM review FULL OUTER JOIN
//             review_photos ON review_photos.review_id = review.id WHERE review.product_id= $1 AND review.
//             reported = false GROUP BY review.id ORDER BY ${sort} OFFSET ${(page - 1) * count} LIMIT ${count};`, [product_id])
//             .then(data=> {
//               console.log(data, 'DATATATA ');
//               res.status(200).send({
//                 product: product_id,
//                 page: page,
//                 count: count,
//                 results: data.rows,
//               });
//             });
//         })
//         .catch((err) => {
//           console.log(err)
//           res.status(500).send('ERROR RETREIVING REVIEWS')
//         });
//     } catch (err) {
//       console.log(err)
//       res.status(500).send('***COUDL NOT RETRIEVE REVIEWS***');
//     }
//   },

// }


//   (req, res) => {
//     const {page, count, sort, product_id} = req
//     console.log(req, 'MODEL MODEL MODEL')
//     const offset = (page - 1) * count;
//     let sorter;
//     if (sort === 'newest') { sorter = 'date'; }
//     if (sort === 'helpful') { sorter = 'recommend'; }
//     if (sort === 'relevant') { sorter = 'recommend'; }
//     else {sorter = 'date'}

//     const query = {
//       text: `
//       SELECT *
//       FROM review
//       WHERE product_id = $1
//       ORDER BY ${sorter} DESC
//       LIMIT $2 OFFSET $3;
//       `,
//       values: [product_id, count, offset],
//     };
//     return pool.query(query)
//       .then((res) => res.rows)
//       .catch((err) => {
//         console.log('error querying database', err);
//         throw err;
//       });
//   },
// };