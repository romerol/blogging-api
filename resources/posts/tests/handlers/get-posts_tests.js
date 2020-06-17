const request = require("supertest");
const faker = require("faker");
const { expect } = require("chai");
const { app, db } = require("../../../../index");

describe("GET /posts", function () {
  before(async function () {
    const postFixture1 = new db.Post({
      title: faker.random.word(),
      content: faker.random.word(),
      author: faker.random.word(),
      status: "draft"
    });
    const postFixture2 = new db.Post({
      title: faker.random.word(),
      content: faker.random.word(),
      author: faker.random.word(),
      status: "draft"
    });
    await postFixture1.save();
    await postFixture2.save();
  });

  after(function (done) {
    db.Post.deleteMany({}, done);
  });

  it("should return a successful response with 2 blog posts", function (done) {
    request(app)
      .get("/posts")
      .set("Accept", "application/json")
      .expect(200)
      .end((err, response) => {
        if (err) {
          done(err);
          return;
        }
        expect(response.body.length).to.be.eql(2);
        done();
      });
  });
});
