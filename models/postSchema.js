const mongoose = require('mongoose');
const User = require('./userSchema');
const multer = require('multer');
const path = require('path');
const Image_Path = path.join('/uploads/posts/images');

const postSchema = new mongoose.Schema({
    content: {
        type: String,
        required: true
    },
    images: {
        type: String
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    // include the array of id's of comments which belong to this post to fetch only that comments
    comments: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Comment'
        }
    ],
    likes: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Like'
        }
    ]
    
},{
    timestamps: true
});

let storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.join(__dirname,'..',Image_Path));
    },
    filename: function (req, file, cb) {
      cb(null, file.fieldname + '-' + Date.now())
    }
});

// static functions
postSchema.statics.uploadedPostImages = multer({storage: storage}).single('image');
postSchema.statics.ImagePath = Image_Path;


const Post = mongoose.model('Post',postSchema);

module.exports = Post;