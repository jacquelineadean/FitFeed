// Search for Youtube Video
$(document).ready(function() {
const youTubeApiPartOne = "https://www.googleapis.com/youtube/v3/search?part=snippet&q=";
const youTubeApiPartTwo = "&type=video&safeSearch=strict&maxResults=";
const youtubeApiPartThree = "&key=";
const maxResults = 3;
const APIkey = "AIzaSyDermk6zMO6c6R1nXgYo-O5nBynlFV5TiI";

const youtubeFrame = '<div class="col video-cell position-relative"><iframe class="position-absolute" width="420" height="345" src="https://www.youtube.com/embed/{VIDEOID}"></iframe><div class="click-video position-absolute" id="{VIDEOID}" ></div></div></div>';
let videoUrl = '';

function getYoutubeVideos(searchQuery) {
    if (!searchQuery) {
        return [];
    }

    const youtubeURL = `${youTubeApiPartOne}${searchQuery}${youTubeApiPartTwo}${maxResults}${youtubeApiPartThree}${APIkey}`;
    return $.ajax({
        url: youtubeURL,
        method: "GET"
    });
}

//asking JS to replace all the instances of a thing. 
//replace all instance of VIDEOID to our clicked on video id.
//used regular expression to search (global) and replace
String.prototype.replaceAll = function(search, replace){
    return this.replace(new RegExp(search, 'g'), replace)
}


    $(document).on("click",'.click-video', function(e) {
        const videoId = e && e.target && e.target.id;
        videoUrl = `https://www.youtube.com/embed/${videoId}?autoplay=1`;

        if (!videoId){
            return;
        }

        // Youtube posting
  var post = $("form.modal");

  post.on("submit", function() {
    var bodyInput = $("#comment").val();
    console.log(bodyInput);
    var postData = {
      activity: videoUrl,
      body: bodyInput
    };
    postThePost(postData);
  });

  function postThePost(post) {
    $.post("/api/posts", post, function() {
      //window.location.replace("/members");
    }).catch(err=>{
      console.log(err);
    })
  }

        $('#workoutVideo').attr('src','');
        $('#videoModal').modal('show');
    });

    $('#videoModal').on('show.bs.modal', function () {
        $('#workoutVideo').attr('src',videoUrl);
        return videoUrl;
    });

    let hiitRequest = getYoutubeVideos('hiit');
    let cardioRequest = getYoutubeVideos('cardio');
    let yogaRequest = getYoutubeVideos('yoga');

    $.when(hiitRequest, cardioRequest, yogaRequest).done(function(hiitResponse, cardioResponse, yogaResponse) {
        const hiitVideos = hiitResponse[0].items;
        const cardioVideos = cardioResponse[0].items;
        const yogaVideos = yogaResponse[0].items;


        const hiitContent = hiitVideos.map(x => {
            return youtubeFrame.replaceAll('{VIDEOID}', x.id.videoId);
        });

        const cardioContent = cardioVideos.map(x => {
            return youtubeFrame.replaceAll('{VIDEOID}', x.id.videoId);
        });

        const yogaContent = yogaVideos.map(x => {
            return youtubeFrame.replaceAll('{VIDEOID}', x.id.videoId);
        });

        $('#hiit-content').html('');
        $('#hiit-content').append(hiitContent);

        $('#cardio-content').html('');
        $('#cardio-content').append(cardioContent);

        $('#yoga-content').html('');
        $('#yoga-content').append(yogaContent);

    });

    $.get("/api/user_data").then(function (data) {
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
