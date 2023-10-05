
function errorHandler(err, req, res, next) {
    console.error(err.stack);
    if (err.status === 400) {
      res.status(400).json({ error: 'Bad Request', message: err.message });
    } else if (err.status === 404) {
      res.status(404).json({ error: 'Not Found', message: err.message });
    } else {
      res.status(500).json({ error: 'Internal Server Error', message: 'Something went wrong' });
    }
  }

  module.exports = errorHandler;
