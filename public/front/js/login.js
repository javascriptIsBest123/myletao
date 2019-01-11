$(function(){
    // 实现用户的基本登陆
    $('#loginBtn').click(function(){
        var username = $('#username').val().trim();
        var password = $('#password').val().trim();

        if(username === ""){
            mui.toast('请输入用户名');
            return;
        }
        if(password ===""){
            mui.toast('请输入密码');
            return ;
        }
        $.ajax({
            type:'post',
            url:'/user/login',
            data:{
                username:username,
                password:password
            },
            dataType:'json',
            success:function(info){
                if(info.error === 403){
                    mui.toast('用户名或密码错误');
                    return ;
                } 
                if(info.success){
                    // 有参数传过来,说明要跳回去,
                    //没有参数传过来,跳会个人中心
                    if(location.search.indexOf('retUrl')!=-1){
                        // location.search =>  "?retUrl=http://localhost:3000/front/product.html?productId=7"
                        // 这里接受的是用户上一个要进行登陆拦截的页面
                        // 在用户登陆后,把?retUrl=替换成"",这样就可以跳回之前拦截的页面
                        var retUrl = location.search.replace('?retUrl=',"");
                        location.href = retUrl;
                    }else{
                        location.href = 'user.html';
                    }
                }
            }
        })
    })
})