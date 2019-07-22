const express = require("express");
const router = express.Router();
const validateUser = require("../middlewares/validate-user");
const {getUsers, createUser, deleteUser, updateUser} = require("../helpers/users.in-memory");
const logger = require("../../services/logger");

router.get("/", async (req, res) => res.json(await getUsers()));

router.post("/", validateUser, async (req, res) => {
    const userId = await createUser(req.body);
    res.send({status: "registered", userId: userId});
});

router.put("/:id", async (req, res, next) => {
    const status = await updateUser(req.params.id, req.body);

    if (!status) {
        logger.error("User not found");
        next(new Error("User not found"))
    } else {
        res.send({status: "deleted"});
    }
});

router.delete("/:id", async (req, res, next) => {
    const status = await deleteUser(req.params.id);

    if (!status) {
        logger.error("User not found");
        next(new Error("User not found"))
    } else {
        res.send({status: "deleted"});
    }
});

module.exports = (app) => {
    app.use("/users/", router);
}
