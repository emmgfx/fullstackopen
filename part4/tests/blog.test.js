const { test, after, describe, beforeEach } = require("node:test");
const assert = require("node:assert");
const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const Blog = require("../models/blog");

const api = supertest(app);

describe("blogs", () => {
  const initialBlogs = [
    {
      title: "The technology behind Stadiaffinity",
      author: "Josep Viciana",
      url: "https://www.viciana.me/articles/2024-08-11-the-technology-behind-stadiaffinity",
      likes: 0,
    },
    {
      title: "Propósitos y pronósticos para 2025",
      author: "Josep Viciana",
      url: "https://www.viciana.me/articles/2025-01-01-propositos-y-pronosticos-para-2025",
      likes: 0,
    },
  ];

  beforeEach(async () => {
    await Blog.deleteMany({});
    let blogObject = new Blog(initialBlogs[0]);
    await blogObject.save();
    blogObject = new Blog(initialBlogs[1]);
    await blogObject.save();
  });

  test("blogs are returned as json", async () => {
    await api
      .get("/api/blogs")
      .expect(200)
      .expect("Content-Type", /application\/json/);
  });

  test("blogs list contains two elements", async () => {
    const response = await api.get("/api/blogs");
    assert.strictEqual(response.body.length, 2);
  });

  test("blogs item has correct id", async () => {
    const response = await api.get("/api/blogs");
    const blog = response.body[0];
    assert("id" in blog);
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

    const response = await api.get("/api/blogs");
    assert.strictEqual(response.body.length, initialBlogs.length + 1);
  });

  test("blog addition without likes param", async () => {
    const newBlog = {
      title: "Article without likes property",
      author: "Josep Viciana",
      url: "https://www.viciana.me/articles/2024-08-11-the-technology-behind-stadiaffinity",
    };

    await api
      .post("/api/blogs")
      .send(newBlog)
      .expect(201)
      .expect("Content-Type", /application\/json/)
      .expect((result) => assert.strictEqual(result.body.likes, 0));
  });

  after(async () => {
    await mongoose.connection.close();
  });
});
