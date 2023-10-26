//lood different 
 function drawTree(infoObj){
  push();
  //translate(infoObj.x, 0,infoObj.z);
  translate(0, -infoObj.height,0);
  scale(infoObj.s);
  rotateY(PI*infoObj.m);
  //texture(img);
  t[infoObj.m]=t.draw()
  pop();
}

function genTreeInfo(){
  return{
    //x:random(800),
    //y:0,
    //z:random(500),
    width:random (20,50),
    height:random(-10,30),
    depth:random(20,80),
    s:random(0.3,0.8),
    m:random(-1,10)
  };
}
  
function  generateTreeInfos(){
  for(var i=1;i<20;i++){
    treeInfos.push(genTreeInfo());
  }
}




function randomize() {
  ml = level // maximum level
  rsa = random(TWO_PI) // random start angle 
  //bgc = color(random(255), random(40, 70), 255) // background color
  //swc = color(random(255), random(40, 70), 255) // side walk color
  bhv = random(0, 100) // branch hue value
  lhv = random(0, 360) // leaf hue value
  lsv = random(0, 360) // leaf saturation value
  fhv = 70; // flower hue value
  while (fhv > 70 && fhv < 170) fhv = random(360)
  fc = color(fhv, random(0, 255), 255) // flower color
  rr = random(20, 80) // rotatian range
  sl = random(10, 50) // start length
  ss = random(2, 5) // start size
  rl = random(0.0, 0.5) // random length
  sd = random(0.5, 0.6) // size decay
  ld = map(sl, 10,30, 1.1, 0.85) // length decay
  ll = int(random(0, 5)) // leaf level
  bwr = random(0.01, 0.9) // bloom width ratio
  lsa = random(10, 15) // // leaf size average
  fw = random(2, 5) // flower width
  fh = random(5, 8) // flower height
}



class Node {
  constructor(_len, _size, _rot_range, _level) {
    this.z = random(-30, 30)
    this.len = _len
    this.size = _size
    this.rr = _rot_range // rotatian range
    this.level = _level
    this.lc = color(lhv, lsv, random(100, 255)) // leaf color
    this.len = this.len * (1 + random(-rl, rl))
    this.rot = radians(random(-this.rr, this.rr)) // main rotation
    this.ls = random(lsa * 0.7, lsa * 1.1) // leaf size
    this.lr = radians(random(-180, 180)) // leaf rotation
    this.fr = radians(random(-180, 180)) // flower rotation
    this.fs = random(0.8, 1.2) // flower scale
    this.fd = round(random(80, 160)) // flower delay
    this.ld = round(random(15, 60)) // leaf delay
    this.lsc = random(0.8, 1.2) // leaf scale
    this.bc = color(bhv, random(170, 255), random(100, 200)) // branch color
    this.lc = color(lhv, lsv, random(100, 255)); // leaf color
    this.fb = random(200, 255) // flower brightness
           
    if (this.level < ml) {
      this.n1 = new Node(
        this.len * ld,
        this.size * sd,
        this.rr,
        this.level + 1
      );
      this.n2 = new Node(
        this.len * ld,
        this.size * sd,
        this.rr,
        this.level + 1
      );
    }
  }

  draw() {  
    strokeWeight(this.size)
    //this.s += (1.0 - this.s) / (15 + this.level * 5)
   // if (this.level >= ll) stroke(this.bc)
    //else stroke(0)
    stroke('#2b3327');
    let rotation_offset = sin(noise( 0.000006 * (this.level)) * 100)
    let temp_rot
    if(this.level < 3) temp_rot = 0
    else temp_rot = this.rot
    
    //let x = cos(TAU/4  ) * this.rr
  // let y = height / 2
   // let z = sin(TAU /4 ) * this.rr
   // translate(0, 0, 0) 
    rotate(temp_rot + (rotation_offset * 0.1) )
    //push()
    
    line(0, 0, 0,  0, -this.len, this.z)
    translate(0, -this.len, this.z) 
    //pop()
    
    // draw leaves
      //if (this.ld < 0) {
       // push()
        //fill(0,50)
       // noStroke()
       // scale(this.lsc)
       // rotateY(this.lr)
       // translate(0, -this.ls / 2, this.z)
        //ellipse(0, 0, this.ls * bwr, this.ls)
       // pop()
     // } else {
       // this.ld--
     // }

    // draw flowers
    if (this.level > ml - 3) {
      if (this.fd < 0) {
        push()
        scale(this.fs)
        stroke(5,47,43,60)
        fill(0,50)
        translate(0, 0, this.z)
        ellipse(0, 0, fw, fh)
        rotateY(this.fr)
        ellipse(0, 0, fw, fh)
        rotateY(radians(this.fr))
        ellipse(0, 0, fw, fh)
        fill(this.bc)
        //ellipse(0, 0, 6, 6)
        pop()
      } else {
        this.fd--
      }
    }
    push()
    if (this.n1 != null) this.n1.draw()
    pop()
    push()
    if (this.n2 != null) this.n2.draw()
    pop()
  }
}
