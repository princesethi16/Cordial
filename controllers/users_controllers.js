// controller callback functions for the users
const Post = require('../models/postSchema');
const User = require('../models/userSchema');


// this is callback function used by users route file
module.exports.feed = (req,res)=>{
    // to get the user of post created, we use the ref to user in post schema
    // to get the whole user info we have to just use the populate function
    // and callback function is called by exec function
    let user = req.user;
    Post.find({})
    .populate('user')
    .populate(
        {
            path: 'comments', // populate each comment in comments array
            populate: // populate each specified field of comment
            {
                path: 'user'// populate user field of comment
            }
        }
    )
    .exec((err,posts)=>{
        if(err){
            console.log('error in finding posts in db',err);
            return;
        }
        User.find({},(err,users)=>{
            return res.render('feed',{
                title: 'Feed',
                posts: posts,
                currUser: user,
                all_users: users
            });
        });
    });

};

module.exports.destroySession = (req,res)=>{
    req.logOut();
    return res.redirect('/authentication/sign-in');
}
