// callback function for the posts
const User = require('../models/userSchema');

module.exports.profile = (req,res)=>{
    let userEmail = req.params.user;
    User.findOne({email: userEmail},(err,foundUser)=>{
        return res.render('profile',{
            title: "Profile",
            currUser: foundUser
        });

    });
};