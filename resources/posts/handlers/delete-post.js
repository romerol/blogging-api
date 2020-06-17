const PostCommands = require("../commands/post-commands");

class DeletePostHandler {
  constructor({ logger, db }) {
    this.logger = logger;
    this.db = db;
  }

  async delete(req, res) {
    try {
      const command = new PostCommands({
        logger: this.logger,
        db: this.db
      });
      const result = await command.delete(req.params.postId);
      return res.status(200).send(result);
    } catch (e) {
      this.logger("delete-post.js::error", e);
      return res.sendStatus(500);
    }
  }
}

module.exports = DeletePostHandler;
