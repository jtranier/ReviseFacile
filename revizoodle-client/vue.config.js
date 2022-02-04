const path = require("path");


module.exports = {
  devServer: {
    port: 8081,
  },
  outputDir: path.resolve(__dirname, "../revizoodle-server/app/views"),
}