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

module.exports.deletePost = (req,res)=>{
    let postId = req.params.id;
    Post.findById(postId,(err,post)=>{
        if(post){
            // delete comments related to post in the db
            Comment.deleteMany({post: post._id},(err)=>{
                if(err){console.log('error in deleting comments of post:',err); return;}
            });


            Post.deleteOne({_id: post._id},(err)=>{
                if(err){console.log('error in deleting post:',err); return;}
            });

            return res.redirect('back');
        }
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

        else{
            return res.redirect('back');
        }
    
    });
    
}
    

module.exports.deleteComment = async (req,res)=>{
    // 1. find if requested comment even exist or not 
    let commentId = req.params.commentId
    let postId = req.params.postId
    let comment = await Comment.findById(commentId);
    
    // comment found
    if(comment){
        // find the post whose comment it is to delete its id
        let post = await Post.findById(postId);
        
        if(req.user.id == comment.user || req.user.id == post.user){
            // 2. delete the id of this comment from the post ref array of comment id's
            post.comments.pull({_id: commentId});
            post.save();
            
            // 3. delete that comment from the comment collection
            comment.remove();
        }

    }
    
    return res.redirect('back');
    
}
    
    
    
    
    
    
    
    
    
    
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


