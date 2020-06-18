const AuthorCommands = require("../commands/author-commands");

class CreateAuthorHandler {
  constructor({ logger, db, validator }) {
    this.logger = logger;
    this.db = db;
    this.validator = validator;
  }

  async create(req, res) {
    try {
      const payload = req.body;
      const result = await this.validator.validateModel(payload, "Author");

      if (result.errors.length > 0) {
        return res.status(400).send({
          message: result.humanReadable()
        });
      }

      const command = new AuthorCommands({
        db: this.db
      });
      const author = await command.create(payload);

      return res.status(200).send(author);
    } catch (e) {
      this.logger("create-author.js::error", e);
      if (e.code === 11000) {
        return res.status(409).send({ message: "Email should be unique" });
      }
      return res.status(500).send({ message: "Please contact support" });
    }
  }
}

module.exports = CreateAuthorHandler;
