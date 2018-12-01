var fs = require('fs');
var changes = fs.readFileSync('./frequency_change.txt').toString().split('\n');
var currentFrequency = 0;
var frequencies = [];
var done = false;

while (done == false) {
    for (var i = 0; i < changes.length; i++) {
        currentFrequency += Number(changes[i]);
        checkFrequencies(currentFrequency);
        if (done == true) break;
    }
}

function checkFrequencies(frequency) {
    for (var j = 0; j < frequencies.length; j++) {
        if (frequencies[j] == frequency) {
            console.log('Frequency: ' + frequency);
            done = true;
            break;
        }
    }
    frequencies.push(frequency);
}