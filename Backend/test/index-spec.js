var assert = require('assert');
var expect = require('chai').expect;
var request = require('request');
var app = require('../index.js')

it('uid', function(done) {
	request('http://localhost:5000/:uid', function(error, response, body) {
		expect(body).to.equal("Error: UID Not Found!");
		done();
	});
});

it('home', function(done) {
	request('http://localhost:5000/', function(error, response, body) {
		expect(body).to.equal('[]');
		done();
	});
});