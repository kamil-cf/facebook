const path = require("path");
require("dotenv").config({
    path: path.join(__dirname, "config", "app.env")
});

const express = require("express");

const port = parseInt(process.env.PORT);
const host = process.env.HOST;
const app = express();

require("./api/routes/base.routes")(app);

app.listen(port, host, () => {
    console.log(`Server started on ${host}:${port}.`);
});