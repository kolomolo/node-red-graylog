const Gelf = require("gelf");

module.exports = function(RED) {
  function GraylogNode(config) {
    RED.nodes.createNode(this, config);

    this.server = RED.nodes.getNode(config.server);
    if (!this.server) {
      throw "You need to select server first";
    }
    const gelf = new Gelf({
      graylogPort: this.server.port,
      graylogHostname: this.server.host,
      connection: this.server.connection,
      maxChunkSizeWan: this.server.maxChunkSizeWan,
      maxChunkSizeLan: this.server.maxChunkSizeLan
    });

    /* istanbul ignore next */
    gelf.on("error", error => {
      this.warn("Graylog error: " + error);
    });

    this.on("input", async msg => {
      gelf.emit("gelf.log", msg.payload);
    });
  }

  RED.nodes.registerType("graylog-output", GraylogNode);
};
