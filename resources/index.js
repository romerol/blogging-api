const getPosts = require("./posts/handlers/get-posts");
const CreatePostHandler = require("./posts/handlers/create-post");

module.exports = function _resources({ app, logger, db }) {
  app.get("/posts", (req, res) => {
    getPosts({ req, res });
  });
  app.post("/posts", (req, res) => {
    const createPostHandler = new CreatePostHandler({ logger, db });
    createPostHandler.create(req, res);
  });
};
