class PostCommands {
  constructor({ logger, db }) {
    this.logger = logger;
    this.db = db;
  }

  async create(data) {
    const post = new this.db.Post(data);
    const savedPost = await post.save();
    return savedPost;
  }
}

module.exports = PostCommands;
