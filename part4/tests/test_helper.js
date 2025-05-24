const Blog = require("../models/blog");

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

const nonExistingId = async () => {
  const blog = new Blog({
    title: "willremovethissoon",
    url: "https://www.viciana.com",
  });
  await blog.save();
  await blog.deleteOne();
  return blog.id.toString();
};

const blogsInDb = async () => {
  const blogs = await Blog.find({});
  return blogs.map((blog) => blog.toJSON());
};

module.exports = {
  initialBlogs,
  nonExistingId,
  blogsInDb,
};
