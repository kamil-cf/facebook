const path = require("path");
require("dotenv").config({
    path: path.join(__dirname, "config", "app.env")
});

const express = require("express");
const morgan = require("morgan");

const port = parseInt(process.env.PORT);
const host = process.env.HOST;
const app = express();

app.use(morgan("dev"));
app.use(express.static(path.join(__dirname, "public")));
require("./api/middlewares/default")(app);

require("./api/routes/base.routes")(app);
require("./api/routes/logs-collector.routes")(app);
require("./api/routes/users.routes")(app);
require("./api/routes/posts.routes")(app);
require("./api/routes/auth.routes")(app);
require("./api/routes/secret.routes")(app);

require("./api/middlewares/default-error-handler")(app);

app.listen(port, host, () => {
    console.log(`Server started on ${host}:${port}.`);
});