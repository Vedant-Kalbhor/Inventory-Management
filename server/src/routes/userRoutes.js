const express = require('express');
const router = express.Router();
const userCtrl = require('../controllers/userController');
const { authMiddleware } = require('../middlewares/authMiddleware');
const { roleMiddleware } = require('../middlewares/roleMiddleware');

router.use(authMiddleware);
router.get('/', roleMiddleware(['Admin']), userCtrl.listUsers);
router.post('/', roleMiddleware(['Admin']), userCtrl.createUser);
router.get('/:id', roleMiddleware(['Admin']), userCtrl.getUser);
router.put('/:id', roleMiddleware(['Admin']), userCtrl.updateUser);
router.delete('/:id', roleMiddleware(['Admin']), userCtrl.deleteUser);

module.exports = router;
