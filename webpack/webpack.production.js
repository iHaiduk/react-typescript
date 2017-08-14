const backend = require("./webpack.config.backend.prod");
const frontend = require("./webpack.config.prod");

module.exports = [backend, frontend];