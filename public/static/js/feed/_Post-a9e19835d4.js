{let e=$("#newPostForm");e.submit((function(t){t.preventDefault();$.ajax({type:"post",url:"/users/feed/post",data:e.serialize(),success:function(e){let t=n(e.post,e.user);$("#newPostForm textarea").val(""),deletePost($(" .delete-post-link",t)),addComment($(` #post-comment-form-${e.post._id}`,t),e.post),toggleLike($(" .toggle-like",t)),addNoty(e.message)},error:function(e){console.log(e.responseText)}})}));let n=function(e,n){var t;return t=e.comments.length<=1?"Comment":"Comments",$("#newPostDOM").prepend(`\n            <div class="card w-100 mt-4 comment-card" id="post-${e._id}">\n                <div class="card-body text-start pb-0 pt-2">\n                    <div id="whole-post-${e._id}">\n                        <img src="${n.avatar}" class="mb-4"\n                        style="display: inline; height: 50px;width: 50px; border-radius: 50%;"\n                        alt="">\n                        <div class="ms-2 mt-1 d-inline-block w-85">\n                            <h6 class="card-title d-flex justify-content-between mb-0 w-100">\n                                <span>\n                                    ${n.name}\n                                </span>\n                                    <a class="delete-post-link" href="/users/feed/post/delete-post/${e._id}">\n                                        <span class="fw-bold fs-5">X</span>\n                                    </a>\n                                \n                            </h6>\n                            <p class="text-secondary fs-7">\n                                ${e.updatedAt}\n                            </p>\n                        </div>\n                    </div>\n                    <p class="card-text fs-6">\n                        ${e.content}\n                    </p>\n                    \x3c!-- no fo  L C S --\x3e\n                    <p class=" border-top d-flex justify-content-between text-secondary pt-2 mb-0">\n                        <span id="likes-span-${e._id}">${e.likes.length} Like</span>\n                        \n                        <span class="">\n                            <span class="">\n                                <span id="comment-span-${e._id}">\n                                    ${e.comments.length}\n                                    ${t}\n        \n                                </span>\n                                <span class="ms-2">0 share </span>\n                            </span>\n                        </span>\n                    </p>\n                    \n                    <p class="border-top d-flex justify-content-between px-3 mt-2 mb-2">\n                        <a class="toggle-like" href="/users/feed/post/toggle-like/?likeable=${e._id}&type=Post">\n                            <button type="button" class="btn btn-light btn-sm button"><i class="far fa-heart"></i>Like</button>\n                        </a>\n                            <button type="button" class="btn btn-light btn-sm" data-bs-toggle="collapse"\n                            data-bs-target="#write-comment-${e._id}" aria-expanded="false"\n                            aria-controls="collapseExample">\n                            <i class="fas fa-comment"></i>Comment\n                        </button>\n                        <button type="button" class="btn btn-light btn-sm"><i class="fas fa-share-square"></i>Share</button>\n                    </p>\n        \n                    \x3c!-- comment section --\x3e\n        \n                    <div class="collapse py-2" id="write-comment-${e._id}">\n                        \x3c!-- add all comments here --\x3e\n                        <div class="container-fluid">\n                            <div class="row">\n                                <div class="col-12" id="writeComment-${e._id}">\n                                    \n        \n                                </div>\n                            </div>\n                        </div>\n        \n                        <form class="mt-2 post-comment-form" action="/users/feed/post/post-comment/?post=${e._id}" id="post-comment-form-${e._id}" method="POST" >\n                            <div class="input-group">\n                                <a class="mt-1" href="/users/profile" role="" id=""> \n                                    <img\n                                    src="${n.avatar}"\n                                    style="height: 30px;width: 30px; border-radius: 50%; margin-right: 10px;" alt=""></a>\n                                <textarea class="form-control" name="newComment" aria-label="With textarea"\n                                    placeholder="write comment, ${n.name} !" rows="1"></textarea>\n                                <span class="input-group-text bg-white border-0">\n                                    <button type="submit" class="btn btn-info">Post</button>\n                                </span>\n                            </div>\n                        </form>\n        \n                    </div>\n                </div>\n            </div>\n        `)};function deletePost(e){e.click((function(n){n.preventDefault(),$.ajax({type:"get",url:e.prop("href"),success:function(e){$(`#post-${e.post_id}`).remove(),addNoty(e.message)},error:function(e){addNotyError(e.responseText)}})}))}let t=$(".delete-post-link");for(let e=0;e<t.length;e++){let n=t.eq(e);n.click((function(e){e.preventDefault(),$.ajax({type:"get",url:n.prop("href"),success:function(e){$(`#post-${e.post_id}`).remove(),addNoty(e.message)},error:function(e){addNotyError(e.responseText)}})}))}function addNoty(e){new Noty({theme:"nest",text:`${e}`,type:"success",layout:"topCenter",timeout:1500}).show()}function addNotyError(e){new Noty({theme:"nest",text:`${e}`,type:"error",layout:"topCenter",timeout:1500}).show()}function addComment(e,n){e.submit((function(t){t.preventDefault();let s=`/users/feed/post/post-comment/?post=${n._id}`;$.ajax({type:"post",url:s,data:e.serialize(),success:function(n){let t=createComment(n.comment,n.user,n.post);e.find("textarea").val(""),toggleLike($(" .toggle-like",t)),delComment($(` #deleteComment-button-${n.comment._id}`,t)),changeCommentCount($(`#comment-span-${n.post._id}`),n.post),addNoty(n.message)},error:function(e){console.log(e.responseText)}})}))}function createComment(e,n,t){var s;return console.log(t.comments.length),s=t.comments.length<=1?"Comment":"Comments",$(`comment-span-${t._id}`).html(`${t.comments.length} ${s}`),$(`#writeComment-${t._id}`).prepend(`\n        \n            <div id="whole-comment-${e._id}" >\n                <img src="${n.avatar}" class=""\n                style="display: inline; height: 30px;width: 30px; border-radius: 50%;"\n                alt="">\n                <div class="card d-inline-flex w-auto h-auto mt-2 pb-2 bg-light comments" id="comment-${e._id}">\n                    <div class="card-body bg-transparent pt-1 w-auto pb-0">\n                        <h6 class="d-inline-flex w-100 justify-content-between">\n                            <span>\n                                ${n.name}\n                            </span>\n                                <a \n                                class="d-inline-block ms-5 delete-comment-link"\n                                id = "deleteComment-button-${e._id}"\n                                href="/users/feed/post/delete-comment/${t._id}/${e._id}">\n                                    <span class="fw-bold fs-6 mb-3">X</span>\n                                </a>\n                                \n                        </h6>\n                        <p class="mb-0">\n                            ${e.content}\n                        </p>\n                    </div>\n                </div>\n\n                <div class="ms-5">\n                    \x3c!-- like reply division --\x3e\n                    <span style="font-size: 0.8rem;" id="likes-span-${e._id}">\n                        ${e.likes.length}\n                        Like\n                    </span>\n\n                    <a class="toggle-like" href="/users/feed/post/toggle-like/?likeable=${e._id}&type=Comment">\n                        <div class="d-inline-block ms-3 button">\n                        <i class="far fa-thumbs-up"></i></div>\n                    </a>\n                </div>\n\n            </div>\n        `)}function changeCommentCount(e,n){let t=n.comments.length;t<=1?e.html(`${t} Comment`):e.html(`${t} Comments`)}}