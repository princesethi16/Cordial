const Post = require('../models/postSchema');

module.exports.newPost = (req,res)=>{
    Post.create({
        content: req.body.content,
        user: req.user._id
    },function(err,post){
        if(err){
            console.log("error in creating the post:", error);
            return;
        }
        return res.redirect('back');
    });
}