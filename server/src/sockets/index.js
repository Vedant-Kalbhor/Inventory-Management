const { Server } = require("socket.io");
const { initNotificationService } = require("../services/notificationService");

function attach(server) {
  const io = new Server(server, {
    cors: { origin: "*" }
  });

  io.on("connection", (socket) => {
    socket.on("join", ({ userId, role }) => {
      if (userId) socket.join(`user:${userId}`);
      if (role) socket.join(`role:${role}`);
    });
  });

  initNotificationService(io);
}

module.exports = { attach };
