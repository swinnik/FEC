const axios = require('axios');
const models = require('../models');

const { ATELIER_API, API_TOKEN } = process.env;

module.exports = {
    // get: (req, res) => {
    //   axios.get(`${ATELIER_API}/reviews`, {
    //     params: {
    //       page: req.query.page,
    //       count: req.query.count,
    //       sort: req.query.sort,
    //       product_id: req.query.product_id,s
    //     },
    //     headers: {
    //       authorization: API_TOKEN,
    //     },
    //   })
    //     .then(({ data }) => res.json(data.results))
    //     .catch((err) => {
    //       console.log('ERROR GETTING REVIEWS', err);
    //       res.status(404).json(err);
    //     });
    // },

  get: (req, res) => {
    models.review.getAllReviews(req, res)
    .then((dbRes)=> {
        res.send(dbRes.rows);
      })
      .catch((err) => {
        console.log('error in CONTROLLER GETALL', err);
      })
  },
  // getMeta: (req, res) => {
  //   const productId = req.query.product_id;
  //   axios.get(`${ATELIER_API}/reviews/meta`, {
  //     params: {
  //       product_id: productId,
  //     },
  //     headers: {
  //       authorization: API_TOKEN,
  //     },
  //   })
  //     .then(({ data }) => {
  //       console.log('OLDSCHOOL  METADATA', data, 'OLDSCHOOL METADATA')
  //       res.json(data)
  //     })
  //     .catch((err) => {
  //         console.log('ERROR GETTING META DATA', err);
  //         res.status(404).json(err);
  //       });
  //   },

    //METADATA FROM ORIGINAL API
    // {
    //   product_id: '40346',
    //   ratings: { '1': '24', '2': '54', '3': '53', '4': '41', '5': '91' },
    //   recommended: { false: '70', true: '193' },
    //   characteristics: {
    //     Fit: { id: 135224, value: '2.8415841584158416' },
    //     Length: { id: 135225, value: '3.1176470588235294' },
    //     Comfort: { id: 135226, value: '3.0000000000000000' },
    //     Quality: { id: 135227, value: '3.3800000000000000' }
    //   }

  getMeta: (req, res) => {
    models.review.getMeta(req, res)
      .then((dbRes)=> {
        // console.log('start metadata res controller:', dbRes, 'METADATA res controller end')
        // console.log('CONTROLLER DATATA GET META start:', dbRes.rows, 'DATATA CONTROLLER GET META end');
        res.send(dbRes)
      })
      .catch((err) => {
        console.log('error in CONTROLLER GET META', err);
      })
  },

  post: (req, res) => {
    axios.post(`${ATELIER_API}/reviews`, req.body, {
      headers: {
        authorization: API_TOKEN,
      },
    })
      .then(() => res.sendStatus(201))
      .catch((err) => {
        console.log('ERROR POSTING REVIEW', err);
        res.sendStatus(400);
      });
  },
  putHelpful: (req, res) => {
    axios.put(`${ATELIER_API}/reviews/${req.params.review_id}/helpful`, {}, {
      headers: {
        authorization: API_TOKEN,
      },
    })
      .then(() => res.sendStatus(204))
      .catch((err) => {
        console.log('ERROR UPDATING HELPFUL', err);
        res.sendStatus(400);
      });
  },
  // putReport: (req, res) => {
  //   axios.put(`${ATELIER_API}/reviews/${req.params.review_id}/report`, {}, {
  //     headers: {
  //       authorization: API_TOKEN,
  //     },
  //   })
  //     .then(() => res.sendStatus(204))
  //     .catch((err) => {
  //       console.error('ERROR REPORTING REVIEW', err);
  //       res.sendStatus(400);
  //     });
  // },
  putReport: (req, res) => {
    console.log('PUTREPORT REQ START', req, 'PUT REPORT REQ END');
    models.review.putReport(req, res)
      .then((dbRes)=> {
        console.log('PUTREPORT START controller dbRES reported  ', dbRes, 'PUT REPORT dbRes controller end')
      })
      .catch((err) => {
        console.log('error in CONTROLLER GET META', err);
      });
  },
};
