const { expect } = require("chai");
const Author = require("../../../../db/models/author");

describe("DB model Author", function () {
  it("should return the right collection singular name", function () {
    expect(Author.collection()).to.be.eql("author");
  });

  it("should return the right schema", function () {
    const schema = Author.getSchema();
    expect(schema.email.type).to.be.eql(String);
    expect(schema.email.required).to.be.eql(true);
    expect(schema.email.unique).to.be.eql(true);
    expect(schema.name.type).to.be.eql(String);
    expect(schema.name.required).to.be.eql(true);
    expect(schema.salt.type).to.be.eql(String);
    expect(schema.salt.required).to.be.eql(true);
    expect(schema.hash.type).to.be.eql(String);
    expect(schema.hash.required).to.be.eql(true);
    expect(schema.__v.type).to.be.eql(Number);
    expect(schema.__v.select).to.be.eql(false);
  });
});
