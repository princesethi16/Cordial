const passport = require('passport');
const googleStrategy = require('passport-google-oauth').OAuth2Strategy;

const crypto = require('crypto');
const User = require('../models/userSchema');

const env = require('./environment');

passport.use(new googleStrategy({
    clientID: env.google_clientID,
    clientSecret: env.google_clientSecret,
    callbackURL: env.google_callbackURL
    },
    function(accessToken,refreshToken,profile,done){

        console.log(profile);

        User.findOne({email: profile.emails[0].value}).exec(function(err,user){
            if(err){console.log('error in google-strategy-passport',err); return;}

            if(user){
                return done(null,user);
            }
            else{
                User.create({
                    email: profile.emails[0].value,
                    name: profile.displayName,
                    password: crypto.randomBytes(20).toString('hex')
                },function(err,user){
                    if(err){console.log('error in creating user using google-strategy-passport',err); return;}
                    return done(null,user);
                });
            }
        });
    }
));

module.exports = passport;