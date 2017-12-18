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
  database('garage_items').select()
  .then(garageItems => response.status(200).json(garageItems))
  .catch(error => response.status(500).json({error: `internal server error ${error}`}))
});

app.get('/api/v1/garage_items/:id', (request, response) => {
  const id = request.params.id;

  database('garage_items').where('id', id).select()
    .then(item => {
      item.length ? response.status(200).json(item)
      :
      respnse.status(404).json({
        error: `Could not find owner with id: ${id}`
        });
    })
    .catch(error => response.status(500).json({error: `internal server error ${error}`}));
});

app.post('/api/v1/garage_items', (request, response) => {
  const newItem = request.body;

  for(let requiredParameter of ['itemName', 'lingerReason', 'cleanliness']) {
    if(!newItem[requiredParameter]) {
      return response.status(422).json({
        error: `you are missing the ${requiredParameter} property`
      });
    }
  }

  database('garage_items').insert(newItem, '*')
    .then(insertedItem => response.status(201).json(insertedItem))
    .catch(error => response.status(500).json({error: `Internal server error ${error}`}))
});

app.patch('/api/v1/garage_items/:id', (request, response) => {

});


app.listen(app.get('port'), () => {
  console.log(`App is running on ${app.get('port')}.`);
});

module.exports = app;
