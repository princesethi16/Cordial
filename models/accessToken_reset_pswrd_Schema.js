const mongoose = require('mongoose');
const User = require('./userSchema');

const accessTokenSchema = new mongoose.Schema({
    // this access token belongs to which user
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    // for validating the request of user to change password
    accessToken: {
        type: String,
        required: true
    },
    isValid: {
        type: Boolean,
        required: true
    }
},{
    timestamps: true
});

const AccessToken = mongoose.model('AccessToken',accessTokenSchema);

module.exports = AccessToken;