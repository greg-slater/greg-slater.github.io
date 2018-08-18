var palette;
var finish = false;
var moving = false;
var c = 0;
var spinners = [];

function setup() {
  colorMode(HSL);
  angleMode(DEGREES);

  palette = [ [color(41,78,73),color(191,48,23)],
              [color(320,78,60),color(290,48,18)],
              [color(155,68,53),color(300,48,23)]]

  // palette = [color(155,68,53),color(300,48,23)];
  // palette = [color(320,78,60),color(290,48,18)];
  // palette = [color(41,78,73),color(191,48,23)];
  createCanvas(windowWidth, windowHeight);

  // set number of spinners in x direction then set other distance variables
  let xn = 50;
  let l = windowWidth / xn;
  let w = l*.5;
  let yn = ceil(windowHeight / l)
  let x = l/2;

  // cycle across window
  for (let i=0; i<xn; i++){
    let y = l/2;
    for (let j=0; j<yn; j++){
      let s = new Spinner(x, y, l*1.03);
      spinners.push(s);
      y += l;
    }
    x += l;
  }
}

function draw() {
  background(palette[c][1]);

  for (let s of spinners){
    s.show();
    s.spin();
  }
}

class Spinner{
  constructor(x, y, l){
    this.x = x;
    this.y = y;
    this.l = l;
    this.r = 0;
    this.s = 0;
    this.d = 0;
    this.stoprange = false;
    this.moving = false;
  }
  show(){
    push();
    rectMode(CENTER);
    translate(this.x, this.y);
    rotate(this.r);
    stroke(palette[c][0]);
    fill(palette[c][0]);
    rect(0, 0, this.l, this.l);
    pop();
  }
  spin(){

    // calulate no. of degrees left to next quarter turn
    this.d = 90 -(this.r % 90);
    // if very close to quarter turn set stoprange to true
    if (this.moving && this.d < 2) this.stoprange = true;

    // every 10 frames..
    if (frameCount % 10 == 0){
      // below certain speed threshold keep speed constant
      if(this.moving && this.s<1){
        this.s = this.s;
        // and if in stoprange turn to quarter then stop
        if (this.stoprange){
          this.r = 0;
          this.s = 0;
          this.moving = false;
          this.stoprange = false;
        }
      }
      // else reduce speed by half each go
      else this.s = this.s/2;
    }

    // keep turning
    this.r += this.s;
  }
  // when called sets spinning at random speed
  trigger1(){
      this.moving = true;
      this.s = random(24, 40);
    }
  trigger2(){
    if(dist(this.x, this.y, mouseX, mouseY) < (windowWidth/20)){
      this.moving = true;
      this.s = random(24, 40);
    }
  }
}

// call trigger for all spinners on mouseclick
function mouseClicked(){
  for(let s of spinners){
    s.trigger1();
  }
}
function mouseMoved(){
  for(let s of spinners){
    s.trigger2();
  }
}

function keyPressed(){
  if(c == 2) c = 0;
  else c += 1;
}
