var fs = require('fs');
var boxIds = fs.readFileSync('./box_ids.txt').toString().split('\n');
var checkSum = [0, 0];

for (var id of boxIds) {
  id = id.split('').sort();
  var two = 0;
  var three = 0;
  for (var i = 0; i < id.length -1; i ++) {
    if (id[i] === id[i +1] && id[i] === id[i + 2]) {
      three = 1;
      continue;
    }
    if (id[i] === id[i + 1] && id[i] !== id[i -1]) {
      two = 1;
    }
    if (two === 1 && three === 1) break;
  }
  checkSum[0] += two;
  checkSum[1] += three;
}

finalCheckSum = checkSum[0] * checkSum[1];
console.log(finalCheckSum);