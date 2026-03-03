const { CronJob } = require('cron');
const { emitToAll } = require('../services/notificationService');
const Product = require('../models/Product');

// Every day at 08:00
const dailyJob = new CronJob('0 0 8 * * *', async () => {
  try {
    const lowStockItems = await Product.find({ stockQuantity: { $lte: 10 } });
    if (lowStockItems.length > 0) {
      emitToAll('inventory:low-stock', {
        message: 'Low stock alert for several items',
        items: lowStockItems.map(i => ({ name: i.name, sku: i.sku, qty: i.stockQuantity }))
      });
      console.log(`Alerted for ${lowStockItems.length} low stock items`);
    } else {
      emitToAll('cron:daily', { message: 'Daily check: All stock levels are healthy.' });
    }
  } catch (err) {
    console.error('Error in dailyJob:', err);
  }
}, null, false, 'UTC');

function startJobs() {
  try {
    dailyJob.start();
    console.log('Scheduled jobs initialized');
  } catch (err) {
    console.error('Failed to start cron jobs', err);
  }
}

module.exports = { startJobs };
