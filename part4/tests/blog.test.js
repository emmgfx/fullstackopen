const { test, after, describe } = require("node:test");
const assert = require("node:assert");
const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");

const api = supertest(app);

describe("blogs", () => {
  test("blogs are returned as json", async () => {
    await api
      .get("/api/blogs")
      .expect(200)
      .expect("Content-Type", /application\/json/);
  });
  test("blogs list is empty", async () => {
    const response = await api.get("/api/blogs");
    assert.strictEqual(response.body.length, 0);
  });
  after(async () => {
    await mongoose.connection.close();
  });
});
