const faker = require("faker");

module.exports = {
    emptyPost() {
        return {}
    },
    fakePost() {
        return {
            author: {
                id: faker.random.uuid(),
                name: faker.name.firstName(),
                avatar_url: faker.internet.url()
            },
            images: [faker.internet.url()],
            body: faker.lorem.sentence()
        }
    }
}
