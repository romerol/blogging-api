const mongoose = require("mongoose");

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

  async delete(postId) {
    const result = await this.db.Post.deleteOne({ _id: mongoose.Types.ObjectId(postId) });
    return result;
  }
}

module.exports = PostCommands;
