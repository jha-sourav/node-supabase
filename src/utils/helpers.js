const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

function formatZodError(error) {
    return Object.fromEntries(
        error.issues.map(e => [e.path[0], e.message])
    );
}

function generateToken(payload) {
    return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });
}

async function hashPassword(password) {
    return await bcrypt.hash(password, 10);
}

module.exports = { formatZodError, generateToken, hashPassword };