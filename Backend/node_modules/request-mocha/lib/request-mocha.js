// Define a function to construct a new set of request items
module.exports = function (request) {
  // Create an object to export on
  var httpUtils = {};

  // Helper for mocha to save request information
  httpUtils._save = function (options) {
    // Request to the URL and save results to `this` context
    return function _saveFn (done) {
      var that = this;
      request(options, function (err, res, body) {
        that.err = err;
        that.res = res;
        that.body = body;
        done();
      });
    };
  };
  httpUtils.save = function (options) {
    before(httpUtils._save(options));
  };

  // Return our httpUtils
  return httpUtils;
};
