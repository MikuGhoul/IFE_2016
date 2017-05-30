
function judgeString(){
    var numberString=document.getElementById("number").value;
    console.log(numberString);
    console.log(numberString.replace(/,/g,"、"));
}

function getNewDiv(){
    judgeString();
    var number=document.getElementById("number");
    var newDiv=document.createElement("div");
    if (!number.value.match(/^\d+$/i))
        return false;
    newDiv.innerText=number.value;
    return newDiv;
}
function displayDeleteNum(deletDiv){
    var displayDiv=document.getElementById("delet");
    displayDiv.innerText=deletDiv.innerText;
    var displayDelete=document.getElementById("displayDelet");
    displayDelete.style.display="block";
}
function leftInput(){
    var newDiv=getNewDiv();
    if (!newDiv){
        alert("输入非法");
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
    if (!newDiv){
        alert("输入非法！");
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