var twitter_scrapper = require('./scrapper'),
    config = require('./config'),
    express = require('express'),
    mongoose = require('mongoose');

var app = express();

var port = process.env.PORT || 3000;

// MONGOOSE SCHEMA
var userSchema = new mongoose.Schema({
    _id: String,
    date: String,
    data: {
        screen_name: String,
        followers_count: Number,
        following_count: Number,
        photo_url: String,
        bio: String,
        total_tweets: Number
    }
});

//MONGOOSE MODELS

var userModel = mongoose.model('userModel',userSchema);

//MONGOOSE CONNECTION

mongoose.connect(config.mongoUri, function (error) {
    if (error) {
        console.error(error);
    } else {
        console.log('mongo connected');
    }
});

//MIDDLEWARE

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', 'GET'); // right now, only get method allowed
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

// ROUTES

app.get('/api/log/list', function (req, res) {
    userModel.find(function(err,users){
        if (err){
            res.status(500).json({error:err});
        } else {
            res.json(users);
        }
    });
});

app.get('/api/user/:username?', function (req, res) {
    if(req.params.username){
        twitter_scrapper(req.params.username, function(err, data){
            if (err){
                res.status(500).json({error:err});
            } else {
                res.json(data);
                // date parsed to ISO 8601 format easier to work with in the future
                data.date = new Date().toISOString();
                var user = new userModel(data);
                user.save(function(err){
                    if(err) console.log("Error! Saving user in MongoDB");
                })
            }
        });
    } else {
        //err 418 because is much better than 404 or 400 and keep you awake.
        res.status(418).json({error: "missing username path"})
    }
});

var server = app.listen(port, function () {
    console.log(`Influencity test running on port ${port}`);
});

// FOR TESTING SUPPORT

module.exports = server;
