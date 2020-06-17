const PostCommands = require("../commands/post-commands");

class CreatePostHandler {
  constructor({ logger, db, validator }) {
    this.logger = logger;
    this.db = db;
    this.validator = validator;
  }

  async create(req, res) {
    try {
      const payload = req.body;
      const result = await this.validator.validateModel(payload, "Post");

      if (result.errors.length > 0) {
        return res.status(400).send({
          message: result.humanReadable()
        });
      }

      const command = new PostCommands({
        logger: this.logger,
        db: this.db
      });
      const post = await command.create(payload);

      return res.status(200).send(post);
    } catch (e) {
      this.logger("create-post.js::error", e);
      if (e.code === 11000) {
        return res.status(409).send({ message: "There is a post with the same title" });
      }
      return res.status(500).send({ message: "please contact support" });
    }
  }
}

module.exports = CreatePostHandler;
