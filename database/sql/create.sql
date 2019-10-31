DROP TABLE IF EXISTS Customers CASCADE;--OK


-------------
---DOMAINS---
-------------
/*CREATE DOMAIN us_postal_code AS TEXT CHECK(VALUE ~ '^\d{5}$' OR VALUE ~ '^\d{5}-\d{4}$');*/

------------
---TABLES---
------------
CREATE TABLE Customers
(
	customer_id INTEGER NOT NULL,
	customer_fname CHAR(32) NOT NULL,
	customer_lname CHAR(32) NOT NULL,
	customer_city CHAR(32) NOT NULL,
	customer_state CHAR(32) NOT NULL,
	customer_zip INTEGER NOT NULL,
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
---------------
---RELATIONS---
---------------




----------------------------
-- INSERT DATA STATEMENTS --
----------------------------

/*
COPY Customer (
	id,
	fname,
	lname,
	phone,
	address
)
FROM 'customer.csv'
WITH DELIMITER ',';
*/