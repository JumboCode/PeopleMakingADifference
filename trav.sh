#!/bin/bash
export TRAVIS_MODE="True"
cd Backend
npm install mocha
node app.js
npm test