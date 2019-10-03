
var cx;
var cy;

var startx, starty;
var sizex, sizey;
var shiftx, shifty;
var minx, miny;

var n;

// var moving = windowWidth;

function setup() {

  createCanvas(windowWidth, windowHeight);
  // background(color(48, 39, 140));

  // cx = windowWidth / 2;
  // cy = windowHeight / 2;

  startx = windowWidth * 0.2;
  starty = windowHeight * 0.2;
  shiftx = 10;
  shifty = 10;
  sizex = 500;
  sizey = 500;

  n = 10;

  noFill();
  stroke(0);
  strokeWeight(2)

  // rect(startx, starty, sizex, sizey);

  for(var i = 0; i < 10; i++){

    startx = startx + shiftx;
    starty = starty + shifty;

    rect(startx, starty, sizex, sizey);
    // print(i);
  }

}

function draw() {


}
