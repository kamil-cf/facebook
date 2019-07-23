const express = require("express");
const {auth} = require("../middlewares/auth");
const router = express.Router();

router.post("/", auth, (req, res) => {
    res.sendStatus(200);
});

router.get("/", auth, (req, res) => {
    res.sendStatus(200);
});

module.exports = (app) => {
    app.use("/secret/", router);
}
