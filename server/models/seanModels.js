const pool = require('../db/db');

module.exports = {
  getAllReviews: async (req, res) => {
    let data = []
    try {
      let { page, count, sort, product_id } = req.query;
      console.log(req.query, 'QUERY PARAMS GET ALL REVIEWS END');
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

      product_id = product_id;
      page = page || 1;
      count = count || 5;
      if (!product_id || !sort) {
        throw new Error(`Missing headers. Received product_id: ${product_id}, sort: ${sort}`);
      }

      await pool.connect();
      data = await pool.query(
        `SELECT review.id AS review_id, array_agg(json_build_object('id', review_photos,  'url', review_photos.url))
        as photos, rating,  summary, recommended, reported, response,  body,
        TO_TIMESTAMP(date/1000) as date, reviewer_name, helpfulness
        FROM review
        INNER JOIN review_photos ON review_photos.review_id = review.id
        WHERE review.product_id= ${product_id} AND review.reported = false
        GROUP BY review.id ORDER BY ${sort} OFFSET ${(page - 1) * count} LIMIT ${count};`,
      );
      console.log('MODELGET REVIEWS start ', data.rows, ' MODEL GET REVIEWS end')
      return data;
    } catch (err) {
      console.log(err);
      res.status(500).send('***ERROR RETRIEVING REVIEWS***');
    }
  },
  getMeta: async (req, res) => {
    try {
      let { product_id } = req.query;
      product_id = product_id || 2;
      if (!product_id) {
        throw new Error(`Missing headers. Received product_id: ${product_id}`);
      }
      // console.log(req.query, 'META QUERY PARAMS');
      let data_rating = await pool.query(
        `SELECT rating, COUNT(*) AS count FROM review
        WHERE product_id = ${product_id} GROUP BY rating;`,
      );
      let dataRating = {}
      data_rating.rows.forEach(e=>{
        dataRating[e.rating.toString()] = e.count;
      });
      const data_recommend = await pool.query(
        `SELECT recommended, COUNT(*) AS count FROM review
         WHERE product_id = ${product_id} GROUP BY recommended`,
      );
      let dataRecommend = {}
      data_recommend.rows.forEach(e=>{
        dataRecommend[e.recommended] = e.count;
      })
      const data_characteristics =  await pool.query(
        `SELECT c.name, c.id, AVG(cr.value) AS average_value
        FROM characteristics c
        JOIN characteristic_reviews cr
        ON c.id = cr.characteristic_id
        WHERE c.product_id = ${product_id} GROUP BY c.name, c.id;`,
      );
      let dataCharacteristics = {};
      data_characteristics.rows.forEach(e=>{
        dataCharacteristics[e.name] = {id: e.id, value: e.average_value}
      })
      const collatedData = {
        product_id: product_id,
        ratings: dataRating,
        recommended: dataRecommend,
        characteristics: dataCharacteristics,
      };
      // console.log("COLLATED COLLATED START", collatedData, "COLLATED  COLLATED  END")
      return collatedData;
    } catch (err) {
      console.log(err);
      res.status(500).send('***ERROR RETRIEVING REVIEWS***');
    }
  },
  putReport: async (req, res) => {
    try {
      const {review_id} = req.params;
      // console.log(req, "PUT REPORT PUT REPORT PUT REPORT ")
      if (!review_id) {
        throw new Error(`Missing headers. Received review_id: ${review_id}`);
      }
      // console.log(review_id, 'META QUERY PARAMS');
      let update_report = await pool.query(
        `UPDATE review
        SET reported = true
        WHERE id = ${review_id}`,
      );
      let reported = await pool.query(
        `SELECT reported FROM review WHERE id  = ${review_id}`
      )
      res.status(201).send('Review Has Been Reported by User')
      return reported.rows
    } catch (err) {
      console.log(err);
      res.status(500).send('***ERROR RETRIEVING REVIEWS***');
    }
  },
  putHelpful: async (req, res) => {
    try {
      const {review_id} = req.params;
      if (!review_id) {
        throw new Error(`Missing headers. Received review_id: ${review_id}`);
      }
      console.log(review_id, 'HelpfulID QUERY PARAMS');
      let update_report = await pool.query(
        `UPDATE review
        SET helpfulness = helpfulness + 1
        WHERE id = ${review_id}`,
        );
        let helpfulness = await pool.query(
        `SELECT helpfulness FROM review WHERE id  = ${review_id}`
      )
      res.status(201).send('Review Has Been Reported by User')
      return helpfulness.rows
    } catch (err) {
      console.log(err);
      res.status(500).send('***ERROR RETRIEVING REVIEWS***');
    }
  },

};
