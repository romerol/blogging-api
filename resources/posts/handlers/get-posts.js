const PostQueries = require("../queries/post-queries");

class CreatePostHandler {
  constructor({ logger, db }) {
    this.logger = logger;
    this.db = db;
  }

  async getPosts(req, res) {
    try {
      const queries = new PostQueries({
        logger: this.logger,
        db: this.db
      });
      const blogPosts = await queries.getAll();
      res.status(200).send(blogPosts);
    } catch (e) {
      this.logger("::get-posts.js::error: ", e);
      res.status(500).send({ message: "Please contact support" });
    }
  }
}

module.exports = CreatePostHandler;
