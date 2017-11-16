var express = require('express');
var expect = require('chai').expect;
var request = require('request');
var httpUtils = require('../')(request);

describe('`httpUtils` requesting to a server', function () {
  before(function () {
    this.server = express().use(function (req, res) {
      res.send('hai');
    }).listen(1337);
  });
  after(function (done) {
    this.server.close(done);
  });
  httpUtils.save('http://localhost:1337/');

  it('records the response', function () {
    expect(this.res.statusCode).to.equal(200);
  });

  it('records the body', function () {
    expect(this.body).to.equal('hai');
  });
});

describe('`httpUtils` requested a downed server', function () {
  httpUtils.save('http://localhost:1338/');

  it('records the error', function () {
    expect(this.err.code).to.equal('ECONNREFUSED');
  });
});
