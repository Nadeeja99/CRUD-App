const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const path = __dirname + '/app/views/';

const app = express();

app.use(express.static(path));

var corsOptions = {
  origin: "http://localhost:8081"
};

app.use(cors(corsOptions));

global.__basedir = __dirname;

const initRoutes = require("./app/routes");

app.use(express.urlencoded({ extended: true }));
initRoutes(app);


// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

const db = require("./app/models");
db.sequelize.sync();
// drop the table if it already exists
// db.sequelize.sync({
//    force: true })
// .then(() => {
//   console.log("Drop and re-sync db.");
// });

app.get('/', function (req,res) {
  res.sendFile(path + "index.html");
});

// simple route
// app.get("/", (req, res) => {
//   res.json({ message: "Welcome to bezkoder application." });
// });

require("./app/routes/turorial.routes")(app);

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});