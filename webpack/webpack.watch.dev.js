const backend = require("./webpack.config.backend.dev");
const frontend = require("./webpack.config.dev");

module.exports = [backend, frontend];