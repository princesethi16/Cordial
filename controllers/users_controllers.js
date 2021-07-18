// controller callback functions for the users
const Post = require('../models/postSchema');
const User = require('../models/userSchema');


// this is callback function used by users route file
module.exports.feed = (req,res)=>{
    // to get the user of post created, we use the ref to user in post schema
    // to get the whole user info we have to just use the populate function
    // and callback function is called by exec function
    Post.find({}).populate('user').exec((err,posts)=>{
        if(err){
            console.log('error in finding posts in db',err);
            return;
        }
        return res.render('feed',{
            title: 'Feed',
            posts: posts
        });
    });

};

module.exports.destroySession = (req,res)=>{
    req.logOut();
    return res.redirect('/authentication/sign-in');
}
