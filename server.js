var twitter_scrapper = require ('./scrapper');
twitter_scrapper("InfluencityES", function(err, data){
    console.log("Scraping Results:");
    console.log(err ? err : data);
    console.log("----------------------------------");
})
