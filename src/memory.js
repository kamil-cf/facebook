const memwatch = require("memwatch-next");
const {snapshot} = require("./api/helpers/heapdump");
const MEMORY_CHECK_INTERVAL = 500;
const MEMORY_STATS_INTERVAL = 2000;

const stats = [];

function getHeapUsed() {
    return process.memoryUsage().heapUsed;
}

function setup() {
    // setInterval(() => {
    //     stats.push({time: Date.now(), heap: getHeapUsed()});
    // }, MEMORY_CHECK_INTERVAL);
    //
    // setInterval(() => {
    //     console.log(stats);
    // }, MEMORY_STATS_INTERVAL);

    snapOnLeak();
}

function snapOnLeak() {
    memwatch.on("leak", (info) => {
        snapshot((error) => {
            if(error) {
                return;
            }
            console.log(info);
        });
    });
}

module.exports = {
    setup
}