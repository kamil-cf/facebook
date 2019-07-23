const express = require("express");
const {validateSession} = require("../helpers/session.in-memory");
const router = express.Router();

router.post("/", (req, res) => {
    const sessionId = req.body.sessionId;
    const isSessionValid = validateSession(sessionId);

    if (isSessionValid) {
        res.json({
            status: "ok"
        });
    } else {
        res.sendStatus(401);
    }
});

module.exports = (app) => {
    app.use("/secret/", router);
}
