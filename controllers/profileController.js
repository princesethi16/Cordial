// callback function for the posts
const User = require('../models/userSchema');
const fs = require('fs');
const path = require('path');

module.exports.profile = (req,res)=>{
    let userId = req.params.user;
    User.findOne({_id: userId},(err,foundUser)=>{
        return res.render('profile',{
            title: "Profile",
            currUser: foundUser
        });

    });
};

module.exports.editProfile = async (req,res)=>{
    let userId = req.params.user;
    if(req.user.id == userId){
        try{
            let user = await User.findById(userId);
        
        // since enctpe is multiformat hence req.body can only be parsed by the multer
        User.uploadedAvatar(req,res,function(err){
            if(err){console.log('********Multer error:',err); return; }
            let userName = req.body.name;
            let userEmail = req.body.email;

            user.name = userName;
            user.email = userEmail;
            if(req.file){

                // if user's avatar is already present then remove the existing and then save new
                if(user.avatar && fs.existsSync(path.join(__dirname,'..',user.avatar)))
                fs.unlinkSync(path.join(__dirname,'..',user.avatar));

                // path of uploaded image should be stored in user's db
                user.avatar = User.AvatarPath + '/' + req.file.filename;
            }
            user.save();
            return res.redirect('back');
            
        });

        }catch(err){
            console.log('error in editing the user profile',err);
            return res.redirect('back');
        }

    }
    else{
        return res.redirect('back');
    }
};

