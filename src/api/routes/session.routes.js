const express = require("express");
const bcrypt = require("bcrypt");
const uuid = require("uuid");
const router = express.Router();

function delay(time) {
    return new Promise((resolve) => setTimeout(resolve, time));
}

const sessions = [];

router.post("/", async (req, res) => {
    await delay(10);
    const session = uuid.v4();
    await delay(20);
    await delay(30);

    if (res.finished) {
        return;
    }

    sessions.push(session);

    res.send({
        session
    });
});

router.get("/", (req, res) => {
    res.send({sessions});
});

module.exports = (app) => {
    app.use("/session/", router);
}
