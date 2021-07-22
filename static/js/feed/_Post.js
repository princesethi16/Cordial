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
                    console.log(data.post);
                    createNewPostDOM(data.post,data.user_name);
                    $('#newPostForm textarea').val("");
                    deletePostMethod();
                    return;
                },
                error: function (err){
                    console.log(err.responseText);
                }
            });

            return;
    });

        // method to create the post in DOM

    let createNewPostDOM = function(post,userName){
            var commentString;
            if(post.comments.length <= 1){
                commentString = "Comment";
            }else{
                commentString = "Comments";
            }

            let newPost = $('#newPostDOM').prepend(`
                <div class="card w-100 mt-4 comment-card" id="post-${ post._id }">
                    <div class="card-body text-start pb-0">
                        <h6 class="card-title d-flex justify-content-between">
                            <span>
                                ${ userName }
                            </span>
                                <a class="delete-post-link" href="/users/feed/post/delete-post/${ post._id}">
                                    <span class="fw-bold fs-5">X</span>
                                </a>
                                
                        </h6>
                        <p class="text-secondary fs-7">
                            ${ post.updatedAt }
                        </p>
                        <p class="card-text fs-6">
                            ${post.content }
                        </p>
                        <!-- no fo  L C S -->
                        <p class=" border-top d-flex justify-content-between text-secondary pt-2 mb-0">
                            <span>0 Likes</span>
                            <span class="">
                                <span class="">
                                    <span>
                                        ${post.comments.length }
                                        ${commentString}
            
                                    </span>
                                    <span>0 share </span>
                                </span>
                            </span>
                        </p>
                        
                        <p class="border-top d-flex justify-content-between px-3 mt-2 mb-2">
                            <button type="button" class="btn btn-light btn-sm"><i class="far fa-heart"></i>Like</button>
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
                                    <div class="col-12" id="append-comment">
                                        
            
                                    </div>
                                </div>
                            </div>
            
                            <form class="mt-2" action="/users/feed/post/post-comment/?post=${post._id}" method="POST">
                                <div class="input-group">
                                    <a class="mt-1" href="/users/profile" role="" id=""> 
                                        <img
                                        src="/images/header profile image/images.png"
                                        style="height: 30px;width: 30px; border-radius: 50%; margin-right: 10px;" alt=""></a>
                                    <textarea class="form-control" name="newComment" aria-label="With textarea"
                                        placeholder="write comment, ${ userName } !" rows="1"></textarea>
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


    function deletePostMethod(){
        function deletePost(deleteLink){
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
        }
    
    
        
    
        let delPostBtn = $('.delete-post-link');
        for(let i=0 ; i<delPostBtn.length; i++){
            let currBtn = delPostBtn.eq(i);
            currBtn.click(function(e){
                e.preventDefault();
                deletePost(currBtn);
            })
        }
        
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
    
    
    deletePostMethod();




}
