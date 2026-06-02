const express = require('express');
const router = express.Router();

const AuthController = require('../controllers/AuthController');
const isLoggedInMiddleware = require('../middlewares/isLoggedInMiddleware');
// console.log(AuthController);

router.post('/register',isLoggedInMiddleware, (req, res) => AuthController.register(req, res));
router.post('/login',isLoggedInMiddleware, (req, res) => AuthController.login(req, res));

module.exports = router;