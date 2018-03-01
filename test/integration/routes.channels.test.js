process.env.NODE_ENV = 'test';

const chai = require('chai');

const should = chai.should();
const chaiHttp = require('chai-http');

chai.use(chaiHttp);

const server = require('../../src/server/index');
const knex = require('../../src/server/db/connection');

describe('routes : channels', () => {
  beforeEach(() => knex.migrate.rollback()
    .then(() => knex.migrate.latest())
    .then(() => knex.seed.run()));

  afterEach(() => knex.migrate.rollback());

  describe('GET /api/v1/channels', () => {
    it('should return all channels', (done) => {
      chai.request(server)
        .get('/api/v1/channels')
        .end((err, res) => {
          should.not.exist(err);
          res.status.should.equal(200);
          res.type.should.equal('application/json');
          res.body.status.should.eql('success');
          res.body.data.length.should.eql(4);
          res.body.data[0].should.include.keys('id', 'name', 'locale', 'menu', 'is_default');
          done();
        });
    });
  });

  describe('GET /api/v1/channels/:id', () => {
    it('should respond with a single channel', (done) => {
      chai.request(server)
        .get('/api/v1/channels/1')
        .end((err, res) => {
          should.not.exist(err);
          res.status.should.equal(200);
          res.type.should.equal('application/json');
          res.body.status.should.eql('success');
          res.body.data[0].should.include.keys('id', 'name', 'locale', 'menu', 'is_default');
          done();
        });
    });
  });

  it('should throw an error if the channel does not exist', (done) => {
    chai.request(server)
      .get('/api/v1/channels/9999999')
      .end((err, res) => {
        should.exist(err);
        res.status.should.equal(404);
        res.type.should.equal('application/json');
        res.body.status.should.eql('error');
        res.body.message.should.eql('That channel does not exist.');
        done();
      });
  });
});
