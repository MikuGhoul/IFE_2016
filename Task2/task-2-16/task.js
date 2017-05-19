/**
 * aqiData，存储用户输入的空气指数数据
 * 示例格式：
 * aqiData = {
 *    "北京": 90,
 *    "上海": 40
 * };
 */
var aqiData = {};

/**
 * 从用户输入中获取数据，向aqiData中增加一条数据
 * 然后渲染aqi-list列表，增加新增的数据
 */
function addAqiData() {
  var cityStr = document.getElementById("aqi-city-input").value.trim();
  var aqiStr = document.getElementById("aqi-value-input").value.trim();
  var reg=/^[\u4e00-\u9fa5a-zA-Z]+$/g;
  if (cityStr.match(reg)){
      if (Number.isInteger(Number(aqiStr))){
        aqiData[cityStr]=Number(aqiStr);
      }else{
        alert("空气质量指数必须为整数！");
      }
  }else{
    alert("城市名必须为中英文字符！");
  }
}

/**
 * 渲染aqi-table表格
 */
function renderAqiList() {
  var table=document.getElementById("aqi-table");
  var trHTML="<tr><td>城市</td><td>空气质量</td><td>操作</td></tr>";
  /**
   * 获取对象属性的数组
   */
  // console.log(proList);
  for (proList in aqiData){
    trHTML+="<tr><td>"+proList+"</td><td>"+aqiData[proList]+"</td><td><button id='aqi-del'>删除</button></td></tr>";
  }
  table.innerHTML=trHTML;
}

/**
 * 点击add-btn时的处理逻辑
 * 获取用户输入，更新数据，并进行页面呈现的更新
 */
function addBtnHandle() {
  addAqiData();
  renderAqiList();

}

/**
 * 点击各个删除按钮的时候的处理逻辑
 * 获取哪个城市数据被删，删除数据，更新表格显示
 */
function delBtnHandle(_this) {
  // do sth.
  var thisTr=_this.parentNode.parentNode;
  var cityStr=thisTr.children[0].firstChild.nodeValue;
  // console.log(aqiData);
  // console.log(delete aqiData[cityStr]);
  // console.log(aqiData);
  delete aqiData[cityStr];
  renderAqiList();
}

function init() {

  // 在这下面给add-btn绑定一个点击事件，点击时触发addBtnHandle函数
    var addBtn = document.getElementById("add-btn");
    addBtn.onclick = function () {
    addBtnHandle();
  };
  // 想办法给aqi-table中的所有删除按钮绑定事件，触发delBtnHandle函数
  var aqiTable = document.getElementById("aqi-table");
  aqiTable.addEventListener('click',function(e){
    // console.log(e.target.nodeName==="BUTTON");
    if(e.target.nodeName==="BUTTON"){
      delBtnHandle(e.target);
    }
  })
}

window.onload = init;