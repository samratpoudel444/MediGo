import { Server } from 'socket.io';
import http from 'http';
import jwt from 'jsonwebtoken';

const setupSocketServer = (app) => {
  const server = http.createServer(app);
  const io = new Server(server, {
    cors: {
      origin: ['http://localhost:3000', 'http://localhost:5173'],
      methods: ['GET', 'POST'],
      credentials: true
    },
    connectionStateRecovery: {
      maxDisconnectionDuration: 30000
    }
  });

  io.use(async (socket, next) => {
    try {
      const token = socket.handshake.auth.token;
      if (!token) throw new Error('Authentication failed');

      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      socket.userId = decoded.id;
      next();
    } catch (err) {
      next(new Error('Authentication failed'));
    }
  });

  io.on('connection', (socket) => {
    console.log(`User connected: ${socket.userId}`);

    socket.join(`user_${socket.userId}`);

    socket.on('private_message', async ({ to, content }) => {
      try {
        // Save message to database here
        
        // Emit to recipient
        io.to(`user_${to}`).emit('new_message', {
          from: socket.userId,
          content,
          timestamp: new Date()
        });

        // Confirm to sender
        socket.emit('message_delivered', {
          to,
          content,
          timestamp: new Date()
        });
      } catch (error) {
        socket.emit('message_error', {
          error: 'Failed to send message'
        });
      }
    });

    socket.on('disconnect', () => {
      console.log(`User disconnected: ${socket.userId}`);
    });
  });

  return server;
};

export default setupSocketServer;