const path = require("path");
const heapdump = require("heapdump");

function snapshot(cb) {
    const snapFileName =  path.join(__dirname, "..", "..", "..", "heapdumps", `${Date.now()}.heapsnapshot`);
    heapdump.writeSnapshot(snapFileName, (error, filenam) => {
        if(error) {
            cb(error);
        }

        cb(null);
    });
}

module.exports = {
    snapshot
}