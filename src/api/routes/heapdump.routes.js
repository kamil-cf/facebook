const express = require("express");
const {snapshot} = require("../helpers/heapdump");

const router = express.Router();

router.get("/", (req, res, next) => {
    // snapshot((error) => {
    //     if(error) {
    //         next(error);
    //     } else {
    //         res.sendStatus(200);
    //     }
    // })
    res.sendStatus(200);
});

module.exports = (app) => {
    app.use("/hd", router);
}