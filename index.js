const express = require("express");
const swaggerUi = require("swagger-ui-express");
const app = express();
const bodyParser = require("body-parser");
const resources = require("./resources");
const swaggerDocument = require("./swagger.json");

app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(bodyParser.json());

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

resources({
  app,
});

app.listen(process.env.PORT || 8080);

// exported for testing
module.exports = app;
