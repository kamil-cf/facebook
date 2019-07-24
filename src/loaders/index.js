const configLoader = require("./config");
const loggerLoader = require("./logger");
const staticsLoader = require("./statics");
const middlewaresLoader = require("./middlewares");
const errorHandlersLoader = require("./errorHandlers");
const routesLoader = require("./routes");

module.exports = (app) => {
    configLoader();
    loggerLoader(app);
    middlewaresLoader(app);
    staticsLoader(app);
    routesLoader(app);
    errorHandlersLoader(app);
}