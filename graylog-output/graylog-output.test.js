const should = require("should/as-function");
const graylogNode = require("./graylog-output.js");
const graylogConfigNode = require("../graylog-config/graylog-config.js");
const helper = require("node-red-node-test-helper");
const mockudp = require("mock-udp");

helper.init(require.resolve("node-red"));

describe("graylog-output node", function() {
  beforeEach(function(done) {
    helper.startServer(done);
  });

  afterEach(function(done) {
    helper.unload().then(function() {
      helper.stopServer(done);
    });
  });

  describe("basic functionality", function() {
    it("shouldn't mount with config", function() {
      const flow = [{ id: "n1", type: "graylog-output" }];
      helper.load(graylogNode, flow, function() {
        const testNode = helper.getNode("n2");
        should(testNode).not.exist;
      });
    });

    it("should mount with config", function() {
      const flow = [
        { id: "n1", type: "graylog-config", host: "localhost", port: 12201 },
        { id: "n2", type: "graylog-output", server: "n1" }
      ];
      helper.load([graylogNode, graylogConfigNode], flow, function() {
        const testNode = helper.getNode("n2");
        should(testNode).exist;
      });
    });

    it("should send data to Graylog server", function(done) {
      const scope = mockudp("localhost:12201");
      const flow = [
        { id: "n1", type: "graylog-config", host: "localhost", port: 12201 },
        { id: "n2", type: "graylog-output", server: "n1" }
      ];
      helper.load([graylogNode, graylogConfigNode], flow, function() {
        const testNode = helper.getNode("n2");
        testNode.receive({ payload: "test" });
        setTimeout(() => {
          scope.done();
          done();
        }, 500);
      });
    });
  });
});
