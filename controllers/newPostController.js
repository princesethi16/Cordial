const Post = require('../models/postSchema');
const Comment = require('../models/commentsSchema');


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

module.exports.newComment = (req,res)=>{
    let postId = req.query.post;
    let commentContent = req.body.newComment;
    // create new comment in db
    
    Post.findById(postId, (err,post)=>{
        if(err){console.log('error in finding post for the comment posting:',err); return;}
        
        if(post){
            Comment.create({
                content: commentContent,
                post: postId,
                user: req.user._id
            },(err,comment)=>{
                if(err){console.log('error in posting the comment:',err); return;}

                post.comments.push(comment._id);
                post.save();
                return res.redirect('back');
            });

        }
    
    });
    
    
    
    
    
    
    
    
    
    
    
    
    /*
    
    Comment.create({
        content: commentContent,
        post: postId,
        user: req.user._id
    },(err,comment)=>{
        // take the id of created comment and update the commentId array of relevant post
        if(err){console.log('error in posting new comment:',err); return;}

        Post.findById(postId ,(err,foundPost)=>{
            let commentArr = foundPost.comments;
            commentArr.push(comment._id);
            Post.updateOne({_id: postId }, { comments: });
            return res.redirect('back');
            
        });

    });

    */


}
