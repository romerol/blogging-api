const express = require("express");
const app = express();
const resources = require("./resources");

resources({
  app,
});

app.listen(process.env.PORT || 8080);

// exported for testing
module.exports = app;
