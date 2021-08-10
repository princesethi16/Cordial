{let t=$("#newPostForm");t.submit(function(e){e.preventDefault();$.ajax({type:"post",url:"/users/feed/post",data:t.serialize(),success:function(e){var t=s(e.post,e.user);$("#newPostForm textarea").val(""),deletePost($(" .delete-post-link",t)),addComment($(` #post-comment-form-${e.post._id}`,t),e.post),toggleLike($(" .toggle-like",t)),addNoty(e.message)},error:function(e){console.log(e.responseText)}})});let s=function(e,t){var s=e.comments.length<=1?"Comment":"Comments";return $("#newPostDOM").prepend(`
            <div class="card w-100 mt-4 comment-card" id="post-${e._id}">
                <div class="card-body text-start pb-0 pt-2">
                    <div id="whole-post-${e._id}">
                        <img src="${t.avatar}" class="mb-4"
                        style="display: inline; height: 50px;width: 50px; border-radius: 50%;"
                        alt="">
                        <div class="ms-2 mt-1 d-inline-block w-85">
                            <h6 class="card-title d-flex justify-content-between mb-0 w-100">
                                <span>
                                    ${t.name}
                                </span>
                                    <a class="delete-post-link" href="/users/feed/post/delete-post/${e._id}">
                                        <span class="fw-bold fs-5">X</span>
                                    </a>
                                
                            </h6>
                            <p class="text-secondary fs-7">
                                ${e.updatedAt}
                            </p>
                        </div>
                    </div>
                    <p class="card-text fs-6">
                        ${e.content}
                    </p>
                    <!-- no fo  L C S -->
                    <p class=" border-top d-flex justify-content-between text-secondary pt-2 mb-0">
                        <span id="likes-span-${e._id}">${e.likes.length} Like</span>
                        
                        <span class="">
                            <span class="">
                                <span id="comment-span-${e._id}">
                                    ${e.comments.length}
                                    ${s}
        
                                </span>
                                <span class="ms-2">0 share </span>
                            </span>
                        </span>
                    </p>
                    
                    <p class="border-top d-flex justify-content-between px-3 mt-2 mb-2">
                        <a class="toggle-like" href="/users/feed/post/toggle-like/?likeable=${e._id}&type=Post">
                            <button type="button" class="btn btn-light btn-sm button"><i class="far fa-heart"></i>Like</button>
                        </a>
                            <button type="button" class="btn btn-light btn-sm" data-bs-toggle="collapse"
                            data-bs-target="#write-comment-${e._id}" aria-expanded="false"
                            aria-controls="collapseExample">
                            <i class="fas fa-comment"></i>Comment
                        </button>
                        <button type="button" class="btn btn-light btn-sm"><i class="fas fa-share-square"></i>Share</button>
                    </p>
        
                    <!-- comment section -->
        
                    <div class="collapse py-2" id="write-comment-${e._id}">
                        <!-- add all comments here -->
                        <div class="container-fluid">
                            <div class="row">
                                <div class="col-12" id="writeComment-${e._id}">
                                    
        
                                </div>
                            </div>
                        </div>
        
                        <form class="mt-2 post-comment-form" action="/users/feed/post/post-comment/?post=${e._id}" id="post-comment-form-${e._id}" method="POST" >
                            <div class="input-group">
                                <a class="mt-1" href="/users/profile" role="" id=""> 
                                    <img
                                    src="${t.avatar}"
                                    style="height: 30px;width: 30px; border-radius: 50%; margin-right: 10px;" alt=""></a>
                                <textarea class="form-control" name="newComment" aria-label="With textarea"
                                    placeholder="write comment, ${t.name} !" rows="1"></textarea>
                                <span class="input-group-text bg-white border-0">
                                    <button type="submit" class="btn btn-info">Post</button>
                                </span>
                            </div>
                        </form>
        
                    </div>
                </div>
            </div>
        `)};function deletePost(t){t.click(function(e){e.preventDefault(),$.ajax({type:"get",url:t.prop("href"),success:function(e){let t=$(`#post-${e.post_id}`);t.remove(),addNoty(e.message)},error:function(e){addNotyError(e.responseText)}})})}let o=$(".delete-post-link");for(let e=0;e<o.length;e++){let t=o.eq(e);t.click(function(e){e.preventDefault(),$.ajax({type:"get",url:t.prop("href"),success:function(e){let t=$(`#post-${e.post_id}`);t.remove(),addNoty(e.message)},error:function(e){addNotyError(e.responseText)}})})}function addNoty(e){new Noty({theme:"nest",text:`${e}`,type:"success",layout:"topCenter",timeout:1500}).show()}function addNotyError(e){new Noty({theme:"nest",text:`${e}`,type:"error",layout:"topCenter",timeout:1500}).show()}function addComment(s,t){s.submit(function(e){e.preventDefault();e=`/users/feed/post/post-comment/?post=${t._id}`;$.ajax({type:"post",url:e,data:s.serialize(),success:function(e){var t=createComment(e.comment,e.user,e.post);s.find("textarea").val(""),toggleLike($(" .toggle-like",t)),delComment($(` #deleteComment-button-${e.comment._id}`,t)),changeCommentCount($(`#comment-span-${e.post._id}`),e.post),addNoty(e.message)},error:function(e){console.log(e.responseText)}})})}function createComment(e,t,s){var o;return console.log(s.comments.length),o=s.comments.length<=1?"Comment":"Comments",$(`comment-span-${s._id}`).html(`${s.comments.length} ${o}`),$(`#writeComment-${s._id}`).prepend(`
        
            <div id="whole-comment-${e._id}" >
                <img src="${t.avatar}" class=""
                style="display: inline; height: 30px;width: 30px; border-radius: 50%;"
                alt="">
                <div class="card d-inline-flex w-auto h-auto mt-2 pb-2 bg-light comments" id="comment-${e._id}">
                    <div class="card-body bg-transparent pt-1 w-auto pb-0">
                        <h6 class="d-inline-flex w-100 justify-content-between">
                            <span>
                                ${t.name}
                            </span>
                                <a 
                                class="d-inline-block ms-5 delete-comment-link"
                                id = "deleteComment-button-${e._id}"
                                href="/users/feed/post/delete-comment/${s._id}/${e._id}">
                                    <span class="fw-bold fs-6 mb-3">X</span>
                                </a>
                                
                        </h6>
                        <p class="mb-0">
                            ${e.content}
                        </p>
                    </div>
                </div>

                <div class="ms-5">
                    <!-- like reply division -->
                    <span style="font-size: 0.8rem;" id="likes-span-${e._id}">
                        ${e.likes.length}
                        Like
                    </span>

                    <a class="toggle-like" href="/users/feed/post/toggle-like/?likeable=${e._id}&type=Comment">
                        <div class="d-inline-block ms-3 button">
                        <i class="far fa-thumbs-up"></i></div>
                    </a>
                </div>

            </div>
        `)}function changeCommentCount(e,t){t=t.comments.length;t<=1?e.html(`${t} Comment`):e.html(`${t} Comments`)}}