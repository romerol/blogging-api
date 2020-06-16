const getPosts = require("./posts/handlers/get-posts");

module.exports = function _resources({ app }) {
  app.get("/posts", getPosts);
};
