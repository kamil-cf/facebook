const uuid = require("uuid");
const sanitize = require("sanitize-html");

const posts = [];

function createPost(userRequest) {
    const {
        author, body, images
    } = userRequest;
    const id = uuid.v4();
    posts.push({
        author,
        body: sanitize(body),
        images,
        id,
        created_time: Date.now()
    });
    return id;
}

function getPosts() {
    return posts;
}

module.exports = {
    createPost,
    getPosts
}