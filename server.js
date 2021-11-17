const express = require('express');
const router = require('./src/api');
const cors = require('cors');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

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
  console.log(socket.id);

  socket.join('room #1');

  socket.on('ADD_TODO', (task) => {
    console.log('task', task);
    socket.to('room #1').emit('TODO_ADDED', task);
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
