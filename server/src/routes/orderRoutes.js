const express = require('express');
const router = express.Router();
const orderCtrl = require('../controllers/orderController');
const { authMiddleware } = require('../middlewares/authMiddleware');
const { roleMiddleware } = require('../middlewares/roleMiddleware');

router.get('/', authMiddleware, orderCtrl.listOrders);
router.get('/:id', authMiddleware, orderCtrl.getOrder);
router.post('/', authMiddleware, orderCtrl.createOrder);
router.put('/:id/status', authMiddleware, roleMiddleware(['Admin','Manager','Supplier']), orderCtrl.updateOrderStatus);

module.exports = router;
