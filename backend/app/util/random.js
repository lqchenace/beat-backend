const crypto = require('crypto');

const getRandomString = (len = 16) => {
    const buf = crypto.randomBytes(len);
    return buf.toString('hex');
}

module.exports = {
    getRandomString
}