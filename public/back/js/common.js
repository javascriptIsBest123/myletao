$(document).ajaxStart(function () {
    NProgress.start();
    // console.log('ajax 开始');
  });
$(document).ajaxStop(function(){
    setTimeout(function(){
        NProgress.done();
        // console.log('ajax 结束');
    },1000)
})
$(function(){
    // 左侧滑出划入效果
    $(".icon_menu").click(function(){
        // alert(1);
        $('.lt_aside').toggleClass("hiddenaside");
        $('.lt_main').toggleClass("hiddenmain");
        $('.lt_topbar').toggleClass("hiddenmain");
    })

    // 二级菜单的显示与隐藏
    $(".lt_aside .category").on("click",function(){
        $(this).next().stop().slideToggle();
    })

    // 控制模态框
    $(".icon_logout").on("click",function(){
        // alert(1);
        $('#logoutModal').modal("show");
    })
    $("#logoutBtn").on('click',function(){
        $.ajax({
            url:'/employee/employeeLogout',
            type:'get',
            dataType:'json',
            success:function(res){
                if(res.success){
                    location.href = "login.html";
                }
            }
        })
    })


})

