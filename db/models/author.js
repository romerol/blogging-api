const crypto = require("crypto");

class Author {
  static collection() {
    return "author";
  }

  static getSchema() {
    return {
      email: {
        type: String,
        required: true,
        unique: true,
      },
      name: {
        type: String,
        required: true,
      },
      salt: {
        type: String,
        required: true,
      },
      hash: {
        type: String,
        required: true
      },
      __v: {
        type: Number,
        select: false
      }
    };
  }

  static create({ mongoose }) {
    const { Schema } = mongoose;
    const authorSchema = new Schema(Author.getSchema(), { timestamps: true });

    authorSchema.methods.setPassword = function _setPassword_(password) {
      this.salt = crypto.randomBytes(16).toString("hex");
      this.hash = crypto.pbkdf2Sync(password, this.salt, 10000, 512, "sha512").toString("hex");
    };

    return mongoose.model(Author.collection(), authorSchema);
  }
}

module.exports = Author;
