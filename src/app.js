require = require("./perf")(require);

const cluster = require("cluster");
const os = require("os");
// const {setup: memorySetup} = require("./memory");
// memorySetup();

const express = require("express");
const app = express();

if (cluster.isMaster) {
    const cpus = os.cpus().length;
    Array.from({length: cpus}).forEach(() => {
        cluster.fork();
    });
} else {
    require("./loaders")(app);

    const port = parseInt(process.env.PORT);
    const host = process.env.HOST;

    app.listen(port, host, () => {
        console.log(`Server started on ${host}:${port}.`);
    });
}