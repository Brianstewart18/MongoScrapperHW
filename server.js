// ========== Dependencies =====================

const express = require("express");

const bodyParser = require("body-parser");
const logger = require("morgan");

var mongoose = require('mongoose');


//==============================================


// Set mongoose to leverage built in JavaScript ES6 Promises
mongoose.Promise = Promise;

// Initialize Express
const app = express();

var port = process.env.PORT || 3000;


// Use morgan & body parser 
app.use(logger("dev"));
app.use(bodyParser.urlencoded({
    extended: false
}));

// Make public a static dir
app.use(express.static(__dirname + "/public"));



// Database configuration with mongoose

mongoose.connect("mongodb://heroku_55mxd0vz:gjbjeg0kqqm2taqb53617sr5tl@ds119422.mlab.com:19422/heroku_55mxd0vz")
const db = mongoose.connection;

// Show any mongoose errors

db.on("error", (error) => {
    console.log("Mongoose Error: ", error);
});

// Once logged in to the db through mongoose, log a success message
db.once("open", () => {
    console.log("Mongoose connection successful.");
});



const exphbs = require("express-handlebars");

app.engine("handlebars", exphbs({
  defaultLayout: "Main"
}));
app.set("view engine", "handlebars");

const routes = require("./controllers/Controller.js");
app.use("/", routes);









// Listen on port 3000
app.listen(port, function() {
    console.log("App running on port!" + port);
});