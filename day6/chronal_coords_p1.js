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
  labeledCoords[String.fromCharCode(65 + i)] = strippedCoords;
}

var chart = [];
var disqualified = [];
var coordCount = {}
var y = 0;
var x = 0;
while (y <= maxY) {
  chart[y] = [];
  while (x <= maxX) {
    var marker = findNearest(x, y);
    chart[y][x] = marker;
    if (coordCount[marker.toLowerCase()] === undefined) {
      coordCount[marker.toLowerCase()] = 1;
    } else {
      coordCount[marker.toLowerCase()] += 1;      
    }
    if ((x === 0 || x === maxX || y === 0 || y === maxY) &&
    marker !== '.' && 
    disqualified.indexOf(marker.toUpperCase()) === -1) {
      disqualified.push(marker.toUpperCase())
    }
    x ++;
  }
  x = 0;
  y ++;
}

findLargestArea();

function findNearest(x, y) {
  var manhattan = [undefined];
  for (coord in labeledCoords) {
    xDistance = Math.abs(labeledCoords[coord][0] - x);
    yDistance = Math.abs(labeledCoords[coord][1] - y);
    totalDistance = xDistance + yDistance;
    if (totalDistance === 0) {
      return coord;
    } else if (totalDistance === manhattan[0]) {
      manhattan = [totalDistance, '.'];
    } else if (totalDistance < manhattan[0] || manhattan[0] === undefined) {
      manhattan = [totalDistance, coord.toLowerCase()];
    }
  }
  return manhattan[1];
}

function findLargestArea() {
  for (var letter of disqualified) {
    delete labeledCoords[letter];
  }
  var maxArea = {};
  maxArea.letter = '';
  maxArea.area = 0;
  for (var letter in labeledCoords) {
    letter = letter.toLowerCase();
    if (coordCount[letter] > maxArea.area) {
      maxArea.letter = letter;
      maxArea.area = coordCount[letter];
    }
  }
  console.log(maxArea);
}
