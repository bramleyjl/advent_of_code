
var fs = require('fs')
//var nodes = fs.readFileSync('./test_nodes.txt').toString().split(' ');
var nodes = fs.readFileSync('./real_nodes.txt').toString().split(' ');
var sum = 0;

function makeTree(nodes, currentPosition) {
  var children = Number(nodes[currentPosition]);
  var metaData = Number(nodes[currentPosition + 1]);

  if (children === 0) {
    return addMetaData(metaData, currentPosition + 2);
  } else {
    var childStart = currentPosition + 2;
    for (var j = 0; j < children; j ++) {
      childStart = makeTree(nodes, childStart);
    }
    return addMetaData(metaData, childStart);
  }

}

function addMetaData(metaData, currentPosition) { 
  for (var i = 0; i < metaData; i++) {
    sum += Number(nodes[currentPosition + i]);
  }
  var nodeEnd = currentPosition + metaData;
  return nodeEnd;
}

makeTree(nodes, 0);
console.log(sum);