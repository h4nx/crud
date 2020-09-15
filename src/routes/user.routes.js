const express = require('express')
const router = express.Router()
const userController = require('../controllers/user.controllers');

// Return all users
router.get('/users/', userController.findAll);

// Return a single user with id
router.get('/user/:id', userController.findOne);

// Create
router.post('/user/', userController.create);

// Update
router.put('/user/:id', userController.update);

// Delete
router.delete('/user/:id', userController.delete);

module.exports = router