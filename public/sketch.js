// const { text } = require("express");

var socket;
let totalConnections=1;
var penInd=0;
var colors = ["white","red", "blue", "green", "yellow", "orange"];

//https://livecanva.herokuapp.com
function setup() {
    createCanvas(windowWidth, windowHeight);
    let density = displayDensity();
    pixelDensity(density);
    background(51);
    socket=io.connect('https://shared-canva.herokuapp.com/');
    socket.on('mouse',newDrawing);
    socket.on('changed',(data)=>{
        console.log(data);
        totalConnections=data;
    });
    colors.push(color(51));
}

function newDrawing(data){
    noStroke();
    fill(colors[data.penInd]);
    ellipse(data.x,data.y,36,36);
}

function mouseDragged(){
    var data={
        penInd:penInd,
        x:mouseX,
        y:mouseY
    }
    socket.emit('mouse',data);
    noStroke();
    fill(colors[penInd]);
    ellipse(mouseX,mouseY,36,36);
}

function draw() {
    fill(51);
    rect(0,0,width,60);
    fill(0,255,0);
    textSize(20);
    text("Online:"+totalConnections,40,40);
    drawColorTab();
}


function drawColorTab(){
    for(var i=0;i<colors.length;i++){
        fill(colors[i]);
        rect(150+55*i,10,50,40);
        if(i==penInd){
           fill(0,1);
        }else{
            fill(0,200);
        }
        rect(150+55*i,10,50,40);
    }
}

function mouseClicked(){
    if(mouseY<50 && mouseY>10 && mouseX>150&& mouseX<150+55*colors.length){
        penInd=(mouseX-150)/55;
        penInd=int(penInd);
    }
}