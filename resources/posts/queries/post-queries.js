class PostQueries {
  constructor({ logger, db }) {
    this.logger = logger;
    this.db = db;
  }

  getAll() {
    return this.db.Post.find();
  }

  async search(text) {
    const query = { $text: { $search: text } };
    const result = await this.db.Post.find(query);
    return result;
  }
}

module.exports = PostQueries;
