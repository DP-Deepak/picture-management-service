const jwt = require('jsonwebtoken');
const { login } = require('../../src/controllers/authController');

const mockRequest = () => ({});
const mockResponse = () => {
  const res = {};
  res.json = jest.fn().mockReturnValue(res);
  return res;
};

jest.mock('jsonwebtoken', () => ({
  sign: jest.fn(),
}));

describe('login Controller Tests', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should generate a token and send it in the response', () => {
    const req = mockRequest();
    const res = mockResponse();

    jwt.sign.mockReturnValueOnce('mocked_token');

    login(req, res);

    expect(jwt.sign).toHaveBeenCalledWith({ userId: 'Deepak' }, process.env.JWT_SECRET, { expiresIn: '100h' });
    expect(res.json).toHaveBeenCalledWith({ token: 'mocked_token' });
  });
});
