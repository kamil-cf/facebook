module.exports = (app) => {
    app.use((error, req, res, next) => {
        res.status(500).send({
            error: error.message
        });
    });
}