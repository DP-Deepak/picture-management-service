const cloudinary = require('cloudinary').v2;
const {
  getAllCats,
  getCatById,
  uploadCat,
  updateCat,
  deleteCat,
} = require('../../src/controllers/catController');
const Cat = require('../../src/models/Cat');

const mockRequest = (params, file) => ({ params, file });
const mockResponse = () => {
  const res = {};
  res.json = jest.fn().mockReturnValue(res);
  res.status = jest.fn().mockReturnValue(res);
  return res;
};
const mockNext = jest.fn();

jest.mock('cloudinary').v2;
cloudinary.uploader.upload = jest.fn();
cloudinary.uploader.destroy = jest.fn();

jest.mock('../../src/models/Cat');
Cat.find = jest.fn();
Cat.findOneAndDelete = jest.fn();
Cat.prototype.save = jest.fn();

describe('Cat Controller Tests', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should get all cats successfully', async () => {
    const req = mockRequest({}, {});
    const res = mockResponse();

    Cat.find.mockResolvedValue([]);

    await getAllCats(req, res, mockNext);

    expect(res.json).toHaveBeenCalledWith([]);
  });

  it('should get a cat by ID successfully', async () => {
    const req = mockRequest({ id: 'cat123' }, {});
    const res = mockResponse();

    Cat.find.mockResolvedValue([{ publicId: 'cat123' }]);

    await getCatById(req, res, mockNext);

    expect(res.json).toHaveBeenCalledWith({ publicId: 'cat123' });
  });

  it('should upload a cat successfully', async () => {
    const req = mockRequest({}, { path: 'path/to/cat-image.jpg' });
    const res = mockResponse();

    cloudinary.uploader.upload.mockResolvedValue({ url: 'cat-image-url', public_id: 'cat123' });
    Cat.prototype.save.mockResolvedValue({ imageUrl: 'cat-image-url', publicId: 'cat123' });

    await uploadCat(req, res, mockNext);

    expect(res.json).toHaveBeenCalled();
  });

  it('should update a cat successfully', async () => {
    const req = mockRequest({ id: 'cat123' }, { path: 'path/to/new-cat-image.jpg' });
    const res = mockResponse();

    Cat.find.mockResolvedValue([{ publicId: 'cat123', save: jest.fn() }]);

    await updateCat(req, res, mockNext);

    expect(cloudinary.uploader.destroy).toHaveBeenCalledWith('cat123');
    expect(cloudinary.uploader.upload).toHaveBeenCalledWith('path/to/new-cat-image.jpg', { public_id: 'cat123' });
    expect(res.json).toHaveBeenCalled();
  });

  it('should delete a cat successfully', async () => {
    const req = mockRequest({ id: 'cat123' }, {});
    const res = mockResponse();

    Cat.find.mockResolvedValue([{ publicId: 'cat123' }]);
    Cat.findOneAndDelete.mockResolvedValue({});

    await deleteCat(req, res, mockNext);

    expect(cloudinary.uploader.destroy).toHaveBeenCalledWith('cat123');
    expect(Cat.findOneAndDelete).toHaveBeenCalledWith({ publicId: 'cat123' });
    expect(res.json).toHaveBeenCalledWith({ message: 'Cat deleted successfully' });
  });
});
