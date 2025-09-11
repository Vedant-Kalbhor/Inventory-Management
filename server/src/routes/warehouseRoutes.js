const express = require('express');
const router = express.Router();
const warehouseCtrl = require('../controllers/warehouseController');
const { authMiddleware } = require('../middlewares/authMiddleware');
const { roleMiddleware } = require('../middlewares/roleMiddleware');

router.get('/', authMiddleware, warehouseCtrl.listWarehouses);
router.get('/:id', authMiddleware, warehouseCtrl.getWarehouse);
router.post('/', authMiddleware, roleMiddleware(['Admin','Manager']), warehouseCtrl.createWarehouse);
router.put('/:id', authMiddleware, roleMiddleware(['Admin','Manager']), warehouseCtrl.updateWarehouse);
router.post('/transfer', authMiddleware, roleMiddleware(['Admin','Manager']), warehouseCtrl.transferStock);

module.exports = router;
