
var fs = require('fs')
//var nodes = fs.readFileSync('./test_nodes.txt').toString().split(' ');
var nodes = fs.readFileSync('./real_nodes.txt').toString().split(' ');

function makeTree(nodes, currentPosition) {
  var children = Number(nodes[currentPosition]);
  var metaData = Number(nodes[currentPosition + 1]);
  var childrenValues = [];

  if (children === 0) {
    return addMetaData(metaData, currentPosition + 2);
  } else {
    var childStart = currentPosition + 2;
    for (var j = 0; j < children; j ++) {
      var nextChild = makeTree(nodes, childStart);
      childStart = nextChild[0];
      childrenValues.push(nextChild[1]);
    }
    return countChildren(metaData, childStart, childrenValues);
  }

}

function addMetaData(metaData, currentPosition) { 
  var sum = 0;
  for (var i = 0; i < metaData; i++) {
    sum += Number(nodes[currentPosition + i]);
  }
  var nodeEnd = currentPosition + metaData;
  return [nodeEnd, sum];
}

function countChildren(metaData, currentPosition, childrenValues) {
  var sum = 0;
  for (var k = currentPosition; k < currentPosition + metaData; k++) {
    var index = Number(nodes[k]) - 1;
    if (childrenValues[index] !== undefined) {
      sum += Number(childrenValues[index]);
    }
  }
  var nodeEnd = currentPosition + metaData;
  return [nodeEnd, sum];  
}

rootNode = makeTree(nodes, 0);
console.log(rootNode[1]);