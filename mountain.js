function drawMoun(infoObj){
  push();
  //translate(infoObj.x, 0,infoObj.z);
  translate(0,0, -infoObj.height);
  rotateX(PI/2);
  rotateY(PI*infoObj.t);
  texture(mimg);
  //scale(1);
  model(mounMod[infoObj.t]);
  pop();
}

function genMounInfo(){
  return{
    //x:random(800),
    //y:0,
    //z:random(500),
    width:random (20,50),
    height:random(50,50),
    depth:random(20,80),
    t:int(random(-1,3))
  };
}

function  generateMounInfos(){
  for(var i=0;i<20;i++){
    mounInfos.push(genMounInfo());
  }
}
