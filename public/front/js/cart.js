$(function(){
    $.ajax({
        type:'get',
        url:'/cart/queryCart',
        dataType:'json',
        success:function(res){
            if(res.error === 400){
                location.href = "login.html?retUrl="+location.href;
                return;
            }
            var htmlStr = template('cartTpl',{arr:res});
            $('.lt_main .mui-table-view').html(htmlStr);
        }
    })
})