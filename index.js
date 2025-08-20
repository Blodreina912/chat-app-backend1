// index.js
const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');

// Load environment variables from Replit Secrets
dotenv.config();

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST'],
  },
});

// Connect to the database
connectDB();

// Middleware
app.use(express.json());
app.use(cors());

// Define Routes
app.use('/auth', require('./routes/auth'));
app.use('/messages', require('./routes/messages'));
app.get('/', (req, res) => {
  res.send('API Running');
});

// Socket.IO connection handling
io.on('connection', (socket) => {
  console.log(`User connected: ${socket.id}`);

  // This is where we'll add the real-time chat logic later
  // Example:
  // socket.on('typing:start', ...);
  // socket.on('message:send', ...);

  socket.on('disconnect', () => {
    console.log(`User disconnected: ${socket.id}`);
  });
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});