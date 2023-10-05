const express = require('express');
const app = express();
const errorHandlingMiddleware = require('./middleware/errorHandling');
const blogStatsRoute = require('./routes/blogStats');
const blogSearchRoute = require('./routes/blogSearch');

app.use(express.json());

app.use('/api/blog-stats', blogStatsRoute);
app.use('/api/blog-search', blogSearchRoute);
app.use(errorHandlingMiddleware);

const PORT = 7000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
