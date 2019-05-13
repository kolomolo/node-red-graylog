const should = require("should/as-function");
const graylogConfigNode = require("../graylog-config/graylog-config.js");
const helper = require("node-red-node-test-helper");

helper.init(require.resolve("node-red"));

describe("openfaas-config node", function() {
  beforeEach(function(done) {
    helper.startServer(done);
  });

  afterEach(function(done) {
    helper.unload().then(function() {
      helper.stopServer(done);
    });
  });

  it("should load with configuration", function(done) {
    const flow = [
      { id: "n1", type: "graylog-config", name: "test-configuration" }
    ];
    helper.load(graylogConfigNode, flow, function() {
      const testNode = helper.getNode("n1");
      should(testNode).exist;
      done();
    });
  });
});
