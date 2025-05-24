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

  test("blog addition", async () => {
    const newBlog = {
      title: "The technology behind Stadiaffinity",
      author: "Josep Viciana",
      url: "https://www.viciana.me/articles/2024-08-11-the-technology-behind-stadiaffinity",
      likes: 0,
    };

    await api
      .post("/api/blogs")
      .send(newBlog)
      .expect(201)
      .expect("Content-Type", /application\/json/);
  });

  test("blogs list contains one element", async () => {
    const response = await api.get("/api/blogs");
    assert.strictEqual(response.body.length, 1);
  });

  test("blogs item has correct id", async () => {
    const response = await api.get("/api/blogs");
    const blog = response.body[0];
    assert("id" in blog);
  });

  test("blog deletion", async () => {
    const response = await api.get("/api/blogs");
    const blog = response.body[0];
    await api.delete(`/api/blogs/${blog.id}`).expect(204);
  });

  test("blogs list is empty again", async () => {
    const response = await api.get("/api/blogs");
    assert.strictEqual(response.body.length, 0);
  });

  after(async () => {
    await mongoose.connection.close();
  });
});
