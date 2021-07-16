// controller for the sign in and sign up pages

const Cookie = require('../models/cookieSchema');

// this is callback function used by signInUp route file
module.exports.signIn = (req, res) => {
    // check if user is already logged in by searching the req cookie in db
    Cookie.findOne({ user_id: req.cookies.user_id }, (err, userFound) => {
        if (err) { console.log('error in finding cookie in db during sign in req', err); return; }
        else if (userFound) {
            return res.redirect('/users/feed');
        }
        else if (!userFound) {
            return res.render('sign_in', {
                title: "Sign In"
            });
        }
    });
};
module.exports.signUp = (req, res) => {
    return res.render('sign_up', {
        title: "Sign Up"
    });
};