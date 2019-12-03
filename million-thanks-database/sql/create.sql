DROP TABLE IF EXISTS Customers CASCADE;--OK
DROP TABLE IF EXISTS Letters CASCADE;--OK


------------
---TABLES---
------------
CREATE TABLE Customers
(
	customer_id SERIAL NOT NULL,
	customer_name CHAR(32) NOT NULL,
	customer_street_1 CHAR(32) NOT NULL,
	customer_street_2 CHAR(32),
	customer_city CHAR(32) NOT NULL,
	customer_state CHAR(32) NOT NULL,
	customer_zip CHAR(32) NOT NULL,
	customer_latitude CHAR(32) NOT NULL,
	customer_longitude CHAR(32) NOT NULL,
	PRIMARY KEY (customer_id)
);

CREATE TABLE Letters
(
	letter_id INTEGER NOT NULL,
	customer_id INTEGER NOT NULL,
	letter_image_path CHAR(32) NOT NULL,
	letter_date date NOT NULL,
	PRIMARY KEY (letter_id),
	FOREIGN KEY (customer_id) REFERENCES Customers(customer_id)
);


----------------------------
-- INSERT DATA STATEMENTS --
----------------------------

COPY Customers (
	customer_id,
	customer_name,
	customer_street_1,
	customer_street_2,
	customer_city,
	customer_state,
	customer_zip
)
FROM 'Customers.csv'
WITH DELIMITER ',';


COPY Letters (
	letter_id,
	customer_id,
	letter_image_path,
	letter_date
)
FROM 'Letters.csv'
WITH DELIMITER ',';

------------
----USER----
------------
CREATE USER db_admin WITH PASSWORD 'db_admin';
GRANT CONNECT ON DATABASE "CPC_DB" TO db_admin;
GRANT USAGE ON SCHEMA public TO db_admin;
GRANT SELECT, INSERT, UPDATE, DELETE ON ALL TABLES IN SCHEMA public TO db_admin;
GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO db_admin;
GRANT USAGE, SELECT ON SEQUENCE customers_customer_id_seq to db_admin;