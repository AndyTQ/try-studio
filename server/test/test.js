process.env.NODE_ENV = 'test';

var assert = require('assert');
var chai = require('chai');
var chaiHttp = require('chai-http');
var app = require('../src/index.js');

chai.use(chaiHttp);
chai.should();
var expect = chai.expect;

describe("Get Playlist", () => {
  it("should get playlist data", (done) => {
    chai.request(app)
      .get('/playlist?playlistId=2kXKxaoBSxIR7JbUaL3w8I')
      .end((err, res) => {
        res.should.have.status(200);
        expect(res).to.be.json;
        expect(res.body.name).to.equal("고르곤졸라");
        expect(res.body.owner).to.equal("Ryan Ro");
        done();
      });
  });
});