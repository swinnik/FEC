const mongoose = require('mongoose');

const product = new mongoose.Schema({
  name: { type: String, required: true },
  slogan: { type: String, required: true },
  description: { type: String, required: true },
  category: { type: String, required: true },
  default_price: { type: String, required: true }
});

const review = new mongoose.Schema({
  product_id: { type: Number, required: true },
  rating: { type: Number, required: true },
  date: { type: Date, required: true },
  summary: { type: String, required: true },
  body: { type: String, required: true },
  recommended: { type: Boolean, required: true },
  reported: { type: Boolean, required: true },
  reviewer_name: { type: String, required: true },
  reviewer_email: { type: String, required: true },
  response: { type: String, required: true },
  helpfulness: { type: Number, required: true },
});

const review_photos = new mongoose.Schema({
  review_id: { type: Number, required: true },
  url: { type: String, required: true },
});

const characteristics  = new mongoose.Schema({
  product_id: { type: Number, required: true },
  name: { type: String, required: true },
});

const characteristics_reviews = new mongoose.Schema({
  characteristic_id: { type: Number, required: true },
  reviewer_id: { type: Number, required: true },
  value: { type: Number, required: true}

});
