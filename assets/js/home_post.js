{
    let createPost = function(){
        let newPostForm = $('#new-post-form');
        console.log(newPostForm)

        newPostForm.submit(function(e){
            e.preventDefault();
        });
    }
    createPost();
}