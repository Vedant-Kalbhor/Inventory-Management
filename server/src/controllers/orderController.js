const Order = require("../models/Order");
const Product = require("../models/Product");
const Supplier = require("../models/Supplier");
const { emitToRole, emitToUser } = require("../services/notificationService");
const { logAudit } = require("../services/auditService");

exports.listOrders = async (req, res) => {
  let query = {};

  if (req.user.role === "Supplier") {
    // Find the supplier record linked to this user
    const supplierRecord = await Supplier.findOne({ userId: req.user._id });
    if (supplierRecord) {
      query.supplierId = supplierRecord._id;
    } else {
      // Fallback: maybe the supplierId was set to req.user._id directly
      query.supplierId = req.user._id;
    }
  }

  const orders = await Order.find(query)
    .populate("items.productId")
    .populate("supplierId", "name")
    .sort({ createdAt: -1 });

  res.json(orders);
};

exports.createOrder = async (req, res) => {
  const order = await Order.create({
    ...req.body,
    requestedBy: req.user._id
  });

  emitToRole("Supplier", "order:new", order);

  await logAudit({
    actor: req.user._id,
    action: "CREATE_ORDER",
    entity: "Order",
    entityId: order._id,
    meta: order
  });

  res.status(201).json(order);
};

exports.updateOrderStatus = async (req, res) => {
  const { status } = req.body;
  const order = await Order.findById(req.params.id);

  if (!order) return res.status(404).json({ message: "Order not found" });

  order.status = status;
  await order.save();

  if (status === "Delivered") {
    const multiplier = order.orderType === "Purchase" ? 1 : -1;
    for (const item of order.items) {
      await Product.findByIdAndUpdate(item.productId, {
        $inc: { stockQuantity: item.quantity * multiplier }
      });
    }
  }

  emitToUser(order.requestedBy, "order:updated", order);

  await logAudit({
    actor: req.user._id,
    action: "UPDATE_ORDER_STATUS",
    entity: "Order",
    entityId: order._id,
    meta: { status }
  });

  res.json(order);
};
