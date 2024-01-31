const jwt = require('jsonwebtoken')

const createToken = (data) => {
    const token = jwt.sign(data, process.env.secretKey, {
        expiresIn: 24 * 24,
    });

    return token;
}

module.exports = {
    createToken,
}