// Search for Youtube Video
$(document).ready(function() {
  var youTubeApiPartOne =
    "https://www.googleapis.com/youtube/v3/search?part=snippet&q=";
  var youTubeApiPartTwo = "&type=video&safeSearch=strict&maxResults=";
  var youtubeApiPartThree = "&key=";
  var maxResults = 3;
  var APIkey = "AIzaSyA1CsSmWes8g2YuNsHprVY16NPYsf0kRgk";

  var youtubeFrame =
    "<div class='col video-cell position-relative'><iframe class='position-absolute' src='https://www.youtube.com/embed/{VIDEOID}'></iframe><div class='click-video position-absolute' id='{VIDEOID}' ></div></div>";
  var videoUrl = "";

  function getYoutubeVideos(searchQuery) {
    if (!searchQuery) {
      return [];
    }

    var youtubeURL =
      youTubeApiPartOne +
      searchQuery +
      youTubeApiPartTwo +
      maxResults +
      youtubeApiPartThree +
      APIkey;
    return $.ajax({
      url: youtubeURL,
      method: "GET"
    });
  }

  //asking JS to replace all the instances of a thing.
  //replace all instance of VIDEOID to our clicked on video id.
  //used regular expression to search (global) and replace
  String.prototype.replaceAll = function(search, replace) {
    return this.replace(new RegExp(search, "g"), replace);
  };

  $(document).on("click", ".click-video", function(e) {
    var videoId = e && e.target && e.target.id;
    videoUrl = "https://www.youtube.com/embed/" + videoId + "?autoplay=1";

    if (!videoId) {
      return;
    }

    // Youtube posting
    var post = $("form.modal");

    post.on("submit", function() {
      var bodyInput = $("#comment").val();
      var title = $("#title").val();
      var postData = {
        activity: videoUrl,
        title: title,
        body: bodyInput
      };
      postThePost(postData);
    });

    function postThePost(post) {
      $.post("/api/posts", post, function() {
        //window.location.replace("/members");
      }).catch(function(err) {
        console.log(err);
      });
    }

    $("#workoutVideo").attr("src", "");
    $("#videoModal").modal("show");
  });

  $("#videoModal").on("show.bs.modal", function() {
    $("#workoutVideo").attr("src", videoUrl);
    return videoUrl;
  });

  var hiitRequest = getYoutubeVideos("hiit");
  var cardioRequest = getYoutubeVideos("cardio");
  var yogaRequest = getYoutubeVideos("yoga");

  $.when(hiitRequest, cardioRequest, yogaRequest).done(function(
    hiitResponse,
    cardioResponse,
    yogaResponse
  ) {
    var hiitVideos = hiitResponse[0].items;
    var cardioVideos = cardioResponse[0].items;
    var yogaVideos = yogaResponse[0].items;

    var hiitContent = hiitVideos.map(function(x) {
      return youtubeFrame.replaceAll("{VIDEOID}", x.id.videoId);
    });

    var cardioContent = cardioVideos.map(function(x) {
      return youtubeFrame.replaceAll("{VIDEOID}", x.id.videoId);
    });

    var yogaContent = yogaVideos.map(function(x) {
      return youtubeFrame.replaceAll("{VIDEOID}", x.id.videoId);
    });

    $("#hiit-content").html("");
    $("#hiit-content").append(hiitContent);

    $("#cardio-content").html("");
    $("#cardio-content").append(cardioContent);

    $("#yoga-content").html("");
    $("#yoga-content").append(yogaContent);
  });

  $.get("/api/user_data").then(function(data) {
    $("#user-username").text(data.username);
  });

  $.get("/api/profile_data").then(function(data) {
    $("#profile-firstName").text(data.firstName);
    $("#profile-lastName").text(data.lastName);
    $("#profile-bio").text(data.bio);
    $("#profile-photo").src(data.photo);
  });
  fetch("https://type.fit/api/quotes")
    .then(function(response) {
      return response.json();
    })
    .then(function(data) {
      var num = Math.floor(Math.random() * data.length);
      $("#quote").text(data[num].text);
      $("#author").text(data[num].author);
    });
});
