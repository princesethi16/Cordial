const nodemailer = require('../config/nodemailer');

// this is another way of exporting the methods
exports.newComment = (post,comment) => {

    let data = {
        post: post,
        comment: comment
    }

    let htmlString = nodemailer.renderTemplate(data,'/comments/newComment.ejs')

    nodemailer.transporter.sendMail({
        from: 'sethiprince007@gmail.com',
        to: post.user.email,
        subject: 'New Comment Posted',
        html: htmlString
    },(err,info)=>{
        if(err){console.log('error in mailing for new comment',err); return;}
    
        console.log('Message Sent',info);
    });
}