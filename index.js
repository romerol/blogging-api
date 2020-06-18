const express = require("express");
const swaggerUi = require("swagger-ui-express");
const app = express();
const bodyParser = require("body-parser");
const resources = require("./resources");
const swaggerDocument = require("./swagger.json");
const db = require("./db/models");
const config = require("./config");

app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(bodyParser.json());

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

resources({
  app,
  db,
  logger: console.log
});

app.listen(process.env.PORT || config.port);

// exported for testing
module.exports = {
  app,
  db
};
