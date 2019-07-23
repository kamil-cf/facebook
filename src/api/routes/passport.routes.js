const express = require("express");
const passport = require("passport");
const GitHubStrategy = require('passport-github').Strategy;

const router = express.Router();

const {GITHUB_CLIENT_ID, GITHUB_CLIENT_SECRET, HOST, PORT} = process.env;

passport.serializeUser((user, cb) => {
    cb(null, user);
});

passport.deserializeUser((user, cb) => {
    cb(null, user);
});

router.get("/", passport.authenticate("github"), (req, res) => {
    res.send(200);
})

router.get("/callback", (req, res) => {
    res.json({
        status: "ok"
    });
});

module.exports = (app) => {
    passport.initialize();

    passport.use(new GitHubStrategy({
            clientID: GITHUB_CLIENT_ID,
            clientSecret: GITHUB_CLIENT_SECRET,
            callbackURL: `http://${HOST}:${PORT}/passport/callback`
        },
        function (accessToken, refreshToken, profile, cb) {
            return cb(null, user);
        }
    ));

    app.use("/passport/", router);
}
