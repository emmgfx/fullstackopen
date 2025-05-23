const dummy = (blogs) => {
  return 1;
};

const totalLikes = (blogs) => {
  let total = 0;
  blogs.forEach((blog) => (total += blog.likes));
  return total;
};

const favoriteBlog = (blogs) => {
  const sortedBlogs = blogs.sort((a, b) =>
    a.likes > b.likes ? -1 : a.likes < b.likes ? 1 : 0
  );

  return sortedBlogs[0] || null;
};

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
};
