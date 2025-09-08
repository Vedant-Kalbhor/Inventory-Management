const mongoose = require('mongoose');

//This schema describes individual items in an order.
const OrderItem = new mongoose.Schema({
  productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
  quantity: { type: Number, required: true, min: 0 },
  unitPrice: { type: Number, default: 0 }
}, { _id: false });

const OrderSchema = new mongoose.Schema({
  orderType: { type: String, enum: ['Purchase', 'Sales'], required: true },
  supplierId: { type: mongoose.Schema.Types.ObjectId, ref: 'Supplier' },
  items: [OrderItem],
  status: { type: String, enum: ['Created', 'Approved', 'Shipped', 'Delivered', 'Completed', 'Cancelled'], default: 'Created' },
  requestedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Order', OrderSchema);
