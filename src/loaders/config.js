module.exports = () => {
    const path = require("path");
    require("dotenv").config({
        path: path.join(__dirname, "..", "config", "app.env")
    });
}