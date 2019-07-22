const express = require("express");

const port = 3000;
const app = express();

app.get("/", (req, res) => {
    res.json({
        status: "ok"
    });
});

app.listen(port, () => {
    console.log(`Server started on port ${port}.`);
});