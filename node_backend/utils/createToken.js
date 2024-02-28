const jwt = require('jsonwebtoken')

const createToken = (data) => {
    const token = jwt.sign(data, process.env.secretKey, {
        expiresIn: 31556926,
    });

    return token;
}

module.exports = {
    createToken,
}