function generateTweet() {
    var tweetText = "I just applied for the Ophir 🥷 Workshop, you should do the same";

    var encodedTweetText = encodeURIComponent(tweetText);

    var intentUrl = "https://twitter.com/intent/tweet?text=" + encodedTweetText;

    console.log(intentUrl);

    window.open(intentUrl);

}
