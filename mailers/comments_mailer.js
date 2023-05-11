const nodeMailer =  require('../config/nodemailer');
const Comment = require('../models/comment')

// this is another way of exporting a method
exports.newComment = (comment,email) =>{
    let htmlString = nodeMailer.renderTemplate({comment: comment} , '/comments/new_comment.ejs');
    nodeMailer.transporter.sendMail({
        from: 'codialdev@gmail.com',
        to: email,
        subject: "New Comment published",
        html: htmlString
    },(err,  info)=>{
        if(err){
            console.log('Error in sending mail', err);
            return;
        }
        // console.log('Message sent', info);
        return;
    });
}