const express = require('express');
const bodyParser = require('body-parser');
const app = express();

const environment = process.env.NODE_ENV || 'development';
const configuration = require('./knexfile')[environment];
const database = require('knex')(configuration);

require('dotenv').config();

app.set('port', process.env.PORT || 3000);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/public'));

app.get('/api/v1/garage_items', (request, response) => {

});

app.get('/api/v1/garage_items/:id', (request, response) => {

});

app.post('/api/v1/garage_items', checkAuth, (request, response) => {

});

app.patch('/api/v1/garage_items/:id', checkAuth, (request, response) => {

});


app.listen(app.get('port'), () => {
  console.log(`App is running on ${app.get('port')}.`);
});

module.exports = app;
