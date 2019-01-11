
$(function(){
    $.ajax({
        url:'/category/queryTopCategory',
        type:'get',
        dataType:'json',
        success:function(res){
            console.log(res);
            var htmlStr = template('cateleftTmp',res);
            $('.lt_category_left ul').html(htmlStr);
            // 渲染完一级分类,默认渲染第一个一级分类对应的二级分类
            renderById(res.rows[0].id);
            
        }
    });
    // 给一级菜单的所有a注册点击事件
    $('.lt_category_left').on('click','a',function(){
        // alert(1);
        $('.lt_category_left a').removeClass('current');
        $(this).addClass('current');
        var id = $(this).data('id');
        renderById(id);
    })

    // 根据id渲染对应的页面
    function renderById(id){
        $.ajax({
            url:'/category/querySecondCategory',
            type:'get',
            dataType:'json',
            data:{id:id},
            success:function(res){
                console.log(res);
                var htmlStr = template('rightTpl',res);
                $('.lt_category_right ul').html(htmlStr);
            }
        })
    };
})