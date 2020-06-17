const request = require("supertest");
const { expect } = require("chai");
const faker = require("faker");
const mongoose = require("mongoose");
const { app, db } = require("../../../../index");

describe("DELETE /posts", function () {
  let testPostId = null;

  before(async function () {
    const postFixture = new db.Post({
      title: faker.random.word(),
      content: faker.random.word(),
      author: faker.random.word(),
      status: "draft"
    });
    const savedFixture = await postFixture.save();
    testPostId = savedFixture._id.toString();
  });

  it("should delete a post successfully", function (done) {
    request(app)
      .delete(`/posts/${testPostId}`)
      .set("Accept", "application/json")
      .expect(200)
      .end((err, response) => {
        if (err) {
          done(err);
          return;
        }
        expect(response.body.n).to.be.eql(1);
        expect(response.body.ok).to.be.eql(1);
        expect(response.body.deletedCount).to.be.eql(1);
        done();
      });
  });

  it("should have deletedCount equals to 0 as the postId does not exist", function (done) {
    const notFoundId = mongoose.Types.ObjectId().toString();

    request(app)
      .delete(`/posts/${notFoundId}`)
      .set("Accept", "application/json")
      .expect(200)
      .end((err, response) => {
        if (err) {
          done(err);
          return;
        }
        expect(response.body.n).to.be.eql(0);
        expect(response.body.ok).to.be.eql(1);
        expect(response.body.deletedCount).to.be.eql(0);
        done();
      });
  });

  it("should return 400 if the id is not a valid mongo Id", function (done) {
    request(app)
      .delete("/posts/1")
      .set("Accept", "application/json")
      .expect(400)
      .end((err, response) => {
        if (err) {
          done(err);
          return;
        }
        expect(response.body.message).to.be.eql("The postId is not valid");
        done();
      });
  });
});
