$(function () {
    $('#form').bootstrapValidator({
        // 指定验证显示的小图标
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },

        // 验证规则
        fields: {
            username: {
                validators: {
                    notEmpty: {
                        message: '用户名不能为空'
                    },
                    stringLength: {
                        min: 2,
                        max: 6,
                        message: '用户名长度在2到6之间'
                    },
                    callback:{
                        message:'用户名不存在'
                    }
                }
            },
            password: {
                validators: {
                    notEmpty: {
                        message: '用户名不能为空'
                    },
                    stringLength: {
                        min: 6,
                        max: 20,
                        message: '用户名长度在6到20之间'
                    },
                    callback:{
                        message:'密码错误'
                    }
                }
            }
        }
    })

    //验证成功触发事件
    $("#form").on('success.form.bv', function (e) {
        e.preventDefault();
        $.ajax({
            type: 'post',
            url: '/employee/employeeLogin',
            data: $('#form').serialize(),
            dataType: 'json',
            success: function (res) {
                //判断登陆状态
                if (res.error === 1000) {
                    // alert("用户名错误");
                    $("#form").data('bootstrapValidator').updateStatus("username", "INVALID", "callback");
                    return;
                }
                if (res.error === 1001) {
                    // alert("密码错误");
                    $("#form").data('bootstrapValidator').updateStatus("password", "INVALID", "callback");
                    return;
                }
                if (res.success) {
                    location.href = "index.html";
                    return;
                }
            }
        })
    })

    // 重置表单中设置过校验的内容，隐藏所有错误提示和图标。
    $('[type="reset"]').on('click', function () {
        var validator = $("#form").data('bootstrapValidator');  //获取表单校验实例
        validator.resetForm();
    })
})