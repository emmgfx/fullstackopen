const { test, after, describe, beforeEach } = require("node:test");
const assert = require("node:assert");
const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const Blog = require("../models/blog");
const helper = require("./test_helper");

const api = supertest(app);

describe("blogs", () => {
  beforeEach(async () => {
    await Blog.deleteMany({});
    await Blog.insertMany(helper.initialBlogs);
  });

  test("blogs are returned as json", async () => {
    await api
      .get("/api/blogs")
      .expect(200)
      .expect("Content-Type", /application\/json/);
  });

  test("blogs list contains initial elements", async () => {
    const response = await api.get("/api/blogs");
    assert.strictEqual(response.body.length, helper.initialBlogs.length);
  });

  test("blogs item has correct id", async () => {
    const response = await api.get("/api/blogs");
    const blog = response.body[0];
    assert("id" in blog);
  });

  describe("addition of a new blog", () => {
    test("increases the blogs count", async () => {
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
      assert.strictEqual(response.body.length, helper.initialBlogs.length + 1);
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

    test("blog addition without title", async () => {
      const newBlog = {
        author: "Josep Viciana",
        url: "https://www.viciana.me/articles/2024-08-11-the-technology-behind-stadiaffinity",
      };

      await api
        .post("/api/blogs")
        .send(newBlog)
        .expect(400)
        .expect("Content-Type", /application\/json/);
    });

    test("blog addition without url", async () => {
      const newBlog = {
        title: "Article without url property",
        author: "Josep Viciana",
      };

      await api
        .post("/api/blogs")
        .send(newBlog)
        .expect(400)
        .expect("Content-Type", /application\/json/);
    });
  });

  describe("deletion of a blog", () => {
    test("returns a 204 code", async () => {
      const blogsAtStart = await helper.blogsInDb();
      const blogToDelete = blogsAtStart[0];

      await api.delete(`/api/blogs/${blogToDelete.id}`).expect(204);

      const blogsAtEnd = await helper.blogsInDb();

      assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length - 1);

      const currentIds = blogsAtEnd.map((r) => r.id);
      assert(!currentIds.includes(blogToDelete.id));
    });
  });

  after(async () => {
    await mongoose.connection.close();
  });
});
