const PostCommands = require("../commands/post-commands");

class CreatePostHandler {
  constructor({ logger, db }) {
    this.logger = logger;
    this.db = db;
  }

  async create(req, res) {
    try {
      const command = new PostCommands({
        logger: this.logger,
        db: this.db
      });
      const post = await command.create(req.body);
      return res.status(200).send(post);
    } catch (e) {
      this.logger("create-post.js::error", e);
      if (e.code === 11000) {
        return res.sendStatus(409);
      }
      return res.sendStatus(500);
    }
  }
}

module.exports = CreatePostHandler;
