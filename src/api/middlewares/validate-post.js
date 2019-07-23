const Ajv = require("ajv");
const logger = require("../../services/logger");
const POST_SCHEMA = require("../../schemas/post-schema");
const postValidator = new Ajv().compile(POST_SCHEMA);

module.exports = (req, res, next) => {
    const {
        author, body, images
    } = req.body;

    const status = postValidator({
        author, body, images
    });

    if (status) {
        next();
    } else {
        logger.error(postValidator.errors);
        next(new Error("Invalid post"));
    }
}