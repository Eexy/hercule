import { createServer } from 'http';
import { Server, Socket } from 'socket.io';

/* 
  clients: event - new message
  server: share that event to the room (base on channelId)
  recipients: if in the room get the event
    - call the api to get the last message
*/

const httpServer = createServer();
const io = new Server(httpServer, {
  cors: {
    origin: 'http://localhost:3000',
  },
});

io.on('connection', (socket: Socket) => {
  socket.on('new message', ({to}) => {
    socket.to(to).emit('new message');
  });

  socket.on('join room', ({room}) => {
    socket.join(room);
  })
});

httpServer.listen(5000, () => {
  console.log('listening port 5000');
});
