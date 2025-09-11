// A tiny notification helper that emits events via socket.io
let io;

function attach(ioInstance) {
  io = ioInstance;
}

function emitToAll(event, payload) {
  if (!io) return;
  io.emit(event, payload);
}

function emitToUser(userId, event, payload) {
  if (!io) return;
  // simplistic: emit to a room named with userId (clients should join room)
  io.to(userId.toString()).emit(event, payload);
}

module.exports = { attach, emitToAll, emitToUser };
