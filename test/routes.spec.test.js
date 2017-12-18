const chai = require('chai');
const should = chai.should();
const chaiHttp = require('chai-http');
const server = require('../server');

const environment = process.env.NODE_ENV || 'test';
const configuration = require('../knexfile')[environment];
const database = require('knex')(configuration);

chai.use(chaiHttp);


describe('Client Routes', () => {
  it('should return homepage with text', () => {
    return chai.request(server)
      .get('/')
      .then(response => {
        response.should.have.status(200);
        response.should.be.html;
        response.res.text.includes('Palette Picker');
      })
      .catch(error => {
        throw error;
      });
  });

  it('should return a 404 if the route does not exsit', () => {
    chai.request(server)
      .get('/sad')
      .then(response => {
        response.should.have.status(404);
      });
  });
});

describe('API Routes', () => {
  before((done) => {
    database.migrate.latest()
      .then(() => done())
      .catch(error => {
        throw error;
      });
  });

  beforeEach((done) => {
    database.seed.run()
      .then(() => done())
      .catch(error => {
        throw error;
      });
  });

  describe('GET /api/v1/garage_items', () => {
    it("should return all garage items", (done) => {
      chai.request(server)
        .get('/api/v1/garage_items')
        .then(response => {
          response.should.have.status(200);
          response.should.be.json;
          response.body.should.be.a('array');
          response.body.length.should.equal(3);
          response.body[0].should.have.property('id');
          response.body[0].id.should.equal(1);
          response.body[0].should.have.property('itemName');
          response.body[0].should.have.property('lingerReason');
          response.body[0].should.have.property('cleanliness');
          response.body[0].should.have.property('created_at');
          response.body[0].should.have.property('updated_at');
          done();
        })
        .catch(error => {
          throw error;
        });
    });
  });

  describe('GET /api/v1/garage_items/:id', () => {
  it('should return a specific item', (done) => {
    chai.request(server)
      .get('/api/v1/garage_items/1')
      .then((response) => {
        response.should.have.status(200);
        response.should.be.json;
        response.body.should.be.a('array');
        response.body.length.should.equal(1);
        response.body[0].id.should.equal(1);
        response.body[0].itemName.should.equal('Rocking Horse');
        response.body[0].lingerReason.should.equal('It is sentimental');
        response.body[0].cleanliness.should.equal('Dusty');
        response.body[0].should.have.property('created_at');
        response.body[0].should.have.property('updated_at');
        done();
      })
      .catch((error) => {
        throw error;
      });
  });
});

describe('GET /api/v1/garage_items/:id', () => {
  it('should return 404 error for item that does not exist', (done) => {
    chai.request(server)
      .get('/api/v1/garage_items/100')
      .then((response) => {
        response.should.have.status(404);
        response.should.be.json;
        response.body.should.be.a('object');
        response.body.error.should.equal('Could not find item with id: 100');
        done();
      })
      .catch((error) => {
        throw error;
      });
  });
});

describe('POST /api/v1/garage_items', () => {
  it("should add new item to garage_items", (done) => {
    chai.request(server)
      .post('/api/v1/garage_items')
      .send({
        id: 10,
        itemName: 'Bike',
        lingerReason: 'No one will steal it',
        cleanliness: 'Dusty',
      })
      .then(response => {
        response.should.have.status(201);
        response.should.be.json;
        response.body.should.be.a('array');
        response.body.length.should.equal(1);
        response.body[0].should.have.property('id');
        response.body[0].id.should.equal(10);
        response.body[0].itemName.should.equal('Bike');
        response.body[0].lingerReason.should.equal('No one will steal it');
        response.body[0].cleanliness.should.equal('Dusty');
        response.body[0].should.have.property('created_at');
        response.body[0].should.have.property('updated_at');
        done();
      })
      .catch(error => {
        throw error;
      });
  });
});

describe('POST /api/v1/garage_items', () => {
  it("should serve an error if a property is missing", (done) => {
    chai.request(server)
      .post('/api/v1/garage_items')
      .send({
        id: 10,
        itemName: 'Bike',
        lingerReason: 'No one will steal it'
      })
      .then(response => {
        response.should.have.status(422);
        response.should.be.json;
        response.body.should.be.a('object');
        response.body.error.should.equal('you are missing the cleanliness property');
        done();
      })
      .catch(error => {
        throw error;
      });
  });
});

});
