const fs = require("fs");
const path = require("path");
const basename = path.basename(__filename);
const db = {};
const mongoose = require("mongoose");
const config = require("../../config");
mongoose.connect(`mongodb://localhost:27017/${config.dbName}`, { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.set("useCreateIndex", true);

fs
  .readdirSync(__dirname)
  .filter((file) => {
    return (file.indexOf(".") !== 0) && (file !== basename) && (file.slice(-3) === ".js");
  })
  .forEach((file) => {
    const Model = require(path.join(__dirname, file));
    const model = Model.create({ mongoose });
    const modelName = Model.collection();
    const capitalizedModelName = modelName.charAt(0).toUpperCase() + modelName.slice(1);
    db[capitalizedModelName] = model;
  });

module.exports = db;
