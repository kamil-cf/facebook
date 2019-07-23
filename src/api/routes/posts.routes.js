const express = require("express");
const router = express.Router();
const validatePost = require("../middlewares/validate-post");
const {createPost, getPosts} = require("../helpers/posts.in-memory");

router.get("/", async (req, res) => res.json(await getPosts()));

router.post("/", validatePost, async (req, res) => {
    const postId = await createPost(req.body);
    res.send({status: "created", postId: postId});
});

module.exports = (app) => {
    app.use("/posts/", router);
}
