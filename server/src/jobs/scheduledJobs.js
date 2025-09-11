const { CronJob } = require('cron');
const { emitToAll } = require('../services/notificationService');

// Example: every day at 08:00
const dailyJob = new CronJob('0 0 8 * * *', () => {
  emitToAll('cron:daily', { message: 'Daily check' });
}, null, false, 'UTC');

function startJobs() {
  try {
    dailyJob.start();
  } catch (err) {
    
    console.error('Failed to start cron jobs', err);
  }
}

module.exports = { startJobs };
