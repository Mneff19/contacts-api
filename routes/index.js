const express = require('express');
const router = express.Router();
const contactRoutes = require("./contact-route");

// Establish contact route
router.get("/", (req, res) => { res.send('Hello world!')} ); // For testing
router.use("/contacts", contactRoutes);

module.exports = router;