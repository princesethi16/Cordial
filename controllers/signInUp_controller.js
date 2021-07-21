// controller for the sign in and sign up pages and creating sessions and new accounts

const UserDb = require('../models/userSchema');

// this is callback function used by signInUp route file
module.exports.signIn = (req,res)=>{
    
    return res.render('sign_in',{
        title: "Sign In"
    });
};
module.exports.signUp = (req,res)=>{
    return res.render('sign_up',{
        title: "Sign Up"
    });
};

// create new account of user
module.exports.create = async (req,res)=>{
    var userDetails = req.body;

    try{
        let user = await UserDb.findOne({email: userDetails.email });

        if(!user){
            console.log(req.body);
            UserDb.create(userDetails,(err,user)=>{
                return res.redirect('/authentication/sign-in')
            });
        }
        else{
            return res.redirect('back');
        }
    }
    catch(err){
        console.log("error in finding the user in signing up;", error);
        return res.redirect('back');
    }
};

// create new session for existing user (from sign in page to createSession to feed)
module.exports.createSession = (req,res)=>{
    req.flash('success','Logged in Successfully!');
    return res.redirect('/users/feed');
};
