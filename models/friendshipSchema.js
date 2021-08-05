// Creating the friendship Model on friendship day...!! how cool, right!
const mongoose = require('mongoose');

const friendshipSchema = new mongoose.Schema({
    from_user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    to_user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    chat: [
        {
            content: {
                type: String,
                required: true
            },
            sender: {
                type: String,
                required: true
            }

        }
    ]
},{
    timestamps: true
});

const Friendship = mongoose.model('Friendship',friendshipSchema);

module.exports = Friendship;