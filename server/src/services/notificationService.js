let io = null;

function initNotificationService(ioInstance) {
  io = ioInstance;
}

function emitGlobal(event, payload) {
  if (io) io.emit(event, payload);
}

function emitToUser(userId, event, payload) {
  if (io) io.to(`user:${userId}`).emit(event, payload);
}

function emitToRole(role, event, payload) {
  if (io) io.to(`role:${role}`).emit(event, payload);
}

module.exports = {
  initNotificationService,
  emitGlobal,
  emitToUser,
  emitToRole
};
