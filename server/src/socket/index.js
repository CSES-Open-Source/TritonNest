import { Server } from 'socket.io';
import { env } from '../config/env.js';
import { verifyIdToken } from '../middleware/auth.js';

/**
 * Real-time chat. Clients connect with `io(url, { auth: { token: <Firebase ID token> } })`.
 * Rooms are named `conversation:<id>`.
 */
export function initSocket(httpServer) {
  const io = new Server(httpServer, { cors: { origin: env.clientOrigin, credentials: true } });

  io.use(async (socket, next) => {
    try {
      socket.data.user = await verifyIdToken(socket.handshake.auth?.token);
      next();
    } catch {
      next(new Error('unauthorized'));
    }
  });

  io.on('connection', (socket) => {
    // TODO(messaging): check the user is a participant before joining
    socket.on('conversation:join', (conversationId) => {
      socket.join(`conversation:${conversationId}`);
    });

    // TODO(messaging): persist with the Message model, then broadcast the saved doc
    socket.on('message:send', ({ conversationId, body }) => {
      io.to(`conversation:${conversationId}`).emit('message:new', {
        conversationId,
        body,
        sender: socket.data.user.uid,
        createdAt: new Date().toISOString(),
      });
    });
  });

  return io;
}
