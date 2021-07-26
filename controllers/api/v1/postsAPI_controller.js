// controller callback functions for the users
const Post = require('../../../models/postSchema');
const Comment = require('../../../models/commentsSchema');


module.exports.index = async function (req,res){

    let user = req.user;
        let posts = await Post.find({})
        .populate('user')
        .populate(
            {
                path: 'comments', // populate each comment in comments array
                populate: // populate each specified field of comment
                {
                    path: 'user',// populate user field of comment
                    
                }
            }
        );

            // *** to exclude the password from showing in api response 
            // we add a field in User schema in password => {select: false}


    return res.json(200,{
        message: 'Posts API',
        posts: posts
    });
}

module.exports.deletePostAPI = async (req,res)=>{
    let postId = req.params.postId;
    console.log(req.user);

    try{
        let post = await Post.findById(postId);

        if(post.user == req.user.id){
            
            if(post){
        
                // delete comments related to post in the db
                Comment.deleteMany({post: post._id},(err)=>{
                    if(err){console.log('error in deleting comments of post:',err); return;}
                });


                Post.deleteOne({_id: post._id},(err)=>{
                    if(err){
                        return res.json(500,{
                            data: {
                                message: `Error in deleting the post: ${err}`
                            }
                        });
                    }
                });

                return res.json(200,{
                        data:{
                            message: 'Post deleted!',
                        }
                    });
            }
        }
        else{
            return res.json(401,{
                data: {
                    message: 'Sorry! But you cannot delete the requested post.'
                }
            })
        }
    }catch(err){
        return res.json(500,{
            data: {
                message: `Error in deleting the post: ${err}`
            }
        });
    }

}