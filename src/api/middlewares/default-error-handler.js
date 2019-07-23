const {ValidationError} = require("../helpers/errors");
module.exports = (app) => {
    app.use((error, req, res, next) => {
        const statusCode = error instanceof ValidationError ? 401 : 500;
        res.status(statusCode).send({
            error: error.message
        });
    });
}