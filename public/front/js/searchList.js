
$(function(){
    // 获取地址栏的传参
    var key = getSearch('key');
    console.log(key)

    //把key的值传给input框
    $('.search_input').val(key);

    // 发送ajax请求
    render();
    $('.search_btn').click(function(){
        render();
    })

    // 给排序按钮添加点击高亮效果
    // 判断是否有current类
    $('.lt_sort a[data-type]').click(function(){
        if($(this).hasClass('current')){
            $(this).find('i').toggleClass('fa-angle-down').toggleClass('fa-angle-up');

        }else{
            $(this).addClass('current').siblings().removeClass('current');
        }
        render();
    })
    console.log($('.search_input').val());

   function render(){
       $('.lt_product').html('<div class ="loading"></div>');
       var paramsObj = {};
       paramsObj.proName = "";
       paramsObj.page = 1;
       paramsObj.pageSize = 100;

        // 根据是否有高亮的a,决定是否有额外的参数
        var $current = $('.lt_sort a.current');
        if($current.length >=1){
            // 有高亮的 a, 需要进行排序
         // 从自定义属性中, 获取需要给后台传的参数名
            var sortName = $current.data('type');
              // 根据箭头的方向, 决定升序还是降序, 决定给后台传的参数值  1升序，2降序
             var sortValue = $current.find('i').hasClass('fa-angle-down')?2:1;
            paramsObj[sortName] = sortValue;
        }
        setTimeout(function(){
            $.ajax({
                type:'get',
                url:"/product/queryProduct",
                data:paramsObj,
                dataType:'json',
                success:function(res){
                    console.log(res);
                    var htmlStr = template('productTpl',res);
                    $('.lt_product').html(htmlStr);
                }
            })
        },1000)
   }
})