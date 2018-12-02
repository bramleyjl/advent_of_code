var fs = require('fs');
var boxIds = fs.readFileSync('./box_ids.txt').toString().split('\n');
var checkSum = [0, 0];

for (var i = 0; i < boxIds.length; i++) {
  for (var j = i + 1; j < boxIds.length; j++) {
    var controlId = boxIds[i].split('');
    var testId = boxIds[j].split('');
    var difference = 0;
    var differencePosition = '';
    for (var k = 0; k < controlId.length; k ++) {
      if (controlId[k] !== testId[k]) {
        differencePosition = k;
        difference += 1;
        if (difference >= 2) break;
      }
      if (k === controlId.length -1) {
        controlId.splice(differencePosition, 1);
        console.log(controlId.join(''));
      }
    }
  }
}