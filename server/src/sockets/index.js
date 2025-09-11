const { Server } = require('socket.io');
const notificationService = require('../services/notificationService');
const { startJobs } = require('../jobs/scheduledJobs');

let ioInstance;

function attach(server) {
  ioInstance = new Server(server, {
    cors: {
      origin: process.env.CLIENT_URL || '*',
      methods: ['GET', 'POST']
    }
  });

  ioInstance.on('connection', (socket) => {
    // join room for given user id if provided
    socket.on('join', (userId) => {
      if (userId) socket.join(userId.toString());
    });

    socket.on('disconnect', () => {
      // handle cleanup
    });
  });

  notificationService.attach(ioInstance);
  startJobs();
  // eslint-disable-next-line no-console
  console.log('Socket.io attached');
}

module.exports = { attach };
