const GetPostsHandler = require("./posts/handlers/get-posts");
const CreatePostHandler = require("./posts/handlers/create-post");

module.exports = function _resources({ app, logger, db }) {
  app.get("/posts", (req, res) => {
    const getPostsHandler = new GetPostsHandler({ logger, db });
    getPostsHandler.getPosts(req, res);
  });
  app.post("/posts", (req, res) => {
    const createPostHandler = new CreatePostHandler({ logger, db });
    createPostHandler.create(req, res);
  });
};
