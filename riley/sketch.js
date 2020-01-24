
var w = 100;
var h = 75;
var h_offset = 100;

var row_tracker = 0;  // universal variable to track row sequence

var start_x = 0;
var start_y = 0;

var palette = [];   // array for palette
var seg_array = []; // array for segment objects

var save_counter = 0;
var intro = true;

function setup() {

  palette = [ color('#449A8B'),color('#D55A00'),color('#DF3D40'),color('#433A4B'),color('#A1A2AD'),
              color('#BB637A'),color('#DBBC7F'),color('#FBB186'),color('#657901'),color('#89483D'),
              color('#F28415'),color('#A71932'),color('#6F7A84'),color('#84B113')]

  frameRate(60);
  createCanvas(windowWidth, windowHeight);

  for (let i=0; i<1000; i++){

    // if first segment use x & y start pos, else refer to last segment
    if (i == 0){
      s = new Segment(start_x, start_y, w, h, h_offset);

    } else {
      s = new Segment(seg_array[i-1].next_x, seg_array[i-1].next_y, w, h, h_offset);
    }

    seg_array.push(s);
    s.show();
  }
}

function draw() {

  fill(255);
  stroke(255);
  strokeWeight(0);
  textSize(50);
  textAlign(CENTER);

  if(intro){
    text('press any key for a new pattern', windowWidth / 2, windowHeight / 3);
    text('click to save', windowWidth / 2, windowHeight / 3 * 2);
  }
}


class Segment {

  constructor(x, y, w, h, h_offset) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.h_offset = h_offset;

    // record row and position of next coords
    this.row = 0;
    this.next_x = 0;
    this.next_y = 0;
  }

  show() {

    let c = random(palette.slice(0, 15));

    fill(c);
    stroke(c);

    strokeWeight(1);
    rectMode(CORNERS);

    quad(this.x, this.y,
      this.x, this.y-h,
      this.x+w, this.y-h_offset-h,
      this.x+w, this.y-h_offset);

    // update next start position
    if (this.y-h_offset > 0 ){
      this.next_x = this.x+w;
      this.next_y = this.y-h_offset;

    } else {
      row_tracker += 1;
      this.next_x = start_x;
      this.next_y = start_y + (h * row_tracker);

    }
  }
}



function mouseClicked(){

  save_counter += 1;
  saveCanvas(('riley_snap_' + save_counter), 'png');
}

function keyPressed(){
  intro = false;
  for (let s of seg_array){
    s.show();
  }
}
