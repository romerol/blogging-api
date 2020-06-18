class AuthorCommands {
  constructor({ db }) {
    this.db = db;
  }

  static getSanitizedAuthor(author) {
    return {
      _id: author._id,
      name: author.name,
      email: author.email
    };
  }

  async create(data) {
    const author = new this.db.Author(data);

    author.setPassword(data.password);

    const savedAuthor = await author.save();

    return AuthorCommands.getSanitizedAuthor(savedAuthor);
  }
}

module.exports = AuthorCommands;
