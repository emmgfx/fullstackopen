const { test, describe } = require("node:test");
const assert = require("node:assert");
const listHelper = require("../utils/list_helpers");

describe("favorite blog", () => {
  test("of empty list is null", () => {
    const blogs = [];
    const result = listHelper.favoriteBlog(blogs);
    assert.strictEqual(result, null);
  });

  test("when list has only one blog return that blog", () => {
    const blogs = [
      {
        title: "The technology behind Stadiaffinity",
        author: "Josep Viciana",
        url: "https://www.viciana.me/articles/2024-08-11-the-technology-behind-stadiaffinity",
        likes: 1,
        id: "6829f3f8289bfcba70a6cceb",
      },
    ];
    const result = listHelper.favoriteBlog(blogs);
    assert.deepStrictEqual(result, {
      title: "The technology behind Stadiaffinity",
      author: "Josep Viciana",
      url: "https://www.viciana.me/articles/2024-08-11-the-technology-behind-stadiaffinity",
      likes: 1,
      id: "6829f3f8289bfcba70a6cceb",
    });
  });

  test("of a bigger list return the correct blog", () => {
    const blogs = [
      {
        title: "The technology behind Stadiaffinity",
        author: "Josep Viciana",
        url: "https://www.viciana.me/articles/2024-08-11-the-technology-behind-stadiaffinity",
        likes: 1,
        id: "6829f3f8289bfcba70a6cceb",
      },
      {
        title: "The technology behind Stadiaffinity 2",
        author: "Josep Viciana",
        url: "https://www.viciana.me/articles/2024-08-11-the-technology-behind-stadiaffinity",
        likes: 10,
        id: "6829f3f8289bfcba70a6cceb",
      },
    ];
    const result = listHelper.favoriteBlog(blogs);
    assert.deepStrictEqual(result, {
      title: "The technology behind Stadiaffinity 2",
      author: "Josep Viciana",
      url: "https://www.viciana.me/articles/2024-08-11-the-technology-behind-stadiaffinity",
      likes: 10,
      id: "6829f3f8289bfcba70a6cceb",
    });
  });
});
