#! /bin/bash

#port = 9001
#database = CPC_DB

./startPostgreSQL.sh
./createPostgreDB.sh


# to stop type:
#./stopPostgreDB.sh



# access the db
psql -h localhost -p 9001 "CPC_DB"

#examples: 

#INSERT INTO customers (customer_id, customer_name, customer_street_1, customer_street_2, customer_city, customer_state, customer_zip) VALUES (1, 'Ian Bonafede', '11285 Florindo Rd.', '', 'San Diego', 'California', '92127');

#INSERT INTO letters (letter_id, customer_id, letter_image_path, letter_date) VALUES (1, 1, , 'California', '92127');


