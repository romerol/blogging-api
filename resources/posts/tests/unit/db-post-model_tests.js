const { expect } = require("chai");
const Post = require("../../../../db/models/post");

describe("DB model Post", function () {
  it("should return the right collection singular name", function () {
    expect(Post.collection()).to.be.eql("post");
  });

  it("should return the right schema", function () {
    const schema = Post.getSchema();
    expect(schema.title.type).to.be.eql(String);
    expect(schema.title.required).to.be.eql(true);
    expect(schema.title.unique).to.be.eql(true);
    expect(schema.content.type).to.be.eql(String);
    expect(schema.author.required).to.be.eql(true);
  });
});
