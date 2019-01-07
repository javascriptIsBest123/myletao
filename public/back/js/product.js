
$(function(){
    var picArr = []; //用来存放上传的多文件
    var currentPage = 1;
    var pageSize = 2;
    render();
    function render(){
        $.ajax({
            url:"/product/queryProductDetailList",
            type:'get',
            data:{
                page:currentPage,
                pageSize:pageSize
            },
            dataType:'json',
            success:function(res){
                console.log(res);
                var htmlStr = template('productTMP',res);
                $('tbody').html(htmlStr);
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
    };

    //让添加商品的模态框展示
    $('#addBtn').on("click",function(){
        // alert(1);
        $('#productModal').modal('show');
        $.ajax({
            url:'/category/querySecondCategoryPaging',
            type:'get',
            data:{
                page:1,
                pageSize:100
            },
            dataType:'json',
            success:function(res){
                // console.log(res);
                var htmlS = template("productList",res);
                $('.dropdownul').html(htmlS);
            }
        })
    });
    // 给所有的下拉列表的a注册事件
    $(".dropdownul").on('click','a',function(){
        // alert(1);
        var txt = $(this).text();
        // 获取自定义id
        var id = $(this).data('id');
        $('#dropdownText').text(txt);
        // 给name= "brandid"的隐藏域设置id
        $('[name = "brandId"]').val(id);

         // 手动将隐藏域校验状态改成成功
    $('#form').data("bootstrapValidator").updateStatus("brandId", "VALID");
    });

    //配置多文件上传
    $('#fileupload').fileupload({
        dataType:'json',
        done:function(e,data){
            var picObj = data.result; //后台返回的图片对象
            picArr.unshift(picObj);   //在数组的前面追加
            var picUrl = picObj.picAddr; //返回图片地址
            $('#imgBox').prepend('<img style="width: 100px;" src="'+ picUrl +'" alt="">');
            if(picArr.length>3){
                picArr.pop();  //将数组的最后一个移除
                $('#imgBox img:last-of-type').remove();  //将最后一个img移除
            }
            if(picArr.length ==3){
                $('#form').data("bootstrapValidator").updateStatus("picStatus", "VALID");
            }
        }
    });

    // 配置验证
  $('#form').bootstrapValidator({
    // 配置不校验的类型, 对 hidden 需要进行校验
    excluded: [],

    // 配置图标
    feedbackIcons: {
      valid: 'glyphicon glyphicon-ok',    // 校验成功
      invalid: 'glyphicon glyphicon-remove',   // 校验失败
      validating: 'glyphicon glyphicon-refresh'  // 校验中
    },

    // 配置校验字段
    fields: {
      brandId: {
        validators: {
          notEmpty: {
            message: "请选择二级分类"
          }
        }
      },
      proName: {
        validators: {
          notEmpty: {
            message: "请输入商品名称"
          }
        }
      },
      proDesc: {
        validators: {
          notEmpty: {
            message: "请输入商品描述"
          }
        }
      },
      num: {
        validators: {
          notEmpty: {
            message: "请输入商品库存"
          },
          // 商品库存格式, 必须是非零开头的数字
          // 需要添加正则校验
          // 正则校验
          // 1,  11,  111,  1111, .....
          /*
          *   \d 表示数字 0-9
          *   +     表示出现1次或多次
          *   ?     表示出现0次或1次
          *   *     表示出现0次或多次
          *   {n}   表示出现 n 次
          *   {n,m} 表示出现 n 到 m 次
          * */
          regexp: {
            regexp: /^[1-9]\d*$/,
            message: '商品库存格式, 必须是非零开头的数字'
          }
        }
      },
      size: {
        validators: {
          notEmpty: {
            message: "请输入商品尺码"
          },
          // 要求: 必须是 xx-xx 的格式, xx为两位的数字
          regexp: {
            regexp: /^\d{2}-\d{2}$/,
            message: '必须是 xx-xx 的格式, xx为两位的数字, 例如: 36-44'
          }
        }
      },
      oldPrice: {
        validators: {
          notEmpty: {
            message: "请输入商品原价"
          }
        }
      },
      price: {
        validators: {
          notEmpty: {
            message: "请输入商品现价"
          }
        }
      },
      picStatus: {
        validators: {
          notEmpty: {
            message: "请上传三张图片"
          }
        }
      }
    }
  });

    //  注册表单校验成功事件
    $('#form').on('success.form.bv',function(e){
        e.preventDefault();

        var paramsStr = $('#form').serialize();
        // picArr是JSON.stringify后的数组字符串(格式见备注)
        paramsStr+= "&picArr="+JSON.stringify(picArr);
        $.ajax({
            type:'post',
            url:'/product/addProduct',
            data:paramsStr,
            dataType:'json',
            success:function(res){
                if(res.success){
                    $('#productModal').modal('hide');
                    currentPage = 1;
                    render();
                    $('#form').data("bootstrapValidator").resetForm(true);

                    // // 将下拉菜单的按钮文本 和 图片重置
                    $('#dropdownText').text("请选择二级分类");
                    $('#imgBox img').remove();
                }
            }
        })
    }) 

})
