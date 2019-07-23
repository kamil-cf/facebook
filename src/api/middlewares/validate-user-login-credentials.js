const Ajv = require("ajv");
const logger = require("../../services/logger");
const USER_CREDENTIALS_SCHEMA = require("../../schemas/user-login-schema");
const {ValidationError} = require("../helpers/errors");
const credentialsValidator = new Ajv().compile(USER_CREDENTIALS_SCHEMA);

module.exports = (req, res, next) => {
    const {
        email, password
    } = req.body;

    const status = credentialsValidator({
        email, password
    });

    if (status) {
        next();
    } else {
        logger.error(credentialsValidator.errors);
        next(new ValidationError("Invalid credentials"));
    }
}