var twitter_scrapper = require ('./scrapper'),
    express = require('express');

var app = express();

var port = process.env.PORT || 3000;

app.get('/api/user/:username', function (req, res) {
    twitter_scrapper(req.params.username, function(err, data){
        res.send(data);
    });
});

app.listen(port, function () {
    console.log(`Influencity test running on port ${port}`);
});
