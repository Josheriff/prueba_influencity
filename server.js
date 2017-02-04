var twitter_scrapper = require ('./scrapper'),
    express = require('express');

var app = express();

var port = process.env.PORT || 3000;

//MIDDLEWARE

app.use(function(req, res, next) {
   res.header("Access-Control-Allow-Origin", "*");
   res.header('Access-Control-Allow-Methods', 'GET'); // right now, only get method allowed
   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
   next();
 });

// ROUTES
app.get('/api/user/:username?', function (req, res) {
    if(req.params.username){
        twitter_scrapper(req.params.username, function(err, data){
            err ? res.status(500).json({error: err}) : res.json(data);
        });
    } else {
        //err 418 because is much better than 404 or 400 and keep you awake.
        res.status(418).json({error: "missing username path"})
    }
});

app.listen(port, function () {
    console.log(`Influencity test running on port ${port}`);
});
