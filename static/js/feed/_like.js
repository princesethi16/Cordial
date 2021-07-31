
    function toggleLike(likeBtn){
        console.log('hey')

            likeBtn.click(function (e){
                e.preventDefault();
                ajaxCall($(this));
            });
        
    
    
        function ajaxCall(likeBtn){
            let url = likeBtn.attr('href');
            console.log(url);
            $.ajax({
                url: url,
                type: 'Post',
                success: function(response){
                    let deleted = response.deleted;
                    toggleLikeClass(likeBtn);
                    changeLikeCount(deleted,response.likeable);
                    return;
                },
                error: function (err){
                    console.log(err.resposeText);
                }
    
            });
        }
    
    
        function toggleLikeClass(likeBtn){
            let button = likeBtn.find('button');
            // toggle class in button
            button.toggleClass('liked');
            let icon = button.find('i');
            icon.toggleClass('far');
            icon.toggleClass('fas');
        }

        function changeLikeCount(deleted,likeable){
            let likeSpan = $(`#likes-span-${likeable._id}`);
            let noOfLikes = likeable.likes.length;
            if(noOfLikes <= 1){
                likeSpan.html(`${noOfLikes} Like`);
            }
            else{
                likeSpan.html(`${noOfLikes} Likes`);
            }
        }





    }

    let likeBtns = $('.toggle-like');
    console.log(likeBtns);
    for(let i=0; i<likeBtns.length; i++){
        let likeBtn = likeBtns.eq(i);
        toggleLike(likeBtn);
        
    }
    


