const queue = require('../config/kue');

const commentsMailer = require('../mailers/comments_mailer');

const likesMailer = require('../mailers/likesMailer');

queue.process('emails',function(job,done){
    console.log('emails worker is processing a job!',job.data);

    let keys = Object.keys(job.data);

    console.log(keys);

    if(keys[0] == 'comment'){
        commentsMailer.newComment(job.data.post,job.data.comment);
    }
    else if(keys[0] == 'like'){
        likesMailer.newLike(job.data.post,job.data.like);
    }

    done();
});