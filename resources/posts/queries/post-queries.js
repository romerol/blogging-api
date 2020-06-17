class PostQueries {
  constructor({ logger, db }) {
    this.logger = logger;
    this.db = db;
  }

  getAll() {
    return this.db.Post.find();
  }
}

module.exports = PostQueries;
