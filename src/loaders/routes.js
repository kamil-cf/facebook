module.exports = (app) => {
    require("../api/routes/base.routes")(app);
    require("../api/routes/logs-collector.routes")(app);
    require("../api/routes/users.routes")(app);
    require("../api/routes/posts.routes")(app);
    require("../api/routes/auth.routes")(app);
    require("../api/routes/secret.routes")(app);
    require("../api/routes/passport.routes")(app);
    require("../api/routes/heapdump.routes")(app);
}