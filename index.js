// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

// #1
app.get("/api/:date", function (req, res) {
  const input = req.params.date;
  let date;

  if (input) {
    if(!isNaN(input) && Number(input) > 10000) {
      date = new Date(Number(input));
    } else {
      date = new Date(input);
    }
  
    if (isNaN(date.getTime())) {
      res.json({error: "Invalid Date"});
    } else {
      res.json({unix: date.getTime(), utc: date.toUTCString()});
    }
  }
});

// #2
app.get("/api", function (req, res) {
  const now = new Date();
  res.json({unix: now.getTime(), utc: now.toUTCString()});
})




// Listen on port set in environment variable or default to 3000
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
