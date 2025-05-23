const { test, describe } = require("node:test");
const assert = require("node:assert");
const listHelper = require("../utils/list_helpers");

describe("total likes", () => {
  test("of empty list is zero", () => {
    const blogs = [];
    const result = listHelper.totalLikes(blogs);
    assert.strictEqual(result, 0);
  });

  test("when list has only one blog equals the likes of that", () => {
    const blogs = [
      {
        title: "The technology behind Stadiaffinity",
        author: "Josep Viciana",
        url: "https://www.viciana.me/articles/2024-08-11-the-technology-behind-stadiaffinity",
        likes: 1,
        id: "6829f3f8289bfcba70a6cceb",
      },
    ];
    const result = listHelper.totalLikes(blogs);
    assert.strictEqual(result, 1);
  });

  test("of a bigger list is calculated right", () => {
    const blogs = [
      {
        title: "The technology behind Stadiaffinity",
        author: "Josep Viciana",
        url: "https://www.viciana.me/articles/2024-08-11-the-technology-behind-stadiaffinity",
        likes: 1,
        id: "6829f3f8289bfcba70a6cceb",
      },
      {
        title: "The technology behind Stadiaffinity",
        author: "Josep Viciana",
        url: "https://www.viciana.me/articles/2024-08-11-the-technology-behind-stadiaffinity",
        likes: 10,
        id: "6829f3f8289bfcba70a6cceb",
      },
    ];
    const result = listHelper.totalLikes(blogs);
    assert.strictEqual(result, 11);
  });
});
