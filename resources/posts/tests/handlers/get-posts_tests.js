const request = require("supertest");
const { app } = require("../../../../index");

describe("GET /posts", function () {
  it("should return a successful response", function () {
    return request(app)
      .get("/posts")
      .set("Accept", "application/json")
      .expect(200);
  });
});
