var fs = require('fs');
var changes = fs.readFileSync('./frequency_change.txt').toString().split('\n');
var totalChange = 0;
for (var i = changes.length - 1; i >= 0; i--) {
    totalChange += Number(changes[i]);
}
console.log(totalChange);