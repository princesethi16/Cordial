const mongoose = require('mongoose');

const cookieSchema = new mongoose.Schema({
    user_id: {
        type: String
    }
});

const Cookie = mongoose.model('Cookies', cookieSchema);

module.exports = Cookie;