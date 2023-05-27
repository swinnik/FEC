DROP DATABASE IF EXISTS reviews;
CREATE DATABASE reviews;
\c reviews;

CREATE TABLE product (
  "id" SERIAL PRIMARY KEY NOT NULL,
  "name" VARCHAR(200) NOT NULL,
  "slogan" VARCHAR(200) NOT NULL,
  "description" TEXT NOT NULL,
  "category" VARCHAR(200) NOT NULL,
  "default_price" int NOT NULL

);


CREATE TABLE review (
  "id" SERIAL PRIMARY KEY,
  "product_id" INTEGER NOT NULL,
  "rating" INTEGER NOT NULL,
  "date" VARCHAR(200),
  "summary" VARCHAR(200) NOT NULL,
  "body" TEXT NOT NULL,
  "recommended" BOOLEAN NOT NULL,
  "reported" BOOLEAN NOT NULL,
  "reviewer_name" VARCHAR(200) NOT NULL,
  "reviewer_email" VARCHAR(200) NOT NULL,
  "response" VARCHAR(200) NOT NULL,
  "helpfulness" VARCHAR(200) NOT NULL
);


CREATE TABLE review_photos (
  "id" SERIAL PRIMARY KEY,
  "review_id" INTEGER REFERENCES "review" ("id") NOT NULL,
  "url" TEXT NOT NULL
);


CREATE TABLE characteristics (
  "id" SERIAL PRIMARY KEY,
  "product_id" INTEGER REFERENCES "product" ("id") NOT NULL,
  "name" VARCHAR(200) NOT NULL
);


CREATE TABLE characteristic_reviews (
  "id" SERIAL PRIMARY KEY,
  "characteristic_id" INTEGER REFERENCES "characteristics" ("id") NOT NULL,
  "review_id" INTEGER NOT NULL,
  "value" INTEGER NOT NULL
);
