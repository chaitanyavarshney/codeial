const Post = require('../models/post');
const User = require('../models/user');
const Friendship = require('../models/friendship');


module.exports.home = async function(req, res){
    try{
        let posts = await Post.find({})
        .sort('createdAt')
        .populate('user')
        
        .populate({
            path: 'comments',
            
            populate: {
                path: 'likes'
            },
           
        }).populate('likes').populate({
            path: 'comments',
            populate: {
              path: 'user'
            }
          });
        
        let users = await User.find({});
        
        return res.render('home', {
            title: "Codial | Home", 
            posts: posts,
            all_users: users,
            
            

        });

    }catch(err){
        console.log('Error',err);
        return
    }
    // console.log(req.cookies);
    // res.cookie('user_id', 25);

    // Post.find({}, function(err, posts){
    //     return res.render('home', {
    //         title: "Codial | Home", 
    //         posts: posts
    //     });

    // });
    // populate the user of each post
    
  
    
}

// module.exports.actionName = function(req, res){}