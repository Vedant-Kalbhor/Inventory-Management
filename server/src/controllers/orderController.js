const Order = require('../models/Order');
const Product = require('../models/Product');

async function listOrders(req, res) {
  const orders = await Order.find().populate('items.productId').lean();
  res.json(orders);
}

async function getOrder(req, res) {
  const o = await Order.findById(req.params.id).populate('items.productId');
  if (!o) return res.status(404).json({ message: 'Order not found' });
  res.json(o);
}

async function createOrder(req, res) {
  const { orderType, items, supplierId } = req.body;
  if (!orderType || !items || !Array.isArray(items) || !items.length) {
    return res.status(400).json({ message: 'Invalid order data' });
  }
  const order = await Order.create({
    orderType,
    items,
    supplierId,
    requestedBy: req.user ? req.user._id : undefined
  });
  res.status(201).json(order);
}

async function updateOrderStatus(req, res) {
  const { id } = req.params;
  const { status } = req.body;
  const order = await Order.findById(id);
  if (!order) return res.status(404).json({ message: 'Not found' });

  order.status = status;
  await order.save();

  // If delivered and it's a purchase order, increment product stock
  if (status === 'Delivered' && order.orderType === 'Purchase') {
    for (const it of order.items) {
      await Product.findByIdAndUpdate(it.productId, { $inc: { stockQuantity: it.quantity } });
    }
  }

  res.json({ message: 'Status updated', order });
}

module.exports = { listOrders, getOrder, createOrder, updateOrderStatus };
