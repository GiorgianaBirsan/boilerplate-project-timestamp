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



// Listen on port set in environment variable or default to 3000
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});


app.get("/api/:date?",function(req,res){
  let UTCFormat;
  let unixFormat;

  let dateParam= req.params.date

  const isNumber = (str) => !isNaN(str);

  const isValidDate = (str) => {
    const date = isNaN(str) ? new Date(str) : new Date(Number(str));
    return !isNaN(date.getTime());
  };
   
  if (!dateParam ){
    UTCFormat= new Date(Date.now()).toUTCString()
    unixFormat=  Date.now()
  }

    if (dateParam && !isNumber(dateParam)){
       UTCFormat= new Date(dateParam).toUTCString()
       unixFormat= new Date(dateParam).getTime()
    }
    if (dateParam && isNumber(dateParam)){
      UTCFormat= new Date(Number(dateParam)).toUTCString()
      unixFormat= Number(dateParam)
    } 
  
    if ( dateParam && !isValidDate(dateParam)){
      return res.json({"error": "Invalid Date"});
    }

    res.json({"unix": unixFormat, "utc": UTCFormat})

});
