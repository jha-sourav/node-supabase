const express = require('express');
const router = express.Router();

const authMiddleware = require('../middlewares/authMiddleware');
const authRoutes = require('../modules/auth/auth.routes');
const userRouters = require('../modules/users/user.routes');

router.use('/auth', authRoutes);

router.use(authMiddleware);
router.use('/users', userRouters);

module.exports = router;