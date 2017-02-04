var Xray = require('x-ray');
var x = Xray();
var uuid = require('node-uuid');


/**
 * fixNumber - Convert Twitter numbers formats from string to correct number
 *
 * @param  {string} rawNumber Raw data from Twitter (tweets, followers, followings...)
 * @return {number}           valid JavaScript Number
 */
function fixNumber(rawNumber){
    return parseInt(rawNumber.replace(".", ""));
}

/**
 * getTwitterProfile - Scrap the data from twitter profile
 * @example
 * getTwitterProfile("InfluencityES",function(err, data){
 *  if (!err) console.log(data);
 * });
 *
 * {
 * "screen_name": "Influencity",
 * "followers_count": "4.267",
 * "following_count": "2.809",
 * "photo_url": "https://pbs.twimg.com/profile_images/746297669040111618/LqMVVhQs_400x400.jpg",
 * "bio": "Analizamos la audiencia de millones de influencers de todo el mundo para desarrollar campañas de #InfluenceMarketing de una manera potente y efectiva.",
 * "total_tweets": "5.018 Tweets"
 * }
 *
 * @param  {string} profile twitter username
 * @param {function} callback return error + data
 * @return {object}         object with user datails
 */
function getTwitterProfile(profile,callback){
    x(`https://twitter.com/${profile}`, {
        screen_name: ".ProfileHeaderCard-nameLink",
        followers_count:".ProfileNav-item--followers .ProfileNav-value",
        following_count:".ProfileNav-item--following .ProfileNav-value",
        photo_url:".ProfileAvatar-image@src",
        bio:".ProfileHeaderCard-bio",
        total_tweets:".ProfileNav-stat--link@title"
    })(function(err, obj) {
        callback(err,obj)
    })
}

module.exports = function (profile,callback){
    getTwitterProfile(profile,function(err, data){
        var cleanData = undefined;
        if(!err){
            cleanData = {
                _id:uuid.v4(),
                data:{
                    screen_name: data.screen_name,
                    followers_count: fixNumber(data.followers_count),
                    following_count: fixNumber(data.following_count),
                    photo_url: data.photo_url,
                    bio: data.bio,
                    total_tweets: fixNumber(data.total_tweets)
                }
            };
        }
        callback(err, cleanData);
    });
}
