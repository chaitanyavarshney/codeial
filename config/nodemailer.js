const nodemailer = require("nodemailer");
const ejs = require('ejs');
const { relative } = require("path");
constPath = require('path');

let transporter = nodemailer.createTransport({
    service: "gmail",
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
        user: 'codialdev',
        pass: 'A@b123456@'
    }
});

let renderTemplate = (data, realativePath) =>{
    let mailHTML;
    ejs.renderFile(
        path.join(__dirname, '../views/mailers', realativePath),
        data,
        function(err, template){
            if(err){console.log('error in rendering template'); return}

            mailHTML= template;
        }
    )
    return mailHTML;
}

module.exports = {
    transporter: transporter,
    renderTemplate: renderTemplate
}
