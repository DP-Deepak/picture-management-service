const jwt = require('jsonwebtoken');
const authMiddleware = require('../../src/middleware/authMiddleware');

const mockRequest = (headers) => ({ headers });
const mockResponse = () => {
  const res = {};
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  return res;
};
const mockNext = jest.fn();

jest.mock('jsonwebtoken', () => ({
  verify: jest.fn(),
}));

describe('authMiddleware Tests', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should pass with a valid token', () => {
    const token = 'valid_token';
    const req = mockRequest({ authorization: `Bearer ${token}` });
    const res = mockResponse();

    jwt.verify.mockReturnValueOnce({ userId: 'user123' });

    authMiddleware(req, res, mockNext);

    expect(jwt.verify).toHaveBeenCalledWith(token, process.env.JWT_SECRET);
    expect(req.userId).toEqual('user123');
    expect(mockNext).toHaveBeenCalled();
  });

  it('should return 401 with missing token', () => {
    const req = mockRequest({});
    const res = mockResponse();

    authMiddleware(req, res, mockNext);

    expect(mockNext).toHaveBeenCalledWith({ status: 401 });
  });

  it('should return 401 with invalid token', () => {
    const token = 'invalid_token';
    const req = mockRequest({ authorization: `Bearer ${token}` });
    const res = mockResponse();

    jwt.verify.mockImplementationOnce(() => {
      throw new Error('Invalid token');
    });

    authMiddleware(req, res, mockNext);

    expect(jwt.verify).toHaveBeenCalledWith(token, process.env.JWT_SECRET);
    expect(mockNext).toHaveBeenCalledWith({ status: 401 });
  });
});
