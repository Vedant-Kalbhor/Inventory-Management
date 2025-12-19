const express = require("express");
const router = express.Router();

const {
  listOrders,
  createOrder,
  updateOrderStatus
} = require("../controllers/orderController");

const { authMiddleware } = require("../middlewares/authMiddleware");
const { roleMiddleware } = require("../middlewares/roleMiddleware");

/**
 * GET all orders
 * - Admin / Manager: all orders
 * - Supplier: only their orders
 */
router.get(
  "/",
  authMiddleware,
  listOrders
);

/**
 * Create new order
 * - Admin / Manager
 */
router.post(
  "/",
  authMiddleware,
  roleMiddleware(["Admin", "Manager"]),
  createOrder
);

/**
 * Update order status
 * - Admin / Manager / Supplier
 */
router.put(
  "/:id/status",
  authMiddleware,
  roleMiddleware(["Admin", "Manager", "Supplier"]),
  updateOrderStatus
);

module.exports = router;
