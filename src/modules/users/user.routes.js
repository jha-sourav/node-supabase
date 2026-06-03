const express = require('express');
const router = express.Router();
const UserController = require('./user.controller');

router.get('/', (req, res) => UserController.getAll(req, res));
router.get('/:id', (req, res) => UserController.getUserById(req, res));
router.post('/save', (req, res) => UserController.saveUser(req, res));
router.put('/:id', (req, res) => UserController.updateUser(req, res));
router.delete('/:id', (req, res) => UserController.deleteUser(req, res));

module.exports = router;