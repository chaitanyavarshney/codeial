function toggleFriend(toggleFriendBtn){
    // console.log(toggleFriendBtn);
    // console.log($(toggleFriendBtn));
    $(toggleFriendBtn).click(function(event){
        event.preventDefault();
        $.ajax({
            type : "GET",
            url : $(toggleFriendBtn).attr("href"),
            success : function(data){
                // console.log(data.deleted);
                if(data.deleted){
                    $(toggleFriendBtn).html("Add Friend"),
                    $(toggleFriendBtn).css('color', 'blue'),
                    $(toggleFriendBtn).css('border', '2px solid blue');
                }else{
                    $(toggleFriendBtn).html("Remove Friend"),
                    $(toggleFriendBtn).css('color', 'red'),
                    $(toggleFriendBtn).css('border', '2px solid red');
                }
                
            },
            error : function(error){
                console.log(error.responseText);
            }

                
            })

       })
}

// console.log('hiii')

toggleFriend($(".toggle-friend-btn"));