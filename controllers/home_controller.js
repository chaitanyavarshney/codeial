const Posts = require('../models/post');
const User = require('../models/user');
const Friendship = require('../models/friendship');


// module.exports.home = async function(req, res){
    // try{
    //     let posts = await Post.find({})
    //     .sort('createdAt')
    //     .populate('user')
    //     .populate({
    //         path: 'comments',
            
    //         populate: {
    //             path: 'likes'
    //         },
           
    //     }).populate('likes').populate({
    //         path: 'comments',
    //         populate: {
    //           path: 'user'
    //         }
    //       });
    //     let users = await User.find({});
    
    //     let logged_inuser = await User.findById(req.user._id)
       
    //     let friends_of_user = await User.find({_id:{$in:logged_inuser.friends}})
    //     // console.log(friends_of_user,'************&&&&&&&&');
    //     return res.render('home', {
    //         title: "Codial | Home", 
    //         posts: posts,
    //         friends_of_user : friends_of_user,
    //         all_users: users,
            
            
            

    //     });


    // }catch(err){
    //     console.log('Error',err);
    //     return
    // }
module.exports.home = async function (request, response) {
    try {
      let posts = await Posts.find({})
        .sort("-createdAt")
        .populate("user")
        .populate({
          path: "comments",
          populate: {
            path: "user",
          },
        })
        .populate({
          path: "comments",
          populate: {
            path: "likes",
          },
        })
        .populate("likes");
  
    
      let users = await User.find({});
  
      let user;
      if (request.user) {
        user = await User.findById(request.user._id)
          .populate({
            path: "friends",
            populate: {
              path: "from_user",
            },
          })
          .populate({
            path: "friends",
            populate: {
              path: "to_user",
            },
          })
          .populate({
            path: "to_user"
          })
      }
      console.log(user.friends,"*&%^%^*%(&%(&%&%")
      
  
      return response.render("home", {
        title: "Codeial | Home",
        posts: posts,
        // friends_of_user : friends,
        all_users: users,
        user: user,
      });
    } catch (error) {
      console.log("Error : ", error);
    }
  };
    // console.log(req.cookies);
    // res.cookie('user_id', 25);

    // Post.find({}, function(err, posts){
    //     return res.render('home', {
    //         title: "Codial | Home", 
    //         posts: posts
    //     });

    // });
    // populate the user of each post
    
  
    


// module.exports.actionName = function(req, res){}

