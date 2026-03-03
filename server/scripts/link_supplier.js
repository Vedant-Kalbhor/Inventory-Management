const mongoose = require('mongoose');
const Supplier = require('../src/models/Supplier');
const User = require('../src/models/User');

async function link() {
  await mongoose.connect('mongodb://localhost:27017/mern_inventory');
  const suresh = await User.findOne({ email: 'suresh@gmail.com' });
  const acme = await Supplier.findOne({ name: 'Acme Supplies' });

  if (suresh && acme) {
    acme.userId = suresh._id;
    await acme.save();
    console.log(`Linked ${suresh.name} to ${acme.name}`);
  } else {
    console.log('User or Supplier not found');
  }
  process.exit(0);
}

link();
