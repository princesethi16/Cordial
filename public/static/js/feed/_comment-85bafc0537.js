let forms=$(".post-comment-form");for(let e=0;e<forms.length;e++){let o=forms.eq(e);o.submit(function(e){e.preventDefault(),$.ajax({type:"post",url:o.prop("action"),data:o.serialize(),success:function(e){var t=createComment(e.comment,e.user,e.post);changeCommentCount($(`#comment-span-${e.post._id}`),e.post),delComment($(` #deleteComment-button-${e.comment._id}`,t)),toggleLike($(" .toggle-like",t)),o.find("textarea").val(""),addNoty(e.message)},error:function(e){addNotyError(er.responseText)}})})}function addNoty(e){new Noty({theme:"nest",text:`${e}`,type:"success",layout:"topCenter",timeout:1500}).show()}function addNotyError(e){new Noty({theme:"nest",text:`${e}`,type:"error",layout:"topCenter",timeout:1500}).show()}function createComment(e,t,o){return $(`#writeComment-${o._id}`).prepend(`
    
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
                            href="/users/feed/post/delete-comment/${o._id}/${e._id}">
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
    `)}function delComment(t){t.click(function(e){e.preventDefault(),$.ajax({type:"get",url:t.prop("href"),success:function(e){let t=$(`#whole-comment-${e.comment._id}`);t.remove(),changeCommentCount($(`#comment-span-${e.post._id}`),e.post),addNoty(e.message)},error:function(e){addNotyError(e.responseText)}})})}let delCommentBtns=$(".delete-comment-link");for(let e=0;e<delCommentBtns.length;e++){let t=delCommentBtns.eq(e);console.log(t.prop("href")),t.click(function(e){e.preventDefault(),$.ajax({type:"get",url:t.prop("href"),success:function(e){let t=$(`#whole-comment-${e.comment._id}`);t.remove(),changeCommentCount($(`#comment-span-${e.post._id}`),e.post),addNoty(e.message)},error:function(e){addNotyError(e.responseText)}})})}function changeCommentCount(e,t){console.log(e);t=t.comments.length;t<=1?e.html(`${t} Comment`):e.html(`${t} Comments`)}