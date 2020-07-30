// Search for Youtube Video

var youTubeAPI = "https://www.googleapis.com/youtube/v3/search?part=snippet&q=soccer&type=video&safeSearch=strict&maxResults=2&key=AIzaSyBtsk2xq92E6FwtgdGgJPHQH6iOwkTPLPI"
  var baseURL = "https://www.googleapis.com/youtube/v3";
  var searchKeyWord = "/search?";
  var requiredForURL = "part=snippet";
  var addItem = "&";
  var queryTerm = "q=";
  var queryExample = "workout";
  var query = " ";
  var typeTerm = "type=video";
  var safeSearchSetting = "safeSearch=moderate";
  var maxResults = "maxResults=";
  var resultsExample = 1;
  var APIkey = "key=AIzaSyAW1bTymjwcG07M-NNP3myY5Kys4yS3VLI";
  var sampleID = "hY7m5jjJ9mM"
  var videosRetreived = [];

// load iframe API
var tag = document.createElement('script');
tag.src = "https://www.youtube.com/iframe_api";
$("body").append(tag);

var youtubeQueryURL = baseURL + searchKeyWord + requiredForURL + addItem + queryTerm + query + addItem + typeTerm + addItem + safeSearchSetting + addItem + APIkey;
function getYoutubeVideo(searchQuery) {
    var youtubeQueryURL = "https://www.googleapis.com/youtube/v3/search?part=snippet&q=" + searchQuery + "&type=video&safeSearch=moderate&maxResults=1&key=AIzaSyCePn5Anerj-tiIm5A-YxyCPsFdXY9cR4E"
    $.ajax({
        url: youtubeQueryURL,
        method: "GET"
    })
        .then(function (response) {
            // console.log(youtubeQueryURL);
            // console.log(response.items[0].id.videoId);
            // response.items.forEach(function (item) {
            //   videosRetreived.push(item.id.videoId);
            // })
            renderVideo(response.items[0].id.videoId);
            // console.log(videosRetreived);

        })
}

function renderVideo(idPassed) {
    //<iframe id="player" type="text/html" width="640" height="390" frameborder="0"></iframe>
    var player = $("iframe");
    var srcURL = "https://www.youtube.com/embed/" + idPassed + "?enablejsapi=1&origin=http://example.com"
    player.attr({
        type: "text/html",
        width: "640",
        height: "390",
        frameborder: "0",
        src: srcURL
    });
}

$("button").on("click", function (event) {
    getYoutubeVideo($(this).attr("id"));
});