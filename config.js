function getDbName() {
  return process.env.NODE_ENV === "test" ? "blog-db_test" : "blog-db";
}

module.exports = {
  dbName: getDbName()
};
