process.env.NODE_ENV = 'test';

const chai = require('chai');

const should = chai.should();
const chaiHttp = require('chai-http');

chai.use(chaiHttp);

const server = require('../../src/index');
const knex = require('../../src/db/connection');

describe('routes : programs', () => {
  beforeEach(() => knex.migrate.rollback()
    .then(() => knex.migrate.latest())
    .then(() => knex.seed.run()));

  afterEach(() => knex.migrate.rollback());

  describe('GET /api/v1/programs', () => {
    it('should return all programs', (done) => {
      chai.request(server)
        .get('/api/v1/programs')
        .end((err, res) => {
        // there should be no errors
          should.not.exist(err);
          // there should be a 200 status code
          res.status.should.equal(200);
          // the response should be JSON
          res.type.should.equal('application/json');
          // the JSON response body should have a
          // key-value pair of {"status": "success"}
          res.body.status.should.eql('success');
          // the JSON response body should have a
          // key-value pair of {"data": [3 program objects]}
          res.body.data.length.should.eql(4);
          // the first object in the data array should
          // have the right keys
          res.body.data[0].should.include.keys('id', 'name', 'featured', 'image_url', 'type', 'tags', 'local_image_url', 'description', 'tmdb_id');
          done();
        });
    });
  });

  describe('GET /api/v1/programs/:id', () => {
    it('should respond with a single program', (done) => {
      chai.request(server)
        .get('/api/v1/programs/1')
        .end((err, res) => {
        // there should be no errors
          should.not.exist(err);
          // there should be a 200 status code
          res.status.should.equal(200);
          // the response should be JSON
          res.type.should.equal('application/json');
          // the JSON response body should have a
          // key-value pair of {"status": "success"}
          res.body.status.should.eql('success');
          // the JSON response body should have a
          // key-value pair of {"data": 1 program object}
          res.body.data[0].should.include.keys('id', 'name', 'featured', 'image_url', 'type', 'tags', 'local_image_url', 'description', 'tmdb_id');
          done();
        });
    });
  });

  it('should throw an error if the program does not exist', (done) => {
    chai.request(server)
      .get('/api/v1/programs/9999999')
      .end((err, res) => {
      // there should an error
        should.exist(err);
        // there should be a 404 status code
        res.status.should.equal(404);
        // the response should be JSON
        res.type.should.equal('application/json');
        // the JSON response body should have a
        // key-value pair of {"status": "error"}
        res.body.status.should.eql('error');
        // the JSON response body should have a
        // key-value pair of {"message": "That program does not exist."}
        res.body.message.should.eql('Not found.');
        done();
      });
  });
});
