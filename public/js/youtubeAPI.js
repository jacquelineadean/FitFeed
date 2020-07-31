// Search for Youtube Video

const youTubeApiPartOne = "https://www.googleapis.com/youtube/v3/search?part=snippet&q=";
const youTubeApiPartTwo = "&type=video&safeSearch=strict&maxResults=";
const youtubeApiPartThree = "&key=";
const maxResults = 3;
const APIkey = "AIzaSyBxqN1aMPbx92CJW_4XL5B0Z0RY9I0LbQI";

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

$(document).ready(function() {
    $(document).on("click",'.click-video', function(e) {
        const videoId = e && e.target && e.target.id;
        videoUrl = `https://www.youtube.com/embed/${videoId}?autoplay=1`;

        if (!videoId){
            return;
        }

        $('#workoutVideo').attr('src','');
        $('#videoModal').modal('show');
    });

    $('#videoModal').on('show.bs.modal', function () {
        $('#workoutVideo').attr('src',videoUrl);
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
});
