process.env.NODE_ENV = 'test';

var assert = require('assert');
var chai = require('chai');
var chaiHttp = require('chai-http');
var app = require('../src/index.js');

chai.use(chaiHttp);
chai.should();
var expect = chai.expect;

describe("Hello World", () => {
  it("should return Hello World!", (done) => {
    chai.request(app)
      .get('/')
      .end((err, res) => {
        res.should.have.status(200);
        expect(res).to.be.json;
        expect(res.body.text).to.equal("Hello World!");
        done();
      });
  });
});