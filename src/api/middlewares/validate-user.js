const Ajv = require("ajv");
const logger = require("../../services/logger");
const USER_SCHEMA = require("../../schemas/user-schema");
const userValidator = new Ajv().compile(USER_SCHEMA);

module.exports = (req, res, next) => {
    const {
        email, password, name
    } = req.body;

    const status = userValidator({
        email, password, name
    });

    if (status) {
        next();
    } else {
        logger.error(userValidator.errors);
        next(new Error("Invalid user"));
    }
}