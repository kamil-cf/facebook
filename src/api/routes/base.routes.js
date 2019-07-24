const express = require("express");
const router = express.Router();

const {performance} = require("perf_hooks");
const { createHook } = require("async_hooks");
const hook = createHook({
    init(asyncId, type, triggerAsyncId, resource) {
        if(type === "TickObject") {
            return;
        }
    },
    before() {

    },
    after() {

    }
});

hook.enable();

router.get("/", (req, res) => {
    performance.mark("check-start");
    const id = setTimeout(() => {
        res.json({
            status: "ok"
        });
        performance.mark("check-end");
        performance.measure("check", "check-start", "check-end");

    }, 1000);

    console.log("TIMEOUT ===> ", typeof id, id);
    console.log("<=========")
});

module.exports = (app) => {
    app.use("/", router);
}
