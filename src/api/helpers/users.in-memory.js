const uuid = require("uuid");
const bcrypt = require("bcrypt");
const sanitize = require("sanitize-html");

const users = [];

async function createUser(userRequest) {
    const {
        email, password, name
    } = userRequest;
    const userId = uuid.v4();
    users.push({
        email: sanitize(email),
        password: await bcrypt.hash(sanitize(password), await bcrypt.genSalt()),
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

function byEmail(email) {
    return u => u.email === email;
}

function areCredentialsValid(password, email) {
    const user = users.find(byEmail(email));

    if(!user) {
        return false;
    }

    return bcrypt.compare(password, user.password);
}

async function loginUser({password, email}) {
    return await areCredentialsValid(password, email) ? uuid.v4() : false;
}

module.exports = {
    createUser,
    getUsers,
    updateUser,
    deleteUser,
    loginUser
}