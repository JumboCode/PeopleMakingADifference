let exit = 0;
var assert = require('assert');
var expect = require('chai').expect;
var chai = require('chai');
var request = require('request');
var app = require('../index.js');
var bodyParser = require('body-parser');
chai.use(require('chai-json-schema'));
chai.use(require('chai-http'));

var schema = {
	title: 'volunteers',
	type: 'object',
	required: ['id', 'name', 'assignment', 'location'],
	properties: {
		_id: {
			type: 'string'
		},
		id: {
			type: 'number'
		},
		name: {
			type: 'string'
		},
		assignment: {
			type: 'string'
		},
		location: {
			type: 'string'
		}
	}
};

it('uid', function(done) {
	chai.request('http://localhost:5000')
		.get("/uid/1")
		.end(function(error, response) {
			var obj = JSON.parse(response.text);
			expect(obj[0]).to.be.jsonSchema(schema);
			exit += done();
		});
});

it('home', function(done) {
	request('http://localhost:5000/', function(error, response, body) {
		var obj = JSON.parse(body);
		for (var i = 0; i < obj.length; i++) {
			expect(obj[i]).to.be.jsonSchema(schema);
		}
		exit += done();
	});
});

it('location', function(done) {
	chai.request('http://localhost:5000')
		.post("/update_location")
		.send({ uid: 1, location: "campus center" })
		.end(function(error, response) {
			expect(response.text).to.equal("Successfully updated location");
			exit += done();	
		});
});

it('assignment', function(done) {
	chai.request('http://localhost:5000')
		.post("/update_assignment")
		.send({ uid: 1, assignment: "sleep" })
		.end(function(error, response) {
			expect(response.text).to.equal("Successfully updated assignment");
			exit += done();
		});
});

it('end', function(done) {
	process.exit(exit);
});

