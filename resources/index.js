const swaggerValidator = require("swagger-object-validator");
const swaggerDoc = require("../swagger.json");
const validator = new swaggerValidator.Handler(swaggerDoc);
const GetPostsHandler = require("./posts/handlers/get-posts");
const CreatePostHandler = require("./posts/handlers/create-post");
const DeletePostHandler = require("./posts/handlers/delete-post");

module.exports = function _resources({ app, logger, db }) {
  app.get("/posts", (req, res) => {
    const getPostsHandler = new GetPostsHandler({ logger, db });
    getPostsHandler.getPosts(req, res);
  });
  app.post("/posts", (req, res) => {
    const createPostHandler = new CreatePostHandler({ logger, db, validator });
    createPostHandler.create(req, res);
  });
  app.delete("/posts/:postId", (req, res) => {
    const deletePostHandler = new DeletePostHandler({ logger, db });
    deletePostHandler.delete(req, res);
  });
};
