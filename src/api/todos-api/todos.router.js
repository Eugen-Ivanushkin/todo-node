const router = require('express').Router();
const { jwtVerify } = require('../middleware/auth');

const {
  addTask,
  getTasks,
  deleteTask,
  deleteAllCompleted,
  updateTask,
} = require('./todos.controler');

const { signIn, signUp, updateTokens } = require('./auth.controler');

//todos
router.post('/todos', jwtVerify, addTask);
router.get('/todos', jwtVerify, getTasks);
router.delete('/todos/:id', jwtVerify, deleteTask);
router.delete('/todos', jwtVerify, deleteAllCompleted);
router.put('/todos/:id', jwtVerify, updateTask);

//users
router.post('/users/login', signIn);
router.post('/users/register', signUp);
router.post('/users/update', updateTokens);

module.exports = router;
