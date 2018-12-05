var fs = require('fs')
//var logs = fs.readFileSync('./test_logs.txt').toString().split('\n');
var logs = fs.readFileSync('./real_logs.txt').toString().split('\n');
logs.pop();
var sortedLogs = [];
var guards = {};
var sleepiestGuards = [];

for (var log of logs) {
    var date = log.match(/\d+-\d+-\d+/)[0];
    var time = log.match(/\d+:\d+/)[0];
    var string = log.match(/\].+/)[0];
    sortedLogs.push([date, time, string]);
}

sortedLogs = sortedLogs.sort(function(a, b) {
    return Date.parse(a[0] + ' ' + a[1]) - Date.parse(b[0] + ' ' + b[1]);
});

for (var log of sortedLogs) {
    if (log[2].indexOf('Guard #') > 0) {
        var guardId = log[2].match(/#\d+/)[0];
        if (guards[guardId] === undefined) {
            var newGuard = new Object();
            newGuard.times = [];
            newGuard.asleepMinute = new Object;
            newGuard.totalAsleep = 0;
            guards[guardId] = newGuard;
        }
    } else {
        guards[guardId].times.push(log[1]);
    }
}

for (var guard in guards) {
    var sleepiestMinute = ['', ''];
    for (i = 0; i < guards[guard].times.length; i +=2) {
        var sleep = Number(guards[guard].times[i].slice(3));
        var wake = Number(guards[guard].times[i+1].slice(3));
        for (var j = sleep; j < wake; j++) {
            guards[guard].asleepMinute[j] = (guards[guard].asleepMinute[j] || 0) +  1;
            if (guards[guard].asleepMinute[j] > sleepiestMinute[1]) {
                sleepiestMinute = [j, guards[guard].asleepMinute[j]];
            }
        }
        guards[guard].totalAsleep += (wake - sleep);
    }
    sleepiestGuards.push([guard, guards[guard], sleepiestMinute]);
}

// find sleepiest by total minutes asleep
sleepiestGuards.sort(function(a, b) {
    return b[1].totalAsleep - a[1].totalAsleep;
});

console.log("Overall sleepiest guard");
console.log(sleepiestGuards[0][0], sleepiestGuards[0][2]);

// finde sleepiest by highest count of single minute asleep
sleepiestGuards.sort(function(a, b) {
    return b[2][1] - a[2][1];
});

console.log("Guard with highest single minute sleep count");
console.log(sleepiestGuards[0][0], sleepiestGuards[0][2]);
