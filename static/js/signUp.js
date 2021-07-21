var btn = $('button');
var pass = $('#password');
var rePass = $('#retype-password');


btn.click((event)=>{
    if(pass.val()!=rePass.val()){
        pass.addClass('boxSh-danger');
        rePass.addClass('boxSh-danger');
        event.preventDefault();
        btn.html("Passwords do not match")
        return;
    }
});

pass.click(()=>{
    pass.removeClass('boxSh-danger');
    rePass.removeClass('boxSh-danger');
    btn.html('Create Account');
});