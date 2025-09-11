require('dotenv').config();
const { connectDB } = require('../src/config/db');
const { admin, sampleProducts, sampleSuppliers, sampleWarehouses } = require('../src/utils/seedData');
const User = require('../src/models/User');
const Product = require('../src/models/Product');
const Supplier = require('../src/models/Supplier');
const Warehouse = require('../src/models/Warehouse');

async function seed() {
  await connectDB(process.env.MONGO_URI || 'mongodb://localhost:27017/mern_inventory');

  // admin
  const existing = await User.findOne({ email: admin.email });
  if (!existing) {
    const u = new User({ name: admin.name, email: admin.email, role: admin.role });
    u.password = admin.password;
    await u.save();
    // eslint-disable-next-line no-console
    console.log('Created admin:', admin.email);
  } else {
    // eslint-disable-next-line no-console
    console.log('Admin exists:', admin.email);
  }

  // suppliers
  for (const s of sampleSuppliers) {
    const ex = await Supplier.findOne({ name: s.name });
    if (!ex) {
      await Supplier.create(s);
      // eslint-disable-next-line no-console
      console.log('Created supplier', s.name);
    }
  }

  // products
  for (const p of sampleProducts) {
    const ex = await Product.findOne({ sku: p.sku });
    if (!ex) {
      await Product.create(p);
      // eslint-disable-next-line no-console
      console.log('Created product', p.sku);
    }
  }

  // warehouses
  for (const w of sampleWarehouses) {
    const ex = await Warehouse.findOne({ name: w.name });
    if (!ex) {
      await Warehouse.create(w);
      // eslint-disable-next-line no-console
      console.log('Created warehouse', w.name);
    }
  }

  process.exit(0);
}

seed().catch(err => {
  // eslint-disable-next-line no-console
  console.error('Seeding failed', err);
  process.exit(1);
});
