const Supplier = require('../models/Supplier');

async function listSuppliers(req, res) {
  const s = await Supplier.find().lean();
  res.json(s);
}

async function getSupplier(req, res) {
  const s = await Supplier.findById(req.params.id);
  if (!s) return res.status(404).json({ message: 'Supplier not found' });
  res.json(s);
}

async function createSupplier(req, res) {
  const body = req.body;//supplier data
  const supplier = await Supplier.create(body);
  res.status(201).json(supplier);
}

async function updateSupplier(req, res) {
  const updated = await Supplier.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(updated);
}

module.exports = { listSuppliers, getSupplier, createSupplier, updateSupplier };
