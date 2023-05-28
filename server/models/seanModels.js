const pool = require('../db/db');

module.exports = {
  getAllReviews: async (req, res) => {
    try {
      let { page, count, sort, product_id } = req.query;
      // console.log(req.query, 'QUERY PARAMS');
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
      console.log(req.query, 'META QUERY PARAMS');
      product_id = product_id;
      if (!product_id) {
        throw new Error(`Missing headers. Received product_id: ${product_id}`);
      }
      const data_rating = await pool.query(
        `SELECT rating, COUNT(*) AS count FROM review
         WHERE product_id = ${product_id} GROUP BY rating;`
      )
      const data_recommend = await pool.query(
        `SELECT recommended, COUNT(*) AS count FROM review
         WHERE roduct_idp = ${product_id} GROUP BY recommended`
      )
      const data_characteritics =  await pool.query(
        `SELECT c.name, c.id, AVG(cr.value) AS average_value FROM characteristics c
        JOIN characteristic_reviews cr ON c.id = cr.characteristic_id
        WHERE c.product_id = ${product_id} GROUP BY c.name, c.id;`
      )
      const collatedData = {
        product_id: product_id.rows,
        ratings: data_rating.rows,
        recommended: data_recommend.rows,
        characteristics: data_characteritics.rows,
      }
      console.log("COLLATED COLLATED START", collatedData, "COLLATED  COLLATED  END")
      return collatedData;
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