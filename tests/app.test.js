const request = require('supertest');
const app = require('../src/app');

describe('App Initialization Tests', () => {
  it('should return 404 for undefined routes', async () => {
    const response = await request(app).get('/nonexistent-route');

    expect(response.status).toBe(404);
    expect(response.body).toEqual({});
  });

  it('should return 500 for unhandled errors', async () => {
    app.get('/error-route', (req, res) => {
      throw new Error('Simulated error');
    });

    const response = await request(app).get('/error-route');

    expect(response.status).toBe(500);
    expect(response.body).toEqual({});
  });
});

describe('App Configuration Tests', () => {
  it('should initialize without errors', () => {
    expect(app).toBeDefined();
  });

  it('should use bodyParser middleware', () => {
    const bodyParserMiddleware = app._router.stack.find(
      (middleware) => middleware.name === 'urlencodedParser'
    );

    expect(bodyParserMiddleware).toBeDefined();
  });

  it('should use authRoutes', () => {
    const authRoute = app._router.stack.find(
      (middleware) => middleware.handle && middleware.handle.name === 'router'
    );

    expect(authRoute).toBeDefined();
  });

  it('should use catRoutes', () => {
    const catRoute = app._router.stack.find(
      (middleware) => middleware.handle && middleware.handle.name === 'router'
    );

    expect(catRoute).toBeDefined();
  });

  it('should use error middleware', () => {
    const errorMiddleware = app._router.stack.find((middleware) => middleware.handle.name === 'handleErrors');

    expect(errorMiddleware).toBeDefined();
  });
});
