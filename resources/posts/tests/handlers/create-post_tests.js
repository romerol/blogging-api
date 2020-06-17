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
      .end((err, response) => {
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

  it("should return 400 if status does not have one of the possible values", function (done) {
    const post = {
      title: "first post",
      content: faker.random.word(),
      author: faker.random.word(),
      status: "weird value"
    };
    request(app)
      .post("/posts")
      .send(post)
      .set("Accept", "application/json")
      .expect(400)
      .end((err, response) => {
        if (err) {
          done(err);
          return;
        }
        expect(response.body.message).to.be.eql(
          "Enum mismatch:\n"
          + "\t - At Post/status\n"
          + "\t - Should be one of: [\"draft\", \"private\", \"public\"]\n"
          + "\t - Is: \"weird value\"\n"
        );
        done();
      });
  });

  it("should return 400 if title is missing", function (done) {
    const post = {
      content: faker.random.word(),
      author: faker.random.word(),
      status: "draft"
    };
    request(app)
      .post("/posts")
      .send(post)
      .set("Accept", "application/json")
      .expect(400)
      .end((err, response) => {
        if (err) {
          done(err);
          return;
        }
        expect(response.body.message).to.be.eql("Missing required property:\n\t - At Post/title\n");
        done();
      });
  });

  it("should return 400 if content is missing", function (done) {
    const post = {
      title: faker.random.word(),
      author: faker.random.word(),
      status: "draft"
    };
    request(app)
      .post("/posts")
      .send(post)
      .set("Accept", "application/json")
      .expect(400)
      .end((err, response) => {
        if (err) {
          done(err);
          return;
        }
        expect(response.body.message).to.be.eql("Missing required property:\n\t - At Post/content\n");
        done();
      });
  });

  it("should return 400 if author is missing", function (done) {
    const post = {
      title: faker.random.word(),
      content: faker.random.word(),
      status: "draft"
    };
    request(app)
      .post("/posts")
      .send(post)
      .set("Accept", "application/json")
      .expect(400)
      .end((err, response) => {
        if (err) {
          done(err);
          return;
        }
        expect(response.body.message).to.be.eql("Missing required property:\n\t - At Post/author\n");
        done();
      });
  });

  it("should return 400 if content data type is wrong", function (done) {
    const post = {
      title: faker.random.word(),
      content: 1,
      author: faker.random.word(),
      status: "draft"
    };
    request(app)
      .post("/posts")
      .send(post)
      .set("Accept", "application/json")
      .expect(400)
      .end((err, response) => {
        if (err) {
          done(err);
          return;
        }
        expect(response.body.message).to.be.eql("Type mismatch:\n\t - At Post/content\n\t - Should be: \"string\"\n\t - Is: \"number\"\n");
        done();
      });
  });

  it("should return 409 as the blog post was already created with that same title", function (done) {
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
      .expect(409)
      .end((err, response) => {
        if (err) {
          done(err);
          return;
        }
        expect(response.body.message).to.be.eql("There is a post with the same title");
        done();
      });
  });
});
