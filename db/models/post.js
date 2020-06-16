class Post {
  static collection() {
    return "post";
  }

  static getSchema() {
    return {
      title: {
        type: String,
        required: true,
        unique: true,
      },
      content: {
        type: String,
        required: true,
      },
      author: {
        type: String,
        required: true,
      }
    };
  }

  static create({ mongoose }) {
    const { Schema } = mongoose;
    const postSchema = new Schema(Post.getSchema(), { timestamps: true });
    return mongoose.model(Post.collection(), postSchema);
  }
}

module.exports = Post;
