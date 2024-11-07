const express = require("express");
const PORT = 8000;
const app = express();
const staticRoute = require("./routes/staticRouter");

// middlwares
const setupMiddleware = require("./middlewares/middleware")
setupMiddleware(app);

//crud operations over book
app.use("/", staticRoute);



app.listen(PORT, () => console.log(`Server connected at PORT ${PORT}`))