const nodemailer = require('../config/nodemailer');
const env = require('../config/environment');
// this is another way of exporting the methods
exports.newComment = (post,comment) => {

    let data = {
        post: post,
        comment: comment
    }

    let htmlString = nodemailer.renderTemplate(data,'/comments/newComment.ejs')
    env.cordial_mailer_email_id
    nodemailer.transporter.sendMail({
        from: env.cordial_mailer_email_id,
        to: post.user.email,
        subject: 'New Comment Posted',
        html: htmlString
    },(err,info)=>{
        if(err){console.log('error in mailing for new comment',err); return;}

    });
}

