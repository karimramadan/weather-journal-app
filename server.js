// Port
const port  = 5000
// Express to run server and routes
const express = require('express');
// Cors for cross origin allowance
const cors = require('cors');
// Body parser
const bodyParser = require('body-parser');
// Start up an instance of app
const app = express();

// Setup empty JS object to act as endpoint for all routes
projectData = {};

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
app.use(cors());

// Initialize the main project folder
app.use(express.static('website'));


// Setup Server
const server = app.listen(port, ()=>{console.log(`Server is running on localhost: ${port}`)})

// Routes
app.get('/all', function (req, res) {
    res.send(projectData);
})

app.post('/add', function(req,res){
    projectData = {
        temperature: req.body.temperature,
        date: req.body.date,
        userResponse: req.body.userResponse
    }
    res.send(projectData)
});

