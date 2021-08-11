
let inputImg = $('#user-image-upload')
let previewImgBtn = $('.previewImgBtn');
let fileName;
inputImg.on('change',function(event){
    let file = event.target.files[0];
    
    if(file){
        fileName = this.files[0];
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


