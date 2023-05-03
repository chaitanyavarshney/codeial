{
    // method to submit the form data for new post using AJAX
    let createPost = function(){
        let newPostForm = $('#new-post-form');
        // console.log(newPostForm)

        newPostForm.submit(function(e){
            e.preventDefault();
            $.ajax({
                type: 'post',
                url: '/posts/create',
                data: newPostForm.serialize(),
                success: function(data){
                    let newPost= newPostDom(data.data.post,data.data.username);
                    $('#posts-list-container>ul').prepend(newPost);
                    deletePost($(' .delete-post-button, newPost'));
                }, error: function(error){
                    console.log(error.responseText);
                }
            })
        });
    }



    // method to create a post in DOM
    let newPostDom = function(post,username){
        return $(`<li id="post-${post._id}">
                    <p>
                        <small>
                            <a class="delete-post-button" href="/posts/destroy/${ post._id }">X</a>
                        </small>
                       
                        ${ post.content}
                        <br>
                        <small>
                        ${ username }
                        </small>
                    </p>
                    <div class="posts-comments">
                        
                            <form action="/comments/create" method="POST">
                                <input type="text" name="content" placeholder="Type here to add comment..." required>
                                <input type="hidden" name="post" value="${post._id }">
                                <input type="submit" value="Add comment">
                            </form>
                
                    
                
                        <div class="post-comments-list">
                            <ul id="post-comments-${ post._id }">
                               
                            </ul>
                        </div>
                    </div>
                </li>`)
    }






    // method to delete a post from DOM
    let deletePost = function(deleteLink){
        $(deleteLink).click(function(e){
            e.preventDefault();

            $.ajax({
                type: 'get',
                url: $(deleteLink).prop('href'),
                success: function(data){
                    
                    $(`#post-${ data.data.post_id }`).remove();
                    
                }, error : function(error){
                    console.log(error.responseText);
                }

            });
        });
    }




    createPost();
}