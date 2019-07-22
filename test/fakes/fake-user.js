module.exports = {
    emptyUser() {
        return {}
    },
    fakeUser() {
        return {
            email: "email@example.com",
            password: "pass",
            name: "username"
        }
    }
}
