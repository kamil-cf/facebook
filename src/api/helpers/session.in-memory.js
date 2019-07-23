const {fromBase64} = require("base64url");
const crypto = require("crypto");

const sessions = [];

function generateToken() {
    const bytes = crypto.randomBytes(16);
    return fromBase64(bytes.toString("base64"));
}

function hashToken(string) {
    return crypto.createHash("sha256")
        .update(string)
        .digest("base64");
}


function createSession() {
    const sessionId = generateToken();
    const hashSessionId = hashToken(sessionId);

    sessions.push({
        token: hashSessionId,
        createdAt: Date.now()
    });

    return sessionId;
}

function validateSession(sessionId) {
    const hashSessionId = hashToken(sessionId);
    const session = sessions.find(s => s.token === hashSessionId);

    if(!session) {
        return false;
    }

    const sessionAge = Date.now() - session.createdAt;
    const isSessionTooOld = sessionAge > process.env.SESSION_LIFETIME_MS;

    return !isSessionTooOld;
}

module.exports = {
    createSession,
    validateSession
}