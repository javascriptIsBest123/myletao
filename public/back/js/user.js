
$(function(){
    var currentId;  //操作当前用户的id
    var isDelete ;  //修改当前用户的状态
    var userpage = 1;
    var userSize = 5;
    render();
    function render(){
        $.ajax({
            type:"get",
            url:"/user/queryUser",
            dataType:'json',
            data:{
                page:userpage,
                pageSize:userSize
            },
            success:function(res){
                // console.log(res);
                var htmlStr = template('usertmp',res);
                $('tbody').html(htmlStr);
                $("#paginator").bootstrapPaginator({
                    bootstrapMajorVersion:3,//默认是2，如果是bootstrap3版本，这个参数必填
                    currentPage:res.page,//当前页
                    totalPages:Math.ceil(res.total/res.size),//总页数
                    size:"small",//设置控件的大小，mini, small, normal,large
                    onPageClicked:function(a, b, c,page){
                      //为按钮绑定点击事件 page:当前点击的按钮值
                      userpage = page;
                      render();
                    }
                  });
            }
        })
    }
    $('tbody').on('click','.btn',function(){
        // alert(1);
        $('#userModal').modal('show');
        currentId  = $(this).parent().data('id');
        isDelete = $(this).hasClass('btn-danger')?0:1;
    })
    $("#submitBtn").on('click',function(){
        $.ajax({
            type:'post',
            url:'/user/updateUser',
            data:{
                id:currentId,
                isDelete:isDelete
            },
            dataType:'json',
            success:function(res){
                console.log(res.success);
                render();
                $('#userModal').modal('hide');
            }

        })
    })
})
