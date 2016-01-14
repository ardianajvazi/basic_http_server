const chai = require('chai');
const server = require(__dirname + '/../server');
const chaiHttp = require('chai-http');
const fs = require('fs');//eslint-disable-line
chai.use(chaiHttp);
const expect = chai.expect;
const request = chai.request;

describe('with an index', () => {
  before((done) => {
    fs.readFile(__dirname + '/../public/index.html', (err, data) => {
      this.index = data.toString();
      done();
    });
  });

  it('should get an index', (done) => {
    request('localhost:3000')
    .get('/')
    .end((err, res) => {
      expect(err).to.eql(null);
      expect(res).to.have.status(200);
      expect(res.text).to.eql(this.index);
      done();
    });
  });
});

describe('simple http server', () => {
  it('should have a time route', (done) => {
    request('localhost:3000')
    .get('/time')
    .end((err, res) => {
      expect(err).to.eql(null);
      expect(res).to.have.status(200);
      expect(res.body.msg).to.eql('Today\'s date and time: ' + new Date().toString());
      done();
    });
  });

  it('should have a greet route', (done) => {
    request('localhost:3000')
    .get('/greet/Ardian')
    .end((err,res) => {
      expect(err).to.eql(null);
      expect(res).to.have.status(200);
      expect(res.text).to.eql('Hello Ardian');
      done();
    });
  });

  it('should 404 on a page that does not exist', (done) => {
    request('localhost:3000')
    .get('/doesnotexist')
    .end((err, res) => {
      expect(err).to.eql(null);
      expect(res).to.have.status(404);
      expect(res.body.msg).to.eql('page not found');
      done();
    });
  });
});
