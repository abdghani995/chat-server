const socketIo = require('socket.io');

createIo = server => {
  const io = socketIo(server, {
    cors: {
      origin: process.env.CLIENT_URL, // React app URL
      methods: ["GET", "POST"]
    }
  });

  io.on('connection', (socket) => {
    console.log('New client connected');

    socket.on('message', message => {
      io.to(message.groupid).emit('message', message);
    });

    socket.on('joinRoom', ({ groupid, name, groupName }) => {
      socket.join(groupid);
      io.to(groupid).emit('join', name);
      console.log(`User ${name} joined room: ${groupName}`);
    });


    socket.on('disconnect', () => {
      console.log('Client disconnected');
    });
  });
}

module.exports = createIo