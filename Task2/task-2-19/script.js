
function getNewDiv(){
    var number=document.getElementById("number");
    var newDiv=document.createElement("div");
    if (!number.value.match(/^\d+$/i))
        return -1;
    if (number.value>100 || number.value < 10)
        return -1;
    var divQueue=document.getElementById("queue").getElementsByTagName("div");
    if(divQueue.length+1 > 60){
        //alert("队列元素不可超过60个！");
        return 0;
    }
    newDiv.style.height=number.value+"px";
    newDiv.setAttribute("value",number.value);
    //newDiv.innerText=number.value;

    //newDiv.style.width=(100-(divQueue.length+1)/100)+"%";
    return newDiv;
}
function displayDeleteNum(deletDiv){
    var displayDiv=document.getElementById("delet");
    displayDiv.innerText=deletDiv.getAttribute("value");
    var displayDelete=document.getElementById("displayDelet");
    displayDelete.style.display="block";
}
function leftInput(){
    var newDiv=getNewDiv();
    if (newDiv == -1){
        alert("输入非法！请输入10-100之间的数字");
        return false;
    } else if (newDiv == 0){
        alert("队列元素不可超过60个！");
        return false;
    }
    var queue=document.getElementById("queue");
    var firstDiv=queue.getElementsByTagName("div")[0];
    if (firstDiv){
        queue.insertBefore(newDiv,firstDiv);
    } else {
        rightInput();
    }
}
function rightInput(){
    var newDiv=getNewDiv();
    if (newDiv == -1){
        alert("输入非法！请输入10-100之间的数字");
        return false;
    } else if (newDiv == 0){
        alert("队列元素不可超过60个！");
        return false;
    }
    var queue=document.getElementById("queue");
    queue.appendChild(newDiv);
}

function leftOutput(){
    var queue=document.getElementById("queue");
    var firstDiv=queue.getElementsByTagName("div")[0];
    if (firstDiv){
        
        displayDeleteNum(firstDiv);
        queue.removeChild(firstDiv);
    }
}
function rightOutput(){
    var queue=document.getElementById("queue");
    var divList=queue.getElementsByTagName("div");
    if (divList.length){
        var lastDiv=divList[divList.length-1];
        displayDeleteNum(lastDiv);
        queue.removeChild(lastDiv);
    }
}
function queueSort(){
    var divList=document.getElementById("queue").getElementsByTagName("div");
    var heightList=[];
    for (var i=0;i<divList.length;i++){
        heightList[i]=divList[i].getAttribute("value");
    }
    for (var i=0;i<heightList.length;i++){
        for (var j=i+1;j<heightList.length;j++){
            if (heightList[i]>heightList[j]){
                var temp=heightList[i];
                heightList[i]=heightList[j];
                heightList[j]=temp;
            }
        }
    }
    for (var i=0;i<divList.length;i++){
        divList[i].style.height=heightList[i]+"px";
    }
}
function init(){
    var handleBox=document.getElementById("handle");
    handleBox.addEventListener("click",function(e){
        switch(e.target.innerHTML){
            case "左输入":
                leftInput();break;
            case "右输入":
                rightInput();break;
            case "左输出":
                leftOutput();break;
            case "右输出":
                rightOutput();break;
            case "排序":
                queueSort();break;
        }
    });
    var queueBox=document.getElementById("queue");
    queueBox.addEventListener("click",function (e){
        if (e.target.getAttribute("id")!="queue"){
            displayDeleteNum(e.target);
            queueBox.removeChild(e.target);
        }
    })
}
window.onload=init;