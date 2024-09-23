import express from 'express';
import { createServer } from 'node:http';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
import { Server } from 'socket.io';
import cors from 'cors'
const app = express();
app.use(cors())
const server = createServer(app);
const io = new Server(server, {
cors: {
    origin:'http://localhost:5173'
}
});

const __dirname = dirname(fileURLToPath(import.meta.url));

app.get('/', (req, res) => {
  res.sendFile(join(__dirname, 'index.html'));
});
// app.use(cors)
io.on('connection', (socket) => {
  console.log('a user connected');
  let i = 0
  setInterval(() => {
    socket.emit('plane', {
        lat: Math.random() * 10,
        lng: Math.random() * 10,
        id: i++
    })
  }, 1000)
});

server.listen(3001, () => {
  console.log('server running at http://localhost:3001');
});