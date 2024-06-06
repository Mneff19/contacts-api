/*
* Import all necessary modules and components
*/
const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient;
const mongodb = require('./db/connect');
const contactRoutes = require('./routes/contact-route');

/*
* Init express and get port
*/
const port = process.env.PORT || 8080
const app = express();

/*
* Run setup for express including middleware and routing
*/
// Get JSON from body middleware
app.use(bodyParser.json());

// For all requests, set proper header https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Access-Control-Allow-Origin
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    next();
});

// Establish contact route
app.get("/", (req, res) => { res.send('Hello world!')} ); // For testing
app.use("/contacts", contactRoutes);

/*
* Connect to MongoDB, on success open the server on port
*/
mongodb.initDb((err, mongodb) => {
    if (err) {
        console.log(err);
    } else {
        app.listen(port);
        console.log(`Connected to DB and listening on ${port}`);
    }
});