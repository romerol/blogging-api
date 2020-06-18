function getDbName() {
  return process.env.NODE_ENV === "test" ? "blog-db_test" : "blog-db";
}

function getPort() {
  return process.env.NODE_ENV === "test" ? "8081" : "8080";
}

module.exports = {
  dbName: getDbName(),
  port: getPort()
};
