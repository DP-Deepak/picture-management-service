const { 
  getAllCats,
  getCatById,
  uploadCat,
  updateCat,
  deleteCat } = require('../controllers/catController');
  const { login } = require('../controllers/authController');

  module.exports = {  
    getAllCats,
    getCatById,
    uploadCat,
    updateCat,
    deleteCat,
    login
};