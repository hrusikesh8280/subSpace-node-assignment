const express = require('express');
const axios = require('axios');
const _ = require('lodash');
const router = express.Router();


async function fetchBlogData() {
  try {
    const response = await axios.get('https://intent-kit-16.hasura.app/api/rest/blogs', {
      headers: {
        'x-hasura-admin-secret': '32qR4KmXOIpsGPQKMqEJHGJS27G5s7HdSKO3gdtQd2kv5e852SiYwWNfxkZOBuQ6',
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
}


router.get('/', async (req, res) => {
  try {

    const blogData = await fetchBlogData();


    const totalBlogs = blogData.length;

    const longestTitleBlog = _.maxBy(blogData, 'title.length');

    const privacyTitleBlogs = _.filter(blogData, (blog) =>
      _.includes(_.toLower(blog.title), 'privacy')
    );
    const uniqueBlogTitles = _.uniqBy(blogData, 'title');
    res.json({
      totalBlogs,
      longestTitle: longestTitleBlog.title,
      privacyTitleCount: privacyTitleBlogs.length,
      uniqueBlogTitles: uniqueBlogTitles.map((blog) => blog.title),
    });
  } catch (error) {
    console.error('Error fetching or analyzing data:', error.message);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
