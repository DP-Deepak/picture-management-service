const handleErrors = require('../../src/middleware/errorMiddleware');

const mockResponse = () => {
  const res = {};
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  return res;
};

describe('handleErrors Middleware Tests', () => {
  it('should handle 401 (Unauthorized) error', () => {
    const err = { status: 401, message: 'Custom Unauthorized Message' };
    const res = mockResponse();

    handleErrors(err, null, res, null);

    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({ error: 'Unauthorized', details: 'Custom Unauthorized Message' });
  });

  it('should handle 403 (Forbidden) error', () => {
    const err = { status: 403, message: 'Custom Forbidden Message' };
    const res = mockResponse();

    handleErrors(err, null, res, null);

    expect(res.status).toHaveBeenCalledWith(403);
    expect(res.json).toHaveBeenCalledWith({ error: 'Forbidden', details: 'Custom Forbidden Message' });
  });

  it('should handle 404 (Not Found) error', () => {
    const err = { status: 404, message: 'Custom Not Found Message' };
    const res = mockResponse();

    handleErrors(err, null, res, null);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ error: 'Not Found', details: 'Custom Not Found Message' });
  });

  it('should handle generic 500 (Internal Server Error)', () => {
    const err = { status: 500, message: 'Custom Internal Server Error Message' };
    const res = mockResponse();

    handleErrors(err, null, res, null);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ error: 'Internal Server Error', details: 'An unexpected error occurred' });
  });

  it('should handle generic 500 (Internal Server Error) without custom message', () => {
    const err = { status: 500 };
    const res = mockResponse();

    handleErrors(err, null, res, null);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ error: 'Internal Server Error', details: 'An unexpected error occurred' });
  });
});
