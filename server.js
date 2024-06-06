const express = require("express");
const app = express();

app.get("/contacts", (req, res) => { res.send("Hello world")});

const port = process.env.port || 8080;
app.listen(port);
console.log("App listening on " + port)