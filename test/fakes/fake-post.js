module.exports = {
    emptyPost() {
        return {}
    },
    fakePost() {
        return {
            author: {
                id: "test id",
                name: "test name",
                avatar_url: "test url"
            },
            images: ["image 1"],
            body: "test body"
        }
    }
}
