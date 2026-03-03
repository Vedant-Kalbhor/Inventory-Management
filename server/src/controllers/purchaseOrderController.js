const Order = require("../models/Order");
const { emitToRole } = require("../services/notificationService");
const { logAudit } = require("../services/auditService");

const createPurchaseOrder = async (req, res) => {
  try {
    const { supplierId, items } = req.body;

    if (!supplierId || !items || items.length === 0) {
      return res.status(400).json({ error: "Invalid PO data" });
    }

    const po = await Order.create({
      supplierId,
      items,
      status: "Created",
      orderType: "Purchase",
      requestedBy: req.user._id,
    });

    emitToRole("Supplier", "order:new", po);

    await logAudit({
      actor: req.user._id,
      action: "CREATE_PURCHASE_ORDER",
      entity: "Order",
      entityId: po._id,
      meta: po
    });

    res.status(201).json({
      message: "Purchase Order created",
      order: po,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = { createPurchaseOrder };
