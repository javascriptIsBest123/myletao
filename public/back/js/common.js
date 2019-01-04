$(document).ajaxStart(function () {
    NProgress.start();
    console.log('ajax 开始');
  });
$(document).ajaxStop(function(){
    setTimeout(function(){
        NProgress.done();
    },1000)
   
})