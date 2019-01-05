$(function() {

    // 基于准备好的dom，初始化echarts实例
    var myChart = echarts.init(document.querySelector(".echarts_left"));
  
    // 指定图表的配置项和数据
    var option = {
      title: {
        text: '2019年注册人数'
      },
      tooltip: {},
      legend: {
        data:['销量']
      },
      xAxis: {
        data: ["衬衫","羊毛衫","雪纺衫","裤子","高跟鞋","袜子"]
      },
      yAxis: {},
      series: [{
        name: '销量',
        type: 'bar',
        data: [5, 20, 36, 10, 10, 20]
      }]
    };
  
    // 使用刚指定的配置项和数据显示图表。
    myChart.setOption(option);


    // 右侧的饼图
    var echarts_right = echarts.init(document.querySelector(".echarts_right"));

    var option2 = {
      title:{
        text:'热门品牌销售',
        subtext:'2019年1月',
        x:'center'
      },
      tooltip:{
        trigger:'item',
        formatter:"{a} <br/>{b} : {c} ({d}%)"
      },
      legend:{
        orient:'vertical',
        left:'left',
        data:['耐克','阿迪','老奶奶','老北京','特步']
      },
      series:[{
        name:'品牌热卖',
        type:'pie',
        radius:'55%',
        center:['50%','60%'],
        data:[
          {value:335, name:'耐克'},
          {value:310, name:'阿迪'},
          {value:234, name:'老奶奶'},
          {value:135, name:'老北京'},
          {value:1548, name:'特步'}
        ],
        itemStyle: {
          // 添加阴影效果
          emphasis: {
            shadowBlur: 100,
            shadowOffsetX: 0,
            shadowColor: 'yellow'
          }
        }
      }]
    };
    echarts_right.setOption(option2);
  
  })