// 专门获取地址栏的参数

function getSearch(k){

    // 获取地址栏参数www.baidu.com?name=pp&age=18&desc=帅
    var str = location.search;
    // 进行中文解码
    str = decodeURI(str);

    //从下标为一的地方一直截取到最后:?name=pp&age=18&desc=帅
    str = str.slice(1);
    // 根据&进行分割
    var arr = str.split("&");
    
    var obj ={};
    arr.forEach(function(v,i){
        var key = v.split("=")[0];
        var value =  v.split("=")[1];
        obj[key] = value;
    })
    return   obj[k]; 
}