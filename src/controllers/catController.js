const cloudinary = require('cloudinary').v2;
const Cat = require('../models/Cat');

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

/**
 * @desc Get all cats
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware function
 * @returns {Object} - aray of cats
 */
const getAllCats = async (req, res, next) => {
  try {
    const cats = await Cat.find();
    res.json(cats);
  } catch (error) {
    next(error);
  }
};

/**
 * @desc Get a cat by ID
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware function
 * @returns {Object} - single cat picture
 */
const getCatById = async (req, res, next) => {
  try {
    const [cat] = await Cat.find({publicId: req.params.id});
    if (!cat) {
      return next({status: 404});
    }
    res.json(cat);
  } catch (error) {
    next(error);
  }
};

/**
 * @desc Upload a cat picture
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware function
 * @returns {Object} - details of uploaded cat picture
 */
const uploadCat = async (req, res, next) => {
  try {
    const result = await cloudinary.uploader.upload(req.file.path);
    const newCat = new Cat({ imageUrl: result.url, publicId: result.public_id });
    await newCat.save();
    res.json(newCat);
  } catch (error) {
    next(error);
  }
};

/**
 * @desc Update a cat picture
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware function
 * @returns {Object} - details of updated cat picture
 */
const updateCat = async (req, res, next) => {
  try {
    const [cat] = await Cat.find({publicId: req.params.id})
    if(!cat) {
      return res.status(404).json({ message: 'Cat not found' });
    }

    // Delete the existing image from Cloudinary
    await cloudinary.uploader.destroy(cat.publicId);

    // Upload the new image to Cloudinary
    const result = await cloudinary.uploader.upload(req.file.path, { public_id: cat.publicId }); // parallel call

    // Update the cat record in MongoDB
    cat.imageUrl = result.url;
    // now update the existing cat in mongodb
    await cat.save();

    res.json(cat);
  } catch (error) {
    next(error);
  }
};

/**
 * @desc Delete a cat picture
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware function
 * @returns {Object} - message of successful deletion
 */
const deleteCat = async (req, res, next) => {
  try {
    const [cat] = await Cat.find({publicId: req.params.id});
    if (!cat) {
      // return res.status(404).json({ message: 'Cat not found' });
      return next({status: 404});
    }

    // Delete the image from Cloudinary
    await cloudinary.uploader.destroy(cat.publicId);

    // Delete the cat record from MongoDB
    await Cat.findOneAndDelete({publicId: req.params.id});

    res.json({ message: 'Cat deleted successfully' });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllCats,
  getCatById,
  uploadCat,
  updateCat,
  deleteCat,
};
