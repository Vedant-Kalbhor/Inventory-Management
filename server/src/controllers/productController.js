const Product = require('../models/Product');

async function listProducts(req, res) {
  const products = await Product.find().lean();
  res.json(products);
}

async function getProduct(req, res) {
  const p = await Product.findById(req.params.id);
  if (!p) return res.status(404).json({ message: 'Product not found' });
  res.json(p);
}

async function createProduct(req, res) {
  const { name, sku } = req.body;
  if (!name || !sku) return res.status(400).json({ message: 'name and sku required' });
  const existing = await Product.findOne({ sku });
  if (existing) return res.status(409).json({ message: 'SKU already exists' });

  const product = await Product.create(req.body);
  res.status(201).json(product);
}

async function updateProduct(req, res) {
  const updated = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
  if (!updated) return res.status(404).json({ message: 'Not found' });
  res.json(updated);
}

async function deleteProduct(req, res) {
  await Product.findByIdAndDelete(req.params.id);
  res.json({ message: 'Deleted' });
}

module.exports = { listProducts, getProduct, createProduct, updateProduct, deleteProduct };
