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
                    console.log('success')
                    console.log(data);
                },
                error: function (err){
                    console.log(err.responseText);
                }
            });

            return;
        });

        // method to create the post in DOM



    }

    createPost();
}