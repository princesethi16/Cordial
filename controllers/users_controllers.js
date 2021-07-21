// controller callback functions for the users
const Post = require('../models/postSchema');
const User = require('../models/userSchema');


// this is callback function used by users route file
module.exports.feed = async (req,res)=>{
    // to get the user of post created, we use the ref to user in post schema
    // to get the whole user info we have to just use the populate function
    // and callback function is called by exec function
    try{
        let user = req.user;
        let posts = await Post.find({})
        .populate('user')
        .populate(
            {
                path: 'comments', // populate each comment in comments array
                populate: // populate each specified field of comment
                {
                    path: 'user'// populate user field of comment
                }
            }
        );
    
        let users = await User.find({});
        
        console.log(res.locals.flash);

        return res.render('feed',{
            title: 'Feed',
            posts: posts,
            currUser: user,
            all_users: users
        });
    }
    catch(err){
        console.log('error in showing the feed:',err);
    }

};

module.exports.destroySession = (req,res)=>{
    req.logOut();
    req.flash('success','Logged out!')
    return res.redirect('/authentication/sign-in');
}
