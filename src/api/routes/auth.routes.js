const express = require("express");
const router = express.Router();
const {loginUser} = require("../helpers/users.in-memory");
const validateCredentials = require("../middlewares/validate-user-login-credentials");


router.post("/", validateCredentials, async (req, res) => {
    const sessionId = await loginUser(req.body);
    if (sessionId) {
        res.send({status: "logged in", sessionId});
    } else {
        res.sendStatus(401);
    }

});

module.exports = (app) => {
    app.use("/auth/", router);
}
