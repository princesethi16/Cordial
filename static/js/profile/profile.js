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





// for the change friendship buttons
$(document).ready(function() {
    $(".dropdown-toggle").click(function(){
        
        let toggleDivId = $(this).attr('data-toggle-id');
        toggleDiv = $(` #${toggleDivId}`);
        toggleDiv.toggleClass('show');
        friendRequest_Btn.toggleClass('no-focus blued');
        
        
    });
});



