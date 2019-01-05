
//登陆拦截
$.ajax({
    url:"/employee/checkRootLogin",
    type:'get',
    dataType:'json',
    success:function(res){
        if(res.success){
            console.log('登陆成功');
        }
        if(res.error){
            location.href = "login.html";
        }
    }
})