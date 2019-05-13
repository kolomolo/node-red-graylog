module.exports = function(RED) {
  function GraylogConfigNode(settings) {
    RED.nodes.createNode(this, settings);
    this.host = settings.host;
    this.port = settings.port;
    this.connection = settings.connection;
    this.maxChunk = settings.maxChunk;
    this.minChunk = settings.minChunk;
  }

  RED.nodes.registerType("graylog-config", GraylogConfigNode);
};
