const mongoose = require('mongoose');
const multer = require('multer');
const path = require('path');
const Avatar_Path = path.join('/uploads/users/avatars');

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    avatar: {
        type: String
    }
}, {
    timestamps: true
});

let storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.join(__dirname,'..',Avatar_Path));
    },
    filename: function (req, file, cb) {
      cb(null, file.fieldname + '-' + Date.now())
    }
});

// static functions
userSchema.statics.uploadedAvatar = multer({storage: storage}).single('avatar');
userSchema.statics.AvatarPath = Avatar_Path;

const User = mongoose.model('User', userSchema);

module.exports = User;