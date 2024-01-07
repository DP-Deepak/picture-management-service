const handleErrors = (err, req, res, next) => {
  console.error(err.stack);

  // Handle 401 (Unauthorized) error
  if (err.status === 401) {
    return res.status(401).json({ error: 'Unauthorized', details: err.message || 'Authentication failed' });
  }

  // Handle 403 (Forbidden) error
  if (err.status === 403) {
    return res.status(403).json({ error: 'Forbidden', details: err.message || 'Access denied' });
  }

  // Handle 404 (Not Found) error
  if (err.status === 404) {
    return res.status(404).json({ error: 'Not Found', details: err.message || 'Resource not found' });
  }

  res.status(500).json({ error: 'Internal Server Error', details: 'An unexpected error occurred' });
};

module.exports = handleErrors;
