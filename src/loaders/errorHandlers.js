module.exports = (app) => {
    require("../api/middlewares/default-error-handler")(app);
}