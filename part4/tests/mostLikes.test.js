const { test, describe } = require("node:test");
const assert = require("node:assert");
const listHelper = require("../utils/list_helpers");

describe("most likes", () => {
  test("of empty list is null", () => {
    const blogs = [];
    const result = listHelper.mostLikes(blogs);
    assert.strictEqual(result, null);
  });

  test("return the correct author", () => {
    const blogs = [
      {
        title: "The technology behind Stadiaffinity 1",
        author: "Josep Viciana",
        url: "https://www.viciana.me/articles/2024-08-11-the-technology-behind-stadiaffinity",
        likes: 1,
        id: "6829f3f8289bfcba70a6cceb",
      },
      {
        title: "The technology behind Stadiaffinity 2",
        author: "Josep Viciana",
        url: "https://www.viciana.me/articles/2024-08-11-the-technology-behind-stadiaffinity",
        likes: 5,
        id: "6829f3f8289bfcba70a6cceb",
      },
      {
        title: "The technology behind Stadiaffinity 3",
        author: "Josep Viciana 2",
        url: "https://www.viciana.me/articles/2024-08-11-the-technology-behind-stadiaffinity",
        likes: 10,
        id: "6829f3f8289bfcba70a6cceb",
      },
    ];
    const result = listHelper.mostLikes(blogs);
    assert.deepStrictEqual(result, { author: "Josep Viciana 2", likes: 10 });
  });
});
