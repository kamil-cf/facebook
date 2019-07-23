const uuid = require("uuid");
const sanitize = require("sanitize-html");

const users = [];

function createUser(userRequest) {
    const {
        email, password, name
    } = userRequest;
    const userId = uuid.v4();
    users.push({
        email: sanitize(email),
        password: sanitize(password),
        name: sanitize(name),
        id: userId,
        createdAt: Date.now()
    });
    return userId;
}

function getUsers() {
    return users;
}

function deleteUser(userId) {
    const userIndex = users.findIndex(byId(userId));

    if (userIndex === -1) {
        return false;
    }

    users.splice(userIndex, 1);

    return true;
}

function updateUser(userId, updatedDetails) {
    let user = users.find(byId(userId));

    if(!user) {
        return false;
    }

    Object.assign(user, updatedDetails);

    return true;
}

function byId(id) {
    return u => u.id === id;
}

module.exports = {
    createUser,
    getUsers,
    updateUser,
    deleteUser
}