const Warehouse = require('../models/Warehouse');
const Product = require('../models/Product');

async function listWarehouses(req, res) {
  const items = await Warehouse.find().lean();
  res.json(items);
}

async function getWarehouse(req, res) {
  const w = await Warehouse.findById(req.params.id).lean();
  if (!w) return res.status(404).json({ message: 'Not found' });
  res.json(w);
}

async function createWarehouse(req, res) {
  const w = await Warehouse.create(req.body);
  res.status(201).json(w);
}

async function updateWarehouse(req, res) {
  const updated = await Warehouse.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(updated);
}

// Simple transfer: decrement from source warehouse and increment in dest
async function transferStock(req, res) {
  const { fromWarehouseId, toWarehouseId, productId, quantity } = req.body;
  if (!fromWarehouseId || !toWarehouseId || !productId || !quantity) {
    return res.status(400).json({ message: 'Missing fields' });
  }

  const from = await Warehouse.findById(fromWarehouseId);//source
  const to = await Warehouse.findById(toWarehouseId);//destination
  if (!from || !to) return res.status(404).json({ message: 'Warehouse not found' });

  // helper to update product entry
  function change(w, pid, qty) {
    const idx = w.products.findIndex(p => p.productId.toString() === pid.toString());
    if (idx === -1) {
      if (qty > 0) w.products.push({ productId: pid, quantity: qty });
    } else {
      w.products[idx].quantity += qty;
      if (w.products[idx].quantity < 0) w.products[idx].quantity = 0;
    }
  }

  change(from, productId, -Math.abs(quantity));
  change(to, productId, Math.abs(quantity));

  await from.save();
  await to.save();

  // Optionally adjust global product quantity
  const totalQty = from.products.reduce((s, p) => s + (p.productId.toString() === productId.toString() ? p.quantity : 0), 0)
                 + to.products.reduce((s, p) => s + (p.productId.toString() === productId.toString() ? p.quantity : 0), 0);
  await Product.findByIdAndUpdate(productId, { stockQuantity: totalQty });

  res.json({ message: 'Transfer complete' });
}

module.exports = { listWarehouses, getWarehouse, createWarehouse, updateWarehouse, transferStock };
