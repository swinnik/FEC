
-- Frank
-- \copy your_table_name FROM 'csv_files/your_file.csv' DELIMITER ',' CSV HEADER;

-- pgadmin
  -- DROP DATABASE IF EXISTS reviews;
  -- CREATE DATABASE reviews

\copy product (id, name, slogan, description, category, default_price) FROM '/Users/seanwinnik/Desktop/hack_reactor/SDC/OldData/SDC Application Data - Atelier Project (_Clean_ Data Set)/product.csv' DELIMITER ',' CSV HEADER QUOTE '"' ESCAPE '''';

\copy review (id, product_id, rating, date, summary, body, recommended, reported, reviewer_name, reviewer_email, response, helpfulness) FROM '/Users/seanwinnik/Desktop/hack_reactor/SDC/OldData/SDC Application Data - Atelier Project (_Clean_ Data Set)/reviews.csv' DELIMITER ',' CSV HEADER QUOTE '"' ESCAPE '''';

\copy review_photos (id, review_id, url) FROM '/Users/seanwinnik/Desktop/hack_reactor/SDC/OldData/SDC Application Data - Atelier Project (_Clean_ Data Set)/reviews_photos.csv' DELIMITER ',' CSV HEADER QUOTE '"' ESCAPE '''';

\copy characteristics (id, product_id, name) FROM '/Users/seanwinnik/Desktop/hack_reactor/SDC/OldData/SDC Application Data - Atelier Project (_Clean_ Data Set)/characteristics.csv' DELIMITER ',' CSV HEADER QUOTE '"' ESCAPE '''';

\copy characteristics_reviews (id, characteristic_id, review_id, value) FROM '/Users/seanwinnik/Desktop/hack_reactor/SDC/OldData/SDC Application Data - Atelier Project (_Clean_ Data Set)/characteristic_reviews.csv' DELIMITER ',' CSV HEADER QUOTE '"'