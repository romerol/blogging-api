const request = require("supertest");
const faker = require("faker");
const { expect } = require("chai");
const { app, db } = require("../../../../index");

describe("GET /posts/search", function () {
  before(async function () {
    const postFixture1 = new db.Post({
      title: "post about bananas",
      content: "The content about bananas",
      author: faker.random.word(),
      status: "draft"
    });
    const postFixture2 = new db.Post({
      title: "post about bananas and apples",
      content: "The content about bananas and apples",
      author: faker.random.word(),
      status: "draft"
    });
    const postFixture3 = new db.Post({
      title: "post about oranges",
      content: "The content about oranges",
      author: faker.random.word(),
      status: "draft"
    });
    await postFixture1.save();
    await postFixture2.save();
    await postFixture3.save();
  });

  after(function (done) {
    db.Post.deleteMany({}, done);
  });

  it("should return a successful response with 1 blog post if the search is oranges", function (done) {
    request(app)
      .get("/posts/search?text=oranges")
      .set("Accept", "application/json")
      .expect(200)
      .end((err, response) => {
        if (err) {
          done(err);
          return;
        }
        expect(response.body.length).to.be.eql(1);
        done();
      });
  });

  it("should return a successful response with 2 blog posts if the search is bananas", function (done) {
    request(app)
      .get("/posts/search?text=bananas")
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

  it("should return a successful response with 3 blog posts if the search is bananas+oranges", function (done) {
    const searchText = "bananas+oranges";
    request(app)
      .get(`/posts/search?text=${searchText}`)
      .set("Accept", "application/json")
      .expect(200)
      .end((err, response) => {
        if (err) {
          done(err);
          return;
        }
        expect(response.body.length).to.be.eql(3);
        done();
      });
  });

  it("should return a successful response with 2 blog posts if the search is 'about bananas'", function (done) {
    const searchText = '"about bananas"';
    request(app)
      .get(`/posts/search?text=${searchText}`)
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
