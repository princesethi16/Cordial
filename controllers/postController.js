const Like = require('../models/likeSchema');
const Post = require('../models/postSchema');
const Comment = require('../models/commentsSchema');

const User = require('../models/userSchema');
const commentsMailer = require('../mailers/comments_mailer');
const queue = require('../config/kue');
const emailsWorker = require('../workers/comment_email_worker');

const path = require('path');
const fs = require('fs');

module.exports.newPost = (req,res)=>{
    let userId = req.user._id;
    console.log(req.file);
    console.log(req.body);

        Post.uploadedPostImages(req,res,function(err){
            if(err){console.log('********Multer error:',err); return; }
        
            console.log(Post.ImagePath);
            Post.create({
                content: req.body.content,
                user: userId
            },function(err,post){
                if(err){
                    console.log("error in creating the post:", error);
                    return;
                }

            if(req.file){
                // path of uploaded image should be stored in post's db
                post.images = Post.ImagePath + '/' + req.file.filename;
            }

            post.save();
        

    

            if(req.xhr){
                return res.status(200).json({
                    post: post,
                    user: req.user,
                    message: "New post created",

                });
            }



            return res.redirect('back');

            })
    });
}

module.exports.deletePost = (req,res)=>{
    let postId = req.params.id;

    Post.findById(postId,(err,post)=>{
        if(post){

            // delete the likes associated with the comments when a post is deleted
            Like.deleteMany({likeable: {$in: post.comments}},(err)=>{
                if(err){console.log('err in deleting the comment like while post deletion:',err); return;}
            });

            // delete comments related to post in the db
            Comment.deleteMany({post: post._id},(err)=>{
                if(err){console.log('error in deleting comments of post:',err); return;}
            });

            Like.deleteMany({likeable: post._id ,onModel: 'Post'},(err)=>{
                
                if(err){console.log('error in deleting likes of post:',err); return;}

            });


            Post.deleteOne({_id: post._id},(err)=>{
                if(err){console.log('error in deleting post:',err); return;}
            });

            // delete the pic related to the post
            if(post.images)
                {
                    fs.unlinkSync(path.join(__dirname,'..',post.images));
                }

            if(req.xhr){
                return res.status(200).json({
                    post_id: postId,
                    message: "Post Deleted"
                })
            }

            return res.redirect('back');
        }
    });
}


module.exports.newComment = async (req,res)=>{
    let postId = req.query.post;
    let commentContent = req.body.newComment;
    // create new comment in db
    
    try{
        let post = await Post.findById(postId);
            
        if(post){
            let comment = await Comment.create({
                content: commentContent,
                post: postId,
                user: req.user._id
            });

            post.comments.push(comment._id);
            post.save();

            post = await post.populate('user','name email').execPopulate();
            comment = await comment.populate('user','name email').execPopulate();
            // commentsMailer.newComment(post,comment); when doing without Kue.js
            if(req.user.id != post.user.id){
                let job = queue.create('emails',{comment: comment, post: post}).save(function(err){
                    if(err){console.log('error in creating the job of sending mail when new comment is posted',err);return;}
                    else{
                        console.log('job enqueued!',job.id);
                    }
                });
            }

            if(req.xhr){
                return res.status(200).json({
                    comment: comment,
                    user: req.user,
                    message: "New comment!",
                    post: post
    
                });
            }

            return res.redirect('back');

        }

        else{
            return res.redirect('back');
        }
        
        

    }catch(err){
        console.log('err in creating the new comment:',err)
        return res.redirect('back');
    }
    
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
            
            //3. delete the associated likes
            Like.deleteMany({
                likeable: comment._id,
                onModel: 'Comment'
            },(err)=>{
                if(err){console.log('err in deleting the like of comment',err); return;}
            });

            // 4. delete that comment from the comment collection
            comment.remove();
        
            if(req.xhr){
                return res.status(200).json({
                    comment: comment,
                    post: post,
                    message: "Comment Deleted!"
                })
            }
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


