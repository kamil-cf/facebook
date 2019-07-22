const express = require("express");
const router = express.Router();

const logs = [];

router.get("/", (req, res) => {
    res.send(logs);
});

router.post("/", (req, res) => {
    logs.push(req.body);
    res.sendStatus(201);
});

router.delete("/", (req, res) => {
    logs.splice(0);
    res.sendStatus(204);
})

module.exports = (app) => {
    app.use("/logs/", router);
}
