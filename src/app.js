const express = require("express");

const port = 3000;
const app = express();

require("./api/routes/base.routes")(app);

app.listen(port, () => {
    console.log(`Server started on port ${port}.`);
});