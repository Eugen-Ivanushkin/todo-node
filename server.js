const express = require('express');
const router = require('./src/api');
const cors = require('cors');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');

const { Server } = require('socket.io');
const Http = require('http');

const app = express();
const http = Http.createServer(app);
const io = new Server(http, {
  cors: {
    origin: 'http://localhost:8080',
  },
});

io.on('connect', (socket) => {
  const userId = jwt.verify(socket.handshake.auth.token, 'secret').userId;
  socket.join(userId);

  socket.on('ADD_TODO', (task, token) => {
    const userId = jwt.verify(token, 'secret').userId;
    socket.to(userId).emit('TODO_ADDED', task);
  });
  socket.on('UPDATE_TODO', (task, token) => {
    const userId = jwt.verify(token, 'secret').userId;
    socket.to(`${userId}`).emit('TODO_UPDATED', task);
  });
  socket.on('DELETE_TODO', (task, token) => {
    const userId = jwt.verify(token, 'secret').userId;
    socket.to(userId).emit('TODO_DELETED', task);
  });
  socket.on('CLEAR_TODOS', (task, token) => {
    const userId = jwt.verify(token, 'secret').userId;
    socket.to(userId).emit('TODO_CLEARED', task);
  });
  socket.on('SORT_TODOS', (task, token) => {
    const userId = jwt.verify(token, 'secret').userId;
    socket.to(userId).emit('TODOS_SORTED', task);
  });
});

//"mongodb+srv://Admin:1q2w3e4r@cluster0.xnew2.mongodb.net/todos"
mongoose.connect('mongodb://localhost:27017/test', (err, res) => {
  if (err) {
    console.log(err);
  }

  http.listen(5000, function () {
    console.log('Server running in port 5000');
  });
});
app.use(
  cors({
    origin: 'http://localhost:8080',
  })
);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(router);
