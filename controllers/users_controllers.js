// controller callback functions for the users

const UserDb = require('../models/userSchema');

// this is callback function used by users route file
module.exports.profile = (req,res)=>{
    return res.render('profile',{
        title: "Profile"
    });
};

// create new account of user
module.exports.create = (req,res)=>{
    var userDetails = req.body;
    UserDb.findOne({email: userDetails.email },(err,user)=>{
        if(err){console.log("error in finding the user in signing up;", error); return;}
        
        if(!user){
            UserDb.create(userDetails,(err,user)=>{
                if(err){console.log("error in creating user during sign up:",err); return;}
                return res.redirect('/authentication/sign-in')
            });
        }

        else{
            return res.redirect('back');
        }

    });

    // create route later
};

// create new session for existing user
module.exports.createSession = (req,res)=>{
    // to do later :=> logic
    // create route later
};
