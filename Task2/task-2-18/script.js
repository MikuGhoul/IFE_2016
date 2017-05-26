function getValue(){
    var number=document.getElementById("number");
    return number.value;
}
function produceDiv(value){
    var newDiv=document.createElement("div");
    newDiv.innerText=value;
    return newDiv;
}
function leftInput(){
    var value=getValue();
    var newDiv=produceDiv(value);
    var queue=document.getElementById("queue");
    queue.appendChild(newDiv);
}
function rightInput(){
    var value=getValue();
}
function leftOutput(){
    var value=getValue();
}
function rightOutput(){
    var value=getValue();
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
    })
}
window.onload=init;