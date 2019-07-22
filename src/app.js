const path = require("path");
require("dotenv").config({
    path: path.join(__dirname, "config", "app.env")
});

const express = require("express");
const bodyParser = require("body-parser");

const port = parseInt(process.env.PORT);
const host = process.env.HOST;
const app = express();

app.use(bodyParser.json());

require("./api/routes/base.routes")(app);
require("./api/routes/logs-collector.routes")(app);

app.listen(port, host, () => {
    console.log(`Server started on ${host}:${port}.`);
});