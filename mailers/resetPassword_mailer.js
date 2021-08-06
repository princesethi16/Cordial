const nodemailer = require('../config/nodemailer');
const env = require('../config/environment');
exports.ResetPasswordLink = (user,accessToken)=>{
    let data = {
        user: user,
        accessToken: accessToken
    }
    let htmlString = nodemailer.renderTemplate(data,'/resetpassword/forgotPassword.ejs')

    nodemailer.transporter.sendMail({
        from: env.cordial_mailer_email_id,
        to: user.email,
        subject: 'Link for resetting the password',
        html: htmlString
    },(err,info)=>{
        if(err){console.log('error in mailing for resetting the password',err); return;}

    });
}