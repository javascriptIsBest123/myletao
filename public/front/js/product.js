$(function(){
    //获取地址栏传来的productId
     var productId = getSearch("productId");
        // console.log(productId);
    //  根据productId 发送请求
    $.ajax({
        type:'get',
        url:'/product/queryProductDetail',
        data:{
            id:productId
        },
        dataType:'json',
        success:function(res){
            console.log(res);
           var htmlStr = template("productTpl",res);
           $('.lt_main .mui-scroll').html(htmlStr);

            //  在页面渲染后对轮播图初始化
            var gallery = mui('.mui-slider');
            gallery.slider({
                interval:3000
            });
            // 数字框初始化
            mui('.mui-numbox').numbox();
        }
    });
    // 给尺码添加选中功能
    $('.lt_main').on('click','.lt_size span',function(){

        $(this).addClass('current').siblings().removeClass('current');
    });
    // 加入购物车
    $('#addCart').click(function(){
        var size = $('.lt_size span.current').text();
        if(size == null){
            mui.toast('请选择尺码');
            return;
        }
        // 获得数量
        var num = $('.mui-numbox-input').val();
        $.ajax({
            type:'post',
            url:'/cart/addCart',
            data:{
                productId:productId,
                num:num,
                size:size
            },
            dataType:'json',
            success:function(res){
                if(res.error === 400){
                    // 登陆拦截
                    // 把当前页面作为参数传过去,当用户登陆后再跳回这个页面
                    location.href = "login.html?retUrl="+location.href;
                    return ;
                }
                if(res.success){
                    mui.confirm('加入购物车成功',"文星提示",['去购物车浏览','继续浏览'],function(e){
                      if(e.index===0){
                          location.href = "cart.html"
                      }  
                    })
                }
            }
        })
    })
})