/* 数据格式演示
var aqiSourceData = {
  "北京": {
    "2016-01-01": 10,
    "2016-01-02": 10,
    "2016-01-03": 10,
    "2016-01-04": 10
  }
};
*/

// 以下两个函数用于随机模拟生成测试数据
function getDateStr(dat) {
  var y = dat.getFullYear();
  var m = dat.getMonth() + 1;
  m = m < 10 ? '0' + m : m;
  var d = dat.getDate();
  d = d < 10 ? '0' + d : d;
  return y + '-' + m + '-' + d;
}
function randomBuildData(seed) {
  var returnData = {};
  var dat = new Date("2016-01-01");
  var datStr = ''
  for (var i = 1; i < 92; i++) {
    datStr = getDateStr(dat);
    returnData[datStr] = Math.ceil(Math.random() * seed);
    dat.setDate(dat.getDate() + 1);
  }
  return returnData;
}

var aqiSourceData = {
  "北京": randomBuildData(500),
  "上海": randomBuildData(300),
  "广州": randomBuildData(200),
  "深圳": randomBuildData(100),
  "成都": randomBuildData(300),
  "西安": randomBuildData(500),
  "福州": randomBuildData(100),
  "厦门": randomBuildData(100),
  "沈阳": randomBuildData(500)
};

// 用于渲染图表的数据
var chartData = {};

// 记录当前页面的表单选项
var pageState = {
  nowSelectCity: 0,
  nowGraTime: "day"
}

/**
 * 渲染图表
 */
function renderChart() {
  
  var graTimeNow=chartData[pageState.nowGraTime];
  var selectCityNow=Object.keys(aqiSourceData)[pageState.nowSelectCity];

  var nowData=graTimeNow[selectCityNow];
  var colHeight=[];
  var tally=0;
  for (var i in nowData){
    colHeight[tally++]=nowData[i];
  }
  var colLength=Object.keys(nowData).length;
  var colWidth;
  if (colLength ==3 ){
    colWidth="200px";
  } else if (colLength == 15){
    colWidth="30px"
  } else {
    colWidth="5px";
  }
  var wrapHTML="";
  for (var i=0;i<colLength;i++){
    wrapHTML+="<div></div>"
  }
  var bgColor=["#00ae9d","#009ad6","#999d9c","#f05b72","#b2d235","#bb505d","#ffd400","#77787b","#1d1626"];

  var chartWarp=document.getElementById("chart-wrap");
  chartWarp.innerHTML=wrapHTML;
  var itemCol=chartWarp.getElementsByTagName("div");
  for (var i=0;i<itemCol.length;i++){
    itemCol[i].style.height=colHeight[i];
    itemCol[i].style.width=colWidth;
    itemCol[i].style.backgroundColor=bgColor[Math.floor(Math.random()*bgColor.length)];
    itemCol[i].style.transition="height 2s";
    itemCol[i].setAttribute("title","AQI:"+colHeight[i]);
  }
}

/**
 * 日、周、月的radio事件点击时的处理函数
 */
function graTimeChange() {
  // 确定是否选项发生了变化 
  var input=document.getElementById("form-gra-time").getElementsByTagName("input");
  for (var i=0;i<input.length;i++){
    if (input[i].checked){
      if (input[i].value == pageState.nowGraTime){
        return;
      } else  {
        pageState.nowGraTime=input[i].value;// 设置对应数据
        renderChart();// 调用图表渲染函数
      }
    }
  }
}

/**
 * select发生变化时的处理函数
 */
function citySelectChange() {
  // 确定是否选项发生了变化 
  var select=document.getElementById("city-select");
  if (select.selectedIndex == pageState.nowSelectCity){
    return;
  } else  {
    pageState.nowSelectCity=select.selectedIndex; // 设置对应数据
    renderChart();// 调用图表渲染函数
  }
}

/**
 * 初始化日、周、月的radio事件，当点击时，调用函数graTimeChange
 */
function initGraTimeForm() {
  var graTime=document.getElementById("form-gra-time");
  graTime.addEventListener("click",function(e){
    if (e.target.nodeName == "INPUT"){
      graTimeChange();
    }
  })
}

/**
 * 初始化城市Select下拉选择框中的选项
 */
function initCitySelector() {
  // 读取aqiSourceData中的城市，然后设置id为city-select的下拉列表中的选项
  var select=document.getElementById("city-select");
  var optionHtml="";
  for (var i in aqiSourceData){
    optionHtml+="<option>"+i+"</option>"
  }
  select.innerHTML=optionHtml;
  // 给select设置事件，当选项发生变化时调用函数citySelectChange
  select.addEventListener('change',function(){
    citySelectChange();
  })
}

/**
 * 初始化图表需要的数据格式
 */
function initAqiChartData() {
  // 将原始的源数据处理成图表需要的数据格式
  // console.log(aqiSourceData);
  chartData.day=aqiSourceData;
  chartData.week={};
  chartData.month={};
  //console.log(chartData);
  var monthOneDay=0,monthTwoDay=0,monthThreeDay=0;
  for (var i in aqiSourceData['北京']){
    var aqiMonth=i.slice(6,7);
    switch (aqiMonth){
      case '1':monthOneDay++;break;
      case '2':monthTwoDay++;break;
      case '3':monthThreeDay++;break;
    }
  }
  for (var i in aqiSourceData){  // i : '北京','上海' ...
    var tallyMonth=0;
    var tallyWeek=0;
    var sumMonthAqi=0;
    var sumWeekAqi=0;
    chartData.month[i]={};
    chartData.week[i]={};
    var countWeek=1;
    for (var j in aqiSourceData[i]){  // j : '2016-1-1','2016-1-2' ....
      //charDataMonth
      sumMonthAqi+=aqiSourceData[i][j];tallyMonth++;
      if (tallyMonth == monthOneDay && j.slice(6,7) == '1'){
        chartData.month[i][j.slice(0,7)]=Math.ceil(sumMonthAqi/monthOneDay);
        sumMonthAqi=0;tallyMonth=0;
      } else if (tallyMonth == monthTwoDay && j.slice(6,7) == '2'){
        chartData.month[i][j.slice(0,7)]=Math.ceil(sumMonthAqi/monthTwoDay);
        sumMonthAqi=0;tallyMonth=0;
      } else  if (tallyMonth == monthThreeDay && j.slice(6,7) == '3'){
        chartData.month[i][j.slice(0,7)]=Math.ceil(sumMonthAqi/monthThreeDay);
        sumMonthAqi=0;tallyMonth=0;
      }
      //charDataWeek
      sumWeekAqi+=aqiSourceData[i][j];tallyWeek++;
      if (tallyWeek <7 && (tallyMonth == monthOneDay || tallyMonth == monthTwoDay || tallyMonth == monthThreeDay)){
        chartData.week[i][j.slice(0,7)+"/"+countWeek++]=Math.ceil(sumWeekAqi/tallyWeek);
      } else  if (tallyWeek == 7){
        chartData.week[i][j.slice(0,7)+"/"+countWeek++]=Math.ceil(sumWeekAqi/tallyWeek);
        sumWeekAqi=0;tallyWeek=0;
      }

    }
  }
  // 处理好的数据存到 chartData 中
  
}

/**
 * 初始化函数
 */
function init() {
  initGraTimeForm();
  initCitySelector();
  initAqiChartData();
}

window.onload=init;
