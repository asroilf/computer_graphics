var canvas;
var context;

window.onload = init;
var GRID_SIZE = 30;
var GRID_COLOR = "black";
var LINE_COLOR = "red";

var lineX0, lineY0;
var lineX1, lineY1;

var startNewLine=false;

function init(){
    canvas = document.getElementById("gl-canvas");
    context = canvas.getContext("2d");

    if(context){
        drawGrid();

        canvas.onclick = onClick;

    }
}

function onClick(e){
    startNewLine = !startNewLine;
    rect = canvas.getBoundingClientRect();

    x = e.clientX - rect.left;
    y = e.clientY - rect.top;

    x = Math.floor(x/GRID_SIZE);
    y = Math.floor(y/GRID_SIZE);

    if(startNewLine){
        lineX0=x;
        lineY0=y;
        drawPixel(lineX0, lineY0);
    }else{
        lineX1=x;
        lineY1=y;
        drawBrasenham();
    }

}

function drawPixel(x, y){
    context.fillStyle = LINE_COLOR;
    x = x * GRID_SIZE;
    y = y * GRID_SIZE;
    context.fillRect(x, y, GRID_SIZE, GRID_SIZE);

}

function drawBrasenham(){

    if(lineX0>lineX1){      // The following condition is intended to draw the line when the slope is less than 1 to the opposite direction.
        var temp = lineX0
        lineX0 = lineX1
        lineX1 = temp
        temp = lineY1
        lineY1 = lineY0
        lineY0 = temp
    }

    x = lineX0;
    y = lineY0;
    dx = lineX1 - lineX0;
    dy = lineY1 - lineY0;
    if(dy<0){                       // In case the endpoint y1 is less than starting point y0.
        dy*=-1;
    }
    d = dx;
    while(x<=lineX1){
        drawPixel(x, y);
        x+=1;
        d = d-2*dy;

        if(d<0){
            if(lineY1<lineY0){      // If the endpoint is located at above coordinate but slope is less than 1.
                y-=1;
            }else{
                y+=1;
            }
            d=d + 2*dx;
        }
    }
}


function drawLine(x, y, x2, y2){

        context.beginPath();
        context.moveTo(x, y);
        context.lineTo(x2, y2);
        context.stroke();
}

function drawGrid(){
    context.strokeStyle = GRID_COLOR;
    context.lineWidth = 1;

    // vertical lines
    x=0;
    while(x<=canvas.clientWidth){
        drawLine(x, 0, x, canvas.clientHeight);
        x+=GRID_SIZE;
    }

    // horizontal lines
    y=0;
    while(y<=canvas.clientHeight){
        drawLine(0, y, canvas.clientWidth, y);
        y+=GRID_SIZE;
    }

}


