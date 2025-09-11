const express = require('express');
const router = express.Router();
const productCtrl = require('../controllers/productController');
const { authMiddleware } = require('../middlewares/authMiddleware');
const { roleMiddleware } = require('../middlewares/roleMiddleware');

router.get('/', authMiddleware, productCtrl.listProducts);
router.get('/:id', authMiddleware, productCtrl.getProduct);
router.post('/', authMiddleware, roleMiddleware(['Admin', 'Manager']), productCtrl.createProduct);
router.put('/:id', authMiddleware, roleMiddleware(['Admin', 'Manager']), productCtrl.updateProduct);
router.delete('/:id', authMiddleware, roleMiddleware(['Admin']), productCtrl.deleteProduct);

module.exports = router;
