//将经纬坐标转成x，y坐标
function mercX(lon) {
  lon = radians(lon);
  var a = (256 / PI) * pow(2, zom);
  var b = lon + PI;
  return a * b;
}

function mercY(lat) {
  lat = radians(lat);
  var a = (256 / PI) * pow(2, zom);
  var b = tan(PI / 4 + lat / 2);
  var c = PI - log(b);
  return a * c;
}
