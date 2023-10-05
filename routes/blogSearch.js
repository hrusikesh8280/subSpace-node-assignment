const express = require('express');
const router = express.Router();

// Mock blog data (replace with actual data or API request)
const blogData = [
  { id: 1, title: 'Privacy Matters' },
  { id: 2, title: 'How to Protect Your Online Privacy' },
  { id: 3, title: 'The Importance of Data Security' },
  { id: 4, title: 'Privacy in the Digital Age' },
];


router.get('/', (req, res) => {
  try {
    const query = req.query.query.toLowerCase();

    if (!query) {
      return res.status(400).json({ error: 'Query parameter "query" is required' });
    }


    const matchingBlogs = blogData.filter((blog) =>
      blog.title.toLowerCase().includes(query)
    );

    if (matchingBlogs.length === 0) {
      return res.status(404).json({ error: 'No matching blogs found' });
    }


    res.json(matchingBlogs);
  } catch (error) {
    // Handle errors, if any
    console.error('Error during blog search:', error.message);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
