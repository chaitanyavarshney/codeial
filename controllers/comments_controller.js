const Comment = require('../models/comment');
const Post = require('../models/post')
const User = require('../models/user')
const commentsMailer =  require('../mailers/comments_mailer');
const queue =  require('../config/kue');
const commentEmailWorker = require('../workers/comment_email_worker');

module.exports.create = async function(req, res){
    try{
        let post = await Post.findById(req.body.post);


            if (post){
                let comment= await Comment.create({
                    content: req.body.content,
                    post: req.body.post,
                    user: req.user._id
                
                });
                    //handle error
                comment= await comment.populate('user','name email' ).populate();
                // console.log(comment.user.name);
                // commentsMailer.newComment(comment); 
                let job = queue.create('emails', comment).save(function(err){


                    if(err){
                        console.log( 'Error in sending to the queue', err);
                        return;

                    }
                    console.log('job enqueued', job.id);
                });
                post.comments.push(comment);
                post.save();
                req.flash('success', 'comment Posted');
        
                res.redirect('/');
            }

    }catch(err){
        req.flash('error', err);
        return;
    }
    
}
    

module.exports.destroy = function(req,res){
   
    
    Comment.findById(req.params.id, function(err,comment){
        let postId = comment.post;
        Post.findById(postId,function(err,post){
            if( (comment.user == req.user.id)|| post.user == req.user.id){
            
                comment.remove;

                // Like.deleteMany({likeable: comment._id, onModel:'Comment' });
                req.flash('success', 'comment deleted');
                Post.findByIdAndUpdate(postId, { $pull: {comments: req.params.id}}, function(err,post){
                    return res.redirect('back');
                })
            }else{
                return res.redirect('back');
            }
        })
        

    });
    
}