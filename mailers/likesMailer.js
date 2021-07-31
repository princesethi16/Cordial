const nodemailer = require('../config/nodemailer');

// this is another way of exporting the methods
exports.newLike = (post,like) => {

    console.log(like,post);


    let data = {
        post: post,
        like: like
    }

    let htmlString = nodemailer.renderTemplate(data,'/likes/likesMailer.ejs')

    nodemailer.transporter.sendMail({
        from: 'sethiprince007@gmail.com',
        to: post.user.email,
        subject: `${like.user.name} liked Your Post`,
        html: htmlString
    },(err,info)=>{
        if(err){console.log('error in mailing for new like',err); return;}

    });
}