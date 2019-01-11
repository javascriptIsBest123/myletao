
$(function(){
   /*
   我们约定操作的键名: search_list
   以下三句话, 用于在控制台执行, 添加存储假数据
   var arr = ["老奶奶", "老北京", "耐克", "耐克王", "阿迪王" ];
   var jsonStr = JSON.stringify( arr );
   localStorage.setItem( "search_list", jsonStr );
  * */
// /历史记录渲染
render();

        // 获取本地数据
    function getHistory(){
        // 如果数据为空,传个空数组字符串
        var jsonarr = localStorage.getItem('search_list') ||'[]';
        var arr = JSON.parse(jsonarr);
        return arr;
    }
    // 渲然的函数
    function render(){
        var arr = getHistory();
        var htmlstr = template('searchTpl',{arr:arr});
        $('.lt_history').html(htmlstr);
    }
    // 清空
    $('.lt_history').on('click','.btn_empty',function(){
        mui.confirm("你确定要清空历史记录嘛?", "温馨提示", ["取消", "确认"], function (e) {
            console.log(e);
            if (e.index === 1) {
                // 点击了确认
                // 移除本地历史
                localStorage.removeItem("search_list");
                // 重新渲染
                render();
            }
        })
    })
    // 删除一条
    $('.lt_history').on('click','.btn_delete',function(){
        var that = this;
        mui.confirm("你确定要删除该条记录嘛", "温馨提示", ["取消", "确认"], function (e) {

            if (e.index === 1) {
                // 点击确认按钮

                // 获取下标
                var index = $(that).data("index");
                // 获取数组
                var arr = getHistory();
                // 根据下标删除某项
                // splice( 从哪开始, 删几个, 添加的项1, 添加的项2, ..... );
                arr.splice(index, 1);

                // 转成 jsonStr 存入本地存储
                var jsonStr = JSON.stringify(arr);
                localStorage.setItem("search_list", jsonStr);

                // 重新渲染
                render();
            }

        })
    })

    // 功能4: 点击搜索按钮, 添加搜索记录
    $('.search_btn').click(function(){
        var key = $('.search_input').val();  //获取输入框的文本
        if(key.trim()===""){
            mui.toast("请输入关键字",{
                duration:2500
            });
            return;
          }
          var arr = getHistory();  //获取数组
        //   判断搜索历史中有没有key,有就删除原有的
          var index = arr.indexOf(key);
          if(index !==-1){
              arr.splice(index,1);
          }
        //   如果搜索历史的长度大于10,删除最后一个
        if(arr.length>=10){
            arr.pop();
        }
        // 将key添加到搜索历史的第一位
        arr.unshift(key);
        localStorage.setItem('search_list',JSON.stringify(arr));
        render();
        // 清空input
        $('.search_input').val("");
        // // 搜索完成, 跳转到搜索列表, 并将搜索关键字传递过去
        location.href = "searchList.html?key=" + key;
    })
})
