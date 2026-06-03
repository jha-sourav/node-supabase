const express = require('express');
const router = express.Router();

const AuthController = require('./auth.controller');
const isLoggedInMiddleware = require('../../middlewares/isLoggedInMiddleware');

router.use(isLoggedInMiddleware);
router.post('/register', (req, res) => AuthController.register(req, res));
router.post('/login', (req, res) => AuthController.login(req, res));

module.exports = router;