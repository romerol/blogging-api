const request = require("supertest");
const { expect } = require("chai");
const faker = require("faker");
const { app, db } = require("../../../../index");

describe("POST /authors", function () {
  after(function (done) {
    db.Author.deleteMany({}, done);
  });

  it("should create an author successfully", function (done) {
    const author = {
      name: faker.random.word(),
      email: "some@email.com",
      password: faker.random.word(),
    };
    request(app)
      .post("/authors")
      .send(author)
      .set("Accept", "application/json")
      .expect(200)
      .end((err, response) => {
        if (err) {
          done(err);
          return;
        }
        expect(response.body.name).to.be.eql(author.name);
        expect(response.body.email).to.be.eql(author.email);
        expect(response.body.salt).to.be.eql(undefined);
        expect(response.body.hash).to.be.eql(undefined);
        done();
      });
  });

  it("should return 400 if name is missing", function (done) {
    const author = {
      email: faker.internet.email(),
      password: faker.random.word(),
    };
    request(app)
      .post("/authors")
      .send(author)
      .set("Accept", "application/json")
      .expect(400)
      .end((err, response) => {
        if (err) {
          done(err);
          return;
        }
        expect(response.body.message).to.be.eql("Missing required property:\n\t - At Author/name\n");
        done();
      });
  });

  it("should return 400 if email is missing", function (done) {
    const author = {
      name: faker.random.word(),
      password: faker.random.word(),
    };
    request(app)
      .post("/authors")
      .send(author)
      .set("Accept", "application/json")
      .expect(400)
      .end((err, response) => {
        if (err) {
          done(err);
          return;
        }
        expect(response.body.message).to.be.eql("Missing required property:\n\t - At Author/email\n");
        done();
      });
  });

  it("should return 400 if password is missing", function (done) {
    const author = {
      name: faker.random.word(),
      email: faker.internet.email(),
    };
    request(app)
      .post("/authors")
      .send(author)
      .set("Accept", "application/json")
      .expect(400)
      .end((err, response) => {
        if (err) {
          done(err);
          return;
        }
        expect(response.body.message).to.be.eql("Missing required property:\n\t - At Author/password\n");
        done();
      });
  });

  it("should return 409 if the email is already in use", function (done) {
    const author = {
      name: faker.random.word(),
      email: "some@email.com",
      password: faker.random.word(),
    };
    request(app)
      .post("/authors")
      .send(author)
      .set("Accept", "application/json")
      .expect(409)
      .end((err, response) => {
        if (err) {
          done(err);
          return;
        }
        expect(response.body.message).to.be.eql("Email should be unique");
        done();
      });
  });
});
