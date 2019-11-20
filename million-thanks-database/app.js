// import {sendResults} from './front_connect'

var express = require('express'),
    pg = require('pg'),
    app = express();

var conString = "postgres://ian:ian@localhost:9001/CPC_DB";

const client = new pg.Client({
    connectionString: conString
});

client.connect();



app.get('/addcustomer', function(req, res){
  const {name, street, city, state, zip} = req.query
  client.query('SELECT MAX(customer_id) FROM Customers;', (err, res) => {
     if (err) throw err
      var nextId = parseInt(res.rows[0].max) + 1
      console.log(nextId)
      console.log("Adding:", nextId, name, street, city, state, zip);

      client.query('INSERT INTO Customers (customer_id, customer_name, customer_street_1, customer_street_2, customer_city, customer_state, customer_zip) '
                + 'VALUES (\'' + nextId + "\', \'" + name + "\', \'" + street + "\', \'" + "_" + "\', \'" + city + "\', \'"
                + state + "\', \'" + zip + '\');', (err, res) => {
      if (err) throw err
      })
   })
  
  
  //client.query('INSERT INTO customers (customer_id, customer_name, customer_street_1, customer_street_2, customer_city, customer_state, customer_zip) VALUES (1, \'Ian Bonafede\', \'11285 Florindo Rd.', '', 'San Diego', 'California', '92127');')

  
});

app.get('/removecustomer', function(req, res){
  const {name, street, city, state, zip} = req.query
  client.query('SELECT MAX(customer_id) FROM Customers;', (err, res) => {
     if (err) throw err
      var nextId = parseInt(res.rows[0].max) + 1
      console.log(nextId)
      console.log("Adding:", nextId, name, street, city, state, zip);

      client.query('INSERT INTO Customers (customer_id, customer_name, customer_street_1, customer_street_2, customer_city, customer_state, customer_zip) '
                + 'VALUES (\'' + nextId + "\', \'" + name + "\', \'" + street + "\', \'" + "_" + "\', \'" + city + "\', \'"
                + state + "\', \'" + zip + '\');', (err, res) => {
      if (err) throw err
      })
   })
  
  
  //client.query('INSERT INTO customers (customer_id, customer_name, customer_street_1, customer_street_2, customer_city, customer_state, customer_zip) VALUES (1, \'Ian Bonafede\', \'11285 Florindo Rd.', '', 'San Diego', 'California', '92127');')

  
});

app.get('/search', function(req, resp){
  const {text, filter} = req.query
  var column = 'column'
  var table = 'table'
  switch(filter) {
    case 'name': 
      column = 'customer_name'; 
      table = 'Customers';
      break;
    case 'street': 
      column = 'customer_street_1'; 
      table = 'Customers';
      break;
    case 'city': 
      column = 'customer_city'; 
      table = 'Customers';
      break;
    case 'state': 
      column = 'customer_state'; 
      table = 'Customers';
      break;
    case 'zip': 
      column = 'customer_zip'; 
      table = 'Customers';
      break;
    case 'date': 
      column = 'letter_date'; 
      table = 'Letters';
      break;
  }
  console.log("Searching for " + text + " in " + table + " under " + column);

  client.query('SELECT * FROM ' + table + ' WHERE position(\'' + text + '\' in ' + column + ') > 0;', (err, res) => {
    if (err) throw err
    console.log(res.rows);
    resp.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    resp.send(res.rows);
  });
  
});



app.listen(3200, function() {
    console.log('Database listener on Port 3200')
})
