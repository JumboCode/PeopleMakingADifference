# request-mocha [![Build status](https://travis-ci.org/uber/request-mocha.png?branch=master)](https://travis-ci.org/uber/request-mocha)

[Request][request] utilities for [Mocha][mocha].

[request]: https://github.com/mikeal/request
[mocha]: https://github.com/visionmedia/mocha

This was built as a repetitive test utility to request results and assert later on.

## Getting Started
Install the module with: `npm install request-mocha`

```javascript
// In your test suite
var request = require('request');
var httpUtils = require('request-mocha')(request);
describe('A server receiving a request', function () {
  before(startServer);

  // Make request and save results to `this.err`, `this.res`, and `this.body`
  httpUtils.save('http://localhost:8080/');

  // Assert against mocha's `this` context
  it('responded with "Hello World!"', function () {
    expect(this.err).to.equal(null);
    expect(this.res.statusCode).to.equal(200);
    expect(this.body).to.equal('Hello World!');
  });
});
```

## Documentation
`request-mocha` provides a function, `requestMocha`, as its `module.exports`.

### `requestMocha(request)`
Create a set of utilities bound to a specific version of `request`.

> This interface is necessary to prevent cross-version conflicts (e.g. `jar` problems)

- request `Request` - `request` library to use for utility functions

`requestMocha` returns an object which we will refer to as `httpUtils`.

#### `httpUtils.save(options)`
Make a request to a server via [request][] inside of a [mocha][] `before/setup` block.

- options `Object` - Parameters to pass through to [request's][request] `request` function

Results will be saved to mocha's `this` context. The same `this` context is shared between all mocha `before`, `beforeEach`, `after`, `afterEach`, and `it` invocations.

- this.err `Error|null` - Error if one occurred while making the request (e.g. `ECONNREFUSED`)
- this.res `Response` - Response from the server
- this.body `String` - Response body from the server (alias for `res.body`)

#### `httpUtils._save(options)`
Invoke `request/save` mechanism without `before/setup` wrapper.

The parameters are the same as `httpUtils.save`.

The returned value is a `function` with a signature of `(done)`. When invoked, it will write to `this.err`, `this.res`, and `this.body` as done in `httpUtils.save`.

It is expected that you invoke the returned function via a `.call` or `.apply` to an asynchronous `before` context with its callback. This is practical when there is data locked into a `this` context that needs to be used for a `request`.

```js
// Prepare some `this` data
before(function () {
  this.credentials = {
    username: 'todd',
    password: 'keyboardcat'
  };
});

// In an asynchronous `before` block
before(function (done) {
  // Prepare the save call
  httpUtils._save({
    method: 'POST',
    url: 'http://localhost:8080/login',
    form: this.credentials
  // Invoke on the current context with the current callback
  }).call(this, done);
});
```

> The alternative is to use `var's` outside of `before` blocks. Unfortunately, those cannot be re-used while a `before` function can be.

## Examples
### Making a `POST` request inside of tests
```js
httpUtils.save({
  method: 'POST',
  url: 'http://localhost:8080/',
  form: {
    my: 'data'
  }
});
```

## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint via [grunt](https://github.com/gruntjs/grunt) and test via `npm test`.

## License
Copyright (c) 2014 Uber

Licensed under the MIT license.
