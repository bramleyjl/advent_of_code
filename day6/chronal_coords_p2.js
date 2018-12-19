var fs = require('fs')
//var coords = fs.readFileSync('./test_coords.txt').toString().split('\n');
var coords = fs.readFileSync('./real_coords.txt').toString().split('\n');
var labeledCoords = {};
var maxX = 0;
var maxY = 0;
for(var i = 0; i < coords.length; i++){
  var strippedCoords = coords[i].match(/\d+/g);
  if (strippedCoords[0] > maxX) maxX = Number(strippedCoords[0]);
  if (strippedCoords[1] > maxY) maxY = Number(strippedCoords[1]);
  if (i > 25) {
    var label = String.fromCharCode(65 + i - 26) + String.fromCharCode(65 + i - 26);
  } else {
    var label = String.fromCharCode(65 + i);
  }
  labeledCoords[label] = strippedCoords;
}

var chart = [];
var safeSpace = 0;
var y = 0;
var x = 0;
while (y <= maxY) {
  chart[y] = [];
  while (x <= maxX) {
    var marker = findNearest(x, y);
    chart[y][x] = marker;
    x ++;
  }
  x = 0;
  y ++;
}

console.log(safeSpace);

function findNearest(x, y) {
  var distances = 0;
  for (coord in labeledCoords) {
    xDistance = Math.abs(labeledCoords[coord][0] - x);
    yDistance = Math.abs(labeledCoords[coord][1] - y);
    var manhattan = xDistance + yDistance;
    distances += manhattan;
    if (distances >= 10000) {
      var tooFar = true;
      break;
    }
  }
  if (tooFar === true) {
    return 'X';
  } else {
    safeSpace += 1;
    return '#';
  }
}
