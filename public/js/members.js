$(document).ready(function() {
  // This file just does a GET request to figure out which user is logged in
  // and updates the HTML on the page
  $.get("/api/user_data").then(function(data) {
    $("#user-username").text(data.username);
  });

  // This file just does a GET request to figure out which user is logged in
  // and updates the HTML on the page
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

  var postsHolder = $(".media-display");

  function getPosts() {
    $.get("/api/posts", function(data) {
      postsHolder.empty();
      var postsToAdd = [];
      for (var i = 0; i < data.length; i++) {
        postsToAdd.push(createNewRow(data[i]));
      }
      blogContainer.append(postsToAdd);
    });
  }

  getPosts();

  function createNewRow(post) {
    var newMediaCard = ($("<div>")).addClass("card");
    newMediaCard.data(post);
  }
});
