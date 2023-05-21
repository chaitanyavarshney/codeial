const Comment = require('../models/comment');
const Post = require('../models/post')
const User = require('../models/user')
const resetMailer =  require('../mailers/reset_mailer');
const queue =  require('../config/kue');
const commentEmailWorker = require('../workers/comment_email_worker');
const jwt =  require('jsonwebtoken');

module.exports.renderPage = function(req,res){
    return res.render('forgot_pass',{
        title: 'pass'
    } );
    
}
const JWT_SECRET  = 'change is the key'
 
module.exports.passnew = function(req,res){
    const email = req.body;
    User.findOne({email: req.body.email}, function(err, user){

        // console.log(err)
        try{
            if (user){
                // console.log('ok')
                secret = JWT_SECRET + user.password
                const payload = {
                    email: user.email,
                    id: user.id

                }
                const token = jwt.sign(payload,secret, {expiresIn: '15m'})
                const link  = `http://localhost:9000/users/reset-password/${user.email}/${token}`
                
                resetMailer.newComment(user.email,link); 
                res.send("RESET LINK SENT TO EMAIL")
                }
            else{
                console.log('not ok')
                res.send("NO SUCH USER EXISTS")
            }

        }
        catch(err){
            console.log(err); return
        }

        

    });

}
module.exports.passcheck = function(req,res){
    const {id,token} = req.params
   
    // verify token b4 searching for user 
    
    User.findOne({email: id}, function(err, user){

        // console.log(err)
        try{
            if (user){
                
                // console.log('ok')
                return res.render('reset_pass',{
                    user: user,
                    title: user,
                    token: token
                } );
                }
            else{
                console.log('not ok')
                res.send("NO SUCH USER EXISTS")
            }

        }
        catch(err){
            console.log(err); return
        }

        
    });
    
    
}


module.exports.passcheck2 = function(req,res){
    id = req.body.email;
    
    const password = req.body.pass;
   
    
    User.findOne({email: id},async function(err, user){

        
        
        // const secret = JWT_SECRET + user.password;
        try{
            // const payload = jwt.verify(token, secret)
            user.password = password;
            let user1 =   await User.findByIdAndUpdate(user._id,{password: password});
            // console.log(user1,'$%$$')
            // console.log(user.password,'*************')
            res.send("password changed")
            // res.send("PASSWORD CHANGED")
            

        }
        catch(err){
            console.log(err); return
        }
    });

}