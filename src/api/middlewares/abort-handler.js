function abortHandler(req, res, next) {
    req.on("close", () => {
        res.send();
        return;
    });

    next();
}

module.exports = {
    abortHandler
}