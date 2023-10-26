function grass(i) {
  this.n = random(width /50, width/15 )
  this.draw = function() {
  let x = cos(TAU / num * i  ) * this.n
    let y = 0
    let z = sin(TAU / num * i ) * this.n
    //rotateX(PI/2);
    
    push()
   
    //fill(0, map(z, -width / 3.2, width / 3.2, 24, 216), 0)
    noFill();
    translate(x, y, z);
    scale(0.5);
    stroke('#23e15d');
    strokeWeight(0.1);
    curve(100, 30,0, 50, 30,0, -10, 80,0, 100, 50,0);
    curve(30, 20,0, 70, 26,0, 30, 70,0, 50, 100,0);
    //triangle(-this.w / 2, 0, this.w / 2, 0, map(sin(this.a ), -1, 1, -this.w, this.w), -this.h)
    pop()
  }
}
