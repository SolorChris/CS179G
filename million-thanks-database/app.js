
var express = require('express'),
    pg = require('pg'),
    app = express();

var conString = "postgres://ian:ian@localhost:9001/CPC_DB";

const client = new pg.Client({
    connectionString: conString
});

client.connect();



app.get('/addcustomer', function(req, res){
  const {name, street1, street2, city, state, zip} = req.query
  var nextID
  client.query('SELECT MAX(customer_id) FROM customers;', (err, res) => {
    if (err) throw err
    nextID = res
    console.log(nextID)
  });
  console.log("Adding:", nextID, name, street1, street2, city, state, zip);
  

  client.query('INSERT INTO customers (customer_id, customer_name, customer_city, customer_state, customer_zip) '
                + 'VALUES (' + nextID + ", " + name + ", " + street1 + ", " + street2 + ", " + city + ", "
                + state + ", " + zip + ';', (err, res) => {
    if (err) throw err
    console.log(res)
  });
});

app.get('/name', function(req, res){
  const {text} = req.query
  console.log("Searching by name");

  client.query('SELECT * FROM customers WHERE customer_name LIKE ' + text + ';', (err, res) => {
    if (err) throw err
    console.log(res)
  });
});


app.listen(3200, function() {
    console.log('Database listener on Port 3200')
})
