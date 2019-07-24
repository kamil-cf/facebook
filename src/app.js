require = require("./perf")(require);

const express = require("express");
const app = express();

require("./loaders")(app);

const port = parseInt(process.env.PORT);
const host = process.env.HOST;

app.listen(port, host, () => {
    console.log(`Server started on ${host}:${port}.`);
});