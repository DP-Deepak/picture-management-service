const express = require('express');
const { 
  getAllCats,
  getCatById,
  uploadCat,
  updateCat,
  deleteCat 
} = require('../controllers');
const { authMiddleware } = require('../middleware');

const router = express.Router();

router.use(authMiddleware);

router.get('/all', getAllCats);
router.get('/:id', getCatById);
router.post('/', uploadCat);
router.put('/:id', updateCat);
router.delete('/:id', deleteCat);

module.exports = router;
