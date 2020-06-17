const mongoose = require("mongoose");
const PostCommands = require("../commands/post-commands");

class DeletePostHandler {
  constructor({ logger, db }) {
    this.logger = logger;
    this.db = db;
  }

  async delete(req, res) {
    try {
      const { postId } = req.params;

      if (!mongoose.Types.ObjectId.isValid(postId)) {
        return res.status(400).send({ message: "The postId is not valid" });
      }

      const command = new PostCommands({
        logger: this.logger,
        db: this.db
      });
      const result = await command.delete(postId);
      return res.status(200).send(result);
    } catch (e) {
      this.logger("delete-post.js::error", e);
      return res.status(500).send({ message: "Please contact support" });
    }
  }
}

module.exports = DeletePostHandler;
