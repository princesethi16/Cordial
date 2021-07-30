// for resetting the password if forgotten
const UserDb = require('../models/userSchema');
const AccessToken = require('../models/accessToken_reset_pswrd_Schema');
const crypto = require('crypto');
const resetPasswordMailer = require('../mailers/resetPassword_mailer');

module.exports.forgotpassword = (req,res)=>{
    return res.render('reset_password/forgot_password',{
        title: "Forgot Password"
    })
};

module.exports.create_token = async (req,res)=>{
    let email = req.query.email;
    try{
        let user = await UserDb.findOne({email: email});
        //user is found***

        if(user){
            //create the access token
            let access_token = crypto.randomBytes(43).toString('hex');
            // create the document in db for this session
            AccessToken.create({
                accessToken: access_token,
                user: user._id,
                isValid: true
            });
            // send the access to gmail along with the link to reset the password
            resetPasswordMailer.ResetPasswordLink(user,access_token);
            // go to page to reset the password
            return res.redirect('/users/sign-in');
        }
        else{
            req.flash('error','Sorry! User not found.');
            return res.redirect('back');

        }
    }catch(err){
        console.log('error in creating the access token or mailing the reset link to user!!!');
    }
};

module.exports.setNewPasswordPage = async (req,res)=>{
    let token = req.query.access_token;

    // find the accessToken whether it exist
    let accessToken = await AccessToken.findOne({accessToken: token});

    // validate the access token
    if(accessToken){
        return res.render('reset_password/forgot_reset_password',{
            title: 'Reset Password',
            accessToken: accessToken.accessToken
        });
    }
    else{

        return res.redirect('/users/sign-in');
    }
};

module.exports.setNewPassword = async (req,res)=>{
    let token = req.query.access_token;
    console.log(token);

    // find the accessToken whether it exist
    let accessToken = await AccessToken.findOne({accessToken: token});
    console.log(accessToken)

    let pass = req.body.password;
    let rePass = req.body.retypePassword;
    if(pass != rePass){
        req.flash('error','Both Passwords are different!');
        return res.redirect('back');
    }

    // validate the access token
    if(accessToken){

        console.log('accessToken found',accessToken.user);

        //find user by accessToken
        let user = await UserDb.findByIdAndUpdate(accessToken.user, {password: pass});

        //delete access token
        accessToken.remove();

        return res.redirect('/users/sign-in');
    }
    else{
        req.flash('error','sorry invalid request')
        return res.redirect('/users/sign-in');
    }

};