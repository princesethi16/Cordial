// for posting new post through ajax********



{
    let form = $('#newPostForm');
    
    form.submit(function (e){

        // method to submit the form data
            e.preventDefault();
            
            let url = '/users/feed/post';

            $.ajax({
                type: 'post',
                url: url,
                data: form.serialize(),
                success: function (data){
                    
                    let newPost = createNewPostDOM(data.post,data.user);
                    $('#newPostForm textarea').val("");
                    // deletePostMethod
                    deletePost($(' .delete-post-link', newPost));
                    //adding comment
                    addComment($(` #post-comment-form-${data.post._id}`,newPost),data.post);
                    // toggling like
                    toggleLike($(` .toggle-like`,newPost));
                    addNoty(data.message);
                    
                },
                error: function (err){
                    console.log(err.responseText);
                }
            });

            return;
    });

        // method to create the post in DOM

    let createNewPostDOM = function(post,user){
        var commentString;
        if(post.comments.length <= 1){
            commentString = "Comment";
        }else{
            commentString = "Comments";
        }

        return $('#newPostDOM').prepend(`
            <div class="card w-100 mt-4 comment-card" id="post-${ post._id }">
                <div class="card-body text-start pb-0 pt-2">
                    <div id="whole-post-${post._id}">
                        <img src="${user.avatar}" class="mb-4"
                        style="display: inline; height: 50px;width: 50px; border-radius: 50%;"
                        alt="">
                        <div class="ms-2 mt-1 d-inline-block w-85">
                            <h6 class="card-title d-flex justify-content-between mb-0 w-100">
                                <span>
                                    ${user.name}
                                </span>
                                    <a class="delete-post-link" href="/users/feed/post/delete-post/${post._id}">
                                        <span class="fw-bold fs-5">X</span>
                                    </a>
                                
                            </h6>
                            <p class="text-secondary fs-7">
                                ${post.updatedAt}
                            </p>
                        </div>
                    </div>
                    <p class="card-text fs-6">
                        ${post.content }
                    </p>
                    <!-- no fo  L C S -->
                    <p class=" border-top d-flex justify-content-between text-secondary pt-2 mb-0">
                        <span id="likes-span-${post._id}">${post.likes.length} Like</span>
                        
                        <span class="">
                            <span class="">
                                <span id="comment-span-${post._id}">
                                    ${post.comments.length }
                                    ${commentString}
        
                                </span>
                                <span class="ms-2">0 share </span>
                            </span>
                        </span>
                    </p>
                    
                    <p class="border-top d-flex justify-content-between px-3 mt-2 mb-2">
                        <a class="toggle-like" href="/users/feed/post/toggle-like/?likeable=${post._id}&type=Post">
                            <button type="button" class="btn btn-light btn-sm button"><i class="far fa-heart"></i>Like</button>
                        </a>
                            <button type="button" class="btn btn-light btn-sm" data-bs-toggle="collapse"
                            data-bs-target="#write-comment-${post._id}" aria-expanded="false"
                            aria-controls="collapseExample">
                            <i class="fas fa-comment"></i>Comment
                        </button>
                        <button type="button" class="btn btn-light btn-sm"><i class="fas fa-share-square"></i>Share</button>
                    </p>
        
                    <!-- comment section -->
        
                    <div class="collapse py-2" id="write-comment-${post._id}">
                        <!-- add all comments here -->
                        <div class="container-fluid">
                            <div class="row">
                                <div class="col-12" id="writeComment-${post._id}">
                                    
        
                                </div>
                            </div>
                        </div>
        
                        <form class="mt-2 post-comment-form" action="/users/feed/post/post-comment/?post=${post._id}" id="post-comment-form-${post._id}" method="POST" >
                            <div class="input-group">
                                <a class="mt-1" href="/users/profile" role="" id=""> 
                                    <img
                                    src="${user.avatar}"
                                    style="height: 30px;width: 30px; border-radius: 50%; margin-right: 10px;" alt=""></a>
                                <textarea class="form-control" name="newComment" aria-label="With textarea"
                                    placeholder="write comment, ${ user.name } !" rows="1"></textarea>
                                <span class="input-group-text bg-white border-0">
                                    <button type="submit" class="btn btn-info">Post</button>
                                </span>
                            </div>
                        </form>
        
                    </div>
                </div>
            </div>
        `);
            
        
    }

    
    function deletePost(deleteLink){
        
        deleteLink.click(function(e){
            e.preventDefault();

            $.ajax({
                type: 'get',
                url: deleteLink.prop('href'),
                success: function (data){
                    let post = $(`#post-${data.post_id}`);
                    post.remove();
                    addNoty(data.message);
                    return;
                },
                error: function (err){
                    addNotyError(err.responseText)
                    
                }
            });
        })
    }


    let deleteBtns = $('.delete-post-link');
    for(let i =0 ; i< deleteBtns.length; i++){
        let delBtn = deleteBtns.eq(i);

        delBtn.click(function(e){
            e.preventDefault();

            $.ajax({
                type: 'get',
                url: delBtn.prop('href'),
                success: function (data){
                    let post = $(`#post-${data.post_id}`);
                    post.remove();
                    addNoty(data.message);
                    return;
                },
                error: function (err){
                    addNotyError(err.responseText)
                    
                }
            });
        })
    }


        
    function addNoty(message){
        new Noty({
            theme: 'nest',
            text: `${message}`,
            type: 'success',
            layout: 'topCenter',
            timeout: 1500
        }).show();
    }
    function addNotyError(message){
        new Noty({
        theme: 'nest',
        text: `${message}`,
        type: 'error',
        layout: 'topCenter',
        timeout: 1500
        }).show();
    }
    





// *********************************for adding comments by ajax and removing


    function addComment(commentForm, post){
        commentForm.submit(function(e){
            e.preventDefault();
            let url = `/users/feed/post/post-comment/?post=${post._id}`;
        
            $.ajax({
                type: 'post',
                url: url,
                data: commentForm.serialize(),
                success: function (data){
                    
                    let newComment = createComment(data.comment,data.user,data.post);
                    commentForm.find('textarea').val("");
                    toggleLike($(' .toggle-like',newComment));
                    delComment($(` #deleteComment-button-${data.comment._id}`,newComment));
                    changeCommentCount($(`#comment-span-${data.post._id}`),data.post);
                    addNoty(data.message);
                    return;
                },
                error: function (err){
                    console.log(err.responseText);
                }
            });

        });
    }


    function createComment(comment,user,post){
        console.log(post.comments.length);
        var commentString;
        if(post.comments.length <= 1){
            commentString = "Comment";
        }else{
            commentString = "Comments";
        }
        $(`comment-span-${ post._id}`).html(`${post.comments.length} ${commentString}`);


        return $(`#writeComment-${post._id}`).prepend(`
        
            <div id="whole-comment-${comment._id}" >
                <img src="${user.avatar}" class=""
                style="display: inline; height: 30px;width: 30px; border-radius: 50%;"
                alt="">
                <div class="card d-inline-flex w-auto h-auto mt-2 pb-2 bg-light comments" id="comment-${comment._id}">
                    <div class="card-body bg-transparent pt-1 w-auto pb-0">
                        <h6 class="d-inline-flex w-100 justify-content-between">
                            <span>
                                ${user.name}
                            </span>
                                <a 
                                class="d-inline-block ms-5 delete-comment-link"
                                id = "deleteComment-button-${comment._id}"
                                href="/users/feed/post/delete-comment/${post._id}/${comment._id}">
                                    <span class="fw-bold fs-6 mb-3">X</span>
                                </a>
                                
                        </h6>
                        <p class="mb-0">
                            ${comment.content}
                        </p>
                    </div>
                </div>

                <div class="ms-5">
                    <!-- like reply division -->
                    <span style="font-size: 0.8rem;" id="likes-span-${comment._id}">
                        ${comment.likes.length}
                        Like
                    </span>

                    <a class="toggle-like" href="/users/feed/post/toggle-like/?likeable=${comment._id}&type=Comment">
                        <div class="d-inline-block ms-3 button">
                        <i class="far fa-thumbs-up"></i></div>
                    </a>
                </div>

            </div>
        `);
    }


    function changeCommentCount(commentSpan,post){
        let commentsCount = post.comments.length;
        if(commentsCount <= 1){
            commentSpan.html(`${commentsCount} Comment`);
        }else{
            commentSpan.html(`${commentsCount} Comments`);
        }
    }
    

}


