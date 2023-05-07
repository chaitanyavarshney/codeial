const Comment = require('../models/comment');
const Post = require('../models/post')
const commentsMailer =  require('../mailers/comments_mailer');

module.exports.create = async function(req, res){
    try{
        let post = await Post.findById(req.body.post);
        // let comment= await comment.populate('user','name email' ).exexPopulate();

            if (post){
                let comment= await Comment.create({
                    content: req.body.content,
                    post: req.body.post,
                    user: req.user._id
                
                });
                    //handle error
                // commentsMailer.newComment(comment); 
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