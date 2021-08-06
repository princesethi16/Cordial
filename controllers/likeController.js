const Like = require('../models/likeSchema');
const Post = require('../models/postSchema');
const Comment = require('../models/commentsSchema');
const commentsMailer = require('../mailers/comments_mailer');
const queue = require('../config/kue');
const emailsWorker = require('../workers/comment_email_worker');

module.exports.toggleLike = async (req,res)=>{
    let likeableId = req.query.likeable;
    let type = req.query.type;
    let user = req.user._id;
    let deleted = false;
    try{
        // first find the parent post or comment
        let likeable;

        if(type == 'Post'){
            likeable = await Post.findById(likeableId);
        }
        else{
            likeable = await Comment.findById(likeableId);
        }
        
        // if likeable exist then do something
        if(likeable){

            // find the like of user*** for toggling like
            
            let like = await Like.findOne({
                user: user,
                likeable: likeable.id,
                onModel: type
            });

            if(like){
                // remove like and set deleted to true
                likeable.likes.pull(like._id);
                likeable.save();
                like.remove();
                deleted = true;
            }
            else{
                // add like
                let like = await Like.create({
                    user: user,
                    likeable: likeableId,
                    onModel: type
                });
                
    
                likeable.likes.push(like._id);
                likeable.save();
                
                // send the mail only when like is posted for the post
                if(type == 'Post'){
                    likeable = await likeable.populate('user','name email').execPopulate();
                    like = await like.populate('user','name email').execPopulate();
                    if(req.user.id != likeable.user.id){
                        let job = queue.create('emails',{like: like, post: likeable}).save(function(err){
                            if(err){console.log('error in creating the job of sending mail when new like is posted',err);return;}
                            else{
                                console.log('job enqueued!',job.id);
                            }
                        });
                    }
                }
            }
            
            return res.status(200).json({
                message: 'Like Posted',
                deleted: deleted,
                likeable: likeable
                
            });
        
        }
        
        

    }
    catch(err){
        console.log('error in creating the like or updating likes array of post:',err);
        return res.status(500).json({
            message: `Error in toggling the like: ${err}`
        });
    }
};
