const request = require("supertest");
const { expect } = require("chai");
const faker = require("faker");
const { app, db } = require("../../../../index");

describe("POST /posts", function () {
  after(function (done) {
    db.Post.deleteMany({}, done);
  });

  it("should create a post successfully", function (done) {
    const post = {
      title: "first post",
      content: faker.random.word(),
      author: faker.random.word(),
      status: "draft"
    };
    request(app)
      .post("/posts")
      .send(post)
      .set("Accept", "application/json")
      .expect(200)
      .end(async (err, response) => {
        if (err) {
          done(err);
          return;
        }
        expect(response.body.title).to.be.eql(post.title);
        expect(response.body.content).to.be.eql(post.content);
        expect(response.body.author).to.be.eql(post.author);
        done();
      });
  });

  it("should return 409 as the blog post was already created with that same title", function () {
    const post = {
      title: "first post",
      content: faker.random.word(),
      author: faker.random.word(),
      status: "draft"
    };
    return request(app)
      .post("/posts")
      .send(post)
      .set("Accept", "application/json")
      .expect(409);
  });
});
