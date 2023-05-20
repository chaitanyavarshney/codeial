const nodeMailer =  require('../config/nodemailer');
const Comment = require('../models/comment')

// this is another way of exporting a method
exports.newComment = (email,link) =>{
    
    nodeMailer.transporter.sendMail({
        from: 'codialdev@gmail.com',
        to: email,
        subject: "Reset Link",
        html: link
    },(err,  info)=>{
        if(err){
            console.log('Error in sending mail', err);
            return;
        }
        // console.log('Message sent', info);
        return;
    });
}