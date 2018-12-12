var fs = require('fs')
var startCoords = fs.readFileSync('./real_points.txt').toString().split('\n');
startCoords.pop();

var points = [];
for (var i = 0; i < startCoords.length; i++) {
  var strippedCoords = startCoords[i].match(/-?\d+/g);
  var point = {}
  point.xCurrent = Number(strippedCoords[0]);
  point.yCurrent = Number(strippedCoords[1]);
  point.xVelocity = Number(strippedCoords[2]);
  point.yVelocity = Number(strippedCoords[3]);  
  points.push(point);
}

var shrinkage = undefined;
while (true) {
  var currentMap = [];
  var xMin = undefined;
  var xMax = undefined;
  var yMin = undefined;
  var yMax = undefined;

  //calulate new locations and grid size
  for (var point of points) {
    point.xCurrent += point.xVelocity;
    if (point.xCurrent < xMin || xMin === undefined) xMin = point.xCurrent;
    if (point.xCurrent > xMax || xMax === undefined) xMax = point.xCurrent;
    point.yCurrent += point.yVelocity;
    if (point.yCurrent < yMin || yMin === undefined) yMin = point.yCurrent;
    if (point.yCurrent > yMax || yMax === undefined) yMax = point.yCurrent;
  }
  //print if grid is growing, else save current grid size
  if (yMax < shrinkage || shrinkage === undefined) {
    var oldXMax = xMax;
    var oldXMin = xMin;
    var oldYMax = yMax;
    var oldYMin = yMin;
    shrinkage = yMax;
  } else {
    //populate grid with blanks
    for (var j = 0; j <= (oldYMax - oldYMin); j++) {
      currentMap[j] = [];
      for (var k = 0; k <= (oldXMax - oldXMin); k++) {
        currentMap[j][k] = '.';
      }
    }
    //add current points
    for (var point of points) {
      //undo one cycle of movement
      point.xCurrent -= point.xVelocity;
      point.yCurrent -= point.yVelocity;
      var xDistance = point.xCurrent - oldXMin;
      var yDistance = point.yCurrent - oldYMin;
      currentMap[yDistance][xDistance] = 'X';
    }
    //join rows together for readability
    for (var j = 0; j <= (oldYMax - oldYMin); j++) {
        currentMap[j] = currentMap[j].join(',');
    }
    console.log(currentMap);
    break;
  }
}
