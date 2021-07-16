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

module.exports = passport;

