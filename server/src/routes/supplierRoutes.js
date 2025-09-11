const express = require('express');
const router = express.Router();
const supplierCtrl = require('../controllers/supplierController');
const { authMiddleware } = require('../middlewares/authMiddleware');
const { roleMiddleware } = require('../middlewares/roleMiddleware');

router.get('/', authMiddleware, supplierCtrl.listSuppliers);
router.get('/:id', authMiddleware, supplierCtrl.getSupplier);
router.post('/', authMiddleware, roleMiddleware(['Admin','Manager']), supplierCtrl.createSupplier);
router.put('/:id', authMiddleware, roleMiddleware(['Admin','Manager']), supplierCtrl.updateSupplier);

module.exports = router;
