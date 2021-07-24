{   
    let inputImg = $('#user-avatar-upload')
    let previewImgBtn = $('.previewImgBtn');
    inputImg.on('change',function(event){
        let file = event.target.files[0];
        
        if(file){
            const file = this.files[0];
            console.log(file);
            let reader = new FileReader();
            reader.onload = function (event) {
                $("#previewImgModal")
                    .attr("src", event.target.result);
            };
            reader.readAsDataURL(file);
        }    
            
    });
}