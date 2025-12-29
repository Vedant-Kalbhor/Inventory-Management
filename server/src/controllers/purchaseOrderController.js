const Order = require("../models/Order");

const createPurchaseOrder = async (req, res) => {
  try {
    const { supplierId, items } = req.body;

    if (!supplierId || !items || items.length === 0) {
      return res.status(400).json({ error: "Invalid PO data" });
    }

    const po = await Order.create({
      supplierId,
      items,
      status: "Pending",
      type: "PURCHASE",
      createdBy: req.user._id, // manager
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
