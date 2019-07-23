const {ValidationError} = require("../helpers/errors");
const {validateSession} = require("../helpers/session.in-memory");

function auth(req, res, next) {
    const authorizationHeader = req.headers.authorization;
    const sessionId = authorizationHeader ?
        authorizationHeader.replace(/^bearer /ig, '')
        : "";
    const isSessionValid = validateSession(sessionId);

    if (isSessionValid) {
        next();
        return;
    } else {
        next(new ValidationError("Invalid session."))
        return;
    }
}

module.exports = {
    auth
}