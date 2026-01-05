const express = require('express');
const router = express.Router();

const productCtrl = require('../controllers/productController');
const { protect } = require('../middlewares/authMiddleware');
const { roleMiddleware } = require('../middlewares/roleMiddleware');

// GET all products
router.get('/', protect, productCtrl.listProducts);

// GET single product
router.get('/:id', protect, productCtrl.getProduct);

// CREATE product
router.post(
  '/',
  protect,
  roleMiddleware(['Admin', 'Manager']),
  productCtrl.createProduct
);

// UPDATE product
router.put(
  '/:id',
  protect,
  roleMiddleware(['Admin', 'Manager']),
  productCtrl.updateProduct
);

// DELETE product
router.delete(
  '/:id',
  protect,
  roleMiddleware(['Admin']),
  productCtrl.deleteProduct
);

module.exports = router;
