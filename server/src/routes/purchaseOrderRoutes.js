const express = require("express");
const { createPurchaseOrder } = require("../controllers/purchaseOrderController");
const { protect, authorize } = require("../middlewares/authMiddleware");

const router = express.Router();

router.post(
  "/",
  protect,
  authorize("Manager", "Admin"),
  createPurchaseOrder
);

module.exports = router;
