require('dotenv').config();
const mongoose = require('mongoose');
const SalesHistory = require('../src/models/SalesHistory');

const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/mern_inventory';

async function addSales() {
  await mongoose.connect(MONGO_URI);
  console.log('Connected to DB');

  const productId = '69a6c03c6a4cea9224bf9859'; // BOLT-M8
  const baseDate = new Date();
  
  const salesData = [
    { productId, date: new Date(baseDate.getTime() - 4 * 24 * 60 * 60 * 1000), quantitySold: 10 },
    { productId, date: new Date(baseDate.getTime() - 3 * 24 * 60 * 60 * 1000), quantitySold: 12 },
    { productId, date: new Date(baseDate.getTime() - 2 * 24 * 60 * 60 * 1000), quantitySold: 15 },
    { productId, date: new Date(baseDate.getTime() - 1 * 24 * 60 * 60 * 1000), quantitySold: 13 },
    { productId, date: baseDate, quantitySold: 18 },
    { productId, date: new Date(baseDate.getTime() + 1 * 24 * 60 * 60 * 1000), quantitySold: 20 },
  ];

  await SalesHistory.deleteMany({ productId });
  await SalesHistory.insertMany(salesData);
  console.log('Added 6 sales records for BOLT-M8');
  process.exit(0);
}

addSales().catch(err => {
  console.error(err);
  process.exit(1);
});
