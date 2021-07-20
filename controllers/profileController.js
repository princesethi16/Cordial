// callback function for the posts
const User = require('../models/userSchema');

module.exports.profile = (req,res)=>{
    let userId = req.params.user;
    User.findOne({_id: userId},(err,foundUser)=>{
        return res.render('profile',{
            title: "Profile",
            currUser: foundUser
        });

    });
};

module.exports.editProfile = (req,res)=>{
    let userId = req.params.user;
    if(req.user.id == userId){
        let userName = req.body.name;
        let userEmail = req.body.email;
        
        User.findByIdAndUpdate(userId,{
            name: userName,
            email: userEmail
        },(err,user)=>{
            return res.redirect('back');
        });

    }
    else{
        return res.redirect('back');
    }
};