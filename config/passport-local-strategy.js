const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const User = require('../models/userSchema');

// 1. function to authenticate the user already registered by matching email and password
passport.use(new LocalStrategy(
    {
        usernameField: 'email', // email to act as username
    },
    function(email,password,done){
        // find the user and establish the identity
        User.findOne({email: email},(err,foundUser)=>{
            if(err){
                console.log("error in finding user --> Passport:",err);
                return done(err);
            }
            else if(!foundUser || foundUser.password != password){
                console.log('Invalid username/password');
                return done(null,false);
            }

            else{
                return done(null,foundUser);
            }

        });
    }
));

//2. serializing function to take the specified field of user and encrypt it to make cookie to send to browser
passport.serializeUser((user,done)=>{
    done(null,user.id);
});

//3. deserializing function so that when browser sends back cookie to authenticate, it can decode the cookie and match the decrypted id with the user.id in database
passport.deserializeUser((id,done)=>{
    User.findById(id,(err,foundUser)=>{
        if(err){
            console.log("error in finding user --> Passport:",err);
            return done(err);
        }
        else{
            return done(null,foundUser);
        }

    });
});

// check if the user is authenticated or not
passport.checkAuthentication = (req,res,next)=>{
    if(req.isAuthenticated()){
        return next();
    }
    // if the user is not authenticated redirect user to the sign in page
    return res.redirect('/authentication/sign-in');
}
//*******************For home and sign in/ sign up page************************* */
// if user is authenticated then redirect them to profile page rather than the default
passport.stopDefaultIfAuthentcated = (req,res,next)=>{
    if(!req.isAuthenticated()){
        // if user is not authenticated then let them access the home/sign-in/up page
        return next();
    }
    else{
        return res.redirect('/users/feed');
    }
}

passport.setAuthenticatedUser = (req,res,next)=>{
    if(req.isAuthenticated()){
        // req.user contain the current sign in user from the session cookie created by passport and we are just sending this to the locals for the info of user to be passed on to the views
        res.locals.user = req.user;
    }
    return next();
}


module.exports = passport;

