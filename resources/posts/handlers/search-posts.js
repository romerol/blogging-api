const PostQueries = require("../queries/post-queries");

class SearchPostsHandler {
  constructor({ logger, db }) {
    this.logger = logger;
    this.db = db;
  }

  async search(req, res) {
    try {
      const queries = new PostQueries({
        logger: this.logger,
        db: this.db
      });
      const blogPosts = await queries.search(req.query.text);
      res.status(200).send(blogPosts);
    } catch (e) {
      this.logger("::search-posts.js::error: ", e);
      res.status(500).send({ message: "Please contact support" });
    }
  }
}

module.exports = SearchPostsHandler;
