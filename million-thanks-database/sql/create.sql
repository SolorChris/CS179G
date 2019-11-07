DROP TABLE IF EXISTS Customers CASCADE;--OK
DROP TABLE IF EXISTS Letters CASCADE;--OK


------------
---TABLES---
------------
CREATE TABLE Customers
(
	customer_id INTEGER NOT NULL,
	customer_name CHAR(32) NOT NULL,
	customer_street_1 CHAR(32) NOT NULL,
	customer_street_2 CHAR(32),
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