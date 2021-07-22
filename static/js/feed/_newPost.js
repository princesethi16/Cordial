// for posting new post through ajax********

{

    let createPost = ()=>{
        let form = $('#newPostForm').submit(createPost);

        // method to submit the form data
        form.submit(function (e){
            e.preventDefault();
            
            let url = '/users/feed/post';

            $.ajax({
                type: 'post',
                url: url,
                data: form.serialize(),
                success: function (data){
                    console.log(data.post);
                    createNewPostDOM(data.post);
                },
                error: function (err){
                    console.log(err.responseText);
                }
            });

            return;
        });

        // method to create the post in DOM

        let createNewPostDOM = function(post){
            var commentString;
            if(post.comments.length <= 1){
                commentString = "Comment";
            }else{
                commentString = "Comments";
            }

            $('#newPostDOM').prepend(`
                <div class="card w-100 mt-4" id="post-${ post.id }">
                    <div class="card-body text-start pb-0">
                        <h6 class="card-title d-flex justify-content-between">
                            <span>
                                ${ post.user }
                            </span>
                                <a class="delete-post-button" href="/users/feed/post/delete-post/${ post.id}">
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
                                data-bs-target="#write-comment-${post.id}" aria-expanded="false"
                                aria-controls="collapseExample">
                                <i class="fas fa-comment"></i>Comment
                            </button>
                            <button type="button" class="btn btn-light btn-sm"><i class="fas fa-share-square"></i>Share</button>
                        </p>
            
                        <!-- comment section -->
            
                        <div class="collapse py-2" id="write-comment-${post.id}">
                            <!-- add all comments here -->
                            <div class="container-fluid">
                                <div class="row">
                                    <div class="col-12" id="append-comment">
                                        
            
                                    </div>
                                </div>
                            </div>
            
                            <form class="mt-2" action="/users/feed/post/post-comment/?post=${post.id}" method="POST">
                                <div class="input-group">
                                    <a class="mt-1" href="/users/profile" role="" id=""> 
                                        <img
                                        src="/images/header profile image/images.png"
                                        style="height: 30px;width: 30px; border-radius: 50%; margin-right: 10px;" alt=""></a>
                                    <textarea class="form-control" name="newComment" aria-label="With textarea"
                                        placeholder="write comment, ${post.user.name} !" rows="1"></textarea>
                                    <span class="input-group-text bg-white border-0">
                                        <button type="submit" class="btn btn-info">Post</button>
                                    </span>
                                </div>
                            </form>
            
                        </div>
                    </div>
                </div>
            `)
        }


    }

    createPost();
}