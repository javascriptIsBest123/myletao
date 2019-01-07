
$(function(){
    var currentPage =1;
     var pageSize = 5;
     render();
     function render(){
        $.ajax({
            type:'get',
            url:'/category/querySecondCategoryPaging',
            data:{
                page:currentPage,
                pageSize:pageSize
            },
            dataType:'json',
            success:function(res){
                // console.log(res);
                var htmlStr = template("secondTmp",res);
                $('tbody').html(htmlStr);
                $("#paginator").bootstrapPaginator({
                    bootstrapMajorVersion:3,//默认是2，如果是bootstrap3版本，这个参数必填
                    currentPage:currentPage,//当前页
                    totalPages:Math.ceil(res.total/res.size),//总页数
                    size:"small",//设置控件的大小，mini, small, normal,large
                    onPageClicked:function(a, b, c,page){
                      //为按钮绑定点击事件 page:当前点击的按钮值
                      currentPage = page;
                      render();
                    }
                  });
            }
        })
     }

    //  让二级模态框显示
    $('.btnadd').on('click',function(){
        // alert(1);
        var pagesize;
        $('#secondModal').modal('show');
        $.ajax({
            url:'/category/queryTopCategoryPaging',
            type:'get',
            dataType:'json',
            data:{
                page:1,
                pageSize:pagesize
            },
            success:function(res){
                console.log(res);
                pagesize = res.rows.length;
                // console.log(pagesize);
                var htmlstr = template('list',res);
                $('.dropdownul').html(htmlstr);
            }
        })
    })

    // 给所有的下拉菜单的 a 添加点击事件 (通过事件委托)
    $('.dropdownul').on('click','a',function(){
        // alert(1);
        var txt = $(this).text();
        $('#dropdownText').text(txt);
        // 获取自定义id
        var id = $(this).data('id');
        // 这里给隐藏域赋值
        $('[name="categoryId"]').val(id);
        // 手动把隐藏域的验证图标显示
        $('#form').data('bootstrapValidator').updateStatus( "categoryId", "VALID");

    })

    $("#fileupload").fileupload({
        dataType:"json",
        //e：事件对象
        //data：图片上传后的对象，通过data.result.picAddr可以获取上传后的图片地址
        done:function (e, data) {
        //   console.log(data);
          var picUrl = data.result.picAddr;
          $('#imgBox img').attr("src",picUrl);
        //   把图片的地址传给隐藏域
          $('[name="brandLogo"]').val(picUrl);
           // 手动把隐藏域的验证图标显示
           $('#form').data('bootstrapValidator').updateStatus( "brandLogo", "VALID");
        }
  });
// 添加验证
$('#form').bootstrapValidator({
    // 设置不验证的ipnut类型(改为全验证)
    excluded: [],
    // 配置图标
    feedbackIcons: {
        valid: 'glyphicon glyphicon-ok',    // 校验成功
        invalid: 'glyphicon glyphicon-remove',   // 校验失败
        validating: 'glyphicon glyphicon-refresh'  // 校验中
      },
      fields:{
        brandName:{
            validators:{
                notEmpty:{
                    message:"请输入二级分类名称"
                }
            }
        },
        categoryId:{
            validators:{
                notEmpty:{
                    message:"请输入一级分类名称"
                }
            }
        },
        brandLogo:{
            validators:{
                notEmpty:{
                    message:'图片不能为空'
                }
            }
        }
      }

});
// 注册表单验证成功事件
$('#form').on("success.form.bv",function(e){
    e.preventDefault();
    // 发送Ajax请求,添加数据
    $.ajax({
        url:'/category/addSecondCategory',
        type:'post',
        data:$('#form').serialize(),
        dataType:'json',
        success:function(res){
            if(res.success){
                // 二级模态框关闭
                $('#secondModal').modal('hide');
                // 重新渲染第一页
                currentPage = 1;
                render();
                //重置表单内容
                $("#form").data('bootstrapValidator').resetForm(true);
                // 手动重置非form表单的内容
                $("#dropdownText").text("请选择一级分类");
                $("#imgBox img").attr("src","");

            }
        }
    })
})
   
})
