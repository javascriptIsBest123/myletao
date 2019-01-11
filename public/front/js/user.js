$(function(){
    $.ajax({
        type:'get',
        url:'/user/queryUserMessage',
        dataType:'json',
        success:function(res){
            if(res.error ===400){
                location.href = "login.html";
                return;
            }
            var htmlStr = template('userTpl',res);
            $('#userInfo').html(htmlStr);
        }
    })
    // 退出功能
    $('#logout').click(function(){
        $.ajax({
            type:'get',
            url:'/user/logout',
            dataType:'json',
            success:function(info){
                if(info.success){
                    location.href = "login.html";
                }
            }
        })
    })
})