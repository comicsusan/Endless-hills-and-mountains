function drawCloud(infoObj){
  push();
  translate(infoObj.x, 0,infoObj.z);
  translate(0, -infoObj.height,0);
  rotateX(PI/2);
  rotateY(PI*infoObj.m);
  //texture(img);
  noStroke();
  fill(255,40);
  sphere(1,5,5);
  pop();
}

function genCloudInfo(){
  var xoff=0;
   xoff=xoff+0.05;
      
  return{
    x:randomGaussian(50,200),
    //y:0,
    z:randomGaussian(100,20),
    width:random (1,3),
    height:randomGaussian(50,20),
    depth:random(20,80),
    m:int(random(-1,3)),
    
  };
}

function  generateCloudInfos(){
  for(var i=0;i<6000;i++){
    cloudInfos.push(genCloudInfo());
    
  }
}
