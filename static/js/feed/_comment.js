// after reloading the page***
// *********************************for adding comments by ajax and removing
let forms = $('.post-comment-form');

for(let i=0; i<forms.length ;i++){

    let form = forms.eq(i);

    form.submit(function (e){

    // method to submit the form data
        e.preventDefault();

        $.ajax({
            type: 'post',
                url: form.prop('action'),
                data: form.serialize(),
                success: function (data){
                    console.log('hello');
                    let newComment = createComment(data.comment,data.user_name,data.post);
                    delComment($(` #deleteComment-button-${data.comment._id}`,newComment));
                    form.find('textarea').val("");
                    addNoty(data.message);
                    return;
                },
                error: function (err){
                    addNotyError(er.responseText);
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

function createComment(comment,userName,post){

    var commentString;
    if(post.comments.length <= 1){
        commentString = "Comment";
    }else{
        commentString = "Comments";
    }
    $(`comment-span-${ post._id}`).html(`${post.comments.length} ${commentString}`);


    return $(`#writeComment-${post._id}`).prepend(`
    
        <div class="card w-100 mt-2 comments bg-light" id="comment-${comment._id}">
            <div class="card-body bg-transparent pt-1">
                <h6 class="d-flex justify-content-between">
                    <span>
                        ${userName}
                    </span>
                        <a
                            class="delete-comment-link" id="deleteComment-button-${comment._id}"
                            href="/users/feed/post/delete-comment/${post._id}/${comment._id}">
                            <span class="fw-bold fs-6 mb-3">X</span>
                        </a>
                        
                </h6>
                <p>
                    ${comment.content}
                </p>
            </div>
        </div>
    `);
}

    
// deleting the comment***

function delComment(deleteCommentLink){
    deleteCommentLink.click(function(e){
        console.log(deleteCommentLink.prop('href'));
        e.preventDefault();

        $.ajax({
            type: 'get',
            url: deleteCommentLink.prop('href'),
            success: function (data){
                let comment = $(`#comment-${data.comment._id}`);
                comment.remove();
                addNoty(data.message);
                return;
            },
            error: function (err){
                addNotyError(err.responseText);
                
            }
        });
    })
}

let delCommentBtns = $('.delete-comment-link');

for(let i =0 ; i< delCommentBtns.length; i++){
    let delBtn = delCommentBtns.eq(i);
    console.log(delBtn.prop('href'));

    delBtn.click(function(e){
        e.preventDefault();
        
        $.ajax({
            type: 'get',
            url: delBtn.prop('href'),
            success: function (data){
                let post = $(`#comment-${data.comment._id}`);
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






