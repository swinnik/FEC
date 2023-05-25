
CREATE TABLE product (
  "id" SERIAL PRIMARY KEY,
  "name" varchar(60) NOT NULL,
  "slogan" varchar(60) NOT NULL,
  "description" varchar(500) NOT NULL,
  "category" varchar(60) NOT NULL,
  "default_price" int NOT NULL
);


CREATE TABLE review (
  "id" SERIAL PRIMARY KEY,
  "product_id" INTEGER NOT NULL,
  "rating" INTEGER NOT NULL,
  "date" DATE NOT NULL,
  "summary" VARCHAR(60) NOT NULL,
  "body" VARCHAR(1000) NOT NULL,
  "recommended" BOOLEAN NOT NULL,
  "reported" BOOLEAN NOT NULL,
  "reviewer_name" VARCHAR(60) NOT NULL,
  "reviewer_email" VARCHAR(60) NOT NULL,
  "response" VARCHAR(60) NOT NULL,
  "helpfulness" INTEGER NOT NULL
);



CREATE TABLE review_photos (
  "id" SERIAL PRIMARY KEY,
  "review_id" INTEGER REFERENCES "review" ("id") NOT NULL,
  "url" VARCHAR(200) NOT NULL
);


CREATE TABLE characteristics (
  "id" SERIAL PRIMARY KEY,
  "product_id" INTEGER NOT NULL,
  "name" VARCHAR(60) NOT NULL
);


CREATE TABLE characteristics_reviews (
  "id" SERIAL PRIMARY KEY,
  "characteristic_id" INTEGER REFERENCES "characteristics" ("id") NOT NULL,
  "review_id" INTEGER NOT NULL,
  "value" INTEGER NOT NULL
);

