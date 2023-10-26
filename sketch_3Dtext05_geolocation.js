//山模型;
let mimg;
let ging;
let mounInfos=[];
let moun0;
let moun1;
let moun2;



//about grass
let num, g=[];

//about tree
let level =5; // This sketch is highly consuming processing power. Depending on your PC graphics card capability set it higher (more speed and details) or lower.
let t=[];
let treeInfos=[];

let cloudInfos=[];


//用户坐标
var clat=0 ;
var clon=0 ;
var zom =14;
//const key = 'sk.eyJ1Ijoic2FuZGFuZGFuaWFvIiwiYSI6ImNsNnltdXB4cDBhaHQzb21hcjhmc2F0ajMifQ.EB48neBzds8Ts3Ttl-rJFQ'

//let font;
let graphics;
let samurai;

//const mappa = new Mappa('Mapbox', key);

// Map options
//const options = {
//lat: clat,
//lng: clon,
//zoom: zom,
// width: 1200,
//height: 1200,

//scale: 1,
//pitch:0,
// bearing:0,
//style: 'light-v10',
//attribution: 'ture',
//logo: 'ture',
//}

//地面皮肤
//let img;


//const myMap = mappa.staticMap(options);

var viwe;
var islandPois;
var mountainsPois;
var valleyPois;


function preload() {
  navigator.geolocation.getCurrentPosition((position) => {
    clat = position.coords.latitude;
    clon = position.coords.longitude;
  }
  );
  // img = loadImage(myMap.imgUrl);


  //获取中心坐标设定范围内景物坐标
  loadJSON('https://api.tianditu.gov.cn/v2/search?postStr={%22keyWord%22:%22%E5%B1%B1%22,%22level%22:12,%22queryRadius%22:9000,%22pointLonlat%22:%22'+
    clon+
    ','+
    clat+
    '%22,%22queryType%22:3,%22start%22:0,%22count%22:20,%22dataTypes%22:%22260202,260203,260206%22}&type=query&tk=9659a52b7b90ad75f886dd74dbc3837c', gotData);


  mimg = loadImage('picture/019.png');
  gimg = loadImage('picture/022.png');
  moun0=loadModel('mountain_Mode/mou_005.obj');
  moun1=loadModel('mountain_Mode/mou_006.obj');
  moun2=loadModel('mountain_Mode/mou_007.obj');
  
  font = loadFont('inconsolata.otf');
  //let ms=[,'mountain_Mode/mou_006.obj','mountain_Mode/mou_007.obj']
}

let mounMod=[];

function gotData(data) {
  viwe=data;
  // console.log(viwe);
}



function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);
  normalMaterial();
  describe('Camera orbits around a box when mouse is hold-clicked & then moved.');
  
  
 


  //about mountain
  generateMounInfos();
  mounMod[0]=moun0;
  mounMod[1]=moun1;
  mounMod[2]=moun2;

  //about grass
  num = min(width, height)/2;
  for (let i = 0; i < 500; i++) {
    g.push(new grass(i))
  }

  //aboout tree
  generateTreeInfos();
  randomize();
  t= new Node(sl, ss, rr, 0);

  generateCloudInfos();
  
  
}

function draw() {
  
  ambientLight(255, 255, 255);
  background('#a0947a');
  orbitControl(1, 0, 1);
  //orbitControl();
  
  //position
  textFont(font);
  textSize(32);
  textAlign(RIGHT, TOP);
  fill(0);
  text('Current position: ' + nf(clat,2,2) + ' ' + nf(clon,2,2), -width*0.3, -height*0.5);
 


  translate(0, 60, 0);
  rotateX(PI/2);
  //plane(3000,3000);
  texture(gimg);
  noStroke();
  //normalMaterial(255);
  plane(5000, 5000);



  var cx = mercX(clon);
  var cy = mercY(clat);
  //fill(0,0,255,200);
  //box(50);


  //
  var islandCount=viwe["260202"].count;

  if (islandCount>0) {
    var islandPois=viwe["260202"].pois;
    for (var i=0; i<islandPois.length; i++) {
      var islandLonlat=islandPois[i].lonlat.split(',');
      var islandLon=islandLonlat[0];
      var islandLat=islandLonlat[1];
      var ix=mercX(islandLon) - cx;
      var iy=mercY(islandLat) - cy;

      stroke(0, 255, 255);
      fill(0, 255, 255, 200);
      ellipse(ix, iy, 5, 5);

      //text(islandPois[i].name,10,10*i+10);
    }
  } else {
    console.log("noisland");
  }

  //

  var mountainsCount=viwe["260203"].count;

  if (mountainsCount>0) {
    var mountainsPois=viwe["260203"].pois;
    for (var m=0; m<mountainsPois.length; m++) {
      var mountainsLonlat=mountainsPois[m].lonlat.split(',');
      var mountainsLon=mountainsLonlat[0];
      var mountainsLat=mountainsLonlat[1];
      var mx=mercX(mountainsLon) - cx;
      var my=mercY(mountainsLat) - cy;

      //about mount
      push();
      translate(mx, my);
      drawMoun(mounInfos[m]);
      pop();

      //about tree
      push();
      rotateX(PI*-0.5);
      translate(mx, 0, my);//rotateX(PI*-0.5);
      for (var j=0; j<2; j++) {
        drawTree(treeInfos[j]);
        translate(sin(j)*50, 0, cos(j)*50);
      }
      pop();


      //about grass
      push();
      rotateX(3*PI/2);
      //rotateY(PI/2);
      translate(mx, -20, my);
      for (let i = 0; i < 500; i++) {
        g[i].draw()
      }
      pop();

      //about cloud
      push();
      translate(mx, my);
      for (let i=0; i<500; i++) {
        drawCloud(cloudInfos[i]);
      }
      pop();




      text(mountainsPois[m].name, mx, my);
    }
  } else {
    console.log("nomountains");
  }

  //

  var valleyCount=viwe["260206"].count;

  if (valleyCount>0) {

    var valleyPois=viwe["260206"].pois;
    for (var v=0; v<valleyPois.length; v++) {
      var valleyLonlat=valleyPois[v].lonlat.split(',');
      var valleyLon=valleyLonlat[0];
      var valleyLat=valleyLonlat[1];
      var vx=mercX(valleyLon) - cx;
      var vy=mercY(valleyLat) - cy;

      stroke(255, 255, 0);
      fill(255, 255, 0, 200);
      ellipse(vx, vy, 5, 5);

      //text(valleyPois[v].name,10,10*v+10);
    }
  } else {
    console.log("novalley");
  }
 
  
}
