const path = require("path");
const winston = require("winston");

const logger = winston.createLogger({
    transports: [
        new winston.transports.Http({
            path: "/logs",
            host: process.env.HOST,
            port: process.env.PORT
        }),
        new winston.transports.File({
            dirname: path.join(__dirname, "..", "..", "logs"),
            filename: "error"
        })
    ]
});

module.exports = logger;


